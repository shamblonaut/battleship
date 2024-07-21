export const ShipType = Object.freeze({
  CARRIER: "Carrier",
  BATTLESHIP: "Battleship",
  DESTROYER: "Destroyer",
  SUBMARINE: "Submarine",
  PATROL: "Patrol Boat",
});

export const ShipOrientation = Object.freeze({
  HORIZONTAL: "HORIZONTAL",
  VERTICAL: "VERTICAL",
});

export function getShipLength(type) {
  switch (type) {
    case ShipType.CARRIER:
      return 5;
    case ShipType.BATTLESHIP:
      return 4;
    case ShipType.DESTROYER:
      return 3;
    case ShipType.SUBMARINE:
      return 3;
    case ShipType.PATROL:
      return 2;
  }
}

export function createShip(
  type,
  coordinates = [undefined, undefined],
  orientation = ShipOrientation.HORIZONTAL,
) {
  return {
    type: type,
    length: getShipLength(type),
    coordinates,
    orientation,
    hits: 0,

    hit: function () {
      if (this.hits < this.length) {
        this.hits++;
      }
    },

    isSunk: function () {
      return this.hits === this.length;
    },
  };
}
