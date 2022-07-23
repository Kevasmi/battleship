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
          this.board[row][column] = 1;
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
        this.missedAttacks.push(coordinate);
      }
    },
    areAllShipsSunk() {
      this.allShipsSunk = true;
    },
  };
};

export { createGameboard };
