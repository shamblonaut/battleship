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
    randomizeButton.type = "button";
    const refreshIcon = new Image();
    refreshIcon.src = _assets_refresh_ccw_svg__WEBPACK_IMPORTED_MODULE_3__;
    randomizeButton.appendChild(refreshIcon);
    editButton = document.createElement("button");
    editButton.classList.add("edit-board");
    editButton.type = "button";
    const editIcon = new Image();
    editIcon.src = _assets_edit_svg__WEBPACK_IMPORTED_MODULE_4__;
    editButton.appendChild(editIcon);
    saveButton = document.createElement("button");
    saveButton.classList.add("save-board", "hidden");
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
      if (document.querySelector(".editing")) return;
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

function setupControls(game) {
  const startButton = document.querySelector(".start");
  startButton.addEventListener("click", async () => {
    if (document.querySelector(".save-board:not(.hidden)")) return;
    await game.start();
  });
  const resetButton = document.querySelector(".controls .reset");
  resetButton.addEventListener("click", () => game.reset());
  const computerOpponentButton = document.querySelector(".opponent-computer");
  const friendOpponentButton = document.querySelector(".opponent-friend");
  const slider = document.querySelector(".slider");
  computerOpponentButton.addEventListener("click", () => {
    if (!slider.classList.contains("slider-right")) return;
    slider.classList.remove("slider-right");
    game.changeMode((0,_core_player_js__WEBPACK_IMPORTED_MODULE_0__.createPlayer)("Player", _core_player_js__WEBPACK_IMPORTED_MODULE_0__.PlayerType.HUMAN, 10), (0,_core_player_js__WEBPACK_IMPORTED_MODULE_0__.createPlayer)("Computer", _core_player_js__WEBPACK_IMPORTED_MODULE_0__.PlayerType.COMPUTER, 10));
  });
  friendOpponentButton.addEventListener("click", () => {
    if (slider.classList.contains("slider-right")) return;
    slider.classList.add("slider-right");
    game.changeMode((0,_core_player_js__WEBPACK_IMPORTED_MODULE_0__.createPlayer)("Player 1", _core_player_js__WEBPACK_IMPORTED_MODULE_0__.PlayerType.HUMAN, 10), (0,_core_player_js__WEBPACK_IMPORTED_MODULE_0__.createPlayer)("Player 2", _core_player_js__WEBPACK_IMPORTED_MODULE_0__.PlayerType.HUMAN, 10));
  });
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
  <header>Battleship</header>
  <div class="opponent">
    <p>Opponent: </p>
    <div class="options">
      <div class="slider slider-computer"></div>
      <p class="opponent-computer active-mode">Computer</p>
      <p class="opponent-friend">Friend</p>
    </div>
  </div>
  <div class="boards"></div>
  <div class="info hidden">
    <p class="board-one-info"></p>
    <p class="board-two-info"></p>
  </div>
  <div class="controls">
    <button class="start">Start Game</button>
    <button class="reset hidden">Reset Game</button>
  </div>
`;
const game = (0,_dom_game_js__WEBPACK_IMPORTED_MODULE_2__.setupGame)((0,_core_player_js__WEBPACK_IMPORTED_MODULE_0__.createPlayer)("Player", _core_player_js__WEBPACK_IMPORTED_MODULE_0__.PlayerType.HUMAN, 10), (0,_core_player_js__WEBPACK_IMPORTED_MODULE_0__.createPlayer)("Computer", _core_player_js__WEBPACK_IMPORTED_MODULE_0__.PlayerType.COMPUTER, 10));
document.querySelector(".boards").append(game.boards[0].component, game.boards[1].component);
(0,_dom_controls_js__WEBPACK_IMPORTED_MODULE_1__.setupControls)(game);
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFFRCxNQUFNckMsSUFBSSxHQUFHa0csdURBQVMsQ0FDcEI5Ryw2REFBWSxDQUFDLFFBQVEsRUFBRUgsdURBQVUsQ0FBQ0MsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUM1Q0UsNkRBQVksQ0FBQyxVQUFVLEVBQUVILHVEQUFVLENBQUNFLFFBQVEsRUFBRSxFQUFFLENBQ2xELENBQUM7QUFFRDBDLFFBQVEsQ0FDTG9DLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FDeEIyQyxNQUFNLENBQUM1RyxJQUFJLENBQUNzRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUNoRyxTQUFTLEVBQUVOLElBQUksQ0FBQ3NHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQ2hHLFNBQVMsQ0FBQztBQUM3RGtGLCtEQUFhLENBQUN4RixJQUFJLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL2luZGV4LmNzcz80ZTQyIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29yZS9nYW1lQm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb3JlL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvcmUvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbS9ib2FyZHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb20vY29udHJvbHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb20vZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgeyBjcmVhdGVTaGlwLCBTaGlwT3JpZW50YXRpb24gfSBmcm9tIFwiLi9zaGlwLmpzXCI7XG5cbmV4cG9ydCBjb25zdCBDZWxsU3RhdGUgPSBPYmplY3QuZnJlZXplKHtcbiAgRU1QVFk6IDAsXG4gIE1JU1M6IDEsXG4gIFNISVA6IDIsXG4gIEhJVDogMyxcbiAgU1VOSzogNCxcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlR2FtZUJvYXJkKHNpemUpIHtcbiAgaWYgKHNpemUgPD0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgYm9hcmQgc2l6ZVwiKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgc2l6ZSxcbiAgICBjZWxsczogQXJyYXkuZnJvbSh7IGxlbmd0aDogc2l6ZSB9LCAoKSA9PlxuICAgICAgQXJyYXkuZnJvbSh7IGxlbmd0aDogc2l6ZSB9LCAoKSA9PiBDZWxsU3RhdGUuRU1QVFkpLFxuICAgICksXG4gICAgc2hpcHM6IFtdLFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuY2VsbHMgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiBzaXplIH0sICgpID0+XG4gICAgICAgIEFycmF5LmZyb20oeyBsZW5ndGg6IHNpemUgfSwgKCkgPT4gQ2VsbFN0YXRlLkVNUFRZKSxcbiAgICAgICk7XG4gICAgICB0aGlzLnNoaXBzID0gW107XG4gICAgfSxcblxuICAgIHBsYWNlU2hpcDogZnVuY3Rpb24gKGNvb3JkaW5hdGVzLCBsZW5ndGgsIG9yaWVudGF0aW9uKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGNvb3JkaW5hdGVzWzBdIDwgMCB8fFxuICAgICAgICBjb29yZGluYXRlc1sxXSA8IDAgfHxcbiAgICAgICAgY29vcmRpbmF0ZXNbMF0gPj0gc2l6ZSB8fFxuICAgICAgICBjb29yZGluYXRlc1sxXSA+PSBzaXplXG4gICAgICApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IHBsYWNlIHNoaXAgb3V0c2lkZSB0aGUgYm9hcmRcIik7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAob3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMICYmXG4gICAgICAgICAgY29vcmRpbmF0ZXNbMF0gKyBsZW5ndGggLSAxID49IHNpemUpIHx8XG4gICAgICAgIChvcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMICYmXG4gICAgICAgICAgY29vcmRpbmF0ZXNbMV0gKyBsZW5ndGggLSAxID49IHNpemUpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAob3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSBjb29yZGluYXRlc1swXTsgaSA8PSBjb29yZGluYXRlc1swXSArIGxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgIGlmICh0aGlzLmNlbGxzW2Nvb3JkaW5hdGVzWzFdXVtpXSAhPT0gQ2VsbFN0YXRlLkVNUFRZKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKG9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IGNvb3JkaW5hdGVzWzFdOyBpIDw9IGNvb3JkaW5hdGVzWzFdICsgbGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgaWYgKHRoaXMuY2VsbHNbaV1bY29vcmRpbmF0ZXNbMF1dICE9PSBDZWxsU3RhdGUuRU1QVFkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5zaGlwcy5wdXNoKGNyZWF0ZVNoaXAobGVuZ3RoLCBjb29yZGluYXRlcywgb3JpZW50YXRpb24pKTtcblxuICAgICAgaWYgKG9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCkge1xuICAgICAgICBmb3IgKGxldCBpID0gY29vcmRpbmF0ZXNbMF07IGkgPD0gY29vcmRpbmF0ZXNbMF0gKyBsZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICB0aGlzLmNlbGxzW2Nvb3JkaW5hdGVzWzFdXVtpXSA9IENlbGxTdGF0ZS5TSElQO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKG9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IGNvb3JkaW5hdGVzWzFdOyBpIDw9IGNvb3JkaW5hdGVzWzFdICsgbGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5jZWxsc1tpXVtjb29yZGluYXRlc1swXV0gPSBDZWxsU3RhdGUuU0hJUDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuXG4gICAgbW92ZVNoaXA6IGZ1bmN0aW9uIChzaGlwSW5kZXgsIGNvb3JkaW5hdGVzKSB7XG4gICAgICBjb25zdCBzaGlwID0gdGhpcy5zaGlwc1tzaGlwSW5kZXhdO1xuICAgICAgaWYgKCFzaGlwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlNoaXAgZG9lcyBub3QgZXhpc3RcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCkge1xuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1swXTtcbiAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMF0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgaSsrXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuY2VsbHNbc2hpcC5jb29yZGluYXRlc1sxXV1baV0gPSBDZWxsU3RhdGUuRU1QVFk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMKSB7XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzFdO1xuICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1sxXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5jZWxsc1tpXVtzaGlwLmNvb3JkaW5hdGVzWzBdXSA9IENlbGxTdGF0ZS5FTVBUWTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMucGxhY2VTaGlwKGNvb3JkaW5hdGVzLCBzaGlwLmxlbmd0aCwgc2hpcC5vcmllbnRhdGlvbikpIHtcbiAgICAgICAgaWYgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMKSB7XG4gICAgICAgICAgZm9yIChcbiAgICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1swXTtcbiAgICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGkrK1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5jZWxsc1tzaGlwLmNvb3JkaW5hdGVzWzFdXVtpXSA9IENlbGxTdGF0ZS5TSElQO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwpIHtcbiAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzFdO1xuICAgICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgICAgaSsrXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmNlbGxzW2ldW3NoaXAuY29vcmRpbmF0ZXNbMF1dID0gQ2VsbFN0YXRlLlNISVA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zaGlwc1tzaGlwSW5kZXhdID0gdGhpcy5zaGlwcy5wb3AoKTtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIHJvdGF0ZVNoaXA6IGZ1bmN0aW9uIChzaGlwSW5kZXgpIHtcbiAgICAgIGNvbnN0IHNoaXAgPSB0aGlzLnNoaXBzW3NoaXBJbmRleF07XG4gICAgICBpZiAoIXNoaXApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2hpcCBkb2VzIG5vdCBleGlzdFwiKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbmV3T3JpZW50YXRpb24gPVxuICAgICAgICBzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTFxuICAgICAgICAgID8gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMXG4gICAgICAgICAgOiBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTDtcblxuICAgICAgaWYgKG5ld09yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCkge1xuICAgICAgICBpZiAoc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMSA+PSB0aGlzLnNpemUpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1swXSArIDE7XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICBpZiAodGhpcy5jZWxsc1tzaGlwLmNvb3JkaW5hdGVzWzFdXVtpXSAhPT0gQ2VsbFN0YXRlLkVNUFRZKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKG5ld09yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwpIHtcbiAgICAgICAgaWYgKHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDEgPj0gdGhpcy5zaXplKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyAxO1xuICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1sxXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKHRoaXMuY2VsbHNbaV1bc2hpcC5jb29yZGluYXRlc1swXV0gIT09IENlbGxTdGF0ZS5FTVBUWSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobmV3T3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMKSB7XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzFdO1xuICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1sxXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5jZWxsc1tpXVtzaGlwLmNvb3JkaW5hdGVzWzBdXSA9IENlbGxTdGF0ZS5FTVBUWTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1swXTtcbiAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMF0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgaSsrXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuY2VsbHNbc2hpcC5jb29yZGluYXRlc1sxXV1baV0gPSBDZWxsU3RhdGUuU0hJUDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChuZXdPcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMKSB7XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5jZWxsc1tzaGlwLmNvb3JkaW5hdGVzWzFdXVtpXSA9IENlbGxTdGF0ZS5FTVBUWTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1sxXTtcbiAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgaSsrXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuY2VsbHNbaV1bc2hpcC5jb29yZGluYXRlc1swXV0gPSBDZWxsU3RhdGUuU0hJUDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzaGlwLm9yaWVudGF0aW9uID0gbmV3T3JpZW50YXRpb247XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuXG4gICAgZ2V0U2hpcEluZGV4OiBmdW5jdGlvbiAoY29vcmRpbmF0ZXMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5zaGlwc1tpXS5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwpIHtcbiAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgbGV0IGogPSB0aGlzLnNoaXBzW2ldLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgICAgICAgaiA8PSB0aGlzLnNoaXBzW2ldLmNvb3JkaW5hdGVzWzBdICsgdGhpcy5zaGlwc1tpXS5sZW5ndGggLSAxO1xuICAgICAgICAgICAgaisrXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGNvb3JkaW5hdGVzWzBdID09PSBqICYmXG4gICAgICAgICAgICAgIGNvb3JkaW5hdGVzWzFdID09PSB0aGlzLnNoaXBzW2ldLmNvb3JkaW5hdGVzWzFdXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2hpcHNbaV0ub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICBsZXQgaiA9IHRoaXMuc2hpcHNbaV0uY29vcmRpbmF0ZXNbMV07XG4gICAgICAgICAgICBqIDw9IHRoaXMuc2hpcHNbaV0uY29vcmRpbmF0ZXNbMV0gKyB0aGlzLnNoaXBzW2ldLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBqKytcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgY29vcmRpbmF0ZXNbMF0gPT09IHRoaXMuc2hpcHNbaV0uY29vcmRpbmF0ZXNbMF0gJiZcbiAgICAgICAgICAgICAgY29vcmRpbmF0ZXNbMV0gPT09IGpcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgTm8gc2hpcCBmb3VuZCBhdCBnaXZlbiBpbmRleDogWyR7Y29vcmRpbmF0ZXNbMF19LCAke2Nvb3JkaW5hdGVzWzFdfV1gLFxuICAgICAgKTtcbiAgICB9LFxuXG4gICAgcmVjZWl2ZUF0dGFjazogZnVuY3Rpb24gKGNvb3JkaW5hdGVzKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGNvb3JkaW5hdGVzWzBdIDwgMCB8fFxuICAgICAgICBjb29yZGluYXRlc1sxXSA8IDAgfHxcbiAgICAgICAgY29vcmRpbmF0ZXNbMF0gPj0gc2l6ZSB8fFxuICAgICAgICBjb29yZGluYXRlc1sxXSA+PSBzaXplXG4gICAgICApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGF0dGFjayBvdXRzaWRlIHRoZSBib2FyZFwiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICB0aGlzLmNlbGxzW2Nvb3JkaW5hdGVzWzFdXVtjb29yZGluYXRlc1swXV0gIT09IENlbGxTdGF0ZS5FTVBUWSAmJlxuICAgICAgICB0aGlzLmNlbGxzW2Nvb3JkaW5hdGVzWzFdXVtjb29yZGluYXRlc1swXV0gIT09IENlbGxTdGF0ZS5TSElQXG4gICAgICApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2VsbCBoYXMgYWxyZWFkeSBiZWVuIGF0dGFja2VkXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5jZWxsc1tjb29yZGluYXRlc1sxXV1bY29vcmRpbmF0ZXNbMF1dICE9PSBDZWxsU3RhdGUuU0hJUCkge1xuICAgICAgICB0aGlzLmNlbGxzW2Nvb3JkaW5hdGVzWzFdXVtjb29yZGluYXRlc1swXV0gPSBDZWxsU3RhdGUuTUlTUztcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGNvbnN0IHNoaXAgb2YgdGhpcy5zaGlwcykge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMICYmXG4gICAgICAgICAgICBjb29yZGluYXRlc1sxXSA9PT0gc2hpcC5jb29yZGluYXRlc1sxXSAmJlxuICAgICAgICAgICAgY29vcmRpbmF0ZXNbMF0gPj0gc2hpcC5jb29yZGluYXRlc1swXSAmJlxuICAgICAgICAgICAgY29vcmRpbmF0ZXNbMF0gPD0gc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMSkgfHxcbiAgICAgICAgICAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMICYmXG4gICAgICAgICAgICBjb29yZGluYXRlc1swXSA9PT0gc2hpcC5jb29yZGluYXRlc1swXSAmJlxuICAgICAgICAgICAgY29vcmRpbmF0ZXNbMV0gPj0gc2hpcC5jb29yZGluYXRlc1sxXSAmJlxuICAgICAgICAgICAgY29vcmRpbmF0ZXNbMV0gPD0gc2hpcC5jb29yZGluYXRlc1sxXSArIHNoaXAubGVuZ3RoIC0gMSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgc2hpcC5oaXQoKTtcblxuICAgICAgICAgIGlmIChzaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgICBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwpIHtcbiAgICAgICAgICAgICAgZm9yIChcbiAgICAgICAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMF07XG4gICAgICAgICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgIGkrK1xuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW3NoaXAuY29vcmRpbmF0ZXNbMV1dW2ldID0gQ2VsbFN0YXRlLlNVTks7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMKSB7XG4gICAgICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzFdO1xuICAgICAgICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1sxXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICBpKytcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jZWxsc1tpXVtzaGlwLmNvb3JkaW5hdGVzWzBdXSA9IENlbGxTdGF0ZS5TVU5LO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2VsbHNbY29vcmRpbmF0ZXNbMV1dW2Nvb3JkaW5hdGVzWzBdXSA9IENlbGxTdGF0ZS5ISVQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgaXNGbGVldERlc3Ryb3llZDogZnVuY3Rpb24gKCkge1xuICAgICAgZm9yIChjb25zdCBzaGlwIG9mIHRoaXMuc2hpcHMpIHtcbiAgICAgICAgaWYgKCFzaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gIH07XG59XG4iLCJpbXBvcnQgeyBjcmVhdGVHYW1lQm9hcmQgfSBmcm9tIFwiLi9nYW1lQm9hcmQuanNcIjtcblxuZXhwb3J0IGNvbnN0IFBsYXllclR5cGUgPSBPYmplY3QuZnJlZXplKHtcbiAgSFVNQU46IFwiSFVNQU5cIixcbiAgQ09NUFVURVI6IFwiQ09NUFVURVJcIixcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUGxheWVyKG5hbWUsIHR5cGUsIGJvYXJkU2l6ZSkge1xuICByZXR1cm4ge1xuICAgIG5hbWUsXG4gICAgdHlwZSxcbiAgICBib2FyZDogY3JlYXRlR2FtZUJvYXJkKGJvYXJkU2l6ZSksXG4gIH07XG59XG4iLCJleHBvcnQgY29uc3QgU2hpcE9yaWVudGF0aW9uID0gT2JqZWN0LmZyZWV6ZSh7XG4gIEhPUklaT05UQUw6IFwiSE9SSVpPTlRBTFwiLFxuICBWRVJUSUNBTDogXCJWRVJUSUNBTFwiLFxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTaGlwKFxuICBsZW5ndGgsXG4gIGNvb3JkaW5hdGVzID0gW3VuZGVmaW5lZCwgdW5kZWZpbmVkXSxcbiAgb3JpZW50YXRpb24gPSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCxcbikge1xuICBpZiAobGVuZ3RoIDwgMSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgcmV0dXJuIHtcbiAgICBsZW5ndGgsXG4gICAgY29vcmRpbmF0ZXMsXG4gICAgb3JpZW50YXRpb24sXG4gICAgaGl0czogMCxcblxuICAgIGhpdDogZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRoaXMuaGl0cyA8IHRoaXMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuaGl0cysrO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBpc1N1bms6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmhpdHMgPT09IHRoaXMubGVuZ3RoO1xuICAgIH0sXG4gIH07XG59XG4iLCJpbXBvcnQgeyBDZWxsU3RhdGUgfSBmcm9tIFwiLi4vY29yZS9nYW1lQm9hcmQuanNcIjtcbmltcG9ydCB7IFBsYXllclR5cGUgfSBmcm9tIFwiLi4vY29yZS9wbGF5ZXIuanNcIjtcbmltcG9ydCB7IFNoaXBPcmllbnRhdGlvbiB9IGZyb20gXCIuLi9jb3JlL3NoaXAuanNcIjtcblxuaW1wb3J0IHJlZnJlc2hTdmcgZnJvbSBcIi4uLy4uL2Fzc2V0cy9yZWZyZXNoLWNjdy5zdmdcIjtcbmltcG9ydCBlZGl0U3ZnIGZyb20gXCIuLi8uLi9hc3NldHMvZWRpdC5zdmdcIjtcbmltcG9ydCBzYXZlU3ZnIGZyb20gXCIuLi8uLi9hc3NldHMvc2F2ZS5zdmdcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwR2FtZUJvYXJkcyhnYW1lLCBwbGF5ZXJPbmUsIHBsYXllclR3bykge1xuICBjb25zdCBib2FyZE9uZSA9IGNyZWF0ZUJvYXJkQ29tcG9uZW50KFxuICAgIHBsYXllck9uZS5ib2FyZCxcbiAgICBwbGF5ZXJPbmUsXG4gICAgcGxheWVyVHdvLnR5cGUgIT09IFBsYXllclR5cGUuQ09NUFVURVIsXG4gICAgcGxheWVyT25lLnR5cGUgPT09IFBsYXllclR5cGUuSFVNQU4sXG4gICk7XG4gIGJvYXJkT25lLnJhbmRvbWl6ZUZvcm1hdGlvbigpO1xuXG4gIGJvYXJkT25lLmNvbXBvbmVudC5jbGFzc0xpc3QuYWRkKFxuICAgIFwicGxheWVyLW9uZVwiLFxuICAgIHBsYXllck9uZS50eXBlID09PSBQbGF5ZXJUeXBlLkhVTUFOID8gXCJodW1hblwiIDogXCJjb21wdXRlclwiLFxuICApO1xuICBpZiAocGxheWVyVHdvLnR5cGUgPT09IFBsYXllclR5cGUuQ09NUFVURVIpIHtcbiAgICBib2FyZE9uZS5jb21wb25lbnQuY2xhc3NMaXN0LmFkZChcIm9ubHktaHVtYW5cIik7XG4gIH1cbiAgYm9hcmRPbmUuY29tcG9uZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBib2FyZE9uZS5jbGVhcigpLCB0cnVlKTtcblxuICBjb25zdCBib2FyZFR3byA9IGNyZWF0ZUJvYXJkQ29tcG9uZW50KFxuICAgIHBsYXllclR3by5ib2FyZCxcbiAgICBwbGF5ZXJUd28sXG4gICAgcGxheWVyT25lLnR5cGUgIT09IFBsYXllclR5cGUuQ09NUFVURVIsXG4gICAgcGxheWVyVHdvLnR5cGUgPT09IFBsYXllclR5cGUuSFVNQU4sXG4gICk7XG4gIGJvYXJkVHdvLnJhbmRvbWl6ZUZvcm1hdGlvbigpO1xuXG4gIGJvYXJkVHdvLmNvbXBvbmVudC5jbGFzc0xpc3QuYWRkKFxuICAgIFwicGxheWVyLXR3b1wiLFxuICAgIHBsYXllclR3by50eXBlID09PSBQbGF5ZXJUeXBlLkhVTUFOID8gXCJodW1hblwiIDogXCJjb21wdXRlclwiLFxuICApO1xuXG4gIGZvciAoY29uc3QgRE9NQm9hcmQgb2YgW2JvYXJkT25lLCBib2FyZFR3b10pIHtcbiAgICBBcnJheS5mcm9tKERPTUJvYXJkLmNvbXBvbmVudC5jaGlsZHJlblsxXS5jaGlsZHJlbikuZm9yRWFjaCgocm93LCBpKSA9PiB7XG4gICAgICBBcnJheS5mcm9tKHJvdy5jaGlsZHJlbikuZm9yRWFjaCgoY2VsbCwgaikgPT4ge1xuICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgRE9NQm9hcmQuZWRpdGluZyAmJlxuICAgICAgICAgICAgRE9NQm9hcmQuaXNNdXRhYmxlKCkgJiZcbiAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hpcFwiKSAmJlxuICAgICAgICAgICAgIWdhbWUuaXNJblByb2dyZXNzXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBET01Cb2FyZC50b2dnbGVTaGlwTW90aW9uKFtqLCBpXSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIERPTUJvYXJkLmlzQXR0YWNrYWJsZSgpICYmXG4gICAgICAgICAgICBET01Cb2FyZC5hY3RpdmUgJiZcbiAgICAgICAgICAgIGdhbWUuaXNJblByb2dyZXNzICYmXG4gICAgICAgICAgICAhZ2FtZS5pc0dhbWVPdmVyICYmXG4gICAgICAgICAgICBnYW1lLmlzUGxheWVyV2FpdGluZ1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgaWYgKERPTUJvYXJkLnJlY2VpdmVBdHRhY2soW2osIGldKSkge1xuICAgICAgICAgICAgICBnYW1lLmlzUGxheWVyV2FpdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiY29udGV4dG1lbnVcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIURPTUJvYXJkLmVkaXRpbmcgfHxcbiAgICAgICAgICAgICFET01Cb2FyZC5pc011dGFibGUoKSB8fFxuICAgICAgICAgICAgZ2FtZS5pc0luUHJvZ3Jlc3MgfHxcbiAgICAgICAgICAgICFjZWxsLmNsYXNzTGlzdC5jb250YWlucyhcInNoaXBcIilcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBzaGlwSW5kZXggPSBET01Cb2FyZC5ib2FyZC5nZXRTaGlwSW5kZXgoW2osIGldKTtcbiAgICAgICAgICBjb25zdCBzaGlwID0gRE9NQm9hcmQuYm9hcmQuc2hpcHNbc2hpcEluZGV4XTtcblxuICAgICAgICAgIGlmICghY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb3ZpbmdcIikpIHtcbiAgICAgICAgICAgIERPTUJvYXJkLnRvZ2dsZVNoaXBNb3Rpb24oc2hpcC5jb29yZGluYXRlcyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKERPTUJvYXJkLmJvYXJkLnJvdGF0ZVNoaXAoc2hpcEluZGV4KSkge1xuICAgICAgICAgICAgRE9NQm9hcmQuY2xlYXIoKTtcbiAgICAgICAgICAgIERPTUJvYXJkLnRvZ2dsZVNoaXBNb3Rpb24oc2hpcC5jb29yZGluYXRlcyk7XG4gICAgICAgICAgICBET01Cb2FyZC5yZW5kZXIoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGV2ZW50KSA9PiB7XG4gICAgaWYgKGJvYXJkT25lLmVkaXRpbmcpIGJvYXJkT25lLm1vdmVTaGlwKGV2ZW50LmtleSk7XG4gICAgZWxzZSBpZiAoYm9hcmRUd28uZWRpdGluZykgYm9hcmRUd28ubW92ZVNoaXAoZXZlbnQua2V5KTtcbiAgfSk7XG5cbiAgcmV0dXJuIFtib2FyZE9uZSwgYm9hcmRUd29dO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQm9hcmRDb21wb25lbnQoYm9hcmQsIHBsYXllciwgYXR0YWNrYWJsZSwgbXV0YWJsZSkge1xuICBjb25zdCBib2FyZENvbXBvbmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGJvYXJkQ29tcG9uZW50LmNsYXNzTGlzdC5hZGQoXCJib2FyZFwiKTtcblxuICBjb25zdCBib2FyZEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpO1xuICBib2FyZEhlYWRlci5jbGFzc0xpc3QuYWRkKFwiYm9hcmQtaGVhZGVyXCIpO1xuICBib2FyZEhlYWRlci5pbm5lckhUTUwgPSBgXG4gICAgPHAgY2xhc3M9XCJwbGF5ZXItbmFtZVwiPiR7cGxheWVyLm5hbWV9PC9wPlxuICAgIDxpbnB1dCBjbGFzcz1cInBsYXllci1uYW1lLWlucHV0IGhpZGRlblwiIHR5cGU9XCJ0ZXh0XCIgcmVxdWlyZWQgdmFsdWU9XCIke3BsYXllci5uYW1lfVwiIC8+XG4gIGA7XG4gIGJvYXJkQ29tcG9uZW50LmFwcGVuZENoaWxkKGJvYXJkSGVhZGVyKTtcblxuICBsZXQgcmFuZG9taXplQnV0dG9uLCBlZGl0QnV0dG9uLCBzYXZlQnV0dG9uO1xuICBpZiAocGxheWVyLnR5cGUgPT09IFBsYXllclR5cGUuSFVNQU4pIHtcbiAgICByYW5kb21pemVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIHJhbmRvbWl6ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwicmFuZG9taXplLWJvYXJkXCIpO1xuICAgIHJhbmRvbWl6ZUJ1dHRvbi50eXBlID0gXCJidXR0b25cIjtcbiAgICBjb25zdCByZWZyZXNoSWNvbiA9IG5ldyBJbWFnZSgpO1xuICAgIHJlZnJlc2hJY29uLnNyYyA9IHJlZnJlc2hTdmc7XG4gICAgcmFuZG9taXplQnV0dG9uLmFwcGVuZENoaWxkKHJlZnJlc2hJY29uKTtcblxuICAgIGVkaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGVkaXRCdXR0b24uY2xhc3NMaXN0LmFkZChcImVkaXQtYm9hcmRcIik7XG4gICAgZWRpdEJ1dHRvbi50eXBlID0gXCJidXR0b25cIjtcbiAgICBjb25zdCBlZGl0SWNvbiA9IG5ldyBJbWFnZSgpO1xuICAgIGVkaXRJY29uLnNyYyA9IGVkaXRTdmc7XG4gICAgZWRpdEJ1dHRvbi5hcHBlbmRDaGlsZChlZGl0SWNvbik7XG5cbiAgICBzYXZlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBzYXZlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJzYXZlLWJvYXJkXCIsIFwiaGlkZGVuXCIpO1xuICAgIHNhdmVCdXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XG4gICAgY29uc3Qgc2F2ZUljb24gPSBuZXcgSW1hZ2UoKTtcbiAgICBzYXZlSWNvbi5zcmMgPSBzYXZlU3ZnO1xuICAgIHNhdmVCdXR0b24uYXBwZW5kQ2hpbGQoc2F2ZUljb24pO1xuXG4gICAgY29uc3QgYm9hcmRDb250cm9scyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgYm9hcmRDb250cm9scy5jbGFzc0xpc3QuYWRkKFwiYm9hcmQtY29udHJvbHNcIik7XG4gICAgYm9hcmRDb250cm9scy5hcHBlbmRDaGlsZChyYW5kb21pemVCdXR0b24pO1xuICAgIGJvYXJkQ29udHJvbHMuYXBwZW5kQ2hpbGQoZWRpdEJ1dHRvbik7XG4gICAgYm9hcmRDb250cm9scy5hcHBlbmRDaGlsZChzYXZlQnV0dG9uKTtcbiAgICBib2FyZEhlYWRlci5hcHBlbmRDaGlsZChib2FyZENvbnRyb2xzKTtcbiAgfVxuXG4gIGNvbnN0IGJvYXJkQ2VsbHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBib2FyZENlbGxzLmNsYXNzTGlzdC5hZGQoXCJib2FyZC1jZWxsc1wiKTtcbiAgYm9hcmRDb21wb25lbnQuYXBwZW5kQ2hpbGQoYm9hcmRDZWxscyk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBib2FyZC5jZWxscy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHJvd0NvbXBvbmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcm93Q29tcG9uZW50LmNsYXNzTGlzdC5hZGQoXCJyb3dcIik7XG5cbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGJvYXJkLmNlbGxzW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICBjb25zdCBjZWxsQ29tcG9uZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIGNlbGxDb21wb25lbnQuY2xhc3NMaXN0LmFkZChcImNlbGxcIik7XG4gICAgICBjZWxsQ29tcG9uZW50LmNsYXNzTGlzdC5hZGQoZ2V0Q2VsbENsYXNzTmFtZShbaiwgaV0sIGJvYXJkKSk7XG4gICAgICByb3dDb21wb25lbnQuYXBwZW5kQ2hpbGQoY2VsbENvbXBvbmVudCk7XG4gICAgfVxuXG4gICAgYm9hcmRDZWxscy5hcHBlbmRDaGlsZChyb3dDb21wb25lbnQpO1xuICB9XG5cbiAgY29uc3QgRE9NQm9hcmQgPSB7XG4gICAgY29tcG9uZW50OiBib2FyZENvbXBvbmVudCxcbiAgICBib2FyZDogYm9hcmQsXG4gICAgYWN0aXZlOiBmYWxzZSxcbiAgICBlZGl0aW5nOiBmYWxzZSxcblxuICAgIGlzQXR0YWNrYWJsZTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGF0dGFja2FibGU7XG4gICAgfSxcblxuICAgIGlzTXV0YWJsZTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG11dGFibGU7XG4gICAgfSxcblxuICAgIGNsZWFyOiBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBtb3ZpbmdDZWxscyA9XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmNoaWxkcmVuWzFdLnF1ZXJ5U2VsZWN0b3JBbGwoXCIubW92aW5nXCIpO1xuICAgICAgaWYgKG1vdmluZ0NlbGxzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgZm9yIChjb25zdCBjZWxsIG9mIG1vdmluZ0NlbGxzKSB7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZShcIm1vdmluZ1wiKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICBBcnJheS5mcm9tKHRoaXMuY29tcG9uZW50LmNoaWxkcmVuWzFdLmNoaWxkcmVuKS5mb3JFYWNoKChyb3csIGkpID0+IHtcbiAgICAgICAgQXJyYXkuZnJvbShyb3cuY2hpbGRyZW4pLmZvckVhY2goKGNlbGwsIGopID0+IHtcbiAgICAgICAgICBjb25zdCBpc01vdmluZyA9IGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKFwibW92aW5nXCIpO1xuXG4gICAgICAgICAgY2VsbC5jbGFzc05hbWUgPSBcImNlbGxcIjtcbiAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoZ2V0Q2VsbENsYXNzTmFtZShbaiwgaV0sIHRoaXMuYm9hcmQpKTtcbiAgICAgICAgICBpZiAoaXNNb3ZpbmcpIGNlbGwuY2xhc3NMaXN0LmFkZChcIm1vdmluZ1wiKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgcmFuZG9taXplRm9ybWF0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBzaGlwcyA9IFs1LCA0LCAzLCAzLCAyXTtcblxuICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgdGhpcy5ib2FyZC5yZXNldCgpO1xuXG4gICAgICBmb3IgKGNvbnN0IHNoaXAgb2Ygc2hpcHMpIHtcbiAgICAgICAgbGV0IHBsYWNlZCA9IGZhbHNlO1xuICAgICAgICB3aGlsZSAoIXBsYWNlZCkge1xuICAgICAgICAgIGNvbnN0IG9yaWVudGF0aW9uID1cbiAgICAgICAgICAgIE1hdGgucmFuZG9tKCkgPiAwLjVcbiAgICAgICAgICAgICAgPyBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTFxuICAgICAgICAgICAgICA6IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTDtcblxuICAgICAgICAgIGNvbnN0IHggPSBNYXRoLmZsb29yKFxuICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqXG4gICAgICAgICAgICAgICgxMCAtIChvcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwgPyBzaGlwIDogMCkpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgY29uc3QgeSA9IE1hdGguZmxvb3IoXG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpICpcbiAgICAgICAgICAgICAgKDEwIC0gKG9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwgPyBzaGlwIDogMCkpLFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBwbGFjZWQgPSB0aGlzLmJvYXJkLnBsYWNlU2hpcChbeCwgeV0sIHNoaXAsIG9yaWVudGF0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH0sXG5cbiAgICB0b2dnbGVTaGlwTW90aW9uOiBmdW5jdGlvbiAoY29vcmRpbmF0ZXMpIHtcbiAgICAgIGNvbnN0IGNlbGwgPVxuICAgICAgICB0aGlzLmNvbXBvbmVudC5jaGlsZHJlblsxXS5jaGlsZHJlbltjb29yZGluYXRlc1sxXV0uY2hpbGRyZW5bXG4gICAgICAgICAgY29vcmRpbmF0ZXNbMF1cbiAgICAgICAgXTtcblxuICAgICAgaWYgKCFjZWxsLmNsYXNzTGlzdC5jb250YWlucyhcInNoaXBcIikpIHJldHVybjtcblxuICAgICAgY29uc3Qgc2hpcEluZGV4ID0gdGhpcy5ib2FyZC5nZXRTaGlwSW5kZXgoY29vcmRpbmF0ZXMpO1xuICAgICAgbGV0IHNoaXAgPSB0aGlzLmJvYXJkLnNoaXBzW3NoaXBJbmRleF07XG5cbiAgICAgIHN3aXRjaCAoc2hpcC5vcmllbnRhdGlvbikge1xuICAgICAgICBjYXNlIFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMOlxuICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMF07XG4gICAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMF0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBpKytcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmNoaWxkcmVuWzFdLmNoaWxkcmVuW3NoaXAuY29vcmRpbmF0ZXNbMV1dLmNoaWxkcmVuW1xuICAgICAgICAgICAgICBpXG4gICAgICAgICAgICBdLmNsYXNzTGlzdC50b2dnbGUoXCJtb3ZpbmdcIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTDpcbiAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzFdO1xuICAgICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgICAgaSsrXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5jaGlsZHJlblsxXS5jaGlsZHJlbltpXS5jaGlsZHJlbltcbiAgICAgICAgICAgICAgc2hpcC5jb29yZGluYXRlc1swXVxuICAgICAgICAgICAgXS5jbGFzc0xpc3QudG9nZ2xlKFwibW92aW5nXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgbW92ZVNoaXA6IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGNvbnN0IG1vdmluZ1NoaXBDZWxsID1cbiAgICAgICAgdGhpcy5jb21wb25lbnQuY2hpbGRyZW5bMV0ucXVlcnlTZWxlY3RvcihcIi5tb3ZpbmdcIik7XG5cbiAgICAgIGlmICghbW92aW5nU2hpcENlbGwpIHJldHVybjtcblxuICAgICAgY29uc3QgbW92aW5nU2hpcENvb3JkaW5hdGVzID0gZ2V0Q2VsbEluZGV4KG1vdmluZ1NoaXBDZWxsKTtcbiAgICAgIGNvbnN0IG1vdmluZ1NoaXBJbmRleCA9IHRoaXMuYm9hcmQuZ2V0U2hpcEluZGV4KG1vdmluZ1NoaXBDb29yZGluYXRlcyk7XG5cbiAgICAgIHRoaXMudG9nZ2xlU2hpcE1vdGlvbihtb3ZpbmdTaGlwQ29vcmRpbmF0ZXMpO1xuXG4gICAgICBsZXQgbW92ZVN1Y2Nlc3NmdWwgPSBmYWxzZTtcbiAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgIGNhc2UgXCJBcnJvd1VwXCI6XG4gICAgICAgICAgaWYgKG1vdmluZ1NoaXBDb29yZGluYXRlc1sxXSA8PSAwKSBicmVhaztcbiAgICAgICAgICBtb3ZlU3VjY2Vzc2Z1bCA9IHRoaXMuYm9hcmQubW92ZVNoaXAobW92aW5nU2hpcEluZGV4LCBbXG4gICAgICAgICAgICBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMF0sXG4gICAgICAgICAgICBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMV0gLSAxLFxuICAgICAgICAgIF0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dMZWZ0XCI6XG4gICAgICAgICAgaWYgKG1vdmluZ1NoaXBDb29yZGluYXRlc1swXSA8PSAwKSBicmVhaztcbiAgICAgICAgICBtb3ZlU3VjY2Vzc2Z1bCA9IHRoaXMuYm9hcmQubW92ZVNoaXAobW92aW5nU2hpcEluZGV4LCBbXG4gICAgICAgICAgICBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMF0gLSAxLFxuICAgICAgICAgICAgbW92aW5nU2hpcENvb3JkaW5hdGVzWzFdLFxuICAgICAgICAgIF0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dEb3duXCI6XG4gICAgICAgICAgaWYgKG1vdmluZ1NoaXBDb29yZGluYXRlc1sxXSA+PSB0aGlzLmJvYXJkLnNpemUgLSAxKSBicmVhaztcbiAgICAgICAgICBtb3ZlU3VjY2Vzc2Z1bCA9IHRoaXMuYm9hcmQubW92ZVNoaXAobW92aW5nU2hpcEluZGV4LCBbXG4gICAgICAgICAgICBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMF0sXG4gICAgICAgICAgICBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMV0gKyAxLFxuICAgICAgICAgIF0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dSaWdodFwiOlxuICAgICAgICAgIGlmIChtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMF0gPj0gdGhpcy5ib2FyZC5zaXplIC0gMSkgYnJlYWs7XG4gICAgICAgICAgbW92ZVN1Y2Nlc3NmdWwgPSB0aGlzLmJvYXJkLm1vdmVTaGlwKG1vdmluZ1NoaXBJbmRleCwgW1xuICAgICAgICAgICAgbW92aW5nU2hpcENvb3JkaW5hdGVzWzBdICsgMSxcbiAgICAgICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlc1sxXSxcbiAgICAgICAgICBdKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgaWYgKCFtb3ZlU3VjY2Vzc2Z1bCkge1xuICAgICAgICB0aGlzLnRvZ2dsZVNoaXBNb3Rpb24obW92aW5nU2hpcENvb3JkaW5hdGVzKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnJlbmRlcigpO1xuXG4gICAgICBjb25zdCBtb3ZlZFNoaXAgPSB0aGlzLmJvYXJkLnNoaXBzW21vdmluZ1NoaXBJbmRleF07XG4gICAgICB0aGlzLnRvZ2dsZVNoaXBNb3Rpb24obW92ZWRTaGlwLmNvb3JkaW5hdGVzKTtcblxuICAgICAgY29uc29sZS5sb2coXCJkb2luZyBzb21ldGhpbmc/XCIpO1xuICAgIH0sXG5cbiAgICByZWNlaXZlQXR0YWNrOiBmdW5jdGlvbiAoY29vcmRpbmF0ZXMpIHtcbiAgICAgIGNvbnN0IGNlbGwgPSBib2FyZC5jZWxsc1tjb29yZGluYXRlc1sxXV1bY29vcmRpbmF0ZXNbMF1dO1xuICAgICAgaWYgKGNlbGwgIT09IENlbGxTdGF0ZS5FTVBUWSAmJiBjZWxsICE9PSBDZWxsU3RhdGUuU0hJUCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpO1xuICAgICAgdGhpcy5yZW5kZXIoKTtcblxuICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIGNvbXB1dGVyQXR0YWNrOiBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgeCwgeTtcblxuICAgICAgbGV0IHZhbGlkID0gZmFsc2U7XG4gICAgICB3aGlsZSAoIXZhbGlkKSB7XG4gICAgICAgIHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBib2FyZC5zaXplKTtcbiAgICAgICAgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGJvYXJkLnNpemUpO1xuXG4gICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmNvbXBvbmVudC5jaGlsZHJlblsxXS5jaGlsZHJlblt5XS5jaGlsZHJlblt4XTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZW1wdHlcIikgfHxcbiAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5jb250YWlucyhcInNoaXBcIilcbiAgICAgICAgKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHIpID0+IHNldFRpbWVvdXQociwgNTAwKSk7XG5cbiAgICAgIHRoaXMuYm9hcmQucmVjZWl2ZUF0dGFjayhbeCwgeV0pO1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9LFxuICB9O1xuXG4gIGZ1bmN0aW9uIHNhdmVFZGl0cygpIHtcbiAgICBpZiAoIURPTUJvYXJkLmNvbXBvbmVudC5jaGlsZHJlblswXS5yZXBvcnRWYWxpZGl0eSgpKSByZXR1cm47XG4gICAgYm9hcmRIZWFkZXIucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItbmFtZVwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgIGJvYXJkSGVhZGVyLnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLW5hbWUtaW5wdXRcIikuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICBib2FyZEhlYWRlci5xdWVyeVNlbGVjdG9yKFwiLmVkaXQtYm9hcmRcIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICBzYXZlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG5cbiAgICBET01Cb2FyZC5lZGl0aW5nID0gZmFsc2U7XG4gICAgRE9NQm9hcmQuY29tcG9uZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJlZGl0aW5nXCIpO1xuICAgIERPTUJvYXJkLmNsZWFyKCk7XG4gIH1cblxuICBpZiAocGxheWVyLnR5cGUgPT09IFBsYXllclR5cGUuSFVNQU4pIHtcbiAgICByYW5kb21pemVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIERPTUJvYXJkLnJhbmRvbWl6ZUZvcm1hdGlvbigpO1xuICAgIH0pO1xuXG4gICAgZWRpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZWRpdGluZ1wiKSkgcmV0dXJuO1xuXG4gICAgICBjb25zdCBib2FyZEhlYWRlciA9IERPTUJvYXJkLmNvbXBvbmVudC5jaGlsZHJlblswXTtcblxuICAgICAgYm9hcmRIZWFkZXIucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItbmFtZVwiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgYm9hcmRIZWFkZXJcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLW5hbWUtaW5wdXRcIilcbiAgICAgICAgLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICBlZGl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICBib2FyZEhlYWRlci5xdWVyeVNlbGVjdG9yKFwiLnNhdmUtYm9hcmRcIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcblxuICAgICAgRE9NQm9hcmQuZWRpdGluZyA9IHRydWU7XG4gICAgICBET01Cb2FyZC5jb21wb25lbnQuY2xhc3NMaXN0LmFkZChcImVkaXRpbmdcIik7XG4gICAgfSk7XG5cbiAgICBib2FyZEhlYWRlclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLW5hbWUtaW5wdXRcIilcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChldmVudCkgPT4ge1xuICAgICAgICBwbGF5ZXIubmFtZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgYm9hcmRIZWFkZXIucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItbmFtZVwiKS50ZXh0Q29udGVudCA9IHBsYXllci5uYW1lO1xuICAgICAgfSk7XG5cbiAgICBzYXZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzYXZlRWRpdHMpO1xuXG4gICAgYm9hcmRIZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBzYXZlRWRpdHMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBET01Cb2FyZDtcbn1cblxuZnVuY3Rpb24gZ2V0Q2VsbEluZGV4KGNlbGwpIHtcbiAgcmV0dXJuIFtcbiAgICBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGNlbGwucGFyZW50Tm9kZS5jaGlsZHJlbiwgY2VsbCksXG4gICAgQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChcbiAgICAgIGNlbGwucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNoaWxkcmVuLFxuICAgICAgY2VsbC5wYXJlbnROb2RlLFxuICAgICksXG4gIF07XG59XG5cbmZ1bmN0aW9uIGdldENlbGxDbGFzc05hbWUoY29vcmRpbmF0ZXMsIGJvYXJkLCBzZWNyZXQgPSBmYWxzZSkge1xuICBjb25zdCBjZWxsID0gYm9hcmQuY2VsbHNbY29vcmRpbmF0ZXNbMV1dW2Nvb3JkaW5hdGVzWzBdXTtcbiAgc3dpdGNoIChjZWxsKSB7XG4gICAgY2FzZSBDZWxsU3RhdGUuRU1QVFk6XG4gICAgICByZXR1cm4gXCJlbXB0eVwiO1xuICAgIGNhc2UgQ2VsbFN0YXRlLk1JU1M6XG4gICAgICByZXR1cm4gXCJtaXNzXCI7XG4gICAgY2FzZSBDZWxsU3RhdGUuU0hJUDpcbiAgICAgIHJldHVybiBzZWNyZXQgPyBcImVtcHR5XCIgOiBcInNoaXBcIjtcbiAgICBjYXNlIENlbGxTdGF0ZS5ISVQ6XG4gICAgICByZXR1cm4gXCJoaXRcIjtcbiAgICBjYXNlIENlbGxTdGF0ZS5TVU5LOlxuICAgICAgcmV0dXJuIFwic3Vua1wiO1xuICB9XG59XG4iLCJpbXBvcnQgeyBjcmVhdGVQbGF5ZXIsIFBsYXllclR5cGUgfSBmcm9tIFwiLi4vY29yZS9wbGF5ZXIuanNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwQ29udHJvbHMoZ2FtZSkge1xuICBjb25zdCBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RhcnRcIik7XG4gIHN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2F2ZS1ib2FyZDpub3QoLmhpZGRlbilcIikpIHJldHVybjtcblxuICAgIGF3YWl0IGdhbWUuc3RhcnQoKTtcbiAgfSk7XG5cbiAgY29uc3QgcmVzZXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRyb2xzIC5yZXNldFwiKTtcbiAgcmVzZXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGdhbWUucmVzZXQoKSk7XG5cbiAgY29uc3QgY29tcHV0ZXJPcHBvbmVudEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3Bwb25lbnQtY29tcHV0ZXJcIik7XG4gIGNvbnN0IGZyaWVuZE9wcG9uZW50QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vcHBvbmVudC1mcmllbmRcIik7XG4gIGNvbnN0IHNsaWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2xpZGVyXCIpO1xuXG4gIGNvbXB1dGVyT3Bwb25lbnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBpZiAoIXNsaWRlci5jbGFzc0xpc3QuY29udGFpbnMoXCJzbGlkZXItcmlnaHRcIikpIHJldHVybjtcblxuICAgIHNsaWRlci5jbGFzc0xpc3QucmVtb3ZlKFwic2xpZGVyLXJpZ2h0XCIpO1xuICAgIGdhbWUuY2hhbmdlTW9kZShcbiAgICAgIGNyZWF0ZVBsYXllcihcIlBsYXllclwiLCBQbGF5ZXJUeXBlLkhVTUFOLCAxMCksXG4gICAgICBjcmVhdGVQbGF5ZXIoXCJDb21wdXRlclwiLCBQbGF5ZXJUeXBlLkNPTVBVVEVSLCAxMCksXG4gICAgKTtcbiAgfSk7XG4gIGZyaWVuZE9wcG9uZW50QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgaWYgKHNsaWRlci5jbGFzc0xpc3QuY29udGFpbnMoXCJzbGlkZXItcmlnaHRcIikpIHJldHVybjtcblxuICAgIHNsaWRlci5jbGFzc0xpc3QuYWRkKFwic2xpZGVyLXJpZ2h0XCIpO1xuICAgIGdhbWUuY2hhbmdlTW9kZShcbiAgICAgIGNyZWF0ZVBsYXllcihcIlBsYXllciAxXCIsIFBsYXllclR5cGUuSFVNQU4sIDEwKSxcbiAgICAgIGNyZWF0ZVBsYXllcihcIlBsYXllciAyXCIsIFBsYXllclR5cGUuSFVNQU4sIDEwKSxcbiAgICApO1xuICB9KTtcbn1cbiIsImltcG9ydCB7IFBsYXllclR5cGUgfSBmcm9tIFwiLi4vY29yZS9wbGF5ZXIuanNcIjtcbmltcG9ydCB7IHNldHVwR2FtZUJvYXJkcyB9IGZyb20gXCIuL2JvYXJkcy5qc1wiO1xuXG5jb25zdCBHYW1lTW9kZSA9IE9iamVjdC5mcmVlemUoe1xuICBDT01QVVRFUjogXCJjb21wdXRlclwiLFxuICBGUklFTkQ6IFwiZnJpZW5kXCIsXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwR2FtZShwbGF5ZXJPbmUsIHBsYXllclR3bykge1xuICBjb25zdCBnYW1lID0ge1xuICAgIG1vZGU6IEdhbWVNb2RlLkNPTVBVVEVSLFxuXG4gICAgcGxheWVyczogW3BsYXllck9uZSwgcGxheWVyVHdvXSxcbiAgICBjdXJyZW50UGxheWVySW5kZXg6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpLFxuXG4gICAgaXNJblByb2dyZXNzOiBmYWxzZSxcbiAgICBpc0dhbWVPdmVyOiBmYWxzZSxcbiAgICBpc1BsYXllcldhaXRpbmc6IGZhbHNlLFxuXG4gICAgYm9hcmRzOiBbXSxcblxuICAgIHN0YXJ0OiBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmlzSW5Qcm9ncmVzcyA9IHRydWU7XG4gICAgICB0aGlzLmlzR2FtZU92ZXIgPSBmYWxzZTtcbiAgICAgIHRoaXMuaXNQbGF5ZXJXYWl0aW5nID0gZmFsc2U7XG5cbiAgICAgIHRoaXMuYm9hcmRzWzBdLmNsZWFyKCk7XG5cbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RhcnRcIikuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzZXRcIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5mb1wiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vcHBvbmVudFwiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb290XCIpLmNsYXNzTGlzdC5hZGQoXCJpbi1wcm9ncmVzc1wiKTtcblxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ib2FyZC1jb250cm9sc1wiKS5mb3JFYWNoKChib2FyZENvbnRyb2xzKSA9PiB7XG4gICAgICAgIGJvYXJkQ29udHJvbHMuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIH0pO1xuXG4gICAgICBhd2FpdCB0aGlzLnBsYXkoKTtcbiAgICB9LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IGdhbWVPdmVyU2NyZWVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lLW92ZXItc2NyZWVuXCIpO1xuICAgICAgaWYgKGdhbWVPdmVyU2NyZWVuKSBnYW1lT3ZlclNjcmVlbi5yZW1vdmUoKTtcblxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGFydFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXNldFwiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmZvXCIpLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm9wcG9uZW50XCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jvb3RcIikuY2xhc3NMaXN0LnJlbW92ZShcImluLXByb2dyZXNzXCIpO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb290XCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJhdHRhY2stYWxsb3dlZFwiKTtcblxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5lZGl0LWJvYXJkXCIpLmZvckVhY2goKGVkaXRCdXR0b24pID0+IHtcbiAgICAgICAgZWRpdEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmFjdGl2ZVwiKS5mb3JFYWNoKChhY3RpdmVCb2FyZCkgPT4ge1xuICAgICAgICBhY3RpdmVCb2FyZC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuaXNJblByb2dyZXNzID0gZmFsc2U7XG4gICAgICB0aGlzLmlzR2FtZU92ZXIgPSB0cnVlO1xuICAgICAgdGhpcy5pc1BsYXllcldhaXRpbmcgPSBmYWxzZTtcblxuICAgICAgdGhpcy5wbGF5ZXJzWzBdLmJvYXJkLnJlc2V0KCk7XG4gICAgICB0aGlzLnBsYXllcnNbMV0uYm9hcmQucmVzZXQoKTtcblxuICAgICAgdGhpcy5ib2FyZHMgPSBzZXR1cEdhbWVCb2FyZHModGhpcywgdGhpcy5wbGF5ZXJzWzBdLCB0aGlzLnBsYXllcnNbMV0pO1xuXG4gICAgICB0aGlzLmJvYXJkc1swXS5yYW5kb21pemVGb3JtYXRpb24oKTtcbiAgICAgIHRoaXMuYm9hcmRzWzFdLnJhbmRvbWl6ZUZvcm1hdGlvbigpO1xuXG4gICAgICBjb25zdCBib2FyZHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJvYXJkc1wiKTtcbiAgICAgIEFycmF5LmZyb20oYm9hcmRzQ29udGFpbmVyLmNoaWxkcmVuKS5mb3JFYWNoKChib2FyZCkgPT4ge1xuICAgICAgICBib2FyZHNDb250YWluZXIucmVtb3ZlQ2hpbGQoYm9hcmQpO1xuICAgICAgfSk7XG4gICAgICBib2FyZHNDb250YWluZXIuYXBwZW5kKFxuICAgICAgICB0aGlzLmJvYXJkc1swXS5jb21wb25lbnQsXG4gICAgICAgIHRoaXMuYm9hcmRzWzFdLmNvbXBvbmVudCxcbiAgICAgICk7XG4gICAgfSxcblxuICAgIGNoYW5nZU1vZGU6IGZ1bmN0aW9uIChwbGF5ZXJPbmUsIHBsYXllclR3bykge1xuICAgICAgdGhpcy5tb2RlID1cbiAgICAgICAgdGhpcy5tb2RlID09PSBHYW1lTW9kZS5DT01QVVRFUiA/IEdhbWVNb2RlLkZSSUVORCA6IEdhbWVNb2RlLkNPTVBVVEVSO1xuICAgICAgdGhpcy5wbGF5ZXJzID0gW3BsYXllck9uZSwgcGxheWVyVHdvXTtcbiAgICAgIHRoaXMuY3VycmVudFBsYXllckluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7XG5cbiAgICAgIHRoaXMuaXNJblByb2dyZXNzID0gZmFsc2U7XG4gICAgICB0aGlzLmlzR2FtZU92ZXIgPSBmYWxzZTtcbiAgICAgIHRoaXMuaXNQbGF5ZXJXYWl0aW5nID0gZmFsc2U7XG5cbiAgICAgIHRoaXMuYm9hcmRzID0gc2V0dXBHYW1lQm9hcmRzKHRoaXMsIHBsYXllck9uZSwgcGxheWVyVHdvKTtcblxuICAgICAgdGhpcy5yZXNldCgpO1xuICAgIH0sXG5cbiAgICBwbGF5OiBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgY3VycmVudFBsYXllciA9IHRoaXMucGxheWVyc1t0aGlzLmN1cnJlbnRQbGF5ZXJJbmRleF07XG4gICAgICBsZXQgbmV4dFBsYXllckluZGV4ID0gKHRoaXMuY3VycmVudFBsYXllckluZGV4ICsgMSkgJSAyO1xuICAgICAgbGV0IG5leHRQbGF5ZXIgPSB0aGlzLnBsYXllcnNbbmV4dFBsYXllckluZGV4XTtcblxuICAgICAgd2hpbGUgKCF0aGlzLmlzR2FtZU92ZXIpIHtcbiAgICAgICAgaWYgKGN1cnJlbnRQbGF5ZXIuYm9hcmQuaXNGbGVldERlc3Ryb3llZCgpKSB7XG4gICAgICAgICAgdGhpcy5pc0dhbWVPdmVyID0gdHJ1ZTtcblxuICAgICAgICAgIHRoaXMuYm9hcmRzWyh0aGlzLmN1cnJlbnRQbGF5ZXJJbmRleCArIDEpICUgMl0uY29tcG9uZW50LmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgY3JlYXRlR2FtZU92ZXJTY3JlZW4oY3VycmVudFBsYXllciwgbmV4dFBsYXllciwgdGhpcyksXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5mb1wiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNQbGF5ZXJXYWl0aW5nKSB7XG4gICAgICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwKSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb290XCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJhdHRhY2stYWxsb3dlZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGN1cnJlbnRQbGF5ZXIgPSB0aGlzLnBsYXllcnNbdGhpcy5jdXJyZW50UGxheWVySW5kZXhdO1xuICAgICAgICBuZXh0UGxheWVySW5kZXggPSAodGhpcy5jdXJyZW50UGxheWVySW5kZXggKyAxKSAlIDI7XG4gICAgICAgIG5leHRQbGF5ZXIgPSB0aGlzLnBsYXllcnNbbmV4dFBsYXllckluZGV4XTtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGAuYm9hcmQtJHt0aGlzLmN1cnJlbnRQbGF5ZXJJbmRleCA9PT0gMCA/IFwidHdvXCIgOiBcIm9uZVwifS1pbmZvYCxcbiAgICAgICAgKS50ZXh0Q29udGVudCA9XG4gICAgICAgICAgYCR7bmV4dFBsYXllci50eXBlID09PSBQbGF5ZXJUeXBlLkNPTVBVVEVSID8gXCJZb3VyXCIgOiBjdXJyZW50UGxheWVyLm5hbWUgKyBcIidzXCJ9IHR1cm5gO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGAuYm9hcmQtJHt0aGlzLmN1cnJlbnRQbGF5ZXJJbmRleCA9PT0gMCA/IFwib25lXCIgOiBcInR3b1wifS1pbmZvYCxcbiAgICAgICAgKS50ZXh0Q29udGVudCA9IFwiXCI7XG5cbiAgICAgICAgdGhpcy5ib2FyZHNbdGhpcy5jdXJyZW50UGxheWVySW5kZXhdLmNvbXBvbmVudC5jbGFzc0xpc3QucmVtb3ZlKFxuICAgICAgICAgIFwiYWN0aXZlXCIsXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYm9hcmRzW25leHRQbGF5ZXJJbmRleF0uY29tcG9uZW50LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG5cbiAgICAgICAgdGhpcy5ib2FyZHNbdGhpcy5jdXJyZW50UGxheWVySW5kZXhdLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmJvYXJkc1tuZXh0UGxheWVySW5kZXhdLmFjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRQbGF5ZXIudHlwZSA9PT0gUGxheWVyVHlwZS5DT01QVVRFUiAmJiAhdGhpcy5pc0dhbWVPdmVyKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5ib2FyZHNbbmV4dFBsYXllckluZGV4XS5jb21wdXRlckF0dGFjaygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuaXNQbGF5ZXJXYWl0aW5nID0gdHJ1ZTtcblxuICAgICAgICAgIGlmIChuZXh0UGxheWVyLnR5cGUgIT09IFBsYXllclR5cGUuQ09NUFVURVIpIHtcbiAgICAgICAgICAgIHRoaXMuYm9hcmRzW25leHRQbGF5ZXJJbmRleF0uY29tcG9uZW50LmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgICBjcmVhdGVQYXNzaW5nU2NyZWVuKHRoaXMucGxheWVycywgdGhpcy5jdXJyZW50UGxheWVySW5kZXgpLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jvb3RcIikuY2xhc3NMaXN0LmFkZChcImF0dGFjay1hbGxvd2VkXCIpO1xuXG4gICAgICAgICAgaWYgKG5leHRQbGF5ZXIudHlwZSAhPT0gUGxheWVyVHlwZS5DT01QVVRFUikge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb290XCIpLmNsYXNzTGlzdC5hZGQoXCJwYXNzaW5nXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY3VycmVudFBsYXllckluZGV4ID0gbmV4dFBsYXllckluZGV4O1xuICAgICAgfVxuICAgIH0sXG4gIH07XG5cbiAgZ2FtZS5ib2FyZHMgPSBzZXR1cEdhbWVCb2FyZHMoZ2FtZSwgcGxheWVyT25lLCBwbGF5ZXJUd28pO1xuXG4gIHJldHVybiBnYW1lO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVHYW1lT3ZlclNjcmVlbihjdXJyZW50UGxheWVyLCBuZXh0UGxheWVyLCBnYW1lKSB7XG4gIGNvbnN0IGdhbWVPdmVyU2NyZWVuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZ2FtZU92ZXJTY3JlZW4uY2xhc3NMaXN0LmFkZChcImdhbWUtb3Zlci1zY3JlZW5cIik7XG5cbiAgbGV0IGdhbWVPdmVyTWVzc2FnZTtcbiAgaWYgKGN1cnJlbnRQbGF5ZXIudHlwZSA9PT0gUGxheWVyVHlwZS5DT01QVVRFUikge1xuICAgIGdhbWVPdmVyTWVzc2FnZSA9IFwiWU9VIFdPTiBUSEUgR0FNRSFcIjtcbiAgfSBlbHNlIGlmIChuZXh0UGxheWVyLnR5cGUgPT09IFBsYXllclR5cGUuQ09NUFVURVIpIHtcbiAgICBnYW1lT3Zlck1lc3NhZ2UgPSBcIllPVSBMT1NUIFRIRSBHQU1FIVwiO1xuICB9IGVsc2Uge1xuICAgIGdhbWVPdmVyTWVzc2FnZSA9IGAke25leHRQbGF5ZXIubmFtZS50b1VwcGVyQ2FzZSgpfSBXT04gVEhFIEdBTUUhYDtcbiAgfVxuXG4gIGdhbWVPdmVyU2NyZWVuLmlubmVySFRNTCA9IGA8cD4ke2dhbWVPdmVyTWVzc2FnZX08L3A+YDtcblxuICBjb25zdCByZXNldEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIHJlc2V0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJyZXNldFwiKTtcbiAgcmVzZXRCdXR0b24udGV4dENvbnRlbnQgPSBcIlBsYXkgQWdhaW5cIjtcbiAgcmVzZXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGdhbWUucmVzZXQoKSk7XG4gIGdhbWVPdmVyU2NyZWVuLmFwcGVuZENoaWxkKHJlc2V0QnV0dG9uKTtcblxuICBjb25zdCBwYXNzaW5nU2NyZWVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYXNzaW5nLXNjcmVlblwiKTtcbiAgaWYgKHBhc3NpbmdTY3JlZW4pIHBhc3NpbmdTY3JlZW4ucmVtb3ZlKCk7XG5cbiAgcmV0dXJuIGdhbWVPdmVyU2NyZWVuO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVQYXNzaW5nU2NyZWVuKHBsYXllcnMsIGN1cnJlbnRQbGF5ZXIpIHtcbiAgY29uc3QgcGFzc2luZ1NjcmVlbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHBhc3NpbmdTY3JlZW4uY2xhc3NMaXN0LmFkZChcInBhc3Npbmctc2NyZWVuXCIpO1xuICBwYXNzaW5nU2NyZWVuLmlubmVySFRNTCA9IGBcbiAgICA8cD5QYXNzIHRoZSBkZXZpY2UgdG8gJHtwbGF5ZXJzW2N1cnJlbnRQbGF5ZXJdLm5hbWV9PC9wPlxuICBgO1xuICBjb25zdCBjb250aW51ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIGNvbnRpbnVlQnV0dG9uLnRleHRDb250ZW50ID0gXCJDb250aW51ZVwiO1xuICBjb250aW51ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHBhc3NpbmdTY3JlZW4ucmVtb3ZlKCk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYXNzaW5nXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJwYXNzaW5nXCIpO1xuICB9KTtcbiAgcGFzc2luZ1NjcmVlbi5hcHBlbmRDaGlsZChjb250aW51ZUJ1dHRvbik7XG4gIHJldHVybiBwYXNzaW5nU2NyZWVuO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICghc2NyaXB0VXJsIHx8ICEvXmh0dHAocz8pOi8udGVzdChzY3JpcHRVcmwpKSkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsImltcG9ydCB7IGNyZWF0ZVBsYXllciwgUGxheWVyVHlwZSB9IGZyb20gXCIuL2NvcmUvcGxheWVyLmpzXCI7XG5pbXBvcnQgeyBzZXR1cENvbnRyb2xzIH0gZnJvbSBcIi4vZG9tL2NvbnRyb2xzLmpzXCI7XG5pbXBvcnQgeyBzZXR1cEdhbWUgfSBmcm9tIFwiLi9kb20vZ2FtZS5qc1wiO1xuXG5pbXBvcnQgXCIuL3N0eWxlcy9pbmRleC5jc3NcIjtcblxuY29uc29sZS5sb2coXCJHZXQgUmVhZHkgZm9yIEJhdHRsZSFcIik7XG5cbmNvbnN0IHJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIik7XG5yb290LmlubmVySFRNTCA9IGBcbiAgPGhlYWRlcj5CYXR0bGVzaGlwPC9oZWFkZXI+XG4gIDxkaXYgY2xhc3M9XCJvcHBvbmVudFwiPlxuICAgIDxwPk9wcG9uZW50OiA8L3A+XG4gICAgPGRpdiBjbGFzcz1cIm9wdGlvbnNcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzbGlkZXIgc2xpZGVyLWNvbXB1dGVyXCI+PC9kaXY+XG4gICAgICA8cCBjbGFzcz1cIm9wcG9uZW50LWNvbXB1dGVyIGFjdGl2ZS1tb2RlXCI+Q29tcHV0ZXI8L3A+XG4gICAgICA8cCBjbGFzcz1cIm9wcG9uZW50LWZyaWVuZFwiPkZyaWVuZDwvcD5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJib2FyZHNcIj48L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImluZm8gaGlkZGVuXCI+XG4gICAgPHAgY2xhc3M9XCJib2FyZC1vbmUtaW5mb1wiPjwvcD5cbiAgICA8cCBjbGFzcz1cImJvYXJkLXR3by1pbmZvXCI+PC9wPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImNvbnRyb2xzXCI+XG4gICAgPGJ1dHRvbiBjbGFzcz1cInN0YXJ0XCI+U3RhcnQgR2FtZTwvYnV0dG9uPlxuICAgIDxidXR0b24gY2xhc3M9XCJyZXNldCBoaWRkZW5cIj5SZXNldCBHYW1lPC9idXR0b24+XG4gIDwvZGl2PlxuYDtcblxuY29uc3QgZ2FtZSA9IHNldHVwR2FtZShcbiAgY3JlYXRlUGxheWVyKFwiUGxheWVyXCIsIFBsYXllclR5cGUuSFVNQU4sIDEwKSxcbiAgY3JlYXRlUGxheWVyKFwiQ29tcHV0ZXJcIiwgUGxheWVyVHlwZS5DT01QVVRFUiwgMTApLFxuKTtcblxuZG9jdW1lbnRcbiAgLnF1ZXJ5U2VsZWN0b3IoXCIuYm9hcmRzXCIpXG4gIC5hcHBlbmQoZ2FtZS5ib2FyZHNbMF0uY29tcG9uZW50LCBnYW1lLmJvYXJkc1sxXS5jb21wb25lbnQpO1xuc2V0dXBDb250cm9scyhnYW1lKTtcbiJdLCJuYW1lcyI6WyJjcmVhdGVTaGlwIiwiU2hpcE9yaWVudGF0aW9uIiwiQ2VsbFN0YXRlIiwiT2JqZWN0IiwiZnJlZXplIiwiRU1QVFkiLCJNSVNTIiwiU0hJUCIsIkhJVCIsIlNVTksiLCJjcmVhdGVHYW1lQm9hcmQiLCJzaXplIiwiRXJyb3IiLCJjZWxscyIsIkFycmF5IiwiZnJvbSIsImxlbmd0aCIsInNoaXBzIiwicmVzZXQiLCJwbGFjZVNoaXAiLCJjb29yZGluYXRlcyIsIm9yaWVudGF0aW9uIiwiSE9SSVpPTlRBTCIsIlZFUlRJQ0FMIiwiaSIsInB1c2giLCJtb3ZlU2hpcCIsInNoaXBJbmRleCIsInNoaXAiLCJwb3AiLCJyb3RhdGVTaGlwIiwibmV3T3JpZW50YXRpb24iLCJnZXRTaGlwSW5kZXgiLCJqIiwicmVjZWl2ZUF0dGFjayIsImhpdCIsImlzU3VuayIsImlzRmxlZXREZXN0cm95ZWQiLCJQbGF5ZXJUeXBlIiwiSFVNQU4iLCJDT01QVVRFUiIsImNyZWF0ZVBsYXllciIsIm5hbWUiLCJ0eXBlIiwiYm9hcmRTaXplIiwiYm9hcmQiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJoaXRzIiwicmVmcmVzaFN2ZyIsImVkaXRTdmciLCJzYXZlU3ZnIiwic2V0dXBHYW1lQm9hcmRzIiwiZ2FtZSIsInBsYXllck9uZSIsInBsYXllclR3byIsImJvYXJkT25lIiwiY3JlYXRlQm9hcmRDb21wb25lbnQiLCJyYW5kb21pemVGb3JtYXRpb24iLCJjb21wb25lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJhZGRFdmVudExpc3RlbmVyIiwiY2xlYXIiLCJib2FyZFR3byIsIkRPTUJvYXJkIiwiY2hpbGRyZW4iLCJmb3JFYWNoIiwicm93IiwiY2VsbCIsImVkaXRpbmciLCJpc011dGFibGUiLCJjb250YWlucyIsImlzSW5Qcm9ncmVzcyIsInRvZ2dsZVNoaXBNb3Rpb24iLCJpc0F0dGFja2FibGUiLCJhY3RpdmUiLCJpc0dhbWVPdmVyIiwiaXNQbGF5ZXJXYWl0aW5nIiwiZXZlbnQiLCJyZW5kZXIiLCJwcmV2ZW50RGVmYXVsdCIsImRvY3VtZW50Iiwia2V5IiwicGxheWVyIiwiYXR0YWNrYWJsZSIsIm11dGFibGUiLCJib2FyZENvbXBvbmVudCIsImNyZWF0ZUVsZW1lbnQiLCJib2FyZEhlYWRlciIsImlubmVySFRNTCIsImFwcGVuZENoaWxkIiwicmFuZG9taXplQnV0dG9uIiwiZWRpdEJ1dHRvbiIsInNhdmVCdXR0b24iLCJyZWZyZXNoSWNvbiIsIkltYWdlIiwic3JjIiwiZWRpdEljb24iLCJzYXZlSWNvbiIsImJvYXJkQ29udHJvbHMiLCJib2FyZENlbGxzIiwicm93Q29tcG9uZW50IiwiY2VsbENvbXBvbmVudCIsImdldENlbGxDbGFzc05hbWUiLCJtb3ZpbmdDZWxscyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJyZW1vdmUiLCJpc01vdmluZyIsImNsYXNzTmFtZSIsInBsYWNlZCIsIk1hdGgiLCJyYW5kb20iLCJ4IiwiZmxvb3IiLCJ5IiwidG9nZ2xlIiwibW92aW5nU2hpcENlbGwiLCJxdWVyeVNlbGVjdG9yIiwibW92aW5nU2hpcENvb3JkaW5hdGVzIiwiZ2V0Q2VsbEluZGV4IiwibW92aW5nU2hpcEluZGV4IiwibW92ZVN1Y2Nlc3NmdWwiLCJtb3ZlZFNoaXAiLCJjb25zb2xlIiwibG9nIiwiY29tcHV0ZXJBdHRhY2siLCJ2YWxpZCIsIlByb21pc2UiLCJyIiwic2V0VGltZW91dCIsInNhdmVFZGl0cyIsInJlcG9ydFZhbGlkaXR5IiwidGFyZ2V0IiwidmFsdWUiLCJ0ZXh0Q29udGVudCIsInByb3RvdHlwZSIsImluZGV4T2YiLCJjYWxsIiwicGFyZW50Tm9kZSIsInNlY3JldCIsInNldHVwQ29udHJvbHMiLCJzdGFydEJ1dHRvbiIsInN0YXJ0IiwicmVzZXRCdXR0b24iLCJjb21wdXRlck9wcG9uZW50QnV0dG9uIiwiZnJpZW5kT3Bwb25lbnRCdXR0b24iLCJzbGlkZXIiLCJjaGFuZ2VNb2RlIiwiR2FtZU1vZGUiLCJGUklFTkQiLCJzZXR1cEdhbWUiLCJtb2RlIiwicGxheWVycyIsImN1cnJlbnRQbGF5ZXJJbmRleCIsImJvYXJkcyIsInBsYXkiLCJnYW1lT3ZlclNjcmVlbiIsImFjdGl2ZUJvYXJkIiwiYm9hcmRzQ29udGFpbmVyIiwicmVtb3ZlQ2hpbGQiLCJhcHBlbmQiLCJjdXJyZW50UGxheWVyIiwibmV4dFBsYXllckluZGV4IiwibmV4dFBsYXllciIsImNyZWF0ZUdhbWVPdmVyU2NyZWVuIiwicmVzb2x2ZSIsImNyZWF0ZVBhc3NpbmdTY3JlZW4iLCJnYW1lT3Zlck1lc3NhZ2UiLCJ0b1VwcGVyQ2FzZSIsInBhc3NpbmdTY3JlZW4iLCJjb250aW51ZUJ1dHRvbiIsInJvb3QiLCJnZXRFbGVtZW50QnlJZCJdLCJzb3VyY2VSb290IjoiIn0=