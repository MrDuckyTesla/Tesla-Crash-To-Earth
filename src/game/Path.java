package game;

import java.util.ArrayList;

import entity.Point;
import processing.core.PApplet;

public class Path {
	
	private ArrayList<Point> path = new ArrayList<Point>();
	
	public Path() {}
	public Path(Point point) {addPoint(point);}
	public Path(float x, float y) {addPoint(x, y);}
	public Path(ArrayList<Point> list) {addPoints(list);}
	public Path(Point[] list) {addPoints(list);}
	public Path(Path path) {addPoints(path);}
	public Path(float[][] list) {addPoints(list);}
	public Path(float[] list) {addPoints(list);}
	
	public void addPoint(Point point) {path.add(point);}
	public void addPoint(float x, float y) {path.add(new Point(x, y));}
	
	public void addPoints(ArrayList<Point> list) {for (int i = 0; i < list.size(); i++) {path.add(list.get(i));}}
	public void addPoints(Point[] list) {for (int i = 0; i < list.length; i++) {path.add(list[i]);}}
	public void addPoints(Path path) {addPoints(path.getPath());}
	public void addPoints(float[][] list) {for (int i = 0; i < list.length; i++) {addPoint(list[i][0], list[i][1]);}}
	public void addPoints(float[] list) {for (int i = 0; i < list.length; i+=2) {addPoint(list[i], list[i+1]);}}
	
	public float pathLength() {
		float length = PApplet.dist(path.get(0).getX(), path.get(0).getY(), path.get(1).getX(), path.get(1).getY());
		for (int i = 1; i < path.size(); i++) {length += PApplet.dist(path.get(i).getX(), path.get(i).getY(), path.get(i+1).getX(), path.get(i+1).getY());}
		return length;
	}
	
	public void display(PApplet app) {
		
	}
	
	public Point getEndPoint() {return path.get(path.size());}
	
	public float[] getEndPointArray() {return path.get(path.size()).getXY();}
	
	public boolean isEndPointAt(Point point) {return getEndPoint().equals(point);}
	
	public boolean isEmpty() {return path.size() == 0;}
	
	public Point getPoint(int index) {return path.get(index);}
	public float[] getPointArray(int index) {return path.get(index).getXY();}
	
	public ArrayList<Point> getPath() {return path;}
	
	public Point[] getPointArray() {
		Point[] list = new Point[this.path.size()];
		for (int i = 0; i < list.length; i++) {list[i] = this.path.get(i);}
		return list;
	}
	
	public float[][] get2DArray() {
		float[][] list = new float[this.path.size()][2];
		for (int i = 0; i < list.length; i++) {list[i] = this.path.get(i).getXY();}
		return list;
	}
	
	public float[] getFlatArray() {
		float[] list = new float[this.path.size()*2];
		for (int i = 0; i < list.length; i++) {
			list[i] = this.path.get(i).getX();
			list[i+1] = this.path.get(i).getY();
		} return list;
	}
	
	@Override
	public String toString() {
		String result = "[" + path.get(0).toString();
		for (int i = 1; i < path.size(); i++) {
			result += ", " + path.get(i).toString();
		}
		return result + "]";
	}

}
