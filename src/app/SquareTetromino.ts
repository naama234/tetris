export class SquareTetromino {
  private color = 'red';
  private x = 6;
  private y = 0;
  private z = 30;
  private coordinates = [[0, 0, 0, 0], [0, 0, 0, 0],[0, 1, 1, 0], [0, 1, 1, 0]];
  constructor(private ctx: CanvasRenderingContext2D) {}

  moveDown() {
    this.y++;
    this.draw();
  }

  moveRight(){
    this.x++;
    this.y++;
    //this.draw();
  }
  
  moveLeft(){
    this.x--;
    this.y++;
    this.draw();
  }

  getX(){
    return this.x;
  }

  getY(){
    return this.y;
  }

  getZ(){
    return this.z;
  }

  private draw() {
    //console.log(this.getX(), this.getY());
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.z * this.x, this.z * this.y, this.z, this.z);
  }

}
