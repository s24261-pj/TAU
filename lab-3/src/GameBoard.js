class GameBoard {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.board = this.generateBoard();
    this.start = this.placeStartOrStop('A');
    this.stop = this.placeStartOrStop('B', this.start);
    this.placeObstacles();
    this.currentPosition = { ...this.start };
  }

  generateBoard() {
    return Array.from({ length: this.rows }, () => Array(this.cols).fill(' '));
  }

  placeStartOrStop(symbol, exclude) {
    let pos;
    do {
      pos = {
        x: Math.floor(Math.random() * this.rows),
        y: Math.random() < 0.5 ? 0 : this.cols - 1
      };
    } while (exclude && this.isAdjacent(pos, exclude));
    this.board[pos.x][pos.y] = symbol;
    return pos;
  }

  isAdjacent(pos1, pos2) {
    return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y) === 1;
  }

  placeObstacles() {
    const obstacleCount = Math.floor((this.rows * this.cols) / 4);
    for (let i = 0; i < obstacleCount; i++) {
      let pos;
      do {
        pos = {
          x: Math.floor(Math.random() * this.rows),
          y: Math.floor(Math.random() * this.cols)
        };
      } while (this.board[pos.x][pos.y] !== ' ');
      this.board[pos.x][pos.y] = 'X';
    }
  }

  moveUp() {
    return this.move(-1, 0);
  }

  moveDown() {
    return this.move(1, 0);
  }

  moveLeft() {
    return this.move(0, -1);
  }

  moveRight() {
    return this.move(0, 1);
  }

  move(dx, dy) {
    const newX = this.currentPosition.x + dx;
    const newY = this.currentPosition.y + dy;

    if (this.isOutOfBounds(newX, newY) || this.board[newX][newY] === 'X') return false;

    this.currentPosition = { x: newX, y: newY };
    return this.board[newX][newY] === 'B';
  }

  isOutOfBounds(x, y) {
    return x < 0 || y < 0 || x >= this.rows || y >= this.cols;
  }

  printBoard() {
    const displayBoard = this.board.map(row => [...row]);
    displayBoard[this.currentPosition.x][this.currentPosition.y] = 'P';

    console.clear();
    console.log('┌' + '───'.repeat(this.cols) + '┐');
    for (let i = 0; i < this.rows; i++) {
      let row = '│ ';
      for (let j = 0; j < this.cols; j++) {
        const cell = displayBoard[i][j];
        if (cell === ' ') row += '🟩 ';
        else if (cell === 'A') row += '🟦 ';
        else if (cell === 'B') row += '🟥 ';
        else if (cell === 'X') row += '⬛ ';
        else if (cell === 'P') row += '🟨 ';
      }
      row += '│';
      console.log(row);
    }
    console.log('└' + '───'.repeat(this.cols) + '┘');
    console.log('\nUżyj strzałek, aby się poruszać. Dotarcie do 🟥 kończy grę!');
  }
}

module.exports = GameBoard;
