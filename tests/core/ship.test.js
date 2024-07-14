import { createShip, ShipOrientation } from "../../src/core/ship";

describe("Ship", () => {
  it("creates a new ship with given length", () => {
    const newShip = createShip(4);
    expect(newShip.length).toBe(4);
  });

  it("does not create a ship with no length", () => {
    const newShip = createShip(0);
    expect(newShip).toBeUndefined();
  });

  it("sets coordinates and orientation of ship if provided", () => {
    const newShip = createShip(4, [4, 4], ShipOrientation.VERTICAL);
    expect(newShip.coordinates).toStrictEqual([4, 4]);
    expect(newShip.orientation).toStrictEqual(ShipOrientation.VERTICAL);
  });

  it("starts out with no hits", () => {
    const newShip = createShip(4);
    expect(newShip.hits).toBe(0);
  });

  it("receives hits properly", () => {
    const newShip = createShip(4);
    const initialHits = newShip.hits;

    newShip.hit();
    newShip.hit();

    expect(newShip.hits).toBe(initialHits + 2);
  });

  it("is sunk after enough hits", () => {
    const newShip = createShip(4);

    for (let i = 0; i < newShip.length; i++) {
      newShip.hit();
    }

    expect(newShip.isSunk()).toBe(true);
  });

  it("is not sunk without enough hits", () => {
    const newShip = createShip(4);

    for (let i = 0; i < newShip.length - 1; i++) {
      newShip.hit();
    }

    expect(newShip.isSunk()).toBe(false);
  });

  it("is not hit further after being sunk", () => {
    const newShip = createShip(4);

    for (let i = 0; i < newShip.length; i++) {
      newShip.hit();
    }
    newShip.hit();
    newShip.hit();

    expect(newShip.hits).toBe(4);
  });
});
