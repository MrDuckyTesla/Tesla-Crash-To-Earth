package test;

import game.ToolKit;
import processing.core.PApplet;

public class Particle {
	
	private float x, y, r, vx, vy, ax, ay;
	int[] color;
	
	public Particle(float x, float y, float r) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.vx = 0;
		this.vy = 0;
		this.color = new int[] {(int) (Math.random() * 256), (int) (Math.random() * 256), (int) (Math.random() * 256), 255};
	}
	
	public Particle(float x, float y, float r, float vx, float vy) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.vx = vx;
		this.vy = vy;
		this.color = new int[] {(int) (Math.random() * 256), (int) (Math.random() * 256), (int) (Math.random() * 256), 255};
	}
	
	public Particle(float x, float y, float r, float vx, float vy,  float ax, float ay) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.vx = vx;
		this.vy = vy;
		this.ax = ax;
		this.ay = ay;
		this.color = new int[] {(int) (Math.random() * 256), (int) (Math.random() * 256), (int) (Math.random() * 256), 255};
	}
	
	public Particle(float x, float y, float r, float vx, float vy, float ax, float ay, int[] color) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.vx = vx;
		this.vy = vy;
		this.ax = ax;
		this.ay = ay;
		this.color = color;
	}
	
	public void update(PApplet app) {
		this.vx += ax;
		this.vy += ay;
		this.x += this.vx;
		this.y += this.vy;
		app.image(ToolKit.circleImage(app, x, y, 200, r, app.width, color), 0, 0, 800, 800);
	}
	
	public void applyForce(float a, float theta) {
		this.ax += a * PApplet.cos(theta);
		this.ay += a * PApplet.sin(theta);
	}
	
	public void applyAcceleration(float ax, float ay) {
		this.ax += ax;
		this.ay += ay;
	}
	
	public float getX() {
		return x;
	}
	
	public float getY() {
		return y;
	}
	
	public float getR() {
		return r;
	}

}
