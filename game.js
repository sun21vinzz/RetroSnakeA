
const aiText = document.getElementById("aiText");
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

  // Self collision
  for (let part of snake) {
    if (part.x === head.x && part.y === head.y) {
      gameOver();
      return;
    }
  }

  snake.unshift(head);

  // Food eaten
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = generateFood(); // new food
  } else {
    snake.pop(); // normal move
  }

  drawGame();

}


function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(
    food.x * GRID_SIZE,
    food.y * GRID_SIZE,
    GRID_SIZE,
    GRID_SIZE
  );

  // Draw snake
  ctx.fillStyle = "lime";
  snake.forEach(segment => {
    ctx.fillRect(
      segment.x * GRID_SIZE,
      segment.y * GRID_SIZE,
      GRID_SIZE,
      GRID_SIZE
    );
  });

  // Draw score
  ctx.fillStyle = "white";
  ctx.font = "14px monospace";
  ctx.fillText("Score: " + score, 10, 20);
  // AI Safety Suggestion
  const suggestion = getSafeMove(snake, TILE_COUNT);
  aiText.innerText = "AI Suggestion: " + suggestion;
}
function gameOver() {
  gameRunning = false;
  alert("Game Over! Score: " + score);
}

setInterval(updateGame, 150);

let food = generateFood();
let score = 0;

function generateFood() {
  return {
    x: Math.floor(Math.random() * TILE_COUNT),
    y: Math.floor(Math.random() * TILE_COUNT)
  };
}

