class Player extends Character {
  constructor(oX, oY, bX, bY, overSpeed, battSpeed, ovrImg, batImg) {
    super(oX, oY, bX, bY, overSpeed, battSpeed, ovrImg, batImg);
    this.clickJump = true;  this.clickFall = true;  this.clickDash = true;
  }
  
  move() {
    super.move();
    if (this.overWorld) {
      if (keyIsDown(88))  super.charState = 2;
      else if (keyIsDown(68) || keyIsDown(39) || keyIsDown(83) || keyIsDown(40) || keyIsDown(65) || keyIsDown(37) || keyIsDown(87) || keyIsDown(38))
        super.charState = 3;
      else super.charState = 1;
      super.sprint = keyIsDown(16);  // Set sprint to is Shift is pressed
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
      if((keyIsDown(32) || keyIsDown(87) || keyIsDown(38)) && this.clickJump) {  // Jump
        super.jump = true;  super.inAir = true;
        this.clickJump = false;
      }
      else if ((keyIsDown(40) || keyIsDown(83)) && this.clickFall) {  // Fast fall
        super.fastFall = true;
        this.clickFall = false;
      }
      else if (keyIsDown(16) && this.clickDash) {
        super.dash = true;
        this.clickDash = false;
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