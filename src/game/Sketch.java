package game;

import java.util.ArrayList;
import processing.core.PApplet;
import processing.core.PImage;

public class Sketch extends PApplet {
	Animation test = new Animation();
	Obstacle[] obstacles = {new Obstacle(150, 200, 500, 100), new Obstacle(0, 380, 120, 100), new Obstacle(600, 600, 120, 160), new Obstacle(260, 500, 180, 80), new Obstacle(600, 175, 100, 300)};
	PImage image1, bck1;
	Room r1;
	Player p;

	ArrayList<Integer> colorList;

	public static void main(String[] args) {
		PApplet.main(Sketch.class);
	}
	
	// Only used for the size of the canvas
	@Override
	public void settings() {
		size(800, 800);
		noSmooth();
	}
	
	@Override
	public void setup() {
		surface.setTitle("Tesla: Crash to Earth");
		surface.setIcon(loadImage("game/Assets/Sprites/icon64.png"));
		textFont(createFont("game/Assets/Fonts/TeslaCrashToFont.ttf", 36, false));
		noCursor(); noStroke(); textSize(20);
		image1 = loadImage("game/Assets/Sprites/Tesla/Tesla_Overworld.png");
		bck1 = loadImage("game/Assets/Sprites/Background/background1.png");
		colorList = Engine.PreCompile(this, image1, new int[][] {{180, 157, 130, 31}, {187, 171}, {190, 163, 140}});
		Engine.changeColor(this, image1, colorList, new int[] {111, 111, 255, 255, 111, 111, 111, 111, 255});
		CObstacle cobstacle = new CObstacle(obstacles);
		cobstacle.cleanArray();
		obstacles = cobstacle.getObstacleArray().clone();
		
		Point p1 = new Point(400-14*3, 400-14*3);
		Point p2 = new Point(400-16, 800-3*4-140);
		p = new Player(this, p1, p2, new Point(3, 3), image1, image1, new int[][] {}, new int[][] {}, new int[] {}, new int[] {});
		r1 = new Room(p, bck1);
//		Level l1 = new Level();
//		Room r1 = new Room();
//		(PApplet app, Point overPosit, Point battPosit, Point scale, PImage overImage, PImage battImage, int[][] overColorLayer, int[][] battColorLayer, int[] overColorTint, int[] battColorTint)
//		r1.add(p);
//		l1.addRoom(r1);
	}
	
	@Override
	public void draw() {
		background(50);
//		this.image(Engine.squareImage(this, this.width, this.height, 40, this.width, this.width), 0, 0, this.width, this.height);
//		this.image(Engine.outline(this, Engine.circleImage(this, this.width/2, this.height/2, 40, PApplet.dist(this.width/2, this.height/2, this.mouseX, this.mouseY), 800, new int[] {255, 255, 111, 255}, false, new int[] {255, 111, 255, 255})), 0, 0, this.width, this.height);

//		float[] coords = Engine.getLimbCoords(width/2,  height/2, 150, 200, mouseX,  mouseY);
//		PImage line = Engine.lineImage(this, this.width/2, this.height/2, coords[0], coords[1], 160, 40, 800);
//		Engine.copy(this, line, Engine.lineImage(this, coords[0], coords[1], coords[2], coords[3], 160, 40, 800));
//		this.image(Engine.outline(this, line), 0, 0, this.width, this.height);
		
//		Engine.pixelate(this, Engine.outline(this, line), 20);
//		test.animateLegsRun(this, width/2-50, height/2, height - 100);
		
//		image(image1, 0, 200, 2240, 28);
//		test.animate(this, image1, 0, 0, 28, 28, 5, 16, 19, 12, false, false);
		
		// PATHFINDIING
		
//		for (int i = 0; i < obstacles.length; i++) {
//			obstacles[i].display(this, new int[] {(int)(Math.random()*256), (int)(Math.random()*256), (int)(Math.random()*256)});
//		}
//		
//		ArrayList<Point> criticalPoints = Engine.pathfind(50, 700, min(mouseX, width-100), min(mouseY, height-100), 100, 100, obstacles, 0, 0, width, height);
//		for (int i = 0; i < criticalPoints.size(); i++) {
//			criticalPoints.get(i).display(this, 30);
//		}
//		System.out.println(criticalPoints);
//		Engine.lineDraw(this, min(mouseX, width-100)+50, min(mouseY, height-100)+50, 25*2, 350*2);
//		
//		rect(min(mouseX, width-100), min(mouseY, height-100), 100, 100);
//		circle(50, 700, 50);
		
		// obj test
//		CObstacle test = new CObstacle(new Obstacle[] {new Obstacle(300, 200, 400, 400),  new Obstacle(200, 300, 400, 400)});
//		CObstacle test = new CObstacle(new Obstacle[] {new Obstacle(200, 200, 400, 400),  new Obstacle(300, 300, 400, 400)});
//		test.cleanArray();
//		test.display(this);
//		System.out.println(test.getArrayList());		
		
		r1.moveBackground(this);
		p.update();
		
		textSize(36); text(Math.round(this.frameRate)+"fps", 10, 30);
		
	}
	
	@Override
	public void keyPressed() {
		Engine.setKey(this.keyCode, true);
	}
	
	@Override
	public void keyReleased() {
		Engine.setKey(this.keyCode, false);
	}
}