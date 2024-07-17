import { PlayerType } from "../core/player.js";
import { setupGameBoards } from "./boards.js";

export function setupGame(playerOne, playerTwo) {
  const game = {
    players: [playerOne, playerTwo],
    currentPlayer: Math.floor(Math.random() * 2),

    isInProgress: false,
    isGameOver: false,
    isPlayerWaiting: false,

    boards: [],

    start: async function () {
      this.isInProgress = true;
      this.boards[0].clear();

      document.querySelector(".controls").classList.add("hidden");
      document.querySelector(".info").classList.remove("hidden");
      document.querySelector("#root").classList.add("attack-allowed");

      await this.play();
    },

    reset: function () {
      const gameOverOverlay = document.querySelector(".game-over-overlay");
      if (gameOverOverlay) gameOverOverlay.remove();

      this.isInProgress = false;
      this.isGameOver = false;
      this.isPlayerWaiting = false;

      this.boards[0].randomizeFormation();
      this.boards[1].randomizeFormation();
    },

    play: async function () {
      let currentPlayer = this.players[this.currentPlayer];
      let nextPlayerIndex = (this.currentPlayer + 1) % 2;
      let nextPlayer = this.players[nextPlayerIndex];

      while (!this.isGameOver) {
        if (currentPlayer.board.isFleetDestroyed()) {
          this.isGameOver = true;

          const gameOverOverlay = document.createElement("div");
          gameOverOverlay.classList.add("game-over-overlay");

          let gameOverMessage;
          if (currentPlayer.type === PlayerType.COMPUTER) {
            gameOverMessage = "YOU WON THE GAME!";
          } else if (nextPlayer.type === PlayerType.COMPUTER) {
            gameOverMessage = "YOU LOST THE GAME!";
          }
          // TODO: PvP messages

          gameOverOverlay.innerHTML = `<p>${gameOverMessage}</p>`;

          const resetButton = document.createElement("button");
          resetButton.classList.add("reset");
          resetButton.textContent = "Play Again";
          resetButton.addEventListener("click", () => {
            this.reset();

            document.querySelector(".controls").classList.remove("hidden");
            document.querySelector(".info").classList.add("hidden");
          });
          gameOverOverlay.appendChild(resetButton);
          this.boards[(this.currentPlayer + 1) % 2].component.appendChild(
            gameOverOverlay,
          );

          document.querySelector(".info").classList.add("hidden");
        }

        if (this.isPlayerWaiting) {
          await new Promise((resolve) => setTimeout(resolve, 100));
          continue;
        } else {
          document.querySelector("#root").classList.remove("attack-allowed");
        }

        currentPlayer = this.players[this.currentPlayer];
        nextPlayerIndex = (this.currentPlayer + 1) % 2;
        nextPlayer = this.players[nextPlayerIndex];

        document.querySelector(
          `.board-${this.currentPlayer === 0 ? "two" : "one"}-info`,
        ).textContent = `${currentPlayer.name}'s turn`;
        document.querySelector(
          `.board-${this.currentPlayer === 0 ? "one" : "two"}-info`,
        ).textContent = "";

        if (currentPlayer.type === PlayerType.COMPUTER) {
          await this.boards[nextPlayerIndex].computerAttack();
        } else {
          this.boards[nextPlayerIndex].active = true;
          this.isPlayerWaiting = true;
          document.querySelector("#root").classList.add("attack-allowed");
        }

        this.currentPlayer = nextPlayerIndex;
      }
    },
  };

  game.boards = setupGameBoards(game, playerOne, playerTwo);

  return game;
}
