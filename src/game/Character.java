package game;

import java.util.ArrayList;
import processing.core.PApplet;
import processing.core.PImage;

public abstract class Character extends Obstacle {
	
	// Constructor Variables
	private PApplet app;
	private Point overPosit, overPositActual, battPosit, scale;
	private PImage overImage, battImage;
	private int[] overColorTint, battColorTint;
	private ArrayList<Integer> overColorList, battColorList;
	// Animation Variables
	final private int OVER_ANIM_SPEED_CAP = 6;
	private int overAnimSpeed = 12, battAnimSpeed = 5;
	private boolean changeAnim = false, unskipAnim = false;
	private Animation animManager = new Animation();
	private int[] animateState = new int[] {0, 0, 0, 0};
	// Movement Variables
	final private float OVER_MOVE_SPEED_CAP = 6, BATT_IMPUL = 17, bATT_FRICT = 0.8f;
	private Point BattPositLast, battVeloc = new Point(), battAccel = new Point(0, 1), overMove = new Point();
	private float overSpeed = 3, battSpeed = 2.5f;
	private boolean overSprint = false;
	// Character Dimensions
	final private int OVER_WIDTH = 28, OVER_HEIGHT = 28, BATT_WIDTH = 9, BATT_HEIGHT = 13;
	private float overScaledWidth, overScaledHeight, battScaledWidth, battScaledHeight;
	// World Variables
	private int overCurrDir = 0, overLastDir = 0, overCurrState = 0, overLastState = 0, battCurrDir = 0, battLastDir = 0, battCurrState = 0;
	private boolean overWorldCurr = true, overWorldLast = true;
	private float frameMultiplier = 1;
	// THIS CLASS WILL BE ABSTRACT AND ONLY CONTAIN NESSESSICARY VARIABLES AND FUNCTIONS THAT APPLY TO ALL CHARACTERS
	
	public Character(PApplet app, Point overPosit, Point battPosit, Point scale, PImage overImage, PImage battImage, int[][] overColorLayer, int[][] battColorLayer, int[] overColorTint, int[] battColorTint) {
		this.overColorList = Engine.PreCompile(app, overImage, overColorLayer); this.battColorList = Engine.PreCompile(app, battImage, battColorLayer);
		this.overPosit = overPosit; this.overImage = overImage; this.overColorTint = battColorTint; this.overPositActual = overPosit;
		this.battPosit = battPosit; this.battImage = battImage; this.battColorTint = battColorTint; this.scale = scale; this.app = app;
		overScaledWidth = this.OVER_WIDTH * this.scale.getX(); overScaledHeight = this.OVER_HEIGHT * this.scale.getX();
		battScaledWidth = this.BATT_WIDTH * this.scale.getY(); battScaledHeight = this.BATT_HEIGHT * this.scale.getY();
	}
	
	public abstract void interact();
	
	public void show() {
		Engine.changeColor(app, overImage, overColorList, overColorTint);
		Engine.changeColor(app, battImage, battColorList, battColorTint);
		
		this.update();
	}
	
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
			}  // Overworld states start here
			switch(this.overCurrState) {
				case 3:  // Overworld Walk
					this.animateMoveOver(this.overSpeed, 16, 4, false, false);
					break;
				case 2:  // Sword Swing (walking)
					this.animateMoveOver(this.overSpeed/2, 48, 4, false, true);
					break;
				case 1:  // Overworld Idle
					this.animateMoveOver(0, 0, 2, true, false);
					break;
			}  // Reset speed of character
			this.overSpeed /= this.frameMultiplier;
		    this.overAnimSpeed *= this.frameMultiplier;
		    // Reset speeds if not sprinting
		    if (this.overSprint || (this.overSpeed >= this.OVER_MOVE_SPEED_CAP && this.overAnimSpeed <= this.OVER_ANIM_SPEED_CAP)) {this.overSpeed /= 2; this.overAnimSpeed *= 2;}
		}
		
		else {
			
		}
		
		// Set the last directions
	    this.overLastDir = this.overCurrDir;
	    this.overWorldLast = this.overWorldCurr;
	    this.overLastState = this.overCurrState;
	    this.battLastDir = this.battCurrDir;
		
	}
	
	private int collisionOver(int state, float x1, float y1, float x2, float y2) {
	    this.overCurrState = 1;
	    if ((this.overCurrDir == 0 || this.overCurrDir == 1 || this.overCurrDir == 7) && this.overPosit.getX() + this.overSpeed > x2 - this.overScaledWidth) {
	      this.overPosit.setX(x2 - this.overScaledWidth);
	      return this.overCurrDir;  // Right
	    } if ((this.overCurrDir == 1 || this.overCurrDir == 2 || this.overCurrDir == 3) && this.overPosit.getY() + this.overSpeed > y2 - this.overScaledHeight) {
	      this.overPosit.setY(y2 - this.overScaledHeight);
	      return this.overCurrDir;  // Down
	    } if ((this.overCurrDir == 3 || this.overCurrDir == 4 || this.overCurrDir == 5) && this.overPosit.getX() - this.overSpeed < x1) {
	      this.overPosit.setX(x1);
	      return this.overCurrDir;  // Left
	    } if ((this.overCurrDir == 5 || this.overCurrDir == 6 || this.overCurrDir == 7) && this.overPosit.getY() - this.overSpeed < y1) {
	      this.overPosit.setY(y1);
	      return this.overCurrDir;  // Up
	    } this.overCurrState = state;
	    return -1;
	  }
	
	private void animateMoveOver(float speed, int start, int frames, boolean ignore, boolean fullAnim) {
		int startReal = start + this.overCurrDir * frames;
		this.overMove.resetPoint();
		if (fullAnim && this.animateState[3] != this.app.frameCount) {this.unskipAnim = true; this.animateState = new int[] {this.overCurrState, this.overCurrDir, startReal+frames-1, frames};}
		if (this.collisionOver(this.overCurrState, 0, 0, app.width, app.height) != this.overCurrDir || ignore) {
			if (this.overCurrDir % 2 == 1) {speed *= 0.7071068f;}  // sin 45
			if (this.overCurrDir % 4 != 2) {this.overMove.setX(this.overCurrDir % 7 < 2? speed : -speed);}
			if (this.overCurrDir % 4 - 1 != -1) {this.overMove.setY(this.overCurrDir < 4? speed : -speed);}
			this.animManager.animate(this.app, this.overImage, this.overPosit.getX() + this.overPositActual.getX(), this.overPosit.getY() + this.overPositActual.getY(), this.OVER_WIDTH, this.OVER_HEIGHT, this.scale.getX(), startReal, startReal + frames - 1, this.overAnimSpeed, this.changeAnim, this.overLastState != this.overCurrState);
		} else {this.unskipAnim = false;}
	}
	
	// Overridden functions
	@Override
	public float getX() {return this.overPosit.getX();}
	@Override
	public float getY() {return this.overPosit.getY();}
	@Override
	public float getW() {return this.OVER_WIDTH;}
	@Override
	public float getH() {return this.OVER_HEIGHT;}
	@Override
	public float[] getXYWH() {return new float[] {this.getX(), this.getY(), this.getW(), this.getH()};}
	@Override
	public String toString() {return "("+this.getX()+", "+this.getY() + ", "+this.getW()+", "+this.getH()+")";}
	// Get
	public int getOverState() {return this.overCurrState;}
	public int getOverDir() {return this.overCurrDir;}
	public float getMoveX() {return this.overMove.getX();}
	public float getMoveY() {return this.overMove.getY();}
	public float getWidth() {return this.overScaledWidth;}
	public float getHeight() {return this.overScaledHeight;}
	public boolean getOverworld() {return this.overWorldCurr;}
	public boolean getSprint() {return this.overSprint;}
	public PApplet getApp() {return this.app;}
	// Set
	public void setOverState(int state) {this.overCurrState = state;}
	public void setOverDir(int dir) {this.overCurrDir = dir;}
	public void setSprint(boolean state) {this.overSprint = state;}
	public void setX(float x) {this.overPosit.setX(x);}
	public void setY(float y) {this.overPosit.setY(y);}
	// Change
	public void changeOverX() {this.overPosit.changeX(this.getMoveX());}
	public void changeOverY() {this.overPosit.changeY(this.getMoveY());}
	

}
