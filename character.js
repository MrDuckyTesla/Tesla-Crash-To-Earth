class Character {
  constructor(oX, oY, bX, bY, ovrImg, batImg, col1, col2) {
    // Animation and media varaibles
    this.MediaPlayer = new Media();  // Animates and colors Spritesheets 
    this.overAnimSpeed = 12;  this.AnimSpeedCap = 6;  // Animation speed in overworld
    this.battAnimSpeed = 5;  // Animation speed limit in battle
    this.changeAnimation = false; 
    this.ovrImg = ovrImg;  this.batImg = batImg;  // Characters Spritesheets
    this.colors = {c1: col1, c2: col2, c3: {r: 255, g: 200, b: 0}};
    // Movement varaibles
    this.overSpeed = 3;  this.SpeedCap = this.overSpeed*2;  this.battSpeed = 2.5;  // Characters Speed
    this.kinemat = {over: {x: oX, y: oY}, batt: {pX: bX, pY: bY, x: bX, y: bY, vX: 0, vY: 0, aX: 0, aY: 1, j: 17, f: 0.8}};
    this.special = {sprint: false, inAir: false, jump: {bool: false, count: 2}, fall: {bool: false, count: 1}, dash: {bool: false, count: 1, time: 0}, wall: {bool: false, speed: this.battSpeed, time: 0}};
    // Lists of changeable pixels and their respective colors
    this.ovrList = this.MediaPlayer.preCompile(ovrImg, [[180, 157, 130, 31], [187, 171], [190, 163, 140]]);  // Greyscale colors of original image, separated by their layers
    this.batList = this.MediaPlayer.preCompile(batImg, [[105, 85, 34], [104]]);  // Greyscale colors of original image, separated by their layers
    this.sclO = 3;  this.sclB = 4;  // Scale of Character (Size)
    // World Variables
    this.world = {dir: {over: {curr: 0, last: 0}, batt: {curr: 0, last: 0}}, over: {curr: true, last: true}};
    this.rectBatt = {x1: 0, x2: width - 9*this.sclB, y1: 0, y2: height - 14*this.sclB};
    this.frameMultiplier = 1;  // Make code consistant at lower frameRates
    this.charState = 0;  // What animation the character is currently doing
    // Platforms (test)
    this.RoomVar = new Room();
    this.RoomVar.addObstacle(0, 0, width, height, true);
    this.RoomVar.addObstacle(200, 400, 200, 30);
    this.roomCollide = false;
    this.lastCollision = false;
    this.madeCalcs = false;  // For those who are new to the sketch, "calc" is short for calculation, im just using slang
    
  }
  
  show() {
    // Update past player coords
    this.kinemat.batt.pX = this.kinemat.batt.x;
    this.kinemat.batt.pY = this.kinemat.batt.y;
    // Update present player coords
    this.move();
    // this.collision();
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
    this.changeAnimation = this.world.over.curr? this.world.dir.over.last == this.world.dir.over.curr : this.world.dir.batt.last == this.world.dir.batt.curr;  // Check if new direction
    if (this.world.over.last != this.world.over.curr) this.changeAnimation = false;
    if (this.world.over.curr) {
      if (this.special.sprint) {  // If sprinting, double all speeds
        this.overSpeed *= 2;
        this.overAnimSpeed /= 2;
      }
      // Keep code consistant at lower frameRates
      this.overSpeed *= this.frameMultiplier;
      this.overAnimSpeed /= this.frameMultiplier; 
      if (this.charState == 3) {  // Overworld Walk
        if (this.collisionOver(this.charState) != this.world.dir.over.curr) {
          switch (this.world.dir.over.curr) {
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
        if (this.collisionOver(this.charState) != this.world.dir.over.curr) {
          switch (this.world.dir.over.curr) {
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
        switch (this.world.dir.over.curr) {
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
      // Kinematics
      if (abs(this.kinemat.batt.aX) > this.battSpeed && this.kinemat.batt.aX != 0) this.kinemat.batt.aX = this.battSpeed * (this.kinemat.batt.aX / abs(this.kinemat.batt.aX));  // Cap the friction/speed
      if (abs(this.kinemat.batt.vX) <= 0.00001) this.kinemat.batt.vX = 0;  // We cant see the difference in speed
      this.kinemat.batt.vX += this.kinemat.batt.aX;  // Apply acceleration to X
      this.kinemat.batt.vY += this.kinemat.batt.aY;  // Apply acceleration to Y
      this.kinemat.batt.vX *= this.kinemat.batt.f;  // Apply friction to X
      // Animation
      // this.battAnimSpeed = 5;  // Reset battle animation speed
      // State
      if (this.special.wall.time > millis())  this.charState = 1;  // If character hit wall too quickly
      if (this.charState == 1) this.kinemat.batt.aX /= 1.2;  // Dont let velocity stay the same when not moving
      else if (this.charState == 2) this.kinemat.batt.aX += this.world.dir.batt.curr == 0 ? this.battSpeed : -this.battSpeed;  // If facing towards the right, then the acceleration is positive, negative otherwise
      this.specialMove();  // Run the special moves function
      // Animation
      this.battAnimSpeed = round(3 / (this.kinemat.batt.aX/7));  // Animation speed gets faster as well
      
      this.kinemat.batt.x += this.kinemat.batt.vX;
      this.kinemat.batt.y += this.kinemat.batt.vY
      // rect(min(this.kinemat.batt.pX, this.kinemat.batt.x), min(this.kinemat.batt.pY, this.kinemat.batt.y), abs(this.kinemat.batt.x - this.kinemat.batt.pX) +9*this.sclB, abs(this.kinemat.batt.y - this.kinemat.batt.pY)+13* this.sclB);
      
      // Collision
      for (let i = 0; i < this.RoomVar.obstList.length; i ++) {
        this.RoomVar.obstList[i].drawHitbox();
        // console.log(this.RoomVar.obstList[i]);
        if (this.RoomVar.obstList[i].mstSty) {
          this.roomCollide = this.MediaPlayer.nRectRectCollideCoords(this.kinemat.batt.pX, this.kinemat.batt.pY, this.kinemat.batt.x, this.kinemat.batt.y, 9*this.sclB, 13*this.sclB, this.RoomVar.obstList[i].x, this.RoomVar.obstList[i].y, this.RoomVar.obstList[i].wid, this.RoomVar.obstList[i].hgt);
          // console.log(this.roomCollide);
          if (this.roomCollide[0]) {
            if (this.roomCollide[3] == 1 || this.roomCollide[3] == 3) {
              this.kinemat.batt.x = this.roomCollide[3] == 1? this.roomCollide[1] - 0.00001 : this.roomCollide[1] + 0.00001;
              // this.kinemat.batt.vX *= -1;
              
            }
            if (this.roomCollide[3] == 2) {
              this.kinemat.batt.y = this.roomCollide[2] - 0.00001;  // Slightly offset to not stick
              this.resetSpecialCount();
              this.special.inAir = false;  // Is on the ground, so no longer in air
              this.special.wall.bool = false;  // No longer on a wall
              // this.kinemat.batt.vY *= -1;
            }
            // else {
            //   this.kinemat.batt.y = this.roomCollide[2] - 0.00001;  // Slightly offset to not stick
            //   this.kinemat.batt.vY = 0;
            //   this.resetSpecialCount();
            // }
          }
        }
        else {
          this.roomCollide = this.MediaPlayer.rectRectCollideCoords(this.kinemat.batt.pX, this.kinemat.batt.pY, this.kinemat.batt.x, this.kinemat.batt.y, 9*this.sclB, 13*this.sclB, this.RoomVar.obstList[i].x, this.RoomVar.obstList[i].y, this.RoomVar.obstList[i].wid, this.RoomVar.obstList[i].hgt);
          if (this.roomCollide[0]) {
            if (this.roomCollide[3] == 1 || this.roomCollide[3] == 3) {
              this.kinemat.batt.x = this.roomCollide[3] == 1? this.roomCollide[1] + 0.00001 : this.roomCollide[1] - 0.00001;
              // this.kinemat.batt.vX *= -1;
            }
            else if (this.roomCollide[3] == 2) {
              this.kinemat.batt.y = this.roomCollide[2] + 0.00001;  // Slightly offset to not stick
              // this.kinemat.batt.vY *= -1;
            }
            else {
              this.kinemat.batt.y = this.roomCollide[2] - 0.00001;  // Slightly offset to not stick
              this.kinemat.batt.vY = 0;
              this.resetSpecialCount();
            }
          }
        }
      }
      rect(this.kinemat.batt.x, this.kinemat.batt.y, 9*this.sclB, 13*this.sclB);
    }
    // Get the last diections
    this.world.dir.batt.last = this.world.dir.batt.curr;
    this.world.dir.over.last = this.world.dir.over.curr;
    this.world.over.last = this.world.over.curr;
  }
  
  specialMove() {
    // By the way, height of character is 13px * scale, and width is 9 * scale, make sure to replace these with width/height * scale, and not some random multiple
    // Jump
    this.special.inAir = this.special.jump.bool? false : true;
    if (this.special.jump.bool && this.special.jump.count > 0) {  // If enough jumps remain, jump
      this.kinemat.batt.vY = -this.kinemat.batt.j;  // Add an impulse to make character go up
      this.special.jump.count --;  // Subtract from jump count for double jumps
      this.special.jump.bool = false;  // Without this, both jumps would activate within 2 frames
    }
    else {
      this.special.jump.bool = false;  // Not jumping
    }
    // Fast Fall
    if (this.special.fall.bool && this.special.fall.count > 0) {
      this.kinemat.batt.vY = this.kinemat.batt.j*2;  // Add an impulse to make character go up
      this.special.fall.count --;  // Subtract from jump count for double jumps
      this.special.fall.bool = false;  // No longer "Fast Falling" just "falling with extra steps" now
    }
    // Dash
    if (this.special.dash.bool && this.special.dash.count > 0 && this.special.dash.time < millis()) {
      this.kinemat.batt.vX += this.world.dir.batt.curr == 0 ? this.kinemat.batt.j*2 : -this.kinemat.batt.j*2;  // Add impulse in X direction to dash
      this.special.dash.count --;  // Subtract from dash count so only one dash mid air
      this.special.dash.bool = false;  // No longer "dashing"
      this.special.dash.time = millis() + 500;
    }
    else this.special.dash.bool = false;  // Without this, dash would activate inconsistently
    // On ground
    // if (this.kinemat.batt.y + this.kinemat.batt.vY > height - 52 || (this.kinemat.batt.y + this.battSpeed > height - 52 && this.special.wall.bool)) {  // Use a function to detect what we consider "ground" (create function first)
    //   this.resetSpecialCount();
    //   if (this.kinemat.batt.vY > this.kinemat.batt.j*1.5 && this.special.inAir)  this.kinemat.batt.vY = -this.kinemat.batt.vY/5;
    //   else {
    //     this.kinemat.batt.vY = 0;
    //     this.kinemat.batt.y =
    //       height - 52;  // Set Y coords to ground level (make function)
    //     this.special.inAir = false;  // Is on the ground, so no longer in air
    //     this.special.wall.bool = false;  // No longer on a wall
    //   }
    // }
    // console.log(width/2 - this.kinemat.batt.x - 9/2*this.sclB < 0, this.world.dir.batt.curr);
    // Collides with wall
    // if (this.kinemat.batt.x + this.kinemat.batt.vX >= width - 36 || this.kinemat.batt.x + this.kinemat.batt.vX <= 0) {  // Make a function
    //   // Distance between surfaces, may eventually need to use 2d distance when platforms get involved
    //   this.kinemat.batt.x = this.kinemat.batt.x - this.rectBatt.x1 > this.rectBatt.x2 - this.kinemat.batt.x ? this.rectBatt.x2 : this.rectBatt.x1;
    //   // Wall Slide
    //   if (abs(this.kinemat.batt.vX) <= 20 && this.special.inAir) {
    //     this.special.wall.bool = true;
    //     this.resetSpecialCount();
    //     this.special.wall.speed += this.battSpeed/10;
    //     if (this.world.dir.batt.curr == 0)  // Right
    //       this.MediaPlayer.animate(this.batImg, this.kinemat.batt.x, this.kinemat.batt.y += this.special.wall.speed, 9, 13, this.sclB, 31, 32, this.battAnimSpeed * 2, this.changeAnimation);
    //     else if (this.world.dir.batt.curr == 1)  // Left
    //       this.MediaPlayer.animate(this.batImg, this.kinemat.batt.x, this.kinemat.batt.y += this.special.wall.speed, 9, 13, this.sclB, 36, 37, this.battAnimSpeed * 2, this.changeAnimation);
    //   }
    //   else if (abs(this.kinemat.batt.vX) <= 10) { //&& this.world.dir.batt.curr == this.kinemat.batt.x - this.rectBatt.x1 > this.rectBatt.x2 - this.kinemat.batt.x ? 0: 1) {
    //     // console.log(abs(width/2 - this.kinemat.batt.x));
    //     this.kinemat.batt.x = this.kinemat.batt.x - this.rectBatt.x1 > this.rectBatt.x2 - this.kinemat.batt.x ? width - 9*this.sclB : 0;
    //     this.kinemat.batt.vX = 0;
    //     if (!(this.special.inAir || this.special.jump.bool)) this.special.wall.time = millis() + 100;
    //   }
    //   // Bump off wall
    //   else {
    //     this.special.wall.bool = false;
    //     this.special.wall.time = millis() + abs(this.kinemat.batt.vX*15);
    //     this.kinemat.batt.vX = -this.kinemat.batt.vX;
    //     this.kinemat.batt.x = this.kinemat.batt.x - this.rectBatt.x1 > this.rectBatt.x2 - this.kinemat.batt.x ? width - 9*this.sclB : 0;
    //   }
    // }
    // Falling normally
    // else {
    //   // console.log(round(this.kinemat.batt.x), width);
    //   this.special.wall.speed = this.battSpeed;
      // if (this.world.dir.batt.curr == 0 && this.special.inAir)  // Right
      //   this.MediaPlayer.animate(this.batImg, this.kinemat.batt.x += this.kinemat.batt.vX, this.kinemat.batt.y += this.kinemat.batt.vY, 9, 13, this.sclB, 20, 24, this.battAnimSpeed, this.changeAnimation);
      // else if (this.world.dir.batt.curr == 1 && this.special.inAir)  // Left
      //   this.MediaPlayer.animate(this.batImg, this.kinemat.batt.x += this.kinemat.batt.vX, this.kinemat.batt.y += this.kinemat.batt.vY, 9, 13, this.sclB, 25, 29, this.battAnimSpeed, this.changeAnimation);
    //   // console.log(round(this.kinemat.batt.vX), this.kinemat.batt.vY);
    // }
  }
  
  collisionOver(state, x1=0, y1=0, x2=width, y2=height) {
    this.charState = 1;   
    if ((this.world.dir.over.curr == 0 || this.world.dir.over.curr == 1 || this.world.dir.over.curr == 7) && this.kinemat.over.x + this.overSpeed > x2 - 28*this.sclO) {
      this.kinemat.over.x = x2 - 28*this.sclO;
      return this.world.dir.over.curr;  // Right
    }
    if ((this.world.dir.over.curr == 1 || this.world.dir.over.curr == 2 || this.world.dir.over.curr == 3) && this.kinemat.over.y + this.overSpeed > y2 - 28*this.sclO) {
      this.kinemat.over.y = y2 - 28*this.sclO;
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
    this.charState = state;
  }
  
  collisionBattWall() {
    // this.charState = 1;
    if (this.world.dir.batt.curr == 0 || this.kinemat.batt.x + this.kinemat.batt.vX < 0) {
      this.kinemat.batt.x = 0;
      return 0;
    }
  }
  
  resetSpecialCount() {
    this.special.jump.count = 2;  // Reset jump count
    this.special.fall.count = 1;  // Reset fall count
    this.special.dash.count = 1;  // Reset dash count
  }
  
  // collision() {
  //   // If in battle
  //   if (!Tesla.world.over.curr) {
  //     // For each obstacle in the list
  //     this.special.inAir = true;
  //     this.special.wall.bool = false;
  //     for (let i = 0; i < this.RoomVar.obstList.length; i ++) {
  //       // Draw the hitbox
  //       this.RoomVar.obstList[i].drawHitbox();
  //       // if (this.RoomVar.obstList[i].mustStayIn) this.roomCollide = this.MediaPlayer.nRectRectCollideCoords(this.kinemat.batt.pX, this.kinemat.batt.pY, this.kinemat.batt.x, this.kinemat.batt.y, 9*this.sclB, 13*this.sclB, this.RoomVar.obstList[i].x, this.RoomVar.obstList[i].y, this.RoomVar.obstList[i].wid, this.RoomVar.obstList[i].hgt);
  //       this.roomCollide = this.MediaPlayer.rectRectCollideCoords(this.kinemat.batt.pX, this.kinemat.batt.pY, this.kinemat.batt.x, this.kinemat.batt.y, 9*this.sclB, 13*this.sclB, this.RoomVar.obstList[i].x, this.RoomVar.obstList[i].y, this.RoomVar.obstList[i].wid, this.RoomVar.obstList[i].hgt);
  //       if (this.roomCollide[0]) {
  //         if (this.roomCollide[3] == 1 || this.roomCollide[3] == 3) {
  //           this.kinemat.batt.x = this.roomCollide[1];
  //           this.kinemat.batt.vX *= -1;
  //         }
  //         else if (this.roomCollide[3] == 2) {
  //           this.kinemat.batt.y = this.roomCollide[2] + 0.00001;  // Slightly offset to not stick
  //           this.kinemat.batt.vY *= -1;
  //         }
  //         else {
  //           this.kinemat.batt.y = this.roomCollide[2] - 0.00001;  // Slightly offset to not stick
  //           this.kinemat.batt.vY = 0;
  //           this.special.inAir = false;
  //           this.resetSpecialCount();
  //         }
  //       }
  //       // Players hitbox
  //       rect(this.kinemat.batt.x, this.kinemat.batt.y, 9*this.sclB, 13*this.sclB);
  //       // rect(min(this.kinemat.batt.pX, this.kinemat.batt.x), min(this.kinemat.batt.pY, this.kinemat.batt.y), abs(this.kinemat.batt.x - this.kinemat.batt.pX) +9*this.sclB, abs(this.kinemat.batt.y - this.kinemat.batt.pY)+13* this.sclB);
  //     }
  //   }
  // }  
  
}

        // if (this.world.dir.batt.curr == 0 && !this.special.inAir)  // Right
        //   this.MediaPlayer.animate(this.batImg, this.kinemat.batt.x += this.kinemat.batt.vX, this.kinemat.batt.y, 9, 13, this.sclB, 0, 1, this.battAnimSpeed * 2, this.changeAnimation);
        // else if (this.world.dir.batt.curr == 1 && !this.special.inAir)  // Left
        //   this.MediaPlayer.animate(this.batImg, this.kinemat.batt.x += this.kinemat.batt.vX, this.kinemat.batt.y, 9, 13, this.sclB, 2, 3, this.battAnimSpeed * 2, this.changeAnimation);
        // if (this.world.dir.batt.curr == 0 && !this.special.inAir)  // Right
        //   this.MediaPlayer.animate(this.batImg, this.kinemat.batt.x += this.kinemat.batt.vX, this.kinemat.batt.y, 9, 13, this.sclB, 4, 11, this.battAnimSpeed, this.changeAnimation);
        // else if (this.world.dir.batt.curr == 1 && !this.special.inAir)  // Left
        //   this.MediaPlayer.animate(this.batImg, this.kinemat.batt.x += this.kinemat.batt.vX, this.kinemat.batt.y, 9, 13, this.sclB, 12, 19, this.battAnimSpeed, this.changeAnimation);
