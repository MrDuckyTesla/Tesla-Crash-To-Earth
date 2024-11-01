let img, colors;

 // fullscreen(true)

function preload() {
  // // Load Sounds/music
  // exampleSound = loadSound();
  // Load Spritesheets, (count the new amount of pixels) pixels :0
  teslaOverSS = loadImage("Assets/Sprites/Tesla/Tesla_Overworld.png");
  teslaBattSS = loadImage("Assets/Sprites/Tesla/Tesla_Battle.png");
  // Load Fonts
  font = loadFont("Assets/Fonts/TeslaCrashToFont.ttf");
}

function setup() {
  img = createImage(20, 20);
  createCanvas(600, 600);
  textFont(font);  textSize(20);
  noCursor();  noSmooth();
  colors = {col1: {r: 111, g: 111, b: 255}, col2: {r: 255, g: 111, b:111}}
  // Create Player Object 
  Tesla = new Player(width / 2 - 14 * 3, height / 2 - 14 * 3, width / 2 - 4 * 4, height - 13 * 4, teslaOverSS, teslaBattSS, colors.col1, colors.col2);
  // Tesla.overWorld = round(random()) == 1;  // Fun :D
  Tesla.overWorld = true;  //  Dictates if in battle or not
}

function draw() {  // Main Game Loop
  // frameRate(round(random(59))+1);  // Fake Lagging (Funny)
  // frameRate(30);  // Keep commented out, only use for testing
  if (Tesla.overWorld) {
    background(150);
    fill(0);  // Text color
  }
  else {
    background(50);  // Use an image in future, or cool effects
    fill(255);  // Text color
  }
  Tesla.show();
  text(round(frameRate()) + "fps", width - 40, 20);  // Show FPS counter
}

function keyReleased() {  // Cant even put this in player.js, big sad
  if (key === " " || key === "ArrowUp" || key === "w") Tesla.click.jump = true;  // Jump
  else if (key === "ArrowDown" || key === "s") Tesla.click.fall = true;  // Fast Fall
  else if (key === "Shift") Tesla.click.dash = true;  // Dash
  if (key === "Enter") Tesla.overWorld = !Tesla.overWorld;  // Swap from battle to overworld and vise versa
  else if (key === "c") {  // Change Colors randomly
    Tesla.col1 = {r: random(255), g: random(255), b: random(255)}
    Tesla.col2 = {r: random(255), g: random(255), b:random(255)}
  }
  else if (key == "r") { // Reset Colors
    Tesla.col1 = {r: 111, g: 111, b: 255}
    Tesla.col2 = {r: 255, g: 111, b:111}
  }
}