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

/***/ "./assets/chevron-left.svg":
/*!*********************************!*\
  !*** ./assets/chevron-left.svg ***!
  \*********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "982a40d4f9e3cf9fdaea.svg";

/***/ }),

/***/ "./assets/edit.svg":
/*!*************************!*\
  !*** ./assets/edit.svg ***!
  \*************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "f9a985514490b0533545.svg";

/***/ }),

/***/ "./assets/favicon.ico":
/*!****************************!*\
  !*** ./assets/favicon.ico ***!
  \****************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "e0eb2fd9dcd037e901b9.ico";

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
    placeShip: function (ship) {
      if (ship.coordinates[0] < 0 || ship.coordinates[1] < 0 || ship.coordinates[0] >= size || ship.coordinates[1] >= size) {
        throw new Error("Cannot place ship outside the board");
      } else if (ship.orientation === _ship_js__WEBPACK_IMPORTED_MODULE_0__.ShipOrientation.HORIZONTAL && ship.coordinates[0] + ship.length - 1 >= size || ship.orientation === _ship_js__WEBPACK_IMPORTED_MODULE_0__.ShipOrientation.VERTICAL && ship.coordinates[1] + ship.length - 1 >= size) {
        return false;
      }
      if (ship.orientation === _ship_js__WEBPACK_IMPORTED_MODULE_0__.ShipOrientation.HORIZONTAL) {
        for (let i = ship.coordinates[0]; i <= ship.coordinates[0] + ship.length - 1; i++) {
          if (this.cells[ship.coordinates[1]][i] !== CellState.EMPTY) {
            return false;
          }
        }
      } else if (ship.orientation === _ship_js__WEBPACK_IMPORTED_MODULE_0__.ShipOrientation.VERTICAL) {
        for (let i = ship.coordinates[1]; i <= ship.coordinates[1] + ship.length - 1; i++) {
          if (this.cells[i][ship.coordinates[0]] !== CellState.EMPTY) {
            return false;
          }
        }
      }
      this.ships.push(ship);
      if (ship.orientation === _ship_js__WEBPACK_IMPORTED_MODULE_0__.ShipOrientation.HORIZONTAL) {
        for (let i = ship.coordinates[0]; i <= ship.coordinates[0] + ship.length - 1; i++) {
          this.cells[ship.coordinates[1]][i] = CellState.SHIP;
        }
      } else if (ship.orientation === _ship_js__WEBPACK_IMPORTED_MODULE_0__.ShipOrientation.VERTICAL) {
        for (let i = ship.coordinates[1]; i <= ship.coordinates[1] + ship.length - 1; i++) {
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
      if (ship.orientation === _ship_js__WEBPACK_IMPORTED_MODULE_0__.ShipOrientation.HORIZONTAL) {
        for (let i = ship.coordinates[0]; i <= ship.coordinates[0] + ship.length - 1; i++) {
          this.cells[ship.coordinates[1]][i] = CellState.EMPTY;
        }
      } else if (ship.orientation === _ship_js__WEBPACK_IMPORTED_MODULE_0__.ShipOrientation.VERTICAL) {
        for (let i = ship.coordinates[1]; i <= ship.coordinates[1] + ship.length - 1; i++) {
          this.cells[i][ship.coordinates[0]] = CellState.EMPTY;
        }
      }
      if (!this.placeShip((0,_ship_js__WEBPACK_IMPORTED_MODULE_0__.createShip)(ship.type, coordinates, ship.orientation))) {
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
        return {
          result: CellState.MISS,
          ship: undefined
        };
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
          return {
            result: this.cells[coordinates[1]][coordinates[0]],
            ship
          };
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
/* harmony export */   ShipType: function() { return /* binding */ ShipType; },
/* harmony export */   createShip: function() { return /* binding */ createShip; },
/* harmony export */   getShipLength: function() { return /* binding */ getShipLength; }
/* harmony export */ });
const ShipType = Object.freeze({
  CARRIER: "Carrier",
  BATTLESHIP: "Battleship",
  DESTROYER: "Destroyer",
  SUBMARINE: "Submarine",
  PATROL: "Patrol Boat"
});
const ShipOrientation = Object.freeze({
  HORIZONTAL: "HORIZONTAL",
  VERTICAL: "VERTICAL"
});
function getShipLength(type) {
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
function createShip(type) {
  let coordinates = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [undefined, undefined];
  let orientation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ShipOrientation.HORIZONTAL;
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
  const boardOne = createBoardComponent(playerOne.board, playerOne, playerTwo.type !== _core_player_js__WEBPACK_IMPORTED_MODULE_1__.PlayerType.COMPUTER, playerOne.type === _core_player_js__WEBPACK_IMPORTED_MODULE_1__.PlayerType.HUMAN, game);
  boardOne.randomizeFormation();
  boardOne.component.classList.add("player-one", playerOne.type === _core_player_js__WEBPACK_IMPORTED_MODULE_1__.PlayerType.HUMAN ? "human" : "computer");
  if (playerTwo.type === _core_player_js__WEBPACK_IMPORTED_MODULE_1__.PlayerType.COMPUTER) {
    boardOne.component.classList.add("only-human");
  }
  boardOne.component.addEventListener("click", () => boardOne.clear(), true);
  const boardTwo = createBoardComponent(playerTwo.board, playerTwo, playerOne.type !== _core_player_js__WEBPACK_IMPORTED_MODULE_1__.PlayerType.COMPUTER, playerTwo.type === _core_player_js__WEBPACK_IMPORTED_MODULE_1__.PlayerType.HUMAN, game);
  boardTwo.randomizeFormation();
  boardTwo.component.classList.add("player-two", playerTwo.type === _core_player_js__WEBPACK_IMPORTED_MODULE_1__.PlayerType.HUMAN ? "human" : "computer");
  [boardOne, boardTwo].forEach((DOMBoard, boardIndex) => {
    Array.from(DOMBoard.component.children[1].children).forEach((row, i) => {
      Array.from(row.children).forEach((cell, j) => {
        cell.addEventListener("click", () => {
          if (DOMBoard.editing && DOMBoard.isMutable() && cell.classList.contains("ship") && !game.isInProgress) {
            DOMBoard.toggleShipMotion([j, i]);
          } else if (DOMBoard.isAttackable() && DOMBoard.active && game.isInProgress && !game.isGameOver && game.isPlayerWaiting) {
            const attack = DOMBoard.receiveAttack([j, i]);
            if (attack) {
              game.updateAttackInfo(attack.result, attack.ship, (boardIndex + 1) % 2);
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
  });
  document.addEventListener("keydown", event => {
    if (boardOne.editing) boardOne.moveShip(event.key);else if (boardTwo.editing) boardTwo.moveShip(event.key);
  });
  return [boardOne, boardTwo];
}
function createBoardComponent(board, player, attackable, mutable, game) {
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
      this.clear();
      this.board.reset();
      for (const type of Object.keys(_core_ship_js__WEBPACK_IMPORTED_MODULE_2__.ShipType)) {
        const shipLength = (0,_core_ship_js__WEBPACK_IMPORTED_MODULE_2__.getShipLength)(_core_ship_js__WEBPACK_IMPORTED_MODULE_2__.ShipType[type]);
        let placed = false;
        while (!placed) {
          const orientation = Math.random() > 0.5 ? _core_ship_js__WEBPACK_IMPORTED_MODULE_2__.ShipOrientation.HORIZONTAL : _core_ship_js__WEBPACK_IMPORTED_MODULE_2__.ShipOrientation.VERTICAL;
          const x = Math.floor(Math.random() * (10 - (orientation === _core_ship_js__WEBPACK_IMPORTED_MODULE_2__.ShipOrientation.HORIZONTAL ? shipLength : 0)));
          const y = Math.floor(Math.random() * (10 - (orientation === _core_ship_js__WEBPACK_IMPORTED_MODULE_2__.ShipOrientation.VERTICAL ? shipLength : 0)));
          placed = this.board.placeShip((0,_core_ship_js__WEBPACK_IMPORTED_MODULE_2__.createShip)(_core_ship_js__WEBPACK_IMPORTED_MODULE_2__.ShipType[type], [x, y], orientation));
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
    },
    receiveAttack: function (coordinates) {
      const cell = board.cells[coordinates[1]][coordinates[0]];
      if (cell !== _core_gameBoard_js__WEBPACK_IMPORTED_MODULE_0__.CellState.EMPTY && cell !== _core_gameBoard_js__WEBPACK_IMPORTED_MODULE_0__.CellState.SHIP) {
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
        if (cell.classList.contains("empty") || cell.classList.contains("ship")) {
          break;
        }
      }
      await new Promise(r => setTimeout(r, 500));
      const attack = this.receiveAttack([x, y]);
      game.updateAttackInfo(attack.result, attack.ship, attackerIndex);
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

/***/ "./src/dom/game.js":
/*!*************************!*\
  !*** ./src/dom/game.js ***!
  \*************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GameMode: function() { return /* binding */ GameMode; },
/* harmony export */   setupGame: function() { return /* binding */ setupGame; }
/* harmony export */ });
/* harmony import */ var _core_gameBoard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/gameBoard.js */ "./src/core/gameBoard.js");
/* harmony import */ var _core_player_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/player.js */ "./src/core/player.js");
/* harmony import */ var _boards_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./boards.js */ "./src/dom/boards.js");



const GameMode = Object.freeze({
  COMPUTER: "computer",
  FRIEND: "friend"
});
function setupGame(playerOne, playerTwo, mode) {
  const game = {
    mode,
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
      document.querySelector(".board-info").classList.remove("hidden");
      document.querySelector(".help-info").classList.add("hidden");
      document.querySelector(".attack-info").classList.remove("hidden");
      document.querySelector("#root").classList.add("in-progress");
      document.querySelector("#root").classList.remove("vs-computer");
      document.querySelector("#root").classList.remove("vs-friend");
      document.querySelector("#root").classList.add(mode === GameMode.COMPUTER ? "vs-computer" : "vs-friend");
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
      document.querySelector(".board-info").classList.add("hidden");
      document.querySelector(".help-info").classList.remove("hidden");
      document.querySelector(".attack-info").classList.add("hidden");
      document.querySelector("#root").classList.remove("in-progress");
      document.querySelector("#root").classList.remove("attack-allowed");
      this.isInProgress = false;
      this.isGameOver = true;
      this.isPlayerWaiting = false;
      this.players[0].board.reset();
      this.players[1].board.reset();
      this.boards = (0,_boards_js__WEBPACK_IMPORTED_MODULE_2__.setupGameBoards)(this, this.players[0], this.players[1]);
      this.boards[0].randomizeFormation();
      this.boards[1].randomizeFormation();
      const boardsContainer = document.querySelector(".boards");
      Array.from(boardsContainer.children).forEach(board => {
        boardsContainer.removeChild(board);
      });
      boardsContainer.append(this.boards[0].component, this.boards[1].component);
    },
    play: async function () {
      let currentPlayer = this.players[this.currentPlayerIndex];
      let nextPlayerIndex = (this.currentPlayerIndex + 1) % 2;
      let nextPlayer = this.players[nextPlayerIndex];
      while (!this.isGameOver) {
        if (currentPlayer.board.isFleetDestroyed()) {
          this.isGameOver = true;
          this.boards[(this.currentPlayerIndex + 1) % 2].component.appendChild(createGameOverScreen(currentPlayer, nextPlayer, this));
          document.querySelector(".board-info").classList.add("hidden");
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
        document.querySelector(`.board-${this.currentPlayerIndex === 0 ? "two" : "one"}-info`).textContent = `${nextPlayer.type === _core_player_js__WEBPACK_IMPORTED_MODULE_1__.PlayerType.COMPUTER ? "Your" : currentPlayer.name + "'s"} turn`;
        document.querySelector(`.board-${this.currentPlayerIndex === 0 ? "one" : "two"}-info`).textContent = "";
        this.boards[this.currentPlayerIndex].component.classList.remove("active");
        this.boards[nextPlayerIndex].component.classList.add("active");
        this.boards[this.currentPlayerIndex].active = false;
        this.boards[nextPlayerIndex].active = true;
        if (currentPlayer.type === _core_player_js__WEBPACK_IMPORTED_MODULE_1__.PlayerType.COMPUTER && !this.isGameOver) {
          await this.boards[nextPlayerIndex].computerAttack(this.currentPlayerIndex);
        } else {
          this.isPlayerWaiting = true;
          if (nextPlayer.type !== _core_player_js__WEBPACK_IMPORTED_MODULE_1__.PlayerType.COMPUTER) {
            this.boards[nextPlayerIndex].component.appendChild(createPassingScreen(this.players, this.currentPlayerIndex));
          }
          document.querySelector("#root").classList.add("attack-allowed");
          if (nextPlayer.type !== _core_player_js__WEBPACK_IMPORTED_MODULE_1__.PlayerType.COMPUTER) {
            document.querySelector("#root").classList.add("passing");
          }
        }
        this.currentPlayerIndex = nextPlayerIndex;
      }
    },
    updateAttackInfo: function (attackType, ship, attackerIndex) {
      const attackInfo = document.querySelector(".attack-info");
      const attacker = this.players[attackerIndex].name;
      const receiver = this.players[(attackerIndex + 1) % 2].name;
      switch (attackType) {
        case _core_gameBoard_js__WEBPACK_IMPORTED_MODULE_0__.CellState.MISS:
          attackInfo.textContent = `${attacker} misses their shot`;
          break;
        case _core_gameBoard_js__WEBPACK_IMPORTED_MODULE_0__.CellState.HIT:
          attackInfo.textContent = `${attacker} hits one of ${receiver}'s ships`;
          break;
        case _core_gameBoard_js__WEBPACK_IMPORTED_MODULE_0__.CellState.SUNK:
          attackInfo.textContent = `${attacker} sinks ${receiver}'s ${ship.type}`;
          break;
      }
    }
  };
  game.boards = (0,_boards_js__WEBPACK_IMPORTED_MODULE_2__.setupGameBoards)(game, playerOne, playerTwo);
  return game;
}
function createGameOverScreen(currentPlayer, nextPlayer, game) {
  const gameOverScreen = document.createElement("div");
  gameOverScreen.classList.add("game-over-screen");
  let gameOverMessage;
  if (currentPlayer.type === _core_player_js__WEBPACK_IMPORTED_MODULE_1__.PlayerType.COMPUTER) {
    gameOverMessage = "YOU WON THE GAME!";
  } else if (nextPlayer.type === _core_player_js__WEBPACK_IMPORTED_MODULE_1__.PlayerType.COMPUTER) {
    gameOverMessage = "YOU LOST THE GAME!";
  } else {
    gameOverMessage = `${nextPlayer.name.toUpperCase()} WON THE GAME!`;
  }
  gameOverScreen.innerHTML = `<p>${gameOverMessage}</p>`;
  const outerResetButton = document.querySelector(".reset");
  if (outerResetButton) outerResetButton.classList.add("hidden");
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

/***/ }),

/***/ "./src/dom/pages/game.js":
/*!*******************************!*\
  !*** ./src/dom/pages/game.js ***!
  \*******************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createGamePage: function() { return /* binding */ createGamePage; }
/* harmony export */ });
function createGamePage(game) {
  const gamePage = document.createElement("div");
  gamePage.classList.add("game-page", "page");
  gamePage.innerHTML = `
    <div class="boards"></div>
    <div class="info">
      <div class="board-info hidden">
        <p class="board-one-info"></p>
        <p class="board-two-info"></p>
      </div>
      <div class="game-info">
        <p class="help-info">ⓘ Rearrange the ships to your liking by pressing the edit button, or by refreshing the board</p>
        <p class="attack-info hidden"></p>
      </div>
    </div>
    <div class="controls">
      <button class="start">Start Game</button>
      <button class="reset hidden">Reset Game</button>
    </div>
  `;
  const boardsContainer = gamePage.querySelector(".boards");
  boardsContainer.append(game.boards[0].component, game.boards[1].component);
  const startButton = gamePage.querySelector(".start");
  startButton.addEventListener("click", () => {
    if (gamePage.querySelector(".editing")) {
      alert("Please save your boards before starting the game");
      return;
    }
    game.start();
  });
  const resetButton = gamePage.querySelector(".reset");
  resetButton.addEventListener("click", () => {
    game.reset();
  });
  return gamePage;
}

/***/ }),

/***/ "./src/dom/pages/help.js":
/*!*******************************!*\
  !*** ./src/dom/pages/help.js ***!
  \*******************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createHelpPage: function() { return /* binding */ createHelpPage; }
/* harmony export */ });
/* harmony import */ var _assets_edit_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../assets/edit.svg */ "./assets/edit.svg");
/* harmony import */ var _assets_refresh_ccw_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../assets/refresh-ccw.svg */ "./assets/refresh-ccw.svg");


function createHelpPage() {
  const helpPage = document.createElement("div");
  helpPage.classList.add("help-page", "page");
  helpPage.innerHTML = `
    <h1>How to Play</h1>
    <section>
      <h3>Choose Game Mode</h3>
      <div>
        <p>
          By default, you'll be playing against the computer.
          If you want to play with a friend, choose the "Friend" option in the opponent section,
          and play by passing around your device.
        </p>
      </div>
    </section>
    <section>
      <h3>Edit your board(s)</h3>
      <div>
        <ul>
          <li>Click on the edit button (<img class="edit-img" />) to change the names of the players, and move around your ships (using arrow keys).</li>
          <li>You can also click the refresh button (<img class="refresh-img" />) to randomize the placement of ships in the board.</li>
        </ul>
      </div>
    </section>
    <section>
      <h3>Start playing!</h3>
      <div>
        <p>
        Press on "<b>Start Game</b>" to start playing.
        If you are not familiar with <a href="https://en.wikipedia.org/wiki/Battleship_(game)">battleship</a>, here's a quick run-through of the mechanics:
        </p>
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
      </div>
    </section>
    <h1 class="thanks">Thanks for Playing!</h1>
  `;
  helpPage.querySelector(".edit-img").src = _assets_edit_svg__WEBPACK_IMPORTED_MODULE_0__;
  helpPage.querySelector(".refresh-img").src = _assets_refresh_ccw_svg__WEBPACK_IMPORTED_MODULE_1__;
  return helpPage;
}

/***/ }),

/***/ "./src/dom/pages/home.js":
/*!*******************************!*\
  !*** ./src/dom/pages/home.js ***!
  \*******************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createHomePage: function() { return /* binding */ createHomePage; }
/* harmony export */ });
/* harmony import */ var _core_player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/player.js */ "./src/core/player.js");
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../game.js */ "./src/dom/game.js");
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game.js */ "./src/dom/pages/game.js");
/* harmony import */ var _help_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./help.js */ "./src/dom/pages/help.js");




function createHomePage() {
  let gameMode = _game_js__WEBPACK_IMPORTED_MODULE_1__.GameMode.COMPUTER;
  const homePage = document.createElement("div");
  homePage.classList.add("home-page", "page");
  homePage.innerHTML = `
    <div class="opponent">
      <p>Opponent: </p>
      <div class="options">
        <p class="opponent-computer active-mode">Computer</p>
        <p class="opponent-friend">Friend</p>
      </div>
    </div>
    <!-- <a class="help-link">How to Play</a> -->
    <div class="controls">
      <button class="play">Play Game</button>
      <button class="help">How to Play</button>
      <!-- <button class="reset hidden">Reset Game</button> -->
    </div>
  `;
  const computerOpponentButton = homePage.querySelector(".opponent-computer");
  computerOpponentButton.addEventListener("click", () => {
    if (computerOpponentButton.classList.contains("active-mode")) return;
    computerOpponentButton.classList.add("active-mode");
    friendOpponentButton.classList.remove("active-mode");
    gameMode = _game_js__WEBPACK_IMPORTED_MODULE_1__.GameMode.COMPUTER;
  });
  const friendOpponentButton = homePage.querySelector(".opponent-friend");
  friendOpponentButton.addEventListener("click", () => {
    if (friendOpponentButton.classList.contains("active-mode")) return;
    friendOpponentButton.classList.add("active-mode");
    computerOpponentButton.classList.remove("active-mode");
    gameMode = _game_js__WEBPACK_IMPORTED_MODULE_1__.GameMode.FRIEND;
  });
  const playButton = homePage.querySelector(".play");
  playButton.addEventListener("click", async () => {
    let game;
    if (gameMode === _game_js__WEBPACK_IMPORTED_MODULE_1__.GameMode.COMPUTER) {
      game = (0,_game_js__WEBPACK_IMPORTED_MODULE_1__.setupGame)((0,_core_player_js__WEBPACK_IMPORTED_MODULE_0__.createPlayer)("Player", _core_player_js__WEBPACK_IMPORTED_MODULE_0__.PlayerType.HUMAN, 10), (0,_core_player_js__WEBPACK_IMPORTED_MODULE_0__.createPlayer)("Computer", _core_player_js__WEBPACK_IMPORTED_MODULE_0__.PlayerType.COMPUTER, 10));
    } else {
      game = (0,_game_js__WEBPACK_IMPORTED_MODULE_1__.setupGame)((0,_core_player_js__WEBPACK_IMPORTED_MODULE_0__.createPlayer)("Player 1", _core_player_js__WEBPACK_IMPORTED_MODULE_0__.PlayerType.HUMAN, 10), (0,_core_player_js__WEBPACK_IMPORTED_MODULE_0__.createPlayer)("Player 2", _core_player_js__WEBPACK_IMPORTED_MODULE_0__.PlayerType.HUMAN, 10));
    }
    homePage.parentNode.appendChild((0,_game_js__WEBPACK_IMPORTED_MODULE_2__.createGamePage)(game));
    homePage.remove();
  });
  const helpButton = homePage.querySelector(".help");
  helpButton.addEventListener("click", () => {
    homePage.parentNode.appendChild((0,_help_js__WEBPACK_IMPORTED_MODULE_3__.createHelpPage)());
    homePage.remove();
  });
  return homePage;
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
/* harmony import */ var _dom_pages_home_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom/pages/home.js */ "./src/dom/pages/home.js");
/* harmony import */ var _assets_chevron_left_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/chevron-left.svg */ "./assets/chevron-left.svg");
/* harmony import */ var _assets_favicon_ico__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/favicon.ico */ "./assets/favicon.ico");
/* harmony import */ var _styles_index_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles/index.css */ "./src/styles/index.css");




console.log("Get Ready for Battle!");
const root = document.getElementById("root");
root.innerHTML = `
  <header>
    <button class="back-button"></button>
    <img class="logo" alt="Logo" /><h1>BATTLESHIP</h1>
  </header>
`;
root.querySelector(".logo").src = _assets_favicon_ico__WEBPACK_IMPORTED_MODULE_2__;
root.appendChild((0,_dom_pages_home_js__WEBPACK_IMPORTED_MODULE_0__.createHomePage)());
const backButton = root.querySelector(".back-button");
const backIcon = new Image();
backIcon.src = _assets_chevron_left_svg__WEBPACK_IMPORTED_MODULE_1__;
backButton.appendChild(backIcon);
backButton.addEventListener("click", () => {
  const currentPage = root.querySelector(".page");
  const newPage = (0,_dom_pages_home_js__WEBPACK_IMPORTED_MODULE_0__.createHomePage)();
  if (newPage.classList[0] == currentPage.classList[0]) {
    return;
  }
  root.className = "";
  root.appendChild(newPage);
  currentPage.remove();
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUFBRTtJQUNwRDtFQUNGO0VBRUFvSSxJQUFJLENBQUMvRSxTQUFTLEdBQUcsRUFBRTtFQUVuQitFLElBQUksQ0FBQ2xHLFdBQVcsQ0FBQ3VHLE9BQU8sQ0FBQztFQUN6QkQsV0FBVyxDQUFDckYsTUFBTSxDQUFDLENBQUM7QUFDdEIsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9pbmRleC5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb3JlL2dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvcmUvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29yZS9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tL2JvYXJkcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbS9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tL3BhZ2VzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb20vcGFnZXMvaGVscC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbS9wYWdlcy9ob21lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCB7IGNyZWF0ZVNoaXAsIFNoaXBPcmllbnRhdGlvbiB9IGZyb20gXCIuL3NoaXAuanNcIjtcblxuZXhwb3J0IGNvbnN0IENlbGxTdGF0ZSA9IE9iamVjdC5mcmVlemUoe1xuICBFTVBUWTogMCxcbiAgTUlTUzogMSxcbiAgU0hJUDogMixcbiAgSElUOiAzLFxuICBTVU5LOiA0LFxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVHYW1lQm9hcmQoc2l6ZSkge1xuICBpZiAoc2l6ZSA8PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBib2FyZCBzaXplXCIpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzaXplLFxuICAgIGNlbGxzOiBBcnJheS5mcm9tKHsgbGVuZ3RoOiBzaXplIH0sICgpID0+XG4gICAgICBBcnJheS5mcm9tKHsgbGVuZ3RoOiBzaXplIH0sICgpID0+IENlbGxTdGF0ZS5FTVBUWSksXG4gICAgKSxcbiAgICBzaGlwczogW10sXG5cbiAgICByZXNldDogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5jZWxscyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IHNpemUgfSwgKCkgPT5cbiAgICAgICAgQXJyYXkuZnJvbSh7IGxlbmd0aDogc2l6ZSB9LCAoKSA9PiBDZWxsU3RhdGUuRU1QVFkpLFxuICAgICAgKTtcbiAgICAgIHRoaXMuc2hpcHMgPSBbXTtcbiAgICB9LFxuXG4gICAgcGxhY2VTaGlwOiBmdW5jdGlvbiAoc2hpcCkge1xuICAgICAgaWYgKFxuICAgICAgICBzaGlwLmNvb3JkaW5hdGVzWzBdIDwgMCB8fFxuICAgICAgICBzaGlwLmNvb3JkaW5hdGVzWzFdIDwgMCB8fFxuICAgICAgICBzaGlwLmNvb3JkaW5hdGVzWzBdID49IHNpemUgfHxcbiAgICAgICAgc2hpcC5jb29yZGluYXRlc1sxXSA+PSBzaXplXG4gICAgICApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IHBsYWNlIHNoaXAgb3V0c2lkZSB0aGUgYm9hcmRcIik7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwgJiZcbiAgICAgICAgICBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxID49IHNpemUpIHx8XG4gICAgICAgIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwgJiZcbiAgICAgICAgICBzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxID49IHNpemUpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwpIHtcbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMF07XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICBpZiAodGhpcy5jZWxsc1tzaGlwLmNvb3JkaW5hdGVzWzFdXVtpXSAhPT0gQ2VsbFN0YXRlLkVNUFRZKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1sxXTtcbiAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgaSsrXG4gICAgICAgICkge1xuICAgICAgICAgIGlmICh0aGlzLmNlbGxzW2ldW3NoaXAuY29vcmRpbmF0ZXNbMF1dICE9PSBDZWxsU3RhdGUuRU1QVFkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5zaGlwcy5wdXNoKHNoaXApO1xuXG4gICAgICBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwpIHtcbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMF07XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmNlbGxzW3NoaXAuY29vcmRpbmF0ZXNbMV1dW2ldID0gQ2VsbFN0YXRlLlNISVA7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMKSB7XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzFdO1xuICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1sxXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5jZWxsc1tpXVtzaGlwLmNvb3JkaW5hdGVzWzBdXSA9IENlbGxTdGF0ZS5TSElQO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICBtb3ZlU2hpcDogZnVuY3Rpb24gKHNoaXBJbmRleCwgY29vcmRpbmF0ZXMpIHtcbiAgICAgIGNvbnN0IHNoaXAgPSB0aGlzLnNoaXBzW3NoaXBJbmRleF07XG4gICAgICBpZiAoIXNoaXApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2hpcCBkb2VzIG5vdCBleGlzdFwiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMKSB7XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5jZWxsc1tzaGlwLmNvb3JkaW5hdGVzWzFdXVtpXSA9IENlbGxTdGF0ZS5FTVBUWTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwpIHtcbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMV07XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmNlbGxzW2ldW3NoaXAuY29vcmRpbmF0ZXNbMF1dID0gQ2VsbFN0YXRlLkVNUFRZO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgIXRoaXMucGxhY2VTaGlwKGNyZWF0ZVNoaXAoc2hpcC50eXBlLCBjb29yZGluYXRlcywgc2hpcC5vcmllbnRhdGlvbikpXG4gICAgICApIHtcbiAgICAgICAgaWYgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMKSB7XG4gICAgICAgICAgZm9yIChcbiAgICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1swXTtcbiAgICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGkrK1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5jZWxsc1tzaGlwLmNvb3JkaW5hdGVzWzFdXVtpXSA9IENlbGxTdGF0ZS5TSElQO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwpIHtcbiAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzFdO1xuICAgICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgICAgaSsrXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmNlbGxzW2ldW3NoaXAuY29vcmRpbmF0ZXNbMF1dID0gQ2VsbFN0YXRlLlNISVA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zaGlwc1tzaGlwSW5kZXhdID0gdGhpcy5zaGlwcy5wb3AoKTtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIHJvdGF0ZVNoaXA6IGZ1bmN0aW9uIChzaGlwSW5kZXgpIHtcbiAgICAgIGNvbnN0IHNoaXAgPSB0aGlzLnNoaXBzW3NoaXBJbmRleF07XG4gICAgICBpZiAoIXNoaXApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2hpcCBkb2VzIG5vdCBleGlzdFwiKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbmV3T3JpZW50YXRpb24gPVxuICAgICAgICBzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTFxuICAgICAgICAgID8gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMXG4gICAgICAgICAgOiBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTDtcblxuICAgICAgaWYgKG5ld09yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCkge1xuICAgICAgICBpZiAoc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMSA+PSB0aGlzLnNpemUpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1swXSArIDE7XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICBpZiAodGhpcy5jZWxsc1tzaGlwLmNvb3JkaW5hdGVzWzFdXVtpXSAhPT0gQ2VsbFN0YXRlLkVNUFRZKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKG5ld09yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwpIHtcbiAgICAgICAgaWYgKHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDEgPj0gdGhpcy5zaXplKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyAxO1xuICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1sxXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKHRoaXMuY2VsbHNbaV1bc2hpcC5jb29yZGluYXRlc1swXV0gIT09IENlbGxTdGF0ZS5FTVBUWSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobmV3T3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMKSB7XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzFdO1xuICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1sxXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5jZWxsc1tpXVtzaGlwLmNvb3JkaW5hdGVzWzBdXSA9IENlbGxTdGF0ZS5FTVBUWTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1swXTtcbiAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMF0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgaSsrXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuY2VsbHNbc2hpcC5jb29yZGluYXRlc1sxXV1baV0gPSBDZWxsU3RhdGUuU0hJUDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChuZXdPcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMKSB7XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5jZWxsc1tzaGlwLmNvb3JkaW5hdGVzWzFdXVtpXSA9IENlbGxTdGF0ZS5FTVBUWTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1sxXTtcbiAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgaSsrXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuY2VsbHNbaV1bc2hpcC5jb29yZGluYXRlc1swXV0gPSBDZWxsU3RhdGUuU0hJUDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzaGlwLm9yaWVudGF0aW9uID0gbmV3T3JpZW50YXRpb247XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuXG4gICAgZ2V0U2hpcEluZGV4OiBmdW5jdGlvbiAoY29vcmRpbmF0ZXMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5zaGlwc1tpXS5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwpIHtcbiAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgbGV0IGogPSB0aGlzLnNoaXBzW2ldLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgICAgICAgaiA8PSB0aGlzLnNoaXBzW2ldLmNvb3JkaW5hdGVzWzBdICsgdGhpcy5zaGlwc1tpXS5sZW5ndGggLSAxO1xuICAgICAgICAgICAgaisrXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGNvb3JkaW5hdGVzWzBdID09PSBqICYmXG4gICAgICAgICAgICAgIGNvb3JkaW5hdGVzWzFdID09PSB0aGlzLnNoaXBzW2ldLmNvb3JkaW5hdGVzWzFdXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2hpcHNbaV0ub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICBsZXQgaiA9IHRoaXMuc2hpcHNbaV0uY29vcmRpbmF0ZXNbMV07XG4gICAgICAgICAgICBqIDw9IHRoaXMuc2hpcHNbaV0uY29vcmRpbmF0ZXNbMV0gKyB0aGlzLnNoaXBzW2ldLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBqKytcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgY29vcmRpbmF0ZXNbMF0gPT09IHRoaXMuc2hpcHNbaV0uY29vcmRpbmF0ZXNbMF0gJiZcbiAgICAgICAgICAgICAgY29vcmRpbmF0ZXNbMV0gPT09IGpcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgTm8gc2hpcCBmb3VuZCBhdCBnaXZlbiBpbmRleDogWyR7Y29vcmRpbmF0ZXNbMF19LCAke2Nvb3JkaW5hdGVzWzFdfV1gLFxuICAgICAgKTtcbiAgICB9LFxuXG4gICAgcmVjZWl2ZUF0dGFjazogZnVuY3Rpb24gKGNvb3JkaW5hdGVzKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGNvb3JkaW5hdGVzWzBdIDwgMCB8fFxuICAgICAgICBjb29yZGluYXRlc1sxXSA8IDAgfHxcbiAgICAgICAgY29vcmRpbmF0ZXNbMF0gPj0gc2l6ZSB8fFxuICAgICAgICBjb29yZGluYXRlc1sxXSA+PSBzaXplXG4gICAgICApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGF0dGFjayBvdXRzaWRlIHRoZSBib2FyZFwiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICB0aGlzLmNlbGxzW2Nvb3JkaW5hdGVzWzFdXVtjb29yZGluYXRlc1swXV0gIT09IENlbGxTdGF0ZS5FTVBUWSAmJlxuICAgICAgICB0aGlzLmNlbGxzW2Nvb3JkaW5hdGVzWzFdXVtjb29yZGluYXRlc1swXV0gIT09IENlbGxTdGF0ZS5TSElQXG4gICAgICApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2VsbCBoYXMgYWxyZWFkeSBiZWVuIGF0dGFja2VkXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5jZWxsc1tjb29yZGluYXRlc1sxXV1bY29vcmRpbmF0ZXNbMF1dICE9PSBDZWxsU3RhdGUuU0hJUCkge1xuICAgICAgICB0aGlzLmNlbGxzW2Nvb3JkaW5hdGVzWzFdXVtjb29yZGluYXRlc1swXV0gPSBDZWxsU3RhdGUuTUlTUztcbiAgICAgICAgcmV0dXJuIHsgcmVzdWx0OiBDZWxsU3RhdGUuTUlTUywgc2hpcDogdW5kZWZpbmVkIH07XG4gICAgICB9XG5cbiAgICAgIGZvciAoY29uc3Qgc2hpcCBvZiB0aGlzLnNoaXBzKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwgJiZcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzWzFdID09PSBzaGlwLmNvb3JkaW5hdGVzWzFdICYmXG4gICAgICAgICAgICBjb29yZGluYXRlc1swXSA+PSBzaGlwLmNvb3JkaW5hdGVzWzBdICYmXG4gICAgICAgICAgICBjb29yZGluYXRlc1swXSA8PSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxKSB8fFxuICAgICAgICAgIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwgJiZcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzWzBdID09PSBzaGlwLmNvb3JkaW5hdGVzWzBdICYmXG4gICAgICAgICAgICBjb29yZGluYXRlc1sxXSA+PSBzaGlwLmNvb3JkaW5hdGVzWzFdICYmXG4gICAgICAgICAgICBjb29yZGluYXRlc1sxXSA8PSBzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxKVxuICAgICAgICApIHtcbiAgICAgICAgICBzaGlwLmhpdCgpO1xuXG4gICAgICAgICAgaWYgKHNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgICAgIGlmIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCkge1xuICAgICAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1swXTtcbiAgICAgICAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMF0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgaSsrXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2VsbHNbc2hpcC5jb29yZGluYXRlc1sxXV1baV0gPSBDZWxsU3RhdGUuU1VOSztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwpIHtcbiAgICAgICAgICAgICAgZm9yIChcbiAgICAgICAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMV07XG4gICAgICAgICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgIGkrK1xuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW2ldW3NoaXAuY29vcmRpbmF0ZXNbMF1dID0gQ2VsbFN0YXRlLlNVTks7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jZWxsc1tjb29yZGluYXRlc1sxXV1bY29vcmRpbmF0ZXNbMF1dID0gQ2VsbFN0YXRlLkhJVDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4geyByZXN1bHQ6IHRoaXMuY2VsbHNbY29vcmRpbmF0ZXNbMV1dW2Nvb3JkaW5hdGVzWzBdXSwgc2hpcCB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGlzRmxlZXREZXN0cm95ZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGZvciAoY29uc3Qgc2hpcCBvZiB0aGlzLnNoaXBzKSB7XG4gICAgICAgIGlmICghc2hpcC5pc1N1bmsoKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICB9O1xufVxuIiwiaW1wb3J0IHsgY3JlYXRlR2FtZUJvYXJkIH0gZnJvbSBcIi4vZ2FtZUJvYXJkLmpzXCI7XG5cbmV4cG9ydCBjb25zdCBQbGF5ZXJUeXBlID0gT2JqZWN0LmZyZWV6ZSh7XG4gIEhVTUFOOiBcIkhVTUFOXCIsXG4gIENPTVBVVEVSOiBcIkNPTVBVVEVSXCIsXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBsYXllcihuYW1lLCB0eXBlLCBib2FyZFNpemUpIHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lLFxuICAgIHR5cGUsXG4gICAgYm9hcmQ6IGNyZWF0ZUdhbWVCb2FyZChib2FyZFNpemUpLFxuICB9O1xufVxuIiwiZXhwb3J0IGNvbnN0IFNoaXBUeXBlID0gT2JqZWN0LmZyZWV6ZSh7XG4gIENBUlJJRVI6IFwiQ2FycmllclwiLFxuICBCQVRUTEVTSElQOiBcIkJhdHRsZXNoaXBcIixcbiAgREVTVFJPWUVSOiBcIkRlc3Ryb3llclwiLFxuICBTVUJNQVJJTkU6IFwiU3VibWFyaW5lXCIsXG4gIFBBVFJPTDogXCJQYXRyb2wgQm9hdFwiLFxufSk7XG5cbmV4cG9ydCBjb25zdCBTaGlwT3JpZW50YXRpb24gPSBPYmplY3QuZnJlZXplKHtcbiAgSE9SSVpPTlRBTDogXCJIT1JJWk9OVEFMXCIsXG4gIFZFUlRJQ0FMOiBcIlZFUlRJQ0FMXCIsXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNoaXBMZW5ndGgodHlwZSkge1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlIFNoaXBUeXBlLkNBUlJJRVI6XG4gICAgICByZXR1cm4gNTtcbiAgICBjYXNlIFNoaXBUeXBlLkJBVFRMRVNISVA6XG4gICAgICByZXR1cm4gNDtcbiAgICBjYXNlIFNoaXBUeXBlLkRFU1RST1lFUjpcbiAgICAgIHJldHVybiAzO1xuICAgIGNhc2UgU2hpcFR5cGUuU1VCTUFSSU5FOlxuICAgICAgcmV0dXJuIDM7XG4gICAgY2FzZSBTaGlwVHlwZS5QQVRST0w6XG4gICAgICByZXR1cm4gMjtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2hpcChcbiAgdHlwZSxcbiAgY29vcmRpbmF0ZXMgPSBbdW5kZWZpbmVkLCB1bmRlZmluZWRdLFxuICBvcmllbnRhdGlvbiA9IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMLFxuKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogdHlwZSxcbiAgICBsZW5ndGg6IGdldFNoaXBMZW5ndGgodHlwZSksXG4gICAgY29vcmRpbmF0ZXMsXG4gICAgb3JpZW50YXRpb24sXG4gICAgaGl0czogMCxcblxuICAgIGhpdDogZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRoaXMuaGl0cyA8IHRoaXMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuaGl0cysrO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBpc1N1bms6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmhpdHMgPT09IHRoaXMubGVuZ3RoO1xuICAgIH0sXG4gIH07XG59XG4iLCJpbXBvcnQgeyBDZWxsU3RhdGUgfSBmcm9tIFwiLi4vY29yZS9nYW1lQm9hcmQuanNcIjtcbmltcG9ydCB7IFBsYXllclR5cGUgfSBmcm9tIFwiLi4vY29yZS9wbGF5ZXIuanNcIjtcbmltcG9ydCB7XG4gIGNyZWF0ZVNoaXAsXG4gIGdldFNoaXBMZW5ndGgsXG4gIFNoaXBPcmllbnRhdGlvbixcbiAgU2hpcFR5cGUsXG59IGZyb20gXCIuLi9jb3JlL3NoaXAuanNcIjtcblxuaW1wb3J0IHJlZnJlc2hTdmcgZnJvbSBcIi4uLy4uL2Fzc2V0cy9yZWZyZXNoLWNjdy5zdmdcIjtcbmltcG9ydCBlZGl0U3ZnIGZyb20gXCIuLi8uLi9hc3NldHMvZWRpdC5zdmdcIjtcbmltcG9ydCBzYXZlU3ZnIGZyb20gXCIuLi8uLi9hc3NldHMvc2F2ZS5zdmdcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwR2FtZUJvYXJkcyhnYW1lLCBwbGF5ZXJPbmUsIHBsYXllclR3bykge1xuICBjb25zdCBib2FyZE9uZSA9IGNyZWF0ZUJvYXJkQ29tcG9uZW50KFxuICAgIHBsYXllck9uZS5ib2FyZCxcbiAgICBwbGF5ZXJPbmUsXG4gICAgcGxheWVyVHdvLnR5cGUgIT09IFBsYXllclR5cGUuQ09NUFVURVIsXG4gICAgcGxheWVyT25lLnR5cGUgPT09IFBsYXllclR5cGUuSFVNQU4sXG4gICAgZ2FtZSxcbiAgKTtcbiAgYm9hcmRPbmUucmFuZG9taXplRm9ybWF0aW9uKCk7XG5cbiAgYm9hcmRPbmUuY29tcG9uZW50LmNsYXNzTGlzdC5hZGQoXG4gICAgXCJwbGF5ZXItb25lXCIsXG4gICAgcGxheWVyT25lLnR5cGUgPT09IFBsYXllclR5cGUuSFVNQU4gPyBcImh1bWFuXCIgOiBcImNvbXB1dGVyXCIsXG4gICk7XG4gIGlmIChwbGF5ZXJUd28udHlwZSA9PT0gUGxheWVyVHlwZS5DT01QVVRFUikge1xuICAgIGJvYXJkT25lLmNvbXBvbmVudC5jbGFzc0xpc3QuYWRkKFwib25seS1odW1hblwiKTtcbiAgfVxuICBib2FyZE9uZS5jb21wb25lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGJvYXJkT25lLmNsZWFyKCksIHRydWUpO1xuXG4gIGNvbnN0IGJvYXJkVHdvID0gY3JlYXRlQm9hcmRDb21wb25lbnQoXG4gICAgcGxheWVyVHdvLmJvYXJkLFxuICAgIHBsYXllclR3byxcbiAgICBwbGF5ZXJPbmUudHlwZSAhPT0gUGxheWVyVHlwZS5DT01QVVRFUixcbiAgICBwbGF5ZXJUd28udHlwZSA9PT0gUGxheWVyVHlwZS5IVU1BTixcbiAgICBnYW1lLFxuICApO1xuICBib2FyZFR3by5yYW5kb21pemVGb3JtYXRpb24oKTtcblxuICBib2FyZFR3by5jb21wb25lbnQuY2xhc3NMaXN0LmFkZChcbiAgICBcInBsYXllci10d29cIixcbiAgICBwbGF5ZXJUd28udHlwZSA9PT0gUGxheWVyVHlwZS5IVU1BTiA/IFwiaHVtYW5cIiA6IFwiY29tcHV0ZXJcIixcbiAgKTtcblxuICBbYm9hcmRPbmUsIGJvYXJkVHdvXS5mb3JFYWNoKChET01Cb2FyZCwgYm9hcmRJbmRleCkgPT4ge1xuICAgIEFycmF5LmZyb20oRE9NQm9hcmQuY29tcG9uZW50LmNoaWxkcmVuWzFdLmNoaWxkcmVuKS5mb3JFYWNoKChyb3csIGkpID0+IHtcbiAgICAgIEFycmF5LmZyb20ocm93LmNoaWxkcmVuKS5mb3JFYWNoKChjZWxsLCBqKSA9PiB7XG4gICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBET01Cb2FyZC5lZGl0aW5nICYmXG4gICAgICAgICAgICBET01Cb2FyZC5pc011dGFibGUoKSAmJlxuICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJzaGlwXCIpICYmXG4gICAgICAgICAgICAhZ2FtZS5pc0luUHJvZ3Jlc3NcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIERPTUJvYXJkLnRvZ2dsZVNoaXBNb3Rpb24oW2osIGldKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgRE9NQm9hcmQuaXNBdHRhY2thYmxlKCkgJiZcbiAgICAgICAgICAgIERPTUJvYXJkLmFjdGl2ZSAmJlxuICAgICAgICAgICAgZ2FtZS5pc0luUHJvZ3Jlc3MgJiZcbiAgICAgICAgICAgICFnYW1lLmlzR2FtZU92ZXIgJiZcbiAgICAgICAgICAgIGdhbWUuaXNQbGF5ZXJXYWl0aW5nXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zdCBhdHRhY2sgPSBET01Cb2FyZC5yZWNlaXZlQXR0YWNrKFtqLCBpXSk7XG4gICAgICAgICAgICBpZiAoYXR0YWNrKSB7XG4gICAgICAgICAgICAgIGdhbWUudXBkYXRlQXR0YWNrSW5mbyhcbiAgICAgICAgICAgICAgICBhdHRhY2sucmVzdWx0LFxuICAgICAgICAgICAgICAgIGF0dGFjay5zaGlwLFxuICAgICAgICAgICAgICAgIChib2FyZEluZGV4ICsgMSkgJSAyLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBnYW1lLmlzUGxheWVyV2FpdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiY29udGV4dG1lbnVcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIURPTUJvYXJkLmVkaXRpbmcgfHxcbiAgICAgICAgICAgICFET01Cb2FyZC5pc011dGFibGUoKSB8fFxuICAgICAgICAgICAgZ2FtZS5pc0luUHJvZ3Jlc3MgfHxcbiAgICAgICAgICAgICFjZWxsLmNsYXNzTGlzdC5jb250YWlucyhcInNoaXBcIilcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBzaGlwSW5kZXggPSBET01Cb2FyZC5ib2FyZC5nZXRTaGlwSW5kZXgoW2osIGldKTtcbiAgICAgICAgICBjb25zdCBzaGlwID0gRE9NQm9hcmQuYm9hcmQuc2hpcHNbc2hpcEluZGV4XTtcblxuICAgICAgICAgIGlmICghY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb3ZpbmdcIikpIHtcbiAgICAgICAgICAgIERPTUJvYXJkLnRvZ2dsZVNoaXBNb3Rpb24oc2hpcC5jb29yZGluYXRlcyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKERPTUJvYXJkLmJvYXJkLnJvdGF0ZVNoaXAoc2hpcEluZGV4KSkge1xuICAgICAgICAgICAgRE9NQm9hcmQuY2xlYXIoKTtcbiAgICAgICAgICAgIERPTUJvYXJkLnRvZ2dsZVNoaXBNb3Rpb24oc2hpcC5jb29yZGluYXRlcyk7XG4gICAgICAgICAgICBET01Cb2FyZC5yZW5kZXIoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZXZlbnQpID0+IHtcbiAgICBpZiAoYm9hcmRPbmUuZWRpdGluZykgYm9hcmRPbmUubW92ZVNoaXAoZXZlbnQua2V5KTtcbiAgICBlbHNlIGlmIChib2FyZFR3by5lZGl0aW5nKSBib2FyZFR3by5tb3ZlU2hpcChldmVudC5rZXkpO1xuICB9KTtcblxuICByZXR1cm4gW2JvYXJkT25lLCBib2FyZFR3b107XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVCb2FyZENvbXBvbmVudChib2FyZCwgcGxheWVyLCBhdHRhY2thYmxlLCBtdXRhYmxlLCBnYW1lKSB7XG4gIGNvbnN0IGJvYXJkQ29tcG9uZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgYm9hcmRDb21wb25lbnQuY2xhc3NMaXN0LmFkZChcImJvYXJkXCIpO1xuXG4gIGNvbnN0IGJvYXJkSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIik7XG4gIGJvYXJkSGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJib2FyZC1oZWFkZXJcIik7XG4gIGJvYXJkSGVhZGVyLmlubmVySFRNTCA9IGBcbiAgICA8cCBjbGFzcz1cInBsYXllci1uYW1lXCI+JHtwbGF5ZXIubmFtZX08L3A+XG4gICAgPGlucHV0IGNsYXNzPVwicGxheWVyLW5hbWUtaW5wdXQgaGlkZGVuXCIgdHlwZT1cInRleHRcIiByZXF1aXJlZCB2YWx1ZT1cIiR7cGxheWVyLm5hbWV9XCIgLz5cbiAgYDtcbiAgYm9hcmRDb21wb25lbnQuYXBwZW5kQ2hpbGQoYm9hcmRIZWFkZXIpO1xuXG4gIGxldCByYW5kb21pemVCdXR0b24sIGVkaXRCdXR0b24sIHNhdmVCdXR0b247XG4gIGlmIChwbGF5ZXIudHlwZSA9PT0gUGxheWVyVHlwZS5IVU1BTikge1xuICAgIHJhbmRvbWl6ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgcmFuZG9taXplQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJyYW5kb21pemUtYm9hcmRcIik7XG4gICAgcmFuZG9taXplQnV0dG9uLnRpdGxlID0gXCJSYW5kb21pemUgc2hpcCBwbGFjZW1lbnRcIjtcbiAgICByYW5kb21pemVCdXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XG4gICAgY29uc3QgcmVmcmVzaEljb24gPSBuZXcgSW1hZ2UoKTtcbiAgICByZWZyZXNoSWNvbi5zcmMgPSByZWZyZXNoU3ZnO1xuICAgIHJhbmRvbWl6ZUJ1dHRvbi5hcHBlbmRDaGlsZChyZWZyZXNoSWNvbik7XG5cbiAgICBlZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBlZGl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJlZGl0LWJvYXJkXCIpO1xuICAgIGVkaXRCdXR0b24udGl0bGUgPSBcIkVkaXQgYm9hcmQgKGNoYW5nZSBuYW1lLCBtb3ZlIHNoaXBzKVwiO1xuICAgIGVkaXRCdXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XG4gICAgY29uc3QgZWRpdEljb24gPSBuZXcgSW1hZ2UoKTtcbiAgICBlZGl0SWNvbi5zcmMgPSBlZGl0U3ZnO1xuICAgIGVkaXRCdXR0b24uYXBwZW5kQ2hpbGQoZWRpdEljb24pO1xuXG4gICAgc2F2ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgc2F2ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwic2F2ZS1ib2FyZFwiLCBcImhpZGRlblwiKTtcbiAgICBzYXZlQnV0dG9uLnRpdGxlID0gXCJTYXZlIGJvYXJkXCI7XG4gICAgc2F2ZUJ1dHRvbi50eXBlID0gXCJidXR0b25cIjtcbiAgICBjb25zdCBzYXZlSWNvbiA9IG5ldyBJbWFnZSgpO1xuICAgIHNhdmVJY29uLnNyYyA9IHNhdmVTdmc7XG4gICAgc2F2ZUJ1dHRvbi5hcHBlbmRDaGlsZChzYXZlSWNvbik7XG5cbiAgICBjb25zdCBib2FyZENvbnRyb2xzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBib2FyZENvbnRyb2xzLmNsYXNzTGlzdC5hZGQoXCJib2FyZC1jb250cm9sc1wiKTtcbiAgICBib2FyZENvbnRyb2xzLmFwcGVuZENoaWxkKHJhbmRvbWl6ZUJ1dHRvbik7XG4gICAgYm9hcmRDb250cm9scy5hcHBlbmRDaGlsZChlZGl0QnV0dG9uKTtcbiAgICBib2FyZENvbnRyb2xzLmFwcGVuZENoaWxkKHNhdmVCdXR0b24pO1xuICAgIGJvYXJkSGVhZGVyLmFwcGVuZENoaWxkKGJvYXJkQ29udHJvbHMpO1xuICB9XG5cbiAgY29uc3QgYm9hcmRDZWxscyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGJvYXJkQ2VsbHMuY2xhc3NMaXN0LmFkZChcImJvYXJkLWNlbGxzXCIpO1xuICBib2FyZENvbXBvbmVudC5hcHBlbmRDaGlsZChib2FyZENlbGxzKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGJvYXJkLmNlbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qgcm93Q29tcG9uZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICByb3dDb21wb25lbnQuY2xhc3NMaXN0LmFkZChcInJvd1wiKTtcblxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgYm9hcmQuY2VsbHNbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgIGNvbnN0IGNlbGxDb21wb25lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgY2VsbENvbXBvbmVudC5jbGFzc0xpc3QuYWRkKFwiY2VsbFwiKTtcbiAgICAgIGNlbGxDb21wb25lbnQuY2xhc3NMaXN0LmFkZChnZXRDZWxsQ2xhc3NOYW1lKFtqLCBpXSwgYm9hcmQpKTtcbiAgICAgIHJvd0NvbXBvbmVudC5hcHBlbmRDaGlsZChjZWxsQ29tcG9uZW50KTtcbiAgICB9XG5cbiAgICBib2FyZENlbGxzLmFwcGVuZENoaWxkKHJvd0NvbXBvbmVudCk7XG4gIH1cblxuICBjb25zdCBET01Cb2FyZCA9IHtcbiAgICBjb21wb25lbnQ6IGJvYXJkQ29tcG9uZW50LFxuICAgIGJvYXJkOiBib2FyZCxcbiAgICBhY3RpdmU6IGZhbHNlLFxuICAgIGVkaXRpbmc6IGZhbHNlLFxuXG4gICAgaXNBdHRhY2thYmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gYXR0YWNrYWJsZTtcbiAgICB9LFxuXG4gICAgaXNNdXRhYmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbXV0YWJsZTtcbiAgICB9LFxuXG4gICAgY2xlYXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IG1vdmluZ0NlbGxzID1cbiAgICAgICAgdGhpcy5jb21wb25lbnQuY2hpbGRyZW5bMV0ucXVlcnlTZWxlY3RvckFsbChcIi5tb3ZpbmdcIik7XG4gICAgICBpZiAobW92aW5nQ2VsbHMubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICBmb3IgKGNvbnN0IGNlbGwgb2YgbW92aW5nQ2VsbHMpIHtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKFwibW92aW5nXCIpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIEFycmF5LmZyb20odGhpcy5jb21wb25lbnQuY2hpbGRyZW5bMV0uY2hpbGRyZW4pLmZvckVhY2goKHJvdywgaSkgPT4ge1xuICAgICAgICBBcnJheS5mcm9tKHJvdy5jaGlsZHJlbikuZm9yRWFjaCgoY2VsbCwgaikgPT4ge1xuICAgICAgICAgIGNvbnN0IGlzTW92aW5nID0gY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb3ZpbmdcIik7XG5cbiAgICAgICAgICBjZWxsLmNsYXNzTmFtZSA9IFwiY2VsbFwiO1xuICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChnZXRDZWxsQ2xhc3NOYW1lKFtqLCBpXSwgdGhpcy5ib2FyZCkpO1xuICAgICAgICAgIGlmIChpc01vdmluZykgY2VsbC5jbGFzc0xpc3QuYWRkKFwibW92aW5nXCIpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICByYW5kb21pemVGb3JtYXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgIHRoaXMuYm9hcmQucmVzZXQoKTtcblxuICAgICAgZm9yIChjb25zdCB0eXBlIG9mIE9iamVjdC5rZXlzKFNoaXBUeXBlKSkge1xuICAgICAgICBjb25zdCBzaGlwTGVuZ3RoID0gZ2V0U2hpcExlbmd0aChTaGlwVHlwZVt0eXBlXSk7XG5cbiAgICAgICAgbGV0IHBsYWNlZCA9IGZhbHNlO1xuICAgICAgICB3aGlsZSAoIXBsYWNlZCkge1xuICAgICAgICAgIGNvbnN0IG9yaWVudGF0aW9uID1cbiAgICAgICAgICAgIE1hdGgucmFuZG9tKCkgPiAwLjVcbiAgICAgICAgICAgICAgPyBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTFxuICAgICAgICAgICAgICA6IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTDtcblxuICAgICAgICAgIGNvbnN0IHggPSBNYXRoLmZsb29yKFxuICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqXG4gICAgICAgICAgICAgICgxMCAtXG4gICAgICAgICAgICAgICAgKG9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCA/IHNoaXBMZW5ndGggOiAwKSksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihcbiAgICAgICAgICAgIE1hdGgucmFuZG9tKCkgKlxuICAgICAgICAgICAgICAoMTAgLVxuICAgICAgICAgICAgICAgIChvcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMID8gc2hpcExlbmd0aCA6IDApKSxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgcGxhY2VkID0gdGhpcy5ib2FyZC5wbGFjZVNoaXAoXG4gICAgICAgICAgICBjcmVhdGVTaGlwKFNoaXBUeXBlW3R5cGVdLCBbeCwgeV0sIG9yaWVudGF0aW9uKSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfSxcblxuICAgIHRvZ2dsZVNoaXBNb3Rpb246IGZ1bmN0aW9uIChjb29yZGluYXRlcykge1xuICAgICAgY29uc3QgY2VsbCA9XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmNoaWxkcmVuWzFdLmNoaWxkcmVuW2Nvb3JkaW5hdGVzWzFdXS5jaGlsZHJlbltcbiAgICAgICAgICBjb29yZGluYXRlc1swXVxuICAgICAgICBdO1xuXG4gICAgICBpZiAoIWNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hpcFwiKSkgcmV0dXJuO1xuXG4gICAgICBjb25zdCBzaGlwSW5kZXggPSB0aGlzLmJvYXJkLmdldFNoaXBJbmRleChjb29yZGluYXRlcyk7XG4gICAgICBsZXQgc2hpcCA9IHRoaXMuYm9hcmQuc2hpcHNbc2hpcEluZGV4XTtcblxuICAgICAgc3dpdGNoIChzaGlwLm9yaWVudGF0aW9uKSB7XG4gICAgICAgIGNhc2UgU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUw6XG4gICAgICAgICAgZm9yIChcbiAgICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1swXTtcbiAgICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGkrK1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuY2hpbGRyZW5bMV0uY2hpbGRyZW5bc2hpcC5jb29yZGluYXRlc1sxXV0uY2hpbGRyZW5bXG4gICAgICAgICAgICAgIGlcbiAgICAgICAgICAgIF0uY2xhc3NMaXN0LnRvZ2dsZShcIm1vdmluZ1wiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMOlxuICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMV07XG4gICAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBpKytcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmNoaWxkcmVuWzFdLmNoaWxkcmVuW2ldLmNoaWxkcmVuW1xuICAgICAgICAgICAgICBzaGlwLmNvb3JkaW5hdGVzWzBdXG4gICAgICAgICAgICBdLmNsYXNzTGlzdC50b2dnbGUoXCJtb3ZpbmdcIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBtb3ZlU2hpcDogZnVuY3Rpb24gKGtleSkge1xuICAgICAgY29uc3QgbW92aW5nU2hpcENlbGwgPVxuICAgICAgICB0aGlzLmNvbXBvbmVudC5jaGlsZHJlblsxXS5xdWVyeVNlbGVjdG9yKFwiLm1vdmluZ1wiKTtcblxuICAgICAgaWYgKCFtb3ZpbmdTaGlwQ2VsbCkgcmV0dXJuO1xuXG4gICAgICBjb25zdCBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXMgPSBnZXRDZWxsSW5kZXgobW92aW5nU2hpcENlbGwpO1xuICAgICAgY29uc3QgbW92aW5nU2hpcEluZGV4ID0gdGhpcy5ib2FyZC5nZXRTaGlwSW5kZXgobW92aW5nU2hpcENvb3JkaW5hdGVzKTtcblxuICAgICAgdGhpcy50b2dnbGVTaGlwTW90aW9uKG1vdmluZ1NoaXBDb29yZGluYXRlcyk7XG5cbiAgICAgIGxldCBtb3ZlU3VjY2Vzc2Z1bCA9IGZhbHNlO1xuICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgY2FzZSBcIkFycm93VXBcIjpcbiAgICAgICAgICBpZiAobW92aW5nU2hpcENvb3JkaW5hdGVzWzFdIDw9IDApIGJyZWFrO1xuICAgICAgICAgIG1vdmVTdWNjZXNzZnVsID0gdGhpcy5ib2FyZC5tb3ZlU2hpcChtb3ZpbmdTaGlwSW5kZXgsIFtcbiAgICAgICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlc1swXSxcbiAgICAgICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlc1sxXSAtIDEsXG4gICAgICAgICAgXSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd0xlZnRcIjpcbiAgICAgICAgICBpZiAobW92aW5nU2hpcENvb3JkaW5hdGVzWzBdIDw9IDApIGJyZWFrO1xuICAgICAgICAgIG1vdmVTdWNjZXNzZnVsID0gdGhpcy5ib2FyZC5tb3ZlU2hpcChtb3ZpbmdTaGlwSW5kZXgsIFtcbiAgICAgICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlc1swXSAtIDEsXG4gICAgICAgICAgICBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMV0sXG4gICAgICAgICAgXSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd0Rvd25cIjpcbiAgICAgICAgICBpZiAobW92aW5nU2hpcENvb3JkaW5hdGVzWzFdID49IHRoaXMuYm9hcmQuc2l6ZSAtIDEpIGJyZWFrO1xuICAgICAgICAgIG1vdmVTdWNjZXNzZnVsID0gdGhpcy5ib2FyZC5tb3ZlU2hpcChtb3ZpbmdTaGlwSW5kZXgsIFtcbiAgICAgICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlc1swXSxcbiAgICAgICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlc1sxXSArIDEsXG4gICAgICAgICAgXSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd1JpZ2h0XCI6XG4gICAgICAgICAgaWYgKG1vdmluZ1NoaXBDb29yZGluYXRlc1swXSA+PSB0aGlzLmJvYXJkLnNpemUgLSAxKSBicmVhaztcbiAgICAgICAgICBtb3ZlU3VjY2Vzc2Z1bCA9IHRoaXMuYm9hcmQubW92ZVNoaXAobW92aW5nU2hpcEluZGV4LCBbXG4gICAgICAgICAgICBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMF0gKyAxLFxuICAgICAgICAgICAgbW92aW5nU2hpcENvb3JkaW5hdGVzWzFdLFxuICAgICAgICAgIF0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBpZiAoIW1vdmVTdWNjZXNzZnVsKSB7XG4gICAgICAgIHRoaXMudG9nZ2xlU2hpcE1vdGlvbihtb3ZpbmdTaGlwQ29vcmRpbmF0ZXMpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgICAgIGNvbnN0IG1vdmVkU2hpcCA9IHRoaXMuYm9hcmQuc2hpcHNbbW92aW5nU2hpcEluZGV4XTtcbiAgICAgIHRoaXMudG9nZ2xlU2hpcE1vdGlvbihtb3ZlZFNoaXAuY29vcmRpbmF0ZXMpO1xuICAgIH0sXG5cbiAgICByZWNlaXZlQXR0YWNrOiBmdW5jdGlvbiAoY29vcmRpbmF0ZXMpIHtcbiAgICAgIGNvbnN0IGNlbGwgPSBib2FyZC5jZWxsc1tjb29yZGluYXRlc1sxXV1bY29vcmRpbmF0ZXNbMF1dO1xuICAgICAgaWYgKGNlbGwgIT09IENlbGxTdGF0ZS5FTVBUWSAmJiBjZWxsICE9PSBDZWxsU3RhdGUuU0hJUCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlc3VsdCA9IGJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpO1xuICAgICAgdGhpcy5yZW5kZXIoKTtcblxuICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuXG4gICAgY29tcHV0ZXJBdHRhY2s6IGFzeW5jIGZ1bmN0aW9uIChhdHRhY2tlckluZGV4KSB7XG4gICAgICBsZXQgeCwgeTtcblxuICAgICAgbGV0IHZhbGlkID0gZmFsc2U7XG4gICAgICB3aGlsZSAoIXZhbGlkKSB7XG4gICAgICAgIHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBib2FyZC5zaXplKTtcbiAgICAgICAgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGJvYXJkLnNpemUpO1xuXG4gICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmNvbXBvbmVudC5jaGlsZHJlblsxXS5jaGlsZHJlblt5XS5jaGlsZHJlblt4XTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZW1wdHlcIikgfHxcbiAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5jb250YWlucyhcInNoaXBcIilcbiAgICAgICAgKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHIpID0+IHNldFRpbWVvdXQociwgNTAwKSk7XG5cbiAgICAgIGNvbnN0IGF0dGFjayA9IHRoaXMucmVjZWl2ZUF0dGFjayhbeCwgeV0pO1xuICAgICAgZ2FtZS51cGRhdGVBdHRhY2tJbmZvKGF0dGFjay5yZXN1bHQsIGF0dGFjay5zaGlwLCBhdHRhY2tlckluZGV4KTtcbiAgICB9LFxuICB9O1xuXG4gIGZ1bmN0aW9uIHNhdmVFZGl0cygpIHtcbiAgICBpZiAoIURPTUJvYXJkLmNvbXBvbmVudC5jaGlsZHJlblswXS5yZXBvcnRWYWxpZGl0eSgpKSByZXR1cm47XG4gICAgYm9hcmRIZWFkZXIucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItbmFtZVwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgIGJvYXJkSGVhZGVyLnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLW5hbWUtaW5wdXRcIikuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICBib2FyZEhlYWRlci5xdWVyeVNlbGVjdG9yKFwiLmVkaXQtYm9hcmRcIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICBzYXZlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG5cbiAgICBET01Cb2FyZC5lZGl0aW5nID0gZmFsc2U7XG4gICAgRE9NQm9hcmQuY29tcG9uZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJlZGl0aW5nXCIpO1xuICAgIERPTUJvYXJkLmNsZWFyKCk7XG4gIH1cblxuICBpZiAocGxheWVyLnR5cGUgPT09IFBsYXllclR5cGUuSFVNQU4pIHtcbiAgICByYW5kb21pemVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIERPTUJvYXJkLnJhbmRvbWl6ZUZvcm1hdGlvbigpO1xuICAgIH0pO1xuXG4gICAgZWRpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZWRpdGluZ1wiKSkge1xuICAgICAgICBhbGVydChcIlBsZWFzZSBzYXZlIHRoZSBjdXJyZW50bHkgZWRpdGluZyBib2FyZCBmaXJzdFwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBib2FyZEhlYWRlciA9IERPTUJvYXJkLmNvbXBvbmVudC5jaGlsZHJlblswXTtcblxuICAgICAgYm9hcmRIZWFkZXIucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItbmFtZVwiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgYm9hcmRIZWFkZXJcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLW5hbWUtaW5wdXRcIilcbiAgICAgICAgLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICBlZGl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICBib2FyZEhlYWRlci5xdWVyeVNlbGVjdG9yKFwiLnNhdmUtYm9hcmRcIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcblxuICAgICAgRE9NQm9hcmQuZWRpdGluZyA9IHRydWU7XG4gICAgICBET01Cb2FyZC5jb21wb25lbnQuY2xhc3NMaXN0LmFkZChcImVkaXRpbmdcIik7XG4gICAgfSk7XG5cbiAgICBib2FyZEhlYWRlclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLW5hbWUtaW5wdXRcIilcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChldmVudCkgPT4ge1xuICAgICAgICBwbGF5ZXIubmFtZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgYm9hcmRIZWFkZXIucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItbmFtZVwiKS50ZXh0Q29udGVudCA9IHBsYXllci5uYW1lO1xuICAgICAgfSk7XG5cbiAgICBzYXZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzYXZlRWRpdHMpO1xuXG4gICAgYm9hcmRIZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBzYXZlRWRpdHMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBET01Cb2FyZDtcbn1cblxuZnVuY3Rpb24gZ2V0Q2VsbEluZGV4KGNlbGwpIHtcbiAgcmV0dXJuIFtcbiAgICBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGNlbGwucGFyZW50Tm9kZS5jaGlsZHJlbiwgY2VsbCksXG4gICAgQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChcbiAgICAgIGNlbGwucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNoaWxkcmVuLFxuICAgICAgY2VsbC5wYXJlbnROb2RlLFxuICAgICksXG4gIF07XG59XG5cbmZ1bmN0aW9uIGdldENlbGxDbGFzc05hbWUoY29vcmRpbmF0ZXMsIGJvYXJkLCBzZWNyZXQgPSBmYWxzZSkge1xuICBjb25zdCBjZWxsID0gYm9hcmQuY2VsbHNbY29vcmRpbmF0ZXNbMV1dW2Nvb3JkaW5hdGVzWzBdXTtcbiAgc3dpdGNoIChjZWxsKSB7XG4gICAgY2FzZSBDZWxsU3RhdGUuRU1QVFk6XG4gICAgICByZXR1cm4gXCJlbXB0eVwiO1xuICAgIGNhc2UgQ2VsbFN0YXRlLk1JU1M6XG4gICAgICByZXR1cm4gXCJtaXNzXCI7XG4gICAgY2FzZSBDZWxsU3RhdGUuU0hJUDpcbiAgICAgIHJldHVybiBzZWNyZXQgPyBcImVtcHR5XCIgOiBcInNoaXBcIjtcbiAgICBjYXNlIENlbGxTdGF0ZS5ISVQ6XG4gICAgICByZXR1cm4gXCJoaXRcIjtcbiAgICBjYXNlIENlbGxTdGF0ZS5TVU5LOlxuICAgICAgcmV0dXJuIFwic3Vua1wiO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDZWxsU3RhdGUgfSBmcm9tIFwiLi4vY29yZS9nYW1lQm9hcmQuanNcIjtcbmltcG9ydCB7IFBsYXllclR5cGUgfSBmcm9tIFwiLi4vY29yZS9wbGF5ZXIuanNcIjtcbmltcG9ydCB7IHNldHVwR2FtZUJvYXJkcyB9IGZyb20gXCIuL2JvYXJkcy5qc1wiO1xuXG5leHBvcnQgY29uc3QgR2FtZU1vZGUgPSBPYmplY3QuZnJlZXplKHtcbiAgQ09NUFVURVI6IFwiY29tcHV0ZXJcIixcbiAgRlJJRU5EOiBcImZyaWVuZFwiLFxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cEdhbWUocGxheWVyT25lLCBwbGF5ZXJUd28sIG1vZGUpIHtcbiAgY29uc3QgZ2FtZSA9IHtcbiAgICBtb2RlLFxuXG4gICAgcGxheWVyczogW3BsYXllck9uZSwgcGxheWVyVHdvXSxcbiAgICBjdXJyZW50UGxheWVySW5kZXg6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpLFxuXG4gICAgaXNJblByb2dyZXNzOiBmYWxzZSxcbiAgICBpc0dhbWVPdmVyOiBmYWxzZSxcbiAgICBpc1BsYXllcldhaXRpbmc6IGZhbHNlLFxuXG4gICAgYm9hcmRzOiBbXSxcblxuICAgIHN0YXJ0OiBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmlzSW5Qcm9ncmVzcyA9IHRydWU7XG4gICAgICB0aGlzLmlzR2FtZU92ZXIgPSBmYWxzZTtcbiAgICAgIHRoaXMuaXNQbGF5ZXJXYWl0aW5nID0gZmFsc2U7XG5cbiAgICAgIHRoaXMuYm9hcmRzWzBdLmNsZWFyKCk7XG5cbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RhcnRcIikuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzZXRcIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYm9hcmQtaW5mb1wiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZWxwLWluZm9cIikuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYXR0YWNrLWluZm9cIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcm9vdFwiKS5jbGFzc0xpc3QuYWRkKFwiaW4tcHJvZ3Jlc3NcIik7XG5cbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcm9vdFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwidnMtY29tcHV0ZXJcIik7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jvb3RcIikuY2xhc3NMaXN0LnJlbW92ZShcInZzLWZyaWVuZFwiKTtcbiAgICAgIGRvY3VtZW50XG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKFwiI3Jvb3RcIilcbiAgICAgICAgLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICAgbW9kZSA9PT0gR2FtZU1vZGUuQ09NUFVURVIgPyBcInZzLWNvbXB1dGVyXCIgOiBcInZzLWZyaWVuZFwiLFxuICAgICAgICApO1xuXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmJvYXJkLWNvbnRyb2xzXCIpLmZvckVhY2goKGJvYXJkQ29udHJvbHMpID0+IHtcbiAgICAgICAgYm9hcmRDb250cm9scy5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgfSk7XG5cbiAgICAgIGF3YWl0IHRoaXMucGxheSgpO1xuICAgIH0sXG5cbiAgICByZXNldDogZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgZ2FtZU92ZXJTY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWUtb3Zlci1zY3JlZW5cIik7XG4gICAgICBpZiAoZ2FtZU92ZXJTY3JlZW4pIGdhbWVPdmVyU2NyZWVuLnJlbW92ZSgpO1xuXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0YXJ0XCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlc2V0XCIpLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJvYXJkLWluZm9cIikuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVscC1pbmZvXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmF0dGFjay1pbmZvXCIpLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jvb3RcIikuY2xhc3NMaXN0LnJlbW92ZShcImluLXByb2dyZXNzXCIpO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb290XCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJhdHRhY2stYWxsb3dlZFwiKTtcblxuICAgICAgdGhpcy5pc0luUHJvZ3Jlc3MgPSBmYWxzZTtcbiAgICAgIHRoaXMuaXNHYW1lT3ZlciA9IHRydWU7XG4gICAgICB0aGlzLmlzUGxheWVyV2FpdGluZyA9IGZhbHNlO1xuXG4gICAgICB0aGlzLnBsYXllcnNbMF0uYm9hcmQucmVzZXQoKTtcbiAgICAgIHRoaXMucGxheWVyc1sxXS5ib2FyZC5yZXNldCgpO1xuXG4gICAgICB0aGlzLmJvYXJkcyA9IHNldHVwR2FtZUJvYXJkcyh0aGlzLCB0aGlzLnBsYXllcnNbMF0sIHRoaXMucGxheWVyc1sxXSk7XG5cbiAgICAgIHRoaXMuYm9hcmRzWzBdLnJhbmRvbWl6ZUZvcm1hdGlvbigpO1xuICAgICAgdGhpcy5ib2FyZHNbMV0ucmFuZG9taXplRm9ybWF0aW9uKCk7XG5cbiAgICAgIGNvbnN0IGJvYXJkc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYm9hcmRzXCIpO1xuICAgICAgQXJyYXkuZnJvbShib2FyZHNDb250YWluZXIuY2hpbGRyZW4pLmZvckVhY2goKGJvYXJkKSA9PiB7XG4gICAgICAgIGJvYXJkc0NvbnRhaW5lci5yZW1vdmVDaGlsZChib2FyZCk7XG4gICAgICB9KTtcbiAgICAgIGJvYXJkc0NvbnRhaW5lci5hcHBlbmQoXG4gICAgICAgIHRoaXMuYm9hcmRzWzBdLmNvbXBvbmVudCxcbiAgICAgICAgdGhpcy5ib2FyZHNbMV0uY29tcG9uZW50LFxuICAgICAgKTtcbiAgICB9LFxuXG4gICAgcGxheTogYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IGN1cnJlbnRQbGF5ZXIgPSB0aGlzLnBsYXllcnNbdGhpcy5jdXJyZW50UGxheWVySW5kZXhdO1xuICAgICAgbGV0IG5leHRQbGF5ZXJJbmRleCA9ICh0aGlzLmN1cnJlbnRQbGF5ZXJJbmRleCArIDEpICUgMjtcbiAgICAgIGxldCBuZXh0UGxheWVyID0gdGhpcy5wbGF5ZXJzW25leHRQbGF5ZXJJbmRleF07XG5cbiAgICAgIHdoaWxlICghdGhpcy5pc0dhbWVPdmVyKSB7XG4gICAgICAgIGlmIChjdXJyZW50UGxheWVyLmJvYXJkLmlzRmxlZXREZXN0cm95ZWQoKSkge1xuICAgICAgICAgIHRoaXMuaXNHYW1lT3ZlciA9IHRydWU7XG5cbiAgICAgICAgICB0aGlzLmJvYXJkc1sodGhpcy5jdXJyZW50UGxheWVySW5kZXggKyAxKSAlIDJdLmNvbXBvbmVudC5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgIGNyZWF0ZUdhbWVPdmVyU2NyZWVuKGN1cnJlbnRQbGF5ZXIsIG5leHRQbGF5ZXIsIHRoaXMpLFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJvYXJkLWluZm9cIikuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzUGxheWVyV2FpdGluZykge1xuICAgICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDEwMCkpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcm9vdFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiYXR0YWNrLWFsbG93ZWRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBjdXJyZW50UGxheWVyID0gdGhpcy5wbGF5ZXJzW3RoaXMuY3VycmVudFBsYXllckluZGV4XTtcbiAgICAgICAgbmV4dFBsYXllckluZGV4ID0gKHRoaXMuY3VycmVudFBsYXllckluZGV4ICsgMSkgJSAyO1xuICAgICAgICBuZXh0UGxheWVyID0gdGhpcy5wbGF5ZXJzW25leHRQbGF5ZXJJbmRleF07XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBgLmJvYXJkLSR7dGhpcy5jdXJyZW50UGxheWVySW5kZXggPT09IDAgPyBcInR3b1wiIDogXCJvbmVcIn0taW5mb2AsXG4gICAgICAgICkudGV4dENvbnRlbnQgPVxuICAgICAgICAgIGAke25leHRQbGF5ZXIudHlwZSA9PT0gUGxheWVyVHlwZS5DT01QVVRFUiA/IFwiWW91clwiIDogY3VycmVudFBsYXllci5uYW1lICsgXCInc1wifSB0dXJuYDtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBgLmJvYXJkLSR7dGhpcy5jdXJyZW50UGxheWVySW5kZXggPT09IDAgPyBcIm9uZVwiIDogXCJ0d29cIn0taW5mb2AsXG4gICAgICAgICkudGV4dENvbnRlbnQgPSBcIlwiO1xuXG4gICAgICAgIHRoaXMuYm9hcmRzW3RoaXMuY3VycmVudFBsYXllckluZGV4XS5jb21wb25lbnQuY2xhc3NMaXN0LnJlbW92ZShcbiAgICAgICAgICBcImFjdGl2ZVwiLFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmJvYXJkc1tuZXh0UGxheWVySW5kZXhdLmNvbXBvbmVudC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuXG4gICAgICAgIHRoaXMuYm9hcmRzW3RoaXMuY3VycmVudFBsYXllckluZGV4XS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ib2FyZHNbbmV4dFBsYXllckluZGV4XS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgIGlmIChjdXJyZW50UGxheWVyLnR5cGUgPT09IFBsYXllclR5cGUuQ09NUFVURVIgJiYgIXRoaXMuaXNHYW1lT3Zlcikge1xuICAgICAgICAgIGF3YWl0IHRoaXMuYm9hcmRzW25leHRQbGF5ZXJJbmRleF0uY29tcHV0ZXJBdHRhY2soXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQbGF5ZXJJbmRleCxcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuaXNQbGF5ZXJXYWl0aW5nID0gdHJ1ZTtcblxuICAgICAgICAgIGlmIChuZXh0UGxheWVyLnR5cGUgIT09IFBsYXllclR5cGUuQ09NUFVURVIpIHtcbiAgICAgICAgICAgIHRoaXMuYm9hcmRzW25leHRQbGF5ZXJJbmRleF0uY29tcG9uZW50LmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgICBjcmVhdGVQYXNzaW5nU2NyZWVuKHRoaXMucGxheWVycywgdGhpcy5jdXJyZW50UGxheWVySW5kZXgpLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jvb3RcIikuY2xhc3NMaXN0LmFkZChcImF0dGFjay1hbGxvd2VkXCIpO1xuXG4gICAgICAgICAgaWYgKG5leHRQbGF5ZXIudHlwZSAhPT0gUGxheWVyVHlwZS5DT01QVVRFUikge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb290XCIpLmNsYXNzTGlzdC5hZGQoXCJwYXNzaW5nXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY3VycmVudFBsYXllckluZGV4ID0gbmV4dFBsYXllckluZGV4O1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB1cGRhdGVBdHRhY2tJbmZvOiBmdW5jdGlvbiAoYXR0YWNrVHlwZSwgc2hpcCwgYXR0YWNrZXJJbmRleCkge1xuICAgICAgY29uc3QgYXR0YWNrSW5mbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYXR0YWNrLWluZm9cIik7XG4gICAgICBjb25zdCBhdHRhY2tlciA9IHRoaXMucGxheWVyc1thdHRhY2tlckluZGV4XS5uYW1lO1xuICAgICAgY29uc3QgcmVjZWl2ZXIgPSB0aGlzLnBsYXllcnNbKGF0dGFja2VySW5kZXggKyAxKSAlIDJdLm5hbWU7XG5cbiAgICAgIHN3aXRjaCAoYXR0YWNrVHlwZSkge1xuICAgICAgICBjYXNlIENlbGxTdGF0ZS5NSVNTOlxuICAgICAgICAgIGF0dGFja0luZm8udGV4dENvbnRlbnQgPSBgJHthdHRhY2tlcn0gbWlzc2VzIHRoZWlyIHNob3RgO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIENlbGxTdGF0ZS5ISVQ6XG4gICAgICAgICAgYXR0YWNrSW5mby50ZXh0Q29udGVudCA9IGAke2F0dGFja2VyfSBoaXRzIG9uZSBvZiAke3JlY2VpdmVyfSdzIHNoaXBzYDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBDZWxsU3RhdGUuU1VOSzpcbiAgICAgICAgICBhdHRhY2tJbmZvLnRleHRDb250ZW50ID0gYCR7YXR0YWNrZXJ9IHNpbmtzICR7cmVjZWl2ZXJ9J3MgJHtzaGlwLnR5cGV9YDtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9LFxuICB9O1xuXG4gIGdhbWUuYm9hcmRzID0gc2V0dXBHYW1lQm9hcmRzKGdhbWUsIHBsYXllck9uZSwgcGxheWVyVHdvKTtcblxuICByZXR1cm4gZ2FtZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlR2FtZU92ZXJTY3JlZW4oY3VycmVudFBsYXllciwgbmV4dFBsYXllciwgZ2FtZSkge1xuICBjb25zdCBnYW1lT3ZlclNjcmVlbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGdhbWVPdmVyU2NyZWVuLmNsYXNzTGlzdC5hZGQoXCJnYW1lLW92ZXItc2NyZWVuXCIpO1xuXG4gIGxldCBnYW1lT3Zlck1lc3NhZ2U7XG4gIGlmIChjdXJyZW50UGxheWVyLnR5cGUgPT09IFBsYXllclR5cGUuQ09NUFVURVIpIHtcbiAgICBnYW1lT3Zlck1lc3NhZ2UgPSBcIllPVSBXT04gVEhFIEdBTUUhXCI7XG4gIH0gZWxzZSBpZiAobmV4dFBsYXllci50eXBlID09PSBQbGF5ZXJUeXBlLkNPTVBVVEVSKSB7XG4gICAgZ2FtZU92ZXJNZXNzYWdlID0gXCJZT1UgTE9TVCBUSEUgR0FNRSFcIjtcbiAgfSBlbHNlIHtcbiAgICBnYW1lT3Zlck1lc3NhZ2UgPSBgJHtuZXh0UGxheWVyLm5hbWUudG9VcHBlckNhc2UoKX0gV09OIFRIRSBHQU1FIWA7XG4gIH1cblxuICBnYW1lT3ZlclNjcmVlbi5pbm5lckhUTUwgPSBgPHA+JHtnYW1lT3Zlck1lc3NhZ2V9PC9wPmA7XG5cbiAgY29uc3Qgb3V0ZXJSZXNldEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzZXRcIik7XG4gIGlmIChvdXRlclJlc2V0QnV0dG9uKSBvdXRlclJlc2V0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG5cbiAgY29uc3QgcmVzZXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICByZXNldEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwicmVzZXRcIik7XG4gIHJlc2V0QnV0dG9uLnRleHRDb250ZW50ID0gXCJQbGF5IEFnYWluXCI7XG4gIHJlc2V0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBnYW1lLnJlc2V0KCkpO1xuICBnYW1lT3ZlclNjcmVlbi5hcHBlbmRDaGlsZChyZXNldEJ1dHRvbik7XG5cbiAgY29uc3QgcGFzc2luZ1NjcmVlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGFzc2luZy1zY3JlZW5cIik7XG4gIGlmIChwYXNzaW5nU2NyZWVuKSBwYXNzaW5nU2NyZWVuLnJlbW92ZSgpO1xuXG4gIHJldHVybiBnYW1lT3ZlclNjcmVlbjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUGFzc2luZ1NjcmVlbihwbGF5ZXJzLCBjdXJyZW50UGxheWVyKSB7XG4gIGNvbnN0IHBhc3NpbmdTY3JlZW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBwYXNzaW5nU2NyZWVuLmNsYXNzTGlzdC5hZGQoXCJwYXNzaW5nLXNjcmVlblwiKTtcbiAgcGFzc2luZ1NjcmVlbi5pbm5lckhUTUwgPSBgXG4gICAgPHA+UGFzcyB0aGUgZGV2aWNlIHRvICR7cGxheWVyc1tjdXJyZW50UGxheWVyXS5uYW1lfTwvcD5cbiAgYDtcbiAgY29uc3QgY29udGludWVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBjb250aW51ZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiQ29udGludWVcIjtcbiAgY29udGludWVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBwYXNzaW5nU2NyZWVuLnJlbW92ZSgpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGFzc2luZ1wiKS5jbGFzc0xpc3QucmVtb3ZlKFwicGFzc2luZ1wiKTtcbiAgfSk7XG4gIHBhc3NpbmdTY3JlZW4uYXBwZW5kQ2hpbGQoY29udGludWVCdXR0b24pO1xuICByZXR1cm4gcGFzc2luZ1NjcmVlbjtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBjcmVhdGVHYW1lUGFnZShnYW1lKSB7XG4gIGNvbnN0IGdhbWVQYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZ2FtZVBhZ2UuY2xhc3NMaXN0LmFkZChcImdhbWUtcGFnZVwiLCBcInBhZ2VcIik7XG5cbiAgZ2FtZVBhZ2UuaW5uZXJIVE1MID0gYFxuICAgIDxkaXYgY2xhc3M9XCJib2FyZHNcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiaW5mb1wiPlxuICAgICAgPGRpdiBjbGFzcz1cImJvYXJkLWluZm8gaGlkZGVuXCI+XG4gICAgICAgIDxwIGNsYXNzPVwiYm9hcmQtb25lLWluZm9cIj48L3A+XG4gICAgICAgIDxwIGNsYXNzPVwiYm9hcmQtdHdvLWluZm9cIj48L3A+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJnYW1lLWluZm9cIj5cbiAgICAgICAgPHAgY2xhc3M9XCJoZWxwLWluZm9cIj7ik5ggUmVhcnJhbmdlIHRoZSBzaGlwcyB0byB5b3VyIGxpa2luZyBieSBwcmVzc2luZyB0aGUgZWRpdCBidXR0b24sIG9yIGJ5IHJlZnJlc2hpbmcgdGhlIGJvYXJkPC9wPlxuICAgICAgICA8cCBjbGFzcz1cImF0dGFjay1pbmZvIGhpZGRlblwiPjwvcD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJjb250cm9sc1wiPlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cInN0YXJ0XCI+U3RhcnQgR2FtZTwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cInJlc2V0IGhpZGRlblwiPlJlc2V0IEdhbWU8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgYDtcblxuICBjb25zdCBib2FyZHNDb250YWluZXIgPSBnYW1lUGFnZS5xdWVyeVNlbGVjdG9yKFwiLmJvYXJkc1wiKTtcbiAgYm9hcmRzQ29udGFpbmVyLmFwcGVuZChnYW1lLmJvYXJkc1swXS5jb21wb25lbnQsIGdhbWUuYm9hcmRzWzFdLmNvbXBvbmVudCk7XG5cbiAgY29uc3Qgc3RhcnRCdXR0b24gPSBnYW1lUGFnZS5xdWVyeVNlbGVjdG9yKFwiLnN0YXJ0XCIpO1xuICBzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGlmIChnYW1lUGFnZS5xdWVyeVNlbGVjdG9yKFwiLmVkaXRpbmdcIikpIHtcbiAgICAgIGFsZXJ0KFwiUGxlYXNlIHNhdmUgeW91ciBib2FyZHMgYmVmb3JlIHN0YXJ0aW5nIHRoZSBnYW1lXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGdhbWUuc3RhcnQoKTtcbiAgfSk7XG5cbiAgY29uc3QgcmVzZXRCdXR0b24gPSBnYW1lUGFnZS5xdWVyeVNlbGVjdG9yKFwiLnJlc2V0XCIpO1xuICByZXNldEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGdhbWUucmVzZXQoKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGdhbWVQYWdlO1xufVxuIiwiaW1wb3J0IGVkaXRTdmcgZnJvbSBcIi4uLy4uLy4uL2Fzc2V0cy9lZGl0LnN2Z1wiO1xuaW1wb3J0IHJlZnJlc2hTdmcgZnJvbSBcIi4uLy4uLy4uL2Fzc2V0cy9yZWZyZXNoLWNjdy5zdmdcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUhlbHBQYWdlKCkge1xuICBjb25zdCBoZWxwUGFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGhlbHBQYWdlLmNsYXNzTGlzdC5hZGQoXCJoZWxwLXBhZ2VcIiwgXCJwYWdlXCIpO1xuXG4gIGhlbHBQYWdlLmlubmVySFRNTCA9IGBcbiAgICA8aDE+SG93IHRvIFBsYXk8L2gxPlxuICAgIDxzZWN0aW9uPlxuICAgICAgPGgzPkNob29zZSBHYW1lIE1vZGU8L2gzPlxuICAgICAgPGRpdj5cbiAgICAgICAgPHA+XG4gICAgICAgICAgQnkgZGVmYXVsdCwgeW91J2xsIGJlIHBsYXlpbmcgYWdhaW5zdCB0aGUgY29tcHV0ZXIuXG4gICAgICAgICAgSWYgeW91IHdhbnQgdG8gcGxheSB3aXRoIGEgZnJpZW5kLCBjaG9vc2UgdGhlIFwiRnJpZW5kXCIgb3B0aW9uIGluIHRoZSBvcHBvbmVudCBzZWN0aW9uLFxuICAgICAgICAgIGFuZCBwbGF5IGJ5IHBhc3NpbmcgYXJvdW5kIHlvdXIgZGV2aWNlLlxuICAgICAgICA8L3A+XG4gICAgICA8L2Rpdj5cbiAgICA8L3NlY3Rpb24+XG4gICAgPHNlY3Rpb24+XG4gICAgICA8aDM+RWRpdCB5b3VyIGJvYXJkKHMpPC9oMz5cbiAgICAgIDxkaXY+XG4gICAgICAgIDx1bD5cbiAgICAgICAgICA8bGk+Q2xpY2sgb24gdGhlIGVkaXQgYnV0dG9uICg8aW1nIGNsYXNzPVwiZWRpdC1pbWdcIiAvPikgdG8gY2hhbmdlIHRoZSBuYW1lcyBvZiB0aGUgcGxheWVycywgYW5kIG1vdmUgYXJvdW5kIHlvdXIgc2hpcHMgKHVzaW5nIGFycm93IGtleXMpLjwvbGk+XG4gICAgICAgICAgPGxpPllvdSBjYW4gYWxzbyBjbGljayB0aGUgcmVmcmVzaCBidXR0b24gKDxpbWcgY2xhc3M9XCJyZWZyZXNoLWltZ1wiIC8+KSB0byByYW5kb21pemUgdGhlIHBsYWNlbWVudCBvZiBzaGlwcyBpbiB0aGUgYm9hcmQuPC9saT5cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuICAgIDwvc2VjdGlvbj5cbiAgICA8c2VjdGlvbj5cbiAgICAgIDxoMz5TdGFydCBwbGF5aW5nITwvaDM+XG4gICAgICA8ZGl2PlxuICAgICAgICA8cD5cbiAgICAgICAgUHJlc3Mgb24gXCI8Yj5TdGFydCBHYW1lPC9iPlwiIHRvIHN0YXJ0IHBsYXlpbmcuXG4gICAgICAgIElmIHlvdSBhcmUgbm90IGZhbWlsaWFyIHdpdGggPGEgaHJlZj1cImh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0JhdHRsZXNoaXBfKGdhbWUpXCI+YmF0dGxlc2hpcDwvYT4sIGhlcmUncyBhIHF1aWNrIHJ1bi10aHJvdWdoIG9mIHRoZSBtZWNoYW5pY3M6XG4gICAgICAgIDwvcD5cbiAgICAgICAgPHVsPlxuICAgICAgICAgIDxsaT5JdCBpcyBhIHR3by1wbGF5ZXIgZ2FtZSwgd2l0aCBlYWNoIHBsYXllciBoYXZpbmcgYSBib2FyZCB3aXRoIHNoaXBzIGFycmFuZ2VkIG9uIGl0IGFjY29yZGluZyB0byB0aGVpciB3aXNoZXMuPC9saT5cbiAgICAgICAgICA8bGk+XG4gICAgICAgICAgICBUaGVyZSBhcmUgNSBzaGlwcyBvZiB2YXJ5aW5nIGxlbmd0aHM6IFxuICAgICAgICAgICAgPHRhYmxlPlxuICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRoPlNoaXA8L3RoPlxuICAgICAgICAgICAgICAgIDx0aD5TaXplPC90aD5cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0ZD5DYXJyaWVyPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQ+NTwvdGQ+XG4gICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICA8dGQ+QmF0dGxlc2hpcDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkPjQ8L3RkPlxuICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRkPkRlc3Ryb3llcjwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkPjM8L3RkPlxuICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRkPlN1Ym1hcmluZTwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkPjM8L3RkPlxuICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRkPlBhdHJvbCBCb2F0PC90ZD5cbiAgICAgICAgICAgICAgICA8dGQ+MjwvdGQ+XG4gICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgPGxpPlxuICAgICAgICAgICAgRWFjaCBwbGF5ZXIgdGFrZXMgdHVybnMgc2hvb3RpbmcgYSBzcXVhcmUgb24gdGhlIG90aGVyIHBsYXllcidzIGJvYXJkLlxuICAgICAgICAgICAgVGhleSBoYXZlIG5vIGluZm9ybWF0aW9uIG9uIHdoZXRoZXIgdGhlcmUgaXMgYSBzaGlwIG9uIHRoYXQgc3F1YXJlIG9yIG5vdC5cbiAgICAgICAgICAgIEFmdGVyIGVhY2ggdHJ5LCB0aGV5IHdpbGwgYmUgaW5mb3JtZWQgd2hldGhlciB0aGV5IGhhZCBoaXQgYSBzaGlwIG9yIG1pc3NlZCB0aGVpciBzaG90LlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgPGxpPkFmdGVyIGFsbCB0aGUgc3F1YXJlcyBvZiBhIHBhcnRpY3VsYXIgc2hpcCBpcyBoaXQsIGl0IHdpbGwgYmUgbWFya2VkIChhbmQgaW5mb3JtZWQgdG8gdGhlIHNob290aW5nIHBsYXllcikgYXMgc3Vuay48L2xpPlxuICAgICAgICAgIDxsaT5BZnRlciBhbGwgdGhlIHNoaXBzIG9mIGEgcGFydGljdWxhciBib2FyZCBpcyBzdW5rLCB0aGF0IHBsYXllciBsb3NlcyB0aGUgZ2FtZSwgYW5kIHRoZSBzaG9vdGluZyBwbGF5ZXIgd2lucy48L2xpPlxuICAgICAgICA8L3VsPlxuICAgICAgPC9kaXY+XG4gICAgPC9zZWN0aW9uPlxuICAgIDxoMSBjbGFzcz1cInRoYW5rc1wiPlRoYW5rcyBmb3IgUGxheWluZyE8L2gxPlxuICBgO1xuXG4gIGhlbHBQYWdlLnF1ZXJ5U2VsZWN0b3IoXCIuZWRpdC1pbWdcIikuc3JjID0gZWRpdFN2ZztcbiAgaGVscFBhZ2UucXVlcnlTZWxlY3RvcihcIi5yZWZyZXNoLWltZ1wiKS5zcmMgPSByZWZyZXNoU3ZnO1xuXG4gIHJldHVybiBoZWxwUGFnZTtcbn1cbiIsImltcG9ydCB7IGNyZWF0ZVBsYXllciwgUGxheWVyVHlwZSB9IGZyb20gXCIuLi8uLi9jb3JlL3BsYXllci5qc1wiO1xuaW1wb3J0IHsgR2FtZU1vZGUsIHNldHVwR2FtZSB9IGZyb20gXCIuLi9nYW1lLmpzXCI7XG5pbXBvcnQgeyBjcmVhdGVHYW1lUGFnZSB9IGZyb20gXCIuL2dhbWUuanNcIjtcbmltcG9ydCB7IGNyZWF0ZUhlbHBQYWdlIH0gZnJvbSBcIi4vaGVscC5qc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSG9tZVBhZ2UoKSB7XG4gIGxldCBnYW1lTW9kZSA9IEdhbWVNb2RlLkNPTVBVVEVSO1xuXG4gIGNvbnN0IGhvbWVQYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgaG9tZVBhZ2UuY2xhc3NMaXN0LmFkZChcImhvbWUtcGFnZVwiLCBcInBhZ2VcIik7XG5cbiAgaG9tZVBhZ2UuaW5uZXJIVE1MID0gYFxuICAgIDxkaXYgY2xhc3M9XCJvcHBvbmVudFwiPlxuICAgICAgPHA+T3Bwb25lbnQ6IDwvcD5cbiAgICAgIDxkaXYgY2xhc3M9XCJvcHRpb25zXCI+XG4gICAgICAgIDxwIGNsYXNzPVwib3Bwb25lbnQtY29tcHV0ZXIgYWN0aXZlLW1vZGVcIj5Db21wdXRlcjwvcD5cbiAgICAgICAgPHAgY2xhc3M9XCJvcHBvbmVudC1mcmllbmRcIj5GcmllbmQ8L3A+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8IS0tIDxhIGNsYXNzPVwiaGVscC1saW5rXCI+SG93IHRvIFBsYXk8L2E+IC0tPlxuICAgIDxkaXYgY2xhc3M9XCJjb250cm9sc1wiPlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cInBsYXlcIj5QbGF5IEdhbWU8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gY2xhc3M9XCJoZWxwXCI+SG93IHRvIFBsYXk8L2J1dHRvbj5cbiAgICAgIDwhLS0gPGJ1dHRvbiBjbGFzcz1cInJlc2V0IGhpZGRlblwiPlJlc2V0IEdhbWU8L2J1dHRvbj4gLS0+XG4gICAgPC9kaXY+XG4gIGA7XG5cbiAgY29uc3QgY29tcHV0ZXJPcHBvbmVudEJ1dHRvbiA9IGhvbWVQYWdlLnF1ZXJ5U2VsZWN0b3IoXCIub3Bwb25lbnQtY29tcHV0ZXJcIik7XG4gIGNvbXB1dGVyT3Bwb25lbnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBpZiAoY29tcHV0ZXJPcHBvbmVudEJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmUtbW9kZVwiKSkgcmV0dXJuO1xuXG4gICAgY29tcHV0ZXJPcHBvbmVudEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlLW1vZGVcIik7XG4gICAgZnJpZW5kT3Bwb25lbnRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZS1tb2RlXCIpO1xuICAgIGdhbWVNb2RlID0gR2FtZU1vZGUuQ09NUFVURVI7XG4gIH0pO1xuXG4gIGNvbnN0IGZyaWVuZE9wcG9uZW50QnV0dG9uID0gaG9tZVBhZ2UucXVlcnlTZWxlY3RvcihcIi5vcHBvbmVudC1mcmllbmRcIik7XG4gIGZyaWVuZE9wcG9uZW50QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgaWYgKGZyaWVuZE9wcG9uZW50QnV0dG9uLmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZS1tb2RlXCIpKSByZXR1cm47XG5cbiAgICBmcmllbmRPcHBvbmVudEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlLW1vZGVcIik7XG4gICAgY29tcHV0ZXJPcHBvbmVudEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlLW1vZGVcIik7XG4gICAgZ2FtZU1vZGUgPSBHYW1lTW9kZS5GUklFTkQ7XG4gIH0pO1xuXG4gIGNvbnN0IHBsYXlCdXR0b24gPSBob21lUGFnZS5xdWVyeVNlbGVjdG9yKFwiLnBsYXlcIik7XG4gIHBsYXlCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcbiAgICBsZXQgZ2FtZTtcbiAgICBpZiAoZ2FtZU1vZGUgPT09IEdhbWVNb2RlLkNPTVBVVEVSKSB7XG4gICAgICBnYW1lID0gc2V0dXBHYW1lKFxuICAgICAgICBjcmVhdGVQbGF5ZXIoXCJQbGF5ZXJcIiwgUGxheWVyVHlwZS5IVU1BTiwgMTApLFxuICAgICAgICBjcmVhdGVQbGF5ZXIoXCJDb21wdXRlclwiLCBQbGF5ZXJUeXBlLkNPTVBVVEVSLCAxMCksXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBnYW1lID0gc2V0dXBHYW1lKFxuICAgICAgICBjcmVhdGVQbGF5ZXIoXCJQbGF5ZXIgMVwiLCBQbGF5ZXJUeXBlLkhVTUFOLCAxMCksXG4gICAgICAgIGNyZWF0ZVBsYXllcihcIlBsYXllciAyXCIsIFBsYXllclR5cGUuSFVNQU4sIDEwKSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaG9tZVBhZ2UucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChjcmVhdGVHYW1lUGFnZShnYW1lKSk7XG4gICAgaG9tZVBhZ2UucmVtb3ZlKCk7XG4gIH0pO1xuXG4gIGNvbnN0IGhlbHBCdXR0b24gPSBob21lUGFnZS5xdWVyeVNlbGVjdG9yKFwiLmhlbHBcIik7XG4gIGhlbHBCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBob21lUGFnZS5wYXJlbnROb2RlLmFwcGVuZENoaWxkKGNyZWF0ZUhlbHBQYWdlKCkpO1xuICAgIGhvbWVQYWdlLnJlbW92ZSgpO1xuICB9KTtcblxuICByZXR1cm4gaG9tZVBhZ2U7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgKCFzY3JpcHRVcmwgfHwgIS9eaHR0cChzPyk6Ly50ZXN0KHNjcmlwdFVybCkpKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiaW1wb3J0IHsgY3JlYXRlSG9tZVBhZ2UgfSBmcm9tIFwiLi9kb20vcGFnZXMvaG9tZS5qc1wiO1xuXG5pbXBvcnQgYmFja1N2ZyBmcm9tIFwiLi4vYXNzZXRzL2NoZXZyb24tbGVmdC5zdmdcIjtcbmltcG9ydCBsb2dvIGZyb20gXCIuLi9hc3NldHMvZmF2aWNvbi5pY29cIjtcbmltcG9ydCBcIi4vc3R5bGVzL2luZGV4LmNzc1wiO1xuXG5jb25zb2xlLmxvZyhcIkdldCBSZWFkeSBmb3IgQmF0dGxlIVwiKTtcblxuY29uc3Qgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKTtcbnJvb3QuaW5uZXJIVE1MID0gYFxuICA8aGVhZGVyPlxuICAgIDxidXR0b24gY2xhc3M9XCJiYWNrLWJ1dHRvblwiPjwvYnV0dG9uPlxuICAgIDxpbWcgY2xhc3M9XCJsb2dvXCIgYWx0PVwiTG9nb1wiIC8+PGgxPkJBVFRMRVNISVA8L2gxPlxuICA8L2hlYWRlcj5cbmA7XG5cbnJvb3QucXVlcnlTZWxlY3RvcihcIi5sb2dvXCIpLnNyYyA9IGxvZ287XG5cbnJvb3QuYXBwZW5kQ2hpbGQoY3JlYXRlSG9tZVBhZ2UoKSk7XG5cbmNvbnN0IGJhY2tCdXR0b24gPSByb290LnF1ZXJ5U2VsZWN0b3IoXCIuYmFjay1idXR0b25cIik7XG5jb25zdCBiYWNrSWNvbiA9IG5ldyBJbWFnZSgpO1xuYmFja0ljb24uc3JjID0gYmFja1N2ZztcbmJhY2tCdXR0b24uYXBwZW5kQ2hpbGQoYmFja0ljb24pO1xuYmFja0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBjb25zdCBjdXJyZW50UGFnZSA9IHJvb3QucXVlcnlTZWxlY3RvcihcIi5wYWdlXCIpO1xuICBjb25zdCBuZXdQYWdlID0gY3JlYXRlSG9tZVBhZ2UoKTtcblxuICBpZiAobmV3UGFnZS5jbGFzc0xpc3RbMF0gPT0gY3VycmVudFBhZ2UuY2xhc3NMaXN0WzBdKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcm9vdC5jbGFzc05hbWUgPSBcIlwiO1xuXG4gIHJvb3QuYXBwZW5kQ2hpbGQobmV3UGFnZSk7XG4gIGN1cnJlbnRQYWdlLnJlbW92ZSgpO1xufSk7XG4iXSwibmFtZXMiOlsiY3JlYXRlU2hpcCIsIlNoaXBPcmllbnRhdGlvbiIsIkNlbGxTdGF0ZSIsIk9iamVjdCIsImZyZWV6ZSIsIkVNUFRZIiwiTUlTUyIsIlNISVAiLCJISVQiLCJTVU5LIiwiY3JlYXRlR2FtZUJvYXJkIiwic2l6ZSIsIkVycm9yIiwiY2VsbHMiLCJBcnJheSIsImZyb20iLCJsZW5ndGgiLCJzaGlwcyIsInJlc2V0IiwicGxhY2VTaGlwIiwic2hpcCIsImNvb3JkaW5hdGVzIiwib3JpZW50YXRpb24iLCJIT1JJWk9OVEFMIiwiVkVSVElDQUwiLCJpIiwicHVzaCIsIm1vdmVTaGlwIiwic2hpcEluZGV4IiwidHlwZSIsInBvcCIsInJvdGF0ZVNoaXAiLCJuZXdPcmllbnRhdGlvbiIsImdldFNoaXBJbmRleCIsImoiLCJyZWNlaXZlQXR0YWNrIiwicmVzdWx0IiwidW5kZWZpbmVkIiwiaGl0IiwiaXNTdW5rIiwiaXNGbGVldERlc3Ryb3llZCIsIlBsYXllclR5cGUiLCJIVU1BTiIsIkNPTVBVVEVSIiwiY3JlYXRlUGxheWVyIiwibmFtZSIsImJvYXJkU2l6ZSIsImJvYXJkIiwiU2hpcFR5cGUiLCJDQVJSSUVSIiwiQkFUVExFU0hJUCIsIkRFU1RST1lFUiIsIlNVQk1BUklORSIsIlBBVFJPTCIsImdldFNoaXBMZW5ndGgiLCJhcmd1bWVudHMiLCJoaXRzIiwicmVmcmVzaFN2ZyIsImVkaXRTdmciLCJzYXZlU3ZnIiwic2V0dXBHYW1lQm9hcmRzIiwiZ2FtZSIsInBsYXllck9uZSIsInBsYXllclR3byIsImJvYXJkT25lIiwiY3JlYXRlQm9hcmRDb21wb25lbnQiLCJyYW5kb21pemVGb3JtYXRpb24iLCJjb21wb25lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJhZGRFdmVudExpc3RlbmVyIiwiY2xlYXIiLCJib2FyZFR3byIsImZvckVhY2giLCJET01Cb2FyZCIsImJvYXJkSW5kZXgiLCJjaGlsZHJlbiIsInJvdyIsImNlbGwiLCJlZGl0aW5nIiwiaXNNdXRhYmxlIiwiY29udGFpbnMiLCJpc0luUHJvZ3Jlc3MiLCJ0b2dnbGVTaGlwTW90aW9uIiwiaXNBdHRhY2thYmxlIiwiYWN0aXZlIiwiaXNHYW1lT3ZlciIsImlzUGxheWVyV2FpdGluZyIsImF0dGFjayIsInVwZGF0ZUF0dGFja0luZm8iLCJldmVudCIsInJlbmRlciIsInByZXZlbnREZWZhdWx0IiwiZG9jdW1lbnQiLCJrZXkiLCJwbGF5ZXIiLCJhdHRhY2thYmxlIiwibXV0YWJsZSIsImJvYXJkQ29tcG9uZW50IiwiY3JlYXRlRWxlbWVudCIsImJvYXJkSGVhZGVyIiwiaW5uZXJIVE1MIiwiYXBwZW5kQ2hpbGQiLCJyYW5kb21pemVCdXR0b24iLCJlZGl0QnV0dG9uIiwic2F2ZUJ1dHRvbiIsInRpdGxlIiwicmVmcmVzaEljb24iLCJJbWFnZSIsInNyYyIsImVkaXRJY29uIiwic2F2ZUljb24iLCJib2FyZENvbnRyb2xzIiwiYm9hcmRDZWxscyIsInJvd0NvbXBvbmVudCIsImNlbGxDb21wb25lbnQiLCJnZXRDZWxsQ2xhc3NOYW1lIiwibW92aW5nQ2VsbHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwicmVtb3ZlIiwiaXNNb3ZpbmciLCJjbGFzc05hbWUiLCJrZXlzIiwic2hpcExlbmd0aCIsInBsYWNlZCIsIk1hdGgiLCJyYW5kb20iLCJ4IiwiZmxvb3IiLCJ5IiwidG9nZ2xlIiwibW92aW5nU2hpcENlbGwiLCJxdWVyeVNlbGVjdG9yIiwibW92aW5nU2hpcENvb3JkaW5hdGVzIiwiZ2V0Q2VsbEluZGV4IiwibW92aW5nU2hpcEluZGV4IiwibW92ZVN1Y2Nlc3NmdWwiLCJtb3ZlZFNoaXAiLCJjb21wdXRlckF0dGFjayIsImF0dGFja2VySW5kZXgiLCJ2YWxpZCIsIlByb21pc2UiLCJyIiwic2V0VGltZW91dCIsInNhdmVFZGl0cyIsInJlcG9ydFZhbGlkaXR5IiwiYWxlcnQiLCJ0YXJnZXQiLCJ2YWx1ZSIsInRleHRDb250ZW50IiwicHJvdG90eXBlIiwiaW5kZXhPZiIsImNhbGwiLCJwYXJlbnROb2RlIiwic2VjcmV0IiwiR2FtZU1vZGUiLCJGUklFTkQiLCJzZXR1cEdhbWUiLCJtb2RlIiwicGxheWVycyIsImN1cnJlbnRQbGF5ZXJJbmRleCIsImJvYXJkcyIsInN0YXJ0IiwicGxheSIsImdhbWVPdmVyU2NyZWVuIiwiYm9hcmRzQ29udGFpbmVyIiwicmVtb3ZlQ2hpbGQiLCJhcHBlbmQiLCJjdXJyZW50UGxheWVyIiwibmV4dFBsYXllckluZGV4IiwibmV4dFBsYXllciIsImNyZWF0ZUdhbWVPdmVyU2NyZWVuIiwicmVzb2x2ZSIsImNyZWF0ZVBhc3NpbmdTY3JlZW4iLCJhdHRhY2tUeXBlIiwiYXR0YWNrSW5mbyIsImF0dGFja2VyIiwicmVjZWl2ZXIiLCJnYW1lT3Zlck1lc3NhZ2UiLCJ0b1VwcGVyQ2FzZSIsIm91dGVyUmVzZXRCdXR0b24iLCJyZXNldEJ1dHRvbiIsInBhc3NpbmdTY3JlZW4iLCJjb250aW51ZUJ1dHRvbiIsImNyZWF0ZUdhbWVQYWdlIiwiZ2FtZVBhZ2UiLCJzdGFydEJ1dHRvbiIsImNyZWF0ZUhlbHBQYWdlIiwiaGVscFBhZ2UiLCJjcmVhdGVIb21lUGFnZSIsImdhbWVNb2RlIiwiaG9tZVBhZ2UiLCJjb21wdXRlck9wcG9uZW50QnV0dG9uIiwiZnJpZW5kT3Bwb25lbnRCdXR0b24iLCJwbGF5QnV0dG9uIiwiaGVscEJ1dHRvbiIsImJhY2tTdmciLCJsb2dvIiwiY29uc29sZSIsImxvZyIsInJvb3QiLCJnZXRFbGVtZW50QnlJZCIsImJhY2tCdXR0b24iLCJiYWNrSWNvbiIsImN1cnJlbnRQYWdlIiwibmV3UGFnZSJdLCJzb3VyY2VSb290IjoiIn0=