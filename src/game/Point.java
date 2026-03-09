package game;

import processing.core.PApplet;

public class Point implements Comparable<Point> {
	
	private float x, y;
	
	public Point() {this.x = 0; this.y = 0;}
	public Point(float x) {this.x = x; this.y = 0;}
	public Point(Point p) {this.x = p.getX(); this.y = p.getY();}
	public Point(float x, float y) {this.x = x; this.y = y;}
	public Point(float[] coord) {this.x = coord[0]; this.y = coord[1];}
	
	public void display(PApplet app, float r) {app.circle(this.x, this.y, r);}
	public void display(PApplet app) {app.point(this.x, this.y);}
	
	public void changeX(float x) {this.x += x;}
	public void changeY(float y) {this.y += y;}
	
	public void setX(float x) {this.x = x;}
	public void setY(float y) {this.y = y;}
	
	public void resetPoint() {this.x = 0; this.y = 0;}
	
	public float getX() {return this.x;}
	public float getY() {return this.y;}
	public float[] getXY() {return new float[] {x, y};}
	
	public int compareTo(Point p) {return (int) (getX() - p.getX() + getY() - p.getY());}
	
	@Override
	public boolean equals(Object other) {return this.x == ((Point) other).getX() && this.y == ((Point) other).getY();}
	
	@Override
	public String toString() {return "("+x+", "+y+")";}
}
