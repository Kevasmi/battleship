const createGameboard = () => {
  return {
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
        if (this.board[row][column] == 1) {
          throw new Error('Invalid coordinates!');
        } else {
          ship.location = coordinates;
          this.board[row][column] = 1;
        }
      }
      this.shipsOnBoard.push(ship);
    },
    receiveAttack(coordinate) {
      const row = coordinate[0];
      const column = coordinate[1] - 1;
      const ship = this.findShip(coordinate);
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
      let returnedShip = null;
      ships.forEach((ship, i) => {
        const array = ship.location;
        const filteredArray = array.filter(
          (point) => point[0] == row && point[1] == column
        );
        if (filteredArray[0][0] == row && filteredArray[0][1] == column) {
          returnedShip = ship;
          ships.length = i + 1;
        }
      });
      return returnedShip;
    },
    areAllShipsSunk() {
      this.allShipsSunk = true;
    },
  };
};

export { createGameboard };
