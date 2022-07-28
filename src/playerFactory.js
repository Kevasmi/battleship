import { createGameboard } from './gameboardFactory';

function randomCoordinate() {
  const array = [];
  const firstNum = Math.floor(Math.random() * 9);
  const secondNum = Math.floor(Math.random() * 10) + 1;
  array.push(firstNum, secondNum);
  return array;
}

const createPlayer = ({ name = 'Anonymous', isComputer = false } = {}) => ({
  name: name,
  isAComputer: isComputer,
  gameBoard: createGameboard(),
  dummyBoard: createGameboard().board,
  playerAttack(coordinate, enemy) {
    enemy.gameBoard.receiveAttack(coordinate);
    enemy.computerAttack(this);
  },
  computerAttack(enemy) {
    try {
      let coordinate = randomCoordinate();
      enemy.gameBoard.receiveAttack(coordinate);
    } catch (e) {
      console.error(e);
      this.computerAttack();
    }
  },
});

export { createPlayer };
