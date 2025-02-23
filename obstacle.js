class Obstacle {
  constructor(x, y, wid, hgt, mustStayIn=false, isMovable=false, walkThrough=false, damagePlayer=false) {
    this.x = x;
    this.y = y;
    this.wid = wid;
    this.hgt = hgt;
    this.mstSty = mustStayIn  // Entities must stay in the box, opposite of normal
    this.isMve = isMovable;  // Move object whenever moving
    this.wlkThu = walkThrough;  // Walk through object
    this.dmgPlr = damagePlayer;  // Damages player, would be used in battle only
    // Make array of all ojects and their dimensions to check if collide
  }

  checkCollide(x, y, wid, hgt) {  // Platforms
    if ((x + wid > this.x || x < this.x + this.wid) && !this.wlkThu) {
        console.log("Collide");
      }
    // if ((x + wid * scl >= width) || (x <= 0) || (y + hgt * scl >= height) || (y <=  0))
    //   return true;
    // return false;
  }
  
  drawHitbox() {
    fill(255, 0, 0, 25);
    rect(this.x, this.y, this.wid, this.hgt);
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
  
//   showHitbox() {
//     
//   }
  
}