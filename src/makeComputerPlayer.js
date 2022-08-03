import { createPlayer } from './playerFactory';
import { createShip } from './shipFactory';

let computerPlayerArray = [];

let computerPlayerOne = createPlayer('Computer', true);

computerPlayerOne.gameBoard.board = [
  [1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
];

computerPlayerOne.gameBoard.shipsOnBoard = [
  createShip(5, 'Carrier'),
  createShip(4, 'Battleship'),
  createShip(3, 'Destroyer'),
  createShip(3, 'Submarine'),
  createShip(2, 'Patrol Boat'),
];

computerPlayerOne.gameBoard.shipsOnBoard[0].location = [
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
];

computerPlayerOne.gameBoard.shipsOnBoard[1].location = [
  [1, 0],
  [2, 0],
  [3, 0],
  [4, 0],
];

computerPlayerOne.gameBoard.shipsOnBoard[2].location = [
  [6, 5],
  [6, 6],
  [6, 7],
];

computerPlayerOne.gameBoard.shipsOnBoard[3].location = [
  [9, 7],
  [9, 8],
  [9, 9],
];

computerPlayerOne.gameBoard.shipsOnBoard[4].location = [
  [8, 0],
  [9, 0],
];

computerPlayerArray.push(computerPlayerOne);

let computerPlayerTwo = createPlayer('Computer', true);

computerPlayerTwo.gameBoard.board = [
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 1, 1, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

computerPlayerTwo.gameBoard.shipsOnBoard = [
  createShip('Carrier', 5),
  createShip('Battleship', 4),
  createShip('Destroyer', 3),
  createShip('Submarine', 3),
  createShip('Patrol Boat', 2),
];

computerPlayerTwo.gameBoard.shipsOnBoard[0].location = [
  [0, 4],
  [1, 4],
  [2, 4],
  [3, 4],
  [4, 4],
];

computerPlayerTwo.gameBoard.shipsOnBoard[1].location = [
  [4, 2],
  [5, 2],
  [6, 2],
  [7, 2],
];

computerPlayerTwo.gameBoard.shipsOnBoard[2].location = [
  [3, 7],
  [4, 7],
  [5, 7],
];

computerPlayerTwo.gameBoard.shipsOnBoard[3].location = [
  [8, 5],
  [8, 6],
  [8, 7],
];

computerPlayerTwo.gameBoard.shipsOnBoard[4].location = [
  [1, 7],
  [1, 8],
];

computerPlayerArray.push(computerPlayerTwo);

export { computerPlayerArray };
