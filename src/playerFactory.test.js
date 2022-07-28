import { createGameboard } from './gameboardFactory';
import { createPlayer } from './playerFactory';

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.001;
global.Math = mockMath;

describe('createPlayer function', () => {
  test('should return player object', () => {
    const expectedPlayer = {
      name: 'Anonymous',
      isAComputer: false,
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
          console.log(e);
          this.computerAttack();
        }
      },
    };

    expect(JSON.stringify(createPlayer())).toStrictEqual(
      JSON.stringify(expectedPlayer)
    );
  });

  describe('playerAttack function', () => {
    test('should sucessfully update enemy board', () => {
      let player = createPlayer({ name: 'Richard' });
      let computer = createPlayer({ name: 'computer', isComputer: true });
      const expectedComputerBoard = [
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
      const expectedPlayerBoard = [
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

      expect(computer.gameBoard.board).toStrictEqual(expectedComputerBoard);
      expect(player.gameBoard.board).toStrictEqual(expectedPlayerBoard);
    });
  });

  describe('computerAttack function', () => {
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

      computer.computerAttack(player);

      expect(player.gameBoard.board).toStrictEqual(expectedBoard);
    });
  });
});
