const createShip = (length, array) => {
  return {
    shipLength: length,
    shipSunk: false,
    // shipPosition: array,

    whereHit: [],
    hit(coordinate) {
      this.whereHit.push(coordinate);
      if (this.whereHit.length == this.shipLength) {
        this.isSunk();
      }
    },
    isSunk() {
      this.shipSunk = true;
    },
  };
};

export { createShip };
