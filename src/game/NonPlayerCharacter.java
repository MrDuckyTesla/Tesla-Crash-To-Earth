package game;

import processing.core.PApplet;
import processing.core.PImage;

public class NonPlayerCharacter extends Character{

	public NonPlayerCharacter(PApplet app, Point overPosit, Point battPosit, Point scale, PImage overImage, PImage battImage, int[][] overColorLayer, int[][] battColorLayer, int[] overColorTint, int[] battColorTint) {
		super(app, overPosit, battPosit, scale, overImage, battImage, overColorLayer, battColorLayer, overColorTint, battColorTint);
		// TODO Auto-generated constructor stub
	}

	@Override
	public void interact() {
		// TODO Auto-generated method stub
		
	}

}
