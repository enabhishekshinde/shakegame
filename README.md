# shakegame

HTML Structure:

The <div> with the id="game-board" acts as the container for the snake game.
The game is structured using a 20x20 grid.
CSS Styling:

We use CSS Grid to create the game board with 20 rows and 20 columns.
The snake and food cells are colored using different classes (snake for the snake, food for the food).
JavaScript Logic:

The snake is represented by an array of objects (snake), where each object contains x and y coordinates.
The snake moves every 200ms using setInterval, and the moveSnake function is responsible for updating the snake's position.
changeDirection is triggered when the user presses the arrow keys to change the snake's direction.
Collision detection ensures that the game ends when the snake hits the walls or itself.
Game Loop:

The game runs through the gameLoop function, which updates the snake’s position, draws the snake, and checks for food collisions.
