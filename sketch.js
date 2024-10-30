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
  createCanvas(600, 600);
  textFont(font);  textSize(20);
  noCursor();  noSmooth();
  // Create Player Object 
  Tesla = new Player(width / 2 - 14 * 3, height / 2 - 14 * 3, width / 2 - 4 * 4, height - 13 * 4, teslaOverSS, teslaBattSS);
  // Tesla.overWorld = round(random()) == 1;  // Fun :D
  Tesla.overWorld = true;  //  Dictates if in battle or not
}

function draw() {  // Main Game Loop
  // frameRate(round(random(59))+1);  // Fake Lagging (Funny)
  // frameRate(30);  // Keep commented out, only use for testing
  background(150);  // Use an image in future, or cool effects
  Tesla.show();
  text(round(frameRate()) + "fps", width - 40, 20);  // Show FPS counter
}

function keyReleased() {  // Cant even put this in player.js, big sad
  if (key === " " || key === "ArrowUp" || key === "w" || key === "ArrowDown" || key === "s" || key === "Shift") {
    Tesla.clickAgain = true;  // Special Moves
  }
  if (key === "Enter")  // Swap from battle to overworld and vise versa
    Tesla.overWorld = !Tesla.overWorld;
  else if (key === "c") {  // Change Colors randomly
    if (Tesla.overWorld)
      Tesla.MediaPlayer.changeColor(Tesla.ovrImg, Tesla.ovrList, [random(255), random(255), random(255), random(255), random(255), random(255), random(255), random(255), random(255)], [[180, 157, 130, 31], [187, 171], [190, 163, 140]]);  // Overworld
    else
      Tesla.MediaPlayer.changeColor(Tesla.batImg, Tesla.batList, [random(255), random(255), random(255), random(255), random(255), random(255)], [[105, 85, 34], [104]]);  // Battle (fun)
  }
  else if (key == "r") { // Reset Colors
    if (Tesla.overWorld)
      Tesla.MediaPlayer.changeColor(Tesla.ovrImg, Tesla.ovrList, [111, 111, 255, 255, 111, 111, 255, 211, 39], [[180, 157, 130, 31], [187, 171], [190, 163, 140]]);  // Overworld
    else
      Tesla.MediaPlayer.changeColor(Tesla.batImg, Tesla.batList, [111, 111, 255, 255, 111, 111], [[105, 85, 34], [104]]);  // Battle
  }
  
}