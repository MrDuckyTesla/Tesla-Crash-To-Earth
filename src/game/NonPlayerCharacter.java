package game;

import processing.core.PApplet;
import processing.core.PImage;

public class NonPlayerCharacter extends Character{

	public NonPlayerCharacter(PApplet app, Point overPosit, Point battPosit, Point scale, PImage overImage, PImage battImage, int[][] overColorLayer, int[][] battColorLayer, int[] colorTint) {super(app, overPosit, battPosit, scale, overImage, battImage, overColorLayer, battColorLayer, colorTint);}
	public NonPlayerCharacter(PApplet app, Point overPosit, Point battPosit, Point scale, PImage overImage, PImage battImage, int[][] overColorLayer, int[][] battColorLayer) {super(app, overPosit, battPosit, scale, overImage, battImage, overColorLayer, battColorLayer);}
	public NonPlayerCharacter(PApplet app, Point scale, PImage overImage, PImage battImage, int[][] overColorLayer, int[][] battColorLayer) {super(app, scale, overImage, battImage, overColorLayer, battColorLayer);}

	@Override
	public void interact() {
		// TODO Auto-generated method stub
		
	}

}
