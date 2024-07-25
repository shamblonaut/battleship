import { createPlayer, PlayerType } from "../../core/player.js";
import { GameMode, setupGame } from "../game.js";
import { createGamePage } from "./game.js";
import { createHelpPage } from "./help.js";

export function createHomePage() {
  let gameMode = GameMode.COMPUTER;

  const homePage = document.createElement("div");
  homePage.classList.add("home-page", "page");

  homePage.innerHTML = `
    <div class="opponent">
      <p>Opponent: </p>
      <div class="options">
        <p class="opponent-computer active-mode">Computer</p>
        <p class="opponent-friend">Friend</p>
      </div>
    </div>
    <!-- <a class="help-link">How to Play</a> -->
    <div class="controls">
      <button class="play">Play Game</button>
      <button class="help">How to Play</button>
      <!-- <button class="reset hidden">Reset Game</button> -->
    </div>
  `;

  const computerOpponentButton = homePage.querySelector(".opponent-computer");
  computerOpponentButton.addEventListener("click", () => {
    if (computerOpponentButton.classList.contains("active-mode")) return;

    computerOpponentButton.classList.add("active-mode");
    friendOpponentButton.classList.remove("active-mode");
    gameMode = GameMode.COMPUTER;
  });

  const friendOpponentButton = homePage.querySelector(".opponent-friend");
  friendOpponentButton.addEventListener("click", () => {
    if (friendOpponentButton.classList.contains("active-mode")) return;

    friendOpponentButton.classList.add("active-mode");
    computerOpponentButton.classList.remove("active-mode");
    gameMode = GameMode.FRIEND;
  });

  const playButton = homePage.querySelector(".play");
  playButton.addEventListener("click", async () => {
    let game;
    if (gameMode === GameMode.COMPUTER) {
      game = setupGame(
        createPlayer("Player", PlayerType.HUMAN, 10),
        createPlayer("Computer", PlayerType.COMPUTER, 10),
      );
      document.querySelector("#root").classList.add("vs-computer");
    } else {
      game = setupGame(
        createPlayer("Player 1", PlayerType.HUMAN, 10),
        createPlayer("Player 2", PlayerType.HUMAN, 10),
      );
      document.querySelector("#root").classList.add("vs-friend");
    }

    homePage.parentNode.appendChild(createGamePage(game));
    homePage.remove();
  });

  const helpButton = homePage.querySelector(".help");
  helpButton.addEventListener("click", () => {
    homePage.parentNode.appendChild(createHelpPage());
    homePage.remove();
  });

  return homePage;
}
