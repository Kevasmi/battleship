import { createGameboard } from './gameboardFactory';

function randomCoordinate() {
  const array = [];
  for (let i = 0; i < 2; i++) {
    const randomNum = Math.floor(Math.random() * 9);
    randomCoordinate.push(randomNum);
  }
  return array;
}

function createPlayer(name, isComputer) {
  return {
    name: name,
    board: createGameboard(),
    makeAttack(coordinate) {
      if (isComputer === true) {
        this.computerAttack();
      } else {
        this.board.receiveAttack(coordinate);
      }
    },
    computerAttack() {
      try {
        let coordinate = randomCoordinate();
        this.board.receiveAttack(coordinate);
      } catch {
        computerAttack();
      }
    },
    nextRound() {},
  };
}

export { createPlayer };
