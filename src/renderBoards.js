import { cacheDOM } from './cacheDOM';

const cache = cacheDOM();

function renderPlayerBoard() {
  const container = cache.playerSide;
  const grid = document.createElement('div');
  grid.classList.add('grid-container');
  container.appendChild(grid);
  for (let i = 0; i < 100; i++) {
    const square = document.createElement('div');
    square.classList.add('grid-square');
    grid.appendChild(square);
  }
}

function renderComputerBoard() {
  const container = cache.computerSide;
  const grid = document.createElement('div');
  grid.classList.add('grid-container');
  container.appendChild(grid);
  for (let i = 0; i < 100; i++) {
    const square = document.createElement('div');
    square.classList.add('grid-square');
    grid.appendChild(square);
  }
}

function updateBoard(player) {
  const grid = document.createElement('div');
  player.gameBoard.board.forEach((array) => {
    array.forEach((element) => {
      if (element === 0) {
        let square = document.createElement('div');
        square.classList.add('water');
        grid.appendChild(square);
      } else if (element === 1) {
        let square = document.createElement('div');
        square.classList.add('ship');
        grid.appendChild(square);
      } else if (element === 2) {
        let square = document.createElement('div');
        square.classList.add('hit');
        grid.appendChild(square);
      } else {
        let square = document.createElement('div');
        square.classList.add('miss');
        grid.appendChild(square);
      }
    });
  });
}

export { renderPlayerBoard, renderComputerBoard, updateBoard };
