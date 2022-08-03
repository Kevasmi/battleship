import { cacheDOM } from './cacheDOM';
import { createGameboard } from './gameboardFactory';
import { renderVictory } from './renderDOM';

function randomCoordinate(array) {
  const index = parseInt(Math.floor(Math.random() * array.length));
  const coordinate = array[index];
  array.splice(index, 1);
  return coordinate;
}

const createPlayer = (name, isComputer) => ({
  name: name,
  isAComputer: isComputer,
  gameBoard: createGameboard(),
  // prettier-ignore
  dummyBoard: [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9], [0, 10],
  [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9], [1, 10],
  [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8], [2, 9], [2, 10],
  [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [3, 8], [3, 9], [3, 10],
  [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [4, 8], [4, 9], [4, 10],
  [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 7], [5, 8], [5, 9], [5, 10],
  [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8], [6, 9], [6, 10],
  [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8], [7, 9], [7, 10],
  [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8], [8, 9], [8, 10],
  [9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8], [9, 9], [9, 10],
],
  playerAttack(coordinate, enemy, cGrid) {
    enemy.gameBoard.receiveAttack(coordinate, cGrid, enemy.name);
    this.checkForVictory(enemy);
    enemy.computerAttack(this);
  },
  computerAttack(enemy) {
    try {
      const pGrid = cacheDOM().playerGrid;
      let coordinate = randomCoordinate(this.dummyBoard);
      let num = parseInt('' + coordinate[0] + coordinate[1]);
      if (coordinate[1] == 10) {
        num = Math.floor(num / 10) - 1;
      }
      enemy.gameBoard.receiveAttack(num, pGrid, enemy.name);
      this.checkForVictory(enemy);
    } catch (e) {
      console.error(e);
    }
  },
  checkForVictory(enemy) {
    if (enemy.gameBoard.allShipsSunk) {
      renderVictory(this.name);
    }
  },
});

export { createPlayer };
