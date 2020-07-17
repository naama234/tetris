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
<<<<<<< HEAD
  direction;
  stop = false;
  squares: SquareTetromino[] = [];
  title = 'tetris1';
  squaresOnboard = new Board();
  saveX = 0;
  saveY = 0;  
  lowerLimit = false;
  fullLine = false;

=======
  squares: Square[] = [];
  title = 'tetris';
  rightPressed = false;
  leftPressed = false;
  boardObj:Board;
>>>>>>> 248cee84fb8598c318988216123c1d0ee969ccef
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
<<<<<<< HEAD
    //console.log(this.squaresOnboard);
    if (!this.lowerLimit){
      this.ctx.clearRect(this.saveX, this.saveY, 30, 30);
    }
    else if (this.fullLine)
    {
      this.ctx.clearRect(0, this.saveY, 30 * 12, 30);

    }
    this.squares.forEach((square: SquareTetromino) => {
      if (this.direction === 'right') {
        square.moveRight();
        this.direction = 'down';
      }

      if (this.direction === 'left') {
        square.moveLeft();
        this.direction = 'down';
      }
      else {
        square.moveDown();
      }
      this.saveX = square.getZ() * square.getX();
      this.saveY = square.getZ() * square.getY();
      
      if (square.getY() === 19){
        this.lowerLimit = true;
        const new_drop_square = new SquareTetromino(this.ctx);
        this.squares = this.squares.concat(new_drop_square);
        let index = this.squares.indexOf(square, 0);
        
        console.log('x ' + square.getX());
        console.log('y ' + square.getY());
        this.squares.splice(index, 1);
        this.squaresOnboard.set_tetromino(square.getX(), square.getY());
        if (this.squaresOnboard.check_if_line_full()){
          this.fullLine = true;
          this.squaresOnboard.set_to_zeros();
        }
        else {
          this.fullLine = false;
        }
      }
      else {
          this.lowerLimit = false;
      }

      //console.log('===========')
      //console.log('X = ' + square.getX());
      //console.log('Y = ' + square.getY());
      //console.log('req = ' + this.requestId);

    });
  
    console.log(this.squaresOnboard.get_board());
    this.requestId = requestAnimationFrame(() => this.tick);
}
=======
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
>>>>>>> 248cee84fb8598c318988216123c1d0ee969ccef

  play() {
    const square = new SquareTetromino(this.ctx);
    this.squares = this.squares.concat(square);
<<<<<<< HEAD
=======
  }

  drawBoard(){
    for(var i: number = 0; i < 16; i++) {
        if (this.boardObj.board[0][i] == 1){
          this.ctx.fillRect(30 * i, 30 * 19, 30, 30);
        } 
      }         
>>>>>>> 248cee84fb8598c318988216123c1d0ee969ccef
  }

  @HostListener('window:keydown.arrowright', ['$event'])
  onRight($event){
<<<<<<< HEAD
    console.log('rrrr');
    this.direction = 'right';
=======
    this.rightPressed = true;
>>>>>>> 248cee84fb8598c318988216123c1d0ee969ccef
  }

  @HostListener('window:keydown.arrowleft', ['$event'])
  onLeft($event){
<<<<<<< HEAD
    console.log('llll');
    this.direction = 'left';
=======
    this.leftPressed = true;
>>>>>>> 248cee84fb8598c318988216123c1d0ee969ccef
  }
}
