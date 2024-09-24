let img;

//  fullscreen()

function preload() {
  // // Load Sounds
  // loadSound();
  // Load Spritesheets, 19,801 pixels :0
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
  Tesla.overWorld = true;
}

function draw() {
  // Line.clearImage(img);  // Line
  // Line.drawLine(img, 200, 200, mouseX, mouseY, [111, 111, 255]);  // Line
  // frameRate(30);  // Keep it commented out
  background(150);
  Tesla.show();
  text(round(frameRate()) + "fps", width - 40, 20);
  // image(img, 0, 0, 400, 400);  // Line
  // console.log(frameRate());
}