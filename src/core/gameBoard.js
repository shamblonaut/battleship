import { createShip, ShipOrientation } from "./ship.js";

export const CellState = Object.freeze({
  EMPTY: 0,
  MISS: 1,
  SHIP: 2,
  HIT: 3,
  SUNK: 4,
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

    reset: function () {
      this.cells = Array.from({ length: size }, () =>
        Array.from({ length: size }, () => CellState.EMPTY),
      );
      this.ships = [];
    },

    placeShip: function (ship) {
      if (
        ship.coordinates[0] < 0 ||
        ship.coordinates[1] < 0 ||
        ship.coordinates[0] >= size ||
        ship.coordinates[1] >= size
      ) {
        throw new Error("Cannot place ship outside the board");
      } else if (
        (ship.orientation === ShipOrientation.HORIZONTAL &&
          ship.coordinates[0] + ship.length - 1 >= size) ||
        (ship.orientation === ShipOrientation.VERTICAL &&
          ship.coordinates[1] + ship.length - 1 >= size)
      ) {
        return false;
      }

      if (ship.orientation === ShipOrientation.HORIZONTAL) {
        for (
          let i = ship.coordinates[0];
          i <= ship.coordinates[0] + ship.length - 1;
          i++
        ) {
          if (this.cells[ship.coordinates[1]][i] !== CellState.EMPTY) {
            return false;
          }
        }
      } else if (ship.orientation === ShipOrientation.VERTICAL) {
        for (
          let i = ship.coordinates[1];
          i <= ship.coordinates[1] + ship.length - 1;
          i++
        ) {
          if (this.cells[i][ship.coordinates[0]] !== CellState.EMPTY) {
            return false;
          }
        }
      }

      this.ships.push(ship);

      if (ship.orientation === ShipOrientation.HORIZONTAL) {
        for (
          let i = ship.coordinates[0];
          i <= ship.coordinates[0] + ship.length - 1;
          i++
        ) {
          this.cells[ship.coordinates[1]][i] = CellState.SHIP;
        }
      } else if (ship.orientation === ShipOrientation.VERTICAL) {
        for (
          let i = ship.coordinates[1];
          i <= ship.coordinates[1] + ship.length - 1;
          i++
        ) {
          this.cells[i][ship.coordinates[0]] = CellState.SHIP;
        }
      }

      return true;
    },

    moveShip: function (shipIndex, coordinates) {
      const ship = this.ships[shipIndex];
      if (!ship) {
        throw new Error("Ship does not exist");
      }

      if (ship.orientation === ShipOrientation.HORIZONTAL) {
        for (
          let i = ship.coordinates[0];
          i <= ship.coordinates[0] + ship.length - 1;
          i++
        ) {
          this.cells[ship.coordinates[1]][i] = CellState.EMPTY;
        }
      } else if (ship.orientation === ShipOrientation.VERTICAL) {
        for (
          let i = ship.coordinates[1];
          i <= ship.coordinates[1] + ship.length - 1;
          i++
        ) {
          this.cells[i][ship.coordinates[0]] = CellState.EMPTY;
        }
      }

      if (
        !this.placeShip(createShip(ship.type, coordinates, ship.orientation))
      ) {
        if (ship.orientation === ShipOrientation.HORIZONTAL) {
          for (
            let i = ship.coordinates[0];
            i <= ship.coordinates[0] + ship.length - 1;
            i++
          ) {
            this.cells[ship.coordinates[1]][i] = CellState.SHIP;
          }
        } else if (ship.orientation === ShipOrientation.VERTICAL) {
          for (
            let i = ship.coordinates[1];
            i <= ship.coordinates[1] + ship.length - 1;
            i++
          ) {
            this.cells[i][ship.coordinates[0]] = CellState.SHIP;
          }
        }
        return false;
      }

      this.ships[shipIndex] = this.ships.pop();

      return true;
    },

    rotateShip: function (shipIndex) {
      const ship = this.ships[shipIndex];
      if (!ship) {
        throw new Error("Ship does not exist");
      }

      const newOrientation =
        ship.orientation === ShipOrientation.HORIZONTAL
          ? ShipOrientation.VERTICAL
          : ShipOrientation.HORIZONTAL;

      if (newOrientation === ShipOrientation.HORIZONTAL) {
        if (ship.coordinates[0] + ship.length - 1 >= this.size) {
          return false;
        }

        for (
          let i = ship.coordinates[0] + 1;
          i <= ship.coordinates[0] + ship.length - 1;
          i++
        ) {
          if (this.cells[ship.coordinates[1]][i] !== CellState.EMPTY) {
            return false;
          }
        }
      } else if (newOrientation === ShipOrientation.VERTICAL) {
        if (ship.coordinates[1] + ship.length - 1 >= this.size) {
          return false;
        }

        for (
          let i = ship.coordinates[1] + 1;
          i <= ship.coordinates[1] + ship.length - 1;
          i++
        ) {
          if (this.cells[i][ship.coordinates[0]] !== CellState.EMPTY) {
            return false;
          }
        }
      }

      if (newOrientation === ShipOrientation.HORIZONTAL) {
        for (
          let i = ship.coordinates[1];
          i <= ship.coordinates[1] + ship.length - 1;
          i++
        ) {
          this.cells[i][ship.coordinates[0]] = CellState.EMPTY;
        }
        for (
          let i = ship.coordinates[0];
          i <= ship.coordinates[0] + ship.length - 1;
          i++
        ) {
          this.cells[ship.coordinates[1]][i] = CellState.SHIP;
        }
      } else if (newOrientation === ShipOrientation.VERTICAL) {
        for (
          let i = ship.coordinates[0];
          i <= ship.coordinates[0] + ship.length - 1;
          i++
        ) {
          this.cells[ship.coordinates[1]][i] = CellState.EMPTY;
        }
        for (
          let i = ship.coordinates[1];
          i <= ship.coordinates[1] + ship.length - 1;
          i++
        ) {
          this.cells[i][ship.coordinates[0]] = CellState.SHIP;
        }
      }

      ship.orientation = newOrientation;
      return true;
    },

    getShipIndex: function (coordinates) {
      for (let i = 0; i < this.ships.length; i++) {
        if (this.ships[i].orientation === ShipOrientation.HORIZONTAL) {
          for (
            let j = this.ships[i].coordinates[0];
            j <= this.ships[i].coordinates[0] + this.ships[i].length - 1;
            j++
          ) {
            if (
              coordinates[0] === j &&
              coordinates[1] === this.ships[i].coordinates[1]
            ) {
              return i;
            }
          }
        } else if (this.ships[i].orientation === ShipOrientation.VERTICAL) {
          for (
            let j = this.ships[i].coordinates[1];
            j <= this.ships[i].coordinates[1] + this.ships[i].length - 1;
            j++
          ) {
            if (
              coordinates[0] === this.ships[i].coordinates[0] &&
              coordinates[1] === j
            ) {
              return i;
            }
          }
        }
      }

      return -1;
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
        return { result: CellState.MISS, ship: undefined };
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

          if (ship.isSunk()) {
            if (ship.orientation === ShipOrientation.HORIZONTAL) {
              for (
                let i = ship.coordinates[0];
                i <= ship.coordinates[0] + ship.length - 1;
                i++
              ) {
                this.cells[ship.coordinates[1]][i] = CellState.SUNK;
              }
            } else if (ship.orientation === ShipOrientation.VERTICAL) {
              for (
                let i = ship.coordinates[1];
                i <= ship.coordinates[1] + ship.length - 1;
                i++
              ) {
                this.cells[i][ship.coordinates[0]] = CellState.SUNK;
              }
            }
          } else {
            this.cells[coordinates[1]][coordinates[0]] = CellState.HIT;
          }

          return { result: this.cells[coordinates[1]][coordinates[0]], ship };
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
