class Room {  // A Room is full of Obstacles, NPCs, and such
  constructor(player, scaleVal) {
    this.Player = player;
    this.scl = scaleVal;
    this.obstList = [];
    this.NPCList = [];
  }
  
  addBackgroundVars(backWid, backHgt, backgroundImg) {
    // This needs to be called before moveBackground()
    this.backWid = backWid; this.backHgt = backHgt;
    // this.widScr = widScr; this.hgtScr = hgtScr;
    this.backX = width/2-backWid/2;
    this.backY = height/2-backHgt/2;
    this.backgroundImg = backgroundImg;
    this.backBoolX = true;
    this.backBoolY = true;
  }
  
  addObstacle(x, y, wid, hgt, colorList, special=false, specialNum=0) {
    this.obstList.push(new Obstacle(x, y, wid, hgt, this.scl, colorList, special, specialNum));
  }
  
  addObstacleClass(obstacle) {
    this.obstList.push(obstacle);
  }
  
  addNPC() {
    
  }
  
  moveBackground() {
    if (this.backBoolX) {  // If background is moving X
      this.backX -= this.Player.moveX;
      if (this.backX <= width - this.backWid || this.backX >= 0) {
        this.backX = this.backX <= width - this.backWid? width - this.backWid : 0;
        this.backBoolX = false;
      }
    }
    else {  // Else moving character X
      this.Player.kinemat.over.x += this.Player.moveX;
      let temp = width/2 - this.Player.dimensions.over.calc/2;
      if ((this.Player.kinemat.over.x >= temp && this.backX >= 0) || (this.Player.kinemat.over.x <= temp && this.backX <= width - this.backWid)) {
        this.Player.kinemat.over.x = temp;
        this.backBoolX = true;
      }
    }
    if (this.backBoolY) {  // If background is moving Y
      this.backY -= this.Player.moveY;
      if (this.backY <= height - this.backHgt || this.backY >= 0) {
        this.backY = this.backY <= height - this.backHgt? height - this.backHgt : 0;
        this.backBoolY = false;
      }
    }
    else {  // Else moving character Y
      this.Player.kinemat.over.y += this.Player.moveY;
      let temp = height/2 - this.Player.dimensions.over.calc/2;
      if ((this.Player.kinemat.over.y >= temp && this.backY >= 0) || (this.Player.kinemat.over.y <= temp && this.backY <= height - this.backHgt)) {
        this.Player.kinemat.over.y = temp;
        this.backBoolY = true;
      }
    }
    image(this.backgroundImg, this.backX, this.backY);
  }
  
}