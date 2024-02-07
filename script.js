const canvas = document.getElementById("Tetris");
const ctx = canvas.getContext("2d");
const fieldHeight = 20;
const fieldWidth = 10;

const width = 300;
const height = 600;
const borderWidth = 2;

let score = 0;
//will hold values of coordinates where squares should be drawn.
//choose a grid using array (example [x][y] x - line y - column), it should hold the coordinates that should be used for printing squares
let coordinateArray = [...Array(fieldHeight)].map((e) =>
  Array(fieldWidth).fill(0)
);
//will hold 1 - has a square or 0 - does not have a square
let fieldArray = [...Array(fieldHeight)].map((e) => Array(fieldWidth).fill(0));

const tetrominos = [
  [
    [1, 0],
    [0, 1],
    [1, 1],
    [2, 1],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ],
  [
    [0, 0],
    [0, 1],
    [1, 1],
    [2, 1],
  ],
  [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
  ],
  [
    [1, 0],
    [2, 0],
    [0, 1],
    [1, 1],
  ],
  [
    [0, 0],
    [1, 0],
    [1, 1],
    [2, 1],
  ],
];
const tetrominoColors = [
  "green",
  "red",
  "blue",
  "yellow",
  "purple",
  "orange",
  "cyan",
];

let tetrominoX = 4;
let tetrominoY = 0;
let tetromino = [];
let color;

document.addEventListener("DOMContentLoaded", Setup);

function Setup() {
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

  document.addEventListener("keydown", KeyPress);

  console.log(coordinateArray);

  // DrawSquare(coordinateArray[3][1].x, coordinateArray[3][1].y, "red");

  CreateTetromino();
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

function DrawSquare(x, y, color) {
  const gridSize = width / fieldWidth - borderWidth;
  ctx.fillStyle = color;
  ctx.fillRect(x, y, gridSize, gridSize);
}

function CreateTetromino() {
  let randomTetromino = Math.floor(Math.random() * tetrominos.length);
  tetromino = tetrominos[randomTetromino];
  color = tetrominoColors[randomTetromino];
  tetrominoX = 4;
  tetrominoY = 0;
  DrawTetromino();
}

function DrawTetromino() {
  for (let i = 0; i < tetromino.length; i++) {
    let x = tetromino[i][0] + tetrominoX;
    let y = tetromino[i][1] + tetrominoY;

    fieldArray[y][x] = 1;

    DrawSquare(coordinateArray[y][x].x, coordinateArray[y][x].y, color);
  }
}

function DeleteTetromino() {
  for (let i = 0; i < tetromino.length; i++) {
    let x = tetromino[i][0] + tetrominoX;
    let y = tetromino[i][1] + tetrominoY;

    fieldArray[y][x] = 0;

    DrawSquare(coordinateArray[y][x].x, coordinateArray[y][x].y, "black");
  }
}

function KeyPress(key) {
  //A - left
  if (key.keyCode == 65) {
    DeleteTetromino();
    tetrominoX--;
  }
  //D - right
  else if (key.keyCode == 68) {
    tetrominoX++;
  }
  //S - down
  else if (key.keyCode == 83) {
  }
  //W - up
  else if (key.keyCode == 87) {
  }
}
