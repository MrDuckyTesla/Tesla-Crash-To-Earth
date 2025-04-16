let img, colors, Tesla, Temp, teslaOverSS, teslaBattSS, backgroundImg;
 // fullscreen(true)

function preload() {
  // Load Sounds/music
  // exampleSound = loadSound();
  // Load Spritesheets
  teslaOverSS = loadImage("Assets/Sprites/Tesla/Tesla_Overworld.png");
  teslaBattSS = loadImage("Assets/Sprites/Tesla/Tesla_Battle.png");
  // Load background
  backgroundImg = loadImage("Assets/Sprites/Background/background1.png");
  // Load Fonts
  font = loadFont("Assets/Fonts/TeslaCrashToFont.ttf");
}

function setup() {
  // Call necessary functions from p5.js
  createCanvas(800, 800);
  textFont(font); textSize(20);
  noCursor(); noSmooth(); noStroke();
  // Update Variables
  colors = {col1: {r: 111, g: 111, b: 255}, col2: {r: 255, g: 111, b:111}};
  // img = createImage(20, 20);
  // Create Player Object 
  Tesla = new Player(width/2-14*3, height/2-14*3, width/2-4*4, height-3*4-140, [3, 3], teslaOverSS, teslaBattSS, colors.col1, colors.col2);
  // Make roomVar have background
  Tesla.RoomVar.addBackgroundVars(2328, 1504, backgroundImg);
  // Create Other Character Objects
  Temp = new NonPlayerCharacter(Tesla, 0, 0, 100, 100, [3, 3], teslaOverSS, teslaBattSS, colors.col2, colors.col1, true)
}

function draw() {  // Main Game Loop
  // frameRate(round(random(59))+1);  // Fake Lagging (Funny)
  // frameRate(15);  // Keep commented out, only use for testing
  if (Tesla.world.over.curr) {
    Tesla.RoomVar.moveBackground();
    // Tesla.RoomVar.Player = Tesla;
    fill(0);  // Text color
  }
  else {
    background(25);  // Use an image in future, or cool effects
    // fill(255);  // Text color
  }
  // Show characters
  Temp.show(Tesla);
  // console.log(Temp.actualX, Temp.actualY)
  Tesla.show();
  // Display text
  text(round(frameRate()) + "fps", width - 40, 20);  // Show FPS counter
}

function keyReleased() {  // Cant even put this in player.js, big sad
  if (key === " " || key === "ArrowUp" || key === "w") Tesla.click.jump = true;  // Jump
  else if (key === "ArrowDown" || key === "s") Tesla.click.fall = true;  // Fast Fall
  else if (key === "Shift") Tesla.click.dash = true;  // Dash
  if (key === "Enter") Tesla.world.over.curr = !Tesla.world.over.curr;  // Swap from battle to overworld and vise versa
  if (key === "c" || key === "C") {  // Change Colors randomly
    Tesla.colors.c1 = {r: random(255), g: random(255), b: random(255)};
    Tesla.colors.c2 = {r: random(255), g: random(255), b:random(255)};
  }
  else if (key == "r" || key === "R") { // Reset Colors
    Tesla.colors.c1 = {r: 111, g: 111, b: 255};
    Tesla.colors.c2 = {r: 255, g: 111, b:111};
  }
}