// Good luck man 💀
class Network extends Enemy {
  constructor() {
    super();
    this.inputs = 10;
    this.hiddenLayersWidth = 5;
    this.hiddenLayers = 10;
    this.outputs = 8;
    this.network = [[], [], []];
    for (let i = 1; i < this.hiddenLayersWidth; i ++) {
      this.network.push([]);
    }
  }
  
  train() {
    
  }
  
  loadNetwork() {
    
  }
  
  forwardPropagation() {
    
  }
  
  backPropagation() {
    
  }
  
}