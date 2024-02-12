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
//will hold values 1 - has a square or 0 - does not have a square
let fieldArray = [...Array(fieldHeight)].map((e) => Array(fieldWidth).fill(0));
let colorArray = [...Array(fieldHeight)].map((e) => Array(fieldWidth).fill(0));
//in tetrominos 1 means there is a square, 0 means there isn't
const tetrominos = [
  [
    [0, 1, 0],
    [1, 1, 1],
  ],
  [[1, 1, 1, 1]],
  [
    [1, 0],
    [1, 0],
    [1, 1],
  ],
  [
    [1, 1],
    [1, 1],
  ],
  [
    [0, 1],
    [0, 1],
    [1, 1],
  ],
  [
    [0, 1, 1],
    [1, 1, 0],
  ],
  [
    [1, 1, 0],
    [0, 1, 1],
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
    for (let j = 0; j < tetromino[i].length; j++) {
      let x = j + tetrominoX;
      let y = i + tetrominoY;

      // console.log(y);
      // console.log(x);

      if (tetromino[i][j] == 1) {
        fieldArray[y][x] = 1;
        colorArray[y][x] = color;
        DrawSquare(coordinateArray[y][x].x, coordinateArray[y][x].y, color);
      }
    }
  }
  // console.log(tetromino);
}

function DeleteTetromino() {
  for (let i = 0; i < tetromino.length; i++) {
    for (let j = 0; j < tetromino[i].length; j++) {
      let x = j + tetrominoX;
      let y = i + tetrominoY;

      // console.log(y);
      // console.log(x);

      if (tetromino[i][j] == 1) {
        fieldArray[y][x] = 0;
        colorArray[y][x] = "black";
        DrawSquare(coordinateArray[y][x].x, coordinateArray[y][x].y, "black");
      }
    }
  }
}

function KeyPress(key) {
  //A - left
  if (key.keyCode == 65) {
    if (!WallCollision(-1)) {
      DeleteTetromino();
      tetrominoX--;
      DrawTetromino();
    }
  }
  //D - right
  else if (key.keyCode == 68) {
    if (!WallCollision(1)) {
      DeleteTetromino();
      tetrominoX++;
      DrawTetromino();
    }
  }
  //S - down
  else if (key.keyCode == 83) {
    MoveDown();
  }
  //W - up
  else if (key.keyCode == 87) {
    DeleteTetromino();
    RotateTetromino();
    DrawTetromino();
  }
}

function RotateTetromino() {
  let tetrominoCopy = tetromino;

  const transposed = transpose(tetromino);
  const rotatedTetromino = transposed.map((row) => row.reverse());
  tetromino = rotatedTetromino;

  if (
    tetrominoX + tetromino[0].length - 1 > fieldWidth - 1 ||
    tetrominoY + tetromino.length - 1 > fieldHeight - 1
  ) {
    tetromino = tetrominoCopy;
  }
}

function transpose(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const transposedMatrix = [];

  for (let j = 0; j < cols; j++) {
    transposedMatrix[j] = [];
    for (let i = 0; i < rows; i++) {
      transposedMatrix[j][i] = matrix[i][j];
    }
  }

  return transposedMatrix;
}

function MoveDown() {
  FloorCollision();
  DeleteTetromino();
  tetrominoY++;
  DrawTetromino();
}

setInterval(MoveDown, 2000);

function WallCollision(direction) {
  for (let i = 0; i < tetromino.length; i++) {
    for (let j = 0; j < tetromino[i].length; j++) {
      let x = j + tetrominoX + direction;
      let y = i + tetrominoY;

      // Check if the next position is out of bounds
      if (x < 0 || x >= fieldWidth || y >= fieldHeight) {
        return true; // Collision with wall
      }

      if (
        fieldArray[y][x] == 1 &&
        (tetromino[i][j + direction] == undefined ||
          tetromino[i][j + direction] == 0) &&
        tetromino[i][j] == 1
      ) {
        return true; // Collision with another blocks
      }
    }
  }
  return false;
}

function FloorCollision() {
  for (let i = 0; i < tetromino.length; i++) {
    for (let j = 0; j < tetromino[i].length; j++) {
      let x = j + tetrominoX;
      let y = i + tetrominoY + 1;

      if (
        y == fieldHeight ||
        (tetromino[i][j] == 1 &&
          fieldArray[y][x] == 1 &&
          (tetromino.length - 1 < i + 1 || tetromino[i + 1][j] == 0))
      ) {
        CompleteRowCheck();
        CreateTetromino();
      }
    }
  }
}

function CompleteRowCheck() {
  let rowsToMove = [];
  for (let i = fieldHeight - 1; i >= 0; i--) {
    let row = 0;
    for (let j = 0; j < fieldArray[1].length; j++) {
      row += fieldArray[i][j];
    }
    if (row == fieldWidth) {
      DeleteRow(i);
      rowsToMove.push(i);
    }
  }
  rowsToMove.reverse();
  for (let i = 0; i < rowsToMove.length; i++) {
    MoveAllRowsDown(rowsToMove[i]);
  }
}

function DeleteRow(row) {
  for (let i = 0; i < fieldWidth; i++) {
    fieldArray[row][i] = 0;
    colorArray[row][i] = "black";
    DrawSquare(coordinateArray[row][i].x, coordinateArray[row][i].y, "black");
  }
}

function MoveAllRowsDown(row) {
  let fieldArrayCopy = JSON.parse(JSON.stringify(fieldArray));
  let colorArrayCopy = JSON.parse(JSON.stringify(colorArray));

  for (let i = row; i > 0; i--) {
    for (let j = 0; j < fieldWidth; j++) {
      fieldArray[i][j] = fieldArrayCopy[i - 1][j];
      colorArray[i][j] = colorArrayCopy[i - 1][j];
      DrawSquare(
        coordinateArray[i][j].x,
        coordinateArray[i][j].y,
        colorArray[i][j]
      );
    }
  }
}
