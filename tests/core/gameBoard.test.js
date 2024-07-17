import { CellState, createGameBoard } from "../../src/core/gameBoard";
import { createShip, ShipOrientation } from "../../src/core/ship";

describe("GameBoard", () => {
  it("creates a new square board with given size", () => {
    const newBoard = createGameBoard(10);
    expect(newBoard.size).toBe(10);
    expect(newBoard.cells.length).toBe(10);
    newBoard.cells.forEach((row) => {
      expect(row.length).toBe(10);
    });
  });

  it("does not allow a board with size 0 or less", () => {
    expect(() => createGameBoard(0)).toThrow("Invalid board size");
    expect(() => createGameBoard(-1)).toThrow("Invalid board size");
  });

  it("fills a new square board with empty cells", () => {
    const newBoard = createGameBoard(10);
    newBoard.cells.forEach((row) => {
      row.forEach((cell) => expect(cell).toStrictEqual(CellState.EMPTY));
    });
  });

  it("places a ship at given coordinates and orientation", () => {
    const newBoard = createGameBoard(10);
    const newShip = createShip(4, [2, 2], ShipOrientation.VERTICAL);

    expect(newBoard.placeShip([2, 2], 4, ShipOrientation.VERTICAL)).toBe(true);

    expect(JSON.stringify(newBoard.ships[0])).toBe(JSON.stringify(newShip));
  });

  it("does not allow placement of ships over other ships", () => {
    const newBoard = createGameBoard(10);

    expect(newBoard.placeShip([2, 2], 4, ShipOrientation.VERTICAL)).toBe(true);

    expect(newBoard.placeShip([2, 2], 4, ShipOrientation.VERTICAL)).toBe(false);
    expect(newBoard.placeShip([2, 5], 1, ShipOrientation.VERTICAL)).toBe(false);
    expect(newBoard.placeShip([0, 4], 4, ShipOrientation.HORIZONTAL)).toBe(
      false,
    );

    expect(newBoard.placeShip([5, 5], 4, ShipOrientation.HORIZONTAL)).toBe(
      true,
    );

    expect(newBoard.placeShip([5, 5], 4, ShipOrientation.HORIZONTAL)).toBe(
      false,
    );
    expect(newBoard.placeShip([7, 5], 1, ShipOrientation.HORIZONTAL)).toBe(
      false,
    );
    expect(newBoard.placeShip([7, 3], 4, ShipOrientation.VERTICAL)).toBe(false);
  });

  it("does not allow placement of ships outside the board size", () => {
    const newBoard = createGameBoard(10);
    expect(() =>
      newBoard.placeShip([5, -1], 4, ShipOrientation.HORIZONTAL),
    ).toThrow("Cannot place ship outside the board");
    expect(() =>
      newBoard.placeShip([12, 9], 4, ShipOrientation.VERTICAL),
    ).toThrow("Cannot place ship outside the board");
  });

  it("does not allow placement of ship such that it extends beyond the board", () => {
    const newBoard = createGameBoard(10);
    expect(newBoard.placeShip([8, 6], 4, ShipOrientation.HORIZONTAL)).toBe(
      false,
    );
    expect(newBoard.placeShip([6, 8], 4, ShipOrientation.VERTICAL)).toBe(false);
  });

  it("gives index of a ship at the given coordinates", () => {
    const newBoard = createGameBoard(10);
    newBoard.placeShip([2, 2], 5, ShipOrientation.VERTICAL);
    newBoard.placeShip([4, 4], 4, ShipOrientation.HORIZONTAL);

    expect(newBoard.getShipIndex([2, 2])).toBe(0);
    expect(newBoard.getShipIndex([2, 5])).toBe(0);
    expect(newBoard.getShipIndex([5, 4])).toBe(1);
    expect(newBoard.getShipIndex([7, 4])).toBe(1);

    expect(() => newBoard.getShipIndex([5, 5])).toThrow(
      "No ship found at given index: [5, 5]",
    );
  });

  it("allows ships to be moved from their original position", () => {
    const newBoard = createGameBoard(10);

    newBoard.placeShip([2, 2], 4, ShipOrientation.VERTICAL);
    newBoard.placeShip([3, 3], 4, ShipOrientation.VERTICAL);

    expect(newBoard.moveShip(1, [2, 3])).toBe(false);
    expect(newBoard.moveShip(1, [4, 4])).toBe(true);
    expect(newBoard.moveShip(1, [4, 5])).toBe(true);
    expect(newBoard.moveShip(1, [2, 4])).toBe(false);

    expect(() => newBoard.moveShip(3, [5, 5])).toThrow("Ship does not exist");

    expect(newBoard.ships[1].coordinates).toEqual([4, 5]);
  });

  it("relays that a ship has been hit", () => {
    const newBoard = createGameBoard(10);
    newBoard.placeShip([2, 2], 4, ShipOrientation.VERTICAL);

    expect(newBoard.receiveAttack([2, 4])).toBe(true);
    expect(newBoard.receiveAttack([2, 5])).toBe(true);

    expect(newBoard.ships[0].hits).toBe(2);
  });

  it("relays hits to multiple ships", () => {
    const newBoard = createGameBoard(10);
    newBoard.placeShip([2, 2], 4, ShipOrientation.HORIZONTAL);
    newBoard.placeShip([3, 3], 3, ShipOrientation.VERTICAL);

    // Attack first ship once
    expect(newBoard.receiveAttack([4, 2])).toBe(true);

    // Attack second ship twice
    expect(newBoard.receiveAttack([3, 4])).toBe(true);
    expect(newBoard.receiveAttack([3, 5])).toBe(true);

    expect(newBoard.ships[0].hits).toBe(1);
    expect(newBoard.ships[1].hits).toBe(2);
  });

  it("does not affect ships if the attack misses", () => {
    const newBoard = createGameBoard(10);
    newBoard.placeShip([2, 2], 4, ShipOrientation.HORIZONTAL);
    newBoard.placeShip([3, 3], 3, ShipOrientation.HORIZONTAL);

    expect(newBoard.receiveAttack([1, 2])).toBe(false); // Horizontally before first ship
    expect(newBoard.receiveAttack([6, 2])).toBe(false); // Horizontally after first ship
    expect(newBoard.receiveAttack([4, 1])).toBe(false); // Vertically before first ship
    expect(newBoard.receiveAttack([2, 3])).toBe(false); // Vertically after first ship and horizontally before second ship
    expect(newBoard.receiveAttack([6, 3])).toBe(false); // Horizontally after second ship

    expect(newBoard.ships[0].hits).toBe(0);
    expect(newBoard.ships[1].hits).toBe(0);
  });

  it("does not allow attacks outside the board", () => {
    const newBoard = createGameBoard(10);
    expect(() => newBoard.receiveAttack([12, 12])).toThrow(
      "Cannot attack outside the board",
    );
    expect(() => newBoard.receiveAttack([-3, -5])).toThrow(
      "Cannot attack outside the board",
    );
  });

  it("does not receive attacks on an already attacked cell", () => {
    const newBoard = createGameBoard(10);
    newBoard.placeShip([2, 2], 4, ShipOrientation.VERTICAL);

    expect(newBoard.receiveAttack([2, 4])).toBe(true);
    expect(() => newBoard.receiveAttack([2, 4])).toThrow(
      "Cell has already been attacked",
    );

    expect(newBoard.receiveAttack([9, 9])).toBe(false);
    expect(() => newBoard.receiveAttack([9, 9])).toThrow(
      "Cell has already been attacked",
    );
  });

  it("keeps track of missed attacks", () => {
    const newBoard = createGameBoard(10);
    newBoard.placeShip([2, 2], 4, ShipOrientation.HORIZONTAL);
    newBoard.placeShip([3, 3], 3, ShipOrientation.VERTICAL);

    for (let i = 0; i < newBoard.size; i++) {
      for (let j = 0; j < newBoard.size; j++) {
        newBoard.receiveAttack([j, i]);
      }
    }

    let missedAttacks = 0;
    newBoard.cells.forEach((row) => {
      row.forEach((cell) => {
        if (cell === CellState.MISS) {
          missedAttacks++;
        }
      });
    });
    expect(missedAttacks).toBe(93);
  });

  it("keeps track whether all ships has been sunk", () => {
    const newBoard = createGameBoard(10);
    newBoard.placeShip([2, 2], 4, ShipOrientation.HORIZONTAL);
    newBoard.placeShip([6, 3], 3, ShipOrientation.VERTICAL);

    expect(newBoard.receiveAttack([2, 2])).toBe(true);
    expect(newBoard.receiveAttack([3, 2])).toBe(true);
    expect(newBoard.receiveAttack([4, 2])).toBe(true);
    expect(newBoard.receiveAttack([5, 2])).toBe(true);

    expect(newBoard.isFleetDestroyed()).toBe(false);

    expect(newBoard.receiveAttack([6, 3])).toBe(true);
    expect(newBoard.receiveAttack([6, 4])).toBe(true);
    expect(newBoard.receiveAttack([6, 5])).toBe(true);

    expect(newBoard.isFleetDestroyed()).toBe(true);
  });

  it("sets corresponding cells to be sunk after a ship is sunk", () => {
    const newBoard = createGameBoard(10);
    newBoard.placeShip([2, 2], 4, ShipOrientation.HORIZONTAL);

    newBoard.receiveAttack([2, 2]);
    newBoard.receiveAttack([3, 2]);
    newBoard.receiveAttack([4, 2]);
    newBoard.receiveAttack([5, 2]);

    expect(newBoard.ships[0].isSunk()).toBe(true);

    for (let i = 2; i <= 5; i++) {
      expect(newBoard.cells[2][i]).toBe(CellState.SUNK);
    }
  });
});
