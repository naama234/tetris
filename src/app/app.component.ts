import { Component, ViewChild, ElementRef, OnInit, OnDestroy, NgZone, HostListener } from '@angular/core';
import { Square } from './square';

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
  squares: Square[] = [];
  title = 'tetris1';

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
    if (this.requestId !== 26){
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.squares.forEach((square: Square) => {
        square.moveRight();
      });
      this.requestId = requestAnimationFrame(() => this.tick);
  }
  }

  play() {
    const square = new Square(this.ctx);
    this.squares = this.squares.concat(square);
    console.log('play');
  }
  
  @HostListener('window:keydown.arrowright', ['$event'])
  onRight($event){
    console.log('rrrr');
  }
  
}
