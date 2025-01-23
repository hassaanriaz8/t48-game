// Select the game container
const gameContainer = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score');
let score = 0;

// Initialize a 4x4 grid with zeros
let grid = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

// Function to render the grid
function renderGrid() {
  gameContainer.innerHTML = ''; // Clear the grid container
  grid.forEach(row => {
    row.forEach(cell => {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      tile.textContent = cell !== 0 ? cell : ''; // Display the number or keep it empty
      gameContainer.appendChild(tile);
    });
  });
  scoreDisplay.textContent = `Score: ${score}`;
}

// Add a new random tile to the grid
function addRandomTile() {
  const emptyTiles = [];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (grid[row][col] === 0) emptyTiles.push({ row, col });
    }
  }
  if (emptyTiles.length > 0) {
    const { row, col } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    grid[row][col] = Math.random() > 0.5 ? 2 : 4; // Add 2 or 4 randomly
  }
}

// Initialize the game
function initializeGame() {
  addRandomTile();
  addRandomTile();
  renderGrid();
}

// Add movement logic here
// Function to slide tiles in one direction
function slide(row) {
  const newRow = row.filter(num => num !== 0); // Remove all zeros
  for (let i = 0; i < newRow.length - 1; i++) {
    if (newRow[i] === newRow[i + 1]) {
      newRow[i] *= 2; // Merge tiles
      score += newRow[i]; // Update score
      newRow[i + 1] = 0; // Remove merged tile
    }
  }
  return [...newRow.filter(num => num !== 0), ...Array(4 - newRow.filter(num => num !== 0).length).fill(0)];
}

// Function to handle movement
function move(direction) {
  let rotatedGrid = JSON.parse(JSON.stringify(grid));
  if (direction === 'up' || direction === 'down') {
    rotatedGrid = rotateGrid(grid);
  }
  for (let row = 0; row < 4; row++) {
    rotatedGrid[row] = slide(rotatedGrid[row]);
    if (direction === 'down' || direction === 'right') {
      rotatedGrid[row].reverse();
    }
  }
  if (direction === 'up' || direction === 'down') {
    rotatedGrid = rotateGrid(rotatedGrid, true);
  }
  grid = rotatedGrid;
  addRandomTile();
  renderGrid();
}

// Rotate the grid (for up and down movements)
function rotateGrid(grid, reverse = false) {
  const newGrid = [[], [], [], []];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (reverse) {
        newGrid[col][row] = grid[row][col];
      } else {
        newGrid[row][col] = grid[col][row];
      }
    }
  }
  return newGrid;
}

// Listen for arrow key presses
document.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowUp':
      move('up');
      break;
    case 'ArrowDown':
      move('down');
      break;
    case 'ArrowLeft':
      move('left');
      break;
    case 'ArrowRight':
      move('right');
      break;
  }
});

// Start the game
initializeGame();
