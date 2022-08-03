import { cacheDOM } from './cacheDOM';
import { addHoverClass, removeHoverClass } from './classAdders';
import { createPlayer } from './playerFactory';
import { createShip } from './shipFactory';

let count = 0;
let shipArray = [
  createShip(5, 'Carrier'),
  createShip(4, 'Battleship'),
  createShip(3, 'Destroyer'),
  createShip(3, 'Submarine'),
  createShip(2, 'Patrol Boat'),
];

function convertIndex(index) {
  if (index < 10) {
    return [0, index];
  } else {
    let arr = index.toString().split('');
    return arr.map(Number);
  }
}

function createCoordinates(coordinate, ship, isHorizontal, index) {
  let coordinateArray = [];
  // prettier-ignore
  if (isHorizontal === true && index + ship.shipLength <= (coordinate[0] + 1) * 10) {
    for (let i = coordinate[1]; i < ship.shipLength + coordinate[1]; i++) {
      coordinateArray.push([coordinate[0], i]);
    }
  } else if (isHorizontal === false && (ship.shipLength - 1) * 10 + index < 100) {
    for (let i = coordinate[0]; i < ship.shipLength + coordinate[0]; i++) {
      coordinateArray.push([i, coordinate[1]]);
    }
  } else {
    throw new Error('Invalid placement!');
  }
  return coordinateArray;
}

function bindAttackEvent(player, computer) {
  const cache = cacheDOM();
  const cGrid = cache.computerGrid;
  cGrid.forEach((square, index) => {
    square.addEventListener('click', () => {
      //
      player.playerAttack(index, computer, cGrid);
    });
  });
}

function bindEventsOnRender(player, computer, isHorizontal) {
  const cache = cacheDOM();
  const pGrid = cache.playerGrid;
  const button = document.querySelector('.orientation');
  button.addEventListener('click', () => {
    if (button.textContent == 'Horizontal') {
      button.textContent = 'Vertical';
      isHorizontal = false;
    } else {
      button.textContent = 'Horizontal';
      isHorizontal = true;
    }
  });
  pGrid.forEach((square, index) => {
    square.addEventListener('mouseover', (e) => {
      const coordinate = convertIndex(index);
      // prettier-ignore
      if (isHorizontal === true && index + shipArray[count].shipLength <= (coordinate[0] + 1) * 10) {
        for (let i = index; i < index + shipArray[count].shipLength; i++) {
          addHoverClass(i, pGrid);
        }
      } else if (isHorizontal === false && (shipArray[count].shipLength - 1) * 10 + index < 100) {
        for (let i = index; i <= index + (shipArray[count].shipLength - 1) * 10; i = i+ 10) {
          addHoverClass(i, pGrid);
        }
      }
    });
  });
  pGrid.forEach((square, index) => {
    square.addEventListener('mouseout', (e) => {
      for (let i = index; i < index + shipArray[count].shipLength + 1; i++) {
        removeHoverClass(i, pGrid);
      }
      // prettier-ignore
      for (let i = index; i <= index + ((shipArray[count].shipLength - 1) * 10); i = i+ 10) {
        removeHoverClass(i, pGrid);
      }
    });
  });
  pGrid.forEach((square, index) => {
    square.addEventListener('click', () => {
      if (isHorizontal) {
        for (let i = index; i < index + shipArray[count].shipLength + 1; i++) {
          removeHoverClass(i, pGrid);
        }
      } else {
        // prettier-ignore
        for (let i = index; i <= index + ((shipArray[count].shipLength - 1) * 10); i = i+ 10) {
          removeHoverClass(i, pGrid);
        }
      }
      const coordinate = convertIndex(index);
      const coordinates = createCoordinates(
        coordinate,
        shipArray[count],
        isHorizontal,
        index
      );
      player.gameBoard.placeShip(
        coordinates,
        shipArray[count],
        isHorizontal,
        index,
        pGrid
      );
      count++;
      if (count === 5) {
        removeHoverClass(index, pGrid);
        if (isHorizontal) {
          removeHoverClass(index + 1, pGrid);
        } else {
          removeHoverClass(index + 10, pGrid);
        }
        const oldGrid = document.querySelector(
          '.player-side > .grid-container'
        );
        const newGrid = oldGrid.cloneNode(true);
        oldGrid.parentNode.replaceChild(newGrid, oldGrid);
        bindAttackEvent(player, computer);
      }
    });
  });
}

function bindSubmitEvent(computer, isHorizontal) {
  const input = document.getElementById('name');
  const form = document.querySelector('form');
  const modalContainer = document.querySelector('.modal-container');
  const modal = document.querySelector('.modal');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let name = input.value;
    modalContainer.classList.remove('show');
    while (modal.firstChild) {
      modal.removeChild(modal.lastChild);
    }
    const player = createPlayer(name);
    bindEventsOnRender(player, computer, isHorizontal);
  });
}

export { bindEventsOnRender, bindAttackEvent, bindSubmitEvent };
