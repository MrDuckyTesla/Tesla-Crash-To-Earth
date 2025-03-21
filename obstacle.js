class Obstacle {
  constructor(x, y, wid, hgt, scaleNum, colorList, special=false, specialNum=0) {
    this.MediaPlayer = new Media();  // Used for collision
    this.x = x;
    this.y = y;
    this.wid = wid;
    this.hgt = hgt;
    this.scl = scaleNum;
    this.col = colorList;
    this.spl = special;
    this.num = specialNum;
    // Special number meanings:
    // 0: mustStayIn, Entities must stay in the box, opposite of normal
    // 1: platform, Entities can move through object, but is solid on top
    // 2: isMovable, Move object whenever moving
    // 3: walkThrough, Walk through object
    // 4: damagePlayer, Damage the player or entity
    
    // Make array of all ojects and their dimensions to check if collide
  }
  
  drawHitbox() {
    fill(this.col[0], this.col[1], this.col[2]);
    if (this.spl ) {
      switch (this.num) {
        case 0:
          // rect(this.x, this.y, this.wid, 3);
          // rect(this.x, this.y, 3, this.hgt);
          // rect(this.x, this.y+this.hgt-3, this.wid, 3);
          // rect(this.x+this.wid-3, this.y, 3, this.hgt);
          break;
        case 1:
          rect(this.x, this.y, 3, this.hgt);
          rect(this.x, this.y+this.hgt-3, this.wid, 3);
          rect(this.x+this.wid-3, this.y, 3, this.hgt);
          fill(255, 0, 0);
          rect(this.x, this.y, this.wid, 3);
          break;
      }
    }
    else {
      rect(this.x, this.y, this.wid, 3);
      rect(this.x, this.y, 3, this.hgt);
      rect(this.x, this.y+this.hgt-3, this.wid, 3);
      rect(this.x+this.wid-3, this.y, 3, this.hgt);
    }
    // fill(255, 0, 0, 25);
    // rect(this.x, this.y, this.wid, this.hgt);
  }

  // getBackHereOverworld() {
    // if (this.oX >= width + 28 * this.sclO) {
    //   this.oX = (28 * this.sclO * -1);
    // }
    // else if (this.oX <= 28 * this.sclO * -1) {
    //   this.oX = (28 * this.sclO + width);
    // }
    // if (this.oY >= height + 28 * this.sclO) {
    //   this.oY = (28 * this.sclO * -1);
    // }
    // else if (this.oY <=  28 * this.sclO * -1) {
    //   this.oY = (28 * this.sclO + height);
    // }
  // }
  
}