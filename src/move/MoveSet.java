package move;

public abstract class MoveSet {

	public MoveSet() {
		// TODO Auto-generated constructor stub
	}
	
	public abstract void move();
	
	public abstract boolean isCollide();
	
	public abstract int getMoveType();

}
