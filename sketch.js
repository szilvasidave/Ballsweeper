let blocks, blockSize;
let xLen, yLen;
let gameOver, finishedGame;
let clickCount;
let numberColors = [[2,0,253],[1,126,0],[254,0,1],[1,1,127],[127,3,0],[0,128,128],[0,0,0],[128,128,128]];

function setup() {
  createCanvas(windowWidth, windowHeight);
  blocks = [];
  blockSize = width * height / 15000;
  calculateBlocks();

  for (let x = 0; x < xLen; x++) {
    blocks[x] = [];
    for (let y = 0; y < yLen; y++) {
      blocks[x][y] = new Block(x * blockSize, y * blockSize, blockSize);
    }
  }
  countNeighbors();
  gameOver = false;
  clickCount = 0;
  loop();
}

function draw() {
  background(0);
  finishedGame = true;

  for (let x = blocks.length - 1; x >= 0; x--) {
    for (let y = blocks[x].length - 1; y >= 0; y--) {
      
      
      if (clickCount == 2 && blocks[x][y].contains(mouseX, mouseY)) {
        clickCount = 0;
        blocks[x][y].markBlock();
      } else if (clickCount == 1 && blocks[x][y].contains(mouseX, mouseY) && !blocks[x][y].isBall) {
        blocks[x][y].showInside();
        clickCount = 0;

        //If neighbors is 0, expand while its not a bee
        if (blocks[x][y].neighbors == 0) {
          revealAround(x, y);
        }
        //Else If clicked on and is Ball
      } else if (clickCount == 1 && blocks[x][y].contains(mouseX, mouseY) && blocks[x][y].isBall) {
        clickCount = 0;
        revealAll();
      }
      
      if (!gameOver && !blocks[x][y].isBall && !blocks[x][y].isShown) {
        finishedGame = false;
      }
      
    }
  }

  for (let x = blocks.length - 1; x >= 0; x--) {
    for (let y = blocks[x].length - 1; y >= 0; y--) {
      blocks[x][y].show();
    }
  }

  if (gameOver) {
    fill(255, 0, 0);
    noStroke();
    textSize(150);
    textAlign(CENTER, CENTER);
    text('Game Over', width / 2, height / 2);
  } else if (finishedGame) {
    fill(0, 255, 0);
    noStroke();
    textSize(150);
    textAlign(CENTER, CENTER);
    text('Congrats\nYou Won!', width / 2, height / 2);
  }

  noLoop();

}

function calculateBlocks() {
  xLen = round(width / blockSize);
  yLen = round(height / blockSize);
}

function mousePressed() {
  if (mouseButton === RIGHT) {
    clickCount = 2;
  } else if (mouseButton === LEFT) {
    clickCount = 1;
  }
  loop();
}

function revealAll() {
  gameOver = true;
  
  for (let x = blocks.length - 1; x >= 0; x--) {
    for (let y = blocks[x].length - 1; y >= 0; y--) {
      blocks[x][y].showInside();
    }
  }
}

function revealAround(inputX, inputY) {

  for (let m = -1; m <= 1; m++) {
    for (let n = -1; n <= 1; n++) {
      i = round(inputX + m);
      j = round(inputY + n);
      if (i >= 0 && j >= 0 && i < blocks.length && j < blocks[round(inputX)].length) {
        neighbor = blocks[i][j];
        if (!neighbor.isBall && !neighbor.isShown) {
          neighbor.showInside();
        }
      }
    }
  }
}

function countNeighbors() {
  for (let x = blocks.length - 1; x >= 0; x--) {
    for (let y = blocks[x].length - 1; y >= 0; y--) {

      for (let m = -1; m <= 1; m++) {
        for (let n = -1; n <= 1; n++) {
          i = x + m;
          j = y + n;

          if (i >= 0 && j >= 0 && i < blocks.length && j < blocks[x].length && blocks[i][j].isBall) {
            blocks[x][y].neighbors++;
          }
        }
      }
    }
  }
}

function keyPressed() {
  if (keyCode === ENTER || keyCode === 32) {
    setup();
  }
}

document.oncontextmenu = function() {
  return false;
}