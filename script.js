const canvas = document.getElementById("Tetris");
const ctx = canvas.getContext("2d");
const width = 400;
const height = 800;

let score = 0;

document.addEventListener("DOMContentLoaded", Draw);

function Draw() {
  canvas.width = width;
  canvas.height = height;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw a red rectangle at position (50, 50) with width 50 and height 50
  ctx.fillStyle = "red";
  ctx.fillRect(40, 40, 40, 40);

  ctx.fillStyle = "red";
  ctx.fillRect(40, 80, 40, 40);

  ctx.fillStyle = "red";
  ctx.fillRect(40, 120, 40, 40);

  ctx.fillStyle = "red";
  ctx.fillRect(80, 120, 40, 40);

  ctx.lineWidth = 2;
  ctx.strokeStyle = "grey";

  for (let i = 0; i < height; i += width / 10) {
    // Draw a vertical line
    if (i < width) {
      ctx.beginPath();
      ctx.moveTo(i, 0); // Starting point (x, y)
      ctx.lineTo(i, height); // Ending point (x, y)
      ctx.stroke(); // Render the line
    }
    // Draw a horizontal line
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(width, i);
    ctx.stroke();
  }
}
