class Character {
  constructor(oX, oY, bX, bY, ovrImg, batImg, col1, col2) {
    // World Variables
    this.frameMultiplier = 1;  // Make code consistant at lower frameRates
    this.overWorld = true; // Controls if Character is battling
    this.charState = 0;  // What animation the character is currently doing
    this.dir = 0;  this.lastDir = 0;  // The direction that the character is facing
    // Animation and media varaibles
    this.MediaPlayer = new Media();  // Animates and colors Spritesheets 
    this.overAnimSpeed = 12;  this.AnimSpeedCap = 6;  // Animation speed in overworld
    this.battAnimSpeed = 5;  // Animation speed limit in battle
    this.changeAnimation = false; 
    this.ovrImg = ovrImg;  this.batImg = batImg;  // Characters Spritesheets
    this.colors = {c1: col1, c2: col2, c3: {r: 255, g: 200, b: 0}};
    // Movement varaibles
    this.kinemat = {over: {x: oX, y: oY}, batt: {x: bX, y: bY, vX: 0, vY: 0, aX: 0, aY: 1, j: 17, f: 0.8}};
    this.special = {sprint: false, inAir: false, jump: {bool: false, count: 2}, fall: {bool: false, count: 1}, dash: {bool: false, count: 1, time: 0}};
    this.overSpeed = 3;  this.SpeedCap = this.overSpeed*2;  this.battSpeed = 2.5;  // Characters Speed
    // Lists of changeable pixels and their respective colors
    this.ovrList = this.MediaPlayer.preCompile(ovrImg, [[180, 157, 130, 31], [187, 171], [190, 163, 140]]);  // Greyscale colors of original image, separated by their layers
    this.batList = this.MediaPlayer.preCompile(batImg, [[105, 85, 34], [104]]);  // Greyscale colors of original image, separated by their layers
    this.sclO = 3;  this.sclB = 4;  // Scale of Character (Size)
  }
  
  show() {
    this.move();
    // Color :D (this took WAY too long)
    this.MediaPlayer.changeColor(this.ovrImg, this.ovrList, [this.colors.c1.r, this.colors.c1.g, this.colors.c1.b, this.colors.c2.r, this.colors.c2.g, this.colors.c2.b, this.colors.c3.r, this.colors.c3.g, this.colors.c3.b], [[180, 157, 130, 31], [187, 171], [190, 163, 140]]);  // Overworld
    this.MediaPlayer.changeColor(this.batImg, this.batList, [this.colors.c1.r, this.colors.c1.g, this.colors.c1.b, this.colors.c2.r, this.colors.c2.g, this.colors.c2.b], [[105, 85, 34], [104]]);  // Battle
    // Random Colors:
    // Seizure warning if you uncomment the next 2 lines
    // this.MediaPlayer.changeColor(this.ovrImg, this.ovrList, [random(255), random(255), random(255), random(255), random(255), random(255), random(255), random(255), random(255)], [[180, 157, 130, 31], [187, 171], [190, 163, 140]]);  // Overworld
    // this.MediaPlayer.changeColor(this.batImg, this.batList, [random(255), random(255), random(255), random(255), random(255), random(255)], [[105, 85, 34], [104]]);  // Battle (fun)
  }  
  
  move() {
    // Add switch statements
    this.frameMultiplier = round(60 / frameRate());  // If lower framerate, keep gameplay consistant
    this.changeAnimation = this.lastDir == this.dir;  // Check if new direction
    if (this.overWorld) {
      if (this.special.sprint) {  // If sprinting, double all speeds
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
              this.MediaPlayer.animate(this.ovrImg, this.kinemat.over.x += this.overSpeed, this.kinemat.over.y, 28, 28, this.sclO, 16, 19, this.overAnimSpeed, this.changeAnimation);
              break;
            case 1:  // Right - Down
              this.MediaPlayer.animate(this.ovrImg, this.kinemat.over.x += this.overSpeed, this.kinemat.over.y += this.overSpeed, 28, 28, this.sclO, 20, 23, this.overAnimSpeed, this.changeAnimation);
              break;
            case 2:  // Down
              this.MediaPlayer.animate(this.ovrImg, this.kinemat.over.x, this.kinemat.over.y += this.overSpeed, 28, 28, this.sclO, 24, 27, this.overAnimSpeed, this.changeAnimation);
              break;
            case 3:  // Down - Left
              this.MediaPlayer.animate(this.ovrImg, this.kinemat.over.x -= this.overSpeed, this.kinemat.over.y += this.overSpeed, 28, 28, this.sclO, 28, 31, this.overAnimSpeed, this.changeAnimation);
              break;
            case 4:  // Left
              this.MediaPlayer.animate(this.ovrImg, this.kinemat.over.x -= this.overSpeed, this.kinemat.over.y, 28, 28, this.sclO, 32, 35, this.overAnimSpeed, this.changeAnimation);
              break;
            case 5:  // Left - Up
              this.MediaPlayer.animate(this.ovrImg, this.kinemat.over.x -= this.overSpeed, this.kinemat.over.y -= this.overSpeed, 28, 28, this.sclO, 36, 39, this.overAnimSpeed, this.changeAnimation);
              break;
            case 6:  // Up
              this.MediaPlayer.animate(this.ovrImg, this.kinemat.over.x, this.kinemat.over.y -= this.overSpeed, 28, 28, this.sclO, 40, 43, this.overAnimSpeed, this.changeAnimation);
              break;
            case 7:  // Up - Right
              this.MediaPlayer.animate(this.ovrImg, this.kinemat.over.x += this.overSpeed, this.kinemat.over.y -= this.overSpeed, 28, 28, this.sclO, 44, 47, this.overAnimSpeed, this.changeAnimation);
              break;
          }
        }
      }
      if (this.charState == 2) {  // Sword Swing (walking)
        if (this.collisionOver(this.charState) != this.dir) {
          switch (this.dir) {
            case 0:  // Right
              this.MediaPlayer.animate(this.ovrImg, this.kinemat.over.x += this.overSpeed/2, this.kinemat.over.y, 28, 28, this.sclO, 48, 51, this.overAnimSpeed, this.changeAnimation);
              break;
            case 1:  // Right - Down
              this.MediaPlayer.animate(this.ovrImg, this.kinemat.over.x += this.overSpeed/2, this.kinemat.over.y += this.overSpeed/2, 28, 28, this.sclO, 52, 55, this.overAnimSpeed, this.changeAnimation);
              break;
            case 2:  // Down
              this.MediaPlayer.animate(this.ovrImg, this.kinemat.over.x, this.kinemat.over.y += this.overSpeed/2, 28, 28, this.sclO, 56, 59, this.overAnimSpeed, this.changeAnimation);
              break;
            case 3:  // Down - Left
              this.MediaPlayer.animate(this.ovrImg, this.kinemat.over.x -= this.overSpeed/2, this.kinemat.over.y += this.overSpeed/2, 28, 28, this.sclO, 60, 63, this.overAnimSpeed, this.changeAnimation);
              break;
            case 4:  // Left
              this.MediaPlayer.animate(this.ovrImg, this.kinemat.over.x -= this.overSpeed/2, this.kinemat.over.y, 28, 28, this.sclO, 64, 67, this.overAnimSpeed, this.changeAnimation);
              break;
            case 5:  // Left - Up
              this.MediaPlayer.animate(this.ovrImg, this.kinemat.over.x -= this.overSpeed/2, this.kinemat.over.y -= this.overSpeed/2, 28, 28, this.sclO, 68, 71, this.overAnimSpeed, this.changeAnimation);
              break;
            case 6:  // Up
              this.MediaPlayer.animate(this.ovrImg, this.kinemat.over.x, this.kinemat.over.y -= this.overSpeed/2, 28, 28, this.sclO, 72, 75, this.overAnimSpeed, this.changeAnimation);
              break;
            case 7:  // Up - Right
              this.MediaPlayer.animate(this.ovrImg, this.kinemat.over.x += this.overSpeed/2, this.kinemat.over.y -= this.overSpeed/2, 28, 28, this.sclO, 76, 79, this.overAnimSpeed, this.changeAnimation);
              break;
          }
        }
      }
      if (this.charState == 1) {  // Overworld Idle
        switch (this.dir) {
          case 0:  // Right
            this.MediaPlayer.animate(this.ovrImg, this.kinemat.over.x, this.kinemat.over.y, 28, 28, this.sclO, 0, 1, this.overAnimSpeed, this.changeAnimation);
            break;
          case 1:  // Right - Down
            this.MediaPlayer.animate(this.ovrImg, this.kinemat.over.x, this.kinemat.over.y, 28, 28,this.sclO, 2, 3, this.overAnimSpeed, this.changeAnimation);
            break;
          case 2:  // Down
            this.MediaPlayer.animate(this.ovrImg, this.kinemat.over.x, this.kinemat.over.y, 28, 28, this.sclO, 4, 5, this.overAnimSpeed, this.changeAnimation);
            break;
          case 3:  // Down - Left
            this.MediaPlayer.animate(this.ovrImg, this.kinemat.over.x, this.kinemat.over.y, 28, 28, this.sclO, 6, 7, this.overAnimSpeed, this.changeAnimation);
            break;
          case 4:  // Left
            this.MediaPlayer.animate(this.ovrImg, this.kinemat.over.x, this.kinemat.over.y, 28, 28, this.sclO, 8, 9, this.overAnimSpeed, this.changeAnimation);
            break;
          case 5:  // Left - Up
            this.MediaPlayer.animate(this.ovrImg, this.kinemat.over.x, this.kinemat.over.y, 28, 28, this.sclO, 10, 11, this.overAnimSpeed, this.changeAnimation);
            break;
          case 6:  // Up
            this.MediaPlayer.animate(this.ovrImg, this.kinemat.over.x, this.kinemat.over.y, 28, 28, this.sclO, 12, 13, this.overAnimSpeed, this.changeAnimation);
            break;
          case 7:  // Up - Right
            this.MediaPlayer.animate(this.ovrImg, this.kinemat.over.x, this.kinemat.over.y, 28, 28, this.sclO, 14, 15, this.overAnimSpeed, this.changeAnimation);
            break;
        }
      }
      // Add new overworld states here
      
      this.overSpeed /= this.frameMultiplier;
      this.overAnimSpeed *= this.frameMultiplier;
      // Reset speeds if not spriting
      if (this.special.sprint || (this.overSpeed >= this.SpeedCap && this.overAnimSpeed <= this.AnimSpeedCap)) {
        this.overSpeed /= 2;
        this.overAnimSpeed *= 2;
      }
      
    // Battle states below here
    }
    else {
      this.battSpeed *= this.frameMultiplier;
      this.battAnimSpeed /= this.frameMultiplier;
      // this.kinemat.batt.f *= this.frameMultiplier;
      // this.kinemat.batt.j *= this.frameMultiplier;
      // this.kinemat.batt.aY *= this.frameMultiplier;
      
      // Physics calculations
      if (abs(this.kinemat.batt.aX) > this.battSpeed && this.kinemat.batt.aX != 0) this.kinemat.batt.aX = this.battSpeed * (this.kinemat.batt.aX / abs(this.kinemat.batt.aX));  // Cap the friction/speed
      if (abs(this.kinemat.batt.vX) <= 0.00001) this.kinemat.batt.vX = 0;  // We cant see the difference of speed
      this.kinemat.batt.vX += this.kinemat.batt.aX;  // Apply acceleration
      this.kinemat.batt.vX *= this.kinemat.batt.f;  // Apply friction
      // Animation
      this.battAnimSpeed = 5;  // Reset battle animation speed
      if (this.dir > 1) this.dir = 0;  // Make sure to only have battle directions

      // Battle Idle
      if (this.charState == 1) {
        this.kinemat.batt.aX = 0;  // Dont let velocity grow
        this.specialMove();  // Run the jump function
        if (this.dir == 0 && !this.special.inAir)  // Right
          this.MediaPlayer.animate(this.batImg, this.kinemat.batt.x += this.kinemat.batt.vX, this.kinemat.batt.y, 9, 13, this.sclB, 0, 1, this.battAnimSpeed * 2, this.changeAnimation);
        else if (this.dir == 1 && !this.special.inAir)  // Left
          this.MediaPlayer.animate(this.batImg, this.kinemat.batt.x += this.kinemat.batt.vX, this.kinemat.batt.y, 9, 13, this.sclB, 2, 3, this.battAnimSpeed * 2, this.changeAnimation);
      }
      // Battle Run
      else if (this.charState == 2) {
        // If the direction is right, then the acceleration is positive, negative otherwise
        this.kinemat.batt.aX += this.dir == 0 ? this.battSpeed : -this.battSpeed;
        this.specialMove();  // Run the jump function
        this.battAnimSpeed = round(3 / (this.kinemat.batt.aX/7));  // Animation speed gets faster as well
        if (this.dir == 0 && !this.special.inAir)  // Right
          this.MediaPlayer.animate(this.batImg, this.kinemat.batt.x += this.kinemat.batt.vX, this.kinemat.batt.y, 9, 13, this.sclB, 4, 11, this.battAnimSpeed, this.changeAnimation);
        else if (this.dir == 1 && !this.special.inAir)  // Left
          this.MediaPlayer.animate(this.batImg, this.kinemat.batt.x += this.kinemat.batt.vX, this.kinemat.batt.y, 9, 13, this.sclB, 12, 19, this.battAnimSpeed, this.changeAnimation);
      }  // Add new battle states below here
      // Make code consistant at different frameRates
      this.battSpeed /= this.frameMultiplier
      this.battAnimSpeed *= this.frameMultiplier;
    }
    this.lastDir = this.dir;  // Get the last diection
  }
  
  specialMove() {
    if (this.special.jump.bool && this.special.jump.count > 0) {  // If has enough jumps, jump
      this.kinemat.batt.vY = -this.kinemat.batt.j;  // Add an impulse to make character go up
      this.special.jump.count --;  // Subtract from jump count for double jumps
      this.special.jump.bool = false;  // Without this, both jumps would activate almost instanly
    }
    else this.special.jump.bool = false;  // Not jumping
    if (this.special.fall.bool && this.special.fall.count > 0) {
      this.kinemat.batt.vY = this.kinemat.batt.j*2;  // Add an impulse to make character go up
      this.special.fall.count --;  // Subtract from jump count for double jumps
      this.special.fall.bool = false;  // No longer "Fast Falling" just "falling with extra steps" now
    }
    if (this.special.dash.bool && this.special.dash.count > 0 && this.special.dash.time < millis()) {
      this.kinemat.batt.vX += this.dir == 0 ? this.kinemat.batt.j*2 : -this.kinemat.batt.j*2;  // Add impulse in X direction to dash
      this.special.dash.count --;  // Subtract from dash count so only one dash mid air
      this.special.dash.bool = false;  // No longer "dashing"
      this.special.dash.time = millis() + 500;
    }
    else this.special.dash.bool = false;  // Without this, dash would activate inconsistently
    if (this.kinemat.batt.y + this.kinemat.batt.vY > height - 26*2) {  // Use a function to detect what we consider "ground" (create function first)
      this.kinemat.batt.y = height - 26*2;  // Set Y coords to ground level (make function)
      this.special.jump.count = 2;  // Reset jump count
      this.special.fall.count = 1;  // Reset fall count
      this.special.dash.count = 1;  // Reset dash count
      this.special.inAir = false;  // Is on the ground, so no longer in air
    }
      if (this.dir == 0 && this.special.inAir)  // Right
        this.MediaPlayer.animate(this.batImg, this.kinemat.batt.x += this.kinemat.batt.vX, this.kinemat.batt.y += this.kinemat.batt.vY, 9, 13, this.sclB, 20, 24, this.battAnimSpeed, this.changeAnimation);
      else if (this.dir == 1 && this.special.inAir)  // Left
        this.MediaPlayer.animate(this.batImg, this.kinemat.batt.x += this.kinemat.batt.vX, this.kinemat.batt.y += this.kinemat.batt.vY, 9, 13, this.sclB, 25, 29, this.battAnimSpeed, this.changeAnimation);
    this.kinemat.batt.vY += this.kinemat.batt.aY;
  }
  
  collisionOver(state, x1=0, y1=0, x2=width, y2=height) {
    this.charState = 1;   
    if ((this.dir == 0 || this.dir == 1 || this.dir == 7) && this.kinemat.over.x + this.overSpeed > x2 - 28*this.sclO) {
      this.kinemat.over.x = x2 - 28*this.sclO;
      return this.dir;  // Right
    }
    if ((this.dir == 1 || this.dir == 2 || this.dir == 3) && this.kinemat.over.y + this.overSpeed > y2 - 28*this.sclO) {
      this.kinemat.over.y = y2 - 28*this.sclO;
      return this.dir;  // Down
    }
    if ((this.dir == 3 || this.dir == 4 || this.dir == 5) && this.kinemat.over.x - this.overSpeed < x1) {
      this.kinemat.over.x = x1;
      return this.dir;  // Left
    }
    if ((this.dir == 5 || this.dir == 6 || this.dir == 7) && this.kinemat.over.y - this.overSpeed < y1) {
      this.kinemat.over.y = y1;
      return this.dir;  // Up
    }
    this.charState = state;
  }
  
}
