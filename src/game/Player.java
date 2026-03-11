package game;

import processing.core.PApplet;
import processing.core.PImage;

public class Player extends Character {

	public Player(Point overPosit, Point battPosit, Point scale, PImage overImage, PImage battImage, int[][] overColorLayer, int[][] battColorLayer, int[] colorTint) {super(overPosit, battPosit, scale, overImage, battImage, overColorLayer, battColorLayer, colorTint);}
	
	@Override
	public void update() {
		super.update();
		
		if (this.getOverworld()) {
			if (Engine.keyIsDown(88)) {this.setOverState(2);}
		      else if (Engine.keyIsDown(68) || Engine.keyIsDown(39) || Engine.keyIsDown(83) || Engine.keyIsDown(40) || Engine.keyIsDown(65) || Engine.keyIsDown(37) || Engine.keyIsDown(87) || Engine.keyIsDown(38)) {this.setOverState(3);}
		      else {this.setOverState(1);}
		      this.setSprint(Engine.keyIsDown(16));  // Set sprint to is Shift is pressed
		      // Check direction
		      if ((Engine.keyIsDown(68) || Engine.keyIsDown(39)) && (Engine.keyIsDown(83) || Engine.keyIsDown(40))) {this.setOverDir(1);}       // Walk Right - Down
		      else if ((Engine.keyIsDown(83) || Engine.keyIsDown(40)) && (Engine.keyIsDown(65) || Engine.keyIsDown(37))) {this.setOverDir(3);}  // Walk Down - Left
		      else if ((Engine.keyIsDown(65) || Engine.keyIsDown(37)) && (Engine.keyIsDown(87) || Engine.keyIsDown(38))) {this.setOverDir(5);}  // Left - Up
		      else if ((Engine.keyIsDown(87) || Engine.keyIsDown(38)) && (Engine.keyIsDown(68) || Engine.keyIsDown(39))) {this.setOverDir(7);}  // Up - Right
		      else if (Engine.keyIsDown(68) || Engine.keyIsDown(39)) {this.setOverDir(0);}  // Walk Right
		      else if (Engine.keyIsDown(83) || Engine.keyIsDown(40)) {this.setOverDir(2);}  // Walk Down
		      else if (Engine.keyIsDown(65) || Engine.keyIsDown(37)) {this.setOverDir(4);}  // Walk Left
		      else if (Engine.keyIsDown(87) || Engine.keyIsDown(38)) {this.setOverDir(6);}  // Walk Up
		}
	}

	@Override
	public void interact() {
		// TODO Auto-generated method stub
		
	}

}
