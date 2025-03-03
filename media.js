// Look into this later:  
//   https://p5js.org/reference/p5/WEBGL/
//   https://p5js.org/reference/p5/p5.Framebuffer/
//   https://p5js.org/reference/p5/p5.Shader/

class Media {
  constructor() {
    this.index = 0;  // Current Image Index
    this.currFrame = 0;  // Current Image Frame
  }
  
  animate(img, x, y, wid, hgt, scl, frmSrt, frmEnd, frm, anmChg) {
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
  
  changeColor(img, colorList, tintList, layerList) {
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
      if (endX < 0)
        num = -1;
      return [num*radius*cos(atan(endY/endX)) + centerX, num*radius*sin(atan(endY/temp)) + centerY];
    }
    else
      return [endX, endY];
  }
  
  getLimbCoords(centerX, centerY, length1, length2, endX, endY, bendRight=false) {
    let d = dist(centerX, centerY, endX, endY), crd = lineRadius(centerX, centerY, endX, endY, length1 + length2, true);
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
      crd = lineRadius(x, y, endX + centerX, endY + centerY, length2, true);
      return [x, y, crd[0], crd[1]];
    }
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