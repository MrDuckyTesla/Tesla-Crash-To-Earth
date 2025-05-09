class Player extends Character {
  constructor(oX, oY, bX, bY, scl, overSpeed, battSpeed, ovrImg, batImg, backgroundImg) {
    super(oX, oY, 0, 0, bX, bY, width, height, scl, overSpeed, battSpeed, ovrImg, batImg);
    this.click = {jump: true, fall: true, dash: true};
    this.OverSpeed = overSpeed;
    this.BattSpeed = battSpeed;
  }
  
  move() {
    super.move();  // Move and animate character
    if (this.world.over.curr) {  // If in overworld
      if (keyIsDown(88))  this.world.state.over = 2;
      else if (keyIsDown(68) || keyIsDown(39) || keyIsDown(83) || keyIsDown(40) || keyIsDown(65) || keyIsDown(37) || keyIsDown(87) || keyIsDown(38)) this.world.state.over = 3;
      else this.world.state.over = 1;
      this.special.sprint = keyIsDown(16);  // Set sprint to is Shift is pressed
      // Check direction
      if ((keyIsDown(68) || keyIsDown(39)) && (keyIsDown(83) || keyIsDown(40))) this.world.dir.over.curr = 1;  // Walk Right - Down
      else if ((keyIsDown(83) || keyIsDown(40)) && (keyIsDown(65) || keyIsDown(37))) this.world.dir.over.curr = 3;  // Walk Down - Left
      else if ((keyIsDown(65) || keyIsDown(37)) && (keyIsDown(87) || keyIsDown(38))) this.world.dir.over.curr = 5;  // Left - Up
      else if ((keyIsDown(87) || keyIsDown(38)) && (keyIsDown(68) || keyIsDown(39))) this.world.dir.over.curr = 7;  // Up - Right
      else if (keyIsDown(68) || keyIsDown(39)) this.world.dir.over.curr = 0;  // Walk Right
      else if (keyIsDown(83) || keyIsDown(40)) this.world.dir.over.curr = 2;  // Walk Down
      else if (keyIsDown(65) || keyIsDown(37)) this.world.dir.over.curr = 4;  // Walk Left
      else if (keyIsDown(87) || keyIsDown(38)) this.world.dir.over.curr = 6;  // Walk Up
    }
    else {  // Battle
      if((keyIsDown(32) || keyIsDown(87) || keyIsDown(38)) && this.click.jump) {  // Jump
        this.special.jump.bool = true;
        this.click.jump = false;
      }
      else if ((keyIsDown(40) || keyIsDown(83)) && this.click.fall) {  // Fast fall
        this.special.fall.bool = true;
        this.click.fall = false;
      }
      else if (keyIsDown(16) && this.click.dash) {
        this.special.dash.bool = true;
        this.click.dash = false;
      }
      if (keyIsDown(68) || keyIsDown(39)) {
        this.world.dir.batt.curr = 0;
        this.world.state.batt = 2;  // Walking right
      }
      else if (keyIsDown(65) || keyIsDown(37)) {
        this.world.dir.batt.curr = 1;
        this.world.state.batt = 2;  // Walking left
      }
      else this.world.state.batt = 1;
    }
  }
  
  collisionOver(state, x1=0, y1=0, x2=width, y2=height) {
    this.world.state.over = 1;
    if ((this.world.dir.over.curr == 0 || this.world.dir.over.curr == 1 || this.world.dir.over.curr == 7) && this.kinemat.over.x + this.overSpeed > x2 - this.dimensions.over.calc) {
      this.kinemat.over.x = x2 - this.dimensions.over.calc;
      return this.world.dir.over.curr;  // Right
    }
    if ((this.world.dir.over.curr == 1 || this.world.dir.over.curr == 2 || this.world.dir.over.curr == 3) && this.kinemat.over.y + this.overSpeed > y2 - this.dimensions.over.calc) {
      this.kinemat.over.y = y2 - this.dimensions.over.calc;
      return this.world.dir.over.curr;  // Down
    }
    if ((this.world.dir.over.curr == 3 || this.world.dir.over.curr == 4 || this.world.dir.over.curr == 5) && this.kinemat.over.x - this.overSpeed < x1) {
      this.kinemat.over.x = x1;
      return this.world.dir.over.curr;  // Left
    }
    if ((this.world.dir.over.curr == 5 || this.world.dir.over.curr == 6 || this.world.dir.over.curr == 7) && this.kinemat.over.y - this.overSpeed < y1) {
      this.kinemat.over.y = y1;
      return this.world.dir.over.curr;  // Up
    }
    this.world.state.over = state;
  }
  
  attack() {  // Maybe add to move()?
    
  }
}