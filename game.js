const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Grid settings
const GRID_SIZE = 20;
const TILE_COUNT = canvas.width / GRID_SIZE;

// Snake state
let snake = [
  { x: 10, y: 10 }
];

// Movement direction
let velocity = { x: 1, y: 0 };

// Game state
let gameRunning = true;

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      if (velocity.y === 0) velocity = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (velocity.y === 0) velocity = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (velocity.x === 0) velocity = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (velocity.x === 0) velocity = { x: 1, y: 0 };
      break;
  }
});

function updateGame() {
  if (!gameRunning) return;

  // Create new head
  const head = {
    x: snake[0].x + velocity.x,
    y: snake[0].y + velocity.y
  };

  // Wall collision
  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= TILE_COUNT ||
    head.y >= TILE_COUNT
  ) {
    gameOver();
    return;
  }

  // Move snake
  snake.unshift(head);
  snake.pop();

  drawGame();
}

function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "lime";
  snake.forEach(segment => {
    ctx.fillRect(
      segment.x * GRID_SIZE,
      segment.y * GRID_SIZE,
      GRID_SIZE,
      GRID_SIZE
    );
  });
}
function gameOver() {
  gameRunning = false;
  alert("Game Over");
}
setInterval(updateGame, 150);

