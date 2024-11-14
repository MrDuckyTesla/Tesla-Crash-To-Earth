let tesalC, followC, tesla, menu = new Menu(), charList = [], yList = [], temp = [];

function preload() {
  tesla = loadImage("Assets/tesla.png");  // Load spritesheet
}

function setup() {
  frameRate(15);
  // tesla = loadImage("Assets/tesla.png");  // Load spritesheet
  noStroke();
  createCanvas(500, 500);
  // [235, 132, 132]
  // [255, 170, 170]
  // for (let i = 0; i < 4; i ++) {
    // if (i == 0) {
      teslaC = new Character(tesla, 140, 0, menu, [111, 111, 255, 200, 111, 111]);
    // }
    // else {
      followC = new Character(tesla, 140, 0, menu, [random(-255, 255), random(-255, 255), random(-255, 255), random(-255, 255), random(-255, 255),random(-255, 255)], teslaC);
    // }
  // }
  for (let i = 0; i < charList.length; i ++) {
    temp.push(charList[i].y);
  }
  for (let i = 0; i < charList.length; i++) {
    charList[i].colorChange();
  }
}

function draw() {
  noSmooth();
  background(68);
  // for (let i = 0; i < charList.length; i ++) {
  //   temp.push(charList[i].y);
  //   if(temp.length > charList.length) {
  //     temp.shift();
  //   }
  // }
  // orderList(temp);
  // console.log(temp);
  // charList = sort(charList);
  teslaC.show();
  followC.show();
  // for (let i = 0; i < charList.length; i++) {
  //   charList[i].show();
  // }
  
  // if (tesla.y + 70 >= xedic.y + 70) {
  //   xedic.show();
  //   tesla.show();
  // }
  // else {
  //   tesla.show();
  //   xedic.show();
  // }
  menu.show();
}
// function orderList(list, minimum=true) {
//   let temp = [];
//   for (let i = 0; i < list.length; i ++) {
//     temp.push(min(list));
//     // console.log(min(list));
//   }
// }
