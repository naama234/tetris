import { SquareTetromino } from './SquareTetromino';

export class Board {
    board: number[][];
    rows = 1;
    cols = 12;
    

    constructor() {
        this.board = [];
        for (let i = 0; i < this.rows; i++) {
            this.board[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this.board[i][j] = 0;
            }
        }
    }

    set_tetromino(x, y) {
        this.board[0][x] = 1;
        /*
        console.log('in set');
        for (let i = 5; i < this.rows; i++) {
            for (let j = 5; j < this.cols; j++) {
                this.board[i][j] = 6;
            }
        }
        */
    }
    
    check_if_line_full(){
        for (let i = 0; i < this.cols; i++) {
            if (this.board[0][i] !== 1){
                return false;
            }
        }
        return true;
        
    }

    set_to_zeros(){
        for (let i = 0; i < this.cols; i++) {
            this.board[0][i] = 0;
            
        }
    }

    get_board(){
        return this.board;
    }
    
}