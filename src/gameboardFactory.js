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
    numOfShips: 5,
    allShipsSunk: false,
    placeShip(coordinates, shipLength) {
      for (let i = 0; i < shipLength; i++) {
        const row = coordinates[i][0] - 1;
        const column = coordinates[i][1] - 1;
        if (this.board[row][column] == 1) {
          throw new Error('Invalid coordinates!');
          console.log(this.board);
        } else {
          this.board[row][column] = 1;
        }
      }
    },
    receiveAttack(coordiante) {},
    areAllShipsSunk() {
      this.allShipsSunk = true;
    },
  };
};

export { createGameboard };
