import { createShip } from './shipFactory.js';

let testShip = createShip(4, 'battleship');

describe('createShip function', () => {
  test('should return ship object', () => {
    const expected = {
      shipName: 'battleship',
      shipLength: 4,
      shipSunk: false,
      location: [],
      whereHit: [],
      hit(coordinate) {
        if (Array.isArray(coordinate)) {
          this.whereHit.push(coordinate);
          if (this.whereHit.length == this.shipLength) {
            this.isSunk();
          }
        } else {
          throw new Error('Coordinate is not valid!');
        }
      },
      isSunk() {
        if (this.whereHit.length == this.shipLength) {
          this.shipSunk = true;
        }
      },
    };

    expect(JSON.stringify(createShip(4, 'battleship'))).toStrictEqual(
      JSON.stringify(expected)
    );
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
      shipName: 'battleship',
      shipLength: 4,
      shipSunk: false,
      location: [],
      whereHit: [
        [1, 1],
        [1, 2],
        [1, 3],
      ],
      hit(coordinate) {
        if (Array.isArray(coordinate)) {
          this.whereHit.push(coordinate);
          if (this.whereHit.length == this.shipLength) {
            this.isSunk();
          }
        } else {
          throw new Error('Coordinate is not valid!');
        }
      },
      isSunk() {
        if (this.whereHit.length == this.shipLength) {
          this.shipSunk = true;
        }
      },
    };

    testShip.whereHit = [
      [1, 1],
      [1, 2],
    ];

    testShip.hit([1, 3]);

    expect(JSON.stringify(testShip)).toStrictEqual(
      JSON.stringify(expectedShip)
    );
  });

  test('runs when whereHit length is equal to shipLength', () => {
    const expectedShip = {
      shipName: 'battleship',
      shipLength: 4,
      shipSunk: true,
      location: [],
      whereHit: [
        [1, 1],
        [1, 2],
        [1, 3],
        [1, 4],
      ],
      hit(coordinate) {
        if (Array.isArray(coordinate)) {
          this.whereHit.push(coordinate);
          if (this.whereHit.length == this.shipLength) {
            this.isSunk();
          }
        } else {
          throw new Error('Coordinate is not valid!');
        }
      },
      isSunk() {
        if (this.whereHit.length == this.shipLength) {
          this.shipSunk = true;
        }
      },
    };

    testShip.whereHit = [
      [1, 1],
      [1, 2],
      [1, 3],
    ];

    testShip.hit([1, 4]);

    expect(JSON.stringify(testShip)).toStrictEqual(
      JSON.stringify(expectedShip)
    );
  });
});
