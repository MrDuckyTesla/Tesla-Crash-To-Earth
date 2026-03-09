package game;

import java.util.ArrayList;
import processing.core.PApplet;
import processing.core.PImage;

public class Engine {  // "USED TO BE THE MEDIA CLASS, CHANGED DUE TO IT BEING EXPANDED TO MORE OF A GAME ENGINE" - Old Nico
	
	private static boolean[] keys = new boolean[256];
	
	public static ArrayList<Integer> PreCompile(PApplet app, PImage image, int[][] layerList) {  // PreCompile to avoid lag
		ArrayList<Integer> colorList = new ArrayList<>();  // List of colors and indexes to return
		image.loadPixels();  // Load pixels for scanning
		for (int i = 0; i < image.pixels.length; i++) {  // Iterate through pixels
			if (app.alpha(image.pixels[i]) != 0){   // Check if pixel is transparent
				for (int j = 0; j < layerList.length; j++) {  // Iterate through color layers
					for (int k = 0; k < layerList[j].length; k++) {
						if (app.red(image.pixels[i]) == layerList[j][k]) {
							colorList.add(i);  // Push index
							colorList.add(j);  // Push layer
							colorList.add(image.pixels[i]);  // Push color
						}
					}
				}
			}
		} return colorList;  // Return ArrayList
	}
	
	public static void changeColor(PApplet app, PImage image, ArrayList<Integer> colorList, int[] tintList) {
		image.loadPixels();  // Load pixels for changing
	    for (int i = 0; i < colorList.size(); i += 3) {  // Apply formula:  NR = (3 * (G + r) - (g + b)) / 4
	    	int G = (int) app.red(colorList.get(i+2));
	    	image.pixels[colorList.get(i)] = app.color(
	    		(3 * (G + tintList[    3 * colorList.get(i + 1)]) - (tintList[1 + 3 * colorList.get(i + 1)] + tintList[2 + 3 * colorList.get(i + 1)])) / 4, 
	    		(3 * (G + tintList[1 + 3 * colorList.get(i + 1)]) - (tintList[2 + 3 * colorList.get(i + 1)] + tintList[    3 * colorList.get(i + 1)])) / 4, 
	    		(3 * (G + tintList[2 + 3 * colorList.get(i + 1)]) - (tintList[    3 * colorList.get(i + 1)] + tintList[1 + 3 * colorList.get(i + 1)])) / 4
	    	);
	    } image.updatePixels();  // Update the pixels
	}
	
	public static void changeSingleColor(PApplet app, PImage image, int[] ogColorRGB, int[] newColorRGB) {
		image.loadPixels();  // Load pixels for changing
		for (int i = 0; i < image.pixels.length; i++) {  // Iterate through pixels
			if (app.alpha(image.pixels[i]) != 0) {  // Check if pixel is transparent
				if (app.color(ogColorRGB[0], ogColorRGB[1], ogColorRGB[2]) == app.color(image.pixels[i])) {
					image.pixels[i] = app.color(newColorRGB[0], newColorRGB[1], newColorRGB[2]);
				}
			}
		} image.updatePixels();  // Update the pixels
	}
	
	public static void resetColor(PApplet app, PImage image, ArrayList<Integer> colorList) {  // Resets all pixels in image based on pre-compile list
		image.loadPixels();  // Load pixels for changing
		for (int i = 0; i < colorList.size(); i+= 3) {
			image.pixels[colorList.get(i)] = app.color(colorList.get(i + 2), colorList.get(i + 2), colorList.get(i + 2));
		} image.updatePixels();  // Update the pixels
	}
	
	public static void clearImage(PApplet app, PImage image) {
		image.loadPixels();  // Load pixels for changing
		for (int i = 0; i < image.pixels.length; i++) {image.pixels[i] = app.color(app.red(image.pixels[i]), app.green(image.pixels[i]), app.blue(image.pixels[i]), 0);}
		image.updatePixels();  // Update the pixels
	}
	
	public static void pixelate(PApplet app, int res, float x, float y, float w, float h) {
		PImage image = app.get(); // Get canvas
		image.resize(app.width/res, app.height/res);  // Resize canvas to wanted size
		app.image(image, x, y, w, h, (int) (x / res), (int) (y / res), (int) (x / res + w / res), (int) (y / res + h / res));
	}
	
	public static void pixelate(PApplet app, PImage image, int res, float x, float y, float w, float h) {
		image.resize(app.width/res, app.height/res);  // Resize image to wanted size
		app.image(image, x, y, w, h, (int) (x / res), (int) (y / res), (int) (x / res + w / res), (int) (y / res + h / res));
	}
	
	//TODO IMPLEMENT PATHFINDING
	// =======================================================================================================================================================================================================
	
	public static ArrayList<Point> pathfind(float tx, float ty, float cx, float cy, float cw, float ch, Obstacle[] objects, float bx, float by, float bw, float bh) {
		ArrayList<Point> criticalPoints = Engine.findCritPoints(tx, ty, cx, cy, cw, ch, objects, bx, by, bw, bh);
		if (criticalPoints.size() == 0) {return criticalPoints;}
		
//		float[] coordsC = criticalPoints.remove(0).getXY();
//		float[] indexIJ = criticalPoints.remove(0).getXY();
//		ArrayList<Path> paths = Engine.exploreObjects(tx, ty, coordsC[0], coordsC[1], cw, ch, objects, bx, by, bw, bh, indexIJ, new ArrayList<Path>());
		
		return criticalPoints;
	}
	
	
	@SuppressWarnings("unused")
	private static ArrayList<Path> exploreObjects(float tx, float ty, float cx, float cy, float cw, float ch, Obstacle[] objects, float bx, float by, float bw, float bh, float[] indexIJ, ArrayList<Path> paths) {
		for (int i = 0; i < 2; i++) {
			float[] collision = new float[] {};
			do {
				
			} 
			while(collision.length != 0);
		}
		
		
		return new ArrayList<Path>();
	}
	
	@SuppressWarnings("unused")
	private static CObstacle[] preCompileGroups() {
		
		
		return new CObstacle[] {};
	}
	
	private static ArrayList<Point> findCritPoints(float tx, float ty, float cx, float cy, float cw, float ch, Obstacle[] objects, float bx, float by, float bw, float bh) {
		ArrayList<Point> criticalPoints = new ArrayList<Point>();
		if (!Engine.pointRectCollide(tx, ty, bx+cw/2, by+ch/2, bw-cw, bh-ch)) {return criticalPoints;} // Return if target is in invalid spot
		float[] farList, nearList = new float[] {Float.NEGATIVE_INFINITY};
		for (int i = 0; i < objects.length; i++) {  // Iterate through each object
			farList = new float[] {Float.POSITIVE_INFINITY};  // Reset distance farList is checking
			float[][] collide = Engine.lineRectCollide(tx, ty, cx+cw/2, cy+ch/2, objects[i].getX()-cw/2, objects[i].getY()-ch/2, objects[i].getW()+cw, objects[i].getH()+ch);  // Cast line
			for (int j = 0; j < collide.length; j++) {  // Iterate through each side of the object
				if (collide[j].length != 0) {
					float dist = PApplet.dist(tx, ty, collide[j][0], collide[j][1]);
					if (farList[0] > dist) {farList = new float[] {dist, collide[j][0], collide[j][1], j};}  // Get the farthest points and push it to the farList
					if (nearList[0] < dist) {nearList = new float[] {dist, collide[j][0], collide[j][1], i, j};}  // Get the nearest points and push it to the nearList
				}
			} 
			Obstacle ObjHitbox = new Obstacle(objects[i].getX()-cw/2, objects[i].getY()-ch/2, objects[i].getW()+cw, objects[i].getH()+ch);
			if (farList.length != 1) {  // Check if the list has any points
//				criticalPoints.add(ObjHitbox.getTRCorner());
//				criticalPoints.add(ObjHitbox.getTLCorner());
//				criticalPoints.add(ObjHitbox.getBRCorner());
//				criticalPoints.add(ObjHitbox.getBLCorner());
				
				// getCorner(boolean topSide, boolean rightSide)
				switch((int) farList[3]) {  // Get the critical points and push it to the list
					case 0:  // Top of object
						criticalPoints.add(ObjHitbox.getCorner(true, true));
						criticalPoints.add(ObjHitbox.getCorner(true, false));
						break;
					case 1:  // Right side of object
						criticalPoints.add(ObjHitbox.getCorner(true, true));
						criticalPoints.add(ObjHitbox.getCorner(false, true));
						break;
					case 2:  // Bottom of object
						criticalPoints.add(ObjHitbox.getCorner(false, true));
						criticalPoints.add(ObjHitbox.getCorner(false, false));
						break;
					case 3:  // Left side of object
						criticalPoints.add(ObjHitbox.getCorner(true, false));
						criticalPoints.add(ObjHitbox.getCorner(false, false));
						break;
				}
			}
		} 
		if (nearList.length == 1) {return new ArrayList<Point>();}
		boolean ignorePoint;
		for (int j = 0; j < criticalPoints.size(); j++) {  // Iterate through all crit points
			ignorePoint = false;  // variable to keep track of if we should skip current point
			for (int k = 0; k < objects.length; k++) {  // Iterate through the object list
				if (Engine.pointRectCollideNotExact(criticalPoints.get(j).getX(), criticalPoints.get(j).getY(), objects[k].getX()-cw/2, objects[k].getY()-ch/2, objects[k].getW()+cw, objects[k].getH()+ch)) {  
					ignorePoint = true;  // If yes then we set the ignore variable to true...
					k = objects.length;  // ..and end the loop
				}  // Check if the coords are inside 2 objects
			} if (ignorePoint || !Engine.pointRectCollide(criticalPoints.get(j).getX(), criticalPoints.get(j).getY(),  bx+cw/2, by+ch/2, bw-cw, bh-ch)) {criticalPoints.remove(j); j--;}
		} 
//		criticalPoints.add(0, new Point(nearList[3], nearList[4]));  // Add the indexes to the front
//		criticalPoints.add(0, new Point(nearList[1], nearList[2]));  // Add the closest point to the front
		return criticalPoints;  // Return critical points with the closest point in the front
	}
	
//	private static ArrayList<Point> findCritPoints(float tx, float ty, float cx, float cy, float cw, float ch, Obstacle[] objects, float bx, float by, float bw, float bh) {
//		ArrayList<Point> criticalPoints = new ArrayList<Point>();
//		if (!Engine.pointRectCollide(tx, ty, bx+cw/2, by+ch/2, bw-cw, bh-ch)) {return criticalPoints;} // Return if target is in invalid spot
//		for (int i = 0; i < objects.length; i++) {  // Iterate through each object
//			Obstacle ObjHitbox = new Obstacle(objects[i].getX()-cw/2, objects[i].getY()-ch/2, objects[i].getW()+cw, objects[i].getH()+ch);
//			criticalPoints.add(ObjHitbox.getTRCorner());
//			criticalPoints.add(ObjHitbox.getTLCorner());
//			criticalPoints.add(ObjHitbox.getBRCorner());
//			criticalPoints.add(ObjHitbox.getBLCorner());
//		} boolean ignorePoint;
//		for (int i = 0; i < criticalPoints.size(); i++) {  // Iterate through all crit points
//			ignorePoint = false;  // variable to keep track of if we should skip current point
//			for (int k = 0; k < objects.length; k++) {  // Iterate through the object list
//				if (Engine.pointRectCollideNotExact(criticalPoints.get(i).getX(), criticalPoints.get(i).getY(), objects[k].getX()-cw/2, objects[k].getY()-ch/2, objects[k].getW()+cw, objects[k].getH()+ch)) {  
//					ignorePoint = true;  // If yes then we set the ignore variable to true...
//					k = objects.length;  // ..and end the loop
//				}  // Check if the coords are inside 2 objects
//			} if (ignorePoint || !Engine.pointRectCollide(criticalPoints.get(i).getX(), criticalPoints.get(i).getY(),  bx+cw/2, by+ch/2, bw-cw, bh-ch)) {criticalPoints.remove(i); i--;}
//		} return criticalPoints;  // Return critical points with the closest point in the front
//	}
	
	// =======================================================================================================================================================================================================

	public static float[] lineRadius(float centerX, float centerY, float endX, float endY, float radius, boolean forceRadius) {  // Returns coords to keep a line within a radius
		if (forceRadius || PApplet.dist(centerX, centerY, endX, endY) > radius) {  // If the line is outside the radius
			if (endX == centerX) {endX += 0.1f;} 
			if (endY == centerY) {endY += 0.1f;}
			endX -= centerX; endY -= centerY;  // Make sure the x and y can never be 0
			int flip = 1; float temp = endX;  // Make a copy of x
			if (endX < 0) {flip = -1;}
			return new float[] {flip * radius * PApplet.cos(PApplet.atan(endY / endX)) + centerX, flip * radius * PApplet.sin(PApplet.atan(endY / temp)) + centerY};
		} return new float[] {endX, endY};
	}
	
	public static float[] getLimbCoords(float centerX, float centerY, float length1, float length2, float endX, float endY, boolean bendRight) {
		float dist = PApplet.dist(centerX, centerY, endX, endY);
		float[] coord = Engine.lineRadius(centerX, centerY, endX, endY, length1 + length2, true);
		if (dist > length1 + length2) {return new float[] {centerX, centerY, coord[0], coord[1]};} 
		else if (dist < length1 - length2) {
			coord = Engine.lineRadius(centerX, centerY, endX, endY, length1, true);
			return new float[] {coord[0], coord[1], coord[0], coord[1]};
		} else if (dist < length2 - length1) {
			coord = Engine.lineRadius(centerX, centerY, endX, endY, -length1, true);
			float[] coord2 = Engine.lineRadius(coord[0], coord[1], endX, endY, length2, true);
			return new float[] {coord[0], coord[1], coord2[0], coord2[1]};
		}  endX -= centerX; endY -= centerY;  // Make sure the x and y can never be 0
		float theta = PApplet.acos((float) ((Math.pow(dist, 2) + Math.pow(length1, 2) - Math.pow(length2, 2)) / (2 * dist * length1)));
		int flip = 1; if (endX < 0) {flip = -1;}  // Make line not go back 180 degrees
		if (bendRight) {theta *= -1;}  // Make theta bend right if true
		float x = flip * length1 * PApplet.cos(theta + PApplet.atan(endY / endX)) + centerX;
		float y = flip * length1 * PApplet.sin(theta + PApplet.atan(endY / endX)) + centerY;
		coord = Engine.lineRadius(x, y, endX + centerX, endY + centerY, length2, true);
		return new float[] {x, y, coord[0], coord[1]};
	}
	
	// WIP
	public static float[] getLimbNJointCoords(float centerX, float centerY, float[] lengths, float endX, float endY, boolean bendRight) {
//		if (lengths.length <= 3) {return lengths.length == 3? Engine.getLimbCoords(centerX, centerY, lengths[0] + lengths[1], lengths[2], endX, endY, bendRight) : Engine.getLimbCoords(centerX, centerY, lengths[0], lengths[1], endX, endY, bendRight);}
//		float totalLength = 0; float dist = PApplet.dist(centerX, centerY, endX, endY);
//		for (int i = 0; i < lengths.length; i++) {totalLength += lengths[i];}
//		float[] coord = Engine.lineRadius(centerX, centerY, endX, endY, totalLength, true);
//		if (dist > totalLength) {
//			float[] finalC = new float[lengths.length*2];
//			for (int i = 0; i < lengths.length*2; i++) {finalC[i] = i % 2 == 0? coord[0] : coord[1];}
//			return finalC;
//		} 
//		float lengthHalf1 = 0, lengthHalf2 = 0;
//		float[] half1 = new float[lengths.length/2 + lengths.length%2];
//		float[] half2 = new float[lengths.length/2];
//		for (int i = 0; i < lengths.length; i++) {
//			if (i < half1.length) {
//				half1[i] = lengths[i];
//				lengthHalf1 += lengths[i];
//			} else {
//				half2[i - half1.length] = lengths[i];
//				lengthHalf2 += lengths[i];
//			}
//		}
//		float[] coordsBig = Engine.getLimbCoords(centerX, centerY, lengthHalf1, lengthHalf2, coord[0], coord[1], bendRight);
//		half1 = Engine.getArmCoords(centerX, centerY, half1, coordsBig[0], coordsBig[1], bendRight);
//		half2 = Engine.getArmCoords(coordsBig[0], coordsBig[1], half2, endX, endY, bendRight);
//		coord = new float[half1.length + half2.length];
//		for (int i = 0; i < coord.length; i++) {
//			if (i < half1.length) {coord[i] = half1[i];}
//			else {coord[i] = half2[i - half1.length];}
//		}
//		return coord;
		return new float[] {};
	}
	
	public static void copy(PApplet app, PImage image1, PImage image2) {
		image1.loadPixels(); image2.loadPixels();
		for (int i = 0; i < image1.pixels.length; i++) {
			if (app.alpha(image2.pixels[i]) != 0) {
				image1.pixels[i] = image2.pixels[i];
			}
		} image1.updatePixels();
	}
	
	public static float[] lineLineCollide(float x1, float y1, float x2, float y2, float x3, float y3, float x4, float y4) {  // Collision for two lines, very important function
		float d1 = PApplet.dist(x1, y1, x2, y2), d2 = PApplet.dist(x3, y3, x4, y4);  // Get lengths of line segments
		if (d1 == 0 || d2 == 0 || (x1 - x2 == 0 && x3 - x4 == 0) || (y1 - y2 == 0 && y3 - y4 == 0)) {return new float[] {};}
		float m1, m2, b1, b2, iX, iY;
		m1 = (y2 - y1) / (x2 - x1); m2 = (y4 - y3) / (x4 - x3);  // Find Slopes
		b1 = y1 - m1 * x1; b2 = y3 - m2 * x3; // Find y intercepts
		if (x4 - x3 == 0) {iX = x3;}  // Find X coordinate while also dealing with vertical and horizontal slopes
	    else if (x2 - x1 == 0) {iX = x1;}
	    else {iX = (b1 - b2) / (m2 - m1);}
		iY = (x4 - x3) == 0? m1 * iX + b1: m2 * iX + b2;  // Get Y coordinate while also dealing with horizontal slope
		// Check if X and Y coordinates is within line segments
		if (PApplet.dist(iX, iY, x2, y2) > d1 || PApplet.dist(iX,  iY,  x1,  y1) > d1 || PApplet.dist(iX, iY, x3, y3) > d2 || PApplet.dist(iX, iY, x4, y4) > d2) {return new float[] {};}
		return new float[] {iX, iY};
	}
	
	public static float[] closestPointLine(float px, float py, float x1, float y1, float x2, float y2, boolean rounded) {
		float m1, m2, b1, b2, iX, iY;
		float maxX = PApplet.max(x1, x2), maxY = PApplet.max(y1, y2);
		float minX = PApplet.min(x1, x2), minY = PApplet.min(y1, y2);
	    m1 = (y2 - y1) / (x2 - x1);  // Find slopes
	    m2 = -1/m1;
	    b1 = y1 - m1 * x1;  // Find y intercepts
	    b2 = py - m2 * px;
	    if (y2 - y1 == 0) {iX = px;}  // Find X and Y coords while also dealing with evil slopes
	    else {iX = x1 - x2 == 0? x1 : (b1 - b2) / (m2 - m1);}
	    iY = x2 - x1 == 0? py : m1 * iX + b1;
	    if (iX > maxX) {iX = rounded? maxX : minX;}  // Check if point is within line
	    else if (iX < minX) {iX = rounded? minX : maxX;}
	    if (iY > maxY) {iY = rounded? maxY : minY;}
	    else if (iY < minY) {iY = rounded? minY : maxY;}
	    return new float[] {iX, iY};  // Return coords
	}
	
	public static PImage lineImage(PApplet app, float x1, float y1, float x2, float y2, int res, float thickness, float sizeDisplay, int[] color) {  //creates an image of a pixelated line
		PImage image = app.createImage(res, res, PApplet.ARGB);
		if (x1 - x2 == 0 && y1 - y2 == 0) {return image;}
		float scaleWidth = sizeDisplay / res, halfScaleWidth = scaleWidth / 2, thickWidth = halfScaleWidth + thickness, c1, c2, minX, minY;
		float[] cline;
		int row = 0;
		image.loadPixels();
		for (int i = 0; i < image.pixels.length; i++) {  // Iterate through pixel list
			if (i % res == 0 && i != 0) {row += 1;}  // If we reach the next row of pixels, add to the Y
		    c1 = i % res * scaleWidth + halfScaleWidth;  // calculate center X and Y coordinate of each Pixel
		    c2 = row * scaleWidth + halfScaleWidth;
		    minX = PApplet.min(x1, x2) - thickWidth; minY = PApplet.min(y1, y2) - thickWidth;  // Check if within bounding box
		    if (Engine.pointRectCollide(c1, c2, minX, minY, PApplet.max(x1, x2) + thickWidth - minX, PApplet.max(y1, y2) + thickWidth - minY)) {
		    	cline = Engine.closestPointLine(c1, c2, x1, y1, x2, y2);  // Check for closest point on line
		        if (PApplet.dist(cline[0], cline[1], c1, c2) <= thickness) {  // Check if pixel is within the thickness of the line
		        	image.pixels[i] = app.color(color[0], color[1], color[2], color[3]);  // Change colors
		        }
		    }
		} image.updatePixels();  // Update image
		return image;
	}
	
	public static void lineDraw(PApplet app, float x1, float y1, float x2, float y2) {
		app.image(Engine.lineImage(app, x1, y1, x2, y2), 0, 0, app.width, app.height);
	}
	
	public static PImage circleImage(PApplet app, float x, float y, int res, float thickness, float sizeDisplay, int[] color1, boolean gradient, int[] color2) {
		float scaleWidth = sizeDisplay / res, halfScaleWidth = scaleWidth / 2, c1, c2; int row = 0;
		PImage image = app.createImage(res, res, PApplet.ARGB);
		image.loadPixels();
		for (int i = 0; i < image.pixels.length; i++) {  // Iterate through pixel list
			if (i % res == 0 && i != 0) {row += 1;}  // If we reach the next row of pixels, add to the Y
		    c1 = i % res * scaleWidth + halfScaleWidth;  // calculate center X and Y coordinate of each Pixel
		    c2 = row * scaleWidth + halfScaleWidth;
		    float dist = PApplet.dist(x, y, c1, c2);  // Check if within bounding box
		    if (dist <= thickness) {
		    	float ratio = dist/thickness;  // Calculate ratio of radius to color
		    	image.pixels[i] = app.color(  // Change colors
		    		gradient? color1[0] : PApplet.lerp(color1[0], color2[0], ratio), 
		    		gradient? color1[1] : PApplet.lerp(color1[1], color2[1], ratio), 
		    		gradient? color1[2] : PApplet.lerp(color1[2], color2[2], ratio), 
		    		gradient? color1[3] : PApplet.lerp(color1[3], color2[3], ratio)
		    	);
		    }
		} image.updatePixels();  // Update image
		return image;
	}
	
	public static PImage squareImage(PApplet app, float x, float y, int res, float thickness, float sizeDisplay, int[] color1, boolean gradient, int[] color2) {
		float scaleWidth = sizeDisplay / res, halfScaleWidth = scaleWidth / 2, c1, c2; int row = 0;
		PImage image = app.createImage(res, res, PApplet.ARGB);
		image.loadPixels();
		for (int i = 0; i < image.pixels.length; i++) {  // Iterate through pixel list
			if (i % res == 0 && i != 0) {row += 1;}  // If we reach the next row of pixels, add to the Y
		    c1 = i % res * scaleWidth + halfScaleWidth;  // calculate center X and Y coordinate of each Pixel
		    c2 = row * scaleWidth + halfScaleWidth;
		    float dist = PApplet.dist(x, y, c1, c2);  // Check if within bounding box
		    float ratio = dist/thickness;  // Calculate ratio of radius to color
		    image.pixels[i] = app.color(  // Change colors
		    	gradient? color1[0] : PApplet.lerp(color1[0], color2[0], ratio), 
		    	gradient? color1[1] : PApplet.lerp(color1[1], color2[1], ratio), 
		    	gradient? color1[2] : PApplet.lerp(color1[2], color2[2], ratio), 
		    	gradient? color1[3] : PApplet.lerp(color1[3], color2[3], ratio)
		    );
		} image.updatePixels();  // Update image
		return image;
	}
	
	public static PImage outline(PApplet app, PImage image, int[] color1, int[] color2) {
		image.loadPixels();  // Load pixels
		for (int i = 1; i < image.pixels.length - 1; i++) {
			if (app.alpha(image.pixels[i]) != 0 && !Engine.compareProcessingColorList(app, image.pixels[i], color2)) {  // Dont check if transparent pixel
				// Check if there is a blank pixel to the left, right, above or below the normal pixel
				if (Engine.compareProcessingColorList(app,  image.pixels[i - 1],  color1) && i % image.width != 0) {image.pixels[i - 1] = app.color(color2[0], color2[1], color2[2], color2[3]);}
				else if (Engine.compareProcessingColorList(app,  image.pixels[i + 1],  color1) && (i + 1) % image.width != 0) {image.pixels[i + 1] = app.color(color2[0], color2[1], color2[2], color2[3]);}
				if (i - image.width >= 0 && Engine.compareProcessingColorList(app, image.pixels[i - image.width], color1)) {image.pixels[i - image.width] = app.color(color2[0], color2[1], color2[2], color2[3]);}
				else if (i + image.width < image.pixels.length && Engine.compareProcessingColorList(app, image.pixels[i + image.width], color1)) {image.pixels[i + image.width] = app.color(color2[0], color2[1], color2[2], color2[3]);}
			}
		} image.updatePixels();  // Update image
		return image;
	}
	
	public static PImage outlineThin(PApplet app, PImage image, int[] color1, int[] color2) {
		image.loadPixels();  // Load pixels
		for (int i = 1; i < image.pixels.length - 1; i++) {
			if (app.alpha(image.pixels[i]) != 0 && !Engine.compareProcessingColorList(app, image.pixels[i], color2)) {  // Dont check if transparent pixel
				// Check if there is a blank pixel to the left, right, above or below the normal pixel
				if (Engine.compareProcessingColorList(app,  image.pixels[i - 1],  color1) && i % image.width != 0) {image.pixels[i - 1] = app.color(color2[0], color2[1], color2[2], color2[3]);}
				if (Engine.compareProcessingColorList(app,  image.pixels[i + 1],  color1) && (i + 1) % image.width != 0) {image.pixels[i + 1] = app.color(color2[0], color2[1], color2[2], color2[3]);}
				if (i - image.width >= 0 && Engine.compareProcessingColorList(app, image.pixels[i - image.width], color1)) {image.pixels[i - image.width] = app.color(color2[0], color2[1], color2[2], color2[3]);}
				if (i + image.width < image.pixels.length && Engine.compareProcessingColorList(app, image.pixels[i + image.width], color1)) {image.pixels[i + image.width] = app.color(color2[0], color2[1], color2[2], color2[3]);}
			}
		} image.updatePixels();  // Update image
		return image;
	}
	
	public static void sharpen(PApplet app, PImage image, int[] backgroundColor, int[] replacementColor) {  // "Change in order to allow less colors, and more replacement colors" - Old Nico
		image.loadPixels();  // Load pixels
		for (int i = 0; i < image.pixels.length; i++) {if (app.red(image.pixels[i]) != backgroundColor[0] || app.green(image.pixels[i]) != backgroundColor[1] || app.blue(image.pixels[i]) != backgroundColor[2]) {image.pixels[i] = app.color(backgroundColor[0], backgroundColor[1], backgroundColor[2]);}} 
		image.updatePixels();  // Update image
	}
	
	public static float[] rectRectCollideCoords(float px, float py, float x1, float y1, float w1, float h1, float x2, float y2, float w2, float h2) {
	    float[][] coordCollide = Engine.lineRectCollide(px+w1/2, py+h1/2, x1+w1/2, y1+h1/2, x2-w1/2, y2-h1/2, w2+w1, h2+h1);  // Find coordinates where moving rectangle touches the base rectangle
	    for (int i = 0; i < coordCollide.length; i++) {  // Iterate to find the closest coordinate
	    	if (coordCollide[i].length > 0) {return new float[] {coordCollide[i][0]-w1/2, coordCollide[i][1]-h1/2, i};}
	    } return new float[] {};
	}
	
	public static float[] nRectRectCollideCoords(float px, float py, float x1, float y1, float w1, float h1, float x2, float y2, float w2, float h2) {
		float[][] coordCollide = Engine.lineRectCollide(px+w1/2, py+h1/2, x1+w1/2, y1+h1/2, x2+w1/2, y2+h1/2, w2-w1, h2-h1);  // Find coordinates where moving rectangle touches the base rectangle
	    for (int i = 0; i < coordCollide.length; i++) {  // Iterate to find the closest coordinate
	    	if (coordCollide[i].length > 0) {return new float[] {coordCollide[i][0]-w1/2, coordCollide[i][1]-h1/2, i};}
	    } return new float[] {};
	}
	
	public static boolean nRectRectCollide(float r1x, float r1y, float r1w, float r1h, float r2x, float r2y, float r2w, float r2h) {  // opposite of rectRectCollide
	    if (r1w * r1h > r2w * r2h) {return r1x >= r2x || r1x+r1w  <= r2x+r2w || r1y >= r2y || r1y+r1h <= r2y+r2h;}  // Smaller rectangle goes FIRST
	    return r1x <= r2x || r1x+r1w >= r2x+r2w || r1y <= r2y || r1y+r1h >= r2y+r2h;
	}
	
	public static boolean pLineCollide(float x1, float y1, float x2, float y2, float x3, float y3, float x4, float y4) {  // Parallel Lines
	    if (x1 - x2 == 0 && x3 - x4 == 0 && PApplet.dist(x1, 0, x3, 0) == 0) {return true;}  // Deal with double vertical or double horizontal lines
	    else if (y1 - y2 == 0 && y3 - y4 == 0 && PApplet.dist(0, y1, 0, y3) == 0) {return true;}
	    return false;
	}
	
	public static boolean compareListList(float[] list1, float[] list2) {
		// Checks if two lists are identical
	    if (list1.length != list2.length) return false;
	    for (int i = 0; i < list1.length; i ++) {
	      if (list1[i] != (list2[i])) return false;
	    } return true;
	}
	
	// Basic collision utilizing other collision methods
	public static float[][] lineRectCollide(float x1, float y1, float x2, float y2, float rx, float ry, float rw, float rh) {return new float[][] {Engine.lineLineCollide(x1, y1, x2, y2, rx, ry, rx+rw, ry), Engine.lineLineCollide(x1, y1, x2, y2, rx+rw, ry, rx+rw, ry+rh), Engine.lineLineCollide(x1, y1, x2, y2, rx+rw, ry+rh, rx, ry+rh), Engine.lineLineCollide(x1, y1, x2, y2, rx, ry+rh, rx, ry)};}  // Rectangle is just four lines, so we return a list of line vs line collisions
	public static boolean[] lRectRectCollide(float rx1, float ry1, float rw1, float rh1, float rx2, float ry2, float rw2, float rh2) {return new boolean[] {Engine.pLineCollide(rx1+rw1, ry1, rx1+rw1, ry1+rh1, rx2+rw2, ry2, rx2+rw2, ry2+rh2), Engine.pLineCollide(rx1+rw1, ry1+rh1, rx1, ry1+rh1, rx2+rw2, ry2+rh2, rx2, ry2+rh2), Engine.pLineCollide(rx1, ry1+rh1, rx1, ry1, rx2, ry2+rh2, rx2, ry2), Engine.pLineCollide(rx1, ry1, rx1+rw1, ry1, rx2, ry2, rx2+rw2, ry2)};}  // Used to find which sides two rectangles are touching.. A rectangle is just four lines, so we return a list of line vs line collisions
	public static boolean rectRectCollide(float r1x, float r1y, float r1w, float r1h, float r2x, float r2y, float r2w, float r2h) {return r1x + r1w >= r2x && r1x <= r2x+r2w && r1y + r1h >= r2y && r1y <= r2y+r2h;}
	public static boolean rectRectCollideNotExact(float r1x, float r1y, float r1w, float r1h, float r2x, float r2y, float r2w, float r2h) {return r1x + r1w > r2x && r1x < r2x+r2w && r1y + r1h > r2y && r1y < r2y+r2h;}
	public static boolean circRectCollide(float cx, float cy, float cr, float rx, float ry, float rw, float rh) {return cx + cr/2 >= rx && rx + rw >= cx - cr/2 && cy + cr/2 >= ry && ry + rh >= cy - cr/2;}
	public static boolean pointRectCollide(float px, float py, float rx, float ry, float rw, float rh) {return px >= rx && px <= rx + rw && py >= ry && py <= ry + rh;}
	public static boolean pointRectCollideNotExact(float px, float py, float rx, float ry, float rw, float rh) {return px > rx && px < rx + rw && py > ry && py < ry + rh;}
	public static boolean pointCircCollide(float px, float py, float cx, float cy, float cr) {return (PApplet.dist(px, py, cx, cy) <= cr);}
	
	// Basic color and list methods
	public static boolean compareProcessingColorList(PApplet app, int color1, int[] color2) {return app.red(color1) == color2[0] && app.green(color1) == color2[1] && app.blue(color1) == color2[2] && app.alpha(color1) == color2[3];}
	public static boolean compareColorList(int r, int g, int b, int a, int[] col) {return r == col[0] && g == col[1] && b == col[2] && a == col[3];}  // Checks if two colors are not different
	public static boolean compareColorColor(int[] col1, int[] col2) {return col1[0] == col2[0] && col1[1] == col2[1] && col1[2] == col2[2] && col1[3] == col2[3];}  // Checks if two colors are the same
	
	// Alternate versions of functions
	public static void pixelate(PApplet app, int res) {Engine.pixelate(app, res, 0, 0, app.width, app.height);}
	public static void pixelate(PApplet app, PImage image, int res) {Engine.pixelate(app, image, res, 0, 0, app.width, app.height);}
	public static float[] lineRadius(float centerX, float centerY, float endX, float endY, float radius) {return Engine.lineRadius(centerX, centerY, endX, endY, radius, true);}
	public static float[] getLimbCoords(float centerX, float centerY, float length1, float length2, float endX, float endY) {return Engine.getLimbCoords(centerX, centerY, length1, length2, endX, endY, false);}
	public static float[] closestPointLine(float px, float py, float x1, float y1, float x2, float y2) {return Engine.closestPointLine(px, py, x1, y1, x2, y2, true);}
	public static PImage lineImage(PApplet app, float x1, float y1, float x2, float y2, int res, float thickness, float sizeDisplay) {return Engine.lineImage(app, x1, y1, x2, y2, res, thickness, sizeDisplay, new int[] {0, 0, 0, 255});}
	public static PImage lineImage(PApplet app, float x1, float y1, float x2, float y2) {return Engine.lineImage(app, x1, y1, x2, y2, app.width/4, 4, app.width, new int[] {0, 0, 0, 255});}
	public static PImage circleImage(PApplet app, float x, float y, int res, float thickness, float sizeDisplay, int[] color1, boolean gradient) {return Engine.circleImage(app, x, y, res, thickness, sizeDisplay, new int[] {255, 111, 111, 255}, gradient, color1);}
	public static PImage circleImage(PApplet app, float x, float y, int res, float thickness, float sizeDisplay, int[] color1) {return Engine.circleImage(app, x, y, res, thickness, sizeDisplay, new int[] {255, 111, 111, 255}, false, color1);}
	public static PImage circleImage(PApplet app, float x, float y, int res, float thickness, float sizeDisplay) {return Engine.circleImage(app, x, y, res, thickness, sizeDisplay, new int[] {255, 111, 111, 255}, false, new int[] {111, 111, 255, 255});}
	public static PImage squareImage(PApplet app, float x, float y, int res, float thickness, float sizeDisplay, int[] color1, boolean gradient) {return Engine.squareImage(app, x, y, res, thickness, sizeDisplay, new int[] {255, 111, 111, 255}, gradient, color1);}
	public static PImage squareImage(PApplet app, float x, float y, int res, float thickness, float sizeDisplay, int[] color1) {return Engine.squareImage(app, x, y, res, thickness, sizeDisplay, new int[] {255, 111, 111, 255}, false, color1);}
	public static PImage squareImage(PApplet app, float x, float y, int res, float thickness, float sizeDisplay) {return Engine.squareImage(app, x, y, res, thickness, sizeDisplay, new int[] {255, 111, 111, 255}, false, new int[] {111, 111, 255, 255});}
	public static PImage outline(PApplet app, PImage image, int[] color1) {return Engine.outline(app, image, color1, new int[] {255, 255, 255, 255});}
	public static PImage outline(PApplet app, PImage image) {return Engine.outline(app, image, new int[] {0, 0, 0, 0}, new int[] {255, 255, 255, 255});}
	public static PImage outlineThin(PApplet app, PImage image, int[] color1) {return Engine.outline(app, image, color1, new int[] {255, 255, 255, 255});}
	public static PImage outlineThin(PApplet app, PImage image) {return Engine.outline(app, image, new int[] {0, 0, 0, 0}, new int[] {255, 255, 255, 255});}
	
	// Random util functions
	public static <T> ArrayList<T> removeAll(T val, ArrayList<T> arr) {for (int i = 0; i < arr.size(); i++) {if (arr.get(i).equals(val)) {arr.remove(i); i--;}} return arr;}
	
	public static boolean keyIsDown(int key) {return keys[key];}
	public static void setKey(int key, boolean state) {if (key < 256) {keys[key] = state;}}
	
}







//private static ArrayList<Point> findCritPoints(float tx, float ty, float cx, float cy, float cw, float ch, Obstacle[] objects, float bx, float by, float bw, float bh) {
//	ArrayList<Point> criticalPoints = new ArrayList<Point>();
//	if (!Engine.pointRectCollide(tx, ty, bx+cw/2, by+ch/2, bw-cw, bh-ch)) {return criticalPoints;} // Return if target is in invalid spot
//	float[] farList, nearList = new float[] {Float.NEGATIVE_INFINITY};
//	for (int i = 0; i < objects.length; i++) {  // Iterate through each object
//		farList = new float[] {Float.POSITIVE_INFINITY};  // Reset distance farList is checking
//		float[][] collide = Engine.lineRectCollide(tx, ty, cx+cw/2, cy+ch/2, objects[i].getX()-cw/2, objects[i].getY()-ch/2, objects[i].getW()+cw, objects[i].getH()+ch);  // Cast line
//		for (int j = 0; j < collide.length; j++) {  // Iterate through each side of the object
//			if (collide[j].length != 0) {
//				float dist = PApplet.dist(tx, ty, collide[j][0], collide[j][1]);
//				if (farList[0] > dist) {farList = new float[] {dist, collide[j][0], collide[j][1], j};}  // Get the farthest points and push it to the farList
//				if (nearList[0] < dist) {nearList = new float[] {dist, collide[j][0], collide[j][1], i, j};}  // Get the nearest points and push it to the nearList
//			}
//		} 
//		Obstacle ObjHitbox = new Obstacle(objects[i].getX()-cw/2, objects[i].getY()-ch/2, objects[i].getW()+cw, objects[i].getH()+ch);
//		if (farList.length != 1) {  // Check if the list has any points
//			criticalPoints.add(ObjHitbox.getTRCorner());
//			criticalPoints.add(ObjHitbox.getTLCorner());
//			criticalPoints.add(ObjHitbox.getBRCorner());
//			criticalPoints.add(ObjHitbox.getBLCorner());
//			switch((int) farList[3]) {  // Get the critical points and push it to the list
//				case 0:  // Top of object
//					criticalPoints.add(ObjHitbox.getTRCorner());
//					criticalPoints.add(ObjHitbox.getTLCorner());
//					break;
//				case 1:  // Right side of object
//					criticalPoints.add(ObjHitbox.getTRCorner());
//					criticalPoints.add(ObjHitbox.getBRCorner());
//					break;
//				case 2:  // Bottom of object
//					criticalPoints.add(ObjHitbox.getBRCorner());
//					criticalPoints.add(ObjHitbox.getBLCorner());
//					break;
//				case 3:  // Left side of object
//					criticalPoints.add(ObjHitbox.getTLCorner());
//					criticalPoints.add(ObjHitbox.getBLCorner());
//					break;
//			}
//		}
//	} 
//	if (nearList.length == 1) {return new ArrayList<Point>();}
//	boolean ignorePoint;
//	for (int j = 0; j < criticalPoints.size(); j++) {  // Iterate through all crit points
//		ignorePoint = false;  // variable to keep track of if we should skip current point
//		for (int k = 0; k < objects.length; k++) {  // Iterate through the object list
//			if (Engine.pointRectCollideNotExact(criticalPoints.get(j).getX(), criticalPoints.get(j).getY(), objects[k].getX()-cw/2, objects[k].getY()-ch/2, objects[k].getW()+cw, objects[k].getH()+ch)) {  
//				ignorePoint = true;  // If yes then we set the ignore variable to true...
//				k = objects.length;  // ..and end the loop
//			}  // Check if the coords are inside 2 objects
//		} if (ignorePoint || !Engine.pointRectCollide(criticalPoints.get(j).getX(), criticalPoints.get(j).getY(),  bx+cw/2, by+ch/2, bw-cw, bh-ch)) {criticalPoints.remove(j); j--;}
//	} 
//	criticalPoints.add(0, new Point(nearList[3], nearList[4]));  // Add the indexes to the front
//	criticalPoints.add(0, new Point(nearList[1], nearList[2]));  // Add the closest point to the front
//	return criticalPoints;  // Return critical points with the closest point in the front
//}
