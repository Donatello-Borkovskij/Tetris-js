const canvas = document.getElementById("Tetris");
const ctx = canvas.getContext("2d");
const fieldSize = [9, 19]; //x, y
const startXY = [4, 0];

document.addEventListener("DOMContentLoaded", Draw);

function Draw() {
  canvas.width = 400;
  canvas.height = 800;

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw a red rectangle at position (50, 50) with width 50 and height 50
  ctx.fillStyle = "red";
  ctx.fillRect(50, 50, 50, 50);
}
