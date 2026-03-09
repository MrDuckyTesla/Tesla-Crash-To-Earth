package game;

import processing.core.PApplet;

public class Obstacle extends Point {
	
	private float w, h;
	
	public Obstacle() {super(); this.w = 0; this.h = 0;}
	public Obstacle(Point p) {super(p.getX(), p.getY()); this.w = 0; this.h = 0;}
	public Obstacle(float x, float y) {super(x, y); this.w = 0; this.h = 0;}
	public Obstacle(Point p, Point q) {super(p.compareTo(q) < 0? p : q); this.w = PApplet.abs(p.getX() - q.getX()); this.h = PApplet.abs(p.getY() - q.getY());}
	public Obstacle(Point p, float w, float h) {super(p.getX(), p.getY()); this.w = w; this.h = h;}
	public Obstacle(float x, float y, float w, float h) {super(x, y); this.w = w; this.h = h;}
	
	public boolean isTLInside(Obstacle other) {return Engine.pointRectCollide(getX(), getY(), other.getX(), other.getY(), other.getW(), other.getH());}
	public boolean isTRInside(Obstacle other) {return Engine.pointRectCollide(getX()+w, getY(), other.getX(), other.getY(), other.getW(), other.getH());}
	public boolean isBRInside(Obstacle other) {return Engine.pointRectCollide(getX()+w, getY()+h, other.getX(), other.getY(), other.getW(), other.getH());}
	public boolean isBLInside(Obstacle other) {return Engine.pointRectCollide(getX(), getY()+h, other.getX(), other.getY(), other.getW(), other.getH());}
	public boolean isInside(Obstacle other) {return this.isTLInside(other) && this.isTRInside(other) && this.isBRInside(other) && this.isBLInside(other);} // Checks if this has all four corners inside other
	
	public Point getCorner(boolean topSide, boolean rightSide) {return new Point(rightSide? getX()+w : getX(), topSide? getY() : getY()+h);}
	public Point[] getCorners() {return new Point[] {getCorner(true, false), getCorner(true, true), getCorner(false, true), getCorner(false, false)};}
	
	public float getArea() {return this.w * this.h;}
	public float getPerimeter() {return 2*this.w + 2*this.h;}
	
	@Override
	public void display(PApplet app, float s) {app.rect(getX()*s, getY()*s, w*s, h*s);}
	
	@Override
	public void display(PApplet app) {app.rect(getX(), getY(), w, h);}
	public void display(PApplet app, int[] color) {app.push(); app.fill(app.color(color[0], color[1], color[2])); app.rect(getX(), getY(), w, h); app.pop();}
	
	protected void setW(float w) {this.w = w;}
	protected void setH(float h) {this.h = h;}
	
	public float getW() {return this.w;}
	public float getH() {return this.h;}
	public float[] getXYWH() {return new float[] {getX(), getY(), w, h};}
	
	@Override
	public boolean equals(Object other) {return this.getX() == ((Obstacle) other).getX() && this.getY() == ((Obstacle) other).getY() && this.w == ((Obstacle) other).getW() && this.h == ((Obstacle) other).getH();}
	
	@Override
	public String toString() {return "("+getX()+", "+getY() + ", "+w+", "+h+")";}

}
