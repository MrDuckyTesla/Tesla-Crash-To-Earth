class Character {
  constructor(teslaImage, x, y, menu, cList=[111, 111, 255, 255, 111, 111], leader=null) {
    this.menu = menu;
    this.x = x;
    this.y = y;
    this.currWalk = false;
    this.currSide = 0;
    this.counter = 0;
    this.currSprint = false;
    this.leader = leader;
    this.updateCoords = [];
    this.framCount = [0, 0];
    this.currCounter = [0];
    this.cList = cList;
    this.teslaImage = teslaImage;
    this.imgX = 
  }
  show() {
    this.move();
  }
  colorChange() {
    this.imageColorRGB(this.listAdd(this.colorVarientBody(this.cList[0], this.cList[1], this.cList[2]), this.colorVarientVisor(this.cList[3], this.cList[4], this.cList[5])));
  }
  move() {
    // only drop coords when the player's direction changes or when the player speeds up/slows down.
    // When the player stops the follower also stops
    if (this.leader == null) {
      if (keyIsDown(16) && this.currWalk == true) {
        this.currSprint = true;  // Sprinting
        this.updateCoords.push([this.x, this.y, this.currSide, this.currWalk, this.currSprint]);
      }
      else {
        this.currSprint = false;  // Not Sprinting
        if (this.updateCoords.length > 1) {
          if (this.updateCoords[this.updateCoords.length - 1][4]) {
            this.updateCoords.push([this.x, this.y, this.currSide, this.currWalk, this.currSprint]);
          }
        }
      }
      let prevDirection = this.currSide;
      let prevMove = this.currWalk;
      // Make universal this.walk(), less if statements
      // if (((keyIsDown(68) || keyIsDown(39)) && (keyIsDown(83) || keyIsDown(40))))  // Walk Right - Down
        this.walk(1, 84, 20, 28, 10, -10, true, true, true);
      // else if (((keyIsDown(83) || keyIsDown(40)) && (keyIsDown(65) || keyIsDown(37))))  // Walk Down - Left
        this.walk(3, 84, 28, 28, -10, -10, true, true, true);
      // else if (((keyIsDown(65) || keyIsDown(37)) && (keyIsDown(87) || keyIsDown(38))))  // Left - Up
        this.walk(5, 84, 36, 28, -10, 10, true, true, true);
      // else if (((keyIsDown(87) || keyIsDown(38)) && (keyIsDown(68) || keyIsDown(39))))  // Up - Right
        this.walk(7, 84, 44, 28, 10, 10, true, true, true);
      // else if (keyIsDown(68) || keyIsDown(39))  // Walk Right
        this.walk(0, 84, 16, 28, 10, 10, true, true, false);
      // else if (keyIsDown(83) || keyIsDown(40))  // Walk Down
        this.walk(2, 84, 24, 28, -10, -10, true, false, true);
      // else if (keyIsDown(65) || keyIsDown(37))  // Walk Left
        this.walk(4, 84, 32, 28, -10, 10, true, true, false);
      // else if (keyIsDown(87) || keyIsDown(38))  // Walk Up
        this.walk(6, 84, 40, 28, 10, 10, true, false, true);
      // else
        this.currWalk = false;
      // if (this.currSide == 0 && this.currWalk == false)  // Idle Right
        this.walk(0, 28, 0, 28, 10, 10, false, false, false);
      // else if (this.currSide == 1 && this.currWalk == false)  // Idle Right - Down
        this.walk(1, 28, 2, 28, 10, 10, false, false, false);
      // else if (this.currSide == 2 && this.currWalk == false)  // Idle Down
        this.walk(2, 28, 4, 28, 10, 10, false, false, false);
      // else if (this.currSide == 3 && this.currWalk == false)  // Idle Down - Left
        this.walk(3, 28, 6, 28, 10, 10, false, false, false);
      // else if (this.currSide == 4 && this.currWalk == false)  // Idle Left
        this.walk(4, 28, 8, 28, 10, 10, false, false, false);
      // else if (this.currSide == 5 && this.currWalk == false)  // Idle Down
        this.walk(5, 28, 10, 28, 10, 10, false, false, false);
      // else if (this.currSide == 6 && this.currWalk == false)  // Idle Up
        this.walk(6, 28, 12, 28, 10, 10, false, false, false);
      // else if (this.currSide == 7 && this.currWalk == false)  // Idle Up
        this.walk(7, 28, 14, 28, 10, 10, false, false, false);
      
      if (this.currSide != prevDirection || this.currWalk != prevMove)
        this.updateCoords.push([this.x, this.y, this.currSide, this.currWalk, this.currSprint]);
    // console.log(this.updateCoords);
    }
    else {
      if (this.leader.updateCoords.length > 1) {
        this.x = this.leader.updateCoords[0][0];
        this.y = this.leader.updateCoords[0][1];
        this.currSide = this.leader.updateCoords[2];
        this.currWalk = false;
        this.currSprint = false;
        this.leader.updateCoords.shift();
      }
      // console.log(this.updateCoords);
      this.walk(0, 84, 16, 28, 10, 10, true, true, false); // Walk Right
        // if (true)
        //   this.updateCoords.shift();
        // this.walk(0, 84, 16, 28, 10, 10, true, true, false); // Walk Right
    }
  }
  resetCounter(num) {
    if (this.counter > num) {
      this.counter = 0;
    }
  }
  imageDraw(num1) {  // Slow down image
    this.framCount.shift();
    this.framCount.unshift(frameCount);
    if (this.currSprint == false) {
      if (this.framCount[1] <= this.framCount[0] ) {
        this.framCount[1] = this.framCount[0] += 3;
        image(tesla, this.x, this.y, 140, 140, num1 * 28 + this.counter, 0, 28, 28);
        this.currCounter.shift();
        this.currCounter.unshift(this.counter);
      }
      else {
        if (this.currWalk == false && this.currCounter[0] > 28)
          this.currCounter[0] = 28;
        else if (this.currWalk == true && this.currCounter[0] > 84)
          this.currCounter[0] = 84;
        image(tesla, this.x, this.y, 140, 140, num1 * 28 + this.currCounter[0], 0, 28, 28);
      }
    }
    else
      image(tesla, this.x, this.y, 140, 140, num1 * 28 + this.counter, 0, 28, 28);
  }
  imageColorRGB(rgbList, imgwidth=this.teslaImage.width, imgheight=this.teslaImage.height, startY=0, orgrgbList=[30, 132, 159, 182, 170, 187]) {  // Changes color of image
    // takes in image, rgb values, width, height, starting Y value, and the origional rgb values associated wth the image (because the image is unsaturated, the list would be 30, 30, 30, 132, 132, 132...ect)
    let pixelList = [0, 1, 2];  // Determines which RGB value gets changed (0 = r, 1 = g, 2 = b)
    for (let f = 0; f < pixelList.length; f ++)  // Iterate through list length
      pixelList[f] += imgwidth * startY;  // Start the pixelList at startY * width
    this.teslaImage.loadPixels();  // Load pixels for changing
      for (let j = 0; j < imgwidth; j++) {  // Iterate through Width
        for (let l = 0; l < imgheight; l++) {  // Iterate through Image Height
          for (let y = 0; y < orgrgbList.length; y++) {  // Iterate through original list
            if (this.teslaImage.pixels[pixelList[0]] == orgrgbList[y]) {  // If origional color == pixel color
              this.teslaImage.pixels[pixelList[0]] = rgbList[y * 3];  // Red of image
              this.teslaImage.pixels[pixelList[1]] = rgbList[y * 3 + 1];  // Green of image
              this.teslaImage.pixels[pixelList[2]] = rgbList[y * 3 + 2];  // Blue of image
              y = orgrgbList.length;  // Only change one color, exit loop when done
            }
          }  // Iterate through list length
          for (let t = 0; t < pixelList.length; t++)
            pixelList[t] += 4;  // Add num to List at index t
        }
      }  // Update Pixels from the changes made
    this.teslaImage.updatePixels();
  }
  sprintSpeed(add) {  // If currently sprinting, and walking
    if (this.currSprint == true && this.currWalk == true)  // Return 3x the speed
      return add * 3;
    else  // Else return normal speed
      return add;
  }
  colorVarientBody (r, g, b) {
    let colorList = [];  // List to store new colors in
    if (r == g && g == b && r == b)  // If Red, Green, and Blue are all equal
      colorList = [r - 166, r - 166, r - 166, r - 41, r - 41, r - 41, r, r, r, r + 34, r + 34, r + 34];  // Assign values
    // If 2 of the 3 values are equal, and are larger than the other value
    else if (r == g && r != b && r > b)  // Else if Red and Green are equal, Red is not equal to Blue, and Red is greater than Blue
      colorList = [r - 166, g - 166, b - 111, r, g - 41, b, r - 41, g, b, r + 34, g + 34, b];  // Assign values
    else if (r == b && r != g && r > g)  // Else if Red and Blue are equal, Red is not equal to Green, and Red is greater than Green
      colorList = [r - 166, g - 111, b - 166, r - 41, g, b - 41, r, g, b, r + 34, g, b + 34];  // Assign values
    else if (g == b && g != r && g > r)  // Else if Green and Blue are equal, Green is not equal to Red, and Green is greater than Red
      colorList = [r - 111, g - 166, b - 166, r, g - 41, b - 41, r, g, b, r, g + 34, b + 34];  // Assign values
    // If 2 of the 3 values are equal, and are smaller than the other value
    else if (r == g && r != b && r < b)  // Else if Red and Green are equal, Red is not equal to Blue, and Red is less than Blue
      colorList = [r - 111, r - 111, b - 166, r - 41, r - 41, b, r, r, b, r + 34, r + 34, b];  // Assign values
    else if (r == b && r != g && r < g)  // Else if Red and Blue are equal, Red is not equal to Green, and Red is less than Green
      colorList = [r - 111, g - 166, r - 111, r - 41, g, r - 41, r, g, r, r + 34, g, r + 34];  // Assign values
    else if (g == b && g != r && g < r)  // Else if Green and Blue are equal, Green is not equal to Red, and Green is less than Red
      colorList = [r - 166, g - 111, g - 111, r, g - 41, g - 41, r, g, g, r, g + 34, g + 34];  // Assign values
    else {  // Else, the color is random
      if (max(r, g, b) == r)  // If Red is the greatest number
        colorList = [r - 166, (g + b)/2 - 111, (g + b)/2 - 111, r - 41, (g + b)/2, (g + b)/2, r, (g + b)/2, (g + b)/2, r + 34, (g + b)/2, (g + b)/2];  // Assign values
      else if (max(r, g, b) == g)  // If Green is the greatest number
        colorList = [(r + b)/2 - 111, g - 166, (r + b)/2 - 111, (r + b)/2, g - 41, (r + b)/2, (r + b)/2, g, (r + b)/2, (r + b)/2, r + 34, (r + b)/2];  // Assign values
      else if (max(r, g, b) == b)  // If Blue is the greatest number
        colorList = [(r + g)/2 - 111, (r + g)/2 - 111, b - 166, (r + g)/2, (r + g)/2, b - 41, (r + g)/2, (r + g)/2, b, (r + g)/2, (r + g)/2, b + 34];  // Assign values
    }
    for (let i = 0; i < colorList.length; i++) {  // Iterate through newly made list
      if (min(colorList[i] < 0)) {  // If list at index i is less than 0
        while (min(colorList) < 0) {
            for (let j = 0; j < colorList.length; j++) {
              colorList[j]++;
            }
          }
        }
      else if (max(colorList[i] > 255)) {  // If list at index i is less than 0
        while (max(colorList) > 255) {
            for (let j = 0; j < colorList.length; j++) {
              colorList[j]--;
            }
          }
        }
      }
    return colorList;  // Return list
  }
  colorVarientVisor (r, g, b) {
    let colorList = [];  // List to store new colors in
    if (r == g && g == b)
      colorList = [r + 21, g + 21, b + 21, r + 59, g + 59, b + 59];  // Assign values
    else if (r == g && r != b && r > b)  // Else if Red and Green are equal, Red is not equal to Blue, and Red is greater than Blue
      colorList = [r + 21, g + 21, b - 20, r + 59, g + 59, b];  // Assign values
    else if(r == b && r != g && r > g)  // Else if Red and Blue are equal, Red is not equal to Green, and Red is greater than Green
      colorList = [r + 21, g - 20, b + 21, r + 59, g, b + 59];  // Assign values
    else if(g == b && g != r && g > r)  // Else if Green and Blue are equal, Green is not equal to Red, and Green is greater than Red
      colorList = [r - 20, g + 21, b + 21, r, g + 59, b + 59];  // Assign values
    else if (r == g && r != b && r < b)  // Else if Red and Green are equal, Red is not equal to Blue, and Red is less than Blue
      colorList = [r - 20, g - 20, b + 21, r, g, b + 59];  // Assign values
    else if(r == b && r != g && r < g)  // Else if Red and Blue are equal, Red is not equal to Green, and Red is less than Green
      colorList = [r - 20, g + 21, b - 20, r, g + 59, b];  // Assign values
    else if(g == b && g != r && g < r)  // Else if Green and Blue are equal, Green is not equal to Red, and Green is less than Red
      colorList = [r + 21, g - 20, b - 20, r + 59, g, b];  // Assign values
    else {  // Else, the color is random
      if (max(r, g, b) == r)  // If Red is the greatest number
        colorList = [r + 21, g - 20, b - 20, r + 59, g, b];  // Assign values
      else if (max(r, g, b) == g)  // If Green is the greatest number
        colorList = [r - 20, g + 21, b - 20, r, g + 59, b];  // Assign values
      else if (max(r, g, b) == b)  // If Blue is the greatest number
        colorList = [r + 21, g + 21, b - 20, r + 59, g + 59, b];  // Assign values
    }
    for (let i = 0; i < colorList.length; i++) {  // Iterate through newly made list
      if (min(colorList[i] < 0)) {  // If list at index i is less than 0
        while (min(colorList) < 0) {
            for (let j = 0; j < colorList.length; j++) {
              colorList[j]++;
            }
          }
        }
      else if (max(colorList[i] > 255)) {  // If list at index i is less than 0
        while (max(colorList) > 255) {
            for (let j = 0; j < colorList.length; j++) {
              colorList[j]--;
            }
          }
        }
      }
    return colorList;
  }
  walk(num1, num2, num3, num4, num5, num6, boo1, boo2, boo3) {
    this.currWalk = boo1;
    this.currSide = num1;
    this.resetCounter(num2);
    this.imageDraw(num3);
    this.counter += num4;
    if (boo2)
      this.x += this.sprintSpeed(num5);
    if (boo3)
      this.y -= this.sprintSpeed(num6);
  }
  listAdd(list1, list2) {
    let newList = [];
    for (let i = 0; i < list1.length; i ++) {
      newList.push(list1[i]);
    }
    for (let j = 0; j < list2.length; j ++) {
      newList.push(list2[j]);
    }
    return newList;
  }
  // OLD CODE GRAVEYARD
  
  // collides(x1, y1, x2, y2, s) {
  //   if (x1 + 207.5 <= x2 || x1 - 67.5 >= x2 || y1 + 207.5 <= y2 || y1 - 67.5 >= y2) {
  //     // fill("green");
  //     // rect(x1, y1, 140, 140);
  //     return true;
  //   }
  //   else {
  //     // fill("red");
  //     // rect(x1, y1, 140, 140);
  //     return false;
  //   }
  // }
          // }
      // else {
      //   let tempList = [];
      //   this.updateCoords.push(this.leader.x + 67.5, this.leader.y + 70, this.leader.currSide, this.leader.currWalk, this.leader.currSprint);
      //   for (let i = 0; i < 10; i ++) {
      //     tempList.unshift(this.updateCoords[this.updateCoords.length - 1 - i]);
      //   // }
      //   // console.log(tempList);
      //   this.x = tempList[0] - 67.5;
      //   this.y = tempList[1] - 70;
      //   // this.currSide = tempList[2];
      //   // this.currWalk = tempList[3];
      //   // this.currSprint = tempList[4];
      //   this.currWalk = false;
      //   this.currSprint = false;
      // }
        // image(tesla, this.x, this.y, 140, 140, num1 * 140 + this.counter, 0, 140, 140);
        // image(tesla, this.x, this.y, 140, 140, num1 * 140 + this.counter, 0, 140, 140);
        // image(tesla, this.x, this.y, 140, 140, num1 * 140 + this.currCounter[0], 0, 140, 140);
        // image(tesla, this.x, this.y, 140, 140, num1 * 140 + this.currCounter[0], 0, 140, 140);
        // this.x = this.updateCoords[0] - 67.5;
      // this.y = this.updateCoords[1] - 70;
      // console.log(this.x, this.y, this.updateCoords[0], this.updateCoords[1], 28);
      // console.log(this.collides(this.x, this.y, this.updateCoords[0], this.updateCoords[1], 28));
      // if (this.collides(this.x, this.y, this.updateCoords[0], this.updateCoords[1], 28) == true) {
        // if (this.collides(this.x, this.y, this.updateCoords[0], this.updateCoords[1], 28) == true) {
        //   this.updateCoords = [];
        // }
        // console.log(this.updateCoords, this.tempCoords);
      //     else {
      //    }
          // image(tesla, this.x, this.y, 140, 140, num1 * 140 + this.counter, 0, 140, 140);
          // image(tesla, this.x, this.y, 140, 140, num1 * 140 + this.counter, 0, 140, 140);
            // if (this.updateCoords[this.updateCoords.length - 1 - i] == false) {
          //   this.updateCoords[this.updateCoords.length - 1 - i] = true;
          // }
          // this.tempCoords = [];
      //     this.updateCoords.push(this.tempCoords[i]);
      //     this.tempCoords.pop();
            // this.updateCoords.push(this.tempCoords[this.tempCoords.length - 1 - i]);
            // console.log(this.updateCoords.length, this.updateCoords.length - 1, this.updateCoords)
          // this.updateCoords.pop();
          //   this.updateCoords[this.updateCoords.length - 1 - i] = false;
          // }
          // this.tempCoords = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
          // this.tempCoords.unshift(this.updateCoords[this.updateCoords.length - 1 - i]);
          // this.updateCoords.pop();
            // if (this.updateCoords[this.updateCoords.length - 1 - i] == true) {
            // this.tempCoords.push(this.updateCoords[this.updateCoords.length - 1 - i]);
        // if (this.leader.currWalk == false && this.tempCoords.length == 0) {
        //   for (let i = 0; i < 10; i ++) {
        //     if (this.updateCoords[this.updateCoords.length - 1 - i] == true) {
        //         this.updateCoords[this.updateCoords.length - 1 - i] = false;
        //     }
        //   }
        // }
        // else if (this.leader.currWalk == true && this.tempCoords.length == 10) {
        //   for (let i = 0; i < 10; i ++) {
        //     this.tempCoords.pop();
        //   }
        // }
  // if (this.follow == true) {  // Following
    //   this.updateCoords.push(this.leader.x + 67.5, this.leader.y + 70, this.leader.currSide, this.leader.currWalk, this.leader.currSprint);
    //   if (this.updateCoords.length >= 70) {
    //     for (let i = 0; i < 5; i ++) {
    //       this.updateCoords.shift();
    //     }
    //   }
    //   this.currSide = this.updateCoords[2];
    //   this.currWalk = this.updateCoords[3];
    //   this.currSprint = this.updateCoords[4];
    //       if (this.currSide == 0 && this.currWalk == true) {
    //         this.walk(0, 28, 0, 28, 10, true, false, false);
    //       }
    //       else if (this.currSide == 1 && this.currWalk == true) {
    //         this.walkRightDown();
    //       }
    //       else if (this.currSide == 2 && this.currWalk == true) {
    //         this.walkDown();
    //       }
    //       else if (this.currSide == 3 && this.currWalk == true) {
    //         this.walkDownLeft();
    //       }
    //       else if (this.currSide == 4 && this.currWalk == true) {
    //         this.walkLeft();
    //       }
    //       else if (this.currSide == 5 && this.currWalk == true) {
    //         this.walkLeftUp();
    //       }
    //       else if (this.currSide == 6 && this.currWalk == true) {
    //         this.walkUp();
    //       }
    //       else if (this.currSide == 7 && this.currWalk == true) {
    //         this.walkUpRight();
    //       }
    // }
  // if (this.menu.mouseM == true) {
    //   if (mouseX >= this.x + 135 && mouseY <= this.y + 140 && mouseY >= this.y) {  // Walk Right
    //     this.walk(0, 28, 0, 28, 10, true, false, false);
    //   }
    //   else if (mouseX >= this.x + 135 && mouseY >= this.y + 140) {  // Walk Right - Down
    //     this.currWalk = true;
    //     this.currSide = 1;
    //     this.walkRightDown();
    //   }
    //   else if (mouseX >= this.x && mouseX <= this.x + 135 && mouseY >= this.y + 140) {  // Walk Down
    //     this.currWalk = true;
    //     this.currSide = 2;
    //     this.walkDown();
    //   }
    //   else if (mouseX <= this.x && mouseY >= this.y + 140) {  // Walk Down - Left
    //     this.currWalk = true;
    //     this.currSide = 3;
    //     this.walkDownLeft();
    //   }
    //   else if (mouseX <= this.x && mouseY <= this.y + 140 && mouseY >= this.y) {  // Walk Left
    //     this.currWalk = true;
    //     this.currSide = 4;
    //     this.walkLeft();
    //   }
    //   else if (mouseX <= this.x && mouseY <= this.y) {  // Walk Left - Up
    //     this.currWalk = true;
    //     this.currSide = 5;
    //     this.walkLeftUp();
    //   }
    //   else if (mouseX >= this.x && mouseX <= this.x + 135 && mouseY <= this.y) {  // Walk Up
    //     this.currWalk = true;
    //     this.currSide = 6;
    //     this.walkUp();
    //   }
    //   else if (mouseX >= this.x + 135 && mouseY <= this.y) {  // Walk Up - Right
    //     this.currWalk = true;
    //     this.currSide = 7;
    //     this.walkUpRight();
    //   }
    //   else {
    //     this.currWalk = false;
    //   }
    // }
  // 0 = right
  // 1 = right - down
  // 2 = down
  // 3 = down - left
  // 4 = left
  // 5 = left - up
  // 6 = up
  // 7 = up - right
}