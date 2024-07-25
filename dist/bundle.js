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
      return -1;
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
/* harmony export */   getCellIndex: function() { return /* binding */ getCellIndex; },
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
        function handleAttackEvent() {
          if (!DOMBoard.isAttackable() || !DOMBoard.active || !game.isInProgress || game.isGameOver || !game.isPlayerWaiting) {
            return;
          }
          const attack = DOMBoard.receiveAttack([j, i]);
          if (attack) {
            game.updateAttackInfo(attack.result, attack.ship, (boardIndex + 1) % 2);
            game.isPlayerWaiting = false;
          }
        }
        function handleShipRotate(event) {
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
        }
        function handleShipMoveStart() {
          if (!DOMBoard.editing) return;
          const shipIndex = DOMBoard.board.getShipIndex([j, i]);
          if (shipIndex === -1) return;
          movingShipIndex = shipIndex;
          const shipCoordinates = DOMBoard.board.ships[movingShipIndex].coordinates;
          relativeDraggingCell = [j - shipCoordinates[0], i - shipCoordinates[1]];
          DOMBoard.toggleShipMotion([j, i]);
        }
        cell.addEventListener("click", handleAttackEvent);
        cell.addEventListener("touchstart", handleAttackEvent);
        cell.addEventListener("contextmenu", handleShipRotate);
        cell.addEventListener("mousedown", event => {
          if (event.button === 2) return;
          handleShipMoveStart();
        });
        cell.addEventListener("touchstart", handleShipMoveStart);
      });
    });
    function handleShipMoving(event) {
      let target;
      if (event.touches && event.touches.length > 0) {
        target = document.elementFromPoint(event.touches[0].clientX, event.touches[0].clientY);
        event.preventDefault();
      } else {
        target = event.target;
      }
      if (!DOMBoard.editing) return;
      if (!target.classList.contains("cell")) return;
      if (movingShipIndex === null) return;
      DOMBoard.clear();
      const cellIndex = getCellIndex(target);
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
    }
    function handleShipPlace() {
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
  const windowWidth = document.documentElement.clientWidth;
  const windowHeight = document.documentElement.clientHeight;
  const isVerticalScreen = windowHeight > windowWidth;
  const cellSize = (isVerticalScreen ? 5 : 4) / 100 * (isVerticalScreen ? windowWidth : windowHeight);
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
      const gridGap = this.cellSize / 10;
      this.board.ships.forEach((ship, i) => {
        if (!this.component.classList.contains("editing") && !this.component.classList.contains("only-human") && (!this.component.classList.contains("attacking") || this.component.classList.contains("active")) && !ship.isSunk()) {
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
        shipImage.style.width = `${4.75 * (this.cellSize + gridGap)}px`;
        shipImage.style.height = `auto`;
        if (ship.orientation === _core_ship_js__WEBPACK_IMPORTED_MODULE_2__.ShipOrientation.VERTICAL) {
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
const computerAttackMode = Object.freeze({
  RANDOM: 0,
  ADJACENT: 1,
  DIRECTED: 2
});
const adjacentCoordinates = [[0, -1], [-1, 0], [0, 1], [1, 0]];
function setupGame(playerOne, playerTwo, mode) {
  let hitInfo = {
    attackMode: computerAttackMode.RANDOM,
    firstHit: null,
    lastHit: null,
    direction: null,
    adjacentTries: 0,
    reset: function () {
      this.attackMode = computerAttackMode.RANDOM;
      this.firstHit = null;
      this.latestHit = null;
      this.direction = null;
      this.adjacentTries = 0;
    },
    incrementAdjacentTries: function () {
      this.adjacentTries++;
    }
  };
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
          await this.computerAttack(this.currentPlayerIndex, nextPlayerIndex);
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
    computerAttack: async function (attacker, receiver) {
      const DOMBoard = this.boards[receiver];
      let x, y;
      let valid = false;
      let iterations = 0;
      while (!valid) {
        if (hitInfo.attackMode === computerAttackMode.RANDOM) {
          hitInfo.reset();
          const hitSquares = DOMBoard.component.querySelectorAll(".cell.hit");
          if (hitSquares.length > 0) {
            const lastHitSquare = hitSquares[hitSquares.length - 1];
            hitInfo.firstHit = (0,_boards_js__WEBPACK_IMPORTED_MODULE_2__.getCellIndex)(lastHitSquare);
            hitInfo.attackMode = computerAttackMode.ADJACENT;
            iterations++;
            continue;
          }
          x = Math.floor(Math.random() * DOMBoard.board.size);
          y = Math.floor(Math.random() * DOMBoard.board.size);
        } else if (hitInfo.attackMode === computerAttackMode.ADJACENT) {
          if (hitInfo.adjacentTries >= 4) {
            hitInfo.reset();
            iterations++;
            continue;
          }
          x = hitInfo.firstHit[0] + adjacentCoordinates[hitInfo.adjacentTries][0];
          y = hitInfo.firstHit[1] + adjacentCoordinates[hitInfo.adjacentTries][1];
        } else if (hitInfo.attackMode === computerAttackMode.DIRECTED) {
          x = hitInfo.lastHit[0] + hitInfo.direction[0];
          y = hitInfo.lastHit[1] + hitInfo.direction[1];
        }
        if (x < 0 || y < 0 || x >= DOMBoard.board.size || y >= DOMBoard.board.size) {
          if (hitInfo.attackMode === computerAttackMode.ADJACENT) {
            hitInfo.incrementAdjacentTries();
          } else if (hitInfo.attackMode === computerAttackMode.DIRECTED) {
            hitInfo.lastHit = null;
            hitInfo.direction = null;
            hitInfo.adjacentTries = 0;
            hitInfo.attackMode = computerAttackMode.ADJACENT;
          }
          iterations++;
          continue;
        }
        const cell = DOMBoard.component.children[1].children[y].children[x];
        if (cell.classList.contains("miss") || cell.classList.contains("sunk")) {
          switch (hitInfo.attackMode) {
            case computerAttackMode.ADJACENT:
              hitInfo.incrementAdjacentTries();
              break;
            case computerAttackMode.DIRECTED:
              hitInfo.lastHit = null;
              hitInfo.direction = null;
              hitInfo.adjacentTries = 0;
              hitInfo.attackMode = computerAttackMode.ADJACENT;
              break;
          }
        } else if (cell.classList.contains("hit")) {
          switch (hitInfo.attackMode) {
            case computerAttackMode.RANDOM:
              hitInfo.reset();
              hitInfo.firstHit = [x, y];
              hitInfo.attackMode = computerAttackMode.ADJACENT;
              break;
            case computerAttackMode.ADJACENT:
              hitInfo.incrementAdjacentTries();
              break;
          }
        } else {
          break;
        }
        iterations++;
        if (iterations > 250) {
          throw new Error(`Infinite loop while trying to calculate attack coordinate.\nAttack Mode: ${hitInfo.attackMode}\nLast tried coordinates: [${x}, ${y}]`);
        }
      }
      await new Promise(r => setTimeout(r, 800));
      const attack = DOMBoard.receiveAttack([x, y]);
      console.log(hitInfo.attackMode, attack.result);
      switch (attack.result) {
        case _core_gameBoard_js__WEBPACK_IMPORTED_MODULE_0__.CellState.MISS:
          switch (hitInfo.attackMode) {
            case computerAttackMode.ADJACENT:
              hitInfo.incrementAdjacentTries();
              break;
            case computerAttackMode.DIRECTED:
              hitInfo.lastHit = null;
              hitInfo.direction = null;
              hitInfo.adjacentTries = 0;
              hitInfo.attackMode = computerAttackMode.ADJACENT;
              break;
          }
          break;
        case _core_gameBoard_js__WEBPACK_IMPORTED_MODULE_0__.CellState.HIT:
          switch (hitInfo.attackMode) {
            case computerAttackMode.RANDOM:
              hitInfo.firstHit = [x, y];
              hitInfo.attackMode = computerAttackMode.ADJACENT;
              break;
            case computerAttackMode.ADJACENT:
              hitInfo.lastHit = [x, y];
              hitInfo.direction = [x - hitInfo.firstHit[0], y - hitInfo.firstHit[1]];
              hitInfo.attackMode = computerAttackMode.DIRECTED;
              break;
            case computerAttackMode.DIRECTED:
              hitInfo.lastHit = [x, y];
          }
          break;
        case _core_gameBoard_js__WEBPACK_IMPORTED_MODULE_0__.CellState.SUNK:
          hitInfo.reset();
          break;
      }
      this.updateAttackInfo(attack.result, attack.ship, attacker);
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
    <img class="logo" alt="Logo" /><h1>BLITZBAY</h1>
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LFdBQVcsQ0FBQ2tJLE9BQU8sQ0FBQztFQUN6QkQsV0FBVyxDQUFDdEcsTUFBTSxDQUFDLENBQUM7QUFDdEIsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ibGl0emJheS8uL3NyYy9zdHlsZXMvaW5kZXguY3NzPzRlNDIiLCJ3ZWJwYWNrOi8vYmxpdHpiYXkvLi9zcmMvY29yZS9nYW1lQm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmxpdHpiYXkvLi9zcmMvY29yZS9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmxpdHpiYXkvLi9zcmMvY29yZS9zaGlwLmpzIiwid2VicGFjazovL2JsaXR6YmF5Ly4vc3JjL2RvbS9ib2FyZHMuanMiLCJ3ZWJwYWNrOi8vYmxpdHpiYXkvLi9zcmMvZG9tL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmxpdHpiYXkvLi9zcmMvZG9tL3BhZ2VzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmxpdHpiYXkvLi9zcmMvZG9tL3BhZ2VzL2hlbHAuanMiLCJ3ZWJwYWNrOi8vYmxpdHpiYXkvLi9zcmMvZG9tL3BhZ2VzL2hvbWUuanMiLCJ3ZWJwYWNrOi8vYmxpdHpiYXkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmxpdHpiYXkvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JsaXR6YmF5L3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYmxpdHpiYXkvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9ibGl0emJheS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JsaXR6YmF5L3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2JsaXR6YmF5Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCB7IGNyZWF0ZVNoaXAsIFNoaXBPcmllbnRhdGlvbiB9IGZyb20gXCIuL3NoaXAuanNcIjtcblxuZXhwb3J0IGNvbnN0IENlbGxTdGF0ZSA9IE9iamVjdC5mcmVlemUoe1xuICBFTVBUWTogMCxcbiAgTUlTUzogMSxcbiAgU0hJUDogMixcbiAgSElUOiAzLFxuICBTVU5LOiA0LFxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVHYW1lQm9hcmQoc2l6ZSkge1xuICBpZiAoc2l6ZSA8PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBib2FyZCBzaXplXCIpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzaXplLFxuICAgIGNlbGxzOiBBcnJheS5mcm9tKHsgbGVuZ3RoOiBzaXplIH0sICgpID0+XG4gICAgICBBcnJheS5mcm9tKHsgbGVuZ3RoOiBzaXplIH0sICgpID0+IENlbGxTdGF0ZS5FTVBUWSksXG4gICAgKSxcbiAgICBzaGlwczogW10sXG5cbiAgICByZXNldDogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5jZWxscyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IHNpemUgfSwgKCkgPT5cbiAgICAgICAgQXJyYXkuZnJvbSh7IGxlbmd0aDogc2l6ZSB9LCAoKSA9PiBDZWxsU3RhdGUuRU1QVFkpLFxuICAgICAgKTtcbiAgICAgIHRoaXMuc2hpcHMgPSBbXTtcbiAgICB9LFxuXG4gICAgcGxhY2VTaGlwOiBmdW5jdGlvbiAoc2hpcCkge1xuICAgICAgaWYgKFxuICAgICAgICBzaGlwLmNvb3JkaW5hdGVzWzBdIDwgMCB8fFxuICAgICAgICBzaGlwLmNvb3JkaW5hdGVzWzFdIDwgMCB8fFxuICAgICAgICBzaGlwLmNvb3JkaW5hdGVzWzBdID49IHNpemUgfHxcbiAgICAgICAgc2hpcC5jb29yZGluYXRlc1sxXSA+PSBzaXplXG4gICAgICApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IHBsYWNlIHNoaXAgb3V0c2lkZSB0aGUgYm9hcmRcIik7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwgJiZcbiAgICAgICAgICBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxID49IHNpemUpIHx8XG4gICAgICAgIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwgJiZcbiAgICAgICAgICBzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxID49IHNpemUpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwpIHtcbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMF07XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICBpZiAodGhpcy5jZWxsc1tzaGlwLmNvb3JkaW5hdGVzWzFdXVtpXSAhPT0gQ2VsbFN0YXRlLkVNUFRZKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1sxXTtcbiAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgaSsrXG4gICAgICAgICkge1xuICAgICAgICAgIGlmICh0aGlzLmNlbGxzW2ldW3NoaXAuY29vcmRpbmF0ZXNbMF1dICE9PSBDZWxsU3RhdGUuRU1QVFkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5zaGlwcy5wdXNoKHNoaXApO1xuXG4gICAgICBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwpIHtcbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMF07XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmNlbGxzW3NoaXAuY29vcmRpbmF0ZXNbMV1dW2ldID0gQ2VsbFN0YXRlLlNISVA7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMKSB7XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzFdO1xuICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1sxXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5jZWxsc1tpXVtzaGlwLmNvb3JkaW5hdGVzWzBdXSA9IENlbGxTdGF0ZS5TSElQO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICBtb3ZlU2hpcDogZnVuY3Rpb24gKHNoaXBJbmRleCwgY29vcmRpbmF0ZXMpIHtcbiAgICAgIGNvbnN0IHNoaXAgPSB0aGlzLnNoaXBzW3NoaXBJbmRleF07XG4gICAgICBpZiAoIXNoaXApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2hpcCBkb2VzIG5vdCBleGlzdFwiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMKSB7XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5jZWxsc1tzaGlwLmNvb3JkaW5hdGVzWzFdXVtpXSA9IENlbGxTdGF0ZS5FTVBUWTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwpIHtcbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMV07XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmNlbGxzW2ldW3NoaXAuY29vcmRpbmF0ZXNbMF1dID0gQ2VsbFN0YXRlLkVNUFRZO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgIXRoaXMucGxhY2VTaGlwKGNyZWF0ZVNoaXAoc2hpcC50eXBlLCBjb29yZGluYXRlcywgc2hpcC5vcmllbnRhdGlvbikpXG4gICAgICApIHtcbiAgICAgICAgaWYgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMKSB7XG4gICAgICAgICAgZm9yIChcbiAgICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1swXTtcbiAgICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGkrK1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5jZWxsc1tzaGlwLmNvb3JkaW5hdGVzWzFdXVtpXSA9IENlbGxTdGF0ZS5TSElQO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwpIHtcbiAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzFdO1xuICAgICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgICAgaSsrXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmNlbGxzW2ldW3NoaXAuY29vcmRpbmF0ZXNbMF1dID0gQ2VsbFN0YXRlLlNISVA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zaGlwc1tzaGlwSW5kZXhdID0gdGhpcy5zaGlwcy5wb3AoKTtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIHJvdGF0ZVNoaXA6IGZ1bmN0aW9uIChzaGlwSW5kZXgpIHtcbiAgICAgIGNvbnN0IHNoaXAgPSB0aGlzLnNoaXBzW3NoaXBJbmRleF07XG4gICAgICBpZiAoIXNoaXApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2hpcCBkb2VzIG5vdCBleGlzdFwiKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbmV3T3JpZW50YXRpb24gPVxuICAgICAgICBzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTFxuICAgICAgICAgID8gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMXG4gICAgICAgICAgOiBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTDtcblxuICAgICAgaWYgKG5ld09yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCkge1xuICAgICAgICBpZiAoc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMSA+PSB0aGlzLnNpemUpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1swXSArIDE7XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICBpZiAodGhpcy5jZWxsc1tzaGlwLmNvb3JkaW5hdGVzWzFdXVtpXSAhPT0gQ2VsbFN0YXRlLkVNUFRZKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKG5ld09yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwpIHtcbiAgICAgICAgaWYgKHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDEgPj0gdGhpcy5zaXplKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyAxO1xuICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1sxXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKHRoaXMuY2VsbHNbaV1bc2hpcC5jb29yZGluYXRlc1swXV0gIT09IENlbGxTdGF0ZS5FTVBUWSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobmV3T3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMKSB7XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzFdO1xuICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1sxXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5jZWxsc1tpXVtzaGlwLmNvb3JkaW5hdGVzWzBdXSA9IENlbGxTdGF0ZS5FTVBUWTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1swXTtcbiAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMF0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgaSsrXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuY2VsbHNbc2hpcC5jb29yZGluYXRlc1sxXV1baV0gPSBDZWxsU3RhdGUuU0hJUDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChuZXdPcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMKSB7XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5jZWxsc1tzaGlwLmNvb3JkaW5hdGVzWzFdXVtpXSA9IENlbGxTdGF0ZS5FTVBUWTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1sxXTtcbiAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgaSsrXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuY2VsbHNbaV1bc2hpcC5jb29yZGluYXRlc1swXV0gPSBDZWxsU3RhdGUuU0hJUDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzaGlwLm9yaWVudGF0aW9uID0gbmV3T3JpZW50YXRpb247XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuXG4gICAgZ2V0U2hpcEluZGV4OiBmdW5jdGlvbiAoY29vcmRpbmF0ZXMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5zaGlwc1tpXS5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwpIHtcbiAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgbGV0IGogPSB0aGlzLnNoaXBzW2ldLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgICAgICAgaiA8PSB0aGlzLnNoaXBzW2ldLmNvb3JkaW5hdGVzWzBdICsgdGhpcy5zaGlwc1tpXS5sZW5ndGggLSAxO1xuICAgICAgICAgICAgaisrXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGNvb3JkaW5hdGVzWzBdID09PSBqICYmXG4gICAgICAgICAgICAgIGNvb3JkaW5hdGVzWzFdID09PSB0aGlzLnNoaXBzW2ldLmNvb3JkaW5hdGVzWzFdXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2hpcHNbaV0ub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICBsZXQgaiA9IHRoaXMuc2hpcHNbaV0uY29vcmRpbmF0ZXNbMV07XG4gICAgICAgICAgICBqIDw9IHRoaXMuc2hpcHNbaV0uY29vcmRpbmF0ZXNbMV0gKyB0aGlzLnNoaXBzW2ldLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBqKytcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgY29vcmRpbmF0ZXNbMF0gPT09IHRoaXMuc2hpcHNbaV0uY29vcmRpbmF0ZXNbMF0gJiZcbiAgICAgICAgICAgICAgY29vcmRpbmF0ZXNbMV0gPT09IGpcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIC0xO1xuICAgIH0sXG5cbiAgICByZWNlaXZlQXR0YWNrOiBmdW5jdGlvbiAoY29vcmRpbmF0ZXMpIHtcbiAgICAgIGlmIChcbiAgICAgICAgY29vcmRpbmF0ZXNbMF0gPCAwIHx8XG4gICAgICAgIGNvb3JkaW5hdGVzWzFdIDwgMCB8fFxuICAgICAgICBjb29yZGluYXRlc1swXSA+PSBzaXplIHx8XG4gICAgICAgIGNvb3JkaW5hdGVzWzFdID49IHNpemVcbiAgICAgICkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgYXR0YWNrIG91dHNpZGUgdGhlIGJvYXJkXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuY2VsbHNbY29vcmRpbmF0ZXNbMV1dW2Nvb3JkaW5hdGVzWzBdXSAhPT0gQ2VsbFN0YXRlLkVNUFRZICYmXG4gICAgICAgIHRoaXMuY2VsbHNbY29vcmRpbmF0ZXNbMV1dW2Nvb3JkaW5hdGVzWzBdXSAhPT0gQ2VsbFN0YXRlLlNISVBcbiAgICAgICkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDZWxsIGhhcyBhbHJlYWR5IGJlZW4gYXR0YWNrZWRcIik7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmNlbGxzW2Nvb3JkaW5hdGVzWzFdXVtjb29yZGluYXRlc1swXV0gIT09IENlbGxTdGF0ZS5TSElQKSB7XG4gICAgICAgIHRoaXMuY2VsbHNbY29vcmRpbmF0ZXNbMV1dW2Nvb3JkaW5hdGVzWzBdXSA9IENlbGxTdGF0ZS5NSVNTO1xuICAgICAgICByZXR1cm4geyByZXN1bHQ6IENlbGxTdGF0ZS5NSVNTLCBzaGlwOiB1bmRlZmluZWQgfTtcbiAgICAgIH1cblxuICAgICAgZm9yIChjb25zdCBzaGlwIG9mIHRoaXMuc2hpcHMpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCAmJlxuICAgICAgICAgICAgY29vcmRpbmF0ZXNbMV0gPT09IHNoaXAuY29vcmRpbmF0ZXNbMV0gJiZcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzWzBdID49IHNoaXAuY29vcmRpbmF0ZXNbMF0gJiZcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzWzBdIDw9IHNoaXAuY29vcmRpbmF0ZXNbMF0gKyBzaGlwLmxlbmd0aCAtIDEpIHx8XG4gICAgICAgICAgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCAmJlxuICAgICAgICAgICAgY29vcmRpbmF0ZXNbMF0gPT09IHNoaXAuY29vcmRpbmF0ZXNbMF0gJiZcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzWzFdID49IHNoaXAuY29vcmRpbmF0ZXNbMV0gJiZcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzWzFdIDw9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDEpXG4gICAgICAgICkge1xuICAgICAgICAgIHNoaXAuaGl0KCk7XG5cbiAgICAgICAgICBpZiAoc2hpcC5pc1N1bmsoKSkge1xuICAgICAgICAgICAgaWYgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMKSB7XG4gICAgICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICBpKytcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jZWxsc1tzaGlwLmNvb3JkaW5hdGVzWzFdXVtpXSA9IENlbGxTdGF0ZS5TVU5LO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1sxXTtcbiAgICAgICAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgaSsrXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2VsbHNbaV1bc2hpcC5jb29yZGluYXRlc1swXV0gPSBDZWxsU3RhdGUuU1VOSztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNlbGxzW2Nvb3JkaW5hdGVzWzFdXVtjb29yZGluYXRlc1swXV0gPSBDZWxsU3RhdGUuSElUO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7IHJlc3VsdDogdGhpcy5jZWxsc1tjb29yZGluYXRlc1sxXV1bY29vcmRpbmF0ZXNbMF1dLCBzaGlwIH07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgaXNGbGVldERlc3Ryb3llZDogZnVuY3Rpb24gKCkge1xuICAgICAgZm9yIChjb25zdCBzaGlwIG9mIHRoaXMuc2hpcHMpIHtcbiAgICAgICAgaWYgKCFzaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gIH07XG59XG4iLCJpbXBvcnQgeyBjcmVhdGVHYW1lQm9hcmQgfSBmcm9tIFwiLi9nYW1lQm9hcmQuanNcIjtcblxuZXhwb3J0IGNvbnN0IFBsYXllclR5cGUgPSBPYmplY3QuZnJlZXplKHtcbiAgSFVNQU46IFwiSFVNQU5cIixcbiAgQ09NUFVURVI6IFwiQ09NUFVURVJcIixcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUGxheWVyKG5hbWUsIHR5cGUsIGJvYXJkU2l6ZSkge1xuICByZXR1cm4ge1xuICAgIG5hbWUsXG4gICAgdHlwZSxcbiAgICBib2FyZDogY3JlYXRlR2FtZUJvYXJkKGJvYXJkU2l6ZSksXG4gIH07XG59XG4iLCJleHBvcnQgY29uc3QgU2hpcFR5cGUgPSBPYmplY3QuZnJlZXplKHtcbiAgQ0FSUklFUjogXCJDYXJyaWVyXCIsXG4gIEJBVFRMRVNISVA6IFwiQmF0dGxlc2hpcFwiLFxuICBERVNUUk9ZRVI6IFwiRGVzdHJveWVyXCIsXG4gIFNVQk1BUklORTogXCJTdWJtYXJpbmVcIixcbiAgUEFUUk9MOiBcIlBhdHJvbCBCb2F0XCIsXG59KTtcblxuZXhwb3J0IGNvbnN0IFNoaXBPcmllbnRhdGlvbiA9IE9iamVjdC5mcmVlemUoe1xuICBIT1JJWk9OVEFMOiBcIkhPUklaT05UQUxcIixcbiAgVkVSVElDQUw6IFwiVkVSVElDQUxcIixcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2hpcExlbmd0aCh0eXBlKSB7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgU2hpcFR5cGUuQ0FSUklFUjpcbiAgICAgIHJldHVybiA1O1xuICAgIGNhc2UgU2hpcFR5cGUuQkFUVExFU0hJUDpcbiAgICAgIHJldHVybiA0O1xuICAgIGNhc2UgU2hpcFR5cGUuREVTVFJPWUVSOlxuICAgICAgcmV0dXJuIDM7XG4gICAgY2FzZSBTaGlwVHlwZS5TVUJNQVJJTkU6XG4gICAgICByZXR1cm4gMztcbiAgICBjYXNlIFNoaXBUeXBlLlBBVFJPTDpcbiAgICAgIHJldHVybiAyO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTaGlwKFxuICB0eXBlLFxuICBjb29yZGluYXRlcyA9IFt1bmRlZmluZWQsIHVuZGVmaW5lZF0sXG4gIG9yaWVudGF0aW9uID0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwsXG4pIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiB0eXBlLFxuICAgIGxlbmd0aDogZ2V0U2hpcExlbmd0aCh0eXBlKSxcbiAgICBjb29yZGluYXRlcyxcbiAgICBvcmllbnRhdGlvbixcbiAgICBoaXRzOiAwLFxuXG4gICAgaGl0OiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpcy5oaXRzIDwgdGhpcy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5oaXRzKys7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGlzU3VuazogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGl0cyA9PT0gdGhpcy5sZW5ndGg7XG4gICAgfSxcbiAgfTtcbn1cbiIsImltcG9ydCB7IENlbGxTdGF0ZSB9IGZyb20gXCIuLi9jb3JlL2dhbWVCb2FyZC5qc1wiO1xuaW1wb3J0IHsgUGxheWVyVHlwZSB9IGZyb20gXCIuLi9jb3JlL3BsYXllci5qc1wiO1xuaW1wb3J0IHtcbiAgY3JlYXRlU2hpcCxcbiAgZ2V0U2hpcExlbmd0aCxcbiAgU2hpcE9yaWVudGF0aW9uLFxuICBTaGlwVHlwZSxcbn0gZnJvbSBcIi4uL2NvcmUvc2hpcC5qc1wiO1xuXG5pbXBvcnQgcmVmcmVzaFN2ZyBmcm9tIFwiLi4vLi4vYXNzZXRzL3JlZnJlc2gtY2N3LnN2Z1wiO1xuaW1wb3J0IGVkaXRTdmcgZnJvbSBcIi4uLy4uL2Fzc2V0cy9lZGl0LnN2Z1wiO1xuaW1wb3J0IHNhdmVTdmcgZnJvbSBcIi4uLy4uL2Fzc2V0cy9zYXZlLnN2Z1wiO1xuXG5pbXBvcnQgY2FycmllclN2ZyBmcm9tIFwiLi4vLi4vYXNzZXRzL2NhcnJpZXIuc3ZnXCI7XG5pbXBvcnQgYmF0dGxlc2hpcFN2ZyBmcm9tIFwiLi4vLi4vYXNzZXRzL2JhdHRsZXNoaXAuc3ZnXCI7XG5pbXBvcnQgZGVzdHJveWVyU3ZnIGZyb20gXCIuLi8uLi9hc3NldHMvZGVzdHJveWVyLnN2Z1wiO1xuaW1wb3J0IHN1Ym1hcmluZVN2ZyBmcm9tIFwiLi4vLi4vYXNzZXRzL3N1Ym1hcmluZS5zdmdcIjtcbmltcG9ydCBwYXRyb2xTdmcgZnJvbSBcIi4uLy4uL2Fzc2V0cy9wYXRyb2wuc3ZnXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cEdhbWVCb2FyZHMoZ2FtZSwgcGxheWVyT25lLCBwbGF5ZXJUd28pIHtcbiAgY29uc3QgYm9hcmRPbmUgPSBjcmVhdGVCb2FyZENvbXBvbmVudChcbiAgICBwbGF5ZXJPbmUuYm9hcmQsXG4gICAgcGxheWVyT25lLFxuICAgIHBsYXllclR3by50eXBlICE9PSBQbGF5ZXJUeXBlLkNPTVBVVEVSLFxuICAgIHBsYXllck9uZS50eXBlID09PSBQbGF5ZXJUeXBlLkhVTUFOLFxuICAgIGdhbWUsXG4gICk7XG4gIGJvYXJkT25lLnJhbmRvbWl6ZUZvcm1hdGlvbigpO1xuXG4gIGJvYXJkT25lLmNvbXBvbmVudC5jbGFzc0xpc3QuYWRkKFxuICAgIFwicGxheWVyLW9uZVwiLFxuICAgIHBsYXllck9uZS50eXBlID09PSBQbGF5ZXJUeXBlLkhVTUFOID8gXCJodW1hblwiIDogXCJjb21wdXRlclwiLFxuICApO1xuICBpZiAocGxheWVyVHdvLnR5cGUgPT09IFBsYXllclR5cGUuQ09NUFVURVIpIHtcbiAgICBib2FyZE9uZS5jb21wb25lbnQuY2xhc3NMaXN0LmFkZChcIm9ubHktaHVtYW5cIik7XG4gICAgYm9hcmRPbmUucmVuZGVyU2hpcHMoKTtcbiAgfVxuICBib2FyZE9uZS5jb21wb25lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGJvYXJkT25lLmNsZWFyKCksIHRydWUpO1xuXG4gIGNvbnN0IGJvYXJkVHdvID0gY3JlYXRlQm9hcmRDb21wb25lbnQoXG4gICAgcGxheWVyVHdvLmJvYXJkLFxuICAgIHBsYXllclR3byxcbiAgICBwbGF5ZXJPbmUudHlwZSAhPT0gUGxheWVyVHlwZS5DT01QVVRFUixcbiAgICBwbGF5ZXJUd28udHlwZSA9PT0gUGxheWVyVHlwZS5IVU1BTixcbiAgICBnYW1lLFxuICApO1xuICBib2FyZFR3by5yYW5kb21pemVGb3JtYXRpb24oKTtcblxuICBib2FyZFR3by5jb21wb25lbnQuY2xhc3NMaXN0LmFkZChcbiAgICBcInBsYXllci10d29cIixcbiAgICBwbGF5ZXJUd28udHlwZSA9PT0gUGxheWVyVHlwZS5IVU1BTiA/IFwiaHVtYW5cIiA6IFwiY29tcHV0ZXJcIixcbiAgKTtcblxuICBbYm9hcmRPbmUsIGJvYXJkVHdvXS5mb3JFYWNoKChET01Cb2FyZCwgYm9hcmRJbmRleCkgPT4ge1xuICAgIGxldCBtb3ZpbmdTaGlwSW5kZXggPSBudWxsO1xuICAgIGxldCByZWxhdGl2ZURyYWdnaW5nQ2VsbCA9IG51bGw7XG5cbiAgICBBcnJheS5mcm9tKERPTUJvYXJkLmNvbXBvbmVudC5jaGlsZHJlblsxXS5jaGlsZHJlbikuZm9yRWFjaCgocm93LCBpKSA9PiB7XG4gICAgICBBcnJheS5mcm9tKHJvdy5jaGlsZHJlbikuZm9yRWFjaCgoY2VsbCwgaikgPT4ge1xuICAgICAgICBmdW5jdGlvbiBoYW5kbGVBdHRhY2tFdmVudCgpIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhRE9NQm9hcmQuaXNBdHRhY2thYmxlKCkgfHxcbiAgICAgICAgICAgICFET01Cb2FyZC5hY3RpdmUgfHxcbiAgICAgICAgICAgICFnYW1lLmlzSW5Qcm9ncmVzcyB8fFxuICAgICAgICAgICAgZ2FtZS5pc0dhbWVPdmVyIHx8XG4gICAgICAgICAgICAhZ2FtZS5pc1BsYXllcldhaXRpbmdcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBhdHRhY2sgPSBET01Cb2FyZC5yZWNlaXZlQXR0YWNrKFtqLCBpXSk7XG4gICAgICAgICAgaWYgKGF0dGFjaykge1xuICAgICAgICAgICAgZ2FtZS51cGRhdGVBdHRhY2tJbmZvKFxuICAgICAgICAgICAgICBhdHRhY2sucmVzdWx0LFxuICAgICAgICAgICAgICBhdHRhY2suc2hpcCxcbiAgICAgICAgICAgICAgKGJvYXJkSW5kZXggKyAxKSAlIDIsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgZ2FtZS5pc1BsYXllcldhaXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVTaGlwUm90YXRlKGV2ZW50KSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIURPTUJvYXJkLmVkaXRpbmcgfHxcbiAgICAgICAgICAgICFET01Cb2FyZC5pc011dGFibGUoKSB8fFxuICAgICAgICAgICAgZ2FtZS5pc0luUHJvZ3Jlc3MgfHxcbiAgICAgICAgICAgICFjZWxsLmNsYXNzTGlzdC5jb250YWlucyhcInNoaXBcIilcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3Qgc2hpcEluZGV4ID0gRE9NQm9hcmQuYm9hcmQuZ2V0U2hpcEluZGV4KFtqLCBpXSk7XG4gICAgICAgICAgY29uc3Qgc2hpcCA9IERPTUJvYXJkLmJvYXJkLnNoaXBzW3NoaXBJbmRleF07XG5cbiAgICAgICAgICBpZiAoIWNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKFwibW92aW5nXCIpKSB7XG4gICAgICAgICAgICBET01Cb2FyZC50b2dnbGVTaGlwTW90aW9uKHNoaXAuY29vcmRpbmF0ZXMpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChET01Cb2FyZC5ib2FyZC5yb3RhdGVTaGlwKHNoaXBJbmRleCkpIHtcbiAgICAgICAgICAgIERPTUJvYXJkLmNsZWFyKCk7XG4gICAgICAgICAgICBET01Cb2FyZC50b2dnbGVTaGlwTW90aW9uKHNoaXAuY29vcmRpbmF0ZXMpO1xuICAgICAgICAgICAgRE9NQm9hcmQucmVuZGVyKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZVNoaXBNb3ZlU3RhcnQoKSB7XG4gICAgICAgICAgaWYgKCFET01Cb2FyZC5lZGl0aW5nKSByZXR1cm47XG5cbiAgICAgICAgICBjb25zdCBzaGlwSW5kZXggPSBET01Cb2FyZC5ib2FyZC5nZXRTaGlwSW5kZXgoW2osIGldKTtcbiAgICAgICAgICBpZiAoc2hpcEluZGV4ID09PSAtMSkgcmV0dXJuO1xuXG4gICAgICAgICAgbW92aW5nU2hpcEluZGV4ID0gc2hpcEluZGV4O1xuXG4gICAgICAgICAgY29uc3Qgc2hpcENvb3JkaW5hdGVzID1cbiAgICAgICAgICAgIERPTUJvYXJkLmJvYXJkLnNoaXBzW21vdmluZ1NoaXBJbmRleF0uY29vcmRpbmF0ZXM7XG4gICAgICAgICAgcmVsYXRpdmVEcmFnZ2luZ0NlbGwgPSBbXG4gICAgICAgICAgICBqIC0gc2hpcENvb3JkaW5hdGVzWzBdLFxuICAgICAgICAgICAgaSAtIHNoaXBDb29yZGluYXRlc1sxXSxcbiAgICAgICAgICBdO1xuXG4gICAgICAgICAgRE9NQm9hcmQudG9nZ2xlU2hpcE1vdGlvbihbaiwgaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlQXR0YWNrRXZlbnQpO1xuICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZUF0dGFja0V2ZW50KTtcblxuICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJjb250ZXh0bWVudVwiLCBoYW5kbGVTaGlwUm90YXRlKTtcblxuICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gMikgcmV0dXJuO1xuICAgICAgICAgIGhhbmRsZVNoaXBNb3ZlU3RhcnQoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlU2hpcE1vdmVTdGFydCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGhhbmRsZVNoaXBNb3ZpbmcoZXZlbnQpIHtcbiAgICAgIGxldCB0YXJnZXQ7XG4gICAgICBpZiAoZXZlbnQudG91Y2hlcyAmJiBldmVudC50b3VjaGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGFyZ2V0ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChcbiAgICAgICAgICBldmVudC50b3VjaGVzWzBdLmNsaWVudFgsXG4gICAgICAgICAgZXZlbnQudG91Y2hlc1swXS5jbGllbnRZLFxuICAgICAgICApO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgfVxuXG4gICAgICBpZiAoIURPTUJvYXJkLmVkaXRpbmcpIHJldHVybjtcbiAgICAgIGlmICghdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNlbGxcIikpIHJldHVybjtcbiAgICAgIGlmIChtb3ZpbmdTaGlwSW5kZXggPT09IG51bGwpIHJldHVybjtcblxuICAgICAgRE9NQm9hcmQuY2xlYXIoKTtcblxuICAgICAgY29uc3QgY2VsbEluZGV4ID0gZ2V0Q2VsbEluZGV4KHRhcmdldCk7XG4gICAgICBjb25zdCBuZXdDb29yZGluYXRlcyA9IFtcbiAgICAgICAgY2VsbEluZGV4WzBdIC0gcmVsYXRpdmVEcmFnZ2luZ0NlbGxbMF0sXG4gICAgICAgIGNlbGxJbmRleFsxXSAtIHJlbGF0aXZlRHJhZ2dpbmdDZWxsWzFdLFxuICAgICAgXTtcbiAgICAgIGlmIChcbiAgICAgICAgbmV3Q29vcmRpbmF0ZXNbMF0gPCAwIHx8XG4gICAgICAgIG5ld0Nvb3JkaW5hdGVzWzFdIDwgMCB8fFxuICAgICAgICBuZXdDb29yZGluYXRlc1swXSA+PSBET01Cb2FyZC5ib2FyZC5zaXplIHx8XG4gICAgICAgIG5ld0Nvb3JkaW5hdGVzWzFdID49IERPTUJvYXJkLmJvYXJkLnNpemVcbiAgICAgICkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIERPTUJvYXJkLnRvZ2dsZVNoaXBNb3Rpb24oXG4gICAgICAgIG5ld0Nvb3JkaW5hdGVzLFxuICAgICAgICBET01Cb2FyZC5ib2FyZC5zaGlwc1ttb3ZpbmdTaGlwSW5kZXhdLFxuICAgICAgKTtcblxuICAgICAgY29uc3Qgc2hpcEltYWdlID0gRE9NQm9hcmQuY29tcG9uZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIGAuc2hpcC0ke21vdmluZ1NoaXBJbmRleH1gLFxuICAgICAgKTtcbiAgICAgIGlmIChzaGlwSW1hZ2UpIHtcbiAgICAgICAgY29uc3QgbmV3Q2VsbCA9XG4gICAgICAgICAgRE9NQm9hcmQuY29tcG9uZW50LmNoaWxkcmVuWzFdLmNoaWxkcmVuW25ld0Nvb3JkaW5hdGVzWzFdXS5jaGlsZHJlbltcbiAgICAgICAgICAgIG5ld0Nvb3JkaW5hdGVzWzBdXG4gICAgICAgICAgXTtcbiAgICAgICAgc2hpcEltYWdlLnN0eWxlLmxlZnQgPSBgJHtuZXdDZWxsLm9mZnNldExlZnR9cHhgO1xuICAgICAgICBzaGlwSW1hZ2Uuc3R5bGUudG9wID0gYCR7bmV3Q2VsbC5vZmZzZXRUb3B9cHhgO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZVNoaXBQbGFjZSgpIHtcbiAgICAgIGlmIChtb3ZpbmdTaGlwSW5kZXggIT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgbW92aW5nQ2VsbCA9IERPTUJvYXJkLmNvbXBvbmVudC5xdWVyeVNlbGVjdG9yKFwiLm1vdmluZ1wiKTtcbiAgICAgICAgaWYgKG1vdmluZ0NlbGwpIHtcbiAgICAgICAgICBjb25zdCBuZXdDb29yZGluYXRlcyA9IGdldENlbGxJbmRleChtb3ZpbmdDZWxsKTtcbiAgICAgICAgICBET01Cb2FyZC5ib2FyZC5tb3ZlU2hpcChtb3ZpbmdTaGlwSW5kZXgsIG5ld0Nvb3JkaW5hdGVzKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBtb3ZpbmdTaGlwSW5kZXggPSBudWxsO1xuICAgICAgcmVsYXRpdmVEcmFnZ2luZ0NlbGwgPSBudWxsO1xuXG4gICAgICBET01Cb2FyZC5jbGVhcigpO1xuICAgICAgRE9NQm9hcmQucmVuZGVyKCk7XG4gICAgfVxuXG4gICAgRE9NQm9hcmQuY29tcG9uZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgaGFuZGxlU2hpcE1vdmluZyk7XG4gICAgRE9NQm9hcmQuY29tcG9uZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgaGFuZGxlU2hpcE1vdmluZyk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgaGFuZGxlU2hpcFBsYWNlKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgaGFuZGxlU2hpcFBsYWNlKTtcbiAgfSk7XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGV2ZW50KSA9PiB7XG4gICAgaWYgKGJvYXJkT25lLmVkaXRpbmcpIGJvYXJkT25lLm1vdmVTaGlwKGV2ZW50LmtleSk7XG4gICAgZWxzZSBpZiAoYm9hcmRUd28uZWRpdGluZykgYm9hcmRUd28ubW92ZVNoaXAoZXZlbnQua2V5KTtcbiAgfSk7XG5cbiAgcmV0dXJuIFtib2FyZE9uZSwgYm9hcmRUd29dO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQm9hcmRDb21wb25lbnQoYm9hcmQsIHBsYXllciwgYXR0YWNrYWJsZSwgbXV0YWJsZSkge1xuICBjb25zdCBib2FyZENvbXBvbmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGJvYXJkQ29tcG9uZW50LmNsYXNzTGlzdC5hZGQoXCJib2FyZFwiKTtcblxuICBjb25zdCBib2FyZEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpO1xuICBib2FyZEhlYWRlci5jbGFzc0xpc3QuYWRkKFwiYm9hcmQtaGVhZGVyXCIpO1xuICBib2FyZEhlYWRlci5pbm5lckhUTUwgPSBgXG4gICAgPHAgY2xhc3M9XCJwbGF5ZXItbmFtZVwiPiR7cGxheWVyLm5hbWV9PC9wPlxuICAgIDxpbnB1dCBjbGFzcz1cInBsYXllci1uYW1lLWlucHV0IGhpZGRlblwiIHR5cGU9XCJ0ZXh0XCIgcmVxdWlyZWQgdmFsdWU9XCIke3BsYXllci5uYW1lfVwiIC8+XG4gIGA7XG4gIGJvYXJkQ29tcG9uZW50LmFwcGVuZENoaWxkKGJvYXJkSGVhZGVyKTtcblxuICBsZXQgcmFuZG9taXplQnV0dG9uLCBlZGl0QnV0dG9uLCBzYXZlQnV0dG9uO1xuICBpZiAocGxheWVyLnR5cGUgPT09IFBsYXllclR5cGUuSFVNQU4pIHtcbiAgICByYW5kb21pemVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIHJhbmRvbWl6ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwicmFuZG9taXplLWJvYXJkXCIpO1xuICAgIHJhbmRvbWl6ZUJ1dHRvbi50aXRsZSA9IFwiUmFuZG9taXplIHNoaXAgcGxhY2VtZW50XCI7XG4gICAgcmFuZG9taXplQnV0dG9uLnR5cGUgPSBcImJ1dHRvblwiO1xuICAgIGNvbnN0IHJlZnJlc2hJY29uID0gbmV3IEltYWdlKCk7XG4gICAgcmVmcmVzaEljb24uc3JjID0gcmVmcmVzaFN2ZztcbiAgICByYW5kb21pemVCdXR0b24uYXBwZW5kQ2hpbGQocmVmcmVzaEljb24pO1xuXG4gICAgZWRpdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgZWRpdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZWRpdC1ib2FyZFwiKTtcbiAgICBlZGl0QnV0dG9uLnRpdGxlID0gXCJFZGl0IGJvYXJkIChjaGFuZ2UgbmFtZSwgbW92ZSBzaGlwcylcIjtcbiAgICBlZGl0QnV0dG9uLnR5cGUgPSBcImJ1dHRvblwiO1xuICAgIGNvbnN0IGVkaXRJY29uID0gbmV3IEltYWdlKCk7XG4gICAgZWRpdEljb24uc3JjID0gZWRpdFN2ZztcbiAgICBlZGl0QnV0dG9uLmFwcGVuZENoaWxkKGVkaXRJY29uKTtcblxuICAgIHNhdmVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIHNhdmVCdXR0b24uY2xhc3NMaXN0LmFkZChcInNhdmUtYm9hcmRcIiwgXCJoaWRkZW5cIik7XG4gICAgc2F2ZUJ1dHRvbi50aXRsZSA9IFwiU2F2ZSBib2FyZFwiO1xuICAgIHNhdmVCdXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XG4gICAgY29uc3Qgc2F2ZUljb24gPSBuZXcgSW1hZ2UoKTtcbiAgICBzYXZlSWNvbi5zcmMgPSBzYXZlU3ZnO1xuICAgIHNhdmVCdXR0b24uYXBwZW5kQ2hpbGQoc2F2ZUljb24pO1xuXG4gICAgY29uc3QgYm9hcmRDb250cm9scyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgYm9hcmRDb250cm9scy5jbGFzc0xpc3QuYWRkKFwiYm9hcmQtY29udHJvbHNcIik7XG4gICAgYm9hcmRDb250cm9scy5hcHBlbmRDaGlsZChyYW5kb21pemVCdXR0b24pO1xuICAgIGJvYXJkQ29udHJvbHMuYXBwZW5kQ2hpbGQoZWRpdEJ1dHRvbik7XG4gICAgYm9hcmRDb250cm9scy5hcHBlbmRDaGlsZChzYXZlQnV0dG9uKTtcbiAgICBib2FyZEhlYWRlci5hcHBlbmRDaGlsZChib2FyZENvbnRyb2xzKTtcbiAgfVxuXG4gIGNvbnN0IGJvYXJkQ2VsbHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBib2FyZENlbGxzLmNsYXNzTGlzdC5hZGQoXCJib2FyZC1jZWxsc1wiKTtcbiAgYm9hcmRDb21wb25lbnQuYXBwZW5kQ2hpbGQoYm9hcmRDZWxscyk7XG5cbiAgY29uc3Qgd2luZG93V2lkdGggPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGg7XG4gIGNvbnN0IHdpbmRvd0hlaWdodCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gIGNvbnN0IGlzVmVydGljYWxTY3JlZW4gPSB3aW5kb3dIZWlnaHQgPiB3aW5kb3dXaWR0aDtcbiAgY29uc3QgY2VsbFNpemUgPVxuICAgICgoaXNWZXJ0aWNhbFNjcmVlbiA/IDUgOiA0KSAvIDEwMCkgKlxuICAgIChpc1ZlcnRpY2FsU2NyZWVuID8gd2luZG93V2lkdGggOiB3aW5kb3dIZWlnaHQpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmQuY2VsbHMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCByb3dDb21wb25lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHJvd0NvbXBvbmVudC5jbGFzc0xpc3QuYWRkKFwicm93XCIpO1xuXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBib2FyZC5jZWxsc1tpXS5sZW5ndGg7IGorKykge1xuICAgICAgY29uc3QgY2VsbENvbXBvbmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBjZWxsQ29tcG9uZW50LmNsYXNzTGlzdC5hZGQoXCJjZWxsXCIpO1xuICAgICAgY2VsbENvbXBvbmVudC5jbGFzc0xpc3QuYWRkKGdldENlbGxDbGFzc05hbWUoW2osIGldLCBib2FyZCkpO1xuXG4gICAgICBjZWxsQ29tcG9uZW50LnN0eWxlLndpZHRoID0gYCR7Y2VsbFNpemV9cHhgO1xuICAgICAgY2VsbENvbXBvbmVudC5zdHlsZS5oZWlnaHQgPSBgJHtjZWxsU2l6ZX1weGA7XG5cbiAgICAgIHJvd0NvbXBvbmVudC5hcHBlbmRDaGlsZChjZWxsQ29tcG9uZW50KTtcbiAgICB9XG5cbiAgICBib2FyZENlbGxzLmFwcGVuZENoaWxkKHJvd0NvbXBvbmVudCk7XG4gIH1cblxuICBjb25zdCBzaGlwc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHNoaXBzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJib2FyZC1zaGlwc1wiKTtcbiAgYm9hcmRDZWxscy5hcHBlbmRDaGlsZChzaGlwc0NvbnRhaW5lcik7XG5cbiAgY29uc3QgRE9NQm9hcmQgPSB7XG4gICAgY29tcG9uZW50OiBib2FyZENvbXBvbmVudCxcbiAgICBib2FyZDogYm9hcmQsXG4gICAgYWN0aXZlOiBmYWxzZSxcbiAgICBlZGl0aW5nOiBmYWxzZSxcblxuICAgIGNlbGxTaXplLFxuXG4gICAgaXNBdHRhY2thYmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gYXR0YWNrYWJsZTtcbiAgICB9LFxuXG4gICAgaXNNdXRhYmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbXV0YWJsZTtcbiAgICB9LFxuXG4gICAgY2xlYXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IG1vdmluZ0NlbGxzID1cbiAgICAgICAgdGhpcy5jb21wb25lbnQuY2hpbGRyZW5bMV0ucXVlcnlTZWxlY3RvckFsbChcIi5tb3ZpbmdcIik7XG4gICAgICBpZiAobW92aW5nQ2VsbHMubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICBmb3IgKGNvbnN0IGNlbGwgb2YgbW92aW5nQ2VsbHMpIHtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKFwibW92aW5nXCIpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIEFycmF5LmZyb20odGhpcy5jb21wb25lbnQuY2hpbGRyZW5bMV0uY2hpbGRyZW4pLmZvckVhY2goKHJvdywgaSkgPT4ge1xuICAgICAgICBpZiAocm93LmNsYXNzTmFtZSA9PT0gXCJib2FyZC1zaGlwc1wiKSByZXR1cm47XG5cbiAgICAgICAgQXJyYXkuZnJvbShyb3cuY2hpbGRyZW4pLmZvckVhY2goKGNlbGwsIGopID0+IHtcbiAgICAgICAgICBjb25zdCBpc01vdmluZyA9IGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKFwibW92aW5nXCIpO1xuXG4gICAgICAgICAgY2VsbC5jbGFzc05hbWUgPSBcImNlbGxcIjtcbiAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoZ2V0Q2VsbENsYXNzTmFtZShbaiwgaV0sIHRoaXMuYm9hcmQpKTtcbiAgICAgICAgICBpZiAoaXNNb3ZpbmcpIGNlbGwuY2xhc3NMaXN0LmFkZChcIm1vdmluZ1wiKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5yZW5kZXJTaGlwcygpO1xuICAgIH0sXG5cbiAgICByZW5kZXJTaGlwczogZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3Qgc2hpcHNDb250YWluZXIgPSB0aGlzLmNvbXBvbmVudC5xdWVyeVNlbGVjdG9yKFwiLmJvYXJkLXNoaXBzXCIpO1xuXG4gICAgICBBcnJheS5mcm9tKHNoaXBzQ29udGFpbmVyLmNoaWxkcmVuKS5mb3JFYWNoKChzaGlwSW1hZ2UpID0+IHtcbiAgICAgICAgc2hpcHNDb250YWluZXIucmVtb3ZlQ2hpbGQoc2hpcEltYWdlKTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBncmlkR2FwID0gdGhpcy5jZWxsU2l6ZSAvIDEwO1xuXG4gICAgICB0aGlzLmJvYXJkLnNoaXBzLmZvckVhY2goKHNoaXAsIGkpID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICF0aGlzLmNvbXBvbmVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJlZGl0aW5nXCIpICYmXG4gICAgICAgICAgIXRoaXMuY29tcG9uZW50LmNsYXNzTGlzdC5jb250YWlucyhcIm9ubHktaHVtYW5cIikgJiZcbiAgICAgICAgICAoIXRoaXMuY29tcG9uZW50LmNsYXNzTGlzdC5jb250YWlucyhcImF0dGFja2luZ1wiKSB8fFxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKSAmJlxuICAgICAgICAgICFzaGlwLmlzU3VuaygpXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHggPSBzaGlwLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgICBjb25zdCB5ID0gc2hpcC5jb29yZGluYXRlc1sxXTtcblxuICAgICAgICBjb25zdCBzaGlwSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgc3dpdGNoIChzaGlwLnR5cGUpIHtcbiAgICAgICAgICBjYXNlIFNoaXBUeXBlLkNBUlJJRVI6XG4gICAgICAgICAgICBzaGlwSW1hZ2Uuc3JjID0gY2FycmllclN2ZztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgU2hpcFR5cGUuQkFUVExFU0hJUDpcbiAgICAgICAgICAgIHNoaXBJbWFnZS5zcmMgPSBiYXR0bGVzaGlwU3ZnO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBTaGlwVHlwZS5ERVNUUk9ZRVI6XG4gICAgICAgICAgICBzaGlwSW1hZ2Uuc3JjID0gZGVzdHJveWVyU3ZnO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBTaGlwVHlwZS5TVUJNQVJJTkU6XG4gICAgICAgICAgICBzaGlwSW1hZ2Uuc3JjID0gc3VibWFyaW5lU3ZnO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBTaGlwVHlwZS5QQVRST0w6XG4gICAgICAgICAgICBzaGlwSW1hZ2Uuc3JjID0gcGF0cm9sU3ZnO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgc2hpcEltYWdlLmFsdCA9IHNoaXAudHlwZTtcbiAgICAgICAgc2hpcEltYWdlLnRpdGxlID0gc2hpcC50eXBlO1xuICAgICAgICBzaGlwSW1hZ2UuY2xhc3NOYW1lID0gYHNoaXAtaW1nYDtcbiAgICAgICAgc2hpcEltYWdlLmNsYXNzTGlzdC5hZGQoYHNoaXAtJHtpfWApO1xuXG4gICAgICAgIGlmIChzaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgc2hpcEltYWdlLmNsYXNzTGlzdC5hZGQoYHNoaXAtc3Vua2ApO1xuICAgICAgICB9XG5cbiAgICAgICAgc2hpcEltYWdlLnN0eWxlLndpZHRoID0gYCR7NC43NSAqICh0aGlzLmNlbGxTaXplICsgZ3JpZEdhcCl9cHhgO1xuICAgICAgICBzaGlwSW1hZ2Uuc3R5bGUuaGVpZ2h0ID0gYGF1dG9gO1xuXG4gICAgICAgIGlmIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwpIHtcbiAgICAgICAgICBzaGlwSW1hZ2Uuc3R5bGUudHJhbnNmb3JtT3JpZ2luID0gXCJ0b3AgbGVmdFwiO1xuICAgICAgICAgIHNoaXBJbWFnZS5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlKDkwZGVnKSB0cmFuc2xhdGVZKC0ke2NlbGxTaXplfXB4KWA7XG4gICAgICAgIH1cblxuICAgICAgICBzaGlwSW1hZ2Uuc3R5bGUubGVmdCA9IGAke3ggKiAodGhpcy5jZWxsU2l6ZSArIGdyaWRHYXApfXB4YDtcbiAgICAgICAgc2hpcEltYWdlLnN0eWxlLnRvcCA9IGAke3kgKiAodGhpcy5jZWxsU2l6ZSArIGdyaWRHYXApfXB4YDtcblxuICAgICAgICBzaGlwc0NvbnRhaW5lci5hcHBlbmRDaGlsZChzaGlwSW1hZ2UpO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIHJhbmRvbWl6ZUZvcm1hdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgdGhpcy5ib2FyZC5yZXNldCgpO1xuXG4gICAgICBmb3IgKGNvbnN0IHR5cGUgb2YgT2JqZWN0LmtleXMoU2hpcFR5cGUpKSB7XG4gICAgICAgIGNvbnN0IHNoaXBMZW5ndGggPSBnZXRTaGlwTGVuZ3RoKFNoaXBUeXBlW3R5cGVdKTtcblxuICAgICAgICBsZXQgcGxhY2VkID0gZmFsc2U7XG4gICAgICAgIHdoaWxlICghcGxhY2VkKSB7XG4gICAgICAgICAgY29uc3Qgb3JpZW50YXRpb24gPVxuICAgICAgICAgICAgTWF0aC5yYW5kb20oKSA+IDAuNVxuICAgICAgICAgICAgICA/IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMXG4gICAgICAgICAgICAgIDogU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMO1xuXG4gICAgICAgICAgY29uc3QgeCA9IE1hdGguZmxvb3IoXG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpICpcbiAgICAgICAgICAgICAgKDEwIC1cbiAgICAgICAgICAgICAgICAob3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMID8gc2hpcExlbmd0aCA6IDApKSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKFxuICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqXG4gICAgICAgICAgICAgICgxMCAtXG4gICAgICAgICAgICAgICAgKG9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwgPyBzaGlwTGVuZ3RoIDogMCkpLFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBwbGFjZWQgPSB0aGlzLmJvYXJkLnBsYWNlU2hpcChcbiAgICAgICAgICAgIGNyZWF0ZVNoaXAoU2hpcFR5cGVbdHlwZV0sIFt4LCB5XSwgb3JpZW50YXRpb24pLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9LFxuXG4gICAgdG9nZ2xlU2hpcE1vdGlvbjogZnVuY3Rpb24gKGNvb3JkaW5hdGVzLCBtb3ZpbmdTaGlwID0gbnVsbCkge1xuICAgICAgaWYgKFxuICAgICAgICBjb29yZGluYXRlc1swXSA8IDAgfHxcbiAgICAgICAgY29vcmRpbmF0ZXNbMV0gPCAwIHx8XG4gICAgICAgIGNvb3JkaW5hdGVzWzBdID49IHRoaXMuYm9hcmQuc2l6ZSB8fFxuICAgICAgICBjb29yZGluYXRlc1sxXSA+PSB0aGlzLmJvYXJkLnNpemVcbiAgICAgICkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgbW92aW5nU2hpcCAmJlxuICAgICAgICAoKG1vdmluZ1NoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMICYmXG4gICAgICAgICAgY29vcmRpbmF0ZXNbMF0gPj0gdGhpcy5ib2FyZC5zaXplIC0gbW92aW5nU2hpcC5sZW5ndGggKyAxKSB8fFxuICAgICAgICAgIChtb3ZpbmdTaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwgJiZcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzWzFdID49IHRoaXMuYm9hcmQuc2l6ZSAtIG1vdmluZ1NoaXAubGVuZ3RoICsgMSkpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoIW1vdmluZ1NoaXApIHtcbiAgICAgICAgY29uc3QgY2VsbCA9XG4gICAgICAgICAgdGhpcy5jb21wb25lbnQuY2hpbGRyZW5bMV0uY2hpbGRyZW5bY29vcmRpbmF0ZXNbMV1dLmNoaWxkcmVuW1xuICAgICAgICAgICAgY29vcmRpbmF0ZXNbMF1cbiAgICAgICAgICBdO1xuICAgICAgICBpZiAoIWNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hpcFwiKSkgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBsZXQgc2hpcCwgbGVuZ3RoLCBvcmllbnRhdGlvbjtcblxuICAgICAgaWYgKG1vdmluZ1NoaXApIHtcbiAgICAgICAgbGVuZ3RoID0gbW92aW5nU2hpcC5sZW5ndGg7XG4gICAgICAgIG9yaWVudGF0aW9uID0gbW92aW5nU2hpcC5vcmllbnRhdGlvbjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNoaXAgPSB0aGlzLmJvYXJkLnNoaXBzW3RoaXMuYm9hcmQuZ2V0U2hpcEluZGV4KGNvb3JkaW5hdGVzKV07XG4gICAgICAgIGNvb3JkaW5hdGVzID0gc2hpcC5jb29yZGluYXRlcztcbiAgICAgICAgbGVuZ3RoID0gc2hpcC5sZW5ndGg7XG4gICAgICAgIG9yaWVudGF0aW9uID0gc2hpcC5vcmllbnRhdGlvbjtcbiAgICAgIH1cblxuICAgICAgc3dpdGNoIChvcmllbnRhdGlvbikge1xuICAgICAgICBjYXNlIFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMOlxuICAgICAgICAgIGZvciAobGV0IGkgPSBjb29yZGluYXRlc1swXTsgaSA8PSBjb29yZGluYXRlc1swXSArIGxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuY2hpbGRyZW5bMV0uY2hpbGRyZW5bY29vcmRpbmF0ZXNbMV1dLmNoaWxkcmVuW1xuICAgICAgICAgICAgICBpXG4gICAgICAgICAgICBdLmNsYXNzTGlzdC50b2dnbGUoXCJtb3ZpbmdcIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTDpcbiAgICAgICAgICBmb3IgKGxldCBpID0gY29vcmRpbmF0ZXNbMV07IGkgPD0gY29vcmRpbmF0ZXNbMV0gKyBsZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmNoaWxkcmVuWzFdLmNoaWxkcmVuW2ldLmNoaWxkcmVuW1xuICAgICAgICAgICAgICBjb29yZGluYXRlc1swXVxuICAgICAgICAgICAgXS5jbGFzc0xpc3QudG9nZ2xlKFwibW92aW5nXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgbW92ZVNoaXA6IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGNvbnN0IG1vdmluZ1NoaXBDZWxsID1cbiAgICAgICAgdGhpcy5jb21wb25lbnQuY2hpbGRyZW5bMV0ucXVlcnlTZWxlY3RvcihcIi5tb3ZpbmdcIik7XG5cbiAgICAgIGlmICghbW92aW5nU2hpcENlbGwpIHJldHVybjtcblxuICAgICAgY29uc3QgbW92aW5nU2hpcENvb3JkaW5hdGVzID0gZ2V0Q2VsbEluZGV4KG1vdmluZ1NoaXBDZWxsKTtcbiAgICAgIGNvbnN0IG1vdmluZ1NoaXBJbmRleCA9IHRoaXMuYm9hcmQuZ2V0U2hpcEluZGV4KG1vdmluZ1NoaXBDb29yZGluYXRlcyk7XG5cbiAgICAgIHRoaXMudG9nZ2xlU2hpcE1vdGlvbihtb3ZpbmdTaGlwQ29vcmRpbmF0ZXMpO1xuXG4gICAgICBsZXQgbW92ZVN1Y2Nlc3NmdWwgPSBmYWxzZTtcbiAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgIGNhc2UgXCJBcnJvd1VwXCI6XG4gICAgICAgICAgaWYgKG1vdmluZ1NoaXBDb29yZGluYXRlc1sxXSA8PSAwKSBicmVhaztcbiAgICAgICAgICBtb3ZlU3VjY2Vzc2Z1bCA9IHRoaXMuYm9hcmQubW92ZVNoaXAobW92aW5nU2hpcEluZGV4LCBbXG4gICAgICAgICAgICBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMF0sXG4gICAgICAgICAgICBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMV0gLSAxLFxuICAgICAgICAgIF0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dMZWZ0XCI6XG4gICAgICAgICAgaWYgKG1vdmluZ1NoaXBDb29yZGluYXRlc1swXSA8PSAwKSBicmVhaztcbiAgICAgICAgICBtb3ZlU3VjY2Vzc2Z1bCA9IHRoaXMuYm9hcmQubW92ZVNoaXAobW92aW5nU2hpcEluZGV4LCBbXG4gICAgICAgICAgICBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMF0gLSAxLFxuICAgICAgICAgICAgbW92aW5nU2hpcENvb3JkaW5hdGVzWzFdLFxuICAgICAgICAgIF0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dEb3duXCI6XG4gICAgICAgICAgaWYgKG1vdmluZ1NoaXBDb29yZGluYXRlc1sxXSA+PSB0aGlzLmJvYXJkLnNpemUgLSAxKSBicmVhaztcbiAgICAgICAgICBtb3ZlU3VjY2Vzc2Z1bCA9IHRoaXMuYm9hcmQubW92ZVNoaXAobW92aW5nU2hpcEluZGV4LCBbXG4gICAgICAgICAgICBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMF0sXG4gICAgICAgICAgICBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMV0gKyAxLFxuICAgICAgICAgIF0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dSaWdodFwiOlxuICAgICAgICAgIGlmIChtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMF0gPj0gdGhpcy5ib2FyZC5zaXplIC0gMSkgYnJlYWs7XG4gICAgICAgICAgbW92ZVN1Y2Nlc3NmdWwgPSB0aGlzLmJvYXJkLm1vdmVTaGlwKG1vdmluZ1NoaXBJbmRleCwgW1xuICAgICAgICAgICAgbW92aW5nU2hpcENvb3JkaW5hdGVzWzBdICsgMSxcbiAgICAgICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlc1sxXSxcbiAgICAgICAgICBdKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgaWYgKCFtb3ZlU3VjY2Vzc2Z1bCkge1xuICAgICAgICB0aGlzLnRvZ2dsZVNoaXBNb3Rpb24obW92aW5nU2hpcENvb3JkaW5hdGVzKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnJlbmRlcigpO1xuXG4gICAgICBjb25zdCBtb3ZlZFNoaXAgPSB0aGlzLmJvYXJkLnNoaXBzW21vdmluZ1NoaXBJbmRleF07XG4gICAgICB0aGlzLnRvZ2dsZVNoaXBNb3Rpb24obW92ZWRTaGlwLmNvb3JkaW5hdGVzKTtcbiAgICB9LFxuXG4gICAgcmVjZWl2ZUF0dGFjazogZnVuY3Rpb24gKGNvb3JkaW5hdGVzKSB7XG4gICAgICBjb25zdCBjZWxsID0gYm9hcmQuY2VsbHNbY29vcmRpbmF0ZXNbMV1dW2Nvb3JkaW5hdGVzWzBdXTtcbiAgICAgIGlmIChjZWxsICE9PSBDZWxsU3RhdGUuRU1QVFkgJiYgY2VsbCAhPT0gQ2VsbFN0YXRlLlNISVApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZXN1bHQgPSBib2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzKTtcbiAgICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcbiAgfTtcblxuICBmdW5jdGlvbiBzYXZlRWRpdHMoKSB7XG4gICAgaWYgKCFET01Cb2FyZC5jb21wb25lbnQuY2hpbGRyZW5bMF0ucmVwb3J0VmFsaWRpdHkoKSkgcmV0dXJuO1xuICAgIGJvYXJkSGVhZGVyLnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLW5hbWVcIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICBib2FyZEhlYWRlci5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1uYW1lLWlucHV0XCIpLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgYm9hcmRIZWFkZXIucXVlcnlTZWxlY3RvcihcIi5lZGl0LWJvYXJkXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgc2F2ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuXG4gICAgRE9NQm9hcmQuZWRpdGluZyA9IGZhbHNlO1xuICAgIERPTUJvYXJkLmNvbXBvbmVudC5jbGFzc0xpc3QucmVtb3ZlKFwiZWRpdGluZ1wiKTtcbiAgICBET01Cb2FyZC5jbGVhcigpO1xuICB9XG5cbiAgaWYgKHBsYXllci50eXBlID09PSBQbGF5ZXJUeXBlLkhVTUFOKSB7XG4gICAgcmFuZG9taXplQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBET01Cb2FyZC5yYW5kb21pemVGb3JtYXRpb24oKTtcbiAgICB9KTtcblxuICAgIGVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmVkaXRpbmdcIikpIHtcbiAgICAgICAgYWxlcnQoXCJQbGVhc2Ugc2F2ZSB0aGUgY3VycmVudGx5IGVkaXRpbmcgYm9hcmQgZmlyc3RcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYm9hcmRIZWFkZXIgPSBET01Cb2FyZC5jb21wb25lbnQuY2hpbGRyZW5bMF07XG5cbiAgICAgIGJvYXJkSGVhZGVyLnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLW5hbWVcIikuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIGJvYXJkSGVhZGVyXG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1uYW1lLWlucHV0XCIpXG4gICAgICAgIC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgZWRpdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgYm9hcmRIZWFkZXIucXVlcnlTZWxlY3RvcihcIi5zYXZlLWJvYXJkXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG5cbiAgICAgIERPTUJvYXJkLmVkaXRpbmcgPSB0cnVlO1xuICAgICAgRE9NQm9hcmQuY29tcG9uZW50LmNsYXNzTGlzdC5hZGQoXCJlZGl0aW5nXCIpO1xuICAgICAgRE9NQm9hcmQucmVuZGVyKCk7XG4gICAgfSk7XG5cbiAgICBib2FyZEhlYWRlclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLW5hbWUtaW5wdXRcIilcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChldmVudCkgPT4ge1xuICAgICAgICBwbGF5ZXIubmFtZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgYm9hcmRIZWFkZXIucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItbmFtZVwiKS50ZXh0Q29udGVudCA9IHBsYXllci5uYW1lO1xuICAgICAgfSk7XG5cbiAgICBzYXZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzYXZlRWRpdHMpO1xuXG4gICAgYm9hcmRIZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBzYXZlRWRpdHMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBET01Cb2FyZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENlbGxJbmRleChjZWxsKSB7XG4gIHJldHVybiBbXG4gICAgQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChjZWxsLnBhcmVudE5vZGUuY2hpbGRyZW4sIGNlbGwpLFxuICAgIEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoXG4gICAgICBjZWxsLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jaGlsZHJlbixcbiAgICAgIGNlbGwucGFyZW50Tm9kZSxcbiAgICApLFxuICBdO1xufVxuXG5mdW5jdGlvbiBnZXRDZWxsQ2xhc3NOYW1lKGNvb3JkaW5hdGVzLCBib2FyZCwgc2VjcmV0ID0gZmFsc2UpIHtcbiAgY29uc3QgY2VsbCA9IGJvYXJkLmNlbGxzW2Nvb3JkaW5hdGVzWzFdXVtjb29yZGluYXRlc1swXV07XG4gIHN3aXRjaCAoY2VsbCkge1xuICAgIGNhc2UgQ2VsbFN0YXRlLkVNUFRZOlxuICAgICAgcmV0dXJuIFwiZW1wdHlcIjtcbiAgICBjYXNlIENlbGxTdGF0ZS5NSVNTOlxuICAgICAgcmV0dXJuIFwibWlzc1wiO1xuICAgIGNhc2UgQ2VsbFN0YXRlLlNISVA6XG4gICAgICByZXR1cm4gc2VjcmV0ID8gXCJlbXB0eVwiIDogXCJzaGlwXCI7XG4gICAgY2FzZSBDZWxsU3RhdGUuSElUOlxuICAgICAgcmV0dXJuIFwiaGl0XCI7XG4gICAgY2FzZSBDZWxsU3RhdGUuU1VOSzpcbiAgICAgIHJldHVybiBcInN1bmtcIjtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ2VsbFN0YXRlIH0gZnJvbSBcIi4uL2NvcmUvZ2FtZUJvYXJkLmpzXCI7XG5pbXBvcnQgeyBQbGF5ZXJUeXBlIH0gZnJvbSBcIi4uL2NvcmUvcGxheWVyLmpzXCI7XG5pbXBvcnQgeyBnZXRDZWxsSW5kZXgsIHNldHVwR2FtZUJvYXJkcyB9IGZyb20gXCIuL2JvYXJkcy5qc1wiO1xuXG5leHBvcnQgY29uc3QgR2FtZU1vZGUgPSBPYmplY3QuZnJlZXplKHtcbiAgQ09NUFVURVI6IFwiY29tcHV0ZXJcIixcbiAgRlJJRU5EOiBcImZyaWVuZFwiLFxufSk7XG5cbmNvbnN0IGNvbXB1dGVyQXR0YWNrTW9kZSA9IE9iamVjdC5mcmVlemUoe1xuICBSQU5ET006IDAsXG4gIEFESkFDRU5UOiAxLFxuICBESVJFQ1RFRDogMixcbn0pO1xuXG5jb25zdCBhZGphY2VudENvb3JkaW5hdGVzID0gW1xuICBbMCwgLTFdLFxuICBbLTEsIDBdLFxuICBbMCwgMV0sXG4gIFsxLCAwXSxcbl07XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cEdhbWUocGxheWVyT25lLCBwbGF5ZXJUd28sIG1vZGUpIHtcbiAgbGV0IGhpdEluZm8gPSB7XG4gICAgYXR0YWNrTW9kZTogY29tcHV0ZXJBdHRhY2tNb2RlLlJBTkRPTSxcbiAgICBmaXJzdEhpdDogbnVsbCxcbiAgICBsYXN0SGl0OiBudWxsLFxuICAgIGRpcmVjdGlvbjogbnVsbCxcbiAgICBhZGphY2VudFRyaWVzOiAwLFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuYXR0YWNrTW9kZSA9IGNvbXB1dGVyQXR0YWNrTW9kZS5SQU5ET007XG4gICAgICB0aGlzLmZpcnN0SGl0ID0gbnVsbDtcbiAgICAgIHRoaXMubGF0ZXN0SGl0ID0gbnVsbDtcbiAgICAgIHRoaXMuZGlyZWN0aW9uID0gbnVsbDtcbiAgICAgIHRoaXMuYWRqYWNlbnRUcmllcyA9IDA7XG4gICAgfSxcblxuICAgIGluY3JlbWVudEFkamFjZW50VHJpZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuYWRqYWNlbnRUcmllcysrO1xuICAgIH0sXG4gIH07XG5cbiAgY29uc3QgZ2FtZSA9IHtcbiAgICBtb2RlLFxuXG4gICAgcGxheWVyczogW3BsYXllck9uZSwgcGxheWVyVHdvXSxcbiAgICBjdXJyZW50UGxheWVySW5kZXg6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpLFxuXG4gICAgaXNJblByb2dyZXNzOiBmYWxzZSxcbiAgICBpc0dhbWVPdmVyOiBmYWxzZSxcbiAgICBpc1BsYXllcldhaXRpbmc6IGZhbHNlLFxuXG4gICAgYm9hcmRzOiBbXSxcblxuICAgIHN0YXJ0OiBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmlzSW5Qcm9ncmVzcyA9IHRydWU7XG4gICAgICB0aGlzLmlzR2FtZU92ZXIgPSBmYWxzZTtcbiAgICAgIHRoaXMuaXNQbGF5ZXJXYWl0aW5nID0gZmFsc2U7XG5cbiAgICAgIHRoaXMuYm9hcmRzWzBdLmNsZWFyKCk7XG5cbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RhcnRcIikuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzZXRcIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYm9hcmQtaW5mb1wiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZWxwLWluZm9cIikuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYXR0YWNrLWluZm9cIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcm9vdFwiKS5jbGFzc0xpc3QuYWRkKFwiaW4tcHJvZ3Jlc3NcIik7XG5cbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYm9hcmQtY29udHJvbHNcIikuZm9yRWFjaCgoYm9hcmRDb250cm9scykgPT4ge1xuICAgICAgICBib2FyZENvbnRyb2xzLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICB9KTtcblxuICAgICAgYXdhaXQgdGhpcy5wbGF5KCk7XG4gICAgfSxcblxuICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBnYW1lT3ZlclNjcmVlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZS1vdmVyLXNjcmVlblwiKTtcbiAgICAgIGlmIChnYW1lT3ZlclNjcmVlbikgZ2FtZU92ZXJTY3JlZW4ucmVtb3ZlKCk7XG5cbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RhcnRcIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzZXRcIikuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYm9hcmQtaW5mb1wiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZWxwLWluZm9cIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYXR0YWNrLWluZm9cIikuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcm9vdFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaW4tcHJvZ3Jlc3NcIik7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jvb3RcIikuY2xhc3NMaXN0LnJlbW92ZShcImF0dGFjay1hbGxvd2VkXCIpO1xuXG4gICAgICB0aGlzLmlzSW5Qcm9ncmVzcyA9IGZhbHNlO1xuICAgICAgdGhpcy5pc0dhbWVPdmVyID0gdHJ1ZTtcbiAgICAgIHRoaXMuaXNQbGF5ZXJXYWl0aW5nID0gZmFsc2U7XG5cbiAgICAgIHRoaXMucGxheWVyc1swXS5ib2FyZC5yZXNldCgpO1xuICAgICAgdGhpcy5wbGF5ZXJzWzFdLmJvYXJkLnJlc2V0KCk7XG5cbiAgICAgIHRoaXMuYm9hcmRzID0gc2V0dXBHYW1lQm9hcmRzKHRoaXMsIHRoaXMucGxheWVyc1swXSwgdGhpcy5wbGF5ZXJzWzFdKTtcblxuICAgICAgdGhpcy5ib2FyZHNbMF0ucmFuZG9taXplRm9ybWF0aW9uKCk7XG4gICAgICB0aGlzLmJvYXJkc1sxXS5yYW5kb21pemVGb3JtYXRpb24oKTtcblxuICAgICAgY29uc3QgYm9hcmRzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ib2FyZHNcIik7XG4gICAgICBBcnJheS5mcm9tKGJvYXJkc0NvbnRhaW5lci5jaGlsZHJlbikuZm9yRWFjaCgoYm9hcmQpID0+IHtcbiAgICAgICAgYm9hcmRzQ29udGFpbmVyLnJlbW92ZUNoaWxkKGJvYXJkKTtcbiAgICAgIH0pO1xuICAgICAgYm9hcmRzQ29udGFpbmVyLmFwcGVuZChcbiAgICAgICAgdGhpcy5ib2FyZHNbMF0uY29tcG9uZW50LFxuICAgICAgICB0aGlzLmJvYXJkc1sxXS5jb21wb25lbnQsXG4gICAgICApO1xuICAgIH0sXG5cbiAgICBwbGF5OiBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgY3VycmVudFBsYXllciA9IHRoaXMucGxheWVyc1t0aGlzLmN1cnJlbnRQbGF5ZXJJbmRleF07XG4gICAgICBsZXQgbmV4dFBsYXllckluZGV4ID0gKHRoaXMuY3VycmVudFBsYXllckluZGV4ICsgMSkgJSAyO1xuICAgICAgbGV0IG5leHRQbGF5ZXIgPSB0aGlzLnBsYXllcnNbbmV4dFBsYXllckluZGV4XTtcblxuICAgICAgd2hpbGUgKCF0aGlzLmlzR2FtZU92ZXIpIHtcbiAgICAgICAgaWYgKGN1cnJlbnRQbGF5ZXIuYm9hcmQuaXNGbGVldERlc3Ryb3llZCgpKSB7XG4gICAgICAgICAgdGhpcy5pc0dhbWVPdmVyID0gdHJ1ZTtcblxuICAgICAgICAgIHRoaXMuYm9hcmRzWyh0aGlzLmN1cnJlbnRQbGF5ZXJJbmRleCArIDEpICUgMl0uY29tcG9uZW50LmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgY3JlYXRlR2FtZU92ZXJTY3JlZW4oY3VycmVudFBsYXllciwgbmV4dFBsYXllciwgdGhpcyksXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYm9hcmQtaW5mb1wiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNQbGF5ZXJXYWl0aW5nKSB7XG4gICAgICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwKSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb290XCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJhdHRhY2stYWxsb3dlZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGN1cnJlbnRQbGF5ZXIgPSB0aGlzLnBsYXllcnNbdGhpcy5jdXJyZW50UGxheWVySW5kZXhdO1xuICAgICAgICBuZXh0UGxheWVySW5kZXggPSAodGhpcy5jdXJyZW50UGxheWVySW5kZXggKyAxKSAlIDI7XG4gICAgICAgIG5leHRQbGF5ZXIgPSB0aGlzLnBsYXllcnNbbmV4dFBsYXllckluZGV4XTtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGAuYm9hcmQtJHt0aGlzLmN1cnJlbnRQbGF5ZXJJbmRleCA9PT0gMCA/IFwidHdvXCIgOiBcIm9uZVwifS1pbmZvYCxcbiAgICAgICAgKS50ZXh0Q29udGVudCA9XG4gICAgICAgICAgYCR7bmV4dFBsYXllci50eXBlID09PSBQbGF5ZXJUeXBlLkNPTVBVVEVSID8gXCJZb3VyXCIgOiBjdXJyZW50UGxheWVyLm5hbWUgKyBcIidzXCJ9IHR1cm5gO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGAuYm9hcmQtJHt0aGlzLmN1cnJlbnRQbGF5ZXJJbmRleCA9PT0gMCA/IFwib25lXCIgOiBcInR3b1wifS1pbmZvYCxcbiAgICAgICAgKS50ZXh0Q29udGVudCA9IFwiXCI7XG5cbiAgICAgICAgdGhpcy5ib2FyZHNbdGhpcy5jdXJyZW50UGxheWVySW5kZXhdLmNvbXBvbmVudC5jbGFzc0xpc3QucmVtb3ZlKFxuICAgICAgICAgIFwiYWN0aXZlXCIsXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYm9hcmRzW3RoaXMuY3VycmVudFBsYXllckluZGV4XS5jb21wb25lbnQuY2xhc3NMaXN0LmFkZChcbiAgICAgICAgICBcImF0dGFja2luZ1wiLFxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuYm9hcmRzW25leHRQbGF5ZXJJbmRleF0uY29tcG9uZW50LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgICAgIHRoaXMuYm9hcmRzW25leHRQbGF5ZXJJbmRleF0uY29tcG9uZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJhdHRhY2tpbmdcIik7XG5cbiAgICAgICAgdGhpcy5ib2FyZHNbdGhpcy5jdXJyZW50UGxheWVySW5kZXhdLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmJvYXJkc1tuZXh0UGxheWVySW5kZXhdLmFjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRQbGF5ZXIudHlwZSA9PT0gUGxheWVyVHlwZS5DT01QVVRFUiAmJiAhdGhpcy5pc0dhbWVPdmVyKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5jb21wdXRlckF0dGFjayh0aGlzLmN1cnJlbnRQbGF5ZXJJbmRleCwgbmV4dFBsYXllckluZGV4KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmlzUGxheWVyV2FpdGluZyA9IHRydWU7XG5cbiAgICAgICAgICBpZiAobmV4dFBsYXllci50eXBlICE9PSBQbGF5ZXJUeXBlLkNPTVBVVEVSKSB7XG4gICAgICAgICAgICB0aGlzLmJvYXJkc1tuZXh0UGxheWVySW5kZXhdLmNvbXBvbmVudC5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgICAgY3JlYXRlUGFzc2luZ1NjcmVlbih0aGlzLnBsYXllcnMsIHRoaXMuY3VycmVudFBsYXllckluZGV4KSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLmJvYXJkc1tuZXh0UGxheWVySW5kZXhdLnJlbmRlcigpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcm9vdFwiKS5jbGFzc0xpc3QuYWRkKFwiYXR0YWNrLWFsbG93ZWRcIik7XG5cbiAgICAgICAgICBpZiAobmV4dFBsYXllci50eXBlICE9PSBQbGF5ZXJUeXBlLkNPTVBVVEVSKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jvb3RcIikuY2xhc3NMaXN0LmFkZChcInBhc3NpbmdcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jdXJyZW50UGxheWVySW5kZXggPSBuZXh0UGxheWVySW5kZXg7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGNvbXB1dGVyQXR0YWNrOiBhc3luYyBmdW5jdGlvbiAoYXR0YWNrZXIsIHJlY2VpdmVyKSB7XG4gICAgICBjb25zdCBET01Cb2FyZCA9IHRoaXMuYm9hcmRzW3JlY2VpdmVyXTtcblxuICAgICAgbGV0IHgsIHk7XG5cbiAgICAgIGxldCB2YWxpZCA9IGZhbHNlO1xuICAgICAgbGV0IGl0ZXJhdGlvbnMgPSAwO1xuICAgICAgd2hpbGUgKCF2YWxpZCkge1xuICAgICAgICBpZiAoaGl0SW5mby5hdHRhY2tNb2RlID09PSBjb21wdXRlckF0dGFja01vZGUuUkFORE9NKSB7XG4gICAgICAgICAgaGl0SW5mby5yZXNldCgpO1xuXG4gICAgICAgICAgY29uc3QgaGl0U3F1YXJlcyA9IERPTUJvYXJkLmNvbXBvbmVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNlbGwuaGl0XCIpO1xuICAgICAgICAgIGlmIChoaXRTcXVhcmVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RIaXRTcXVhcmUgPSBoaXRTcXVhcmVzW2hpdFNxdWFyZXMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBoaXRJbmZvLmZpcnN0SGl0ID0gZ2V0Q2VsbEluZGV4KGxhc3RIaXRTcXVhcmUpO1xuICAgICAgICAgICAgaGl0SW5mby5hdHRhY2tNb2RlID0gY29tcHV0ZXJBdHRhY2tNb2RlLkFESkFDRU5UO1xuICAgICAgICAgICAgaXRlcmF0aW9ucysrO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIERPTUJvYXJkLmJvYXJkLnNpemUpO1xuICAgICAgICAgIHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBET01Cb2FyZC5ib2FyZC5zaXplKTtcbiAgICAgICAgfSBlbHNlIGlmIChoaXRJbmZvLmF0dGFja01vZGUgPT09IGNvbXB1dGVyQXR0YWNrTW9kZS5BREpBQ0VOVCkge1xuICAgICAgICAgIGlmIChoaXRJbmZvLmFkamFjZW50VHJpZXMgPj0gNCkge1xuICAgICAgICAgICAgaGl0SW5mby5yZXNldCgpO1xuICAgICAgICAgICAgaXRlcmF0aW9ucysrO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgeCA9XG4gICAgICAgICAgICBoaXRJbmZvLmZpcnN0SGl0WzBdICsgYWRqYWNlbnRDb29yZGluYXRlc1toaXRJbmZvLmFkamFjZW50VHJpZXNdWzBdO1xuICAgICAgICAgIHkgPVxuICAgICAgICAgICAgaGl0SW5mby5maXJzdEhpdFsxXSArIGFkamFjZW50Q29vcmRpbmF0ZXNbaGl0SW5mby5hZGphY2VudFRyaWVzXVsxXTtcbiAgICAgICAgfSBlbHNlIGlmIChoaXRJbmZvLmF0dGFja01vZGUgPT09IGNvbXB1dGVyQXR0YWNrTW9kZS5ESVJFQ1RFRCkge1xuICAgICAgICAgIHggPSBoaXRJbmZvLmxhc3RIaXRbMF0gKyBoaXRJbmZvLmRpcmVjdGlvblswXTtcbiAgICAgICAgICB5ID0gaGl0SW5mby5sYXN0SGl0WzFdICsgaGl0SW5mby5kaXJlY3Rpb25bMV07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXG4gICAgICAgICAgeCA8IDAgfHxcbiAgICAgICAgICB5IDwgMCB8fFxuICAgICAgICAgIHggPj0gRE9NQm9hcmQuYm9hcmQuc2l6ZSB8fFxuICAgICAgICAgIHkgPj0gRE9NQm9hcmQuYm9hcmQuc2l6ZVxuICAgICAgICApIHtcbiAgICAgICAgICBpZiAoaGl0SW5mby5hdHRhY2tNb2RlID09PSBjb21wdXRlckF0dGFja01vZGUuQURKQUNFTlQpIHtcbiAgICAgICAgICAgIGhpdEluZm8uaW5jcmVtZW50QWRqYWNlbnRUcmllcygpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaGl0SW5mby5hdHRhY2tNb2RlID09PSBjb21wdXRlckF0dGFja01vZGUuRElSRUNURUQpIHtcbiAgICAgICAgICAgIGhpdEluZm8ubGFzdEhpdCA9IG51bGw7XG4gICAgICAgICAgICBoaXRJbmZvLmRpcmVjdGlvbiA9IG51bGw7XG4gICAgICAgICAgICBoaXRJbmZvLmFkamFjZW50VHJpZXMgPSAwO1xuICAgICAgICAgICAgaGl0SW5mby5hdHRhY2tNb2RlID0gY29tcHV0ZXJBdHRhY2tNb2RlLkFESkFDRU5UO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpdGVyYXRpb25zKys7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjZWxsID0gRE9NQm9hcmQuY29tcG9uZW50LmNoaWxkcmVuWzFdLmNoaWxkcmVuW3ldLmNoaWxkcmVuW3hdO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJtaXNzXCIpIHx8XG4gICAgICAgICAgY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJzdW5rXCIpXG4gICAgICAgICkge1xuICAgICAgICAgIHN3aXRjaCAoaGl0SW5mby5hdHRhY2tNb2RlKSB7XG4gICAgICAgICAgICBjYXNlIGNvbXB1dGVyQXR0YWNrTW9kZS5BREpBQ0VOVDpcbiAgICAgICAgICAgICAgaGl0SW5mby5pbmNyZW1lbnRBZGphY2VudFRyaWVzKCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjb21wdXRlckF0dGFja01vZGUuRElSRUNURUQ6XG4gICAgICAgICAgICAgIGhpdEluZm8ubGFzdEhpdCA9IG51bGw7XG4gICAgICAgICAgICAgIGhpdEluZm8uZGlyZWN0aW9uID0gbnVsbDtcbiAgICAgICAgICAgICAgaGl0SW5mby5hZGphY2VudFRyaWVzID0gMDtcbiAgICAgICAgICAgICAgaGl0SW5mby5hdHRhY2tNb2RlID0gY29tcHV0ZXJBdHRhY2tNb2RlLkFESkFDRU5UO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJoaXRcIikpIHtcbiAgICAgICAgICBzd2l0Y2ggKGhpdEluZm8uYXR0YWNrTW9kZSkge1xuICAgICAgICAgICAgY2FzZSBjb21wdXRlckF0dGFja01vZGUuUkFORE9NOlxuICAgICAgICAgICAgICBoaXRJbmZvLnJlc2V0KCk7XG4gICAgICAgICAgICAgIGhpdEluZm8uZmlyc3RIaXQgPSBbeCwgeV07XG4gICAgICAgICAgICAgIGhpdEluZm8uYXR0YWNrTW9kZSA9IGNvbXB1dGVyQXR0YWNrTW9kZS5BREpBQ0VOVDtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNvbXB1dGVyQXR0YWNrTW9kZS5BREpBQ0VOVDpcbiAgICAgICAgICAgICAgaGl0SW5mby5pbmNyZW1lbnRBZGphY2VudFRyaWVzKCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGl0ZXJhdGlvbnMrKztcbiAgICAgICAgaWYgKGl0ZXJhdGlvbnMgPiAyNTApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICBgSW5maW5pdGUgbG9vcCB3aGlsZSB0cnlpbmcgdG8gY2FsY3VsYXRlIGF0dGFjayBjb29yZGluYXRlLlxcbkF0dGFjayBNb2RlOiAke2hpdEluZm8uYXR0YWNrTW9kZX1cXG5MYXN0IHRyaWVkIGNvb3JkaW5hdGVzOiBbJHt4fSwgJHt5fV1gLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHIpID0+IHNldFRpbWVvdXQociwgODAwKSk7XG5cbiAgICAgIGNvbnN0IGF0dGFjayA9IERPTUJvYXJkLnJlY2VpdmVBdHRhY2soW3gsIHldKTtcblxuICAgICAgY29uc29sZS5sb2coaGl0SW5mby5hdHRhY2tNb2RlLCBhdHRhY2sucmVzdWx0KTtcbiAgICAgIHN3aXRjaCAoYXR0YWNrLnJlc3VsdCkge1xuICAgICAgICBjYXNlIENlbGxTdGF0ZS5NSVNTOlxuICAgICAgICAgIHN3aXRjaCAoaGl0SW5mby5hdHRhY2tNb2RlKSB7XG4gICAgICAgICAgICBjYXNlIGNvbXB1dGVyQXR0YWNrTW9kZS5BREpBQ0VOVDpcbiAgICAgICAgICAgICAgaGl0SW5mby5pbmNyZW1lbnRBZGphY2VudFRyaWVzKCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjb21wdXRlckF0dGFja01vZGUuRElSRUNURUQ6XG4gICAgICAgICAgICAgIGhpdEluZm8ubGFzdEhpdCA9IG51bGw7XG4gICAgICAgICAgICAgIGhpdEluZm8uZGlyZWN0aW9uID0gbnVsbDtcbiAgICAgICAgICAgICAgaGl0SW5mby5hZGphY2VudFRyaWVzID0gMDtcbiAgICAgICAgICAgICAgaGl0SW5mby5hdHRhY2tNb2RlID0gY29tcHV0ZXJBdHRhY2tNb2RlLkFESkFDRU5UO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgQ2VsbFN0YXRlLkhJVDpcbiAgICAgICAgICBzd2l0Y2ggKGhpdEluZm8uYXR0YWNrTW9kZSkge1xuICAgICAgICAgICAgY2FzZSBjb21wdXRlckF0dGFja01vZGUuUkFORE9NOlxuICAgICAgICAgICAgICBoaXRJbmZvLmZpcnN0SGl0ID0gW3gsIHldO1xuICAgICAgICAgICAgICBoaXRJbmZvLmF0dGFja01vZGUgPSBjb21wdXRlckF0dGFja01vZGUuQURKQUNFTlQ7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjb21wdXRlckF0dGFja01vZGUuQURKQUNFTlQ6XG4gICAgICAgICAgICAgIGhpdEluZm8ubGFzdEhpdCA9IFt4LCB5XTtcbiAgICAgICAgICAgICAgaGl0SW5mby5kaXJlY3Rpb24gPSBbXG4gICAgICAgICAgICAgICAgeCAtIGhpdEluZm8uZmlyc3RIaXRbMF0sXG4gICAgICAgICAgICAgICAgeSAtIGhpdEluZm8uZmlyc3RIaXRbMV0sXG4gICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgIGhpdEluZm8uYXR0YWNrTW9kZSA9IGNvbXB1dGVyQXR0YWNrTW9kZS5ESVJFQ1RFRDtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNvbXB1dGVyQXR0YWNrTW9kZS5ESVJFQ1RFRDpcbiAgICAgICAgICAgICAgaGl0SW5mby5sYXN0SGl0ID0gW3gsIHldO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBDZWxsU3RhdGUuU1VOSzpcbiAgICAgICAgICBoaXRJbmZvLnJlc2V0KCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHRoaXMudXBkYXRlQXR0YWNrSW5mbyhhdHRhY2sucmVzdWx0LCBhdHRhY2suc2hpcCwgYXR0YWNrZXIpO1xuICAgIH0sXG5cbiAgICB1cGRhdGVBdHRhY2tJbmZvOiBmdW5jdGlvbiAoYXR0YWNrVHlwZSwgc2hpcCwgYXR0YWNrZXJJbmRleCkge1xuICAgICAgY29uc3QgYXR0YWNrSW5mbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYXR0YWNrLWluZm9cIik7XG4gICAgICBjb25zdCBhdHRhY2tlciA9IHRoaXMucGxheWVyc1thdHRhY2tlckluZGV4XS5uYW1lO1xuICAgICAgY29uc3QgcmVjZWl2ZXIgPSB0aGlzLnBsYXllcnNbKGF0dGFja2VySW5kZXggKyAxKSAlIDJdLm5hbWU7XG5cbiAgICAgIHN3aXRjaCAoYXR0YWNrVHlwZSkge1xuICAgICAgICBjYXNlIENlbGxTdGF0ZS5NSVNTOlxuICAgICAgICAgIGF0dGFja0luZm8udGV4dENvbnRlbnQgPSBgJHthdHRhY2tlcn0gbWlzc2VzIHRoZWlyIHNob3RgO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIENlbGxTdGF0ZS5ISVQ6XG4gICAgICAgICAgYXR0YWNrSW5mby50ZXh0Q29udGVudCA9IGAke2F0dGFja2VyfSBoaXRzIG9uZSBvZiAke3JlY2VpdmVyfSdzIHNoaXBzYDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBDZWxsU3RhdGUuU1VOSzpcbiAgICAgICAgICBhdHRhY2tJbmZvLnRleHRDb250ZW50ID0gYCR7YXR0YWNrZXJ9IHNpbmtzICR7cmVjZWl2ZXJ9J3MgJHtzaGlwLnR5cGV9YDtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9LFxuICB9O1xuXG4gIGdhbWUuYm9hcmRzID0gc2V0dXBHYW1lQm9hcmRzKGdhbWUsIHBsYXllck9uZSwgcGxheWVyVHdvKTtcblxuICByZXR1cm4gZ2FtZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlR2FtZU92ZXJTY3JlZW4oY3VycmVudFBsYXllciwgbmV4dFBsYXllciwgZ2FtZSkge1xuICBjb25zdCBnYW1lT3ZlclNjcmVlbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGdhbWVPdmVyU2NyZWVuLmNsYXNzTGlzdC5hZGQoXCJnYW1lLW92ZXItc2NyZWVuXCIpO1xuXG4gIGxldCBnYW1lT3Zlck1lc3NhZ2U7XG4gIGlmIChjdXJyZW50UGxheWVyLnR5cGUgPT09IFBsYXllclR5cGUuQ09NUFVURVIpIHtcbiAgICBnYW1lT3Zlck1lc3NhZ2UgPSBcIllPVSBXT04gVEhFIEdBTUUhXCI7XG4gIH0gZWxzZSBpZiAobmV4dFBsYXllci50eXBlID09PSBQbGF5ZXJUeXBlLkNPTVBVVEVSKSB7XG4gICAgZ2FtZU92ZXJNZXNzYWdlID0gXCJZT1UgTE9TVCBUSEUgR0FNRSFcIjtcbiAgfSBlbHNlIHtcbiAgICBnYW1lT3Zlck1lc3NhZ2UgPSBgJHtuZXh0UGxheWVyLm5hbWUudG9VcHBlckNhc2UoKX0gV09OIFRIRSBHQU1FIWA7XG4gIH1cblxuICBnYW1lT3ZlclNjcmVlbi5pbm5lckhUTUwgPSBgPHA+JHtnYW1lT3Zlck1lc3NhZ2V9PC9wPmA7XG5cbiAgY29uc3Qgb3V0ZXJSZXNldEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzZXRcIik7XG4gIGlmIChvdXRlclJlc2V0QnV0dG9uKSBvdXRlclJlc2V0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG5cbiAgY29uc3QgcmVzZXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICByZXNldEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwicmVzZXRcIik7XG4gIHJlc2V0QnV0dG9uLnRleHRDb250ZW50ID0gXCJQbGF5IEFnYWluXCI7XG4gIHJlc2V0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBnYW1lLnJlc2V0KCkpO1xuICBnYW1lT3ZlclNjcmVlbi5hcHBlbmRDaGlsZChyZXNldEJ1dHRvbik7XG5cbiAgY29uc3QgcGFzc2luZ1NjcmVlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGFzc2luZy1zY3JlZW5cIik7XG4gIGlmIChwYXNzaW5nU2NyZWVuKSBwYXNzaW5nU2NyZWVuLnJlbW92ZSgpO1xuXG4gIHJldHVybiBnYW1lT3ZlclNjcmVlbjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUGFzc2luZ1NjcmVlbihwbGF5ZXJzLCBjdXJyZW50UGxheWVyKSB7XG4gIGNvbnN0IHBhc3NpbmdTY3JlZW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBwYXNzaW5nU2NyZWVuLmNsYXNzTGlzdC5hZGQoXCJwYXNzaW5nLXNjcmVlblwiKTtcbiAgcGFzc2luZ1NjcmVlbi5pbm5lckhUTUwgPSBgXG4gICAgPHA+UGFzcyB0aGUgZGV2aWNlIHRvICR7cGxheWVyc1tjdXJyZW50UGxheWVyXS5uYW1lfTwvcD5cbiAgYDtcbiAgY29uc3QgY29udGludWVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBjb250aW51ZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiQ29udGludWVcIjtcbiAgY29udGludWVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBwYXNzaW5nU2NyZWVuLnJlbW92ZSgpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGFzc2luZ1wiKS5jbGFzc0xpc3QucmVtb3ZlKFwicGFzc2luZ1wiKTtcbiAgfSk7XG4gIHBhc3NpbmdTY3JlZW4uYXBwZW5kQ2hpbGQoY29udGludWVCdXR0b24pO1xuICByZXR1cm4gcGFzc2luZ1NjcmVlbjtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBjcmVhdGVHYW1lUGFnZShnYW1lKSB7XG4gIGNvbnN0IGdhbWVQYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZ2FtZVBhZ2UuY2xhc3NMaXN0LmFkZChcImdhbWUtcGFnZVwiLCBcInBhZ2VcIik7XG5cbiAgZ2FtZVBhZ2UuaW5uZXJIVE1MID0gYFxuICAgIDxkaXYgY2xhc3M9XCJib2FyZHNcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiaW5mb1wiPlxuICAgICAgPGRpdiBjbGFzcz1cImJvYXJkLWluZm8gaGlkZGVuXCI+XG4gICAgICAgIDxwIGNsYXNzPVwiYm9hcmQtb25lLWluZm9cIj48L3A+XG4gICAgICAgIDxwIGNsYXNzPVwiYm9hcmQtdHdvLWluZm9cIj48L3A+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJnYW1lLWluZm9cIj5cbiAgICAgICAgPHAgY2xhc3M9XCJoZWxwLWluZm9cIj7ik5ggUmVhcnJhbmdlIHRoZSBzaGlwcyB0byB5b3VyIGxpa2luZyBieSBwcmVzc2luZyB0aGUgZWRpdCBidXR0b24sIG9yIGJ5IHJlZnJlc2hpbmcgdGhlIGJvYXJkPC9wPlxuICAgICAgICA8cCBjbGFzcz1cImF0dGFjay1pbmZvIGhpZGRlblwiPjwvcD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJjb250cm9sc1wiPlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cInN0YXJ0XCI+U3RhcnQgR2FtZTwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cInJlc2V0IGhpZGRlblwiPlJlc2V0IEdhbWU8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgYDtcblxuICBjb25zdCBib2FyZHNDb250YWluZXIgPSBnYW1lUGFnZS5xdWVyeVNlbGVjdG9yKFwiLmJvYXJkc1wiKTtcbiAgYm9hcmRzQ29udGFpbmVyLmFwcGVuZChnYW1lLmJvYXJkc1swXS5jb21wb25lbnQsIGdhbWUuYm9hcmRzWzFdLmNvbXBvbmVudCk7XG5cbiAgY29uc3Qgc3RhcnRCdXR0b24gPSBnYW1lUGFnZS5xdWVyeVNlbGVjdG9yKFwiLnN0YXJ0XCIpO1xuICBzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGlmIChnYW1lUGFnZS5xdWVyeVNlbGVjdG9yKFwiLmVkaXRpbmdcIikpIHtcbiAgICAgIGFsZXJ0KFwiUGxlYXNlIHNhdmUgeW91ciBib2FyZHMgYmVmb3JlIHN0YXJ0aW5nIHRoZSBnYW1lXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGdhbWUuc3RhcnQoKTtcbiAgfSk7XG5cbiAgY29uc3QgcmVzZXRCdXR0b24gPSBnYW1lUGFnZS5xdWVyeVNlbGVjdG9yKFwiLnJlc2V0XCIpO1xuICByZXNldEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGdhbWUucmVzZXQoKTtcbiAgfSk7XG5cbiAgZ2FtZS5ib2FyZHNbMF0ucmVuZGVyKCk7XG4gIGdhbWUuYm9hcmRzWzFdLnJlbmRlcigpO1xuXG4gIHJldHVybiBnYW1lUGFnZTtcbn1cbiIsImltcG9ydCBlZGl0U3ZnIGZyb20gXCIuLi8uLi8uLi9hc3NldHMvZWRpdC5zdmdcIjtcbmltcG9ydCByZWZyZXNoU3ZnIGZyb20gXCIuLi8uLi8uLi9hc3NldHMvcmVmcmVzaC1jY3cuc3ZnXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVIZWxwUGFnZSgpIHtcbiAgY29uc3QgaGVscFBhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBoZWxwUGFnZS5jbGFzc0xpc3QuYWRkKFwiaGVscC1wYWdlXCIsIFwicGFnZVwiKTtcblxuICBoZWxwUGFnZS5pbm5lckhUTUwgPSBgXG4gICAgPGgxPkhvdyB0byBQbGF5PC9oMT5cbiAgICA8c2VjdGlvbj5cbiAgICAgIDxoMz5DaG9vc2UgR2FtZSBNb2RlPC9oMz5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxwPlxuICAgICAgICAgIEJ5IGRlZmF1bHQsIHlvdSdsbCBiZSBwbGF5aW5nIGFnYWluc3QgdGhlIGNvbXB1dGVyLlxuICAgICAgICAgIElmIHlvdSB3YW50IHRvIHBsYXkgd2l0aCBhIGZyaWVuZCwgY2hvb3NlIHRoZSBcIkZyaWVuZFwiIG9wdGlvbiBpbiB0aGUgb3Bwb25lbnQgc2VjdGlvbixcbiAgICAgICAgICBhbmQgcGxheSBieSBwYXNzaW5nIGFyb3VuZCB5b3VyIGRldmljZS5cbiAgICAgICAgPC9wPlxuICAgICAgPC9kaXY+XG4gICAgPC9zZWN0aW9uPlxuICAgIDxzZWN0aW9uPlxuICAgICAgPGgzPkVkaXQgeW91ciBib2FyZChzKTwvaDM+XG4gICAgICA8ZGl2PlxuICAgICAgICA8dWw+XG4gICAgICAgICAgPGxpPkNsaWNrIG9uIHRoZSBlZGl0IGJ1dHRvbiAoPGltZyBjbGFzcz1cImVkaXQtaW1nXCIgLz4pIHRvIGNoYW5nZSB0aGUgbmFtZXMgb2YgdGhlIHBsYXllcnMsIGFuZCBtb3ZlIGFyb3VuZCB5b3VyIHNoaXBzICh1c2luZyBhcnJvdyBrZXlzKS48L2xpPlxuICAgICAgICAgIDxsaT5Zb3UgY2FuIGFsc28gY2xpY2sgdGhlIHJlZnJlc2ggYnV0dG9uICg8aW1nIGNsYXNzPVwicmVmcmVzaC1pbWdcIiAvPikgdG8gcmFuZG9taXplIHRoZSBwbGFjZW1lbnQgb2Ygc2hpcHMgaW4gdGhlIGJvYXJkLjwvbGk+XG4gICAgICAgIDwvdWw+XG4gICAgICA8L2Rpdj5cbiAgICA8L3NlY3Rpb24+XG4gICAgPHNlY3Rpb24+XG4gICAgICA8aDM+U3RhcnQgcGxheWluZyE8L2gzPlxuICAgICAgPGRpdj5cbiAgICAgICAgPHA+XG4gICAgICAgIFByZXNzIG9uIFwiPGI+U3RhcnQgR2FtZTwvYj5cIiB0byBzdGFydCBwbGF5aW5nLlxuICAgICAgICBJZiB5b3UgYXJlIG5vdCBmYW1pbGlhciB3aXRoIDxhIGhyZWY9XCJodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9CYXR0bGVzaGlwXyhnYW1lKVwiPmJhdHRsZXNoaXA8L2E+LCBoZXJlJ3MgYSBxdWljayBydW4tdGhyb3VnaCBvZiB0aGUgbWVjaGFuaWNzOlxuICAgICAgICA8L3A+XG4gICAgICAgIDx1bD5cbiAgICAgICAgICA8bGk+SXQgaXMgYSB0d28tcGxheWVyIGdhbWUsIHdpdGggZWFjaCBwbGF5ZXIgaGF2aW5nIGEgYm9hcmQgd2l0aCBzaGlwcyBhcnJhbmdlZCBvbiBpdCBhY2NvcmRpbmcgdG8gdGhlaXIgd2lzaGVzLjwvbGk+XG4gICAgICAgICAgPGxpPlxuICAgICAgICAgICAgVGhlcmUgYXJlIDUgc2hpcHMgb2YgdmFyeWluZyBsZW5ndGhzOiBcbiAgICAgICAgICAgIDx0YWJsZT5cbiAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0aD5TaGlwPC90aD5cbiAgICAgICAgICAgICAgICA8dGg+U2l6ZTwvdGg+XG4gICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICA8dGQ+Q2FycmllcjwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkPjU8L3RkPlxuICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRkPkJhdHRsZXNoaXA8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZD40PC90ZD5cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0ZD5EZXN0cm95ZXI8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZD4zPC90ZD5cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0ZD5TdWJtYXJpbmU8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZD4zPC90ZD5cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0ZD5QYXRyb2wgQm9hdDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkPjI8L3RkPlxuICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgIEVhY2ggcGxheWVyIHRha2VzIHR1cm5zIHNob290aW5nIGEgc3F1YXJlIG9uIHRoZSBvdGhlciBwbGF5ZXIncyBib2FyZC5cbiAgICAgICAgICAgIFRoZXkgaGF2ZSBubyBpbmZvcm1hdGlvbiBvbiB3aGV0aGVyIHRoZXJlIGlzIGEgc2hpcCBvbiB0aGF0IHNxdWFyZSBvciBub3QuXG4gICAgICAgICAgICBBZnRlciBlYWNoIHRyeSwgdGhleSB3aWxsIGJlIGluZm9ybWVkIHdoZXRoZXIgdGhleSBoYWQgaGl0IGEgc2hpcCBvciBtaXNzZWQgdGhlaXIgc2hvdC5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICAgIDxsaT5BZnRlciBhbGwgdGhlIHNxdWFyZXMgb2YgYSBwYXJ0aWN1bGFyIHNoaXAgaXMgaGl0LCBpdCB3aWxsIGJlIG1hcmtlZCAoYW5kIGluZm9ybWVkIHRvIHRoZSBzaG9vdGluZyBwbGF5ZXIpIGFzIHN1bmsuPC9saT5cbiAgICAgICAgICA8bGk+QWZ0ZXIgYWxsIHRoZSBzaGlwcyBvZiBhIHBhcnRpY3VsYXIgYm9hcmQgaXMgc3VuaywgdGhhdCBwbGF5ZXIgbG9zZXMgdGhlIGdhbWUsIGFuZCB0aGUgc2hvb3RpbmcgcGxheWVyIHdpbnMuPC9saT5cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuICAgIDwvc2VjdGlvbj5cbiAgICA8aDEgY2xhc3M9XCJ0aGFua3NcIj5UaGFua3MgZm9yIFBsYXlpbmchPC9oMT5cbiAgYDtcblxuICBoZWxwUGFnZS5xdWVyeVNlbGVjdG9yKFwiLmVkaXQtaW1nXCIpLnNyYyA9IGVkaXRTdmc7XG4gIGhlbHBQYWdlLnF1ZXJ5U2VsZWN0b3IoXCIucmVmcmVzaC1pbWdcIikuc3JjID0gcmVmcmVzaFN2ZztcblxuICByZXR1cm4gaGVscFBhZ2U7XG59XG4iLCJpbXBvcnQgeyBjcmVhdGVQbGF5ZXIsIFBsYXllclR5cGUgfSBmcm9tIFwiLi4vLi4vY29yZS9wbGF5ZXIuanNcIjtcbmltcG9ydCB7IEdhbWVNb2RlLCBzZXR1cEdhbWUgfSBmcm9tIFwiLi4vZ2FtZS5qc1wiO1xuaW1wb3J0IHsgY3JlYXRlR2FtZVBhZ2UgfSBmcm9tIFwiLi9nYW1lLmpzXCI7XG5pbXBvcnQgeyBjcmVhdGVIZWxwUGFnZSB9IGZyb20gXCIuL2hlbHAuanNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUhvbWVQYWdlKCkge1xuICBsZXQgZ2FtZU1vZGUgPSBHYW1lTW9kZS5DT01QVVRFUjtcblxuICBjb25zdCBob21lUGFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGhvbWVQYWdlLmNsYXNzTGlzdC5hZGQoXCJob21lLXBhZ2VcIiwgXCJwYWdlXCIpO1xuXG4gIGhvbWVQYWdlLmlubmVySFRNTCA9IGBcbiAgICA8ZGl2IGNsYXNzPVwib3Bwb25lbnRcIj5cbiAgICAgIDxwPk9wcG9uZW50OiA8L3A+XG4gICAgICA8ZGl2IGNsYXNzPVwib3B0aW9uc1wiPlxuICAgICAgICA8cCBjbGFzcz1cIm9wcG9uZW50LWNvbXB1dGVyIGFjdGl2ZS1tb2RlXCI+Q29tcHV0ZXI8L3A+XG4gICAgICAgIDxwIGNsYXNzPVwib3Bwb25lbnQtZnJpZW5kXCI+RnJpZW5kPC9wPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPCEtLSA8YSBjbGFzcz1cImhlbHAtbGlua1wiPkhvdyB0byBQbGF5PC9hPiAtLT5cbiAgICA8ZGl2IGNsYXNzPVwiY29udHJvbHNcIj5cbiAgICAgIDxidXR0b24gY2xhc3M9XCJwbGF5XCI+UGxheSBHYW1lPC9idXR0b24+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwiaGVscFwiPkhvdyB0byBQbGF5PC9idXR0b24+XG4gICAgICA8IS0tIDxidXR0b24gY2xhc3M9XCJyZXNldCBoaWRkZW5cIj5SZXNldCBHYW1lPC9idXR0b24+IC0tPlxuICAgIDwvZGl2PlxuICBgO1xuXG4gIGNvbnN0IGNvbXB1dGVyT3Bwb25lbnRCdXR0b24gPSBob21lUGFnZS5xdWVyeVNlbGVjdG9yKFwiLm9wcG9uZW50LWNvbXB1dGVyXCIpO1xuICBjb21wdXRlck9wcG9uZW50QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgaWYgKGNvbXB1dGVyT3Bwb25lbnRCdXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlLW1vZGVcIikpIHJldHVybjtcblxuICAgIGNvbXB1dGVyT3Bwb25lbnRCdXR0b24uY2xhc3NMaXN0LmFkZChcImFjdGl2ZS1tb2RlXCIpO1xuICAgIGZyaWVuZE9wcG9uZW50QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmUtbW9kZVwiKTtcbiAgICBnYW1lTW9kZSA9IEdhbWVNb2RlLkNPTVBVVEVSO1xuICB9KTtcblxuICBjb25zdCBmcmllbmRPcHBvbmVudEJ1dHRvbiA9IGhvbWVQYWdlLnF1ZXJ5U2VsZWN0b3IoXCIub3Bwb25lbnQtZnJpZW5kXCIpO1xuICBmcmllbmRPcHBvbmVudEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGlmIChmcmllbmRPcHBvbmVudEJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmUtbW9kZVwiKSkgcmV0dXJuO1xuXG4gICAgZnJpZW5kT3Bwb25lbnRCdXR0b24uY2xhc3NMaXN0LmFkZChcImFjdGl2ZS1tb2RlXCIpO1xuICAgIGNvbXB1dGVyT3Bwb25lbnRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZS1tb2RlXCIpO1xuICAgIGdhbWVNb2RlID0gR2FtZU1vZGUuRlJJRU5EO1xuICB9KTtcblxuICBjb25zdCBwbGF5QnV0dG9uID0gaG9tZVBhZ2UucXVlcnlTZWxlY3RvcihcIi5wbGF5XCIpO1xuICBwbGF5QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGdhbWU7XG4gICAgaWYgKGdhbWVNb2RlID09PSBHYW1lTW9kZS5DT01QVVRFUikge1xuICAgICAgZ2FtZSA9IHNldHVwR2FtZShcbiAgICAgICAgY3JlYXRlUGxheWVyKFwiUGxheWVyXCIsIFBsYXllclR5cGUuSFVNQU4sIDEwKSxcbiAgICAgICAgY3JlYXRlUGxheWVyKFwiQ29tcHV0ZXJcIiwgUGxheWVyVHlwZS5DT01QVVRFUiwgMTApLFxuICAgICAgKTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcm9vdFwiKS5jbGFzc0xpc3QuYWRkKFwidnMtY29tcHV0ZXJcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdhbWUgPSBzZXR1cEdhbWUoXG4gICAgICAgIGNyZWF0ZVBsYXllcihcIlBsYXllciAxXCIsIFBsYXllclR5cGUuSFVNQU4sIDEwKSxcbiAgICAgICAgY3JlYXRlUGxheWVyKFwiUGxheWVyIDJcIiwgUGxheWVyVHlwZS5IVU1BTiwgMTApLFxuICAgICAgKTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcm9vdFwiKS5jbGFzc0xpc3QuYWRkKFwidnMtZnJpZW5kXCIpO1xuICAgIH1cblxuICAgIGhvbWVQYWdlLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoY3JlYXRlR2FtZVBhZ2UoZ2FtZSkpO1xuICAgIGhvbWVQYWdlLnJlbW92ZSgpO1xuICB9KTtcblxuICBjb25zdCBoZWxwQnV0dG9uID0gaG9tZVBhZ2UucXVlcnlTZWxlY3RvcihcIi5oZWxwXCIpO1xuICBoZWxwQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgaG9tZVBhZ2UucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChjcmVhdGVIZWxwUGFnZSgpKTtcbiAgICBob21lUGFnZS5yZW1vdmUoKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGhvbWVQYWdlO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICghc2NyaXB0VXJsIHx8ICEvXmh0dHAocz8pOi8udGVzdChzY3JpcHRVcmwpKSkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsImltcG9ydCB7IGNyZWF0ZUhvbWVQYWdlIH0gZnJvbSBcIi4vZG9tL3BhZ2VzL2hvbWUuanNcIjtcblxuaW1wb3J0IGJhY2tTdmcgZnJvbSBcIi4uL2Fzc2V0cy9jaGV2cm9uLWxlZnQuc3ZnXCI7XG5pbXBvcnQgbG9nbyBmcm9tIFwiLi4vYXNzZXRzL2Zhdmljb24uaWNvXCI7XG5pbXBvcnQgXCIuL3N0eWxlcy9pbmRleC5jc3NcIjtcblxuY29uc29sZS5sb2coXCJHZXQgUmVhZHkgZm9yIEJhdHRsZSFcIik7XG5cbmNvbnN0IHJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIik7XG5yb290LmlubmVySFRNTCA9IGBcbiAgPGhlYWRlcj5cbiAgICA8YnV0dG9uIGNsYXNzPVwiYmFjay1idXR0b25cIj48L2J1dHRvbj5cbiAgICA8aW1nIGNsYXNzPVwibG9nb1wiIGFsdD1cIkxvZ29cIiAvPjxoMT5CTElUWkJBWTwvaDE+XG4gIDwvaGVhZGVyPlxuYDtcblxucm9vdC5xdWVyeVNlbGVjdG9yKFwiLmxvZ29cIikuc3JjID0gbG9nbztcblxucm9vdC5hcHBlbmRDaGlsZChjcmVhdGVIb21lUGFnZSgpKTtcblxuY29uc3QgYmFja0J1dHRvbiA9IHJvb3QucXVlcnlTZWxlY3RvcihcIi5iYWNrLWJ1dHRvblwiKTtcbmNvbnN0IGJhY2tJY29uID0gbmV3IEltYWdlKCk7XG5iYWNrSWNvbi5zcmMgPSBiYWNrU3ZnO1xuYmFja0J1dHRvbi5hcHBlbmRDaGlsZChiYWNrSWNvbik7XG5iYWNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGNvbnN0IGN1cnJlbnRQYWdlID0gcm9vdC5xdWVyeVNlbGVjdG9yKFwiLnBhZ2VcIik7XG4gIGNvbnN0IG5ld1BhZ2UgPSBjcmVhdGVIb21lUGFnZSgpO1xuXG4gIGlmIChuZXdQYWdlLmNsYXNzTGlzdFswXSA9PSBjdXJyZW50UGFnZS5jbGFzc0xpc3RbMF0pIHtcbiAgICByZXR1cm47XG4gIH1cblxuICByb290LmNsYXNzTmFtZSA9IFwiXCI7XG5cbiAgcm9vdC5hcHBlbmRDaGlsZChuZXdQYWdlKTtcbiAgY3VycmVudFBhZ2UucmVtb3ZlKCk7XG59KTtcbiJdLCJuYW1lcyI6WyJjcmVhdGVTaGlwIiwiU2hpcE9yaWVudGF0aW9uIiwiQ2VsbFN0YXRlIiwiT2JqZWN0IiwiZnJlZXplIiwiRU1QVFkiLCJNSVNTIiwiU0hJUCIsIkhJVCIsIlNVTksiLCJjcmVhdGVHYW1lQm9hcmQiLCJzaXplIiwiRXJyb3IiLCJjZWxscyIsIkFycmF5IiwiZnJvbSIsImxlbmd0aCIsInNoaXBzIiwicmVzZXQiLCJwbGFjZVNoaXAiLCJzaGlwIiwiY29vcmRpbmF0ZXMiLCJvcmllbnRhdGlvbiIsIkhPUklaT05UQUwiLCJWRVJUSUNBTCIsImkiLCJwdXNoIiwibW92ZVNoaXAiLCJzaGlwSW5kZXgiLCJ0eXBlIiwicG9wIiwicm90YXRlU2hpcCIsIm5ld09yaWVudGF0aW9uIiwiZ2V0U2hpcEluZGV4IiwiaiIsInJlY2VpdmVBdHRhY2siLCJyZXN1bHQiLCJ1bmRlZmluZWQiLCJoaXQiLCJpc1N1bmsiLCJpc0ZsZWV0RGVzdHJveWVkIiwiUGxheWVyVHlwZSIsIkhVTUFOIiwiQ09NUFVURVIiLCJjcmVhdGVQbGF5ZXIiLCJuYW1lIiwiYm9hcmRTaXplIiwiYm9hcmQiLCJTaGlwVHlwZSIsIkNBUlJJRVIiLCJCQVRUTEVTSElQIiwiREVTVFJPWUVSIiwiU1VCTUFSSU5FIiwiUEFUUk9MIiwiZ2V0U2hpcExlbmd0aCIsImFyZ3VtZW50cyIsImhpdHMiLCJyZWZyZXNoU3ZnIiwiZWRpdFN2ZyIsInNhdmVTdmciLCJjYXJyaWVyU3ZnIiwiYmF0dGxlc2hpcFN2ZyIsImRlc3Ryb3llclN2ZyIsInN1Ym1hcmluZVN2ZyIsInBhdHJvbFN2ZyIsInNldHVwR2FtZUJvYXJkcyIsImdhbWUiLCJwbGF5ZXJPbmUiLCJwbGF5ZXJUd28iLCJib2FyZE9uZSIsImNyZWF0ZUJvYXJkQ29tcG9uZW50IiwicmFuZG9taXplRm9ybWF0aW9uIiwiY29tcG9uZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwicmVuZGVyU2hpcHMiLCJhZGRFdmVudExpc3RlbmVyIiwiY2xlYXIiLCJib2FyZFR3byIsImZvckVhY2giLCJET01Cb2FyZCIsImJvYXJkSW5kZXgiLCJtb3ZpbmdTaGlwSW5kZXgiLCJyZWxhdGl2ZURyYWdnaW5nQ2VsbCIsImNoaWxkcmVuIiwicm93IiwiY2VsbCIsImhhbmRsZUF0dGFja0V2ZW50IiwiaXNBdHRhY2thYmxlIiwiYWN0aXZlIiwiaXNJblByb2dyZXNzIiwiaXNHYW1lT3ZlciIsImlzUGxheWVyV2FpdGluZyIsImF0dGFjayIsInVwZGF0ZUF0dGFja0luZm8iLCJoYW5kbGVTaGlwUm90YXRlIiwiZXZlbnQiLCJlZGl0aW5nIiwiaXNNdXRhYmxlIiwiY29udGFpbnMiLCJ0b2dnbGVTaGlwTW90aW9uIiwicmVuZGVyIiwicHJldmVudERlZmF1bHQiLCJoYW5kbGVTaGlwTW92ZVN0YXJ0Iiwic2hpcENvb3JkaW5hdGVzIiwiYnV0dG9uIiwiaGFuZGxlU2hpcE1vdmluZyIsInRhcmdldCIsInRvdWNoZXMiLCJkb2N1bWVudCIsImVsZW1lbnRGcm9tUG9pbnQiLCJjbGllbnRYIiwiY2xpZW50WSIsImNlbGxJbmRleCIsImdldENlbGxJbmRleCIsIm5ld0Nvb3JkaW5hdGVzIiwic2hpcEltYWdlIiwicXVlcnlTZWxlY3RvciIsIm5ld0NlbGwiLCJzdHlsZSIsImxlZnQiLCJvZmZzZXRMZWZ0IiwidG9wIiwib2Zmc2V0VG9wIiwiaGFuZGxlU2hpcFBsYWNlIiwibW92aW5nQ2VsbCIsImtleSIsInBsYXllciIsImF0dGFja2FibGUiLCJtdXRhYmxlIiwiYm9hcmRDb21wb25lbnQiLCJjcmVhdGVFbGVtZW50IiwiYm9hcmRIZWFkZXIiLCJpbm5lckhUTUwiLCJhcHBlbmRDaGlsZCIsInJhbmRvbWl6ZUJ1dHRvbiIsImVkaXRCdXR0b24iLCJzYXZlQnV0dG9uIiwidGl0bGUiLCJyZWZyZXNoSWNvbiIsIkltYWdlIiwic3JjIiwiZWRpdEljb24iLCJzYXZlSWNvbiIsImJvYXJkQ29udHJvbHMiLCJib2FyZENlbGxzIiwid2luZG93V2lkdGgiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGllbnRXaWR0aCIsIndpbmRvd0hlaWdodCIsImNsaWVudEhlaWdodCIsImlzVmVydGljYWxTY3JlZW4iLCJjZWxsU2l6ZSIsInJvd0NvbXBvbmVudCIsImNlbGxDb21wb25lbnQiLCJnZXRDZWxsQ2xhc3NOYW1lIiwid2lkdGgiLCJoZWlnaHQiLCJzaGlwc0NvbnRhaW5lciIsIm1vdmluZ0NlbGxzIiwicXVlcnlTZWxlY3RvckFsbCIsInJlbW92ZSIsImNsYXNzTmFtZSIsImlzTW92aW5nIiwicmVtb3ZlQ2hpbGQiLCJncmlkR2FwIiwieCIsInkiLCJhbHQiLCJ0cmFuc2Zvcm1PcmlnaW4iLCJ0cmFuc2Zvcm0iLCJrZXlzIiwic2hpcExlbmd0aCIsInBsYWNlZCIsIk1hdGgiLCJyYW5kb20iLCJmbG9vciIsIm1vdmluZ1NoaXAiLCJ0b2dnbGUiLCJtb3ZpbmdTaGlwQ2VsbCIsIm1vdmluZ1NoaXBDb29yZGluYXRlcyIsIm1vdmVTdWNjZXNzZnVsIiwibW92ZWRTaGlwIiwic2F2ZUVkaXRzIiwicmVwb3J0VmFsaWRpdHkiLCJhbGVydCIsInZhbHVlIiwidGV4dENvbnRlbnQiLCJwcm90b3R5cGUiLCJpbmRleE9mIiwiY2FsbCIsInBhcmVudE5vZGUiLCJzZWNyZXQiLCJHYW1lTW9kZSIsIkZSSUVORCIsImNvbXB1dGVyQXR0YWNrTW9kZSIsIlJBTkRPTSIsIkFESkFDRU5UIiwiRElSRUNURUQiLCJhZGphY2VudENvb3JkaW5hdGVzIiwic2V0dXBHYW1lIiwibW9kZSIsImhpdEluZm8iLCJhdHRhY2tNb2RlIiwiZmlyc3RIaXQiLCJsYXN0SGl0IiwiZGlyZWN0aW9uIiwiYWRqYWNlbnRUcmllcyIsImxhdGVzdEhpdCIsImluY3JlbWVudEFkamFjZW50VHJpZXMiLCJwbGF5ZXJzIiwiY3VycmVudFBsYXllckluZGV4IiwiYm9hcmRzIiwic3RhcnQiLCJwbGF5IiwiZ2FtZU92ZXJTY3JlZW4iLCJib2FyZHNDb250YWluZXIiLCJhcHBlbmQiLCJjdXJyZW50UGxheWVyIiwibmV4dFBsYXllckluZGV4IiwibmV4dFBsYXllciIsImNyZWF0ZUdhbWVPdmVyU2NyZWVuIiwiUHJvbWlzZSIsInJlc29sdmUiLCJzZXRUaW1lb3V0IiwiY29tcHV0ZXJBdHRhY2siLCJjcmVhdGVQYXNzaW5nU2NyZWVuIiwiYXR0YWNrZXIiLCJyZWNlaXZlciIsInZhbGlkIiwiaXRlcmF0aW9ucyIsImhpdFNxdWFyZXMiLCJsYXN0SGl0U3F1YXJlIiwiciIsImNvbnNvbGUiLCJsb2ciLCJhdHRhY2tUeXBlIiwiYXR0YWNrZXJJbmRleCIsImF0dGFja0luZm8iLCJnYW1lT3Zlck1lc3NhZ2UiLCJ0b1VwcGVyQ2FzZSIsIm91dGVyUmVzZXRCdXR0b24iLCJyZXNldEJ1dHRvbiIsInBhc3NpbmdTY3JlZW4iLCJjb250aW51ZUJ1dHRvbiIsImNyZWF0ZUdhbWVQYWdlIiwiZ2FtZVBhZ2UiLCJzdGFydEJ1dHRvbiIsImNyZWF0ZUhlbHBQYWdlIiwiaGVscFBhZ2UiLCJjcmVhdGVIb21lUGFnZSIsImdhbWVNb2RlIiwiaG9tZVBhZ2UiLCJjb21wdXRlck9wcG9uZW50QnV0dG9uIiwiZnJpZW5kT3Bwb25lbnRCdXR0b24iLCJwbGF5QnV0dG9uIiwiaGVscEJ1dHRvbiIsImJhY2tTdmciLCJsb2dvIiwicm9vdCIsImdldEVsZW1lbnRCeUlkIiwiYmFja0J1dHRvbiIsImJhY2tJY29uIiwiY3VycmVudFBhZ2UiLCJuZXdQYWdlIl0sInNvdXJjZVJvb3QiOiIifQ==