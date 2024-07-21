import { CellState } from "../core/gameBoard.js";
import { PlayerType } from "../core/player.js";
import {
  createShip,
  getShipLength,
  ShipOrientation,
  ShipType,
} from "../core/ship.js";

import refreshSvg from "../../assets/refresh-ccw.svg";
import editSvg from "../../assets/edit.svg";
import saveSvg from "../../assets/save.svg";

export function setupGameBoards(game, playerOne, playerTwo) {
  const boardOne = createBoardComponent(
    playerOne.board,
    playerOne,
    playerTwo.type !== PlayerType.COMPUTER,
    playerOne.type === PlayerType.HUMAN,
    game,
  );
  boardOne.randomizeFormation();

  boardOne.component.classList.add(
    "player-one",
    playerOne.type === PlayerType.HUMAN ? "human" : "computer",
  );
  if (playerTwo.type === PlayerType.COMPUTER) {
    boardOne.component.classList.add("only-human");
  }
  boardOne.component.addEventListener("click", () => boardOne.clear(), true);

  const boardTwo = createBoardComponent(
    playerTwo.board,
    playerTwo,
    playerOne.type !== PlayerType.COMPUTER,
    playerTwo.type === PlayerType.HUMAN,
    game,
  );
  boardTwo.randomizeFormation();

  boardTwo.component.classList.add(
    "player-two",
    playerTwo.type === PlayerType.HUMAN ? "human" : "computer",
  );

  [boardOne, boardTwo].forEach((DOMBoard, boardIndex) => {
    Array.from(DOMBoard.component.children[1].children).forEach((row, i) => {
      Array.from(row.children).forEach((cell, j) => {
        cell.addEventListener("click", () => {
          if (
            DOMBoard.editing &&
            DOMBoard.isMutable() &&
            cell.classList.contains("ship") &&
            !game.isInProgress
          ) {
            DOMBoard.toggleShipMotion([j, i]);
          } else if (
            DOMBoard.isAttackable() &&
            DOMBoard.active &&
            game.isInProgress &&
            !game.isGameOver &&
            game.isPlayerWaiting
          ) {
            const attack = DOMBoard.receiveAttack([j, i]);
            if (attack) {
              game.updateAttackInfo(
                attack.result,
                attack.ship,
                (boardIndex + 1) % 2,
              );
              game.isPlayerWaiting = false;
            }
          }
        });

        cell.addEventListener("contextmenu", (event) => {
          if (
            !DOMBoard.editing ||
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
  });

  document.addEventListener("keydown", (event) => {
    if (boardOne.editing) boardOne.moveShip(event.key);
    else if (boardTwo.editing) boardTwo.moveShip(event.key);
  });

  return [boardOne, boardTwo];
}

export function createBoardComponent(board, player, attackable, mutable, game) {
  const boardComponent = document.createElement("div");
  boardComponent.classList.add("board");

  const boardHeader = document.createElement("form");
  boardHeader.classList.add("board-header");
  boardHeader.innerHTML = `
    <p class="player-name">${player.name}</p>
    <input class="player-name-input hidden" type="text" required value="${player.name}" />
  `;
  boardComponent.appendChild(boardHeader);

  let randomizeButton, editButton, saveButton;
  if (player.type === PlayerType.HUMAN) {
    randomizeButton = document.createElement("button");
    randomizeButton.classList.add("randomize-board");
    randomizeButton.title = "Randomize ship placement";
    randomizeButton.type = "button";
    const refreshIcon = new Image();
    refreshIcon.src = refreshSvg;
    randomizeButton.appendChild(refreshIcon);

    editButton = document.createElement("button");
    editButton.classList.add("edit-board");
    editButton.title = "Edit board (change name, move ships)";
    editButton.type = "button";
    const editIcon = new Image();
    editIcon.src = editSvg;
    editButton.appendChild(editIcon);

    saveButton = document.createElement("button");
    saveButton.classList.add("save-board", "hidden");
    saveButton.title = "Save board";
    saveButton.type = "button";
    const saveIcon = new Image();
    saveIcon.src = saveSvg;
    saveButton.appendChild(saveIcon);

    const boardControls = document.createElement("div");
    boardControls.classList.add("board-controls");
    boardControls.appendChild(randomizeButton);
    boardControls.appendChild(editButton);
    boardControls.appendChild(saveButton);
    boardHeader.appendChild(boardControls);
  }

  const boardCells = document.createElement("div");
  boardCells.classList.add("board-cells");
  boardComponent.appendChild(boardCells);

  for (let i = 0; i < board.cells.length; i++) {
    const rowComponent = document.createElement("div");
    rowComponent.classList.add("row");

    for (let j = 0; j < board.cells[i].length; j++) {
      const cellComponent = document.createElement("button");
      cellComponent.classList.add("cell");
      cellComponent.classList.add(getCellClassName([j, i], board));
      rowComponent.appendChild(cellComponent);
    }

    boardCells.appendChild(rowComponent);
  }

  const DOMBoard = {
    component: boardComponent,
    board: board,
    active: false,
    editing: false,

    isAttackable: function () {
      return attackable;
    },

    isMutable: function () {
      return mutable;
    },

    clear: function () {
      const movingCells =
        this.component.children[1].querySelectorAll(".moving");
      if (movingCells.length === 0) return;
      for (const cell of movingCells) {
        cell.classList.remove("moving");
      }
    },

    render: function () {
      Array.from(this.component.children[1].children).forEach((row, i) => {
        Array.from(row.children).forEach((cell, j) => {
          const isMoving = cell.classList.contains("moving");

          cell.className = "cell";
          cell.classList.add(getCellClassName([j, i], this.board));
          if (isMoving) cell.classList.add("moving");
        });
      });
    },

    randomizeFormation: function () {
      this.clear();
      this.board.reset();

      for (const type of Object.keys(ShipType)) {
        const shipLength = getShipLength(ShipType[type]);

        let placed = false;
        while (!placed) {
          const orientation =
            Math.random() > 0.5
              ? ShipOrientation.HORIZONTAL
              : ShipOrientation.VERTICAL;

          const x = Math.floor(
            Math.random() *
              (10 -
                (orientation === ShipOrientation.HORIZONTAL ? shipLength : 0)),
          );
          const y = Math.floor(
            Math.random() *
              (10 -
                (orientation === ShipOrientation.VERTICAL ? shipLength : 0)),
          );

          placed = this.board.placeShip(
            createShip(ShipType[type], [x, y], orientation),
          );
        }
      }

      this.render();
    },

    toggleShipMotion: function (coordinates) {
      const cell =
        this.component.children[1].children[coordinates[1]].children[
          coordinates[0]
        ];

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
            this.component.children[1].children[ship.coordinates[1]].children[
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
            this.component.children[1].children[i].children[
              ship.coordinates[0]
            ].classList.toggle("moving");
          }
          break;
      }
    },

    moveShip: function (key) {
      const movingShipCell =
        this.component.children[1].querySelector(".moving");

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
      if (cell !== CellState.EMPTY && cell !== CellState.SHIP) {
        return false;
      }

      const result = board.receiveAttack(coordinates);
      this.render();

      this.active = false;

      return result;
    },

    computerAttack: async function (attackerIndex) {
      let x, y;

      let valid = false;
      while (!valid) {
        x = Math.floor(Math.random() * board.size);
        y = Math.floor(Math.random() * board.size);

        const cell = this.component.children[1].children[y].children[x];
        if (
          cell.classList.contains("empty") ||
          cell.classList.contains("ship")
        ) {
          break;
        }
      }

      await new Promise((r) => setTimeout(r, 500));

      const attack = this.receiveAttack([x, y]);
      game.updateAttackInfo(attack.result, attack.ship, attackerIndex);
    },
  };

  function saveEdits() {
    if (!DOMBoard.component.children[0].reportValidity()) return;
    boardHeader.querySelector(".player-name").classList.remove("hidden");
    boardHeader.querySelector(".player-name-input").classList.add("hidden");
    boardHeader.querySelector(".edit-board").classList.remove("hidden");
    saveButton.classList.add("hidden");

    DOMBoard.editing = false;
    DOMBoard.component.classList.remove("editing");
    DOMBoard.clear();
  }

  if (player.type === PlayerType.HUMAN) {
    randomizeButton.addEventListener("click", () => {
      DOMBoard.randomizeFormation();
    });

    editButton.addEventListener("click", () => {
      if (document.querySelector(".editing")) {
        alert("Please save the currently editing board first");
        return;
      }

      const boardHeader = DOMBoard.component.children[0];

      boardHeader.querySelector(".player-name").classList.add("hidden");
      boardHeader
        .querySelector(".player-name-input")
        .classList.remove("hidden");
      editButton.classList.add("hidden");
      boardHeader.querySelector(".save-board").classList.remove("hidden");

      DOMBoard.editing = true;
      DOMBoard.component.classList.add("editing");
    });

    boardHeader
      .querySelector(".player-name-input")
      .addEventListener("change", (event) => {
        player.name = event.target.value;
        boardHeader.querySelector(".player-name").textContent = player.name;
      });

    saveButton.addEventListener("click", saveEdits);

    boardHeader.addEventListener("submit", (event) => {
      event.preventDefault();
      saveEdits();
    });
  }

  return DOMBoard;
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
