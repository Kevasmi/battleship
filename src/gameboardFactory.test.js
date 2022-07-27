import { createGameboard } from './gameboardFactory';
import { createShip } from './shipFactory';

let testBoard = createGameboard();
let testShip = createShip(4, 'battleship');

describe('createGameboard function', () => {
  test('should return a gameBoard object', () => {
    const expectedBoard = {
      board: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
      missedAttacks: [],
      shipsOnBoard: [],
      numOfShips: 5,
      allShipsSunk: false,
      placeShip(coordinates, ship, isHorizontal) {
        for (let i = 0; i < ship.shipLength; i++) {
          const row = coordinates[i][0];
          const column = coordinates[i][1] - 1;
          const nodeIndex = convertCoordinate(coordinates[0]);
          console.log(isHorizontal);
          console.log(i);
          // Checks if a ship is already placed on location and what orientation it's on
          if (this.board[row][column] == 0 && isHorizontal === true) {
            // Checks if a ship will be placed out of bounds of grid
            if (ship.shipLength + (column + 1) < (row + 1) * 10) {
              console.log(i + 'H');

              ship.location = coordinates;
              this.board[row][column] = 1;
            } else {
              console.log(i + 'H');

              throw new Error('Outside of grid!(H) ' + i);
            }
            // Checks if a ship is already placed on location and what orientation it's on
          } else if (this.board[row][column] == 0 && isHorizontal === false) {
            // Checks if a ship will be placed out of bounds of grid
            if ((ship.shipLength - 1) * 10 + nodeIndex < 100) {
              console.log(i + 'V');

              ship.location = coordinates;
              this.board[row][column] = 1;
            } else {
              console.log(i + 'V');

              throw new Error('Outside of grid!(V) ' + i);
            }
          } else {
            throw new Error('Invalid coordinates!');
          }
        }
        this.shipsOnBoard.push(ship);
      },
      receiveAttack(coordinate, ship) {
        const row = coordinate[0];
        const column = coordinate[1] - 1;
        if (this.board[row][column] == 1) {
          this.board[row][column] = 2;
          ship.hit(coordinate);
        } else {
          this.board[row][column] = 3;
          this.missedAttacks.push(coordinate);
        }
      },
      findShip(coordinate) {
        const row = coordinate[0];
        const column = coordinate[1];
        const ships = this.shipsOnBoard;
        ships.foreach((ship, i) => {
          if (ship.location[i][0] == row && ship.location[i][1] == column) {
            return ship;
          }
        });
      },
      areAllShipsSunk() {
        this.allShipsSunk = true;
      },
    };

    expect(JSON.stringify(testBoard)).toStrictEqual(
      JSON.stringify(expectedBoard)
    );
  });
});

describe('placeShip function', () => {
  describe('should populate', () => {
    test('shipsOnBoard array on success with ship object', () => {
      const expectedShip = createShip(4, 'battleship');
      const coordinates = [
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
      ];

      testBoard.placeShip(coordinates, expectedShip, true);

      expect(testBoard.shipsOnBoard).toContainEqual(expectedShip);
    });

    test('location array on success with coordinates', () => {
      let testBoard = createGameboard();
      const coordinates = [
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
      ];

      testBoard.placeShip(coordinates, testShip, true);

      expect(testShip.location).toStrictEqual(coordinates);
    });
  });

  describe('should place ship on board array', () => {
    describe('horizontally', () => {
      test('successfully', () => {
        const expectedBoard = [
          [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
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
        const coordinates = [
          [0, 1],
          [0, 2],
          [0, 3],
          [0, 4],
        ];

        testBoard.board = [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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

        testBoard.placeShip(coordinates, testShip, true);

        expect(testBoard.board).toStrictEqual(expectedBoard);
      });

      test('unsucessfully', () => {
        const coordinates = [
          [0, 9],
          [0, 10],
          [0, 11],
        ];
        let errorShip = createShip(3, 'submarine');

        testBoard.board = [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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

        expect(() => {
          testBoard.placeShip(coordinates, errorShip, true);
        }).toThrowError('Outside of grid!(H)');
      });
    });
    describe('vertically', () => {
      test('successfully', () => {
        const expectedBoard = [
          [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
        const coordinates = [
          [0, 1],
          [1, 1],
          [2, 1],
          [3, 1],
        ];

        testBoard.board = [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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

        testBoard.placeShip(coordinates, testShip, false);

        expect(testBoard.board).toStrictEqual(expectedBoard);
      });

      test('unsucessfully', () => {
        const coordinates = [
          [9, 1],
          [10, 1],
          [11, 1],
        ];
        let errorShip = createShip(3, 'submarine');

        expect(() => {
          testBoard.placeShip(coordinates, errorShip, false);
        }).toThrowError('Outside of grid!(V)');
      });
    });
  });

  test('should not place a ship on board positions already filled with ships', () => {
    const coordinates = [
      [0, 4],
      [0, 5],
      [0, 6],
      [0, 7],
    ];

    testBoard.board = [
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
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

    expect(() => {
      testBoard.placeShip(coordinates, testShip, true);
    }).toThrowError('Invalid coordinates!');
  });

  test('should sucessfully run 5 times in a row with correct output', () => {
    let carrier = createShip(5, 'carrier');
    let battleship = createShip(4, 'battleship');
    let destroyer = createShip(3, 'destroyer');
    let submarine = createShip(3, 'submarine');
    let patrolBoat = createShip(2, 'patrol Boat');
    let arrayOfShips = [carrier, battleship, destroyer, submarine, patrolBoat];
    const expectedBoard = {
      board: [
        [1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
      ],
      missedAttacks: [],
      shipsOnBoard: [carrier, battleship, destroyer, submarine, patrolBoat],
      numOfShips: 5,
      allShipsSunk: false,
      placeShip(coordinates, ship, isHorizontal) {
        for (let i = 0; i < ship.shipLength; i++) {
          const row = coordinates[i][0];
          const column = coordinates[i][1] - 1;
          const nodeIndex = convertCoordinate(coordinates[0]);
          console.log(isHorizontal);
          console.log(i);
          // Checks if a ship is already placed on location and what orientation it's on
          if (this.board[row][column] == 0 && isHorizontal === true) {
            // Checks if a ship will be placed out of bounds of grid
            if (ship.shipLength + (column + 1) < (row + 1) * 10) {
              console.log(i + 'H');

              ship.location = coordinates;
              this.board[row][column] = 1;
            } else {
              console.log(i + 'H');

              throw new Error('Outside of grid!(H) ' + i);
            }
            // Checks if a ship is already placed on location and what orientation it's on
          } else if (this.board[row][column] == 0 && isHorizontal === false) {
            // Checks if a ship will be placed out of bounds of grid
            if ((ship.shipLength - 1) * 10 + nodeIndex < 100) {
              console.log(i + 'V');

              ship.location = coordinates;
              this.board[row][column] = 1;
            } else {
              console.log(i + 'V');

              throw new Error('Outside of grid!(V) ' + i);
            }
          } else {
            throw new Error('Invalid coordinates!');
          }
        }
        this.shipsOnBoard.push(ship);
      },
      receiveAttack(coordinate, ship) {
        const row = coordinate[0];
        const column = coordinate[1] - 1;
        if (this.board[row][column] == 1) {
          this.board[row][column] = 2;
          ship.hit(coordinate);
        } else {
          this.board[row][column] = 3;
          this.missedAttacks.push(coordinate);
        }
      },
      findShip(coordinate) {
        const row = coordinate[0];
        const column = coordinate[1];
        const ships = this.shipsOnBoard;
        ships.foreach((ship, i) => {
          if (ship.location[i][0] == row && ship.location[i][1] == column) {
            return ship;
          }
        });
      },
      areAllShipsSunk() {
        this.allShipsSunk = true;
      },
    };

    let testBoard = createGameboard();
    const coordinates = [
      [
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
        [0, 5],
      ],
      [
        [1, 1],
        [2, 1],
        [3, 1],
        [4, 1],
      ],
      [
        [6, 6],
        [6, 7],
        [6, 8],
      ],
      [
        [9, 8],
        [9, 9],
        [9, 10],
      ],
      [
        [8, 1],
        [9, 1],
      ],
    ];
    const orientationArray = [true, false, true, true, false];

    for (let i = 0; i < 5; i++) {
      testBoard.placeShip(coordinates[i], arrayOfShips[i], orientationArray[i]);
    }

    expect(JSON.stringify(testBoard)).toStrictEqual(
      JSON.stringify(expectedBoard)
    );
  });
});

describe('receiveAttack function', () => {
  test('should determine whether or not an attack hit a ship', () => {
    let carrier = createShip(5, 'carrier');
    let battleship = createShip(4, 'battleship');
    let destroyer = createShip(3, 'destroyer');
    let submarine = createShip(3, 'submarine');
    let patrolBoat = createShip(2, 'patrol Boat');

    carrier.location = [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
    ];
    battleship.location = [
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 1],
    ];
    destroyer.location = [
      [6, 6],
      [6, 7],
      [6, 8],
    ];
    submarine.location = [
      [9, 8],
      [9, 9],
      [9, 10],
    ];
    patrolBoat.location = [
      [8, 1],
      [9, 1],
    ];

    const expectedBoard = [
      [2, 1, 1, 1, 0, 0, 0, 0, 0, 0],
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

    testBoard.board = [
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
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

    testBoard.shipsOnBoard = [
      carrier,
      battleship,
      destroyer,
      submarine,
      patrolBoat,
    ];

    const coordinate = [0, 1];

    testBoard.receiveAttack(coordinate);

    expect(testBoard.board).toStrictEqual(expectedBoard);
  });

  test('should populate missedAttacks array if attack does not hit a ship', () => {
    const expectedArray = [[0, 5]];

    testBoard.board = [
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
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

    const coordinate = [0, 5];

    testBoard.receiveAttack(coordinate);

    expect(testBoard.missedAttacks).toStrictEqual(expectedArray);
  });

  test('should correctly update board if attack does not hit ship', () => {
    const expectedBoard = [
      [1, 1, 1, 1, 3, 0, 0, 0, 0, 0],
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

    testBoard.board = [
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
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

    const coordinate = [0, 5];

    testBoard.receiveAttack(coordinate, testShip);

    expect(testBoard.board).toStrictEqual(expectedBoard);
  });
});

describe('findShip function', () => {
  test('should return a matching ship object', () => {
    let testBoard = createGameboard();
    const expectedShip = createShip(4, 'battleship');
    const coordinates = [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
    ];

    testBoard.placeShip(coordinates, expectedShip, true);
    testBoard.board = [
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
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

    expect(JSON.stringify(testBoard.findShip(coordinates[0]))).toStrictEqual(
      JSON.stringify(expectedShip)
    );
  });
});

describe('areAllShipsSunk function', () => {
  test('should change boolean value on truthy value in conditional', () => {
    let testBoard = createGameboard();
    let testShip = createShip(4, 'battleship');
    const coordinates = [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
    ];

    testBoard.placeShip(coordinates, testShip, true);
    testShip.shipSunk = true;
    testBoard.areAllShipsSunk();
    expect(testBoard.allShipsSunk).toBe(true);
  });

  test('should not change boolean value on falsey value in conditional', () => {
    let testBoard = createGameboard();
    let testShip = createShip(4, 'battleship');
    const coordinates = [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
    ];

    testBoard.placeShip(coordinates, testShip, true);
    testShip.shipSunk = false;
    testBoard.areAllShipsSunk();
    expect(testBoard.allShipsSunk).toBe(false);
  });
});
