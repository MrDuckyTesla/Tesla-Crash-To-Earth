// 0 = Neutral
// 1 = Blue
// 2 = Red
// 3 = Yellow
// 4 = Black
// INFINITE POSSABILITIES

class Menu {
  constructor() {
    this.mouseM = false;
    this.secCount = [0, 0];
  }
  show() {
    this.secCount.shift();
    this.secCount.unshift(round(millis() / 1000, 3));
    fill("green");
    rect(10, 400,  300, 50);
    if (mouseX >= 10 && mouseX <= 310 && mouseY >= 400 && mouseY <= 450) {
      if (this.mouseM == false && this.secCount[1] <= this.secCount[0]) {
          fill("rgb(1,46,1))");
          rect(10, 400,  300, 50);
          this.secCount[1] = this.secCount[0] += 1;
          this.mouseM = true;
          cursor(CROSS);
        }
        else if (this.mouseM == true && this.secCount[1] <= this.secCount[0]) {
          fill("rgb(1,216,1)");
          rect(10, 400,  300, 50);
          this.secCount[1] = this.secCount[0] += 1
          this.mouseM = false;
          cursor(ARROW);
        }
      }
  }
  button(x, y, w, h, rgb1=[], rgb2=[], t=1) {
    
  }
}