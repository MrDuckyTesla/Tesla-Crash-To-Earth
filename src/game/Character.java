package game;

import java.util.ArrayList;
import processing.core.PApplet;
import processing.core.PImage;

public abstract class Character extends Obstacle {
	
	// Static variables
	final private static int OVER_WIDTH = 28, OVER_HEIGHT = 28, BATT_WIDTH = 9, BATT_HEIGHT = 13;
	private static int id = 0;
	// Constructor Variables
	public int charID;
	private PImage overImage, battImage;
	private Point overPosit, battPosit, scale;
	private ArrayList<Integer> overColorList, battColorList;
	private int[] colorTint;
	// Animation Variables
	final private int OVER_ANIM_SPEED_CAP = 6;
	private Animation animManager = new Animation();
	private int[] animateState = new int[] {0, 0, 0, 0};
	private int overAnimSpeed = 12, battAnimSpeed = 5;
	private boolean changeAnim = false, unskipAnim = false;
	// Movement Variables
	final private float OVER_MOVE_SPEED_CAP = 6, BATT_IMPUL = 17, BATT_FRICT = 0.8f;
	private Point battPositLast, battVeloc = new Point(), battAccel = new Point(0, 1), overMove = new Point();
	private float overSpeed = 3, battSpeed = 2.5f;
	private boolean overSprint = false;
	// World Variables
	private ArrayList<Integer> illegalOverDir = new ArrayList<Integer>();
	private float overScaledWidth, overScaledHeight, battScaledWidth, battScaledHeight;
	private int overCurrDir = 0, overLastDir = 0, overCurrState = 1, overLastState = 0, battCurrDir = 0, battLastDir = 0, battCurrState = 0;
	private boolean overWorldCurr = true, overWorldLast = true, overCollision = true;
	
	// THIS CLASS WILL BE ABSTRACT AND ONLY CONTAIN NESSESSICARY VARIABLES AND FUNCTIONS THAT APPLY TO ALL CHARACTERS
	
	public Character(Point overPosit, Point battPosit, Point scale, PImage overImage, PImage battImage, int[][] overColorLayer, int[][] battColorLayer, int[] colorTint) {
		super(overPosit, Character.OVER_WIDTH * scale.getX(), Character.OVER_HEIGHT * scale.getY());
		this.colorTint = colorTint;
		this.instantiate(overPosit, battPosit, scale, overImage, battImage, overColorLayer, battColorLayer);
	}
	
	public Character(Point overPosit, Point battPosit, Point scale, PImage overImage, PImage battImage, int[][] overColorLayer, int[][] battColorLayer) {
		super(overPosit, Character.OVER_WIDTH * scale.getX(), Character.OVER_HEIGHT * scale.getY());
		this.colorTint = new int[] {(int) (Math.random()*256), (int) (Math.random()*256), (int) (Math.random()*256), (int) (Math.random()*256), (int) (Math.random()*256), (int) (Math.random()*256), (int) (Math.random()*256), (int) (Math.random()*256), (int) (Math.random()*256)};
		this.instantiate(overPosit, battPosit, scale, overImage, battImage, overColorLayer, battColorLayer);
	}
	
	public Character(Point scale, PImage overImage, PImage battImage, int[][] overColorLayer, int[][] battColorLayer) {
		super(new Point((float)(Math.random() * Point.getAppWidth()), (float)(Math.random() * Point.getAppHeight())), Character.OVER_WIDTH * scale.getX(), Character.OVER_HEIGHT * scale.getY());
		this.colorTint = new int[] {(int) (Math.random()*256), (int) (Math.random()*256), (int) (Math.random()*256), (int) (Math.random()*256), (int) (Math.random()*256), (int) (Math.random()*256), (int) (Math.random()*256), (int) (Math.random()*256), (int) (Math.random()*256)};
		this.overPosit = this.getPoint(); this.battPosit = new Point((float)(Math.random() * Point.getAppWidth()), (float)(Math.random() * Point.getAppHeight()));
		this.instantiate(overPosit, battPosit, scale, overImage, battImage, overColorLayer, battColorLayer);
	}
	
	private void instantiate(Point overPosit, Point battPosit, Point scale, PImage overImage, PImage battImage, int[][] overColorLayer, int[][] battColorLayer) {
		this.charID = Character.id; Character.id++; PApplet app = Point.getApp(); this.scale = scale.get(); this.battPositLast = battPosit.get();
		this.overPosit = overPosit.get(); this.overImage = overImage.get(); this.battPosit = battPosit.get(); this.battImage = battImage.get();
		this.overColorList = Engine.PreCompile(app, this.overImage, overColorLayer); this.battColorList = Engine.PreCompile(app,  this.battImage, battColorLayer);
		Engine.changeColor(app,  this.overImage, overColorList, colorTint); Engine.changeColor(app, this.battImage, battColorList,colorTint);
		overScaledWidth = Character.OVER_WIDTH * this.scale.getX(); overScaledHeight = Character.OVER_HEIGHT * this.scale.getX();
		battScaledWidth = Character.BATT_WIDTH * this.scale.getY(); battScaledHeight = Character.BATT_HEIGHT * this.scale.getY();
	}
	
	public void update() {		
		// Check if we need to change the animation due to direction
		if (this.overWorldLast != this.overWorldCurr) {this.changeAnim = false;}
		else {this.changeAnim = this.overWorldCurr? this.overLastDir == this.overCurrDir : this.battLastDir == this.battCurrDir;}
		if (this.overWorldCurr) {  // If in overworld
			this.overStateCheck1(); // Check if sprinting or if doing sword animation
			if (this.illegalOverDir.size() != 0) {  // Make sure if collides with obstacle, no weird animation shenanigans
				if (!this.illegalOverDir.contains(this.overCurrDir)) {if (!overCollision) {this.illegalOverDir = new ArrayList<Integer>();}}
				else {this.overCurrState = 1; this.unskipAnim = false;}
			} // Overworld states start here
			if (this.overCurrState == 3) {this.animateMoveOver(this.overSpeed, 16, 4, false, false);}  // Overworld Walk
			if (this.overCurrState == 2) {this.animateMoveOver(this.overSpeed/2, 48, 4, false, true);}  // Sword Swing (walking)
			if (this.overCurrState == 1) {this.animateMoveOver(0, 0, 2, true, false);}  // Overworld Idle
			this.overStateCheck2();  // Reset Sprinting speed if sprinting
			this.addOverX(); this.addOverY();
		} 
		
		else {  // Battle state
			
		}
		
		// Update last state variables
	    this.overLastDir = this.overCurrDir;
	    this.overWorldLast = this.overWorldCurr;
	    this.overLastState = this.overCurrState;
	    this.battLastDir = this.battCurrDir;
	    this.battPositLast = this.battPosit.get();
	    this.set(this.overPosit);
		
	}
	
	public void showHitBox() {Point.pushApp(); Point.fillApp(255, 0, 0); Point.rectApp(this.overPosit.getX(), this.overPosit.getY(), overScaledWidth, overScaledHeight); Point.popApp();}
	
	private int basicCollisionOver(int state, float x1, float y1, float x2, float y2) {
	    this.overCurrState = 1;
	    if ((this.overCurrDir == 0 || this.overCurrDir == 1 || this.overCurrDir == 7) && this.overPosit.getX() + this.overSpeed > x2 - this.overScaledWidth) {
	      this.setOverX(x2 - this.overScaledWidth);
	      return this.overCurrDir;  // Right
	    } if ((this.overCurrDir == 1 || this.overCurrDir == 2 || this.overCurrDir == 3) && this.overPosit.getY() + this.overSpeed > y2 - this.overScaledHeight) {
	      this.setOverY(y2 - this.overScaledHeight);
	      return this.overCurrDir;  // Down
	    } if ((this.overCurrDir == 3 || this.overCurrDir == 4 || this.overCurrDir == 5) && this.overPosit.getX() - this.overSpeed < x1) {
	      this.setOverX(x1);
	      return this.overCurrDir;  // Left
	    } if ((this.overCurrDir == 5 || this.overCurrDir == 6 || this.overCurrDir == 7) && this.overPosit.getY() - this.overSpeed < y1) {
	      this.setOverY(y1);
	      return this.overCurrDir;  // Up
	    } this.overCurrState = state;
	    return -1;
	  }
	
	private float stateSpeed() {
		float speed = 0; this.overStateCheck1();  // Create temporary variable and check if sprinting or if doing sword animation
		if (this.overCurrState == 3) {speed = this.overSpeed;}  // Overworld Walk
		if (this.overCurrState == 2) {speed = this.overSpeed/2;}  // Sword Swing (walking)
		this.overStateCheck2(); return speed; // Reset Sprinting speed if sprinting and return temporary variable
	}
	
	private void animateMoveOver(float speed, int start, int frames, boolean ignore, boolean fullAnim) {
		int startReal = start + this.overCurrDir * frames; PApplet app = Point.getApp();
		this.overMove.resetPoint();
		if (fullAnim && this.animateState[3] != app.frameCount) {this.unskipAnim = true; this.animateState = new int[] {this.overCurrState, this.overCurrDir, startReal+frames-1, frames};}
		if (this.basicCollisionOver(this.overCurrState, 0, 0, app.width, app.height) != this.overCurrDir || ignore) {
			this.calculateOverMove(speed);
			this.animManager.animate(app, this.overImage, super.getX(), super.getY(), Character.OVER_WIDTH, Character.OVER_HEIGHT, this.scale.getX(), startReal, startReal + frames - 1, this.overAnimSpeed, this.changeAnim, this.overLastState != this.overCurrState);
		} else {this.unskipAnim = false;}
	}
	
	private void calculateOverMove(float speed) {
		if (this.overCurrDir % 2 == 1) {speed *= 0.7071068f;}  // sin 45
		if (this.overCurrDir % 4 != 2) {this.overMove.setX(this.overCurrDir % 7 < 2? speed : -speed);}
		if (this.overCurrDir % 4 - 1 != -1) {this.overMove.setY(this.overCurrDir < 4? speed : -speed);}
	}
	
	private void overStateCheck1() {
		if (this.overSprint) {this.overSpeed *= 2; this.overAnimSpeed /= 2;}  // If sprinting, double all speeds
		if (this.unskipAnim) {  // If we are staying in an animation
			if ((this.animManager.getIndexCount() + 1) % this.overAnimSpeed == 0 && this.animManager.getIndex() == this.animateState[2]) {this.unskipAnim = false;}  // If the animation has ended, end the animation
			else {this.overCurrState = this.animateState[0]; this.overCurrDir = this.overLastDir;}  //Else, keep the character state and direction the same
		}
	}
	
	private void overStateCheck2() {if (this.overSprint || (this.overSpeed >= this.OVER_MOVE_SPEED_CAP && this.overAnimSpeed <= this.OVER_ANIM_SPEED_CAP)) {this.overSpeed /= 2; this.overAnimSpeed *= 2;}}  // Reset speeds if not sprinting
	
	private Point unstick(float[] c) {
		switch ((int) c[2]) {
			case 0:  // Down
				this.illegalOverDir = Engine.addNotInArray(this.illegalOverDir,  new int[] {1, 2, 3});
				return new Point(c[0], c[1]-0.0001f);
			case 1:  // Left
				this.illegalOverDir = Engine.addNotInArray(this.illegalOverDir,  new int[] {3, 4, 5});
				return new Point(c[0]+0.0001f, c[1]);
			case 2:  // Up
				this.illegalOverDir = Engine.addNotInArray(this.illegalOverDir,  new int[] {5, 6, 7});
				return new Point(c[0], c[1]+0.0001f);
			case 3:  // Right
				this.illegalOverDir = Engine.addNotInArray(this.illegalOverDir,  new int[] {0, 1, 7});
				return new Point(c[0]-0.0001f, c[1]);
			default:
				return new Point(c);
		}
	}
	
	// Get
	public Point getNewP() {return new Point(this.getNewX(), this.getNewY());}
	public float getMoveX() {return this.overMove.getX();}
	public float getMoveY() {return this.overMove.getY();}
	public float getNewX() {return this.getX()+this.getMoveX();}
	public float getNewY() {return this.getY()+this.getMoveY();}
	public int getIllegalDir() {return this.illegalOverDir.size();}
	public int getOverState() {return this.overCurrState;}
	public int getOverDir() {return this.overCurrDir;}
	public boolean getOverworld() {return this.overWorldCurr;}
	public boolean getSprint() {return this.overSprint;}
	// Set
	protected void setOverState(int state) {this.overCurrState = state;}
	protected void setOverDir(int dir) {this.overCurrDir = dir;}
	protected void setSprint(boolean state) {this.overSprint = state;}
	// Private set
	private void setOverX(float x) {this.overPosit.setX(x);}
	private void setOverY(float y) {this.overPosit.setY(y);}
	// Private add
	private void addOverX() {this.overPosit.addX(this.getMoveX());}
	private void addOverY() {this.overPosit.addY(this.getMoveY());}
	
	// Overridden functions
	@Override
	public abstract void interact();
	@Override
	public float getX() {return this.overPosit.getX();}
	@Override
	public float getY() {return this.overPosit.getY();}
	@Override
	public float getW() {return this.overScaledWidth;}
	@Override
	public float getH() {return this.overScaledHeight;}
	@Override
	public float[] getXYWH() {return new float[] {this.getX(), this.getY(), this.getW(), this.getH()};}
	@Override
	public String toString() {return "("+this.getX()+", "+this.getY() + ", "+this.getW()+", "+this.getH()+")";}
	@Override
	public boolean equals(Object other) {return this.charID == ((Character) other).charID;}
	@Override
	public boolean isTangible() {return false;}
	@Override
	public boolean isCollide(Obstacle o) {
		this.calculateOverMove(this.stateSpeed());
		overCollision = Engine.rectRectCollide(this.getX()-1, this.getY()-1, this.getW()+2, this.getH()+2, o.getX(), o.getY(), o.getW(), o.getH());
		float[] c = Engine.rectRectCollideCoords(this.getX(), this.getY(), this.getNewX(), this.getNewY(), this.getW(), this.getH(), o.getX(), o.getY(), o.getW(), o.getH());
		if (c.length != 0) {this.overPosit = this.unstick(c); this.overCurrState = 1; return true;} return false;
	}

}
