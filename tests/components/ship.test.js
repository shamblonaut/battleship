import createShip from "../../src/components/ship.js";

describe("Ship", () => {
  test("Create a new ship with given length", () => {
    const newShip = createShip(4);
    expect(newShip.length).toBe(4);
  });

  test("A ship with no length shall not be created", () => {
    const newShip = createShip(0);
    expect(newShip).toBeUndefined();
  });

  test("Starts out with no hits", () => {
    const newShip = createShip(4);
    expect(newShip.hits).toBe(0);
  });

  test("Ship receives hits properly", () => {
    const newShip = createShip(4);
    const initialHits = newShip.hits;

    newShip.hit();
    newShip.hit();

    expect(newShip.hits).toBe(initialHits + 2);
  });

  test("Check if ship is sunk after enough hits", () => {
    const newShip = createShip(4);

    for (let i = 0; i < newShip.length; i++) {
      newShip.hit();
    }

    expect(newShip.isSunk()).toBe(true);
  });

  test("Check if ship is sunk without enough hits", () => {
    const newShip = createShip(4);

    for (let i = 0; i < newShip.length - 1; i++) {
      newShip.hit();
    }

    expect(newShip.isSunk()).toBe(false);
  });

  test("Ship should not be hit after being sunk", () => {
    const newShip = createShip(4);

    for (let i = 0; i < newShip.length; i++) {
      newShip.hit();
    }
    newShip.hit();
    newShip.hit();

    expect(newShip.hits).toBe(4);
  });
});
