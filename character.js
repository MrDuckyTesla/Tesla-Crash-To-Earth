class Character {
  // Get basic information about the image
  constructor(oX, oY, bX, bY, ovrImg, batImg) {
    this.oX = oX;  this.oY = oY;  // Overworld Characters XY Coords
    this.bX = bX;  this.bY = bY;  // Battle Characters XY Coords
    this.overWorld = true; // Controls if Character is battling
    this.grav = 10;  this.lift = 20;  this.res = 0.95;  // Jump Variables
    this.velocitX = 0;  this.velocitY = 0;  // Characters XY Velocity
    this.accelerX = 0;  this.accelerY = 0;  // Characters XY Acceleration
    this.friction = 0.5;  // Friction
    this.overSpeed = 3;  this.SpeedCap = 6;  // How fast the overworld is
    this.overAnimSpeed = 12;  this.AnimSpeedCap = 6;  // Animation speed limit in the overworld
    this.battSpeed = 5;  this.battAnimSpeed = 5;  // Battle Characters Speed
    this.sprint = false;  // Controls if the character goes x2 speed
    this.ovrImg = ovrImg;  this.batImg = batImg;  // Characters Spritesheets
    this.MediaPlayer = new Media();  // Animates and colors Spritesheets 
    this.charState = 0;  this.lastCharState = 0;  // What animation the character is currently doing
    this.dir = 0;  this.lastDir = 0;  // The direction that the character is facing
    // Maybe make ovrDir and batDir?
    this.sclO = 3;  this.sclB = 4;  // Scale of Character (Size)
    this.inJump = false;  this.jumpCount = 0;  // More Jump Variables
    this.changeAnimation = this.overSpeed >= this.SpeedCap && this.overAnimSpeed <= this.AnimSpeedCap; 
    this.ovrList = this.MediaPlayer.preCompile(ovrImg, [[180, 157, 130, 31], [187, 171], [190, 163, 140]]);
    this.batList = this.MediaPlayer.preCompile(batImg, [[105, 85, 34], [104]]);
  }
  show() {
    this.move();
    // Color :D
    if (frameCount == 1) {
      this.MediaPlayer.changeColor(this.ovrImg, this.ovrList, [111, 111, 255, 255, 111, 111, 239, 211, 39], [[180, 157, 130, 31], [187, 171], [190, 163, 140]]);  // Overworld
      this.MediaPlayer.changeColor(this.batImg, this.batList, [111, 111, 255, 255, 111, 111], [[105, 85, 34], [104]]);  // Battle
      // this.MediaPlayer.download(this.ovrImg, 50);
    }
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
        if (this.dir == 0) // Right
          this.MediaPlayer.animate(this.ovrImg, this.oX, this.oY, 28, 28, this.sclO, 0, 1, this.overAnimSpeed, this.changeAnimation);
        else if (this.dir == 1)  // Right - Down
          this.MediaPlayer.animate(this.ovrImg, this.oX, this.oY, 28, 28,this.sclO, 2, 3, this.overAnimSpeed, this.changeAnimation);
        else if (this.dir == 2) // Down
          this.MediaPlayer.animate(this.ovrImg, this.oX, this.oY, 28, 28, this.sclO, 4, 5, this.overAnimSpeed, this.changeAnimation);
        else if (this.dir == 3)  // Down - Left
          this.MediaPlayer.animate(this.ovrImg, this.oX, this.oY, 28, 28, this.sclO, 6, 7, this.overAnimSpeed, this.changeAnimation);
        else if (this.dir == 4) // Left
          this.MediaPlayer.animate(this.ovrImg, this.oX, this.oY, 28, 28, this.sclO, 8, 9, this.overAnimSpeed, this.changeAnimation);
        else if (this.dir == 5)  // Left - Up
          this.MediaPlayer.animate(this.ovrImg, this.oX, this.oY, 28, 28, this.sclO, 10, 11, this.overAnimSpeed, this.changeAnimation);
        else if (this.dir == 6) // Up
          this.MediaPlayer.animate(this.ovrImg, this.oX, this.oY, 28, 28, this.sclO, 12, 13, this.overAnimSpeed, this.changeAnimation);
        else if (this.dir == 7)  // Up - Right
          this.MediaPlayer.animate(this.ovrImg, this.oX, this.oY, 28, 28, this.sclO, 14, 15, this.overAnimSpeed, this.changeAnimation);
      }
      else if (this.charState == 2) {  // Sword Swing
        if (this.dir == 0) // Right
          this.MediaPlayer.animate(this.ovrImg, this.oX += this.overSpeed/2, this.oY, 28, 28, this.sclO, 48, 51, this.overAnimSpeed, this.changeAnimation);
        else if (this.dir == 1)  // Right - Down
          this.MediaPlayer.animate(this.ovrImg, this.oX += this.overSpeed/2, this.oY += this.overSpeed/2, 28, 28, this.sclO, 52, 55, this.overAnimSpeed, this.changeAnimation);
        else if (this.dir == 2) // Down
          this.MediaPlayer.animate(this.ovrImg, this.oX, this.oY += this.overSpeed/2, 28, 28, this.sclO, 56, 59, this.overAnimSpeed, this.changeAnimation);
        else if (this.dir == 3)  // Down - Left
          this.MediaPlayer.animate(this.ovrImg, this.oX -= this.overSpeed/2, this.oY += this.overSpeed/2, 28, 28, this.sclO, 60, 63, this.overAnimSpeed, this.changeAnimation);
        else if (this.dir == 4) // Left
          this.MediaPlayer.animate(this.ovrImg, this.oX -= this.overSpeed/2, this.oY, 28, 28, this.sclO, 64, 67, this.overAnimSpeed, this.changeAnimation);
        else if (this.dir == 5)  // Left - Up
          this.MediaPlayer.animate(this.ovrImg, this.oX -= this.overSpeed/2, this.oY -= this.overSpeed/2, 28, 28, this.sclO, 68, 71, this.overAnimSpeed, this.changeAnimation);
        else if (this.dir == 6) // Up
          this.MediaPlayer.animate(this.ovrImg, this.oX, this.oY -= this.overSpeed/2, 28, 28, this.sclO, 72, 75, this.overAnimSpeed, this.changeAnimation);
        else if (this.dir == 7)  // Up - Right
          this.MediaPlayer.animate(this.ovrImg, this.oX += this.overSpeed/2, this.oY -= this.overSpeed/2, 28, 28, this.sclO, 76, 79, this.overAnimSpeed, this.changeAnimation);
      }
      else if (this.charState == 3) {  // Overworld Walk
        if (this.dir == 0) // Right
          this.MediaPlayer.animate(this.ovrImg, this.oX += this.overSpeed, this.oY, 28, 28, this.sclO, 16, 19, this.overAnimSpeed, this.changeAnimation);
        else if (this.dir == 1)  // Right - Down
          this.MediaPlayer.animate(this.ovrImg, this.oX += this.overSpeed, this.oY += this.overSpeed, 28, 28, this.sclO, 20, 23, this.overAnimSpeed, this.changeAnimation);
        else if (this.dir == 2) // Down
          this.MediaPlayer.animate(this.ovrImg, this.oX, this.oY += this.overSpeed, 28, 28, this.sclO, 24, 27, this.overAnimSpeed, this.changeAnimation);
        else if (this.dir == 3)  // Down - Left
          this.MediaPlayer.animate(this.ovrImg, this.oX -= this.overSpeed, this.oY += this.overSpeed, 28, 28, this.sclO, 28, 31, this.overAnimSpeed, this.changeAnimation);
        else if (this.dir == 4) // Left
          this.MediaPlayer.animate(this.ovrImg, this.oX -= this.overSpeed, this.oY, 28, 28, this.sclO, 32, 35, this.overAnimSpeed, this.changeAnimation);
        else if (this.dir == 5)  // Left - Up
          this.MediaPlayer.animate(this.ovrImg, this.oX -= this.overSpeed, this.oY -= this.overSpeed, 28, 28, this.sclO, 36, 39, this.overAnimSpeed, this.changeAnimation);
        else if (this.dir == 6) // Up
          this.MediaPlayer.animate(this.ovrImg, this.oX, this.oY -= this.overSpeed, 28, 28, this.sclO, 40, 43, this.overAnimSpeed, this.changeAnimation);
        else if (this.dir == 7)  // Up - Right
          this.MediaPlayer.animate(this.ovrImg, this.oX += this.overSpeed, this.oY -= this.overSpeed, 28, 28, this.sclO, 44, 47, this.overAnimSpeed, this.changeAnimation);
      }
      // Reset speeds if not spriting
      if (this.sprint || (this.overSpeed >= this.SpeedCap && this.overAnimSpeed <= this.AnimSpeedCap)) {
        this.overSpeed /= 2;
        this.overAnimSpeed *= 2;
      }  // Maybe add overworld sword? (maybe player only)
      // Add new character states here
      
    // Battle state below here
    }
    else {
      this.battAnimSpeed = 5;  // Reset battle animation speed
      //   this.velocitY += this.grav;
      //   this.velocitY *= this.res;

      //   this.velocitY -= this.lift;
      //   this.bY += this.velocitY;
      if (this.dir > 2)
        this.dir = 0;
      if (this.charState == 1) {  // Battle Idle
        if (this.dir == 0)  // Right
        this.MediaPlayer.animate(this.batImg, this.bX += this.velocitX, this.bY, 9, 13, this.sclB, 0, 1, this.battAnimSpeed * 2, this.changeAnimation);
        else if (this.dir == 1)  // Left
          this.MediaPlayer.animate(this.batImg, this.bX += this.velocitX, this.bY, 9, 13, this.sclB, 2, 3, this.battAnimSpeed * 2, this.changeAnimation);
        this.accelerX = 0;
      }
      else if (this.charState == 2) {  // Battle Run
        if (this.dir != this.lastDir  || this.charState != this.lastCharState) {  // Reset friction and animation speed if changed directions or states
          this.friction = 0.5;
        }
        else
          this.friction += 0.005;  // Else get faster over time
        this.battAnimSpeed = round(3 / this.friction);  // Animation speed gets faster as well
        // console.log(this.battAnimSpeed);
        if (this.dir == 0) {  // Right
          this.accelerX += this.battSpeed;
          this.MediaPlayer.animate(this.batImg, this.bX += this.velocitX, this.bY, 9, 13, this.sclB, 4, 11, this.battAnimSpeed, this.changeAnimation);
        }
        else if (this.dir == 1) {  // Left
          this.accelerX -= this.battSpeed;
          this.MediaPlayer.animate(this.batImg, this.bX += this.velocitX, this.bY, 9, 13, this.sclB, 12, 19, this.battAnimSpeed, this.changeAnimation);
        }
      }
      else if (this.charState == 3) {  // Battle Start Jump
        if (!this.inJump) {
          this.velocitY -= this.lift;
        }
        if (this.dir == 0) {  // Right
          // this.accelerX += this.battSpeed;
          this.MediaPlayer.animate(this.batImg, this.bX += this.velocitX, this.bY += this.velocitY, 9, 13, this.sclB, 20, 24, this.battAnimSpeed, this.changeAnimation);
        }
        else if (this.dir == 1) {  // Left
          // this.accelerX -= this.battSpeed;
          this.MediaPlayer.animate(this.batImg, this.bX += this.velocitX, this.bY += this.velocitY, 9, 13, this.sclB, 25, 29, this.battAnimSpeed, this.changeAnimation);
        }
      }
      else if (this.charState == 4) {  // Battle In Air
        
      }  // Maybe add battle air dash?
      // Add new character states here
      
      // Physics calculations and previous variables stored below
      if (this.friction > 0.8)
        this.friction = 0.8;  // Cap the friction/speed
      // Momentum
      this.accelerX = min(this.battSpeed * 10, max(-this.battSpeed * 10, this.accelerX));
      this.velocitX += min(this.battSpeed, max(-this.battSpeed, this.accelerX));
      this.velocitX *= this.friction;
    }
      this.lastDir = this.dir;  // Get the last diection
      this.lastCharState = this.charState;  // Get last state
      this.prevOX = this.oX;  this.prevOY = this.oY;  // Get last Overworld XY Coords
      this.prevBX = this.bX;  this.prevBY = this.bY;  // Get last  Battle XY Coords
  }
  
  collideWallPredict(wallX1=0, wallY1=0, wallX2=width, wallY2=height) {
    if (this.x + 28 + this.overSpeed > wallX2 && this.y +28 > wallY2) {
      return 2;
    }
    if (this.x - this.overSpeed < wallX1 && this.y - this.overSpeed < wallY1) {
      return 7;
    }
    return -1;
  }
  
}
// INVERSE KINEMATICS
// Gravity

// this.v += this.g;
// this.v *= this.r;
// this.y += this.v;

// jump() {
//   // Allow the player to move
//   this.prevX = this.oX;
//   if (keyIsDown(32) || keyIsDown(87) || keyIsDown(38) || mouseIsPressed === true ) {  //|| mouseY < this.oY) {
//     this.vel -= this.lift;
//   }
//   if (keyIsDown(65) || keyIsDown(37) ) {  //|| mouseX < this.oX) {
//     this.oX -= this.lift*2;
//   }
//   if (keyIsDown(68) || keyIsDown(39) ) {  //|| mouseX > this.oX) {
//     this.oX += this.lift*2;
//   }
// }

// getBackHere() {
//   // Bring back the player if out of bounds
//   if (this.oX >= width + this.h) {
//     this.oX = (this.h * -1);
//   }
//   else if (this.oX <= this.h * -1) {
//     this.oX = (this.h + width);
//   }
//   if (this.oY >= height + this.w) {
//     this.oY = (this.w * -1);
//   }
//   else if (this.oY <=  this.w * -1) {
//     this.oY = (this.w + height);
//   }
// }

    // image(this.batImg, 0, 0);
    
    // [[105, 85, 34], [104]]
    // colorLayers = [[r, g, b, r, g, b, r, g, b], [r, g, b]];
    // colorTints = [r, g, b, r, g, b];
    // console.log(this.MediaPlayer.calculateColors([[159, 100,], [159]], [111, 111, 255, 130, 204, 213]));
    // console.log(this.wallCollision(this.bX, this.bY, 9, 13, this.sclB));
    // this.collisionOverFuture(num);