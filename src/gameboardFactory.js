function convertCoordinate(coordinate) {
  const num = parseInt('' + coordinate[0] + coordinate[1]);
  return num;
}

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
        const nodeIndex = convertCoordinate(coordinates[0]);
        // Checks if a ship is already placed on location and what orientation it's on
        if (this.board[row][column] == 0 && isHorizontal === true) {
          // Checks if a ship will be placed out of bounds of grid
          if (ship.shipLength + (column + 1) <= (row + 1) * 10) {
            ship.location = coordinates;
            this.board[row][column] = 1;
          } else {
            throw new Error('Outside of grid!(H)');
          }
          // Checks if a ship is already placed on location and what orientation it's on
        } else if (this.board[row][column] == 0 && isHorizontal === false) {
          // Checks if a ship will be placed out of bounds of grid
          if ((ship.shipLength - 1) * 10 + nodeIndex <= 100) {
            ship.location = coordinates;
            this.board[row][column] = 1;
          } else {
            throw new Error('Outside of grid!(V)');
          }
        } else {
          throw new Error('Invalid coordinates!');
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
      this.areAllShipsSunk();
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
      this.shipsOnBoard.forEach((ship) => {
        if (ship.shipSunk === false) {
          return;
        } else {
          this.allShipsSunk = true;
        }
      });
    },
  };
};

export { createGameboard };
