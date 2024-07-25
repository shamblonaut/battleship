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

import carrierSvg from "../../assets/carrier.svg";
import battleshipSvg from "../../assets/battleship.svg";
import destroyerSvg from "../../assets/destroyer.svg";
import submarineSvg from "../../assets/submarine.svg";
import patrolSvg from "../../assets/patrol.svg";

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
    boardOne.renderShips();
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
    let movingShipIndex = null;
    let relativeDraggingCell = null;

    Array.from(DOMBoard.component.children[1].children).forEach((row, i) => {
      Array.from(row.children).forEach((cell, j) => {
        function handleAttackEvent() {
          if (
            !DOMBoard.isAttackable() ||
            !DOMBoard.active ||
            !game.isInProgress ||
            game.isGameOver ||
            !game.isPlayerWaiting
          ) {
            return;
          }

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

        function handleShipRotate(event) {
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
        }

        function handleShipMoveStart() {
          if (!DOMBoard.editing) return;

          const shipIndex = DOMBoard.board.getShipIndex([j, i]);
          if (shipIndex === -1) return;

          movingShipIndex = shipIndex;

          const shipCoordinates =
            DOMBoard.board.ships[movingShipIndex].coordinates;
          relativeDraggingCell = [
            j - shipCoordinates[0],
            i - shipCoordinates[1],
          ];

          DOMBoard.toggleShipMotion([j, i]);
        }

        cell.addEventListener("click", handleAttackEvent);
        cell.addEventListener("touchstart", handleAttackEvent);

        cell.addEventListener("contextmenu", handleShipRotate);

        cell.addEventListener("mousedown", (event) => {
          if (event.button === 2) return;
          handleShipMoveStart();
        });
        cell.addEventListener("touchstart", handleShipMoveStart);
      });
    });

    function handleShipMoving(event) {
      let target;
      if (event.touches && event.touches.length > 0) {
        target = document.elementFromPoint(
          event.touches[0].clientX,
          event.touches[0].clientY,
        );
        event.preventDefault();
      } else {
        target = event.target;
      }

      if (!DOMBoard.editing) return;
      if (!target.classList.contains("cell")) return;
      if (movingShipIndex === null) return;

      DOMBoard.clear();

      const cellIndex = getCellIndex(target);
      const newCoordinates = [
        cellIndex[0] - relativeDraggingCell[0],
        cellIndex[1] - relativeDraggingCell[1],
      ];
      if (
        newCoordinates[0] < 0 ||
        newCoordinates[1] < 0 ||
        newCoordinates[0] >= DOMBoard.board.size ||
        newCoordinates[1] >= DOMBoard.board.size
      ) {
        return;
      }

      DOMBoard.toggleShipMotion(
        newCoordinates,
        DOMBoard.board.ships[movingShipIndex],
      );

      const shipImage = DOMBoard.component.querySelector(
        `.ship-${movingShipIndex}`,
      );
      if (shipImage) {
        const newCell =
          DOMBoard.component.children[1].children[newCoordinates[1]].children[
            newCoordinates[0]
          ];
        shipImage.style.left = `${newCell.offsetLeft}px`;
        shipImage.style.top = `${newCell.offsetTop}px`;
      }
    }

    function handleShipPlace(event) {
      // let target;
      // console.log(event);
      // if (event.touches && event.touches.length > 0) {
      //   target = document.elementFromPoint(
      //     event.touches[0].clientX,
      //     event.touches[0].clientY,
      //   );
      //   event.preventDefault();
      // } else {
      //   target = event.target;
      // }

      // if (
      //   movingShipIndex !== null &&
      //   target.classList.contains("cell") &&
      //   target.parentNode.parentNode.parentNode === DOMBoard.component
      // ) {
      //   const cellIndex = getCellIndex(target);
      //   const newCoordinates = [
      //     cellIndex[0] - relativeDraggingCell[0],
      //     cellIndex[1] - relativeDraggingCell[1],
      //   ];
      //   const movingShip = DOMBoard.board.ships[movingShipIndex];
      //
      //   if (
      //     newCoordinates[0] >= 0 &&
      //     newCoordinates[1] >= 0 &&
      //     ((movingShip.orientation === ShipOrientation.HORIZONTAL &&
      //       newCoordinates[0] < DOMBoard.board.size - movingShip.length + 1) ||
      //       (movingShip.orientation === ShipOrientation.VERTICAL &&
      //         newCoordinates[1] < DOMBoard.board.size - movingShip.length + 1))
      //   ) {
      //     DOMBoard.board.moveShip(movingShipIndex, newCoordinates);
      //   }
      // } else
      if (movingShipIndex !== null) {
        const movingCell = DOMBoard.component.querySelector(".moving");
        if (movingCell) {
          const newCoordinates = getCellIndex(movingCell);
          DOMBoard.board.moveShip(movingShipIndex, newCoordinates);
        }
      }

      movingShipIndex = null;
      relativeDraggingCell = null;

      DOMBoard.clear();
      DOMBoard.render();
    }

    DOMBoard.component.addEventListener("mouseover", handleShipMoving);
    DOMBoard.component.addEventListener("touchmove", handleShipMoving);
    document.addEventListener("mouseup", handleShipPlace);
    document.addEventListener("touchend", handleShipPlace);
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

  const windowWidth = document.documentElement.clientWidth;
  const windowHeight = document.documentElement.clientHeight;
  const isVerticalScreen = windowHeight > windowWidth;
  const cellSize =
    ((isVerticalScreen ? 5 : 4) / 100) *
    (isVerticalScreen ? windowWidth : windowHeight);

  for (let i = 0; i < board.cells.length; i++) {
    const rowComponent = document.createElement("div");
    rowComponent.classList.add("row");

    for (let j = 0; j < board.cells[i].length; j++) {
      const cellComponent = document.createElement("button");
      cellComponent.classList.add("cell");
      cellComponent.classList.add(getCellClassName([j, i], board));

      cellComponent.style.width = `${cellSize}px`;
      cellComponent.style.height = `${cellSize}px`;

      rowComponent.appendChild(cellComponent);
    }

    boardCells.appendChild(rowComponent);
  }

  const shipsContainer = document.createElement("div");
  shipsContainer.classList.add("board-ships");
  boardCells.appendChild(shipsContainer);

  const DOMBoard = {
    component: boardComponent,
    board: board,
    active: false,
    editing: false,

    cellSize,

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
        if (row.className === "board-ships") return;

        Array.from(row.children).forEach((cell, j) => {
          const isMoving = cell.classList.contains("moving");

          cell.className = "cell";
          cell.classList.add(getCellClassName([j, i], this.board));
          if (isMoving) cell.classList.add("moving");
        });
      });

      this.renderShips();
    },

    renderShips: function () {
      const shipsContainer = this.component.querySelector(".board-ships");

      Array.from(shipsContainer.children).forEach((shipImage) => {
        shipsContainer.removeChild(shipImage);
      });

      const gridGap = this.cellSize / 10;

      this.board.ships.forEach((ship, i) => {
        if (
          !this.component.classList.contains("editing") &&
          !this.component.classList.contains("only-human") &&
          (!this.component.classList.contains("attacking") ||
            this.component.classList.contains("active")) &&
          !ship.isSunk()
        ) {
          return;
        }

        const x = ship.coordinates[0];
        const y = ship.coordinates[1];

        const shipImage = new Image();
        switch (ship.type) {
          case ShipType.CARRIER:
            shipImage.src = carrierSvg;
            break;
          case ShipType.BATTLESHIP:
            shipImage.src = battleshipSvg;
            break;
          case ShipType.DESTROYER:
            shipImage.src = destroyerSvg;
            break;
          case ShipType.SUBMARINE:
            shipImage.src = submarineSvg;
            break;
          case ShipType.PATROL:
            shipImage.src = patrolSvg;
            break;
        }
        shipImage.alt = ship.type;
        shipImage.title = ship.type;
        shipImage.className = `ship-img`;
        shipImage.classList.add(`ship-${i}`);

        if (ship.isSunk()) {
          shipImage.classList.add(`ship-sunk`);
        }

        shipImage.style.width = `${4.75 * (this.cellSize + gridGap)}px`;
        shipImage.style.height = `auto`;

        if (ship.orientation === ShipOrientation.VERTICAL) {
          shipImage.style.transformOrigin = "top left";
          shipImage.style.transform = `rotate(90deg) translateY(-${cellSize}px)`;
        }

        shipImage.style.left = `${x * (this.cellSize + gridGap)}px`;
        shipImage.style.top = `${y * (this.cellSize + gridGap)}px`;

        shipsContainer.appendChild(shipImage);
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

    toggleShipMotion: function (coordinates, movingShip = null) {
      if (
        coordinates[0] < 0 ||
        coordinates[1] < 0 ||
        coordinates[0] >= this.board.size ||
        coordinates[1] >= this.board.size
      ) {
        return;
      }

      if (
        movingShip &&
        ((movingShip.orientation === ShipOrientation.HORIZONTAL &&
          coordinates[0] >= this.board.size - movingShip.length + 1) ||
          (movingShip.orientation === ShipOrientation.VERTICAL &&
            coordinates[1] >= this.board.size - movingShip.length + 1))
      ) {
        return;
      }

      if (!movingShip) {
        const cell =
          this.component.children[1].children[coordinates[1]].children[
            coordinates[0]
          ];
        if (!cell.classList.contains("ship")) return;
      }

      let ship, length, orientation;

      if (movingShip) {
        length = movingShip.length;
        orientation = movingShip.orientation;
      } else {
        ship = this.board.ships[this.board.getShipIndex(coordinates)];
        coordinates = ship.coordinates;
        length = ship.length;
        orientation = ship.orientation;
      }

      switch (orientation) {
        case ShipOrientation.HORIZONTAL:
          for (let i = coordinates[0]; i <= coordinates[0] + length - 1; i++) {
            this.component.children[1].children[coordinates[1]].children[
              i
            ].classList.toggle("moving");
          }
          break;
        case ShipOrientation.VERTICAL:
          for (let i = coordinates[1]; i <= coordinates[1] + length - 1; i++) {
            this.component.children[1].children[i].children[
              coordinates[0]
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
      DOMBoard.render();
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
