
class Character {
  constructor(oX, oY, bX, bY, scl, ovrImg, batImg, col1, col2) {
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
    this.special = {sprint: false, inAir: false, jump: {bool: false, count: 2}, fall: {bool: false, pBool: false, count: 1}, dash: {bool: false, count: 1, time: 0}, wall: {bool: false, speed: this.battSpeed, time: 0}};
    // Lists of changeable pixels and their respective colors
    this.ovrList = this.MediaPlayer.preCompile(ovrImg, [[180, 157, 130, 31], [187, 171], [190, 163, 140]]);  // Greyscale colors of original image, separated by their layers
    this.batList = this.MediaPlayer.preCompile(batImg, [[105, 85, 34], [104]]);  // Greyscale colors of original image, separated by their layers
    // this.dimensions.over.scl = 3;  this.dimensions.batt.scl = 4;  // Scale of Character (Size)
    this.dimensions = {over: {wid: 28, hgt: 28, scl: scl[0], calc: 28*scl[0]}, batt: {wid: 9, hgt: 13, scl: scl[1], calcW: 9*scl[1], calcH: 13*scl[1]}};
    // World Variables
    this.world = {dir: {over: {curr: 0, last: 0}, batt: {curr: 0, last: 0}}, over: {curr: true, last: true}, state: {over: 0, overL: 0, batt: 0}};
    this.frameMultiplier = 1;  // Make code consistant at lower frameRates
    // Collision variables
    this.roomCollide = [false]; this.dontChangeVY = false;
    this.roomWallTouchin = 2;
    // Objects
    this.RoomVar = new Room(this, this.dimensions.batt.scl);
    this.RoomVar.addObstacle(100, 100, 600, 600, [200, 200, 200], true, 0);  // Box that character is in
    this.RoomVar.addObstacle(300, 300, 200, 30, [100, 100, 255], true, 1);  // Platform for player
    // this.RoomVar.addObstacle(300, 400, 200, 30, [0, 255, 200], true, 2);  // Object for player to interact with
    this.RoomVar.addObstacle(300, 500, 200, 30, [200, 100, 100]);  // Non-interactable object
    this.scaleMove = this.dimensions.batt.scl/4;
    this.animateTill = [false, 0, 0, 0, 0];
    this.moveX = 0;
    this.moveY = 0;
  }
  
  show() {
    // Update present player coords
    this.move();
    // Color :D (this took WAY too long)
    this.MediaPlayer.changeColor(this.ovrImg, this.ovrList, [this.colors.c1.r, this.colors.c1.g, this.colors.c1.b, this.colors.c2.r, this.colors.c2.g, this.colors.c2.b, this.colors.c3.r, this.colors.c3.g, this.colors.c3.b]);  // Overworld
    this.MediaPlayer.changeColor(this.batImg, this.batList, [this.colors.c1.r, this.colors.c1.g, this.colors.c1.b, this.colors.c2.r, this.colors.c2.g, this.colors.c2.b]);  // Battle
    // Random Colors:
    // Seizure warning if you uncomment the next 2 lines
    // this.MediaPlayer.changeColor(this.ovrImg, this.ovrList, [random(255), random(255), random(255), random(255), random(255), random(255), random(255), random(255), random(255)], [[180, 157, 130, 31], [187, 171], [190, 163, 140]]);  // Overworld
    // this.MediaPlayer.changeColor(this.batImg, this.batList, [random(255), random(255), random(255), random(255), random(255), random(255)], [[105, 85, 34], [104]]);  // Battle (fun)
  }  
  
  move() {
    this.frameMultiplier = frameRate() < 1? 1: round(60 / frameRate());  // If lower framerate, keep gameplay consistant
    // Check if we need to change the animation due to direction
    if (this.world.over.last != this.world.over.curr) this.changeAnimation = false;
    else this.changeAnimation = this.world.over.curr? this.world.dir.over.last == this.world.dir.over.curr : this.world.dir.batt.last == this.world.dir.batt.curr;
    // If in overworld
    if (this.world.over.curr) {
      if (this.special.sprint) {  // If sprinting, double all speeds
        this.overSpeed *= 2;
        this.overAnimSpeed /= 2;
      }
      // Keep code consistant at lower frameRates
      this.overSpeed *= this.frameMultiplier;
      this.overAnimSpeed /= this.frameMultiplier;
      // If we are staying in an animation
      if (this.animateTill[0]) {
        // If the animation has ended, end the animation
        if ((this.MediaPlayer.indexCount+1) % this.overAnimSpeed == 0 && this.MediaPlayer.index == this.animateTill[3]) this.animateTill[0] = false;
        //Else, keep the character state and direction the same
        else {
          this.world.state.over = this.animateTill[1];
          this.world.dir.over.curr = this.world.dir.over.last;
        }
      }
      // Overworld states start here     
      if (this.world.state.over == 3) this.animateMoveOver(this.overSpeed, 16, 4);  // Overworld Walk
      if (this.world.state.over == 2) this.animateMoveOver(this.overSpeed/2, 48, 4, false, true);  // Sword Swing (walking)
      if (this.world.state.over == 1) this.animateMoveOver(0, 0, 2, true);  // Overworld Idle
      // Reset speed of character
      this.overSpeed /= this.frameMultiplier;
      this.overAnimSpeed *= this.frameMultiplier;
      // Reset speeds if not spriting
      if (this.special.sprint || (this.overSpeed >= this.SpeedCap && this.overAnimSpeed <= this.AnimSpeedCap)) {
        this.overSpeed /= 2;
        this.overAnimSpeed *= 2;
      }
      
    }
    // Battle states start here
    else {
      this.updateCharCheck();
      this.specialMove();  // Run the special moves function
      this.kinemat.batt.x += this.kinemat.batt.vX;
      this.kinemat.batt.y += this.kinemat.batt.vY;
      // Collision code
      this.special.inAir = this.special.jump.bool? false : true;
      // Iterate through all objects in list
      for (let i = 0; i < this.RoomVar.obstList.length; i ++) {
        // Display object
        this.RoomVar.obstList[i].drawObst();
        // If you must stay in the object (like a box or a cage)
        if (this.RoomVar.obstList[i].spl && this.RoomVar.obstList[i].num == 0) this.collideBox(i);
        // Else collision is normal
        else {
          // Set collision coordinates variable normally
          this.roomCollide = this.MediaPlayer.rectRectCollideCoords(this.kinemat.batt.pX, this.kinemat.batt.pY, this.kinemat.batt.x, this.kinemat.batt.y, this.dimensions.batt.calcW, this.dimensions.batt.calcH, this.RoomVar.obstList[i].x, this.RoomVar.obstList[i].y, this.RoomVar.obstList[i].wid, this.RoomVar.obstList[i].hgt);
          if (!this.dontChangeVY || this.special.inAir) this.dontChangeVY = false;
          // If colliding
          if (this.roomCollide[0]) {
            // If platform, else if movable, else normal objects
            if (this.RoomVar.obstList[i].spl && this.RoomVar.obstList[i].num == 1) this.collidePlatform();
            else if (this.RoomVar.obstList[i].spl && this.RoomVar.obstList[i].num == 2) this.collideMoveO(i);
            else this.collideNormal();
          }
        }
      }
      // Display correct character sprite
      this.battAnimSpeed = 5;  // Reset animation speed
      if (this.special.inAir) {  // If in air
        if (this.special.wall.bool) {  // If wall sliding
          // If facing right else facing left
          if (this.world.dir.batt.curr == 0) this.MediaPlayer.animateOld(this.batImg, this.kinemat.batt.x, this.kinemat.batt.y, 9, 13, this.dimensions.batt.scl, 31, 32, this.battAnimSpeed * 2, this.changeAnimation);
          else if (this.world.dir.batt.curr == 1) this.MediaPlayer.animateOld(this.batImg, this.kinemat.batt.x, this.kinemat.batt.y, 9, 13, this.dimensions.batt.scl, 36, 37, this.battAnimSpeed * 2, this.changeAnimation);
        }
        else {  // Else falling
          // If facing right else facing left
          if (this.world.dir.batt.curr == 0) this.MediaPlayer.animateOld(this.batImg, this.kinemat.batt.x, this.kinemat.batt.y, 9, 13, this.dimensions.batt.scl, 20, 24, this.battAnimSpeed, this.changeAnimation);
          else if (this.world.dir.batt.curr == 1) this.MediaPlayer.animateOld(this.batImg, this.kinemat.batt.x, this.kinemat.batt.y, 9, 13, this.dimensions.batt.scl, 25, 29, this.battAnimSpeed, this.changeAnimation);
        }
      }
      else {  // Else not in air
        if (this.world.state.batt == 1) {  // If idle
          // If facing right else facing left
          if (this.world.dir.batt.curr == 0 && !this.special.inAir) this.MediaPlayer.animateOld(this.batImg, this.kinemat.batt.x, this.kinemat.batt.y, 9, 13, this.dimensions.batt.scl, 0, 1, this.battAnimSpeed * 2, this.changeAnimation);
          else if (this.world.dir.batt.curr == 1 && !this.special.inAir) this.MediaPlayer.animateOld(this.batImg, this.kinemat.batt.x, this.kinemat.batt.y, 9, 13, this.dimensions.batt.scl, 2, 3, this.battAnimSpeed * 2, this.changeAnimation);
        }
        else {  // Else not idle
          this.battAnimSpeed = round(3 / (this.kinemat.batt.aX/7));  // Animation speed gets faster as well
          // If facing right else facing left
          if (this.world.dir.batt.curr == 0 && !this.special.inAir) this.MediaPlayer.animateOld(this.batImg, this.kinemat.batt.x, this.kinemat.batt.y, 9, 13, this.dimensions.batt.scl, 4, 11, this.battAnimSpeed, this.changeAnimation);
          else if (this.world.dir.batt.curr == 1 && !this.special.inAir) this.MediaPlayer.animateOld(this.batImg, this.kinemat.batt.x, this.kinemat.batt.y, 9, 13, this.dimensions.batt.scl, 12, 19, this.battAnimSpeed, this.changeAnimation);
        }
      }
      
      // Display player hitbox
      // rect(this.kinemat.batt.x, this.kinemat.batt.y, this.dimensions.batt.calcW, this.dimensions.batt.calcH);
      // True hitbox (accounts for past location)
      // rect(min(this.kinemat.batt.pX, this.kinemat.batt.x), min(this.kinemat.batt.pY, this.kinemat.batt.y), abs(this.kinemat.batt.x - this.kinemat.batt.pX) +this.dimensions.batt.calcW, abs(this.kinemat.batt.y - this.kinemat.batt.pY)+13* this.dimensions.batt.scl);
    }
    // Get the last diections
    this.world.dir.batt.last = this.world.dir.batt.curr;
    this.world.dir.over.last = this.world.dir.over.curr;
    this.world.over.last = this.world.over.curr;
    this.world.state.overL = this.world.state.over;
  }
  
  specialMove() {
    // Set variable that dictates when can character move through platforms
    this.special.fall.pBool = this.special.fall.bool && !this.special.inAir;
    // Jump
    if (this.special.jump.bool && this.special.jump.count > 0) {  // If enough jumps remain, jump
      this.kinemat.batt.vY = -this.kinemat.batt.j*this.scaleMove;  // Add an impulse to make character go up
      this.special.jump.count --;  // Subtract from jump count for double jumps
      this.special.jump.bool = false;  // Without this, both jumps would activate within 2 frames
    }
    else {
      this.special.jump.bool = false;  // Not jumping
    }
    // Fast Fall
    if (this.special.fall.bool && this.dontChangeVY) this.special.fall.bool = false;
    if (this.special.fall.bool && this.special.fall.count > 0 && !this.dontChangeVY) {
      this.kinemat.batt.vY = this.kinemat.batt.j*2*this.scaleMove;  // Add an impulse to make character go up
      this.special.fall.count --;  // Subtract from jump count for double jumps
      this.special.fall.bool = false;  // No longer "Fast Falling" just "falling with extra steps" now
    }
    // Dash
    if (this.special.dash.bool && this.special.dash.count > 0 && this.special.dash.time < millis()) {
      this.kinemat.batt.vX += this.world.dir.batt.curr == 0 ? this.kinemat.batt.j*2*this.scaleMove : -this.kinemat.batt.j*2*this.scaleMove;  // Add impulse in X direction to dash
      this.special.dash.count --;  // Subtract from dash count so only one dash mid air
      this.special.dash.bool = false;  // No longer "dashing"
      this.special.dash.time = millis() + 500;
    }
    else this.special.dash.bool = false;  // Without this, dash would activate inconsistently
    // Wall Slide
    if (this.roomWallTouchin == 3 && this.world.dir.batt.curr == 0 || this.roomWallTouchin == this.world.dir.batt.curr) this.special.wall.bool = false;
    if (this.special.wall.bool) {
      // If character is moving slow enough
      if (abs(this.kinemat.batt.vX) <= 20*this.scaleMove && this.special.inAir) {
        // No gravity needed here
        this.kinemat.batt.vY = 0;
        this.kinemat.batt.y += this.special.wall.speed*this.scaleMove;
        this.special.wall.speed += (this.battSpeed*this.scaleMove)/10;
        this.resetSpecialCount();
      }
      // Dont let character run into wall
      else if (abs(this.kinemat.batt.vX) <= 10*this.scaleMove) {
        if (this.world.state.batt == 1) {
          // Dont let momentum move character
          this.kinemat.batt.vX = 0;
          this.kinemat.batt.aX = 0;
        }
        // Set to idle state
        this.special.wall.bool = false;
        this.world.state.batt = 1;
      }
      // Bump off wall
      else {
        this.special.wall.bool = false;
        this.special.wall.time = millis() + abs(this.kinemat.batt.vX*15/this.scaleMove);
        this.kinemat.batt.vX *= -1;
      }
    }
    else this.special.wall.speed = this.battSpeed;
    
  }
  
  updateCharCheck() {
    // Update past player coords
    this.kinemat.batt.pX = this.kinemat.batt.x;
    this.kinemat.batt.pY = this.kinemat.batt.y;
    // Kinematics
    if (abs(this.kinemat.batt.aX) > this.battSpeed * this.scaleMove && this.kinemat.batt.aX != 0) this.kinemat.batt.aX = this.battSpeed * (this.kinemat.batt.aX / abs(this.kinemat.batt.aX)) * this.scaleMove;  // Cap the friction/speed
    if (abs(this.kinemat.batt.vX) < 0.00001) this.kinemat.batt.vX = 0;  // We cant see the difference in velocity
    if (abs(this.kinemat.batt.aX) < 0.00001) this.kinemat.batt.aX = 0;  // We cant see the difference in acceleration
    this.kinemat.batt.vX += this.kinemat.batt.aX;  // Apply acceleration to X
    this.kinemat.batt.vY += this.kinemat.batt.aY*this.scaleMove;  // Apply acceleration to Y
    this.kinemat.batt.vX *= this.kinemat.batt.f;  // Apply friction to X
    // State
    if (this.special.wall.time > millis()) {
      this.world.state.batt = 1;  // If character hit wall too quickly
      this.special.jump.bool = false;  // Dont let jump
    }  
    if (this.world.state.batt == 1) this.kinemat.batt.aX /= 1.2/this.scaleMove;  // Dont let velocity stay the same when not moving
    else if (this.world.state.batt == 2) this.kinemat.batt.aX += this.world.dir.batt.curr == 0 ? this.battSpeed * this.scaleMove : -this.battSpeed *this.scaleMove;  // If facing towards the right, then the acceleration is positive, negative otherwise
  }
  
  collidePlatform() {
    // Make sure to not get confused with fast fall
    this.dontChangeVY = this.roomCollide[3] == 0;
    // If colliding with the top of a platform, not in air, and down arrow was pressed
    if (this.roomCollide[3] == 0 && !this.special.inAir && this.special.fall.pBool) {
      this.kinemat.batt.y = this.roomCollide[2] + 0.00001;  // Slightly offset togo through platform
      this.kinemat.batt.vY = 0;
      this.resetSpecialCount();
      this.special.inAir = true;
    }
    else if (this.roomCollide[3] == 0 && this.kinemat.batt.vY > 0 && !this.special.fall.pBool) {
      // Change Y coordinate
      this.kinemat.batt.y = this.roomCollide[2] - 0.00001;  // Slightly offset to not stick
      this.kinemat.batt.vY = -this.kinemat.batt.vY/5;
      this.resetSpecialCount();
      this.special.inAir = false;
    }
  }
  
  collideNormal() {
    // if collision is with walls
    if (this.roomCollide[3] == 1 || this.roomCollide[3] == 3) {
      // Change X coordinate
      this.kinemat.batt.x = this.roomCollide[3] == 1? this.roomCollide[1] + 0.00001 : this.roomCollide[1] - 0.00001;  // Slightly offset to not stick
      this.kinemat.batt.vX *= abs(this.kinemat.batt.vX < 20)? -2*this.scaleMove : -1*this.scaleMove;
    }
    // Else if collision is with bottom of object (acts like ceiling)
    else if (this.roomCollide[3] == 2) {
      // Change Y coordinate
      this.kinemat.batt.y = this.roomCollide[2] + 0.00001;  // Slightly offset to not stick
      this.kinemat.batt.vY = -this.kinemat.batt.vY/5;
    }
    // Else, collision is with top of object (acts like floor)
    else {
      // Change Y coordinate
      this.kinemat.batt.y = this.roomCollide[2] - 0.00001;  // Slightly offset to not stick
      this.kinemat.batt.vY = -this.kinemat.batt.vY/5
      this.resetSpecialCount();
      this.special.inAir = false;
    }
  }
  
  collideMoveO(i) {
    // Ill need to do collision with character and object, then wall and object, then character and object again
    // this.collideNormal();
    // for (let j = 0; j < this.RoomVar.obstList.length; j ++) {
    //   let temp = this.MediaPlayer.rectRectCollideCoords(this.RoomVar.obstList[i].pX, this.RoomVar.obstList[i].pY, this.RoomVar.obstList[i].x, this.RoomVar.obstList[i].y, this.RoomVar.obstList[i].wid, this.RoomVar.obstList[i].hgt, this.kinemat.batt.x, this.kinemat.batt.y, this.dimensions.batt.calcW, this.dimensions.batt.calcW);
    //   // if collision is with walls
    //   if (temp[3] == 1 || temp[3] == 3) {
    //     this.RoomVar.obstList[i].x = temp[3] == 1? this.kinemat.batt.x - 0.00001 - this.RoomVar.obstList[i].wid: this.kinemat.batt.x + 0.00001 + this.dimensions.batt.calcW;  // Slightly offset to not stick
    //   }
    //   // Else if collision is with bottom of object
    //   else if (temp[3] == 2) {
    //     this.RoomVar.obstList[i].y = this.kinemat.batt.y - 0.00001 - this.RoomVar.obstList[i].hgt;
    //   }
    //   // Else, collision is with top of object
    //   else {
    //     this.RoomVar.obstList[i].y = this.kinemat.batt.y + 0.00001 + this.dimensions.batt.calcH;
    //   }
    // }
    // this.RoomVar.obstList[i].pX = this.RoomVar.obstList[i].x;
    // this.RoomVar.obstList[i].pY = this.RoomVar.obstList[i].y;
  }
  
  collideMoveB(i) {
    
  }
  
  collideBox(i) {
    // Set collision coordinates variable for box
    this.roomCollide = this.MediaPlayer.nRectRectCollideCoords(this.kinemat.batt.pX, this.kinemat.batt.pY, this.kinemat.batt.x, this.kinemat.batt.y, this.dimensions.batt.calcW, this.dimensions.batt.calcH, this.RoomVar.obstList[i].x, this.RoomVar.obstList[i].y, this.RoomVar.obstList[i].wid, this.RoomVar.obstList[i].hgt);
    // Iterate extra times in case of edge cases (like when the player runs into a wall while on ground)
    for (let j = 0; j < 2; j ++) {
      if (this.roomCollide[0]) {  // If colliding
        // If collision is with walls
        if (this.roomCollide[3] == 1 || this.roomCollide[3] == 3) {  // Change X coordinate
          this.kinemat.batt.x = this.roomCollide[3] == 1? this.roomCollide[1] - 0.00001 : this.roomCollide[1] + 0.00001;  // Slightly offset to not stick
          // Set variables for wall sliding
          this.roomWallTouchin = this.roomCollide[3];
          this.special.wall.bool = true;
        }
        // Else if collision is with floor of object
        else if (this.roomCollide[3] == 2) {  // Change Y coordinate
          this.kinemat.batt.y = this.roomCollide[2] - 0.00001;  // Slightly offset to not stick
          this.kinemat.batt.vY = -this.kinemat.batt.vY/5
          this.resetSpecialCount();
          this.special.inAir = false;  // Is on the ground, so no longer in air
        }
        // Else, collision is with top of object (acts like ceiling)
        else {  // Change Y coordinate
          this.kinemat.batt.y = this.roomCollide[2] + 0.00001;  // Slightly offset to not stick
          this.kinemat.batt.vY = -this.kinemat.batt.vY/5
        }
        // Look for collisions again (edge cases remember?)
        this.roomCollide = this.MediaPlayer.nRectRectCollideCoords(this.kinemat.batt.pX, this.kinemat.batt.pY, this.kinemat.batt.x, this.kinemat.batt.y, this.dimensions.batt.calcW, this.dimensions.batt.calcH, this.RoomVar.obstList[i].x, this.RoomVar.obstList[i].y, this.RoomVar.obstList[i].wid, this.RoomVar.obstList[i].hgt);
      }
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
  
  animateMoveOver(speed, start, frames, ignore=false, fullAnim=false) {
    // console.log(this.world.dir.over.curr*frames, this.MediaPlayer.index)
    let startReal = start + this.world.dir.over.curr * frames;
    this.moveX = 0; this.moveY = 0;
    if (fullAnim && this.animateTill[4] != frameCount) this.animateTill = [true, this.world.state.over, this.world.dir.over.curr, startReal+frames-1, frames];
    if (this.collisionOver(this.world.state.over) != this.world.dir.over.curr || ignore) {
      if (this.world.dir.over.curr % 2 == 1) speed *= sin(45);
      if (this.world.dir.over.curr % 4 != 2) this.moveX = this.world.dir.over.curr % 7 < 2? speed : -speed;
      if (this.world.dir.over.curr % 4 - 1 != -1) this.moveY = this.world.dir.over.curr < 4? speed : -speed;
      this.MediaPlayer.animate(this.ovrImg, this.kinemat.over.x, this.kinemat.over.y, 28, 28, this.dimensions.over.scl, startReal, startReal + frames - 1, this.overAnimSpeed, this.changeAnimation, this.world.state.overL != this.world.state.over);
    }
    else this.animateTill[0] = false;
  }
  
  resetSpecialCount() {
    this.special.jump.count = 2;  // Reset jump count
    this.special.fall.count = 1;  // Reset fall count
    this.special.dash.count = 1;  // Reset dash count
  } 
  
}
