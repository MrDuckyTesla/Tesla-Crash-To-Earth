let list = [[75, 100, 250, 50], [0, 190, 60, 50], [300, 300, 60, 80], [130, 250, 90, 40]], path;

function setup() {
  createCanvas(400, 400);
  // noStroke();
}

function draw() {
  fill("grey")
  background(220);
  // rect(25, 25, width-50, height-50)
  for (let i = 0; i < list.length; i++) {
    // fill(255, 0, 255)a;
    // rect(list[i][0]-25, list[i][1]-25, list[i][2]+50, list[i][3]+50);
    fill(255, 0, 0);
    rect(list[i][0], list[i][1], list[i][2], list[i][3]);
  }
  
  fill(0, 255, 0);
  rect(min(mouseX, width-50), min(mouseY, height-50), 50, 50); // Player
  path = pathFind(25, 350, min(mouseX, width-50), min(mouseY, height-50), 50, list);
  
  console.log(path);
  
  let lastCrit = 0;
  for (let i = 0; i < path.length; i++) {
    if (path[i][1] == 0) {
      lastCrit = i;
    }
    // lastCrit = path[i][1] == 0? i : lastCrit;
    circle(path[lastCrit][3], path[lastCrit][4], 10);
  }
  
  fill(50, 50, 50);
  text(round(frameRate()), 5, 20);
}

// Critical points strat
// STEP 1:  cast both lines in set 1 to the goal
// STEP 2:  if the line collides with an object, get the closest and furthest point that it collides
//         else repeat step 1 with set 2. if there are still no collisions, end function, path found
// STEP 3:  log the side that the closest point collided with and the side furthest away separately
//         also log the "critical point" of the furthest point, which are the points perpindicular to
//         the collision point (corners of the obstacle). discard critical points if points are inside
//         2 other objects or are out of bounds.
// STEP 4:  recursivly cast lines perpindicular to the closest point going to corners, of it collides and
//         is valid (not out of bounds or inside 2 objects), then we cast more lines perpindicular to the
//         collision point. we are following the sides of each object. also skip if we have already been on
//         this side, proabably via a list
// STEP 5:  repeat step 4 until we reach a critical point, then repeat step 1?

// maybe make a funtion to check if a point is valid, the 2 objects and out of bound check


function pathFind(tx, ty, cx, cy, cl, listO, bx=0, by=0, bw=width, bh=height, index=0) {
  // Get critical points
  let points, path = [], cp = findCritPoints(tx, ty, cx, cy, cl, listO, bx, by, bw, bh);
  drawFunnyLines(tx, ty, cx, cy, cl); // Display lines
  if (cp.length == 0) return [];
  // for (let i = 0; i < cp[0].length; i++) circle(cp[0][i][0], cp[0][i][1], 20); // Display critical points
  if (cp[1][0] != -Infinity) { // We know if a path was found based on if any of these are -Infinity
    // circle(cp[1][1], cp[1][2], 10); // Display position
    cp = exploreObj(tx, ty, cp[0], cp[1], cl, listO, bx, by, bw, bh, index); // Explore objects
    points = cp[0]; path = cp[1]; // Get all points from object
    // for (let j = 0; j < points.length; j++) circle(points[j][1], points[j][2], 20)
    // Recursively explore objects
    for (let j = 0; j < points.length; j++) path.push(pathFind(tx, ty, points[j][1]-cl/2, points[j][2]-cl/2, cl, listO, bx, by, bw, bh, index+1));
  }
  return path.flat(); // Keep the array consistant
}

function includes(item, list) {
  for (let i of list) if (i.toString() === item.toString()) return true;
  return false;
}

function findOffset(i, curSid) { // Find the offset
  if ((i == 0 && curSid == 0) || (i == 1 && curSid == 3)) return [-0.00001, -0.00001]; // Top left corner
  else if ((i == 1 && curSid == 0) || (i == 0 && curSid == 1)) return [0.00001, -0.00001]; // Top right corner
  else if ((i == 0 && curSid == 3) || (i == 1 && curSid == 2)) return [-0.00001, 0.00001]; // Bottom Left corner
  else return [0.00001, 0.00001]; // Bottom right corner
}


function exploreObj(tx, ty, criPoi, curPos, cl, listO, bx=0, by=0, bw=width, bh=height, rIndex=0) {
  let collide, temp = curPos, points = [], path = [[], []], offset = [0, 0], wIndex = 1;
  for (let i = 0; i < 2; i++) { // Iterate through both directions
    curPos = temp.slice(); collide = [-1]; wIndex = 1 // Reset the current position, collision, and index variable
    // stroke(random(255), random(255), random(255));
    path[i].push([rIndex, 0, i, curPos[1], curPos[2]]);
    while (!includes([collide[0], collide[1]], criPoi) && collide.length != 0) {
      if (curPos[4] % 2 == 0) { // Top of object (0), Bottom of object (2)
        if ((i == 0 && curPos[4] == 0) || (i == 1 && curPos[4] == 2)) { // First iteration go left
          // line(listO[curPos[3]][0]-cl/2, curPos[2], curPos[1], curPos[2]); // Left
          collide = nearListRectLineList(listO[curPos[3]][0]-cl/2, curPos[2], curPos[1]-0.00001, curPos[2], cl, listO); // offset left
        } else if ((i == 0 && curPos[4] == 2) || (i == 1 && curPos[4] == 0)) { // Second iteration go right
          // line(listO[curPos[3]][0]+listO[curPos[3]][2]+cl/2, curPos[2], curPos[1], curPos[2]); // Right
          collide = nearListRectLineList(listO[curPos[3]][0]+listO[curPos[3]][2]+cl/2, curPos[2], curPos[1]+0.00001, curPos[2], cl, listO); // offset right
        }
      } else { // Right side of object (1), Left side of object (3)
        if ((i == 0 && curPos[4] == 1) || (i == 1 && curPos[4] == 3)) { // First iteration go up
          // line(curPos[1], listO[curPos[3]][1]-cl/2, curPos[1], curPos[2]); // Up
          collide = nearListRectLineList(curPos[1], listO[curPos[3]][1]-cl/2, curPos[1], curPos[2]-0.00001, cl, listO); // offset up
        } else if ((i == 0 && curPos[4] == 3) || (i == 1 && curPos[4] == 1)) { // Second iteration go down
          // line(curPos[1], listO[curPos[3]][1]+listO[curPos[3]][3]+cl/2, curPos[1], curPos[2]); // Down
          collide = nearListRectLineList(curPos[1], listO[curPos[3]][1]+listO[curPos[3]][3]+cl/2, curPos[1], curPos[2]+0.00001, cl, listO); // offset down
        }
      } if (collide.length != 0) {
        offset[i] = findOffset(i, curPos[4]);
        // circle(collide[0], collide[1], 10);
        path[i].push([rIndex, wIndex, i, collide[0], collide[1]]);
        curPos[1] = collide[0];
        curPos[2] = collide[1];
        curPos[3] = collide[2];
        curPos[4] = collide[3];
        if (includes([collide[0], collide[1]], criPoi)) {
          // circle(collide[0], collide[1], 15);
          curPos[1]+=offset[i][0];
          curPos[2]+=offset[i][1];
          points.push(curPos);
        }
      } wIndex++; // Increase While loop Index
    }
  }
  return [points, path];
}

function findCritPoints(tx, ty, cx, cy, cl, listO, bx=0, by=0, bw=width, bh=height) {
  let criticalPoints = [], farList = [], nearList = [-Infinity], collide;  // Create variables
  if (!pointRectCollide(tx, ty, bx+cl/2, by+cl/2, bw-cl, bh-cl)) return []; // Return if target is in invalid spot
  for (let i = 0; i < listO.length; i++) { // Iterate through each object
    // Return if target is inside object (theoretically we can keep this commented out because it should never be there to begin with)
    // if (pointRectCollide(tx, ty, listO[i][0], listO[i][1], listO[i][2], listO[i][3])) return [];
    // Cast line
    collide = lineRectCollide(tx, ty, cx+cl/2, cy+cl/2, listO[i][0]-cl/2, listO[i][1]-cl/2, listO[i][2]+cl, listO[i][3]+cl);
    // collide = [[lineRectCollide(tx, ty, cx+cl/2, ty, listO[i][0]-cl/2, listO[i][1]-cl/2, listO[i][2]+cl, listO[i][3]+cl), lineRectCollide(cx+cl/2, cy+cl/2, cx+cl/2, ty, listO[i][0]-cl/2, listO[i][1]-cl/2, listO[i][2]+cl, listO[i][3]+cl)], [lineRectCollide(tx, cy+cl/2, tx, ty, listO[i][0]-cl/2, listO[i][1]-cl/2, listO[i][2]+cl, listO[i][3]+cl), lineRectCollide(tx, cy+cl/2, cx+cl/2, cy+cl/2, listO[i][0]-cl/2, listO[i][1]-cl/2, listO[i][2]+cl, listO[i][3]+cl)]];
    farList = [Infinity];  // Reset distance farList is checking
    for (let j = 0; j < collide.length; j++) { // Iterate through each side of the object
      if (collide[j][0]) {  // If theres a collision
        // Get the furthest points and push it to the temp list
        if (farList[0] > dist(tx, ty, collide[j][1], collide[j][2])) farList = [dist(tx, ty, collide[j][1], collide[j][2]), collide[j][1], collide[j][2], j];
        // Get the nearest points and push it to collision list
        if (nearList[0] < dist(tx, ty, collide[j][1], collide[j][2])) nearList = [dist(tx, ty, collide[j][1], collide[j][2]), collide[j][1], collide[j][2], i, j];
      }
    } switch(farList[3]) {  // Get the critical points and push it to the list
      case 0: // Top of object
        criticalPoints.push([listO[i][0]-cl/2, listO[i][1]-cl/2], [listO[i][0]+cl/2+listO[i][2], listO[i][1]-cl/2]);
        break;
      case 1: // Right side of object
        criticalPoints.push([listO[i][0]+cl/2+listO[i][2], listO[i][1]-cl/2], [listO[i][0]+cl/2+listO[i][2], listO[i][1]+cl/2+listO[i][3]]);
        break;
      case 2: // Bottom of object
        criticalPoints.push([listO[i][0]+cl/2+listO[i][2], listO[i][1]+cl/2+listO[i][3]], [listO[i][0]-cl/2, listO[i][1]+cl/2+listO[i][3]]);
        break;
      case 3: // Left side of object
        criticalPoints.push([listO[i][0]-cl/2, listO[i][1]+cl/2+listO[i][3]], [listO[i][0]-cl/2, listO[i][1]-cl/2]);
        break;
    } farList = criticalPoints; criticalPoints = []; // Reset Lists
    for (let j = 0; j < farList.length; j++) {  // Iterate through all crit points
      tempDist = false;  // Reuse a variable for checking if we should skip current point
      for (let k = 0; k < listO.length; k++) { // Iterate through the object list
        // Check if the coords are inside 2 objects
        if (pointRectCollideNotExact(farList[j][0], farList[j][1], listO[k][0]-cl/2, listO[k][1]-cl/2, listO[k][2]+cl, listO[k][3]+cl)) {
          tempDist = true; k = listO.length; // If yes then we set the ignore variable to true and end the loop
        }
      } if (!tempDist && pointRectCollide(farList[j][0], farList[j][1], bx+cl/2, by+cl/2, bw-cl, bh-cl)) criticalPoints.push([farList[j][0], farList[j][1]]);
    }
  } return [criticalPoints, nearList];  // Return critical points and list with the two nearest lines
}

function nearListRectLineList(tx, ty, cx, cy, cl, listO, bx=0, by=0, bw=width, bh=height) {
  let temp, dst, listDist = [];
  line(tx, ty, cx, cy);
  if (!pointRectCollide(tx, ty, bx+cl/2, by+cl/2, bw-cl, bh-cl)) return []; // Return if target is in invalid spot
  for (let i = 0; i < listO.length; i++) {
    temp = lineRectCollide(tx, ty, cx, cy, listO[i][0]-cl/2, listO[i][1]-cl/2, listO[i][2]+cl, listO[i][3]+cl);
    for (let j = 0; j < temp.length; j++) if (temp[j][0]) listDist.push([temp[j], i, j]);
  } for (let i = 0; i < listDist.length; i++) {
    for (let j = 0; j < listO.length; j++) {
      if (pointRectCollideNotExact(listDist[i][0][1], listDist[i][0][2], listO[j][0]-cl/2, listO[j][1]-cl/2, listO[j][2]+cl, listO[j][3]+cl)) {
        listDist.splice(i, 1);
        j = listO.length;
      }
    }
  } if (listDist.length == 0) return []; // No collision
  if (listDist.length == 1) return [listDist[0][0][1], listDist[0][0][2], listDist[0][1], listDist[0][2]];  // One collision
  temp = [dist(listDist[0][0][1], listDist[0][0][2], cx, cy), listDist[0]];
  for (let i = 1; i < listDist.length; i++) {
    dst = dist(listDist[i][0][1], listDist[i][0][2], cx, cy);
    if (dst < temp[0]) temp = [dst, listDist[i]];
  } return [temp[1][0][1], temp[1][0][2], temp[1][1], temp[1][2], temp[0]]; // Return final coords with  distance
}

function pointRectCollideNotExact(px, py, rx, ry, rw, rh) {
    return px > rx && px < rx + rw && py > ry && py < ry + rh;
}

function drawFunnyLines(tx, ty, cx, cy, cl) {
  // stroke("blue");
  // line(tx, cy+cl/2, cx+cl/2, cy+cl/2);  // curr X
  // line(tx, cy+cl/2, tx, ty);  // Trgt Y
  // stroke("yellow");
  // line(tx, ty, cx+cl/2, ty);  // Trgt X
  // line(cx+cl/2, cy+cl/2, cx+cl/2, ty);  // curr Y
  // stroke("purple");  // TEST DIRECT
  // stroke(random(255), random(255), random(255));
  line(cx+cl/2, cy+cl/2, tx, ty);
  stroke("black");
  circle(tx, ty, 10);
}

  function lineRectCollide(x1, y1, x2, y2, rx, ry, rw, rh) {  // Used to find points of intersection of a line and rectangle
    // Rectangle is just four lines, so we return a list of line vs line collisions
    return [this.lineLineCollide(x1, y1, x2, y2, rx, ry, rx+rw, ry), this.lineLineCollide(x1, y1, x2, y2, rx+rw, ry, rx+rw, ry+rh), this.lineLineCollide(x1, y1, x2, y2, rx+rw, ry+rh, rx, ry+rh), this.lineLineCollide(x1, y1, x2, y2, rx, ry+rh, rx, ry)];
  }

function lineLineCollide(x1, y1, x2, y2, x3, y3, x4, y4) {
    if ((dist(x1, y1, x2, y2) == 0 || dist(x3, y3,  x4, y4) == 0) || (x1 - x2 == 0 && x3 - x4 == 0) || (y1 - y2 == 0 && y3 - y4 == 0)) return [false];
    let temp, m1, m2, b1, b2, iX, iY, d1, d2;
    // Find slopes
    m1 = (y2 - y1) / (x2 - x1);
    m2 = (y4 - y3) / (x4 - x3);
    // Find y intercepts
    b1 = y1 - m1 * x1;
    b2 = y3 - m2 * x3;
    // Find X coordinate while also dealing with vertical and horizontal slopes
    if (x4 - x3 == 0) iX = x3;
    else if (x2 - x1 == 0) iX = x1;
    else iX = (b1 - b2) / (m2 - m1);
    // Get Y coordinate while also dealing with horizontal slope
    iY = (x4 - x3) == 0? m1 * iX + b1: m2 * iX + b2;
    // Get lengths of line segments
    d1 = dist(x1, y1, x2, y2);
    d2 = dist(x3, y3, x4, y4);
    // Check if X and Y coordinates is within line segments
    if (dist(iX, iY, x2, y2) > d1 || dist(iX, iY, x1, y1) > d1 || dist(iX, iY, x3, y3) > d2 || dist(iX, iY, x4, y4) > d2) return [false];
    return [true, iX, iY];
  }

function rectRectCollide(r1x, r1y, r1w, r1h, r2x, r2y, r2w, r2h) {
    return r1x + r1w >= r2x && r1x <= r2x+r2w && r1y + r1h >= r2y && r1y <= r2y+r2h;
  }

function pointRectCollide(px, py, rx, ry, rw, rh, edge=true) {
    if (edge) return px >= rx && px <= rx + rw && py >= ry && py <= ry + rh;
    return px > rx && px < rx + rw && py > ry && py < ry + rh;
}


















// function rectRectCollideCoords(px, py, x1, y1, w1, h1, x2, y2, w2, h2) {
//     // Find coordinates where moving rectangle touches the base rectangle
//     let coordCollide = this.lineRectCollide(px+w1/2, py+h1/2, x1+w1/2, y1+h1/2, x2-w1/2, y2-h1/2, w2+w1, h2+h1);
//     // Iterate to find the closest coordinate
//     for (let i = 0; i < coordCollide.length; i++) {
//       if (coordCollide[i][0]) return [true, coordCollide[i][1]-w1/2, coordCollide[i][2]-h1/2, i];
//     }
//     return [false];
//   }

// ONE LINE AT A TIME STRAT
// STEP 1:  cast the frist line in set 1 to the goal
// STEP 2:  if the line collides with an object, then we get the closest collision coords.
//         else, we repeat step one with the second line in set 1. if there is no collision we go to
//         set 2. if there are still no collisions, then we end this function because we found a path.
//         If both lines collide on the same side of an obstacle, then skip it
// STEP 3:  cast lines perpindicular to collision point in both directions
// STEP 4:  if the collision is out of bounds skip it. If it collides with a different obstacle
//         cast a line perpindicular of the new obstacle. skip this if the point is within 2 obstacles
// STEP 5:  repeat

// function pathFind(tx, ty, cx, cy, cl, listO, bx=0, by=0, bw=width, bh=height, paths=[]) {
//     drawFunnyLines(tx, ty, cx, cy, cl);
//     // SETUP
//     let coords = setupCollide(tx, ty, cx, cy, cl, listO, bx, by, bw, bh), listOExplore = [];
//     if (coords.length == 3) return paths;  // end early if unobstructed path
//     for (let i = 0; i < listO.length; i++) {
//       // tells us if we already covered each side both ways
//       listOExplore.push([[false, false], [false, false], [false, false], [false, false]]);
//     }
//     // Now for the recursion
//     for (let i = 0; i < 2; i++) {
//       circle(coords[i][0], coords[i][1], 10);
//       listOExplore = recursiveExplore(tx, ty, cl, coords[i], listO, listOExplore, bx, by, bw, bh, 0);
//       // console.log(i, listOExplore);
//     }
//   return paths;
// }

// function recursiveExplore(tx, ty, cl, coords, listO, listOExplore, bx, by, bw, bh, index) {
//   let temp, helper;
//   // console.log(index);
//   // if (index > 2) return -1;
//   if (coords[6] % 2 == 0) {
//       if (pointRectCollide(listO[coords[3]][0], coords[1], bx+cl/2, by+cl/2, bw-cl, bh-cl)) {
//         // Left
//         temp = nearListRectLineList(listO[coords[3]][0]-cl/2, coords[1], coords[0]-0.00001, coords[1], cl, listO);
//         helper = recursiveHelper(0, coords, temp, listOExplore, tx, ty, cl, listO, bx, by, bw, bh, index);
//         coords = helper[0];
//         listOExplore = helper[1];
//         // line(coords[0], coords[1], listO[coords[3]][0]-cl/2, coords[1]);
//       }
//       if (pointRectCollide(listO[coords[3]][0]+listO[coords[3]][2]+cl/2, coords[1], bx+cl/2, by+cl/2, bw-cl, bh-cl)) {
//         // Right
//         temp = nearListRectLineList(listO[coords[3]][0]+listO[coords[3]][2]+cl/2, coords[1], coords[0]+0.00001, coords[1], cl, listO);
//         helper = recursiveHelper(1, coords, temp, listOExplore, tx, ty, cl, listO, bx, by, bw, bh, index);
//         coords = helper[0];
//         listOExplore = helper[1];
//         // line(coords[0], coords[1], listO[coords[3]][0]+listO[coords[3]][2]+cl/2, coords[1]);
//         // circle(listO[coords[3]][0]+listO[coords[3]][2]+cl/2, coords[1], 10);
//         // console.log(temp)
//       }
//     }
//     else if (coords[6] % 2 == 1) {
//       if (pointRectCollide(coords[0], listO[coords[3]][1]-cl/2, bx+cl/2, by+cl/2, bw-cl, bh-cl)) {
//         // Up, coords[6] = 1
//         temp = nearListRectLineList(coords[0], listO[coords[3]][1]-cl/2, coords[0], coords[1]-0.00001, cl, listO);
//         helper = recursiveHelper(0, coords, temp, listOExplore, tx, ty, cl, listO, bx, by, bw, bh, index);
//         coords = helper[0];
//         listOExplore = helper[1];
//         // line(coords[0], coords[1], coords[0], listO[coords[3]][1]-cl/2);
//       }
//       if (pointRectCollide(coords[0], listO[coords[3]][1]+listO[coords[3]][3]+cl/2, bx+cl/2, by+cl/2, bw-cl, bh-cl)) {
//         // Down, coords[6] = 3
//         temp = nearListRectLineList(coords[0], listO[coords[3]][1]+listO[coords[3]][3]+cl/2, coords[0], coords[1]+0.00001, cl, listO);
//         helper = recursiveHelper(1, coords, temp, listOExplore, tx, ty, cl, listO, bx, by, bw, bh, index);
//         coords = helper[0];
//         listOExplore = helper[1];
//         // coords[6] = 1;  // 
//         // line(coords[0], coords[1], coords[0], listO[coords[3]][1]+listO[coords[3]][3]+cl/2);
//       }
//     }
//   return listOExplore;
// }

// function recursiveHelper(side, coords, temp, listOExplore, tx, ty, cl, listO, bx, by, bw, bh, index) {
//   if (temp.length != 0) {
//     if (!listOExplore[temp[1]][temp[2]][side]) {
//       listOExplore[temp[1]][temp[2]][side] = true;
//       coords[0] = temp[0][1];
//       coords[1] = temp[0][2];
//       coords[3] = temp[1];  // Object
//       coords[6] = temp[2];  // Object side
//       recursiveExplore(tx, ty, cl, coords, listO, listOExplore, bx, by, bw, bh, index+1); 
//       circle(temp[0][1], temp[0][2], 10);
//     }
//   }
//   return [coords, listOExplore];
// }

// function nearListRectLineList(tx, ty, cx, cy, cl, listO) {
//   let temp, dst, listDist = [];
//   line(tx, ty, cx, cy);
//   for (let i = 0; i < listO.length; i++) {
//     temp = lineRectCollide(tx, ty, cx, cy, listO[i][0]-cl/2, listO[i][1]-cl/2, listO[i][2]+cl, listO[i][3]+cl);
//     for (let j = 0; j < temp.length; j++) {
//       if (temp[j][0]) listDist.push([temp[j], i, j]);
//     }
//   }
//   for (let i = 0; i < listDist.length; i++) {
//     for (let j = 0; j < listO.length; j++) {
//       // console.log(listDist)
//       if (pointRectCollideNotExact(listDist[i][0][1], listDist[i][0][2], listO[j][0]-cl/2, listO[j][1]-cl/2, listO[j][2]+cl, listO[j][3]+cl)) {
//         listDist.splice(i, 1);
//         j = listO.length;
//       }
//     }
//   }
//   // console.log(listDist)
//   if (listDist.length == 0) return [];
//   if (listDist.length == 1) return listDist[0];  // One collision
//   temp = [dist(listDist[0][0][1], listDist[0][0][2], cx, cy), listDist[0]];
//   for (let i = 1; i < listDist.length; i++) {
//     dst = dist(listDist[i][0][1], listDist[i][0][2], cx, cy);
//     if (dst < temp[0]) temp = [dst, listDist[i]];
//   }
//   return temp[1];
// }

// function pointRectCollideNotExact(px, py, rx, ry, rw, rh) {
//     return px > rx && px < rx + rw && py > ry && py < ry + rh;
// }

// function drawFunnyLines(tx, ty, cx, cy, cl) {
//   stroke("blue");
//   line(tx, cy+cl/2, cx+cl/2, cy+cl/2);  // curr X
//   line(tx, cy+cl/2, tx, ty);  // Trgt Y
//   stroke("yellow");
//   line(tx, ty, cx+cl/2, ty);  // Trgt X
//   line(cx+cl/2, cy+cl/2, cx+cl/2, ty);  // curr Y
//   stroke("black");
//   circle(tx, ty, 10);
// }

// function setupCollide(tx, ty, cx, cy, cl, listO, bx, by, bw, bh) {
//   let coords = [[NaN, NaN, Infinity], [NaN, NaN, Infinity]], collide, disTemp, rctCld;
//   // Return if target is in invalid spot
//   if (!pointRectCollide(tx, ty, bx+cl/2, by+cl/2, bw-cl, bh-cl)) return coords;
//   // Iterate through each object
//   for (let i = 0; i < listO.length; i++) {
//     // Return if target is inside object
//     if (pointRectCollide(tx, ty, listO[i][0], listO[i][1], listO[i][2], listO[i][3])) return coords;
//     // Cast lines in pairs
//     collide = [[
//       lineRectCollide(tx, ty, cx+cl/2, ty, listO[i][0]-cl/2, listO[i][1]-cl/2, listO[i][2]+cl, listO[i][3]+cl),
//       lineRectCollide(cx+cl/2, cy+cl/2, cx+cl/2, ty, listO[i][0]-cl/2, listO[i][1]-cl/2, listO[i][2]+cl, listO[i][3]+cl)
//       ], [
//       lineRectCollide(tx, cy+cl/2, tx, ty, listO[i][0]-cl/2, listO[i][1]-cl/2, listO[i][2]+cl, listO[i][3]+cl),
//       lineRectCollide(tx, cy+cl/2, cx+cl/2, cy+cl/2, listO[i][0]-cl/2, listO[i][1]-cl/2, listO[i][2]+cl, listO[i][3]+cl)
//     ]];
//     // Loop through both sets of lines
//     for (let j = 0; j < 2; j++) {
//       // Iterate through each line in set
//       for (let k = 0; k < 2; k++) {
//         // Iterate through each side on object that lines intersect with
//         for (let l = 0; l < 4; l++) {
//           // If the line collided with a side
//           if (collide[j][k][l][l][0]) {
//             // Calculate distance from source
//             disTemp = dist(collide[j][k][l][l][1], collide[j][k][l][l][2], cx+cl/2, cy+cl/2);
//             // Check if point resides within bounds
//             rctCld = pointRectCollide(collide[j][k][l][l][1], collide[j][k][l][l][2], bx+cl/2, by+cl/2, bw-cl, bh-cl);
//             // If the calculated distance is less than current smallest distance
//             if (disTemp < coords[j][2] && rctCld) {
//               // Add x and y of collision point to path
//               coords[j] = [collide[j][k][l][l][1], collide[j][k][l][l][2], disTemp, i, j, k, l];
//             }
//           }
//         }
//       }
//     }
//   }
//   return coords;
// }


// function lineRectCollList(x1, y1, x2, y2, listRect, thicc=0, exclude=-1) {
//   // Takes in a list of rectangles [[x, y, w, h], [x, y, w, h]] and check if they collide with a line
//   let colide, lenth = listRect.length;
//   for (let i = 0; i < lenth; i++) {
//       if (i != exclude) {
//       colide = lineRectCollide(x1, y1, x2, y2, listRect[0]-thicc/2, listRect[1]-thicc/2, listRect[2]+thicc, listRect[3]+thicc);
//       for (let j = 0; j < 4; j++) {
//         if (colide[j][0]) return [true, i];
//       }
//     }
//   }
//   return [false];
// }


// function pathFind(trgtX, trgtY, currX, currY, sideL, listO, boundX=0, boundY=0, boundW=width, boundH=height) {
//   // Returns a list with all the x and y locations of a viable and quick path
  
//   let coords = findClosestPointTarget(trgtX, trgtY, currX, currY, sideL, listO, boundX, boundY, boundW, boundH);
  
//   for (let i = 0; i < 2; i++) {
//     if (coords[i].length == 3) noLoop();
//     // okok, we need to check what side it hits, and based on that, we can check if its to the left or right/up or down
//     // I should also keep track of what sides of objects ive already explored to reduce evil
//     explorePaths(coords, listO, sideL, boundX, boundY, boundW, boundH);
//   }
  
//   // console.log(coords[0][6], coords[1][6]);
  
//   circle(coords[0][0], coords[0][1], 10);
//   circle(coords[1][0], coords[1][1], 10);
  
// }

// function explorePaths(coords, listO, sideL, boundX=0, boundY=0, boundW=width, boundH=height) {  
//   for (let i = 0; i < 2; i++) {
//     if (coords[i][6] % 2 == 0) {
//       if (pointRectCollide(listO[coords[i][3]][0]-sideL/2, coords[i][1], boundX+sideL/2, boundY+sideL/2, boundW-sideL, boundH-sideL)) {
//         // Left
//         // lineRectCollide(coords[i][0], coords[i][1], listO[coords[i][3]][0]-sideL/2, coords[i][1], );
//         // minLineRectCollide()
//         line(coords[i][0], coords[i][1], listO[coords[i][3]][0]-sideL/2, coords[i][1]);
//         circle(listO[coords[i][3]][0]-sideL/2, coords[i][1], 10);
//       }
//       if (pointRectCollide(listO[coords[i][3]][0]+listO[coords[i][3]][2]+sideL/2, coords[i][1], boundX+sideL/2, boundY+sideL/2, boundW-sideL, boundH-sideL)) {
//         // Right
//         // line(coords[i][0], coords[i][1], listO[coords[i][3]][0]+listO[coords[i][3]][2]+sideL/2, coords[i][1]);
//         circle(listO[coords[i][3]][0]+listO[coords[i][3]][2]+sideL/2, coords[i][1], 10);
//       }
//     }
//     else if (coords[i][6] % 2 == 1) {
//       if (pointRectCollide(coords[i][0], listO[coords[i][3]][1]-sideL/2, boundX+sideL/2, boundY+sideL/2, boundW-sideL, boundH-sideL)) {
//         // Up
//         line(coords[i][0], coords[i][1], coords[i][0], listO[coords[i][3]][1]-sideL/2);
//         circle(coords[i][0], listO[coords[i][3]][1]-sideL/2, 10);
//       }
//       if (pointRectCollide(coords[i][0], listO[coords[i][3]][1]+listO[coords[i][3]][3]+sideL/2, boundX+sideL/2, boundY+sideL/2, boundW-sideL, boundH-sideL)) {
//         // Down
//         line(coords[i][0], coords[i][1], coords[i][0], listO[coords[i][3]][1]+listO[coords[i][3]][3]+sideL/2);
//         circle(coords[i][0], listO[coords[i][3]][1]+listO[coords[i][3]][3]+sideL/2, 10);
//       }
//     }
//   }
//   return coords;
// }

// function minLineRectCollide(lineRectCollideList, currX, currY) {
//   let temp, small = Infinity, index = -1;
//   for (let i = 0; i < 4; i ++) {
//     if (lineRectCollideList[i][0]) {
//       temp = dist(lineRectCollideList[i][1], lineRectCollideList[i][2], currX, currY);
//       if (temp < small) {
//         small = temp;
//         index = i;
//       }
//     }
//   }
//   return lineRectCollideList[index];
// }

// function findClosestPointTarget(trgtX, trgtY, currX, currY, sideL, listO, boundX=0, boundY=0, boundW=width, boundH=height) {
  
//   stroke("blue");
//   line(trgtX, currY+sideL/2, currX+sideL/2, currY+sideL/2);  // curr X
//   line(trgtX, currY+sideL/2, trgtX, trgtY);  // Trgt Y
//   stroke("yellow");
//   line(trgtX, trgtY, currX+sideL/2, trgtY);  // Trgt X
//   line(currX+sideL/2, currY+sideL/2, currX+sideL/2, trgtY);  // curr Y
//   stroke("black");
//   circle(trgtX, trgtY, 10);
  
//   let coords = [[NaN, NaN, Infinity], [NaN, NaN, Infinity]], collide, disTemp, rctCld;
//   // Return if target is in invalid spot
//   if (!pointRectCollide(trgtX, trgtY, boundX+sideL/2, boundY+sideL/2, boundW-sideL, boundH-sideL)) return coords;
//   // Iterate through each object
//   for (let i = 0; i < listO.length; i++) {
//     // Return if target is inside object
//     if (pointRectCollide(trgtX, trgtY, listO[i][0], listO[i][1], listO[i][2], listO[i][3])) return coords;
//     // Cast lines in pairs
//     collide = [[
//       lineRectCollide(trgtX, trgtY, currX+sideL/2, trgtY, listO[i][0]-sideL/2, listO[i][1]-sideL/2, listO[i][2]+sideL, listO[i][3]+sideL),
//       lineRectCollide(currX+sideL/2, currY+sideL/2, currX+sideL/2, trgtY, listO[i][0]-sideL/2, listO[i][1]-sideL/2, listO[i][2]+sideL, listO[i][3]+sideL)
//       ], [
//       lineRectCollide(trgtX, currY+sideL/2, trgtX, trgtY, listO[i][0]-sideL/2, listO[i][1]-sideL/2, listO[i][2]+sideL, listO[i][3]+sideL),
//       lineRectCollide(trgtX, currY+sideL/2, currX+sideL/2, currY+sideL/2, listO[i][0]-sideL/2, listO[i][1]-sideL/2, listO[i][2]+sideL, listO[i][3]+sideL)
//     ]];
//     // Loop through both sets of lines
//     for (let j = 0; j < 2; j++) {
//       // Iterate through each line in set
//       for (let k = 0; k < 2; k++) {
//         // Iterate through each side on object that lines intersect with
//         for (let l = 0; l < 4; l++) {
//           // If the line collided with a side
//           if (collide[j][k][l][l][0]) {
//             // Calculate distance from source
//             disTemp = dist(collide[j][k][l][l][1], collide[j][k][l][l][2], currX+sideL/2, currY+sideL/2);
//             // Check if point resides within bounds
//             rctCld = pointRectCollide(collide[j][k][l][l][1], collide[j][k][l][l][2], boundX+sideL/2, boundY+sideL/2, boundW-sideL, boundH-sideL);
//             // If the calculated distance is less than current smallest distance
//             if (disTemp < coords[j][2] && rctCld) {
//               // Add x and y of collision point to path
//               coords[j] = [collide[j][k][l][l][1], collide[j][k][l][l][2], disTemp, i, j, k, l];
//             }
//           }
//         }
//       }
//     }
//   }
//   return coords;
// }

// function pathFind(trgtX, trgtY, currX, currY, sideL, listO, boundX=0, boundY=0, boundW=width, boundH=height) {
//   // any time an obstacle is added, it adds 2 possible paths
//   // so these four obstacles create 8 possible paths
//   // this functions job is to find which of these paths are actually possible
//   // there are also multiple ways to walk a given path
//   // so it must find the most efficent/shortest way to walk it (EX using diagionals rather than components)
//   // then return a list of the path to take with the direction included (EX [true, x, y, dir] or [false])
//   stroke("blue");
//   line(trgtX, currY+sideL/2, currX+sideL/2, currY+sideL/2);  // curr X
//   line(trgtX, currY+sideL/2, trgtX, trgtY);  // Trgt Y
//   stroke("yellow");
//   line(trgtX, trgtY, currX+sideL/2, trgtY);  // Trgt X
//   line(currX+sideL/2, currY+sideL/2, currX+sideL/2, trgtY);  // curr Y
//   stroke("black");
  
//   let paths = [[NaN, NaN, Infinity], [NaN, NaN, Infinity]], collide, disTemp, rctCld;
//   // line(trgtX, trgtY, currX+sideL/2, currY+sideL/2);
//   fill(0, 255, 0);
//   circle(trgtX, trgtY, 10);
//   fill(255, 150, 150);
//   // Iterate through each object
//   for (let i = 0; i < listO.length; i ++) {
//     // Cast 2 sets of lines into each object
//     collide = [[
//       lineRectCollide(trgtX, trgtY, currX+sideL/2, trgtY, listO[i][0]-sideL/2, listO[i][1]-sideL/2, listO[i][2]+sideL, listO[i][3]+sideL),
//       lineRectCollide(currX+sideL/2, currY+sideL/2, currX+sideL/2, trgtY, listO[i][0]-sideL/2, listO[i][1]-sideL/2, listO[i][2]+sideL, listO[i][3]+sideL)
//       ], [
//       lineRectCollide(trgtX, currY+sideL/2, trgtX, trgtY, listO[i][0]-sideL/2, listO[i][1]-sideL/2, listO[i][2]+sideL, listO[i][3]+sideL),
//       lineRectCollide(trgtX, currY+sideL/2, currX+sideL/2, currY+sideL/2, listO[i][0]-sideL/2, listO[i][1]-sideL/2, listO[i][2]+sideL, listO[i][3]+sideL)
//     ]];
//     // Loop through both sets of lines
//     for (let j = 0; j < 2; j++) {
//       // Iterate through each line in set
//       for (let k = 0; k < 2; k++) {
//         // Iterate through each side on object that lines intersect with
//         for (let l = 0; l < 4; l++) {
//           // If the line collided with a side
//           if (collide[j][k][l][l][0]) {
//             // Calculate distance from source
//             disTemp = dist(collide[j][k][l][l][1], collide[j][k][l][l][2], currX+sideL/2, currY+sideL/2);
//             // Check if point resides within bounds
//             rctCld = pointRectCollide(collide[j][k][l][l][1], collide[j][k][l][l][2], boundX+sideL/2, boundY+sideL/2, boundW-sideL, boundH-sideL);
//             // If the calculated distance is less than current smallest distance
//             if (disTemp < paths[j][2] && rctCld) {
//               // Add x and y of collision point to path
//               paths[j] = [collide[j][k][l][l][1], collide[j][k][l][l][2], disTemp, i, j, k, l];
//             }
//           }
//         }
//       }
//       if (paths[j].length > 3) {
        

        
//         circle(paths[j][0], paths[j][1], 10);
//         if (paths[j][6] % 2 == 0) {
//           line(paths[j][0], paths[j][1], listO[paths[j][3]][0] + listO[paths[j][3]][2] + sideL/2-0.00001, paths[j][1])
//           if (pointRectCollide(listO[paths[j][3]][0] - sideL+0.00001, paths[j][1] - sideL/2, boundX+sideL/2, boundY+sideL/2, boundW-sideL, boundH-sideL)){
//             circle(listO[paths[j][3]][0] - sideL/2+0.00001, paths[j][1], 10);
//             // pathFind(trgtX, trgtY, listO[paths[j][3]][0] - sideL+0.00001, paths[j][1] - sideL/2, sideL, listO, boundX, boundY, boundW, boundH);
//           }
//           if (pointRectCollide(listO[paths[j][3]][0] + listO[paths[j][3]][2]-0.00001, paths[j][1] - sideL/2, boundX+sideL/2, boundY+sideL/2, boundW-sideL, boundH-sideL)){
//             circle(listO[paths[j][3]][0] + listO[paths[j][3]][2] + sideL/2-0.00001, paths[j][1], 10);
//             // pathFind(trgtX, trgtY, listO[paths[j][3]][0] + listO[paths[j][3]][2]-0.00001, paths[j][1] - sideL/2, sideL, listO, boundX, boundY, boundW, boundH);
//           }
//         }
//         else {
//           if (pointRectCollide(paths[j][0], listO[paths[j][3]][1] - sideL/2+0.00001, boundX+sideL/2, boundY+sideL/2, boundW-sideL, boundH-sideL)){
//             circle(paths[j][0], listO[paths[j][3]][1] - sideL/2+0.00001, 10);
//             // pathFind(trgtX, trgtY, paths[j][0], listO[paths[j][3]][1] + listO[paths[j][3]][3] + sideL/2-0.00001, sideL, listO, boundX, boundY, boundW, boundH);
//           }
//           if (pointRectCollide(paths[j][0], listO[paths[j][3]][1] + listO[paths[j][3]][3]+sideL/2-0.00001, boundX+sideL/2, boundY+sideL/2, boundW-sideL, boundH-sideL)){
//             circle(paths[j][0], listO[paths[j][3]][1] + listO[paths[j][3]][3] + sideL/2-0.00001, 10);
//             // pathFind(trgtX, trgtY, paths[j][0] - sideL/2, listO[paths[j][3]][1] + listO[paths[j][3]][3]-0.00001, sideL, listO, boundX, boundY, boundW, boundH);
//           }
//         }
//       }
//     } 
//   }
// }

    // for (let j = 0; j < 2; j++) {
    //   for (let k = 0; k < 2; k++) {
    //     for (let l = 0; l < 4; l++) {
    //       if (collide[j][k][l][l][0] && dist(collide[j][k][l][l][1], collide[j][k][l][l][2], currX+sideL/2, currY+sideL/2) < distL[j]) {
    //         distL[j] = dist(collide[j][k][l][l][1], collide[j][k][l][l][2], currX+sideL/2, currY+sideL/2);
    //         paths[j] = [collide[j][k][l][l][1], collide[j][k][l][l][2]];
    //       }
    //     }
    //   }
    //   // console.log(paths[j][0], paths[j][1], j);
    //   if (isFinite(distL[j])) circle(paths[j][0], paths[j][1], 10);
    // }
    // for (let j = 0; j < 4; j++) {
    //   for (let k = 0; k < 4; k++) {
    //     if (collide[j][k][l][0] && dist(collide[j][k][l][1], collide[j][k][l][2], currX+sideL/2, currY+sideL/2) < dista) {
    //       dista = dist(collide[j][k][l][1], collide[j][k][l][2], currX+sideL/2, currY+sideL/2);
    //       paths = [collide[j][k][l][1], collide[j][k][l][2]];
    //     }
    //   }
    // }

//   function oneStepPathFind(pX, pY, pW, pH, tX, tY, oX, oY, oW, oH) {
//     let coords = lineRectCollide(pX, pY, tX, tY, oX-pW/2, oY-pH/2, oW+pW, oH+pH);
//     let list = [];
//     line(pX, pY, tX, tY)
//     for (let i = 0; i < coords.length; i++) {
//       if (coords[i][0]) list.push([coords[i][1], coords[i][2], i]);
//     }
//     if (list.length == 2) {
//       // list = dist(list[0][0], list[0][1], mouseX, mouseY) < dist(list[1][0], list[1][1], mouseX, mouseY)? [list[1], list[0]] : list;
      
//       // console.log(list)
//       // calculate both perimeters of rect cut by line
//       // let p1 = (list[0][0]+list[1][0]-oX*2) + (list[0][1]+list[1][1]-oY*2);
//       // line(pX, tY, tX, tY)
//       // line(pX, pY, pX, tY)
//       circle(oX-pW/2, oY-pH/2, 10);
//       circle(oX-pW/2, tY, 10)
//       // console.log(p1, (oW + oH)*2);
//       // console.log(oX, list[0][0], list[1][0], oY, list[0][1], list[1][1])
//     }
//   }

  // function oneStepPathFind(pX, pY, pW, pH, tX, tY, oX, oY, oW, oH) {
  //   let coords = lineRectCollide(pX, pY, tX, tY, oX, oY, oW, oH);
  //   for (let i = 0; i < coords.length; i++) {
  //     if (coords[i][0]) list.push([coords[i][1], coords[i][2], i]);
  //   }
  //   // console.log(list)
  //   if (list.length > 1) {
  //     line(mouseX, mouseY, 300, 350);
  //     let temp = [list[0][0]-(list[0][0] - list[1][0])/2, list[0][1]-(list[0][1] - list[1][1])/2];
  //     // circle(temp[0], temp[1], 10);    
  //     if (dist(list[0][0], list[0][1], mouseX, mouseY) < dist(list[1][0], list[1][1], mouseX, mouseY)) list = [list[1], list[0]];
  //     if (list[1][2] % 2 == 0) {
  //       temp = dist(oX+oW, temp[1], tX, tY) < dist(oX, temp[1], tX, tY)? [oX+oW, temp[1]] : [oX, temp[1]];
  //       // circle(oX+oW, temp[1], 10);
  //       // circle(oX, temp[1], 10);
  //     }
  //     // Vertical
  //     else {
  //       temp = dist(temp[0], oY, tX, tY) < dist(temp[0], oY+oH, tX, tY)? [temp[0], oY] : [temp[0], oY+oH];
  //       // circle(temp[0], oY, 10);
  //       // circle(temp[0], oY+oH, 10);
  //     }
  //     circle(temp[0], temp[1], 10)
  //     // line(list[0], list[1], list[0], 0);
  //   }
  // }

//   function lineLineCollide(x1, y1, x2, y2, x3, y3, x4, y4) {
//     if ((dist(x1, y1, x2, y2) == 0 || dist(x3, y3,  x4, y4) == 0) || (x1 - x2 == 0 && x3 - x4 == 0) || (y1 - y2 == 0 && y3 - y4 == 0)) return [false];
//     let temp, m1, m2, b1, b2, iX, iY, d1, d2;
//     // Find slopes
//     m1 = (y2 - y1) / (x2 - x1);
//     m2 = (y4 - y3) / (x4 - x3);
//     // Find y intercepts
//     b1 = y1 - m1 * x1;
//     b2 = y3 - m2 * x3;
//     // Find X coordinate while also dealing with vertical and horizontal slopes
//     if (x4 - x3 == 0) iX = x3;
//     else if (x2 - x1 == 0) iX = x1;
//     else iX = (b1 - b2) / (m2 - m1);
//     // Get Y coordinate while also dealing with horizontal slope
//     iY = (x4 - x3) == 0? m1 * iX + b1: m2 * iX + b2;
//     // Get lengths of line segments
//     d1 = dist(x1, y1, x2, y2);
//     d2 = dist(x3, y3, x4, y4);
//     // Check if X and Y coordinates is within line segments
//     if (dist(iX, iY, x2, y2) > d1 || dist(iX, iY, x1, y1) > d1 || dist(iX, iY, x3, y3) > d2 || dist(iX, iY, x4, y4) > d2) return [false];
//     return [true, iX, iY];
//   }

//   function lineRectCollide(x1, y1, x2, y2, rx, ry, rw, rh) {  // Used to find points of intersection of a line and rectangle
//     // Rectangle is just four lines, so we return a list of line vs line collisions
//     return [this.lineLineCollide(x1, y1, x2, y2, rx, ry, rx+rw, ry), this.lineLineCollide(x1, y1, x2, y2, rx+rw, ry, rx+rw, ry+rh), this.lineLineCollide(x1, y1, x2, y2, rx+rw, ry+rh, rx, ry+rh), this.lineLineCollide(x1, y1, x2, y2, rx, ry+rh, rx, ry)];
//   }