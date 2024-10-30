class Character {
  // Get basic information about the image
  constructor(oX, oY, bX, bY, ovrImg, batImg) {
    // Movement varaibles
    this.oX = oX;  this.oY = oY;  // Overworld Characters XY Coords
    this.bX = bX;  this.bY = bY;  // Battle Characters XY Coords
    this.velocitX = 0;  this.velocitY = 0;  // Battle Characters XY Velocity
    this.accelerX = 0;  this.accelerY = 1;  // Battle Characters XY Acceleration
    this.friction = 0.8;  // Friction of battle character
    this.impulse = 17;  this.jump = false;  // Jump Varaibles for battle
    this.jumpCount = 2;  this.inAir = false;// Jump Variables for battle
    this.fallCount = 1;  this.fastFall = false; // Fast fall Variables for battle
    this.dashCount = 1;  this.dash = false;  // Dash variables for battle
    this.dashCoolDown = 0;  // Dash variables for battle
    this.sprint = false; // Controls if overworld character goes x2 speed
    this.overSpeed = 3;  this.SpeedCap = this.overSpeed*2;  // How fast the overworld character can go
    this.battSpeed = 2.5;  // Battle Characters Speed
    // Animation and media varaibles
    this.MediaPlayer = new Media();  // Animates and colors Spritesheets 
    this.overAnimSpeed = 12;  this.AnimSpeedCap = 6;  // Animation speed in  overworld
    this.battAnimSpeed = 5;  // Animation speed limit in battle
    this.changeAnimation = false; 
    this.ovrImg = ovrImg;  this.batImg = batImg;  // Characters Spritesheets
    // Lists of pixels and their respective colors
    this.ovrList = this.MediaPlayer.preCompile(ovrImg, [[180, 157, 130, 31], [187, 171], [190, 163, 140]]);
    this.batList = this.MediaPlayer.preCompile(batImg, [[105, 85, 34], [104]]);
    this.sclO = 3;  this.sclB = 4;  // Scale of Character (Size)
    // World Variables
    this.frameMultiplier = 0;  // Make code consistant at lower frameRates
    this.overWorld = true; // Controls if Character is battling
    this.charState = 0;  this.lastCharState = 0;  // What animation the character is currently doing
    this.dir = 0;  this.lastDir = 0;  // The direction that the character is facing
  }
  show() {
    this.move();
    // Color :D (this took WAY too long)
    if (frameCount == 1) {
      // Normal Colors:
      this.MediaPlayer.changeColor(this.ovrImg, this.ovrList, [111, 111, 255, 255, 111, 111, 255, 211, 39], [[180, 157, 130, 31], [187, 171], [190, 163, 140]]);  // Overworld
      this.MediaPlayer.changeColor(this.batImg, this.batList, [111, 111, 255, 255, 111, 111], [[105, 85, 34], [104]]);  // Battle
      // Random Colors:
      // this.MediaPlayer.changeColor(this.ovrImg, this.ovrList, [random(255), random(255), random(255), random(255), random(255), random(255), random(255), random(255), random(255)], [[180, 157, 130, 31], [187, 171], [190, 163, 140]]);  // Overworld
      // this.MediaPlayer.changeColor(this.batImg, this.batList, [random(255), random(255), random(255), random(255), random(255), random(255)], [[105, 85, 34], [104]]);  // Battle (fun)
    }
    // Seizure warning if you uncomment the next 2 lines
    // this.MediaPlayer.changeColor(this.ovrImg, this.ovrList, [random(255), random(255), random(255), random(255), random(255), random(255), random(255), random(255), random(255)], [[180, 157, 130, 31], [187, 171], [190, 163, 140]]);  // Overworld
    // this.MediaPlayer.changeColor(this.batImg, this.batList, [random(255), random(255), random(255), random(255), random(255), random(255)], [[105, 85, 34], [104]]);  // Battle (fun)
  }  
  
  move() {
    // Add switch statements
    this.frameMultiplier = round(60 / frameRate());  // If lower framerate, keep gameplay consistant
    this.changeAnimation = this.lastDir == this.dir;  // Check if new direction
    if (this.overWorld) {
      if (this.sprint) {  // If sprinting, double all speeds
        this.overSpeed *= 2;
        this.overAnimSpeed /= 2;
      }
      // Keep code consistant at lower frameRates
      this.overSpeed *= this.frameMultiplier;
      this.overAnimSpeed /= this.frameMultiplier; 
      if (this.charState == 3) {  // Overworld Walk
        if (this.collisionOver(this.charState) != this.dir) {
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
      }
      if (this.charState == 2) {  // Sword Swing (walking)
        if (this.collisionOver(this.charState) != this.dir) {
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
      // Add new overworld states here
      
      this.overSpeed /= this.frameMultiplier;
      this.overAnimSpeed *= this.frameMultiplier;
      // Reset speeds if not spriting
      if (this.sprint || (this.overSpeed >= this.SpeedCap && this.overAnimSpeed <= this.AnimSpeedCap)) {
        this.overSpeed /= 2;
        this.overAnimSpeed *= 2;
      }
      
    // Battle states below here
    }
    else {
      // Physics calculations
      if (abs(this.accelerX) > this.battSpeed && this.accelerX != 0) this.accelerX = this.battSpeed * (this.accelerX / abs(this.accelerX));  // Cap the friction/speed
      if (abs(this.velocitX) <= 0.00001) this.velocitX = 0;  // We cant see the difference of speed
      this.velocitX += this.accelerX;  // Apply acceleration
      this.velocitX *= this.friction;  // Apply friction
      // Animation
      this.battAnimSpeed = 5;  // Reset battle animation speed
      if (this.dir > 1) this.dir = 0;  // Make sure to only have battle directions

      // Battle Idle
      if (this.charState == 1) {
        this.accelerX = 0;  // Dont let velocity grow
        this.specialMove();  // Run the jump function
        if (this.dir == 0 && !this.inAir)  // Right
          this.MediaPlayer.animate(this.batImg, this.bX += this.velocitX, this.bY, 9, 13, this.sclB, 0, 1, this.battAnimSpeed * 2, this.changeAnimation);
        else if (this.dir == 1 && !this.inAir)  // Left
          this.MediaPlayer.animate(this.batImg, this.bX += this.velocitX, this.bY, 9, 13, this.sclB, 2, 3, this.battAnimSpeed * 2, this.changeAnimation);
      }
      // Battle Run
      else if (this.charState == 2) {
        // If the direction is right, then the acceleration is positive, negative otherwise
        this.accelerX += this.dir == 0 ? this.battSpeed : -this.battSpeed;
        this.specialMove();  // Run the jump function
        this.battAnimSpeed = round(3 / (this.accelerX/7));  // Animation speed gets faster as well
        if (this.dir == 0 && !this.inAir)  // Right
          this.MediaPlayer.animate(this.batImg, this.bX += this.velocitX, this.bY, 9, 13, this.sclB, 4, 11, this.battAnimSpeed, this.changeAnimation);
        else if (this.dir == 1 && !this.inAir)  // Left
          this.MediaPlayer.animate(this.batImg, this.bX += this.velocitX, this.bY, 9, 13, this.sclB, 12, 19, this.battAnimSpeed, this.changeAnimation);
      }
      // Add new battle states here
    }
      // Update variables
      this.lastDir = this.dir;  // Get the last diection
      this.lastCharState = this.charState;  // Get last state
      this.prevOX = this.oX;  this.prevOY = this.oY;  // Get last Overworld XY Coords
      this.prevBX = this.bX;  this.prevBY = this.bY;  // Get last  Battle XY Coords
  }
  
  specialMove() {
    if (this.jump && this.jumpCount > 0) {  // If has enough jumps, jump
      this.velocitY = -this.impulse;  // Add an impulse to make character go up
      this.jumpCount --;  // Subtract from jump count for double jumps
      this.jump = false;  // Without this, both jumps would activate almost instanly
    }
    else this.jump = false;  // Not jumping
    if (this.fastFall && this.fallCount > 0) {
      this.velocitY = this.impulse*2;  // Add an impulse to make character go up
      this.fallCount --;  // Subtract from jump count for double jumps
      this.fastFall = false;  // No longer "Fast Falling" just "falling with extra steps" now
    }
    if (this.dash && this.dashCount > 0 && this.dashCoolDown < millis()) {
      this.velocitX += this.dir == 0 ? this.impulse*2 : -this.impulse*2;  // Add impulse in X direction to dash
      this.dashCount --;  // Subtract from dash count so only one dash mid air
      this.dash = false;  // No longer "dashing"
      this.dashCoolDown = millis() + 500;
    }
    else this.dash = false;  // Without this, dash would activate inconsistently
    if (this.bY + this.velocitY > height - 26*2) {  // Use a function to detect what we consider "ground" (create function first)
      this.bY = height - 26*2;  // Set Y coords to ground level (make function)
      this.jumpCount = 2;  // Reset jump count
      this.fallCount = 1;  // Reset fall count
      this.dashCount = 1;  // Reset dash count
      this.inAir = false;  // Is on the ground, so no longer in air
    }
      if (this.dir == 0 && this.inAir)  // Right
        this.MediaPlayer.animate(this.batImg, this.bX += this.velocitX, this.bY += this.velocitY, 9, 13, this.sclB, 20, 24, this.battAnimSpeed, this.changeAnimation);
      else if (this.dir == 1 && this.inAir)  // Left
        this.MediaPlayer.animate(this.batImg, this.bX += this.velocitX, this.bY += this.velocitY, 9, 13, this.sclB, 25, 29, this.battAnimSpeed, this.changeAnimation);
    this.velocitY += this.accelerY;
  }
  
  collisionOver(state, x1=0, y1=0, x2=width, y2=height) {
    this.charState = 1;   
    if ((this.dir == 0 || this.dir == 1 || this.dir == 7) && this.oX + this.overSpeed > x2 - 28*this.sclO) {
      this.oX = x2 - 28*this.sclO;
      return this.dir;  // Right
    }
    if ((this.dir == 1 || this.dir == 2 || this.dir == 3) && this.oY + this.overSpeed > y2 - 28*this.sclO) {
      this.oY = y2 - 28*this.sclO;
      return this.dir;  // Down
    }
    if ((this.dir == 3 || this.dir == 4 || this.dir == 5) && this.oX - this.overSpeed < x1) {
      this.oX = x1;
      return this.dir;  // Left
    }
    if ((this.dir == 5 || this.dir == 6 || this.dir == 7) && this.oY - this.overSpeed < y1) {
      this.oY = y1;
      return this.dir;  // Up
    }
    this.charState = state;
  }
  
}
