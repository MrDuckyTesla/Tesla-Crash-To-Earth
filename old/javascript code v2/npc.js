class NonPlayerCharacter extends Character {
  constructor(Player, oX, oY, bX, bY, scl, ovrImg, batImg, col1, col2, showB=true) {
    super(oX, oY, Player.RoomVar.backX, Player.RoomVar.backY, bX, bY, Player.RoomVar.backWid, Player.RoomVar.backHgt, scl, ovrImg, batImg, col1, col2);
    // We can check if the character is off screen, and if so, dont show them
    this.showB = showB;
    this.Player = Player;
  }
  
  show() {
    if (this.showB) {
      this.world.over.curr = this.Player.world.over.curr;
      this.special.sprint = this.Player.special.sprint;
      super.actualX = this.Player.RoomVar.backX;
      super.actualY = this.Player.RoomVar.backY;
      super.show();
    }
  }
  
  move() {
    super.move();
    if (this.world.over.curr) {  // If in overworld
      this.kinemat.over.x += this.moveX;
      this.kinemat.over.y += this.moveY;
      this.world.state.over = 1;
      // this.special.sprint = false;  // Set sprint to is Shift is pressed
      // this.walkTowardsPoint(this.Player.kinemat.over.x, this.Player.kinemat.over.y, 28*3)
    }
    else {  // Battle
      if(frameCount % 150 > 100) this.special.jump.bool = true;  // Jump
      else if (frameCount % 150 > 50) this.special.fall.bool = true;  // Fast fall
      else if (frameCount % 150 > 0) this.special.dash.bool = true;  // Dash
      if (frameCount % 150 >= 75) {  // Walking right
        this.world.dir.batt.curr = 0;
        this.world.state.batt = 2;  
      }
      else if (frameCount % 150 < 40) {  // Walking left
        this.world.dir.batt.curr = 1;
        this.world.state.batt = 2;
      }
      else this.world.state.batt = 1;  // Idle
    }
  }
  
  follow(Character) {
    
  }
  
  walkTowardsChar(Character) {
    
  }
  
  walkTowardsPlayer() {
    
  }
  
  walkTowardsPoint(x, y, rad) {
    let tempX = this.kinemat.over.x + this.actualX;
    let tempY = this.kinemat.over.y + this.actualY;
    if (floor(abs(tempX - x)) <= abs(this.moveX)) this.kinemat.over.x = x - this.actualX;
    if (floor(abs(tempY - y)) <= abs(this.moveY)) this.kinemat.over.y = y - this.actualY;
    console.log(floor(abs(tempX - x)), abs(this.moveX), floor(abs(tempX - x)) <= abs(this.moveX))
    // circle( x - this.actualX,  y - this.actualY, 10)
    if (dist(x, y, tempX, tempY) >= rad) {
      this.world.state.over = 3;
      // Check direction
      if (tempX < x && tempY < y) this.world.dir.over.curr = 1;  // Walk Right - Down
      else if (tempY < y && tempX > x) this.world.dir.over.curr = 3;  // Walk Down - Left
      else if (tempX > x && tempY > y) this.world.dir.over.curr = 5;  // Left - Up
      else if (tempY > y && tempX < x) this.world.dir.over.curr = 7;  // Up - Right
      else if (tempX < x) this.world.dir.over.curr = 0;  // Walk Right
      else if (tempY < y) this.world.dir.over.curr = 2;  // Walk Down
      else if (tempX > x) this.world.dir.over.curr = 4;  // Walk Left
      else if (tempY > y) this.world.dir.over.curr = 6;  // Walk Up
    }
    else this.world.state.over = 1;
  }
  
  walkAroundRandomly(radius) {
    
  }
  
  dialogue(txt) {
    
  }
  
}