const GameBoard = require('./GameBoard');
const readline = require('readline');

const game = new GameBoard(5, 5);
game.printBoard();

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) => {
  let reachedStop = false;

  if (key.name === 'up') {
    reachedStop = game.moveUp();
    console.log('Move: Up');
  } else if (key.name === 'down') {
    reachedStop = game.moveDown();
    console.log('Move: Down');
  } else if (key.name === 'left') {
    reachedStop = game.moveLeft();
    console.log('Move: Left');
  } else if (key.name === 'right') {
    reachedStop = game.moveRight();
    console.log('Move: Right');
  } else if (key.sequence === '\u0003') {
    process.exit();
  }

  game.printBoard();

  if (reachedStop) {
    console.log('Congratulations! You reached STOP (B)!');
    process.exit();
  }
});
