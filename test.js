function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}













































  // if (circRectCollide(mouseX, mouseY, 50, 100, 240, 45, 100)) fill(0, 255, 0);
  // else fill(255, 0, 0);
  // circle(mouseX, mouseY, 50);
  // rect(100, 240, 45, 100);
// }

// function rectRectCollide(r1x, r1y, r1w, r1h, r2x, r2y, r2w, r2h) {
//   if (r1x + r1w <= r2x || r2x + r2w <= r1x || r1y + r1h <= r2y || r2y + r2h <= r1y) return true;
//   return false;
// }

// function circCircCollide(c1x, c1y, c1r, c2x, c2y, c2r) {
//   if (dist(c1x, c1y, c2x, c2y) >= c1r/2 + c2r/2) return true;
//   return false;
// }

// function circRectCollide(cx, cy, cr, rx, ry, rw, rh) {
//   if (cx + cr/2 >= rx && rx + rw >= cx - cr/2 && cy + cr/2 >= ry && ry + rh >= cy - cr/2) return true;
//   return false;
// }










































// function setup() {
//   createCanvas(400, 400);
// }

// function draw() {
//   background(220);
//   // rect(175, 175, 50, 50);
//   circle(175, 175, 100);
//   // line(175, height/3, mouseX, mouseY);
//   circle(mouseX, mouseY, 10);
//   if (pointCirc(mouseX, mouseY, 175, 175, 100)) fill(0, 255, 0);
//   else fill(255, 0, 0)
  
  
//   // lineCoord = lineLine(width/2, height/3, mouseX, mouseY, width - 50, height/2, 0, height - 50);
//   // erect = lineRect(175, height/3, mouseX, mouseY, 175, 175, 100, 50);
//   // if (lineCoord[0]) {
//   //   circle(lineCoord[1], lineCoord[2], 10);
//   // }
  
//   // coords = lineRadius(width/2, height/2, mouseX, mouseY, 1000, true);
//   // line(width/2, height/2, coords[0], coords[1])
//   // console.log(erect);
//   // for (let i = 0; i < erect.length; i ++) {
//   //   if (erect[i][0]) {
//   //     circle(erect[i][1], erect[i][2], 10);
//   //   }
//   // }
// }

// function pointRect(px, py, rx, ry, rw, rh) {
//   if (px > rx && px < rx + rw && py > ry && py < ry + rh) return true;
//   return false;
// }

// function pointCirc(px, py, cx, cy, cr) {
//   if (dist(px, py, cx, cy) < cr/2) return true;
//   return false;
// }

// function lineLine(x1, y1, x2, y2, x3, y3, x4, y4) {
//   let temp, m1, m2, b1, b2, iX, iY, d1, d2;
//   // Find slopes
//   m1 = (y2 - y1) / (x2 - x1);
//   m2 = (y4 - y3) / (x4 - x3);
//   // Find y intercepts
//   b1 = y1 - m1 * x1;
//   b2 = y3 - m2 * x3;
//   // Find X coordinate while also dealing with vertical and horizontal slopes
//   if (x4 - x3 == 0) iX = x3;
//   else if (x2 - x1 == 0) iX = x1;
//   else iX = (b1 - b2) / (m2 - m1);
//   // Get Y coordinate while also dealing with horizontal slope
//   iY = (x4 - x3) == 0? m1 * iX + b1: m2 * iX + b2;
//   d1 = dist(x1, y1, x2, y2);
//   d2 = dist(x3, y3, x4, y4);
//   if (dist(iX, iY, x2, y2) > d1 || dist(iX, iY, x1, y1) > d1 || dist(iX, iY, x3, y3) > d2 || dist(iX, iY, x4, y4) > d2) return [false];
//   return [true, iX, iY];
// }

// function lineRect(x1, y1, x2, y2, x, y, w, h) {
//   return [lineLine(x1, y1, x2, y2, x, y, x+w, y), lineLine(x1, y1, x2, y2, x+w, y, x+w, y+h), lineLine(x1, y1, x2, y2, x+w, y+h, x, y+h), lineLine(x1, y1, x2, y2, x, y+h, x, y)];
// }

// function lineRadius(centerX, centerY, endX, endY, radius, forceRadius=false) {  // Returns coords to keep a line within a radius
//     if (forceRadius || dist(centerX, centerY, endX, endY) > radius) {  // If the line is outside the radius
//       endX -= centerX; endY -= centerY;  // Make sure the x and y can never be 0
//       let temp = endX, num = 1;  // Make a copy of x
//       if (endX < 0) num = -1;
//       return [num*radius*cos(atan(endY/endX)) + centerX, num*radius*sin(atan(endY/temp)) + centerY];
//     }
//     else return [endX, endY];
//   }
















































// // let spriteSheet, sprites;

// // function preload() {
// //   spriteSheet = loadImage("Assets/Other/Test Files/Character_Voxel_Frames.png");
// //   // tesla3d = loadModel("Assets/Test/ninja-0-idle2.obj");
// // }

// // function setup() {
// //   createCanvas(400, 400, WEBGL);
// //   sprites = grabSprites(spriteSheet);
// //   angleMode(DEGREES);
// // }

// // function draw() {
// //   background(50);
// //   orbitControl();
// //   // rotateY(frameCount*5);
// //   for (let i = 0; i < 8; i ++) {
// //     push();
// //     rotateY(i * 45);
// //     image(sprites[i], -14, 0);
// //     pop();
// //   }
// //   image(spriteSheet, -100, -150);
// //   // model(tesla3d);
// // }

// // function grabSprites(img, state=0) {
// //   let imgs = [];
// //   img.loadPixels();
// //   for (let i = 0; i < 8; i ++) {
// //     imgs.push(createImage(28, 28));
// //     imgs[i].copy(img, i*28, state*28, 28, 28, 0, 0, 28, 28);
// //   }
// //   return imgs;
// // }

// // // function voxelize(img, angle) {
// // //   for (let i = 0; i < img.width; i ++) {
// // //     for (let j = 0; j < img.height; j ++) {
// // //       push();
// // //       rotateY(angle);
// // //       translate(i, j);
// // //       fill(img.get(i, j));
// // //       box(1);
// // //       pop();
// // //     }
// // //   }
// // // }




















































// // // // let  cvs; //circles = [], cvs;
// // // // let yAdd = true;

// // // // function setup() {
// // // //   cvs = createCanvas(600, 600);
// // // // }

// // // // function draw() {
// // // //   background(50);
// // //   // ellipse(x, y, 10, 10);
// // //   // ellipse(x2, y2, 10, 10);
// // //   // if (frameCount == 1) {
// // //   // noStroke();
// // //   // console.log("before: " + x + ", " + y);
// // //   // Make particle system??
  
// // //   // let theta = cos(110**2 + 60**2 - 50**2);
// // //   // let a = dist(width/2, height/2, mouseX, mouseY);
// // //   // if (a > 110) {
// // //   //   a = 110;
// // //   // }
// // //   // line(width/2, height/2, coords[0], coords[1]);
// // //   // line(coords[0], coords[1], coords[2], coords[3]);
// // //   // console.log(acos(1))
// // //   // let theta = acos((a**2 + 60**2 - 50**2)/(2*a*60));
// // //   // a^2 + b^2 - c^2
// // //   // console.log(theta);
// // //   // line(60*cos(theta), 60*sin(theta), width/2, height/2);
// // //   // console.log(mouseX*theta, mouseY*theta)
// // //   // ellipse( mouseX*theta, mouseY*theta, 10, 10)
// // //   // let coords1 = lineRadius(width/2, height/2, mouseX, mouseY, 60, true);
// // //   // let coords2 = lineRadius(coords1[0], coords1[1], mouseX, mouseY, 50, true);
// // //   // coords2 = lineRadius(coords[0], coords[1], x2, height, 75);
// // //   // coords3 = lineRadius(coords2[0], coords2[1], x3, height, 50);
// // //   // stroke(61, 61, 200);
// // //   // line(width/2, height/2, mouseX, mouseY);
  
// // //   // let x = 120*cos(frameCount/10) + width/2;
// // //   // let y = 50*sin(frameCount/10) + height/1.35;
// // //   // let x2 = 120*cos(frameCount/10+PI) + width/2;
// // //   // let y2 = 50*sin(frameCount/10+PI) + height/1.35;
// // //   // let coords = getLimbCoords(width/2, height/2, 100, 100, x, y, true);
// // //   // let coords2 = getLimbCoords(width/2, height/2, 100, 100, x2, y2, true);
  
// // //   // let x = -120*cos(frameCount/10+PI) + width/2;
// // //   // let x = (width/2)*cos(frameCount/50) + width/2;
// // //   // let x = width/2
// // //   // let bool = true, num = 1;
// // //   // if (x > width/2) {
// // //   //   bool = false;
// // //   //   num *= -1;
// // //   // }
// // //   // let y = 5*sin(frameCount/2.5+PI/2);
// // //   // let bodyCoords = lineRadius(x, height/2+y, x+50*num, height/2-100, 30);
// // //   // animateLegsRun(x, height/2 + y, 100*0.1, 70*0.1, 10, [48, 43, 164], [28, 89, 198], 5, 5, 1.35, bool);  // Legs
// // //   // animateLegsRun(bodyCoords[0], bodyCoords[1], 100*0.1, 25*0.1, 10, [48, 43, 164], [28, 89, 198], 5, 5, 1.35, !bool);  // Arms
// // //   // line(bodyCoords[0], bodyCoords[1], x, height/2 + y);
// // //   // line(bodyCoords[0]+10*num, bodyCoords[1] + y - 10, bodyCoords[0], bodyCoords[1]);
// // //   // // nostroke();
// // //   // fill(28, 89, 198);
// // //   // ellipse(bodyCoords[0]+10*num, bodyCoords[1] + y - 10, 15, 15);
// // //   // fill(255, 111, 111);
// // //   // noStroke();
// // //   // if (num == 1)  rect(bodyCoords[0]+8, bodyCoords[1] + y - 15, 15, 5);
// // //   // else rect(bodyCoords[0]-23, bodyCoords[1] + y - 15, 15, 5);
  
// // //   // strokeWeight(5);
// // //   // fill(111, 111, 255);
// // //   // stroke(11, 11, 150);
// // //   // line(width/2, height/2, coords2[0], coords2[1]);
// // //   // line(coords2[0], coords2[1], coords2[2], coords2[3]);
// // //   // stroke(111, 111, 255);
// // //   // line(width/2, height/2, coords[0], coords[1]);
// // //   strokeWeight(5);
// // //   coords = getLimbCoords(width/2, height/2, 50, 100, mouseX, mouseY);
// // //   line(width/2, height/2, coords[0], coords[1]);
// // //   line(coords[0], coords[1], coords[2], coords[3]);
  
// // //   // line(coords2[0], coords2[1], coords3[0], coords3[1]);
// // //   // line(coords1[0], coords1[1], width/2, height/2);
// // //   // line(coords2[0], coords2[1], coords1[0], coords1[1]);
// // //   // ellipse(coords[0], coords[1], 25, 25);
// // //   // ellipse(coords2[0], coords2[1], 20, 20);
// // //   // ellipse(coords3[0], coords3[1], 15, 15);
  
// // // //   fill(255, 111, 111);
// // //   // rect(x-50, y-20, 100, 20)
  
// // //   // line(x+10, y+2, x+20, y + 10)
// // //   // line(x-10, y+2, x-20, y + 10)
  
// // //   noSmooth();
// // //   let resolution = 5;
// // //   let pix = get();
// // //   pix.resize(width/resolution, height/resolution, 100);
// // //   pix.loadPixels()
// // //   for (let i = 0; i < pix.pixels.length; i += 4) {
// // //     if (pix.pixels[i] != 50 || pix.pixels[i+1] != 50 || pix.pixels[i+2] != 50) {
// // //       pix.pixels[i] = 255;
// // //       pix.pixels[i+1] = 255;
// // //       pix.pixels[i+2] = 255;
// // //       // pix.pixels[i+3] = 0;
// // //     }
// // //   }
// // //   // pix.updatePixels();
// // //   // image(pix, 0, 0, width, height);
  
// // //   // stroke("red");
// // //   // strokeWeight(10);
// // //   // line(0, height/2+45.7, width, height/2+47.5);
  
  
// // //     // for (let i = 0; i < circles.length; i += 4) {
// // //     //   fill(circles[i+3][0], circles[i+3][1], circles[i+3][2]);
// // //     //   circle(circles[i], circles[i+1], circles[i+2]);
// // //     // }
// // //     // pix.loadPixels();
// // //     // loadPixels();
// // //     // for (let i = 0; i < pixels.length; i += resolution * 4) {
// // //       // pixels[i] = random(255);
// // //       // pixels[i+1] = random(255);
// // //       // pixels[i+2] = random(255);
// // //       // pix.pixels[i] = pixels[i];
// // //       // pix.pixels[i+1] = pixels[i+1];
// // //       // pix.pixels[i+2] = pixels[i+2];
// // //     // }
// // //     // updatePixels();
// // //     // for (let i = 0; i < width; i += resolution) {
// // //     //   for (let j = 0; j < height; j += resolution) {
// // //     //     let avgR = 0, avgG = 0, avgB = 0;
// // //     //     for (let k = 0; k < resolution; k ++) {
// // //     //       for (let l = 0; l < resolution; l ++) {
// // //     //         avgR += get(i + k, j + l)[0]
// // //     //         avgG += get(i + k, j + l)[1]
// // //     //         avgB += get(i + k, j + l)[2];
// // //     //       }
// // //     //     }
// // //     //     fill(avgR/area, avgG/area, avgB/area);
// // //     //     rect(i, j, resolution, resolution);
// // //     //   }
// // //     // }
// // //   // }
// // // //     for (let i = 0; i < circles.length; i += 4) {
// // // //       fill(circles[i+3][0], circles[i+3][1], circles[i+3][2]);
// // // //       circle(circles[i], circles[i+1], circles[i+2]);
// // // //     }
// // // //     let resolution = 100, area = resolution**2;
    
// // // //     loadPixels();
// // // //     let y = -resolution;
// // // //     for (let i = 0; i < pixels.length; i += 4*resolution) {
// // // // //       for (let j = 0; j < area; j ++) {
        
// // // // //       }
// // // //       // let img = createImage(66, 66);
// // // //       if (i/4 % width == 0)
// // // //         y += resolution
// // // //       rect(i/4 % width, y, resolution, resolution);
// // // //     }
// // //     // for (let i = 0, j = -10; i < pixels.length; i += 4 * resolution) {
// // //     //   let avgR = 0, avgG = 0, avgB = 0;
// // //     //   if (i/4 % width == 0)
// // //     //     j += resolution;
// // //     //   console.log(width%i)
// // //     //   for (let k = i/4, l = j; k < area; k ++) {
// // //     //     if (k % area == 0)
// // //     //       l ++;
// // //     //     avgR += pixels[k];
// // //     //     avgG += pixels[k+1];
// // //     //     avgB += pixels[k+2];
// // //     //   }
// // //     //   fill(avgR/100, avgG/100, avgB/100);
// // //     //   rect(i/4 % width, j, resolution, resolution);
// // //     // }
// // //   // rect(10, 10, 100, 100);
// // //     // for (let i = 0; i < width; i += 10) {
// // //     //   for (let j = 0; j < height; j += 10) {
// // //     //     let avgR = 0, avgG = 0, avgB = 0;
// // //     //     for (let k = 0; k < 10; k ++) {
// // //     //       for (let l = 0; l < 10; l ++) {
// // //     //         avgR += get(i + k, j + l)[0]
// // //     //         avgG += get(i + k, j + l)[1]
// // //     //         avgB += get(i + k, j + l)[2];
// // //     //       }
// // //     //     }
// // //     //     fill(avgR/100, avgG/100, avgB/100);
// // //     //     rect(i, j, 10, 10);
// // //     //   }
// // //     // }
// // //   // }
// // // }

// // // function lineRadius(centerX, centerY, endX, endY, radius, forceRadius=true) {  // Returns coords to keep a line within a radius
// // //   if (forceRadius || dist(centerX, centerY, endX, endY) > radius) {  // If the line is outside the radius
// // //     endX -= centerX; endY -= centerY;  // Make sure the x and y can never be 0
// // //     let temp = endX, num = 1;  // Make a copy of x
// // //     if (endX < 0)  num = -1;  // Make line not go back 180 degrees
// // //     return [num*radius*cos(atan(endY/endX)) + centerX, num*radius*sin(atan(endY/temp)) + centerY];
// // //   }
// // //   else
// // //     return [endX, endY];
// // // }

// // // function getLimbCoords(centerX, centerY, length1, length2, endX, endY, bendRight=false) {
// // //   let d = dist(centerX, centerY, endX, endY), crd = lineRadius(centerX, centerY, endX, endY, length1 + length2, true);
// // //   if (d > length1 + length2)
// // //     return [crd[0], crd[1], crd[0], crd[1]];  
// // //   // Work on later, make line show for all scenarios 
// // //   // else if (d < length1 - length2)
// // //   //   return [crd[0], crd[1], crd[0], crd[1]];
// // //   // else if (d < length2 - length1) 
// // //   //   return [crd[0], crd[1], crd[0], crd[1]];
// // //   else {
// // //     endX -= centerX; endY -= centerY;  // Make sure the x and y can never be 0
// // //     let theta = acos((d**2 + length1**2 - length2**2)/(2*d*length1)), num = 1;
// // //     if (bendRight)  theta *= -1;  // Make theta bend right if true
// // //     if (endX < 0)  num = -1;  // Make line not go back 180 degrees
// // //     let x = num*length1*cos(theta+atan(endY/endX)) + centerX, y = num*length1*sin(theta+atan(endY/endX)) + centerY;
// // //     crd = lineRadius(x, y, endX + centerX, endY + centerY, length2, true);
// // //     return [x, y, crd[0], crd[1]];
// // //   }
// // // }

// // // function animateLegsRun(centerX, centerY, radiusX, radiusY, length, color1=[0, 0, 0], color2=[255, 255, 255], thickness=5, speed=10, lengthQuotent=1.35, faceRight=false, showShadow=false, showHitbox=false) {
// // //   let num = 1, y1 = radiusY*sin(frameCount/speed+PI) + centerY + lengthQuotent*length, y2 = radiusY*sin(frameCount/speed) + centerY + lengthQuotent*length;
// // //   if (!faceRight) num = -1;
// // //   let x1 = num*radiusX*cos(frameCount/speed+PI) + centerX, x2 = num*radiusX*cos(frameCount/speed) + centerX;
// // //   let coords1 = getLimbCoords(centerX, centerY, length, length, x1, y1, faceRight);
// // //   let coords2 = getLimbCoords(centerX, centerY, length, length, x2, y2, faceRight);
  
// // //   if (showShadow || showHitbox) {
// // //     noStroke();
// // //     fill(255, 0, 0);
// // //   }
// // //   if (showShadow)  ellipse(centerX, centerY+length*lengthQuotent, 2*radiusX, 2*radiusY);
// // //   if (showHitbox)  rect(centerX - radiusX - thickness/2, centerY - thickness/2, 2*radiusX + thickness/2, 2*length + thickness);
  
// // //   strokeWeight(thickness);
// // //   stroke(color1[0], color1[1], color1[2]);
// // //   line(centerX, centerY, coords2[0], coords2[1]);
// // //   line(coords2[0], coords2[1], coords2[2], coords2[3]);
// // //   stroke(color2[0], color2[1], color2[2]);
// // //   line(centerX, centerY, coords1[0], coords1[1]);
// // //   line(coords1[0], coords1[1], coords1[2], coords1[3]);
// // // }

// // // function pixelate(res, x=0, y=0, w=width, h=height) {
// // //     let img = get();  // Get canvas
// // //     img.resize(width/res, height/res);  // Resize canvas to wanted size
// // //     image(img, x, y, w, h, x/res, y/res, w/res, h/res);
// // //   }

// // // // function leg(centerX, centerY, endX, endY, radius, forceRadius=false) {  // Returns coords to keep a line within a radius
// // // //   if (forceRadius || dist(centerX, centerY, endX, endY) > radius) {  // If the line is outside the radius
// // // //     endX -= centerX; endY -= centerY;  // Make sure the x and y can never be 0
// // // //     let temp = endX, num = 1;  // Make a copy of x
// // // //     if (endX < 0)
// // // //       num = -1;
// // // //     return [num*radius*cos(atan(endY/endX)) + centerX, num*radius*sin(atan(endY/temp)) + centerY];
// // // //   }
// // // //   else
// // // //     return [endX, endY];
// // // // }



// // // // // Use for Gui maybe?

// // // // let earnedMins = 0, earnedSecs = 0;
// // // // let gameMode = false;
// // // // let swapCooldown = [0, 0];
// // // // let seconds = 0;
// // // // let newFrame = false;
// // // // let prevFrame = 0;
// // // // let currFrame = 0;

// // // // function preload() {
// // // //   font = loadFont("font.ttf");
// // // // }

// // // // function setup() {
// // // //   let cnv = createCanvas(600, 400);
// // // //   cnv.mouseClicked(swapGameMode);
// // // //   textSize(50);  textFont(font);
// // // // }

// // // // function draw() {
// // // //   currFrame = round(frameCount / 60);
// // // //   background(0);
// // // //   earnedMins = floor( round(seconds / 60) / 3);
// // // //   earnedSecs = floor(seconds / 3) % 60;
// // // //   text(floor(millis() / 60000) + " Minutes, " + floor(millis() / 1000) % 60 + " Seconds Elapsed", 0, height/2);
// // // //   if (!gameMode) {
// // // //     if (prevFrame != currFrame) {
// // // //       seconds++;
// // // //     }
// // // //     fill("rgb(0, 255, 0)");
// // // //     text("Rockwell Game Timer (Earning)", 0, 35);
// // // //     text(earnedMins + " Minutes, " + earnedSecs % 60 + " Seconds Earned", 0, height/2 + 50);
// // // //   }
// // // //   else {
// // // //     if (prevFrame != currFrame) {
// // // //       seconds -= 3;
// // // //     }
// // // //     fill("rgb(255, 0, 0)");
// // // //     text("Rockwell Game Timer (Spending)", 0, 35);
// // // //     text(earnedMins + " Minutes, " + earnedSecs % 60 + " Seconds Earned", 0, height/2 + 50);
// // // //   }
// // // //   prevFrame = round(frameCount / 60);
// // // // }

// // // // function swapGameMode() {
// // // //   gameMode = !gameMode
// // // // }