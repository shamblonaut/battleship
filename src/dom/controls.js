import { createPlayer, PlayerType } from "../core/player.js";

export function setupControls(game) {
  const startButton = document.querySelector(".start");
  startButton.addEventListener("click", async () => {
    if (document.querySelector(".save-board:not(.hidden)")) return;

    await game.start();
  });

  const resetButton = document.querySelector(".controls .reset");
  resetButton.addEventListener("click", () => game.reset());

  const computerOpponentButton = document.querySelector(".opponent-computer");
  const friendOpponentButton = document.querySelector(".opponent-friend");
  const slider = document.querySelector(".slider");

  computerOpponentButton.addEventListener("click", () => {
    if (!slider.classList.contains("slider-right")) return;

    slider.classList.remove("slider-right");
    game.changeMode(
      createPlayer("Player", PlayerType.HUMAN, 10),
      createPlayer("Computer", PlayerType.COMPUTER, 10),
    );
  });
  friendOpponentButton.addEventListener("click", () => {
    if (slider.classList.contains("slider-right")) return;

    slider.classList.add("slider-right");
    game.changeMode(
      createPlayer("Player 1", PlayerType.HUMAN, 10),
      createPlayer("Player 2", PlayerType.HUMAN, 10),
    );
  });
}
