const createShip = (length, name) => {
  return {
    shipName: name,
    shipLength: length,
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
};

export { createShip };
