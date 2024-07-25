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
    let movingShipIndex = null;
    let relativeDraggingCell = null;
    Array.from(DOMBoard.component.children[1].children).forEach((row, i) => {
      Array.from(row.children).forEach((cell, j) => {
        cell.addEventListener("click", () => {
          // if (
          //   DOMBoard.editing &&
          //   DOMBoard.isMutable() &&
          //   cell.classList.contains("ship") &&
          //   !game.isInProgress
          // ) {
          //   DOMBoard.toggleShipMotion([j, i]);
          // }
          if (DOMBoard.isAttackable() && DOMBoard.active && game.isInProgress && !game.isGameOver && game.isPlayerWaiting) {
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
        cell.addEventListener("mousedown", event => {
          if (!DOMBoard.editing) return;
          if (event.button === 2) return;
          const shipIndex = DOMBoard.board.getShipIndex([j, i]);
          if (shipIndex === undefined) return;else {
            movingShipIndex = shipIndex;
            const shipCoordinates = DOMBoard.board.ships[movingShipIndex].coordinates;
            relativeDraggingCell = [j - shipCoordinates[0], i - shipCoordinates[1]];
          }
          DOMBoard.toggleShipMotion([j, i]);
        });
      });
    });
    DOMBoard.component.addEventListener("mouseover", event => {
      if (!DOMBoard.editing) return;
      if (movingShipIndex === null) return;
      if (!event.target.classList.contains("cell")) return;
      DOMBoard.clear();
      const cellIndex = getCellIndex(event.target);
      const newCoordinates = [cellIndex[0] - relativeDraggingCell[0], cellIndex[1] - relativeDraggingCell[1]];
      if (newCoordinates[0] < 0 || newCoordinates[1] < 0 || newCoordinates[0] >= DOMBoard.board.size || newCoordinates[1] >= DOMBoard.board.size) {
        return;
      }
      DOMBoard.toggleShipMotion(newCoordinates, DOMBoard.board.ships[movingShipIndex]);
      const shipImage = DOMBoard.component.querySelector(`.ship-${movingShipIndex}`);
      if (shipImage) {
        const newCell = DOMBoard.component.children[1].children[newCoordinates[1]].children[newCoordinates[0]];
        shipImage.style.left = `${newCell.offsetLeft}px`;
        shipImage.style.top = `${newCell.offsetTop}px`;
      }
    });
    document.addEventListener("mouseup", event => {
      if (movingShipIndex !== null && event.target.classList.contains("cell") && event.target.parentNode.parentNode.parentNode === DOMBoard.component) {
        const cellIndex = getCellIndex(event.target);
        const newCoordinates = [cellIndex[0] - relativeDraggingCell[0], cellIndex[1] - relativeDraggingCell[1]];
        const movingShip = DOMBoard.board.ships[movingShipIndex];
        if (newCoordinates[0] >= 0 && newCoordinates[1] >= 0 && (movingShip.orientation === _core_ship_js__WEBPACK_IMPORTED_MODULE_2__.ShipOrientation.HORIZONTAL && newCoordinates[0] < DOMBoard.board.size - movingShip.length + 1 || movingShip.orientation === _core_ship_js__WEBPACK_IMPORTED_MODULE_2__.ShipOrientation.VERTICAL && newCoordinates[1] < DOMBoard.board.size - movingShip.length + 1)) {
          DOMBoard.board.moveShip(movingShipIndex, newCoordinates);
        }
      } else if (movingShipIndex !== null) {
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
      let cellSize = this.component.querySelector(".cell").clientWidth;
      if (!cellSize) {
        cellSize = 4 / 100 * (isVerticalScreen ? windowWidth : windowHeight);
      }
      const gridGap = cellSize / 10;
      console.log(cellSize);
      this.board.ships.forEach((ship, i) => {
        if (!this.component.classList.contains("editing") && !this.component.classList.contains("only-human") && !this.component.classList.contains("attacking") && !ship.isSunk()) {
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
        shipImage.className = `ship-img`;
        shipImage.classList.add(`ship-${i}`);
        if (ship.isSunk()) {
          shipImage.classList.add(`ship-sunk`);
        }
        if (ship.orientation === _core_ship_js__WEBPACK_IMPORTED_MODULE_2__.ShipOrientation.VERTICAL) {
          shipImage.style.transformOrigin = "top left";
          shipImage.style.transform = `rotate(90deg) translateY(-${cellSize}px)`;
        }
        shipImage.style.left = `${x * (cellSize + gridGap)}px`;
        shipImage.style.top = `${y * (cellSize + gridGap)}px`;
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
      let movingShip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (coordinates[0] < 0 || coordinates[1] < 0 || coordinates[0] >= this.board.size || coordinates[1] >= this.board.size) {
        return;
      }
      if (movingShip && (movingShip.orientation === _core_ship_js__WEBPACK_IMPORTED_MODULE_2__.ShipOrientation.HORIZONTAL && coordinates[0] >= this.board.size - movingShip.length + 1 || movingShip.orientation === _core_ship_js__WEBPACK_IMPORTED_MODULE_2__.ShipOrientation.VERTICAL && coordinates[1] >= this.board.size - movingShip.length + 1)) {
        return;
      }
      if (!movingShip) {
        const cell = this.component.children[1].children[coordinates[1]].children[coordinates[0]];
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
        case _core_ship_js__WEBPACK_IMPORTED_MODULE_2__.ShipOrientation.HORIZONTAL:
          for (let i = coordinates[0]; i <= coordinates[0] + length - 1; i++) {
            this.component.children[1].children[coordinates[1]].children[i].classList.toggle("moving");
          }
          break;
        case _core_ship_js__WEBPACK_IMPORTED_MODULE_2__.ShipOrientation.VERTICAL:
          for (let i = coordinates[1]; i <= coordinates[1] + length - 1; i++) {
            this.component.children[1].children[i].children[coordinates[0]].classList.toggle("moving");
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
        this.boards[this.currentPlayerIndex].component.classList.add("attacking");
        this.boards[nextPlayerIndex].component.classList.add("active");
        this.boards[nextPlayerIndex].component.classList.remove("attacking");
        this.boards[this.currentPlayerIndex].active = false;
        this.boards[nextPlayerIndex].active = true;
        if (currentPlayer.type === _core_player_js__WEBPACK_IMPORTED_MODULE_1__.PlayerType.COMPUTER && !this.isGameOver) {
          await this.boards[nextPlayerIndex].computerAttack(this.currentPlayerIndex);
        } else {
          this.isPlayerWaiting = true;
          if (nextPlayer.type !== _core_player_js__WEBPACK_IMPORTED_MODULE_1__.PlayerType.COMPUTER) {
            this.boards[nextPlayerIndex].component.appendChild(createPassingScreen(this.players, this.currentPlayerIndex));
            this.boards[nextPlayerIndex].render();
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
  game.boards[0].render();
  game.boards[1].render();
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
      document.querySelector("#root").classList.add("vs-computer");
    } else {
      game = (0,_game_js__WEBPACK_IMPORTED_MODULE_1__.setupGame)((0,_core_player_js__WEBPACK_IMPORTED_MODULE_0__.createPlayer)("Player 1", _core_player_js__WEBPACK_IMPORTED_MODULE_0__.PlayerType.HUMAN, 10), (0,_core_player_js__WEBPACK_IMPORTED_MODULE_0__.createPlayer)("Player 2", _core_player_js__WEBPACK_IMPORTED_MODULE_0__.PlayerType.HUMAN, 10));
      document.querySelector("#root").classList.add("vs-friend");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUdnRyxxREFBTztBQUN0QkksVUFBVSxDQUFDM0csV0FBVyxDQUFDNEcsUUFBUSxDQUFDO0FBQ2hDRCxVQUFVLENBQUM5SixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTTtFQUN6QyxNQUFNZ0ssV0FBVyxHQUFHSixJQUFJLENBQUM1SCxhQUFhLENBQUMsT0FBTyxDQUFDO0VBQy9DLE1BQU1pSSxPQUFPLEdBQUdkLGtFQUFjLENBQUMsQ0FBQztFQUVoQyxJQUFJYyxPQUFPLENBQUNwSyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUltSyxXQUFXLENBQUNuSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUU7SUFDcEQ7RUFDRjtFQUVBK0osSUFBSSxDQUFDdEYsU0FBUyxHQUFHLEVBQUU7RUFFbkJzRixJQUFJLENBQUN6RyxXQUFXLENBQUM4RyxPQUFPLENBQUM7RUFDekJELFdBQVcsQ0FBQzNGLE1BQU0sQ0FBQyxDQUFDO0FBQ3RCLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvaW5kZXguY3NzPzRlNDIiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb3JlL2dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvcmUvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29yZS9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tL2JvYXJkcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbS9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tL3BhZ2VzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb20vcGFnZXMvaGVscC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbS9wYWdlcy9ob21lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCB7IGNyZWF0ZVNoaXAsIFNoaXBPcmllbnRhdGlvbiB9IGZyb20gXCIuL3NoaXAuanNcIjtcblxuZXhwb3J0IGNvbnN0IENlbGxTdGF0ZSA9IE9iamVjdC5mcmVlemUoe1xuICBFTVBUWTogMCxcbiAgTUlTUzogMSxcbiAgU0hJUDogMixcbiAgSElUOiAzLFxuICBTVU5LOiA0LFxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVHYW1lQm9hcmQoc2l6ZSkge1xuICBpZiAoc2l6ZSA8PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBib2FyZCBzaXplXCIpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzaXplLFxuICAgIGNlbGxzOiBBcnJheS5mcm9tKHsgbGVuZ3RoOiBzaXplIH0sICgpID0+XG4gICAgICBBcnJheS5mcm9tKHsgbGVuZ3RoOiBzaXplIH0sICgpID0+IENlbGxTdGF0ZS5FTVBUWSksXG4gICAgKSxcbiAgICBzaGlwczogW10sXG5cbiAgICByZXNldDogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5jZWxscyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IHNpemUgfSwgKCkgPT5cbiAgICAgICAgQXJyYXkuZnJvbSh7IGxlbmd0aDogc2l6ZSB9LCAoKSA9PiBDZWxsU3RhdGUuRU1QVFkpLFxuICAgICAgKTtcbiAgICAgIHRoaXMuc2hpcHMgPSBbXTtcbiAgICB9LFxuXG4gICAgcGxhY2VTaGlwOiBmdW5jdGlvbiAoc2hpcCkge1xuICAgICAgaWYgKFxuICAgICAgICBzaGlwLmNvb3JkaW5hdGVzWzBdIDwgMCB8fFxuICAgICAgICBzaGlwLmNvb3JkaW5hdGVzWzFdIDwgMCB8fFxuICAgICAgICBzaGlwLmNvb3JkaW5hdGVzWzBdID49IHNpemUgfHxcbiAgICAgICAgc2hpcC5jb29yZGluYXRlc1sxXSA+PSBzaXplXG4gICAgICApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IHBsYWNlIHNoaXAgb3V0c2lkZSB0aGUgYm9hcmRcIik7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwgJiZcbiAgICAgICAgICBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxID49IHNpemUpIHx8XG4gICAgICAgIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwgJiZcbiAgICAgICAgICBzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxID49IHNpemUpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwpIHtcbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMF07XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICBpZiAodGhpcy5jZWxsc1tzaGlwLmNvb3JkaW5hdGVzWzFdXVtpXSAhPT0gQ2VsbFN0YXRlLkVNUFRZKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1sxXTtcbiAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgaSsrXG4gICAgICAgICkge1xuICAgICAgICAgIGlmICh0aGlzLmNlbGxzW2ldW3NoaXAuY29vcmRpbmF0ZXNbMF1dICE9PSBDZWxsU3RhdGUuRU1QVFkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5zaGlwcy5wdXNoKHNoaXApO1xuXG4gICAgICBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwpIHtcbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMF07XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmNlbGxzW3NoaXAuY29vcmRpbmF0ZXNbMV1dW2ldID0gQ2VsbFN0YXRlLlNISVA7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMKSB7XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzFdO1xuICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1sxXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5jZWxsc1tpXVtzaGlwLmNvb3JkaW5hdGVzWzBdXSA9IENlbGxTdGF0ZS5TSElQO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICBtb3ZlU2hpcDogZnVuY3Rpb24gKHNoaXBJbmRleCwgY29vcmRpbmF0ZXMpIHtcbiAgICAgIGNvbnN0IHNoaXAgPSB0aGlzLnNoaXBzW3NoaXBJbmRleF07XG4gICAgICBpZiAoIXNoaXApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2hpcCBkb2VzIG5vdCBleGlzdFwiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMKSB7XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5jZWxsc1tzaGlwLmNvb3JkaW5hdGVzWzFdXVtpXSA9IENlbGxTdGF0ZS5FTVBUWTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwpIHtcbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMV07XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmNlbGxzW2ldW3NoaXAuY29vcmRpbmF0ZXNbMF1dID0gQ2VsbFN0YXRlLkVNUFRZO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgIXRoaXMucGxhY2VTaGlwKGNyZWF0ZVNoaXAoc2hpcC50eXBlLCBjb29yZGluYXRlcywgc2hpcC5vcmllbnRhdGlvbikpXG4gICAgICApIHtcbiAgICAgICAgaWYgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMKSB7XG4gICAgICAgICAgZm9yIChcbiAgICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1swXTtcbiAgICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGkrK1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5jZWxsc1tzaGlwLmNvb3JkaW5hdGVzWzFdXVtpXSA9IENlbGxTdGF0ZS5TSElQO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwpIHtcbiAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzFdO1xuICAgICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgICAgaSsrXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmNlbGxzW2ldW3NoaXAuY29vcmRpbmF0ZXNbMF1dID0gQ2VsbFN0YXRlLlNISVA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zaGlwc1tzaGlwSW5kZXhdID0gdGhpcy5zaGlwcy5wb3AoKTtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIHJvdGF0ZVNoaXA6IGZ1bmN0aW9uIChzaGlwSW5kZXgpIHtcbiAgICAgIGNvbnN0IHNoaXAgPSB0aGlzLnNoaXBzW3NoaXBJbmRleF07XG4gICAgICBpZiAoIXNoaXApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2hpcCBkb2VzIG5vdCBleGlzdFwiKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbmV3T3JpZW50YXRpb24gPVxuICAgICAgICBzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTFxuICAgICAgICAgID8gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMXG4gICAgICAgICAgOiBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTDtcblxuICAgICAgaWYgKG5ld09yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCkge1xuICAgICAgICBpZiAoc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMSA+PSB0aGlzLnNpemUpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1swXSArIDE7XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICBpZiAodGhpcy5jZWxsc1tzaGlwLmNvb3JkaW5hdGVzWzFdXVtpXSAhPT0gQ2VsbFN0YXRlLkVNUFRZKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKG5ld09yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwpIHtcbiAgICAgICAgaWYgKHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDEgPj0gdGhpcy5zaXplKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyAxO1xuICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1sxXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKHRoaXMuY2VsbHNbaV1bc2hpcC5jb29yZGluYXRlc1swXV0gIT09IENlbGxTdGF0ZS5FTVBUWSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobmV3T3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMKSB7XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzFdO1xuICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1sxXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5jZWxsc1tpXVtzaGlwLmNvb3JkaW5hdGVzWzBdXSA9IENlbGxTdGF0ZS5FTVBUWTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1swXTtcbiAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMF0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgaSsrXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuY2VsbHNbc2hpcC5jb29yZGluYXRlc1sxXV1baV0gPSBDZWxsU3RhdGUuU0hJUDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChuZXdPcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMKSB7XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5jZWxsc1tzaGlwLmNvb3JkaW5hdGVzWzFdXVtpXSA9IENlbGxTdGF0ZS5FTVBUWTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1sxXTtcbiAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgaSsrXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuY2VsbHNbaV1bc2hpcC5jb29yZGluYXRlc1swXV0gPSBDZWxsU3RhdGUuU0hJUDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzaGlwLm9yaWVudGF0aW9uID0gbmV3T3JpZW50YXRpb247XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuXG4gICAgZ2V0U2hpcEluZGV4OiBmdW5jdGlvbiAoY29vcmRpbmF0ZXMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5zaGlwc1tpXS5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwpIHtcbiAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgbGV0IGogPSB0aGlzLnNoaXBzW2ldLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgICAgICAgaiA8PSB0aGlzLnNoaXBzW2ldLmNvb3JkaW5hdGVzWzBdICsgdGhpcy5zaGlwc1tpXS5sZW5ndGggLSAxO1xuICAgICAgICAgICAgaisrXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGNvb3JkaW5hdGVzWzBdID09PSBqICYmXG4gICAgICAgICAgICAgIGNvb3JkaW5hdGVzWzFdID09PSB0aGlzLnNoaXBzW2ldLmNvb3JkaW5hdGVzWzFdXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2hpcHNbaV0ub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICBsZXQgaiA9IHRoaXMuc2hpcHNbaV0uY29vcmRpbmF0ZXNbMV07XG4gICAgICAgICAgICBqIDw9IHRoaXMuc2hpcHNbaV0uY29vcmRpbmF0ZXNbMV0gKyB0aGlzLnNoaXBzW2ldLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBqKytcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgY29vcmRpbmF0ZXNbMF0gPT09IHRoaXMuc2hpcHNbaV0uY29vcmRpbmF0ZXNbMF0gJiZcbiAgICAgICAgICAgICAgY29vcmRpbmF0ZXNbMV0gPT09IGpcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgTm8gc2hpcCBmb3VuZCBhdCBnaXZlbiBpbmRleDogWyR7Y29vcmRpbmF0ZXNbMF19LCAke2Nvb3JkaW5hdGVzWzFdfV1gLFxuICAgICAgKTtcbiAgICB9LFxuXG4gICAgcmVjZWl2ZUF0dGFjazogZnVuY3Rpb24gKGNvb3JkaW5hdGVzKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGNvb3JkaW5hdGVzWzBdIDwgMCB8fFxuICAgICAgICBjb29yZGluYXRlc1sxXSA8IDAgfHxcbiAgICAgICAgY29vcmRpbmF0ZXNbMF0gPj0gc2l6ZSB8fFxuICAgICAgICBjb29yZGluYXRlc1sxXSA+PSBzaXplXG4gICAgICApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGF0dGFjayBvdXRzaWRlIHRoZSBib2FyZFwiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICB0aGlzLmNlbGxzW2Nvb3JkaW5hdGVzWzFdXVtjb29yZGluYXRlc1swXV0gIT09IENlbGxTdGF0ZS5FTVBUWSAmJlxuICAgICAgICB0aGlzLmNlbGxzW2Nvb3JkaW5hdGVzWzFdXVtjb29yZGluYXRlc1swXV0gIT09IENlbGxTdGF0ZS5TSElQXG4gICAgICApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2VsbCBoYXMgYWxyZWFkeSBiZWVuIGF0dGFja2VkXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5jZWxsc1tjb29yZGluYXRlc1sxXV1bY29vcmRpbmF0ZXNbMF1dICE9PSBDZWxsU3RhdGUuU0hJUCkge1xuICAgICAgICB0aGlzLmNlbGxzW2Nvb3JkaW5hdGVzWzFdXVtjb29yZGluYXRlc1swXV0gPSBDZWxsU3RhdGUuTUlTUztcbiAgICAgICAgcmV0dXJuIHsgcmVzdWx0OiBDZWxsU3RhdGUuTUlTUywgc2hpcDogdW5kZWZpbmVkIH07XG4gICAgICB9XG5cbiAgICAgIGZvciAoY29uc3Qgc2hpcCBvZiB0aGlzLnNoaXBzKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwgJiZcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzWzFdID09PSBzaGlwLmNvb3JkaW5hdGVzWzFdICYmXG4gICAgICAgICAgICBjb29yZGluYXRlc1swXSA+PSBzaGlwLmNvb3JkaW5hdGVzWzBdICYmXG4gICAgICAgICAgICBjb29yZGluYXRlc1swXSA8PSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxKSB8fFxuICAgICAgICAgIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwgJiZcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzWzBdID09PSBzaGlwLmNvb3JkaW5hdGVzWzBdICYmXG4gICAgICAgICAgICBjb29yZGluYXRlc1sxXSA+PSBzaGlwLmNvb3JkaW5hdGVzWzFdICYmXG4gICAgICAgICAgICBjb29yZGluYXRlc1sxXSA8PSBzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxKVxuICAgICAgICApIHtcbiAgICAgICAgICBzaGlwLmhpdCgpO1xuXG4gICAgICAgICAgaWYgKHNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgICAgIGlmIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCkge1xuICAgICAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1swXTtcbiAgICAgICAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMF0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgaSsrXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2VsbHNbc2hpcC5jb29yZGluYXRlc1sxXV1baV0gPSBDZWxsU3RhdGUuU1VOSztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwpIHtcbiAgICAgICAgICAgICAgZm9yIChcbiAgICAgICAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMV07XG4gICAgICAgICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgIGkrK1xuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW2ldW3NoaXAuY29vcmRpbmF0ZXNbMF1dID0gQ2VsbFN0YXRlLlNVTks7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jZWxsc1tjb29yZGluYXRlc1sxXV1bY29vcmRpbmF0ZXNbMF1dID0gQ2VsbFN0YXRlLkhJVDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4geyByZXN1bHQ6IHRoaXMuY2VsbHNbY29vcmRpbmF0ZXNbMV1dW2Nvb3JkaW5hdGVzWzBdXSwgc2hpcCB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGlzRmxlZXREZXN0cm95ZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGZvciAoY29uc3Qgc2hpcCBvZiB0aGlzLnNoaXBzKSB7XG4gICAgICAgIGlmICghc2hpcC5pc1N1bmsoKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICB9O1xufVxuIiwiaW1wb3J0IHsgY3JlYXRlR2FtZUJvYXJkIH0gZnJvbSBcIi4vZ2FtZUJvYXJkLmpzXCI7XG5cbmV4cG9ydCBjb25zdCBQbGF5ZXJUeXBlID0gT2JqZWN0LmZyZWV6ZSh7XG4gIEhVTUFOOiBcIkhVTUFOXCIsXG4gIENPTVBVVEVSOiBcIkNPTVBVVEVSXCIsXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBsYXllcihuYW1lLCB0eXBlLCBib2FyZFNpemUpIHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lLFxuICAgIHR5cGUsXG4gICAgYm9hcmQ6IGNyZWF0ZUdhbWVCb2FyZChib2FyZFNpemUpLFxuICB9O1xufVxuIiwiZXhwb3J0IGNvbnN0IFNoaXBUeXBlID0gT2JqZWN0LmZyZWV6ZSh7XG4gIENBUlJJRVI6IFwiQ2FycmllclwiLFxuICBCQVRUTEVTSElQOiBcIkJhdHRsZXNoaXBcIixcbiAgREVTVFJPWUVSOiBcIkRlc3Ryb3llclwiLFxuICBTVUJNQVJJTkU6IFwiU3VibWFyaW5lXCIsXG4gIFBBVFJPTDogXCJQYXRyb2wgQm9hdFwiLFxufSk7XG5cbmV4cG9ydCBjb25zdCBTaGlwT3JpZW50YXRpb24gPSBPYmplY3QuZnJlZXplKHtcbiAgSE9SSVpPTlRBTDogXCJIT1JJWk9OVEFMXCIsXG4gIFZFUlRJQ0FMOiBcIlZFUlRJQ0FMXCIsXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNoaXBMZW5ndGgodHlwZSkge1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlIFNoaXBUeXBlLkNBUlJJRVI6XG4gICAgICByZXR1cm4gNTtcbiAgICBjYXNlIFNoaXBUeXBlLkJBVFRMRVNISVA6XG4gICAgICByZXR1cm4gNDtcbiAgICBjYXNlIFNoaXBUeXBlLkRFU1RST1lFUjpcbiAgICAgIHJldHVybiAzO1xuICAgIGNhc2UgU2hpcFR5cGUuU1VCTUFSSU5FOlxuICAgICAgcmV0dXJuIDM7XG4gICAgY2FzZSBTaGlwVHlwZS5QQVRST0w6XG4gICAgICByZXR1cm4gMjtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2hpcChcbiAgdHlwZSxcbiAgY29vcmRpbmF0ZXMgPSBbdW5kZWZpbmVkLCB1bmRlZmluZWRdLFxuICBvcmllbnRhdGlvbiA9IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMLFxuKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogdHlwZSxcbiAgICBsZW5ndGg6IGdldFNoaXBMZW5ndGgodHlwZSksXG4gICAgY29vcmRpbmF0ZXMsXG4gICAgb3JpZW50YXRpb24sXG4gICAgaGl0czogMCxcblxuICAgIGhpdDogZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRoaXMuaGl0cyA8IHRoaXMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuaGl0cysrO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBpc1N1bms6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmhpdHMgPT09IHRoaXMubGVuZ3RoO1xuICAgIH0sXG4gIH07XG59XG4iLCJpbXBvcnQgeyBDZWxsU3RhdGUgfSBmcm9tIFwiLi4vY29yZS9nYW1lQm9hcmQuanNcIjtcbmltcG9ydCB7IFBsYXllclR5cGUgfSBmcm9tIFwiLi4vY29yZS9wbGF5ZXIuanNcIjtcbmltcG9ydCB7XG4gIGNyZWF0ZVNoaXAsXG4gIGdldFNoaXBMZW5ndGgsXG4gIFNoaXBPcmllbnRhdGlvbixcbiAgU2hpcFR5cGUsXG59IGZyb20gXCIuLi9jb3JlL3NoaXAuanNcIjtcblxuaW1wb3J0IHJlZnJlc2hTdmcgZnJvbSBcIi4uLy4uL2Fzc2V0cy9yZWZyZXNoLWNjdy5zdmdcIjtcbmltcG9ydCBlZGl0U3ZnIGZyb20gXCIuLi8uLi9hc3NldHMvZWRpdC5zdmdcIjtcbmltcG9ydCBzYXZlU3ZnIGZyb20gXCIuLi8uLi9hc3NldHMvc2F2ZS5zdmdcIjtcblxuaW1wb3J0IGNhcnJpZXJTdmcgZnJvbSBcIi4uLy4uL2Fzc2V0cy9jYXJyaWVyLnN2Z1wiO1xuaW1wb3J0IGJhdHRsZXNoaXBTdmcgZnJvbSBcIi4uLy4uL2Fzc2V0cy9iYXR0bGVzaGlwLnN2Z1wiO1xuaW1wb3J0IGRlc3Ryb3llclN2ZyBmcm9tIFwiLi4vLi4vYXNzZXRzL2Rlc3Ryb3llci5zdmdcIjtcbmltcG9ydCBzdWJtYXJpbmVTdmcgZnJvbSBcIi4uLy4uL2Fzc2V0cy9zdWJtYXJpbmUuc3ZnXCI7XG5pbXBvcnQgcGF0cm9sU3ZnIGZyb20gXCIuLi8uLi9hc3NldHMvcGF0cm9sLnN2Z1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBHYW1lQm9hcmRzKGdhbWUsIHBsYXllck9uZSwgcGxheWVyVHdvKSB7XG4gIGNvbnN0IGJvYXJkT25lID0gY3JlYXRlQm9hcmRDb21wb25lbnQoXG4gICAgcGxheWVyT25lLmJvYXJkLFxuICAgIHBsYXllck9uZSxcbiAgICBwbGF5ZXJUd28udHlwZSAhPT0gUGxheWVyVHlwZS5DT01QVVRFUixcbiAgICBwbGF5ZXJPbmUudHlwZSA9PT0gUGxheWVyVHlwZS5IVU1BTixcbiAgICBnYW1lLFxuICApO1xuICBib2FyZE9uZS5yYW5kb21pemVGb3JtYXRpb24oKTtcblxuICBib2FyZE9uZS5jb21wb25lbnQuY2xhc3NMaXN0LmFkZChcbiAgICBcInBsYXllci1vbmVcIixcbiAgICBwbGF5ZXJPbmUudHlwZSA9PT0gUGxheWVyVHlwZS5IVU1BTiA/IFwiaHVtYW5cIiA6IFwiY29tcHV0ZXJcIixcbiAgKTtcbiAgaWYgKHBsYXllclR3by50eXBlID09PSBQbGF5ZXJUeXBlLkNPTVBVVEVSKSB7XG4gICAgYm9hcmRPbmUuY29tcG9uZW50LmNsYXNzTGlzdC5hZGQoXCJvbmx5LWh1bWFuXCIpO1xuICAgIGJvYXJkT25lLnJlbmRlclNoaXBzKCk7XG4gIH1cbiAgYm9hcmRPbmUuY29tcG9uZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBib2FyZE9uZS5jbGVhcigpLCB0cnVlKTtcblxuICBjb25zdCBib2FyZFR3byA9IGNyZWF0ZUJvYXJkQ29tcG9uZW50KFxuICAgIHBsYXllclR3by5ib2FyZCxcbiAgICBwbGF5ZXJUd28sXG4gICAgcGxheWVyT25lLnR5cGUgIT09IFBsYXllclR5cGUuQ09NUFVURVIsXG4gICAgcGxheWVyVHdvLnR5cGUgPT09IFBsYXllclR5cGUuSFVNQU4sXG4gICAgZ2FtZSxcbiAgKTtcbiAgYm9hcmRUd28ucmFuZG9taXplRm9ybWF0aW9uKCk7XG5cbiAgYm9hcmRUd28uY29tcG9uZW50LmNsYXNzTGlzdC5hZGQoXG4gICAgXCJwbGF5ZXItdHdvXCIsXG4gICAgcGxheWVyVHdvLnR5cGUgPT09IFBsYXllclR5cGUuSFVNQU4gPyBcImh1bWFuXCIgOiBcImNvbXB1dGVyXCIsXG4gICk7XG5cbiAgW2JvYXJkT25lLCBib2FyZFR3b10uZm9yRWFjaCgoRE9NQm9hcmQsIGJvYXJkSW5kZXgpID0+IHtcbiAgICBsZXQgbW92aW5nU2hpcEluZGV4ID0gbnVsbDtcbiAgICBsZXQgcmVsYXRpdmVEcmFnZ2luZ0NlbGwgPSBudWxsO1xuXG4gICAgQXJyYXkuZnJvbShET01Cb2FyZC5jb21wb25lbnQuY2hpbGRyZW5bMV0uY2hpbGRyZW4pLmZvckVhY2goKHJvdywgaSkgPT4ge1xuICAgICAgQXJyYXkuZnJvbShyb3cuY2hpbGRyZW4pLmZvckVhY2goKGNlbGwsIGopID0+IHtcbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgIC8vIGlmIChcbiAgICAgICAgICAvLyAgIERPTUJvYXJkLmVkaXRpbmcgJiZcbiAgICAgICAgICAvLyAgIERPTUJvYXJkLmlzTXV0YWJsZSgpICYmXG4gICAgICAgICAgLy8gICBjZWxsLmNsYXNzTGlzdC5jb250YWlucyhcInNoaXBcIikgJiZcbiAgICAgICAgICAvLyAgICFnYW1lLmlzSW5Qcm9ncmVzc1xuICAgICAgICAgIC8vICkge1xuICAgICAgICAgIC8vICAgRE9NQm9hcmQudG9nZ2xlU2hpcE1vdGlvbihbaiwgaV0pO1xuICAgICAgICAgIC8vIH1cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBET01Cb2FyZC5pc0F0dGFja2FibGUoKSAmJlxuICAgICAgICAgICAgRE9NQm9hcmQuYWN0aXZlICYmXG4gICAgICAgICAgICBnYW1lLmlzSW5Qcm9ncmVzcyAmJlxuICAgICAgICAgICAgIWdhbWUuaXNHYW1lT3ZlciAmJlxuICAgICAgICAgICAgZ2FtZS5pc1BsYXllcldhaXRpbmdcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnN0IGF0dGFjayA9IERPTUJvYXJkLnJlY2VpdmVBdHRhY2soW2osIGldKTtcbiAgICAgICAgICAgIGlmIChhdHRhY2spIHtcbiAgICAgICAgICAgICAgZ2FtZS51cGRhdGVBdHRhY2tJbmZvKFxuICAgICAgICAgICAgICAgIGF0dGFjay5yZXN1bHQsXG4gICAgICAgICAgICAgICAgYXR0YWNrLnNoaXAsXG4gICAgICAgICAgICAgICAgKGJvYXJkSW5kZXggKyAxKSAlIDIsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGdhbWUuaXNQbGF5ZXJXYWl0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJjb250ZXh0bWVudVwiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhRE9NQm9hcmQuZWRpdGluZyB8fFxuICAgICAgICAgICAgIURPTUJvYXJkLmlzTXV0YWJsZSgpIHx8XG4gICAgICAgICAgICBnYW1lLmlzSW5Qcm9ncmVzcyB8fFxuICAgICAgICAgICAgIWNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hpcFwiKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHNoaXBJbmRleCA9IERPTUJvYXJkLmJvYXJkLmdldFNoaXBJbmRleChbaiwgaV0pO1xuICAgICAgICAgIGNvbnN0IHNoaXAgPSBET01Cb2FyZC5ib2FyZC5zaGlwc1tzaGlwSW5kZXhdO1xuXG4gICAgICAgICAgaWYgKCFjZWxsLmNsYXNzTGlzdC5jb250YWlucyhcIm1vdmluZ1wiKSkge1xuICAgICAgICAgICAgRE9NQm9hcmQudG9nZ2xlU2hpcE1vdGlvbihzaGlwLmNvb3JkaW5hdGVzKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoRE9NQm9hcmQuYm9hcmQucm90YXRlU2hpcChzaGlwSW5kZXgpKSB7XG4gICAgICAgICAgICBET01Cb2FyZC5jbGVhcigpO1xuICAgICAgICAgICAgRE9NQm9hcmQudG9nZ2xlU2hpcE1vdGlvbihzaGlwLmNvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgIERPTUJvYXJkLnJlbmRlcigpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICBpZiAoIURPTUJvYXJkLmVkaXRpbmcpIHJldHVybjtcbiAgICAgICAgICBpZiAoZXZlbnQuYnV0dG9uID09PSAyKSByZXR1cm47XG5cbiAgICAgICAgICBjb25zdCBzaGlwSW5kZXggPSBET01Cb2FyZC5ib2FyZC5nZXRTaGlwSW5kZXgoW2osIGldKTtcbiAgICAgICAgICBpZiAoc2hpcEluZGV4ID09PSB1bmRlZmluZWQpIHJldHVybjtcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG1vdmluZ1NoaXBJbmRleCA9IHNoaXBJbmRleDtcblxuICAgICAgICAgICAgY29uc3Qgc2hpcENvb3JkaW5hdGVzID1cbiAgICAgICAgICAgICAgRE9NQm9hcmQuYm9hcmQuc2hpcHNbbW92aW5nU2hpcEluZGV4XS5jb29yZGluYXRlcztcbiAgICAgICAgICAgIHJlbGF0aXZlRHJhZ2dpbmdDZWxsID0gW1xuICAgICAgICAgICAgICBqIC0gc2hpcENvb3JkaW5hdGVzWzBdLFxuICAgICAgICAgICAgICBpIC0gc2hpcENvb3JkaW5hdGVzWzFdLFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBET01Cb2FyZC50b2dnbGVTaGlwTW90aW9uKFtqLCBpXSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBET01Cb2FyZC5jb21wb25lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoZXZlbnQpID0+IHtcbiAgICAgIGlmICghRE9NQm9hcmQuZWRpdGluZykgcmV0dXJuO1xuICAgICAgaWYgKG1vdmluZ1NoaXBJbmRleCA9PT0gbnVsbCkgcmV0dXJuO1xuICAgICAgaWYgKCFldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY2VsbFwiKSkgcmV0dXJuO1xuXG4gICAgICBET01Cb2FyZC5jbGVhcigpO1xuXG4gICAgICBjb25zdCBjZWxsSW5kZXggPSBnZXRDZWxsSW5kZXgoZXZlbnQudGFyZ2V0KTtcbiAgICAgIGNvbnN0IG5ld0Nvb3JkaW5hdGVzID0gW1xuICAgICAgICBjZWxsSW5kZXhbMF0gLSByZWxhdGl2ZURyYWdnaW5nQ2VsbFswXSxcbiAgICAgICAgY2VsbEluZGV4WzFdIC0gcmVsYXRpdmVEcmFnZ2luZ0NlbGxbMV0sXG4gICAgICBdO1xuICAgICAgaWYgKFxuICAgICAgICBuZXdDb29yZGluYXRlc1swXSA8IDAgfHxcbiAgICAgICAgbmV3Q29vcmRpbmF0ZXNbMV0gPCAwIHx8XG4gICAgICAgIG5ld0Nvb3JkaW5hdGVzWzBdID49IERPTUJvYXJkLmJvYXJkLnNpemUgfHxcbiAgICAgICAgbmV3Q29vcmRpbmF0ZXNbMV0gPj0gRE9NQm9hcmQuYm9hcmQuc2l6ZVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgRE9NQm9hcmQudG9nZ2xlU2hpcE1vdGlvbihcbiAgICAgICAgbmV3Q29vcmRpbmF0ZXMsXG4gICAgICAgIERPTUJvYXJkLmJvYXJkLnNoaXBzW21vdmluZ1NoaXBJbmRleF0sXG4gICAgICApO1xuXG4gICAgICBjb25zdCBzaGlwSW1hZ2UgPSBET01Cb2FyZC5jb21wb25lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgYC5zaGlwLSR7bW92aW5nU2hpcEluZGV4fWAsXG4gICAgICApO1xuICAgICAgaWYgKHNoaXBJbWFnZSkge1xuICAgICAgICBjb25zdCBuZXdDZWxsID1cbiAgICAgICAgICBET01Cb2FyZC5jb21wb25lbnQuY2hpbGRyZW5bMV0uY2hpbGRyZW5bbmV3Q29vcmRpbmF0ZXNbMV1dLmNoaWxkcmVuW1xuICAgICAgICAgICAgbmV3Q29vcmRpbmF0ZXNbMF1cbiAgICAgICAgICBdO1xuICAgICAgICBzaGlwSW1hZ2Uuc3R5bGUubGVmdCA9IGAke25ld0NlbGwub2Zmc2V0TGVmdH1weGA7XG4gICAgICAgIHNoaXBJbWFnZS5zdHlsZS50b3AgPSBgJHtuZXdDZWxsLm9mZnNldFRvcH1weGA7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgbW92aW5nU2hpcEluZGV4ICE9PSBudWxsICYmXG4gICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJjZWxsXCIpICYmXG4gICAgICAgIGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZSA9PT0gRE9NQm9hcmQuY29tcG9uZW50XG4gICAgICApIHtcbiAgICAgICAgY29uc3QgY2VsbEluZGV4ID0gZ2V0Q2VsbEluZGV4KGV2ZW50LnRhcmdldCk7XG4gICAgICAgIGNvbnN0IG5ld0Nvb3JkaW5hdGVzID0gW1xuICAgICAgICAgIGNlbGxJbmRleFswXSAtIHJlbGF0aXZlRHJhZ2dpbmdDZWxsWzBdLFxuICAgICAgICAgIGNlbGxJbmRleFsxXSAtIHJlbGF0aXZlRHJhZ2dpbmdDZWxsWzFdLFxuICAgICAgICBdO1xuICAgICAgICBjb25zdCBtb3ZpbmdTaGlwID0gRE9NQm9hcmQuYm9hcmQuc2hpcHNbbW92aW5nU2hpcEluZGV4XTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgbmV3Q29vcmRpbmF0ZXNbMF0gPj0gMCAmJlxuICAgICAgICAgIG5ld0Nvb3JkaW5hdGVzWzFdID49IDAgJiZcbiAgICAgICAgICAoKG1vdmluZ1NoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMICYmXG4gICAgICAgICAgICBuZXdDb29yZGluYXRlc1swXSA8IERPTUJvYXJkLmJvYXJkLnNpemUgLSBtb3ZpbmdTaGlwLmxlbmd0aCArIDEpIHx8XG4gICAgICAgICAgICAobW92aW5nU2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMICYmXG4gICAgICAgICAgICAgIG5ld0Nvb3JkaW5hdGVzWzFdIDwgRE9NQm9hcmQuYm9hcmQuc2l6ZSAtIG1vdmluZ1NoaXAubGVuZ3RoICsgMSkpXG4gICAgICAgICkge1xuICAgICAgICAgIERPTUJvYXJkLmJvYXJkLm1vdmVTaGlwKG1vdmluZ1NoaXBJbmRleCwgbmV3Q29vcmRpbmF0ZXMpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKG1vdmluZ1NoaXBJbmRleCAhPT0gbnVsbCkge1xuICAgICAgICBjb25zdCBtb3ZpbmdDZWxsID0gRE9NQm9hcmQuY29tcG9uZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW92aW5nXCIpO1xuICAgICAgICBpZiAobW92aW5nQ2VsbCkge1xuICAgICAgICAgIGNvbnN0IG5ld0Nvb3JkaW5hdGVzID0gZ2V0Q2VsbEluZGV4KG1vdmluZ0NlbGwpO1xuICAgICAgICAgIERPTUJvYXJkLmJvYXJkLm1vdmVTaGlwKG1vdmluZ1NoaXBJbmRleCwgbmV3Q29vcmRpbmF0ZXMpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG1vdmluZ1NoaXBJbmRleCA9IG51bGw7XG4gICAgICByZWxhdGl2ZURyYWdnaW5nQ2VsbCA9IG51bGw7XG5cbiAgICAgIERPTUJvYXJkLmNsZWFyKCk7XG4gICAgICBET01Cb2FyZC5yZW5kZXIoKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGV2ZW50KSA9PiB7XG4gICAgaWYgKGJvYXJkT25lLmVkaXRpbmcpIGJvYXJkT25lLm1vdmVTaGlwKGV2ZW50LmtleSk7XG4gICAgZWxzZSBpZiAoYm9hcmRUd28uZWRpdGluZykgYm9hcmRUd28ubW92ZVNoaXAoZXZlbnQua2V5KTtcbiAgfSk7XG5cbiAgcmV0dXJuIFtib2FyZE9uZSwgYm9hcmRUd29dO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQm9hcmRDb21wb25lbnQoYm9hcmQsIHBsYXllciwgYXR0YWNrYWJsZSwgbXV0YWJsZSwgZ2FtZSkge1xuICBjb25zdCBib2FyZENvbXBvbmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGJvYXJkQ29tcG9uZW50LmNsYXNzTGlzdC5hZGQoXCJib2FyZFwiKTtcblxuICBjb25zdCBib2FyZEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpO1xuICBib2FyZEhlYWRlci5jbGFzc0xpc3QuYWRkKFwiYm9hcmQtaGVhZGVyXCIpO1xuICBib2FyZEhlYWRlci5pbm5lckhUTUwgPSBgXG4gICAgPHAgY2xhc3M9XCJwbGF5ZXItbmFtZVwiPiR7cGxheWVyLm5hbWV9PC9wPlxuICAgIDxpbnB1dCBjbGFzcz1cInBsYXllci1uYW1lLWlucHV0IGhpZGRlblwiIHR5cGU9XCJ0ZXh0XCIgcmVxdWlyZWQgdmFsdWU9XCIke3BsYXllci5uYW1lfVwiIC8+XG4gIGA7XG4gIGJvYXJkQ29tcG9uZW50LmFwcGVuZENoaWxkKGJvYXJkSGVhZGVyKTtcblxuICBsZXQgcmFuZG9taXplQnV0dG9uLCBlZGl0QnV0dG9uLCBzYXZlQnV0dG9uO1xuICBpZiAocGxheWVyLnR5cGUgPT09IFBsYXllclR5cGUuSFVNQU4pIHtcbiAgICByYW5kb21pemVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIHJhbmRvbWl6ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwicmFuZG9taXplLWJvYXJkXCIpO1xuICAgIHJhbmRvbWl6ZUJ1dHRvbi50aXRsZSA9IFwiUmFuZG9taXplIHNoaXAgcGxhY2VtZW50XCI7XG4gICAgcmFuZG9taXplQnV0dG9uLnR5cGUgPSBcImJ1dHRvblwiO1xuICAgIGNvbnN0IHJlZnJlc2hJY29uID0gbmV3IEltYWdlKCk7XG4gICAgcmVmcmVzaEljb24uc3JjID0gcmVmcmVzaFN2ZztcbiAgICByYW5kb21pemVCdXR0b24uYXBwZW5kQ2hpbGQocmVmcmVzaEljb24pO1xuXG4gICAgZWRpdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgZWRpdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZWRpdC1ib2FyZFwiKTtcbiAgICBlZGl0QnV0dG9uLnRpdGxlID0gXCJFZGl0IGJvYXJkIChjaGFuZ2UgbmFtZSwgbW92ZSBzaGlwcylcIjtcbiAgICBlZGl0QnV0dG9uLnR5cGUgPSBcImJ1dHRvblwiO1xuICAgIGNvbnN0IGVkaXRJY29uID0gbmV3IEltYWdlKCk7XG4gICAgZWRpdEljb24uc3JjID0gZWRpdFN2ZztcbiAgICBlZGl0QnV0dG9uLmFwcGVuZENoaWxkKGVkaXRJY29uKTtcblxuICAgIHNhdmVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIHNhdmVCdXR0b24uY2xhc3NMaXN0LmFkZChcInNhdmUtYm9hcmRcIiwgXCJoaWRkZW5cIik7XG4gICAgc2F2ZUJ1dHRvbi50aXRsZSA9IFwiU2F2ZSBib2FyZFwiO1xuICAgIHNhdmVCdXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XG4gICAgY29uc3Qgc2F2ZUljb24gPSBuZXcgSW1hZ2UoKTtcbiAgICBzYXZlSWNvbi5zcmMgPSBzYXZlU3ZnO1xuICAgIHNhdmVCdXR0b24uYXBwZW5kQ2hpbGQoc2F2ZUljb24pO1xuXG4gICAgY29uc3QgYm9hcmRDb250cm9scyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgYm9hcmRDb250cm9scy5jbGFzc0xpc3QuYWRkKFwiYm9hcmQtY29udHJvbHNcIik7XG4gICAgYm9hcmRDb250cm9scy5hcHBlbmRDaGlsZChyYW5kb21pemVCdXR0b24pO1xuICAgIGJvYXJkQ29udHJvbHMuYXBwZW5kQ2hpbGQoZWRpdEJ1dHRvbik7XG4gICAgYm9hcmRDb250cm9scy5hcHBlbmRDaGlsZChzYXZlQnV0dG9uKTtcbiAgICBib2FyZEhlYWRlci5hcHBlbmRDaGlsZChib2FyZENvbnRyb2xzKTtcbiAgfVxuXG4gIGNvbnN0IGJvYXJkQ2VsbHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBib2FyZENlbGxzLmNsYXNzTGlzdC5hZGQoXCJib2FyZC1jZWxsc1wiKTtcbiAgYm9hcmRDb21wb25lbnQuYXBwZW5kQ2hpbGQoYm9hcmRDZWxscyk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBib2FyZC5jZWxscy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHJvd0NvbXBvbmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcm93Q29tcG9uZW50LmNsYXNzTGlzdC5hZGQoXCJyb3dcIik7XG5cbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGJvYXJkLmNlbGxzW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICBjb25zdCBjZWxsQ29tcG9uZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIGNlbGxDb21wb25lbnQuY2xhc3NMaXN0LmFkZChcImNlbGxcIik7XG4gICAgICBjZWxsQ29tcG9uZW50LmNsYXNzTGlzdC5hZGQoZ2V0Q2VsbENsYXNzTmFtZShbaiwgaV0sIGJvYXJkKSk7XG4gICAgICByb3dDb21wb25lbnQuYXBwZW5kQ2hpbGQoY2VsbENvbXBvbmVudCk7XG4gICAgfVxuXG4gICAgYm9hcmRDZWxscy5hcHBlbmRDaGlsZChyb3dDb21wb25lbnQpO1xuICB9XG5cbiAgY29uc3Qgc2hpcHNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBzaGlwc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiYm9hcmQtc2hpcHNcIik7XG4gIGJvYXJkQ2VsbHMuYXBwZW5kQ2hpbGQoc2hpcHNDb250YWluZXIpO1xuXG4gIGNvbnN0IERPTUJvYXJkID0ge1xuICAgIGNvbXBvbmVudDogYm9hcmRDb21wb25lbnQsXG4gICAgYm9hcmQ6IGJvYXJkLFxuICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgZWRpdGluZzogZmFsc2UsXG5cbiAgICBpc0F0dGFja2FibGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBhdHRhY2thYmxlO1xuICAgIH0sXG5cbiAgICBpc011dGFibGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBtdXRhYmxlO1xuICAgIH0sXG5cbiAgICBjbGVhcjogZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgbW92aW5nQ2VsbHMgPVxuICAgICAgICB0aGlzLmNvbXBvbmVudC5jaGlsZHJlblsxXS5xdWVyeVNlbGVjdG9yQWxsKFwiLm1vdmluZ1wiKTtcbiAgICAgIGlmIChtb3ZpbmdDZWxscy5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgIGZvciAoY29uc3QgY2VsbCBvZiBtb3ZpbmdDZWxscykge1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoXCJtb3ZpbmdcIik7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgQXJyYXkuZnJvbSh0aGlzLmNvbXBvbmVudC5jaGlsZHJlblsxXS5jaGlsZHJlbikuZm9yRWFjaCgocm93LCBpKSA9PiB7XG4gICAgICAgIGlmIChyb3cuY2xhc3NOYW1lID09PSBcImJvYXJkLXNoaXBzXCIpIHJldHVybjtcblxuICAgICAgICBBcnJheS5mcm9tKHJvdy5jaGlsZHJlbikuZm9yRWFjaCgoY2VsbCwgaikgPT4ge1xuICAgICAgICAgIGNvbnN0IGlzTW92aW5nID0gY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb3ZpbmdcIik7XG5cbiAgICAgICAgICBjZWxsLmNsYXNzTmFtZSA9IFwiY2VsbFwiO1xuICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChnZXRDZWxsQ2xhc3NOYW1lKFtqLCBpXSwgdGhpcy5ib2FyZCkpO1xuICAgICAgICAgIGlmIChpc01vdmluZykgY2VsbC5jbGFzc0xpc3QuYWRkKFwibW92aW5nXCIpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnJlbmRlclNoaXBzKCk7XG4gICAgfSxcblxuICAgIHJlbmRlclNoaXBzOiBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBzaGlwc0NvbnRhaW5lciA9IHRoaXMuY29tcG9uZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYm9hcmQtc2hpcHNcIik7XG5cbiAgICAgIEFycmF5LmZyb20oc2hpcHNDb250YWluZXIuY2hpbGRyZW4pLmZvckVhY2goKHNoaXBJbWFnZSkgPT4ge1xuICAgICAgICBzaGlwc0NvbnRhaW5lci5yZW1vdmVDaGlsZChzaGlwSW1hZ2UpO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHdpbmRvd1dpZHRoID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xuICAgICAgY29uc3Qgd2luZG93SGVpZ2h0ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodDtcblxuICAgICAgY29uc3QgaXNWZXJ0aWNhbFNjcmVlbiA9IHdpbmRvd0hlaWdodCA+IHdpbmRvd0hlaWdodDtcblxuICAgICAgbGV0IGNlbGxTaXplID0gdGhpcy5jb21wb25lbnQucXVlcnlTZWxlY3RvcihcIi5jZWxsXCIpLmNsaWVudFdpZHRoO1xuICAgICAgaWYgKCFjZWxsU2l6ZSkge1xuICAgICAgICBjZWxsU2l6ZSA9ICg0IC8gMTAwKSAqIChpc1ZlcnRpY2FsU2NyZWVuID8gd2luZG93V2lkdGggOiB3aW5kb3dIZWlnaHQpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBncmlkR2FwID0gY2VsbFNpemUgLyAxMDtcbiAgICAgIGNvbnNvbGUubG9nKGNlbGxTaXplKTtcblxuICAgICAgdGhpcy5ib2FyZC5zaGlwcy5mb3JFYWNoKChzaGlwLCBpKSA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAhdGhpcy5jb21wb25lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZWRpdGluZ1wiKSAmJlxuICAgICAgICAgICF0aGlzLmNvbXBvbmVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJvbmx5LWh1bWFuXCIpICYmXG4gICAgICAgICAgIXRoaXMuY29tcG9uZW50LmNsYXNzTGlzdC5jb250YWlucyhcImF0dGFja2luZ1wiKSAmJlxuICAgICAgICAgICFzaGlwLmlzU3VuaygpXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHggPSBzaGlwLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgICBjb25zdCB5ID0gc2hpcC5jb29yZGluYXRlc1sxXTtcblxuICAgICAgICBjb25zdCBzaGlwSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgc3dpdGNoIChzaGlwLnR5cGUpIHtcbiAgICAgICAgICBjYXNlIFNoaXBUeXBlLkNBUlJJRVI6XG4gICAgICAgICAgICBzaGlwSW1hZ2Uuc3JjID0gY2FycmllclN2ZztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgU2hpcFR5cGUuQkFUVExFU0hJUDpcbiAgICAgICAgICAgIHNoaXBJbWFnZS5zcmMgPSBiYXR0bGVzaGlwU3ZnO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBTaGlwVHlwZS5ERVNUUk9ZRVI6XG4gICAgICAgICAgICBzaGlwSW1hZ2Uuc3JjID0gZGVzdHJveWVyU3ZnO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBTaGlwVHlwZS5TVUJNQVJJTkU6XG4gICAgICAgICAgICBzaGlwSW1hZ2Uuc3JjID0gc3VibWFyaW5lU3ZnO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBTaGlwVHlwZS5QQVRST0w6XG4gICAgICAgICAgICBzaGlwSW1hZ2Uuc3JjID0gcGF0cm9sU3ZnO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgc2hpcEltYWdlLmFsdCA9IHNoaXAudHlwZTtcbiAgICAgICAgc2hpcEltYWdlLnRpdGxlID0gc2hpcC50eXBlO1xuICAgICAgICBzaGlwSW1hZ2UuY2xhc3NOYW1lID0gYHNoaXAtaW1nYDtcbiAgICAgICAgc2hpcEltYWdlLmNsYXNzTGlzdC5hZGQoYHNoaXAtJHtpfWApO1xuXG4gICAgICAgIGlmIChzaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgc2hpcEltYWdlLmNsYXNzTGlzdC5hZGQoYHNoaXAtc3Vua2ApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICAgIHNoaXBJbWFnZS5zdHlsZS50cmFuc2Zvcm1PcmlnaW4gPSBcInRvcCBsZWZ0XCI7XG4gICAgICAgICAgc2hpcEltYWdlLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGUoOTBkZWcpIHRyYW5zbGF0ZVkoLSR7Y2VsbFNpemV9cHgpYDtcbiAgICAgICAgfVxuXG4gICAgICAgIHNoaXBJbWFnZS5zdHlsZS5sZWZ0ID0gYCR7eCAqIChjZWxsU2l6ZSArIGdyaWRHYXApfXB4YDtcbiAgICAgICAgc2hpcEltYWdlLnN0eWxlLnRvcCA9IGAke3kgKiAoY2VsbFNpemUgKyBncmlkR2FwKX1weGA7XG5cbiAgICAgICAgc2hpcHNDb250YWluZXIuYXBwZW5kQ2hpbGQoc2hpcEltYWdlKTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICByYW5kb21pemVGb3JtYXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgIHRoaXMuYm9hcmQucmVzZXQoKTtcblxuICAgICAgZm9yIChjb25zdCB0eXBlIG9mIE9iamVjdC5rZXlzKFNoaXBUeXBlKSkge1xuICAgICAgICBjb25zdCBzaGlwTGVuZ3RoID0gZ2V0U2hpcExlbmd0aChTaGlwVHlwZVt0eXBlXSk7XG5cbiAgICAgICAgbGV0IHBsYWNlZCA9IGZhbHNlO1xuICAgICAgICB3aGlsZSAoIXBsYWNlZCkge1xuICAgICAgICAgIGNvbnN0IG9yaWVudGF0aW9uID1cbiAgICAgICAgICAgIE1hdGgucmFuZG9tKCkgPiAwLjVcbiAgICAgICAgICAgICAgPyBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTFxuICAgICAgICAgICAgICA6IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTDtcblxuICAgICAgICAgIGNvbnN0IHggPSBNYXRoLmZsb29yKFxuICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqXG4gICAgICAgICAgICAgICgxMCAtXG4gICAgICAgICAgICAgICAgKG9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCA/IHNoaXBMZW5ndGggOiAwKSksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihcbiAgICAgICAgICAgIE1hdGgucmFuZG9tKCkgKlxuICAgICAgICAgICAgICAoMTAgLVxuICAgICAgICAgICAgICAgIChvcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMID8gc2hpcExlbmd0aCA6IDApKSxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgcGxhY2VkID0gdGhpcy5ib2FyZC5wbGFjZVNoaXAoXG4gICAgICAgICAgICBjcmVhdGVTaGlwKFNoaXBUeXBlW3R5cGVdLCBbeCwgeV0sIG9yaWVudGF0aW9uKSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfSxcblxuICAgIHRvZ2dsZVNoaXBNb3Rpb246IGZ1bmN0aW9uIChjb29yZGluYXRlcywgbW92aW5nU2hpcCA9IG51bGwpIHtcbiAgICAgIGlmIChcbiAgICAgICAgY29vcmRpbmF0ZXNbMF0gPCAwIHx8XG4gICAgICAgIGNvb3JkaW5hdGVzWzFdIDwgMCB8fFxuICAgICAgICBjb29yZGluYXRlc1swXSA+PSB0aGlzLmJvYXJkLnNpemUgfHxcbiAgICAgICAgY29vcmRpbmF0ZXNbMV0gPj0gdGhpcy5ib2FyZC5zaXplXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIG1vdmluZ1NoaXAgJiZcbiAgICAgICAgKChtb3ZpbmdTaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCAmJlxuICAgICAgICAgIGNvb3JkaW5hdGVzWzBdID49IHRoaXMuYm9hcmQuc2l6ZSAtIG1vdmluZ1NoaXAubGVuZ3RoICsgMSkgfHxcbiAgICAgICAgICAobW92aW5nU2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMICYmXG4gICAgICAgICAgICBjb29yZGluYXRlc1sxXSA+PSB0aGlzLmJvYXJkLnNpemUgLSBtb3ZpbmdTaGlwLmxlbmd0aCArIDEpKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKCFtb3ZpbmdTaGlwKSB7XG4gICAgICAgIGNvbnN0IGNlbGwgPVxuICAgICAgICAgIHRoaXMuY29tcG9uZW50LmNoaWxkcmVuWzFdLmNoaWxkcmVuW2Nvb3JkaW5hdGVzWzFdXS5jaGlsZHJlbltcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzWzBdXG4gICAgICAgICAgXTtcbiAgICAgICAgaWYgKCFjZWxsLmNsYXNzTGlzdC5jb250YWlucyhcInNoaXBcIikpIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbGV0IHNoaXAsIGxlbmd0aCwgb3JpZW50YXRpb247XG5cbiAgICAgIGlmIChtb3ZpbmdTaGlwKSB7XG4gICAgICAgIGxlbmd0aCA9IG1vdmluZ1NoaXAubGVuZ3RoO1xuICAgICAgICBvcmllbnRhdGlvbiA9IG1vdmluZ1NoaXAub3JpZW50YXRpb247XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzaGlwID0gdGhpcy5ib2FyZC5zaGlwc1t0aGlzLmJvYXJkLmdldFNoaXBJbmRleChjb29yZGluYXRlcyldO1xuICAgICAgICBjb29yZGluYXRlcyA9IHNoaXAuY29vcmRpbmF0ZXM7XG4gICAgICAgIGxlbmd0aCA9IHNoaXAubGVuZ3RoO1xuICAgICAgICBvcmllbnRhdGlvbiA9IHNoaXAub3JpZW50YXRpb247XG4gICAgICB9XG5cbiAgICAgIHN3aXRjaCAob3JpZW50YXRpb24pIHtcbiAgICAgICAgY2FzZSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTDpcbiAgICAgICAgICBmb3IgKGxldCBpID0gY29vcmRpbmF0ZXNbMF07IGkgPD0gY29vcmRpbmF0ZXNbMF0gKyBsZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmNoaWxkcmVuWzFdLmNoaWxkcmVuW2Nvb3JkaW5hdGVzWzFdXS5jaGlsZHJlbltcbiAgICAgICAgICAgICAgaVxuICAgICAgICAgICAgXS5jbGFzc0xpc3QudG9nZ2xlKFwibW92aW5nXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUw6XG4gICAgICAgICAgZm9yIChsZXQgaSA9IGNvb3JkaW5hdGVzWzFdOyBpIDw9IGNvb3JkaW5hdGVzWzFdICsgbGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5jaGlsZHJlblsxXS5jaGlsZHJlbltpXS5jaGlsZHJlbltcbiAgICAgICAgICAgICAgY29vcmRpbmF0ZXNbMF1cbiAgICAgICAgICAgIF0uY2xhc3NMaXN0LnRvZ2dsZShcIm1vdmluZ1wiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSxcblxuICAgIG1vdmVTaGlwOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBjb25zdCBtb3ZpbmdTaGlwQ2VsbCA9XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmNoaWxkcmVuWzFdLnF1ZXJ5U2VsZWN0b3IoXCIubW92aW5nXCIpO1xuXG4gICAgICBpZiAoIW1vdmluZ1NoaXBDZWxsKSByZXR1cm47XG5cbiAgICAgIGNvbnN0IG1vdmluZ1NoaXBDb29yZGluYXRlcyA9IGdldENlbGxJbmRleChtb3ZpbmdTaGlwQ2VsbCk7XG4gICAgICBjb25zdCBtb3ZpbmdTaGlwSW5kZXggPSB0aGlzLmJvYXJkLmdldFNoaXBJbmRleChtb3ZpbmdTaGlwQ29vcmRpbmF0ZXMpO1xuXG4gICAgICB0aGlzLnRvZ2dsZVNoaXBNb3Rpb24obW92aW5nU2hpcENvb3JkaW5hdGVzKTtcblxuICAgICAgbGV0IG1vdmVTdWNjZXNzZnVsID0gZmFsc2U7XG4gICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICBjYXNlIFwiQXJyb3dVcFwiOlxuICAgICAgICAgIGlmIChtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMV0gPD0gMCkgYnJlYWs7XG4gICAgICAgICAgbW92ZVN1Y2Nlc3NmdWwgPSB0aGlzLmJvYXJkLm1vdmVTaGlwKG1vdmluZ1NoaXBJbmRleCwgW1xuICAgICAgICAgICAgbW92aW5nU2hpcENvb3JkaW5hdGVzWzBdLFxuICAgICAgICAgICAgbW92aW5nU2hpcENvb3JkaW5hdGVzWzFdIC0gMSxcbiAgICAgICAgICBdKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93TGVmdFwiOlxuICAgICAgICAgIGlmIChtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMF0gPD0gMCkgYnJlYWs7XG4gICAgICAgICAgbW92ZVN1Y2Nlc3NmdWwgPSB0aGlzLmJvYXJkLm1vdmVTaGlwKG1vdmluZ1NoaXBJbmRleCwgW1xuICAgICAgICAgICAgbW92aW5nU2hpcENvb3JkaW5hdGVzWzBdIC0gMSxcbiAgICAgICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlc1sxXSxcbiAgICAgICAgICBdKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93RG93blwiOlxuICAgICAgICAgIGlmIChtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMV0gPj0gdGhpcy5ib2FyZC5zaXplIC0gMSkgYnJlYWs7XG4gICAgICAgICAgbW92ZVN1Y2Nlc3NmdWwgPSB0aGlzLmJvYXJkLm1vdmVTaGlwKG1vdmluZ1NoaXBJbmRleCwgW1xuICAgICAgICAgICAgbW92aW5nU2hpcENvb3JkaW5hdGVzWzBdLFxuICAgICAgICAgICAgbW92aW5nU2hpcENvb3JkaW5hdGVzWzFdICsgMSxcbiAgICAgICAgICBdKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFycm93UmlnaHRcIjpcbiAgICAgICAgICBpZiAobW92aW5nU2hpcENvb3JkaW5hdGVzWzBdID49IHRoaXMuYm9hcmQuc2l6ZSAtIDEpIGJyZWFrO1xuICAgICAgICAgIG1vdmVTdWNjZXNzZnVsID0gdGhpcy5ib2FyZC5tb3ZlU2hpcChtb3ZpbmdTaGlwSW5kZXgsIFtcbiAgICAgICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlc1swXSArIDEsXG4gICAgICAgICAgICBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMV0sXG4gICAgICAgICAgXSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGlmICghbW92ZVN1Y2Nlc3NmdWwpIHtcbiAgICAgICAgdGhpcy50b2dnbGVTaGlwTW90aW9uKG1vdmluZ1NoaXBDb29yZGluYXRlcyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5yZW5kZXIoKTtcblxuICAgICAgY29uc3QgbW92ZWRTaGlwID0gdGhpcy5ib2FyZC5zaGlwc1ttb3ZpbmdTaGlwSW5kZXhdO1xuICAgICAgdGhpcy50b2dnbGVTaGlwTW90aW9uKG1vdmVkU2hpcC5jb29yZGluYXRlcyk7XG4gICAgfSxcblxuICAgIHJlY2VpdmVBdHRhY2s6IGZ1bmN0aW9uIChjb29yZGluYXRlcykge1xuICAgICAgY29uc3QgY2VsbCA9IGJvYXJkLmNlbGxzW2Nvb3JkaW5hdGVzWzFdXVtjb29yZGluYXRlc1swXV07XG4gICAgICBpZiAoY2VsbCAhPT0gQ2VsbFN0YXRlLkVNUFRZICYmIGNlbGwgIT09IENlbGxTdGF0ZS5TSElQKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVzdWx0ID0gYm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcyk7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuXG4gICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG5cbiAgICBjb21wdXRlckF0dGFjazogYXN5bmMgZnVuY3Rpb24gKGF0dGFja2VySW5kZXgpIHtcbiAgICAgIGxldCB4LCB5O1xuXG4gICAgICBsZXQgdmFsaWQgPSBmYWxzZTtcbiAgICAgIHdoaWxlICghdmFsaWQpIHtcbiAgICAgICAgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGJvYXJkLnNpemUpO1xuICAgICAgICB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYm9hcmQuc2l6ZSk7XG5cbiAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuY29tcG9uZW50LmNoaWxkcmVuWzFdLmNoaWxkcmVuW3ldLmNoaWxkcmVuW3hdO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJlbXB0eVwiKSB8fFxuICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hpcFwiKVxuICAgICAgICApIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBhd2FpdCBuZXcgUHJvbWlzZSgocikgPT4gc2V0VGltZW91dChyLCA1MDApKTtcblxuICAgICAgY29uc3QgYXR0YWNrID0gdGhpcy5yZWNlaXZlQXR0YWNrKFt4LCB5XSk7XG4gICAgICBnYW1lLnVwZGF0ZUF0dGFja0luZm8oYXR0YWNrLnJlc3VsdCwgYXR0YWNrLnNoaXAsIGF0dGFja2VySW5kZXgpO1xuICAgIH0sXG4gIH07XG5cbiAgZnVuY3Rpb24gc2F2ZUVkaXRzKCkge1xuICAgIGlmICghRE9NQm9hcmQuY29tcG9uZW50LmNoaWxkcmVuWzBdLnJlcG9ydFZhbGlkaXR5KCkpIHJldHVybjtcbiAgICBib2FyZEhlYWRlci5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1uYW1lXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgYm9hcmRIZWFkZXIucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItbmFtZS1pbnB1dFwiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgIGJvYXJkSGVhZGVyLnF1ZXJ5U2VsZWN0b3IoXCIuZWRpdC1ib2FyZFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgIHNhdmVCdXR0b24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcblxuICAgIERPTUJvYXJkLmVkaXRpbmcgPSBmYWxzZTtcbiAgICBET01Cb2FyZC5jb21wb25lbnQuY2xhc3NMaXN0LnJlbW92ZShcImVkaXRpbmdcIik7XG4gICAgRE9NQm9hcmQuY2xlYXIoKTtcbiAgfVxuXG4gIGlmIChwbGF5ZXIudHlwZSA9PT0gUGxheWVyVHlwZS5IVU1BTikge1xuICAgIHJhbmRvbWl6ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgRE9NQm9hcmQucmFuZG9taXplRm9ybWF0aW9uKCk7XG4gICAgfSk7XG5cbiAgICBlZGl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lZGl0aW5nXCIpKSB7XG4gICAgICAgIGFsZXJ0KFwiUGxlYXNlIHNhdmUgdGhlIGN1cnJlbnRseSBlZGl0aW5nIGJvYXJkIGZpcnN0XCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGJvYXJkSGVhZGVyID0gRE9NQm9hcmQuY29tcG9uZW50LmNoaWxkcmVuWzBdO1xuXG4gICAgICBib2FyZEhlYWRlci5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1uYW1lXCIpLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICBib2FyZEhlYWRlclxuICAgICAgICAucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItbmFtZS1pbnB1dFwiKVxuICAgICAgICAuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgIGVkaXRCdXR0b24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIGJvYXJkSGVhZGVyLnF1ZXJ5U2VsZWN0b3IoXCIuc2F2ZS1ib2FyZFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuXG4gICAgICBET01Cb2FyZC5lZGl0aW5nID0gdHJ1ZTtcbiAgICAgIERPTUJvYXJkLmNvbXBvbmVudC5jbGFzc0xpc3QuYWRkKFwiZWRpdGluZ1wiKTtcbiAgICAgIERPTUJvYXJkLnJlbmRlcigpO1xuICAgIH0pO1xuXG4gICAgYm9hcmRIZWFkZXJcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1uYW1lLWlucHV0XCIpXG4gICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgcGxheWVyLm5hbWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgIGJvYXJkSGVhZGVyLnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLW5hbWVcIikudGV4dENvbnRlbnQgPSBwbGF5ZXIubmFtZTtcbiAgICAgIH0pO1xuXG4gICAgc2F2ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2F2ZUVkaXRzKTtcblxuICAgIGJvYXJkSGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2ZW50KSA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgc2F2ZUVkaXRzKCk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gRE9NQm9hcmQ7XG59XG5cbmZ1bmN0aW9uIGdldENlbGxJbmRleChjZWxsKSB7XG4gIHJldHVybiBbXG4gICAgQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChjZWxsLnBhcmVudE5vZGUuY2hpbGRyZW4sIGNlbGwpLFxuICAgIEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoXG4gICAgICBjZWxsLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jaGlsZHJlbixcbiAgICAgIGNlbGwucGFyZW50Tm9kZSxcbiAgICApLFxuICBdO1xufVxuXG5mdW5jdGlvbiBnZXRDZWxsQ2xhc3NOYW1lKGNvb3JkaW5hdGVzLCBib2FyZCwgc2VjcmV0ID0gZmFsc2UpIHtcbiAgY29uc3QgY2VsbCA9IGJvYXJkLmNlbGxzW2Nvb3JkaW5hdGVzWzFdXVtjb29yZGluYXRlc1swXV07XG4gIHN3aXRjaCAoY2VsbCkge1xuICAgIGNhc2UgQ2VsbFN0YXRlLkVNUFRZOlxuICAgICAgcmV0dXJuIFwiZW1wdHlcIjtcbiAgICBjYXNlIENlbGxTdGF0ZS5NSVNTOlxuICAgICAgcmV0dXJuIFwibWlzc1wiO1xuICAgIGNhc2UgQ2VsbFN0YXRlLlNISVA6XG4gICAgICByZXR1cm4gc2VjcmV0ID8gXCJlbXB0eVwiIDogXCJzaGlwXCI7XG4gICAgY2FzZSBDZWxsU3RhdGUuSElUOlxuICAgICAgcmV0dXJuIFwiaGl0XCI7XG4gICAgY2FzZSBDZWxsU3RhdGUuU1VOSzpcbiAgICAgIHJldHVybiBcInN1bmtcIjtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ2VsbFN0YXRlIH0gZnJvbSBcIi4uL2NvcmUvZ2FtZUJvYXJkLmpzXCI7XG5pbXBvcnQgeyBQbGF5ZXJUeXBlIH0gZnJvbSBcIi4uL2NvcmUvcGxheWVyLmpzXCI7XG5pbXBvcnQgeyBzZXR1cEdhbWVCb2FyZHMgfSBmcm9tIFwiLi9ib2FyZHMuanNcIjtcblxuZXhwb3J0IGNvbnN0IEdhbWVNb2RlID0gT2JqZWN0LmZyZWV6ZSh7XG4gIENPTVBVVEVSOiBcImNvbXB1dGVyXCIsXG4gIEZSSUVORDogXCJmcmllbmRcIixcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBHYW1lKHBsYXllck9uZSwgcGxheWVyVHdvLCBtb2RlKSB7XG4gIGNvbnN0IGdhbWUgPSB7XG4gICAgbW9kZSxcblxuICAgIHBsYXllcnM6IFtwbGF5ZXJPbmUsIHBsYXllclR3b10sXG4gICAgY3VycmVudFBsYXllckluZGV4OiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKSxcblxuICAgIGlzSW5Qcm9ncmVzczogZmFsc2UsXG4gICAgaXNHYW1lT3ZlcjogZmFsc2UsXG4gICAgaXNQbGF5ZXJXYWl0aW5nOiBmYWxzZSxcblxuICAgIGJvYXJkczogW10sXG5cbiAgICBzdGFydDogYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5pc0luUHJvZ3Jlc3MgPSB0cnVlO1xuICAgICAgdGhpcy5pc0dhbWVPdmVyID0gZmFsc2U7XG4gICAgICB0aGlzLmlzUGxheWVyV2FpdGluZyA9IGZhbHNlO1xuXG4gICAgICB0aGlzLmJvYXJkc1swXS5jbGVhcigpO1xuXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0YXJ0XCIpLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlc2V0XCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJvYXJkLWluZm9cIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVscC1pbmZvXCIpLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmF0dGFjay1pbmZvXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jvb3RcIikuY2xhc3NMaXN0LmFkZChcImluLXByb2dyZXNzXCIpO1xuXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmJvYXJkLWNvbnRyb2xzXCIpLmZvckVhY2goKGJvYXJkQ29udHJvbHMpID0+IHtcbiAgICAgICAgYm9hcmRDb250cm9scy5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgfSk7XG5cbiAgICAgIGF3YWl0IHRoaXMucGxheSgpO1xuICAgIH0sXG5cbiAgICByZXNldDogZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgZ2FtZU92ZXJTY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWUtb3Zlci1zY3JlZW5cIik7XG4gICAgICBpZiAoZ2FtZU92ZXJTY3JlZW4pIGdhbWVPdmVyU2NyZWVuLnJlbW92ZSgpO1xuXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0YXJ0XCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlc2V0XCIpLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJvYXJkLWluZm9cIikuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVscC1pbmZvXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmF0dGFjay1pbmZvXCIpLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jvb3RcIikuY2xhc3NMaXN0LnJlbW92ZShcImluLXByb2dyZXNzXCIpO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb290XCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJhdHRhY2stYWxsb3dlZFwiKTtcblxuICAgICAgdGhpcy5pc0luUHJvZ3Jlc3MgPSBmYWxzZTtcbiAgICAgIHRoaXMuaXNHYW1lT3ZlciA9IHRydWU7XG4gICAgICB0aGlzLmlzUGxheWVyV2FpdGluZyA9IGZhbHNlO1xuXG4gICAgICB0aGlzLnBsYXllcnNbMF0uYm9hcmQucmVzZXQoKTtcbiAgICAgIHRoaXMucGxheWVyc1sxXS5ib2FyZC5yZXNldCgpO1xuXG4gICAgICB0aGlzLmJvYXJkcyA9IHNldHVwR2FtZUJvYXJkcyh0aGlzLCB0aGlzLnBsYXllcnNbMF0sIHRoaXMucGxheWVyc1sxXSk7XG5cbiAgICAgIHRoaXMuYm9hcmRzWzBdLnJhbmRvbWl6ZUZvcm1hdGlvbigpO1xuICAgICAgdGhpcy5ib2FyZHNbMV0ucmFuZG9taXplRm9ybWF0aW9uKCk7XG5cbiAgICAgIGNvbnN0IGJvYXJkc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYm9hcmRzXCIpO1xuICAgICAgQXJyYXkuZnJvbShib2FyZHNDb250YWluZXIuY2hpbGRyZW4pLmZvckVhY2goKGJvYXJkKSA9PiB7XG4gICAgICAgIGJvYXJkc0NvbnRhaW5lci5yZW1vdmVDaGlsZChib2FyZCk7XG4gICAgICB9KTtcbiAgICAgIGJvYXJkc0NvbnRhaW5lci5hcHBlbmQoXG4gICAgICAgIHRoaXMuYm9hcmRzWzBdLmNvbXBvbmVudCxcbiAgICAgICAgdGhpcy5ib2FyZHNbMV0uY29tcG9uZW50LFxuICAgICAgKTtcbiAgICB9LFxuXG4gICAgcGxheTogYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IGN1cnJlbnRQbGF5ZXIgPSB0aGlzLnBsYXllcnNbdGhpcy5jdXJyZW50UGxheWVySW5kZXhdO1xuICAgICAgbGV0IG5leHRQbGF5ZXJJbmRleCA9ICh0aGlzLmN1cnJlbnRQbGF5ZXJJbmRleCArIDEpICUgMjtcbiAgICAgIGxldCBuZXh0UGxheWVyID0gdGhpcy5wbGF5ZXJzW25leHRQbGF5ZXJJbmRleF07XG5cbiAgICAgIHdoaWxlICghdGhpcy5pc0dhbWVPdmVyKSB7XG4gICAgICAgIGlmIChjdXJyZW50UGxheWVyLmJvYXJkLmlzRmxlZXREZXN0cm95ZWQoKSkge1xuICAgICAgICAgIHRoaXMuaXNHYW1lT3ZlciA9IHRydWU7XG5cbiAgICAgICAgICB0aGlzLmJvYXJkc1sodGhpcy5jdXJyZW50UGxheWVySW5kZXggKyAxKSAlIDJdLmNvbXBvbmVudC5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgIGNyZWF0ZUdhbWVPdmVyU2NyZWVuKGN1cnJlbnRQbGF5ZXIsIG5leHRQbGF5ZXIsIHRoaXMpLFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJvYXJkLWluZm9cIikuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzUGxheWVyV2FpdGluZykge1xuICAgICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDEwMCkpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcm9vdFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiYXR0YWNrLWFsbG93ZWRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBjdXJyZW50UGxheWVyID0gdGhpcy5wbGF5ZXJzW3RoaXMuY3VycmVudFBsYXllckluZGV4XTtcbiAgICAgICAgbmV4dFBsYXllckluZGV4ID0gKHRoaXMuY3VycmVudFBsYXllckluZGV4ICsgMSkgJSAyO1xuICAgICAgICBuZXh0UGxheWVyID0gdGhpcy5wbGF5ZXJzW25leHRQbGF5ZXJJbmRleF07XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBgLmJvYXJkLSR7dGhpcy5jdXJyZW50UGxheWVySW5kZXggPT09IDAgPyBcInR3b1wiIDogXCJvbmVcIn0taW5mb2AsXG4gICAgICAgICkudGV4dENvbnRlbnQgPVxuICAgICAgICAgIGAke25leHRQbGF5ZXIudHlwZSA9PT0gUGxheWVyVHlwZS5DT01QVVRFUiA/IFwiWW91clwiIDogY3VycmVudFBsYXllci5uYW1lICsgXCInc1wifSB0dXJuYDtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBgLmJvYXJkLSR7dGhpcy5jdXJyZW50UGxheWVySW5kZXggPT09IDAgPyBcIm9uZVwiIDogXCJ0d29cIn0taW5mb2AsXG4gICAgICAgICkudGV4dENvbnRlbnQgPSBcIlwiO1xuXG4gICAgICAgIHRoaXMuYm9hcmRzW3RoaXMuY3VycmVudFBsYXllckluZGV4XS5jb21wb25lbnQuY2xhc3NMaXN0LnJlbW92ZShcbiAgICAgICAgICBcImFjdGl2ZVwiLFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmJvYXJkc1t0aGlzLmN1cnJlbnRQbGF5ZXJJbmRleF0uY29tcG9uZW50LmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICAgXCJhdHRhY2tpbmdcIixcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmJvYXJkc1tuZXh0UGxheWVySW5kZXhdLmNvbXBvbmVudC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgICAgICB0aGlzLmJvYXJkc1tuZXh0UGxheWVySW5kZXhdLmNvbXBvbmVudC5jbGFzc0xpc3QucmVtb3ZlKFwiYXR0YWNraW5nXCIpO1xuXG4gICAgICAgIHRoaXMuYm9hcmRzW3RoaXMuY3VycmVudFBsYXllckluZGV4XS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ib2FyZHNbbmV4dFBsYXllckluZGV4XS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgIGlmIChjdXJyZW50UGxheWVyLnR5cGUgPT09IFBsYXllclR5cGUuQ09NUFVURVIgJiYgIXRoaXMuaXNHYW1lT3Zlcikge1xuICAgICAgICAgIGF3YWl0IHRoaXMuYm9hcmRzW25leHRQbGF5ZXJJbmRleF0uY29tcHV0ZXJBdHRhY2soXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQbGF5ZXJJbmRleCxcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuaXNQbGF5ZXJXYWl0aW5nID0gdHJ1ZTtcblxuICAgICAgICAgIGlmIChuZXh0UGxheWVyLnR5cGUgIT09IFBsYXllclR5cGUuQ09NUFVURVIpIHtcbiAgICAgICAgICAgIHRoaXMuYm9hcmRzW25leHRQbGF5ZXJJbmRleF0uY29tcG9uZW50LmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgICBjcmVhdGVQYXNzaW5nU2NyZWVuKHRoaXMucGxheWVycywgdGhpcy5jdXJyZW50UGxheWVySW5kZXgpLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuYm9hcmRzW25leHRQbGF5ZXJJbmRleF0ucmVuZGVyKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb290XCIpLmNsYXNzTGlzdC5hZGQoXCJhdHRhY2stYWxsb3dlZFwiKTtcblxuICAgICAgICAgIGlmIChuZXh0UGxheWVyLnR5cGUgIT09IFBsYXllclR5cGUuQ09NUFVURVIpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcm9vdFwiKS5jbGFzc0xpc3QuYWRkKFwicGFzc2luZ1wiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmN1cnJlbnRQbGF5ZXJJbmRleCA9IG5leHRQbGF5ZXJJbmRleDtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdXBkYXRlQXR0YWNrSW5mbzogZnVuY3Rpb24gKGF0dGFja1R5cGUsIHNoaXAsIGF0dGFja2VySW5kZXgpIHtcbiAgICAgIGNvbnN0IGF0dGFja0luZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmF0dGFjay1pbmZvXCIpO1xuICAgICAgY29uc3QgYXR0YWNrZXIgPSB0aGlzLnBsYXllcnNbYXR0YWNrZXJJbmRleF0ubmFtZTtcbiAgICAgIGNvbnN0IHJlY2VpdmVyID0gdGhpcy5wbGF5ZXJzWyhhdHRhY2tlckluZGV4ICsgMSkgJSAyXS5uYW1lO1xuXG4gICAgICBzd2l0Y2ggKGF0dGFja1R5cGUpIHtcbiAgICAgICAgY2FzZSBDZWxsU3RhdGUuTUlTUzpcbiAgICAgICAgICBhdHRhY2tJbmZvLnRleHRDb250ZW50ID0gYCR7YXR0YWNrZXJ9IG1pc3NlcyB0aGVpciBzaG90YDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBDZWxsU3RhdGUuSElUOlxuICAgICAgICAgIGF0dGFja0luZm8udGV4dENvbnRlbnQgPSBgJHthdHRhY2tlcn0gaGl0cyBvbmUgb2YgJHtyZWNlaXZlcn0ncyBzaGlwc2A7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgQ2VsbFN0YXRlLlNVTks6XG4gICAgICAgICAgYXR0YWNrSW5mby50ZXh0Q29udGVudCA9IGAke2F0dGFja2VyfSBzaW5rcyAke3JlY2VpdmVyfSdzICR7c2hpcC50eXBlfWA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSxcbiAgfTtcblxuICBnYW1lLmJvYXJkcyA9IHNldHVwR2FtZUJvYXJkcyhnYW1lLCBwbGF5ZXJPbmUsIHBsYXllclR3byk7XG5cbiAgcmV0dXJuIGdhbWU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUdhbWVPdmVyU2NyZWVuKGN1cnJlbnRQbGF5ZXIsIG5leHRQbGF5ZXIsIGdhbWUpIHtcbiAgY29uc3QgZ2FtZU92ZXJTY3JlZW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBnYW1lT3ZlclNjcmVlbi5jbGFzc0xpc3QuYWRkKFwiZ2FtZS1vdmVyLXNjcmVlblwiKTtcblxuICBsZXQgZ2FtZU92ZXJNZXNzYWdlO1xuICBpZiAoY3VycmVudFBsYXllci50eXBlID09PSBQbGF5ZXJUeXBlLkNPTVBVVEVSKSB7XG4gICAgZ2FtZU92ZXJNZXNzYWdlID0gXCJZT1UgV09OIFRIRSBHQU1FIVwiO1xuICB9IGVsc2UgaWYgKG5leHRQbGF5ZXIudHlwZSA9PT0gUGxheWVyVHlwZS5DT01QVVRFUikge1xuICAgIGdhbWVPdmVyTWVzc2FnZSA9IFwiWU9VIExPU1QgVEhFIEdBTUUhXCI7XG4gIH0gZWxzZSB7XG4gICAgZ2FtZU92ZXJNZXNzYWdlID0gYCR7bmV4dFBsYXllci5uYW1lLnRvVXBwZXJDYXNlKCl9IFdPTiBUSEUgR0FNRSFgO1xuICB9XG5cbiAgZ2FtZU92ZXJTY3JlZW4uaW5uZXJIVE1MID0gYDxwPiR7Z2FtZU92ZXJNZXNzYWdlfTwvcD5gO1xuXG4gIGNvbnN0IG91dGVyUmVzZXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlc2V0XCIpO1xuICBpZiAob3V0ZXJSZXNldEJ1dHRvbikgb3V0ZXJSZXNldEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuXG4gIGNvbnN0IHJlc2V0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgcmVzZXRCdXR0b24uY2xhc3NMaXN0LmFkZChcInJlc2V0XCIpO1xuICByZXNldEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiUGxheSBBZ2FpblwiO1xuICByZXNldEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gZ2FtZS5yZXNldCgpKTtcbiAgZ2FtZU92ZXJTY3JlZW4uYXBwZW5kQ2hpbGQocmVzZXRCdXR0b24pO1xuXG4gIGNvbnN0IHBhc3NpbmdTY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhc3Npbmctc2NyZWVuXCIpO1xuICBpZiAocGFzc2luZ1NjcmVlbikgcGFzc2luZ1NjcmVlbi5yZW1vdmUoKTtcblxuICByZXR1cm4gZ2FtZU92ZXJTY3JlZW47XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVBhc3NpbmdTY3JlZW4ocGxheWVycywgY3VycmVudFBsYXllcikge1xuICBjb25zdCBwYXNzaW5nU2NyZWVuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgcGFzc2luZ1NjcmVlbi5jbGFzc0xpc3QuYWRkKFwicGFzc2luZy1zY3JlZW5cIik7XG4gIHBhc3NpbmdTY3JlZW4uaW5uZXJIVE1MID0gYFxuICAgIDxwPlBhc3MgdGhlIGRldmljZSB0byAke3BsYXllcnNbY3VycmVudFBsYXllcl0ubmFtZX08L3A+XG4gIGA7XG4gIGNvbnN0IGNvbnRpbnVlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgY29udGludWVCdXR0b24udGV4dENvbnRlbnQgPSBcIkNvbnRpbnVlXCI7XG4gIGNvbnRpbnVlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgcGFzc2luZ1NjcmVlbi5yZW1vdmUoKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhc3NpbmdcIikuY2xhc3NMaXN0LnJlbW92ZShcInBhc3NpbmdcIik7XG4gIH0pO1xuICBwYXNzaW5nU2NyZWVuLmFwcGVuZENoaWxkKGNvbnRpbnVlQnV0dG9uKTtcbiAgcmV0dXJuIHBhc3NpbmdTY3JlZW47XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gY3JlYXRlR2FtZVBhZ2UoZ2FtZSkge1xuICBjb25zdCBnYW1lUGFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGdhbWVQYWdlLmNsYXNzTGlzdC5hZGQoXCJnYW1lLXBhZ2VcIiwgXCJwYWdlXCIpO1xuXG4gIGdhbWVQYWdlLmlubmVySFRNTCA9IGBcbiAgICA8ZGl2IGNsYXNzPVwiYm9hcmRzXCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImluZm9cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJib2FyZC1pbmZvIGhpZGRlblwiPlxuICAgICAgICA8cCBjbGFzcz1cImJvYXJkLW9uZS1pbmZvXCI+PC9wPlxuICAgICAgICA8cCBjbGFzcz1cImJvYXJkLXR3by1pbmZvXCI+PC9wPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiZ2FtZS1pbmZvXCI+XG4gICAgICAgIDxwIGNsYXNzPVwiaGVscC1pbmZvXCI+4pOYIFJlYXJyYW5nZSB0aGUgc2hpcHMgdG8geW91ciBsaWtpbmcgYnkgcHJlc3NpbmcgdGhlIGVkaXQgYnV0dG9uLCBvciBieSByZWZyZXNoaW5nIHRoZSBib2FyZDwvcD5cbiAgICAgICAgPHAgY2xhc3M9XCJhdHRhY2staW5mbyBoaWRkZW5cIj48L3A+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY29udHJvbHNcIj5cbiAgICAgIDxidXR0b24gY2xhc3M9XCJzdGFydFwiPlN0YXJ0IEdhbWU8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gY2xhc3M9XCJyZXNldCBoaWRkZW5cIj5SZXNldCBHYW1lPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIGA7XG5cbiAgY29uc3QgYm9hcmRzQ29udGFpbmVyID0gZ2FtZVBhZ2UucXVlcnlTZWxlY3RvcihcIi5ib2FyZHNcIik7XG4gIGJvYXJkc0NvbnRhaW5lci5hcHBlbmQoZ2FtZS5ib2FyZHNbMF0uY29tcG9uZW50LCBnYW1lLmJvYXJkc1sxXS5jb21wb25lbnQpO1xuXG4gIGNvbnN0IHN0YXJ0QnV0dG9uID0gZ2FtZVBhZ2UucXVlcnlTZWxlY3RvcihcIi5zdGFydFwiKTtcbiAgc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBpZiAoZ2FtZVBhZ2UucXVlcnlTZWxlY3RvcihcIi5lZGl0aW5nXCIpKSB7XG4gICAgICBhbGVydChcIlBsZWFzZSBzYXZlIHlvdXIgYm9hcmRzIGJlZm9yZSBzdGFydGluZyB0aGUgZ2FtZVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBnYW1lLnN0YXJ0KCk7XG4gIH0pO1xuXG4gIGNvbnN0IHJlc2V0QnV0dG9uID0gZ2FtZVBhZ2UucXVlcnlTZWxlY3RvcihcIi5yZXNldFwiKTtcbiAgcmVzZXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBnYW1lLnJlc2V0KCk7XG4gIH0pO1xuXG4gIGdhbWUuYm9hcmRzWzBdLnJlbmRlcigpO1xuICBnYW1lLmJvYXJkc1sxXS5yZW5kZXIoKTtcblxuICByZXR1cm4gZ2FtZVBhZ2U7XG59XG4iLCJpbXBvcnQgZWRpdFN2ZyBmcm9tIFwiLi4vLi4vLi4vYXNzZXRzL2VkaXQuc3ZnXCI7XG5pbXBvcnQgcmVmcmVzaFN2ZyBmcm9tIFwiLi4vLi4vLi4vYXNzZXRzL3JlZnJlc2gtY2N3LnN2Z1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSGVscFBhZ2UoKSB7XG4gIGNvbnN0IGhlbHBQYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgaGVscFBhZ2UuY2xhc3NMaXN0LmFkZChcImhlbHAtcGFnZVwiLCBcInBhZ2VcIik7XG5cbiAgaGVscFBhZ2UuaW5uZXJIVE1MID0gYFxuICAgIDxoMT5Ib3cgdG8gUGxheTwvaDE+XG4gICAgPHNlY3Rpb24+XG4gICAgICA8aDM+Q2hvb3NlIEdhbWUgTW9kZTwvaDM+XG4gICAgICA8ZGl2PlxuICAgICAgICA8cD5cbiAgICAgICAgICBCeSBkZWZhdWx0LCB5b3UnbGwgYmUgcGxheWluZyBhZ2FpbnN0IHRoZSBjb21wdXRlci5cbiAgICAgICAgICBJZiB5b3Ugd2FudCB0byBwbGF5IHdpdGggYSBmcmllbmQsIGNob29zZSB0aGUgXCJGcmllbmRcIiBvcHRpb24gaW4gdGhlIG9wcG9uZW50IHNlY3Rpb24sXG4gICAgICAgICAgYW5kIHBsYXkgYnkgcGFzc2luZyBhcm91bmQgeW91ciBkZXZpY2UuXG4gICAgICAgIDwvcD5cbiAgICAgIDwvZGl2PlxuICAgIDwvc2VjdGlvbj5cbiAgICA8c2VjdGlvbj5cbiAgICAgIDxoMz5FZGl0IHlvdXIgYm9hcmQocyk8L2gzPlxuICAgICAgPGRpdj5cbiAgICAgICAgPHVsPlxuICAgICAgICAgIDxsaT5DbGljayBvbiB0aGUgZWRpdCBidXR0b24gKDxpbWcgY2xhc3M9XCJlZGl0LWltZ1wiIC8+KSB0byBjaGFuZ2UgdGhlIG5hbWVzIG9mIHRoZSBwbGF5ZXJzLCBhbmQgbW92ZSBhcm91bmQgeW91ciBzaGlwcyAodXNpbmcgYXJyb3cga2V5cykuPC9saT5cbiAgICAgICAgICA8bGk+WW91IGNhbiBhbHNvIGNsaWNrIHRoZSByZWZyZXNoIGJ1dHRvbiAoPGltZyBjbGFzcz1cInJlZnJlc2gtaW1nXCIgLz4pIHRvIHJhbmRvbWl6ZSB0aGUgcGxhY2VtZW50IG9mIHNoaXBzIGluIHRoZSBib2FyZC48L2xpPlxuICAgICAgICA8L3VsPlxuICAgICAgPC9kaXY+XG4gICAgPC9zZWN0aW9uPlxuICAgIDxzZWN0aW9uPlxuICAgICAgPGgzPlN0YXJ0IHBsYXlpbmchPC9oMz5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxwPlxuICAgICAgICBQcmVzcyBvbiBcIjxiPlN0YXJ0IEdhbWU8L2I+XCIgdG8gc3RhcnQgcGxheWluZy5cbiAgICAgICAgSWYgeW91IGFyZSBub3QgZmFtaWxpYXIgd2l0aCA8YSBocmVmPVwiaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQmF0dGxlc2hpcF8oZ2FtZSlcIj5iYXR0bGVzaGlwPC9hPiwgaGVyZSdzIGEgcXVpY2sgcnVuLXRocm91Z2ggb2YgdGhlIG1lY2hhbmljczpcbiAgICAgICAgPC9wPlxuICAgICAgICA8dWw+XG4gICAgICAgICAgPGxpPkl0IGlzIGEgdHdvLXBsYXllciBnYW1lLCB3aXRoIGVhY2ggcGxheWVyIGhhdmluZyBhIGJvYXJkIHdpdGggc2hpcHMgYXJyYW5nZWQgb24gaXQgYWNjb3JkaW5nIHRvIHRoZWlyIHdpc2hlcy48L2xpPlxuICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgIFRoZXJlIGFyZSA1IHNoaXBzIG9mIHZhcnlpbmcgbGVuZ3RoczogXG4gICAgICAgICAgICA8dGFibGU+XG4gICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICA8dGg+U2hpcDwvdGg+XG4gICAgICAgICAgICAgICAgPHRoPlNpemU8L3RoPlxuICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRkPkNhcnJpZXI8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZD41PC90ZD5cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0ZD5CYXR0bGVzaGlwPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQ+NDwvdGQ+XG4gICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICA8dGQ+RGVzdHJveWVyPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQ+MzwvdGQ+XG4gICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICA8dGQ+U3VibWFyaW5lPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQ+MzwvdGQ+XG4gICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICA8dGQ+UGF0cm9sIEJvYXQ8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZD4yPC90ZD5cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgICA8bGk+XG4gICAgICAgICAgICBFYWNoIHBsYXllciB0YWtlcyB0dXJucyBzaG9vdGluZyBhIHNxdWFyZSBvbiB0aGUgb3RoZXIgcGxheWVyJ3MgYm9hcmQuXG4gICAgICAgICAgICBUaGV5IGhhdmUgbm8gaW5mb3JtYXRpb24gb24gd2hldGhlciB0aGVyZSBpcyBhIHNoaXAgb24gdGhhdCBzcXVhcmUgb3Igbm90LlxuICAgICAgICAgICAgQWZ0ZXIgZWFjaCB0cnksIHRoZXkgd2lsbCBiZSBpbmZvcm1lZCB3aGV0aGVyIHRoZXkgaGFkIGhpdCBhIHNoaXAgb3IgbWlzc2VkIHRoZWlyIHNob3QuXG4gICAgICAgICAgPC9saT5cbiAgICAgICAgICA8bGk+QWZ0ZXIgYWxsIHRoZSBzcXVhcmVzIG9mIGEgcGFydGljdWxhciBzaGlwIGlzIGhpdCwgaXQgd2lsbCBiZSBtYXJrZWQgKGFuZCBpbmZvcm1lZCB0byB0aGUgc2hvb3RpbmcgcGxheWVyKSBhcyBzdW5rLjwvbGk+XG4gICAgICAgICAgPGxpPkFmdGVyIGFsbCB0aGUgc2hpcHMgb2YgYSBwYXJ0aWN1bGFyIGJvYXJkIGlzIHN1bmssIHRoYXQgcGxheWVyIGxvc2VzIHRoZSBnYW1lLCBhbmQgdGhlIHNob290aW5nIHBsYXllciB3aW5zLjwvbGk+XG4gICAgICAgIDwvdWw+XG4gICAgICA8L2Rpdj5cbiAgICA8L3NlY3Rpb24+XG4gICAgPGgxIGNsYXNzPVwidGhhbmtzXCI+VGhhbmtzIGZvciBQbGF5aW5nITwvaDE+XG4gIGA7XG5cbiAgaGVscFBhZ2UucXVlcnlTZWxlY3RvcihcIi5lZGl0LWltZ1wiKS5zcmMgPSBlZGl0U3ZnO1xuICBoZWxwUGFnZS5xdWVyeVNlbGVjdG9yKFwiLnJlZnJlc2gtaW1nXCIpLnNyYyA9IHJlZnJlc2hTdmc7XG5cbiAgcmV0dXJuIGhlbHBQYWdlO1xufVxuIiwiaW1wb3J0IHsgY3JlYXRlUGxheWVyLCBQbGF5ZXJUeXBlIH0gZnJvbSBcIi4uLy4uL2NvcmUvcGxheWVyLmpzXCI7XG5pbXBvcnQgeyBHYW1lTW9kZSwgc2V0dXBHYW1lIH0gZnJvbSBcIi4uL2dhbWUuanNcIjtcbmltcG9ydCB7IGNyZWF0ZUdhbWVQYWdlIH0gZnJvbSBcIi4vZ2FtZS5qc1wiO1xuaW1wb3J0IHsgY3JlYXRlSGVscFBhZ2UgfSBmcm9tIFwiLi9oZWxwLmpzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVIb21lUGFnZSgpIHtcbiAgbGV0IGdhbWVNb2RlID0gR2FtZU1vZGUuQ09NUFVURVI7XG5cbiAgY29uc3QgaG9tZVBhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBob21lUGFnZS5jbGFzc0xpc3QuYWRkKFwiaG9tZS1wYWdlXCIsIFwicGFnZVwiKTtcblxuICBob21lUGFnZS5pbm5lckhUTUwgPSBgXG4gICAgPGRpdiBjbGFzcz1cIm9wcG9uZW50XCI+XG4gICAgICA8cD5PcHBvbmVudDogPC9wPlxuICAgICAgPGRpdiBjbGFzcz1cIm9wdGlvbnNcIj5cbiAgICAgICAgPHAgY2xhc3M9XCJvcHBvbmVudC1jb21wdXRlciBhY3RpdmUtbW9kZVwiPkNvbXB1dGVyPC9wPlxuICAgICAgICA8cCBjbGFzcz1cIm9wcG9uZW50LWZyaWVuZFwiPkZyaWVuZDwvcD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDwhLS0gPGEgY2xhc3M9XCJoZWxwLWxpbmtcIj5Ib3cgdG8gUGxheTwvYT4gLS0+XG4gICAgPGRpdiBjbGFzcz1cImNvbnRyb2xzXCI+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwicGxheVwiPlBsYXkgR2FtZTwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImhlbHBcIj5Ib3cgdG8gUGxheTwvYnV0dG9uPlxuICAgICAgPCEtLSA8YnV0dG9uIGNsYXNzPVwicmVzZXQgaGlkZGVuXCI+UmVzZXQgR2FtZTwvYnV0dG9uPiAtLT5cbiAgICA8L2Rpdj5cbiAgYDtcblxuICBjb25zdCBjb21wdXRlck9wcG9uZW50QnV0dG9uID0gaG9tZVBhZ2UucXVlcnlTZWxlY3RvcihcIi5vcHBvbmVudC1jb21wdXRlclwiKTtcbiAgY29tcHV0ZXJPcHBvbmVudEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGlmIChjb21wdXRlck9wcG9uZW50QnV0dG9uLmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZS1tb2RlXCIpKSByZXR1cm47XG5cbiAgICBjb21wdXRlck9wcG9uZW50QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmUtbW9kZVwiKTtcbiAgICBmcmllbmRPcHBvbmVudEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlLW1vZGVcIik7XG4gICAgZ2FtZU1vZGUgPSBHYW1lTW9kZS5DT01QVVRFUjtcbiAgfSk7XG5cbiAgY29uc3QgZnJpZW5kT3Bwb25lbnRCdXR0b24gPSBob21lUGFnZS5xdWVyeVNlbGVjdG9yKFwiLm9wcG9uZW50LWZyaWVuZFwiKTtcbiAgZnJpZW5kT3Bwb25lbnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBpZiAoZnJpZW5kT3Bwb25lbnRCdXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlLW1vZGVcIikpIHJldHVybjtcblxuICAgIGZyaWVuZE9wcG9uZW50QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmUtbW9kZVwiKTtcbiAgICBjb21wdXRlck9wcG9uZW50QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmUtbW9kZVwiKTtcbiAgICBnYW1lTW9kZSA9IEdhbWVNb2RlLkZSSUVORDtcbiAgfSk7XG5cbiAgY29uc3QgcGxheUJ1dHRvbiA9IGhvbWVQYWdlLnF1ZXJ5U2VsZWN0b3IoXCIucGxheVwiKTtcbiAgcGxheUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuICAgIGxldCBnYW1lO1xuICAgIGlmIChnYW1lTW9kZSA9PT0gR2FtZU1vZGUuQ09NUFVURVIpIHtcbiAgICAgIGdhbWUgPSBzZXR1cEdhbWUoXG4gICAgICAgIGNyZWF0ZVBsYXllcihcIlBsYXllclwiLCBQbGF5ZXJUeXBlLkhVTUFOLCAxMCksXG4gICAgICAgIGNyZWF0ZVBsYXllcihcIkNvbXB1dGVyXCIsIFBsYXllclR5cGUuQ09NUFVURVIsIDEwKSxcbiAgICAgICk7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jvb3RcIikuY2xhc3NMaXN0LmFkZChcInZzLWNvbXB1dGVyXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnYW1lID0gc2V0dXBHYW1lKFxuICAgICAgICBjcmVhdGVQbGF5ZXIoXCJQbGF5ZXIgMVwiLCBQbGF5ZXJUeXBlLkhVTUFOLCAxMCksXG4gICAgICAgIGNyZWF0ZVBsYXllcihcIlBsYXllciAyXCIsIFBsYXllclR5cGUuSFVNQU4sIDEwKSxcbiAgICAgICk7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jvb3RcIikuY2xhc3NMaXN0LmFkZChcInZzLWZyaWVuZFwiKTtcbiAgICB9XG5cbiAgICBob21lUGFnZS5wYXJlbnROb2RlLmFwcGVuZENoaWxkKGNyZWF0ZUdhbWVQYWdlKGdhbWUpKTtcbiAgICBob21lUGFnZS5yZW1vdmUoKTtcbiAgfSk7XG5cbiAgY29uc3QgaGVscEJ1dHRvbiA9IGhvbWVQYWdlLnF1ZXJ5U2VsZWN0b3IoXCIuaGVscFwiKTtcbiAgaGVscEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGhvbWVQYWdlLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoY3JlYXRlSGVscFBhZ2UoKSk7XG4gICAgaG9tZVBhZ2UucmVtb3ZlKCk7XG4gIH0pO1xuXG4gIHJldHVybiBob21lUGFnZTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAoIXNjcmlwdFVybCB8fCAhL15odHRwKHM/KTovLnRlc3Qoc2NyaXB0VXJsKSkpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpbXBvcnQgeyBjcmVhdGVIb21lUGFnZSB9IGZyb20gXCIuL2RvbS9wYWdlcy9ob21lLmpzXCI7XG5cbmltcG9ydCBiYWNrU3ZnIGZyb20gXCIuLi9hc3NldHMvY2hldnJvbi1sZWZ0LnN2Z1wiO1xuaW1wb3J0IGxvZ28gZnJvbSBcIi4uL2Fzc2V0cy9mYXZpY29uLmljb1wiO1xuaW1wb3J0IFwiLi9zdHlsZXMvaW5kZXguY3NzXCI7XG5cbmNvbnNvbGUubG9nKFwiR2V0IFJlYWR5IGZvciBCYXR0bGUhXCIpO1xuXG5jb25zdCByb290ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpO1xucm9vdC5pbm5lckhUTUwgPSBgXG4gIDxoZWFkZXI+XG4gICAgPGJ1dHRvbiBjbGFzcz1cImJhY2stYnV0dG9uXCI+PC9idXR0b24+XG4gICAgPGltZyBjbGFzcz1cImxvZ29cIiBhbHQ9XCJMb2dvXCIgLz48aDE+QkFUVExFU0hJUDwvaDE+XG4gIDwvaGVhZGVyPlxuYDtcblxucm9vdC5xdWVyeVNlbGVjdG9yKFwiLmxvZ29cIikuc3JjID0gbG9nbztcblxucm9vdC5hcHBlbmRDaGlsZChjcmVhdGVIb21lUGFnZSgpKTtcblxuY29uc3QgYmFja0J1dHRvbiA9IHJvb3QucXVlcnlTZWxlY3RvcihcIi5iYWNrLWJ1dHRvblwiKTtcbmNvbnN0IGJhY2tJY29uID0gbmV3IEltYWdlKCk7XG5iYWNrSWNvbi5zcmMgPSBiYWNrU3ZnO1xuYmFja0J1dHRvbi5hcHBlbmRDaGlsZChiYWNrSWNvbik7XG5iYWNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGNvbnN0IGN1cnJlbnRQYWdlID0gcm9vdC5xdWVyeVNlbGVjdG9yKFwiLnBhZ2VcIik7XG4gIGNvbnN0IG5ld1BhZ2UgPSBjcmVhdGVIb21lUGFnZSgpO1xuXG4gIGlmIChuZXdQYWdlLmNsYXNzTGlzdFswXSA9PSBjdXJyZW50UGFnZS5jbGFzc0xpc3RbMF0pIHtcbiAgICByZXR1cm47XG4gIH1cblxuICByb290LmNsYXNzTmFtZSA9IFwiXCI7XG5cbiAgcm9vdC5hcHBlbmRDaGlsZChuZXdQYWdlKTtcbiAgY3VycmVudFBhZ2UucmVtb3ZlKCk7XG59KTtcbiJdLCJuYW1lcyI6WyJjcmVhdGVTaGlwIiwiU2hpcE9yaWVudGF0aW9uIiwiQ2VsbFN0YXRlIiwiT2JqZWN0IiwiZnJlZXplIiwiRU1QVFkiLCJNSVNTIiwiU0hJUCIsIkhJVCIsIlNVTksiLCJjcmVhdGVHYW1lQm9hcmQiLCJzaXplIiwiRXJyb3IiLCJjZWxscyIsIkFycmF5IiwiZnJvbSIsImxlbmd0aCIsInNoaXBzIiwicmVzZXQiLCJwbGFjZVNoaXAiLCJzaGlwIiwiY29vcmRpbmF0ZXMiLCJvcmllbnRhdGlvbiIsIkhPUklaT05UQUwiLCJWRVJUSUNBTCIsImkiLCJwdXNoIiwibW92ZVNoaXAiLCJzaGlwSW5kZXgiLCJ0eXBlIiwicG9wIiwicm90YXRlU2hpcCIsIm5ld09yaWVudGF0aW9uIiwiZ2V0U2hpcEluZGV4IiwiaiIsInJlY2VpdmVBdHRhY2siLCJyZXN1bHQiLCJ1bmRlZmluZWQiLCJoaXQiLCJpc1N1bmsiLCJpc0ZsZWV0RGVzdHJveWVkIiwiUGxheWVyVHlwZSIsIkhVTUFOIiwiQ09NUFVURVIiLCJjcmVhdGVQbGF5ZXIiLCJuYW1lIiwiYm9hcmRTaXplIiwiYm9hcmQiLCJTaGlwVHlwZSIsIkNBUlJJRVIiLCJCQVRUTEVTSElQIiwiREVTVFJPWUVSIiwiU1VCTUFSSU5FIiwiUEFUUk9MIiwiZ2V0U2hpcExlbmd0aCIsImFyZ3VtZW50cyIsImhpdHMiLCJyZWZyZXNoU3ZnIiwiZWRpdFN2ZyIsInNhdmVTdmciLCJjYXJyaWVyU3ZnIiwiYmF0dGxlc2hpcFN2ZyIsImRlc3Ryb3llclN2ZyIsInN1Ym1hcmluZVN2ZyIsInBhdHJvbFN2ZyIsInNldHVwR2FtZUJvYXJkcyIsImdhbWUiLCJwbGF5ZXJPbmUiLCJwbGF5ZXJUd28iLCJib2FyZE9uZSIsImNyZWF0ZUJvYXJkQ29tcG9uZW50IiwicmFuZG9taXplRm9ybWF0aW9uIiwiY29tcG9uZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwicmVuZGVyU2hpcHMiLCJhZGRFdmVudExpc3RlbmVyIiwiY2xlYXIiLCJib2FyZFR3byIsImZvckVhY2giLCJET01Cb2FyZCIsImJvYXJkSW5kZXgiLCJtb3ZpbmdTaGlwSW5kZXgiLCJyZWxhdGl2ZURyYWdnaW5nQ2VsbCIsImNoaWxkcmVuIiwicm93IiwiY2VsbCIsImlzQXR0YWNrYWJsZSIsImFjdGl2ZSIsImlzSW5Qcm9ncmVzcyIsImlzR2FtZU92ZXIiLCJpc1BsYXllcldhaXRpbmciLCJhdHRhY2siLCJ1cGRhdGVBdHRhY2tJbmZvIiwiZXZlbnQiLCJlZGl0aW5nIiwiaXNNdXRhYmxlIiwiY29udGFpbnMiLCJ0b2dnbGVTaGlwTW90aW9uIiwicmVuZGVyIiwicHJldmVudERlZmF1bHQiLCJidXR0b24iLCJzaGlwQ29vcmRpbmF0ZXMiLCJ0YXJnZXQiLCJjZWxsSW5kZXgiLCJnZXRDZWxsSW5kZXgiLCJuZXdDb29yZGluYXRlcyIsInNoaXBJbWFnZSIsInF1ZXJ5U2VsZWN0b3IiLCJuZXdDZWxsIiwic3R5bGUiLCJsZWZ0Iiwib2Zmc2V0TGVmdCIsInRvcCIsIm9mZnNldFRvcCIsImRvY3VtZW50IiwicGFyZW50Tm9kZSIsIm1vdmluZ1NoaXAiLCJtb3ZpbmdDZWxsIiwia2V5IiwicGxheWVyIiwiYXR0YWNrYWJsZSIsIm11dGFibGUiLCJib2FyZENvbXBvbmVudCIsImNyZWF0ZUVsZW1lbnQiLCJib2FyZEhlYWRlciIsImlubmVySFRNTCIsImFwcGVuZENoaWxkIiwicmFuZG9taXplQnV0dG9uIiwiZWRpdEJ1dHRvbiIsInNhdmVCdXR0b24iLCJ0aXRsZSIsInJlZnJlc2hJY29uIiwiSW1hZ2UiLCJzcmMiLCJlZGl0SWNvbiIsInNhdmVJY29uIiwiYm9hcmRDb250cm9scyIsImJvYXJkQ2VsbHMiLCJyb3dDb21wb25lbnQiLCJjZWxsQ29tcG9uZW50IiwiZ2V0Q2VsbENsYXNzTmFtZSIsInNoaXBzQ29udGFpbmVyIiwibW92aW5nQ2VsbHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwicmVtb3ZlIiwiY2xhc3NOYW1lIiwiaXNNb3ZpbmciLCJyZW1vdmVDaGlsZCIsIndpbmRvd1dpZHRoIiwiZG9jdW1lbnRFbGVtZW50IiwiY2xpZW50V2lkdGgiLCJ3aW5kb3dIZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJpc1ZlcnRpY2FsU2NyZWVuIiwiY2VsbFNpemUiLCJncmlkR2FwIiwiY29uc29sZSIsImxvZyIsIngiLCJ5IiwiYWx0IiwidHJhbnNmb3JtT3JpZ2luIiwidHJhbnNmb3JtIiwia2V5cyIsInNoaXBMZW5ndGgiLCJwbGFjZWQiLCJNYXRoIiwicmFuZG9tIiwiZmxvb3IiLCJ0b2dnbGUiLCJtb3ZpbmdTaGlwQ2VsbCIsIm1vdmluZ1NoaXBDb29yZGluYXRlcyIsIm1vdmVTdWNjZXNzZnVsIiwibW92ZWRTaGlwIiwiY29tcHV0ZXJBdHRhY2siLCJhdHRhY2tlckluZGV4IiwidmFsaWQiLCJQcm9taXNlIiwiciIsInNldFRpbWVvdXQiLCJzYXZlRWRpdHMiLCJyZXBvcnRWYWxpZGl0eSIsImFsZXJ0IiwidmFsdWUiLCJ0ZXh0Q29udGVudCIsInByb3RvdHlwZSIsImluZGV4T2YiLCJjYWxsIiwic2VjcmV0IiwiR2FtZU1vZGUiLCJGUklFTkQiLCJzZXR1cEdhbWUiLCJtb2RlIiwicGxheWVycyIsImN1cnJlbnRQbGF5ZXJJbmRleCIsImJvYXJkcyIsInN0YXJ0IiwicGxheSIsImdhbWVPdmVyU2NyZWVuIiwiYm9hcmRzQ29udGFpbmVyIiwiYXBwZW5kIiwiY3VycmVudFBsYXllciIsIm5leHRQbGF5ZXJJbmRleCIsIm5leHRQbGF5ZXIiLCJjcmVhdGVHYW1lT3ZlclNjcmVlbiIsInJlc29sdmUiLCJjcmVhdGVQYXNzaW5nU2NyZWVuIiwiYXR0YWNrVHlwZSIsImF0dGFja0luZm8iLCJhdHRhY2tlciIsInJlY2VpdmVyIiwiZ2FtZU92ZXJNZXNzYWdlIiwidG9VcHBlckNhc2UiLCJvdXRlclJlc2V0QnV0dG9uIiwicmVzZXRCdXR0b24iLCJwYXNzaW5nU2NyZWVuIiwiY29udGludWVCdXR0b24iLCJjcmVhdGVHYW1lUGFnZSIsImdhbWVQYWdlIiwic3RhcnRCdXR0b24iLCJjcmVhdGVIZWxwUGFnZSIsImhlbHBQYWdlIiwiY3JlYXRlSG9tZVBhZ2UiLCJnYW1lTW9kZSIsImhvbWVQYWdlIiwiY29tcHV0ZXJPcHBvbmVudEJ1dHRvbiIsImZyaWVuZE9wcG9uZW50QnV0dG9uIiwicGxheUJ1dHRvbiIsImhlbHBCdXR0b24iLCJiYWNrU3ZnIiwibG9nbyIsInJvb3QiLCJnZXRFbGVtZW50QnlJZCIsImJhY2tCdXR0b24iLCJiYWNrSWNvbiIsImN1cnJlbnRQYWdlIiwibmV3UGFnZSJdLCJzb3VyY2VSb290IjoiIn0=