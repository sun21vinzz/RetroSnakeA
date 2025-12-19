function getSafeMove(snake, gridSize) {
  const head = snake[0];

  const moves = [
    { name: "UP", x: 0, y: -1 },
    { name: "DOWN", x: 0, y: 1 },
    { name: "LEFT", x: -1, y: 0 },
    { name: "RIGHT", x: 1, y: 0 }
  ];

  for (let move of moves) {
    const nextX = head.x + move.x;
    const nextY = head.y + move.y;

    // Wall collision check
    if (
      nextX < 0 ||
      nextY < 0 ||
      nextX >= gridSize ||
      nextY >= gridSize
    ) {
      continue;
    }

    // Self collision check
    let collision = false;
    for (let part of snake) {
      if (part.x === nextX && part.y === nextY) {
        collision = true;
        break;
      }
    }

    if (!collision) {
      return move.name; // First safe move
    }
  }

  return "NONE"; // No safe moves
}
console.log("AI evaluated snake length:", snake.length);
