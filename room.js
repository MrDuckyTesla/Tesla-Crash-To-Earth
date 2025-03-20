class Room {  // A Room is full of Obstacles, NPCs, and such
  constructor(player, scaleVal) {
    this.Player = player;
    this.scl = scaleVal;
    this.obstList = [];
    this.NPCList = [];
  }
  
  addObstacle(x, y, wid, hgt, colorList, special=false, specialNum=0) {
    this.obstList.push(new Obstacle(x, y, wid, hgt, this.scl, colorList, special, specialNum));
  }
  
  addObstacleClass(obstacle) {
    this.obstList.push(obstacle);
  }
  
  addNPC() {
    
  }
  
}