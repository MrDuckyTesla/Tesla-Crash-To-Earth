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
    // 2: isMovableO, Move object whenever walking into, overworld
    // 3: isMovableB, Move object whenever walking into, battle
    // 4: damagePlayer, Damage the player or entity
    if (special) {
      this.collideBool = false;
      this.pX = x;
      this.pY = y;
      this.vX = 0;
      this.vY = 0;
    }
  }
  
  drawObst() {
    fill(this.col[0], this.col[1], this.col[2]);
    if (this.spl) {
      switch (this.num) {
        case 0:
          rect(this.x-this.scl, this.y-this.scl, this.wid+this.scl, this.scl);
          rect(this.x-this.scl, this.y, this.scl, this.hgt+this.scl);
          rect(this.x, this.y+this.hgt, this.wid+this.scl, this.scl);
          rect(this.x+this.wid, this.y-this.scl, this.scl, this.hgt+this.scl);
          break;
        case 1:
          fill(this.col[0]/2, this.col[1]/2, this.col[2]/2);
          this.normalDraw();
          fill(this.col[0], this.col[1], this.col[2]);
          rect(this.x, this.y, this.wid, this.scl);
          break;
        case 2:
          this.normalDraw();
          break;
      }
    }
    else {
      this.normalDraw();
    }
  }
  
  drawHitbox() {
    fill(255, 0, 0, 25);
    rect(this.x, this.y, this.wid, this.hgt);
  }
  
  normalDraw() {
    rect(this.x, this.y, this.wid, this.scl);
    rect(this.x, this.y, this.scl, this.hgt);
    rect(this.x, this.y+this.hgt-this.scl, this.wid, this.scl);
    rect(this.x+this.wid-this.scl, this.y, this.scl, this.hgt);
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