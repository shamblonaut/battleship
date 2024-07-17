import { createPlayer, PlayerType } from "./core/player.js";
import { gameOverEvent, setupGameBoards } from "./dom/boards.js";
import { setupControls } from "./dom/controls.js";

import "./styles/index.css";

console.log("Get Ready for Battle!");

const root = document.getElementById("root");

root.innerHTML = `
  <header>Battleship</header>
  <div class="boards"></div>
  <div class="controls">
    <button class="randomize">Randomize Formation</button>
    <button class="start">Start Game</button>
  </div>
  <div class="info hidden">
    <p class="board-one-info"></p>
    <p class="board-two-info"></p>
  </div>
`;

const playerOne = createPlayer(PlayerType.HUMAN);
const playerTwo = createPlayer(PlayerType.COMPUTER);

const boardsContainer = document.querySelector(".boards");
boardsContainer.append(...setupGameBoards(playerOne, playerTwo));

setupControls();
