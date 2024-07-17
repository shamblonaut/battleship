import { createPlayer, PlayerType } from "./core/player.js";
import { setupGameBoards } from "./dom/boards.js";
import { setupControls } from "./dom/controls.js";

import "./styles/index.css";

console.log("Get Ready for Battle!");

const root = document.getElementById("root");

root.innerHTML = `
  <header>Battleship</header>
  <div class="boards"></div>
  <div class="controls">
    <button class="start">Start Game</button>
    <button class="randomize">Randomize Formation</button>
    <button class="restart hidden">Play Again</button>
  </div>
`;

const playerOne = createPlayer(PlayerType.HUMAN);
const playerTwo = createPlayer(PlayerType.COMPUTER);

const boardsContainer = document.querySelector(".boards");
boardsContainer.append(...setupGameBoards(playerOne, playerTwo));

setupControls();
