import { bindSubmitEvent } from './bindEvents';
import { computerPlayerArray } from './makeComputerPlayer';
import { renderComputerBoard, renderPlayerBoard } from './renderBoards';

let isHorizontal = true;
const randomNumber = Math.floor(Math.random() * 2);
let computer = computerPlayerArray[randomNumber];
bindSubmitEvent(computer, isHorizontal);
renderPlayerBoard();
renderComputerBoard();
