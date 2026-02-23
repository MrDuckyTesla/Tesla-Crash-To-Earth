class Matrix {
  
  constructor(rows, cols) {
    this.matrix = [];
    this.rows = rows;
    this.cols = cols;
    // make matrix
    for (let i = 0; i < this.rows; i++) {
      this.matrix.push([]);
      for (let j = 0; j < this.cols; j++) {this.matrix[i].push(0);}
    }
  }
  
  display(aug=false, tab=false) {
    let s = "";
    for (let i = 0; i < this.rows; i++) {
      let temp = (tab? "|\t" : "|  ");
      for (let j = 0; j < this.cols; j++) {
        if (j == this.cols-1 && aug) temp += (tab? "|\t" : "|  ");
        temp += this.matrix[i][j] + (tab? "\t" : "  ");
      } temp += "|\n"
      s+= temp;
    } console.log(s);
  }
  
  m_scale(row, num) {
    for (let i = 0; i < this.cols; i++) {this.matrix[row][i] *= num;}
    console.log(num+"R_"+row);
  }
  
  m_interchange(row1, row2) {
    let temp = this.matrix[row2].slice();
    this.matrix[row2] = this.matrix[row1];
    this.matrix[row1] = temp;
    console.log("R_"+row1+" <-> " + "R_"+row2);
  }
  
  m_replace(row1, row2, num) {
    let temp = this.matrix[row1].slice();
    for (let i = 0; i < this.cols; i++) {this.matrix[row1][i] *= num;}
    for (let i = 0; i < this.cols; i++) {this.matrix[row2][i] += this.matrix[row1][i];}
    this.matrix[row1] = temp;
    console.log(num+"R_"+row1+" + R_"+row2+ " |-> " + "R_"+row2);
  }
  
  m_multiply(other) {
    let newMatrix = new Matrix(this.rows, other.getCols());
    if (other.getRows() == this.cols) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < other.getCols(); j++) {
          // for (let k = 0; k < )
          newMatrix.matrix[i][j] += this.matrix[i][j] * other.getMatrix(j, i);
        }
      }
      this.setMM(newMatrix);
    }
  }
  
  m_add() {
    
  }
  
  m_subtract() {
    
  }
  
  // Set
  setValM(row, col, num) {this.matrix[row][col] = num;}
  setColValM(col, num, mod=1) {for (let i = 0; i < this.rows; i+=mod) {this.matrix[i][col] = num;}}
  setRowValM(row, num, mod=1) {for (let i = 0; i < this.cols; i+=mod) {this.matrix[row][i] = num;}}
  setColM(col, lst) {for (let i = 0; i < lst.length && i < this.rows; i++) {this.matrix[i][col] = lst[i];}}
  setRowM(row, lst) {
    if (lst.length != this.cols) {
      for (let i = 0; i < lst.length && i < this.cols; i++) {this.matrix[row][i] = lst[i];}
    } else this.matrix[row] = lst;
  }
  setRandM(minN, maxN, n=0) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.matrix[i][j] = round(random(minN, maxN), n);
      }
    }
  }
  
  setColSizeM() {
    
  }
  
  setRowSizeM() {
    
  }
  
  setM(lst) {
    
  }
  
  setMM(other) {
    this.matrix = other.getMatrix();
    this.rows = other.getRows();
    this.cols = other.getCols();
  }
  
  // Get
  getMatrix() {return this.matrix;}
  getNum(row, col) {return this.matrix[row][col];}
  getRows() {return this.rows;}
  getCols() {return this.cols;}
  
  getRowEchelonForm() {
    
  }
  
  
}