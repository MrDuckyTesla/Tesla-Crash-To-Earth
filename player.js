class Player extends Character {
  constructor(oX, oY, bX, bY, overSpeed, battSpeed, ovrImg, batImg) {
    super(oX, oY, bX, bY, overSpeed, battSpeed, ovrImg, batImg);
    this.clickAgain = true;
  }
  
  move() {
    super.move();
    if (this.overWorld) {
      if (keyIsDown(88))
        super.charState = 2;
      else if (keyIsDown(68) || keyIsDown(39) || keyIsDown(83) || keyIsDown(40) || keyIsDown(65) || keyIsDown(37) || keyIsDown(87) || keyIsDown(38))
        super.charState = 3;
      else 
        super.charState = 1;
      // Set sprint to is Shift is pressed
      super.sprint = keyIsDown(16);
        // Check direction
      if ((keyIsDown(68) || keyIsDown(39)) && (keyIsDown(83) || keyIsDown(40)))  // Walk Right - Down
        super.dir = 1;
      else if ((keyIsDown(83) || keyIsDown(40)) && (keyIsDown(65) || keyIsDown(37)))  // Walk Down - Left
        super.dir = 3;
      else if ((keyIsDown(65) || keyIsDown(37)) && (keyIsDown(87) || keyIsDown(38)))  // Left - Up
        super.dir = 5;
      else if ((keyIsDown(87) || keyIsDown(38)) && (keyIsDown(68) || keyIsDown(39)))  // Up - Right
        super.dir = 7;
      else if (keyIsDown(68) || keyIsDown(39))  // Walk Right
        super.dir = 0;
      else if (keyIsDown(83) || keyIsDown(40))  // Walk Down
        super.dir = 2;
      else if (keyIsDown(65) || keyIsDown(37))  // Walk Left
        super.dir = 4;
      else if (keyIsDown(87) || keyIsDown(38))  // Walk Up
        super.dir = 6;
    }
    else {  // Battle
      if (!this.inAir) this.waitTIll = 0;
      if((keyIsDown(32) || keyIsDown(87) || keyIsDown(38)) && this.clickAgain) {  // Jump
        super.jump = true;  super.inAir = true;
        this.clickAgain = false;
      }
      else if (keyIsDown(68) || keyIsDown(39)) {
        super.dir = 0;
        super.charState = 2;  // Walking right
      }
      else if (keyIsDown(65) || keyIsDown(37)) {
        super.dir = 1;
        super.charState = 2;  // Walking left
      }
      else
        super.charState = 1;
    }
  }
  
}