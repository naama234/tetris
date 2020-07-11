import { Component, ViewChild, ElementRef, OnInit, OnDestroy, NgZone, HostListener } from '@angular/core';
import { SquareTetromino } from './SquareTetromino';
import { Rectangle } from './rectangle';
import { Board } from './Board';

@Component({
  selector: 'app-root',
  template: `
    <canvas #canvas width="400" height="600" ></canvas>
    <button (click)="play()">Play</button>
  `,
  styles: ['canvas { border-style: solid }']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  requestId;
  interval;
  direction;
  stop = false;
  squares: SquareTetromino[] = [];
  title = 'tetris1';
  squaresOnboard = new Board();
  saveX = 0;
  saveY = 0;  
  lowerLimit = false;
  fullLine = false;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.fillStyle = 'red';
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

  play() {
    const square = new SquareTetromino(this.ctx);
    this.squares = this.squares.concat(square);
  }

  @HostListener('window:keydown.arrowright', ['$event'])
  onRight($event){
    console.log('rrrr');
    this.direction = 'right';
  }

  @HostListener('window:keydown.arrowleft', ['$event'])
  onLeft($event){
    console.log('llll');
    this.direction = 'left';
  }
  
}
