function setupControls(game, onReachStop) {
  const readline = require('readline');

  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);

  process.stdin.on('keypress', (str, key) => {
    if (key.sequence === '\u0003') process.exit();

    let reachedStop = false;

    switch (key.name) {
      case 'up':
        reachedStop = game.moveUp();
        break;
      case 'down':
        reachedStop = game.moveDown();
        break;
      case 'left':
        reachedStop = game.moveLeft();
        break;
      case 'right':
        reachedStop = game.moveRight();
        break;
    }

    game.printBoard();

    if (reachedStop) onReachStop();
  });
}

module.exports = setupControls;
