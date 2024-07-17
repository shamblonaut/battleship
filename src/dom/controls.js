import {
  gameStartEvent,
  randomizeBoardEvent,
  restartGameEvent,
} from "./boards.js";

export function setupControls() {
  document.addEventListener("game-start", () => {
    const root = document.querySelector("#root");
    root.classList.add("game-started");

    const startButton = document.querySelector(".start");
    startButton.classList.add("hidden");

    const randomizeButton = document.querySelector(".randomize");
    randomizeButton.classList.add("hidden");
  });

  document.addEventListener("game-over", () => {
    const root = document.querySelector("#root");
    root.classList.remove("game-started");

    const restartButton = document.querySelector(".restart");
    if (restartButton) {
      restartButton.addEventListener("click", () => {
        document.dispatchEvent(restartGameEvent);

        const startButton = document.querySelector(".start");
        startButton.classList.remove("hidden");

        const randomizeButton = document.querySelector(".randomize");
        randomizeButton.classList.remove("hidden");
      });
    }
  });

  const startButton = document.querySelector(".start");
  startButton.addEventListener("click", () => {
    document.dispatchEvent(gameStartEvent);
  });

  const randomizeButton = document.querySelector(".randomize");
  randomizeButton.addEventListener("click", () => {
    const playerOneBoard = document.querySelector(".board.player-one");
    playerOneBoard.dispatchEvent(randomizeBoardEvent);
  });
}
