import { createGameboard } from './gameboardFactory';
import { createPlayer } from './playerFactory';

describe('createPlayer function', () => {
  test('should return player object', () => {
    const gameBoard = createGameboard();

    const expectedPlayer = {
      name: 'Anonymous',
      gameBoard: gameBoard,
      isAComputer: false,
      playerAttack(coordinate, enemy) {
        enemy.board.receiveAttack(coordinate);
        this.nextRound();
      },
      computerAttack(enemy) {
        try {
          let coordinate = randomCoordinate();
          enemy.board.receiveAttack(coordinate);
        } catch {
          computerAttack();
        }
      },
      nextRound(enemy) {},
    };

    // console.log(createPlayer({ isComputer: true }));

    expect(JSON.stringify(createPlayer())).toStrictEqual(
      JSON.stringify(expectedPlayer)
    );
  });

  describe('playerAttack function', () => {
    test('should sucessfully update enemy board', () => {
      let player = createPlayer({ name: 'Richard' });
      let computer = createPlayer({ name: 'computer', isComputer: true });
      const expectedBoard = [
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ];
      const coordinate = [0, 1];

      player.playerAttack(coordinate, computer);

      expect(computer.gameBoard.board).toStrictEqual(expectedBoard);
    });
  });

  describe.skip('computerAttack function', () => {
    test('should sucessfully update enemy board', () => {
      let player = createPlayer({ name: 'Richard' });
      let computer = createPlayer({ name: 'computer', isComputer: true });
      const expectedBoard = [
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ];

      player.gameBoard.board = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      ];

      computer.computerAttack(player);
      console.log();

      expect(computer.gameBoard.board).toStrictEqual(expectedBoard);
    });
  });
});
