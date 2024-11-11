const GameBoard = require('./GameBoard');
const setupControls = require('./controls');

function startGame(rows, cols) {
  const game = new GameBoard(rows, cols);
  game.printBoard();

  setupControls(game, () => {
    console.log('Congratulations! You reached STOP (B)!');
    process.exit();
  });
}

startGame(5, 5);
