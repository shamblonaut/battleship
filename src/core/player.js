import { createGameBoard } from "./gameBoard.js";

export const PlayerType = Object.freeze({
  HUMAN: "HUMAN",
  COMPUTER: "COMPUTER",
});

export function createPlayer(type) {
  return {
    type,
    active: false,
    board: createGameBoard(10),

    activate: function () {
      if (this.active) {
        throw new Error("Player is already active");
      }

      this.active = true;
    },
    deactivate: function () {
      if (!this.active) {
        throw new Error("Player is already inactive");
      }

      this.active = false;
    },
  };
}
