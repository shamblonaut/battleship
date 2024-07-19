/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles/index.css":
/*!******************************!*\
  !*** ./src/styles/index.css ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./assets/edit.svg":
/*!*************************!*\
  !*** ./assets/edit.svg ***!
  \*************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "f9a985514490b0533545.svg";

/***/ }),

/***/ "./assets/refresh-ccw.svg":
/*!********************************!*\
  !*** ./assets/refresh-ccw.svg ***!
  \********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "f0e1217c1b825cb980e2.svg";

/***/ }),

/***/ "./assets/save.svg":
/*!*************************!*\
  !*** ./assets/save.svg ***!
  \*************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "7594d350dc632274f80b.svg";

/***/ }),

/***/ "./assets/x.svg":
/*!**********************!*\
  !*** ./assets/x.svg ***!
  \**********************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "6c9a4ba71a333be7b021.svg";

/***/ }),

/***/ "./src/core/gameBoard.js":
/*!*******************************!*\
  !*** ./src/core/gameBoard.js ***!
  \*******************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CellState: function() { return /* binding */ CellState; },
/* harmony export */   createGameBoard: function() { return /* binding */ createGameBoard; }
/* harmony export */ });
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ "./src/core/ship.js");

const CellState = Object.freeze({
  EMPTY: 0,
  MISS: 1,
  SHIP: 2,
  HIT: 3,
  SUNK: 4
});
function createGameBoard(size) {
  if (size <= 0) {
    throw new Error("Invalid board size");
  }
  return {
    size,
    cells: Array.from({
      length: size
    }, () => Array.from({
      length: size
    }, () => CellState.EMPTY)),
    ships: [],
    reset: function () {
      this.cells = Array.from({
        length: size
      }, () => Array.from({
        length: size
      }, () => CellState.EMPTY));
      this.ships = [];
    },
    placeShip: function (coordinates, length, orientation) {
      if (coordinates[0] < 0 || coordinates[1] < 0 || coordinates[0] >= size || coordinates[1] >= size) {
        throw new Error("Cannot place ship outside the board");
      } else if (orientation === _ship_js__WEBPACK_IMPORTED_MODULE_0__.ShipOrientation.HORIZONTAL && coordinates[0] + length - 1 >= size || orientation === _ship_js__WEBPACK_IMPORTED_MODULE_0__.ShipOrientation.VERTICAL && coordinates[1] + length - 1 >= size) {
        return false;
      }
      if (orientation === _ship_js__WEBPACK_IMPORTED_MODULE_0__.ShipOrientation.HORIZONTAL) {
        for (let i = coordinates[0]; i <= coordinates[0] + length - 1; i++) {
          if (this.cells[coordinates[1]][i] !== CellState.EMPTY) {
            return false;
          }
        }
      } else if (orientation === _ship_js__WEBPACK_IMPORTED_MODULE_0__.ShipOrientation.VERTICAL) {
        for (let i = coordinates[1]; i <= coordinates[1] + length - 1; i++) {
          if (this.cells[i][coordinates[0]] !== CellState.EMPTY) {
            return false;
          }
        }
      }
      this.ships.push((0,_ship_js__WEBPACK_IMPORTED_MODULE_0__.createShip)(length, coordinates, orientation));
      if (orientation === _ship_js__WEBPACK_IMPORTED_MODULE_0__.ShipOrientation.HORIZONTAL) {
        for (let i = coordinates[0]; i <= coordinates[0] + length - 1; i++) {
          this.cells[coordinates[1]][i] = CellState.SHIP;
        }
      } else if (orientation === _ship_js__WEBPACK_IMPORTED_MODULE_0__.ShipOrientation.VERTICAL) {
        for (let i = coordinates[1]; i <= coordinates[1] + length - 1; i++) {
          this.cells[i][coordinates[0]] = CellState.SHIP;
        }
      }
      return true;
    },
    moveShip: function (shipIndex, coordinates) {
      const ship = this.ships[shipIndex];
      if (!ship) {
        throw new Error("Ship does not exist");
      }
      if (ship.orientation === _ship_js__WEBPACK_IMPORTED_MODULE_0__.ShipOrientation.HORIZONTAL) {
        for (let i = ship.coordinates[0]; i <= ship.coordinates[0] + ship.length - 1; i++) {
          this.cells[ship.coordinates[1]][i] = CellState.EMPTY;
        }
      } else if (ship.orientation === _ship_js__WEBPACK_IMPORTED_MODULE_0__.ShipOrientation.VERTICAL) {
        for (let i = ship.coordinates[1]; i <= ship.coordinates[1] + ship.length - 1; i++) {
          this.cells[i][ship.coordinates[0]] = CellState.EMPTY;
        }
      }
      if (!this.placeShip(coordinates, ship.length, ship.orientation)) {
        if (ship.orientation === _ship_js__WEBPACK_IMPORTED_MODULE_0__.ShipOrientation.HORIZONTAL) {
          for (let i = ship.coordinates[0]; i <= ship.coordinates[0] + ship.length - 1; i++) {
            this.cells[ship.coordinates[1]][i] = CellState.SHIP;
          }
        } else if (ship.orientation === _ship_js__WEBPACK_IMPORTED_MODULE_0__.ShipOrientation.VERTICAL) {
          for (let i = ship.coordinates[1]; i <= ship.coordinates[1] + ship.length - 1; i++) {
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
      const newOrientation = ship.orientation === _ship_js__WEBPACK_IMPORTED_MODULE_0__.ShipOrientation.HORIZONTAL ? _ship_js__WEBPACK_IMPORTED_MODULE_0__.ShipOrientation.VERTICAL : _ship_js__WEBPACK_IMPORTED_MODULE_0__.ShipOrientation.HORIZONTAL;
      if (newOrientation === _ship_js__WEBPACK_IMPORTED_MODULE_0__.ShipOrientation.HORIZONTAL) {
        if (ship.coordinates[0] + ship.length - 1 >= this.size) {
          return false;
        }
        for (let i = ship.coordinates[0] + 1; i <= ship.coordinates[0] + ship.length - 1; i++) {
          if (this.cells[ship.coordinates[1]][i] !== CellState.EMPTY) {
            return false;
          }
        }
      } else if (newOrientation === _ship_js__WEBPACK_IMPORTED_MODULE_0__.ShipOrientation.VERTICAL) {
        if (ship.coordinates[1] + ship.length - 1 >= this.size) {
          return false;
        }
        for (let i = ship.coordinates[1] + 1; i <= ship.coordinates[1] + ship.length - 1; i++) {
          if (this.cells[i][ship.coordinates[0]] !== CellState.EMPTY) {
            return false;
          }
        }
      }
      if (newOrientation === _ship_js__WEBPACK_IMPORTED_MODULE_0__.ShipOrientation.HORIZONTAL) {
        for (let i = ship.coordinates[1]; i <= ship.coordinates[1] + ship.length - 1; i++) {
          this.cells[i][ship.coordinates[0]] = CellState.EMPTY;
        }
        for (let i = ship.coordinates[0]; i <= ship.coordinates[0] + ship.length - 1; i++) {
          this.cells[ship.coordinates[1]][i] = CellState.SHIP;
        }
      } else if (newOrientation === _ship_js__WEBPACK_IMPORTED_MODULE_0__.ShipOrientation.VERTICAL) {
        for (let i = ship.coordinates[0]; i <= ship.coordinates[0] + ship.length - 1; i++) {
          this.cells[ship.coordinates[1]][i] = CellState.EMPTY;
        }
        for (let i = ship.coordinates[1]; i <= ship.coordinates[1] + ship.length - 1; i++) {
          this.cells[i][ship.coordinates[0]] = CellState.SHIP;
        }
      }
      ship.orientation = newOrientation;
      return true;
    },
    getShipIndex: function (coordinates) {
      for (let i = 0; i < this.ships.length; i++) {
        if (this.ships[i].orientation === _ship_js__WEBPACK_IMPORTED_MODULE_0__.ShipOrientation.HORIZONTAL) {
          for (let j = this.ships[i].coordinates[0]; j <= this.ships[i].coordinates[0] + this.ships[i].length - 1; j++) {
            if (coordinates[0] === j && coordinates[1] === this.ships[i].coordinates[1]) {
              return i;
            }
          }
        } else if (this.ships[i].orientation === _ship_js__WEBPACK_IMPORTED_MODULE_0__.ShipOrientation.VERTICAL) {
          for (let j = this.ships[i].coordinates[1]; j <= this.ships[i].coordinates[1] + this.ships[i].length - 1; j++) {
            if (coordinates[0] === this.ships[i].coordinates[0] && coordinates[1] === j) {
              return i;
            }
          }
        }
      }
      throw new Error(`No ship found at given index: [${coordinates[0]}, ${coordinates[1]}]`);
    },
    receiveAttack: function (coordinates) {
      if (coordinates[0] < 0 || coordinates[1] < 0 || coordinates[0] >= size || coordinates[1] >= size) {
        throw new Error("Cannot attack outside the board");
      }
      if (this.cells[coordinates[1]][coordinates[0]] !== CellState.EMPTY && this.cells[coordinates[1]][coordinates[0]] !== CellState.SHIP) {
        throw new Error("Cell has already been attacked");
      }
      if (this.cells[coordinates[1]][coordinates[0]] !== CellState.SHIP) {
        this.cells[coordinates[1]][coordinates[0]] = CellState.MISS;
        return false;
      }
      for (const ship of this.ships) {
        if (ship.orientation === _ship_js__WEBPACK_IMPORTED_MODULE_0__.ShipOrientation.HORIZONTAL && coordinates[1] === ship.coordinates[1] && coordinates[0] >= ship.coordinates[0] && coordinates[0] <= ship.coordinates[0] + ship.length - 1 || ship.orientation === _ship_js__WEBPACK_IMPORTED_MODULE_0__.ShipOrientation.VERTICAL && coordinates[0] === ship.coordinates[0] && coordinates[1] >= ship.coordinates[1] && coordinates[1] <= ship.coordinates[1] + ship.length - 1) {
          ship.hit();
          if (ship.isSunk()) {
            if (ship.orientation === _ship_js__WEBPACK_IMPORTED_MODULE_0__.ShipOrientation.HORIZONTAL) {
              for (let i = ship.coordinates[0]; i <= ship.coordinates[0] + ship.length - 1; i++) {
                this.cells[ship.coordinates[1]][i] = CellState.SUNK;
              }
            } else if (ship.orientation === _ship_js__WEBPACK_IMPORTED_MODULE_0__.ShipOrientation.VERTICAL) {
              for (let i = ship.coordinates[1]; i <= ship.coordinates[1] + ship.length - 1; i++) {
                this.cells[i][ship.coordinates[0]] = CellState.SUNK;
              }
            }
          } else {
            this.cells[coordinates[1]][coordinates[0]] = CellState.HIT;
          }
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
    }
  };
}

/***/ }),

/***/ "./src/core/player.js":
/*!****************************!*\
  !*** ./src/core/player.js ***!
  \****************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlayerType: function() { return /* binding */ PlayerType; },
/* harmony export */   createPlayer: function() { return /* binding */ createPlayer; }
/* harmony export */ });
/* harmony import */ var _gameBoard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameBoard.js */ "./src/core/gameBoard.js");

const PlayerType = Object.freeze({
  HUMAN: "HUMAN",
  COMPUTER: "COMPUTER"
});
function createPlayer(name, type, boardSize) {
  return {
    name,
    type,
    board: (0,_gameBoard_js__WEBPACK_IMPORTED_MODULE_0__.createGameBoard)(boardSize)
  };
}

/***/ }),

/***/ "./src/core/ship.js":
/*!**************************!*\
  !*** ./src/core/ship.js ***!
  \**************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShipOrientation: function() { return /* binding */ ShipOrientation; },
/* harmony export */   createShip: function() { return /* binding */ createShip; }
/* harmony export */ });
const ShipOrientation = Object.freeze({
  HORIZONTAL: "HORIZONTAL",
  VERTICAL: "VERTICAL"
});
function createShip(length) {
  let coordinates = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [undefined, undefined];
  let orientation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ShipOrientation.HORIZONTAL;
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
    }
  };
}

/***/ }),

/***/ "./src/dom/boards.js":
/*!***************************!*\
  !*** ./src/dom/boards.js ***!
  \***************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createBoardComponent: function() { return /* binding */ createBoardComponent; },
/* harmony export */   setupGameBoards: function() { return /* binding */ setupGameBoards; }
/* harmony export */ });
/* harmony import */ var _core_gameBoard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/gameBoard.js */ "./src/core/gameBoard.js");
/* harmony import */ var _core_player_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/player.js */ "./src/core/player.js");
/* harmony import */ var _core_ship_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/ship.js */ "./src/core/ship.js");
/* harmony import */ var _assets_refresh_ccw_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../assets/refresh-ccw.svg */ "./assets/refresh-ccw.svg");
/* harmony import */ var _assets_edit_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../assets/edit.svg */ "./assets/edit.svg");
/* harmony import */ var _assets_save_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../assets/save.svg */ "./assets/save.svg");






function setupGameBoards(game, playerOne, playerTwo) {
  const boardOne = createBoardComponent(playerOne.board, playerOne, playerTwo.type !== _core_player_js__WEBPACK_IMPORTED_MODULE_1__.PlayerType.COMPUTER, playerOne.type === _core_player_js__WEBPACK_IMPORTED_MODULE_1__.PlayerType.HUMAN);
  boardOne.randomizeFormation();
  boardOne.component.classList.add("player-one", playerOne.type === _core_player_js__WEBPACK_IMPORTED_MODULE_1__.PlayerType.HUMAN ? "human" : "computer");
  if (playerTwo.type === _core_player_js__WEBPACK_IMPORTED_MODULE_1__.PlayerType.COMPUTER) {
    boardOne.component.classList.add("only-human");
  }
  boardOne.component.addEventListener("click", () => boardOne.clear(), true);
  const boardTwo = createBoardComponent(playerTwo.board, playerTwo, playerOne.type !== _core_player_js__WEBPACK_IMPORTED_MODULE_1__.PlayerType.COMPUTER, playerTwo.type === _core_player_js__WEBPACK_IMPORTED_MODULE_1__.PlayerType.HUMAN);
  boardTwo.randomizeFormation();
  boardTwo.component.classList.add("player-two", playerTwo.type === _core_player_js__WEBPACK_IMPORTED_MODULE_1__.PlayerType.HUMAN ? "human" : "computer");
  for (const DOMBoard of [boardOne, boardTwo]) {
    Array.from(DOMBoard.component.children[1].children).forEach((row, i) => {
      Array.from(row.children).forEach((cell, j) => {
        cell.addEventListener("click", () => {
          if (DOMBoard.editing && DOMBoard.isMutable() && cell.classList.contains("ship") && !game.isInProgress) {
            DOMBoard.toggleShipMotion([j, i]);
          } else if (DOMBoard.isAttackable() && DOMBoard.active && game.isInProgress && !game.isGameOver && game.isPlayerWaiting) {
            if (DOMBoard.receiveAttack([j, i])) {
              game.isPlayerWaiting = false;
            }
          }
        });
        cell.addEventListener("contextmenu", event => {
          if (!DOMBoard.editing || !DOMBoard.isMutable() || game.isInProgress || !cell.classList.contains("ship")) {
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
  document.addEventListener("keydown", event => {
    if (boardOne.editing) boardOne.moveShip(event.key);else if (boardTwo.editing) boardTwo.moveShip(event.key);
  });
  return [boardOne, boardTwo];
}
function createBoardComponent(board, player, attackable, mutable) {
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
  if (player.type === _core_player_js__WEBPACK_IMPORTED_MODULE_1__.PlayerType.HUMAN) {
    randomizeButton = document.createElement("button");
    randomizeButton.classList.add("randomize-board");
    randomizeButton.title = "Randomize ship placement";
    randomizeButton.type = "button";
    const refreshIcon = new Image();
    refreshIcon.src = _assets_refresh_ccw_svg__WEBPACK_IMPORTED_MODULE_3__;
    randomizeButton.appendChild(refreshIcon);
    editButton = document.createElement("button");
    editButton.classList.add("edit-board");
    editButton.title = "Edit board (change name, move ships)";
    editButton.type = "button";
    const editIcon = new Image();
    editIcon.src = _assets_edit_svg__WEBPACK_IMPORTED_MODULE_4__;
    editButton.appendChild(editIcon);
    saveButton = document.createElement("button");
    saveButton.classList.add("save-board", "hidden");
    saveButton.title = "Save board";
    saveButton.type = "button";
    const saveIcon = new Image();
    saveIcon.src = _assets_save_svg__WEBPACK_IMPORTED_MODULE_5__;
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
      const movingCells = this.component.children[1].querySelectorAll(".moving");
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
      const ships = [5, 4, 3, 3, 2];
      this.clear();
      this.board.reset();
      for (const ship of ships) {
        let placed = false;
        while (!placed) {
          const orientation = Math.random() > 0.5 ? _core_ship_js__WEBPACK_IMPORTED_MODULE_2__.ShipOrientation.HORIZONTAL : _core_ship_js__WEBPACK_IMPORTED_MODULE_2__.ShipOrientation.VERTICAL;
          const x = Math.floor(Math.random() * (10 - (orientation === _core_ship_js__WEBPACK_IMPORTED_MODULE_2__.ShipOrientation.HORIZONTAL ? ship : 0)));
          const y = Math.floor(Math.random() * (10 - (orientation === _core_ship_js__WEBPACK_IMPORTED_MODULE_2__.ShipOrientation.VERTICAL ? ship : 0)));
          placed = this.board.placeShip([x, y], ship, orientation);
        }
      }
      this.render();
    },
    toggleShipMotion: function (coordinates) {
      const cell = this.component.children[1].children[coordinates[1]].children[coordinates[0]];
      if (!cell.classList.contains("ship")) return;
      const shipIndex = this.board.getShipIndex(coordinates);
      let ship = this.board.ships[shipIndex];
      switch (ship.orientation) {
        case _core_ship_js__WEBPACK_IMPORTED_MODULE_2__.ShipOrientation.HORIZONTAL:
          for (let i = ship.coordinates[0]; i <= ship.coordinates[0] + ship.length - 1; i++) {
            this.component.children[1].children[ship.coordinates[1]].children[i].classList.toggle("moving");
          }
          break;
        case _core_ship_js__WEBPACK_IMPORTED_MODULE_2__.ShipOrientation.VERTICAL:
          for (let i = ship.coordinates[1]; i <= ship.coordinates[1] + ship.length - 1; i++) {
            this.component.children[1].children[i].children[ship.coordinates[0]].classList.toggle("moving");
          }
          break;
      }
    },
    moveShip: function (key) {
      const movingShipCell = this.component.children[1].querySelector(".moving");
      if (!movingShipCell) return;
      const movingShipCoordinates = getCellIndex(movingShipCell);
      const movingShipIndex = this.board.getShipIndex(movingShipCoordinates);
      this.toggleShipMotion(movingShipCoordinates);
      let moveSuccessful = false;
      switch (key) {
        case "ArrowUp":
          if (movingShipCoordinates[1] <= 0) break;
          moveSuccessful = this.board.moveShip(movingShipIndex, [movingShipCoordinates[0], movingShipCoordinates[1] - 1]);
          break;
        case "ArrowLeft":
          if (movingShipCoordinates[0] <= 0) break;
          moveSuccessful = this.board.moveShip(movingShipIndex, [movingShipCoordinates[0] - 1, movingShipCoordinates[1]]);
          break;
        case "ArrowDown":
          if (movingShipCoordinates[1] >= this.board.size - 1) break;
          moveSuccessful = this.board.moveShip(movingShipIndex, [movingShipCoordinates[0], movingShipCoordinates[1] + 1]);
          break;
        case "ArrowRight":
          if (movingShipCoordinates[0] >= this.board.size - 1) break;
          moveSuccessful = this.board.moveShip(movingShipIndex, [movingShipCoordinates[0] + 1, movingShipCoordinates[1]]);
          break;
      }
      if (!moveSuccessful) {
        this.toggleShipMotion(movingShipCoordinates);
        return;
      }
      this.render();
      const movedShip = this.board.ships[movingShipIndex];
      this.toggleShipMotion(movedShip.coordinates);
      console.log("doing something?");
    },
    receiveAttack: function (coordinates) {
      const cell = board.cells[coordinates[1]][coordinates[0]];
      if (cell !== _core_gameBoard_js__WEBPACK_IMPORTED_MODULE_0__.CellState.EMPTY && cell !== _core_gameBoard_js__WEBPACK_IMPORTED_MODULE_0__.CellState.SHIP) {
        return false;
      }
      board.receiveAttack(coordinates);
      this.render();
      this.active = false;
      return true;
    },
    computerAttack: async function () {
      let x, y;
      let valid = false;
      while (!valid) {
        x = Math.floor(Math.random() * board.size);
        y = Math.floor(Math.random() * board.size);
        const cell = this.component.children[1].children[y].children[x];
        if (cell.classList.contains("empty") || cell.classList.contains("ship")) {
          break;
        }
      }
      await new Promise(r => setTimeout(r, 500));
      this.board.receiveAttack([x, y]);
      this.render();
    }
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
  if (player.type === _core_player_js__WEBPACK_IMPORTED_MODULE_1__.PlayerType.HUMAN) {
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
      boardHeader.querySelector(".player-name-input").classList.remove("hidden");
      editButton.classList.add("hidden");
      boardHeader.querySelector(".save-board").classList.remove("hidden");
      DOMBoard.editing = true;
      DOMBoard.component.classList.add("editing");
    });
    boardHeader.querySelector(".player-name-input").addEventListener("change", event => {
      player.name = event.target.value;
      boardHeader.querySelector(".player-name").textContent = player.name;
    });
    saveButton.addEventListener("click", saveEdits);
    boardHeader.addEventListener("submit", event => {
      event.preventDefault();
      saveEdits();
    });
  }
  return DOMBoard;
}
function getCellIndex(cell) {
  return [Array.prototype.indexOf.call(cell.parentNode.children, cell), Array.prototype.indexOf.call(cell.parentNode.parentNode.children, cell.parentNode)];
}
function getCellClassName(coordinates, board) {
  let secret = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  const cell = board.cells[coordinates[1]][coordinates[0]];
  switch (cell) {
    case _core_gameBoard_js__WEBPACK_IMPORTED_MODULE_0__.CellState.EMPTY:
      return "empty";
    case _core_gameBoard_js__WEBPACK_IMPORTED_MODULE_0__.CellState.MISS:
      return "miss";
    case _core_gameBoard_js__WEBPACK_IMPORTED_MODULE_0__.CellState.SHIP:
      return secret ? "empty" : "ship";
    case _core_gameBoard_js__WEBPACK_IMPORTED_MODULE_0__.CellState.HIT:
      return "hit";
    case _core_gameBoard_js__WEBPACK_IMPORTED_MODULE_0__.CellState.SUNK:
      return "sunk";
  }
}

/***/ }),

/***/ "./src/dom/controls.js":
/*!*****************************!*\
  !*** ./src/dom/controls.js ***!
  \*****************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setupControls: function() { return /* binding */ setupControls; }
/* harmony export */ });
/* harmony import */ var _core_player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/player.js */ "./src/core/player.js");
/* harmony import */ var _assets_x_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../assets/x.svg */ "./assets/x.svg");
/* harmony import */ var _assets_edit_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../assets/edit.svg */ "./assets/edit.svg");
/* harmony import */ var _assets_refresh_ccw_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../assets/refresh-ccw.svg */ "./assets/refresh-ccw.svg");




function setupControls(game) {
  const startButton = document.querySelector(".start");
  startButton.addEventListener("click", async () => {
    if (document.querySelector(".save-board:not(.hidden)")) {
      alert("Please save your boards before starting the game");
      return;
    }
    await game.start();
  });
  const resetButton = document.querySelector(".controls .reset");
  resetButton.addEventListener("click", () => game.reset());
  const computerOpponentButton = document.querySelector(".opponent-computer");
  const friendOpponentButton = document.querySelector(".opponent-friend");
  // const slider = document.querySelector(".slider");

  computerOpponentButton.addEventListener("click", () => {
    // if (!slider.classList.contains("slider-right")) return;
    if (computerOpponentButton.classList.contains("active-mode")) return;

    // slider.classList.remove("slider-right");
    computerOpponentButton.classList.add("active-mode");
    friendOpponentButton.classList.remove("active-mode");
    game.changeMode((0,_core_player_js__WEBPACK_IMPORTED_MODULE_0__.createPlayer)("Player", _core_player_js__WEBPACK_IMPORTED_MODULE_0__.PlayerType.HUMAN, 10), (0,_core_player_js__WEBPACK_IMPORTED_MODULE_0__.createPlayer)("Computer", _core_player_js__WEBPACK_IMPORTED_MODULE_0__.PlayerType.COMPUTER, 10));
  });
  friendOpponentButton.addEventListener("click", () => {
    // if (slider.classList.contains("slider-right")) return;
    if (friendOpponentButton.classList.contains("active-mode")) return;

    // slider.classList.add("slider-right");
    friendOpponentButton.classList.add("active-mode");
    computerOpponentButton.classList.remove("active-mode");
    game.changeMode((0,_core_player_js__WEBPACK_IMPORTED_MODULE_0__.createPlayer)("Player 1", _core_player_js__WEBPACK_IMPORTED_MODULE_0__.PlayerType.HUMAN, 10), (0,_core_player_js__WEBPACK_IMPORTED_MODULE_0__.createPlayer)("Player 2", _core_player_js__WEBPACK_IMPORTED_MODULE_0__.PlayerType.HUMAN, 10));
  });
  const helpLink = document.querySelector(".help");
  helpLink.addEventListener("click", () => {
    const modalOverlay = document.createElement("div");
    modalOverlay.classList.add("modal-overlay");
    modalOverlay.appendChild(createHelpModal());
    document.querySelector("#root").appendChild(modalOverlay);
  });
}
function createHelpModal() {
  const helpModal = document.createElement("div");
  helpModal.classList.add("help-modal");
  helpModal.innerHTML = `
      <h1>How to Play</h1>
      <section>
        <h3>Choose Game Mode</h3>
        <p>
          By default, you'll be playing against the computer.
          If you want to play with a friend, choose the "Friend" option in the opponent section,
          and play by passing around your device.
        </p>
      </section>
      <section>
        <h3>Edit your board(s)</h3>
        <p>
          <ul>
            <li>Click on the edit button (<img class="edit-img" />) to change the names of the players, and move around your ships.</li>
            <li>You can also click the refresh button (<img class="refresh-img" />) to randomize the placement of ships in the board.</li>
          </ul>
        </p>
      </section>
      <section>
        <h3>Start playing!</h3>
        <p>
          Press on "<b>Start Game</b>" to start playing.
          If you are not familiar with <a href="https://en.wikipedia.org/wiki/Battleship_(game)">battleship</a>, here's a quick run-through of the mechanics:
          <ul>
            <li>It is a two-player game, with each player having a board with ships arranged on it according to their wishes.</li>
            <li>
              There are 5 ships of varying lengths: 
              <table>
                <tr>
                  <th>Ship</th>
                  <th>Size</th>
                </tr>
                <tr>
                  <td>Carrier</td>
                  <td>5</td>
                </tr>
                <tr>
                  <td>Battleship</td>
                  <td>4</td>
                </tr>
                <tr>
                  <td>Destroyer</td>
                  <td>3</td>
                </tr>
                <tr>
                  <td>Submarine</td>
                  <td>3</td>
                </tr>
                <tr>
                  <td>Patrol Boat</td>
                  <td>2</td>
                </tr>
              </table>
            </li>
            <li>
              Each player takes turns shooting a square on the other player's board.
              They have no information on whether there is a ship on that square or not.
              After each try, they will be informed whether they had hit a ship or missed their shot.
            </li>
            <li>After all the squares of a particular ship is hit, it will be marked (and informed to the shooting player) as sunk.</li>
            <li>After all the ships of a particular board is sunk, that player loses the game, and the shooting player wins.</li>
          </ul>
        </p>
      </section>
      <h1 class="thanks">Thanks for Playing!</h1>
    `;
  helpModal.querySelector(".edit-img").src = _assets_edit_svg__WEBPACK_IMPORTED_MODULE_2__;
  helpModal.querySelector(".refresh-img").src = _assets_refresh_ccw_svg__WEBPACK_IMPORTED_MODULE_3__;
  const closeButton = document.createElement("button");
  closeButton.classList.add("close-button");
  const closeIcon = new Image();
  closeIcon.src = _assets_x_svg__WEBPACK_IMPORTED_MODULE_1__;
  closeButton.appendChild(closeIcon);
  closeButton.addEventListener("click", () => {
    helpModal.remove();
    document.querySelector(".modal-overlay").remove();
  });
  helpModal.appendChild(closeButton);
  return helpModal;
}

/***/ }),

/***/ "./src/dom/game.js":
/*!*************************!*\
  !*** ./src/dom/game.js ***!
  \*************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setupGame: function() { return /* binding */ setupGame; }
/* harmony export */ });
/* harmony import */ var _core_player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/player.js */ "./src/core/player.js");
/* harmony import */ var _boards_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./boards.js */ "./src/dom/boards.js");


const GameMode = Object.freeze({
  COMPUTER: "computer",
  FRIEND: "friend"
});
function setupGame(playerOne, playerTwo) {
  const game = {
    mode: GameMode.COMPUTER,
    players: [playerOne, playerTwo],
    currentPlayerIndex: Math.floor(Math.random() * 2),
    isInProgress: false,
    isGameOver: false,
    isPlayerWaiting: false,
    boards: [],
    start: async function () {
      this.isInProgress = true;
      this.isGameOver = false;
      this.isPlayerWaiting = false;
      this.boards[0].clear();
      document.querySelector(".start").classList.add("hidden");
      document.querySelector(".reset").classList.remove("hidden");
      document.querySelector(".info").classList.remove("hidden");
      document.querySelector(".opponent").classList.add("hidden");
      document.querySelector("#root").classList.add("in-progress");
      document.querySelectorAll(".board-controls").forEach(boardControls => {
        boardControls.classList.add("hidden");
      });
      await this.play();
    },
    reset: function () {
      const gameOverScreen = document.querySelector(".game-over-screen");
      if (gameOverScreen) gameOverScreen.remove();
      document.querySelector(".start").classList.remove("hidden");
      document.querySelector(".reset").classList.add("hidden");
      document.querySelector(".info").classList.add("hidden");
      document.querySelector(".opponent").classList.remove("hidden");
      document.querySelector("#root").classList.remove("in-progress");
      document.querySelector("#root").classList.remove("attack-allowed");
      document.querySelectorAll(".edit-board").forEach(editButton => {
        editButton.classList.remove("hidden");
      });
      document.querySelectorAll(".active").forEach(activeBoard => {
        activeBoard.classList.remove("active");
      });
      this.isInProgress = false;
      this.isGameOver = true;
      this.isPlayerWaiting = false;
      this.players[0].board.reset();
      this.players[1].board.reset();
      this.boards = (0,_boards_js__WEBPACK_IMPORTED_MODULE_1__.setupGameBoards)(this, this.players[0], this.players[1]);
      this.boards[0].randomizeFormation();
      this.boards[1].randomizeFormation();
      const boardsContainer = document.querySelector(".boards");
      Array.from(boardsContainer.children).forEach(board => {
        boardsContainer.removeChild(board);
      });
      boardsContainer.append(this.boards[0].component, this.boards[1].component);
    },
    changeMode: function (playerOne, playerTwo) {
      this.mode = this.mode === GameMode.COMPUTER ? GameMode.FRIEND : GameMode.COMPUTER;
      this.players = [playerOne, playerTwo];
      this.currentPlayerIndex = Math.floor(Math.random() * 2);
      this.isInProgress = false;
      this.isGameOver = false;
      this.isPlayerWaiting = false;
      this.boards = (0,_boards_js__WEBPACK_IMPORTED_MODULE_1__.setupGameBoards)(this, playerOne, playerTwo);
      this.reset();
    },
    play: async function () {
      let currentPlayer = this.players[this.currentPlayerIndex];
      let nextPlayerIndex = (this.currentPlayerIndex + 1) % 2;
      let nextPlayer = this.players[nextPlayerIndex];
      while (!this.isGameOver) {
        if (currentPlayer.board.isFleetDestroyed()) {
          this.isGameOver = true;
          this.boards[(this.currentPlayerIndex + 1) % 2].component.appendChild(createGameOverScreen(currentPlayer, nextPlayer, this));
          document.querySelector(".info").classList.add("hidden");
        }
        if (this.isPlayerWaiting) {
          await new Promise(resolve => setTimeout(resolve, 100));
          continue;
        } else {
          document.querySelector("#root").classList.remove("attack-allowed");
        }
        currentPlayer = this.players[this.currentPlayerIndex];
        nextPlayerIndex = (this.currentPlayerIndex + 1) % 2;
        nextPlayer = this.players[nextPlayerIndex];
        document.querySelector(`.board-${this.currentPlayerIndex === 0 ? "two" : "one"}-info`).textContent = `${nextPlayer.type === _core_player_js__WEBPACK_IMPORTED_MODULE_0__.PlayerType.COMPUTER ? "Your" : currentPlayer.name + "'s"} turn`;
        document.querySelector(`.board-${this.currentPlayerIndex === 0 ? "one" : "two"}-info`).textContent = "";
        this.boards[this.currentPlayerIndex].component.classList.remove("active");
        this.boards[nextPlayerIndex].component.classList.add("active");
        this.boards[this.currentPlayerIndex].active = false;
        this.boards[nextPlayerIndex].active = true;
        if (currentPlayer.type === _core_player_js__WEBPACK_IMPORTED_MODULE_0__.PlayerType.COMPUTER && !this.isGameOver) {
          await this.boards[nextPlayerIndex].computerAttack();
        } else {
          this.isPlayerWaiting = true;
          if (nextPlayer.type !== _core_player_js__WEBPACK_IMPORTED_MODULE_0__.PlayerType.COMPUTER) {
            this.boards[nextPlayerIndex].component.appendChild(createPassingScreen(this.players, this.currentPlayerIndex));
          }
          document.querySelector("#root").classList.add("attack-allowed");
          if (nextPlayer.type !== _core_player_js__WEBPACK_IMPORTED_MODULE_0__.PlayerType.COMPUTER) {
            document.querySelector("#root").classList.add("passing");
          }
        }
        this.currentPlayerIndex = nextPlayerIndex;
      }
    }
  };
  game.boards = (0,_boards_js__WEBPACK_IMPORTED_MODULE_1__.setupGameBoards)(game, playerOne, playerTwo);
  return game;
}
function createGameOverScreen(currentPlayer, nextPlayer, game) {
  const gameOverScreen = document.createElement("div");
  gameOverScreen.classList.add("game-over-screen");
  let gameOverMessage;
  if (currentPlayer.type === _core_player_js__WEBPACK_IMPORTED_MODULE_0__.PlayerType.COMPUTER) {
    gameOverMessage = "YOU WON THE GAME!";
  } else if (nextPlayer.type === _core_player_js__WEBPACK_IMPORTED_MODULE_0__.PlayerType.COMPUTER) {
    gameOverMessage = "YOU LOST THE GAME!";
  } else {
    gameOverMessage = `${nextPlayer.name.toUpperCase()} WON THE GAME!`;
  }
  gameOverScreen.innerHTML = `<p>${gameOverMessage}</p>`;
  const resetButton = document.createElement("button");
  resetButton.classList.add("reset");
  resetButton.textContent = "Play Again";
  resetButton.addEventListener("click", () => game.reset());
  gameOverScreen.appendChild(resetButton);
  const passingScreen = document.querySelector(".passing-screen");
  if (passingScreen) passingScreen.remove();
  return gameOverScreen;
}
function createPassingScreen(players, currentPlayer) {
  const passingScreen = document.createElement("div");
  passingScreen.classList.add("passing-screen");
  passingScreen.innerHTML = `
    <p>Pass the device to ${players[currentPlayer].name}</p>
  `;
  const continueButton = document.createElement("button");
  continueButton.textContent = "Continue";
  continueButton.addEventListener("click", () => {
    passingScreen.remove();
    document.querySelector(".passing").classList.remove("passing");
  });
  passingScreen.appendChild(continueButton);
  return passingScreen;
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/player.js */ "./src/core/player.js");
/* harmony import */ var _dom_controls_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom/controls.js */ "./src/dom/controls.js");
/* harmony import */ var _dom_game_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom/game.js */ "./src/dom/game.js");
/* harmony import */ var _styles_index_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles/index.css */ "./src/styles/index.css");




console.log("Get Ready for Battle!");
const root = document.getElementById("root");
root.innerHTML = `
  <header>
    <h1>Battleship</h1>
    <a class="help">How to Play</a>
  </header>
  <div class="opponent">
    <p>Opponent: </p>
    <div class="options">
      <p class="opponent-computer active-mode">Computer</p>
      <p class="opponent-friend">Friend</p>
    </div>
  </div>
  <div class="controls">
    <button class="start">Start Game</button>
    <button class="reset hidden">Reset Game</button>
  </div>
  <div class="boards"></div>
  <div class="info hidden">
    <p class="board-one-info"></p>
    <p class="board-two-info"></p>
  </div>
`;
const game = (0,_dom_game_js__WEBPACK_IMPORTED_MODULE_2__.setupGame)((0,_core_player_js__WEBPACK_IMPORTED_MODULE_0__.createPlayer)("Player", _core_player_js__WEBPACK_IMPORTED_MODULE_0__.PlayerType.HUMAN, 10), (0,_core_player_js__WEBPACK_IMPORTED_MODULE_0__.createPlayer)("Computer", _core_player_js__WEBPACK_IMPORTED_MODULE_0__.PlayerType.COMPUTER, 10));
document.querySelector(".boards").append(game.boards[0].component, game.boards[1].component);
(0,_dom_controls_js__WEBPACK_IMPORTED_MODULE_1__.setupControls)(game);
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxJQUFJLEdBQUcwRyx1REFBUyxDQUNwQnRILDZEQUFZLENBQUMsUUFBUSxFQUFFSCx1REFBVSxDQUFDQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQzVDRSw2REFBWSxDQUFDLFVBQVUsRUFBRUgsdURBQVUsQ0FBQ0UsUUFBUSxFQUFFLEVBQUUsQ0FDbEQsQ0FBQztBQUVEMEMsUUFBUSxDQUNMcUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUN4QmtELE1BQU0sQ0FBQ3BILElBQUksQ0FBQzhHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQ3hHLFNBQVMsRUFBRU4sSUFBSSxDQUFDOEcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDeEcsU0FBUyxDQUFDO0FBQzdEcUYsK0RBQWEsQ0FBQzNGLElBQUksQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvaW5kZXguY3NzPzRlNDIiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb3JlL2dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvcmUvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29yZS9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tL2JvYXJkcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbS9jb250cm9scy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbS9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCB7IGNyZWF0ZVNoaXAsIFNoaXBPcmllbnRhdGlvbiB9IGZyb20gXCIuL3NoaXAuanNcIjtcblxuZXhwb3J0IGNvbnN0IENlbGxTdGF0ZSA9IE9iamVjdC5mcmVlemUoe1xuICBFTVBUWTogMCxcbiAgTUlTUzogMSxcbiAgU0hJUDogMixcbiAgSElUOiAzLFxuICBTVU5LOiA0LFxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVHYW1lQm9hcmQoc2l6ZSkge1xuICBpZiAoc2l6ZSA8PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBib2FyZCBzaXplXCIpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzaXplLFxuICAgIGNlbGxzOiBBcnJheS5mcm9tKHsgbGVuZ3RoOiBzaXplIH0sICgpID0+XG4gICAgICBBcnJheS5mcm9tKHsgbGVuZ3RoOiBzaXplIH0sICgpID0+IENlbGxTdGF0ZS5FTVBUWSksXG4gICAgKSxcbiAgICBzaGlwczogW10sXG5cbiAgICByZXNldDogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5jZWxscyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IHNpemUgfSwgKCkgPT5cbiAgICAgICAgQXJyYXkuZnJvbSh7IGxlbmd0aDogc2l6ZSB9LCAoKSA9PiBDZWxsU3RhdGUuRU1QVFkpLFxuICAgICAgKTtcbiAgICAgIHRoaXMuc2hpcHMgPSBbXTtcbiAgICB9LFxuXG4gICAgcGxhY2VTaGlwOiBmdW5jdGlvbiAoY29vcmRpbmF0ZXMsIGxlbmd0aCwgb3JpZW50YXRpb24pIHtcbiAgICAgIGlmIChcbiAgICAgICAgY29vcmRpbmF0ZXNbMF0gPCAwIHx8XG4gICAgICAgIGNvb3JkaW5hdGVzWzFdIDwgMCB8fFxuICAgICAgICBjb29yZGluYXRlc1swXSA+PSBzaXplIHx8XG4gICAgICAgIGNvb3JkaW5hdGVzWzFdID49IHNpemVcbiAgICAgICkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgcGxhY2Ugc2hpcCBvdXRzaWRlIHRoZSBib2FyZFwiKTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIChvcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwgJiZcbiAgICAgICAgICBjb29yZGluYXRlc1swXSArIGxlbmd0aCAtIDEgPj0gc2l6ZSkgfHxcbiAgICAgICAgKG9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwgJiZcbiAgICAgICAgICBjb29yZGluYXRlc1sxXSArIGxlbmd0aCAtIDEgPj0gc2l6ZSlcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IGNvb3JkaW5hdGVzWzBdOyBpIDw9IGNvb3JkaW5hdGVzWzBdICsgbGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgaWYgKHRoaXMuY2VsbHNbY29vcmRpbmF0ZXNbMV1dW2ldICE9PSBDZWxsU3RhdGUuRU1QVFkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAob3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICBmb3IgKGxldCBpID0gY29vcmRpbmF0ZXNbMV07IGkgPD0gY29vcmRpbmF0ZXNbMV0gKyBsZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICBpZiAodGhpcy5jZWxsc1tpXVtjb29yZGluYXRlc1swXV0gIT09IENlbGxTdGF0ZS5FTVBUWSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLnNoaXBzLnB1c2goY3JlYXRlU2hpcChsZW5ndGgsIGNvb3JkaW5hdGVzLCBvcmllbnRhdGlvbikpO1xuXG4gICAgICBpZiAob3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSBjb29yZGluYXRlc1swXTsgaSA8PSBjb29yZGluYXRlc1swXSArIGxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgIHRoaXMuY2VsbHNbY29vcmRpbmF0ZXNbMV1dW2ldID0gQ2VsbFN0YXRlLlNISVA7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAob3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICBmb3IgKGxldCBpID0gY29vcmRpbmF0ZXNbMV07IGkgPD0gY29vcmRpbmF0ZXNbMV0gKyBsZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICB0aGlzLmNlbGxzW2ldW2Nvb3JkaW5hdGVzWzBdXSA9IENlbGxTdGF0ZS5TSElQO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICBtb3ZlU2hpcDogZnVuY3Rpb24gKHNoaXBJbmRleCwgY29vcmRpbmF0ZXMpIHtcbiAgICAgIGNvbnN0IHNoaXAgPSB0aGlzLnNoaXBzW3NoaXBJbmRleF07XG4gICAgICBpZiAoIXNoaXApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2hpcCBkb2VzIG5vdCBleGlzdFwiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMKSB7XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5jZWxsc1tzaGlwLmNvb3JkaW5hdGVzWzFdXVtpXSA9IENlbGxTdGF0ZS5FTVBUWTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwpIHtcbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMV07XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmNlbGxzW2ldW3NoaXAuY29vcmRpbmF0ZXNbMF1dID0gQ2VsbFN0YXRlLkVNUFRZO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5wbGFjZVNoaXAoY29vcmRpbmF0ZXMsIHNoaXAubGVuZ3RoLCBzaGlwLm9yaWVudGF0aW9uKSkge1xuICAgICAgICBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwpIHtcbiAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgICAgaSsrXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmNlbGxzW3NoaXAuY29vcmRpbmF0ZXNbMV1dW2ldID0gQ2VsbFN0YXRlLlNISVA7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMV07XG4gICAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBpKytcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuY2VsbHNbaV1bc2hpcC5jb29yZGluYXRlc1swXV0gPSBDZWxsU3RhdGUuU0hJUDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNoaXBzW3NoaXBJbmRleF0gPSB0aGlzLnNoaXBzLnBvcCgpO1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuXG4gICAgcm90YXRlU2hpcDogZnVuY3Rpb24gKHNoaXBJbmRleCkge1xuICAgICAgY29uc3Qgc2hpcCA9IHRoaXMuc2hpcHNbc2hpcEluZGV4XTtcbiAgICAgIGlmICghc2hpcCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTaGlwIGRvZXMgbm90IGV4aXN0XCIpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBuZXdPcmllbnRhdGlvbiA9XG4gICAgICAgIHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMXG4gICAgICAgICAgPyBTaGlwT3JpZW50YXRpb24uVkVSVElDQUxcbiAgICAgICAgICA6IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMO1xuXG4gICAgICBpZiAobmV3T3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMKSB7XG4gICAgICAgIGlmIChzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxID49IHRoaXMuc2l6ZSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgMTtcbiAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMF0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgaSsrXG4gICAgICAgICkge1xuICAgICAgICAgIGlmICh0aGlzLmNlbGxzW3NoaXAuY29vcmRpbmF0ZXNbMV1dW2ldICE9PSBDZWxsU3RhdGUuRU1QVFkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAobmV3T3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICBpZiAoc2hpcC5jb29yZGluYXRlc1sxXSArIHNoaXAubGVuZ3RoIC0gMSA+PSB0aGlzLnNpemUpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1sxXSArIDE7XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICBpZiAodGhpcy5jZWxsc1tpXVtzaGlwLmNvb3JkaW5hdGVzWzBdXSAhPT0gQ2VsbFN0YXRlLkVNUFRZKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChuZXdPcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwpIHtcbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMV07XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmNlbGxzW2ldW3NoaXAuY29vcmRpbmF0ZXNbMF1dID0gQ2VsbFN0YXRlLkVNUFRZO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5jZWxsc1tzaGlwLmNvb3JkaW5hdGVzWzFdXVtpXSA9IENlbGxTdGF0ZS5TSElQO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKG5ld09yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwpIHtcbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMF07XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmNlbGxzW3NoaXAuY29vcmRpbmF0ZXNbMV1dW2ldID0gQ2VsbFN0YXRlLkVNUFRZO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzFdO1xuICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1sxXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5jZWxsc1tpXVtzaGlwLmNvb3JkaW5hdGVzWzBdXSA9IENlbGxTdGF0ZS5TSElQO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHNoaXAub3JpZW50YXRpb24gPSBuZXdPcmllbnRhdGlvbjtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICBnZXRTaGlwSW5kZXg6IGZ1bmN0aW9uIChjb29yZGluYXRlcykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLnNoaXBzW2ldLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCkge1xuICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICBsZXQgaiA9IHRoaXMuc2hpcHNbaV0uY29vcmRpbmF0ZXNbMF07XG4gICAgICAgICAgICBqIDw9IHRoaXMuc2hpcHNbaV0uY29vcmRpbmF0ZXNbMF0gKyB0aGlzLnNoaXBzW2ldLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBqKytcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgY29vcmRpbmF0ZXNbMF0gPT09IGogJiZcbiAgICAgICAgICAgICAgY29vcmRpbmF0ZXNbMV0gPT09IHRoaXMuc2hpcHNbaV0uY29vcmRpbmF0ZXNbMV1cbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zaGlwc1tpXS5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMKSB7XG4gICAgICAgICAgZm9yIChcbiAgICAgICAgICAgIGxldCBqID0gdGhpcy5zaGlwc1tpXS5jb29yZGluYXRlc1sxXTtcbiAgICAgICAgICAgIGogPD0gdGhpcy5zaGlwc1tpXS5jb29yZGluYXRlc1sxXSArIHRoaXMuc2hpcHNbaV0ubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGorK1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBjb29yZGluYXRlc1swXSA9PT0gdGhpcy5zaGlwc1tpXS5jb29yZGluYXRlc1swXSAmJlxuICAgICAgICAgICAgICBjb29yZGluYXRlc1sxXSA9PT0galxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBObyBzaGlwIGZvdW5kIGF0IGdpdmVuIGluZGV4OiBbJHtjb29yZGluYXRlc1swXX0sICR7Y29vcmRpbmF0ZXNbMV19XWAsXG4gICAgICApO1xuICAgIH0sXG5cbiAgICByZWNlaXZlQXR0YWNrOiBmdW5jdGlvbiAoY29vcmRpbmF0ZXMpIHtcbiAgICAgIGlmIChcbiAgICAgICAgY29vcmRpbmF0ZXNbMF0gPCAwIHx8XG4gICAgICAgIGNvb3JkaW5hdGVzWzFdIDwgMCB8fFxuICAgICAgICBjb29yZGluYXRlc1swXSA+PSBzaXplIHx8XG4gICAgICAgIGNvb3JkaW5hdGVzWzFdID49IHNpemVcbiAgICAgICkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgYXR0YWNrIG91dHNpZGUgdGhlIGJvYXJkXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuY2VsbHNbY29vcmRpbmF0ZXNbMV1dW2Nvb3JkaW5hdGVzWzBdXSAhPT0gQ2VsbFN0YXRlLkVNUFRZICYmXG4gICAgICAgIHRoaXMuY2VsbHNbY29vcmRpbmF0ZXNbMV1dW2Nvb3JkaW5hdGVzWzBdXSAhPT0gQ2VsbFN0YXRlLlNISVBcbiAgICAgICkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDZWxsIGhhcyBhbHJlYWR5IGJlZW4gYXR0YWNrZWRcIik7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmNlbGxzW2Nvb3JkaW5hdGVzWzFdXVtjb29yZGluYXRlc1swXV0gIT09IENlbGxTdGF0ZS5TSElQKSB7XG4gICAgICAgIHRoaXMuY2VsbHNbY29vcmRpbmF0ZXNbMV1dW2Nvb3JkaW5hdGVzWzBdXSA9IENlbGxTdGF0ZS5NSVNTO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGZvciAoY29uc3Qgc2hpcCBvZiB0aGlzLnNoaXBzKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwgJiZcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzWzFdID09PSBzaGlwLmNvb3JkaW5hdGVzWzFdICYmXG4gICAgICAgICAgICBjb29yZGluYXRlc1swXSA+PSBzaGlwLmNvb3JkaW5hdGVzWzBdICYmXG4gICAgICAgICAgICBjb29yZGluYXRlc1swXSA8PSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxKSB8fFxuICAgICAgICAgIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwgJiZcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzWzBdID09PSBzaGlwLmNvb3JkaW5hdGVzWzBdICYmXG4gICAgICAgICAgICBjb29yZGluYXRlc1sxXSA+PSBzaGlwLmNvb3JkaW5hdGVzWzFdICYmXG4gICAgICAgICAgICBjb29yZGluYXRlc1sxXSA8PSBzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxKVxuICAgICAgICApIHtcbiAgICAgICAgICBzaGlwLmhpdCgpO1xuXG4gICAgICAgICAgaWYgKHNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgICAgIGlmIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCkge1xuICAgICAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1swXTtcbiAgICAgICAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMF0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgaSsrXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2VsbHNbc2hpcC5jb29yZGluYXRlc1sxXV1baV0gPSBDZWxsU3RhdGUuU1VOSztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwpIHtcbiAgICAgICAgICAgICAgZm9yIChcbiAgICAgICAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMV07XG4gICAgICAgICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgIGkrK1xuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW2ldW3NoaXAuY29vcmRpbmF0ZXNbMF1dID0gQ2VsbFN0YXRlLlNVTks7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jZWxsc1tjb29yZGluYXRlc1sxXV1bY29vcmRpbmF0ZXNbMF1dID0gQ2VsbFN0YXRlLkhJVDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBpc0ZsZWV0RGVzdHJveWVkOiBmdW5jdGlvbiAoKSB7XG4gICAgICBmb3IgKGNvbnN0IHNoaXAgb2YgdGhpcy5zaGlwcykge1xuICAgICAgICBpZiAoIXNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgfTtcbn1cbiIsImltcG9ydCB7IGNyZWF0ZUdhbWVCb2FyZCB9IGZyb20gXCIuL2dhbWVCb2FyZC5qc1wiO1xuXG5leHBvcnQgY29uc3QgUGxheWVyVHlwZSA9IE9iamVjdC5mcmVlemUoe1xuICBIVU1BTjogXCJIVU1BTlwiLFxuICBDT01QVVRFUjogXCJDT01QVVRFUlwiLFxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQbGF5ZXIobmFtZSwgdHlwZSwgYm9hcmRTaXplKSB7XG4gIHJldHVybiB7XG4gICAgbmFtZSxcbiAgICB0eXBlLFxuICAgIGJvYXJkOiBjcmVhdGVHYW1lQm9hcmQoYm9hcmRTaXplKSxcbiAgfTtcbn1cbiIsImV4cG9ydCBjb25zdCBTaGlwT3JpZW50YXRpb24gPSBPYmplY3QuZnJlZXplKHtcbiAgSE9SSVpPTlRBTDogXCJIT1JJWk9OVEFMXCIsXG4gIFZFUlRJQ0FMOiBcIlZFUlRJQ0FMXCIsXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNoaXAoXG4gIGxlbmd0aCxcbiAgY29vcmRpbmF0ZXMgPSBbdW5kZWZpbmVkLCB1bmRlZmluZWRdLFxuICBvcmllbnRhdGlvbiA9IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMLFxuKSB7XG4gIGlmIChsZW5ndGggPCAxKSByZXR1cm4gdW5kZWZpbmVkO1xuICByZXR1cm4ge1xuICAgIGxlbmd0aCxcbiAgICBjb29yZGluYXRlcyxcbiAgICBvcmllbnRhdGlvbixcbiAgICBoaXRzOiAwLFxuXG4gICAgaGl0OiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpcy5oaXRzIDwgdGhpcy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5oaXRzKys7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGlzU3VuazogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGl0cyA9PT0gdGhpcy5sZW5ndGg7XG4gICAgfSxcbiAgfTtcbn1cbiIsImltcG9ydCB7IENlbGxTdGF0ZSB9IGZyb20gXCIuLi9jb3JlL2dhbWVCb2FyZC5qc1wiO1xuaW1wb3J0IHsgUGxheWVyVHlwZSB9IGZyb20gXCIuLi9jb3JlL3BsYXllci5qc1wiO1xuaW1wb3J0IHsgU2hpcE9yaWVudGF0aW9uIH0gZnJvbSBcIi4uL2NvcmUvc2hpcC5qc1wiO1xuXG5pbXBvcnQgcmVmcmVzaFN2ZyBmcm9tIFwiLi4vLi4vYXNzZXRzL3JlZnJlc2gtY2N3LnN2Z1wiO1xuaW1wb3J0IGVkaXRTdmcgZnJvbSBcIi4uLy4uL2Fzc2V0cy9lZGl0LnN2Z1wiO1xuaW1wb3J0IHNhdmVTdmcgZnJvbSBcIi4uLy4uL2Fzc2V0cy9zYXZlLnN2Z1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBHYW1lQm9hcmRzKGdhbWUsIHBsYXllck9uZSwgcGxheWVyVHdvKSB7XG4gIGNvbnN0IGJvYXJkT25lID0gY3JlYXRlQm9hcmRDb21wb25lbnQoXG4gICAgcGxheWVyT25lLmJvYXJkLFxuICAgIHBsYXllck9uZSxcbiAgICBwbGF5ZXJUd28udHlwZSAhPT0gUGxheWVyVHlwZS5DT01QVVRFUixcbiAgICBwbGF5ZXJPbmUudHlwZSA9PT0gUGxheWVyVHlwZS5IVU1BTixcbiAgKTtcbiAgYm9hcmRPbmUucmFuZG9taXplRm9ybWF0aW9uKCk7XG5cbiAgYm9hcmRPbmUuY29tcG9uZW50LmNsYXNzTGlzdC5hZGQoXG4gICAgXCJwbGF5ZXItb25lXCIsXG4gICAgcGxheWVyT25lLnR5cGUgPT09IFBsYXllclR5cGUuSFVNQU4gPyBcImh1bWFuXCIgOiBcImNvbXB1dGVyXCIsXG4gICk7XG4gIGlmIChwbGF5ZXJUd28udHlwZSA9PT0gUGxheWVyVHlwZS5DT01QVVRFUikge1xuICAgIGJvYXJkT25lLmNvbXBvbmVudC5jbGFzc0xpc3QuYWRkKFwib25seS1odW1hblwiKTtcbiAgfVxuICBib2FyZE9uZS5jb21wb25lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGJvYXJkT25lLmNsZWFyKCksIHRydWUpO1xuXG4gIGNvbnN0IGJvYXJkVHdvID0gY3JlYXRlQm9hcmRDb21wb25lbnQoXG4gICAgcGxheWVyVHdvLmJvYXJkLFxuICAgIHBsYXllclR3byxcbiAgICBwbGF5ZXJPbmUudHlwZSAhPT0gUGxheWVyVHlwZS5DT01QVVRFUixcbiAgICBwbGF5ZXJUd28udHlwZSA9PT0gUGxheWVyVHlwZS5IVU1BTixcbiAgKTtcbiAgYm9hcmRUd28ucmFuZG9taXplRm9ybWF0aW9uKCk7XG5cbiAgYm9hcmRUd28uY29tcG9uZW50LmNsYXNzTGlzdC5hZGQoXG4gICAgXCJwbGF5ZXItdHdvXCIsXG4gICAgcGxheWVyVHdvLnR5cGUgPT09IFBsYXllclR5cGUuSFVNQU4gPyBcImh1bWFuXCIgOiBcImNvbXB1dGVyXCIsXG4gICk7XG5cbiAgZm9yIChjb25zdCBET01Cb2FyZCBvZiBbYm9hcmRPbmUsIGJvYXJkVHdvXSkge1xuICAgIEFycmF5LmZyb20oRE9NQm9hcmQuY29tcG9uZW50LmNoaWxkcmVuWzFdLmNoaWxkcmVuKS5mb3JFYWNoKChyb3csIGkpID0+IHtcbiAgICAgIEFycmF5LmZyb20ocm93LmNoaWxkcmVuKS5mb3JFYWNoKChjZWxsLCBqKSA9PiB7XG4gICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBET01Cb2FyZC5lZGl0aW5nICYmXG4gICAgICAgICAgICBET01Cb2FyZC5pc011dGFibGUoKSAmJlxuICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJzaGlwXCIpICYmXG4gICAgICAgICAgICAhZ2FtZS5pc0luUHJvZ3Jlc3NcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIERPTUJvYXJkLnRvZ2dsZVNoaXBNb3Rpb24oW2osIGldKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgRE9NQm9hcmQuaXNBdHRhY2thYmxlKCkgJiZcbiAgICAgICAgICAgIERPTUJvYXJkLmFjdGl2ZSAmJlxuICAgICAgICAgICAgZ2FtZS5pc0luUHJvZ3Jlc3MgJiZcbiAgICAgICAgICAgICFnYW1lLmlzR2FtZU92ZXIgJiZcbiAgICAgICAgICAgIGdhbWUuaXNQbGF5ZXJXYWl0aW5nXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAoRE9NQm9hcmQucmVjZWl2ZUF0dGFjayhbaiwgaV0pKSB7XG4gICAgICAgICAgICAgIGdhbWUuaXNQbGF5ZXJXYWl0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJjb250ZXh0bWVudVwiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhRE9NQm9hcmQuZWRpdGluZyB8fFxuICAgICAgICAgICAgIURPTUJvYXJkLmlzTXV0YWJsZSgpIHx8XG4gICAgICAgICAgICBnYW1lLmlzSW5Qcm9ncmVzcyB8fFxuICAgICAgICAgICAgIWNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hpcFwiKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHNoaXBJbmRleCA9IERPTUJvYXJkLmJvYXJkLmdldFNoaXBJbmRleChbaiwgaV0pO1xuICAgICAgICAgIGNvbnN0IHNoaXAgPSBET01Cb2FyZC5ib2FyZC5zaGlwc1tzaGlwSW5kZXhdO1xuXG4gICAgICAgICAgaWYgKCFjZWxsLmNsYXNzTGlzdC5jb250YWlucyhcIm1vdmluZ1wiKSkge1xuICAgICAgICAgICAgRE9NQm9hcmQudG9nZ2xlU2hpcE1vdGlvbihzaGlwLmNvb3JkaW5hdGVzKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoRE9NQm9hcmQuYm9hcmQucm90YXRlU2hpcChzaGlwSW5kZXgpKSB7XG4gICAgICAgICAgICBET01Cb2FyZC5jbGVhcigpO1xuICAgICAgICAgICAgRE9NQm9hcmQudG9nZ2xlU2hpcE1vdGlvbihzaGlwLmNvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgIERPTUJvYXJkLnJlbmRlcigpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZXZlbnQpID0+IHtcbiAgICBpZiAoYm9hcmRPbmUuZWRpdGluZykgYm9hcmRPbmUubW92ZVNoaXAoZXZlbnQua2V5KTtcbiAgICBlbHNlIGlmIChib2FyZFR3by5lZGl0aW5nKSBib2FyZFR3by5tb3ZlU2hpcChldmVudC5rZXkpO1xuICB9KTtcblxuICByZXR1cm4gW2JvYXJkT25lLCBib2FyZFR3b107XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVCb2FyZENvbXBvbmVudChib2FyZCwgcGxheWVyLCBhdHRhY2thYmxlLCBtdXRhYmxlKSB7XG4gIGNvbnN0IGJvYXJkQ29tcG9uZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgYm9hcmRDb21wb25lbnQuY2xhc3NMaXN0LmFkZChcImJvYXJkXCIpO1xuXG4gIGNvbnN0IGJvYXJkSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIik7XG4gIGJvYXJkSGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJib2FyZC1oZWFkZXJcIik7XG4gIGJvYXJkSGVhZGVyLmlubmVySFRNTCA9IGBcbiAgICA8cCBjbGFzcz1cInBsYXllci1uYW1lXCI+JHtwbGF5ZXIubmFtZX08L3A+XG4gICAgPGlucHV0IGNsYXNzPVwicGxheWVyLW5hbWUtaW5wdXQgaGlkZGVuXCIgdHlwZT1cInRleHRcIiByZXF1aXJlZCB2YWx1ZT1cIiR7cGxheWVyLm5hbWV9XCIgLz5cbiAgYDtcbiAgYm9hcmRDb21wb25lbnQuYXBwZW5kQ2hpbGQoYm9hcmRIZWFkZXIpO1xuXG4gIGxldCByYW5kb21pemVCdXR0b24sIGVkaXRCdXR0b24sIHNhdmVCdXR0b247XG4gIGlmIChwbGF5ZXIudHlwZSA9PT0gUGxheWVyVHlwZS5IVU1BTikge1xuICAgIHJhbmRvbWl6ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgcmFuZG9taXplQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJyYW5kb21pemUtYm9hcmRcIik7XG4gICAgcmFuZG9taXplQnV0dG9uLnRpdGxlID0gXCJSYW5kb21pemUgc2hpcCBwbGFjZW1lbnRcIjtcbiAgICByYW5kb21pemVCdXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XG4gICAgY29uc3QgcmVmcmVzaEljb24gPSBuZXcgSW1hZ2UoKTtcbiAgICByZWZyZXNoSWNvbi5zcmMgPSByZWZyZXNoU3ZnO1xuICAgIHJhbmRvbWl6ZUJ1dHRvbi5hcHBlbmRDaGlsZChyZWZyZXNoSWNvbik7XG5cbiAgICBlZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBlZGl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJlZGl0LWJvYXJkXCIpO1xuICAgIGVkaXRCdXR0b24udGl0bGUgPSBcIkVkaXQgYm9hcmQgKGNoYW5nZSBuYW1lLCBtb3ZlIHNoaXBzKVwiO1xuICAgIGVkaXRCdXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XG4gICAgY29uc3QgZWRpdEljb24gPSBuZXcgSW1hZ2UoKTtcbiAgICBlZGl0SWNvbi5zcmMgPSBlZGl0U3ZnO1xuICAgIGVkaXRCdXR0b24uYXBwZW5kQ2hpbGQoZWRpdEljb24pO1xuXG4gICAgc2F2ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgc2F2ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwic2F2ZS1ib2FyZFwiLCBcImhpZGRlblwiKTtcbiAgICBzYXZlQnV0dG9uLnRpdGxlID0gXCJTYXZlIGJvYXJkXCI7XG4gICAgc2F2ZUJ1dHRvbi50eXBlID0gXCJidXR0b25cIjtcbiAgICBjb25zdCBzYXZlSWNvbiA9IG5ldyBJbWFnZSgpO1xuICAgIHNhdmVJY29uLnNyYyA9IHNhdmVTdmc7XG4gICAgc2F2ZUJ1dHRvbi5hcHBlbmRDaGlsZChzYXZlSWNvbik7XG5cbiAgICBjb25zdCBib2FyZENvbnRyb2xzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBib2FyZENvbnRyb2xzLmNsYXNzTGlzdC5hZGQoXCJib2FyZC1jb250cm9sc1wiKTtcbiAgICBib2FyZENvbnRyb2xzLmFwcGVuZENoaWxkKHJhbmRvbWl6ZUJ1dHRvbik7XG4gICAgYm9hcmRDb250cm9scy5hcHBlbmRDaGlsZChlZGl0QnV0dG9uKTtcbiAgICBib2FyZENvbnRyb2xzLmFwcGVuZENoaWxkKHNhdmVCdXR0b24pO1xuICAgIGJvYXJkSGVhZGVyLmFwcGVuZENoaWxkKGJvYXJkQ29udHJvbHMpO1xuICB9XG5cbiAgY29uc3QgYm9hcmRDZWxscyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGJvYXJkQ2VsbHMuY2xhc3NMaXN0LmFkZChcImJvYXJkLWNlbGxzXCIpO1xuICBib2FyZENvbXBvbmVudC5hcHBlbmRDaGlsZChib2FyZENlbGxzKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGJvYXJkLmNlbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qgcm93Q29tcG9uZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICByb3dDb21wb25lbnQuY2xhc3NMaXN0LmFkZChcInJvd1wiKTtcblxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgYm9hcmQuY2VsbHNbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgIGNvbnN0IGNlbGxDb21wb25lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgY2VsbENvbXBvbmVudC5jbGFzc0xpc3QuYWRkKFwiY2VsbFwiKTtcbiAgICAgIGNlbGxDb21wb25lbnQuY2xhc3NMaXN0LmFkZChnZXRDZWxsQ2xhc3NOYW1lKFtqLCBpXSwgYm9hcmQpKTtcbiAgICAgIHJvd0NvbXBvbmVudC5hcHBlbmRDaGlsZChjZWxsQ29tcG9uZW50KTtcbiAgICB9XG5cbiAgICBib2FyZENlbGxzLmFwcGVuZENoaWxkKHJvd0NvbXBvbmVudCk7XG4gIH1cblxuICBjb25zdCBET01Cb2FyZCA9IHtcbiAgICBjb21wb25lbnQ6IGJvYXJkQ29tcG9uZW50LFxuICAgIGJvYXJkOiBib2FyZCxcbiAgICBhY3RpdmU6IGZhbHNlLFxuICAgIGVkaXRpbmc6IGZhbHNlLFxuXG4gICAgaXNBdHRhY2thYmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gYXR0YWNrYWJsZTtcbiAgICB9LFxuXG4gICAgaXNNdXRhYmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbXV0YWJsZTtcbiAgICB9LFxuXG4gICAgY2xlYXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IG1vdmluZ0NlbGxzID1cbiAgICAgICAgdGhpcy5jb21wb25lbnQuY2hpbGRyZW5bMV0ucXVlcnlTZWxlY3RvckFsbChcIi5tb3ZpbmdcIik7XG4gICAgICBpZiAobW92aW5nQ2VsbHMubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICBmb3IgKGNvbnN0IGNlbGwgb2YgbW92aW5nQ2VsbHMpIHtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKFwibW92aW5nXCIpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIEFycmF5LmZyb20odGhpcy5jb21wb25lbnQuY2hpbGRyZW5bMV0uY2hpbGRyZW4pLmZvckVhY2goKHJvdywgaSkgPT4ge1xuICAgICAgICBBcnJheS5mcm9tKHJvdy5jaGlsZHJlbikuZm9yRWFjaCgoY2VsbCwgaikgPT4ge1xuICAgICAgICAgIGNvbnN0IGlzTW92aW5nID0gY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb3ZpbmdcIik7XG5cbiAgICAgICAgICBjZWxsLmNsYXNzTmFtZSA9IFwiY2VsbFwiO1xuICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChnZXRDZWxsQ2xhc3NOYW1lKFtqLCBpXSwgdGhpcy5ib2FyZCkpO1xuICAgICAgICAgIGlmIChpc01vdmluZykgY2VsbC5jbGFzc0xpc3QuYWRkKFwibW92aW5nXCIpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICByYW5kb21pemVGb3JtYXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IHNoaXBzID0gWzUsIDQsIDMsIDMsIDJdO1xuXG4gICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICB0aGlzLmJvYXJkLnJlc2V0KCk7XG5cbiAgICAgIGZvciAoY29uc3Qgc2hpcCBvZiBzaGlwcykge1xuICAgICAgICBsZXQgcGxhY2VkID0gZmFsc2U7XG4gICAgICAgIHdoaWxlICghcGxhY2VkKSB7XG4gICAgICAgICAgY29uc3Qgb3JpZW50YXRpb24gPVxuICAgICAgICAgICAgTWF0aC5yYW5kb20oKSA+IDAuNVxuICAgICAgICAgICAgICA/IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMXG4gICAgICAgICAgICAgIDogU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMO1xuXG4gICAgICAgICAgY29uc3QgeCA9IE1hdGguZmxvb3IoXG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpICpcbiAgICAgICAgICAgICAgKDEwIC0gKG9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCA/IHNoaXAgOiAwKSksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihcbiAgICAgICAgICAgIE1hdGgucmFuZG9tKCkgKlxuICAgICAgICAgICAgICAoMTAgLSAob3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCA/IHNoaXAgOiAwKSksXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIHBsYWNlZCA9IHRoaXMuYm9hcmQucGxhY2VTaGlwKFt4LCB5XSwgc2hpcCwgb3JpZW50YXRpb24pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfSxcblxuICAgIHRvZ2dsZVNoaXBNb3Rpb246IGZ1bmN0aW9uIChjb29yZGluYXRlcykge1xuICAgICAgY29uc3QgY2VsbCA9XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmNoaWxkcmVuWzFdLmNoaWxkcmVuW2Nvb3JkaW5hdGVzWzFdXS5jaGlsZHJlbltcbiAgICAgICAgICBjb29yZGluYXRlc1swXVxuICAgICAgICBdO1xuXG4gICAgICBpZiAoIWNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hpcFwiKSkgcmV0dXJuO1xuXG4gICAgICBjb25zdCBzaGlwSW5kZXggPSB0aGlzLmJvYXJkLmdldFNoaXBJbmRleChjb29yZGluYXRlcyk7XG4gICAgICBsZXQgc2hpcCA9IHRoaXMuYm9hcmQuc2hpcHNbc2hpcEluZGV4XTtcblxuICAgICAgc3dpdGNoIChzaGlwLm9yaWVudGF0aW9uKSB7XG4gICAgICAgIGNhc2UgU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUw6XG4gICAgICAgICAgZm9yIChcbiAgICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1swXTtcbiAgICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGkrK1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuY2hpbGRyZW5bMV0uY2hpbGRyZW5bc2hpcC5jb29yZGluYXRlc1sxXV0uY2hpbGRyZW5bXG4gICAgICAgICAgICAgIGlcbiAgICAgICAgICAgIF0uY2xhc3NMaXN0LnRvZ2dsZShcIm1vdmluZ1wiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMOlxuICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMV07XG4gICAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBpKytcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmNoaWxkcmVuWzFdLmNoaWxkcmVuW2ldLmNoaWxkcmVuW1xuICAgICAgICAgICAgICBzaGlwLmNvb3JkaW5hdGVzWzBdXG4gICAgICAgICAgICBdLmNsYXNzTGlzdC50b2dnbGUoXCJtb3ZpbmdcIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBtb3ZlU2hpcDogZnVuY3Rpb24gKGtleSkge1xuICAgICAgY29uc3QgbW92aW5nU2hpcENlbGwgPVxuICAgICAgICB0aGlzLmNvbXBvbmVudC5jaGlsZHJlblsxXS5xdWVyeVNlbGVjdG9yKFwiLm1vdmluZ1wiKTtcblxuICAgICAgaWYgKCFtb3ZpbmdTaGlwQ2VsbCkgcmV0dXJuO1xuXG4gICAgICBjb25zdCBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXMgPSBnZXRDZWxsSW5kZXgobW92aW5nU2hpcENlbGwpO1xuICAgICAgY29uc3QgbW92aW5nU2hpcEluZGV4ID0gdGhpcy5ib2FyZC5nZXRTaGlwSW5kZXgobW92aW5nU2hpcENvb3JkaW5hdGVzKTtcblxuICAgICAgdGhpcy50b2dnbGVTaGlwTW90aW9uKG1vdmluZ1NoaXBDb29yZGluYXRlcyk7XG5cbiAgICAgIGxldCBtb3ZlU3VjY2Vzc2Z1bCA9IGZhbHNlO1xuICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgY2FzZSBcIkFycm93VXBcIjpcbiAgICAgICAgICBpZiAobW92aW5nU2hpcENvb3JkaW5hdGVzWzFdIDw9IDApIGJyZWFrO1xuICAgICAgICAgIG1vdmVTdWNjZXNzZnVsID0gdGhpcy5ib2FyZC5tb3ZlU2hpcChtb3ZpbmdTaGlwSW5kZXgsIFtcbiAgICAgICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlc1swXSxcbiAgICAgICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlc1sxXSAtIDEsXG4gICAgICAgICAgXSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd0xlZnRcIjpcbiAgICAgICAgICBpZiAobW92aW5nU2hpcENvb3JkaW5hdGVzWzBdIDw9IDApIGJyZWFrO1xuICAgICAgICAgIG1vdmVTdWNjZXNzZnVsID0gdGhpcy5ib2FyZC5tb3ZlU2hpcChtb3ZpbmdTaGlwSW5kZXgsIFtcbiAgICAgICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlc1swXSAtIDEsXG4gICAgICAgICAgICBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMV0sXG4gICAgICAgICAgXSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd0Rvd25cIjpcbiAgICAgICAgICBpZiAobW92aW5nU2hpcENvb3JkaW5hdGVzWzFdID49IHRoaXMuYm9hcmQuc2l6ZSAtIDEpIGJyZWFrO1xuICAgICAgICAgIG1vdmVTdWNjZXNzZnVsID0gdGhpcy5ib2FyZC5tb3ZlU2hpcChtb3ZpbmdTaGlwSW5kZXgsIFtcbiAgICAgICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlc1swXSxcbiAgICAgICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlc1sxXSArIDEsXG4gICAgICAgICAgXSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd1JpZ2h0XCI6XG4gICAgICAgICAgaWYgKG1vdmluZ1NoaXBDb29yZGluYXRlc1swXSA+PSB0aGlzLmJvYXJkLnNpemUgLSAxKSBicmVhaztcbiAgICAgICAgICBtb3ZlU3VjY2Vzc2Z1bCA9IHRoaXMuYm9hcmQubW92ZVNoaXAobW92aW5nU2hpcEluZGV4LCBbXG4gICAgICAgICAgICBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMF0gKyAxLFxuICAgICAgICAgICAgbW92aW5nU2hpcENvb3JkaW5hdGVzWzFdLFxuICAgICAgICAgIF0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBpZiAoIW1vdmVTdWNjZXNzZnVsKSB7XG4gICAgICAgIHRoaXMudG9nZ2xlU2hpcE1vdGlvbihtb3ZpbmdTaGlwQ29vcmRpbmF0ZXMpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgICAgIGNvbnN0IG1vdmVkU2hpcCA9IHRoaXMuYm9hcmQuc2hpcHNbbW92aW5nU2hpcEluZGV4XTtcbiAgICAgIHRoaXMudG9nZ2xlU2hpcE1vdGlvbihtb3ZlZFNoaXAuY29vcmRpbmF0ZXMpO1xuXG4gICAgICBjb25zb2xlLmxvZyhcImRvaW5nIHNvbWV0aGluZz9cIik7XG4gICAgfSxcblxuICAgIHJlY2VpdmVBdHRhY2s6IGZ1bmN0aW9uIChjb29yZGluYXRlcykge1xuICAgICAgY29uc3QgY2VsbCA9IGJvYXJkLmNlbGxzW2Nvb3JkaW5hdGVzWzFdXVtjb29yZGluYXRlc1swXV07XG4gICAgICBpZiAoY2VsbCAhPT0gQ2VsbFN0YXRlLkVNUFRZICYmIGNlbGwgIT09IENlbGxTdGF0ZS5TSElQKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgYm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcyk7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuXG4gICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuXG4gICAgY29tcHV0ZXJBdHRhY2s6IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCB4LCB5O1xuXG4gICAgICBsZXQgdmFsaWQgPSBmYWxzZTtcbiAgICAgIHdoaWxlICghdmFsaWQpIHtcbiAgICAgICAgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGJvYXJkLnNpemUpO1xuICAgICAgICB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYm9hcmQuc2l6ZSk7XG5cbiAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuY29tcG9uZW50LmNoaWxkcmVuWzFdLmNoaWxkcmVuW3ldLmNoaWxkcmVuW3hdO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJlbXB0eVwiKSB8fFxuICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hpcFwiKVxuICAgICAgICApIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBhd2FpdCBuZXcgUHJvbWlzZSgocikgPT4gc2V0VGltZW91dChyLCA1MDApKTtcblxuICAgICAgdGhpcy5ib2FyZC5yZWNlaXZlQXR0YWNrKFt4LCB5XSk7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH0sXG4gIH07XG5cbiAgZnVuY3Rpb24gc2F2ZUVkaXRzKCkge1xuICAgIGlmICghRE9NQm9hcmQuY29tcG9uZW50LmNoaWxkcmVuWzBdLnJlcG9ydFZhbGlkaXR5KCkpIHJldHVybjtcbiAgICBib2FyZEhlYWRlci5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1uYW1lXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgYm9hcmRIZWFkZXIucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItbmFtZS1pbnB1dFwiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgIGJvYXJkSGVhZGVyLnF1ZXJ5U2VsZWN0b3IoXCIuZWRpdC1ib2FyZFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgIHNhdmVCdXR0b24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcblxuICAgIERPTUJvYXJkLmVkaXRpbmcgPSBmYWxzZTtcbiAgICBET01Cb2FyZC5jb21wb25lbnQuY2xhc3NMaXN0LnJlbW92ZShcImVkaXRpbmdcIik7XG4gICAgRE9NQm9hcmQuY2xlYXIoKTtcbiAgfVxuXG4gIGlmIChwbGF5ZXIudHlwZSA9PT0gUGxheWVyVHlwZS5IVU1BTikge1xuICAgIHJhbmRvbWl6ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgRE9NQm9hcmQucmFuZG9taXplRm9ybWF0aW9uKCk7XG4gICAgfSk7XG5cbiAgICBlZGl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lZGl0aW5nXCIpKSB7XG4gICAgICAgIGFsZXJ0KFwiUGxlYXNlIHNhdmUgdGhlIGN1cnJlbnRseSBlZGl0aW5nIGJvYXJkIGZpcnN0XCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGJvYXJkSGVhZGVyID0gRE9NQm9hcmQuY29tcG9uZW50LmNoaWxkcmVuWzBdO1xuXG4gICAgICBib2FyZEhlYWRlci5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1uYW1lXCIpLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICBib2FyZEhlYWRlclxuICAgICAgICAucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItbmFtZS1pbnB1dFwiKVxuICAgICAgICAuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgIGVkaXRCdXR0b24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIGJvYXJkSGVhZGVyLnF1ZXJ5U2VsZWN0b3IoXCIuc2F2ZS1ib2FyZFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuXG4gICAgICBET01Cb2FyZC5lZGl0aW5nID0gdHJ1ZTtcbiAgICAgIERPTUJvYXJkLmNvbXBvbmVudC5jbGFzc0xpc3QuYWRkKFwiZWRpdGluZ1wiKTtcbiAgICB9KTtcblxuICAgIGJvYXJkSGVhZGVyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItbmFtZS1pbnB1dFwiKVxuICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgIHBsYXllci5uYW1lID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICBib2FyZEhlYWRlci5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1uYW1lXCIpLnRleHRDb250ZW50ID0gcGxheWVyLm5hbWU7XG4gICAgICB9KTtcblxuICAgIHNhdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNhdmVFZGl0cyk7XG5cbiAgICBib2FyZEhlYWRlci5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldmVudCkgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHNhdmVFZGl0cygpO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIERPTUJvYXJkO1xufVxuXG5mdW5jdGlvbiBnZXRDZWxsSW5kZXgoY2VsbCkge1xuICByZXR1cm4gW1xuICAgIEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoY2VsbC5wYXJlbnROb2RlLmNoaWxkcmVuLCBjZWxsKSxcbiAgICBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKFxuICAgICAgY2VsbC5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2hpbGRyZW4sXG4gICAgICBjZWxsLnBhcmVudE5vZGUsXG4gICAgKSxcbiAgXTtcbn1cblxuZnVuY3Rpb24gZ2V0Q2VsbENsYXNzTmFtZShjb29yZGluYXRlcywgYm9hcmQsIHNlY3JldCA9IGZhbHNlKSB7XG4gIGNvbnN0IGNlbGwgPSBib2FyZC5jZWxsc1tjb29yZGluYXRlc1sxXV1bY29vcmRpbmF0ZXNbMF1dO1xuICBzd2l0Y2ggKGNlbGwpIHtcbiAgICBjYXNlIENlbGxTdGF0ZS5FTVBUWTpcbiAgICAgIHJldHVybiBcImVtcHR5XCI7XG4gICAgY2FzZSBDZWxsU3RhdGUuTUlTUzpcbiAgICAgIHJldHVybiBcIm1pc3NcIjtcbiAgICBjYXNlIENlbGxTdGF0ZS5TSElQOlxuICAgICAgcmV0dXJuIHNlY3JldCA/IFwiZW1wdHlcIiA6IFwic2hpcFwiO1xuICAgIGNhc2UgQ2VsbFN0YXRlLkhJVDpcbiAgICAgIHJldHVybiBcImhpdFwiO1xuICAgIGNhc2UgQ2VsbFN0YXRlLlNVTks6XG4gICAgICByZXR1cm4gXCJzdW5rXCI7XG4gIH1cbn1cbiIsImltcG9ydCB7IGNyZWF0ZVBsYXllciwgUGxheWVyVHlwZSB9IGZyb20gXCIuLi9jb3JlL3BsYXllci5qc1wiO1xuXG5pbXBvcnQgY2xvc2VTdmcgZnJvbSBcIi4uLy4uL2Fzc2V0cy94LnN2Z1wiO1xuaW1wb3J0IGVkaXRTdmcgZnJvbSBcIi4uLy4uL2Fzc2V0cy9lZGl0LnN2Z1wiO1xuaW1wb3J0IHJlZnJlc2hTdmcgZnJvbSBcIi4uLy4uL2Fzc2V0cy9yZWZyZXNoLWNjdy5zdmdcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwQ29udHJvbHMoZ2FtZSkge1xuICBjb25zdCBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RhcnRcIik7XG4gIHN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2F2ZS1ib2FyZDpub3QoLmhpZGRlbilcIikpIHtcbiAgICAgIGFsZXJ0KFwiUGxlYXNlIHNhdmUgeW91ciBib2FyZHMgYmVmb3JlIHN0YXJ0aW5nIHRoZSBnYW1lXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGF3YWl0IGdhbWUuc3RhcnQoKTtcbiAgfSk7XG5cbiAgY29uc3QgcmVzZXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRyb2xzIC5yZXNldFwiKTtcbiAgcmVzZXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGdhbWUucmVzZXQoKSk7XG5cbiAgY29uc3QgY29tcHV0ZXJPcHBvbmVudEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3Bwb25lbnQtY29tcHV0ZXJcIik7XG4gIGNvbnN0IGZyaWVuZE9wcG9uZW50QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vcHBvbmVudC1mcmllbmRcIik7XG4gIC8vIGNvbnN0IHNsaWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2xpZGVyXCIpO1xuXG4gIGNvbXB1dGVyT3Bwb25lbnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAvLyBpZiAoIXNsaWRlci5jbGFzc0xpc3QuY29udGFpbnMoXCJzbGlkZXItcmlnaHRcIikpIHJldHVybjtcbiAgICBpZiAoY29tcHV0ZXJPcHBvbmVudEJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmUtbW9kZVwiKSkgcmV0dXJuO1xuXG4gICAgLy8gc2xpZGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJzbGlkZXItcmlnaHRcIik7XG4gICAgY29tcHV0ZXJPcHBvbmVudEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlLW1vZGVcIik7XG4gICAgZnJpZW5kT3Bwb25lbnRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZS1tb2RlXCIpO1xuICAgIGdhbWUuY2hhbmdlTW9kZShcbiAgICAgIGNyZWF0ZVBsYXllcihcIlBsYXllclwiLCBQbGF5ZXJUeXBlLkhVTUFOLCAxMCksXG4gICAgICBjcmVhdGVQbGF5ZXIoXCJDb21wdXRlclwiLCBQbGF5ZXJUeXBlLkNPTVBVVEVSLCAxMCksXG4gICAgKTtcbiAgfSk7XG4gIGZyaWVuZE9wcG9uZW50QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgLy8gaWYgKHNsaWRlci5jbGFzc0xpc3QuY29udGFpbnMoXCJzbGlkZXItcmlnaHRcIikpIHJldHVybjtcbiAgICBpZiAoZnJpZW5kT3Bwb25lbnRCdXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlLW1vZGVcIikpIHJldHVybjtcblxuICAgIC8vIHNsaWRlci5jbGFzc0xpc3QuYWRkKFwic2xpZGVyLXJpZ2h0XCIpO1xuICAgIGZyaWVuZE9wcG9uZW50QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmUtbW9kZVwiKTtcbiAgICBjb21wdXRlck9wcG9uZW50QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmUtbW9kZVwiKTtcbiAgICBnYW1lLmNoYW5nZU1vZGUoXG4gICAgICBjcmVhdGVQbGF5ZXIoXCJQbGF5ZXIgMVwiLCBQbGF5ZXJUeXBlLkhVTUFOLCAxMCksXG4gICAgICBjcmVhdGVQbGF5ZXIoXCJQbGF5ZXIgMlwiLCBQbGF5ZXJUeXBlLkhVTUFOLCAxMCksXG4gICAgKTtcbiAgfSk7XG5cbiAgY29uc3QgaGVscExpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlbHBcIik7XG4gIGhlbHBMaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgY29uc3QgbW9kYWxPdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBtb2RhbE92ZXJsYXkuY2xhc3NMaXN0LmFkZChcIm1vZGFsLW92ZXJsYXlcIik7XG4gICAgbW9kYWxPdmVybGF5LmFwcGVuZENoaWxkKGNyZWF0ZUhlbHBNb2RhbCgpKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jvb3RcIikuYXBwZW5kQ2hpbGQobW9kYWxPdmVybGF5KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUhlbHBNb2RhbCgpIHtcbiAgY29uc3QgaGVscE1vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgaGVscE1vZGFsLmNsYXNzTGlzdC5hZGQoXCJoZWxwLW1vZGFsXCIpO1xuICBoZWxwTW9kYWwuaW5uZXJIVE1MID0gYFxuICAgICAgPGgxPkhvdyB0byBQbGF5PC9oMT5cbiAgICAgIDxzZWN0aW9uPlxuICAgICAgICA8aDM+Q2hvb3NlIEdhbWUgTW9kZTwvaDM+XG4gICAgICAgIDxwPlxuICAgICAgICAgIEJ5IGRlZmF1bHQsIHlvdSdsbCBiZSBwbGF5aW5nIGFnYWluc3QgdGhlIGNvbXB1dGVyLlxuICAgICAgICAgIElmIHlvdSB3YW50IHRvIHBsYXkgd2l0aCBhIGZyaWVuZCwgY2hvb3NlIHRoZSBcIkZyaWVuZFwiIG9wdGlvbiBpbiB0aGUgb3Bwb25lbnQgc2VjdGlvbixcbiAgICAgICAgICBhbmQgcGxheSBieSBwYXNzaW5nIGFyb3VuZCB5b3VyIGRldmljZS5cbiAgICAgICAgPC9wPlxuICAgICAgPC9zZWN0aW9uPlxuICAgICAgPHNlY3Rpb24+XG4gICAgICAgIDxoMz5FZGl0IHlvdXIgYm9hcmQocyk8L2gzPlxuICAgICAgICA8cD5cbiAgICAgICAgICA8dWw+XG4gICAgICAgICAgICA8bGk+Q2xpY2sgb24gdGhlIGVkaXQgYnV0dG9uICg8aW1nIGNsYXNzPVwiZWRpdC1pbWdcIiAvPikgdG8gY2hhbmdlIHRoZSBuYW1lcyBvZiB0aGUgcGxheWVycywgYW5kIG1vdmUgYXJvdW5kIHlvdXIgc2hpcHMuPC9saT5cbiAgICAgICAgICAgIDxsaT5Zb3UgY2FuIGFsc28gY2xpY2sgdGhlIHJlZnJlc2ggYnV0dG9uICg8aW1nIGNsYXNzPVwicmVmcmVzaC1pbWdcIiAvPikgdG8gcmFuZG9taXplIHRoZSBwbGFjZW1lbnQgb2Ygc2hpcHMgaW4gdGhlIGJvYXJkLjwvbGk+XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9wPlxuICAgICAgPC9zZWN0aW9uPlxuICAgICAgPHNlY3Rpb24+XG4gICAgICAgIDxoMz5TdGFydCBwbGF5aW5nITwvaDM+XG4gICAgICAgIDxwPlxuICAgICAgICAgIFByZXNzIG9uIFwiPGI+U3RhcnQgR2FtZTwvYj5cIiB0byBzdGFydCBwbGF5aW5nLlxuICAgICAgICAgIElmIHlvdSBhcmUgbm90IGZhbWlsaWFyIHdpdGggPGEgaHJlZj1cImh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0JhdHRsZXNoaXBfKGdhbWUpXCI+YmF0dGxlc2hpcDwvYT4sIGhlcmUncyBhIHF1aWNrIHJ1bi10aHJvdWdoIG9mIHRoZSBtZWNoYW5pY3M6XG4gICAgICAgICAgPHVsPlxuICAgICAgICAgICAgPGxpPkl0IGlzIGEgdHdvLXBsYXllciBnYW1lLCB3aXRoIGVhY2ggcGxheWVyIGhhdmluZyBhIGJvYXJkIHdpdGggc2hpcHMgYXJyYW5nZWQgb24gaXQgYWNjb3JkaW5nIHRvIHRoZWlyIHdpc2hlcy48L2xpPlxuICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICBUaGVyZSBhcmUgNSBzaGlwcyBvZiB2YXJ5aW5nIGxlbmd0aHM6IFxuICAgICAgICAgICAgICA8dGFibGU+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgPHRoPlNoaXA8L3RoPlxuICAgICAgICAgICAgICAgICAgPHRoPlNpemU8L3RoPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgPHRkPkNhcnJpZXI8L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkPjU8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgPHRkPkJhdHRsZXNoaXA8L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkPjQ8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgPHRkPkRlc3Ryb3llcjwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQ+MzwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICA8dGQ+U3VibWFyaW5lPC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZD4zPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgIDx0ZD5QYXRyb2wgQm9hdDwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQ+MjwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgIEVhY2ggcGxheWVyIHRha2VzIHR1cm5zIHNob290aW5nIGEgc3F1YXJlIG9uIHRoZSBvdGhlciBwbGF5ZXIncyBib2FyZC5cbiAgICAgICAgICAgICAgVGhleSBoYXZlIG5vIGluZm9ybWF0aW9uIG9uIHdoZXRoZXIgdGhlcmUgaXMgYSBzaGlwIG9uIHRoYXQgc3F1YXJlIG9yIG5vdC5cbiAgICAgICAgICAgICAgQWZ0ZXIgZWFjaCB0cnksIHRoZXkgd2lsbCBiZSBpbmZvcm1lZCB3aGV0aGVyIHRoZXkgaGFkIGhpdCBhIHNoaXAgb3IgbWlzc2VkIHRoZWlyIHNob3QuXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPGxpPkFmdGVyIGFsbCB0aGUgc3F1YXJlcyBvZiBhIHBhcnRpY3VsYXIgc2hpcCBpcyBoaXQsIGl0IHdpbGwgYmUgbWFya2VkIChhbmQgaW5mb3JtZWQgdG8gdGhlIHNob290aW5nIHBsYXllcikgYXMgc3Vuay48L2xpPlxuICAgICAgICAgICAgPGxpPkFmdGVyIGFsbCB0aGUgc2hpcHMgb2YgYSBwYXJ0aWN1bGFyIGJvYXJkIGlzIHN1bmssIHRoYXQgcGxheWVyIGxvc2VzIHRoZSBnYW1lLCBhbmQgdGhlIHNob290aW5nIHBsYXllciB3aW5zLjwvbGk+XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9wPlxuICAgICAgPC9zZWN0aW9uPlxuICAgICAgPGgxIGNsYXNzPVwidGhhbmtzXCI+VGhhbmtzIGZvciBQbGF5aW5nITwvaDE+XG4gICAgYDtcblxuICBoZWxwTW9kYWwucXVlcnlTZWxlY3RvcihcIi5lZGl0LWltZ1wiKS5zcmMgPSBlZGl0U3ZnO1xuICBoZWxwTW9kYWwucXVlcnlTZWxlY3RvcihcIi5yZWZyZXNoLWltZ1wiKS5zcmMgPSByZWZyZXNoU3ZnO1xuXG4gIGNvbnN0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgY2xvc2VCdXR0b24uY2xhc3NMaXN0LmFkZChcImNsb3NlLWJ1dHRvblwiKTtcbiAgY29uc3QgY2xvc2VJY29uID0gbmV3IEltYWdlKCk7XG4gIGNsb3NlSWNvbi5zcmMgPSBjbG9zZVN2ZztcbiAgY2xvc2VCdXR0b24uYXBwZW5kQ2hpbGQoY2xvc2VJY29uKTtcbiAgY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBoZWxwTW9kYWwucmVtb3ZlKCk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbC1vdmVybGF5XCIpLnJlbW92ZSgpO1xuICB9KTtcbiAgaGVscE1vZGFsLmFwcGVuZENoaWxkKGNsb3NlQnV0dG9uKTtcblxuICByZXR1cm4gaGVscE1vZGFsO1xufVxuIiwiaW1wb3J0IHsgUGxheWVyVHlwZSB9IGZyb20gXCIuLi9jb3JlL3BsYXllci5qc1wiO1xuaW1wb3J0IHsgc2V0dXBHYW1lQm9hcmRzIH0gZnJvbSBcIi4vYm9hcmRzLmpzXCI7XG5cbmNvbnN0IEdhbWVNb2RlID0gT2JqZWN0LmZyZWV6ZSh7XG4gIENPTVBVVEVSOiBcImNvbXB1dGVyXCIsXG4gIEZSSUVORDogXCJmcmllbmRcIixcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBHYW1lKHBsYXllck9uZSwgcGxheWVyVHdvKSB7XG4gIGNvbnN0IGdhbWUgPSB7XG4gICAgbW9kZTogR2FtZU1vZGUuQ09NUFVURVIsXG5cbiAgICBwbGF5ZXJzOiBbcGxheWVyT25lLCBwbGF5ZXJUd29dLFxuICAgIGN1cnJlbnRQbGF5ZXJJbmRleDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMiksXG5cbiAgICBpc0luUHJvZ3Jlc3M6IGZhbHNlLFxuICAgIGlzR2FtZU92ZXI6IGZhbHNlLFxuICAgIGlzUGxheWVyV2FpdGluZzogZmFsc2UsXG5cbiAgICBib2FyZHM6IFtdLFxuXG4gICAgc3RhcnQ6IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuaXNJblByb2dyZXNzID0gdHJ1ZTtcbiAgICAgIHRoaXMuaXNHYW1lT3ZlciA9IGZhbHNlO1xuICAgICAgdGhpcy5pc1BsYXllcldhaXRpbmcgPSBmYWxzZTtcblxuICAgICAgdGhpcy5ib2FyZHNbMF0uY2xlYXIoKTtcblxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGFydFwiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXNldFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmZvXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm9wcG9uZW50XCIpLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jvb3RcIikuY2xhc3NMaXN0LmFkZChcImluLXByb2dyZXNzXCIpO1xuXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmJvYXJkLWNvbnRyb2xzXCIpLmZvckVhY2goKGJvYXJkQ29udHJvbHMpID0+IHtcbiAgICAgICAgYm9hcmRDb250cm9scy5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgfSk7XG5cbiAgICAgIGF3YWl0IHRoaXMucGxheSgpO1xuICAgIH0sXG5cbiAgICByZXNldDogZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgZ2FtZU92ZXJTY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWUtb3Zlci1zY3JlZW5cIik7XG4gICAgICBpZiAoZ2FtZU92ZXJTY3JlZW4pIGdhbWVPdmVyU2NyZWVuLnJlbW92ZSgpO1xuXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0YXJ0XCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlc2V0XCIpLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZm9cIikuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3Bwb25lbnRcIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcm9vdFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaW4tcHJvZ3Jlc3NcIik7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jvb3RcIikuY2xhc3NMaXN0LnJlbW92ZShcImF0dGFjay1hbGxvd2VkXCIpO1xuXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmVkaXQtYm9hcmRcIikuZm9yRWFjaCgoZWRpdEJ1dHRvbikgPT4ge1xuICAgICAgICBlZGl0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYWN0aXZlXCIpLmZvckVhY2goKGFjdGl2ZUJvYXJkKSA9PiB7XG4gICAgICAgIGFjdGl2ZUJvYXJkLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5pc0luUHJvZ3Jlc3MgPSBmYWxzZTtcbiAgICAgIHRoaXMuaXNHYW1lT3ZlciA9IHRydWU7XG4gICAgICB0aGlzLmlzUGxheWVyV2FpdGluZyA9IGZhbHNlO1xuXG4gICAgICB0aGlzLnBsYXllcnNbMF0uYm9hcmQucmVzZXQoKTtcbiAgICAgIHRoaXMucGxheWVyc1sxXS5ib2FyZC5yZXNldCgpO1xuXG4gICAgICB0aGlzLmJvYXJkcyA9IHNldHVwR2FtZUJvYXJkcyh0aGlzLCB0aGlzLnBsYXllcnNbMF0sIHRoaXMucGxheWVyc1sxXSk7XG5cbiAgICAgIHRoaXMuYm9hcmRzWzBdLnJhbmRvbWl6ZUZvcm1hdGlvbigpO1xuICAgICAgdGhpcy5ib2FyZHNbMV0ucmFuZG9taXplRm9ybWF0aW9uKCk7XG5cbiAgICAgIGNvbnN0IGJvYXJkc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYm9hcmRzXCIpO1xuICAgICAgQXJyYXkuZnJvbShib2FyZHNDb250YWluZXIuY2hpbGRyZW4pLmZvckVhY2goKGJvYXJkKSA9PiB7XG4gICAgICAgIGJvYXJkc0NvbnRhaW5lci5yZW1vdmVDaGlsZChib2FyZCk7XG4gICAgICB9KTtcbiAgICAgIGJvYXJkc0NvbnRhaW5lci5hcHBlbmQoXG4gICAgICAgIHRoaXMuYm9hcmRzWzBdLmNvbXBvbmVudCxcbiAgICAgICAgdGhpcy5ib2FyZHNbMV0uY29tcG9uZW50LFxuICAgICAgKTtcbiAgICB9LFxuXG4gICAgY2hhbmdlTW9kZTogZnVuY3Rpb24gKHBsYXllck9uZSwgcGxheWVyVHdvKSB7XG4gICAgICB0aGlzLm1vZGUgPVxuICAgICAgICB0aGlzLm1vZGUgPT09IEdhbWVNb2RlLkNPTVBVVEVSID8gR2FtZU1vZGUuRlJJRU5EIDogR2FtZU1vZGUuQ09NUFVURVI7XG4gICAgICB0aGlzLnBsYXllcnMgPSBbcGxheWVyT25lLCBwbGF5ZXJUd29dO1xuICAgICAgdGhpcy5jdXJyZW50UGxheWVySW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKTtcblxuICAgICAgdGhpcy5pc0luUHJvZ3Jlc3MgPSBmYWxzZTtcbiAgICAgIHRoaXMuaXNHYW1lT3ZlciA9IGZhbHNlO1xuICAgICAgdGhpcy5pc1BsYXllcldhaXRpbmcgPSBmYWxzZTtcblxuICAgICAgdGhpcy5ib2FyZHMgPSBzZXR1cEdhbWVCb2FyZHModGhpcywgcGxheWVyT25lLCBwbGF5ZXJUd28pO1xuXG4gICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfSxcblxuICAgIHBsYXk6IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBjdXJyZW50UGxheWVyID0gdGhpcy5wbGF5ZXJzW3RoaXMuY3VycmVudFBsYXllckluZGV4XTtcbiAgICAgIGxldCBuZXh0UGxheWVySW5kZXggPSAodGhpcy5jdXJyZW50UGxheWVySW5kZXggKyAxKSAlIDI7XG4gICAgICBsZXQgbmV4dFBsYXllciA9IHRoaXMucGxheWVyc1tuZXh0UGxheWVySW5kZXhdO1xuXG4gICAgICB3aGlsZSAoIXRoaXMuaXNHYW1lT3Zlcikge1xuICAgICAgICBpZiAoY3VycmVudFBsYXllci5ib2FyZC5pc0ZsZWV0RGVzdHJveWVkKCkpIHtcbiAgICAgICAgICB0aGlzLmlzR2FtZU92ZXIgPSB0cnVlO1xuXG4gICAgICAgICAgdGhpcy5ib2FyZHNbKHRoaXMuY3VycmVudFBsYXllckluZGV4ICsgMSkgJSAyXS5jb21wb25lbnQuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICBjcmVhdGVHYW1lT3ZlclNjcmVlbihjdXJyZW50UGxheWVyLCBuZXh0UGxheWVyLCB0aGlzKSxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmZvXCIpLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc1BsYXllcldhaXRpbmcpIHtcbiAgICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCAxMDApKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jvb3RcIikuY2xhc3NMaXN0LnJlbW92ZShcImF0dGFjay1hbGxvd2VkXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgY3VycmVudFBsYXllciA9IHRoaXMucGxheWVyc1t0aGlzLmN1cnJlbnRQbGF5ZXJJbmRleF07XG4gICAgICAgIG5leHRQbGF5ZXJJbmRleCA9ICh0aGlzLmN1cnJlbnRQbGF5ZXJJbmRleCArIDEpICUgMjtcbiAgICAgICAgbmV4dFBsYXllciA9IHRoaXMucGxheWVyc1tuZXh0UGxheWVySW5kZXhdO1xuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgYC5ib2FyZC0ke3RoaXMuY3VycmVudFBsYXllckluZGV4ID09PSAwID8gXCJ0d29cIiA6IFwib25lXCJ9LWluZm9gLFxuICAgICAgICApLnRleHRDb250ZW50ID1cbiAgICAgICAgICBgJHtuZXh0UGxheWVyLnR5cGUgPT09IFBsYXllclR5cGUuQ09NUFVURVIgPyBcIllvdXJcIiA6IGN1cnJlbnRQbGF5ZXIubmFtZSArIFwiJ3NcIn0gdHVybmA7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgYC5ib2FyZC0ke3RoaXMuY3VycmVudFBsYXllckluZGV4ID09PSAwID8gXCJvbmVcIiA6IFwidHdvXCJ9LWluZm9gLFxuICAgICAgICApLnRleHRDb250ZW50ID0gXCJcIjtcblxuICAgICAgICB0aGlzLmJvYXJkc1t0aGlzLmN1cnJlbnRQbGF5ZXJJbmRleF0uY29tcG9uZW50LmNsYXNzTGlzdC5yZW1vdmUoXG4gICAgICAgICAgXCJhY3RpdmVcIixcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5ib2FyZHNbbmV4dFBsYXllckluZGV4XS5jb21wb25lbnQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcblxuICAgICAgICB0aGlzLmJvYXJkc1t0aGlzLmN1cnJlbnRQbGF5ZXJJbmRleF0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYm9hcmRzW25leHRQbGF5ZXJJbmRleF0uYWN0aXZlID0gdHJ1ZTtcblxuICAgICAgICBpZiAoY3VycmVudFBsYXllci50eXBlID09PSBQbGF5ZXJUeXBlLkNPTVBVVEVSICYmICF0aGlzLmlzR2FtZU92ZXIpIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLmJvYXJkc1tuZXh0UGxheWVySW5kZXhdLmNvbXB1dGVyQXR0YWNrKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5pc1BsYXllcldhaXRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgaWYgKG5leHRQbGF5ZXIudHlwZSAhPT0gUGxheWVyVHlwZS5DT01QVVRFUikge1xuICAgICAgICAgICAgdGhpcy5ib2FyZHNbbmV4dFBsYXllckluZGV4XS5jb21wb25lbnQuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICAgIGNyZWF0ZVBhc3NpbmdTY3JlZW4odGhpcy5wbGF5ZXJzLCB0aGlzLmN1cnJlbnRQbGF5ZXJJbmRleCksXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcm9vdFwiKS5jbGFzc0xpc3QuYWRkKFwiYXR0YWNrLWFsbG93ZWRcIik7XG5cbiAgICAgICAgICBpZiAobmV4dFBsYXllci50eXBlICE9PSBQbGF5ZXJUeXBlLkNPTVBVVEVSKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jvb3RcIikuY2xhc3NMaXN0LmFkZChcInBhc3NpbmdcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jdXJyZW50UGxheWVySW5kZXggPSBuZXh0UGxheWVySW5kZXg7XG4gICAgICB9XG4gICAgfSxcbiAgfTtcblxuICBnYW1lLmJvYXJkcyA9IHNldHVwR2FtZUJvYXJkcyhnYW1lLCBwbGF5ZXJPbmUsIHBsYXllclR3byk7XG5cbiAgcmV0dXJuIGdhbWU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUdhbWVPdmVyU2NyZWVuKGN1cnJlbnRQbGF5ZXIsIG5leHRQbGF5ZXIsIGdhbWUpIHtcbiAgY29uc3QgZ2FtZU92ZXJTY3JlZW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBnYW1lT3ZlclNjcmVlbi5jbGFzc0xpc3QuYWRkKFwiZ2FtZS1vdmVyLXNjcmVlblwiKTtcblxuICBsZXQgZ2FtZU92ZXJNZXNzYWdlO1xuICBpZiAoY3VycmVudFBsYXllci50eXBlID09PSBQbGF5ZXJUeXBlLkNPTVBVVEVSKSB7XG4gICAgZ2FtZU92ZXJNZXNzYWdlID0gXCJZT1UgV09OIFRIRSBHQU1FIVwiO1xuICB9IGVsc2UgaWYgKG5leHRQbGF5ZXIudHlwZSA9PT0gUGxheWVyVHlwZS5DT01QVVRFUikge1xuICAgIGdhbWVPdmVyTWVzc2FnZSA9IFwiWU9VIExPU1QgVEhFIEdBTUUhXCI7XG4gIH0gZWxzZSB7XG4gICAgZ2FtZU92ZXJNZXNzYWdlID0gYCR7bmV4dFBsYXllci5uYW1lLnRvVXBwZXJDYXNlKCl9IFdPTiBUSEUgR0FNRSFgO1xuICB9XG5cbiAgZ2FtZU92ZXJTY3JlZW4uaW5uZXJIVE1MID0gYDxwPiR7Z2FtZU92ZXJNZXNzYWdlfTwvcD5gO1xuXG4gIGNvbnN0IHJlc2V0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgcmVzZXRCdXR0b24uY2xhc3NMaXN0LmFkZChcInJlc2V0XCIpO1xuICByZXNldEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiUGxheSBBZ2FpblwiO1xuICByZXNldEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gZ2FtZS5yZXNldCgpKTtcbiAgZ2FtZU92ZXJTY3JlZW4uYXBwZW5kQ2hpbGQocmVzZXRCdXR0b24pO1xuXG4gIGNvbnN0IHBhc3NpbmdTY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhc3Npbmctc2NyZWVuXCIpO1xuICBpZiAocGFzc2luZ1NjcmVlbikgcGFzc2luZ1NjcmVlbi5yZW1vdmUoKTtcblxuICByZXR1cm4gZ2FtZU92ZXJTY3JlZW47XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVBhc3NpbmdTY3JlZW4ocGxheWVycywgY3VycmVudFBsYXllcikge1xuICBjb25zdCBwYXNzaW5nU2NyZWVuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgcGFzc2luZ1NjcmVlbi5jbGFzc0xpc3QuYWRkKFwicGFzc2luZy1zY3JlZW5cIik7XG4gIHBhc3NpbmdTY3JlZW4uaW5uZXJIVE1MID0gYFxuICAgIDxwPlBhc3MgdGhlIGRldmljZSB0byAke3BsYXllcnNbY3VycmVudFBsYXllcl0ubmFtZX08L3A+XG4gIGA7XG4gIGNvbnN0IGNvbnRpbnVlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgY29udGludWVCdXR0b24udGV4dENvbnRlbnQgPSBcIkNvbnRpbnVlXCI7XG4gIGNvbnRpbnVlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgcGFzc2luZ1NjcmVlbi5yZW1vdmUoKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhc3NpbmdcIikuY2xhc3NMaXN0LnJlbW92ZShcInBhc3NpbmdcIik7XG4gIH0pO1xuICBwYXNzaW5nU2NyZWVuLmFwcGVuZENoaWxkKGNvbnRpbnVlQnV0dG9uKTtcbiAgcmV0dXJuIHBhc3NpbmdTY3JlZW47XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgKCFzY3JpcHRVcmwgfHwgIS9eaHR0cChzPyk6Ly50ZXN0KHNjcmlwdFVybCkpKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiaW1wb3J0IHsgY3JlYXRlUGxheWVyLCBQbGF5ZXJUeXBlIH0gZnJvbSBcIi4vY29yZS9wbGF5ZXIuanNcIjtcbmltcG9ydCB7IHNldHVwQ29udHJvbHMgfSBmcm9tIFwiLi9kb20vY29udHJvbHMuanNcIjtcbmltcG9ydCB7IHNldHVwR2FtZSB9IGZyb20gXCIuL2RvbS9nYW1lLmpzXCI7XG5cbmltcG9ydCBcIi4vc3R5bGVzL2luZGV4LmNzc1wiO1xuXG5jb25zb2xlLmxvZyhcIkdldCBSZWFkeSBmb3IgQmF0dGxlIVwiKTtcblxuY29uc3Qgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKTtcbnJvb3QuaW5uZXJIVE1MID0gYFxuICA8aGVhZGVyPlxuICAgIDxoMT5CYXR0bGVzaGlwPC9oMT5cbiAgICA8YSBjbGFzcz1cImhlbHBcIj5Ib3cgdG8gUGxheTwvYT5cbiAgPC9oZWFkZXI+XG4gIDxkaXYgY2xhc3M9XCJvcHBvbmVudFwiPlxuICAgIDxwPk9wcG9uZW50OiA8L3A+XG4gICAgPGRpdiBjbGFzcz1cIm9wdGlvbnNcIj5cbiAgICAgIDxwIGNsYXNzPVwib3Bwb25lbnQtY29tcHV0ZXIgYWN0aXZlLW1vZGVcIj5Db21wdXRlcjwvcD5cbiAgICAgIDxwIGNsYXNzPVwib3Bwb25lbnQtZnJpZW5kXCI+RnJpZW5kPC9wPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImNvbnRyb2xzXCI+XG4gICAgPGJ1dHRvbiBjbGFzcz1cInN0YXJ0XCI+U3RhcnQgR2FtZTwvYnV0dG9uPlxuICAgIDxidXR0b24gY2xhc3M9XCJyZXNldCBoaWRkZW5cIj5SZXNldCBHYW1lPC9idXR0b24+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiYm9hcmRzXCI+PC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJpbmZvIGhpZGRlblwiPlxuICAgIDxwIGNsYXNzPVwiYm9hcmQtb25lLWluZm9cIj48L3A+XG4gICAgPHAgY2xhc3M9XCJib2FyZC10d28taW5mb1wiPjwvcD5cbiAgPC9kaXY+XG5gO1xuXG5jb25zdCBnYW1lID0gc2V0dXBHYW1lKFxuICBjcmVhdGVQbGF5ZXIoXCJQbGF5ZXJcIiwgUGxheWVyVHlwZS5IVU1BTiwgMTApLFxuICBjcmVhdGVQbGF5ZXIoXCJDb21wdXRlclwiLCBQbGF5ZXJUeXBlLkNPTVBVVEVSLCAxMCksXG4pO1xuXG5kb2N1bWVudFxuICAucXVlcnlTZWxlY3RvcihcIi5ib2FyZHNcIilcbiAgLmFwcGVuZChnYW1lLmJvYXJkc1swXS5jb21wb25lbnQsIGdhbWUuYm9hcmRzWzFdLmNvbXBvbmVudCk7XG5zZXR1cENvbnRyb2xzKGdhbWUpO1xuIl0sIm5hbWVzIjpbImNyZWF0ZVNoaXAiLCJTaGlwT3JpZW50YXRpb24iLCJDZWxsU3RhdGUiLCJPYmplY3QiLCJmcmVlemUiLCJFTVBUWSIsIk1JU1MiLCJTSElQIiwiSElUIiwiU1VOSyIsImNyZWF0ZUdhbWVCb2FyZCIsInNpemUiLCJFcnJvciIsImNlbGxzIiwiQXJyYXkiLCJmcm9tIiwibGVuZ3RoIiwic2hpcHMiLCJyZXNldCIsInBsYWNlU2hpcCIsImNvb3JkaW5hdGVzIiwib3JpZW50YXRpb24iLCJIT1JJWk9OVEFMIiwiVkVSVElDQUwiLCJpIiwicHVzaCIsIm1vdmVTaGlwIiwic2hpcEluZGV4Iiwic2hpcCIsInBvcCIsInJvdGF0ZVNoaXAiLCJuZXdPcmllbnRhdGlvbiIsImdldFNoaXBJbmRleCIsImoiLCJyZWNlaXZlQXR0YWNrIiwiaGl0IiwiaXNTdW5rIiwiaXNGbGVldERlc3Ryb3llZCIsIlBsYXllclR5cGUiLCJIVU1BTiIsIkNPTVBVVEVSIiwiY3JlYXRlUGxheWVyIiwibmFtZSIsInR5cGUiLCJib2FyZFNpemUiLCJib2FyZCIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCIsImhpdHMiLCJyZWZyZXNoU3ZnIiwiZWRpdFN2ZyIsInNhdmVTdmciLCJzZXR1cEdhbWVCb2FyZHMiLCJnYW1lIiwicGxheWVyT25lIiwicGxheWVyVHdvIiwiYm9hcmRPbmUiLCJjcmVhdGVCb2FyZENvbXBvbmVudCIsInJhbmRvbWl6ZUZvcm1hdGlvbiIsImNvbXBvbmVudCIsImNsYXNzTGlzdCIsImFkZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjbGVhciIsImJvYXJkVHdvIiwiRE9NQm9hcmQiLCJjaGlsZHJlbiIsImZvckVhY2giLCJyb3ciLCJjZWxsIiwiZWRpdGluZyIsImlzTXV0YWJsZSIsImNvbnRhaW5zIiwiaXNJblByb2dyZXNzIiwidG9nZ2xlU2hpcE1vdGlvbiIsImlzQXR0YWNrYWJsZSIsImFjdGl2ZSIsImlzR2FtZU92ZXIiLCJpc1BsYXllcldhaXRpbmciLCJldmVudCIsInJlbmRlciIsInByZXZlbnREZWZhdWx0IiwiZG9jdW1lbnQiLCJrZXkiLCJwbGF5ZXIiLCJhdHRhY2thYmxlIiwibXV0YWJsZSIsImJvYXJkQ29tcG9uZW50IiwiY3JlYXRlRWxlbWVudCIsImJvYXJkSGVhZGVyIiwiaW5uZXJIVE1MIiwiYXBwZW5kQ2hpbGQiLCJyYW5kb21pemVCdXR0b24iLCJlZGl0QnV0dG9uIiwic2F2ZUJ1dHRvbiIsInRpdGxlIiwicmVmcmVzaEljb24iLCJJbWFnZSIsInNyYyIsImVkaXRJY29uIiwic2F2ZUljb24iLCJib2FyZENvbnRyb2xzIiwiYm9hcmRDZWxscyIsInJvd0NvbXBvbmVudCIsImNlbGxDb21wb25lbnQiLCJnZXRDZWxsQ2xhc3NOYW1lIiwibW92aW5nQ2VsbHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwicmVtb3ZlIiwiaXNNb3ZpbmciLCJjbGFzc05hbWUiLCJwbGFjZWQiLCJNYXRoIiwicmFuZG9tIiwieCIsImZsb29yIiwieSIsInRvZ2dsZSIsIm1vdmluZ1NoaXBDZWxsIiwicXVlcnlTZWxlY3RvciIsIm1vdmluZ1NoaXBDb29yZGluYXRlcyIsImdldENlbGxJbmRleCIsIm1vdmluZ1NoaXBJbmRleCIsIm1vdmVTdWNjZXNzZnVsIiwibW92ZWRTaGlwIiwiY29uc29sZSIsImxvZyIsImNvbXB1dGVyQXR0YWNrIiwidmFsaWQiLCJQcm9taXNlIiwiciIsInNldFRpbWVvdXQiLCJzYXZlRWRpdHMiLCJyZXBvcnRWYWxpZGl0eSIsImFsZXJ0IiwidGFyZ2V0IiwidmFsdWUiLCJ0ZXh0Q29udGVudCIsInByb3RvdHlwZSIsImluZGV4T2YiLCJjYWxsIiwicGFyZW50Tm9kZSIsInNlY3JldCIsImNsb3NlU3ZnIiwic2V0dXBDb250cm9scyIsInN0YXJ0QnV0dG9uIiwic3RhcnQiLCJyZXNldEJ1dHRvbiIsImNvbXB1dGVyT3Bwb25lbnRCdXR0b24iLCJmcmllbmRPcHBvbmVudEJ1dHRvbiIsImNoYW5nZU1vZGUiLCJoZWxwTGluayIsIm1vZGFsT3ZlcmxheSIsImNyZWF0ZUhlbHBNb2RhbCIsImhlbHBNb2RhbCIsImNsb3NlQnV0dG9uIiwiY2xvc2VJY29uIiwiR2FtZU1vZGUiLCJGUklFTkQiLCJzZXR1cEdhbWUiLCJtb2RlIiwicGxheWVycyIsImN1cnJlbnRQbGF5ZXJJbmRleCIsImJvYXJkcyIsInBsYXkiLCJnYW1lT3ZlclNjcmVlbiIsImFjdGl2ZUJvYXJkIiwiYm9hcmRzQ29udGFpbmVyIiwicmVtb3ZlQ2hpbGQiLCJhcHBlbmQiLCJjdXJyZW50UGxheWVyIiwibmV4dFBsYXllckluZGV4IiwibmV4dFBsYXllciIsImNyZWF0ZUdhbWVPdmVyU2NyZWVuIiwicmVzb2x2ZSIsImNyZWF0ZVBhc3NpbmdTY3JlZW4iLCJnYW1lT3Zlck1lc3NhZ2UiLCJ0b1VwcGVyQ2FzZSIsInBhc3NpbmdTY3JlZW4iLCJjb250aW51ZUJ1dHRvbiIsInJvb3QiLCJnZXRFbGVtZW50QnlJZCJdLCJzb3VyY2VSb290IjoiIn0=