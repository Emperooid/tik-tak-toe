const board = document.getElementById('board');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];

const createBoard = () => {
    gameState.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.addEventListener('click', () => handleCellClick(index));
        cellElement.textContent = cell;
        board.appendChild(cellElement);
    });
};

const handleCellClick = (index) => {
    if (gameState[index] !== '' || checkWinner()) return;

    gameState[index] = currentPlayer;
    render();
    if (checkWinner()) {
        setTimeout(() => alert('${currentPlayer} wins!'), 10);
    } else if (gameState.every(cell => cell !== '')) {
        setTimeout(() => alert('It\'s a draw!'), 10);
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const checkWinner = () => {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
};

const render = () => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.textContent = gameState[index];
    });
};

const resetGame = () => {
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    render();
};

resetButton.addEventListener('click', resetGame);
createBoard();