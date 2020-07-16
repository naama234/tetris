export class Square {
  private color = 'red';
  private x = 6;
  private y = 0;
  private z = 30;

  constructor(private ctx: CanvasRenderingContext2D) {}

  moveDown() {
    this.y++;
    this.draw();
  }

  moveLeft(){
    if (this.x - 1 >= 0)
      this.x--;
  }

  moveRight(){
    if (this.x + 1 < 14){
      this.x++;
    }
      
  }

  getY(){
    return this.y;
  }

  getX(){
    return this.x;
  }

  private draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.z * this.x, this.z * this.y, this.z, this.z);
  }
}
