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

function SetupCanvas() {
  canvas = document.getElementById("my-canvas");
  ctx = canvas.getContext("2d");
  canvas.width = 936;
  canvas.height = 956;

  // Double the size of elements to fit the screen
  ctx.scale(2, 2);

  // Draw Canvas background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw gameboard rectangle
  ctx.strokeStyle = "black";
  ctx.strokeRect(8, 8, 280, 462);

  tetrisLogo = new Image(161, 54);
  tetrisLogo.onload = DrawTetrisLogo;
  tetrisLogo.src = "tetrislogo.png";

  // Set font for score label text and draw
  ctx.fillStyle = "black";
  ctx.font = "21px Arial";
  ctx.fillText("SCORE", 300, 98);
}
