import { cacheDOM } from './cacheDOM';

const cache = cacheDOM();

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

export {
  addMissClass,
  addHitClass,
  addShipClass,
  removeShipClass,
  addHoverClass,
  removeHoverClass,
};
