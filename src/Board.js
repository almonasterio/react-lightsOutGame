import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps={
    ncols:5,
    nrows:5,
    chanceLightStartsOn: 0.25
 
  }
  constructor(props) {
    super(props);
    this.state = {
         hasWon: false,
         board: this.createBoard()
    };
    this.createBoard = this.createBoard.bind(this);
    this.flipCellsAround = this.flipCellsAround.bind(this);

    // TODO: set initial state
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
      for (let i = 0; i < this.props.ncols; i++) {
        let row =[]
        for (let j = 0; j < this.props.nrows; j++) {
          row.push(Math.random()<this.props.chanceLightStartsOn)
        }
        board.push(row)
      }
    
    // TODO: create array-of-arrays of true/false values
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    console.log(this.props)
    let {ncols, nrows} = this.props;
    let board = this.state.board;
      let hasWon = this.state.hasWon;
    let [y, x] = coord.split("-").map(Number);
    flipCell(y, x)

    function flipCell(y, x) {
      // if this coord is actually on board, flip it
      console.log("entra")

      if ((x >= 0 && x < ncols && y >= 0 && y < nrows)) {
        board[y][x] = !board[y][x];
      
      }
      ((x+1 >= 0 && x+1< ncols && y >= 0 && y < nrows)) && (board[y][x + 1] = !board[y][x + 1]);
      ((x-1 >= 0 && x-1< ncols && y >= 0 && y < nrows)) && (board[y][x - 1] = !board[y][x - 1]);
       ((x >= 0 && x < ncols && y+1 >= 0 && y+1 < nrows)) && (board[y+1][x] = !board[y+1][x]);
       ((x >= 0 && x < ncols && y-1 >= 0 && y-1 < nrows)) && (board[y-1][x] = !board[y-1][x]);

    }

(board.flat().filter(e=>e==true).length==0) && (hasWon=true);
this.setState(st => ({
board,
hasWon


}))
    // TODO: flip this cell and the cells around it

    // win when every cell is turned off
    // TODO: determine is the game has been won


    // this.setState({board, hasWon});
  }


  /** Render game board or winning message. */

  render() {
   let tblBoard = [];
   for(let x=0; x<this.props.ncols; x++){
     let row=[]
     for(let y=0; y<this.props.nrows;y++) {
       let coord=`${x}-${y}`
       row.push(<Cell flipCellsAroundMe={this.flipCellsAround} coord={coord} key={coord} isLit={this.state.board[x][y]} />)
     }
     tblBoard.push(<tr>{row}</tr>)
   }

return (<>
{!this.state.hasWon? 
(<table className="Board">
  <tbody>
  {tblBoard}
  </tbody>
</table>)
:
(<h1>YOU WIN!</h1>)
}



</>);
    // if the game is won, just show a winning msg & render nothing else

    // TODO

    // make table board

    // TODO
  }
}


export default Board;
