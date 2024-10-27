class Character {
  // Get basic information about the image
  constructor(oX, oY, bX, bY, ovrImg, batImg) {
    this.oX = oX;  this.oY = oY;  // Overworld Characters XY Coords
    this.bX = bX;  this.bY = bY;  // Battle Characters XY Coords
    this.impulse = 17;  this.overWorld = true; // Controls if Character is battling
    this.velocitX = 0;  this.velocitY = 0;  // Characters XY Velocity
    this.accelerX = 0;  this.accelerY = 1;  // Characters XY Acceleration
    this.friction = 0.8;  // Friction
    this.overSpeed = 3;  this.SpeedCap = 6;  // How fast the overworld is
    this.overAnimSpeed = 12;  this.AnimSpeedCap = 6;  // Animation speed limit in the overworld
    this.battSpeed = 2.5;  this.battAnimSpeed = 5;  // Battle Characters Speed
    this.sprint = false;  // Controls if the character goes x2 speed
    this.ovrImg = ovrImg;  this.batImg = batImg;  // Characters Spritesheets
    this.MediaPlayer = new Media();  // Animates and colors Spritesheets 
    this.charState = 0;  this.lastCharState = 0;  // What animation the character is currently doing
    this.dir = 0;  this.lastDir = 0;  // The direction that the character is facing
    this.sclO = 3;  this.sclB = 4;  // Scale of Character (Size)
    this.jump = false;  this.jumpCount = 2;  this.inAir = false;// Jump Variables
    this.changeAnimation = false; 
    this.ovrList = this.MediaPlayer.preCompile(ovrImg, [[180, 157, 130, 31], [187, 171], [190, 163, 140]]);
    this.batList = this.MediaPlayer.preCompile(batImg, [[105, 85, 34], [104]]);
  }
  show() {
    this.move();
    // Color :D (this took WAY too long)
    if (frameCount == 1) {
      this.MediaPlayer.changeColor(this.ovrImg, this.ovrList, [111, 111, 255, 255, 111, 111, 239, 211, 39], [[180, 157, 130, 31], [187, 171], [190, 163, 140]]);  // Overworld
      this.MediaPlayer.changeColor(this.batImg, this.batList, [111, 111, 255, 255, 111, 111], [[105, 85, 34], [104]]);  // Battle
    }
    // Seizure warning if you uncomment the next 2 lines
    // this.MediaPlayer.changeColor(this.ovrImg, this.ovrList, [round(random(255)), round(random(255)), round(random(255)), round(random(255)), round(random(255)), round(random(255)), round(random(255)), round(random(255)), round(random(255))], [[180, 157, 130, 31], [187, 171], [190, 163, 140]]);  // Overworld
    // this.MediaPlayer.changeColor(this.batImg, this.batList, [round(random(255)), round(random(255)), round(random(255)), round(random(255)), round(random(255)), round(random(255))], [[105, 85, 34], [104]]);  // Battle (fun)
  }  
  
  move() {
    // Add switch statements
    this.changeAnimation = this.lastDir == this.dir;  // Check if new direction
    if (this.overWorld) {
        if (this.sprint) {  // If sprinting, double all speeds
        this.overSpeed *= 2;
        this.overAnimSpeed /= 2;
      }
      if (this.charState == 1) {  // Overworld Idle
        switch (this.dir) {
          case 0:  // Right
            this.MediaPlayer.animate(this.ovrImg, this.oX, this.oY, 28, 28, this.sclO, 0, 1, this.overAnimSpeed, this.changeAnimation);
            break;
          case 1:  // Right - Down
            this.MediaPlayer.animate(this.ovrImg, this.oX, this.oY, 28, 28,this.sclO, 2, 3, this.overAnimSpeed, this.changeAnimation);
            break;
          case 2:  // Down
            this.MediaPlayer.animate(this.ovrImg, this.oX, this.oY, 28, 28, this.sclO, 4, 5, this.overAnimSpeed, this.changeAnimation);
            break;
          case 3:  // Down - Left
            this.MediaPlayer.animate(this.ovrImg, this.oX, this.oY, 28, 28, this.sclO, 6, 7, this.overAnimSpeed, this.changeAnimation);
            break;
          case 4:  // Left
            this.MediaPlayer.animate(this.ovrImg, this.oX, this.oY, 28, 28, this.sclO, 8, 9, this.overAnimSpeed, this.changeAnimation);
            break;
          case 5:  // Left - Up
            this.MediaPlayer.animate(this.ovrImg, this.oX, this.oY, 28, 28, this.sclO, 10, 11, this.overAnimSpeed, this.changeAnimation);
            break;
          case 6:  // Up
            this.MediaPlayer.animate(this.ovrImg, this.oX, this.oY, 28, 28, this.sclO, 12, 13, this.overAnimSpeed, this.changeAnimation);
            break;
          case 7:  // Up - Right
            this.MediaPlayer.animate(this.ovrImg, this.oX, this.oY, 28, 28, this.sclO, 14, 15, this.overAnimSpeed, this.changeAnimation);
            break;
        }
      }
      else if (this.charState == 2) {  // Sword Swing
        switch (this.dir) {
          case 0:  // Right
            this.MediaPlayer.animate(this.ovrImg, this.oX += this.overSpeed/2, this.oY, 28, 28, this.sclO, 48, 51, this.overAnimSpeed, this.changeAnimation);
            break;
          case 1:  // Right - Down
            this.MediaPlayer.animate(this.ovrImg, this.oX += this.overSpeed/2, this.oY += this.overSpeed/2, 28, 28, this.sclO, 52, 55, this.overAnimSpeed, this.changeAnimation);
            break;
          case 2:  // Down
            this.MediaPlayer.animate(this.ovrImg, this.oX, this.oY += this.overSpeed/2, 28, 28, this.sclO, 56, 59, this.overAnimSpeed, this.changeAnimation);
            break;
          case 3:  // Down - Left
            this.MediaPlayer.animate(this.ovrImg, this.oX -= this.overSpeed/2, this.oY += this.overSpeed/2, 28, 28, this.sclO, 60, 63, this.overAnimSpeed, this.changeAnimation);
            break;
          case 4:  // Left
            this.MediaPlayer.animate(this.ovrImg, this.oX -= this.overSpeed/2, this.oY, 28, 28, this.sclO, 64, 67, this.overAnimSpeed, this.changeAnimation);
            break;
          case 5:  // Left - Up
            this.MediaPlayer.animate(this.ovrImg, this.oX -= this.overSpeed/2, this.oY -= this.overSpeed/2, 28, 28, this.sclO, 68, 71, this.overAnimSpeed, this.changeAnimation);
            break;
          case 6:  // Up
            this.MediaPlayer.animate(this.ovrImg, this.oX, this.oY -= this.overSpeed/2, 28, 28, this.sclO, 72, 75, this.overAnimSpeed, this.changeAnimation);
            break;
          case 7:  // Up - Right
            this.MediaPlayer.animate(this.ovrImg, this.oX += this.overSpeed/2, this.oY -= this.overSpeed/2, 28, 28, this.sclO, 76, 79, this.overAnimSpeed, this.changeAnimation);
            break;
        }
      }
      else if (this.charState == 3) {  // Overworld Walk
        switch (this.dir) {
          case 0:  // Right
            this.MediaPlayer.animate(this.ovrImg, this.oX += this.overSpeed, this.oY, 28, 28, this.sclO, 16, 19, this.overAnimSpeed, this.changeAnimation);
            break;
          case 1:  // Right - Down
            this.MediaPlayer.animate(this.ovrImg, this.oX += this.overSpeed, this.oY += this.overSpeed, 28, 28, this.sclO, 20, 23, this.overAnimSpeed, this.changeAnimation);
            break;
          case 2:  // Down
            this.MediaPlayer.animate(this.ovrImg, this.oX, this.oY += this.overSpeed, 28, 28, this.sclO, 24, 27, this.overAnimSpeed, this.changeAnimation);
            break;
          case 3:  // Down - Left
            this.MediaPlayer.animate(this.ovrImg, this.oX -= this.overSpeed, this.oY += this.overSpeed, 28, 28, this.sclO, 28, 31, this.overAnimSpeed, this.changeAnimation);
            break;
          case 4:  // Left
            this.MediaPlayer.animate(this.ovrImg, this.oX -= this.overSpeed, this.oY, 28, 28, this.sclO, 32, 35, this.overAnimSpeed, this.changeAnimation);
            break;
          case 5:  // Left - Up
            this.MediaPlayer.animate(this.ovrImg, this.oX -= this.overSpeed, this.oY -= this.overSpeed, 28, 28, this.sclO, 36, 39, this.overAnimSpeed, this.changeAnimation);
            break;
          case 6:  // Up
            this.MediaPlayer.animate(this.ovrImg, this.oX, this.oY -= this.overSpeed, 28, 28, this.sclO, 40, 43, this.overAnimSpeed, this.changeAnimation);
            break;
          case 7:  // Up - Right
            this.MediaPlayer.animate(this.ovrImg, this.oX += this.overSpeed, this.oY -= this.overSpeed, 28, 28, this.sclO, 44, 47, this.overAnimSpeed, this.changeAnimation);
            break;
        }
      }
      // Reset speeds if not spriting
      if (this.sprint || (this.overSpeed >= this.SpeedCap && this.overAnimSpeed <= this.AnimSpeedCap)) {
        this.overSpeed /= 2;
        this.overAnimSpeed *= 2;
      }  // Maybe add overworld sword? (maybe player only)
      // Add new character states here
      
    // Battle states below here
    }
    else {
      // console.log(this.accelerX);
      if (abs(this.accelerX) > this.battSpeed && this.accelerX != 0) this.accelerX = this.battSpeed * (this.accelerX / abs(this.accelerX));  // Cap the friction/speed
      if (abs(this.velocitX) <= 0.00001) this.velocitX = 0;  // We cant see the difference of speed
      this.velocitX += this.accelerX;  // Apply acceleration
      this.velocitX *= this.friction;  // Apply friction
      this.battAnimSpeed = 5;  // Reset battle animation speed
      if (this.dir > 2) this.dir = 0;  // Make sure to only have battle directions
      // Battle Idle
      if (this.charState == 1) {
        this.accelerX = 0;
        this.jumpFun();
        if (this.dir == 0 && !this.inAir)  // Right
          this.MediaPlayer.animate(this.batImg, this.bX += this.velocitX, this.bY, 9, 13, this.sclB, 0, 1, this.battAnimSpeed * 2, this.changeAnimation);
        else if (this.dir == 1 && !this.inAir)  // Left
          this.MediaPlayer.animate(this.batImg, this.bX += this.velocitX, this.bY, 9, 13, this.sclB, 2, 3, this.battAnimSpeed * 2, this.changeAnimation);
      }
      // Battle Run
      else if (this.charState == 2) {
        this.accelerX += this.dir == 0 ? this.battSpeed : -this.battSpeed;
        this.jumpFun();
        this.battAnimSpeed = round(3 / (this.accelerX/7));  // Animation speed gets faster as well
        if (this.dir == 0 && !this.inAir)  // Right
          this.MediaPlayer.animate(this.batImg, this.bX += this.velocitX, this.bY, 9, 13, this.sclB, 4, 11, this.battAnimSpeed, this.changeAnimation);
        else if (this.dir == 1 && !this.inAir)  // Left
          this.MediaPlayer.animate(this.batImg, this.bX += this.velocitX, this.bY, 9, 13, this.sclB, 12, 19, this.battAnimSpeed, this.changeAnimation);
      }
    }
      // Update variables
      this.lastDir = this.dir;  // Get the last diection
      this.lastCharState = this.charState;  // Get last state
      this.prevOX = this.oX;  this.prevOY = this.oY;  // Get last Overworld XY Coords
      this.prevBX = this.bX;  this.prevBY = this.bY;  // Get last  Battle XY Coords
  }
  
  collideWallPredict(wallX1=0, wallY1=0, wallX2=width, wallY2=height) { // Check if overworld will hit wall
    return -1;
  }
  
  jumpFun(speed) {
    if (this.jump && this.jumpCount > 0) {  // If has enough jumps, jump
      this.velocitY = 0;
      this.velocitY -= this.impulse;
      this.jumpCount -= 1;
      this.jump = false;
    }
    if (this.bY + this.velocitY > height - 26*2) {  // Use a function to detect what we consider "ground"
      this.velocitY = 0;
      this.bY = height - 26*2;
      this.jumpCount = 2;  
      this.inAir = false;
    }
      if (this.dir == 0 && this.inAir)  // Right
        this.MediaPlayer.animate(this.batImg, this.bX += this.velocitX, this.bY += this.velocitY, 9, 13, this.sclB, 20, 24, this.battAnimSpeed, this.changeAnimation);
      else if (this.dir == 1 && this.inAir)  // Left
        this.MediaPlayer.animate(this.batImg, this.bX += this.velocitX, this.bY += this.velocitY, 9, 13, this.sclB, 25, 29, this.battAnimSpeed, this.changeAnimation);
    this.velocitY += this.accelerY;
  }
  
  leaveTrails(num) {  // Draw last num amount of players at once, maybe with transparency
    
  }
  
}
