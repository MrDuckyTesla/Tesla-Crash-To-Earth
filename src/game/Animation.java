package game;

import processing.core.PApplet;
import processing.core.PImage;

public class Animation {  // Ripped from the Engine class so i could make it static
	
	private int index = 0;  // Current Image Index
	private int frameIndex = 0;  // Count of frames
	private int indexCount = 0;  // How long its been since last index
	private int timeRun = 0;
	private float timeIncrease;
	
	public Animation() {this.timeIncrease = 1;}
	public Animation(float timeIncrease) {this.timeIncrease = timeIncrease;}
	
	public void animate(PApplet app, PImage image, float x, float y, int width, int height, float scale, int frameStart, int frameEnd, int frame, boolean changeAnimation, boolean resetIndex) {
		// "I wanted the animations to stay constant and use new animation" - Old Nico
		int temp = frameEnd - frameStart + 1;
		if (resetIndex) {  // Reset all variables
			this.index = frameStart;
			this.frameIndex = 0;
		} else {this.frameIndex++;}  // Update frame index
		this.indexCount = this.frameIndex % frame;
		if (!changeAnimation) {  // If not changing animation
			this.index = frameStart + (this.index - frameStart) % temp;
			if (this.index < frameStart) {this.index = frameEnd;}
		} if (this.indexCount == 0 && !resetIndex) {this.index = frameStart + (this.index - frameStart + 1) % temp;}  // Check if enough frames passed
		app.image(image, x, y, width * scale, height * scale, this.index * width, 0, this.index * width + width, height);  // Then draw the image
	}
	
	public void animate(PApplet app, PImage image, float x, float y, int width, int height, int scale, int frameStart, int frameEnd, int frame, boolean changeAnimation) {
		this.animate(app, image, x, y, width, height, scale, frameStart, frameEnd, frame, changeAnimation, false);
	}
	
	public void animateNew(PApplet app, PImage image, float x, float y, int width, int height, int scale, int frameStart, int frameEnd, int frame, boolean changeAnimation, boolean resetIndex) {
		// "I wanted the animations to stay constant and use new animation" - Old Nico
		if (resetIndex) {this.index = frameStart;}
		if (!changeAnimation) {  // If changing animation
			this.index = frameStart + (this.index - frameStart) % (frameEnd - frameStart + 1);
			if (this.index < frameStart) {this.index = frameEnd;}
		} if (app.frameCount % frame == 0) {this.index = frameStart + (this.index - frameStart + 1) % (frameEnd - frameStart + 1);} // Check if enough frames passed and change the index
		app.image(image, x, y, width * scale, height * scale, this.index * width, 0, this.index * width + width, height);  // Then draw the image
	}
	
	public void animateNew(PApplet app, PImage image, float x, float y, int width, int height, int scale, int frameStart, int frameEnd, int frame, boolean changeAnimation) {
		this.animateNew(app, image, x, y, width, height, scale, frameStart, frameEnd, frame, changeAnimation, false);
	}
	
	// THIS COMMENTED CODE IS IN JAVASCRIPT (original code technically wont run because currFrame doesn't exist in said code, so i didn't feel like rewriting it here)

//	animateOld(img, x, y, wid, hgt, scl, frmSrt, frmEnd, frm, anmChg) {  // Keep this in case the new one goes horribly wrong
//	    if (!anmChg)  this.currFrame = frameCount % frm;  // Check if its a different animation, if so reset the animation frame count
//	    else this.currFrame = 0;  // Else, reset variable
//	    if ((frameCount - this.currFrame) % frm == 0) {  // Check if enough frames passed
//	      this.index ++;  // Change the index
//	      if (this.index > frmEnd || this.index < frmSrt) this.index = frmSrt;  // Check if we passed the desired frame, if so reset to starting frame
//	    }
//	    // Then draw the image
//	    image(img, x, y, wid * scl, hgt * scl, this.index * wid, 0, wid, hgt);
//	  }
	
	public static void leaveTrails() {  // Draw last num amount of images at once, maybe with increasing transparency
		// Make me first
	}
	
	public void animateLegsRun(PApplet app, float centerX, float centerY, float floorY, float radiusX, float radiusY, float length, float offsetX, float offsetY, int res, float thickness, float speed, float jump, float lengthQuotent, int[] color1, int[] color2, boolean faceRight, boolean showShadow, boolean showHitbox) {
		float y1 = radiusY * PApplet.sin(this.timeRun / speed + PApplet.PI) + centerY + lengthQuotent * length, y2 = radiusY * PApplet.sin(this.timeRun / speed) + centerY + lengthQuotent * length;
		int num = 1; if (!faceRight) num = -1;
		float x1 = num * radiusX * PApplet.cos(this.timeRun / speed + PApplet.PI) + centerX, x2 = num * radiusX * PApplet.cos(this.timeRun / speed) + centerX;
		centerY += jump * PApplet.cos(this.timeRun / (speed / 2) + PApplet.PI);
		float y1New = y1 + offsetY > floorY? floorY : y1 + offsetY, y2New = y2 + offsetY > floorY? floorY : y2 + offsetY;
		float[] coords1 = Engine.getLimbCoords(centerX, centerY, length, length, x1+offsetX, y1New, faceRight), coords2 = Engine.getLimbCoords(centerX, centerY, length, length, x2+offsetX, y2New, faceRight);
		if (showShadow || showHitbox) {
			app.fill(255, 0, 0);
			if (showShadow)  {app.ellipse(centerX+offsetX, centerY+length*lengthQuotent+offsetY, 2*radiusX, 2*radiusY);}
		    if (showHitbox)  {app.rect(centerX - radiusX - thickness/2, centerY - thickness/2, 2*radiusX + thickness/2, 2*length + thickness);}
		} 
//		PImage image = Engine.lineImage(app, centerX, centerY, coords2[0], coords2[1], res, thickness, app.width, color1);
		app.image(Engine.lineImage(app, centerX, centerY, coords2[0], coords2[1], res, thickness, app.width, color1), 0, 0, app.width, app.height);
		app.image(Engine.lineImage(app, coords2[0], coords2[1], coords2[2], coords2[3], res, thickness, app.width, color1), 0, 0, app.width, app.height);
		app.image(Engine.lineImage(app, centerX, centerY, coords1[0], coords1[1], res, thickness, app.width, color2), 0, 0, app.width, app.height);
		app.image(Engine.lineImage(app, coords1[0], coords1[1], coords1[2], coords1[3], res, thickness, app.width, color2), 0, 0, app.width, app.height);
//		image.copy(Engine.lineImage(app, coords2[0], coords2[1], coords2[2], coords2[3], res, thickness, app.width, color1), 0, 0, res, res, 0, 0, res, res);
//		image.copy(Engine.lineImage(app, centerX, centerY, coords1[0], coords1[1], res, thickness, app.width, color2), 0, 0, res, res, 0, 0, res, res);
//		image.copy(Engine.lineImage(app, coords1[0], coords1[1], coords1[2], coords1[3], res, thickness, app.width, color2), 0, 0, res, res, 0, 0, res, res);
		this.timeRun += this.timeIncrease;
	}
	
	public void animateLegsRun(PApplet app, float centerX, float centerY, float floorY, float radiusX, float radiusY, float length, float offsetX, float offsetY, int res, float thickness, float speed, float jump, float lengthQuotent, int[] color1, int[] color2, boolean faceRight, boolean showShadow) {this.animateLegsRun(app, centerX, centerY, floorY, radiusX, radiusY, length, offsetX, offsetY, res, thickness, speed, jump, lengthQuotent, color1, color2, faceRight, showShadow, false);}
	public void animateLegsRun(PApplet app, float centerX, float centerY, float floorY, float radiusX, float radiusY, float length, float offsetX, float offsetY, int res, float thickness, float speed, float jump, float lengthQuotent, int[] color1, int[] color2, boolean faceRight) {this.animateLegsRun(app, centerX, centerY, floorY, radiusX, radiusY, length, offsetX, offsetY, res, thickness, speed, jump, lengthQuotent, color1, color2, faceRight, false, false);}
	public void animateLegsRun(PApplet app, float centerX, float centerY, float floorY, float radiusX, float radiusY, float length, float offsetX, float offsetY, int res, float thickness, float speed, float jump, float lengthQuotent, int[] color1, int[] color2) {this.animateLegsRun(app, centerX, centerY, floorY, radiusX, radiusY, length, offsetX, offsetY, res, thickness, speed, jump, lengthQuotent, color1, color2, false, false, false);}
	public void animateLegsRun(PApplet app, float centerX, float centerY, float floorY) {  // Preset Values from javascript
		this.animateLegsRun(app, centerX, centerY, floorY, 250, 150, 200, 100, 200, 150, 25, 10, 100, 1.35f, new int[] {111, 111, 255, 255}, new int[] {255, 111, 111, 255}, false, false, false);
	}
	
//	function animateLegsRun(centerX, centerY, radiusX, radiusY, length, offsetX=0, offsetY=0, res=40, thickness=5, speed=10, jump=5, lengthQuotent=1.35, color1=[0, 0, 0, 255], color2=[255, 255, 255, 255], faceRight=false, showShadow=false, showHitbox=false) {
//	  let num = 1, y1 = radiusY*sin(frameCount/speed+PI) + centerY + lengthQuotent*length, y2 = radiusY*sin(frameCount/speed) + centerY + lengthQuotent*length;
//	  if (!faceRight) num = -1;
//	  let x1 = num*radiusX*cos(frameCount/speed+PI) + centerX, x2 = num*radiusX*cos(frameCount/speed) + centerX, img;
//	  centerY += jump*cos(frameCount/(speed/2)+PI);
//	  let coords1 = getLimbCoords(centerX, centerY, length, length, x1+offsetX, y1+offsetY, faceRight);
//	  let coords2 = getLimbCoords(centerX, centerY, length, length, x2+offsetX, y2+offsetY, faceRight);
//	  
//	  if (showShadow || showHitbox) {
//	    fill(255, 0, 0);
//	    if (showShadow)  ellipse(centerX+offsetX, centerY+length*lengthQuotent+offsetY, 2*radiusX, 2*radiusY);
//	    if (showHitbox)  rect(centerX - radiusX - thickness/2, centerY - thickness/2, 2*radiusX + thickness/2, 2*length + thickness);
//	  }
//
//	  img = lineImage(centerX, centerY, coords2[0], coords2[1], res, thickness, width, color1);
//	  img.copy(lineImage(coords2[0], coords2[1], coords2[2], coords2[3], res, thickness, width, color1), 0, 0, res, res, 0, 0, res, res);
//	  img.copy(lineImage(centerX, centerY, coords1[0], coords1[1], res, thickness, width, color2), 0, 0, res, res, 0, 0, res, res);
//	  img.copy(lineImage(coords1[0], coords1[1], coords1[2], coords1[3], res, thickness, width, color2), 0, 0, res, res, 0, 0, res, res);
//	  image(img, 0, 0, 400, 400);
//}
	
	// Get
	public int getIndex() {return this.index;}
	public int getFrameIndex() {return this.frameIndex;}
	public int getIndexCount() {return this.indexCount;}
	public int getTimeRun() {return this.timeRun;}
	public float getTimeIncrease() {return this.timeIncrease;}
	// Set
	public void setIndex(int index) {this.index = index;}
	public void setFrameIndex(int frameIndex) {this.frameIndex = frameIndex;}
	public void setIndexCount(int indexCount) {this.indexCount = indexCount;}
	public void setTimeRun(int timeRun) {this.timeRun = timeRun;}
	public void setTimeIncrease(float timeIncrease) {this.timeIncrease = timeIncrease;}

}
