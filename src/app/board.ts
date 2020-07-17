export class Board {
    board: number[][];

  
    constructor() {
        this.board = [];
        this.board[0] = [];
        for(var i: number = 0; i < 16; i++) {
            this.board[0][i] = 0;
        }
    }

    setPlace(i) {
        console.log('in set');
        this.board[0][i] = 1;
        console.log( this.board[0][i]);

    }

    getBoard(){
        return this.board;
    }

    fullRow(){
        for(var i:number = 0; i < 16; i++){
            if (this.board[0][i] != 1){
                return false;
            }
        }
        return true;
    }

    removeRow(){
        for(var i:number = 0; i < 16; i++){
            this.board[0][i] = 0;
        }
    }
  }
  