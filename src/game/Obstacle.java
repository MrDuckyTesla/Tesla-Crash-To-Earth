package game;

import processing.core.PApplet;

public class Obstacle extends Point {
	
	private float w, h;
	private boolean isTangible;
	
	public Obstacle() {super(); this.instantiate(0, 0);}
	public Obstacle(boolean t) {super(); this.instantiate(w, h, t);}
	public Obstacle(Point p) {super(p.getX(), p.getY()); this.instantiate(w, h);}
	public Obstacle(boolean t, Point p) {super(p.getX(), p.getY()); this.instantiate(w, h, t);}
	public Obstacle(float x, float y) {super(x, y); this.instantiate(w, h);}
	public Obstacle(boolean t, float x, float y) {super(x, y); this.instantiate(w, h, t);}
	public Obstacle(Point p, Point q) {super(p.compareTo(q) < 0? p : q); this.w = PApplet.abs(p.getX() - q.getX()); this.h = PApplet.abs(p.getY() - q.getY());}
	public Obstacle(boolean t, Point p, Point q) {super(p.compareTo(q) < 0? p : q); this.w = PApplet.abs(p.getX() - q.getX()); this.h = PApplet.abs(p.getY() - q.getY()); this.isTangible = t;}
	public Obstacle(Point p, float w, float h) {super(p.getX(), p.getY()); this.instantiate(w, h);}
	public Obstacle(boolean t, Point p, float w, float h) {super(p.getX(), p.getY()); this.instantiate(w, h, t);}
	public Obstacle(float x, float y, float w, float h) {super(x, y); this.instantiate(w, h);}
	public Obstacle(boolean t, float x, float y, float w, float h) {super(x, y); this.instantiate(w, h, t);}
	
	public boolean isTLInside(Obstacle other) {return Engine.pointRectCollide(getX(), getY(), other.getX(), other.getY(), other.getW(), other.getH());}
	public boolean isTRInside(Obstacle other) {return Engine.pointRectCollide(getX()+w, getY(), other.getX(), other.getY(), other.getW(), other.getH());}
	public boolean isBRInside(Obstacle other) {return Engine.pointRectCollide(getX()+w, getY()+h, other.getX(), other.getY(), other.getW(), other.getH());}
	public boolean isBLInside(Obstacle other) {return Engine.pointRectCollide(getX(), getY()+h, other.getX(), other.getY(), other.getW(), other.getH());}
	public boolean isInside(Obstacle other) {return this.isTLInside(other) && this.isTRInside(other) && this.isBRInside(other) && this.isBLInside(other);} // Checks if this has all four corners inside other
	
	private void instantiate(float w, float h, boolean t) {this.w = w; this.h = h; this.isTangible = t;}
	private void instantiate(float w, float h) {this.instantiate(w, h, true);}
	
	public Point getCorner(boolean topSide, boolean rightSide) {return new Point(rightSide? getX()+w : getX(), topSide? getY() : getY()+h);}
	public Point[] getCorners() {return new Point[] {getCorner(true, false), getCorner(true, true), getCorner(false, true), getCorner(false, false)};}
	
	public float getArea() {return this.w * this.h;}
	public float getPerimeter() {return 2*this.w + 2*this.h;}
	
	public boolean isCollide(Obstacle o) {return Engine.rectRectCollide(this.getX(), this.getY(), this.w, this.h, o.getX(), o.getY(), o.getW(), o.getH());}
	public boolean isTangible() {return this.isTangible;}
	
	@Override
	public boolean display() {if (!Point.getHasApp()) {return false;} Point.getApp().rect(getX(), getY(), w, h); return true;}
	@Override
	public boolean display(float s) {if (!Point.getHasApp()) {return false;} Point.getApp().rect(getX()*s, getY()*s, w*s, h*s); return true;}
	@Override
	public boolean display(PApplet app, float s) {app.rect(getX()*s, getY()*s, w*s, h*s); return true;}
	@Override
	public boolean display(PApplet app) {app.rect(getX(), getY(), w, h); return true;}
	public boolean display(PApplet app, int[] color) {app.push(); app.fill(app.color(color[0], color[1], color[2])); app.rect(getX(), getY(), w, h); app.pop(); return true;}
	
	public boolean appRect(float w, float h) {Point.rectApp(this.getX(), this.getY(), this.w, this.h); return true;}
	
	public void update() {this.display();}  // Function for children to inherit, will probably be used for animated obstacles
	public void interact() {}  // Another function for children to inherit, will probably be used for text box
	
	protected void setW(float w) {this.w = w;}
	protected void setH(float h) {this.h = h;}
	
	public float getW() {return this.w;}
	public float getH() {return this.h;}
	public float[] getXYWH() {return new float[] {getX(), getY(), w, h};}
	
	@Override
	public Obstacle get() {return new Obstacle(this.getX(), this.getY(), this.w, this.h);}
	public Point getPoint() {return super.get();}
	
	@Override
	public boolean equals(Object other) {return this.getX() == ((Obstacle) other).getX() && this.getY() == ((Obstacle) other).getY() && this.w == ((Obstacle) other).getW() && this.h == ((Obstacle) other).getH();}
	
	@Override
	public String toString() {return "("+getX()+", "+getY() + ", "+w+", "+h+")";}
	
	@Override
	public int compareTo(Object o) {return (int) (getY() + getH() - ((Obstacle) o).getY() - ((Obstacle) o).getH());}

}
