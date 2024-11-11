const { START, STOP, OBSTACLE, EMPTY, PLAYER, OBSTACLE_RATIO } = require('./constants');
const { isAdjacent, randomPosition } = require('./utils');

class GameBoard {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.board = this.createEmptyBoard();
    this.start = this.placeSymbolOnEdge(START);
    this.stop = this.placeSymbolOnEdge(STOP, this.start);
    this.placeObstacles();
    this.currentPosition = { ...this.start };
  }

  createEmptyBoard() {
    return Array.from({ length: this.rows }, () => Array(this.cols).fill(EMPTY));
  }

  placeSymbolOnEdge(symbol, exclude) {
    let pos;
    do {
      pos = {
        x: Math.floor(Math.random() * this.rows),
        y: Math.random() < 0.5 ? 0 : this.cols - 1,
      };
    } while (exclude && isAdjacent(pos, exclude));
    this.board[pos.x][pos.y] = symbol;
    return pos;
  }

  placeObstacles() {
    const obstacleCount = Math.floor(this.rows * this.cols * OBSTACLE_RATIO);
    let placedObstacles = 0;

    while (placedObstacles < obstacleCount) {
      const pos = randomPosition(this.rows, this.cols);
      if (this.board[pos.x][pos.y] === EMPTY) {
        this.board[pos.x][pos.y] = OBSTACLE;
        placedObstacles++;
      }
    }
  }

  moveUp() { return this.move(-1, 0); }
  moveDown() { return this.move(1, 0); }
  moveLeft() { return this.move(0, -1); }
  moveRight() { return this.move(0, 1); }

  move(dx, dy) {
    const newX = this.currentPosition.x + dx;
    const newY = this.currentPosition.y + dy;

    if (this.isOutOfBounds(newX, newY) || this.board[newX][newY] === OBSTACLE) return false;

    this.currentPosition = { x: newX, y: newY };
    return this.board[newX][newY] === STOP;
  }

  isOutOfBounds(x, y) {
    return x < 0 || y < 0 || x >= this.rows || y >= this.cols;
  }

  printBoard() {
    const displayBoard = this.board.map(row => [...row]);
    displayBoard[this.currentPosition.x][this.currentPosition.y] = PLAYER;

    console.clear();
    console.log('┌' + '───'.repeat(this.cols) + '┐');
    for (let i = 0; i < this.rows; i++) {
      let row = '│ ';
      for (let j = 0; j < this.cols; j++) {
        row += this.getSymbol(displayBoard[i][j]) + ' ';
      }
      row += '│';
      console.log(row);
    }
    console.log('└' + '───'.repeat(this.cols) + '┘');
    console.log('\nUse the arrow keys to move. Reaching 🟥 ends the game!');
  }

  getSymbol(cell) {
    switch(cell) {
      case EMPTY: return '🟩';
      case START: return '🟦';
      case STOP: return '🟥';
      case OBSTACLE: return '⬛';
      case PLAYER: return '🟨';
      default: return cell;
    }
  }
}

module.exports = GameBoard;
