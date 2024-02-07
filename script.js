const canvas = document.getElementById("Tetris");
const ctx = canvas.getContext("2d");
const fieldHeight = 20;
const fieldWidth = 10;

const width = 400;
const height = 800;
const borderWidth = 2;

let score = 0;
//will hold values of coordinates where squares should be drawn.
//choose a grid using array (example [x][y] x - line y - column), it should hold the coordinates that should be used for printing squares
let coordinateArray = [...Array(fieldHeight)].map((e) =>
  Array(fieldWidth).fill(0)
);

document.addEventListener("DOMContentLoaded", Draw);

function Draw() {
  canvas.width = width;
  canvas.height = height;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.lineWidth = borderWidth;
  ctx.strokeStyle = "white";

  for (let i = 0; i <= height; i += width / 10) {
    // Draw a vertical line
    if (i <= width) {
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

  MakeCoordinateArray();

  console.log(coordinateArray);

  ctx.fillStyle = "red";
  DrawSquare(coordinateArray[1][1].x, coordinateArray[1][1].y);
  DrawSquare(coordinateArray[2][1].x, coordinateArray[2][1].y);
  DrawSquare(coordinateArray[3][1].x, coordinateArray[3][1].y);
  DrawSquare(coordinateArray[3][2].x, coordinateArray[3][2].y);
}

class Coordinates {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function MakeCoordinateArray() {
  let i = 0,
    j = 0;
  for (let y = borderWidth / 2; y <= height; y += height / fieldHeight) {
    for (let x = borderWidth / 2; x <= width; x += width / fieldWidth) {
      coordinateArray[j][i] = new Coordinates(x, y);
      i++;
    }
    j++;
    i = 0;
  }
}

function DrawSquare(x, y) {
  const gridSize = width / fieldWidth - borderWidth;
  ctx.fillRect(x, y, gridSize, gridSize);
}
