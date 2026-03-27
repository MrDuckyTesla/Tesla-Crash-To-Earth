package game;

import entity.*;
import processing.core.PApplet;
import processing.core.PImage;

public class Main extends PApplet {
	
	Obstacle[] obstacles;
	private final int[][][] PlayerSpriteLayers = {{{180, 157, 130, 31}, {187, 171}, {190, 163, 140}}, {{105, 85, 34}, {104}}};
	private int[] PlayerColorTints = {111, 111, 255, 255, 111, 111, 255, 200, 0};
	PImage image1, bck1;
	Level tutorial;
	Room test;
	Player p;

	public static void main(String[] args) {
		PApplet.main(Main.class);
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
		surface.setIcon(loadImage("src/Assets/Sprites/icon64.png"));
		textFont(createFont("src/Assets/Fonts/TeslaCrashToFont.ttf", 36, false));
		noCursor(); noStroke(); textSize(20);
		image1 = loadImage("src/Assets/Sprites/Tesla/Tesla_Overworld.png");
		bck1 = loadImage("src/Assets/Sprites/Background/background1.png");
//		colorList = Engine.PreCompile(this, image1, new int[][] {{180, 157, 130, 31}, {187, 171}, {190, 163, 140}});
//		Engine.changeColor(this, image1, colorList, new int[] {111, 111, 255, 255, 111, 111, 255, 200, 0});
		obstacles = new Obstacle[] {new Obstacle(150, 200, 500, 100), new Obstacle(0, 380, 120, 100), new Obstacle(600, 600, 120, 160), new Obstacle(260, 500, 180, 80), new Obstacle(600, 175, 100, 300)};
		CObstacle cobstacle = new CObstacle(obstacles);
		cobstacle.cleanArray();
		obstacles = cobstacle.getObstacleArray().clone();
		Point.setApp(this);
		Point p1 = new Point(400, 400);
		Point p2 = new Point(400, 500);
		p = new Player(p1, p1, new Point(3, 3), image1, image1, PlayerSpriteLayers[0], PlayerSpriteLayers[1], PlayerColorTints);
		test = new Room(p, bck1);
		test.add(200, 200, 100, 100);
		test.add(300, 300, 100, 100);
		// five hundred teslas
//		for (int i = 0; i < 500; i++) {
//			Point q = new Point((float)Math.random()*800, (float)Math.random()*800);
//			test.add(new Enemy( q, q, new Point(3, 3), image1.copy(), image1.copy(), PlayerSpriteLayers[0], PlayerSpriteLayers[1]));
//		}
		test.add(new Enemy(p1, p1, new Point(3, 3), image1.copy(), image1.copy(), PlayerSpriteLayers[0], PlayerSpriteLayers[1]));
		test.add(new Enemy(p2, p2, new Point(3, 3), image1.copy(), image1.copy(), PlayerSpriteLayers[0], PlayerSpriteLayers[1]));
//		Level l1 = new Level();
//		Room r1 = new Room();
//		(PApplet app, Point overPosit, Point battPosit, Point scale, PImage overImage, PImage battImage, int[][] overColorLayer, int[][] battColorLayer, int[] overColorTint, int[] battColorTint)
//		r1.add(p);
//		l1.addRoom(r1);
	}
	
	@Override
	public void draw() {
		background(50);
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

		test.update(this);
//		p.update();
		
		textSize(36); text(Math.round(this.frameRate)+"fps", 10, 30);
		
	}
	
	@Override
	public void keyPressed() {
		ToolKit.setKey(this.keyCode, true);
	}
	
	@Override
	public void keyReleased() {
		ToolKit.setKey(this.keyCode, false);
	}
}