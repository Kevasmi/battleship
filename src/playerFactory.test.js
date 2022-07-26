import { createGameboard } from './gameboardFactory';
import { createPlayer } from './playerFactory';

describe.only('createPlayer function', () => {
  test('should return player object', () => {
    const gameBoard = createGameboard();

    const expectedPlayer = {
      name: 'Richard',
      board: gameBoard,
      isAComputer: false,
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

    console.log(createPlayer('Richard', false));

    expect(JSON.stringify(createPlayer('Richard', false))).toStrictEqual(
      JSON.stringify(expectedPlayer)
    );
  });
});
