package game;

import java.util.ArrayList;

// A level holds many Rooms
public class Level {
	
	private ArrayList<Room> rooms = new ArrayList<Room>();
	
	Player p;
	
	public Level(Player p) {this.p = p;}
	
	public void addRoom(Obstacle o) {
//		Room r = new Room(p, o);
//		rooms.add(r);
	}
	
	public void addRooms(Room[] r) {
		
	}
	
	public void addRooms(ArrayList<Room> r) {
		
	}
	
	//TODO
	public void addRooms(String file) {
		
	}

}
