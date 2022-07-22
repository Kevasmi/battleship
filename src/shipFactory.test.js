import { createShip } from './shipFactory.js';

let testShip = createShip(4, 'battleship');

describe('createShip function', () => {
  test('should return ship object', () => {
    const expected = {
      shipName: 'battleship',
      shipLength: 4,
      shipSunk: false,
      whereHit: [],
    };

    expect(createShip(4, 'battleship')).toMatchObject(expected);
  });
});

describe('hit function', () => {
  test('should add coordinate to whereHit array', () => {
    const expectedArray = [[1, 1]];

    testShip.hit([1, 1]);

    expect(testShip.whereHit).toStrictEqual(expectedArray);
  });

  test('should throw error if cooridnate is not an array', () => {
    expect(() => {
      testShip.hit('hello');
    }).toThrowError('Coordinate is not valid!');
  });
});

describe('isSunk function', () => {
  test('does not run when whereHit length is != to shipLength', () => {
    const expectedShip = {
      shipLength: 4,
      shipSunk: false,
      whereHit: [
        [1, 1],
        [1, 2],
        [1, 3],
      ],
    };

    testShip.whereHit = [
      [1, 1],
      [1, 2],
    ];

    testShip.hit([1, 3]);

    expect(testShip).toMatchObject(expectedShip);
  });

  test('runs when whereHit length is equal to shipLength', () => {
    const expectedShip = {
      shipLength: 4,
      shipSunk: true,
      whereHit: [
        [1, 1],
        [1, 2],
        [1, 3],
        [1, 4],
      ],
    };

    testShip.whereHit = [
      [1, 1],
      [1, 2],
      [1, 3],
    ];

    testShip.hit([1, 4]);

    expect(testShip).toMatchObject(expectedShip);
  });
});
