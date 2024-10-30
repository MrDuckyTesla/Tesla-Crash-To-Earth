class Obstacle {
  constructor(isMovable, walkThrough, damagePlayer) {
    this.isMovable = isMovable;  // Move object whenever moving
    this.walkThrough = walkThrough;  // Walk through object
    this.damagePlayer = damagePlayer;  // Damages player in battle only (basically an attack)
    // Make array of all ojects and their dimensions to check if collide
  }
  overWorldCollision(x, y, wid, hgt, scl) {  // Obstructions
    // if ((x + wid * scl >= width) || (x <= 0) || (y + hgt * scl >= height) || (y <=  0))
    //   return true;
    // return false;
  }
  
  battleCollision(x, y, wid, hgt, scl) {  // Platforms
    // if ((x + wid * scl >= width) || (x <= 0) || (y + hgt * scl >= height) || (y <=  0))
    //   return true;
    // return false;
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