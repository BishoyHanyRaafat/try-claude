class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        this.initializeGame();
    }

    initializeGame() {
        const cells = document.querySelectorAll('.cell');
        const resetButton = document.getElementById('reset');
        const statusElement = document.getElementById('status');

        cells.forEach(cell => {
            cell.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                this.handleCellClick(index);
            });
        });

        resetButton.addEventListener('click', () => {
            this.resetGame();
        });

        this.updateStatus();
    }

    handleCellClick(index) {
        if (!this.gameActive || this.board[index] !== '') {
            return;
        }

        this.board[index] = this.currentPlayer;
        this.updateBoard();

        if (this.checkWinner()) {
            this.gameActive = false;
            this.updateStatus(`Player ${this.currentPlayer} wins!`);
            this.highlightWinningCells();
        } else if (this.isBoardFull()) {
            this.gameActive = false;
            this.updateStatus("It's a draw!");
        } else {
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            this.updateStatus();
        }
    }

    updateBoard() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell, index) => {
            cell.textContent = this.board[index];
            cell.classList.remove('x', 'o');
            if (this.board[index] === 'X') {
                cell.classList.add('x');
            } else if (this.board[index] === 'O') {
                cell.classList.add('o');
            }
        });
    }

    checkWinner() {
        for (const combination of this.winningCombinations) {
            const [a, b, c] = combination;
            if (this.board[a] &&
                this.board[a] === this.board[b] &&
                this.board[a] === this.board[c]) {
                return combination;
            }
        }
        return null;
    }

    highlightWinningCells() {
        const winningCombination = this.checkWinner();
        if (winningCombination) {
            winningCombination.forEach(index => {
                const cell = document.querySelector(`[data-index="${index}"]`);
                cell.classList.add('winner');
            });
        }
    }

    isBoardFull() {
        return this.board.every(cell => cell !== '');
    }

    updateStatus(message) {
        const statusElement = document.getElementById('status');
        if (message) {
            statusElement.textContent = message;
        } else {
            statusElement.textContent = `Player ${this.currentPlayer}'s turn`;
        }
    }

    resetGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;

        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winner');
        });

        this.updateStatus();
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});