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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLENBQUM7QUFFbEMsTUFBTWEsVUFBVSxHQUFHRixJQUFJLENBQUM5SCxhQUFhLENBQUMsY0FBYyxDQUFDO0FBQ3JELE1BQU1pSSxRQUFRLEdBQUcsSUFBSTFHLEtBQUssQ0FBQyxDQUFDO0FBQzVCMEcsUUFBUSxDQUFDekcsR0FBRyxHQUFHa0cscURBQU87QUFDdEJNLFVBQVUsQ0FBQy9HLFdBQVcsQ0FBQ2dILFFBQVEsQ0FBQztBQUNoQ0QsVUFBVSxDQUFDekssZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE1BQU07RUFDekMsTUFBTTJLLFdBQVcsR0FBR0osSUFBSSxDQUFDOUgsYUFBYSxDQUFDLE9BQU8sQ0FBQztFQUMvQyxNQUFNbUksT0FBTyxHQUFHaEIsa0VBQWMsQ0FBQyxDQUFDO0VBRWhDLElBQUlnQixPQUFPLENBQUMvSyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUk4SyxXQUFXLENBQUM5SyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUU7SUFDcEQ7RUFDRjtFQUVBMEssSUFBSSxDQUFDakYsU0FBUyxHQUFHLEVBQUU7RUFFbkJpRixJQUFJLENBQUM3RyxXQUFXLENBQUNrSCxPQUFPLENBQUM7RUFDekJELFdBQVcsQ0FBQ3RGLE1BQU0sQ0FBQyxDQUFDO0FBQ3RCLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvaW5kZXguY3NzPzRlNDIiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb3JlL2dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvcmUvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29yZS9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tL2JvYXJkcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbS9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tL3BhZ2VzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb20vcGFnZXMvaGVscC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbS9wYWdlcy9ob21lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCB7IGNyZWF0ZVNoaXAsIFNoaXBPcmllbnRhdGlvbiB9IGZyb20gXCIuL3NoaXAuanNcIjtcblxuZXhwb3J0IGNvbnN0IENlbGxTdGF0ZSA9IE9iamVjdC5mcmVlemUoe1xuICBFTVBUWTogMCxcbiAgTUlTUzogMSxcbiAgU0hJUDogMixcbiAgSElUOiAzLFxuICBTVU5LOiA0LFxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVHYW1lQm9hcmQoc2l6ZSkge1xuICBpZiAoc2l6ZSA8PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBib2FyZCBzaXplXCIpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzaXplLFxuICAgIGNlbGxzOiBBcnJheS5mcm9tKHsgbGVuZ3RoOiBzaXplIH0sICgpID0+XG4gICAgICBBcnJheS5mcm9tKHsgbGVuZ3RoOiBzaXplIH0sICgpID0+IENlbGxTdGF0ZS5FTVBUWSksXG4gICAgKSxcbiAgICBzaGlwczogW10sXG5cbiAgICByZXNldDogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5jZWxscyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IHNpemUgfSwgKCkgPT5cbiAgICAgICAgQXJyYXkuZnJvbSh7IGxlbmd0aDogc2l6ZSB9LCAoKSA9PiBDZWxsU3RhdGUuRU1QVFkpLFxuICAgICAgKTtcbiAgICAgIHRoaXMuc2hpcHMgPSBbXTtcbiAgICB9LFxuXG4gICAgcGxhY2VTaGlwOiBmdW5jdGlvbiAoc2hpcCkge1xuICAgICAgaWYgKFxuICAgICAgICBzaGlwLmNvb3JkaW5hdGVzWzBdIDwgMCB8fFxuICAgICAgICBzaGlwLmNvb3JkaW5hdGVzWzFdIDwgMCB8fFxuICAgICAgICBzaGlwLmNvb3JkaW5hdGVzWzBdID49IHNpemUgfHxcbiAgICAgICAgc2hpcC5jb29yZGluYXRlc1sxXSA+PSBzaXplXG4gICAgICApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IHBsYWNlIHNoaXAgb3V0c2lkZSB0aGUgYm9hcmRcIik7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwgJiZcbiAgICAgICAgICBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxID49IHNpemUpIHx8XG4gICAgICAgIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwgJiZcbiAgICAgICAgICBzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxID49IHNpemUpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwpIHtcbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMF07XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICBpZiAodGhpcy5jZWxsc1tzaGlwLmNvb3JkaW5hdGVzWzFdXVtpXSAhPT0gQ2VsbFN0YXRlLkVNUFRZKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1sxXTtcbiAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgaSsrXG4gICAgICAgICkge1xuICAgICAgICAgIGlmICh0aGlzLmNlbGxzW2ldW3NoaXAuY29vcmRpbmF0ZXNbMF1dICE9PSBDZWxsU3RhdGUuRU1QVFkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5zaGlwcy5wdXNoKHNoaXApO1xuXG4gICAgICBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwpIHtcbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMF07XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmNlbGxzW3NoaXAuY29vcmRpbmF0ZXNbMV1dW2ldID0gQ2VsbFN0YXRlLlNISVA7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMKSB7XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzFdO1xuICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1sxXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5jZWxsc1tpXVtzaGlwLmNvb3JkaW5hdGVzWzBdXSA9IENlbGxTdGF0ZS5TSElQO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICBtb3ZlU2hpcDogZnVuY3Rpb24gKHNoaXBJbmRleCwgY29vcmRpbmF0ZXMpIHtcbiAgICAgIGNvbnN0IHNoaXAgPSB0aGlzLnNoaXBzW3NoaXBJbmRleF07XG4gICAgICBpZiAoIXNoaXApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2hpcCBkb2VzIG5vdCBleGlzdFwiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMKSB7XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5jZWxsc1tzaGlwLmNvb3JkaW5hdGVzWzFdXVtpXSA9IENlbGxTdGF0ZS5FTVBUWTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwpIHtcbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMV07XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmNlbGxzW2ldW3NoaXAuY29vcmRpbmF0ZXNbMF1dID0gQ2VsbFN0YXRlLkVNUFRZO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgIXRoaXMucGxhY2VTaGlwKGNyZWF0ZVNoaXAoc2hpcC50eXBlLCBjb29yZGluYXRlcywgc2hpcC5vcmllbnRhdGlvbikpXG4gICAgICApIHtcbiAgICAgICAgaWYgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMKSB7XG4gICAgICAgICAgZm9yIChcbiAgICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1swXTtcbiAgICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGkrK1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5jZWxsc1tzaGlwLmNvb3JkaW5hdGVzWzFdXVtpXSA9IENlbGxTdGF0ZS5TSElQO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwpIHtcbiAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzFdO1xuICAgICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgICAgaSsrXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmNlbGxzW2ldW3NoaXAuY29vcmRpbmF0ZXNbMF1dID0gQ2VsbFN0YXRlLlNISVA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zaGlwc1tzaGlwSW5kZXhdID0gdGhpcy5zaGlwcy5wb3AoKTtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIHJvdGF0ZVNoaXA6IGZ1bmN0aW9uIChzaGlwSW5kZXgpIHtcbiAgICAgIGNvbnN0IHNoaXAgPSB0aGlzLnNoaXBzW3NoaXBJbmRleF07XG4gICAgICBpZiAoIXNoaXApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2hpcCBkb2VzIG5vdCBleGlzdFwiKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbmV3T3JpZW50YXRpb24gPVxuICAgICAgICBzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTFxuICAgICAgICAgID8gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMXG4gICAgICAgICAgOiBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTDtcblxuICAgICAgaWYgKG5ld09yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCkge1xuICAgICAgICBpZiAoc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMSA+PSB0aGlzLnNpemUpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1swXSArIDE7XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICBpZiAodGhpcy5jZWxsc1tzaGlwLmNvb3JkaW5hdGVzWzFdXVtpXSAhPT0gQ2VsbFN0YXRlLkVNUFRZKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKG5ld09yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwpIHtcbiAgICAgICAgaWYgKHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDEgPj0gdGhpcy5zaXplKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyAxO1xuICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1sxXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKHRoaXMuY2VsbHNbaV1bc2hpcC5jb29yZGluYXRlc1swXV0gIT09IENlbGxTdGF0ZS5FTVBUWSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobmV3T3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMKSB7XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzFdO1xuICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1sxXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5jZWxsc1tpXVtzaGlwLmNvb3JkaW5hdGVzWzBdXSA9IENlbGxTdGF0ZS5FTVBUWTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1swXTtcbiAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMF0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgaSsrXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuY2VsbHNbc2hpcC5jb29yZGluYXRlc1sxXV1baV0gPSBDZWxsU3RhdGUuU0hJUDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChuZXdPcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMKSB7XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5jZWxsc1tzaGlwLmNvb3JkaW5hdGVzWzFdXVtpXSA9IENlbGxTdGF0ZS5FTVBUWTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1sxXTtcbiAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgaSsrXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuY2VsbHNbaV1bc2hpcC5jb29yZGluYXRlc1swXV0gPSBDZWxsU3RhdGUuU0hJUDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzaGlwLm9yaWVudGF0aW9uID0gbmV3T3JpZW50YXRpb247XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuXG4gICAgZ2V0U2hpcEluZGV4OiBmdW5jdGlvbiAoY29vcmRpbmF0ZXMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5zaGlwc1tpXS5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwpIHtcbiAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgbGV0IGogPSB0aGlzLnNoaXBzW2ldLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgICAgICAgaiA8PSB0aGlzLnNoaXBzW2ldLmNvb3JkaW5hdGVzWzBdICsgdGhpcy5zaGlwc1tpXS5sZW5ndGggLSAxO1xuICAgICAgICAgICAgaisrXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGNvb3JkaW5hdGVzWzBdID09PSBqICYmXG4gICAgICAgICAgICAgIGNvb3JkaW5hdGVzWzFdID09PSB0aGlzLnNoaXBzW2ldLmNvb3JkaW5hdGVzWzFdXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2hpcHNbaV0ub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICBsZXQgaiA9IHRoaXMuc2hpcHNbaV0uY29vcmRpbmF0ZXNbMV07XG4gICAgICAgICAgICBqIDw9IHRoaXMuc2hpcHNbaV0uY29vcmRpbmF0ZXNbMV0gKyB0aGlzLnNoaXBzW2ldLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBqKytcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgY29vcmRpbmF0ZXNbMF0gPT09IHRoaXMuc2hpcHNbaV0uY29vcmRpbmF0ZXNbMF0gJiZcbiAgICAgICAgICAgICAgY29vcmRpbmF0ZXNbMV0gPT09IGpcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIC0xO1xuICAgIH0sXG5cbiAgICByZWNlaXZlQXR0YWNrOiBmdW5jdGlvbiAoY29vcmRpbmF0ZXMpIHtcbiAgICAgIGlmIChcbiAgICAgICAgY29vcmRpbmF0ZXNbMF0gPCAwIHx8XG4gICAgICAgIGNvb3JkaW5hdGVzWzFdIDwgMCB8fFxuICAgICAgICBjb29yZGluYXRlc1swXSA+PSBzaXplIHx8XG4gICAgICAgIGNvb3JkaW5hdGVzWzFdID49IHNpemVcbiAgICAgICkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgYXR0YWNrIG91dHNpZGUgdGhlIGJvYXJkXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuY2VsbHNbY29vcmRpbmF0ZXNbMV1dW2Nvb3JkaW5hdGVzWzBdXSAhPT0gQ2VsbFN0YXRlLkVNUFRZICYmXG4gICAgICAgIHRoaXMuY2VsbHNbY29vcmRpbmF0ZXNbMV1dW2Nvb3JkaW5hdGVzWzBdXSAhPT0gQ2VsbFN0YXRlLlNISVBcbiAgICAgICkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDZWxsIGhhcyBhbHJlYWR5IGJlZW4gYXR0YWNrZWRcIik7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmNlbGxzW2Nvb3JkaW5hdGVzWzFdXVtjb29yZGluYXRlc1swXV0gIT09IENlbGxTdGF0ZS5TSElQKSB7XG4gICAgICAgIHRoaXMuY2VsbHNbY29vcmRpbmF0ZXNbMV1dW2Nvb3JkaW5hdGVzWzBdXSA9IENlbGxTdGF0ZS5NSVNTO1xuICAgICAgICByZXR1cm4geyByZXN1bHQ6IENlbGxTdGF0ZS5NSVNTLCBzaGlwOiB1bmRlZmluZWQgfTtcbiAgICAgIH1cblxuICAgICAgZm9yIChjb25zdCBzaGlwIG9mIHRoaXMuc2hpcHMpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCAmJlxuICAgICAgICAgICAgY29vcmRpbmF0ZXNbMV0gPT09IHNoaXAuY29vcmRpbmF0ZXNbMV0gJiZcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzWzBdID49IHNoaXAuY29vcmRpbmF0ZXNbMF0gJiZcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzWzBdIDw9IHNoaXAuY29vcmRpbmF0ZXNbMF0gKyBzaGlwLmxlbmd0aCAtIDEpIHx8XG4gICAgICAgICAgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCAmJlxuICAgICAgICAgICAgY29vcmRpbmF0ZXNbMF0gPT09IHNoaXAuY29vcmRpbmF0ZXNbMF0gJiZcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzWzFdID49IHNoaXAuY29vcmRpbmF0ZXNbMV0gJiZcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzWzFdIDw9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDEpXG4gICAgICAgICkge1xuICAgICAgICAgIHNoaXAuaGl0KCk7XG5cbiAgICAgICAgICBpZiAoc2hpcC5pc1N1bmsoKSkge1xuICAgICAgICAgICAgaWYgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMKSB7XG4gICAgICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICBpKytcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jZWxsc1tzaGlwLmNvb3JkaW5hdGVzWzFdXVtpXSA9IENlbGxTdGF0ZS5TVU5LO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1sxXTtcbiAgICAgICAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgaSsrXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2VsbHNbaV1bc2hpcC5jb29yZGluYXRlc1swXV0gPSBDZWxsU3RhdGUuU1VOSztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNlbGxzW2Nvb3JkaW5hdGVzWzFdXVtjb29yZGluYXRlc1swXV0gPSBDZWxsU3RhdGUuSElUO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7IHJlc3VsdDogdGhpcy5jZWxsc1tjb29yZGluYXRlc1sxXV1bY29vcmRpbmF0ZXNbMF1dLCBzaGlwIH07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgaXNGbGVldERlc3Ryb3llZDogZnVuY3Rpb24gKCkge1xuICAgICAgZm9yIChjb25zdCBzaGlwIG9mIHRoaXMuc2hpcHMpIHtcbiAgICAgICAgaWYgKCFzaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gIH07XG59XG4iLCJpbXBvcnQgeyBjcmVhdGVHYW1lQm9hcmQgfSBmcm9tIFwiLi9nYW1lQm9hcmQuanNcIjtcblxuZXhwb3J0IGNvbnN0IFBsYXllclR5cGUgPSBPYmplY3QuZnJlZXplKHtcbiAgSFVNQU46IFwiSFVNQU5cIixcbiAgQ09NUFVURVI6IFwiQ09NUFVURVJcIixcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUGxheWVyKG5hbWUsIHR5cGUsIGJvYXJkU2l6ZSkge1xuICByZXR1cm4ge1xuICAgIG5hbWUsXG4gICAgdHlwZSxcbiAgICBib2FyZDogY3JlYXRlR2FtZUJvYXJkKGJvYXJkU2l6ZSksXG4gIH07XG59XG4iLCJleHBvcnQgY29uc3QgU2hpcFR5cGUgPSBPYmplY3QuZnJlZXplKHtcbiAgQ0FSUklFUjogXCJDYXJyaWVyXCIsXG4gIEJBVFRMRVNISVA6IFwiQmF0dGxlc2hpcFwiLFxuICBERVNUUk9ZRVI6IFwiRGVzdHJveWVyXCIsXG4gIFNVQk1BUklORTogXCJTdWJtYXJpbmVcIixcbiAgUEFUUk9MOiBcIlBhdHJvbCBCb2F0XCIsXG59KTtcblxuZXhwb3J0IGNvbnN0IFNoaXBPcmllbnRhdGlvbiA9IE9iamVjdC5mcmVlemUoe1xuICBIT1JJWk9OVEFMOiBcIkhPUklaT05UQUxcIixcbiAgVkVSVElDQUw6IFwiVkVSVElDQUxcIixcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2hpcExlbmd0aCh0eXBlKSB7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgU2hpcFR5cGUuQ0FSUklFUjpcbiAgICAgIHJldHVybiA1O1xuICAgIGNhc2UgU2hpcFR5cGUuQkFUVExFU0hJUDpcbiAgICAgIHJldHVybiA0O1xuICAgIGNhc2UgU2hpcFR5cGUuREVTVFJPWUVSOlxuICAgICAgcmV0dXJuIDM7XG4gICAgY2FzZSBTaGlwVHlwZS5TVUJNQVJJTkU6XG4gICAgICByZXR1cm4gMztcbiAgICBjYXNlIFNoaXBUeXBlLlBBVFJPTDpcbiAgICAgIHJldHVybiAyO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTaGlwKFxuICB0eXBlLFxuICBjb29yZGluYXRlcyA9IFt1bmRlZmluZWQsIHVuZGVmaW5lZF0sXG4gIG9yaWVudGF0aW9uID0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwsXG4pIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiB0eXBlLFxuICAgIGxlbmd0aDogZ2V0U2hpcExlbmd0aCh0eXBlKSxcbiAgICBjb29yZGluYXRlcyxcbiAgICBvcmllbnRhdGlvbixcbiAgICBoaXRzOiAwLFxuXG4gICAgaGl0OiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpcy5oaXRzIDwgdGhpcy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5oaXRzKys7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGlzU3VuazogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGl0cyA9PT0gdGhpcy5sZW5ndGg7XG4gICAgfSxcbiAgfTtcbn1cbiIsImltcG9ydCB7IENlbGxTdGF0ZSB9IGZyb20gXCIuLi9jb3JlL2dhbWVCb2FyZC5qc1wiO1xuaW1wb3J0IHsgUGxheWVyVHlwZSB9IGZyb20gXCIuLi9jb3JlL3BsYXllci5qc1wiO1xuaW1wb3J0IHtcbiAgY3JlYXRlU2hpcCxcbiAgZ2V0U2hpcExlbmd0aCxcbiAgU2hpcE9yaWVudGF0aW9uLFxuICBTaGlwVHlwZSxcbn0gZnJvbSBcIi4uL2NvcmUvc2hpcC5qc1wiO1xuXG5pbXBvcnQgcmVmcmVzaFN2ZyBmcm9tIFwiLi4vLi4vYXNzZXRzL3JlZnJlc2gtY2N3LnN2Z1wiO1xuaW1wb3J0IGVkaXRTdmcgZnJvbSBcIi4uLy4uL2Fzc2V0cy9lZGl0LnN2Z1wiO1xuaW1wb3J0IHNhdmVTdmcgZnJvbSBcIi4uLy4uL2Fzc2V0cy9zYXZlLnN2Z1wiO1xuXG5pbXBvcnQgY2FycmllclN2ZyBmcm9tIFwiLi4vLi4vYXNzZXRzL2NhcnJpZXIuc3ZnXCI7XG5pbXBvcnQgYmF0dGxlc2hpcFN2ZyBmcm9tIFwiLi4vLi4vYXNzZXRzL2JhdHRsZXNoaXAuc3ZnXCI7XG5pbXBvcnQgZGVzdHJveWVyU3ZnIGZyb20gXCIuLi8uLi9hc3NldHMvZGVzdHJveWVyLnN2Z1wiO1xuaW1wb3J0IHN1Ym1hcmluZVN2ZyBmcm9tIFwiLi4vLi4vYXNzZXRzL3N1Ym1hcmluZS5zdmdcIjtcbmltcG9ydCBwYXRyb2xTdmcgZnJvbSBcIi4uLy4uL2Fzc2V0cy9wYXRyb2wuc3ZnXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cEdhbWVCb2FyZHMoZ2FtZSwgcGxheWVyT25lLCBwbGF5ZXJUd28pIHtcbiAgY29uc3QgYm9hcmRPbmUgPSBjcmVhdGVCb2FyZENvbXBvbmVudChcbiAgICBwbGF5ZXJPbmUuYm9hcmQsXG4gICAgcGxheWVyT25lLFxuICAgIHBsYXllclR3by50eXBlICE9PSBQbGF5ZXJUeXBlLkNPTVBVVEVSLFxuICAgIHBsYXllck9uZS50eXBlID09PSBQbGF5ZXJUeXBlLkhVTUFOLFxuICAgIGdhbWUsXG4gICk7XG4gIGJvYXJkT25lLnJhbmRvbWl6ZUZvcm1hdGlvbigpO1xuXG4gIGJvYXJkT25lLmNvbXBvbmVudC5jbGFzc0xpc3QuYWRkKFxuICAgIFwicGxheWVyLW9uZVwiLFxuICAgIHBsYXllck9uZS50eXBlID09PSBQbGF5ZXJUeXBlLkhVTUFOID8gXCJodW1hblwiIDogXCJjb21wdXRlclwiLFxuICApO1xuICBpZiAocGxheWVyVHdvLnR5cGUgPT09IFBsYXllclR5cGUuQ09NUFVURVIpIHtcbiAgICBib2FyZE9uZS5jb21wb25lbnQuY2xhc3NMaXN0LmFkZChcIm9ubHktaHVtYW5cIik7XG4gICAgYm9hcmRPbmUucmVuZGVyU2hpcHMoKTtcbiAgfVxuICBib2FyZE9uZS5jb21wb25lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGJvYXJkT25lLmNsZWFyKCksIHRydWUpO1xuXG4gIGNvbnN0IGJvYXJkVHdvID0gY3JlYXRlQm9hcmRDb21wb25lbnQoXG4gICAgcGxheWVyVHdvLmJvYXJkLFxuICAgIHBsYXllclR3byxcbiAgICBwbGF5ZXJPbmUudHlwZSAhPT0gUGxheWVyVHlwZS5DT01QVVRFUixcbiAgICBwbGF5ZXJUd28udHlwZSA9PT0gUGxheWVyVHlwZS5IVU1BTixcbiAgICBnYW1lLFxuICApO1xuICBib2FyZFR3by5yYW5kb21pemVGb3JtYXRpb24oKTtcblxuICBib2FyZFR3by5jb21wb25lbnQuY2xhc3NMaXN0LmFkZChcbiAgICBcInBsYXllci10d29cIixcbiAgICBwbGF5ZXJUd28udHlwZSA9PT0gUGxheWVyVHlwZS5IVU1BTiA/IFwiaHVtYW5cIiA6IFwiY29tcHV0ZXJcIixcbiAgKTtcblxuICBbYm9hcmRPbmUsIGJvYXJkVHdvXS5mb3JFYWNoKChET01Cb2FyZCwgYm9hcmRJbmRleCkgPT4ge1xuICAgIGxldCBtb3ZpbmdTaGlwSW5kZXggPSBudWxsO1xuICAgIGxldCByZWxhdGl2ZURyYWdnaW5nQ2VsbCA9IG51bGw7XG5cbiAgICBBcnJheS5mcm9tKERPTUJvYXJkLmNvbXBvbmVudC5jaGlsZHJlblsxXS5jaGlsZHJlbikuZm9yRWFjaCgocm93LCBpKSA9PiB7XG4gICAgICBBcnJheS5mcm9tKHJvdy5jaGlsZHJlbikuZm9yRWFjaCgoY2VsbCwgaikgPT4ge1xuICAgICAgICBmdW5jdGlvbiBoYW5kbGVBdHRhY2tFdmVudCgpIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhRE9NQm9hcmQuaXNBdHRhY2thYmxlKCkgfHxcbiAgICAgICAgICAgICFET01Cb2FyZC5hY3RpdmUgfHxcbiAgICAgICAgICAgICFnYW1lLmlzSW5Qcm9ncmVzcyB8fFxuICAgICAgICAgICAgZ2FtZS5pc0dhbWVPdmVyIHx8XG4gICAgICAgICAgICAhZ2FtZS5pc1BsYXllcldhaXRpbmdcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBhdHRhY2sgPSBET01Cb2FyZC5yZWNlaXZlQXR0YWNrKFtqLCBpXSk7XG4gICAgICAgICAgaWYgKGF0dGFjaykge1xuICAgICAgICAgICAgZ2FtZS51cGRhdGVBdHRhY2tJbmZvKFxuICAgICAgICAgICAgICBhdHRhY2sucmVzdWx0LFxuICAgICAgICAgICAgICBhdHRhY2suc2hpcCxcbiAgICAgICAgICAgICAgKGJvYXJkSW5kZXggKyAxKSAlIDIsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgZ2FtZS5pc1BsYXllcldhaXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVTaGlwUm90YXRlKGV2ZW50KSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIURPTUJvYXJkLmVkaXRpbmcgfHxcbiAgICAgICAgICAgICFET01Cb2FyZC5pc011dGFibGUoKSB8fFxuICAgICAgICAgICAgZ2FtZS5pc0luUHJvZ3Jlc3MgfHxcbiAgICAgICAgICAgICFjZWxsLmNsYXNzTGlzdC5jb250YWlucyhcInNoaXBcIilcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3Qgc2hpcEluZGV4ID0gRE9NQm9hcmQuYm9hcmQuZ2V0U2hpcEluZGV4KFtqLCBpXSk7XG4gICAgICAgICAgY29uc3Qgc2hpcCA9IERPTUJvYXJkLmJvYXJkLnNoaXBzW3NoaXBJbmRleF07XG5cbiAgICAgICAgICBpZiAoIWNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKFwibW92aW5nXCIpKSB7XG4gICAgICAgICAgICBET01Cb2FyZC50b2dnbGVTaGlwTW90aW9uKHNoaXAuY29vcmRpbmF0ZXMpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChET01Cb2FyZC5ib2FyZC5yb3RhdGVTaGlwKHNoaXBJbmRleCkpIHtcbiAgICAgICAgICAgIERPTUJvYXJkLmNsZWFyKCk7XG4gICAgICAgICAgICBET01Cb2FyZC50b2dnbGVTaGlwTW90aW9uKHNoaXAuY29vcmRpbmF0ZXMpO1xuICAgICAgICAgICAgRE9NQm9hcmQucmVuZGVyKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZVNoaXBNb3ZlU3RhcnQoKSB7XG4gICAgICAgICAgaWYgKCFET01Cb2FyZC5lZGl0aW5nKSByZXR1cm47XG5cbiAgICAgICAgICBjb25zdCBzaGlwSW5kZXggPSBET01Cb2FyZC5ib2FyZC5nZXRTaGlwSW5kZXgoW2osIGldKTtcbiAgICAgICAgICBpZiAoc2hpcEluZGV4ID09PSAtMSkgcmV0dXJuO1xuXG4gICAgICAgICAgbW92aW5nU2hpcEluZGV4ID0gc2hpcEluZGV4O1xuXG4gICAgICAgICAgY29uc3Qgc2hpcENvb3JkaW5hdGVzID1cbiAgICAgICAgICAgIERPTUJvYXJkLmJvYXJkLnNoaXBzW21vdmluZ1NoaXBJbmRleF0uY29vcmRpbmF0ZXM7XG4gICAgICAgICAgcmVsYXRpdmVEcmFnZ2luZ0NlbGwgPSBbXG4gICAgICAgICAgICBqIC0gc2hpcENvb3JkaW5hdGVzWzBdLFxuICAgICAgICAgICAgaSAtIHNoaXBDb29yZGluYXRlc1sxXSxcbiAgICAgICAgICBdO1xuXG4gICAgICAgICAgRE9NQm9hcmQudG9nZ2xlU2hpcE1vdGlvbihbaiwgaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlQXR0YWNrRXZlbnQpO1xuICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZUF0dGFja0V2ZW50KTtcblxuICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJjb250ZXh0bWVudVwiLCBoYW5kbGVTaGlwUm90YXRlKTtcblxuICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gMikgcmV0dXJuO1xuICAgICAgICAgIGhhbmRsZVNoaXBNb3ZlU3RhcnQoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlU2hpcE1vdmVTdGFydCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGhhbmRsZVNoaXBNb3ZpbmcoZXZlbnQpIHtcbiAgICAgIGxldCB0YXJnZXQ7XG4gICAgICBpZiAoZXZlbnQudG91Y2hlcyAmJiBldmVudC50b3VjaGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGFyZ2V0ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChcbiAgICAgICAgICBldmVudC50b3VjaGVzWzBdLmNsaWVudFgsXG4gICAgICAgICAgZXZlbnQudG91Y2hlc1swXS5jbGllbnRZLFxuICAgICAgICApO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgfVxuXG4gICAgICBpZiAoIURPTUJvYXJkLmVkaXRpbmcpIHJldHVybjtcbiAgICAgIGlmICghdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNlbGxcIikpIHJldHVybjtcbiAgICAgIGlmIChtb3ZpbmdTaGlwSW5kZXggPT09IG51bGwpIHJldHVybjtcblxuICAgICAgRE9NQm9hcmQuY2xlYXIoKTtcblxuICAgICAgY29uc3QgY2VsbEluZGV4ID0gZ2V0Q2VsbEluZGV4KHRhcmdldCk7XG4gICAgICBjb25zdCBuZXdDb29yZGluYXRlcyA9IFtcbiAgICAgICAgY2VsbEluZGV4WzBdIC0gcmVsYXRpdmVEcmFnZ2luZ0NlbGxbMF0sXG4gICAgICAgIGNlbGxJbmRleFsxXSAtIHJlbGF0aXZlRHJhZ2dpbmdDZWxsWzFdLFxuICAgICAgXTtcbiAgICAgIGlmIChcbiAgICAgICAgbmV3Q29vcmRpbmF0ZXNbMF0gPCAwIHx8XG4gICAgICAgIG5ld0Nvb3JkaW5hdGVzWzFdIDwgMCB8fFxuICAgICAgICBuZXdDb29yZGluYXRlc1swXSA+PSBET01Cb2FyZC5ib2FyZC5zaXplIHx8XG4gICAgICAgIG5ld0Nvb3JkaW5hdGVzWzFdID49IERPTUJvYXJkLmJvYXJkLnNpemVcbiAgICAgICkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIERPTUJvYXJkLnRvZ2dsZVNoaXBNb3Rpb24oXG4gICAgICAgIG5ld0Nvb3JkaW5hdGVzLFxuICAgICAgICBET01Cb2FyZC5ib2FyZC5zaGlwc1ttb3ZpbmdTaGlwSW5kZXhdLFxuICAgICAgKTtcblxuICAgICAgY29uc3Qgc2hpcEltYWdlID0gRE9NQm9hcmQuY29tcG9uZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIGAuc2hpcC0ke21vdmluZ1NoaXBJbmRleH1gLFxuICAgICAgKTtcbiAgICAgIGlmIChzaGlwSW1hZ2UpIHtcbiAgICAgICAgY29uc3QgbmV3Q2VsbCA9XG4gICAgICAgICAgRE9NQm9hcmQuY29tcG9uZW50LmNoaWxkcmVuWzFdLmNoaWxkcmVuW25ld0Nvb3JkaW5hdGVzWzFdXS5jaGlsZHJlbltcbiAgICAgICAgICAgIG5ld0Nvb3JkaW5hdGVzWzBdXG4gICAgICAgICAgXTtcbiAgICAgICAgc2hpcEltYWdlLnN0eWxlLmxlZnQgPSBgJHtuZXdDZWxsLm9mZnNldExlZnR9cHhgO1xuICAgICAgICBzaGlwSW1hZ2Uuc3R5bGUudG9wID0gYCR7bmV3Q2VsbC5vZmZzZXRUb3B9cHhgO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZVNoaXBQbGFjZShldmVudCkge1xuICAgICAgLy8gbGV0IHRhcmdldDtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGV2ZW50KTtcbiAgICAgIC8vIGlmIChldmVudC50b3VjaGVzICYmIGV2ZW50LnRvdWNoZXMubGVuZ3RoID4gMCkge1xuICAgICAgLy8gICB0YXJnZXQgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KFxuICAgICAgLy8gICAgIGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WCxcbiAgICAgIC8vICAgICBldmVudC50b3VjaGVzWzBdLmNsaWVudFksXG4gICAgICAvLyAgICk7XG4gICAgICAvLyAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAvLyB9IGVsc2Uge1xuICAgICAgLy8gICB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAvLyB9XG5cbiAgICAgIC8vIGlmIChcbiAgICAgIC8vICAgbW92aW5nU2hpcEluZGV4ICE9PSBudWxsICYmXG4gICAgICAvLyAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJjZWxsXCIpICYmXG4gICAgICAvLyAgIHRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZSA9PT0gRE9NQm9hcmQuY29tcG9uZW50XG4gICAgICAvLyApIHtcbiAgICAgIC8vICAgY29uc3QgY2VsbEluZGV4ID0gZ2V0Q2VsbEluZGV4KHRhcmdldCk7XG4gICAgICAvLyAgIGNvbnN0IG5ld0Nvb3JkaW5hdGVzID0gW1xuICAgICAgLy8gICAgIGNlbGxJbmRleFswXSAtIHJlbGF0aXZlRHJhZ2dpbmdDZWxsWzBdLFxuICAgICAgLy8gICAgIGNlbGxJbmRleFsxXSAtIHJlbGF0aXZlRHJhZ2dpbmdDZWxsWzFdLFxuICAgICAgLy8gICBdO1xuICAgICAgLy8gICBjb25zdCBtb3ZpbmdTaGlwID0gRE9NQm9hcmQuYm9hcmQuc2hpcHNbbW92aW5nU2hpcEluZGV4XTtcbiAgICAgIC8vXG4gICAgICAvLyAgIGlmIChcbiAgICAgIC8vICAgICBuZXdDb29yZGluYXRlc1swXSA+PSAwICYmXG4gICAgICAvLyAgICAgbmV3Q29vcmRpbmF0ZXNbMV0gPj0gMCAmJlxuICAgICAgLy8gICAgICgobW92aW5nU2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwgJiZcbiAgICAgIC8vICAgICAgIG5ld0Nvb3JkaW5hdGVzWzBdIDwgRE9NQm9hcmQuYm9hcmQuc2l6ZSAtIG1vdmluZ1NoaXAubGVuZ3RoICsgMSkgfHxcbiAgICAgIC8vICAgICAgIChtb3ZpbmdTaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwgJiZcbiAgICAgIC8vICAgICAgICAgbmV3Q29vcmRpbmF0ZXNbMV0gPCBET01Cb2FyZC5ib2FyZC5zaXplIC0gbW92aW5nU2hpcC5sZW5ndGggKyAxKSlcbiAgICAgIC8vICAgKSB7XG4gICAgICAvLyAgICAgRE9NQm9hcmQuYm9hcmQubW92ZVNoaXAobW92aW5nU2hpcEluZGV4LCBuZXdDb29yZGluYXRlcyk7XG4gICAgICAvLyAgIH1cbiAgICAgIC8vIH0gZWxzZVxuICAgICAgaWYgKG1vdmluZ1NoaXBJbmRleCAhPT0gbnVsbCkge1xuICAgICAgICBjb25zdCBtb3ZpbmdDZWxsID0gRE9NQm9hcmQuY29tcG9uZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW92aW5nXCIpO1xuICAgICAgICBpZiAobW92aW5nQ2VsbCkge1xuICAgICAgICAgIGNvbnN0IG5ld0Nvb3JkaW5hdGVzID0gZ2V0Q2VsbEluZGV4KG1vdmluZ0NlbGwpO1xuICAgICAgICAgIERPTUJvYXJkLmJvYXJkLm1vdmVTaGlwKG1vdmluZ1NoaXBJbmRleCwgbmV3Q29vcmRpbmF0ZXMpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG1vdmluZ1NoaXBJbmRleCA9IG51bGw7XG4gICAgICByZWxhdGl2ZURyYWdnaW5nQ2VsbCA9IG51bGw7XG5cbiAgICAgIERPTUJvYXJkLmNsZWFyKCk7XG4gICAgICBET01Cb2FyZC5yZW5kZXIoKTtcbiAgICB9XG5cbiAgICBET01Cb2FyZC5jb21wb25lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBoYW5kbGVTaGlwTW92aW5nKTtcbiAgICBET01Cb2FyZC5jb21wb25lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCBoYW5kbGVTaGlwTW92aW5nKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBoYW5kbGVTaGlwUGxhY2UpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBoYW5kbGVTaGlwUGxhY2UpO1xuICB9KTtcblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZXZlbnQpID0+IHtcbiAgICBpZiAoYm9hcmRPbmUuZWRpdGluZykgYm9hcmRPbmUubW92ZVNoaXAoZXZlbnQua2V5KTtcbiAgICBlbHNlIGlmIChib2FyZFR3by5lZGl0aW5nKSBib2FyZFR3by5tb3ZlU2hpcChldmVudC5rZXkpO1xuICB9KTtcblxuICByZXR1cm4gW2JvYXJkT25lLCBib2FyZFR3b107XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVCb2FyZENvbXBvbmVudChib2FyZCwgcGxheWVyLCBhdHRhY2thYmxlLCBtdXRhYmxlLCBnYW1lKSB7XG4gIGNvbnN0IGJvYXJkQ29tcG9uZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgYm9hcmRDb21wb25lbnQuY2xhc3NMaXN0LmFkZChcImJvYXJkXCIpO1xuXG4gIGNvbnN0IGJvYXJkSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIik7XG4gIGJvYXJkSGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJib2FyZC1oZWFkZXJcIik7XG4gIGJvYXJkSGVhZGVyLmlubmVySFRNTCA9IGBcbiAgICA8cCBjbGFzcz1cInBsYXllci1uYW1lXCI+JHtwbGF5ZXIubmFtZX08L3A+XG4gICAgPGlucHV0IGNsYXNzPVwicGxheWVyLW5hbWUtaW5wdXQgaGlkZGVuXCIgdHlwZT1cInRleHRcIiByZXF1aXJlZCB2YWx1ZT1cIiR7cGxheWVyLm5hbWV9XCIgLz5cbiAgYDtcbiAgYm9hcmRDb21wb25lbnQuYXBwZW5kQ2hpbGQoYm9hcmRIZWFkZXIpO1xuXG4gIGxldCByYW5kb21pemVCdXR0b24sIGVkaXRCdXR0b24sIHNhdmVCdXR0b247XG4gIGlmIChwbGF5ZXIudHlwZSA9PT0gUGxheWVyVHlwZS5IVU1BTikge1xuICAgIHJhbmRvbWl6ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgcmFuZG9taXplQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJyYW5kb21pemUtYm9hcmRcIik7XG4gICAgcmFuZG9taXplQnV0dG9uLnRpdGxlID0gXCJSYW5kb21pemUgc2hpcCBwbGFjZW1lbnRcIjtcbiAgICByYW5kb21pemVCdXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XG4gICAgY29uc3QgcmVmcmVzaEljb24gPSBuZXcgSW1hZ2UoKTtcbiAgICByZWZyZXNoSWNvbi5zcmMgPSByZWZyZXNoU3ZnO1xuICAgIHJhbmRvbWl6ZUJ1dHRvbi5hcHBlbmRDaGlsZChyZWZyZXNoSWNvbik7XG5cbiAgICBlZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBlZGl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJlZGl0LWJvYXJkXCIpO1xuICAgIGVkaXRCdXR0b24udGl0bGUgPSBcIkVkaXQgYm9hcmQgKGNoYW5nZSBuYW1lLCBtb3ZlIHNoaXBzKVwiO1xuICAgIGVkaXRCdXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XG4gICAgY29uc3QgZWRpdEljb24gPSBuZXcgSW1hZ2UoKTtcbiAgICBlZGl0SWNvbi5zcmMgPSBlZGl0U3ZnO1xuICAgIGVkaXRCdXR0b24uYXBwZW5kQ2hpbGQoZWRpdEljb24pO1xuXG4gICAgc2F2ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgc2F2ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwic2F2ZS1ib2FyZFwiLCBcImhpZGRlblwiKTtcbiAgICBzYXZlQnV0dG9uLnRpdGxlID0gXCJTYXZlIGJvYXJkXCI7XG4gICAgc2F2ZUJ1dHRvbi50eXBlID0gXCJidXR0b25cIjtcbiAgICBjb25zdCBzYXZlSWNvbiA9IG5ldyBJbWFnZSgpO1xuICAgIHNhdmVJY29uLnNyYyA9IHNhdmVTdmc7XG4gICAgc2F2ZUJ1dHRvbi5hcHBlbmRDaGlsZChzYXZlSWNvbik7XG5cbiAgICBjb25zdCBib2FyZENvbnRyb2xzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBib2FyZENvbnRyb2xzLmNsYXNzTGlzdC5hZGQoXCJib2FyZC1jb250cm9sc1wiKTtcbiAgICBib2FyZENvbnRyb2xzLmFwcGVuZENoaWxkKHJhbmRvbWl6ZUJ1dHRvbik7XG4gICAgYm9hcmRDb250cm9scy5hcHBlbmRDaGlsZChlZGl0QnV0dG9uKTtcbiAgICBib2FyZENvbnRyb2xzLmFwcGVuZENoaWxkKHNhdmVCdXR0b24pO1xuICAgIGJvYXJkSGVhZGVyLmFwcGVuZENoaWxkKGJvYXJkQ29udHJvbHMpO1xuICB9XG5cbiAgY29uc3QgYm9hcmRDZWxscyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGJvYXJkQ2VsbHMuY2xhc3NMaXN0LmFkZChcImJvYXJkLWNlbGxzXCIpO1xuICBib2FyZENvbXBvbmVudC5hcHBlbmRDaGlsZChib2FyZENlbGxzKTtcblxuICBjb25zdCB3aW5kb3dXaWR0aCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtcbiAgY29uc3Qgd2luZG93SGVpZ2h0ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodDtcbiAgY29uc3QgaXNWZXJ0aWNhbFNjcmVlbiA9IHdpbmRvd0hlaWdodCA+IHdpbmRvd1dpZHRoO1xuICBjb25zdCBjZWxsU2l6ZSA9XG4gICAgKChpc1ZlcnRpY2FsU2NyZWVuID8gNSA6IDQpIC8gMTAwKSAqXG4gICAgKGlzVmVydGljYWxTY3JlZW4gPyB3aW5kb3dXaWR0aCA6IHdpbmRvd0hlaWdodCk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBib2FyZC5jZWxscy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHJvd0NvbXBvbmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcm93Q29tcG9uZW50LmNsYXNzTGlzdC5hZGQoXCJyb3dcIik7XG5cbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGJvYXJkLmNlbGxzW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICBjb25zdCBjZWxsQ29tcG9uZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIGNlbGxDb21wb25lbnQuY2xhc3NMaXN0LmFkZChcImNlbGxcIik7XG4gICAgICBjZWxsQ29tcG9uZW50LmNsYXNzTGlzdC5hZGQoZ2V0Q2VsbENsYXNzTmFtZShbaiwgaV0sIGJvYXJkKSk7XG5cbiAgICAgIGNlbGxDb21wb25lbnQuc3R5bGUud2lkdGggPSBgJHtjZWxsU2l6ZX1weGA7XG4gICAgICBjZWxsQ29tcG9uZW50LnN0eWxlLmhlaWdodCA9IGAke2NlbGxTaXplfXB4YDtcblxuICAgICAgcm93Q29tcG9uZW50LmFwcGVuZENoaWxkKGNlbGxDb21wb25lbnQpO1xuICAgIH1cblxuICAgIGJvYXJkQ2VsbHMuYXBwZW5kQ2hpbGQocm93Q29tcG9uZW50KTtcbiAgfVxuXG4gIGNvbnN0IHNoaXBzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgc2hpcHNDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImJvYXJkLXNoaXBzXCIpO1xuICBib2FyZENlbGxzLmFwcGVuZENoaWxkKHNoaXBzQ29udGFpbmVyKTtcblxuICBjb25zdCBET01Cb2FyZCA9IHtcbiAgICBjb21wb25lbnQ6IGJvYXJkQ29tcG9uZW50LFxuICAgIGJvYXJkOiBib2FyZCxcbiAgICBhY3RpdmU6IGZhbHNlLFxuICAgIGVkaXRpbmc6IGZhbHNlLFxuXG4gICAgY2VsbFNpemUsXG5cbiAgICBpc0F0dGFja2FibGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBhdHRhY2thYmxlO1xuICAgIH0sXG5cbiAgICBpc011dGFibGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBtdXRhYmxlO1xuICAgIH0sXG5cbiAgICBjbGVhcjogZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgbW92aW5nQ2VsbHMgPVxuICAgICAgICB0aGlzLmNvbXBvbmVudC5jaGlsZHJlblsxXS5xdWVyeVNlbGVjdG9yQWxsKFwiLm1vdmluZ1wiKTtcbiAgICAgIGlmIChtb3ZpbmdDZWxscy5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgIGZvciAoY29uc3QgY2VsbCBvZiBtb3ZpbmdDZWxscykge1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoXCJtb3ZpbmdcIik7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgQXJyYXkuZnJvbSh0aGlzLmNvbXBvbmVudC5jaGlsZHJlblsxXS5jaGlsZHJlbikuZm9yRWFjaCgocm93LCBpKSA9PiB7XG4gICAgICAgIGlmIChyb3cuY2xhc3NOYW1lID09PSBcImJvYXJkLXNoaXBzXCIpIHJldHVybjtcblxuICAgICAgICBBcnJheS5mcm9tKHJvdy5jaGlsZHJlbikuZm9yRWFjaCgoY2VsbCwgaikgPT4ge1xuICAgICAgICAgIGNvbnN0IGlzTW92aW5nID0gY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb3ZpbmdcIik7XG5cbiAgICAgICAgICBjZWxsLmNsYXNzTmFtZSA9IFwiY2VsbFwiO1xuICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChnZXRDZWxsQ2xhc3NOYW1lKFtqLCBpXSwgdGhpcy5ib2FyZCkpO1xuICAgICAgICAgIGlmIChpc01vdmluZykgY2VsbC5jbGFzc0xpc3QuYWRkKFwibW92aW5nXCIpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnJlbmRlclNoaXBzKCk7XG4gICAgfSxcblxuICAgIHJlbmRlclNoaXBzOiBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBzaGlwc0NvbnRhaW5lciA9IHRoaXMuY29tcG9uZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYm9hcmQtc2hpcHNcIik7XG5cbiAgICAgIEFycmF5LmZyb20oc2hpcHNDb250YWluZXIuY2hpbGRyZW4pLmZvckVhY2goKHNoaXBJbWFnZSkgPT4ge1xuICAgICAgICBzaGlwc0NvbnRhaW5lci5yZW1vdmVDaGlsZChzaGlwSW1hZ2UpO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGdyaWRHYXAgPSB0aGlzLmNlbGxTaXplIC8gMTA7XG5cbiAgICAgIHRoaXMuYm9hcmQuc2hpcHMuZm9yRWFjaCgoc2hpcCwgaSkgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgIXRoaXMuY29tcG9uZW50LmNsYXNzTGlzdC5jb250YWlucyhcImVkaXRpbmdcIikgJiZcbiAgICAgICAgICAhdGhpcy5jb21wb25lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwib25seS1odW1hblwiKSAmJlxuICAgICAgICAgICghdGhpcy5jb21wb25lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYXR0YWNraW5nXCIpIHx8XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIikpICYmXG4gICAgICAgICAgIXNoaXAuaXNTdW5rKClcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgeCA9IHNoaXAuY29vcmRpbmF0ZXNbMF07XG4gICAgICAgIGNvbnN0IHkgPSBzaGlwLmNvb3JkaW5hdGVzWzFdO1xuXG4gICAgICAgIGNvbnN0IHNoaXBJbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBzd2l0Y2ggKHNoaXAudHlwZSkge1xuICAgICAgICAgIGNhc2UgU2hpcFR5cGUuQ0FSUklFUjpcbiAgICAgICAgICAgIHNoaXBJbWFnZS5zcmMgPSBjYXJyaWVyU3ZnO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBTaGlwVHlwZS5CQVRUTEVTSElQOlxuICAgICAgICAgICAgc2hpcEltYWdlLnNyYyA9IGJhdHRsZXNoaXBTdmc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFNoaXBUeXBlLkRFU1RST1lFUjpcbiAgICAgICAgICAgIHNoaXBJbWFnZS5zcmMgPSBkZXN0cm95ZXJTdmc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFNoaXBUeXBlLlNVQk1BUklORTpcbiAgICAgICAgICAgIHNoaXBJbWFnZS5zcmMgPSBzdWJtYXJpbmVTdmc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFNoaXBUeXBlLlBBVFJPTDpcbiAgICAgICAgICAgIHNoaXBJbWFnZS5zcmMgPSBwYXRyb2xTdmc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBzaGlwSW1hZ2UuYWx0ID0gc2hpcC50eXBlO1xuICAgICAgICBzaGlwSW1hZ2UudGl0bGUgPSBzaGlwLnR5cGU7XG4gICAgICAgIHNoaXBJbWFnZS5jbGFzc05hbWUgPSBgc2hpcC1pbWdgO1xuICAgICAgICBzaGlwSW1hZ2UuY2xhc3NMaXN0LmFkZChgc2hpcC0ke2l9YCk7XG5cbiAgICAgICAgaWYgKHNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgICBzaGlwSW1hZ2UuY2xhc3NMaXN0LmFkZChgc2hpcC1zdW5rYCk7XG4gICAgICAgIH1cblxuICAgICAgICBzaGlwSW1hZ2Uuc3R5bGUud2lkdGggPSBgJHs0Ljc1ICogKHRoaXMuY2VsbFNpemUgKyBncmlkR2FwKX1weGA7XG4gICAgICAgIHNoaXBJbWFnZS5zdHlsZS5oZWlnaHQgPSBgYXV0b2A7XG5cbiAgICAgICAgaWYgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICAgIHNoaXBJbWFnZS5zdHlsZS50cmFuc2Zvcm1PcmlnaW4gPSBcInRvcCBsZWZ0XCI7XG4gICAgICAgICAgc2hpcEltYWdlLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGUoOTBkZWcpIHRyYW5zbGF0ZVkoLSR7Y2VsbFNpemV9cHgpYDtcbiAgICAgICAgfVxuXG4gICAgICAgIHNoaXBJbWFnZS5zdHlsZS5sZWZ0ID0gYCR7eCAqICh0aGlzLmNlbGxTaXplICsgZ3JpZEdhcCl9cHhgO1xuICAgICAgICBzaGlwSW1hZ2Uuc3R5bGUudG9wID0gYCR7eSAqICh0aGlzLmNlbGxTaXplICsgZ3JpZEdhcCl9cHhgO1xuXG4gICAgICAgIHNoaXBzQ29udGFpbmVyLmFwcGVuZENoaWxkKHNoaXBJbWFnZSk7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgcmFuZG9taXplRm9ybWF0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICB0aGlzLmJvYXJkLnJlc2V0KCk7XG5cbiAgICAgIGZvciAoY29uc3QgdHlwZSBvZiBPYmplY3Qua2V5cyhTaGlwVHlwZSkpIHtcbiAgICAgICAgY29uc3Qgc2hpcExlbmd0aCA9IGdldFNoaXBMZW5ndGgoU2hpcFR5cGVbdHlwZV0pO1xuXG4gICAgICAgIGxldCBwbGFjZWQgPSBmYWxzZTtcbiAgICAgICAgd2hpbGUgKCFwbGFjZWQpIHtcbiAgICAgICAgICBjb25zdCBvcmllbnRhdGlvbiA9XG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpID4gMC41XG4gICAgICAgICAgICAgID8gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUxcbiAgICAgICAgICAgICAgOiBTaGlwT3JpZW50YXRpb24uVkVSVElDQUw7XG5cbiAgICAgICAgICBjb25zdCB4ID0gTWF0aC5mbG9vcihcbiAgICAgICAgICAgIE1hdGgucmFuZG9tKCkgKlxuICAgICAgICAgICAgICAoMTAgLVxuICAgICAgICAgICAgICAgIChvcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwgPyBzaGlwTGVuZ3RoIDogMCkpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgY29uc3QgeSA9IE1hdGguZmxvb3IoXG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpICpcbiAgICAgICAgICAgICAgKDEwIC1cbiAgICAgICAgICAgICAgICAob3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCA/IHNoaXBMZW5ndGggOiAwKSksXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIHBsYWNlZCA9IHRoaXMuYm9hcmQucGxhY2VTaGlwKFxuICAgICAgICAgICAgY3JlYXRlU2hpcChTaGlwVHlwZVt0eXBlXSwgW3gsIHldLCBvcmllbnRhdGlvbiksXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH0sXG5cbiAgICB0b2dnbGVTaGlwTW90aW9uOiBmdW5jdGlvbiAoY29vcmRpbmF0ZXMsIG1vdmluZ1NoaXAgPSBudWxsKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGNvb3JkaW5hdGVzWzBdIDwgMCB8fFxuICAgICAgICBjb29yZGluYXRlc1sxXSA8IDAgfHxcbiAgICAgICAgY29vcmRpbmF0ZXNbMF0gPj0gdGhpcy5ib2FyZC5zaXplIHx8XG4gICAgICAgIGNvb3JkaW5hdGVzWzFdID49IHRoaXMuYm9hcmQuc2l6ZVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBtb3ZpbmdTaGlwICYmXG4gICAgICAgICgobW92aW5nU2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwgJiZcbiAgICAgICAgICBjb29yZGluYXRlc1swXSA+PSB0aGlzLmJvYXJkLnNpemUgLSBtb3ZpbmdTaGlwLmxlbmd0aCArIDEpIHx8XG4gICAgICAgICAgKG1vdmluZ1NoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCAmJlxuICAgICAgICAgICAgY29vcmRpbmF0ZXNbMV0gPj0gdGhpcy5ib2FyZC5zaXplIC0gbW92aW5nU2hpcC5sZW5ndGggKyAxKSlcbiAgICAgICkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICghbW92aW5nU2hpcCkge1xuICAgICAgICBjb25zdCBjZWxsID1cbiAgICAgICAgICB0aGlzLmNvbXBvbmVudC5jaGlsZHJlblsxXS5jaGlsZHJlbltjb29yZGluYXRlc1sxXV0uY2hpbGRyZW5bXG4gICAgICAgICAgICBjb29yZGluYXRlc1swXVxuICAgICAgICAgIF07XG4gICAgICAgIGlmICghY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJzaGlwXCIpKSByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxldCBzaGlwLCBsZW5ndGgsIG9yaWVudGF0aW9uO1xuXG4gICAgICBpZiAobW92aW5nU2hpcCkge1xuICAgICAgICBsZW5ndGggPSBtb3ZpbmdTaGlwLmxlbmd0aDtcbiAgICAgICAgb3JpZW50YXRpb24gPSBtb3ZpbmdTaGlwLm9yaWVudGF0aW9uO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2hpcCA9IHRoaXMuYm9hcmQuc2hpcHNbdGhpcy5ib2FyZC5nZXRTaGlwSW5kZXgoY29vcmRpbmF0ZXMpXTtcbiAgICAgICAgY29vcmRpbmF0ZXMgPSBzaGlwLmNvb3JkaW5hdGVzO1xuICAgICAgICBsZW5ndGggPSBzaGlwLmxlbmd0aDtcbiAgICAgICAgb3JpZW50YXRpb24gPSBzaGlwLm9yaWVudGF0aW9uO1xuICAgICAgfVxuXG4gICAgICBzd2l0Y2ggKG9yaWVudGF0aW9uKSB7XG4gICAgICAgIGNhc2UgU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUw6XG4gICAgICAgICAgZm9yIChsZXQgaSA9IGNvb3JkaW5hdGVzWzBdOyBpIDw9IGNvb3JkaW5hdGVzWzBdICsgbGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5jaGlsZHJlblsxXS5jaGlsZHJlbltjb29yZGluYXRlc1sxXV0uY2hpbGRyZW5bXG4gICAgICAgICAgICAgIGlcbiAgICAgICAgICAgIF0uY2xhc3NMaXN0LnRvZ2dsZShcIm1vdmluZ1wiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMOlxuICAgICAgICAgIGZvciAobGV0IGkgPSBjb29yZGluYXRlc1sxXTsgaSA8PSBjb29yZGluYXRlc1sxXSArIGxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuY2hpbGRyZW5bMV0uY2hpbGRyZW5baV0uY2hpbGRyZW5bXG4gICAgICAgICAgICAgIGNvb3JkaW5hdGVzWzBdXG4gICAgICAgICAgICBdLmNsYXNzTGlzdC50b2dnbGUoXCJtb3ZpbmdcIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBtb3ZlU2hpcDogZnVuY3Rpb24gKGtleSkge1xuICAgICAgY29uc3QgbW92aW5nU2hpcENlbGwgPVxuICAgICAgICB0aGlzLmNvbXBvbmVudC5jaGlsZHJlblsxXS5xdWVyeVNlbGVjdG9yKFwiLm1vdmluZ1wiKTtcblxuICAgICAgaWYgKCFtb3ZpbmdTaGlwQ2VsbCkgcmV0dXJuO1xuXG4gICAgICBjb25zdCBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXMgPSBnZXRDZWxsSW5kZXgobW92aW5nU2hpcENlbGwpO1xuICAgICAgY29uc3QgbW92aW5nU2hpcEluZGV4ID0gdGhpcy5ib2FyZC5nZXRTaGlwSW5kZXgobW92aW5nU2hpcENvb3JkaW5hdGVzKTtcblxuICAgICAgdGhpcy50b2dnbGVTaGlwTW90aW9uKG1vdmluZ1NoaXBDb29yZGluYXRlcyk7XG5cbiAgICAgIGxldCBtb3ZlU3VjY2Vzc2Z1bCA9IGZhbHNlO1xuICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgY2FzZSBcIkFycm93VXBcIjpcbiAgICAgICAgICBpZiAobW92aW5nU2hpcENvb3JkaW5hdGVzWzFdIDw9IDApIGJyZWFrO1xuICAgICAgICAgIG1vdmVTdWNjZXNzZnVsID0gdGhpcy5ib2FyZC5tb3ZlU2hpcChtb3ZpbmdTaGlwSW5kZXgsIFtcbiAgICAgICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlc1swXSxcbiAgICAgICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlc1sxXSAtIDEsXG4gICAgICAgICAgXSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd0xlZnRcIjpcbiAgICAgICAgICBpZiAobW92aW5nU2hpcENvb3JkaW5hdGVzWzBdIDw9IDApIGJyZWFrO1xuICAgICAgICAgIG1vdmVTdWNjZXNzZnVsID0gdGhpcy5ib2FyZC5tb3ZlU2hpcChtb3ZpbmdTaGlwSW5kZXgsIFtcbiAgICAgICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlc1swXSAtIDEsXG4gICAgICAgICAgICBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMV0sXG4gICAgICAgICAgXSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd0Rvd25cIjpcbiAgICAgICAgICBpZiAobW92aW5nU2hpcENvb3JkaW5hdGVzWzFdID49IHRoaXMuYm9hcmQuc2l6ZSAtIDEpIGJyZWFrO1xuICAgICAgICAgIG1vdmVTdWNjZXNzZnVsID0gdGhpcy5ib2FyZC5tb3ZlU2hpcChtb3ZpbmdTaGlwSW5kZXgsIFtcbiAgICAgICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlc1swXSxcbiAgICAgICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlc1sxXSArIDEsXG4gICAgICAgICAgXSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd1JpZ2h0XCI6XG4gICAgICAgICAgaWYgKG1vdmluZ1NoaXBDb29yZGluYXRlc1swXSA+PSB0aGlzLmJvYXJkLnNpemUgLSAxKSBicmVhaztcbiAgICAgICAgICBtb3ZlU3VjY2Vzc2Z1bCA9IHRoaXMuYm9hcmQubW92ZVNoaXAobW92aW5nU2hpcEluZGV4LCBbXG4gICAgICAgICAgICBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMF0gKyAxLFxuICAgICAgICAgICAgbW92aW5nU2hpcENvb3JkaW5hdGVzWzFdLFxuICAgICAgICAgIF0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBpZiAoIW1vdmVTdWNjZXNzZnVsKSB7XG4gICAgICAgIHRoaXMudG9nZ2xlU2hpcE1vdGlvbihtb3ZpbmdTaGlwQ29vcmRpbmF0ZXMpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgICAgIGNvbnN0IG1vdmVkU2hpcCA9IHRoaXMuYm9hcmQuc2hpcHNbbW92aW5nU2hpcEluZGV4XTtcbiAgICAgIHRoaXMudG9nZ2xlU2hpcE1vdGlvbihtb3ZlZFNoaXAuY29vcmRpbmF0ZXMpO1xuICAgIH0sXG5cbiAgICByZWNlaXZlQXR0YWNrOiBmdW5jdGlvbiAoY29vcmRpbmF0ZXMpIHtcbiAgICAgIGNvbnN0IGNlbGwgPSBib2FyZC5jZWxsc1tjb29yZGluYXRlc1sxXV1bY29vcmRpbmF0ZXNbMF1dO1xuICAgICAgaWYgKGNlbGwgIT09IENlbGxTdGF0ZS5FTVBUWSAmJiBjZWxsICE9PSBDZWxsU3RhdGUuU0hJUCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlc3VsdCA9IGJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpO1xuICAgICAgdGhpcy5yZW5kZXIoKTtcblxuICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuXG4gICAgY29tcHV0ZXJBdHRhY2s6IGFzeW5jIGZ1bmN0aW9uIChhdHRhY2tlckluZGV4KSB7XG4gICAgICBsZXQgeCwgeTtcblxuICAgICAgbGV0IHZhbGlkID0gZmFsc2U7XG4gICAgICB3aGlsZSAoIXZhbGlkKSB7XG4gICAgICAgIHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBib2FyZC5zaXplKTtcbiAgICAgICAgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGJvYXJkLnNpemUpO1xuXG4gICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmNvbXBvbmVudC5jaGlsZHJlblsxXS5jaGlsZHJlblt5XS5jaGlsZHJlblt4XTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZW1wdHlcIikgfHxcbiAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5jb250YWlucyhcInNoaXBcIilcbiAgICAgICAgKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHIpID0+IHNldFRpbWVvdXQociwgNTAwKSk7XG5cbiAgICAgIGNvbnN0IGF0dGFjayA9IHRoaXMucmVjZWl2ZUF0dGFjayhbeCwgeV0pO1xuICAgICAgZ2FtZS51cGRhdGVBdHRhY2tJbmZvKGF0dGFjay5yZXN1bHQsIGF0dGFjay5zaGlwLCBhdHRhY2tlckluZGV4KTtcbiAgICB9LFxuICB9O1xuXG4gIGZ1bmN0aW9uIHNhdmVFZGl0cygpIHtcbiAgICBpZiAoIURPTUJvYXJkLmNvbXBvbmVudC5jaGlsZHJlblswXS5yZXBvcnRWYWxpZGl0eSgpKSByZXR1cm47XG4gICAgYm9hcmRIZWFkZXIucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItbmFtZVwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgIGJvYXJkSGVhZGVyLnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLW5hbWUtaW5wdXRcIikuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICBib2FyZEhlYWRlci5xdWVyeVNlbGVjdG9yKFwiLmVkaXQtYm9hcmRcIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICBzYXZlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG5cbiAgICBET01Cb2FyZC5lZGl0aW5nID0gZmFsc2U7XG4gICAgRE9NQm9hcmQuY29tcG9uZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJlZGl0aW5nXCIpO1xuICAgIERPTUJvYXJkLmNsZWFyKCk7XG4gIH1cblxuICBpZiAocGxheWVyLnR5cGUgPT09IFBsYXllclR5cGUuSFVNQU4pIHtcbiAgICByYW5kb21pemVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIERPTUJvYXJkLnJhbmRvbWl6ZUZvcm1hdGlvbigpO1xuICAgIH0pO1xuXG4gICAgZWRpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZWRpdGluZ1wiKSkge1xuICAgICAgICBhbGVydChcIlBsZWFzZSBzYXZlIHRoZSBjdXJyZW50bHkgZWRpdGluZyBib2FyZCBmaXJzdFwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBib2FyZEhlYWRlciA9IERPTUJvYXJkLmNvbXBvbmVudC5jaGlsZHJlblswXTtcblxuICAgICAgYm9hcmRIZWFkZXIucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItbmFtZVwiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgYm9hcmRIZWFkZXJcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLW5hbWUtaW5wdXRcIilcbiAgICAgICAgLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICBlZGl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICBib2FyZEhlYWRlci5xdWVyeVNlbGVjdG9yKFwiLnNhdmUtYm9hcmRcIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcblxuICAgICAgRE9NQm9hcmQuZWRpdGluZyA9IHRydWU7XG4gICAgICBET01Cb2FyZC5jb21wb25lbnQuY2xhc3NMaXN0LmFkZChcImVkaXRpbmdcIik7XG4gICAgICBET01Cb2FyZC5yZW5kZXIoKTtcbiAgICB9KTtcblxuICAgIGJvYXJkSGVhZGVyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItbmFtZS1pbnB1dFwiKVxuICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgIHBsYXllci5uYW1lID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICBib2FyZEhlYWRlci5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1uYW1lXCIpLnRleHRDb250ZW50ID0gcGxheWVyLm5hbWU7XG4gICAgICB9KTtcblxuICAgIHNhdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNhdmVFZGl0cyk7XG5cbiAgICBib2FyZEhlYWRlci5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldmVudCkgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHNhdmVFZGl0cygpO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIERPTUJvYXJkO1xufVxuXG5mdW5jdGlvbiBnZXRDZWxsSW5kZXgoY2VsbCkge1xuICByZXR1cm4gW1xuICAgIEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoY2VsbC5wYXJlbnROb2RlLmNoaWxkcmVuLCBjZWxsKSxcbiAgICBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKFxuICAgICAgY2VsbC5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2hpbGRyZW4sXG4gICAgICBjZWxsLnBhcmVudE5vZGUsXG4gICAgKSxcbiAgXTtcbn1cblxuZnVuY3Rpb24gZ2V0Q2VsbENsYXNzTmFtZShjb29yZGluYXRlcywgYm9hcmQsIHNlY3JldCA9IGZhbHNlKSB7XG4gIGNvbnN0IGNlbGwgPSBib2FyZC5jZWxsc1tjb29yZGluYXRlc1sxXV1bY29vcmRpbmF0ZXNbMF1dO1xuICBzd2l0Y2ggKGNlbGwpIHtcbiAgICBjYXNlIENlbGxTdGF0ZS5FTVBUWTpcbiAgICAgIHJldHVybiBcImVtcHR5XCI7XG4gICAgY2FzZSBDZWxsU3RhdGUuTUlTUzpcbiAgICAgIHJldHVybiBcIm1pc3NcIjtcbiAgICBjYXNlIENlbGxTdGF0ZS5TSElQOlxuICAgICAgcmV0dXJuIHNlY3JldCA/IFwiZW1wdHlcIiA6IFwic2hpcFwiO1xuICAgIGNhc2UgQ2VsbFN0YXRlLkhJVDpcbiAgICAgIHJldHVybiBcImhpdFwiO1xuICAgIGNhc2UgQ2VsbFN0YXRlLlNVTks6XG4gICAgICByZXR1cm4gXCJzdW5rXCI7XG4gIH1cbn1cbiIsImltcG9ydCB7IENlbGxTdGF0ZSB9IGZyb20gXCIuLi9jb3JlL2dhbWVCb2FyZC5qc1wiO1xuaW1wb3J0IHsgUGxheWVyVHlwZSB9IGZyb20gXCIuLi9jb3JlL3BsYXllci5qc1wiO1xuaW1wb3J0IHsgc2V0dXBHYW1lQm9hcmRzIH0gZnJvbSBcIi4vYm9hcmRzLmpzXCI7XG5cbmV4cG9ydCBjb25zdCBHYW1lTW9kZSA9IE9iamVjdC5mcmVlemUoe1xuICBDT01QVVRFUjogXCJjb21wdXRlclwiLFxuICBGUklFTkQ6IFwiZnJpZW5kXCIsXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwR2FtZShwbGF5ZXJPbmUsIHBsYXllclR3bywgbW9kZSkge1xuICBjb25zdCBnYW1lID0ge1xuICAgIG1vZGUsXG5cbiAgICBwbGF5ZXJzOiBbcGxheWVyT25lLCBwbGF5ZXJUd29dLFxuICAgIGN1cnJlbnRQbGF5ZXJJbmRleDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMiksXG5cbiAgICBpc0luUHJvZ3Jlc3M6IGZhbHNlLFxuICAgIGlzR2FtZU92ZXI6IGZhbHNlLFxuICAgIGlzUGxheWVyV2FpdGluZzogZmFsc2UsXG5cbiAgICBib2FyZHM6IFtdLFxuXG4gICAgc3RhcnQ6IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuaXNJblByb2dyZXNzID0gdHJ1ZTtcbiAgICAgIHRoaXMuaXNHYW1lT3ZlciA9IGZhbHNlO1xuICAgICAgdGhpcy5pc1BsYXllcldhaXRpbmcgPSBmYWxzZTtcblxuICAgICAgdGhpcy5ib2FyZHNbMF0uY2xlYXIoKTtcblxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGFydFwiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXNldFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ib2FyZC1pbmZvXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlbHAtaW5mb1wiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hdHRhY2staW5mb1wiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb290XCIpLmNsYXNzTGlzdC5hZGQoXCJpbi1wcm9ncmVzc1wiKTtcblxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ib2FyZC1jb250cm9sc1wiKS5mb3JFYWNoKChib2FyZENvbnRyb2xzKSA9PiB7XG4gICAgICAgIGJvYXJkQ29udHJvbHMuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIH0pO1xuXG4gICAgICBhd2FpdCB0aGlzLnBsYXkoKTtcbiAgICB9LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IGdhbWVPdmVyU2NyZWVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lLW92ZXItc2NyZWVuXCIpO1xuICAgICAgaWYgKGdhbWVPdmVyU2NyZWVuKSBnYW1lT3ZlclNjcmVlbi5yZW1vdmUoKTtcblxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGFydFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXNldFwiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ib2FyZC1pbmZvXCIpLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlbHAtaW5mb1wiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hdHRhY2staW5mb1wiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb290XCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJpbi1wcm9ncmVzc1wiKTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcm9vdFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiYXR0YWNrLWFsbG93ZWRcIik7XG5cbiAgICAgIHRoaXMuaXNJblByb2dyZXNzID0gZmFsc2U7XG4gICAgICB0aGlzLmlzR2FtZU92ZXIgPSB0cnVlO1xuICAgICAgdGhpcy5pc1BsYXllcldhaXRpbmcgPSBmYWxzZTtcblxuICAgICAgdGhpcy5wbGF5ZXJzWzBdLmJvYXJkLnJlc2V0KCk7XG4gICAgICB0aGlzLnBsYXllcnNbMV0uYm9hcmQucmVzZXQoKTtcblxuICAgICAgdGhpcy5ib2FyZHMgPSBzZXR1cEdhbWVCb2FyZHModGhpcywgdGhpcy5wbGF5ZXJzWzBdLCB0aGlzLnBsYXllcnNbMV0pO1xuXG4gICAgICB0aGlzLmJvYXJkc1swXS5yYW5kb21pemVGb3JtYXRpb24oKTtcbiAgICAgIHRoaXMuYm9hcmRzWzFdLnJhbmRvbWl6ZUZvcm1hdGlvbigpO1xuXG4gICAgICBjb25zdCBib2FyZHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJvYXJkc1wiKTtcbiAgICAgIEFycmF5LmZyb20oYm9hcmRzQ29udGFpbmVyLmNoaWxkcmVuKS5mb3JFYWNoKChib2FyZCkgPT4ge1xuICAgICAgICBib2FyZHNDb250YWluZXIucmVtb3ZlQ2hpbGQoYm9hcmQpO1xuICAgICAgfSk7XG4gICAgICBib2FyZHNDb250YWluZXIuYXBwZW5kKFxuICAgICAgICB0aGlzLmJvYXJkc1swXS5jb21wb25lbnQsXG4gICAgICAgIHRoaXMuYm9hcmRzWzFdLmNvbXBvbmVudCxcbiAgICAgICk7XG4gICAgfSxcblxuICAgIHBsYXk6IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBjdXJyZW50UGxheWVyID0gdGhpcy5wbGF5ZXJzW3RoaXMuY3VycmVudFBsYXllckluZGV4XTtcbiAgICAgIGxldCBuZXh0UGxheWVySW5kZXggPSAodGhpcy5jdXJyZW50UGxheWVySW5kZXggKyAxKSAlIDI7XG4gICAgICBsZXQgbmV4dFBsYXllciA9IHRoaXMucGxheWVyc1tuZXh0UGxheWVySW5kZXhdO1xuXG4gICAgICB3aGlsZSAoIXRoaXMuaXNHYW1lT3Zlcikge1xuICAgICAgICBpZiAoY3VycmVudFBsYXllci5ib2FyZC5pc0ZsZWV0RGVzdHJveWVkKCkpIHtcbiAgICAgICAgICB0aGlzLmlzR2FtZU92ZXIgPSB0cnVlO1xuXG4gICAgICAgICAgdGhpcy5ib2FyZHNbKHRoaXMuY3VycmVudFBsYXllckluZGV4ICsgMSkgJSAyXS5jb21wb25lbnQuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICBjcmVhdGVHYW1lT3ZlclNjcmVlbihjdXJyZW50UGxheWVyLCBuZXh0UGxheWVyLCB0aGlzKSxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ib2FyZC1pbmZvXCIpLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc1BsYXllcldhaXRpbmcpIHtcbiAgICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCAxMDApKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jvb3RcIikuY2xhc3NMaXN0LnJlbW92ZShcImF0dGFjay1hbGxvd2VkXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgY3VycmVudFBsYXllciA9IHRoaXMucGxheWVyc1t0aGlzLmN1cnJlbnRQbGF5ZXJJbmRleF07XG4gICAgICAgIG5leHRQbGF5ZXJJbmRleCA9ICh0aGlzLmN1cnJlbnRQbGF5ZXJJbmRleCArIDEpICUgMjtcbiAgICAgICAgbmV4dFBsYXllciA9IHRoaXMucGxheWVyc1tuZXh0UGxheWVySW5kZXhdO1xuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgYC5ib2FyZC0ke3RoaXMuY3VycmVudFBsYXllckluZGV4ID09PSAwID8gXCJ0d29cIiA6IFwib25lXCJ9LWluZm9gLFxuICAgICAgICApLnRleHRDb250ZW50ID1cbiAgICAgICAgICBgJHtuZXh0UGxheWVyLnR5cGUgPT09IFBsYXllclR5cGUuQ09NUFVURVIgPyBcIllvdXJcIiA6IGN1cnJlbnRQbGF5ZXIubmFtZSArIFwiJ3NcIn0gdHVybmA7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgYC5ib2FyZC0ke3RoaXMuY3VycmVudFBsYXllckluZGV4ID09PSAwID8gXCJvbmVcIiA6IFwidHdvXCJ9LWluZm9gLFxuICAgICAgICApLnRleHRDb250ZW50ID0gXCJcIjtcblxuICAgICAgICB0aGlzLmJvYXJkc1t0aGlzLmN1cnJlbnRQbGF5ZXJJbmRleF0uY29tcG9uZW50LmNsYXNzTGlzdC5yZW1vdmUoXG4gICAgICAgICAgXCJhY3RpdmVcIixcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5ib2FyZHNbdGhpcy5jdXJyZW50UGxheWVySW5kZXhdLmNvbXBvbmVudC5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAgIFwiYXR0YWNraW5nXCIsXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5ib2FyZHNbbmV4dFBsYXllckluZGV4XS5jb21wb25lbnQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICAgICAgdGhpcy5ib2FyZHNbbmV4dFBsYXllckluZGV4XS5jb21wb25lbnQuY2xhc3NMaXN0LnJlbW92ZShcImF0dGFja2luZ1wiKTtcblxuICAgICAgICB0aGlzLmJvYXJkc1t0aGlzLmN1cnJlbnRQbGF5ZXJJbmRleF0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYm9hcmRzW25leHRQbGF5ZXJJbmRleF0uYWN0aXZlID0gdHJ1ZTtcblxuICAgICAgICBpZiAoY3VycmVudFBsYXllci50eXBlID09PSBQbGF5ZXJUeXBlLkNPTVBVVEVSICYmICF0aGlzLmlzR2FtZU92ZXIpIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLmJvYXJkc1tuZXh0UGxheWVySW5kZXhdLmNvbXB1dGVyQXR0YWNrKFxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGxheWVySW5kZXgsXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmlzUGxheWVyV2FpdGluZyA9IHRydWU7XG5cbiAgICAgICAgICBpZiAobmV4dFBsYXllci50eXBlICE9PSBQbGF5ZXJUeXBlLkNPTVBVVEVSKSB7XG4gICAgICAgICAgICB0aGlzLmJvYXJkc1tuZXh0UGxheWVySW5kZXhdLmNvbXBvbmVudC5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgICAgY3JlYXRlUGFzc2luZ1NjcmVlbih0aGlzLnBsYXllcnMsIHRoaXMuY3VycmVudFBsYXllckluZGV4KSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLmJvYXJkc1tuZXh0UGxheWVySW5kZXhdLnJlbmRlcigpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcm9vdFwiKS5jbGFzc0xpc3QuYWRkKFwiYXR0YWNrLWFsbG93ZWRcIik7XG5cbiAgICAgICAgICBpZiAobmV4dFBsYXllci50eXBlICE9PSBQbGF5ZXJUeXBlLkNPTVBVVEVSKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jvb3RcIikuY2xhc3NMaXN0LmFkZChcInBhc3NpbmdcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jdXJyZW50UGxheWVySW5kZXggPSBuZXh0UGxheWVySW5kZXg7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHVwZGF0ZUF0dGFja0luZm86IGZ1bmN0aW9uIChhdHRhY2tUeXBlLCBzaGlwLCBhdHRhY2tlckluZGV4KSB7XG4gICAgICBjb25zdCBhdHRhY2tJbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hdHRhY2staW5mb1wiKTtcbiAgICAgIGNvbnN0IGF0dGFja2VyID0gdGhpcy5wbGF5ZXJzW2F0dGFja2VySW5kZXhdLm5hbWU7XG4gICAgICBjb25zdCByZWNlaXZlciA9IHRoaXMucGxheWVyc1soYXR0YWNrZXJJbmRleCArIDEpICUgMl0ubmFtZTtcblxuICAgICAgc3dpdGNoIChhdHRhY2tUeXBlKSB7XG4gICAgICAgIGNhc2UgQ2VsbFN0YXRlLk1JU1M6XG4gICAgICAgICAgYXR0YWNrSW5mby50ZXh0Q29udGVudCA9IGAke2F0dGFja2VyfSBtaXNzZXMgdGhlaXIgc2hvdGA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgQ2VsbFN0YXRlLkhJVDpcbiAgICAgICAgICBhdHRhY2tJbmZvLnRleHRDb250ZW50ID0gYCR7YXR0YWNrZXJ9IGhpdHMgb25lIG9mICR7cmVjZWl2ZXJ9J3Mgc2hpcHNgO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIENlbGxTdGF0ZS5TVU5LOlxuICAgICAgICAgIGF0dGFja0luZm8udGV4dENvbnRlbnQgPSBgJHthdHRhY2tlcn0gc2lua3MgJHtyZWNlaXZlcn0ncyAke3NoaXAudHlwZX1gO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0sXG4gIH07XG5cbiAgZ2FtZS5ib2FyZHMgPSBzZXR1cEdhbWVCb2FyZHMoZ2FtZSwgcGxheWVyT25lLCBwbGF5ZXJUd28pO1xuXG4gIHJldHVybiBnYW1lO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVHYW1lT3ZlclNjcmVlbihjdXJyZW50UGxheWVyLCBuZXh0UGxheWVyLCBnYW1lKSB7XG4gIGNvbnN0IGdhbWVPdmVyU2NyZWVuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZ2FtZU92ZXJTY3JlZW4uY2xhc3NMaXN0LmFkZChcImdhbWUtb3Zlci1zY3JlZW5cIik7XG5cbiAgbGV0IGdhbWVPdmVyTWVzc2FnZTtcbiAgaWYgKGN1cnJlbnRQbGF5ZXIudHlwZSA9PT0gUGxheWVyVHlwZS5DT01QVVRFUikge1xuICAgIGdhbWVPdmVyTWVzc2FnZSA9IFwiWU9VIFdPTiBUSEUgR0FNRSFcIjtcbiAgfSBlbHNlIGlmIChuZXh0UGxheWVyLnR5cGUgPT09IFBsYXllclR5cGUuQ09NUFVURVIpIHtcbiAgICBnYW1lT3Zlck1lc3NhZ2UgPSBcIllPVSBMT1NUIFRIRSBHQU1FIVwiO1xuICB9IGVsc2Uge1xuICAgIGdhbWVPdmVyTWVzc2FnZSA9IGAke25leHRQbGF5ZXIubmFtZS50b1VwcGVyQ2FzZSgpfSBXT04gVEhFIEdBTUUhYDtcbiAgfVxuXG4gIGdhbWVPdmVyU2NyZWVuLmlubmVySFRNTCA9IGA8cD4ke2dhbWVPdmVyTWVzc2FnZX08L3A+YDtcblxuICBjb25zdCBvdXRlclJlc2V0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXNldFwiKTtcbiAgaWYgKG91dGVyUmVzZXRCdXR0b24pIG91dGVyUmVzZXRCdXR0b24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcblxuICBjb25zdCByZXNldEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIHJlc2V0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJyZXNldFwiKTtcbiAgcmVzZXRCdXR0b24udGV4dENvbnRlbnQgPSBcIlBsYXkgQWdhaW5cIjtcbiAgcmVzZXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGdhbWUucmVzZXQoKSk7XG4gIGdhbWVPdmVyU2NyZWVuLmFwcGVuZENoaWxkKHJlc2V0QnV0dG9uKTtcblxuICBjb25zdCBwYXNzaW5nU2NyZWVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYXNzaW5nLXNjcmVlblwiKTtcbiAgaWYgKHBhc3NpbmdTY3JlZW4pIHBhc3NpbmdTY3JlZW4ucmVtb3ZlKCk7XG5cbiAgcmV0dXJuIGdhbWVPdmVyU2NyZWVuO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVQYXNzaW5nU2NyZWVuKHBsYXllcnMsIGN1cnJlbnRQbGF5ZXIpIHtcbiAgY29uc3QgcGFzc2luZ1NjcmVlbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHBhc3NpbmdTY3JlZW4uY2xhc3NMaXN0LmFkZChcInBhc3Npbmctc2NyZWVuXCIpO1xuICBwYXNzaW5nU2NyZWVuLmlubmVySFRNTCA9IGBcbiAgICA8cD5QYXNzIHRoZSBkZXZpY2UgdG8gJHtwbGF5ZXJzW2N1cnJlbnRQbGF5ZXJdLm5hbWV9PC9wPlxuICBgO1xuICBjb25zdCBjb250aW51ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIGNvbnRpbnVlQnV0dG9uLnRleHRDb250ZW50ID0gXCJDb250aW51ZVwiO1xuICBjb250aW51ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHBhc3NpbmdTY3JlZW4ucmVtb3ZlKCk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYXNzaW5nXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJwYXNzaW5nXCIpO1xuICB9KTtcbiAgcGFzc2luZ1NjcmVlbi5hcHBlbmRDaGlsZChjb250aW51ZUJ1dHRvbik7XG4gIHJldHVybiBwYXNzaW5nU2NyZWVuO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUdhbWVQYWdlKGdhbWUpIHtcbiAgY29uc3QgZ2FtZVBhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBnYW1lUGFnZS5jbGFzc0xpc3QuYWRkKFwiZ2FtZS1wYWdlXCIsIFwicGFnZVwiKTtcblxuICBnYW1lUGFnZS5pbm5lckhUTUwgPSBgXG4gICAgPGRpdiBjbGFzcz1cImJvYXJkc1wiPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJpbmZvXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiYm9hcmQtaW5mbyBoaWRkZW5cIj5cbiAgICAgICAgPHAgY2xhc3M9XCJib2FyZC1vbmUtaW5mb1wiPjwvcD5cbiAgICAgICAgPHAgY2xhc3M9XCJib2FyZC10d28taW5mb1wiPjwvcD5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImdhbWUtaW5mb1wiPlxuICAgICAgICA8cCBjbGFzcz1cImhlbHAtaW5mb1wiPuKTmCBSZWFycmFuZ2UgdGhlIHNoaXBzIHRvIHlvdXIgbGlraW5nIGJ5IHByZXNzaW5nIHRoZSBlZGl0IGJ1dHRvbiwgb3IgYnkgcmVmcmVzaGluZyB0aGUgYm9hcmQ8L3A+XG4gICAgICAgIDxwIGNsYXNzPVwiYXR0YWNrLWluZm8gaGlkZGVuXCI+PC9wPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImNvbnRyb2xzXCI+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwic3RhcnRcIj5TdGFydCBHYW1lPC9idXR0b24+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwicmVzZXQgaGlkZGVuXCI+UmVzZXQgR2FtZTwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICBgO1xuXG4gIGNvbnN0IGJvYXJkc0NvbnRhaW5lciA9IGdhbWVQYWdlLnF1ZXJ5U2VsZWN0b3IoXCIuYm9hcmRzXCIpO1xuICBib2FyZHNDb250YWluZXIuYXBwZW5kKGdhbWUuYm9hcmRzWzBdLmNvbXBvbmVudCwgZ2FtZS5ib2FyZHNbMV0uY29tcG9uZW50KTtcblxuICBjb25zdCBzdGFydEJ1dHRvbiA9IGdhbWVQYWdlLnF1ZXJ5U2VsZWN0b3IoXCIuc3RhcnRcIik7XG4gIHN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgaWYgKGdhbWVQYWdlLnF1ZXJ5U2VsZWN0b3IoXCIuZWRpdGluZ1wiKSkge1xuICAgICAgYWxlcnQoXCJQbGVhc2Ugc2F2ZSB5b3VyIGJvYXJkcyBiZWZvcmUgc3RhcnRpbmcgdGhlIGdhbWVcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZ2FtZS5zdGFydCgpO1xuICB9KTtcblxuICBjb25zdCByZXNldEJ1dHRvbiA9IGdhbWVQYWdlLnF1ZXJ5U2VsZWN0b3IoXCIucmVzZXRcIik7XG4gIHJlc2V0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgZ2FtZS5yZXNldCgpO1xuICB9KTtcblxuICBnYW1lLmJvYXJkc1swXS5yZW5kZXIoKTtcbiAgZ2FtZS5ib2FyZHNbMV0ucmVuZGVyKCk7XG5cbiAgcmV0dXJuIGdhbWVQYWdlO1xufVxuIiwiaW1wb3J0IGVkaXRTdmcgZnJvbSBcIi4uLy4uLy4uL2Fzc2V0cy9lZGl0LnN2Z1wiO1xuaW1wb3J0IHJlZnJlc2hTdmcgZnJvbSBcIi4uLy4uLy4uL2Fzc2V0cy9yZWZyZXNoLWNjdy5zdmdcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUhlbHBQYWdlKCkge1xuICBjb25zdCBoZWxwUGFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGhlbHBQYWdlLmNsYXNzTGlzdC5hZGQoXCJoZWxwLXBhZ2VcIiwgXCJwYWdlXCIpO1xuXG4gIGhlbHBQYWdlLmlubmVySFRNTCA9IGBcbiAgICA8aDE+SG93IHRvIFBsYXk8L2gxPlxuICAgIDxzZWN0aW9uPlxuICAgICAgPGgzPkNob29zZSBHYW1lIE1vZGU8L2gzPlxuICAgICAgPGRpdj5cbiAgICAgICAgPHA+XG4gICAgICAgICAgQnkgZGVmYXVsdCwgeW91J2xsIGJlIHBsYXlpbmcgYWdhaW5zdCB0aGUgY29tcHV0ZXIuXG4gICAgICAgICAgSWYgeW91IHdhbnQgdG8gcGxheSB3aXRoIGEgZnJpZW5kLCBjaG9vc2UgdGhlIFwiRnJpZW5kXCIgb3B0aW9uIGluIHRoZSBvcHBvbmVudCBzZWN0aW9uLFxuICAgICAgICAgIGFuZCBwbGF5IGJ5IHBhc3NpbmcgYXJvdW5kIHlvdXIgZGV2aWNlLlxuICAgICAgICA8L3A+XG4gICAgICA8L2Rpdj5cbiAgICA8L3NlY3Rpb24+XG4gICAgPHNlY3Rpb24+XG4gICAgICA8aDM+RWRpdCB5b3VyIGJvYXJkKHMpPC9oMz5cbiAgICAgIDxkaXY+XG4gICAgICAgIDx1bD5cbiAgICAgICAgICA8bGk+Q2xpY2sgb24gdGhlIGVkaXQgYnV0dG9uICg8aW1nIGNsYXNzPVwiZWRpdC1pbWdcIiAvPikgdG8gY2hhbmdlIHRoZSBuYW1lcyBvZiB0aGUgcGxheWVycywgYW5kIG1vdmUgYXJvdW5kIHlvdXIgc2hpcHMgKHVzaW5nIGFycm93IGtleXMpLjwvbGk+XG4gICAgICAgICAgPGxpPllvdSBjYW4gYWxzbyBjbGljayB0aGUgcmVmcmVzaCBidXR0b24gKDxpbWcgY2xhc3M9XCJyZWZyZXNoLWltZ1wiIC8+KSB0byByYW5kb21pemUgdGhlIHBsYWNlbWVudCBvZiBzaGlwcyBpbiB0aGUgYm9hcmQuPC9saT5cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuICAgIDwvc2VjdGlvbj5cbiAgICA8c2VjdGlvbj5cbiAgICAgIDxoMz5TdGFydCBwbGF5aW5nITwvaDM+XG4gICAgICA8ZGl2PlxuICAgICAgICA8cD5cbiAgICAgICAgUHJlc3Mgb24gXCI8Yj5TdGFydCBHYW1lPC9iPlwiIHRvIHN0YXJ0IHBsYXlpbmcuXG4gICAgICAgIElmIHlvdSBhcmUgbm90IGZhbWlsaWFyIHdpdGggPGEgaHJlZj1cImh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0JhdHRsZXNoaXBfKGdhbWUpXCI+YmF0dGxlc2hpcDwvYT4sIGhlcmUncyBhIHF1aWNrIHJ1bi10aHJvdWdoIG9mIHRoZSBtZWNoYW5pY3M6XG4gICAgICAgIDwvcD5cbiAgICAgICAgPHVsPlxuICAgICAgICAgIDxsaT5JdCBpcyBhIHR3by1wbGF5ZXIgZ2FtZSwgd2l0aCBlYWNoIHBsYXllciBoYXZpbmcgYSBib2FyZCB3aXRoIHNoaXBzIGFycmFuZ2VkIG9uIGl0IGFjY29yZGluZyB0byB0aGVpciB3aXNoZXMuPC9saT5cbiAgICAgICAgICA8bGk+XG4gICAgICAgICAgICBUaGVyZSBhcmUgNSBzaGlwcyBvZiB2YXJ5aW5nIGxlbmd0aHM6IFxuICAgICAgICAgICAgPHRhYmxlPlxuICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRoPlNoaXA8L3RoPlxuICAgICAgICAgICAgICAgIDx0aD5TaXplPC90aD5cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0ZD5DYXJyaWVyPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQ+NTwvdGQ+XG4gICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICA8dGQ+QmF0dGxlc2hpcDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkPjQ8L3RkPlxuICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRkPkRlc3Ryb3llcjwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkPjM8L3RkPlxuICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRkPlN1Ym1hcmluZTwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkPjM8L3RkPlxuICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRkPlBhdHJvbCBCb2F0PC90ZD5cbiAgICAgICAgICAgICAgICA8dGQ+MjwvdGQ+XG4gICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgPGxpPlxuICAgICAgICAgICAgRWFjaCBwbGF5ZXIgdGFrZXMgdHVybnMgc2hvb3RpbmcgYSBzcXVhcmUgb24gdGhlIG90aGVyIHBsYXllcidzIGJvYXJkLlxuICAgICAgICAgICAgVGhleSBoYXZlIG5vIGluZm9ybWF0aW9uIG9uIHdoZXRoZXIgdGhlcmUgaXMgYSBzaGlwIG9uIHRoYXQgc3F1YXJlIG9yIG5vdC5cbiAgICAgICAgICAgIEFmdGVyIGVhY2ggdHJ5LCB0aGV5IHdpbGwgYmUgaW5mb3JtZWQgd2hldGhlciB0aGV5IGhhZCBoaXQgYSBzaGlwIG9yIG1pc3NlZCB0aGVpciBzaG90LlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgPGxpPkFmdGVyIGFsbCB0aGUgc3F1YXJlcyBvZiBhIHBhcnRpY3VsYXIgc2hpcCBpcyBoaXQsIGl0IHdpbGwgYmUgbWFya2VkIChhbmQgaW5mb3JtZWQgdG8gdGhlIHNob290aW5nIHBsYXllcikgYXMgc3Vuay48L2xpPlxuICAgICAgICAgIDxsaT5BZnRlciBhbGwgdGhlIHNoaXBzIG9mIGEgcGFydGljdWxhciBib2FyZCBpcyBzdW5rLCB0aGF0IHBsYXllciBsb3NlcyB0aGUgZ2FtZSwgYW5kIHRoZSBzaG9vdGluZyBwbGF5ZXIgd2lucy48L2xpPlxuICAgICAgICA8L3VsPlxuICAgICAgPC9kaXY+XG4gICAgPC9zZWN0aW9uPlxuICAgIDxoMSBjbGFzcz1cInRoYW5rc1wiPlRoYW5rcyBmb3IgUGxheWluZyE8L2gxPlxuICBgO1xuXG4gIGhlbHBQYWdlLnF1ZXJ5U2VsZWN0b3IoXCIuZWRpdC1pbWdcIikuc3JjID0gZWRpdFN2ZztcbiAgaGVscFBhZ2UucXVlcnlTZWxlY3RvcihcIi5yZWZyZXNoLWltZ1wiKS5zcmMgPSByZWZyZXNoU3ZnO1xuXG4gIHJldHVybiBoZWxwUGFnZTtcbn1cbiIsImltcG9ydCB7IGNyZWF0ZVBsYXllciwgUGxheWVyVHlwZSB9IGZyb20gXCIuLi8uLi9jb3JlL3BsYXllci5qc1wiO1xuaW1wb3J0IHsgR2FtZU1vZGUsIHNldHVwR2FtZSB9IGZyb20gXCIuLi9nYW1lLmpzXCI7XG5pbXBvcnQgeyBjcmVhdGVHYW1lUGFnZSB9IGZyb20gXCIuL2dhbWUuanNcIjtcbmltcG9ydCB7IGNyZWF0ZUhlbHBQYWdlIH0gZnJvbSBcIi4vaGVscC5qc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSG9tZVBhZ2UoKSB7XG4gIGxldCBnYW1lTW9kZSA9IEdhbWVNb2RlLkNPTVBVVEVSO1xuXG4gIGNvbnN0IGhvbWVQYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgaG9tZVBhZ2UuY2xhc3NMaXN0LmFkZChcImhvbWUtcGFnZVwiLCBcInBhZ2VcIik7XG5cbiAgaG9tZVBhZ2UuaW5uZXJIVE1MID0gYFxuICAgIDxkaXYgY2xhc3M9XCJvcHBvbmVudFwiPlxuICAgICAgPHA+T3Bwb25lbnQ6IDwvcD5cbiAgICAgIDxkaXYgY2xhc3M9XCJvcHRpb25zXCI+XG4gICAgICAgIDxwIGNsYXNzPVwib3Bwb25lbnQtY29tcHV0ZXIgYWN0aXZlLW1vZGVcIj5Db21wdXRlcjwvcD5cbiAgICAgICAgPHAgY2xhc3M9XCJvcHBvbmVudC1mcmllbmRcIj5GcmllbmQ8L3A+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8IS0tIDxhIGNsYXNzPVwiaGVscC1saW5rXCI+SG93IHRvIFBsYXk8L2E+IC0tPlxuICAgIDxkaXYgY2xhc3M9XCJjb250cm9sc1wiPlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cInBsYXlcIj5QbGF5IEdhbWU8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gY2xhc3M9XCJoZWxwXCI+SG93IHRvIFBsYXk8L2J1dHRvbj5cbiAgICAgIDwhLS0gPGJ1dHRvbiBjbGFzcz1cInJlc2V0IGhpZGRlblwiPlJlc2V0IEdhbWU8L2J1dHRvbj4gLS0+XG4gICAgPC9kaXY+XG4gIGA7XG5cbiAgY29uc3QgY29tcHV0ZXJPcHBvbmVudEJ1dHRvbiA9IGhvbWVQYWdlLnF1ZXJ5U2VsZWN0b3IoXCIub3Bwb25lbnQtY29tcHV0ZXJcIik7XG4gIGNvbXB1dGVyT3Bwb25lbnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBpZiAoY29tcHV0ZXJPcHBvbmVudEJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmUtbW9kZVwiKSkgcmV0dXJuO1xuXG4gICAgY29tcHV0ZXJPcHBvbmVudEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlLW1vZGVcIik7XG4gICAgZnJpZW5kT3Bwb25lbnRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZS1tb2RlXCIpO1xuICAgIGdhbWVNb2RlID0gR2FtZU1vZGUuQ09NUFVURVI7XG4gIH0pO1xuXG4gIGNvbnN0IGZyaWVuZE9wcG9uZW50QnV0dG9uID0gaG9tZVBhZ2UucXVlcnlTZWxlY3RvcihcIi5vcHBvbmVudC1mcmllbmRcIik7XG4gIGZyaWVuZE9wcG9uZW50QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgaWYgKGZyaWVuZE9wcG9uZW50QnV0dG9uLmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZS1tb2RlXCIpKSByZXR1cm47XG5cbiAgICBmcmllbmRPcHBvbmVudEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlLW1vZGVcIik7XG4gICAgY29tcHV0ZXJPcHBvbmVudEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlLW1vZGVcIik7XG4gICAgZ2FtZU1vZGUgPSBHYW1lTW9kZS5GUklFTkQ7XG4gIH0pO1xuXG4gIGNvbnN0IHBsYXlCdXR0b24gPSBob21lUGFnZS5xdWVyeVNlbGVjdG9yKFwiLnBsYXlcIik7XG4gIHBsYXlCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcbiAgICBsZXQgZ2FtZTtcbiAgICBpZiAoZ2FtZU1vZGUgPT09IEdhbWVNb2RlLkNPTVBVVEVSKSB7XG4gICAgICBnYW1lID0gc2V0dXBHYW1lKFxuICAgICAgICBjcmVhdGVQbGF5ZXIoXCJQbGF5ZXJcIiwgUGxheWVyVHlwZS5IVU1BTiwgMTApLFxuICAgICAgICBjcmVhdGVQbGF5ZXIoXCJDb21wdXRlclwiLCBQbGF5ZXJUeXBlLkNPTVBVVEVSLCAxMCksXG4gICAgICApO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb290XCIpLmNsYXNzTGlzdC5hZGQoXCJ2cy1jb21wdXRlclwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2FtZSA9IHNldHVwR2FtZShcbiAgICAgICAgY3JlYXRlUGxheWVyKFwiUGxheWVyIDFcIiwgUGxheWVyVHlwZS5IVU1BTiwgMTApLFxuICAgICAgICBjcmVhdGVQbGF5ZXIoXCJQbGF5ZXIgMlwiLCBQbGF5ZXJUeXBlLkhVTUFOLCAxMCksXG4gICAgICApO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb290XCIpLmNsYXNzTGlzdC5hZGQoXCJ2cy1mcmllbmRcIik7XG4gICAgfVxuXG4gICAgaG9tZVBhZ2UucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChjcmVhdGVHYW1lUGFnZShnYW1lKSk7XG4gICAgaG9tZVBhZ2UucmVtb3ZlKCk7XG4gIH0pO1xuXG4gIGNvbnN0IGhlbHBCdXR0b24gPSBob21lUGFnZS5xdWVyeVNlbGVjdG9yKFwiLmhlbHBcIik7XG4gIGhlbHBCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBob21lUGFnZS5wYXJlbnROb2RlLmFwcGVuZENoaWxkKGNyZWF0ZUhlbHBQYWdlKCkpO1xuICAgIGhvbWVQYWdlLnJlbW92ZSgpO1xuICB9KTtcblxuICByZXR1cm4gaG9tZVBhZ2U7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgKCFzY3JpcHRVcmwgfHwgIS9eaHR0cChzPyk6Ly50ZXN0KHNjcmlwdFVybCkpKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiaW1wb3J0IHsgY3JlYXRlSG9tZVBhZ2UgfSBmcm9tIFwiLi9kb20vcGFnZXMvaG9tZS5qc1wiO1xuXG5pbXBvcnQgYmFja1N2ZyBmcm9tIFwiLi4vYXNzZXRzL2NoZXZyb24tbGVmdC5zdmdcIjtcbmltcG9ydCBsb2dvIGZyb20gXCIuLi9hc3NldHMvZmF2aWNvbi5pY29cIjtcbmltcG9ydCBcIi4vc3R5bGVzL2luZGV4LmNzc1wiO1xuXG5jb25zb2xlLmxvZyhcIkdldCBSZWFkeSBmb3IgQmF0dGxlIVwiKTtcblxuY29uc3Qgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKTtcbnJvb3QuaW5uZXJIVE1MID0gYFxuICA8aGVhZGVyPlxuICAgIDxidXR0b24gY2xhc3M9XCJiYWNrLWJ1dHRvblwiPjwvYnV0dG9uPlxuICAgIDxpbWcgY2xhc3M9XCJsb2dvXCIgYWx0PVwiTG9nb1wiIC8+PGgxPkJBVFRMRVNISVA8L2gxPlxuICA8L2hlYWRlcj5cbmA7XG5cbnJvb3QucXVlcnlTZWxlY3RvcihcIi5sb2dvXCIpLnNyYyA9IGxvZ287XG5cbnJvb3QuYXBwZW5kQ2hpbGQoY3JlYXRlSG9tZVBhZ2UoKSk7XG5cbmNvbnN0IGJhY2tCdXR0b24gPSByb290LnF1ZXJ5U2VsZWN0b3IoXCIuYmFjay1idXR0b25cIik7XG5jb25zdCBiYWNrSWNvbiA9IG5ldyBJbWFnZSgpO1xuYmFja0ljb24uc3JjID0gYmFja1N2ZztcbmJhY2tCdXR0b24uYXBwZW5kQ2hpbGQoYmFja0ljb24pO1xuYmFja0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBjb25zdCBjdXJyZW50UGFnZSA9IHJvb3QucXVlcnlTZWxlY3RvcihcIi5wYWdlXCIpO1xuICBjb25zdCBuZXdQYWdlID0gY3JlYXRlSG9tZVBhZ2UoKTtcblxuICBpZiAobmV3UGFnZS5jbGFzc0xpc3RbMF0gPT0gY3VycmVudFBhZ2UuY2xhc3NMaXN0WzBdKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcm9vdC5jbGFzc05hbWUgPSBcIlwiO1xuXG4gIHJvb3QuYXBwZW5kQ2hpbGQobmV3UGFnZSk7XG4gIGN1cnJlbnRQYWdlLnJlbW92ZSgpO1xufSk7XG4iXSwibmFtZXMiOlsiY3JlYXRlU2hpcCIsIlNoaXBPcmllbnRhdGlvbiIsIkNlbGxTdGF0ZSIsIk9iamVjdCIsImZyZWV6ZSIsIkVNUFRZIiwiTUlTUyIsIlNISVAiLCJISVQiLCJTVU5LIiwiY3JlYXRlR2FtZUJvYXJkIiwic2l6ZSIsIkVycm9yIiwiY2VsbHMiLCJBcnJheSIsImZyb20iLCJsZW5ndGgiLCJzaGlwcyIsInJlc2V0IiwicGxhY2VTaGlwIiwic2hpcCIsImNvb3JkaW5hdGVzIiwib3JpZW50YXRpb24iLCJIT1JJWk9OVEFMIiwiVkVSVElDQUwiLCJpIiwicHVzaCIsIm1vdmVTaGlwIiwic2hpcEluZGV4IiwidHlwZSIsInBvcCIsInJvdGF0ZVNoaXAiLCJuZXdPcmllbnRhdGlvbiIsImdldFNoaXBJbmRleCIsImoiLCJyZWNlaXZlQXR0YWNrIiwicmVzdWx0IiwidW5kZWZpbmVkIiwiaGl0IiwiaXNTdW5rIiwiaXNGbGVldERlc3Ryb3llZCIsIlBsYXllclR5cGUiLCJIVU1BTiIsIkNPTVBVVEVSIiwiY3JlYXRlUGxheWVyIiwibmFtZSIsImJvYXJkU2l6ZSIsImJvYXJkIiwiU2hpcFR5cGUiLCJDQVJSSUVSIiwiQkFUVExFU0hJUCIsIkRFU1RST1lFUiIsIlNVQk1BUklORSIsIlBBVFJPTCIsImdldFNoaXBMZW5ndGgiLCJhcmd1bWVudHMiLCJoaXRzIiwicmVmcmVzaFN2ZyIsImVkaXRTdmciLCJzYXZlU3ZnIiwiY2FycmllclN2ZyIsImJhdHRsZXNoaXBTdmciLCJkZXN0cm95ZXJTdmciLCJzdWJtYXJpbmVTdmciLCJwYXRyb2xTdmciLCJzZXR1cEdhbWVCb2FyZHMiLCJnYW1lIiwicGxheWVyT25lIiwicGxheWVyVHdvIiwiYm9hcmRPbmUiLCJjcmVhdGVCb2FyZENvbXBvbmVudCIsInJhbmRvbWl6ZUZvcm1hdGlvbiIsImNvbXBvbmVudCIsImNsYXNzTGlzdCIsImFkZCIsInJlbmRlclNoaXBzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNsZWFyIiwiYm9hcmRUd28iLCJmb3JFYWNoIiwiRE9NQm9hcmQiLCJib2FyZEluZGV4IiwibW92aW5nU2hpcEluZGV4IiwicmVsYXRpdmVEcmFnZ2luZ0NlbGwiLCJjaGlsZHJlbiIsInJvdyIsImNlbGwiLCJoYW5kbGVBdHRhY2tFdmVudCIsImlzQXR0YWNrYWJsZSIsImFjdGl2ZSIsImlzSW5Qcm9ncmVzcyIsImlzR2FtZU92ZXIiLCJpc1BsYXllcldhaXRpbmciLCJhdHRhY2siLCJ1cGRhdGVBdHRhY2tJbmZvIiwiaGFuZGxlU2hpcFJvdGF0ZSIsImV2ZW50IiwiZWRpdGluZyIsImlzTXV0YWJsZSIsImNvbnRhaW5zIiwidG9nZ2xlU2hpcE1vdGlvbiIsInJlbmRlciIsInByZXZlbnREZWZhdWx0IiwiaGFuZGxlU2hpcE1vdmVTdGFydCIsInNoaXBDb29yZGluYXRlcyIsImJ1dHRvbiIsImhhbmRsZVNoaXBNb3ZpbmciLCJ0YXJnZXQiLCJ0b3VjaGVzIiwiZG9jdW1lbnQiLCJlbGVtZW50RnJvbVBvaW50IiwiY2xpZW50WCIsImNsaWVudFkiLCJjZWxsSW5kZXgiLCJnZXRDZWxsSW5kZXgiLCJuZXdDb29yZGluYXRlcyIsInNoaXBJbWFnZSIsInF1ZXJ5U2VsZWN0b3IiLCJuZXdDZWxsIiwic3R5bGUiLCJsZWZ0Iiwib2Zmc2V0TGVmdCIsInRvcCIsIm9mZnNldFRvcCIsImhhbmRsZVNoaXBQbGFjZSIsIm1vdmluZ0NlbGwiLCJrZXkiLCJwbGF5ZXIiLCJhdHRhY2thYmxlIiwibXV0YWJsZSIsImJvYXJkQ29tcG9uZW50IiwiY3JlYXRlRWxlbWVudCIsImJvYXJkSGVhZGVyIiwiaW5uZXJIVE1MIiwiYXBwZW5kQ2hpbGQiLCJyYW5kb21pemVCdXR0b24iLCJlZGl0QnV0dG9uIiwic2F2ZUJ1dHRvbiIsInRpdGxlIiwicmVmcmVzaEljb24iLCJJbWFnZSIsInNyYyIsImVkaXRJY29uIiwic2F2ZUljb24iLCJib2FyZENvbnRyb2xzIiwiYm9hcmRDZWxscyIsIndpbmRvd1dpZHRoIiwiZG9jdW1lbnRFbGVtZW50IiwiY2xpZW50V2lkdGgiLCJ3aW5kb3dIZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJpc1ZlcnRpY2FsU2NyZWVuIiwiY2VsbFNpemUiLCJyb3dDb21wb25lbnQiLCJjZWxsQ29tcG9uZW50IiwiZ2V0Q2VsbENsYXNzTmFtZSIsIndpZHRoIiwiaGVpZ2h0Iiwic2hpcHNDb250YWluZXIiLCJtb3ZpbmdDZWxscyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJyZW1vdmUiLCJjbGFzc05hbWUiLCJpc01vdmluZyIsInJlbW92ZUNoaWxkIiwiZ3JpZEdhcCIsIngiLCJ5IiwiYWx0IiwidHJhbnNmb3JtT3JpZ2luIiwidHJhbnNmb3JtIiwia2V5cyIsInNoaXBMZW5ndGgiLCJwbGFjZWQiLCJNYXRoIiwicmFuZG9tIiwiZmxvb3IiLCJtb3ZpbmdTaGlwIiwidG9nZ2xlIiwibW92aW5nU2hpcENlbGwiLCJtb3ZpbmdTaGlwQ29vcmRpbmF0ZXMiLCJtb3ZlU3VjY2Vzc2Z1bCIsIm1vdmVkU2hpcCIsImNvbXB1dGVyQXR0YWNrIiwiYXR0YWNrZXJJbmRleCIsInZhbGlkIiwiUHJvbWlzZSIsInIiLCJzZXRUaW1lb3V0Iiwic2F2ZUVkaXRzIiwicmVwb3J0VmFsaWRpdHkiLCJhbGVydCIsInZhbHVlIiwidGV4dENvbnRlbnQiLCJwcm90b3R5cGUiLCJpbmRleE9mIiwiY2FsbCIsInBhcmVudE5vZGUiLCJzZWNyZXQiLCJHYW1lTW9kZSIsIkZSSUVORCIsInNldHVwR2FtZSIsIm1vZGUiLCJwbGF5ZXJzIiwiY3VycmVudFBsYXllckluZGV4IiwiYm9hcmRzIiwic3RhcnQiLCJwbGF5IiwiZ2FtZU92ZXJTY3JlZW4iLCJib2FyZHNDb250YWluZXIiLCJhcHBlbmQiLCJjdXJyZW50UGxheWVyIiwibmV4dFBsYXllckluZGV4IiwibmV4dFBsYXllciIsImNyZWF0ZUdhbWVPdmVyU2NyZWVuIiwicmVzb2x2ZSIsImNyZWF0ZVBhc3NpbmdTY3JlZW4iLCJhdHRhY2tUeXBlIiwiYXR0YWNrSW5mbyIsImF0dGFja2VyIiwicmVjZWl2ZXIiLCJnYW1lT3Zlck1lc3NhZ2UiLCJ0b1VwcGVyQ2FzZSIsIm91dGVyUmVzZXRCdXR0b24iLCJyZXNldEJ1dHRvbiIsInBhc3NpbmdTY3JlZW4iLCJjb250aW51ZUJ1dHRvbiIsImNyZWF0ZUdhbWVQYWdlIiwiZ2FtZVBhZ2UiLCJzdGFydEJ1dHRvbiIsImNyZWF0ZUhlbHBQYWdlIiwiaGVscFBhZ2UiLCJjcmVhdGVIb21lUGFnZSIsImdhbWVNb2RlIiwiaG9tZVBhZ2UiLCJjb21wdXRlck9wcG9uZW50QnV0dG9uIiwiZnJpZW5kT3Bwb25lbnRCdXR0b24iLCJwbGF5QnV0dG9uIiwiaGVscEJ1dHRvbiIsImJhY2tTdmciLCJsb2dvIiwiY29uc29sZSIsImxvZyIsInJvb3QiLCJnZXRFbGVtZW50QnlJZCIsImJhY2tCdXR0b24iLCJiYWNrSWNvbiIsImN1cnJlbnRQYWdlIiwibmV3UGFnZSJdLCJzb3VyY2VSb290IjoiIn0=