package game;

import processing.core.PApplet;

public class Obstacle extends Point {
	
	private float w, h;
	
	public Obstacle() {
		super();
		this.w = 0;
		this.h = 0;
	}
	
	public Obstacle(float x, float y) {
		super(x, y);
		this.w = 0;
		this.h = 0;
	}
	
	public Obstacle(float x, float y, float w, float h) {
		super(x, y);
		this.w = w;
		this.h = h;
	}
	
	public boolean isTLInside(Obstacle other) {return Engine.pointRectCollide(x, y, other.getX(), other.getY(), other.getW(), other.getH());}
	public boolean isTRInside(Obstacle other) {return Engine.pointRectCollide(x+w, y, other.getX(), other.getY(), other.getW(), other.getH());}
	public boolean isBRInside(Obstacle other) {return Engine.pointRectCollide(x+w, y+h, other.getX(), other.getY(), other.getW(), other.getH());}
	public boolean isBLInside(Obstacle other) {return Engine.pointRectCollide(x, y+h, other.getX(), other.getY(), other.getW(), other.getH());}
	public boolean isInside(Obstacle other) {return this.isTLInside(other) && this.isTRInside(other) && this.isBRInside(other) && this.isBLInside(other);} // Checks if this has all four corners inside other
	
	public Point getCorner(boolean topSide, boolean rightSide) {return new Point(rightSide? x+w : x, topSide? y : y+h);}
	public Point[] getCorners() {return new Point[] {getCorner(true, false), getCorner(true, true), getCorner(false, true), getCorner(false, false)};}
	
	public float getArea() {return this.w * this.h;}
	public float getPerimeter() {return 2*this.w + 2*this.h;}
	
	@Override
	public void display(PApplet app, float s) {app.rect(x*s, y*s, w*s, h*s);}
	
	@Override
	public void display(PApplet app) {app.rect(x, y, w, h);}
	public void display(PApplet app, int[] color) {app.push(); app.fill(app.color(color[0], color[1], color[2])); app.rect(x, y, w, h); app.pop();}
	
	public void setW(float w) {this.w = w;}
	public void setH(float h) {this.h = h;}
	public float getW() {return this.w;}
	public float getH() {return this.h;}
	public float[] getXYWH() {return new float[] {x, y, w, h};}
	
	@Override
	public boolean equals(Object other) {return this.x == ((Point) other).getX() && this.y == ((Point) other).getY() && this.w == ((Obstacle) other).getW() && this.h == ((Obstacle) other).getH();}
	
	@Override
	public String toString() {return "("+x+", "+y + ", "+w+", "+h+")";}

}
