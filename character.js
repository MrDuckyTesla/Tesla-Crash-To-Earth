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
    this.fallCount = 1;  this.fastFall = false; // Jump Variables for battle
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
    this.overWorld = true; // Controls if Character is battling
    this.charState = 0;  this.lastCharState = 0;  // What animation the character is currently doing
    this.dir = 0;  this.lastDir = 0;  // The direction that the character is facing
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
      // Add new overworld states here
      
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
      this.battAnimSpeed = 5;  // Reset battle animation speed
      if (this.dir > 2) this.dir = 0;  // Make sure to only have battle directions

      // Battle Idle
      if (this.charState == 1) {
        this.accelerX = 0;  // Dont let velocity grow
        this.jumpFun();  // Run the jump function
        if (this.dir == 0 && !this.inAir)  // Right
          this.MediaPlayer.animate(this.batImg, this.bX += this.velocitX, this.bY, 9, 13, this.sclB, 0, 1, this.battAnimSpeed * 2, this.changeAnimation);
        else if (this.dir == 1 && !this.inAir)  // Left
          this.MediaPlayer.animate(this.batImg, this.bX += this.velocitX, this.bY, 9, 13, this.sclB, 2, 3, this.battAnimSpeed * 2, this.changeAnimation);
      }
      // Battle Run
      else if (this.charState == 2) {
        // If the direction is right, then the acceleration is positive, negative otherwise
        this.accelerX += this.dir == 0 ? this.battSpeed : -this.battSpeed;
        this.jumpFun();  // Run the jump function
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
  
  collideWallPredict(wallX1=0, wallY1=0, wallX2=width, wallY2=height) { // Check if overworld will hit wall
    return -1;  // Gotta make it first
  }
  
  jumpFun(speed) {
    if (this.jump && this.jumpCount > 0) {  // If has enough jumps, jump
      this.velocitY = 0;  // Reset Y velocity so jumps mid air stop going down
      this.velocitY -= this.impulse;  // Add an impulse to make character go up
      this.jumpCount -= 1;  // Subtract from jump count for double jumps
      this.jump = false;  // No longer "jumping", now "falling with style"
    }
    if (this.fastFall && this.fallCount > 0) {
      this.velocitY = 0;  // Reset Y velocity so jumps mid air stop going down
      this.velocitY += this.impulse;  // Add an impulse to make character go up
      this.fallCount -= 1;  // Subtract from jump count for double jumps
      this.fastFall = false;  // Just "falling with style" now
    }
    if (this.bY + this.velocitY > height - 26*2) {  // Use a function to detect what we consider "ground" (not done yet)
      this.velocitY = 0;  // If on ground, dont change Y velocity
      this.bY = height - 26*2;  // Set Y coords to ground level (will change after function is made)
      this.jumpCount = 2;  // Reset jump count
      this.fallCount = 1;  // Reset fall count
      this.inAir = false;  // Is on the ground, so no longer in air
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
