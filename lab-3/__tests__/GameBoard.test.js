const GameBoard = require('../src/GameBoard');

describe('GameBoard', () => {
  let game;

  beforeEach(() => {
    game = new GameBoard(5, 5);
  });

  test('should initialize the board with correct symbols', () => {
    expect(game.board.length).toBe(5);
    expect(game.board[0].length).toBe(5);

    const flatBoard = game.board.flat();
    const startCount = flatBoard.filter(cell => cell === 'A').length;
    const stopCount = flatBoard.filter(cell => cell === 'B').length;

    expect(startCount).toBe(1);
    expect(stopCount).toBe(1);
  });

  test('should place obstacles represented as ⬛', () => {
    const obstacleCount = game.board.flat().filter(cell => cell === 'X').length;
    expect(obstacleCount).toBeGreaterThan(0);
  });

  test('should move player to the right', () => {
    const { x, y } = game.currentPosition;

    if (!game.isOutOfBounds(x, y + 1) && game.board[x][y + 1] !== 'X') {
      const reachedStop = game.moveRight();
      expect(game.currentPosition).toEqual({ x, y: y + 1 });
      expect(reachedStop).toBe(false);
    }
  });

  test('should move player down', () => {
    const { x, y } = game.currentPosition;

    if (!game.isOutOfBounds(x + 1, y) && game.board[x + 1][y] !== 'X') {
      const reachedStop = game.moveDown();
      expect(game.currentPosition).toEqual({ x: x + 1, y });
      expect(reachedStop).toBe(false);
    }
  });

  test('should move player up', () => {
    const { x, y } = game.currentPosition;
    game.currentPosition = { x: x + 1, y };

    if (!game.isOutOfBounds(x, y) && game.board[x][y] !== 'X') {
      const reachedStop = game.moveUp();
      expect(game.currentPosition).toEqual({ x, y });
      expect(reachedStop).toBe(false);
    }
  });

  test('should move player to the left', () => {
    const { x, y } = game.currentPosition;
    game.currentPosition = { x, y: y + 1 };

    if (!game.isOutOfBounds(x, y) && game.board[x][y] !== 'X') {
      const reachedStop = game.moveLeft();
      expect(game.currentPosition).toEqual({ x, y });
      expect(reachedStop).toBe(false);
    }
  });

  test('should not allow player to move into obstacles', () => {
    const { x, y } = game.currentPosition;
    game.board[x][y + 1] = 'X';

    expect(game.moveRight()).toBe(false);
    expect(game.currentPosition).toEqual({ x, y });
  });

  test('should not allow player to move out of bounds', () => {
    game.currentPosition = { x: 0, y: 0 };

    expect(game.moveUp()).toBe(false);
    expect(game.moveLeft()).toBe(false);
    expect(game.currentPosition).toEqual({ x: 0, y: 0 });
  });

  test('should correctly identify when player reaches stop', () => {
    game.currentPosition = { ...game.stop };

    expect(game.moveRight()).toBe(false);
    expect(game.board[game.stop.x][game.stop.y]).toBe('B');
  });
});
