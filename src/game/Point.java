package game;

import processing.core.PApplet;

public class Point implements Comparable<Object> {
	
	private float x, y;
	
	public Point() {this.instantiate(0, 0);}
	public Point(float x) {this.instantiate(x, 0);}
	public Point(Point p) {this.instantiate(p.getX(), p.getY());}
	public Point(float x, float y) {this.instantiate(x, y);}
	public Point(float[] coord) {this.instantiate(coord[0], coord[1]);}
	
	private void instantiate(float x, float y) {this.x = x; this.y = y;}
	
	public void display(PApplet app) {app.point(this.x, this.y);}
	public void display(PApplet app, float r) {app.circle(this.x, this.y, r);}
	
	public void changeX(float x) {this.x += x;}
	public void changeY(float y) {this.y += y;}
	
	public void setX(float x) {this.x = x;}
	public void setY(float y) {this.y = y;}
	public void setXY(Point p) {this.x = p.getX(); this.y = p.getY();}
	
	public void resetPoint() {this.x = 0; this.y = 0;}
	
	public float getX() {return this.x;}
	public float getY() {return this.y;}
	public float[] getXY() {return new float[] {x, y};}
	
	public Point get() {return new Point(this.x, this.y);}
	
	public int compareTo(Object o) {return (int) (getY() - ((Point) o).getY());}
	
	@Override
	public boolean equals(Object other) {return this.x == ((Point) other).getX() && this.y == ((Point) other).getY();}
	
	@Override
	public String toString() {return "("+x+", "+y+")";}
}
