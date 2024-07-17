import { setupGameBoards } from "./dom/boards.js";
import "./styles/index.css";

console.log("Get Ready for Battle!");

const root = document.getElementById("root");

root.innerHTML = `
<header>Battleship</header>
<div class="boards"></div>
<div class="controls">
  <div class="ships"></div>
  <div class="game-controls">
    <button class="start">Start Game</button>
    <button class="reset">Reset Game</button>
    <button class="randomize" disabled>Randomize Formation</button>
  </div>
</div>
`;

const boardsContainer = document.querySelector(".boards");
boardsContainer.append(...setupGameBoards());
