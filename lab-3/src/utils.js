const isAdjacent = (pos1, pos2) => (
   Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y) === 1
);

const randomPosition = (rows, cols) => ({
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * cols),
});

module.exports = { isAdjacent, randomPosition };
