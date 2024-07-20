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
        return CellState.MISS;
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
          return this.cells[coordinates[1]][coordinates[0]];
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
  const helpLink = document.querySelector(".help-link");
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
  </header>
  <div class="opponent">
    <p>Opponent: </p>
    <div class="options">
      <p class="opponent-computer active-mode">Computer</p>
      <p class="opponent-friend">Friend</p>
    </div>
  </div>
  <a class="help-link">How to Play</a>
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUVELE1BQU1yQyxJQUFJLEdBQUcwRyx1REFBUyxDQUNwQnRILDZEQUFZLENBQUMsUUFBUSxFQUFFSCx1REFBVSxDQUFDQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQzVDRSw2REFBWSxDQUFDLFVBQVUsRUFBRUgsdURBQVUsQ0FBQ0UsUUFBUSxFQUFFLEVBQUUsQ0FDbEQsQ0FBQztBQUVEMEMsUUFBUSxDQUNMcUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUN4QmtELE1BQU0sQ0FBQ3BILElBQUksQ0FBQzhHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQ3hHLFNBQVMsRUFBRU4sSUFBSSxDQUFDOEcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDeEcsU0FBUyxDQUFDO0FBQzdEcUYsK0RBQWEsQ0FBQzNGLElBQUksQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvaW5kZXguY3NzPzRlNDIiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb3JlL2dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvcmUvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29yZS9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tL2JvYXJkcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbS9jb250cm9scy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbS9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCB7IGNyZWF0ZVNoaXAsIFNoaXBPcmllbnRhdGlvbiB9IGZyb20gXCIuL3NoaXAuanNcIjtcblxuZXhwb3J0IGNvbnN0IENlbGxTdGF0ZSA9IE9iamVjdC5mcmVlemUoe1xuICBFTVBUWTogMCxcbiAgTUlTUzogMSxcbiAgU0hJUDogMixcbiAgSElUOiAzLFxuICBTVU5LOiA0LFxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVHYW1lQm9hcmQoc2l6ZSkge1xuICBpZiAoc2l6ZSA8PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBib2FyZCBzaXplXCIpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzaXplLFxuICAgIGNlbGxzOiBBcnJheS5mcm9tKHsgbGVuZ3RoOiBzaXplIH0sICgpID0+XG4gICAgICBBcnJheS5mcm9tKHsgbGVuZ3RoOiBzaXplIH0sICgpID0+IENlbGxTdGF0ZS5FTVBUWSksXG4gICAgKSxcbiAgICBzaGlwczogW10sXG5cbiAgICByZXNldDogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5jZWxscyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IHNpemUgfSwgKCkgPT5cbiAgICAgICAgQXJyYXkuZnJvbSh7IGxlbmd0aDogc2l6ZSB9LCAoKSA9PiBDZWxsU3RhdGUuRU1QVFkpLFxuICAgICAgKTtcbiAgICAgIHRoaXMuc2hpcHMgPSBbXTtcbiAgICB9LFxuXG4gICAgcGxhY2VTaGlwOiBmdW5jdGlvbiAoY29vcmRpbmF0ZXMsIGxlbmd0aCwgb3JpZW50YXRpb24pIHtcbiAgICAgIGlmIChcbiAgICAgICAgY29vcmRpbmF0ZXNbMF0gPCAwIHx8XG4gICAgICAgIGNvb3JkaW5hdGVzWzFdIDwgMCB8fFxuICAgICAgICBjb29yZGluYXRlc1swXSA+PSBzaXplIHx8XG4gICAgICAgIGNvb3JkaW5hdGVzWzFdID49IHNpemVcbiAgICAgICkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgcGxhY2Ugc2hpcCBvdXRzaWRlIHRoZSBib2FyZFwiKTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIChvcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwgJiZcbiAgICAgICAgICBjb29yZGluYXRlc1swXSArIGxlbmd0aCAtIDEgPj0gc2l6ZSkgfHxcbiAgICAgICAgKG9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwgJiZcbiAgICAgICAgICBjb29yZGluYXRlc1sxXSArIGxlbmd0aCAtIDEgPj0gc2l6ZSlcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IGNvb3JkaW5hdGVzWzBdOyBpIDw9IGNvb3JkaW5hdGVzWzBdICsgbGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgaWYgKHRoaXMuY2VsbHNbY29vcmRpbmF0ZXNbMV1dW2ldICE9PSBDZWxsU3RhdGUuRU1QVFkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAob3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICBmb3IgKGxldCBpID0gY29vcmRpbmF0ZXNbMV07IGkgPD0gY29vcmRpbmF0ZXNbMV0gKyBsZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICBpZiAodGhpcy5jZWxsc1tpXVtjb29yZGluYXRlc1swXV0gIT09IENlbGxTdGF0ZS5FTVBUWSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLnNoaXBzLnB1c2goY3JlYXRlU2hpcChsZW5ndGgsIGNvb3JkaW5hdGVzLCBvcmllbnRhdGlvbikpO1xuXG4gICAgICBpZiAob3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSBjb29yZGluYXRlc1swXTsgaSA8PSBjb29yZGluYXRlc1swXSArIGxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgIHRoaXMuY2VsbHNbY29vcmRpbmF0ZXNbMV1dW2ldID0gQ2VsbFN0YXRlLlNISVA7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAob3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICBmb3IgKGxldCBpID0gY29vcmRpbmF0ZXNbMV07IGkgPD0gY29vcmRpbmF0ZXNbMV0gKyBsZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICB0aGlzLmNlbGxzW2ldW2Nvb3JkaW5hdGVzWzBdXSA9IENlbGxTdGF0ZS5TSElQO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICBtb3ZlU2hpcDogZnVuY3Rpb24gKHNoaXBJbmRleCwgY29vcmRpbmF0ZXMpIHtcbiAgICAgIGNvbnN0IHNoaXAgPSB0aGlzLnNoaXBzW3NoaXBJbmRleF07XG4gICAgICBpZiAoIXNoaXApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2hpcCBkb2VzIG5vdCBleGlzdFwiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMKSB7XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5jZWxsc1tzaGlwLmNvb3JkaW5hdGVzWzFdXVtpXSA9IENlbGxTdGF0ZS5FTVBUWTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwpIHtcbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMV07XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmNlbGxzW2ldW3NoaXAuY29vcmRpbmF0ZXNbMF1dID0gQ2VsbFN0YXRlLkVNUFRZO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5wbGFjZVNoaXAoY29vcmRpbmF0ZXMsIHNoaXAubGVuZ3RoLCBzaGlwLm9yaWVudGF0aW9uKSkge1xuICAgICAgICBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwpIHtcbiAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgICAgaSsrXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmNlbGxzW3NoaXAuY29vcmRpbmF0ZXNbMV1dW2ldID0gQ2VsbFN0YXRlLlNISVA7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMV07XG4gICAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBpKytcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuY2VsbHNbaV1bc2hpcC5jb29yZGluYXRlc1swXV0gPSBDZWxsU3RhdGUuU0hJUDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNoaXBzW3NoaXBJbmRleF0gPSB0aGlzLnNoaXBzLnBvcCgpO1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuXG4gICAgcm90YXRlU2hpcDogZnVuY3Rpb24gKHNoaXBJbmRleCkge1xuICAgICAgY29uc3Qgc2hpcCA9IHRoaXMuc2hpcHNbc2hpcEluZGV4XTtcbiAgICAgIGlmICghc2hpcCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTaGlwIGRvZXMgbm90IGV4aXN0XCIpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBuZXdPcmllbnRhdGlvbiA9XG4gICAgICAgIHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMXG4gICAgICAgICAgPyBTaGlwT3JpZW50YXRpb24uVkVSVElDQUxcbiAgICAgICAgICA6IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMO1xuXG4gICAgICBpZiAobmV3T3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMKSB7XG4gICAgICAgIGlmIChzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxID49IHRoaXMuc2l6ZSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgMTtcbiAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMF0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgaSsrXG4gICAgICAgICkge1xuICAgICAgICAgIGlmICh0aGlzLmNlbGxzW3NoaXAuY29vcmRpbmF0ZXNbMV1dW2ldICE9PSBDZWxsU3RhdGUuRU1QVFkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAobmV3T3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICBpZiAoc2hpcC5jb29yZGluYXRlc1sxXSArIHNoaXAubGVuZ3RoIC0gMSA+PSB0aGlzLnNpemUpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1sxXSArIDE7XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICBpZiAodGhpcy5jZWxsc1tpXVtzaGlwLmNvb3JkaW5hdGVzWzBdXSAhPT0gQ2VsbFN0YXRlLkVNUFRZKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChuZXdPcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwpIHtcbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMV07XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmNlbGxzW2ldW3NoaXAuY29vcmRpbmF0ZXNbMF1dID0gQ2VsbFN0YXRlLkVNUFRZO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5jZWxsc1tzaGlwLmNvb3JkaW5hdGVzWzFdXVtpXSA9IENlbGxTdGF0ZS5TSElQO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKG5ld09yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwpIHtcbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMF07XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmNlbGxzW3NoaXAuY29vcmRpbmF0ZXNbMV1dW2ldID0gQ2VsbFN0YXRlLkVNUFRZO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzFdO1xuICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1sxXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5jZWxsc1tpXVtzaGlwLmNvb3JkaW5hdGVzWzBdXSA9IENlbGxTdGF0ZS5TSElQO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHNoaXAub3JpZW50YXRpb24gPSBuZXdPcmllbnRhdGlvbjtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICBnZXRTaGlwSW5kZXg6IGZ1bmN0aW9uIChjb29yZGluYXRlcykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLnNoaXBzW2ldLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCkge1xuICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICBsZXQgaiA9IHRoaXMuc2hpcHNbaV0uY29vcmRpbmF0ZXNbMF07XG4gICAgICAgICAgICBqIDw9IHRoaXMuc2hpcHNbaV0uY29vcmRpbmF0ZXNbMF0gKyB0aGlzLnNoaXBzW2ldLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBqKytcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgY29vcmRpbmF0ZXNbMF0gPT09IGogJiZcbiAgICAgICAgICAgICAgY29vcmRpbmF0ZXNbMV0gPT09IHRoaXMuc2hpcHNbaV0uY29vcmRpbmF0ZXNbMV1cbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zaGlwc1tpXS5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMKSB7XG4gICAgICAgICAgZm9yIChcbiAgICAgICAgICAgIGxldCBqID0gdGhpcy5zaGlwc1tpXS5jb29yZGluYXRlc1sxXTtcbiAgICAgICAgICAgIGogPD0gdGhpcy5zaGlwc1tpXS5jb29yZGluYXRlc1sxXSArIHRoaXMuc2hpcHNbaV0ubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGorK1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBjb29yZGluYXRlc1swXSA9PT0gdGhpcy5zaGlwc1tpXS5jb29yZGluYXRlc1swXSAmJlxuICAgICAgICAgICAgICBjb29yZGluYXRlc1sxXSA9PT0galxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBObyBzaGlwIGZvdW5kIGF0IGdpdmVuIGluZGV4OiBbJHtjb29yZGluYXRlc1swXX0sICR7Y29vcmRpbmF0ZXNbMV19XWAsXG4gICAgICApO1xuICAgIH0sXG5cbiAgICByZWNlaXZlQXR0YWNrOiBmdW5jdGlvbiAoY29vcmRpbmF0ZXMpIHtcbiAgICAgIGlmIChcbiAgICAgICAgY29vcmRpbmF0ZXNbMF0gPCAwIHx8XG4gICAgICAgIGNvb3JkaW5hdGVzWzFdIDwgMCB8fFxuICAgICAgICBjb29yZGluYXRlc1swXSA+PSBzaXplIHx8XG4gICAgICAgIGNvb3JkaW5hdGVzWzFdID49IHNpemVcbiAgICAgICkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgYXR0YWNrIG91dHNpZGUgdGhlIGJvYXJkXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuY2VsbHNbY29vcmRpbmF0ZXNbMV1dW2Nvb3JkaW5hdGVzWzBdXSAhPT0gQ2VsbFN0YXRlLkVNUFRZICYmXG4gICAgICAgIHRoaXMuY2VsbHNbY29vcmRpbmF0ZXNbMV1dW2Nvb3JkaW5hdGVzWzBdXSAhPT0gQ2VsbFN0YXRlLlNISVBcbiAgICAgICkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDZWxsIGhhcyBhbHJlYWR5IGJlZW4gYXR0YWNrZWRcIik7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmNlbGxzW2Nvb3JkaW5hdGVzWzFdXVtjb29yZGluYXRlc1swXV0gIT09IENlbGxTdGF0ZS5TSElQKSB7XG4gICAgICAgIHRoaXMuY2VsbHNbY29vcmRpbmF0ZXNbMV1dW2Nvb3JkaW5hdGVzWzBdXSA9IENlbGxTdGF0ZS5NSVNTO1xuICAgICAgICByZXR1cm4gQ2VsbFN0YXRlLk1JU1M7XG4gICAgICB9XG5cbiAgICAgIGZvciAoY29uc3Qgc2hpcCBvZiB0aGlzLnNoaXBzKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwgJiZcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzWzFdID09PSBzaGlwLmNvb3JkaW5hdGVzWzFdICYmXG4gICAgICAgICAgICBjb29yZGluYXRlc1swXSA+PSBzaGlwLmNvb3JkaW5hdGVzWzBdICYmXG4gICAgICAgICAgICBjb29yZGluYXRlc1swXSA8PSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxKSB8fFxuICAgICAgICAgIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwgJiZcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzWzBdID09PSBzaGlwLmNvb3JkaW5hdGVzWzBdICYmXG4gICAgICAgICAgICBjb29yZGluYXRlc1sxXSA+PSBzaGlwLmNvb3JkaW5hdGVzWzFdICYmXG4gICAgICAgICAgICBjb29yZGluYXRlc1sxXSA8PSBzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxKVxuICAgICAgICApIHtcbiAgICAgICAgICBzaGlwLmhpdCgpO1xuXG4gICAgICAgICAgaWYgKHNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgICAgIGlmIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCkge1xuICAgICAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1swXTtcbiAgICAgICAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMF0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgaSsrXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2VsbHNbc2hpcC5jb29yZGluYXRlc1sxXV1baV0gPSBDZWxsU3RhdGUuU1VOSztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwpIHtcbiAgICAgICAgICAgICAgZm9yIChcbiAgICAgICAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMV07XG4gICAgICAgICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgIGkrK1xuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW2ldW3NoaXAuY29vcmRpbmF0ZXNbMF1dID0gQ2VsbFN0YXRlLlNVTks7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jZWxsc1tjb29yZGluYXRlc1sxXV1bY29vcmRpbmF0ZXNbMF1dID0gQ2VsbFN0YXRlLkhJVDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gdGhpcy5jZWxsc1tjb29yZGluYXRlc1sxXV1bY29vcmRpbmF0ZXNbMF1dO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGlzRmxlZXREZXN0cm95ZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGZvciAoY29uc3Qgc2hpcCBvZiB0aGlzLnNoaXBzKSB7XG4gICAgICAgIGlmICghc2hpcC5pc1N1bmsoKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICB9O1xufVxuIiwiaW1wb3J0IHsgY3JlYXRlR2FtZUJvYXJkIH0gZnJvbSBcIi4vZ2FtZUJvYXJkLmpzXCI7XG5cbmV4cG9ydCBjb25zdCBQbGF5ZXJUeXBlID0gT2JqZWN0LmZyZWV6ZSh7XG4gIEhVTUFOOiBcIkhVTUFOXCIsXG4gIENPTVBVVEVSOiBcIkNPTVBVVEVSXCIsXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBsYXllcihuYW1lLCB0eXBlLCBib2FyZFNpemUpIHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lLFxuICAgIHR5cGUsXG4gICAgYm9hcmQ6IGNyZWF0ZUdhbWVCb2FyZChib2FyZFNpemUpLFxuICB9O1xufVxuIiwiZXhwb3J0IGNvbnN0IFNoaXBPcmllbnRhdGlvbiA9IE9iamVjdC5mcmVlemUoe1xuICBIT1JJWk9OVEFMOiBcIkhPUklaT05UQUxcIixcbiAgVkVSVElDQUw6IFwiVkVSVElDQUxcIixcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2hpcChcbiAgbGVuZ3RoLFxuICBjb29yZGluYXRlcyA9IFt1bmRlZmluZWQsIHVuZGVmaW5lZF0sXG4gIG9yaWVudGF0aW9uID0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwsXG4pIHtcbiAgaWYgKGxlbmd0aCA8IDEpIHJldHVybiB1bmRlZmluZWQ7XG4gIHJldHVybiB7XG4gICAgbGVuZ3RoLFxuICAgIGNvb3JkaW5hdGVzLFxuICAgIG9yaWVudGF0aW9uLFxuICAgIGhpdHM6IDAsXG5cbiAgICBoaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLmhpdHMgPCB0aGlzLmxlbmd0aCkge1xuICAgICAgICB0aGlzLmhpdHMrKztcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgaXNTdW5rOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5oaXRzID09PSB0aGlzLmxlbmd0aDtcbiAgICB9LFxuICB9O1xufVxuIiwiaW1wb3J0IHsgQ2VsbFN0YXRlIH0gZnJvbSBcIi4uL2NvcmUvZ2FtZUJvYXJkLmpzXCI7XG5pbXBvcnQgeyBQbGF5ZXJUeXBlIH0gZnJvbSBcIi4uL2NvcmUvcGxheWVyLmpzXCI7XG5pbXBvcnQgeyBTaGlwT3JpZW50YXRpb24gfSBmcm9tIFwiLi4vY29yZS9zaGlwLmpzXCI7XG5cbmltcG9ydCByZWZyZXNoU3ZnIGZyb20gXCIuLi8uLi9hc3NldHMvcmVmcmVzaC1jY3cuc3ZnXCI7XG5pbXBvcnQgZWRpdFN2ZyBmcm9tIFwiLi4vLi4vYXNzZXRzL2VkaXQuc3ZnXCI7XG5pbXBvcnQgc2F2ZVN2ZyBmcm9tIFwiLi4vLi4vYXNzZXRzL3NhdmUuc3ZnXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cEdhbWVCb2FyZHMoZ2FtZSwgcGxheWVyT25lLCBwbGF5ZXJUd28pIHtcbiAgY29uc3QgYm9hcmRPbmUgPSBjcmVhdGVCb2FyZENvbXBvbmVudChcbiAgICBwbGF5ZXJPbmUuYm9hcmQsXG4gICAgcGxheWVyT25lLFxuICAgIHBsYXllclR3by50eXBlICE9PSBQbGF5ZXJUeXBlLkNPTVBVVEVSLFxuICAgIHBsYXllck9uZS50eXBlID09PSBQbGF5ZXJUeXBlLkhVTUFOLFxuICApO1xuICBib2FyZE9uZS5yYW5kb21pemVGb3JtYXRpb24oKTtcblxuICBib2FyZE9uZS5jb21wb25lbnQuY2xhc3NMaXN0LmFkZChcbiAgICBcInBsYXllci1vbmVcIixcbiAgICBwbGF5ZXJPbmUudHlwZSA9PT0gUGxheWVyVHlwZS5IVU1BTiA/IFwiaHVtYW5cIiA6IFwiY29tcHV0ZXJcIixcbiAgKTtcbiAgaWYgKHBsYXllclR3by50eXBlID09PSBQbGF5ZXJUeXBlLkNPTVBVVEVSKSB7XG4gICAgYm9hcmRPbmUuY29tcG9uZW50LmNsYXNzTGlzdC5hZGQoXCJvbmx5LWh1bWFuXCIpO1xuICB9XG4gIGJvYXJkT25lLmNvbXBvbmVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gYm9hcmRPbmUuY2xlYXIoKSwgdHJ1ZSk7XG5cbiAgY29uc3QgYm9hcmRUd28gPSBjcmVhdGVCb2FyZENvbXBvbmVudChcbiAgICBwbGF5ZXJUd28uYm9hcmQsXG4gICAgcGxheWVyVHdvLFxuICAgIHBsYXllck9uZS50eXBlICE9PSBQbGF5ZXJUeXBlLkNPTVBVVEVSLFxuICAgIHBsYXllclR3by50eXBlID09PSBQbGF5ZXJUeXBlLkhVTUFOLFxuICApO1xuICBib2FyZFR3by5yYW5kb21pemVGb3JtYXRpb24oKTtcblxuICBib2FyZFR3by5jb21wb25lbnQuY2xhc3NMaXN0LmFkZChcbiAgICBcInBsYXllci10d29cIixcbiAgICBwbGF5ZXJUd28udHlwZSA9PT0gUGxheWVyVHlwZS5IVU1BTiA/IFwiaHVtYW5cIiA6IFwiY29tcHV0ZXJcIixcbiAgKTtcblxuICBmb3IgKGNvbnN0IERPTUJvYXJkIG9mIFtib2FyZE9uZSwgYm9hcmRUd29dKSB7XG4gICAgQXJyYXkuZnJvbShET01Cb2FyZC5jb21wb25lbnQuY2hpbGRyZW5bMV0uY2hpbGRyZW4pLmZvckVhY2goKHJvdywgaSkgPT4ge1xuICAgICAgQXJyYXkuZnJvbShyb3cuY2hpbGRyZW4pLmZvckVhY2goKGNlbGwsIGopID0+IHtcbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIERPTUJvYXJkLmVkaXRpbmcgJiZcbiAgICAgICAgICAgIERPTUJvYXJkLmlzTXV0YWJsZSgpICYmXG4gICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5jb250YWlucyhcInNoaXBcIikgJiZcbiAgICAgICAgICAgICFnYW1lLmlzSW5Qcm9ncmVzc1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgRE9NQm9hcmQudG9nZ2xlU2hpcE1vdGlvbihbaiwgaV0pO1xuICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICBET01Cb2FyZC5pc0F0dGFja2FibGUoKSAmJlxuICAgICAgICAgICAgRE9NQm9hcmQuYWN0aXZlICYmXG4gICAgICAgICAgICBnYW1lLmlzSW5Qcm9ncmVzcyAmJlxuICAgICAgICAgICAgIWdhbWUuaXNHYW1lT3ZlciAmJlxuICAgICAgICAgICAgZ2FtZS5pc1BsYXllcldhaXRpbmdcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGlmIChET01Cb2FyZC5yZWNlaXZlQXR0YWNrKFtqLCBpXSkpIHtcbiAgICAgICAgICAgICAgZ2FtZS5pc1BsYXllcldhaXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImNvbnRleHRtZW51XCIsIChldmVudCkgPT4ge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICFET01Cb2FyZC5lZGl0aW5nIHx8XG4gICAgICAgICAgICAhRE9NQm9hcmQuaXNNdXRhYmxlKCkgfHxcbiAgICAgICAgICAgIGdhbWUuaXNJblByb2dyZXNzIHx8XG4gICAgICAgICAgICAhY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJzaGlwXCIpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qgc2hpcEluZGV4ID0gRE9NQm9hcmQuYm9hcmQuZ2V0U2hpcEluZGV4KFtqLCBpXSk7XG4gICAgICAgICAgY29uc3Qgc2hpcCA9IERPTUJvYXJkLmJvYXJkLnNoaXBzW3NoaXBJbmRleF07XG5cbiAgICAgICAgICBpZiAoIWNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKFwibW92aW5nXCIpKSB7XG4gICAgICAgICAgICBET01Cb2FyZC50b2dnbGVTaGlwTW90aW9uKHNoaXAuY29vcmRpbmF0ZXMpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChET01Cb2FyZC5ib2FyZC5yb3RhdGVTaGlwKHNoaXBJbmRleCkpIHtcbiAgICAgICAgICAgIERPTUJvYXJkLmNsZWFyKCk7XG4gICAgICAgICAgICBET01Cb2FyZC50b2dnbGVTaGlwTW90aW9uKHNoaXAuY29vcmRpbmF0ZXMpO1xuICAgICAgICAgICAgRE9NQm9hcmQucmVuZGVyKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChldmVudCkgPT4ge1xuICAgIGlmIChib2FyZE9uZS5lZGl0aW5nKSBib2FyZE9uZS5tb3ZlU2hpcChldmVudC5rZXkpO1xuICAgIGVsc2UgaWYgKGJvYXJkVHdvLmVkaXRpbmcpIGJvYXJkVHdvLm1vdmVTaGlwKGV2ZW50LmtleSk7XG4gIH0pO1xuXG4gIHJldHVybiBbYm9hcmRPbmUsIGJvYXJkVHdvXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUJvYXJkQ29tcG9uZW50KGJvYXJkLCBwbGF5ZXIsIGF0dGFja2FibGUsIG11dGFibGUpIHtcbiAgY29uc3QgYm9hcmRDb21wb25lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBib2FyZENvbXBvbmVudC5jbGFzc0xpc3QuYWRkKFwiYm9hcmRcIik7XG5cbiAgY29uc3QgYm9hcmRIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcbiAgYm9hcmRIZWFkZXIuY2xhc3NMaXN0LmFkZChcImJvYXJkLWhlYWRlclwiKTtcbiAgYm9hcmRIZWFkZXIuaW5uZXJIVE1MID0gYFxuICAgIDxwIGNsYXNzPVwicGxheWVyLW5hbWVcIj4ke3BsYXllci5uYW1lfTwvcD5cbiAgICA8aW5wdXQgY2xhc3M9XCJwbGF5ZXItbmFtZS1pbnB1dCBoaWRkZW5cIiB0eXBlPVwidGV4dFwiIHJlcXVpcmVkIHZhbHVlPVwiJHtwbGF5ZXIubmFtZX1cIiAvPlxuICBgO1xuICBib2FyZENvbXBvbmVudC5hcHBlbmRDaGlsZChib2FyZEhlYWRlcik7XG5cbiAgbGV0IHJhbmRvbWl6ZUJ1dHRvbiwgZWRpdEJ1dHRvbiwgc2F2ZUJ1dHRvbjtcbiAgaWYgKHBsYXllci50eXBlID09PSBQbGF5ZXJUeXBlLkhVTUFOKSB7XG4gICAgcmFuZG9taXplQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICByYW5kb21pemVCdXR0b24uY2xhc3NMaXN0LmFkZChcInJhbmRvbWl6ZS1ib2FyZFwiKTtcbiAgICByYW5kb21pemVCdXR0b24udGl0bGUgPSBcIlJhbmRvbWl6ZSBzaGlwIHBsYWNlbWVudFwiO1xuICAgIHJhbmRvbWl6ZUJ1dHRvbi50eXBlID0gXCJidXR0b25cIjtcbiAgICBjb25zdCByZWZyZXNoSWNvbiA9IG5ldyBJbWFnZSgpO1xuICAgIHJlZnJlc2hJY29uLnNyYyA9IHJlZnJlc2hTdmc7XG4gICAgcmFuZG9taXplQnV0dG9uLmFwcGVuZENoaWxkKHJlZnJlc2hJY29uKTtcblxuICAgIGVkaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGVkaXRCdXR0b24uY2xhc3NMaXN0LmFkZChcImVkaXQtYm9hcmRcIik7XG4gICAgZWRpdEJ1dHRvbi50aXRsZSA9IFwiRWRpdCBib2FyZCAoY2hhbmdlIG5hbWUsIG1vdmUgc2hpcHMpXCI7XG4gICAgZWRpdEJ1dHRvbi50eXBlID0gXCJidXR0b25cIjtcbiAgICBjb25zdCBlZGl0SWNvbiA9IG5ldyBJbWFnZSgpO1xuICAgIGVkaXRJY29uLnNyYyA9IGVkaXRTdmc7XG4gICAgZWRpdEJ1dHRvbi5hcHBlbmRDaGlsZChlZGl0SWNvbik7XG5cbiAgICBzYXZlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBzYXZlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJzYXZlLWJvYXJkXCIsIFwiaGlkZGVuXCIpO1xuICAgIHNhdmVCdXR0b24udGl0bGUgPSBcIlNhdmUgYm9hcmRcIjtcbiAgICBzYXZlQnV0dG9uLnR5cGUgPSBcImJ1dHRvblwiO1xuICAgIGNvbnN0IHNhdmVJY29uID0gbmV3IEltYWdlKCk7XG4gICAgc2F2ZUljb24uc3JjID0gc2F2ZVN2ZztcbiAgICBzYXZlQnV0dG9uLmFwcGVuZENoaWxkKHNhdmVJY29uKTtcblxuICAgIGNvbnN0IGJvYXJkQ29udHJvbHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGJvYXJkQ29udHJvbHMuY2xhc3NMaXN0LmFkZChcImJvYXJkLWNvbnRyb2xzXCIpO1xuICAgIGJvYXJkQ29udHJvbHMuYXBwZW5kQ2hpbGQocmFuZG9taXplQnV0dG9uKTtcbiAgICBib2FyZENvbnRyb2xzLmFwcGVuZENoaWxkKGVkaXRCdXR0b24pO1xuICAgIGJvYXJkQ29udHJvbHMuYXBwZW5kQ2hpbGQoc2F2ZUJ1dHRvbik7XG4gICAgYm9hcmRIZWFkZXIuYXBwZW5kQ2hpbGQoYm9hcmRDb250cm9scyk7XG4gIH1cblxuICBjb25zdCBib2FyZENlbGxzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgYm9hcmRDZWxscy5jbGFzc0xpc3QuYWRkKFwiYm9hcmQtY2VsbHNcIik7XG4gIGJvYXJkQ29tcG9uZW50LmFwcGVuZENoaWxkKGJvYXJkQ2VsbHMpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmQuY2VsbHMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCByb3dDb21wb25lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHJvd0NvbXBvbmVudC5jbGFzc0xpc3QuYWRkKFwicm93XCIpO1xuXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBib2FyZC5jZWxsc1tpXS5sZW5ndGg7IGorKykge1xuICAgICAgY29uc3QgY2VsbENvbXBvbmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBjZWxsQ29tcG9uZW50LmNsYXNzTGlzdC5hZGQoXCJjZWxsXCIpO1xuICAgICAgY2VsbENvbXBvbmVudC5jbGFzc0xpc3QuYWRkKGdldENlbGxDbGFzc05hbWUoW2osIGldLCBib2FyZCkpO1xuICAgICAgcm93Q29tcG9uZW50LmFwcGVuZENoaWxkKGNlbGxDb21wb25lbnQpO1xuICAgIH1cblxuICAgIGJvYXJkQ2VsbHMuYXBwZW5kQ2hpbGQocm93Q29tcG9uZW50KTtcbiAgfVxuXG4gIGNvbnN0IERPTUJvYXJkID0ge1xuICAgIGNvbXBvbmVudDogYm9hcmRDb21wb25lbnQsXG4gICAgYm9hcmQ6IGJvYXJkLFxuICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgZWRpdGluZzogZmFsc2UsXG5cbiAgICBpc0F0dGFja2FibGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBhdHRhY2thYmxlO1xuICAgIH0sXG5cbiAgICBpc011dGFibGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBtdXRhYmxlO1xuICAgIH0sXG5cbiAgICBjbGVhcjogZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgbW92aW5nQ2VsbHMgPVxuICAgICAgICB0aGlzLmNvbXBvbmVudC5jaGlsZHJlblsxXS5xdWVyeVNlbGVjdG9yQWxsKFwiLm1vdmluZ1wiKTtcbiAgICAgIGlmIChtb3ZpbmdDZWxscy5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgIGZvciAoY29uc3QgY2VsbCBvZiBtb3ZpbmdDZWxscykge1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoXCJtb3ZpbmdcIik7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgQXJyYXkuZnJvbSh0aGlzLmNvbXBvbmVudC5jaGlsZHJlblsxXS5jaGlsZHJlbikuZm9yRWFjaCgocm93LCBpKSA9PiB7XG4gICAgICAgIEFycmF5LmZyb20ocm93LmNoaWxkcmVuKS5mb3JFYWNoKChjZWxsLCBqKSA9PiB7XG4gICAgICAgICAgY29uc3QgaXNNb3ZpbmcgPSBjZWxsLmNsYXNzTGlzdC5jb250YWlucyhcIm1vdmluZ1wiKTtcblxuICAgICAgICAgIGNlbGwuY2xhc3NOYW1lID0gXCJjZWxsXCI7XG4gICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKGdldENlbGxDbGFzc05hbWUoW2osIGldLCB0aGlzLmJvYXJkKSk7XG4gICAgICAgICAgaWYgKGlzTW92aW5nKSBjZWxsLmNsYXNzTGlzdC5hZGQoXCJtb3ZpbmdcIik7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIHJhbmRvbWl6ZUZvcm1hdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3Qgc2hpcHMgPSBbNSwgNCwgMywgMywgMl07XG5cbiAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgIHRoaXMuYm9hcmQucmVzZXQoKTtcblxuICAgICAgZm9yIChjb25zdCBzaGlwIG9mIHNoaXBzKSB7XG4gICAgICAgIGxldCBwbGFjZWQgPSBmYWxzZTtcbiAgICAgICAgd2hpbGUgKCFwbGFjZWQpIHtcbiAgICAgICAgICBjb25zdCBvcmllbnRhdGlvbiA9XG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpID4gMC41XG4gICAgICAgICAgICAgID8gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUxcbiAgICAgICAgICAgICAgOiBTaGlwT3JpZW50YXRpb24uVkVSVElDQUw7XG5cbiAgICAgICAgICBjb25zdCB4ID0gTWF0aC5mbG9vcihcbiAgICAgICAgICAgIE1hdGgucmFuZG9tKCkgKlxuICAgICAgICAgICAgICAoMTAgLSAob3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMID8gc2hpcCA6IDApKSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKFxuICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqXG4gICAgICAgICAgICAgICgxMCAtIChvcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMID8gc2hpcCA6IDApKSxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgcGxhY2VkID0gdGhpcy5ib2FyZC5wbGFjZVNoaXAoW3gsIHldLCBzaGlwLCBvcmllbnRhdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9LFxuXG4gICAgdG9nZ2xlU2hpcE1vdGlvbjogZnVuY3Rpb24gKGNvb3JkaW5hdGVzKSB7XG4gICAgICBjb25zdCBjZWxsID1cbiAgICAgICAgdGhpcy5jb21wb25lbnQuY2hpbGRyZW5bMV0uY2hpbGRyZW5bY29vcmRpbmF0ZXNbMV1dLmNoaWxkcmVuW1xuICAgICAgICAgIGNvb3JkaW5hdGVzWzBdXG4gICAgICAgIF07XG5cbiAgICAgIGlmICghY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJzaGlwXCIpKSByZXR1cm47XG5cbiAgICAgIGNvbnN0IHNoaXBJbmRleCA9IHRoaXMuYm9hcmQuZ2V0U2hpcEluZGV4KGNvb3JkaW5hdGVzKTtcbiAgICAgIGxldCBzaGlwID0gdGhpcy5ib2FyZC5zaGlwc1tzaGlwSW5kZXhdO1xuXG4gICAgICBzd2l0Y2ggKHNoaXAub3JpZW50YXRpb24pIHtcbiAgICAgICAgY2FzZSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTDpcbiAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgICAgaSsrXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5jaGlsZHJlblsxXS5jaGlsZHJlbltzaGlwLmNvb3JkaW5hdGVzWzFdXS5jaGlsZHJlbltcbiAgICAgICAgICAgICAgaVxuICAgICAgICAgICAgXS5jbGFzc0xpc3QudG9nZ2xlKFwibW92aW5nXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUw6XG4gICAgICAgICAgZm9yIChcbiAgICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1sxXTtcbiAgICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1sxXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGkrK1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuY2hpbGRyZW5bMV0uY2hpbGRyZW5baV0uY2hpbGRyZW5bXG4gICAgICAgICAgICAgIHNoaXAuY29vcmRpbmF0ZXNbMF1cbiAgICAgICAgICAgIF0uY2xhc3NMaXN0LnRvZ2dsZShcIm1vdmluZ1wiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSxcblxuICAgIG1vdmVTaGlwOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBjb25zdCBtb3ZpbmdTaGlwQ2VsbCA9XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmNoaWxkcmVuWzFdLnF1ZXJ5U2VsZWN0b3IoXCIubW92aW5nXCIpO1xuXG4gICAgICBpZiAoIW1vdmluZ1NoaXBDZWxsKSByZXR1cm47XG5cbiAgICAgIGNvbnN0IG1vdmluZ1NoaXBDb29yZGluYXRlcyA9IGdldENlbGxJbmRleChtb3ZpbmdTaGlwQ2VsbCk7XG4gICAgICBjb25zdCBtb3ZpbmdTaGlwSW5kZXggPSB0aGlzLmJvYXJkLmdldFNoaXBJbmRleChtb3ZpbmdTaGlwQ29vcmRpbmF0ZXMpO1xuXG4gICAgICB0aGlzLnRvZ2dsZVNoaXBNb3Rpb24obW92aW5nU2hpcENvb3JkaW5hdGVzKTtcblxuICAgICAgbGV0IG1vdmVTdWNjZXNzZnVsID0gZmFsc2U7XG4gICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICBjYXNlIFwiQXJyb3dVcFwiOlxuICAgICAgICAgIGlmIChtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMV0gPD0gMCkgYnJlYWs7XG4gICAgICAgICAgbW92ZVN1Y2Nlc3NmdWwgPSB0aGlzLmJvYXJkLm1vdmVTaGlwKG1vdmluZ1NoaXBJbmRleCwgW1xuICAgICAgICAgICAgbW92aW5nU2hpcENvb3JkaW5hdGVzWzBdLFxuICAgICAgICAgICAgbW92aW5nU2hpcENvb3JkaW5hdGVzWzFdIC0gMSxcbiAgICAgICAgICBdKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93TGVmdFwiOlxuICAgICAgICAgIGlmIChtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMF0gPD0gMCkgYnJlYWs7XG4gICAgICAgICAgbW92ZVN1Y2Nlc3NmdWwgPSB0aGlzLmJvYXJkLm1vdmVTaGlwKG1vdmluZ1NoaXBJbmRleCwgW1xuICAgICAgICAgICAgbW92aW5nU2hpcENvb3JkaW5hdGVzWzBdIC0gMSxcbiAgICAgICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlc1sxXSxcbiAgICAgICAgICBdKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93RG93blwiOlxuICAgICAgICAgIGlmIChtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMV0gPj0gdGhpcy5ib2FyZC5zaXplIC0gMSkgYnJlYWs7XG4gICAgICAgICAgbW92ZVN1Y2Nlc3NmdWwgPSB0aGlzLmJvYXJkLm1vdmVTaGlwKG1vdmluZ1NoaXBJbmRleCwgW1xuICAgICAgICAgICAgbW92aW5nU2hpcENvb3JkaW5hdGVzWzBdLFxuICAgICAgICAgICAgbW92aW5nU2hpcENvb3JkaW5hdGVzWzFdICsgMSxcbiAgICAgICAgICBdKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93UmlnaHRcIjpcbiAgICAgICAgICBpZiAobW92aW5nU2hpcENvb3JkaW5hdGVzWzBdID49IHRoaXMuYm9hcmQuc2l6ZSAtIDEpIGJyZWFrO1xuICAgICAgICAgIG1vdmVTdWNjZXNzZnVsID0gdGhpcy5ib2FyZC5tb3ZlU2hpcChtb3ZpbmdTaGlwSW5kZXgsIFtcbiAgICAgICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlc1swXSArIDEsXG4gICAgICAgICAgICBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMV0sXG4gICAgICAgICAgXSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGlmICghbW92ZVN1Y2Nlc3NmdWwpIHtcbiAgICAgICAgdGhpcy50b2dnbGVTaGlwTW90aW9uKG1vdmluZ1NoaXBDb29yZGluYXRlcyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5yZW5kZXIoKTtcblxuICAgICAgY29uc3QgbW92ZWRTaGlwID0gdGhpcy5ib2FyZC5zaGlwc1ttb3ZpbmdTaGlwSW5kZXhdO1xuICAgICAgdGhpcy50b2dnbGVTaGlwTW90aW9uKG1vdmVkU2hpcC5jb29yZGluYXRlcyk7XG5cbiAgICAgIGNvbnNvbGUubG9nKFwiZG9pbmcgc29tZXRoaW5nP1wiKTtcbiAgICB9LFxuXG4gICAgcmVjZWl2ZUF0dGFjazogZnVuY3Rpb24gKGNvb3JkaW5hdGVzKSB7XG4gICAgICBjb25zdCBjZWxsID0gYm9hcmQuY2VsbHNbY29vcmRpbmF0ZXNbMV1dW2Nvb3JkaW5hdGVzWzBdXTtcbiAgICAgIGlmIChjZWxsICE9PSBDZWxsU3RhdGUuRU1QVFkgJiYgY2VsbCAhPT0gQ2VsbFN0YXRlLlNISVApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBib2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzKTtcbiAgICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICBjb21wdXRlckF0dGFjazogYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IHgsIHk7XG5cbiAgICAgIGxldCB2YWxpZCA9IGZhbHNlO1xuICAgICAgd2hpbGUgKCF2YWxpZCkge1xuICAgICAgICB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYm9hcmQuc2l6ZSk7XG4gICAgICAgIHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBib2FyZC5zaXplKTtcblxuICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5jb21wb25lbnQuY2hpbGRyZW5bMV0uY2hpbGRyZW5beV0uY2hpbGRyZW5beF07XG4gICAgICAgIGlmIChcbiAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5jb250YWlucyhcImVtcHR5XCIpIHx8XG4gICAgICAgICAgY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJzaGlwXCIpXG4gICAgICAgICkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChyKSA9PiBzZXRUaW1lb3V0KHIsIDUwMCkpO1xuXG4gICAgICB0aGlzLmJvYXJkLnJlY2VpdmVBdHRhY2soW3gsIHldKTtcbiAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfSxcbiAgfTtcblxuICBmdW5jdGlvbiBzYXZlRWRpdHMoKSB7XG4gICAgaWYgKCFET01Cb2FyZC5jb21wb25lbnQuY2hpbGRyZW5bMF0ucmVwb3J0VmFsaWRpdHkoKSkgcmV0dXJuO1xuICAgIGJvYXJkSGVhZGVyLnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLW5hbWVcIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICBib2FyZEhlYWRlci5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1uYW1lLWlucHV0XCIpLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgYm9hcmRIZWFkZXIucXVlcnlTZWxlY3RvcihcIi5lZGl0LWJvYXJkXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgc2F2ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuXG4gICAgRE9NQm9hcmQuZWRpdGluZyA9IGZhbHNlO1xuICAgIERPTUJvYXJkLmNvbXBvbmVudC5jbGFzc0xpc3QucmVtb3ZlKFwiZWRpdGluZ1wiKTtcbiAgICBET01Cb2FyZC5jbGVhcigpO1xuICB9XG5cbiAgaWYgKHBsYXllci50eXBlID09PSBQbGF5ZXJUeXBlLkhVTUFOKSB7XG4gICAgcmFuZG9taXplQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBET01Cb2FyZC5yYW5kb21pemVGb3JtYXRpb24oKTtcbiAgICB9KTtcblxuICAgIGVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmVkaXRpbmdcIikpIHtcbiAgICAgICAgYWxlcnQoXCJQbGVhc2Ugc2F2ZSB0aGUgY3VycmVudGx5IGVkaXRpbmcgYm9hcmQgZmlyc3RcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYm9hcmRIZWFkZXIgPSBET01Cb2FyZC5jb21wb25lbnQuY2hpbGRyZW5bMF07XG5cbiAgICAgIGJvYXJkSGVhZGVyLnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLW5hbWVcIikuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIGJvYXJkSGVhZGVyXG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1uYW1lLWlucHV0XCIpXG4gICAgICAgIC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgZWRpdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgYm9hcmRIZWFkZXIucXVlcnlTZWxlY3RvcihcIi5zYXZlLWJvYXJkXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG5cbiAgICAgIERPTUJvYXJkLmVkaXRpbmcgPSB0cnVlO1xuICAgICAgRE9NQm9hcmQuY29tcG9uZW50LmNsYXNzTGlzdC5hZGQoXCJlZGl0aW5nXCIpO1xuICAgIH0pO1xuXG4gICAgYm9hcmRIZWFkZXJcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1uYW1lLWlucHV0XCIpXG4gICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgcGxheWVyLm5hbWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgIGJvYXJkSGVhZGVyLnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLW5hbWVcIikudGV4dENvbnRlbnQgPSBwbGF5ZXIubmFtZTtcbiAgICAgIH0pO1xuXG4gICAgc2F2ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2F2ZUVkaXRzKTtcblxuICAgIGJvYXJkSGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2ZW50KSA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgc2F2ZUVkaXRzKCk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gRE9NQm9hcmQ7XG59XG5cbmZ1bmN0aW9uIGdldENlbGxJbmRleChjZWxsKSB7XG4gIHJldHVybiBbXG4gICAgQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChjZWxsLnBhcmVudE5vZGUuY2hpbGRyZW4sIGNlbGwpLFxuICAgIEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoXG4gICAgICBjZWxsLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jaGlsZHJlbixcbiAgICAgIGNlbGwucGFyZW50Tm9kZSxcbiAgICApLFxuICBdO1xufVxuXG5mdW5jdGlvbiBnZXRDZWxsQ2xhc3NOYW1lKGNvb3JkaW5hdGVzLCBib2FyZCwgc2VjcmV0ID0gZmFsc2UpIHtcbiAgY29uc3QgY2VsbCA9IGJvYXJkLmNlbGxzW2Nvb3JkaW5hdGVzWzFdXVtjb29yZGluYXRlc1swXV07XG4gIHN3aXRjaCAoY2VsbCkge1xuICAgIGNhc2UgQ2VsbFN0YXRlLkVNUFRZOlxuICAgICAgcmV0dXJuIFwiZW1wdHlcIjtcbiAgICBjYXNlIENlbGxTdGF0ZS5NSVNTOlxuICAgICAgcmV0dXJuIFwibWlzc1wiO1xuICAgIGNhc2UgQ2VsbFN0YXRlLlNISVA6XG4gICAgICByZXR1cm4gc2VjcmV0ID8gXCJlbXB0eVwiIDogXCJzaGlwXCI7XG4gICAgY2FzZSBDZWxsU3RhdGUuSElUOlxuICAgICAgcmV0dXJuIFwiaGl0XCI7XG4gICAgY2FzZSBDZWxsU3RhdGUuU1VOSzpcbiAgICAgIHJldHVybiBcInN1bmtcIjtcbiAgfVxufVxuIiwiaW1wb3J0IHsgY3JlYXRlUGxheWVyLCBQbGF5ZXJUeXBlIH0gZnJvbSBcIi4uL2NvcmUvcGxheWVyLmpzXCI7XG5cbmltcG9ydCBjbG9zZVN2ZyBmcm9tIFwiLi4vLi4vYXNzZXRzL3guc3ZnXCI7XG5pbXBvcnQgZWRpdFN2ZyBmcm9tIFwiLi4vLi4vYXNzZXRzL2VkaXQuc3ZnXCI7XG5pbXBvcnQgcmVmcmVzaFN2ZyBmcm9tIFwiLi4vLi4vYXNzZXRzL3JlZnJlc2gtY2N3LnN2Z1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBDb250cm9scyhnYW1lKSB7XG4gIGNvbnN0IHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGFydFwiKTtcbiAgc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zYXZlLWJvYXJkOm5vdCguaGlkZGVuKVwiKSkge1xuICAgICAgYWxlcnQoXCJQbGVhc2Ugc2F2ZSB5b3VyIGJvYXJkcyBiZWZvcmUgc3RhcnRpbmcgdGhlIGdhbWVcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYXdhaXQgZ2FtZS5zdGFydCgpO1xuICB9KTtcblxuICBjb25zdCByZXNldEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udHJvbHMgLnJlc2V0XCIpO1xuICByZXNldEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gZ2FtZS5yZXNldCgpKTtcblxuICBjb25zdCBjb21wdXRlck9wcG9uZW50QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vcHBvbmVudC1jb21wdXRlclwiKTtcbiAgY29uc3QgZnJpZW5kT3Bwb25lbnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm9wcG9uZW50LWZyaWVuZFwiKTtcbiAgLy8gY29uc3Qgc2xpZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zbGlkZXJcIik7XG5cbiAgY29tcHV0ZXJPcHBvbmVudEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIC8vIGlmICghc2xpZGVyLmNsYXNzTGlzdC5jb250YWlucyhcInNsaWRlci1yaWdodFwiKSkgcmV0dXJuO1xuICAgIGlmIChjb21wdXRlck9wcG9uZW50QnV0dG9uLmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZS1tb2RlXCIpKSByZXR1cm47XG5cbiAgICAvLyBzbGlkZXIuY2xhc3NMaXN0LnJlbW92ZShcInNsaWRlci1yaWdodFwiKTtcbiAgICBjb21wdXRlck9wcG9uZW50QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmUtbW9kZVwiKTtcbiAgICBmcmllbmRPcHBvbmVudEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlLW1vZGVcIik7XG4gICAgZ2FtZS5jaGFuZ2VNb2RlKFxuICAgICAgY3JlYXRlUGxheWVyKFwiUGxheWVyXCIsIFBsYXllclR5cGUuSFVNQU4sIDEwKSxcbiAgICAgIGNyZWF0ZVBsYXllcihcIkNvbXB1dGVyXCIsIFBsYXllclR5cGUuQ09NUFVURVIsIDEwKSxcbiAgICApO1xuICB9KTtcbiAgZnJpZW5kT3Bwb25lbnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAvLyBpZiAoc2xpZGVyLmNsYXNzTGlzdC5jb250YWlucyhcInNsaWRlci1yaWdodFwiKSkgcmV0dXJuO1xuICAgIGlmIChmcmllbmRPcHBvbmVudEJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmUtbW9kZVwiKSkgcmV0dXJuO1xuXG4gICAgLy8gc2xpZGVyLmNsYXNzTGlzdC5hZGQoXCJzbGlkZXItcmlnaHRcIik7XG4gICAgZnJpZW5kT3Bwb25lbnRCdXR0b24uY2xhc3NMaXN0LmFkZChcImFjdGl2ZS1tb2RlXCIpO1xuICAgIGNvbXB1dGVyT3Bwb25lbnRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZS1tb2RlXCIpO1xuICAgIGdhbWUuY2hhbmdlTW9kZShcbiAgICAgIGNyZWF0ZVBsYXllcihcIlBsYXllciAxXCIsIFBsYXllclR5cGUuSFVNQU4sIDEwKSxcbiAgICAgIGNyZWF0ZVBsYXllcihcIlBsYXllciAyXCIsIFBsYXllclR5cGUuSFVNQU4sIDEwKSxcbiAgICApO1xuICB9KTtcblxuICBjb25zdCBoZWxwTGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVscC1saW5rXCIpO1xuICBoZWxwTGluay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGNvbnN0IG1vZGFsT3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgbW9kYWxPdmVybGF5LmNsYXNzTGlzdC5hZGQoXCJtb2RhbC1vdmVybGF5XCIpO1xuICAgIG1vZGFsT3ZlcmxheS5hcHBlbmRDaGlsZChjcmVhdGVIZWxwTW9kYWwoKSk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb290XCIpLmFwcGVuZENoaWxkKG1vZGFsT3ZlcmxheSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVIZWxwTW9kYWwoKSB7XG4gIGNvbnN0IGhlbHBNb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGhlbHBNb2RhbC5jbGFzc0xpc3QuYWRkKFwiaGVscC1tb2RhbFwiKTtcbiAgaGVscE1vZGFsLmlubmVySFRNTCA9IGBcbiAgICAgIDxoMT5Ib3cgdG8gUGxheTwvaDE+XG4gICAgICA8c2VjdGlvbj5cbiAgICAgICAgPGgzPkNob29zZSBHYW1lIE1vZGU8L2gzPlxuICAgICAgICA8cD5cbiAgICAgICAgICBCeSBkZWZhdWx0LCB5b3UnbGwgYmUgcGxheWluZyBhZ2FpbnN0IHRoZSBjb21wdXRlci5cbiAgICAgICAgICBJZiB5b3Ugd2FudCB0byBwbGF5IHdpdGggYSBmcmllbmQsIGNob29zZSB0aGUgXCJGcmllbmRcIiBvcHRpb24gaW4gdGhlIG9wcG9uZW50IHNlY3Rpb24sXG4gICAgICAgICAgYW5kIHBsYXkgYnkgcGFzc2luZyBhcm91bmQgeW91ciBkZXZpY2UuXG4gICAgICAgIDwvcD5cbiAgICAgIDwvc2VjdGlvbj5cbiAgICAgIDxzZWN0aW9uPlxuICAgICAgICA8aDM+RWRpdCB5b3VyIGJvYXJkKHMpPC9oMz5cbiAgICAgICAgPHA+XG4gICAgICAgICAgPHVsPlxuICAgICAgICAgICAgPGxpPkNsaWNrIG9uIHRoZSBlZGl0IGJ1dHRvbiAoPGltZyBjbGFzcz1cImVkaXQtaW1nXCIgLz4pIHRvIGNoYW5nZSB0aGUgbmFtZXMgb2YgdGhlIHBsYXllcnMsIGFuZCBtb3ZlIGFyb3VuZCB5b3VyIHNoaXBzLjwvbGk+XG4gICAgICAgICAgICA8bGk+WW91IGNhbiBhbHNvIGNsaWNrIHRoZSByZWZyZXNoIGJ1dHRvbiAoPGltZyBjbGFzcz1cInJlZnJlc2gtaW1nXCIgLz4pIHRvIHJhbmRvbWl6ZSB0aGUgcGxhY2VtZW50IG9mIHNoaXBzIGluIHRoZSBib2FyZC48L2xpPlxuICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvcD5cbiAgICAgIDwvc2VjdGlvbj5cbiAgICAgIDxzZWN0aW9uPlxuICAgICAgICA8aDM+U3RhcnQgcGxheWluZyE8L2gzPlxuICAgICAgICA8cD5cbiAgICAgICAgICBQcmVzcyBvbiBcIjxiPlN0YXJ0IEdhbWU8L2I+XCIgdG8gc3RhcnQgcGxheWluZy5cbiAgICAgICAgICBJZiB5b3UgYXJlIG5vdCBmYW1pbGlhciB3aXRoIDxhIGhyZWY9XCJodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9CYXR0bGVzaGlwXyhnYW1lKVwiPmJhdHRsZXNoaXA8L2E+LCBoZXJlJ3MgYSBxdWljayBydW4tdGhyb3VnaCBvZiB0aGUgbWVjaGFuaWNzOlxuICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgIDxsaT5JdCBpcyBhIHR3by1wbGF5ZXIgZ2FtZSwgd2l0aCBlYWNoIHBsYXllciBoYXZpbmcgYSBib2FyZCB3aXRoIHNoaXBzIGFycmFuZ2VkIG9uIGl0IGFjY29yZGluZyB0byB0aGVpciB3aXNoZXMuPC9saT5cbiAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgVGhlcmUgYXJlIDUgc2hpcHMgb2YgdmFyeWluZyBsZW5ndGhzOiBcbiAgICAgICAgICAgICAgPHRhYmxlPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgIDx0aD5TaGlwPC90aD5cbiAgICAgICAgICAgICAgICAgIDx0aD5TaXplPC90aD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgIDx0ZD5DYXJyaWVyPC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZD41PC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgIDx0ZD5CYXR0bGVzaGlwPC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZD40PC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgIDx0ZD5EZXN0cm95ZXI8L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkPjM8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgPHRkPlN1Ym1hcmluZTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQ+MzwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICA8dGQ+UGF0cm9sIEJvYXQ8L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkPjI8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICBFYWNoIHBsYXllciB0YWtlcyB0dXJucyBzaG9vdGluZyBhIHNxdWFyZSBvbiB0aGUgb3RoZXIgcGxheWVyJ3MgYm9hcmQuXG4gICAgICAgICAgICAgIFRoZXkgaGF2ZSBubyBpbmZvcm1hdGlvbiBvbiB3aGV0aGVyIHRoZXJlIGlzIGEgc2hpcCBvbiB0aGF0IHNxdWFyZSBvciBub3QuXG4gICAgICAgICAgICAgIEFmdGVyIGVhY2ggdHJ5LCB0aGV5IHdpbGwgYmUgaW5mb3JtZWQgd2hldGhlciB0aGV5IGhhZCBoaXQgYSBzaGlwIG9yIG1pc3NlZCB0aGVpciBzaG90LlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDxsaT5BZnRlciBhbGwgdGhlIHNxdWFyZXMgb2YgYSBwYXJ0aWN1bGFyIHNoaXAgaXMgaGl0LCBpdCB3aWxsIGJlIG1hcmtlZCAoYW5kIGluZm9ybWVkIHRvIHRoZSBzaG9vdGluZyBwbGF5ZXIpIGFzIHN1bmsuPC9saT5cbiAgICAgICAgICAgIDxsaT5BZnRlciBhbGwgdGhlIHNoaXBzIG9mIGEgcGFydGljdWxhciBib2FyZCBpcyBzdW5rLCB0aGF0IHBsYXllciBsb3NlcyB0aGUgZ2FtZSwgYW5kIHRoZSBzaG9vdGluZyBwbGF5ZXIgd2lucy48L2xpPlxuICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvcD5cbiAgICAgIDwvc2VjdGlvbj5cbiAgICAgIDxoMSBjbGFzcz1cInRoYW5rc1wiPlRoYW5rcyBmb3IgUGxheWluZyE8L2gxPlxuICAgIGA7XG5cbiAgaGVscE1vZGFsLnF1ZXJ5U2VsZWN0b3IoXCIuZWRpdC1pbWdcIikuc3JjID0gZWRpdFN2ZztcbiAgaGVscE1vZGFsLnF1ZXJ5U2VsZWN0b3IoXCIucmVmcmVzaC1pbWdcIikuc3JjID0gcmVmcmVzaFN2ZztcblxuICBjb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIGNsb3NlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJjbG9zZS1idXR0b25cIik7XG4gIGNvbnN0IGNsb3NlSWNvbiA9IG5ldyBJbWFnZSgpO1xuICBjbG9zZUljb24uc3JjID0gY2xvc2VTdmc7XG4gIGNsb3NlQnV0dG9uLmFwcGVuZENoaWxkKGNsb3NlSWNvbik7XG4gIGNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgaGVscE1vZGFsLnJlbW92ZSgpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWwtb3ZlcmxheVwiKS5yZW1vdmUoKTtcbiAgfSk7XG4gIGhlbHBNb2RhbC5hcHBlbmRDaGlsZChjbG9zZUJ1dHRvbik7XG5cbiAgcmV0dXJuIGhlbHBNb2RhbDtcbn1cbiIsImltcG9ydCB7IFBsYXllclR5cGUgfSBmcm9tIFwiLi4vY29yZS9wbGF5ZXIuanNcIjtcbmltcG9ydCB7IHNldHVwR2FtZUJvYXJkcyB9IGZyb20gXCIuL2JvYXJkcy5qc1wiO1xuXG5jb25zdCBHYW1lTW9kZSA9IE9iamVjdC5mcmVlemUoe1xuICBDT01QVVRFUjogXCJjb21wdXRlclwiLFxuICBGUklFTkQ6IFwiZnJpZW5kXCIsXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwR2FtZShwbGF5ZXJPbmUsIHBsYXllclR3bykge1xuICBjb25zdCBnYW1lID0ge1xuICAgIG1vZGU6IEdhbWVNb2RlLkNPTVBVVEVSLFxuXG4gICAgcGxheWVyczogW3BsYXllck9uZSwgcGxheWVyVHdvXSxcbiAgICBjdXJyZW50UGxheWVySW5kZXg6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpLFxuXG4gICAgaXNJblByb2dyZXNzOiBmYWxzZSxcbiAgICBpc0dhbWVPdmVyOiBmYWxzZSxcbiAgICBpc1BsYXllcldhaXRpbmc6IGZhbHNlLFxuXG4gICAgYm9hcmRzOiBbXSxcblxuICAgIHN0YXJ0OiBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmlzSW5Qcm9ncmVzcyA9IHRydWU7XG4gICAgICB0aGlzLmlzR2FtZU92ZXIgPSBmYWxzZTtcbiAgICAgIHRoaXMuaXNQbGF5ZXJXYWl0aW5nID0gZmFsc2U7XG5cbiAgICAgIHRoaXMuYm9hcmRzWzBdLmNsZWFyKCk7XG5cbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RhcnRcIikuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzZXRcIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5mb1wiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vcHBvbmVudFwiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb290XCIpLmNsYXNzTGlzdC5hZGQoXCJpbi1wcm9ncmVzc1wiKTtcblxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ib2FyZC1jb250cm9sc1wiKS5mb3JFYWNoKChib2FyZENvbnRyb2xzKSA9PiB7XG4gICAgICAgIGJvYXJkQ29udHJvbHMuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIH0pO1xuXG4gICAgICBhd2FpdCB0aGlzLnBsYXkoKTtcbiAgICB9LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IGdhbWVPdmVyU2NyZWVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lLW92ZXItc2NyZWVuXCIpO1xuICAgICAgaWYgKGdhbWVPdmVyU2NyZWVuKSBnYW1lT3ZlclNjcmVlbi5yZW1vdmUoKTtcblxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGFydFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXNldFwiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmZvXCIpLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm9wcG9uZW50XCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jvb3RcIikuY2xhc3NMaXN0LnJlbW92ZShcImluLXByb2dyZXNzXCIpO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb290XCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJhdHRhY2stYWxsb3dlZFwiKTtcblxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5lZGl0LWJvYXJkXCIpLmZvckVhY2goKGVkaXRCdXR0b24pID0+IHtcbiAgICAgICAgZWRpdEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmFjdGl2ZVwiKS5mb3JFYWNoKChhY3RpdmVCb2FyZCkgPT4ge1xuICAgICAgICBhY3RpdmVCb2FyZC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuaXNJblByb2dyZXNzID0gZmFsc2U7XG4gICAgICB0aGlzLmlzR2FtZU92ZXIgPSB0cnVlO1xuICAgICAgdGhpcy5pc1BsYXllcldhaXRpbmcgPSBmYWxzZTtcblxuICAgICAgdGhpcy5wbGF5ZXJzWzBdLmJvYXJkLnJlc2V0KCk7XG4gICAgICB0aGlzLnBsYXllcnNbMV0uYm9hcmQucmVzZXQoKTtcblxuICAgICAgdGhpcy5ib2FyZHMgPSBzZXR1cEdhbWVCb2FyZHModGhpcywgdGhpcy5wbGF5ZXJzWzBdLCB0aGlzLnBsYXllcnNbMV0pO1xuXG4gICAgICB0aGlzLmJvYXJkc1swXS5yYW5kb21pemVGb3JtYXRpb24oKTtcbiAgICAgIHRoaXMuYm9hcmRzWzFdLnJhbmRvbWl6ZUZvcm1hdGlvbigpO1xuXG4gICAgICBjb25zdCBib2FyZHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJvYXJkc1wiKTtcbiAgICAgIEFycmF5LmZyb20oYm9hcmRzQ29udGFpbmVyLmNoaWxkcmVuKS5mb3JFYWNoKChib2FyZCkgPT4ge1xuICAgICAgICBib2FyZHNDb250YWluZXIucmVtb3ZlQ2hpbGQoYm9hcmQpO1xuICAgICAgfSk7XG4gICAgICBib2FyZHNDb250YWluZXIuYXBwZW5kKFxuICAgICAgICB0aGlzLmJvYXJkc1swXS5jb21wb25lbnQsXG4gICAgICAgIHRoaXMuYm9hcmRzWzFdLmNvbXBvbmVudCxcbiAgICAgICk7XG4gICAgfSxcblxuICAgIGNoYW5nZU1vZGU6IGZ1bmN0aW9uIChwbGF5ZXJPbmUsIHBsYXllclR3bykge1xuICAgICAgdGhpcy5tb2RlID1cbiAgICAgICAgdGhpcy5tb2RlID09PSBHYW1lTW9kZS5DT01QVVRFUiA/IEdhbWVNb2RlLkZSSUVORCA6IEdhbWVNb2RlLkNPTVBVVEVSO1xuICAgICAgdGhpcy5wbGF5ZXJzID0gW3BsYXllck9uZSwgcGxheWVyVHdvXTtcbiAgICAgIHRoaXMuY3VycmVudFBsYXllckluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7XG5cbiAgICAgIHRoaXMuaXNJblByb2dyZXNzID0gZmFsc2U7XG4gICAgICB0aGlzLmlzR2FtZU92ZXIgPSBmYWxzZTtcbiAgICAgIHRoaXMuaXNQbGF5ZXJXYWl0aW5nID0gZmFsc2U7XG5cbiAgICAgIHRoaXMuYm9hcmRzID0gc2V0dXBHYW1lQm9hcmRzKHRoaXMsIHBsYXllck9uZSwgcGxheWVyVHdvKTtcblxuICAgICAgdGhpcy5yZXNldCgpO1xuICAgIH0sXG5cbiAgICBwbGF5OiBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgY3VycmVudFBsYXllciA9IHRoaXMucGxheWVyc1t0aGlzLmN1cnJlbnRQbGF5ZXJJbmRleF07XG4gICAgICBsZXQgbmV4dFBsYXllckluZGV4ID0gKHRoaXMuY3VycmVudFBsYXllckluZGV4ICsgMSkgJSAyO1xuICAgICAgbGV0IG5leHRQbGF5ZXIgPSB0aGlzLnBsYXllcnNbbmV4dFBsYXllckluZGV4XTtcblxuICAgICAgd2hpbGUgKCF0aGlzLmlzR2FtZU92ZXIpIHtcbiAgICAgICAgaWYgKGN1cnJlbnRQbGF5ZXIuYm9hcmQuaXNGbGVldERlc3Ryb3llZCgpKSB7XG4gICAgICAgICAgdGhpcy5pc0dhbWVPdmVyID0gdHJ1ZTtcblxuICAgICAgICAgIHRoaXMuYm9hcmRzWyh0aGlzLmN1cnJlbnRQbGF5ZXJJbmRleCArIDEpICUgMl0uY29tcG9uZW50LmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgY3JlYXRlR2FtZU92ZXJTY3JlZW4oY3VycmVudFBsYXllciwgbmV4dFBsYXllciwgdGhpcyksXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5mb1wiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNQbGF5ZXJXYWl0aW5nKSB7XG4gICAgICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwKSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb290XCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJhdHRhY2stYWxsb3dlZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGN1cnJlbnRQbGF5ZXIgPSB0aGlzLnBsYXllcnNbdGhpcy5jdXJyZW50UGxheWVySW5kZXhdO1xuICAgICAgICBuZXh0UGxheWVySW5kZXggPSAodGhpcy5jdXJyZW50UGxheWVySW5kZXggKyAxKSAlIDI7XG4gICAgICAgIG5leHRQbGF5ZXIgPSB0aGlzLnBsYXllcnNbbmV4dFBsYXllckluZGV4XTtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGAuYm9hcmQtJHt0aGlzLmN1cnJlbnRQbGF5ZXJJbmRleCA9PT0gMCA/IFwidHdvXCIgOiBcIm9uZVwifS1pbmZvYCxcbiAgICAgICAgKS50ZXh0Q29udGVudCA9XG4gICAgICAgICAgYCR7bmV4dFBsYXllci50eXBlID09PSBQbGF5ZXJUeXBlLkNPTVBVVEVSID8gXCJZb3VyXCIgOiBjdXJyZW50UGxheWVyLm5hbWUgKyBcIidzXCJ9IHR1cm5gO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGAuYm9hcmQtJHt0aGlzLmN1cnJlbnRQbGF5ZXJJbmRleCA9PT0gMCA/IFwib25lXCIgOiBcInR3b1wifS1pbmZvYCxcbiAgICAgICAgKS50ZXh0Q29udGVudCA9IFwiXCI7XG5cbiAgICAgICAgdGhpcy5ib2FyZHNbdGhpcy5jdXJyZW50UGxheWVySW5kZXhdLmNvbXBvbmVudC5jbGFzc0xpc3QucmVtb3ZlKFxuICAgICAgICAgIFwiYWN0aXZlXCIsXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYm9hcmRzW25leHRQbGF5ZXJJbmRleF0uY29tcG9uZW50LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG5cbiAgICAgICAgdGhpcy5ib2FyZHNbdGhpcy5jdXJyZW50UGxheWVySW5kZXhdLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmJvYXJkc1tuZXh0UGxheWVySW5kZXhdLmFjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRQbGF5ZXIudHlwZSA9PT0gUGxheWVyVHlwZS5DT01QVVRFUiAmJiAhdGhpcy5pc0dhbWVPdmVyKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5ib2FyZHNbbmV4dFBsYXllckluZGV4XS5jb21wdXRlckF0dGFjaygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuaXNQbGF5ZXJXYWl0aW5nID0gdHJ1ZTtcblxuICAgICAgICAgIGlmIChuZXh0UGxheWVyLnR5cGUgIT09IFBsYXllclR5cGUuQ09NUFVURVIpIHtcbiAgICAgICAgICAgIHRoaXMuYm9hcmRzW25leHRQbGF5ZXJJbmRleF0uY29tcG9uZW50LmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgICBjcmVhdGVQYXNzaW5nU2NyZWVuKHRoaXMucGxheWVycywgdGhpcy5jdXJyZW50UGxheWVySW5kZXgpLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jvb3RcIikuY2xhc3NMaXN0LmFkZChcImF0dGFjay1hbGxvd2VkXCIpO1xuXG4gICAgICAgICAgaWYgKG5leHRQbGF5ZXIudHlwZSAhPT0gUGxheWVyVHlwZS5DT01QVVRFUikge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb290XCIpLmNsYXNzTGlzdC5hZGQoXCJwYXNzaW5nXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY3VycmVudFBsYXllckluZGV4ID0gbmV4dFBsYXllckluZGV4O1xuICAgICAgfVxuICAgIH0sXG4gIH07XG5cbiAgZ2FtZS5ib2FyZHMgPSBzZXR1cEdhbWVCb2FyZHMoZ2FtZSwgcGxheWVyT25lLCBwbGF5ZXJUd28pO1xuXG4gIHJldHVybiBnYW1lO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVHYW1lT3ZlclNjcmVlbihjdXJyZW50UGxheWVyLCBuZXh0UGxheWVyLCBnYW1lKSB7XG4gIGNvbnN0IGdhbWVPdmVyU2NyZWVuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZ2FtZU92ZXJTY3JlZW4uY2xhc3NMaXN0LmFkZChcImdhbWUtb3Zlci1zY3JlZW5cIik7XG5cbiAgbGV0IGdhbWVPdmVyTWVzc2FnZTtcbiAgaWYgKGN1cnJlbnRQbGF5ZXIudHlwZSA9PT0gUGxheWVyVHlwZS5DT01QVVRFUikge1xuICAgIGdhbWVPdmVyTWVzc2FnZSA9IFwiWU9VIFdPTiBUSEUgR0FNRSFcIjtcbiAgfSBlbHNlIGlmIChuZXh0UGxheWVyLnR5cGUgPT09IFBsYXllclR5cGUuQ09NUFVURVIpIHtcbiAgICBnYW1lT3Zlck1lc3NhZ2UgPSBcIllPVSBMT1NUIFRIRSBHQU1FIVwiO1xuICB9IGVsc2Uge1xuICAgIGdhbWVPdmVyTWVzc2FnZSA9IGAke25leHRQbGF5ZXIubmFtZS50b1VwcGVyQ2FzZSgpfSBXT04gVEhFIEdBTUUhYDtcbiAgfVxuXG4gIGdhbWVPdmVyU2NyZWVuLmlubmVySFRNTCA9IGA8cD4ke2dhbWVPdmVyTWVzc2FnZX08L3A+YDtcblxuICBjb25zdCByZXNldEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIHJlc2V0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJyZXNldFwiKTtcbiAgcmVzZXRCdXR0b24udGV4dENvbnRlbnQgPSBcIlBsYXkgQWdhaW5cIjtcbiAgcmVzZXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGdhbWUucmVzZXQoKSk7XG4gIGdhbWVPdmVyU2NyZWVuLmFwcGVuZENoaWxkKHJlc2V0QnV0dG9uKTtcblxuICBjb25zdCBwYXNzaW5nU2NyZWVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYXNzaW5nLXNjcmVlblwiKTtcbiAgaWYgKHBhc3NpbmdTY3JlZW4pIHBhc3NpbmdTY3JlZW4ucmVtb3ZlKCk7XG5cbiAgcmV0dXJuIGdhbWVPdmVyU2NyZWVuO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVQYXNzaW5nU2NyZWVuKHBsYXllcnMsIGN1cnJlbnRQbGF5ZXIpIHtcbiAgY29uc3QgcGFzc2luZ1NjcmVlbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHBhc3NpbmdTY3JlZW4uY2xhc3NMaXN0LmFkZChcInBhc3Npbmctc2NyZWVuXCIpO1xuICBwYXNzaW5nU2NyZWVuLmlubmVySFRNTCA9IGBcbiAgICA8cD5QYXNzIHRoZSBkZXZpY2UgdG8gJHtwbGF5ZXJzW2N1cnJlbnRQbGF5ZXJdLm5hbWV9PC9wPlxuICBgO1xuICBjb25zdCBjb250aW51ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIGNvbnRpbnVlQnV0dG9uLnRleHRDb250ZW50ID0gXCJDb250aW51ZVwiO1xuICBjb250aW51ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHBhc3NpbmdTY3JlZW4ucmVtb3ZlKCk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYXNzaW5nXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJwYXNzaW5nXCIpO1xuICB9KTtcbiAgcGFzc2luZ1NjcmVlbi5hcHBlbmRDaGlsZChjb250aW51ZUJ1dHRvbik7XG4gIHJldHVybiBwYXNzaW5nU2NyZWVuO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICghc2NyaXB0VXJsIHx8ICEvXmh0dHAocz8pOi8udGVzdChzY3JpcHRVcmwpKSkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsImltcG9ydCB7IGNyZWF0ZVBsYXllciwgUGxheWVyVHlwZSB9IGZyb20gXCIuL2NvcmUvcGxheWVyLmpzXCI7XG5pbXBvcnQgeyBzZXR1cENvbnRyb2xzIH0gZnJvbSBcIi4vZG9tL2NvbnRyb2xzLmpzXCI7XG5pbXBvcnQgeyBzZXR1cEdhbWUgfSBmcm9tIFwiLi9kb20vZ2FtZS5qc1wiO1xuXG5pbXBvcnQgXCIuL3N0eWxlcy9pbmRleC5jc3NcIjtcblxuY29uc29sZS5sb2coXCJHZXQgUmVhZHkgZm9yIEJhdHRsZSFcIik7XG5cbmNvbnN0IHJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIik7XG5yb290LmlubmVySFRNTCA9IGBcbiAgPGhlYWRlcj5cbiAgICA8aDE+QmF0dGxlc2hpcDwvaDE+XG4gIDwvaGVhZGVyPlxuICA8ZGl2IGNsYXNzPVwib3Bwb25lbnRcIj5cbiAgICA8cD5PcHBvbmVudDogPC9wPlxuICAgIDxkaXYgY2xhc3M9XCJvcHRpb25zXCI+XG4gICAgICA8cCBjbGFzcz1cIm9wcG9uZW50LWNvbXB1dGVyIGFjdGl2ZS1tb2RlXCI+Q29tcHV0ZXI8L3A+XG4gICAgICA8cCBjbGFzcz1cIm9wcG9uZW50LWZyaWVuZFwiPkZyaWVuZDwvcD5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDxhIGNsYXNzPVwiaGVscC1saW5rXCI+SG93IHRvIFBsYXk8L2E+XG4gIDxkaXYgY2xhc3M9XCJjb250cm9sc1wiPlxuICAgIDxidXR0b24gY2xhc3M9XCJzdGFydFwiPlN0YXJ0IEdhbWU8L2J1dHRvbj5cbiAgICA8YnV0dG9uIGNsYXNzPVwicmVzZXQgaGlkZGVuXCI+UmVzZXQgR2FtZTwvYnV0dG9uPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImJvYXJkc1wiPjwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiaW5mbyBoaWRkZW5cIj5cbiAgICA8cCBjbGFzcz1cImJvYXJkLW9uZS1pbmZvXCI+PC9wPlxuICAgIDxwIGNsYXNzPVwiYm9hcmQtdHdvLWluZm9cIj48L3A+XG4gIDwvZGl2PlxuYDtcblxuY29uc3QgZ2FtZSA9IHNldHVwR2FtZShcbiAgY3JlYXRlUGxheWVyKFwiUGxheWVyXCIsIFBsYXllclR5cGUuSFVNQU4sIDEwKSxcbiAgY3JlYXRlUGxheWVyKFwiQ29tcHV0ZXJcIiwgUGxheWVyVHlwZS5DT01QVVRFUiwgMTApLFxuKTtcblxuZG9jdW1lbnRcbiAgLnF1ZXJ5U2VsZWN0b3IoXCIuYm9hcmRzXCIpXG4gIC5hcHBlbmQoZ2FtZS5ib2FyZHNbMF0uY29tcG9uZW50LCBnYW1lLmJvYXJkc1sxXS5jb21wb25lbnQpO1xuc2V0dXBDb250cm9scyhnYW1lKTtcbiJdLCJuYW1lcyI6WyJjcmVhdGVTaGlwIiwiU2hpcE9yaWVudGF0aW9uIiwiQ2VsbFN0YXRlIiwiT2JqZWN0IiwiZnJlZXplIiwiRU1QVFkiLCJNSVNTIiwiU0hJUCIsIkhJVCIsIlNVTksiLCJjcmVhdGVHYW1lQm9hcmQiLCJzaXplIiwiRXJyb3IiLCJjZWxscyIsIkFycmF5IiwiZnJvbSIsImxlbmd0aCIsInNoaXBzIiwicmVzZXQiLCJwbGFjZVNoaXAiLCJjb29yZGluYXRlcyIsIm9yaWVudGF0aW9uIiwiSE9SSVpPTlRBTCIsIlZFUlRJQ0FMIiwiaSIsInB1c2giLCJtb3ZlU2hpcCIsInNoaXBJbmRleCIsInNoaXAiLCJwb3AiLCJyb3RhdGVTaGlwIiwibmV3T3JpZW50YXRpb24iLCJnZXRTaGlwSW5kZXgiLCJqIiwicmVjZWl2ZUF0dGFjayIsImhpdCIsImlzU3VuayIsImlzRmxlZXREZXN0cm95ZWQiLCJQbGF5ZXJUeXBlIiwiSFVNQU4iLCJDT01QVVRFUiIsImNyZWF0ZVBsYXllciIsIm5hbWUiLCJ0eXBlIiwiYm9hcmRTaXplIiwiYm9hcmQiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJoaXRzIiwicmVmcmVzaFN2ZyIsImVkaXRTdmciLCJzYXZlU3ZnIiwic2V0dXBHYW1lQm9hcmRzIiwiZ2FtZSIsInBsYXllck9uZSIsInBsYXllclR3byIsImJvYXJkT25lIiwiY3JlYXRlQm9hcmRDb21wb25lbnQiLCJyYW5kb21pemVGb3JtYXRpb24iLCJjb21wb25lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJhZGRFdmVudExpc3RlbmVyIiwiY2xlYXIiLCJib2FyZFR3byIsIkRPTUJvYXJkIiwiY2hpbGRyZW4iLCJmb3JFYWNoIiwicm93IiwiY2VsbCIsImVkaXRpbmciLCJpc011dGFibGUiLCJjb250YWlucyIsImlzSW5Qcm9ncmVzcyIsInRvZ2dsZVNoaXBNb3Rpb24iLCJpc0F0dGFja2FibGUiLCJhY3RpdmUiLCJpc0dhbWVPdmVyIiwiaXNQbGF5ZXJXYWl0aW5nIiwiZXZlbnQiLCJyZW5kZXIiLCJwcmV2ZW50RGVmYXVsdCIsImRvY3VtZW50Iiwia2V5IiwicGxheWVyIiwiYXR0YWNrYWJsZSIsIm11dGFibGUiLCJib2FyZENvbXBvbmVudCIsImNyZWF0ZUVsZW1lbnQiLCJib2FyZEhlYWRlciIsImlubmVySFRNTCIsImFwcGVuZENoaWxkIiwicmFuZG9taXplQnV0dG9uIiwiZWRpdEJ1dHRvbiIsInNhdmVCdXR0b24iLCJ0aXRsZSIsInJlZnJlc2hJY29uIiwiSW1hZ2UiLCJzcmMiLCJlZGl0SWNvbiIsInNhdmVJY29uIiwiYm9hcmRDb250cm9scyIsImJvYXJkQ2VsbHMiLCJyb3dDb21wb25lbnQiLCJjZWxsQ29tcG9uZW50IiwiZ2V0Q2VsbENsYXNzTmFtZSIsIm1vdmluZ0NlbGxzIiwicXVlcnlTZWxlY3RvckFsbCIsInJlbW92ZSIsImlzTW92aW5nIiwiY2xhc3NOYW1lIiwicGxhY2VkIiwiTWF0aCIsInJhbmRvbSIsIngiLCJmbG9vciIsInkiLCJ0b2dnbGUiLCJtb3ZpbmdTaGlwQ2VsbCIsInF1ZXJ5U2VsZWN0b3IiLCJtb3ZpbmdTaGlwQ29vcmRpbmF0ZXMiLCJnZXRDZWxsSW5kZXgiLCJtb3ZpbmdTaGlwSW5kZXgiLCJtb3ZlU3VjY2Vzc2Z1bCIsIm1vdmVkU2hpcCIsImNvbnNvbGUiLCJsb2ciLCJjb21wdXRlckF0dGFjayIsInZhbGlkIiwiUHJvbWlzZSIsInIiLCJzZXRUaW1lb3V0Iiwic2F2ZUVkaXRzIiwicmVwb3J0VmFsaWRpdHkiLCJhbGVydCIsInRhcmdldCIsInZhbHVlIiwidGV4dENvbnRlbnQiLCJwcm90b3R5cGUiLCJpbmRleE9mIiwiY2FsbCIsInBhcmVudE5vZGUiLCJzZWNyZXQiLCJjbG9zZVN2ZyIsInNldHVwQ29udHJvbHMiLCJzdGFydEJ1dHRvbiIsInN0YXJ0IiwicmVzZXRCdXR0b24iLCJjb21wdXRlck9wcG9uZW50QnV0dG9uIiwiZnJpZW5kT3Bwb25lbnRCdXR0b24iLCJjaGFuZ2VNb2RlIiwiaGVscExpbmsiLCJtb2RhbE92ZXJsYXkiLCJjcmVhdGVIZWxwTW9kYWwiLCJoZWxwTW9kYWwiLCJjbG9zZUJ1dHRvbiIsImNsb3NlSWNvbiIsIkdhbWVNb2RlIiwiRlJJRU5EIiwic2V0dXBHYW1lIiwibW9kZSIsInBsYXllcnMiLCJjdXJyZW50UGxheWVySW5kZXgiLCJib2FyZHMiLCJwbGF5IiwiZ2FtZU92ZXJTY3JlZW4iLCJhY3RpdmVCb2FyZCIsImJvYXJkc0NvbnRhaW5lciIsInJlbW92ZUNoaWxkIiwiYXBwZW5kIiwiY3VycmVudFBsYXllciIsIm5leHRQbGF5ZXJJbmRleCIsIm5leHRQbGF5ZXIiLCJjcmVhdGVHYW1lT3ZlclNjcmVlbiIsInJlc29sdmUiLCJjcmVhdGVQYXNzaW5nU2NyZWVuIiwiZ2FtZU92ZXJNZXNzYWdlIiwidG9VcHBlckNhc2UiLCJwYXNzaW5nU2NyZWVuIiwiY29udGludWVCdXR0b24iLCJyb290IiwiZ2V0RWxlbWVudEJ5SWQiXSwic291cmNlUm9vdCI6IiJ9