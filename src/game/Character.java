package game;

import java.util.ArrayList;
import processing.core.PApplet;
import processing.core.PImage;

public abstract class Character extends Obstacle {
	
	// Constructor Variables
	private PApplet app;
	private PImage overImage, battImage;
	private Point overPosit, overDispPosit, battPosit, scale;
	private ArrayList<Integer> overColorList, battColorList;
	private int[] colorTint;
	// Animation Variables
	final private int OVER_ANIM_SPEED_CAP = 6;
	private Animation animManager = new Animation();
	private int[] animateState = new int[] {0, 0, 0, 0};
	private int overAnimSpeed = 12, framesEmpty = 0, battAnimSpeed = 5;
	private boolean changeAnim = false, unskipAnim = false;
	// Movement Variables
	final private float OVER_MOVE_SPEED_CAP = 6, BATT_IMPUL = 17, BATT_FRICT = 0.8f;
	private Point battPositLast, battVeloc = new Point(), battAccel = new Point(0, 1), overMove = new Point();
	private float overSpeed = 3, battSpeed = 2.5f;
	private boolean overSprint = false;
	// Character Dimensions
	final private int OVER_WIDTH = 28, OVER_HEIGHT = 28, BATT_WIDTH = 9, BATT_HEIGHT = 13;
	private float overScaledWidth, overScaledHeight, battScaledWidth, battScaledHeight;
	// World Variables
	private ArrayList<Integer> illegalOverDir = new ArrayList<Integer>();
	private float frameMultiplier = 1;
	private int overCurrDir = 0, overLastDir = 0, overCurrState = 1, overLastState = 0, battCurrDir = 0, battLastDir = 0, battCurrState = 0;
	private boolean overWorldCurr = true, overWorldLast = true;
	
	// THIS CLASS WILL BE ABSTRACT AND ONLY CONTAIN NESSESSICARY VARIABLES AND FUNCTIONS THAT APPLY TO ALL CHARACTERS
	
	public Character(PApplet app, Point overPosit, Point battPosit, Point scale, PImage overImage, PImage battImage, int[][] overColorLayer, int[][] battColorLayer, int[] colorTint) {
		this.colorTint = colorTint;
		this.instantiate(app, overPosit, battPosit, scale, overImage, battImage, overColorLayer, battColorLayer);
	}
	
	public Character(PApplet app, Point overPosit, Point battPosit, Point scale, PImage overImage, PImage battImage, int[][] overColorLayer, int[][] battColorLayer) {
		this.colorTint = new int[] {(int) (Math.random()*256), (int) (Math.random()*256), (int) (Math.random()*256), (int) (Math.random()*256), (int) (Math.random()*256), (int) (Math.random()*256), (int) (Math.random()*256), (int) (Math.random()*256), (int) (Math.random()*256)};
		this.instantiate(app, overPosit, battPosit, scale, overImage, battImage, overColorLayer, battColorLayer);
	}
	
	public Character(PApplet app, Point scale, PImage overImage, PImage battImage, int[][] overColorLayer, int[][] battColorLayer) {
		this.colorTint = new int[] {(int) (Math.random()*256), (int) (Math.random()*256), (int) (Math.random()*256), (int) (Math.random()*256), (int) (Math.random()*256), (int) (Math.random()*256), (int) (Math.random()*256), (int) (Math.random()*256), (int) (Math.random()*256)};
		this.overPosit = new Point((float)(Math.random() * app.width), (float)(Math.random() * app.height)); this.battPosit = new Point((float)(Math.random() * app.width), (float)(Math.random() * app.height));
		this.instantiate(app, overPosit, battPosit, scale, overImage, battImage, overColorLayer, battColorLayer);
	}
	
	private void instantiate(PApplet app, Point overPosit, Point battPosit, Point scale, PImage overImage, PImage battImage, int[][] overColorLayer, int[][] battColorLayer) {
		this.overPosit = overPosit; this.overImage = overImage.get(); overDispPosit = overPosit;
		this.battPosit = battPosit; this.battImage = battImage.get(); this.scale = scale; this.app = app;
		this.overColorList = Engine.PreCompile(app, this.overImage, overColorLayer); this.battColorList = Engine.PreCompile(app,  this.battImage, battColorLayer);
		Engine.changeColor(app,  this.overImage, overColorList, colorTint); Engine.changeColor(app, this.battImage, battColorList,colorTint);
		overScaledWidth = this.OVER_WIDTH * this.scale.getX(); overScaledHeight = this.OVER_HEIGHT * this.scale.getX();
		battScaledWidth = this.BATT_WIDTH * this.scale.getY(); battScaledHeight = this.BATT_HEIGHT * this.scale.getY();
	}
	
	public abstract void interact();
	
	public void update() {		
		this.frameMultiplier = app.frameRate < 1? 1: PApplet.round(60 / app.frameRate);  // If lower framerate, keep gameplay consistent
		// Check if we need to change the animation due to direction
		if (this.overWorldLast != this.overWorldCurr) {this.changeAnim = false;}
		else {this.changeAnim = this.overWorldCurr? this.overLastDir == this.overCurrDir : this.battLastDir == this.battCurrDir;}
		if (this.overWorldCurr) {  // If in overworld
			if (this.overSprint) {  // If sprinting, double all speeds
				this.overSpeed *= 2;
		        this.overAnimSpeed /= 2;
			}  // Keep code consistent at lower frameRates
		    this.overSpeed *= this.frameMultiplier;
		    this.overAnimSpeed /= this.frameMultiplier;
			if (this.unskipAnim) {  // If we are staying in an animation
				// If the animation has ended, end the animation
				if ((this.animManager.getIndexCount() + 1) % this.overAnimSpeed == 0 && this.animManager.getIndex() == this.animateState[2]) {this.unskipAnim = false;}
				else {this.overCurrState = this.animateState[0]; this.overCurrDir = this.overLastDir;}  //Else, keep the character state and direction the same
			} if (this.illegalOverDir.size() != 0) {  // Make sure if collides with obstacle, no weird animation shenanigans
				if (!this.illegalOverDir.contains(this.overCurrDir)) {if (framesEmpty > 1) {this.illegalOverDir = new ArrayList<Integer>();framesEmpty = 0;} framesEmpty++;}
				else {this.overCurrState = 1; this.unskipAnim = false;}
			} else {this.changeOverX(); this.changeOverY();}
			// Overworld states start here
			if (this.overCurrState == 3) {this.animateMoveOver(this.overSpeed, 16, 4, false, false);}  // Overworld Walk
			if (this.overCurrState == 2) {this.animateMoveOver(this.overSpeed/2, 48, 4, false, true);}  // Sword Swing (walking)
			if (this.overCurrState == 1) {this.animateMoveOver(0, 0, 2, true, false);}  // Overworld Idle
			// Reset speed of character
			this.overSpeed /= this.frameMultiplier;
		    this.overAnimSpeed *= this.frameMultiplier;
		    // Reset speeds if not sprinting
		    if (this.overSprint || (this.overSpeed >= this.OVER_MOVE_SPEED_CAP && this.overAnimSpeed <= this.OVER_ANIM_SPEED_CAP)) {this.overSpeed /= 2; this.overAnimSpeed *= 2;}
		} 
		
		else {  // Battle state
			
		}
		
		// Update last state variables
	    this.overLastDir = this.overCurrDir;
	    this.overWorldLast = this.overWorldCurr;
	    this.overLastState = this.overCurrState;
	    this.overDispPosit = this.overPosit;
	    this.battLastDir = this.battCurrDir;
	    this.battPositLast = this.battPosit;
		
	}
	
	public void showHitBox() {app.push(); app.fill(app.color(255, 0, 0)); app.rect(this.getX(), this.getY(), overScaledWidth, overScaledHeight); app.pop();}
	
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
	
	private void animateMoveOver(float speed, int start, int frames, boolean ignore, boolean fullAnim) {
		int startReal = start + this.overCurrDir * frames;
		this.overMove.resetPoint();
		if (fullAnim && this.animateState[3] != this.app.frameCount) {this.unskipAnim = true; this.animateState = new int[] {this.overCurrState, this.overCurrDir, startReal+frames-1, frames};}
		if (this.basicCollisionOver(this.overCurrState, 0, 0, app.width, app.height) != this.overCurrDir || ignore) {
			if (this.overCurrDir % 2 == 1) {speed *= 0.7071068f;}  // sin 45
			if (this.overCurrDir % 4 != 2) {this.overMove.setX(this.overCurrDir % 7 < 2? speed : -speed);}
			if (this.overCurrDir % 4 - 1 != -1) {this.overMove.setY(this.overCurrDir < 4? speed : -speed);}
			this.animManager.animate(this.app, this.overImage, this.overDispPosit.getX(), this.overDispPosit.getY(), this.OVER_WIDTH, this.OVER_HEIGHT, this.scale.getX(), startReal, startReal + frames - 1, this.overAnimSpeed, this.changeAnim, this.overLastState != this.overCurrState);
		} else {this.unskipAnim = false;}
	}
	
	private Point unstick(float[] c) {
		switch ((int) c[2]) {
			case 0:  // Down
				this.illegalOverDir = Engine.add(this.illegalOverDir,  new int[] {1, 2, 3});
				return new Point(c[0], c[1]-0.0001f);
			case 1:  // Left
				this.illegalOverDir = Engine.add(this.illegalOverDir,  new int[] {3, 4, 5});
				return new Point(c[0]+0.0001f, c[1]);
			case 2:  // Up
				this.illegalOverDir = Engine.add(this.illegalOverDir,  new int[] {5, 6, 7});
				return new Point(c[0], c[1]+0.0001f);
			case 3:  // Right
				this.illegalOverDir = Engine.add(this.illegalOverDir,  new int[] {0, 1, 7});
				return new Point(c[0]-0.0001f, c[1]);
			default:
				return new Point(c);
		}
	}
	
	// Private set
	private void setOverX(float x) {this.overPosit.setX(x);}
	private void setOverY(float y) {this.overPosit.setY(y);}
	
	// Private change
	private void changeOverX(float x) {this.overPosit.changeX(x);}
	private void changeOverY(float y) {this.overPosit.changeY(y);}
	private void changeOverX() {this.overPosit.changeX(this.getMoveX());}
	private void changeOverY() {this.overPosit.changeY(this.getMoveY());}
	
	// Overridden functions
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
	public void setX(float x) {this.overDispPosit.setX(x);}
	@Override
	public void setY(float y) {this.overDispPosit.setY(y);}
	@Override
	public String toString() {return "("+this.getX()+", "+this.getY() + ", "+this.getW()+", "+this.getH()+")";}
	@Override
	public boolean isParent() {return false;}
	@Override
	public boolean isCollide(Obstacle o) {
		float[] c = Engine.rectRectCollideCoords(this.getX(), this.getY(), this.getNewX(), this.getNewY(), this.getW(), this.getH(), o.getX(), o.getY(), o.getW(), o.getH());
		if (c.length != 0) {this.overPosit = this.unstick(c); return true;} return false;
	}
	
	// Get
	public int getIllegalDir() {return this.illegalOverDir.size();}
	public int getOverState() {return this.overCurrState;}
	public int getOverDir() {return this.overCurrDir;}
	public float getMoveX() {return this.overMove.getX();}
	public float getMoveY() {return this.overMove.getY();}
	public float getNewX() {return this.getX()+this.getMoveX();}
	public float getNewY() {return this.getY()+this.getMoveY();}
	public float getWidth() {return this.overScaledWidth;}
	public float getHeight() {return this.overScaledHeight;}
	public boolean getOverworld() {return this.overWorldCurr;}
	public boolean getSprint() {return this.overSprint;}
	public PApplet getApp() {return this.app;}
	// Set
	protected void setOverState(int state) {this.overCurrState = state;}
	protected void setOverDir(int dir) {this.overCurrDir = dir;}
	protected void setSprint(boolean state) {this.overSprint = state;}
	

}
