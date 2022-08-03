function renderVictory(name) {
  const modalContainer = document.querySelector('.modal-container');
  const modal = document.querySelector('.modal');
  const modalText = document.createElement('p');

  modalContainer.classList.add('show');
  modal.classList.add('flex');
  modalText.classList.add('modal-text');

  modal.appendChild(modalText);

  if (name === 'Computer') {
    modalText.textContent = 'The computer won.';
  } else {
    modalText.textContent = `${name} wins!`;
  }
}

export { renderVictory };
