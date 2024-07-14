import { createPlayer, PlayerType } from "../../src/core/player";
import { createGameBoard } from "../../src/core/gameBoard";

describe("Player", () => {
  it("creates a player with the specified type", () => {
    const human = createPlayer(PlayerType.HUMAN);
    const computer = createPlayer(PlayerType.COMPUTER);

    expect(human.type).toBe(PlayerType.HUMAN);
    expect(computer.type).toBe(PlayerType.COMPUTER);
  });

  it("creates a gameboard for the player", () => {
    const player = createPlayer(PlayerType.HUMAN);
    const newBoard = createGameBoard(10);

    expect(JSON.stringify(player.board)).toBe(JSON.stringify(newBoard));
  });

  it("is inactive by default", () => {
    const player = createPlayer(PlayerType.HUMAN);
    expect(player.active).toBe(false);
  });

  it("activates/deactivates on command", () => {
    const player = createPlayer(PlayerType.HUMAN);

    player.activate();
    expect(player.active).toBe(true);

    player.deactivate();
    expect(player.active).toBe(false);
  });

  it("does not allow activation/deactivation if already active/inactive", () => {
    const player = createPlayer(PlayerType.HUMAN);

    player.activate();
    expect(() => player.activate()).toThrow("Player is already active");

    player.deactivate();
    expect(() => player.deactivate()).toThrow("Player is already inactive");
  });
});
