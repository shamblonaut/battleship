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

/***/ "./assets/battleship.svg":
/*!*******************************!*\
  !*** ./assets/battleship.svg ***!
  \*******************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "07b499a2032518261465.svg";

/***/ }),

/***/ "./assets/carrier.svg":
/*!****************************!*\
  !*** ./assets/carrier.svg ***!
  \****************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "c59116e418f3c01d32f0.svg";

/***/ }),

/***/ "./assets/chevron-left.svg":
/*!*********************************!*\
  !*** ./assets/chevron-left.svg ***!
  \*********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "982a40d4f9e3cf9fdaea.svg";

/***/ }),

/***/ "./assets/destroyer.svg":
/*!******************************!*\
  !*** ./assets/destroyer.svg ***!
  \******************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "477dfa7f1117d00499fc.svg";

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

/***/ "./assets/patrol.svg":
/*!***************************!*\
  !*** ./assets/patrol.svg ***!
  \***************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "1225a3d9b8ed839c7415.svg";

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

/***/ "./assets/submarine.svg":
/*!******************************!*\
  !*** ./assets/submarine.svg ***!
  \******************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "c9c87c6456ddd70374c2.svg";

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
/* harmony import */ var _assets_carrier_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../assets/carrier.svg */ "./assets/carrier.svg");
/* harmony import */ var _assets_battleship_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../assets/battleship.svg */ "./assets/battleship.svg");
/* harmony import */ var _assets_destroyer_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../assets/destroyer.svg */ "./assets/destroyer.svg");
/* harmony import */ var _assets_submarine_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../assets/submarine.svg */ "./assets/submarine.svg");
/* harmony import */ var _assets_patrol_svg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../assets/patrol.svg */ "./assets/patrol.svg");











function setupGameBoards(game, playerOne, playerTwo) {
  const boardOne = createBoardComponent(playerOne.board, playerOne, playerTwo.type !== _core_player_js__WEBPACK_IMPORTED_MODULE_1__.PlayerType.COMPUTER, playerOne.type === _core_player_js__WEBPACK_IMPORTED_MODULE_1__.PlayerType.HUMAN, game);
  boardOne.randomizeFormation();
  boardOne.component.classList.add("player-one", playerOne.type === _core_player_js__WEBPACK_IMPORTED_MODULE_1__.PlayerType.HUMAN ? "human" : "computer");
  if (playerTwo.type === _core_player_js__WEBPACK_IMPORTED_MODULE_1__.PlayerType.COMPUTER) {
    boardOne.component.classList.add("only-human");
    boardOne.renderShips();
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
            // DOMBoard.toggleShipMotion([j, i]);
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

          // const shipIndex = DOMBoard.board.getShipIndex([j, i]);
          // const ship = DOMBoard.board.ships[shipIndex];
          //
          // if (!cell.classList.contains("moving")) {
          //   DOMBoard.toggleShipMotion(ship.coordinates);
          // }
          //
          // if (DOMBoard.board.rotateShip(shipIndex)) {
          //   DOMBoard.clear();
          //   DOMBoard.toggleShipMotion(ship.coordinates);
          //   DOMBoard.render();
          // }
          //
          // event.preventDefault();
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
  const shipsContainer = document.createElement("div");
  shipsContainer.classList.add("board-ships");
  boardCells.appendChild(shipsContainer);
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
      Array.from(shipsContainer.children).forEach(shipImage => {
        shipsContainer.removeChild(shipImage);
      });
      const windowWidth = document.documentElement.clientWidth;
      const windowHeight = document.documentElement.clientHeight;
      const isVerticalScreen = windowHeight > windowHeight;
      const cellSize = 4 / 100 * (isVerticalScreen ? windowWidth : windowHeight);
      const gridGap = cellSize / 10;
      this.board.ships.forEach((ship, i) => {
        if (!this.component.classList.contains("editing") && !this.component.classList.contains("only-human") && !ship.isSunk()) {
          return;
        }
        const x = ship.coordinates[0];
        const y = ship.coordinates[1];
        const shipImage = new Image();
        switch (ship.type) {
          case _core_ship_js__WEBPACK_IMPORTED_MODULE_2__.ShipType.CARRIER:
            shipImage.src = _assets_carrier_svg__WEBPACK_IMPORTED_MODULE_6__;
            break;
          case _core_ship_js__WEBPACK_IMPORTED_MODULE_2__.ShipType.BATTLESHIP:
            shipImage.src = _assets_battleship_svg__WEBPACK_IMPORTED_MODULE_7__;
            break;
          case _core_ship_js__WEBPACK_IMPORTED_MODULE_2__.ShipType.DESTROYER:
            shipImage.src = _assets_destroyer_svg__WEBPACK_IMPORTED_MODULE_8__;
            break;
          case _core_ship_js__WEBPACK_IMPORTED_MODULE_2__.ShipType.SUBMARINE:
            shipImage.src = _assets_submarine_svg__WEBPACK_IMPORTED_MODULE_9__;
            break;
          case _core_ship_js__WEBPACK_IMPORTED_MODULE_2__.ShipType.PATROL:
            shipImage.src = _assets_patrol_svg__WEBPACK_IMPORTED_MODULE_10__;
            break;
        }
        shipImage.alt = ship.type;
        shipImage.title = ship.type;
        if (ship.orientation === _core_ship_js__WEBPACK_IMPORTED_MODULE_2__.ShipOrientation.VERTICAL) {
          shipImage.style.transformOrigin = "top left";
          shipImage.style.transform = `rotate(90deg) translateY(-${cellSize}px)`;
        }
        shipImage.style.left = `${x * (cellSize + gridGap)}px`;
        shipImage.style.top = `${y * (cellSize + gridGap)}px`;
        let lastMousePosition = [];
        shipImage.addEventListener("mousedown", event => {
          if (!this.component.classList.contains("editing")) return;
          event.preventDefault();
          this.toggleShipMotion(ship.coordinates);
          lastMousePosition = [event.clientX, event.clientY];
        });
        shipImage.addEventListener("mousemove", event => {
          if (!this.component.classList.contains("editing")) return;
          if (lastMousePosition[0] === undefined) return;
          const parentBounds = event.target.parentElement.getBoundingClientRect();
          const shipBounds = event.target.getBoundingClientRect();
          // console.log(event.clientX - parentBounds.x - shipBounds.width / 2);

          if (ship.orientation === _core_ship_js__WEBPACK_IMPORTED_MODULE_2__.ShipOrientation.HORIZONTAL) {
            shipImage.style.left = `${event.clientX - parentBounds.x - shipBounds.width * ship.length / 5 / 2}px`;
            shipImage.style.top = `${event.clientY - parentBounds.y - shipBounds.height / 2}px`;
          } else {
            shipImage.style.left = `${event.clientX - parentBounds.x - shipBounds.width * ship.length / 10}px`;
            shipImage.style.top = `${event.clientY - parentBounds.y - shipBounds.height * ship.length / 10}px`;
          }
        });
        shipImage.addEventListener("mouseup", event => {
          if (!this.component.classList.contains("editing")) return;
          event.preventDefault();
          this.toggleShipMotion(ship.coordinates);
          try {
            this.board.moveShip(i, [Math.floor(event.target.offsetLeft / (cellSize + gridGap)), Math.floor(event.target.offsetTop / (cellSize + gridGap))]);
          } catch (e) {
            console.log("Error: ", e);
            // this.toggleShipMotion(ship.coordinates);
          }
          this.render();
        });
        shipImage.addEventListener("contextmenu", event => {
          if (!this.component.classList.contains("editing")) return;
          event.preventDefault();
          if (this.board.rotateShip(i)) {
            this.render();
          }
        });
        shipsContainer.appendChild(shipImage);
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
      DOMBoard.render();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQztBQUM1QjhILFFBQVEsQ0FBQzdILEdBQUcsR0FBR3dILHFEQUFPO0FBQ3RCSSxVQUFVLENBQUNuSSxXQUFXLENBQUNvSSxRQUFRLENBQUM7QUFDaENELFVBQVUsQ0FBQ2hLLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNO0VBQ3pDLE1BQU1rSyxXQUFXLEdBQUdKLElBQUksQ0FBQzNHLGFBQWEsQ0FBQyxPQUFPLENBQUM7RUFDL0MsTUFBTWdILE9BQU8sR0FBR2Qsa0VBQWMsQ0FBQyxDQUFDO0VBRWhDLElBQUljLE9BQU8sQ0FBQ3RLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSXFLLFdBQVcsQ0FBQ3JLLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtJQUNwRDtFQUNGO0VBRUFpSyxJQUFJLENBQUM3RyxTQUFTLEdBQUcsRUFBRTtFQUVuQjZHLElBQUksQ0FBQ2pJLFdBQVcsQ0FBQ3NJLE9BQU8sQ0FBQztFQUN6QkQsV0FBVyxDQUFDbkgsTUFBTSxDQUFDLENBQUM7QUFDdEIsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9pbmRleC5jc3M/NGU0MiIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvcmUvZ2FtZUJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29yZS9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb3JlL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb20vYm9hcmRzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb20vcGFnZXMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbS9wYWdlcy9oZWxwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tL3BhZ2VzL2hvbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IHsgY3JlYXRlU2hpcCwgU2hpcE9yaWVudGF0aW9uIH0gZnJvbSBcIi4vc2hpcC5qc1wiO1xuXG5leHBvcnQgY29uc3QgQ2VsbFN0YXRlID0gT2JqZWN0LmZyZWV6ZSh7XG4gIEVNUFRZOiAwLFxuICBNSVNTOiAxLFxuICBTSElQOiAyLFxuICBISVQ6IDMsXG4gIFNVTks6IDQsXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUdhbWVCb2FyZChzaXplKSB7XG4gIGlmIChzaXplIDw9IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGJvYXJkIHNpemVcIik7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHNpemUsXG4gICAgY2VsbHM6IEFycmF5LmZyb20oeyBsZW5ndGg6IHNpemUgfSwgKCkgPT5cbiAgICAgIEFycmF5LmZyb20oeyBsZW5ndGg6IHNpemUgfSwgKCkgPT4gQ2VsbFN0YXRlLkVNUFRZKSxcbiAgICApLFxuICAgIHNoaXBzOiBbXSxcblxuICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmNlbGxzID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogc2l6ZSB9LCAoKSA9PlxuICAgICAgICBBcnJheS5mcm9tKHsgbGVuZ3RoOiBzaXplIH0sICgpID0+IENlbGxTdGF0ZS5FTVBUWSksXG4gICAgICApO1xuICAgICAgdGhpcy5zaGlwcyA9IFtdO1xuICAgIH0sXG5cbiAgICBwbGFjZVNoaXA6IGZ1bmN0aW9uIChzaGlwKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHNoaXAuY29vcmRpbmF0ZXNbMF0gPCAwIHx8XG4gICAgICAgIHNoaXAuY29vcmRpbmF0ZXNbMV0gPCAwIHx8XG4gICAgICAgIHNoaXAuY29vcmRpbmF0ZXNbMF0gPj0gc2l6ZSB8fFxuICAgICAgICBzaGlwLmNvb3JkaW5hdGVzWzFdID49IHNpemVcbiAgICAgICkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgcGxhY2Ugc2hpcCBvdXRzaWRlIHRoZSBib2FyZFwiKTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCAmJlxuICAgICAgICAgIHNoaXAuY29vcmRpbmF0ZXNbMF0gKyBzaGlwLmxlbmd0aCAtIDEgPj0gc2l6ZSkgfHxcbiAgICAgICAgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCAmJlxuICAgICAgICAgIHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDEgPj0gc2l6ZSlcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCkge1xuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1swXTtcbiAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMF0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgaSsrXG4gICAgICAgICkge1xuICAgICAgICAgIGlmICh0aGlzLmNlbGxzW3NoaXAuY29vcmRpbmF0ZXNbMV1dW2ldICE9PSBDZWxsU3RhdGUuRU1QVFkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMKSB7XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzFdO1xuICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1sxXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKHRoaXMuY2VsbHNbaV1bc2hpcC5jb29yZGluYXRlc1swXV0gIT09IENlbGxTdGF0ZS5FTVBUWSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLnNoaXBzLnB1c2goc2hpcCk7XG5cbiAgICAgIGlmIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCkge1xuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1swXTtcbiAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMF0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgaSsrXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuY2VsbHNbc2hpcC5jb29yZGluYXRlc1sxXV1baV0gPSBDZWxsU3RhdGUuU0hJUDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwpIHtcbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMV07XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmNlbGxzW2ldW3NoaXAuY29vcmRpbmF0ZXNbMF1dID0gQ2VsbFN0YXRlLlNISVA7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIG1vdmVTaGlwOiBmdW5jdGlvbiAoc2hpcEluZGV4LCBjb29yZGluYXRlcykge1xuICAgICAgY29uc3Qgc2hpcCA9IHRoaXMuc2hpcHNbc2hpcEluZGV4XTtcbiAgICAgIGlmICghc2hpcCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTaGlwIGRvZXMgbm90IGV4aXN0XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwpIHtcbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMF07XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmNlbGxzW3NoaXAuY29vcmRpbmF0ZXNbMV1dW2ldID0gQ2VsbFN0YXRlLkVNUFRZO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1sxXTtcbiAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgaSsrXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuY2VsbHNbaV1bc2hpcC5jb29yZGluYXRlc1swXV0gPSBDZWxsU3RhdGUuRU1QVFk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICAhdGhpcy5wbGFjZVNoaXAoY3JlYXRlU2hpcChzaGlwLnR5cGUsIGNvb3JkaW5hdGVzLCBzaGlwLm9yaWVudGF0aW9uKSlcbiAgICAgICkge1xuICAgICAgICBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwpIHtcbiAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgICAgaSsrXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmNlbGxzW3NoaXAuY29vcmRpbmF0ZXNbMV1dW2ldID0gQ2VsbFN0YXRlLlNISVA7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMV07XG4gICAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBpKytcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuY2VsbHNbaV1bc2hpcC5jb29yZGluYXRlc1swXV0gPSBDZWxsU3RhdGUuU0hJUDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNoaXBzW3NoaXBJbmRleF0gPSB0aGlzLnNoaXBzLnBvcCgpO1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuXG4gICAgcm90YXRlU2hpcDogZnVuY3Rpb24gKHNoaXBJbmRleCkge1xuICAgICAgY29uc3Qgc2hpcCA9IHRoaXMuc2hpcHNbc2hpcEluZGV4XTtcbiAgICAgIGlmICghc2hpcCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTaGlwIGRvZXMgbm90IGV4aXN0XCIpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBuZXdPcmllbnRhdGlvbiA9XG4gICAgICAgIHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMXG4gICAgICAgICAgPyBTaGlwT3JpZW50YXRpb24uVkVSVElDQUxcbiAgICAgICAgICA6IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMO1xuXG4gICAgICBpZiAobmV3T3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMKSB7XG4gICAgICAgIGlmIChzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxID49IHRoaXMuc2l6ZSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgMTtcbiAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMF0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgaSsrXG4gICAgICAgICkge1xuICAgICAgICAgIGlmICh0aGlzLmNlbGxzW3NoaXAuY29vcmRpbmF0ZXNbMV1dW2ldICE9PSBDZWxsU3RhdGUuRU1QVFkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAobmV3T3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICBpZiAoc2hpcC5jb29yZGluYXRlc1sxXSArIHNoaXAubGVuZ3RoIC0gMSA+PSB0aGlzLnNpemUpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1sxXSArIDE7XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICBpZiAodGhpcy5jZWxsc1tpXVtzaGlwLmNvb3JkaW5hdGVzWzBdXSAhPT0gQ2VsbFN0YXRlLkVNUFRZKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChuZXdPcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwpIHtcbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMV07XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmNlbGxzW2ldW3NoaXAuY29vcmRpbmF0ZXNbMF1dID0gQ2VsbFN0YXRlLkVNUFRZO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5jZWxsc1tzaGlwLmNvb3JkaW5hdGVzWzFdXVtpXSA9IENlbGxTdGF0ZS5TSElQO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKG5ld09yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwpIHtcbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMF07XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmNlbGxzW3NoaXAuY29vcmRpbmF0ZXNbMV1dW2ldID0gQ2VsbFN0YXRlLkVNUFRZO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzFdO1xuICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1sxXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5jZWxsc1tpXVtzaGlwLmNvb3JkaW5hdGVzWzBdXSA9IENlbGxTdGF0ZS5TSElQO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHNoaXAub3JpZW50YXRpb24gPSBuZXdPcmllbnRhdGlvbjtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICBnZXRTaGlwSW5kZXg6IGZ1bmN0aW9uIChjb29yZGluYXRlcykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLnNoaXBzW2ldLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCkge1xuICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICBsZXQgaiA9IHRoaXMuc2hpcHNbaV0uY29vcmRpbmF0ZXNbMF07XG4gICAgICAgICAgICBqIDw9IHRoaXMuc2hpcHNbaV0uY29vcmRpbmF0ZXNbMF0gKyB0aGlzLnNoaXBzW2ldLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBqKytcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgY29vcmRpbmF0ZXNbMF0gPT09IGogJiZcbiAgICAgICAgICAgICAgY29vcmRpbmF0ZXNbMV0gPT09IHRoaXMuc2hpcHNbaV0uY29vcmRpbmF0ZXNbMV1cbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zaGlwc1tpXS5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMKSB7XG4gICAgICAgICAgZm9yIChcbiAgICAgICAgICAgIGxldCBqID0gdGhpcy5zaGlwc1tpXS5jb29yZGluYXRlc1sxXTtcbiAgICAgICAgICAgIGogPD0gdGhpcy5zaGlwc1tpXS5jb29yZGluYXRlc1sxXSArIHRoaXMuc2hpcHNbaV0ubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGorK1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBjb29yZGluYXRlc1swXSA9PT0gdGhpcy5zaGlwc1tpXS5jb29yZGluYXRlc1swXSAmJlxuICAgICAgICAgICAgICBjb29yZGluYXRlc1sxXSA9PT0galxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBObyBzaGlwIGZvdW5kIGF0IGdpdmVuIGluZGV4OiBbJHtjb29yZGluYXRlc1swXX0sICR7Y29vcmRpbmF0ZXNbMV19XWAsXG4gICAgICApO1xuICAgIH0sXG5cbiAgICByZWNlaXZlQXR0YWNrOiBmdW5jdGlvbiAoY29vcmRpbmF0ZXMpIHtcbiAgICAgIGlmIChcbiAgICAgICAgY29vcmRpbmF0ZXNbMF0gPCAwIHx8XG4gICAgICAgIGNvb3JkaW5hdGVzWzFdIDwgMCB8fFxuICAgICAgICBjb29yZGluYXRlc1swXSA+PSBzaXplIHx8XG4gICAgICAgIGNvb3JkaW5hdGVzWzFdID49IHNpemVcbiAgICAgICkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgYXR0YWNrIG91dHNpZGUgdGhlIGJvYXJkXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuY2VsbHNbY29vcmRpbmF0ZXNbMV1dW2Nvb3JkaW5hdGVzWzBdXSAhPT0gQ2VsbFN0YXRlLkVNUFRZICYmXG4gICAgICAgIHRoaXMuY2VsbHNbY29vcmRpbmF0ZXNbMV1dW2Nvb3JkaW5hdGVzWzBdXSAhPT0gQ2VsbFN0YXRlLlNISVBcbiAgICAgICkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDZWxsIGhhcyBhbHJlYWR5IGJlZW4gYXR0YWNrZWRcIik7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmNlbGxzW2Nvb3JkaW5hdGVzWzFdXVtjb29yZGluYXRlc1swXV0gIT09IENlbGxTdGF0ZS5TSElQKSB7XG4gICAgICAgIHRoaXMuY2VsbHNbY29vcmRpbmF0ZXNbMV1dW2Nvb3JkaW5hdGVzWzBdXSA9IENlbGxTdGF0ZS5NSVNTO1xuICAgICAgICByZXR1cm4geyByZXN1bHQ6IENlbGxTdGF0ZS5NSVNTLCBzaGlwOiB1bmRlZmluZWQgfTtcbiAgICAgIH1cblxuICAgICAgZm9yIChjb25zdCBzaGlwIG9mIHRoaXMuc2hpcHMpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCAmJlxuICAgICAgICAgICAgY29vcmRpbmF0ZXNbMV0gPT09IHNoaXAuY29vcmRpbmF0ZXNbMV0gJiZcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzWzBdID49IHNoaXAuY29vcmRpbmF0ZXNbMF0gJiZcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzWzBdIDw9IHNoaXAuY29vcmRpbmF0ZXNbMF0gKyBzaGlwLmxlbmd0aCAtIDEpIHx8XG4gICAgICAgICAgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCAmJlxuICAgICAgICAgICAgY29vcmRpbmF0ZXNbMF0gPT09IHNoaXAuY29vcmRpbmF0ZXNbMF0gJiZcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzWzFdID49IHNoaXAuY29vcmRpbmF0ZXNbMV0gJiZcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzWzFdIDw9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDEpXG4gICAgICAgICkge1xuICAgICAgICAgIHNoaXAuaGl0KCk7XG5cbiAgICAgICAgICBpZiAoc2hpcC5pc1N1bmsoKSkge1xuICAgICAgICAgICAgaWYgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMKSB7XG4gICAgICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICBpKytcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jZWxsc1tzaGlwLmNvb3JkaW5hdGVzWzFdXVtpXSA9IENlbGxTdGF0ZS5TVU5LO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1sxXTtcbiAgICAgICAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgaSsrXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2VsbHNbaV1bc2hpcC5jb29yZGluYXRlc1swXV0gPSBDZWxsU3RhdGUuU1VOSztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNlbGxzW2Nvb3JkaW5hdGVzWzFdXVtjb29yZGluYXRlc1swXV0gPSBDZWxsU3RhdGUuSElUO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7IHJlc3VsdDogdGhpcy5jZWxsc1tjb29yZGluYXRlc1sxXV1bY29vcmRpbmF0ZXNbMF1dLCBzaGlwIH07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgaXNGbGVldERlc3Ryb3llZDogZnVuY3Rpb24gKCkge1xuICAgICAgZm9yIChjb25zdCBzaGlwIG9mIHRoaXMuc2hpcHMpIHtcbiAgICAgICAgaWYgKCFzaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gIH07XG59XG4iLCJpbXBvcnQgeyBjcmVhdGVHYW1lQm9hcmQgfSBmcm9tIFwiLi9nYW1lQm9hcmQuanNcIjtcblxuZXhwb3J0IGNvbnN0IFBsYXllclR5cGUgPSBPYmplY3QuZnJlZXplKHtcbiAgSFVNQU46IFwiSFVNQU5cIixcbiAgQ09NUFVURVI6IFwiQ09NUFVURVJcIixcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUGxheWVyKG5hbWUsIHR5cGUsIGJvYXJkU2l6ZSkge1xuICByZXR1cm4ge1xuICAgIG5hbWUsXG4gICAgdHlwZSxcbiAgICBib2FyZDogY3JlYXRlR2FtZUJvYXJkKGJvYXJkU2l6ZSksXG4gIH07XG59XG4iLCJleHBvcnQgY29uc3QgU2hpcFR5cGUgPSBPYmplY3QuZnJlZXplKHtcbiAgQ0FSUklFUjogXCJDYXJyaWVyXCIsXG4gIEJBVFRMRVNISVA6IFwiQmF0dGxlc2hpcFwiLFxuICBERVNUUk9ZRVI6IFwiRGVzdHJveWVyXCIsXG4gIFNVQk1BUklORTogXCJTdWJtYXJpbmVcIixcbiAgUEFUUk9MOiBcIlBhdHJvbCBCb2F0XCIsXG59KTtcblxuZXhwb3J0IGNvbnN0IFNoaXBPcmllbnRhdGlvbiA9IE9iamVjdC5mcmVlemUoe1xuICBIT1JJWk9OVEFMOiBcIkhPUklaT05UQUxcIixcbiAgVkVSVElDQUw6IFwiVkVSVElDQUxcIixcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2hpcExlbmd0aCh0eXBlKSB7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgU2hpcFR5cGUuQ0FSUklFUjpcbiAgICAgIHJldHVybiA1O1xuICAgIGNhc2UgU2hpcFR5cGUuQkFUVExFU0hJUDpcbiAgICAgIHJldHVybiA0O1xuICAgIGNhc2UgU2hpcFR5cGUuREVTVFJPWUVSOlxuICAgICAgcmV0dXJuIDM7XG4gICAgY2FzZSBTaGlwVHlwZS5TVUJNQVJJTkU6XG4gICAgICByZXR1cm4gMztcbiAgICBjYXNlIFNoaXBUeXBlLlBBVFJPTDpcbiAgICAgIHJldHVybiAyO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTaGlwKFxuICB0eXBlLFxuICBjb29yZGluYXRlcyA9IFt1bmRlZmluZWQsIHVuZGVmaW5lZF0sXG4gIG9yaWVudGF0aW9uID0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwsXG4pIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiB0eXBlLFxuICAgIGxlbmd0aDogZ2V0U2hpcExlbmd0aCh0eXBlKSxcbiAgICBjb29yZGluYXRlcyxcbiAgICBvcmllbnRhdGlvbixcbiAgICBoaXRzOiAwLFxuXG4gICAgaGl0OiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpcy5oaXRzIDwgdGhpcy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5oaXRzKys7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGlzU3VuazogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGl0cyA9PT0gdGhpcy5sZW5ndGg7XG4gICAgfSxcbiAgfTtcbn1cbiIsImltcG9ydCB7IENlbGxTdGF0ZSB9IGZyb20gXCIuLi9jb3JlL2dhbWVCb2FyZC5qc1wiO1xuaW1wb3J0IHsgUGxheWVyVHlwZSB9IGZyb20gXCIuLi9jb3JlL3BsYXllci5qc1wiO1xuaW1wb3J0IHtcbiAgY3JlYXRlU2hpcCxcbiAgZ2V0U2hpcExlbmd0aCxcbiAgU2hpcE9yaWVudGF0aW9uLFxuICBTaGlwVHlwZSxcbn0gZnJvbSBcIi4uL2NvcmUvc2hpcC5qc1wiO1xuXG5pbXBvcnQgcmVmcmVzaFN2ZyBmcm9tIFwiLi4vLi4vYXNzZXRzL3JlZnJlc2gtY2N3LnN2Z1wiO1xuaW1wb3J0IGVkaXRTdmcgZnJvbSBcIi4uLy4uL2Fzc2V0cy9lZGl0LnN2Z1wiO1xuaW1wb3J0IHNhdmVTdmcgZnJvbSBcIi4uLy4uL2Fzc2V0cy9zYXZlLnN2Z1wiO1xuXG5pbXBvcnQgY2FycmllclN2ZyBmcm9tIFwiLi4vLi4vYXNzZXRzL2NhcnJpZXIuc3ZnXCI7XG5pbXBvcnQgYmF0dGxlc2hpcFN2ZyBmcm9tIFwiLi4vLi4vYXNzZXRzL2JhdHRsZXNoaXAuc3ZnXCI7XG5pbXBvcnQgZGVzdHJveWVyU3ZnIGZyb20gXCIuLi8uLi9hc3NldHMvZGVzdHJveWVyLnN2Z1wiO1xuaW1wb3J0IHN1Ym1hcmluZVN2ZyBmcm9tIFwiLi4vLi4vYXNzZXRzL3N1Ym1hcmluZS5zdmdcIjtcbmltcG9ydCBwYXRyb2xTdmcgZnJvbSBcIi4uLy4uL2Fzc2V0cy9wYXRyb2wuc3ZnXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cEdhbWVCb2FyZHMoZ2FtZSwgcGxheWVyT25lLCBwbGF5ZXJUd28pIHtcbiAgY29uc3QgYm9hcmRPbmUgPSBjcmVhdGVCb2FyZENvbXBvbmVudChcbiAgICBwbGF5ZXJPbmUuYm9hcmQsXG4gICAgcGxheWVyT25lLFxuICAgIHBsYXllclR3by50eXBlICE9PSBQbGF5ZXJUeXBlLkNPTVBVVEVSLFxuICAgIHBsYXllck9uZS50eXBlID09PSBQbGF5ZXJUeXBlLkhVTUFOLFxuICAgIGdhbWUsXG4gICk7XG4gIGJvYXJkT25lLnJhbmRvbWl6ZUZvcm1hdGlvbigpO1xuXG4gIGJvYXJkT25lLmNvbXBvbmVudC5jbGFzc0xpc3QuYWRkKFxuICAgIFwicGxheWVyLW9uZVwiLFxuICAgIHBsYXllck9uZS50eXBlID09PSBQbGF5ZXJUeXBlLkhVTUFOID8gXCJodW1hblwiIDogXCJjb21wdXRlclwiLFxuICApO1xuICBpZiAocGxheWVyVHdvLnR5cGUgPT09IFBsYXllclR5cGUuQ09NUFVURVIpIHtcbiAgICBib2FyZE9uZS5jb21wb25lbnQuY2xhc3NMaXN0LmFkZChcIm9ubHktaHVtYW5cIik7XG4gICAgYm9hcmRPbmUucmVuZGVyU2hpcHMoKTtcbiAgfVxuICBib2FyZE9uZS5jb21wb25lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGJvYXJkT25lLmNsZWFyKCksIHRydWUpO1xuXG4gIGNvbnN0IGJvYXJkVHdvID0gY3JlYXRlQm9hcmRDb21wb25lbnQoXG4gICAgcGxheWVyVHdvLmJvYXJkLFxuICAgIHBsYXllclR3byxcbiAgICBwbGF5ZXJPbmUudHlwZSAhPT0gUGxheWVyVHlwZS5DT01QVVRFUixcbiAgICBwbGF5ZXJUd28udHlwZSA9PT0gUGxheWVyVHlwZS5IVU1BTixcbiAgICBnYW1lLFxuICApO1xuICBib2FyZFR3by5yYW5kb21pemVGb3JtYXRpb24oKTtcblxuICBib2FyZFR3by5jb21wb25lbnQuY2xhc3NMaXN0LmFkZChcbiAgICBcInBsYXllci10d29cIixcbiAgICBwbGF5ZXJUd28udHlwZSA9PT0gUGxheWVyVHlwZS5IVU1BTiA/IFwiaHVtYW5cIiA6IFwiY29tcHV0ZXJcIixcbiAgKTtcblxuICBbYm9hcmRPbmUsIGJvYXJkVHdvXS5mb3JFYWNoKChET01Cb2FyZCwgYm9hcmRJbmRleCkgPT4ge1xuICAgIEFycmF5LmZyb20oRE9NQm9hcmQuY29tcG9uZW50LmNoaWxkcmVuWzFdLmNoaWxkcmVuKS5mb3JFYWNoKChyb3csIGkpID0+IHtcbiAgICAgIEFycmF5LmZyb20ocm93LmNoaWxkcmVuKS5mb3JFYWNoKChjZWxsLCBqKSA9PiB7XG4gICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBET01Cb2FyZC5lZGl0aW5nICYmXG4gICAgICAgICAgICBET01Cb2FyZC5pc011dGFibGUoKSAmJlxuICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJzaGlwXCIpICYmXG4gICAgICAgICAgICAhZ2FtZS5pc0luUHJvZ3Jlc3NcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIC8vIERPTUJvYXJkLnRvZ2dsZVNoaXBNb3Rpb24oW2osIGldKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgRE9NQm9hcmQuaXNBdHRhY2thYmxlKCkgJiZcbiAgICAgICAgICAgIERPTUJvYXJkLmFjdGl2ZSAmJlxuICAgICAgICAgICAgZ2FtZS5pc0luUHJvZ3Jlc3MgJiZcbiAgICAgICAgICAgICFnYW1lLmlzR2FtZU92ZXIgJiZcbiAgICAgICAgICAgIGdhbWUuaXNQbGF5ZXJXYWl0aW5nXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zdCBhdHRhY2sgPSBET01Cb2FyZC5yZWNlaXZlQXR0YWNrKFtqLCBpXSk7XG4gICAgICAgICAgICBpZiAoYXR0YWNrKSB7XG4gICAgICAgICAgICAgIGdhbWUudXBkYXRlQXR0YWNrSW5mbyhcbiAgICAgICAgICAgICAgICBhdHRhY2sucmVzdWx0LFxuICAgICAgICAgICAgICAgIGF0dGFjay5zaGlwLFxuICAgICAgICAgICAgICAgIChib2FyZEluZGV4ICsgMSkgJSAyLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBnYW1lLmlzUGxheWVyV2FpdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiY29udGV4dG1lbnVcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIURPTUJvYXJkLmVkaXRpbmcgfHxcbiAgICAgICAgICAgICFET01Cb2FyZC5pc011dGFibGUoKSB8fFxuICAgICAgICAgICAgZ2FtZS5pc0luUHJvZ3Jlc3MgfHxcbiAgICAgICAgICAgICFjZWxsLmNsYXNzTGlzdC5jb250YWlucyhcInNoaXBcIilcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBjb25zdCBzaGlwSW5kZXggPSBET01Cb2FyZC5ib2FyZC5nZXRTaGlwSW5kZXgoW2osIGldKTtcbiAgICAgICAgICAvLyBjb25zdCBzaGlwID0gRE9NQm9hcmQuYm9hcmQuc2hpcHNbc2hpcEluZGV4XTtcbiAgICAgICAgICAvL1xuICAgICAgICAgIC8vIGlmICghY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb3ZpbmdcIikpIHtcbiAgICAgICAgICAvLyAgIERPTUJvYXJkLnRvZ2dsZVNoaXBNb3Rpb24oc2hpcC5jb29yZGluYXRlcyk7XG4gICAgICAgICAgLy8gfVxuICAgICAgICAgIC8vXG4gICAgICAgICAgLy8gaWYgKERPTUJvYXJkLmJvYXJkLnJvdGF0ZVNoaXAoc2hpcEluZGV4KSkge1xuICAgICAgICAgIC8vICAgRE9NQm9hcmQuY2xlYXIoKTtcbiAgICAgICAgICAvLyAgIERPTUJvYXJkLnRvZ2dsZVNoaXBNb3Rpb24oc2hpcC5jb29yZGluYXRlcyk7XG4gICAgICAgICAgLy8gICBET01Cb2FyZC5yZW5kZXIoKTtcbiAgICAgICAgICAvLyB9XG4gICAgICAgICAgLy9cbiAgICAgICAgICAvLyBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZXZlbnQpID0+IHtcbiAgICBpZiAoYm9hcmRPbmUuZWRpdGluZykgYm9hcmRPbmUubW92ZVNoaXAoZXZlbnQua2V5KTtcbiAgICBlbHNlIGlmIChib2FyZFR3by5lZGl0aW5nKSBib2FyZFR3by5tb3ZlU2hpcChldmVudC5rZXkpO1xuICB9KTtcblxuICByZXR1cm4gW2JvYXJkT25lLCBib2FyZFR3b107XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVCb2FyZENvbXBvbmVudChib2FyZCwgcGxheWVyLCBhdHRhY2thYmxlLCBtdXRhYmxlLCBnYW1lKSB7XG4gIGNvbnN0IGJvYXJkQ29tcG9uZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgYm9hcmRDb21wb25lbnQuY2xhc3NMaXN0LmFkZChcImJvYXJkXCIpO1xuXG4gIGNvbnN0IGJvYXJkSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIik7XG4gIGJvYXJkSGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJib2FyZC1oZWFkZXJcIik7XG4gIGJvYXJkSGVhZGVyLmlubmVySFRNTCA9IGBcbiAgICA8cCBjbGFzcz1cInBsYXllci1uYW1lXCI+JHtwbGF5ZXIubmFtZX08L3A+XG4gICAgPGlucHV0IGNsYXNzPVwicGxheWVyLW5hbWUtaW5wdXQgaGlkZGVuXCIgdHlwZT1cInRleHRcIiByZXF1aXJlZCB2YWx1ZT1cIiR7cGxheWVyLm5hbWV9XCIgLz5cbiAgYDtcbiAgYm9hcmRDb21wb25lbnQuYXBwZW5kQ2hpbGQoYm9hcmRIZWFkZXIpO1xuXG4gIGxldCByYW5kb21pemVCdXR0b24sIGVkaXRCdXR0b24sIHNhdmVCdXR0b247XG4gIGlmIChwbGF5ZXIudHlwZSA9PT0gUGxheWVyVHlwZS5IVU1BTikge1xuICAgIHJhbmRvbWl6ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgcmFuZG9taXplQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJyYW5kb21pemUtYm9hcmRcIik7XG4gICAgcmFuZG9taXplQnV0dG9uLnRpdGxlID0gXCJSYW5kb21pemUgc2hpcCBwbGFjZW1lbnRcIjtcbiAgICByYW5kb21pemVCdXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XG4gICAgY29uc3QgcmVmcmVzaEljb24gPSBuZXcgSW1hZ2UoKTtcbiAgICByZWZyZXNoSWNvbi5zcmMgPSByZWZyZXNoU3ZnO1xuICAgIHJhbmRvbWl6ZUJ1dHRvbi5hcHBlbmRDaGlsZChyZWZyZXNoSWNvbik7XG5cbiAgICBlZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBlZGl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJlZGl0LWJvYXJkXCIpO1xuICAgIGVkaXRCdXR0b24udGl0bGUgPSBcIkVkaXQgYm9hcmQgKGNoYW5nZSBuYW1lLCBtb3ZlIHNoaXBzKVwiO1xuICAgIGVkaXRCdXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XG4gICAgY29uc3QgZWRpdEljb24gPSBuZXcgSW1hZ2UoKTtcbiAgICBlZGl0SWNvbi5zcmMgPSBlZGl0U3ZnO1xuICAgIGVkaXRCdXR0b24uYXBwZW5kQ2hpbGQoZWRpdEljb24pO1xuXG4gICAgc2F2ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgc2F2ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwic2F2ZS1ib2FyZFwiLCBcImhpZGRlblwiKTtcbiAgICBzYXZlQnV0dG9uLnRpdGxlID0gXCJTYXZlIGJvYXJkXCI7XG4gICAgc2F2ZUJ1dHRvbi50eXBlID0gXCJidXR0b25cIjtcbiAgICBjb25zdCBzYXZlSWNvbiA9IG5ldyBJbWFnZSgpO1xuICAgIHNhdmVJY29uLnNyYyA9IHNhdmVTdmc7XG4gICAgc2F2ZUJ1dHRvbi5hcHBlbmRDaGlsZChzYXZlSWNvbik7XG5cbiAgICBjb25zdCBib2FyZENvbnRyb2xzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBib2FyZENvbnRyb2xzLmNsYXNzTGlzdC5hZGQoXCJib2FyZC1jb250cm9sc1wiKTtcbiAgICBib2FyZENvbnRyb2xzLmFwcGVuZENoaWxkKHJhbmRvbWl6ZUJ1dHRvbik7XG4gICAgYm9hcmRDb250cm9scy5hcHBlbmRDaGlsZChlZGl0QnV0dG9uKTtcbiAgICBib2FyZENvbnRyb2xzLmFwcGVuZENoaWxkKHNhdmVCdXR0b24pO1xuICAgIGJvYXJkSGVhZGVyLmFwcGVuZENoaWxkKGJvYXJkQ29udHJvbHMpO1xuICB9XG5cbiAgY29uc3QgYm9hcmRDZWxscyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGJvYXJkQ2VsbHMuY2xhc3NMaXN0LmFkZChcImJvYXJkLWNlbGxzXCIpO1xuICBib2FyZENvbXBvbmVudC5hcHBlbmRDaGlsZChib2FyZENlbGxzKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGJvYXJkLmNlbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qgcm93Q29tcG9uZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICByb3dDb21wb25lbnQuY2xhc3NMaXN0LmFkZChcInJvd1wiKTtcblxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgYm9hcmQuY2VsbHNbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgIGNvbnN0IGNlbGxDb21wb25lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgY2VsbENvbXBvbmVudC5jbGFzc0xpc3QuYWRkKFwiY2VsbFwiKTtcbiAgICAgIGNlbGxDb21wb25lbnQuY2xhc3NMaXN0LmFkZChnZXRDZWxsQ2xhc3NOYW1lKFtqLCBpXSwgYm9hcmQpKTtcbiAgICAgIHJvd0NvbXBvbmVudC5hcHBlbmRDaGlsZChjZWxsQ29tcG9uZW50KTtcbiAgICB9XG5cbiAgICBib2FyZENlbGxzLmFwcGVuZENoaWxkKHJvd0NvbXBvbmVudCk7XG4gIH1cblxuICBjb25zdCBzaGlwc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHNoaXBzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJib2FyZC1zaGlwc1wiKTtcbiAgYm9hcmRDZWxscy5hcHBlbmRDaGlsZChzaGlwc0NvbnRhaW5lcik7XG5cbiAgY29uc3QgRE9NQm9hcmQgPSB7XG4gICAgY29tcG9uZW50OiBib2FyZENvbXBvbmVudCxcbiAgICBib2FyZDogYm9hcmQsXG4gICAgYWN0aXZlOiBmYWxzZSxcbiAgICBlZGl0aW5nOiBmYWxzZSxcblxuICAgIGlzQXR0YWNrYWJsZTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGF0dGFja2FibGU7XG4gICAgfSxcblxuICAgIGlzTXV0YWJsZTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG11dGFibGU7XG4gICAgfSxcblxuICAgIGNsZWFyOiBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBtb3ZpbmdDZWxscyA9XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmNoaWxkcmVuWzFdLnF1ZXJ5U2VsZWN0b3JBbGwoXCIubW92aW5nXCIpO1xuICAgICAgaWYgKG1vdmluZ0NlbGxzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgZm9yIChjb25zdCBjZWxsIG9mIG1vdmluZ0NlbGxzKSB7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZShcIm1vdmluZ1wiKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICBBcnJheS5mcm9tKHRoaXMuY29tcG9uZW50LmNoaWxkcmVuWzFdLmNoaWxkcmVuKS5mb3JFYWNoKChyb3csIGkpID0+IHtcbiAgICAgICAgaWYgKHJvdy5jbGFzc05hbWUgPT09IFwiYm9hcmQtc2hpcHNcIikgcmV0dXJuO1xuXG4gICAgICAgIEFycmF5LmZyb20ocm93LmNoaWxkcmVuKS5mb3JFYWNoKChjZWxsLCBqKSA9PiB7XG4gICAgICAgICAgY29uc3QgaXNNb3ZpbmcgPSBjZWxsLmNsYXNzTGlzdC5jb250YWlucyhcIm1vdmluZ1wiKTtcblxuICAgICAgICAgIGNlbGwuY2xhc3NOYW1lID0gXCJjZWxsXCI7XG4gICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKGdldENlbGxDbGFzc05hbWUoW2osIGldLCB0aGlzLmJvYXJkKSk7XG4gICAgICAgICAgaWYgKGlzTW92aW5nKSBjZWxsLmNsYXNzTGlzdC5hZGQoXCJtb3ZpbmdcIik7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMucmVuZGVyU2hpcHMoKTtcbiAgICB9LFxuXG4gICAgcmVuZGVyU2hpcHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IHNoaXBzQ29udGFpbmVyID0gdGhpcy5jb21wb25lbnQucXVlcnlTZWxlY3RvcihcIi5ib2FyZC1zaGlwc1wiKTtcblxuICAgICAgQXJyYXkuZnJvbShzaGlwc0NvbnRhaW5lci5jaGlsZHJlbikuZm9yRWFjaCgoc2hpcEltYWdlKSA9PiB7XG4gICAgICAgIHNoaXBzQ29udGFpbmVyLnJlbW92ZUNoaWxkKHNoaXBJbWFnZSk7XG4gICAgICB9KTtcblxuICAgICAgY29uc3Qgd2luZG93V2lkdGggPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgICBjb25zdCB3aW5kb3dIZWlnaHQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuXG4gICAgICBjb25zdCBpc1ZlcnRpY2FsU2NyZWVuID0gd2luZG93SGVpZ2h0ID4gd2luZG93SGVpZ2h0O1xuXG4gICAgICBjb25zdCBjZWxsU2l6ZSA9XG4gICAgICAgICg0IC8gMTAwKSAqIChpc1ZlcnRpY2FsU2NyZWVuID8gd2luZG93V2lkdGggOiB3aW5kb3dIZWlnaHQpO1xuICAgICAgY29uc3QgZ3JpZEdhcCA9IGNlbGxTaXplIC8gMTA7XG5cbiAgICAgIHRoaXMuYm9hcmQuc2hpcHMuZm9yRWFjaCgoc2hpcCwgaSkgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgIXRoaXMuY29tcG9uZW50LmNsYXNzTGlzdC5jb250YWlucyhcImVkaXRpbmdcIikgJiZcbiAgICAgICAgICAhdGhpcy5jb21wb25lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwib25seS1odW1hblwiKSAmJlxuICAgICAgICAgICFzaGlwLmlzU3VuaygpXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB4ID0gc2hpcC5jb29yZGluYXRlc1swXTtcbiAgICAgICAgY29uc3QgeSA9IHNoaXAuY29vcmRpbmF0ZXNbMV07XG5cbiAgICAgICAgY29uc3Qgc2hpcEltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHN3aXRjaCAoc2hpcC50eXBlKSB7XG4gICAgICAgICAgY2FzZSBTaGlwVHlwZS5DQVJSSUVSOlxuICAgICAgICAgICAgc2hpcEltYWdlLnNyYyA9IGNhcnJpZXJTdmc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFNoaXBUeXBlLkJBVFRMRVNISVA6XG4gICAgICAgICAgICBzaGlwSW1hZ2Uuc3JjID0gYmF0dGxlc2hpcFN2ZztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgU2hpcFR5cGUuREVTVFJPWUVSOlxuICAgICAgICAgICAgc2hpcEltYWdlLnNyYyA9IGRlc3Ryb3llclN2ZztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgU2hpcFR5cGUuU1VCTUFSSU5FOlxuICAgICAgICAgICAgc2hpcEltYWdlLnNyYyA9IHN1Ym1hcmluZVN2ZztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgU2hpcFR5cGUuUEFUUk9MOlxuICAgICAgICAgICAgc2hpcEltYWdlLnNyYyA9IHBhdHJvbFN2ZztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHNoaXBJbWFnZS5hbHQgPSBzaGlwLnR5cGU7XG4gICAgICAgIHNoaXBJbWFnZS50aXRsZSA9IHNoaXAudHlwZTtcblxuICAgICAgICBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMKSB7XG4gICAgICAgICAgc2hpcEltYWdlLnN0eWxlLnRyYW5zZm9ybU9yaWdpbiA9IFwidG9wIGxlZnRcIjtcbiAgICAgICAgICBzaGlwSW1hZ2Uuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZSg5MGRlZykgdHJhbnNsYXRlWSgtJHtjZWxsU2l6ZX1weClgO1xuICAgICAgICB9XG5cbiAgICAgICAgc2hpcEltYWdlLnN0eWxlLmxlZnQgPSBgJHt4ICogKGNlbGxTaXplICsgZ3JpZEdhcCl9cHhgO1xuICAgICAgICBzaGlwSW1hZ2Uuc3R5bGUudG9wID0gYCR7eSAqIChjZWxsU2l6ZSArIGdyaWRHYXApfXB4YDtcblxuICAgICAgICBsZXQgbGFzdE1vdXNlUG9zaXRpb24gPSBbXTtcblxuICAgICAgICBzaGlwSW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICBpZiAoIXRoaXMuY29tcG9uZW50LmNsYXNzTGlzdC5jb250YWlucyhcImVkaXRpbmdcIikpIHJldHVybjtcblxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy50b2dnbGVTaGlwTW90aW9uKHNoaXAuY29vcmRpbmF0ZXMpO1xuICAgICAgICAgIGxhc3RNb3VzZVBvc2l0aW9uID0gW2V2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFldO1xuICAgICAgICB9KTtcblxuICAgICAgICBzaGlwSW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICBpZiAoIXRoaXMuY29tcG9uZW50LmNsYXNzTGlzdC5jb250YWlucyhcImVkaXRpbmdcIikpIHJldHVybjtcblxuICAgICAgICAgIGlmIChsYXN0TW91c2VQb3NpdGlvblswXSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG4gICAgICAgICAgY29uc3QgcGFyZW50Qm91bmRzID1cbiAgICAgICAgICAgIGV2ZW50LnRhcmdldC5wYXJlbnRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgIGNvbnN0IHNoaXBCb3VuZHMgPSBldmVudC50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coZXZlbnQuY2xpZW50WCAtIHBhcmVudEJvdW5kcy54IC0gc2hpcEJvdW5kcy53aWR0aCAvIDIpO1xuXG4gICAgICAgICAgaWYgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMKSB7XG4gICAgICAgICAgICBzaGlwSW1hZ2Uuc3R5bGUubGVmdCA9IGAke2V2ZW50LmNsaWVudFggLSBwYXJlbnRCb3VuZHMueCAtIChzaGlwQm91bmRzLndpZHRoICogc2hpcC5sZW5ndGgpIC8gNSAvIDJ9cHhgO1xuICAgICAgICAgICAgc2hpcEltYWdlLnN0eWxlLnRvcCA9IGAke2V2ZW50LmNsaWVudFkgLSBwYXJlbnRCb3VuZHMueSAtIHNoaXBCb3VuZHMuaGVpZ2h0IC8gMn1weGA7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNoaXBJbWFnZS5zdHlsZS5sZWZ0ID0gYCR7ZXZlbnQuY2xpZW50WCAtIHBhcmVudEJvdW5kcy54IC0gKHNoaXBCb3VuZHMud2lkdGggKiBzaGlwLmxlbmd0aCkgLyAxMH1weGA7XG4gICAgICAgICAgICBzaGlwSW1hZ2Uuc3R5bGUudG9wID0gYCR7ZXZlbnQuY2xpZW50WSAtIHBhcmVudEJvdW5kcy55IC0gKHNoaXBCb3VuZHMuaGVpZ2h0ICogc2hpcC5sZW5ndGgpIC8gMTB9cHhgO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2hpcEltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIChldmVudCkgPT4ge1xuICAgICAgICAgIGlmICghdGhpcy5jb21wb25lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZWRpdGluZ1wiKSkgcmV0dXJuO1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy50b2dnbGVTaGlwTW90aW9uKHNoaXAuY29vcmRpbmF0ZXMpO1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuYm9hcmQubW92ZVNoaXAoaSwgW1xuICAgICAgICAgICAgICBNYXRoLmZsb29yKGV2ZW50LnRhcmdldC5vZmZzZXRMZWZ0IC8gKGNlbGxTaXplICsgZ3JpZEdhcCkpLFxuICAgICAgICAgICAgICBNYXRoLmZsb29yKGV2ZW50LnRhcmdldC5vZmZzZXRUb3AgLyAoY2VsbFNpemUgKyBncmlkR2FwKSksXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiwgZSk7XG4gICAgICAgICAgICAvLyB0aGlzLnRvZ2dsZVNoaXBNb3Rpb24oc2hpcC5jb29yZGluYXRlcyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2hpcEltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJjb250ZXh0bWVudVwiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICBpZiAoIXRoaXMuY29tcG9uZW50LmNsYXNzTGlzdC5jb250YWlucyhcImVkaXRpbmdcIikpIHJldHVybjtcblxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICBpZiAodGhpcy5ib2FyZC5yb3RhdGVTaGlwKGkpKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2hpcHNDb250YWluZXIuYXBwZW5kQ2hpbGQoc2hpcEltYWdlKTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICByYW5kb21pemVGb3JtYXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgIHRoaXMuYm9hcmQucmVzZXQoKTtcblxuICAgICAgZm9yIChjb25zdCB0eXBlIG9mIE9iamVjdC5rZXlzKFNoaXBUeXBlKSkge1xuICAgICAgICBjb25zdCBzaGlwTGVuZ3RoID0gZ2V0U2hpcExlbmd0aChTaGlwVHlwZVt0eXBlXSk7XG5cbiAgICAgICAgbGV0IHBsYWNlZCA9IGZhbHNlO1xuICAgICAgICB3aGlsZSAoIXBsYWNlZCkge1xuICAgICAgICAgIGNvbnN0IG9yaWVudGF0aW9uID1cbiAgICAgICAgICAgIE1hdGgucmFuZG9tKCkgPiAwLjVcbiAgICAgICAgICAgICAgPyBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTFxuICAgICAgICAgICAgICA6IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTDtcblxuICAgICAgICAgIGNvbnN0IHggPSBNYXRoLmZsb29yKFxuICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqXG4gICAgICAgICAgICAgICgxMCAtXG4gICAgICAgICAgICAgICAgKG9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCA/IHNoaXBMZW5ndGggOiAwKSksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihcbiAgICAgICAgICAgIE1hdGgucmFuZG9tKCkgKlxuICAgICAgICAgICAgICAoMTAgLVxuICAgICAgICAgICAgICAgIChvcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMID8gc2hpcExlbmd0aCA6IDApKSxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgcGxhY2VkID0gdGhpcy5ib2FyZC5wbGFjZVNoaXAoXG4gICAgICAgICAgICBjcmVhdGVTaGlwKFNoaXBUeXBlW3R5cGVdLCBbeCwgeV0sIG9yaWVudGF0aW9uKSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfSxcblxuICAgIHRvZ2dsZVNoaXBNb3Rpb246IGZ1bmN0aW9uIChjb29yZGluYXRlcykge1xuICAgICAgY29uc3QgY2VsbCA9XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmNoaWxkcmVuWzFdLmNoaWxkcmVuW2Nvb3JkaW5hdGVzWzFdXS5jaGlsZHJlbltcbiAgICAgICAgICBjb29yZGluYXRlc1swXVxuICAgICAgICBdO1xuXG4gICAgICBpZiAoIWNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hpcFwiKSkgcmV0dXJuO1xuXG4gICAgICBjb25zdCBzaGlwSW5kZXggPSB0aGlzLmJvYXJkLmdldFNoaXBJbmRleChjb29yZGluYXRlcyk7XG4gICAgICBsZXQgc2hpcCA9IHRoaXMuYm9hcmQuc2hpcHNbc2hpcEluZGV4XTtcblxuICAgICAgc3dpdGNoIChzaGlwLm9yaWVudGF0aW9uKSB7XG4gICAgICAgIGNhc2UgU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUw6XG4gICAgICAgICAgZm9yIChcbiAgICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1swXTtcbiAgICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGkrK1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuY2hpbGRyZW5bMV0uY2hpbGRyZW5bc2hpcC5jb29yZGluYXRlc1sxXV0uY2hpbGRyZW5bXG4gICAgICAgICAgICAgIGlcbiAgICAgICAgICAgIF0uY2xhc3NMaXN0LnRvZ2dsZShcIm1vdmluZ1wiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMOlxuICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMV07XG4gICAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBpKytcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmNoaWxkcmVuWzFdLmNoaWxkcmVuW2ldLmNoaWxkcmVuW1xuICAgICAgICAgICAgICBzaGlwLmNvb3JkaW5hdGVzWzBdXG4gICAgICAgICAgICBdLmNsYXNzTGlzdC50b2dnbGUoXCJtb3ZpbmdcIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBtb3ZlU2hpcDogZnVuY3Rpb24gKGtleSkge1xuICAgICAgY29uc3QgbW92aW5nU2hpcENlbGwgPVxuICAgICAgICB0aGlzLmNvbXBvbmVudC5jaGlsZHJlblsxXS5xdWVyeVNlbGVjdG9yKFwiLm1vdmluZ1wiKTtcblxuICAgICAgaWYgKCFtb3ZpbmdTaGlwQ2VsbCkgcmV0dXJuO1xuXG4gICAgICBjb25zdCBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXMgPSBnZXRDZWxsSW5kZXgobW92aW5nU2hpcENlbGwpO1xuICAgICAgY29uc3QgbW92aW5nU2hpcEluZGV4ID0gdGhpcy5ib2FyZC5nZXRTaGlwSW5kZXgobW92aW5nU2hpcENvb3JkaW5hdGVzKTtcblxuICAgICAgdGhpcy50b2dnbGVTaGlwTW90aW9uKG1vdmluZ1NoaXBDb29yZGluYXRlcyk7XG5cbiAgICAgIGxldCBtb3ZlU3VjY2Vzc2Z1bCA9IGZhbHNlO1xuICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgY2FzZSBcIkFycm93VXBcIjpcbiAgICAgICAgICBpZiAobW92aW5nU2hpcENvb3JkaW5hdGVzWzFdIDw9IDApIGJyZWFrO1xuICAgICAgICAgIG1vdmVTdWNjZXNzZnVsID0gdGhpcy5ib2FyZC5tb3ZlU2hpcChtb3ZpbmdTaGlwSW5kZXgsIFtcbiAgICAgICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlc1swXSxcbiAgICAgICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlc1sxXSAtIDEsXG4gICAgICAgICAgXSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd0xlZnRcIjpcbiAgICAgICAgICBpZiAobW92aW5nU2hpcENvb3JkaW5hdGVzWzBdIDw9IDApIGJyZWFrO1xuICAgICAgICAgIG1vdmVTdWNjZXNzZnVsID0gdGhpcy5ib2FyZC5tb3ZlU2hpcChtb3ZpbmdTaGlwSW5kZXgsIFtcbiAgICAgICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlc1swXSAtIDEsXG4gICAgICAgICAgICBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMV0sXG4gICAgICAgICAgXSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd0Rvd25cIjpcbiAgICAgICAgICBpZiAobW92aW5nU2hpcENvb3JkaW5hdGVzWzFdID49IHRoaXMuYm9hcmQuc2l6ZSAtIDEpIGJyZWFrO1xuICAgICAgICAgIG1vdmVTdWNjZXNzZnVsID0gdGhpcy5ib2FyZC5tb3ZlU2hpcChtb3ZpbmdTaGlwSW5kZXgsIFtcbiAgICAgICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlc1swXSxcbiAgICAgICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlc1sxXSArIDEsXG4gICAgICAgICAgXSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd1JpZ2h0XCI6XG4gICAgICAgICAgaWYgKG1vdmluZ1NoaXBDb29yZGluYXRlc1swXSA+PSB0aGlzLmJvYXJkLnNpemUgLSAxKSBicmVhaztcbiAgICAgICAgICBtb3ZlU3VjY2Vzc2Z1bCA9IHRoaXMuYm9hcmQubW92ZVNoaXAobW92aW5nU2hpcEluZGV4LCBbXG4gICAgICAgICAgICBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMF0gKyAxLFxuICAgICAgICAgICAgbW92aW5nU2hpcENvb3JkaW5hdGVzWzFdLFxuICAgICAgICAgIF0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBpZiAoIW1vdmVTdWNjZXNzZnVsKSB7XG4gICAgICAgIHRoaXMudG9nZ2xlU2hpcE1vdGlvbihtb3ZpbmdTaGlwQ29vcmRpbmF0ZXMpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgICAgIGNvbnN0IG1vdmVkU2hpcCA9IHRoaXMuYm9hcmQuc2hpcHNbbW92aW5nU2hpcEluZGV4XTtcbiAgICAgIHRoaXMudG9nZ2xlU2hpcE1vdGlvbihtb3ZlZFNoaXAuY29vcmRpbmF0ZXMpO1xuICAgIH0sXG5cbiAgICByZWNlaXZlQXR0YWNrOiBmdW5jdGlvbiAoY29vcmRpbmF0ZXMpIHtcbiAgICAgIGNvbnN0IGNlbGwgPSBib2FyZC5jZWxsc1tjb29yZGluYXRlc1sxXV1bY29vcmRpbmF0ZXNbMF1dO1xuICAgICAgaWYgKGNlbGwgIT09IENlbGxTdGF0ZS5FTVBUWSAmJiBjZWxsICE9PSBDZWxsU3RhdGUuU0hJUCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlc3VsdCA9IGJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpO1xuICAgICAgdGhpcy5yZW5kZXIoKTtcblxuICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuXG4gICAgY29tcHV0ZXJBdHRhY2s6IGFzeW5jIGZ1bmN0aW9uIChhdHRhY2tlckluZGV4KSB7XG4gICAgICBsZXQgeCwgeTtcblxuICAgICAgbGV0IHZhbGlkID0gZmFsc2U7XG4gICAgICB3aGlsZSAoIXZhbGlkKSB7XG4gICAgICAgIHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBib2FyZC5zaXplKTtcbiAgICAgICAgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGJvYXJkLnNpemUpO1xuXG4gICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmNvbXBvbmVudC5jaGlsZHJlblsxXS5jaGlsZHJlblt5XS5jaGlsZHJlblt4XTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZW1wdHlcIikgfHxcbiAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5jb250YWlucyhcInNoaXBcIilcbiAgICAgICAgKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHIpID0+IHNldFRpbWVvdXQociwgNTAwKSk7XG5cbiAgICAgIGNvbnN0IGF0dGFjayA9IHRoaXMucmVjZWl2ZUF0dGFjayhbeCwgeV0pO1xuICAgICAgZ2FtZS51cGRhdGVBdHRhY2tJbmZvKGF0dGFjay5yZXN1bHQsIGF0dGFjay5zaGlwLCBhdHRhY2tlckluZGV4KTtcbiAgICB9LFxuICB9O1xuXG4gIGZ1bmN0aW9uIHNhdmVFZGl0cygpIHtcbiAgICBpZiAoIURPTUJvYXJkLmNvbXBvbmVudC5jaGlsZHJlblswXS5yZXBvcnRWYWxpZGl0eSgpKSByZXR1cm47XG4gICAgYm9hcmRIZWFkZXIucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItbmFtZVwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgIGJvYXJkSGVhZGVyLnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLW5hbWUtaW5wdXRcIikuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICBib2FyZEhlYWRlci5xdWVyeVNlbGVjdG9yKFwiLmVkaXQtYm9hcmRcIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICBzYXZlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG5cbiAgICBET01Cb2FyZC5lZGl0aW5nID0gZmFsc2U7XG4gICAgRE9NQm9hcmQuY29tcG9uZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJlZGl0aW5nXCIpO1xuICAgIERPTUJvYXJkLmNsZWFyKCk7XG4gIH1cblxuICBpZiAocGxheWVyLnR5cGUgPT09IFBsYXllclR5cGUuSFVNQU4pIHtcbiAgICByYW5kb21pemVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIERPTUJvYXJkLnJhbmRvbWl6ZUZvcm1hdGlvbigpO1xuICAgIH0pO1xuXG4gICAgZWRpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZWRpdGluZ1wiKSkge1xuICAgICAgICBhbGVydChcIlBsZWFzZSBzYXZlIHRoZSBjdXJyZW50bHkgZWRpdGluZyBib2FyZCBmaXJzdFwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBib2FyZEhlYWRlciA9IERPTUJvYXJkLmNvbXBvbmVudC5jaGlsZHJlblswXTtcblxuICAgICAgYm9hcmRIZWFkZXIucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItbmFtZVwiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgYm9hcmRIZWFkZXJcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLW5hbWUtaW5wdXRcIilcbiAgICAgICAgLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICBlZGl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICBib2FyZEhlYWRlci5xdWVyeVNlbGVjdG9yKFwiLnNhdmUtYm9hcmRcIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcblxuICAgICAgRE9NQm9hcmQuZWRpdGluZyA9IHRydWU7XG4gICAgICBET01Cb2FyZC5jb21wb25lbnQuY2xhc3NMaXN0LmFkZChcImVkaXRpbmdcIik7XG4gICAgICBET01Cb2FyZC5yZW5kZXIoKTtcbiAgICB9KTtcblxuICAgIGJvYXJkSGVhZGVyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItbmFtZS1pbnB1dFwiKVxuICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgIHBsYXllci5uYW1lID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICBib2FyZEhlYWRlci5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1uYW1lXCIpLnRleHRDb250ZW50ID0gcGxheWVyLm5hbWU7XG4gICAgICB9KTtcblxuICAgIHNhdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNhdmVFZGl0cyk7XG5cbiAgICBib2FyZEhlYWRlci5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldmVudCkgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHNhdmVFZGl0cygpO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIERPTUJvYXJkO1xufVxuXG5mdW5jdGlvbiBnZXRDZWxsSW5kZXgoY2VsbCkge1xuICByZXR1cm4gW1xuICAgIEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoY2VsbC5wYXJlbnROb2RlLmNoaWxkcmVuLCBjZWxsKSxcbiAgICBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKFxuICAgICAgY2VsbC5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2hpbGRyZW4sXG4gICAgICBjZWxsLnBhcmVudE5vZGUsXG4gICAgKSxcbiAgXTtcbn1cblxuZnVuY3Rpb24gZ2V0Q2VsbENsYXNzTmFtZShjb29yZGluYXRlcywgYm9hcmQsIHNlY3JldCA9IGZhbHNlKSB7XG4gIGNvbnN0IGNlbGwgPSBib2FyZC5jZWxsc1tjb29yZGluYXRlc1sxXV1bY29vcmRpbmF0ZXNbMF1dO1xuICBzd2l0Y2ggKGNlbGwpIHtcbiAgICBjYXNlIENlbGxTdGF0ZS5FTVBUWTpcbiAgICAgIHJldHVybiBcImVtcHR5XCI7XG4gICAgY2FzZSBDZWxsU3RhdGUuTUlTUzpcbiAgICAgIHJldHVybiBcIm1pc3NcIjtcbiAgICBjYXNlIENlbGxTdGF0ZS5TSElQOlxuICAgICAgcmV0dXJuIHNlY3JldCA/IFwiZW1wdHlcIiA6IFwic2hpcFwiO1xuICAgIGNhc2UgQ2VsbFN0YXRlLkhJVDpcbiAgICAgIHJldHVybiBcImhpdFwiO1xuICAgIGNhc2UgQ2VsbFN0YXRlLlNVTks6XG4gICAgICByZXR1cm4gXCJzdW5rXCI7XG4gIH1cbn1cbiIsImltcG9ydCB7IENlbGxTdGF0ZSB9IGZyb20gXCIuLi9jb3JlL2dhbWVCb2FyZC5qc1wiO1xuaW1wb3J0IHsgUGxheWVyVHlwZSB9IGZyb20gXCIuLi9jb3JlL3BsYXllci5qc1wiO1xuaW1wb3J0IHsgc2V0dXBHYW1lQm9hcmRzIH0gZnJvbSBcIi4vYm9hcmRzLmpzXCI7XG5cbmV4cG9ydCBjb25zdCBHYW1lTW9kZSA9IE9iamVjdC5mcmVlemUoe1xuICBDT01QVVRFUjogXCJjb21wdXRlclwiLFxuICBGUklFTkQ6IFwiZnJpZW5kXCIsXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwR2FtZShwbGF5ZXJPbmUsIHBsYXllclR3bywgbW9kZSkge1xuICBjb25zdCBnYW1lID0ge1xuICAgIG1vZGUsXG5cbiAgICBwbGF5ZXJzOiBbcGxheWVyT25lLCBwbGF5ZXJUd29dLFxuICAgIGN1cnJlbnRQbGF5ZXJJbmRleDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMiksXG5cbiAgICBpc0luUHJvZ3Jlc3M6IGZhbHNlLFxuICAgIGlzR2FtZU92ZXI6IGZhbHNlLFxuICAgIGlzUGxheWVyV2FpdGluZzogZmFsc2UsXG5cbiAgICBib2FyZHM6IFtdLFxuXG4gICAgc3RhcnQ6IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuaXNJblByb2dyZXNzID0gdHJ1ZTtcbiAgICAgIHRoaXMuaXNHYW1lT3ZlciA9IGZhbHNlO1xuICAgICAgdGhpcy5pc1BsYXllcldhaXRpbmcgPSBmYWxzZTtcblxuICAgICAgdGhpcy5ib2FyZHNbMF0uY2xlYXIoKTtcblxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGFydFwiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXNldFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ib2FyZC1pbmZvXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlbHAtaW5mb1wiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hdHRhY2staW5mb1wiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb290XCIpLmNsYXNzTGlzdC5hZGQoXCJpbi1wcm9ncmVzc1wiKTtcblxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb290XCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJ2cy1jb21wdXRlclwiKTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcm9vdFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwidnMtZnJpZW5kXCIpO1xuICAgICAgZG9jdW1lbnRcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIjcm9vdFwiKVxuICAgICAgICAuY2xhc3NMaXN0LmFkZChcbiAgICAgICAgICBtb2RlID09PSBHYW1lTW9kZS5DT01QVVRFUiA/IFwidnMtY29tcHV0ZXJcIiA6IFwidnMtZnJpZW5kXCIsXG4gICAgICAgICk7XG5cbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYm9hcmQtY29udHJvbHNcIikuZm9yRWFjaCgoYm9hcmRDb250cm9scykgPT4ge1xuICAgICAgICBib2FyZENvbnRyb2xzLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICB9KTtcblxuICAgICAgYXdhaXQgdGhpcy5wbGF5KCk7XG4gICAgfSxcblxuICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBnYW1lT3ZlclNjcmVlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZS1vdmVyLXNjcmVlblwiKTtcbiAgICAgIGlmIChnYW1lT3ZlclNjcmVlbikgZ2FtZU92ZXJTY3JlZW4ucmVtb3ZlKCk7XG5cbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RhcnRcIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzZXRcIikuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYm9hcmQtaW5mb1wiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZWxwLWluZm9cIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYXR0YWNrLWluZm9cIikuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcm9vdFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaW4tcHJvZ3Jlc3NcIik7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jvb3RcIikuY2xhc3NMaXN0LnJlbW92ZShcImF0dGFjay1hbGxvd2VkXCIpO1xuXG4gICAgICB0aGlzLmlzSW5Qcm9ncmVzcyA9IGZhbHNlO1xuICAgICAgdGhpcy5pc0dhbWVPdmVyID0gdHJ1ZTtcbiAgICAgIHRoaXMuaXNQbGF5ZXJXYWl0aW5nID0gZmFsc2U7XG5cbiAgICAgIHRoaXMucGxheWVyc1swXS5ib2FyZC5yZXNldCgpO1xuICAgICAgdGhpcy5wbGF5ZXJzWzFdLmJvYXJkLnJlc2V0KCk7XG5cbiAgICAgIHRoaXMuYm9hcmRzID0gc2V0dXBHYW1lQm9hcmRzKHRoaXMsIHRoaXMucGxheWVyc1swXSwgdGhpcy5wbGF5ZXJzWzFdKTtcblxuICAgICAgdGhpcy5ib2FyZHNbMF0ucmFuZG9taXplRm9ybWF0aW9uKCk7XG4gICAgICB0aGlzLmJvYXJkc1sxXS5yYW5kb21pemVGb3JtYXRpb24oKTtcblxuICAgICAgY29uc3QgYm9hcmRzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ib2FyZHNcIik7XG4gICAgICBBcnJheS5mcm9tKGJvYXJkc0NvbnRhaW5lci5jaGlsZHJlbikuZm9yRWFjaCgoYm9hcmQpID0+IHtcbiAgICAgICAgYm9hcmRzQ29udGFpbmVyLnJlbW92ZUNoaWxkKGJvYXJkKTtcbiAgICAgIH0pO1xuICAgICAgYm9hcmRzQ29udGFpbmVyLmFwcGVuZChcbiAgICAgICAgdGhpcy5ib2FyZHNbMF0uY29tcG9uZW50LFxuICAgICAgICB0aGlzLmJvYXJkc1sxXS5jb21wb25lbnQsXG4gICAgICApO1xuICAgIH0sXG5cbiAgICBwbGF5OiBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgY3VycmVudFBsYXllciA9IHRoaXMucGxheWVyc1t0aGlzLmN1cnJlbnRQbGF5ZXJJbmRleF07XG4gICAgICBsZXQgbmV4dFBsYXllckluZGV4ID0gKHRoaXMuY3VycmVudFBsYXllckluZGV4ICsgMSkgJSAyO1xuICAgICAgbGV0IG5leHRQbGF5ZXIgPSB0aGlzLnBsYXllcnNbbmV4dFBsYXllckluZGV4XTtcblxuICAgICAgd2hpbGUgKCF0aGlzLmlzR2FtZU92ZXIpIHtcbiAgICAgICAgaWYgKGN1cnJlbnRQbGF5ZXIuYm9hcmQuaXNGbGVldERlc3Ryb3llZCgpKSB7XG4gICAgICAgICAgdGhpcy5pc0dhbWVPdmVyID0gdHJ1ZTtcblxuICAgICAgICAgIHRoaXMuYm9hcmRzWyh0aGlzLmN1cnJlbnRQbGF5ZXJJbmRleCArIDEpICUgMl0uY29tcG9uZW50LmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgY3JlYXRlR2FtZU92ZXJTY3JlZW4oY3VycmVudFBsYXllciwgbmV4dFBsYXllciwgdGhpcyksXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYm9hcmQtaW5mb1wiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNQbGF5ZXJXYWl0aW5nKSB7XG4gICAgICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwKSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb290XCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJhdHRhY2stYWxsb3dlZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGN1cnJlbnRQbGF5ZXIgPSB0aGlzLnBsYXllcnNbdGhpcy5jdXJyZW50UGxheWVySW5kZXhdO1xuICAgICAgICBuZXh0UGxheWVySW5kZXggPSAodGhpcy5jdXJyZW50UGxheWVySW5kZXggKyAxKSAlIDI7XG4gICAgICAgIG5leHRQbGF5ZXIgPSB0aGlzLnBsYXllcnNbbmV4dFBsYXllckluZGV4XTtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGAuYm9hcmQtJHt0aGlzLmN1cnJlbnRQbGF5ZXJJbmRleCA9PT0gMCA/IFwidHdvXCIgOiBcIm9uZVwifS1pbmZvYCxcbiAgICAgICAgKS50ZXh0Q29udGVudCA9XG4gICAgICAgICAgYCR7bmV4dFBsYXllci50eXBlID09PSBQbGF5ZXJUeXBlLkNPTVBVVEVSID8gXCJZb3VyXCIgOiBjdXJyZW50UGxheWVyLm5hbWUgKyBcIidzXCJ9IHR1cm5gO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGAuYm9hcmQtJHt0aGlzLmN1cnJlbnRQbGF5ZXJJbmRleCA9PT0gMCA/IFwib25lXCIgOiBcInR3b1wifS1pbmZvYCxcbiAgICAgICAgKS50ZXh0Q29udGVudCA9IFwiXCI7XG5cbiAgICAgICAgdGhpcy5ib2FyZHNbdGhpcy5jdXJyZW50UGxheWVySW5kZXhdLmNvbXBvbmVudC5jbGFzc0xpc3QucmVtb3ZlKFxuICAgICAgICAgIFwiYWN0aXZlXCIsXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYm9hcmRzW25leHRQbGF5ZXJJbmRleF0uY29tcG9uZW50LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG5cbiAgICAgICAgdGhpcy5ib2FyZHNbdGhpcy5jdXJyZW50UGxheWVySW5kZXhdLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmJvYXJkc1tuZXh0UGxheWVySW5kZXhdLmFjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRQbGF5ZXIudHlwZSA9PT0gUGxheWVyVHlwZS5DT01QVVRFUiAmJiAhdGhpcy5pc0dhbWVPdmVyKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5ib2FyZHNbbmV4dFBsYXllckluZGV4XS5jb21wdXRlckF0dGFjayhcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBsYXllckluZGV4LFxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5pc1BsYXllcldhaXRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgaWYgKG5leHRQbGF5ZXIudHlwZSAhPT0gUGxheWVyVHlwZS5DT01QVVRFUikge1xuICAgICAgICAgICAgdGhpcy5ib2FyZHNbbmV4dFBsYXllckluZGV4XS5jb21wb25lbnQuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICAgIGNyZWF0ZVBhc3NpbmdTY3JlZW4odGhpcy5wbGF5ZXJzLCB0aGlzLmN1cnJlbnRQbGF5ZXJJbmRleCksXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcm9vdFwiKS5jbGFzc0xpc3QuYWRkKFwiYXR0YWNrLWFsbG93ZWRcIik7XG5cbiAgICAgICAgICBpZiAobmV4dFBsYXllci50eXBlICE9PSBQbGF5ZXJUeXBlLkNPTVBVVEVSKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jvb3RcIikuY2xhc3NMaXN0LmFkZChcInBhc3NpbmdcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jdXJyZW50UGxheWVySW5kZXggPSBuZXh0UGxheWVySW5kZXg7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHVwZGF0ZUF0dGFja0luZm86IGZ1bmN0aW9uIChhdHRhY2tUeXBlLCBzaGlwLCBhdHRhY2tlckluZGV4KSB7XG4gICAgICBjb25zdCBhdHRhY2tJbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hdHRhY2staW5mb1wiKTtcbiAgICAgIGNvbnN0IGF0dGFja2VyID0gdGhpcy5wbGF5ZXJzW2F0dGFja2VySW5kZXhdLm5hbWU7XG4gICAgICBjb25zdCByZWNlaXZlciA9IHRoaXMucGxheWVyc1soYXR0YWNrZXJJbmRleCArIDEpICUgMl0ubmFtZTtcblxuICAgICAgc3dpdGNoIChhdHRhY2tUeXBlKSB7XG4gICAgICAgIGNhc2UgQ2VsbFN0YXRlLk1JU1M6XG4gICAgICAgICAgYXR0YWNrSW5mby50ZXh0Q29udGVudCA9IGAke2F0dGFja2VyfSBtaXNzZXMgdGhlaXIgc2hvdGA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgQ2VsbFN0YXRlLkhJVDpcbiAgICAgICAgICBhdHRhY2tJbmZvLnRleHRDb250ZW50ID0gYCR7YXR0YWNrZXJ9IGhpdHMgb25lIG9mICR7cmVjZWl2ZXJ9J3Mgc2hpcHNgO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIENlbGxTdGF0ZS5TVU5LOlxuICAgICAgICAgIGF0dGFja0luZm8udGV4dENvbnRlbnQgPSBgJHthdHRhY2tlcn0gc2lua3MgJHtyZWNlaXZlcn0ncyAke3NoaXAudHlwZX1gO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0sXG4gIH07XG5cbiAgZ2FtZS5ib2FyZHMgPSBzZXR1cEdhbWVCb2FyZHMoZ2FtZSwgcGxheWVyT25lLCBwbGF5ZXJUd28pO1xuXG4gIHJldHVybiBnYW1lO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVHYW1lT3ZlclNjcmVlbihjdXJyZW50UGxheWVyLCBuZXh0UGxheWVyLCBnYW1lKSB7XG4gIGNvbnN0IGdhbWVPdmVyU2NyZWVuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZ2FtZU92ZXJTY3JlZW4uY2xhc3NMaXN0LmFkZChcImdhbWUtb3Zlci1zY3JlZW5cIik7XG5cbiAgbGV0IGdhbWVPdmVyTWVzc2FnZTtcbiAgaWYgKGN1cnJlbnRQbGF5ZXIudHlwZSA9PT0gUGxheWVyVHlwZS5DT01QVVRFUikge1xuICAgIGdhbWVPdmVyTWVzc2FnZSA9IFwiWU9VIFdPTiBUSEUgR0FNRSFcIjtcbiAgfSBlbHNlIGlmIChuZXh0UGxheWVyLnR5cGUgPT09IFBsYXllclR5cGUuQ09NUFVURVIpIHtcbiAgICBnYW1lT3Zlck1lc3NhZ2UgPSBcIllPVSBMT1NUIFRIRSBHQU1FIVwiO1xuICB9IGVsc2Uge1xuICAgIGdhbWVPdmVyTWVzc2FnZSA9IGAke25leHRQbGF5ZXIubmFtZS50b1VwcGVyQ2FzZSgpfSBXT04gVEhFIEdBTUUhYDtcbiAgfVxuXG4gIGdhbWVPdmVyU2NyZWVuLmlubmVySFRNTCA9IGA8cD4ke2dhbWVPdmVyTWVzc2FnZX08L3A+YDtcblxuICBjb25zdCBvdXRlclJlc2V0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXNldFwiKTtcbiAgaWYgKG91dGVyUmVzZXRCdXR0b24pIG91dGVyUmVzZXRCdXR0b24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcblxuICBjb25zdCByZXNldEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIHJlc2V0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJyZXNldFwiKTtcbiAgcmVzZXRCdXR0b24udGV4dENvbnRlbnQgPSBcIlBsYXkgQWdhaW5cIjtcbiAgcmVzZXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGdhbWUucmVzZXQoKSk7XG4gIGdhbWVPdmVyU2NyZWVuLmFwcGVuZENoaWxkKHJlc2V0QnV0dG9uKTtcblxuICBjb25zdCBwYXNzaW5nU2NyZWVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYXNzaW5nLXNjcmVlblwiKTtcbiAgaWYgKHBhc3NpbmdTY3JlZW4pIHBhc3NpbmdTY3JlZW4ucmVtb3ZlKCk7XG5cbiAgcmV0dXJuIGdhbWVPdmVyU2NyZWVuO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVQYXNzaW5nU2NyZWVuKHBsYXllcnMsIGN1cnJlbnRQbGF5ZXIpIHtcbiAgY29uc3QgcGFzc2luZ1NjcmVlbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHBhc3NpbmdTY3JlZW4uY2xhc3NMaXN0LmFkZChcInBhc3Npbmctc2NyZWVuXCIpO1xuICBwYXNzaW5nU2NyZWVuLmlubmVySFRNTCA9IGBcbiAgICA8cD5QYXNzIHRoZSBkZXZpY2UgdG8gJHtwbGF5ZXJzW2N1cnJlbnRQbGF5ZXJdLm5hbWV9PC9wPlxuICBgO1xuICBjb25zdCBjb250aW51ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIGNvbnRpbnVlQnV0dG9uLnRleHRDb250ZW50ID0gXCJDb250aW51ZVwiO1xuICBjb250aW51ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHBhc3NpbmdTY3JlZW4ucmVtb3ZlKCk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYXNzaW5nXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJwYXNzaW5nXCIpO1xuICB9KTtcbiAgcGFzc2luZ1NjcmVlbi5hcHBlbmRDaGlsZChjb250aW51ZUJ1dHRvbik7XG4gIHJldHVybiBwYXNzaW5nU2NyZWVuO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUdhbWVQYWdlKGdhbWUpIHtcbiAgY29uc3QgZ2FtZVBhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBnYW1lUGFnZS5jbGFzc0xpc3QuYWRkKFwiZ2FtZS1wYWdlXCIsIFwicGFnZVwiKTtcblxuICBnYW1lUGFnZS5pbm5lckhUTUwgPSBgXG4gICAgPGRpdiBjbGFzcz1cImJvYXJkc1wiPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJpbmZvXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiYm9hcmQtaW5mbyBoaWRkZW5cIj5cbiAgICAgICAgPHAgY2xhc3M9XCJib2FyZC1vbmUtaW5mb1wiPjwvcD5cbiAgICAgICAgPHAgY2xhc3M9XCJib2FyZC10d28taW5mb1wiPjwvcD5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImdhbWUtaW5mb1wiPlxuICAgICAgICA8cCBjbGFzcz1cImhlbHAtaW5mb1wiPuKTmCBSZWFycmFuZ2UgdGhlIHNoaXBzIHRvIHlvdXIgbGlraW5nIGJ5IHByZXNzaW5nIHRoZSBlZGl0IGJ1dHRvbiwgb3IgYnkgcmVmcmVzaGluZyB0aGUgYm9hcmQ8L3A+XG4gICAgICAgIDxwIGNsYXNzPVwiYXR0YWNrLWluZm8gaGlkZGVuXCI+PC9wPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImNvbnRyb2xzXCI+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwic3RhcnRcIj5TdGFydCBHYW1lPC9idXR0b24+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwicmVzZXQgaGlkZGVuXCI+UmVzZXQgR2FtZTwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICBgO1xuXG4gIGNvbnN0IGJvYXJkc0NvbnRhaW5lciA9IGdhbWVQYWdlLnF1ZXJ5U2VsZWN0b3IoXCIuYm9hcmRzXCIpO1xuICBib2FyZHNDb250YWluZXIuYXBwZW5kKGdhbWUuYm9hcmRzWzBdLmNvbXBvbmVudCwgZ2FtZS5ib2FyZHNbMV0uY29tcG9uZW50KTtcblxuICBjb25zdCBzdGFydEJ1dHRvbiA9IGdhbWVQYWdlLnF1ZXJ5U2VsZWN0b3IoXCIuc3RhcnRcIik7XG4gIHN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgaWYgKGdhbWVQYWdlLnF1ZXJ5U2VsZWN0b3IoXCIuZWRpdGluZ1wiKSkge1xuICAgICAgYWxlcnQoXCJQbGVhc2Ugc2F2ZSB5b3VyIGJvYXJkcyBiZWZvcmUgc3RhcnRpbmcgdGhlIGdhbWVcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZ2FtZS5zdGFydCgpO1xuICB9KTtcblxuICBjb25zdCByZXNldEJ1dHRvbiA9IGdhbWVQYWdlLnF1ZXJ5U2VsZWN0b3IoXCIucmVzZXRcIik7XG4gIHJlc2V0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgZ2FtZS5yZXNldCgpO1xuICB9KTtcblxuICByZXR1cm4gZ2FtZVBhZ2U7XG59XG4iLCJpbXBvcnQgZWRpdFN2ZyBmcm9tIFwiLi4vLi4vLi4vYXNzZXRzL2VkaXQuc3ZnXCI7XG5pbXBvcnQgcmVmcmVzaFN2ZyBmcm9tIFwiLi4vLi4vLi4vYXNzZXRzL3JlZnJlc2gtY2N3LnN2Z1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSGVscFBhZ2UoKSB7XG4gIGNvbnN0IGhlbHBQYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgaGVscFBhZ2UuY2xhc3NMaXN0LmFkZChcImhlbHAtcGFnZVwiLCBcInBhZ2VcIik7XG5cbiAgaGVscFBhZ2UuaW5uZXJIVE1MID0gYFxuICAgIDxoMT5Ib3cgdG8gUGxheTwvaDE+XG4gICAgPHNlY3Rpb24+XG4gICAgICA8aDM+Q2hvb3NlIEdhbWUgTW9kZTwvaDM+XG4gICAgICA8ZGl2PlxuICAgICAgICA8cD5cbiAgICAgICAgICBCeSBkZWZhdWx0LCB5b3UnbGwgYmUgcGxheWluZyBhZ2FpbnN0IHRoZSBjb21wdXRlci5cbiAgICAgICAgICBJZiB5b3Ugd2FudCB0byBwbGF5IHdpdGggYSBmcmllbmQsIGNob29zZSB0aGUgXCJGcmllbmRcIiBvcHRpb24gaW4gdGhlIG9wcG9uZW50IHNlY3Rpb24sXG4gICAgICAgICAgYW5kIHBsYXkgYnkgcGFzc2luZyBhcm91bmQgeW91ciBkZXZpY2UuXG4gICAgICAgIDwvcD5cbiAgICAgIDwvZGl2PlxuICAgIDwvc2VjdGlvbj5cbiAgICA8c2VjdGlvbj5cbiAgICAgIDxoMz5FZGl0IHlvdXIgYm9hcmQocyk8L2gzPlxuICAgICAgPGRpdj5cbiAgICAgICAgPHVsPlxuICAgICAgICAgIDxsaT5DbGljayBvbiB0aGUgZWRpdCBidXR0b24gKDxpbWcgY2xhc3M9XCJlZGl0LWltZ1wiIC8+KSB0byBjaGFuZ2UgdGhlIG5hbWVzIG9mIHRoZSBwbGF5ZXJzLCBhbmQgbW92ZSBhcm91bmQgeW91ciBzaGlwcyAodXNpbmcgYXJyb3cga2V5cykuPC9saT5cbiAgICAgICAgICA8bGk+WW91IGNhbiBhbHNvIGNsaWNrIHRoZSByZWZyZXNoIGJ1dHRvbiAoPGltZyBjbGFzcz1cInJlZnJlc2gtaW1nXCIgLz4pIHRvIHJhbmRvbWl6ZSB0aGUgcGxhY2VtZW50IG9mIHNoaXBzIGluIHRoZSBib2FyZC48L2xpPlxuICAgICAgICA8L3VsPlxuICAgICAgPC9kaXY+XG4gICAgPC9zZWN0aW9uPlxuICAgIDxzZWN0aW9uPlxuICAgICAgPGgzPlN0YXJ0IHBsYXlpbmchPC9oMz5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxwPlxuICAgICAgICBQcmVzcyBvbiBcIjxiPlN0YXJ0IEdhbWU8L2I+XCIgdG8gc3RhcnQgcGxheWluZy5cbiAgICAgICAgSWYgeW91IGFyZSBub3QgZmFtaWxpYXIgd2l0aCA8YSBocmVmPVwiaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQmF0dGxlc2hpcF8oZ2FtZSlcIj5iYXR0bGVzaGlwPC9hPiwgaGVyZSdzIGEgcXVpY2sgcnVuLXRocm91Z2ggb2YgdGhlIG1lY2hhbmljczpcbiAgICAgICAgPC9wPlxuICAgICAgICA8dWw+XG4gICAgICAgICAgPGxpPkl0IGlzIGEgdHdvLXBsYXllciBnYW1lLCB3aXRoIGVhY2ggcGxheWVyIGhhdmluZyBhIGJvYXJkIHdpdGggc2hpcHMgYXJyYW5nZWQgb24gaXQgYWNjb3JkaW5nIHRvIHRoZWlyIHdpc2hlcy48L2xpPlxuICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgIFRoZXJlIGFyZSA1IHNoaXBzIG9mIHZhcnlpbmcgbGVuZ3RoczogXG4gICAgICAgICAgICA8dGFibGU+XG4gICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICA8dGg+U2hpcDwvdGg+XG4gICAgICAgICAgICAgICAgPHRoPlNpemU8L3RoPlxuICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRkPkNhcnJpZXI8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZD41PC90ZD5cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0ZD5CYXR0bGVzaGlwPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQ+NDwvdGQ+XG4gICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICA8dGQ+RGVzdHJveWVyPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQ+MzwvdGQ+XG4gICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICA8dGQ+U3VibWFyaW5lPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQ+MzwvdGQ+XG4gICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICA8dGQ+UGF0cm9sIEJvYXQ8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZD4yPC90ZD5cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgICA8bGk+XG4gICAgICAgICAgICBFYWNoIHBsYXllciB0YWtlcyB0dXJucyBzaG9vdGluZyBhIHNxdWFyZSBvbiB0aGUgb3RoZXIgcGxheWVyJ3MgYm9hcmQuXG4gICAgICAgICAgICBUaGV5IGhhdmUgbm8gaW5mb3JtYXRpb24gb24gd2hldGhlciB0aGVyZSBpcyBhIHNoaXAgb24gdGhhdCBzcXVhcmUgb3Igbm90LlxuICAgICAgICAgICAgQWZ0ZXIgZWFjaCB0cnksIHRoZXkgd2lsbCBiZSBpbmZvcm1lZCB3aGV0aGVyIHRoZXkgaGFkIGhpdCBhIHNoaXAgb3IgbWlzc2VkIHRoZWlyIHNob3QuXG4gICAgICAgICAgPC9saT5cbiAgICAgICAgICA8bGk+QWZ0ZXIgYWxsIHRoZSBzcXVhcmVzIG9mIGEgcGFydGljdWxhciBzaGlwIGlzIGhpdCwgaXQgd2lsbCBiZSBtYXJrZWQgKGFuZCBpbmZvcm1lZCB0byB0aGUgc2hvb3RpbmcgcGxheWVyKSBhcyBzdW5rLjwvbGk+XG4gICAgICAgICAgPGxpPkFmdGVyIGFsbCB0aGUgc2hpcHMgb2YgYSBwYXJ0aWN1bGFyIGJvYXJkIGlzIHN1bmssIHRoYXQgcGxheWVyIGxvc2VzIHRoZSBnYW1lLCBhbmQgdGhlIHNob290aW5nIHBsYXllciB3aW5zLjwvbGk+XG4gICAgICAgIDwvdWw+XG4gICAgICA8L2Rpdj5cbiAgICA8L3NlY3Rpb24+XG4gICAgPGgxIGNsYXNzPVwidGhhbmtzXCI+VGhhbmtzIGZvciBQbGF5aW5nITwvaDE+XG4gIGA7XG5cbiAgaGVscFBhZ2UucXVlcnlTZWxlY3RvcihcIi5lZGl0LWltZ1wiKS5zcmMgPSBlZGl0U3ZnO1xuICBoZWxwUGFnZS5xdWVyeVNlbGVjdG9yKFwiLnJlZnJlc2gtaW1nXCIpLnNyYyA9IHJlZnJlc2hTdmc7XG5cbiAgcmV0dXJuIGhlbHBQYWdlO1xufVxuIiwiaW1wb3J0IHsgY3JlYXRlUGxheWVyLCBQbGF5ZXJUeXBlIH0gZnJvbSBcIi4uLy4uL2NvcmUvcGxheWVyLmpzXCI7XG5pbXBvcnQgeyBHYW1lTW9kZSwgc2V0dXBHYW1lIH0gZnJvbSBcIi4uL2dhbWUuanNcIjtcbmltcG9ydCB7IGNyZWF0ZUdhbWVQYWdlIH0gZnJvbSBcIi4vZ2FtZS5qc1wiO1xuaW1wb3J0IHsgY3JlYXRlSGVscFBhZ2UgfSBmcm9tIFwiLi9oZWxwLmpzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVIb21lUGFnZSgpIHtcbiAgbGV0IGdhbWVNb2RlID0gR2FtZU1vZGUuQ09NUFVURVI7XG5cbiAgY29uc3QgaG9tZVBhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBob21lUGFnZS5jbGFzc0xpc3QuYWRkKFwiaG9tZS1wYWdlXCIsIFwicGFnZVwiKTtcblxuICBob21lUGFnZS5pbm5lckhUTUwgPSBgXG4gICAgPGRpdiBjbGFzcz1cIm9wcG9uZW50XCI+XG4gICAgICA8cD5PcHBvbmVudDogPC9wPlxuICAgICAgPGRpdiBjbGFzcz1cIm9wdGlvbnNcIj5cbiAgICAgICAgPHAgY2xhc3M9XCJvcHBvbmVudC1jb21wdXRlciBhY3RpdmUtbW9kZVwiPkNvbXB1dGVyPC9wPlxuICAgICAgICA8cCBjbGFzcz1cIm9wcG9uZW50LWZyaWVuZFwiPkZyaWVuZDwvcD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDwhLS0gPGEgY2xhc3M9XCJoZWxwLWxpbmtcIj5Ib3cgdG8gUGxheTwvYT4gLS0+XG4gICAgPGRpdiBjbGFzcz1cImNvbnRyb2xzXCI+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwicGxheVwiPlBsYXkgR2FtZTwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImhlbHBcIj5Ib3cgdG8gUGxheTwvYnV0dG9uPlxuICAgICAgPCEtLSA8YnV0dG9uIGNsYXNzPVwicmVzZXQgaGlkZGVuXCI+UmVzZXQgR2FtZTwvYnV0dG9uPiAtLT5cbiAgICA8L2Rpdj5cbiAgYDtcblxuICBjb25zdCBjb21wdXRlck9wcG9uZW50QnV0dG9uID0gaG9tZVBhZ2UucXVlcnlTZWxlY3RvcihcIi5vcHBvbmVudC1jb21wdXRlclwiKTtcbiAgY29tcHV0ZXJPcHBvbmVudEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGlmIChjb21wdXRlck9wcG9uZW50QnV0dG9uLmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZS1tb2RlXCIpKSByZXR1cm47XG5cbiAgICBjb21wdXRlck9wcG9uZW50QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmUtbW9kZVwiKTtcbiAgICBmcmllbmRPcHBvbmVudEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlLW1vZGVcIik7XG4gICAgZ2FtZU1vZGUgPSBHYW1lTW9kZS5DT01QVVRFUjtcbiAgfSk7XG5cbiAgY29uc3QgZnJpZW5kT3Bwb25lbnRCdXR0b24gPSBob21lUGFnZS5xdWVyeVNlbGVjdG9yKFwiLm9wcG9uZW50LWZyaWVuZFwiKTtcbiAgZnJpZW5kT3Bwb25lbnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBpZiAoZnJpZW5kT3Bwb25lbnRCdXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlLW1vZGVcIikpIHJldHVybjtcblxuICAgIGZyaWVuZE9wcG9uZW50QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmUtbW9kZVwiKTtcbiAgICBjb21wdXRlck9wcG9uZW50QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmUtbW9kZVwiKTtcbiAgICBnYW1lTW9kZSA9IEdhbWVNb2RlLkZSSUVORDtcbiAgfSk7XG5cbiAgY29uc3QgcGxheUJ1dHRvbiA9IGhvbWVQYWdlLnF1ZXJ5U2VsZWN0b3IoXCIucGxheVwiKTtcbiAgcGxheUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuICAgIGxldCBnYW1lO1xuICAgIGlmIChnYW1lTW9kZSA9PT0gR2FtZU1vZGUuQ09NUFVURVIpIHtcbiAgICAgIGdhbWUgPSBzZXR1cEdhbWUoXG4gICAgICAgIGNyZWF0ZVBsYXllcihcIlBsYXllclwiLCBQbGF5ZXJUeXBlLkhVTUFOLCAxMCksXG4gICAgICAgIGNyZWF0ZVBsYXllcihcIkNvbXB1dGVyXCIsIFBsYXllclR5cGUuQ09NUFVURVIsIDEwKSxcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdhbWUgPSBzZXR1cEdhbWUoXG4gICAgICAgIGNyZWF0ZVBsYXllcihcIlBsYXllciAxXCIsIFBsYXllclR5cGUuSFVNQU4sIDEwKSxcbiAgICAgICAgY3JlYXRlUGxheWVyKFwiUGxheWVyIDJcIiwgUGxheWVyVHlwZS5IVU1BTiwgMTApLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBob21lUGFnZS5wYXJlbnROb2RlLmFwcGVuZENoaWxkKGNyZWF0ZUdhbWVQYWdlKGdhbWUpKTtcbiAgICBob21lUGFnZS5yZW1vdmUoKTtcbiAgfSk7XG5cbiAgY29uc3QgaGVscEJ1dHRvbiA9IGhvbWVQYWdlLnF1ZXJ5U2VsZWN0b3IoXCIuaGVscFwiKTtcbiAgaGVscEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGhvbWVQYWdlLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoY3JlYXRlSGVscFBhZ2UoKSk7XG4gICAgaG9tZVBhZ2UucmVtb3ZlKCk7XG4gIH0pO1xuXG4gIHJldHVybiBob21lUGFnZTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAoIXNjcmlwdFVybCB8fCAhL15odHRwKHM/KTovLnRlc3Qoc2NyaXB0VXJsKSkpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpbXBvcnQgeyBjcmVhdGVIb21lUGFnZSB9IGZyb20gXCIuL2RvbS9wYWdlcy9ob21lLmpzXCI7XG5cbmltcG9ydCBiYWNrU3ZnIGZyb20gXCIuLi9hc3NldHMvY2hldnJvbi1sZWZ0LnN2Z1wiO1xuaW1wb3J0IGxvZ28gZnJvbSBcIi4uL2Fzc2V0cy9mYXZpY29uLmljb1wiO1xuaW1wb3J0IFwiLi9zdHlsZXMvaW5kZXguY3NzXCI7XG5cbmNvbnNvbGUubG9nKFwiR2V0IFJlYWR5IGZvciBCYXR0bGUhXCIpO1xuXG5jb25zdCByb290ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpO1xucm9vdC5pbm5lckhUTUwgPSBgXG4gIDxoZWFkZXI+XG4gICAgPGJ1dHRvbiBjbGFzcz1cImJhY2stYnV0dG9uXCI+PC9idXR0b24+XG4gICAgPGltZyBjbGFzcz1cImxvZ29cIiBhbHQ9XCJMb2dvXCIgLz48aDE+QkFUVExFU0hJUDwvaDE+XG4gIDwvaGVhZGVyPlxuYDtcblxucm9vdC5xdWVyeVNlbGVjdG9yKFwiLmxvZ29cIikuc3JjID0gbG9nbztcblxucm9vdC5hcHBlbmRDaGlsZChjcmVhdGVIb21lUGFnZSgpKTtcblxuY29uc3QgYmFja0J1dHRvbiA9IHJvb3QucXVlcnlTZWxlY3RvcihcIi5iYWNrLWJ1dHRvblwiKTtcbmNvbnN0IGJhY2tJY29uID0gbmV3IEltYWdlKCk7XG5iYWNrSWNvbi5zcmMgPSBiYWNrU3ZnO1xuYmFja0J1dHRvbi5hcHBlbmRDaGlsZChiYWNrSWNvbik7XG5iYWNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGNvbnN0IGN1cnJlbnRQYWdlID0gcm9vdC5xdWVyeVNlbGVjdG9yKFwiLnBhZ2VcIik7XG4gIGNvbnN0IG5ld1BhZ2UgPSBjcmVhdGVIb21lUGFnZSgpO1xuXG4gIGlmIChuZXdQYWdlLmNsYXNzTGlzdFswXSA9PSBjdXJyZW50UGFnZS5jbGFzc0xpc3RbMF0pIHtcbiAgICByZXR1cm47XG4gIH1cblxuICByb290LmNsYXNzTmFtZSA9IFwiXCI7XG5cbiAgcm9vdC5hcHBlbmRDaGlsZChuZXdQYWdlKTtcbiAgY3VycmVudFBhZ2UucmVtb3ZlKCk7XG59KTtcbiJdLCJuYW1lcyI6WyJjcmVhdGVTaGlwIiwiU2hpcE9yaWVudGF0aW9uIiwiQ2VsbFN0YXRlIiwiT2JqZWN0IiwiZnJlZXplIiwiRU1QVFkiLCJNSVNTIiwiU0hJUCIsIkhJVCIsIlNVTksiLCJjcmVhdGVHYW1lQm9hcmQiLCJzaXplIiwiRXJyb3IiLCJjZWxscyIsIkFycmF5IiwiZnJvbSIsImxlbmd0aCIsInNoaXBzIiwicmVzZXQiLCJwbGFjZVNoaXAiLCJzaGlwIiwiY29vcmRpbmF0ZXMiLCJvcmllbnRhdGlvbiIsIkhPUklaT05UQUwiLCJWRVJUSUNBTCIsImkiLCJwdXNoIiwibW92ZVNoaXAiLCJzaGlwSW5kZXgiLCJ0eXBlIiwicG9wIiwicm90YXRlU2hpcCIsIm5ld09yaWVudGF0aW9uIiwiZ2V0U2hpcEluZGV4IiwiaiIsInJlY2VpdmVBdHRhY2siLCJyZXN1bHQiLCJ1bmRlZmluZWQiLCJoaXQiLCJpc1N1bmsiLCJpc0ZsZWV0RGVzdHJveWVkIiwiUGxheWVyVHlwZSIsIkhVTUFOIiwiQ09NUFVURVIiLCJjcmVhdGVQbGF5ZXIiLCJuYW1lIiwiYm9hcmRTaXplIiwiYm9hcmQiLCJTaGlwVHlwZSIsIkNBUlJJRVIiLCJCQVRUTEVTSElQIiwiREVTVFJPWUVSIiwiU1VCTUFSSU5FIiwiUEFUUk9MIiwiZ2V0U2hpcExlbmd0aCIsImFyZ3VtZW50cyIsImhpdHMiLCJyZWZyZXNoU3ZnIiwiZWRpdFN2ZyIsInNhdmVTdmciLCJjYXJyaWVyU3ZnIiwiYmF0dGxlc2hpcFN2ZyIsImRlc3Ryb3llclN2ZyIsInN1Ym1hcmluZVN2ZyIsInBhdHJvbFN2ZyIsInNldHVwR2FtZUJvYXJkcyIsImdhbWUiLCJwbGF5ZXJPbmUiLCJwbGF5ZXJUd28iLCJib2FyZE9uZSIsImNyZWF0ZUJvYXJkQ29tcG9uZW50IiwicmFuZG9taXplRm9ybWF0aW9uIiwiY29tcG9uZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwicmVuZGVyU2hpcHMiLCJhZGRFdmVudExpc3RlbmVyIiwiY2xlYXIiLCJib2FyZFR3byIsImZvckVhY2giLCJET01Cb2FyZCIsImJvYXJkSW5kZXgiLCJjaGlsZHJlbiIsInJvdyIsImNlbGwiLCJlZGl0aW5nIiwiaXNNdXRhYmxlIiwiY29udGFpbnMiLCJpc0luUHJvZ3Jlc3MiLCJpc0F0dGFja2FibGUiLCJhY3RpdmUiLCJpc0dhbWVPdmVyIiwiaXNQbGF5ZXJXYWl0aW5nIiwiYXR0YWNrIiwidXBkYXRlQXR0YWNrSW5mbyIsImV2ZW50IiwiZG9jdW1lbnQiLCJrZXkiLCJwbGF5ZXIiLCJhdHRhY2thYmxlIiwibXV0YWJsZSIsImJvYXJkQ29tcG9uZW50IiwiY3JlYXRlRWxlbWVudCIsImJvYXJkSGVhZGVyIiwiaW5uZXJIVE1MIiwiYXBwZW5kQ2hpbGQiLCJyYW5kb21pemVCdXR0b24iLCJlZGl0QnV0dG9uIiwic2F2ZUJ1dHRvbiIsInRpdGxlIiwicmVmcmVzaEljb24iLCJJbWFnZSIsInNyYyIsImVkaXRJY29uIiwic2F2ZUljb24iLCJib2FyZENvbnRyb2xzIiwiYm9hcmRDZWxscyIsInJvd0NvbXBvbmVudCIsImNlbGxDb21wb25lbnQiLCJnZXRDZWxsQ2xhc3NOYW1lIiwic2hpcHNDb250YWluZXIiLCJtb3ZpbmdDZWxscyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJyZW1vdmUiLCJyZW5kZXIiLCJjbGFzc05hbWUiLCJpc01vdmluZyIsInF1ZXJ5U2VsZWN0b3IiLCJzaGlwSW1hZ2UiLCJyZW1vdmVDaGlsZCIsIndpbmRvd1dpZHRoIiwiZG9jdW1lbnRFbGVtZW50IiwiY2xpZW50V2lkdGgiLCJ3aW5kb3dIZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJpc1ZlcnRpY2FsU2NyZWVuIiwiY2VsbFNpemUiLCJncmlkR2FwIiwieCIsInkiLCJhbHQiLCJzdHlsZSIsInRyYW5zZm9ybU9yaWdpbiIsInRyYW5zZm9ybSIsImxlZnQiLCJ0b3AiLCJsYXN0TW91c2VQb3NpdGlvbiIsInByZXZlbnREZWZhdWx0IiwidG9nZ2xlU2hpcE1vdGlvbiIsImNsaWVudFgiLCJjbGllbnRZIiwicGFyZW50Qm91bmRzIiwidGFyZ2V0IiwicGFyZW50RWxlbWVudCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInNoaXBCb3VuZHMiLCJ3aWR0aCIsImhlaWdodCIsIk1hdGgiLCJmbG9vciIsIm9mZnNldExlZnQiLCJvZmZzZXRUb3AiLCJlIiwiY29uc29sZSIsImxvZyIsImtleXMiLCJzaGlwTGVuZ3RoIiwicGxhY2VkIiwicmFuZG9tIiwidG9nZ2xlIiwibW92aW5nU2hpcENlbGwiLCJtb3ZpbmdTaGlwQ29vcmRpbmF0ZXMiLCJnZXRDZWxsSW5kZXgiLCJtb3ZpbmdTaGlwSW5kZXgiLCJtb3ZlU3VjY2Vzc2Z1bCIsIm1vdmVkU2hpcCIsImNvbXB1dGVyQXR0YWNrIiwiYXR0YWNrZXJJbmRleCIsInZhbGlkIiwiUHJvbWlzZSIsInIiLCJzZXRUaW1lb3V0Iiwic2F2ZUVkaXRzIiwicmVwb3J0VmFsaWRpdHkiLCJhbGVydCIsInZhbHVlIiwidGV4dENvbnRlbnQiLCJwcm90b3R5cGUiLCJpbmRleE9mIiwiY2FsbCIsInBhcmVudE5vZGUiLCJzZWNyZXQiLCJHYW1lTW9kZSIsIkZSSUVORCIsInNldHVwR2FtZSIsIm1vZGUiLCJwbGF5ZXJzIiwiY3VycmVudFBsYXllckluZGV4IiwiYm9hcmRzIiwic3RhcnQiLCJwbGF5IiwiZ2FtZU92ZXJTY3JlZW4iLCJib2FyZHNDb250YWluZXIiLCJhcHBlbmQiLCJjdXJyZW50UGxheWVyIiwibmV4dFBsYXllckluZGV4IiwibmV4dFBsYXllciIsImNyZWF0ZUdhbWVPdmVyU2NyZWVuIiwicmVzb2x2ZSIsImNyZWF0ZVBhc3NpbmdTY3JlZW4iLCJhdHRhY2tUeXBlIiwiYXR0YWNrSW5mbyIsImF0dGFja2VyIiwicmVjZWl2ZXIiLCJnYW1lT3Zlck1lc3NhZ2UiLCJ0b1VwcGVyQ2FzZSIsIm91dGVyUmVzZXRCdXR0b24iLCJyZXNldEJ1dHRvbiIsInBhc3NpbmdTY3JlZW4iLCJjb250aW51ZUJ1dHRvbiIsImNyZWF0ZUdhbWVQYWdlIiwiZ2FtZVBhZ2UiLCJzdGFydEJ1dHRvbiIsImNyZWF0ZUhlbHBQYWdlIiwiaGVscFBhZ2UiLCJjcmVhdGVIb21lUGFnZSIsImdhbWVNb2RlIiwiaG9tZVBhZ2UiLCJjb21wdXRlck9wcG9uZW50QnV0dG9uIiwiZnJpZW5kT3Bwb25lbnRCdXR0b24iLCJwbGF5QnV0dG9uIiwiaGVscEJ1dHRvbiIsImJhY2tTdmciLCJsb2dvIiwicm9vdCIsImdldEVsZW1lbnRCeUlkIiwiYmFja0J1dHRvbiIsImJhY2tJY29uIiwiY3VycmVudFBhZ2UiLCJuZXdQYWdlIl0sInNvdXJjZVJvb3QiOiIifQ==