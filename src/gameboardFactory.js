import {
  addHitClass,
  addMissClass,
  addShipClass,
  removeShipClass,
} from './classAdders';

function convertCoordinate(coordinate) {
  let num = parseInt('' + coordinate[0] + coordinate[1]);
  return num;
}

function convertIndex(index) {
  if (index < 10) {
    return [0, index];
  } else {
    let arr = index.toString().split('');
    return arr.map(Number);
  }
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
    placeShip(coordinates, ship, isHorizontal, index, target) {
      for (let i = 0; i < ship.shipLength; i++) {
        const nodeIndex = convertCoordinate(coordinates[0]);
        // Checks if a ship is already placed on location and what orientation it's on
        //prettier-ignore
        if (this.board[coordinates[i][0]][coordinates[i][1]] == 0 && isHorizontal === true) {
          // Checks if a ship will be placed out of bounds of grid
          //prettier-ignore
          if (ship.shipLength + (coordinates[0][1]) <= (coordinates[0][0] + 1) * 10) {
            addShipClass(index + i, target)
            // Pushes in current coordinate into ships location array
            ship.location.push(coordinates[i]);
            this.board[coordinates[i][0]][coordinates[i][1]] = 1;
          } else {
            throw new Error('Outside of grid!(H)');
          }
        // Checks if a ship is already placed on location and what orientation it's on
        //prettier-ignore
        } else if (this.board[coordinates[i][0]][coordinates[i][1]] == 0 && isHorizontal === false) {
          // Checks if a ship will be placed out of bounds of grid
          if ((ship.shipLength - 1) * 10 + nodeIndex <= 100) {
            addShipClass(index + (i * 10), target)
            // Pushes in current coordinate into ships location array
            ship.location.push(coordinates[i]);
            this.board[coordinates[i][0]][coordinates[i][1]] = 1;
          } else {
            throw new Error('Outside of grid!(V)');
          }
        } else {
          throw new Error('Invalid coordinates!(E)');
        }
      }
      this.shipsOnBoard.push(ship);
    },
    receiveAttack(point, target, name) {
      let index = point;
      if (!Array.isArray(point)) {
        point = convertIndex(point);
      }
      // Checks if the board position hit has a ship located on it
      if (this.board[point[0]][point[1]] === 1) {
        this.board[point[0]][point[1]] = 2;
        // Finds the hit ship
        const ship = this.findShip(point);
        // Runs the hit function with the found ship
        ship.hit(point);
        removeShipClass(index, target);
        addHitClass(index, target);
      } else if (this.board[point[0]][point[1]] === 0) {
        this.board[point[0]][point[1]] = 3;
        this.missedAttacks.push(point);
        addMissClass(index, target);
      } else {
        throw new Error('Invalid coordinates!');
      }
      this.areAllShipsSunk(name);
    },
    findShip(coordinate) {
      // Initializes variable out of array on gameBoard object that contains all ship objects on board
      const ships = this.shipsOnBoard;
      // Loops through all ship objects in ships variable to see if matching coordinate pair is found
      for (let i = 0; i < ships.length; i++) {
        // ships.forEach((ship, i) => {
        // Initializes variable that contains an array of coordinates pairs of where current ship is on the board
        const locationArray = ships[i].location;
        // Makes a filtered array out of location that checks for a matching coordinate pair to parameter
        const filteredArray = locationArray.filter(
          (point) => point[0] == coordinate[0] && point[1] == coordinate[1]
        );
        // Checks if filteredArray has found a matching coordinate pair and reutrns corresponding ship
        if (filteredArray.length !== 0) {
          return ships[i];
        }
      }
    },
    areAllShipsSunk() {
      this.shipsOnBoard.forEach((ship, i) => {
        if (ship.shipSunk === true) {
          this.shipsOnBoard.splice(i, 1);
        }
        if (this.shipsOnBoard.length === 0) {
          this.allShipsSunk = true;
        }
      });
    },
  };
};

export { createGameboard };
