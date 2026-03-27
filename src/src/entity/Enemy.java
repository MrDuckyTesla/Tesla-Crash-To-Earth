package entity;

import processing.core.PApplet;
import processing.core.PImage;

public class Enemy extends NonPlayerCharacter {

	public Enemy(Point overPosit, Point battPosit, Point scale, PImage overImage, PImage battImage, int[][] overColorLayer, int[][] battColorLayer, int[] colorTint) {super(overPosit, battPosit, scale, overImage, battImage, overColorLayer, battColorLayer, colorTint);}
	public Enemy(Point overPosit, Point battPosit, Point scale, PImage overImage, PImage battImage, int[][] overColorLayer, int[][] battColorLayer) {super(overPosit, battPosit, scale, overImage, battImage, overColorLayer, battColorLayer);}
	public Enemy(Point scale, PImage overImage, PImage battImage, int[][] overColorLayer, int[][] battColorLayer) {super(scale, overImage, battImage, overColorLayer, battColorLayer);}
	
	@Override
	public void interact() {
		// TODO Auto-generated method stub
		
	}

}
