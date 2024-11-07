class Player extends Character {
  constructor(oX, oY, bX, bY, overSpeed, battSpeed, ovrImg, batImg) {
    super(oX, oY, bX, bY, overSpeed, battSpeed, ovrImg, batImg);
    this.click = {jump: true, fall: true, dash: true};
    // this.clickJump = true;  this.clickFall = true;  this.clickDash = true;
  }
  
  move() {
    super.move();
    if (this.overWorld) {
      if (keyIsDown(88))  super.charState = 2;
      else if (keyIsDown(68) || keyIsDown(39) || keyIsDown(83) || keyIsDown(40) || keyIsDown(65) || keyIsDown(37) || keyIsDown(87) || keyIsDown(38))
        super.charState = 3;
      else super.charState = 1;
      this.special.sprint = keyIsDown(16);  // Set sprint to is Shift is pressed
      // Check direction
      if ((keyIsDown(68) || keyIsDown(39)) && (keyIsDown(83) || keyIsDown(40))) super.dir = 1;  // Walk Right - Down
      else if ((keyIsDown(83) || keyIsDown(40)) && (keyIsDown(65) || keyIsDown(37))) super.dir = 3;  // Walk Down - Left
      else if ((keyIsDown(65) || keyIsDown(37)) && (keyIsDown(87) || keyIsDown(38))) super.dir = 5;  // Left - Up
      else if ((keyIsDown(87) || keyIsDown(38)) && (keyIsDown(68) || keyIsDown(39))) super.dir = 7;  // Up - Right
      else if (keyIsDown(68) || keyIsDown(39)) super.dir = 0;  // Walk Right
      else if (keyIsDown(83) || keyIsDown(40)) super.dir = 2;  // Walk Down
      else if (keyIsDown(65) || keyIsDown(37)) super.dir = 4;  // Walk Left
      else if (keyIsDown(87) || keyIsDown(38)) super.dir = 6;  // Walk Up
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
        super.dir = 0;
        super.charState = 2;  // Walking right
      }
      else if (keyIsDown(65) || keyIsDown(37)) {
        super.dir = 1;
        super.charState = 2;  // Walking left
      }
      else super.charState = 1;
    }
  }
  
  attack() {  // Maybe add to move()?
    
  }
  
}