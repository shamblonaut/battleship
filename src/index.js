import { createPlayer, PlayerType } from "./core/player.js";
import { setupControls } from "./dom/controls.js";
import { setupGame } from "./dom/game.js";

import "./styles/index.css";

console.log("Get Ready for Battle!");

const root = document.getElementById("root");
root.innerHTML = `
  <header>
    <h1>Battleship</h1>
    <a class="help">How to Play</a>
  </header>
  <div class="opponent">
    <p>Opponent: </p>
    <div class="options">
      <p class="opponent-computer active-mode">Computer</p>
      <p class="opponent-friend">Friend</p>
    </div>
  </div>
  <div class="controls">
    <button class="start">Start Game</button>
    <button class="reset hidden">Reset Game</button>
  </div>
  <div class="boards"></div>
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
