const createShip = (length, array) => {
  return {
    shipLength: length,
    shipSunk: false,
    // shipPosition: array,

    whereHit: [],
    hit(coordinate) {
      try {
        if (Array.isArray(coordinate)) {
          this.whereHit.push(coordinate);
          if (this.whereHit.length == this.shipLength) {
            this.isSunk();
          }
        } else {
          throw Error('Coordinate is not valid!');
        }
      } catch (e) {
        console.error(e);
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
