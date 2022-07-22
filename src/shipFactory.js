const createShip = (length, array) => {
  return {
    shipLength: length,
    shipSunk: false,
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
};

export { createShip };
