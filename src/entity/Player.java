package entity;

import game.ToolKit;
import processing.core.PApplet;
import processing.core.PImage;

public class Player extends Character {

	public Player(Point overPosit, Point battPosit, Point scale, PImage overImage, PImage battImage, int[][] overColorLayer, int[][] battColorLayer, int[] colorTint) {super(overPosit, battPosit, scale, overImage, battImage, overColorLayer, battColorLayer, colorTint);}
	
	@Override
	public void update() {
		super.update();
		
		if (this.getOverworld()) {
			if (ToolKit.keyIsDown(88)) {this.setOverState(2);}
		      else if (ToolKit.keyIsDown(68) || ToolKit.keyIsDown(39) || ToolKit.keyIsDown(83) || ToolKit.keyIsDown(40) || ToolKit.keyIsDown(65) || ToolKit.keyIsDown(37) || ToolKit.keyIsDown(87) || ToolKit.keyIsDown(38)) {this.setOverState(3);}
		      else {this.setOverState(1);}
		      this.setSprint(ToolKit.keyIsDown(16));  // Set sprint to is Shift is pressed
		      // Check direction
		      if ((ToolKit.keyIsDown(68) || ToolKit.keyIsDown(39)) && (ToolKit.keyIsDown(83) || ToolKit.keyIsDown(40))) {this.setOverDir(1);}       // Walk Right - Down
		      else if ((ToolKit.keyIsDown(83) || ToolKit.keyIsDown(40)) && (ToolKit.keyIsDown(65) || ToolKit.keyIsDown(37))) {this.setOverDir(3);}  // Walk Down - Left
		      else if ((ToolKit.keyIsDown(65) || ToolKit.keyIsDown(37)) && (ToolKit.keyIsDown(87) || ToolKit.keyIsDown(38))) {this.setOverDir(5);}  // Left - Up
		      else if ((ToolKit.keyIsDown(87) || ToolKit.keyIsDown(38)) && (ToolKit.keyIsDown(68) || ToolKit.keyIsDown(39))) {this.setOverDir(7);}  // Up - Right
		      else if (ToolKit.keyIsDown(68) || ToolKit.keyIsDown(39)) {this.setOverDir(0);}  // Walk Right
		      else if (ToolKit.keyIsDown(83) || ToolKit.keyIsDown(40)) {this.setOverDir(2);}  // Walk Down
		      else if (ToolKit.keyIsDown(65) || ToolKit.keyIsDown(37)) {this.setOverDir(4);}  // Walk Left
		      else if (ToolKit.keyIsDown(87) || ToolKit.keyIsDown(38)) {this.setOverDir(6);}  // Walk Up
		}
	}

	@Override
	public void interact() {
		// TODO Auto-generated method stub
		
	}

}
