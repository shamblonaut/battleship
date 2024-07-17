import { CellState } from "../core/gameBoard.js";
import { PlayerType } from "../core/player.js";
import { ShipOrientation } from "../core/ship.js";

export function setupGameBoards(game, playerOne, playerTwo) {
  const boardOne = createBoardComponent(playerOne.board, true);
  boardOne.randomizeFormation();

  boardOne.component.classList.add(
    "player-one",
    playerOne.type === PlayerType.HUMAN ? "human" : "computer",
  );
  boardOne.component.addEventListener("click", () => boardOne.clear(), true);

  const boardTwo = createBoardComponent(playerTwo.board, false);
  boardTwo.randomizeFormation();

  boardTwo.component.classList.add(
    "player-two",
    playerTwo.type === PlayerType.HUMAN ? "human" : "computer",
  );

  for (const DOMBoard of [boardOne, boardTwo]) {
    Array.from(DOMBoard.component.children).forEach((row, i) => {
      Array.from(row.children).forEach((cell, j) => {
        cell.addEventListener("click", () => {
          if (
            DOMBoard.isMutable() &&
            cell.classList.contains("ship") &&
            !game.isInProgress
          ) {
            DOMBoard.toggleShipMotion([j, i]);
          } else if (
            !DOMBoard.isMutable() &&
            game.isInProgress &&
            !game.isGameOver &&
            game.isPlayerWaiting
          ) {
            DOMBoard.receiveAttack([j, i]);
            game.isPlayerWaiting = false;
          }
        });

        cell.addEventListener("contextmenu", (event) => {
          if (
            !DOMBoard.isMutable() ||
            game.isInProgress ||
            !cell.classList.contains("ship")
          ) {
            return;
          }

          const shipIndex = DOMBoard.board.getShipIndex([j, i]);
          const ship = DOMBoard.board.ships[shipIndex];

          if (!cell.classList.contains("moving")) {
            DOMBoard.toggleShipMotion(ship.coordinates);
          }

          if (DOMBoard.board.rotateShip(shipIndex)) {
            DOMBoard.clear();
            DOMBoard.toggleShipMotion(ship.coordinates);
            DOMBoard.render();
          }

          event.preventDefault();
        });
      });
    });
  }

  document.addEventListener("keydown", (event) => boardOne.moveShip(event.key));

  return [boardOne, boardTwo];
}

export function createBoardComponent(board, mutable) {
  const boardComponent = document.createElement("div");
  boardComponent.classList.add("board");

  for (let i = 0; i < board.cells.length; i++) {
    const rowComponent = document.createElement("div");
    rowComponent.classList.add("row");

    for (let j = 0; j < board.cells[i].length; j++) {
      const cellComponent = document.createElement("button");
      cellComponent.classList.add("cell");
      cellComponent.classList.add(getCellClassName([j, i], board));
      rowComponent.appendChild(cellComponent);
    }

    boardComponent.appendChild(rowComponent);
  }

  return {
    component: boardComponent,
    board: board,
    active: false,

    isMutable: function () {
      return mutable;
    },

    clear: function () {
      const movingCells = this.component.querySelectorAll(".moving");
      if (movingCells.length === 0) return;
      for (const cell of movingCells) {
        cell.classList.remove("moving");
      }
    },

    render: function () {
      Array.from(this.component.children).forEach((row, i) => {
        Array.from(row.children).forEach((cell, j) => {
          const isMoving = cell.classList.contains("moving");

          cell.className = "cell";
          cell.classList.add(getCellClassName([j, i], this.board));
          if (isMoving) cell.classList.add("moving");
        });
      });
    },

    randomizeFormation: function () {
      const ships = [5, 4, 3, 3, 2];

      this.clear();
      this.board.reset();

      for (const ship of ships) {
        let placed = false;
        while (!placed) {
          const orientation =
            Math.random() > 0.5
              ? ShipOrientation.HORIZONTAL
              : ShipOrientation.VERTICAL;

          const x = Math.floor(
            Math.random() *
              (10 - (orientation === ShipOrientation.HORIZONTAL ? ship : 0)),
          );
          const y = Math.floor(
            Math.random() *
              (10 - (orientation === ShipOrientation.VERTICAL ? ship : 0)),
          );

          placed = board.placeShip([x, y], ship, orientation);
        }
      }

      this.render();
    },

    toggleShipMotion: function (coordinates) {
      const cell =
        this.component.children[coordinates[1]].children[coordinates[0]];

      if (!cell.classList.contains("ship")) return;

      const shipIndex = this.board.getShipIndex(coordinates);
      let ship = this.board.ships[shipIndex];

      switch (ship.orientation) {
        case ShipOrientation.HORIZONTAL:
          for (
            let i = ship.coordinates[0];
            i <= ship.coordinates[0] + ship.length - 1;
            i++
          ) {
            this.component.children[ship.coordinates[1]].children[
              i
            ].classList.toggle("moving");
          }
          break;
        case ShipOrientation.VERTICAL:
          for (
            let i = ship.coordinates[1];
            i <= ship.coordinates[1] + ship.length - 1;
            i++
          ) {
            this.component.children[i].children[
              ship.coordinates[0]
            ].classList.toggle("moving");
          }
          break;
      }
    },

    moveShip: function (key) {
      const movingShipCell = this.component.querySelector(".moving");

      if (!movingShipCell) return;

      const movingShipCoordinates = getCellIndex(movingShipCell);
      const movingShipIndex = this.board.getShipIndex(movingShipCoordinates);

      this.toggleShipMotion(movingShipCoordinates);

      let moveSuccessful = false;
      switch (key) {
        case "ArrowUp":
          if (movingShipCoordinates[1] <= 0) break;
          moveSuccessful = this.board.moveShip(movingShipIndex, [
            movingShipCoordinates[0],
            movingShipCoordinates[1] - 1,
          ]);
          break;
        case "ArrowLeft":
          if (movingShipCoordinates[0] <= 0) break;
          moveSuccessful = this.board.moveShip(movingShipIndex, [
            movingShipCoordinates[0] - 1,
            movingShipCoordinates[1],
          ]);
          break;
        case "ArrowDown":
          if (movingShipCoordinates[1] >= this.board.size - 1) break;
          moveSuccessful = this.board.moveShip(movingShipIndex, [
            movingShipCoordinates[0],
            movingShipCoordinates[1] + 1,
          ]);
          break;
        case "ArrowRight":
          if (movingShipCoordinates[0] >= this.board.size - 1) break;
          moveSuccessful = this.board.moveShip(movingShipIndex, [
            movingShipCoordinates[0] + 1,
            movingShipCoordinates[1],
          ]);
          break;
      }

      if (!moveSuccessful) {
        this.toggleShipMotion(movingShipCoordinates);
        return;
      }

      this.render();

      const movedShip = this.board.ships[movingShipIndex];
      this.toggleShipMotion(movedShip.coordinates);
    },

    receiveAttack: function (coordinates) {
      const cell = board.cells[coordinates[1]][coordinates[0]];
      if (
        (cell !== CellState.EMPTY && cell !== CellState.SHIP) ||
        !this.active
      ) {
        return;
      }

      board.receiveAttack(coordinates);
      this.render();

      this.active = false;
    },

    computerAttack: async function () {
      let x, y;

      let valid = false;
      while (!valid) {
        x = Math.floor(Math.random() * board.size);
        y = Math.floor(Math.random() * board.size);

        const cell = this.component.children[y].children[x];
        if (
          cell.classList.contains("empty") ||
          cell.classList.contains("ship")
        ) {
          break;
        }
      }

      await new Promise((r) => setTimeout(r, 500));

      this.board.receiveAttack([x, y]);
      this.render();
    },
  };
}

function getCellIndex(cell) {
  return [
    Array.prototype.indexOf.call(cell.parentNode.children, cell),
    Array.prototype.indexOf.call(
      cell.parentNode.parentNode.children,
      cell.parentNode,
    ),
  ];
}

function getCellClassName(coordinates, board, secret = false) {
  const cell = board.cells[coordinates[1]][coordinates[0]];
  switch (cell) {
    case CellState.EMPTY:
      return "empty";
    case CellState.MISS:
      return "miss";
    case CellState.SHIP:
      return secret ? "empty" : "ship";
    case CellState.HIT:
      return "hit";
    case CellState.SUNK:
      return "sunk";
  }
}
