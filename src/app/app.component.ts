import { Component, ViewChild, ElementRef, OnInit, OnDestroy, NgZone, HostListener } from '@angular/core';
import { Square } from './square';
import { Board } from './Board';

@Component({
  selector: 'app-root',
  template: `
    <canvas #canvas width="420" height="600" ></canvas>
    <button (click)="play()">Play</button>
  `,
  styles: ['canvas { border-style: solid }']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  requestId;
  interval;
  squares: Square[] = [];
  title = 'tetris';
  rightPressed = false;
  leftPressed = false;
  boardObj:Board;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.fillStyle = 'red';
    this.boardObj = new Board();
    this.ngZone.runOutsideAngular(() => this.tick());
    setInterval(() => {
      this.tick();
    }, 200);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    cancelAnimationFrame(this.requestId);
  }
  
  tick() {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.drawBoard();
      if (this.boardObj.fullRow()){
        this.boardObj.removeRow();
      }
      this.squares.forEach((square: Square) => {
        if (this.rightPressed){
          square.moveRight();
        }
        if (this.leftPressed){
            square.moveLeft();
        }
        console.log(square.getX())
        square.moveDown();
        if (square.getY() == 19){
          this.boardObj.setPlace(square.getX());
          const index = this.squares.indexOf(square, 0);
          if (index > -1) {
            this.squares.splice(index, 1);
          }
          this.play();
        }
        console.log('in tick');
        console.log(this.boardObj.board);
        this.rightPressed = false;
        this.leftPressed = false;
      });
      this.requestId = requestAnimationFrame(() => this.tick);
  
  }
f

  play() {
    const square = new SquareTetromino(this.ctx);
    this.squares = this.squares.concat(square);

  }

  drawBoard(){
    for(var i: number = 0; i < 16; i++) {
        if (this.boardObj.board[0][i] == 1){
          this.ctx.fillRect(30 * i, 30 * 19, 30, 30);
        } 
      }         
  }

  @HostListener('window:keydown.arrowright', ['$event'])
  onRight($event){
    this.rightPressed = true;

  }

  @HostListener('window:keydown.arrowleft', ['$event'])
  onLeft($event){
    this.leftPressed = true;
  }
}
