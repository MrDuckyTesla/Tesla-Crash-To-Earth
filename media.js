// Look into this later:  
//   https://p5js.org/reference/p5/WEBGL/
//   https://p5js.org/reference/p5/p5.Framebuffer/
//   https://p5js.org/reference/p5/p5.Shader/

class Media {
  constructor() {
    this.index = 0;  // Current Image Index
    this.currFrame = 0;  // Current Image Frame
  }
  
  animate(img, x, y, wid, hgt, scl, frmSrt, frmEnd, frm, anmChg, resetIndex=false) {
    if (resetIndex) this.index = frmSrt;
    if (!anmChg)  {  // If changing animation
      this.index = frmSrt + (this.index-frmSrt)%(frmEnd-frmSrt+1);
      if (this.index < frmSrt) this.index = frmEnd;
    }
    // console.log(frameCount % frm == 0);
    // Check if enough frames passed
    if (frameCount % frm == 0) this.index = frmSrt + (this.index-frmSrt+1)%(frmEnd-frmSrt+1) // Change the index
    // Then draw the image
    image(img, x, y, wid * scl, hgt * scl, this.index * wid, 0, wid, hgt);
  }
  
  animateOld(img, x, y, wid, hgt, scl, frmSrt, frmEnd, frm, anmChg) {  // Keep this in case the new one goes horribly wrong
    if (!anmChg)  this.currFrame = frameCount % frm;  // Check if its a different animation, if so reset the animation frame count
    else this.currFrame = 0;  // Else, reset variable
    if ((frameCount - this.currFrame) % frm == 0) {  // Check if enough frames passed
      this.index ++;  // Change the index
      if (this.index > frmEnd || this.index < frmSrt) this.index = frmSrt;  // Check if we passed the desired frame, if so reset to starting frame
    }
    // Then draw the image
    image(img, x, y, wid * scl, hgt * scl, this.index * wid, 0, wid, hgt);
  }

  preCompile(img, layerList) {  // PreCompile to avoid lag
    let colorList = [];  // List of colors and indexes to return
    img.loadPixels();  // Load pixels for scanning
    for (let i = 0; i < img.pixels.length; i += 4) {  // Iterate through pixels
      if (img.pixels[i + 3] != 0) {  // Check if pixel is transparent
        for (let j = 0; j < layerList.length; j ++) {  // Iterate through color layers
          for (let k = 0; k < layerList[j].length; k ++) {
            if (img.pixels[i] == layerList[j][k]) {
              colorList.push(i, j, img.pixels[i]);  // Push index, layer, and color
            }
          }
        }
      }
    }
    return colorList;  // Return list
  }
  
  changeColor(img, colorList, tintList) {
    img.loadPixels();  // Load pixels for changing
    for (let i = 0; i < colorList.length; i += 3) {  // Apply formula:  NR = (3 * (G + r) - (g + b)) / 4
      img.pixels[colorList[i]+0] = (3*(colorList[i+2]+tintList[0+3*colorList[i+1]])-(tintList[1+3*colorList[i+1]]+tintList[2+3*colorList[i+1]]))/4
      img.pixels[colorList[i]+1] = (3*(colorList[i+2]+tintList[1+3*colorList[i+1]])-(tintList[2+3*colorList[i+1]]+tintList[0+3*colorList[i+1]]))/4
      img.pixels[colorList[i]+2] = (3*(colorList[i+2]+tintList[2+3*colorList[i+1]])-(tintList[0+3*colorList[i+1]]+tintList[1+3*colorList[i+1]]))/4
    }
    img.updatePixels();  // Update the pixels
  }
  
  changeSingleColor(img, ogColorRGB, newColorRGB) {
    img.loadPixels();  // Load pixels for changing
    for (let i = 0; i < img.pixels.length; i += 4) {  // Iterate through pixels
      if (img.pixels[i+3] != 0) {  // Check if pixel is transparent
        if (img.pixels[i] == ogColorRGB[0] && img.pixels[i+1] == ogColorRGB[1] && img.pixels[i+2] == ogColorRGB[2]) {
          img.pixels[i] = newColorRGB[0];
          img.pixels[i+1] = newColorRGB[1];
          img.pixels[i+2] = newColorRGB[2];
        }
      }
    }
    img.updatePixels();  // Update the pixels
  }
  
  resetColor(img, colorList) {  // Resets all pixels in image based on precompile list
    img.loadPixels();  // Load pixels for changing
    for (let i = 0; i < colorList.length; i += 3) {
      img.pixels[colorList[i]+0] = colorList[i + 2];
      img.pixels[colorList[i]+1] = colorList[i + 2];
      img.pixels[colorList[i]+2] = colorList[i + 2];
    }
    img.updatePixels();  // Update the pixels
  }
  
  clearImage(img) {
    img.loadPixels();  // Load pixels for changing
    for (let i = 0; i < img.pixels.length; i += 4) {
      img.pixels[i+3] = 0;
    }
    img.updatePixels();  // Update the pixels
  }
  
  pixelate(res, x=0, y=0, w=width, h=height) {
    let img = get();  // Get canvas
    img.resize(width/res, height/res);  // Resize canvas to wanted size
    image(img, x, y, w, h, x/res, y/res, w/res, h/res);
  }
  
  lineRadius(centerX, centerY, endX, endY, radius, forceRadius=false) {  // Returns coords to keep a line within a radius
    if (forceRadius || dist(centerX, centerY, endX, endY) > radius) {  // If the line is outside the radius
      endX -= centerX; endY -= centerY;  // Make sure the x and y can never be 0
      let temp = endX, num = 1;  // Make a copy of x
      if (endX < 0) num = -1;
      return [num*radius*cos(atan(endY/endX)) + centerX, num*radius*sin(atan(endY/temp)) + centerY];
    }
    else return [endX, endY];
  }
  
  getLimbCoords(centerX, centerY, length1, length2, endX, endY, bendRight=false) {
    let d = dist(centerX, centerY, endX, endY), crd = this.lineRadius(centerX, centerY, endX, endY, length1 + length2, true);
    if (d > length1 + length2)
      return [crd[0], crd[1], crd[0], crd[1]];
    // Work on later, make line show for all scenarios (not necessary, just for more "finished" code)
    // else if (d < length1 - length2)
    //   return [crd[0], crd[1], crd[0], crd[1]];
    // else if (d < length2 - length1) 
    //   return [crd[0], crd[1], crd[0], crd[1]];
    else {
      endX -= centerX; endY -= centerY;  // Make sure the x and y can never be 0
      let theta = acos((d**2 + length1**2 - length2**2)/(2*d*length1)), num = 1;
      if (bendRight)  theta *= -1;  // Make theta bend right if true
      if (endX < 0)  num = -1;  // Make line not go back 180 degrees
      let x = num*length1*cos(theta+atan(endY/endX)) + centerX, y = num*length1*sin(theta+atan(endY/endX)) + centerY;
      crd = this.lineRadius(x, y, endX + centerX, endY + centerY, length2, true);
      return [x, y, crd[0], crd[1]];
    }
  }
  
  lineLineCollide(x1, y1, x2, y2, x3, y3, x4, y4) {
    if ((dist(x1, y1, x2, y2) == 0 || dist(x3, y3,  x4, y4) == 0) || (x1 - x2 == 0 && x3 - x4 == 0) || (y1 - y2 == 0 && y3 - y4 == 0)) return [false];
    let temp, m1, m2, b1, b2, iX, iY, d1, d2;
    // Find slopes
    m1 = (y2 - y1) / (x2 - x1);
    m2 = (y4 - y3) / (x4 - x3);
    // Find y intercepts
    b1 = y1 - m1 * x1;
    b2 = y3 - m2 * x3;
    // Find X coordinate while also dealing with vertical and horizontal slopes
    if (x4 - x3 == 0) iX = x3;
    else if (x2 - x1 == 0) iX = x1;
    else iX = (b1 - b2) / (m2 - m1);
    // Get Y coordinate while also dealing with horizontal slope
    iY = (x4 - x3) == 0? m1 * iX + b1: m2 * iX + b2;
    // Get lengths of line segments
    d1 = dist(x1, y1, x2, y2);
    d2 = dist(x3, y3, x4, y4);
    // Check if X and Y coordinates is within line segments
    if (dist(iX, iY, x2, y2) > d1 || dist(iX, iY, x1, y1) > d1 || dist(iX, iY, x3, y3) > d2 || dist(iX, iY, x4, y4) > d2) return [false];
    return [true, iX, iY];
  }

  lineRectCollide(x1, y1, x2, y2, rx, ry, rw, rh) {  // Used to find points of intersection of a line and rectangle
    // Rectangle is just four lines, so we return a list of line vs line collisions
    return [this.lineLineCollide(x1, y1, x2, y2, rx, ry, rx+rw, ry), this.lineLineCollide(x1, y1, x2, y2, rx+rw, ry, rx+rw, ry+rh), this.lineLineCollide(x1, y1, x2, y2, rx+rw, ry+rh, rx, ry+rh), this.lineLineCollide(x1, y1, x2, y2, rx, ry+rh, rx, ry)];
  }
  
  rectRectCollideCoords(px, py, x1, y1, w1, h1, x2, y2, w2, h2) {
    // Find coordinates where moving rectangle touches the base rectangle
    let coordCollide = this.lineRectCollide(px+w1/2, py+h1/2, x1+w1/2, y1+h1/2, x2-w1/2, y2-h1/2, w2+w1, h2+h1);
    // Iterate to find the closest coordinate
    for (let i = 0; i < coordCollide.length; i++) {
      if (coordCollide[i][0]) return [true, coordCollide[i][1]-w1/2, coordCollide[i][2]-h1/2, i];
    }
    return [false];
  }
  
  rectRectCollide(r1x, r1y, r1w, r1h, r2x, r2y, r2w, r2h) {
    return r1x + r1w >= r2x && r1x <= r2x+r2w && r1y + r1h >= r2y && r1y <= r2y+r2h;
  }
  
  nRectRectCollideCoords(px, py, x1, y1, w1, h1, x2, y2, w2, h2) {
    // Find coordinates where moving rectangle touches the base rectangle
    let coordCollide = this.lineRectCollide(px+w1/2, py+h1/2, x1+w1/2, y1+h1/2, x2+w1/2, y2+h1/2, w2-w1, h2-h1);
    // Iterate to find the closest coordinate
    for (let i = 0; i < coordCollide.length; i++) {
      if (coordCollide[i][0]) return [true, coordCollide[i][1]-w1/2, coordCollide[i][2]-h1/2, i];
    }
    return [false];
  }

  nRectRectCollide(r1x, r1y, r1w, r1h, r2x, r2y, r2w, r2h) {  // opposite of rectRectCollide
    // Smaller rectangle goes FIRST
    if (r1w * r1h > r2w * r2h) return r1x >= r2x || r1x+r1w  <= r2x+r2w || r1y >= r2y || r1y+r1h <= r2y+r2h;
    return r1x <= r2x || r1x+r1w >= r2x+r2w || r1y <= r2y || r1y+r1h >= r2y+r2h;
  }
  
  circRectCollide(cx, cy, cr, rx, ry, rw, rh) {
    return cx + cr/2 >= rx && rx + rw >= cx - cr/2 && cy + cr/2 >= ry && ry + rh >= cy - cr/2;
  }
  
  circCircCollide(c1x, c1y, c1r, c2x, c2y, c2r) {
    return dist(c1x, c1y, c2x, c2y) >= c1r/2 + c2r/2;
  }
  
  pointRectCollide(px, py, rx, ry, rw, rh) {
    return px >= rx && px <= rx + rw && py >= ry && py <= ry + rh;
  }

  pointCircCollide(px, py, cx, cy, cr) {
    return (dist(px, py, cx, cy) <= cr/2);
  }
  
  pLineCollide(x1, y1, x2, y2, x3, y3, x4, y4) {  // Parallel Lines
    // Deal with double vertical or double horizontal lines
    if (x1 - x2 == 0 && x3 - x4 == 0 && dist(x1, 0, x3, 0) == 0) return true;
    else if (y1 - y2 == 0 && y3 - y4 == 0 && dist(0, y1, 0, y3) == 0) return true;
    return false;
  }
  
  lRectRectCollide(rx1, ry1, rw1, rh1, rx2, ry2, rw2, rh2) {  // Used to find which sides two rectangles are touching
    // Rectangle is just four lines, so we return a list of line vs line collisions
    return [this.pLineCollide(rx1+rw1, ry1, rx1+rw1, ry1+rh1, rx2+rw2, ry2, rx2+rw2, ry2+rh2), this.pLineCollide(rx1+rw1, ry1+rh1, rx1, ry1+rh1, rx2+rw2, ry2+rh2, rx2, ry2+rh2), this.pLineCollide(rx1, ry1+rh1, rx1, ry1, rx2, ry2+rh2, rx2, ry2), this.pLineCollide(rx1, ry1, rx1+rw1, ry1, rx2, ry2, rx2+rw2, ry2)];
  }
  
  sharpen(img, backgroundColor, replacementColor) {  // Change in order to allow less colors, and more replacement colors
    img.loadPixels()
    for (let i = 0; i < img.pixels.length; i += 4) {
      if (img.pixels[i] != backgroundColor[0] || img.pixels[i+1] != backgroundColor[1] || img.pixels[i+2] != backgroundColor[2]) {
        img.pixels[i] = replacementColor[0];
        img.pixels[i+1] = replacementColor[1];
        img.pixels[i+2] = replacementColor[2];
      }
    }
    img.updatePixels();
  }
  
  leaveTrails(num) {  // Draw last num amount of images at once, maybe with increasing transparency
    // Make me first
  }
  
}