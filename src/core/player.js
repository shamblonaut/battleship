import { createGameBoard } from "./gameBoard.js";

export const PlayerType = Object.freeze({
  HUMAN: "HUMAN",
  COMPUTER: "COMPUTER",
});

export function createPlayer(name, type, boardSize) {
  return {
    name,
    type,
    board: createGameBoard(boardSize),
  };
}
