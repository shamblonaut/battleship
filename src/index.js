import { createPlayer, PlayerType } from "./core/player.js";
import { setupControls } from "./dom/controls.js";
import { setupGame } from "./dom/game.js";

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

const game = setupGame(
  createPlayer("Player", PlayerType.HUMAN, 10),
  createPlayer("Computer", PlayerType.COMPUTER, 10),
);

document
  .querySelector(".boards")
  .append(game.boards[0].component, game.boards[1].component);
setupControls(game);
