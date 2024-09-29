const gameBoard = document.getElementById('game-board');
const scoreElement = document.getElementById('score');
let snake = [{ x: 10, y: 10 }];  // Initial snake position
let food = { x: 15, y: 15 };     // Initial food position
let dx = 1;  // Horizontal velocity (1 means moving right, -1 means left)
let dy = 0;  // Vertical velocity (1 means moving down, -1 means up)
let score = 0;
const boardSize = 20;

// Create the game board with 20x20 grid cells
function createBoard() {
    for (let i = 0; i < boardSize * boardSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        gameBoard.appendChild(cell);
    }
}

// Draw the snake on the board
function drawSnake() {
    const cells = document.querySelectorAll('.grid-cell');
    cells.forEach(cell => cell.classList.remove('snake'));  // Clear previous snake position

    snake.forEach(part => {
        const snakeIndex = part.y * boardSize + part.x;
        cells[snakeIndex].classList.add('snake');
    });
}

// Draw the food on the board
function drawFood() {
    const cells = document.querySelectorAll('.grid-cell');
    const foodIndex = food.y * boardSize + food.x;
    cells[foodIndex].classList.add('food');
}

// Move the snake
function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Check for collisions with walls or itself
    if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize || snakeCollision(head)) {
        alert('Game Over! Your final score is: ' + score);
        resetGame();
        return;
    }

    snake.unshift(head);  // Add new head

    // Check if the snake eats the food
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreElement.textContent = 'Score: ' + score;
        generateFood();  // Create new food
    } else {
        snake.pop();  // Remove last part of the snake
    }
}

// Check if the snake collides with itself
function snakeCollision(head) {
    return snake.some(part => part.x === head.x && part.y === head.y);
}

// Generate new food at random position
function generateFood() {
    food.x = Math.floor(Math.random() * boardSize);
    food.y = Math.floor(Math.random() * boardSize);
}

// Reset the game
function resetGame() {
    snake = [{ x: 10, y: 10 }];
    dx = 1;
    dy = 0;
    score = 0;
    scoreElement.textContent = 'Score: 0';
    generateFood();
}

// Change snake direction based on key press
function changeDirection(event) {
    const key = event.key;
    if (key === 'ArrowUp' && dy === 0) {
        dx = 0;
        dy = -1;
    } else if (key === 'ArrowDown' && dy === 0) {
        dx = 0;
        dy = 1;
    } else if (key === 'ArrowLeft' && dx === 0) {
        dx = -1;
        dy = 0;
    } else if (key === 'ArrowRight' && dx === 0) {
        dx = 1;
        dy = 0;
    }
}

// Main game loop
function gameLoop() {
    moveSnake();
    drawSnake();
    drawFood();
}

// Initialize the game
createBoard();
drawSnake();
drawFood();
setInterval(gameLoop, 200);  // Snake moves every 200ms

// Add keyboard event listener
window.addEventListener('keydown', changeDirection);
