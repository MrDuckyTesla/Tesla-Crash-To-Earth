package game;

import java.util.ArrayList;
import processing.core.PApplet;
import processing.core.PImage;

// A Room holds obstacles and by extension characters
public class Room {

	private ArrayList<Obstacle> room = new ArrayList<Obstacle>();
	private Player p;
	// BACKGROUND VARIABLES
	private PImage background;
	private Point backCoords;
	private boolean backX, backY, hasInstantiated = false;
	
	public Room(Player p, PImage background) {this.p = p; this.background = background;}
	public Room(Player p, Obstacle o, PImage background) {this.p = p; this.background = background; room.add(o);}
	public Room(Player p, Obstacle[] o, PImage background) {this.p = p; this.background = background; this.add(o);}
	public Room(Player p,ArrayList<Obstacle> o, PImage background) {this.p = p; this.background = background; this.add(o);}
	public Room(Player p, Point q, Point r, PImage background) {this.p = p; this.background = background; this.add(q, r);}
	public Room(Player p, Point q, float w, float h, PImage background) {this.p = p; this.background = background; this.add(q, w, h);}
	public Room(Player p,float x, float y, float w, float h, PImage background) {this.p = p; this.background = background; this.add(x, y, w, h);}
	
	public void add(Obstacle o) {room.add(o);}
	public void add(Point p, float w, float h) {room.add(new Obstacle(p, w, h));}
	public void add(float x, float y, float w, float h) {room.add(new Obstacle(x, y, w, h));}
	public void add(Point p, Point q) {room.add(new Obstacle(p, q));}
	public void add(Obstacle[] o) {for (int i = 0; i < o.length; i ++) {room.add(o[i]);}}
	public void add(ArrayList<Obstacle> o) {for (int i = 0; i < o.size(); i ++) {room.add(o.get(i));}}
	
	private void instantiateVars(PApplet app) {
		this.backCoords = new Point((float) app.width/2-background.width/2, app.height/2-background.height/2); 
		this.backX = true; this.backY = true;
	}
	
	//TODO
	public void add(String file) {
			
	}
	
	public void display(PApplet app) {
		
	}
	
	public void calculateCollision() {
		
	}
	
	public void moveBackground(PApplet app) {
		if (!this.hasInstantiated) {this.instantiateVars(app); this.hasInstantiated = true;}
	    if (this.backX) {  // If background is moving X
	    	this.backCoords.changeX(-this.p.getMoveX());
	    	if (this.backCoords.getX() <= (float) app.width - this.background.width || this.backCoords.getX() >= 0) {
	    		this.backCoords.setX(this.backCoords.getX() <= (float) app.width - this.background.width? (float) app.width - this.background.width : 0);
	    		this.backX = false;
	    	}
	    } else {  // Else moving character X
	    	this.p.changeOverX();
	    	float temp = (float) app.width/2 - this.p.getWidth()/2;
	    	if ((this.p.getX() >= temp && this.backCoords.getX() >= 0) || (this.p.getX() <= temp && this.backCoords.getX() <= (float) app.width - this.background.width)) {
	    		this.p.setX(temp);
	    		this.backX = true;
	    	}
	    } if (this.backY) {  // If background is moving Y
	    	this.backCoords.changeY(-this.p.getMoveY());
	    	if (this.backCoords.getY() <= app.height - this.background.height || this.backCoords.getY() >= 0) {
	    		this.backCoords.setY(this.backCoords.getY() <= app.height - this.background.height? app.height - this.background.height : 0);
	    		this.backY = false;
	    	}
	    } else {  // Else moving character Y
	    	this.p.changeOverY();
	    	float temp = app.height/2 - this.p.getHeight()/2;
	    	if ((this.p.getY() >= temp && this.backCoords.getY() >= 0) || (this.p.getY() <= temp && this.backCoords.getY() <= app.height - this.background.height)) {
	    		this.p.setY(temp);
	    		this.backY = true;
	    	}
	    } app.image(this.background, this.backCoords.getX(), this.backCoords.getY());
	    System.out.println(this.backX + " " + this.backY);
	  }
	
}
