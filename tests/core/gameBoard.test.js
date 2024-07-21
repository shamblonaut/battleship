import { CellState, createGameBoard } from "../../src/core/gameBoard";
import { createShip, ShipOrientation, ShipType } from "../../src/core/ship";

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

  it("resets the board properly on command", () => {
    const newBoard = createGameBoard(10);

    newBoard.placeShip(
      createShip(ShipType.BATTLESHIP, [2, 2], ShipOrientation.VERTICAL),
    );
    newBoard.placeShip(
      createShip(ShipType.BATTLESHIP, [3, 3], ShipOrientation.HORIZONTAL),
    );

    newBoard.reset();

    expect(newBoard.ships.length).toBe(0);
    newBoard.cells.forEach((row) => {
      row.forEach((cell) => expect(cell).toStrictEqual(CellState.EMPTY));
    });
  });

  it("places the given ship at given coordinates and orientation", () => {
    const newBoard = createGameBoard(10);
    const newShip = createShip(
      ShipType.BATTLESHIP,
      [2, 2],
      ShipOrientation.VERTICAL,
    );

    expect(
      newBoard.placeShip(
        createShip(ShipType.BATTLESHIP, [2, 2], ShipOrientation.VERTICAL),
      ),
    ).toBe(true);

    expect(JSON.stringify(newBoard.ships[0])).toBe(JSON.stringify(newShip));
  });

  it("does not allow placement of ships over other ships", () => {
    const newBoard = createGameBoard(10);

    expect(
      newBoard.placeShip(
        createShip(ShipType.BATTLESHIP, [2, 2], ShipOrientation.VERTICAL),
      ),
    ).toBe(true);

    expect(
      newBoard.placeShip(
        createShip(ShipType.BATTLESHIP, [2, 2], ShipOrientation.VERTICAL),
      ),
    ).toBe(false);
    expect(
      newBoard.placeShip(
        createShip(ShipType.PATROL, [2, 5], ShipOrientation.VERTICAL),
      ),
    ).toBe(false);
    expect(
      newBoard.placeShip(
        createShip(ShipType.BATTLESHIP, [0, 4], ShipOrientation.HORIZONTAL),
      ),
    ).toBe(false);

    expect(
      newBoard.placeShip(
        createShip(ShipType.BATTLESHIP, [5, 5], ShipOrientation.HORIZONTAL),
      ),
    ).toBe(true);

    expect(
      newBoard.placeShip(
        createShip(ShipType.BATTLESHIP, [5, 5], ShipOrientation.HORIZONTAL),
      ),
    ).toBe(false);
    expect(
      newBoard.placeShip(
        createShip(ShipType.PATROL, [7, 5], ShipOrientation.HORIZONTAL),
      ),
    ).toBe(false);
    expect(
      newBoard.placeShip(
        createShip(ShipType.BATTLESHIP, [7, 3], ShipOrientation.VERTICAL),
      ),
    ).toBe(false);
  });

  it("does not allow placement of ships outside the board size", () => {
    const newBoard = createGameBoard(10);
    expect(() =>
      newBoard.placeShip(
        createShip(ShipType.BATTLESHIP, [5, -1], ShipOrientation.HORIZONTAL),
      ),
    ).toThrow("Cannot place ship outside the board");
    expect(() =>
      newBoard.placeShip(
        createShip(ShipType.BATTLESHIP, [12, 9], ShipOrientation.VERTICAL),
      ),
    ).toThrow("Cannot place ship outside the board");
  });

  it("does not allow placement of ship such that it extends beyond the board", () => {
    const newBoard = createGameBoard(10);
    expect(
      newBoard.placeShip(
        createShip(ShipType.BATTLESHIP, [8, 6], ShipOrientation.HORIZONTAL),
      ),
    ).toBe(false);
    expect(
      newBoard.placeShip(
        createShip(ShipType.BATTLESHIP, [6, 8], ShipOrientation.VERTICAL),
      ),
    ).toBe(false);
  });

  it("gives index of a ship at the given coordinates", () => {
    const newBoard = createGameBoard(10);
    newBoard.placeShip(
      createShip(ShipType.BATTLESHIP, [2, 2], ShipOrientation.VERTICAL),
    );
    newBoard.placeShip(
      createShip(ShipType.BATTLESHIP, [4, 4], ShipOrientation.HORIZONTAL),
    );

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

    newBoard.placeShip(
      createShip(ShipType.BATTLESHIP, [2, 2], ShipOrientation.VERTICAL),
    );
    newBoard.placeShip(
      createShip(ShipType.BATTLESHIP, [3, 3], ShipOrientation.VERTICAL),
    );
    newBoard.placeShip(
      createShip(ShipType.BATTLESHIP, [6, 6], ShipOrientation.HORIZONTAL),
    );

    expect(newBoard.moveShip(1, [2, 3])).toBe(false);
    expect(newBoard.moveShip(1, [4, 4])).toBe(true);
    expect(newBoard.moveShip(1, [4, 5])).toBe(true);
    expect(newBoard.moveShip(1, [2, 4])).toBe(false);

    expect(newBoard.moveShip(2, [6, 7])).toBe(true);

    expect(() => newBoard.moveShip(3, [5, 5])).toThrow("Ship does not exist");

    expect(newBoard.ships[1].coordinates).toEqual([4, 5]);
    expect(newBoard.ships[2].coordinates).toEqual([6, 7]);
  });

  it("allows ships to be rotated around their original position", () => {
    const newBoard = createGameBoard(10);

    newBoard.placeShip(
      createShip(ShipType.BATTLESHIP, [1, 3], ShipOrientation.VERTICAL),
    );
    newBoard.placeShip(
      createShip(ShipType.BATTLESHIP, [3, 3], ShipOrientation.HORIZONTAL),
    );

    newBoard.placeShip(
      createShip(ShipType.DESTROYER, [1, 8], ShipOrientation.HORIZONTAL),
    );
    newBoard.placeShip(
      createShip(ShipType.DESTROYER, [8, 1], ShipOrientation.VERTICAL),
    );

    expect(newBoard.rotateShip(0)).toBe(false);
    expect(newBoard.ships[0].orientation).toBe(ShipOrientation.VERTICAL);

    expect(newBoard.rotateShip(1)).toBe(true);
    expect(newBoard.ships[1].orientation).toBe(ShipOrientation.VERTICAL);

    expect(newBoard.rotateShip(1)).toBe(true);
    expect(newBoard.ships[1].orientation).toBe(ShipOrientation.HORIZONTAL);

    newBoard.moveShip(1, [5, 6]);

    expect(newBoard.rotateShip(0)).toBe(true);
    expect(newBoard.ships[0].orientation).toBe(ShipOrientation.HORIZONTAL);

    expect(newBoard.rotateShip(2)).toBe(false);
    expect(newBoard.rotateShip(3)).toBe(false);
  });

  it("relays that a ship has been hit", () => {
    const newBoard = createGameBoard(10);
    newBoard.placeShip(
      createShip(ShipType.BATTLESHIP, [2, 2], ShipOrientation.VERTICAL),
    );

    const ship = createShip(
      ShipType.BATTLESHIP,
      [2, 2],
      ShipOrientation.VERTICAL,
    );

    ship.hit();
    expect(JSON.stringify(newBoard.receiveAttack([2, 2]))).toBe(
      JSON.stringify({
        result: CellState.HIT,
        ship,
      }),
    );
    ship.hit();
    expect(JSON.stringify(newBoard.receiveAttack([2, 3]))).toBe(
      JSON.stringify({
        result: CellState.HIT,
        ship,
      }),
    );
    ship.hit();
    expect(JSON.stringify(newBoard.receiveAttack([2, 5]))).toBe(
      JSON.stringify({
        result: CellState.HIT,
        ship,
      }),
    );
    ship.hit();
    expect(JSON.stringify(newBoard.receiveAttack([2, 4]))).toBe(
      JSON.stringify({
        result: CellState.SUNK,
        ship,
      }),
    );

    expect(newBoard.ships[0].hits).toBe(4);
  });

  it("relays hits to multiple ships", () => {
    const newBoard = createGameBoard(10);
    newBoard.placeShip(
      createShip(ShipType.BATTLESHIP, [2, 2], ShipOrientation.HORIZONTAL),
    );
    newBoard.placeShip(
      createShip(ShipType.DESTROYER, [3, 3], ShipOrientation.VERTICAL),
    );

    const shipOne = createShip(
      ShipType.BATTLESHIP,
      [2, 2],
      ShipOrientation.HORIZONTAL,
    );
    const shipTwo = createShip(
      ShipType.DESTROYER,
      [3, 3],
      ShipOrientation.VERTICAL,
    );

    // Attack first ship once
    shipOne.hit();
    expect(JSON.stringify(newBoard.receiveAttack([4, 2]))).toBe(
      JSON.stringify({
        result: CellState.HIT,
        ship: shipOne,
      }),
    );

    // Attack second ship twice
    shipTwo.hit();
    expect(JSON.stringify(newBoard.receiveAttack([3, 4]))).toBe(
      JSON.stringify({
        result: CellState.HIT,
        ship: shipTwo,
      }),
    );
    shipTwo.hit();
    expect(JSON.stringify(newBoard.receiveAttack([3, 5]))).toBe(
      JSON.stringify({
        result: CellState.HIT,
        ship: shipTwo,
      }),
    );

    expect(newBoard.ships[0].hits).toBe(1);
    expect(newBoard.ships[1].hits).toBe(2);
  });

  it("does not affect ships if the attack misses", () => {
    const newBoard = createGameBoard(10);
    newBoard.placeShip(
      createShip(ShipType.BATTLESHIP, [2, 2], ShipOrientation.HORIZONTAL),
    );
    newBoard.placeShip(
      createShip(ShipType.DESTROYER, [3, 3], ShipOrientation.HORIZONTAL),
    );

    expect(JSON.stringify(newBoard.receiveAttack([1, 2]))).toBe(
      JSON.stringify({
        result: CellState.MISS,
        ship: undefined,
      }),
    ); // Horizontally before first ship
    expect(JSON.stringify(newBoard.receiveAttack([6, 2]))).toBe(
      JSON.stringify({
        result: CellState.MISS,
        ship: undefined,
      }),
    ); // Horizontally after first ship
    expect(JSON.stringify(newBoard.receiveAttack([4, 1]))).toBe(
      JSON.stringify({
        result: CellState.MISS,
        ship: undefined,
      }),
    ); // Vertically before first ship
    expect(JSON.stringify(newBoard.receiveAttack([2, 3]))).toBe(
      JSON.stringify({
        result: CellState.MISS,
        ship: undefined,
      }),
    ); // Vertically after first ship and horizontally before second ship
    expect(JSON.stringify(newBoard.receiveAttack([6, 3]))).toBe(
      JSON.stringify({
        result: CellState.MISS,
        ship: undefined,
      }),
    ); // Horizontally after second ship

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
    newBoard.placeShip(
      createShip(ShipType.BATTLESHIP, [2, 2], ShipOrientation.VERTICAL),
    );

    const ship = createShip(
      ShipType.BATTLESHIP,
      [2, 2],
      ShipOrientation.VERTICAL,
    );

    ship.hit();
    expect(JSON.stringify(newBoard.receiveAttack([2, 4]))).toBe(
      JSON.stringify({
        result: CellState.HIT,
        ship,
      }),
    );
    expect(() => newBoard.receiveAttack([2, 4])).toThrow(
      "Cell has already been attacked",
    );

    expect(JSON.stringify(newBoard.receiveAttack([9, 9]))).toBe(
      JSON.stringify({
        result: CellState.MISS,
        ship: undefined,
      }),
    );
    expect(() => newBoard.receiveAttack([9, 9])).toThrow(
      "Cell has already been attacked",
    );
  });

  it("keeps track of missed attacks", () => {
    const newBoard = createGameBoard(10);
    newBoard.placeShip(
      createShip(ShipType.BATTLESHIP, [2, 2], ShipOrientation.HORIZONTAL),
    );
    newBoard.placeShip(
      createShip(ShipType.DESTROYER, [3, 3], ShipOrientation.VERTICAL),
    );

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
    newBoard.placeShip(
      createShip(ShipType.BATTLESHIP, [2, 2], ShipOrientation.HORIZONTAL),
    );
    newBoard.placeShip(
      createShip(ShipType.DESTROYER, [6, 3], ShipOrientation.VERTICAL),
    );

    const shipOne = createShip(
      ShipType.BATTLESHIP,
      [2, 2],
      ShipOrientation.HORIZONTAL,
    );
    const shipTwo = createShip(
      ShipType.DESTROYER,
      [6, 3],
      ShipOrientation.VERTICAL,
    );

    shipOne.hit();
    expect(JSON.stringify(newBoard.receiveAttack([2, 2]))).toBe(
      JSON.stringify({
        result: CellState.HIT,
        ship: shipOne,
      }),
    );
    shipOne.hit();
    expect(JSON.stringify(newBoard.receiveAttack([3, 2]))).toBe(
      JSON.stringify({
        result: CellState.HIT,
        ship: shipOne,
      }),
    );
    shipOne.hit();
    expect(JSON.stringify(newBoard.receiveAttack([4, 2]))).toBe(
      JSON.stringify({
        result: CellState.HIT,
        ship: shipOne,
      }),
    );
    shipOne.hit();
    expect(JSON.stringify(newBoard.receiveAttack([5, 2]))).toBe(
      JSON.stringify({
        result: CellState.SUNK,
        ship: shipOne,
      }),
    );

    expect(newBoard.isFleetDestroyed()).toBe(false);

    shipTwo.hit();
    expect(JSON.stringify(newBoard.receiveAttack([6, 3]))).toBe(
      JSON.stringify({
        result: CellState.HIT,
        ship: shipTwo,
      }),
    );
    shipTwo.hit();
    expect(JSON.stringify(newBoard.receiveAttack([6, 4]))).toBe(
      JSON.stringify({
        result: CellState.HIT,
        ship: shipTwo,
      }),
    );
    shipTwo.hit();
    expect(JSON.stringify(newBoard.receiveAttack([6, 5]))).toBe(
      JSON.stringify({
        result: CellState.SUNK,
        ship: shipTwo,
      }),
    );

    expect(newBoard.isFleetDestroyed()).toBe(true);
  });

  it("sets corresponding cells to be sunk after a ship is sunk", () => {
    const newBoard = createGameBoard(10);
    newBoard.placeShip(
      createShip(ShipType.BATTLESHIP, [2, 2], ShipOrientation.HORIZONTAL),
    );

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
