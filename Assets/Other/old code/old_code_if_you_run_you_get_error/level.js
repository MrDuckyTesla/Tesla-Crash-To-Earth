class Level {
  constructor(x1, y1, x2, y2, r, g, b, movable=false, visable=true, sprite=false) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.colorRGB = [r, g, b];
    this.movable = movable;
    this.visable = visable;
    this.sprite = sprite;
  }
  immovable() {
    
  }
}