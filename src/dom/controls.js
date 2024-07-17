import {
  gameStartEvent,
  randomizeBoardEvent,
  restartGameEvent,
} from "./boards.js";

export function setupControls() {
  document.addEventListener("game-start", () => {
    const root = document.querySelector("#root");
    root.classList.add("game-started");

    const controlsSection = document.querySelector(".controls");
    controlsSection.classList.add("hidden");

    const infoSection = document.querySelector(".info");
    infoSection.classList.remove("hidden");
  });

  document.addEventListener("game-over", () => {
    const root = document.querySelector("#root");
    root.classList.remove("game-started");

    const restartButton = document.querySelector(".restart");
    if (restartButton) {
      restartButton.addEventListener("click", () => {
        document.dispatchEvent(restartGameEvent);

        const controlsSection = document.querySelector(".controls");
        controlsSection.classList.remove("hidden");

        const infoSection = document.querySelector(".info");
        infoSection.classList.add("hidden");
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
