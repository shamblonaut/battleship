export default function createShip(length) {
  if (length < 1) return undefined;
  return {
    length,
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
