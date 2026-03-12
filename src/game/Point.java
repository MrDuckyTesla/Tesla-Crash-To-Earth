package game;

import processing.core.PApplet;

public class Point implements Comparable<Object> {
	
	private static PApplet app;
	private static boolean hasApp = false;
	private float x, y;
	
	public Point() {this.instantiate(0, 0);}
	public Point(PApplet app) {this.instantiate(app, 0, 0);}
	public Point(float x) {this.instantiate(x, 0);}
	public Point(PApplet app, float x) {this.instantiate(app, x, 0);}
	public Point(Point p) {this.instantiate(p.getX(), p.getY());}
	public Point(PApplet app, Point p) {this.instantiate(app, p.getX(), p.getY());}
	public Point(float x, float y) {this.instantiate(x, y);}
	public Point(PApplet app, float x, float y) {this.instantiate(app, x, y);}
	public Point(float[] coord) {this.instantiate(coord[0], coord[1]);}
	public Point(PApplet app, float[] coord) {this.instantiate(app, coord[0], coord[1]);}
	
	private void instantiate(float x, float y) {this.x = x; this.y = y;}
	private void instantiate(PApplet app, float x, float y) {Point.app = app; Point.hasApp = true; this.x = x; this.y = y;}
	
	// Static methods
	public static PApplet getApp() {if (!Point.hasApp) {return new PApplet();} return Point.app;}
	public static int getAppWidth() {if (!Point.hasApp) {return -1;} return Point.app.width;}
	public static int getAppHeight() {if (!Point.hasApp) {return -1;} return Point.app.height;}
	public static boolean getHasApp() {return Point.hasApp;}
	public static boolean setApp(PApplet app) {if (Point.hasApp) {return false;} Point.app = app; Point.hasApp = true; return true;}
	public static boolean pushApp() {if (!Point.hasApp) {return false;} Point.app.push(); return true;}
	public static boolean popApp() {if (!Point.hasApp) {return false;} Point.app.pop(); return true;}
	public static boolean fillApp(int r, int g, int b) {if (!Point.hasApp) {return false;} Point.app.fill(Point.app.color(r, g, b)); return true;}
	public static boolean rectApp(float x, float y, float w, float h) {if (!Point.hasApp) {return false;} Point.app.rect(x, y, w, h); return true;}
	
	public boolean rectApp(float w, float h) {if (!Point.hasApp) {return false;} Point.app.rect(this.x, this.y, w, h); return true;}
	
	public boolean displayPoint() {if (!Point.hasApp) {return false;} Point.app.point(this.x, this.y); return true;}
	public boolean displayPoint(float r) {if (!Point.hasApp) {return false;} Point.app.circle(this.x, this.y, r); return true;}
	public boolean displayPoint(PApplet app) {app.point(this.x, this.y); return true;}
	public boolean displayPoint(PApplet app, float r) {app.circle(this.x, this.y, r); return true;}
	
	public void resetPoint() {this.x = 0; this.y = 0;}
	
	// Get
	public Point get() {return new Point(this.x, this.y);}
	public float getX() {return this.x;}
	public float getY() {return this.y;}
	public float[] getXY() {return new float[] {x, y};}
	// Set
	public void set(Point p) {this.x = p.getX(); this.y = p.getY();}
	public void setX(float x) {this.x = x;}
	public void setY(float y) {this.y = y;}
	public void setXY(Point p) {this.x = p.getX(); this.y = p.getY();}
	// Add
	public void addX(float x) {this.x += x;}
	public void addY(float y) {this.y += y;}
	
	// Overridden functions
	@Override
	public int compareTo(Object o) {return (int) (getY() - ((Point) o).getY());}
	@Override
	public boolean equals(Object other) {return this.x == ((Point) other).getX() && this.y == ((Point) other).getY();}
	@Override
	public String toString() {return "("+x+", "+y+")";}
}
