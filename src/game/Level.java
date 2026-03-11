package game;

import java.util.ArrayList;
import processing.core.PApplet;
import processing.core.PImage;

// A level holds many Rooms
public class Level {
	
	private ArrayList<Room> rooms = new ArrayList<Room>();
	
	Player p;
	
	// Most simple player
	public Level(PImage img) {Point q = new Point(); int[][] c = {}; this.p = new Player(q, q, q, img, img, c, c, new int[0]);}
	
	public Level(Player p) {this.p = p;}
	
	public void addRoom(Obstacle o, PImage i) {rooms.add(new Room(p, o, i));}
	public void addRoom(Obstacle[] o, PImage i) {rooms.add(new Room(p, o, i));}
	
	public void addRooms(Room[] r) {
		
	}
	
	public void addRooms(ArrayList<Room> r) {
		
	}
	
	//TODO later
	public void addRooms(String file) {
		
	}

}
