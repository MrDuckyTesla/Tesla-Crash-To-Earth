class Room {  // A Room is full of Obstacles, NPCs, and such
  constructor(player) {
    this.obstList = [];
    this.NPCList = [];
  }
  
  addObstacle(x, y, wid, hgt, mstSty=false, isMov=false, wlkThu=false, dmgPlr=false) {
    this.obstList.push(new Obstacle(x, y, wid, hgt, mstSty, isMov, wlkThu, dmgPlr));
  }
  
  addObstacleClass(obstacle) {
    this.obstList.push(obstacle);
  }
  
  addNPC() {
    
  }
  
}