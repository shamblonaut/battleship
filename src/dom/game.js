import { PlayerType } from "../core/player.js";
import { setupGameBoards } from "./boards.js";

const GameMode = Object.freeze({
  COMPUTER: "computer",
  FRIEND: "friend",
});

export function setupGame(playerOne, playerTwo) {
  const game = {
    mode: GameMode.COMPUTER,

    players: [playerOne, playerTwo],
    currentPlayerIndex: Math.floor(Math.random() * 2),

    isInProgress: false,
    isGameOver: false,
    isPlayerWaiting: false,

    boards: [],

    start: async function () {
      this.isInProgress = true;
      this.isGameOver = false;
      this.isPlayerWaiting = false;

      this.boards[0].clear();

      document.querySelector(".start").classList.add("hidden");
      document.querySelector(".reset").classList.remove("hidden");
      document.querySelector(".info").classList.remove("hidden");
      document.querySelector(".opponent").classList.add("hidden");
      document.querySelector("#root").classList.add("attack-allowed");

      document.querySelectorAll(".board-controls").forEach((boardControls) => {
        boardControls.classList.add("hidden");
      });

      await this.play();
    },

    reset: function () {
      const gameOverScreen = document.querySelector(".game-over-screen");
      if (gameOverScreen) gameOverScreen.remove();

      document.querySelector(".start").classList.remove("hidden");
      document.querySelector(".reset").classList.add("hidden");
      document.querySelector(".info").classList.add("hidden");
      document.querySelector(".opponent").classList.remove("hidden");
      document.querySelector("#root").classList.remove("attack-allowed");

      document.querySelectorAll(".edit-board").forEach((editButton) => {
        editButton.classList.remove("hidden");
      });
      document.querySelectorAll(".active").forEach((activeBoard) => {
        activeBoard.classList.remove("active");
      });

      this.isInProgress = false;
      this.isGameOver = true;
      this.isPlayerWaiting = false;

      this.players[0].board.reset();
      this.players[1].board.reset();

      this.boards = setupGameBoards(this, this.players[0], this.players[1]);

      this.boards[0].randomizeFormation();
      this.boards[1].randomizeFormation();

      const boardsContainer = document.querySelector(".boards");
      Array.from(boardsContainer.children).forEach((board) => {
        boardsContainer.removeChild(board);
      });
      boardsContainer.append(
        this.boards[0].component,
        this.boards[1].component,
      );
    },

    changeMode: function (playerOne, playerTwo) {
      this.mode =
        this.mode === GameMode.COMPUTER ? GameMode.FRIEND : GameMode.COMPUTER;
      this.players = [playerOne, playerTwo];
      this.currentPlayerIndex = Math.floor(Math.random() * 2);

      this.isInProgress = false;
      this.isGameOver = false;
      this.isPlayerWaiting = false;

      this.boards = setupGameBoards(this, playerOne, playerTwo);

      this.reset();
    },

    play: async function () {
      let currentPlayer = this.players[this.currentPlayerIndex];
      let nextPlayerIndex = (this.currentPlayerIndex + 1) % 2;
      let nextPlayer = this.players[nextPlayerIndex];

      while (!this.isGameOver) {
        if (currentPlayer.board.isFleetDestroyed()) {
          this.isGameOver = true;

          this.boards[(this.currentPlayerIndex + 1) % 2].component.appendChild(
            createGameOverScreen(currentPlayer, nextPlayer, this),
          );

          document.querySelector(".info").classList.add("hidden");
        }

        if (this.isPlayerWaiting) {
          await new Promise((resolve) => setTimeout(resolve, 100));
          continue;
        } else {
          document.querySelector("#root").classList.remove("attack-allowed");
        }

        currentPlayer = this.players[this.currentPlayerIndex];
        nextPlayerIndex = (this.currentPlayerIndex + 1) % 2;
        nextPlayer = this.players[nextPlayerIndex];

        document.querySelector(
          `.board-${this.currentPlayerIndex === 0 ? "two" : "one"}-info`,
        ).textContent =
          `${nextPlayer.type === PlayerType.COMPUTER ? "Your" : currentPlayer.name + "'s"} turn`;
        document.querySelector(
          `.board-${this.currentPlayerIndex === 0 ? "one" : "two"}-info`,
        ).textContent = "";

        this.boards[this.currentPlayerIndex].component.classList.remove(
          "active",
        );
        this.boards[nextPlayerIndex].component.classList.add("active");

        this.boards[this.currentPlayerIndex].active = false;
        this.boards[nextPlayerIndex].active = true;

        if (currentPlayer.type === PlayerType.COMPUTER && !this.isGameOver) {
          await this.boards[nextPlayerIndex].computerAttack();
        } else {
          this.isPlayerWaiting = true;

          if (nextPlayer.type !== PlayerType.COMPUTER) {
            this.boards[nextPlayerIndex].component.appendChild(
              createPassingScreen(this.players, this.currentPlayerIndex),
            );
          }

          document.querySelector("#root").classList.add("attack-allowed");

          if (nextPlayer.type !== PlayerType.COMPUTER) {
            document.querySelector("#root").classList.add("passing");
          }
        }

        this.currentPlayerIndex = nextPlayerIndex;
      }
    },
  };

  game.boards = setupGameBoards(game, playerOne, playerTwo);

  return game;
}

function createGameOverScreen(currentPlayer, nextPlayer, game) {
  const gameOverScreen = document.createElement("div");
  gameOverScreen.classList.add("game-over-screen");

  let gameOverMessage;
  if (currentPlayer.type === PlayerType.COMPUTER) {
    gameOverMessage = "YOU WON THE GAME!";
  } else if (nextPlayer.type === PlayerType.COMPUTER) {
    gameOverMessage = "YOU LOST THE GAME!";
  } else {
    gameOverMessage = `${nextPlayer.name.toUpperCase()} WON THE GAME!`;
  }

  gameOverScreen.innerHTML = `<p>${gameOverMessage}</p>`;

  const resetButton = document.createElement("button");
  resetButton.classList.add("reset");
  resetButton.textContent = "Play Again";
  resetButton.addEventListener("click", () => game.reset());
  gameOverScreen.appendChild(resetButton);

  document.querySelector(".passing-screen").remove();

  return gameOverScreen;
}

function createPassingScreen(players, currentPlayer) {
  const passingScreen = document.createElement("div");
  passingScreen.classList.add("passing-screen");
  passingScreen.innerHTML = `
    <p>Pass the device to ${players[currentPlayer].name}</p>
  `;
  const continueButton = document.createElement("button");
  continueButton.textContent = "Continue";
  continueButton.addEventListener("click", () => {
    passingScreen.remove();
    document.querySelector(".passing").classList.remove("passing");
  });
  passingScreen.appendChild(continueButton);
  return passingScreen;
}
