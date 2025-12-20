
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const aiText = document.getElementById("aiText");

// =========================
// GRID SETTINGS
// =========================
const GRID_SIZE = 20;
const TILE_COUNT = canvas.width / GRID_SIZE;

// =========================
// GAME STATE
// =========================
let snake = [{ x: 10, y: 10 }];
let velocity = { x: 1, y: 0 };
let gameRunning = true;

let food = generateFood();
let score = 0;

// =========================
// INPUT HANDLING
// =========================
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

// =========================
// GAME LOOP
// =========================
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

  // Food logic
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = generateFood();
  } else {
    snake.pop();
  }

  drawGame();
}

// =========================
// RENDERING
// =========================
function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Food
  ctx.fillStyle = "red";
  ctx.fillRect(
    food.x * GRID_SIZE,
    food.y * GRID_SIZE,
    GRID_SIZE,
    GRID_SIZE
  );

  // Snake
  ctx.fillStyle = "lime";
  snake.forEach(segment => {
    ctx.fillRect(
      segment.x * GRID_SIZE,
      segment.y * GRID_SIZE,
      GRID_SIZE,
      GRID_SIZE
    );
  });

  // Score
  ctx.fillStyle = "white";
  ctx.font = "14px monospace";
  ctx.fillText("Score: " + score, 10, 20);

  // =========================
  // AI SAFETY COACH
  // =========================
  const suggestion = getSafeMove(snake, TILE_COUNT);

  // AI suggestion (top-right)
  ctx.fillStyle = "#00ff00";
  ctx.fillText("AI: " + suggestion, canvas.width - 120, 20);

  // Danger warning
  if (suggestion === "NONE") {
    ctx.fillStyle = "red";
    ctx.font = "16px monospace";
    ctx.fillText("DANGER!", canvas.width / 2 - 35, 20);
  }

  // Optional external text
  aiText.innerText = "AI Suggestion: " + suggestion;
}

// =========================
// UTILITIES
// =========================
function generateFood() {
  return {
    x: Math.floor(Math.random() * TILE_COUNT),
    y: Math.floor(Math.random() * TILE_COUNT)
  };
}

function gameOver() {
  gameRunning = false;
  alert("Game Over! Score: " + score);
}

// =========================
// START GAME
// =========================
setInterval(updateGame, 150);
