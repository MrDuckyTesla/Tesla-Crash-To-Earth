let  cvs; //circles = [], cvs;
let yAdd = true;

function setup() {
  cvs = createCanvas(600, 600);
}

function draw() {
  background(0);
  // if (frameCount == 1) {
  // noStroke();
  // console.log("before: " + x + ", " + y);
  // Make particle system??
  
  stroke(111, 111, 255);
  strokeWeight(5);
  fill(111, 111, 255);
  
  // let theta = cos(110**2 + 60**2 - 50**2);
  // let a = dist(width/2, height/2, mouseX, mouseY);
  // if (a > 110) {
  //   a = 110;
  // }
  // line(width/2, height/2, coords[0], coords[1]);
  // line(coords[0], coords[1], coords[2], coords[3]);
  // console.log(acos(1))
  // let theta = acos((a**2 + 60**2 - 50**2)/(2*a*60));
  // a^2 + b^2 - c^2
  // console.log(theta);
  // line(60*cos(theta), 60*sin(theta), width/2, height/2);
  // console.log(mouseX*theta, mouseY*theta)
  // ellipse( mouseX*theta, mouseY*theta, 10, 10)
  // let coords1 = lineRadius(width/2, height/2, mouseX, mouseY, 60, true);
  let coords = getLimbCoords(width/2, height/2, 100, 100, mouseX, mouseY);
  let coords2 = getLimbCoords(width/2, height/2, 100, 100, mouseX, mouseY, true);
  // let coords2 = lineRadius(coords1[0], coords1[1], mouseX, mouseY, 50, true);
  // coords2 = lineRadius(coords[0], coords[1], x2, height, 75);
  // coords3 = lineRadius(coords2[0], coords2[1], x3, height, 50);
  line(width/2, height/2, coords[0], coords[1]);
  line(coords[0], coords[1], coords[2], coords[3]);
  // stroke(61, 61, 200);
  // line(width/2, height/2, mouseX, mouseY);
  
  stroke(11, 11, 150);
  line(width/2, height/2, coords2[0], coords2[1]);
  line(coords2[0], coords2[1], coords2[2], coords2[3]);
  
  // line(coords2[0], coords2[1], coords3[0], coords3[1]);
  // line(coords1[0], coords1[1], width/2, height/2);
  // line(coords2[0], coords2[1], coords1[0], coords1[1]);
  // ellipse(coords[0], coords[1], 25, 25);
  // ellipse(coords2[0], coords2[1], 20, 20);
  // ellipse(coords3[0], coords3[1], 15, 15);
  
//   fill(255, 111, 111);
  // rect(x-50, y-20, 100, 20)
  
  // line(x+10, y+2, x+20, y + 10)
  // line(x-10, y+2, x-20, y + 10)
  
  noSmooth();
  let resolution = 5;
  let pix = get();
  pix.resize(width/resolution, height/resolution, 100);
  pix.loadPixels()
  for (let i = 0; i < pix.pixels.length; i += 4) {
    if (pix.pixels[i] != 50 || pix.pixels[i+1] != 50 || pix.pixels[i+2] != 50) {
      pix.pixels[i] = 255;
      pix.pixels[i+1] = 255;
      pix.pixels[i+2] = 255;
      // pix.pixels[i+3] = 0;
    }
  }
  // pix.updatePixels();
  image(pix, 0, 0, width, height);
  
  
    // for (let i = 0; i < circles.length; i += 4) {
    //   fill(circles[i+3][0], circles[i+3][1], circles[i+3][2]);
    //   circle(circles[i], circles[i+1], circles[i+2]);
    // }
    // pix.loadPixels();
    // loadPixels();
    // for (let i = 0; i < pixels.length; i += resolution * 4) {
      // pixels[i] = random(255);
      // pixels[i+1] = random(255);
      // pixels[i+2] = random(255);
      // pix.pixels[i] = pixels[i];
      // pix.pixels[i+1] = pixels[i+1];
      // pix.pixels[i+2] = pixels[i+2];
    // }
    // updatePixels();
    // for (let i = 0; i < width; i += resolution) {
    //   for (let j = 0; j < height; j += resolution) {
    //     let avgR = 0, avgG = 0, avgB = 0;
    //     for (let k = 0; k < resolution; k ++) {
    //       for (let l = 0; l < resolution; l ++) {
    //         avgR += get(i + k, j + l)[0]
    //         avgG += get(i + k, j + l)[1]
    //         avgB += get(i + k, j + l)[2];
    //       }
    //     }
    //     fill(avgR/area, avgG/area, avgB/area);
    //     rect(i, j, resolution, resolution);
    //   }
    // }
  // }
//     for (let i = 0; i < circles.length; i += 4) {
//       fill(circles[i+3][0], circles[i+3][1], circles[i+3][2]);
//       circle(circles[i], circles[i+1], circles[i+2]);
//     }
//     let resolution = 100, area = resolution**2;
    
//     loadPixels();
//     let y = -resolution;
//     for (let i = 0; i < pixels.length; i += 4*resolution) {
// //       for (let j = 0; j < area; j ++) {
        
// //       }
//       // let img = createImage(66, 66);
//       if (i/4 % width == 0)
//         y += resolution
//       rect(i/4 % width, y, resolution, resolution);
//     }
    // for (let i = 0, j = -10; i < pixels.length; i += 4 * resolution) {
    //   let avgR = 0, avgG = 0, avgB = 0;
    //   if (i/4 % width == 0)
    //     j += resolution;
    //   console.log(width%i)
    //   for (let k = i/4, l = j; k < area; k ++) {
    //     if (k % area == 0)
    //       l ++;
    //     avgR += pixels[k];
    //     avgG += pixels[k+1];
    //     avgB += pixels[k+2];
    //   }
    //   fill(avgR/100, avgG/100, avgB/100);
    //   rect(i/4 % width, j, resolution, resolution);
    // }
  // rect(10, 10, 100, 100);
    // for (let i = 0; i < width; i += 10) {
    //   for (let j = 0; j < height; j += 10) {
    //     let avgR = 0, avgG = 0, avgB = 0;
    //     for (let k = 0; k < 10; k ++) {
    //       for (let l = 0; l < 10; l ++) {
    //         avgR += get(i + k, j + l)[0]
    //         avgG += get(i + k, j + l)[1]
    //         avgB += get(i + k, j + l)[2];
    //       }
    //     }
    //     fill(avgR/100, avgG/100, avgB/100);
    //     rect(i, j, 10, 10);
    //   }
    // }
  // }
}

function lineRadius(centerX, centerY, endX, endY, radius, forceRadius=false) {  // Returns coords to keep a line within a radius
  if (forceRadius || dist(centerX, centerY, endX, endY) > radius) {  // If the line is outside the radius
    endX -= centerX; endY -= centerY;  // Make sure the x and y can never be 0
    let temp = endX, num = 1;  // Make a copy of x
    if (endX < 0)  num = -1;  // Make line not go back 180 degrees
    return [num*radius*cos(atan(endY/endX)) + centerX, num*radius*sin(atan(endY/temp)) + centerY];
  }
  else
    return [endX, endY];
}

function getLimbCoords(centerX, centerY, length1, length2, endX, endY, bendRight=false) {
  let d = dist(centerX, centerY, endX, endY), crd = lineRadius(centerX, centerY, endX, endY, length1 + length2, true);
  if (d > length1 + length2)
    return [crd[0], crd[1], crd[0], crd[1]];
  else {
    endX -= centerX; endY -= centerY;  // Make sure the x and y can never be 0
    let theta = acos((d**2 + length1**2 - length2**2)/(2*d*length1)), num = 1;
    if (bendRight)  theta *= -1;  // Make theta bend right if true
    if (endX < 0)  num = -1;  // Make line not go back 180 degrees
    let x = num*length1*cos(theta+atan(endY/endX)) + centerX, y = num*length1*sin(theta+atan(endY/endX)) + centerY;
    crd = lineRadius(x, y, endX + centerX, endY + centerY, length2, true);
    return [x, y, crd[0], crd[1]];
  }
}

// function leg(centerX, centerY, endX, endY, radius, forceRadius=false) {  // Returns coords to keep a line within a radius
//   if (forceRadius || dist(centerX, centerY, endX, endY) > radius) {  // If the line is outside the radius
//     endX -= centerX; endY -= centerY;  // Make sure the x and y can never be 0
//     let temp = endX, num = 1;  // Make a copy of x
//     if (endX < 0)
//       num = -1;
//     return [num*radius*cos(atan(endY/endX)) + centerX, num*radius*sin(atan(endY/temp)) + centerY];
//   }
//   else
//     return [endX, endY];
// }



// // Use for Gui maybe?

// let earnedMins = 0, earnedSecs = 0;
// let gameMode = false;
// let swapCooldown = [0, 0];
// let seconds = 0;
// let newFrame = false;
// let prevFrame = 0;
// let currFrame = 0;

// function preload() {
//   font = loadFont("font.ttf");
// }

// function setup() {
//   let cnv = createCanvas(600, 400);
//   cnv.mouseClicked(swapGameMode);
//   textSize(50);  textFont(font);
// }

// function draw() {
//   currFrame = round(frameCount / 60);
//   background(0);
//   earnedMins = floor( round(seconds / 60) / 3);
//   earnedSecs = floor(seconds / 3) % 60;
//   text(floor(millis() / 60000) + " Minutes, " + floor(millis() / 1000) % 60 + " Seconds Elapsed", 0, height/2);
//   if (!gameMode) {
//     if (prevFrame != currFrame) {
//       seconds++;
//     }
//     fill("rgb(0, 255, 0)");
//     text("Rockwell Game Timer (Earning)", 0, 35);
//     text(earnedMins + " Minutes, " + earnedSecs % 60 + " Seconds Earned", 0, height/2 + 50);
//   }
//   else {
//     if (prevFrame != currFrame) {
//       seconds -= 3;
//     }
//     fill("rgb(255, 0, 0)");
//     text("Rockwell Game Timer (Spending)", 0, 35);
//     text(earnedMins + " Minutes, " + earnedSecs % 60 + " Seconds Earned", 0, height/2 + 50);
//   }
//   prevFrame = round(frameCount / 60);
// }

// function swapGameMode() {
//   gameMode = !gameMode
// }