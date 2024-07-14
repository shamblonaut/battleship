import { createShip, ShipOrientation } from "./ship";

export const CellState = Object.freeze({
  EMPTY: 0,
  MISS: 1,
  SHIP: 2,
  HIT: 3,
});

export function createGameBoard(size) {
  if (size <= 0) {
    throw new Error("Invalid board size");
  }

  return {
    size,
    cells: Array.from({ length: size }, () =>
      Array.from({ length: size }, () => CellState.EMPTY),
    ),
    ships: [],

    placeShip: function (coordinates, length, orientation) {
      if (
        coordinates[0] < 0 ||
        coordinates[1] < 0 ||
        coordinates[0] >= size ||
        coordinates[1] >= size
      ) {
        throw new Error("Cannot place ship outside the board");
      } else if (
        (orientation === ShipOrientation.HORIZONTAL &&
          coordinates[0] + length - 1 >= size) ||
        (orientation === ShipOrientation.VERTICAL &&
          coordinates[1] + length - 1 >= size)
      ) {
        return false;
      }

      if (orientation === ShipOrientation.HORIZONTAL) {
        for (let i = coordinates[0]; i <= coordinates[0] + length - 1; i++) {
          if (this.cells[coordinates[1]][i] !== CellState.EMPTY) {
            return false;
          }
        }
      } else if (orientation === ShipOrientation.VERTICAL) {
        for (let i = coordinates[1]; i <= coordinates[1] + length - 1; i++) {
          if (this.cells[i][coordinates[0]] !== CellState.EMPTY) {
            return false;
          }
        }
      }

      this.ships.push(createShip(length, coordinates, orientation));

      if (orientation === ShipOrientation.HORIZONTAL) {
        for (let i = coordinates[0]; i <= coordinates[0] + length - 1; i++) {
          this.cells[coordinates[1]][i] = CellState.SHIP;
        }
      } else if (orientation === ShipOrientation.VERTICAL) {
        for (let i = coordinates[1]; i <= coordinates[1] + length - 1; i++) {
          this.cells[i][coordinates[0]] = CellState.SHIP;
        }
      }

      return true;
    },

    receiveAttack: function (coordinates) {
      if (
        coordinates[0] < 0 ||
        coordinates[1] < 0 ||
        coordinates[0] >= size ||
        coordinates[1] >= size
      ) {
        throw new Error("Cannot attack outside the board");
      }
      if (
        this.cells[coordinates[1]][coordinates[0]] !== CellState.EMPTY &&
        this.cells[coordinates[1]][coordinates[0]] !== CellState.SHIP
      ) {
        throw new Error("Cell has already been attacked");
      }

      if (this.cells[coordinates[1]][coordinates[0]] !== CellState.SHIP) {
        this.cells[coordinates[1]][coordinates[0]] = CellState.MISS;
        return false;
      }

      for (const ship of this.ships) {
        if (
          (ship.orientation === ShipOrientation.HORIZONTAL &&
            coordinates[1] === ship.coordinates[1] &&
            coordinates[0] >= ship.coordinates[0] &&
            coordinates[0] <= ship.coordinates[0] + ship.length - 1) ||
          (ship.orientation === ShipOrientation.VERTICAL &&
            coordinates[0] === ship.coordinates[0] &&
            coordinates[1] >= ship.coordinates[1] &&
            coordinates[1] <= ship.coordinates[1] + ship.length - 1)
        ) {
          ship.hit();

          this.cells[coordinates[1]][coordinates[0]] = CellState.HIT;
          return true;
        }
      }
    },

    isFleetDestroyed: function () {
      for (const ship of this.ships) {
        if (!ship.isSunk()) {
          return false;
        }
      }

      return true;
    },
  };
}
