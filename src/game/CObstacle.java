package game;

import java.util.ArrayList;
import processing.core.PApplet;

public class CObstacle {  // Complex Obstacle (basically multiple rectangles stitched together)
	
	private ArrayList<Obstacle> cobstacle = new ArrayList<Obstacle>();
	
	public CObstacle() {}
	public CObstacle(Obstacle obstacle) {addObstacle(obstacle);}
	public CObstacle(float x, float y) {addObstacle(x, y);}
	public CObstacle(float x, float y, float w, float h) {addObstacle(x, y, w, h);}
	public CObstacle(ArrayList<Obstacle> list) {addObstacles(list);}
	public CObstacle(Obstacle[] list) {addObstacles(list);}
	public CObstacle(CObstacle cobstacle) {addObstacles(cobstacle);}
	public CObstacle(float[][] list) {addObstacles(list);}
	public CObstacle(float[] list) {addObstacles(list);}
	
	public void addObstacle(Obstacle obstacle) {cobstacle.add(obstacle);}
	public void addObstacle(float x, float y) {cobstacle.add(new Obstacle(x, y));}
	public void addObstacle(float x, float y, float w, float h) {cobstacle.add(new Obstacle(x, y, w, h));}
	public void addObstacles(ArrayList<Obstacle> list) {for (int i = 0; i < list.size(); i++) {cobstacle.add(list.get(i));}}
	public void addObstacles(Obstacle[] list) {for (int i = 0; i < list.length; i++) {cobstacle.add(list[i]);}}
	public void addObstacles(CObstacle cobstacle) {addObstacles(cobstacle.getArrayList());}
	public void addObstacles(float[][] list) {for (int i = 0; i < list.length; i++) {addObstacle(list[i][0], list[i][1], list[i][2], list[i][3]);}}
	public void addObstacles(float[] list) {for (int i = 0; i < list.length; i+=4) {addObstacle(list[i], list[i+1], list[i+2], list[i+3]);}}
	
	public boolean isEmpty() {return cobstacle.size() == 0;}
	
	public void cleanArray() {
		for (int i = 1; i < cobstacle.size(); i++) {
			for (int j = 0; j < i; j++) {
				Obstacle ob1 = cobstacle.get(i), ob2 = cobstacle.get(j);
				if (ob1.isInside(ob2) || ob1.getW() <= 0 || ob1.getH() <= 0) {cobstacle.remove(i); i--; j=i;}
				else {
					boolean isTouchingInside = true;
					while (isTouchingInside) {
						if (ob1.getX() < ob2.getX() && ob1.getX() + ob1.getW() > ob2.getX()) {  // If on the left and intersecting with rect
							cobstacle.set(i, new Obstacle(ob1.getX(), ob1.getY(), ob2.getX()- ob1.getX(), ob1.getH()));  // NEW Specified Object that we must move
							cobstacle.add(i+1, new Obstacle(ob2.getX(), ob1.getY(), ob1.getW() - (ob2.getX()- ob1.getX()), ob1.getH())); //  The second half of the object
						} else if (ob1.getX() < ob2.getX()+ob2.getW() && ob1.getX() + ob1.getW() > ob2.getX() + ob2.getW()) {  // If on the right and intersecting with rect
							cobstacle.set(i, new Obstacle(ob1.getX(), ob1.getY(), ob2.getX() + ob2.getW() - ob1.getX(), ob1.getH()));  // NEW Specified Object that we must move
							cobstacle.add(i+1, new Obstacle(ob2.getX()+ob2.getW(), ob1.getY(), ob1.getX()+ob1.getW()-ob2.getX()-ob2.getW(), ob1.getH())); // the second half of the object
						} else if (ob1.getY() < ob2.getY() && ob1.getY() + ob1.getH() > ob2.getY()) {
							cobstacle.set(i, new Obstacle(ob1.getX(), ob1.getY(), ob1.getW(), ob2.getY() - ob1.getY()));  // NEW Specified Object that we must move
							cobstacle.add(i+1, new Obstacle(ob1.getX(), ob2.getY(), ob1.getW(), ob1.getH() - (ob2.getY()- ob1.getY()))); // Will probably get replaced lol what a loser smh
						} else if (ob1.getY() < ob2.getY()+ob2.getH() && ob1.getY() + ob1.getH() > ob2.getY() + ob2.getH()) {
							cobstacle.set(i, new Obstacle(ob1.getX(), ob1.getY(), ob1.getW(), ob2.getY() + ob2.getH() - ob1.getY()));  // NEW Specified Object that we must move
							cobstacle.add(i+1, new Obstacle(ob1.getX(), ob2.getY()+ob2.getH(), ob1.getW(), ob1.getY()+ob1.getH()-ob2.getY()-ob2.getH())); // the second half of the object
						} ob1 = cobstacle.get(i); ob2 = cobstacle.get(j);  // get new/changed versions of obstacle
						isTouchingInside = Engine.rectRectCollideNotExact(ob1.getX(), ob1.getY(), ob1.getW(), ob1.getH(), ob2.getX(), ob2.getY(), ob2.getW(), ob2.getH());
						if (ob1.isInside(ob2) || ob1.getW() <= 0 || ob1.getH() <= 0) {cobstacle.remove(i); i--; j=-1;  isTouchingInside = false;}
					}
				}
			} // After the above nonsense, usually there will be 2 obstacles that have the same orientation and an adjacent length that we can merge
		} boolean isSillSimplify;  // Create a boolean that we can keep looping with
		do {
			isSillSimplify = false;
			for (int i = 0; i < cobstacle.size(); i++) {
				for (int j = 0; j < cobstacle.size(); j++) {
					Obstacle ob1 = cobstacle.get(i), ob2 = cobstacle.get(j);
					if (Engine.rectRectCollide(ob1.getX(), ob1.getY(), ob1.getW(), ob1.getH(), ob2.getX(), ob2.getY(), ob2.getW(), ob2.getH()) && i != j) {
						if (ob1.getW() == ob2.getW() && ob1.getX() == ob2.getX()) {
							cobstacle.set(i, new Obstacle(ob1.getX(), ob1.getY()<ob2.getY()? ob1.getY() : ob2.getY(), ob1.getW(), ob1.getH()+ob2.getH()));
							cobstacle.remove(j); i = 0; j = -1; isSillSimplify = true;
						} else if  (ob1.getH() == ob2.getH() && ob1.getY() == ob2.getY()) {
							cobstacle.set(i, new Obstacle(ob1.getX()<ob2.getX()? ob1.getX() : ob2.getX(), ob1.getY(), ob1.getW()+ob2.getW(), ob1.getH()));
							cobstacle.remove(j); i = 0; j = -1; isSillSimplify = true;
						}
					}
				}
			}
		} while (isSillSimplify);
	}
	
	public void display(PApplet app) {
		for (int i = cobstacle.size()-1; i >= 0; i--) {
			cobstacle.get(i).displayRect(app);
//			cobstacle.get(i).display(app, new int[] {(int)(Math.random()*256), (int)(Math.random()*256), (int)(Math.random()*256)});
		}
	}
	
	public Obstacle getObstacle(int index) {return cobstacle.get(index);}
	public float[] getObstacleArray(int index) {return cobstacle.get(index).getXYWH();}
	
	public ArrayList<Obstacle> getArrayList() {return cobstacle;}
	
	public float getPerimeter() {return -1;}
	
	public Path getPath() {
		Path p = new Path();
		
		for (int i = 0; i < cobstacle.size(); i++) {
			p.addPoints(cobstacle.get(i).getCorners());
		}
		for (int i = 0; i < p.getPath().size(); i++) {
			for (int j = 0; j < p.getPath().size(); j++) {
				if (i != j && p.getPath().get(i).equals(p.getPath().get(j))) {
					p = new Path(Engine.removeAll(p.getPath().get(i), p.getPath()));
				}
			}
		}
		return p;
	}
	
	public Point getCorner(boolean topSide, boolean rightSide, boolean respectX) { // Finds a certain extreme corner
		Point p = cobstacle.get(0).getCorner(topSide, rightSide);  // Current best point
		for (int i = 1; i < cobstacle.size(); i++) {  // Iterate through
			Point q = cobstacle.get(i).getCorner(topSide, rightSide);  // Comparison point
			float pc1 = respectX? p.getX() : p.getY(), qc1 = respectX? q.getX() : q.getY(), pc2 = !respectX? p.getX() : p.getY(), qc2 = !respectX? q.getX() : q.getY();  // ternary operations to find correct variables
			// Basically ill keep this here as a reason how i got the below expression as its dense, i realized the following: (T ^ nX) v (nR ^ X)  < ?, (nT ^ R) v (T ^ nX)  ? >, with n = !, ^ = &&, and v = ||
			if (((respectX? !rightSide : topSide)? qc1 < pc1 : qc1 > pc1) || (((topSide? !respectX : rightSide)? qc2 > pc2 : qc2 < pc2) && qc1 == pc1)) {p = q;}  // Update p if true
		} return p;  // Found best p!
	}

	public Obstacle[] getObstacleArray() {
		Obstacle[] list = new Obstacle[this.cobstacle.size()];
		for (int i = 0; i < list.length; i++) {list[i] = this.cobstacle.get(i);}
		return list;
	}
	
	public float[][] get2DArray() {
		float[][] list = new float[this.cobstacle.size()][4];
		for (int i = 0; i < list.length; i++) {list[i] = this.cobstacle.get(i).getXYWH();}
		return list;
	}
	
	public float[] getFlatArray() {
		float[] list = new float[this.cobstacle.size()*4];
		for (int i = 0; i < list.length; i++) {
			list[i] = this.cobstacle.get(i).getX();
			list[i+1] = this.cobstacle.get(i).getY();
			list[i+2] = this.cobstacle.get(i).getW();
			list[i+3] = this.cobstacle.get(i).getH();
		} return list;
	}
	
	@Override
	public String toString() {
		String result = "[" + cobstacle.get(0).toString();
		for (int i = 1; i < cobstacle.size(); i++) {
			result += ", " + cobstacle.get(i).toString();
		}
		return result + "]";
	}

}
