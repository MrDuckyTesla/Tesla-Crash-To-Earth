class Obstacle {
  constructor(x, y, wid, hgt, mustStayIn=false, isMovable=false, walkThrough=false, damagePlayer=false) {
    this.MediaPlayer = new Media();  // Used for collision
    this.x = x;
    this.y = y;
    this.wid = wid;
    this.hgt = hgt;
    this.mstSty = mustStayIn;  // Entities must stay in the box, opposite of normal
    this.isMve = isMovable;  // Move object whenever moving
    this.wlkThu = walkThrough;  // Walk through object
    this.dmgPlr = damagePlayer;  // Damages player, would be used in battle only
    // Make array of all ojects and their dimensions to check if collide
  }

  checkCollide(x, y, wid, hgt) {  // Platforms
    // if (this.mstSty) this.roomCollide = this.MediaPlayer.nRectRectCollide(this.RoomVar.obstList[i].x, this.RoomVar.obstList[i].y, this.RoomVar.obstList[i].wid, this.RoomVar.obstList[i].hgt, min(this.kinemat.batt.pX, this.kinemat.batt.x), min(this.kinemat.batt.pY, this.kinemat.batt.y), abs(this.kinemat.batt.x - this.kinemat.batt.pX) +9*this.sclB, abs(this.kinemat.batt.y - this.kinemat.batt.pY)+13* this.sclB);
    // else this.roomCollide = this.MediaPlayer.rectRectCollide(this.RoomVar.obstList[i].x, this.RoomVar.obstList[i].y, this.RoomVar.obstList[i].wid, this.RoomVar.obstList[i].hgt, min(this.kinemat.batt.pX, this.kinemat.batt.x), min(this.kinemat.batt.pY, this.kinemat.batt.y), abs(this.kinemat.batt.x - this.kinemat.batt.pX) +9*this.sclB, abs(this.kinemat.batt.y - this.kinemat.batt.pY)+13* this.sclB);
    // if (this.roomCollide) {
    //   // Only do things if rectangle detects collision
    //   line(this.kinemat.batt.x+(9*this.sclB)/2,this.kinemat.batt.y+(13*this.sclB)/2, this.RoomVar.obstList[i].x+this.RoomVar.obstList[i].wid/2, this.RoomVar.obstList[i].y+this.RoomVar.obstList[i].hgt/2)
    // }
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