import { createGameboard } from './gameboardFactory';

function randomCoordinate() {
  const array = [];
  const firstNum = Math.floor(Math.random * 9);
  const secondNum = Math.floor(Math.random * 10);
  array.push(firstNum, secondNum);
  return array;
}

const createPlayer = ({ name = 'Anonymous', isComputer = false } = {}) => ({
  name: name,
  gameBoard: createGameboard(),
  isAComputer: isComputer,
  playerAttack(coordinate, enemy) {
    enemy.gameBoard.receiveAttack(coordinate);
  },
  computerAttack(enemy) {
    try {
      let coordinate = randomCoordinate();
      enemy.board.receiveAttack(coordinate);
    } catch (e) {
      console.error(e);
      this.computerAttack();
    }
  },
  nextRound() {},
});

export { createPlayer };
