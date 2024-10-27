let img;

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
  createCanvas(400, 400);
  textFont(font);  textSize(20);
  noCursor();  noSmooth();
  // Create Player Object 
  Tesla = new Player(width / 2 - 14 * 3, height / 2 - 14 * 3, width / 2 - 4 * 4, height - 13 * 4, teslaOverSS, teslaBattSS);
//   Tesla.overWorld = round(random()) == 1;  // Fun :D
  Tesla.overWorld = false;  //  Dictates if in battle or not
}

function draw() {
  // frameRate(30);  // Keep it commented out, only use for testing
  background(150);
  Tesla.show();
  text(round(frameRate()) + "fps", width - 40, 20);
}

function keyReleased() {  // Cant even put this in player.js, big sad
  if (key === " " || key === "ArrowUp" || key === "w") {
    Tesla.clickAgain = true;  // Jump
  }
}