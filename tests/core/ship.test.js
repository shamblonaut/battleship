import {
  createShip,
  getShipLength,
  ShipOrientation,
} from "../../src/core/ship";
import { ShipType } from "../../src/core/ship";

describe("Ship", () => {
  it("creates a new ship with given length", () => {
    const newShip = createShip(ShipType.BATTLESHIP);

    expect(newShip.type).toBe("Battleship");
    expect(newShip.length).toBe(4);
  });

  it("sets coordinates and orientation of ship if provided", () => {
    const newShip = createShip(
      ShipType.BATTLESHIP,
      [4, 4],
      ShipOrientation.VERTICAL,
    );

    expect(newShip.coordinates).toStrictEqual([4, 4]);
    expect(newShip.orientation).toStrictEqual(ShipOrientation.VERTICAL);
  });

  it("starts out with no hits", () => {
    const newShip = createShip(ShipType.BATTLESHIP);
    expect(newShip.hits).toBe(0);
  });

  it("receives hits properly", () => {
    const newShip = createShip(ShipType.BATTLESHIP);
    const initialHits = newShip.hits;

    newShip.hit();
    newShip.hit();

    expect(newShip.hits).toBe(initialHits + 2);
  });

  it("is sunk after enough hits", () => {
    const newShip = createShip(ShipType.BATTLESHIP);

    for (let i = 0; i < newShip.length; i++) {
      newShip.hit();
    }

    expect(newShip.isSunk()).toBe(true);
  });

  it("is not sunk without enough hits", () => {
    const newShip = createShip(ShipType.BATTLESHIP);

    for (let i = 0; i < newShip.length - 1; i++) {
      newShip.hit();
    }

    expect(newShip.isSunk()).toBe(false);
  });

  it("is not hit further after being sunk", () => {
    const newShip = createShip(ShipType.BATTLESHIP);

    for (let i = 0; i < newShip.length; i++) {
      newShip.hit();
    }
    newShip.hit();
    newShip.hit();

    expect(newShip.hits).toBe(4);
  });

  it("provides length of each type of ship", () => {
    expect(getShipLength(ShipType.CARRIER)).toBe(5);
    expect(getShipLength(ShipType.BATTLESHIP)).toBe(4);
    expect(getShipLength(ShipType.DESTROYER)).toBe(3);
    expect(getShipLength(ShipType.SUBMARINE)).toBe(3);
    expect(getShipLength(ShipType.PATROL)).toBe(2);
  });
});
