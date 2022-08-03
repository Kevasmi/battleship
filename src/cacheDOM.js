function cacheDOM() {
  const buttonContainer = document.querySelector('.game-buttons');
  const playerSide = document.querySelector('.player-side');
  const computerSide = document.querySelector('.computer-side');
  const computerGrid = document.querySelectorAll(
    '.computer-side > .grid-container > .grid-square'
  );
  const playerGrid = document.querySelectorAll(
    '.player-side > .grid-container > .grid-square'
  );
  return {
    buttonContainer,
    playerSide,
    computerSide,
    computerGrid,
    playerGrid,
  };
}

export { cacheDOM };
