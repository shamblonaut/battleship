import { createPlayer, PlayerType } from "../../src/core/player";
import { createGameBoard } from "../../src/core/gameBoard";

describe("Player", () => {
  it("creates a player with the specified name and type", () => {
    const human = createPlayer("Human", PlayerType.HUMAN);
    const computer = createPlayer("Computer", PlayerType.COMPUTER);

    expect(human.name).toBe("Human");
    expect(human.type).toBe(PlayerType.HUMAN);

    expect(computer.name).toBe("Computer");
    expect(computer.type).toBe(PlayerType.COMPUTER);
  });

  it("creates a gameboard for the player", () => {
    const player = createPlayer("Player", PlayerType.HUMAN, 10);

    const newBoard = createGameBoard(10);

    expect(JSON.stringify(player.board)).toBe(JSON.stringify(newBoard));
  });
});
