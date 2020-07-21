class Block {
  constructor(x, y, blockSize) {
    this.x = x;
    this.y = y;
    this.size = blockSize;
    this.isShown = false;
    this.marked = 0;

    this.neighbors = 0;

    this.isBall = false;
    if (random(1) <= 0.15) {
      this.isBall = true;
    }
  }

  show() {
    fill(255);
    stroke(128);
    rect(this.x, this.y, this.size, this.size);
    if (this.isShown) {
      this.marked = 0;
      fill(192);
      stroke(128);
      rect(this.x, this.y, this.size, this.size);
      if (this.isBall) {
        fill(255, 0, 0);
        ellipse(this.x + this.size / 2, this.y + this.size / 2, this.size / 2);
      } else {
        if (this.neighbors != 0) {
          fill(numberColors[this.neighbors-1]);
          noStroke();
          textSize(width * height / 20000);
          textAlign(CENTER,CENTER);
          text(this.neighbors, this.x + this.size / 2, this.y + this.size / 2);
        }
      }
    }
    if (this.marked == 1) {
      fill(255, 100, 0);
      ellipse(this.x + this.size / 2, this.y + this.size / 2, this.size / 2);
      fill(0);
      textSize(width * height / 30000);
      textAlign(CENTER, CENTER);
      text('!', this.x + this.size / 2, this.y + this.size / 2);
    } else if (this.marked == 2) {
      fill(100, 150, 255);
      ellipse(this.x + this.size / 2, this.y + this.size / 2, this.size / 2);
      fill(0);
      textSize(width * height / 30000);
      textAlign(CENTER, CENTER);
      text('?', this.x + this.size / 2, this.y + this.size / 2);
    }
  }


  contains(inputX, inputY) {
    if (inputX > this.x && inputX < this.x + this.size) {
      if (inputY > this.y && inputY < this.y + this.size) {
        return true;
      }
    }
  }

  showInside() {
    this.isShown = true;
    if (this.neighbors == 0) {
      revealAround(this.x / this.size, this.y / this.size);
    }
  }

  markBlock() {
    if (this.marked == 0) {
      this.marked = 1;
    } else if (this.marked == 1) {
      this.marked = 2;
    } else if (this.marked == 2) {
      this.marked = 0;
    }
  }

}