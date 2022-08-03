/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/bindEvents.js":
/*!***************************!*\
  !*** ./src/bindEvents.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bindAttackEvent": () => (/* binding */ bindAttackEvent),
/* harmony export */   "bindEventsOnRender": () => (/* binding */ bindEventsOnRender),
/* harmony export */   "bindSubmitEvent": () => (/* binding */ bindSubmitEvent)
/* harmony export */ });
/* harmony import */ var _cacheDOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cacheDOM */ "./src/cacheDOM.js");
/* harmony import */ var _classAdders__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classAdders */ "./src/classAdders.js");
/* harmony import */ var _playerFactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./playerFactory */ "./src/playerFactory.js");
/* harmony import */ var _shipFactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shipFactory */ "./src/shipFactory.js");




var count = 0;
var shipArray = [(0,_shipFactory__WEBPACK_IMPORTED_MODULE_3__.createShip)(5, 'Carrier'), (0,_shipFactory__WEBPACK_IMPORTED_MODULE_3__.createShip)(4, 'Battleship'), (0,_shipFactory__WEBPACK_IMPORTED_MODULE_3__.createShip)(3, 'Destroyer'), (0,_shipFactory__WEBPACK_IMPORTED_MODULE_3__.createShip)(3, 'Submarine'), (0,_shipFactory__WEBPACK_IMPORTED_MODULE_3__.createShip)(2, 'Patrol Boat')];

function convertIndex(index) {
  if (index < 10) {
    return [0, index];
  } else {
    var arr = index.toString().split('');
    return arr.map(Number);
  }
}

function createCoordinates(coordinate, ship, isHorizontal, index) {
  var coordinateArray = []; // prettier-ignore

  if (isHorizontal === true && index + ship.shipLength <= (coordinate[0] + 1) * 10) {
    for (var i = coordinate[1]; i < ship.shipLength + coordinate[1]; i++) {
      coordinateArray.push([coordinate[0], i]);
    }
  } else if (isHorizontal === false && (ship.shipLength - 1) * 10 + index < 100) {
    for (var _i = coordinate[0]; _i < ship.shipLength + coordinate[0]; _i++) {
      coordinateArray.push([_i, coordinate[1]]);
    }
  } else {
    throw new Error('Invalid placement!');
  }

  return coordinateArray;
}

function bindAttackEvent(player, computer) {
  var cache = (0,_cacheDOM__WEBPACK_IMPORTED_MODULE_0__.cacheDOM)();
  var cGrid = cache.computerGrid;
  cGrid.forEach(function (square, index) {
    square.addEventListener('click', function () {
      //
      player.playerAttack(index, computer, cGrid);
    });
  });
}

function bindEventsOnRender(player, computer, isHorizontal) {
  var cache = (0,_cacheDOM__WEBPACK_IMPORTED_MODULE_0__.cacheDOM)();
  var pGrid = cache.playerGrid;
  var button = document.querySelector('.orientation');
  button.addEventListener('click', function () {
    if (button.textContent == 'Horizontal') {
      button.textContent = 'Vertical';
      isHorizontal = false;
    } else {
      button.textContent = 'Horizontal';
      isHorizontal = true;
    }
  });
  pGrid.forEach(function (square, index) {
    square.addEventListener('mouseover', function (e) {
      var coordinate = convertIndex(index); // prettier-ignore

      if (isHorizontal === true && index + shipArray[count].shipLength <= (coordinate[0] + 1) * 10) {
        for (var i = index; i < index + shipArray[count].shipLength; i++) {
          (0,_classAdders__WEBPACK_IMPORTED_MODULE_1__.addHoverClass)(i, pGrid);
        }
      } else if (isHorizontal === false && (shipArray[count].shipLength - 1) * 10 + index < 100) {
        for (var _i2 = index; _i2 <= index + (shipArray[count].shipLength - 1) * 10; _i2 = _i2 + 10) {
          (0,_classAdders__WEBPACK_IMPORTED_MODULE_1__.addHoverClass)(_i2, pGrid);
        }
      }
    });
  });
  pGrid.forEach(function (square, index) {
    square.addEventListener('mouseout', function (e) {
      for (var i = index; i < index + shipArray[count].shipLength + 1; i++) {
        (0,_classAdders__WEBPACK_IMPORTED_MODULE_1__.removeHoverClass)(i, pGrid);
      } // prettier-ignore


      for (var _i3 = index; _i3 <= index + (shipArray[count].shipLength - 1) * 10; _i3 = _i3 + 10) {
        (0,_classAdders__WEBPACK_IMPORTED_MODULE_1__.removeHoverClass)(_i3, pGrid);
      }
    });
  });
  pGrid.forEach(function (square, index) {
    square.addEventListener('click', function () {
      if (isHorizontal) {
        for (var i = index; i < index + shipArray[count].shipLength + 1; i++) {
          (0,_classAdders__WEBPACK_IMPORTED_MODULE_1__.removeHoverClass)(i, pGrid);
        }
      } else {
        // prettier-ignore
        for (var _i4 = index; _i4 <= index + (shipArray[count].shipLength - 1) * 10; _i4 = _i4 + 10) {
          (0,_classAdders__WEBPACK_IMPORTED_MODULE_1__.removeHoverClass)(_i4, pGrid);
        }
      }

      var coordinate = convertIndex(index);
      var coordinates = createCoordinates(coordinate, shipArray[count], isHorizontal, index);
      player.gameBoard.placeShip(coordinates, shipArray[count], isHorizontal, index, pGrid);
      count++;

      if (count === 5) {
        (0,_classAdders__WEBPACK_IMPORTED_MODULE_1__.removeHoverClass)(index, pGrid);

        if (isHorizontal) {
          (0,_classAdders__WEBPACK_IMPORTED_MODULE_1__.removeHoverClass)(index + 1, pGrid);
        } else {
          (0,_classAdders__WEBPACK_IMPORTED_MODULE_1__.removeHoverClass)(index + 10, pGrid);
        }

        var oldGrid = document.querySelector('.player-side > .grid-container');
        var newGrid = oldGrid.cloneNode(true);
        oldGrid.parentNode.replaceChild(newGrid, oldGrid);
        bindAttackEvent(player, computer);
      }
    });
  });
}

function bindSubmitEvent(computer, isHorizontal) {
  var input = document.getElementById('name');
  var form = document.querySelector('form');
  var modalContainer = document.querySelector('.modal-container');
  var modal = document.querySelector('.modal');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = input.value;
    modalContainer.classList.remove('show');

    while (modal.firstChild) {
      modal.removeChild(modal.lastChild);
    }

    var player = (0,_playerFactory__WEBPACK_IMPORTED_MODULE_2__.createPlayer)(name);
    bindEventsOnRender(player, computer, isHorizontal);
  });
}



/***/ }),

/***/ "./src/cacheDOM.js":
/*!*************************!*\
  !*** ./src/cacheDOM.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cacheDOM": () => (/* binding */ cacheDOM)
/* harmony export */ });
function cacheDOM() {
  var buttonContainer = document.querySelector('.game-buttons');
  var playerSide = document.querySelector('.player-side');
  var computerSide = document.querySelector('.computer-side');
  var computerGrid = document.querySelectorAll('.computer-side > .grid-container > .grid-square');
  var playerGrid = document.querySelectorAll('.player-side > .grid-container > .grid-square');
  return {
    buttonContainer: buttonContainer,
    playerSide: playerSide,
    computerSide: computerSide,
    computerGrid: computerGrid,
    playerGrid: playerGrid
  };
}



/***/ }),

/***/ "./src/classAdders.js":
/*!****************************!*\
  !*** ./src/classAdders.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addHitClass": () => (/* binding */ addHitClass),
/* harmony export */   "addHoverClass": () => (/* binding */ addHoverClass),
/* harmony export */   "addMissClass": () => (/* binding */ addMissClass),
/* harmony export */   "addShipClass": () => (/* binding */ addShipClass),
/* harmony export */   "removeHoverClass": () => (/* binding */ removeHoverClass),
/* harmony export */   "removeShipClass": () => (/* binding */ removeShipClass)
/* harmony export */ });
/* harmony import */ var _cacheDOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cacheDOM */ "./src/cacheDOM.js");

var cache = (0,_cacheDOM__WEBPACK_IMPORTED_MODULE_0__.cacheDOM)();

function addMissClass(index, target) {
  target[index].classList.add('miss');
}

function addHitClass(index, target) {
  target[index].classList.add('hit');
}

function addShipClass(index, target) {
  target[index].classList.add('ship');
}

function removeShipClass(index, target) {
  target[index].classList.remove('ship');
}

function addHoverClass(index, target) {
  target[index].classList.add('hover');
}

function removeHoverClass(index, target) {
  target[index].classList.remove('hover');
}



/***/ }),

/***/ "./src/gameboardFactory.js":
/*!*********************************!*\
  !*** ./src/gameboardFactory.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createGameboard": () => (/* binding */ createGameboard)
/* harmony export */ });
/* harmony import */ var _classAdders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classAdders */ "./src/classAdders.js");


function convertCoordinate(coordinate) {
  var num = parseInt('' + coordinate[0] + coordinate[1]);
  return num;
}

function convertIndex(index) {
  if (index < 10) {
    return [0, index];
  } else {
    var arr = index.toString().split('');
    return arr.map(Number);
  }
}

var createGameboard = function createGameboard() {
  return {
    board: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    missedAttacks: [],
    shipsOnBoard: [],
    numOfShips: 5,
    allShipsSunk: false,
    placeShip: function placeShip(coordinates, ship, isHorizontal, index, target) {
      for (var i = 0; i < ship.shipLength; i++) {
        var nodeIndex = convertCoordinate(coordinates[0]); // Checks if a ship is already placed on location and what orientation it's on
        //prettier-ignore

        if (this.board[coordinates[i][0]][coordinates[i][1]] == 0 && isHorizontal === true) {
          // Checks if a ship will be placed out of bounds of grid
          //prettier-ignore
          if (ship.shipLength + coordinates[0][1] <= (coordinates[0][0] + 1) * 10) {
            (0,_classAdders__WEBPACK_IMPORTED_MODULE_0__.addShipClass)(index + i, target); // Pushes in current coordinate into ships location array

            ship.location.push(coordinates[i]);
            this.board[coordinates[i][0]][coordinates[i][1]] = 1;
          } else {
            throw new Error('Outside of grid!(H)');
          } // Checks if a ship is already placed on location and what orientation it's on
          //prettier-ignore

        } else if (this.board[coordinates[i][0]][coordinates[i][1]] == 0 && isHorizontal === false) {
          // Checks if a ship will be placed out of bounds of grid
          if ((ship.shipLength - 1) * 10 + nodeIndex <= 100) {
            (0,_classAdders__WEBPACK_IMPORTED_MODULE_0__.addShipClass)(index + i * 10, target); // Pushes in current coordinate into ships location array

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
    receiveAttack: function receiveAttack(point, target, name) {
      var index = point;

      if (!Array.isArray(point)) {
        point = convertIndex(point);
      } // Checks if the board position hit has a ship located on it


      if (this.board[point[0]][point[1]] === 1) {
        this.board[point[0]][point[1]] = 2; // Finds the hit ship

        var ship = this.findShip(point); // Runs the hit function with the found ship

        ship.hit(point);
        (0,_classAdders__WEBPACK_IMPORTED_MODULE_0__.removeShipClass)(index, target);
        (0,_classAdders__WEBPACK_IMPORTED_MODULE_0__.addHitClass)(index, target);
      } else if (this.board[point[0]][point[1]] === 0) {
        this.board[point[0]][point[1]] = 3;
        this.missedAttacks.push(point);
        (0,_classAdders__WEBPACK_IMPORTED_MODULE_0__.addMissClass)(index, target);
      } else {
        throw new Error('Invalid coordinates!');
      }

      this.areAllShipsSunk(name);
    },
    findShip: function findShip(coordinate) {
      // Initializes variable out of array on gameBoard object that contains all ship objects on board
      var ships = this.shipsOnBoard; // Loops through all ship objects in ships variable to see if matching coordinate pair is found

      for (var i = 0; i < ships.length; i++) {
        // ships.forEach((ship, i) => {
        // Initializes variable that contains an array of coordinates pairs of where current ship is on the board
        var locationArray = ships[i].location; // Makes a filtered array out of location that checks for a matching coordinate pair to parameter

        var filteredArray = locationArray.filter(function (point) {
          return point[0] == coordinate[0] && point[1] == coordinate[1];
        }); // Checks if filteredArray has found a matching coordinate pair and reutrns corresponding ship

        if (filteredArray.length !== 0) {
          return ships[i];
        }
      }
    },
    areAllShipsSunk: function areAllShipsSunk() {
      var _this = this;

      this.shipsOnBoard.forEach(function (ship, i) {
        if (ship.shipSunk === true) {
          _this.shipsOnBoard.splice(i, 1);
        }

        if (_this.shipsOnBoard.length === 0) {
          _this.allShipsSunk = true;
        }
      });
    }
  };
};



/***/ }),

/***/ "./src/makeComputerPlayer.js":
/*!***********************************!*\
  !*** ./src/makeComputerPlayer.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "computerPlayerArray": () => (/* binding */ computerPlayerArray)
/* harmony export */ });
/* harmony import */ var _playerFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./playerFactory */ "./src/playerFactory.js");
/* harmony import */ var _shipFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shipFactory */ "./src/shipFactory.js");


var computerPlayerArray = [];
var computerPlayerOne = (0,_playerFactory__WEBPACK_IMPORTED_MODULE_0__.createPlayer)('Computer', true);
computerPlayerOne.gameBoard.board = [[1, 1, 1, 1, 1, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0, 1, 1, 1]];
computerPlayerOne.gameBoard.shipsOnBoard = [(0,_shipFactory__WEBPACK_IMPORTED_MODULE_1__.createShip)(5, 'Carrier'), (0,_shipFactory__WEBPACK_IMPORTED_MODULE_1__.createShip)(4, 'Battleship'), (0,_shipFactory__WEBPACK_IMPORTED_MODULE_1__.createShip)(3, 'Destroyer'), (0,_shipFactory__WEBPACK_IMPORTED_MODULE_1__.createShip)(3, 'Submarine'), (0,_shipFactory__WEBPACK_IMPORTED_MODULE_1__.createShip)(2, 'Patrol Boat')];
computerPlayerOne.gameBoard.shipsOnBoard[0].location = [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]];
computerPlayerOne.gameBoard.shipsOnBoard[1].location = [[1, 0], [2, 0], [3, 0], [4, 0]];
computerPlayerOne.gameBoard.shipsOnBoard[2].location = [[6, 5], [6, 6], [6, 7]];
computerPlayerOne.gameBoard.shipsOnBoard[3].location = [[9, 7], [9, 8], [9, 9]];
computerPlayerOne.gameBoard.shipsOnBoard[4].location = [[8, 0], [9, 0]];
computerPlayerArray.push(computerPlayerOne);
var computerPlayerTwo = (0,_playerFactory__WEBPACK_IMPORTED_MODULE_0__.createPlayer)('Computer', true);
computerPlayerTwo.gameBoard.board = [[0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 1, 1, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 1, 0, 0], [0, 0, 1, 0, 1, 0, 0, 1, 0, 0], [0, 0, 1, 0, 0, 0, 0, 1, 0, 0], [0, 0, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
computerPlayerTwo.gameBoard.shipsOnBoard = [(0,_shipFactory__WEBPACK_IMPORTED_MODULE_1__.createShip)(5, 'Carrier'), (0,_shipFactory__WEBPACK_IMPORTED_MODULE_1__.createShip)(4, 'Battleship'), (0,_shipFactory__WEBPACK_IMPORTED_MODULE_1__.createShip)(3, 'Destroyer'), (0,_shipFactory__WEBPACK_IMPORTED_MODULE_1__.createShip)(3, 'Submarine'), (0,_shipFactory__WEBPACK_IMPORTED_MODULE_1__.createShip)(2, 'Patrol Boat')];
computerPlayerTwo.gameBoard.shipsOnBoard[0].location = [[0, 4], [1, 4], [2, 4], [3, 4], [4, 4]];
computerPlayerTwo.gameBoard.shipsOnBoard[1].location = [[4, 2], [5, 2], [6, 2], [7, 2]];
computerPlayerTwo.gameBoard.shipsOnBoard[2].location = [[3, 7], [4, 7], [5, 7]];
computerPlayerTwo.gameBoard.shipsOnBoard[3].location = [[8, 5], [8, 6], [8, 7]];
computerPlayerTwo.gameBoard.shipsOnBoard[4].location = [[1, 7], [1, 8]];
computerPlayerArray.push(computerPlayerTwo);


/***/ }),

/***/ "./src/playerFactory.js":
/*!******************************!*\
  !*** ./src/playerFactory.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPlayer": () => (/* binding */ createPlayer)
/* harmony export */ });
/* harmony import */ var _cacheDOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cacheDOM */ "./src/cacheDOM.js");
/* harmony import */ var _gameboardFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboardFactory */ "./src/gameboardFactory.js");
/* harmony import */ var _renderDOM__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderDOM */ "./src/renderDOM.js");




function randomCoordinate(array) {
  var index = parseInt(Math.floor(Math.random() * array.length));
  var coordinate = array[index];
  array.splice(index, 1);
  return coordinate;
}

var createPlayer = function createPlayer(name, isComputer) {
  return {
    name: name,
    isAComputer: isComputer,
    gameBoard: (0,_gameboardFactory__WEBPACK_IMPORTED_MODULE_1__.createGameboard)(),
    // prettier-ignore
    dummyBoard: [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9], [0, 10], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9], [1, 10], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8], [2, 9], [2, 10], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [3, 8], [3, 9], [3, 10], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [4, 8], [4, 9], [4, 10], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 7], [5, 8], [5, 9], [5, 10], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8], [6, 9], [6, 10], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8], [7, 9], [7, 10], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8], [8, 9], [8, 10], [9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8], [9, 9], [9, 10]],
    playerAttack: function playerAttack(coordinate, enemy, cGrid) {
      enemy.gameBoard.receiveAttack(coordinate, cGrid, enemy.name);
      this.checkForVictory(enemy);
      enemy.computerAttack(this);
    },
    computerAttack: function computerAttack(enemy) {
      try {
        var pGrid = (0,_cacheDOM__WEBPACK_IMPORTED_MODULE_0__.cacheDOM)().playerGrid;
        var coordinate = randomCoordinate(this.dummyBoard);
        var num = parseInt('' + coordinate[0] + coordinate[1]);

        if (coordinate[1] == 10) {
          num = Math.floor(num / 10) - 1;
        }

        enemy.gameBoard.receiveAttack(num, pGrid, enemy.name);
        this.checkForVictory(enemy);
      } catch (e) {
        console.error(e);
      }
    },
    checkForVictory: function checkForVictory(enemy) {
      if (enemy.gameBoard.allShipsSunk) {
        (0,_renderDOM__WEBPACK_IMPORTED_MODULE_2__.renderVictory)(this.name);
      }
    }
  };
};



/***/ }),

/***/ "./src/renderBoards.js":
/*!*****************************!*\
  !*** ./src/renderBoards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderComputerBoard": () => (/* binding */ renderComputerBoard),
/* harmony export */   "renderPlayerBoard": () => (/* binding */ renderPlayerBoard),
/* harmony export */   "updateBoard": () => (/* binding */ updateBoard)
/* harmony export */ });
/* harmony import */ var _cacheDOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cacheDOM */ "./src/cacheDOM.js");

var cache = (0,_cacheDOM__WEBPACK_IMPORTED_MODULE_0__.cacheDOM)();

function renderPlayerBoard() {
  var container = cache.playerSide;
  var grid = document.createElement('div');
  grid.classList.add('grid-container');
  container.appendChild(grid);

  for (var i = 0; i < 100; i++) {
    var square = document.createElement('div');
    square.classList.add('grid-square');
    grid.appendChild(square);
  }
}

function renderComputerBoard() {
  var container = cache.computerSide;
  var grid = document.createElement('div');
  grid.classList.add('grid-container');
  container.appendChild(grid);

  for (var i = 0; i < 100; i++) {
    var square = document.createElement('div');
    square.classList.add('grid-square');
    grid.appendChild(square);
  }
}

function updateBoard(player) {
  var grid = document.createElement('div');
  player.gameBoard.board.forEach(function (array) {
    array.forEach(function (element) {
      if (element === 0) {
        var square = document.createElement('div');
        square.classList.add('water');
        grid.appendChild(square);
      } else if (element === 1) {
        var _square = document.createElement('div');

        _square.classList.add('ship');

        grid.appendChild(_square);
      } else if (element === 2) {
        var _square2 = document.createElement('div');

        _square2.classList.add('hit');

        grid.appendChild(_square2);
      } else {
        var _square3 = document.createElement('div');

        _square3.classList.add('miss');

        grid.appendChild(_square3);
      }
    });
  });
}



/***/ }),

/***/ "./src/renderDOM.js":
/*!**************************!*\
  !*** ./src/renderDOM.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderVictory": () => (/* binding */ renderVictory)
/* harmony export */ });
function renderVictory(name) {
  var modalContainer = document.querySelector('.modal-container');
  var modal = document.querySelector('.modal');
  var modalText = document.createElement('p');
  modalContainer.classList.add('show');
  modal.classList.add('flex');
  modalText.classList.add('modal-text');
  modal.appendChild(modalText);

  if (name === 'Computer') {
    modalText.textContent = 'The computer won.';
  } else {
    modalText.textContent = "".concat(name, " wins!");
  }
}



/***/ }),

/***/ "./src/shipFactory.js":
/*!****************************!*\
  !*** ./src/shipFactory.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createShip": () => (/* binding */ createShip)
/* harmony export */ });
var createShip = function createShip(length, name) {
  return {
    shipName: name,
    shipLength: length,
    shipSunk: false,
    location: [],
    whereHit: [],
    hit: function hit(coordinate) {
      if (Array.isArray(coordinate)) {
        this.whereHit.push(coordinate);

        if (this.whereHit.length == this.shipLength) {
          this.isSunk();
        }
      } else {
        throw new Error('Coordinate is not valid!');
      }
    },
    isSunk: function isSunk() {
      if (this.whereHit.length == this.shipLength) {
        this.shipSunk = true;
      }
    }
  };
};



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bindEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bindEvents */ "./src/bindEvents.js");
/* harmony import */ var _makeComputerPlayer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./makeComputerPlayer */ "./src/makeComputerPlayer.js");
/* harmony import */ var _renderBoards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderBoards */ "./src/renderBoards.js");



var isHorizontal = true;
var randomNumber = Math.floor(Math.random() * 2);
var computer = _makeComputerPlayer__WEBPACK_IMPORTED_MODULE_1__.computerPlayerArray[randomNumber];
(0,_bindEvents__WEBPACK_IMPORTED_MODULE_0__.bindSubmitEvent)(computer, isHorizontal);
(0,_renderBoards__WEBPACK_IMPORTED_MODULE_2__.renderPlayerBoard)();
(0,_renderBoards__WEBPACK_IMPORTED_MODULE_2__.renderComputerBoard)();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map