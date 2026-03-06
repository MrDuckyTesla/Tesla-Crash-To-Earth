package game;

import processing.core.PImage;

public abstract class Character {
	
	// Constructor Variables
	private float overWorldX;
	private float overWorldY;
	private float battleX;
	private float battleY;
	private int width;
	private int height;
	private PImage overWorldImage;
	private PImage battleImage;
	private int[] bodyColor;
	private int[] visorColor;
	
	// THIS CLASS WILL BE ABSTRACT AND ONLY CONTAIN NESSESSICARY VARIABLES AND FUNCTIONS THAT APPLY TO ALL CHARACTERS
	
	public Character(float overWorldX, float overWorldY, float battleX, float battleY, int width, int height, PImage overWorldImage, PImage battleImage, int[] bodyColor, int[] visorColor) {
		this.overWorldX = overWorldX;
		this.overWorldY = overWorldY;
		this.battleX = battleX;
		this.battleY = battleY;
		this.width = width;
		this.height = height;
		this.overWorldImage = overWorldImage;
		this.battleImage = battleImage;
		this.bodyColor = bodyColor;
		this.visorColor = visorColor;
	}
	
	public void show() {
		
	}
	
	public void move() {
		
	}

}
