export const ShipOrientation = Object.freeze({
  HORIZONTAL: "HORIZONTAL",
  VERTICAL: "VERTICAL",
});

export function createShip(
  length,
  coordinates = [undefined, undefined],
  orientation = ShipOrientation.HORIZONTAL,
) {
  if (length < 1) return undefined;
  return {
    length,
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
