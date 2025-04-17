class NonPlayerCharacter extends Character {
  constructor(Player, oX, oY, bX, bY, scl, ovrImg, batImg, col1, col2, showB=true) {
    super(oX, oY, Player.RoomVar.backX, Player.RoomVar.backY, bX, bY, Player.RoomVar.backWid, Player.RoomVar.backHgt, scl, ovrImg, batImg, col1, col2);
    // We can check if the character is off screen, and if so, dont show them
    this.showB = showB;
  }
  
  show(Player) {
    if (this.showB) {
      this.world.over.curr = Player.world.over.curr;
      this.special.sprint = Player.special.sprint;
      super.actualX = Player.RoomVar.backX;
      super.actualY = Player.RoomVar.backY;
      super.show();
    }
  }
  
  move() {
    super.move();
    if (this.world.over.curr) {  // If in overworld
      this.kinemat.over.x += this.moveX;
      this.kinemat.over.y += this.moveY;
      if (false)  this.world.state.over = 2;
      else if (true) this.world.state.over = 3;
      else this.world.state.over = 1;
      // this.special.sprint = false;  // Set sprint to is Shift is pressed
      // Check direction
      if (true) this.world.dir.over.curr = 1;  // Walk Right - Down
      else if (false) this.world.dir.over.curr = 3;  // Walk Down - Left
      else if (false) this.world.dir.over.curr = 5;  // Left - Up
      else if (false) this.world.dir.over.curr = 7;  // Up - Right
      else if (false) this.world.dir.over.curr = 0;  // Walk Right
      else if (false) this.world.dir.over.curr = 2;  // Walk Down
      else if (false) this.world.dir.over.curr = 4;  // Walk Left
      else if (false) this.world.dir.over.curr = 6;  // Walk Up
    }
  }
  
  follow(Character) {
    
  }
  
  walkTowards(Character) {
    
  }
  
  walkAroundRandomly(radius) {
    
  }
  
  dialogue(txt) {
    
  }
  
}