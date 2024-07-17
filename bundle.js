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
function createPlayer(type) {
  return {
    type,
    active: false,
    board: (0,_gameBoard_js__WEBPACK_IMPORTED_MODULE_0__.createGameBoard)(10),
    activate: function () {
      if (this.active) {
        throw new Error("Player is already active");
      }
      this.active = true;
    },
    deactivate: function () {
      if (!this.active) {
        throw new Error("Player is already inactive");
      }
      this.active = false;
    }
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
/* harmony export */   generateBoard: function() { return /* binding */ generateBoard; },
/* harmony export */   setupGameBoards: function() { return /* binding */ setupGameBoards; }
/* harmony export */ });
/* harmony import */ var _core_gameBoard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/gameBoard.js */ "./src/core/gameBoard.js");
/* harmony import */ var _core_player_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/player.js */ "./src/core/player.js");
/* harmony import */ var _core_ship_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/ship.js */ "./src/core/ship.js");



const refreshBoardEvent = new Event("refresh-board");
function setupGameBoards() {
  const playerOne = (0,_core_player_js__WEBPACK_IMPORTED_MODULE_1__.createPlayer)(_core_player_js__WEBPACK_IMPORTED_MODULE_1__.PlayerType.HUMAN);
  const playerTwo = (0,_core_player_js__WEBPACK_IMPORTED_MODULE_1__.createPlayer)(_core_player_js__WEBPACK_IMPORTED_MODULE_1__.PlayerType.COMPUTER);
  const ships = [5, 4, 3, 3, 2];
  for (const ship of ships) {
    let placed = false;
    while (!placed) {
      const orientation = Math.random() > 0.5 ? _core_ship_js__WEBPACK_IMPORTED_MODULE_2__.ShipOrientation.HORIZONTAL : _core_ship_js__WEBPACK_IMPORTED_MODULE_2__.ShipOrientation.VERTICAL;
      const x = Math.floor(Math.random() * (10 - (orientation === _core_ship_js__WEBPACK_IMPORTED_MODULE_2__.ShipOrientation.HORIZONTAL ? ship : 0)));
      const y = Math.floor(Math.random() * (10 - (orientation === _core_ship_js__WEBPACK_IMPORTED_MODULE_2__.ShipOrientation.VERTICAL ? ship : 0)));
      placed = playerOne.board.placeShip([x, y], ship, orientation);
    }
  }
  for (const ship of ships) {
    let placed = false;
    while (!placed) {
      const orientation = Math.random() > 0.5 ? _core_ship_js__WEBPACK_IMPORTED_MODULE_2__.ShipOrientation.HORIZONTAL : _core_ship_js__WEBPACK_IMPORTED_MODULE_2__.ShipOrientation.VERTICAL;
      const x = Math.floor(Math.random() * (10 - (orientation === _core_ship_js__WEBPACK_IMPORTED_MODULE_2__.ShipOrientation.HORIZONTAL ? ship : 0)));
      const y = Math.floor(Math.random() * (10 - (orientation === _core_ship_js__WEBPACK_IMPORTED_MODULE_2__.ShipOrientation.VERTICAL ? ship : 0)));
      placed = playerTwo.board.placeShip([x, y], ship, orientation);
    }
  }
  const playerOneBoardComponent = generateBoard(playerOne.board, true);
  playerOneBoardComponent.classList.add("player-one", "human");
  playerOneBoardComponent.addEventListener("refresh-board", () => {
    Array.from(playerOneBoardComponent.children).forEach((row, i) => {
      Array.from(row.children).forEach((cell, j) => {
        const isMoving = cell.classList.contains("moving");
        cell.className = "cell";
        cell.classList.add(getCellClassName([j, i], playerOne.board));
        if (isMoving) cell.classList.add("moving");
      });
    });
  });
  playerOneBoardComponent.addEventListener("click", () => clearShipMovement(playerOneBoardComponent), true);
  function shipMovementHandler(event) {
    const movingShipCell = playerOneBoardComponent.querySelector(".moving");
    if (!movingShipCell) return;
    const movingShipCoordinates = getCellIndex(movingShipCell);
    const movingShipIndex = playerOne.board.getShipIndex(movingShipCoordinates);
    toggleShipMotion(movingShipCoordinates, playerOne.board, playerOneBoardComponent);
    let moveSuccessful = false;
    switch (event.key) {
      case "ArrowUp":
        if (movingShipCoordinates[1] <= 0) break;
        moveSuccessful = playerOne.board.moveShip(movingShipIndex, [movingShipCoordinates[0], movingShipCoordinates[1] - 1]);
        break;
      case "ArrowLeft":
        if (movingShipCoordinates[0] <= 0) break;
        moveSuccessful = playerOne.board.moveShip(movingShipIndex, [movingShipCoordinates[0] - 1, movingShipCoordinates[1]]);
        break;
      case "ArrowDown":
        if (movingShipCoordinates[1] >= playerOne.board.size - 1) break;
        moveSuccessful = playerOne.board.moveShip(movingShipIndex, [movingShipCoordinates[0], movingShipCoordinates[1] + 1]);
        break;
      case "ArrowRight":
        if (movingShipCoordinates[0] >= playerOne.board.size - 1) break;
        moveSuccessful = playerOne.board.moveShip(movingShipIndex, [movingShipCoordinates[0] + 1, movingShipCoordinates[1]]);
        break;
    }
    if (!moveSuccessful) {
      toggleShipMotion(movingShipCoordinates, playerOne.board, playerOneBoardComponent);
      return;
    }
    playerOneBoardComponent.dispatchEvent(refreshBoardEvent);
    const movedShip = playerOne.board.ships[movingShipIndex];
    toggleShipMotion(movedShip.coordinates, playerOne.board, playerOneBoardComponent);
  }
  document.addEventListener("keydown", shipMovementHandler);
  const playerTwoBoardComponent = generateBoard(playerTwo.board, false);
  playerTwoBoardComponent.classList.add("player-two", "computer");
  playerTwoBoardComponent.addEventListener("refresh-board", () => {
    Array.from(playerTwoBoardComponent.children).forEach((row, i) => {
      Array.from(row.children).forEach((cell, j) => {
        cell.className = "cell";
        cell.classList.add(getCellClassName([j, i], playerTwo.board, true));
      });
    });
  });
  return [playerOneBoardComponent, playerTwoBoardComponent];
}
function generateBoard(board, mutable) {
  const boardComponent = document.createElement("div");
  boardComponent.classList.add("board");
  for (let i = 0; i < board.cells.length; i++) {
    const rowComponent = document.createElement("div");
    rowComponent.classList.add("row");
    for (let j = 0; j < board.cells[i].length; j++) {
      const cellComponent = document.createElement("button");
      cellComponent.classList.add("cell");
      cellComponent.classList.add(getCellClassName([j, i], board));
      if (!mutable) {
        cellComponent.addEventListener("click", () => {
          const cell = board.cells[i][j];
          if (cell !== _core_gameBoard_js__WEBPACK_IMPORTED_MODULE_0__.CellState.EMPTY && cell !== _core_gameBoard_js__WEBPACK_IMPORTED_MODULE_0__.CellState.SHIP) return;
          board.receiveAttack([j, i]);
          boardComponent.dispatchEvent(refreshBoardEvent);
          if (board.isFleetDestroyed()) {
            const gameWonOverlay = document.createElement("div");
            gameWonOverlay.classList.add("game-won-overlay");
            gameWonOverlay.textContent = "YOU WON THE GAME!";
            boardComponent.appendChild(gameWonOverlay);
          }
        });
      }
      if (mutable) {
        cellComponent.addEventListener("click", () => {
          if (cellComponent.classList.contains("ship")) {
            toggleShipMotion([j, i], board, boardComponent);
          }
        });
        cellComponent.addEventListener("contextmenu", event => {
          if (cellComponent.classList.contains("ship")) {
            event.preventDefault();
            const shipIndex = board.getShipIndex(getCellIndex(cellComponent));
            const ship = board.ships[shipIndex];
            if (!cellComponent.classList.contains("moving")) {
              toggleShipMotion(ship.coordinates, board, boardComponent);
            }
            if (board.rotateShip(shipIndex)) {
              clearShipMovement(boardComponent);
              toggleShipMotion(ship.coordinates, board, boardComponent);
              boardComponent.dispatchEvent(refreshBoardEvent);
            }
          }
        });
      }
      rowComponent.appendChild(cellComponent);
    }
    boardComponent.appendChild(rowComponent);
  }
  return boardComponent;
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
function clearShipMovement(boardComponent) {
  const movingCells = boardComponent.querySelectorAll(".moving");
  if (movingCells.length === 0) return;
  for (const cell of movingCells) {
    cell.classList.remove("moving");
  }
}
function toggleShipMotion(coordinates, board, boardComponent) {
  const cell = boardComponent.children[coordinates[1]].children[coordinates[0]];
  if (!cell.classList.contains("ship")) return;
  const shipIndex = board.getShipIndex(coordinates);
  let ship = board.ships[shipIndex];
  switch (ship.orientation) {
    case _core_ship_js__WEBPACK_IMPORTED_MODULE_2__.ShipOrientation.HORIZONTAL:
      for (let i = ship.coordinates[0]; i <= ship.coordinates[0] + ship.length - 1; i++) {
        boardComponent.children[ship.coordinates[1]].children[i].classList.toggle("moving");
      }
      break;
    case _core_ship_js__WEBPACK_IMPORTED_MODULE_2__.ShipOrientation.VERTICAL:
      for (let i = ship.coordinates[1]; i <= ship.coordinates[1] + ship.length - 1; i++) {
        boardComponent.children[i].children[ship.coordinates[0]].classList.toggle("moving");
      }
      break;
  }
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
/************************************************************************/
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_boards_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom/boards.js */ "./src/dom/boards.js");
/* harmony import */ var _styles_index_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/index.css */ "./src/styles/index.css");


console.log("Get Ready for Battle!");
const root = document.getElementById("root");
root.innerHTML = `
<header>Battleship</header>
<div class="boards"></div>
<div class="controls">
  <div class="ships"></div>
  <div class="game-controls">
    <button class="start">Start Game</button>
    <button class="reset">Reset Game</button>
    <button class="randomize" disabled>Randomize Formation</button>
  </div>
</div>
`;
const boardsContainer = document.querySelector(".boards");
boardsContainer.append(...(0,_dom_boards_js__WEBPACK_IMPORTED_MODULE_0__.setupGameBoards)());
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQXdEO0FBRWpELE1BQU1FLFNBQVMsR0FBR0MsTUFBTSxDQUFDQyxNQUFNLENBQUM7RUFDckNDLEtBQUssRUFBRSxDQUFDO0VBQ1JDLElBQUksRUFBRSxDQUFDO0VBQ1BDLElBQUksRUFBRSxDQUFDO0VBQ1BDLEdBQUcsRUFBRSxDQUFDO0VBQ05DLElBQUksRUFBRTtBQUNSLENBQUMsQ0FBQztBQUVLLFNBQVNDLGVBQWVBLENBQUNDLElBQUksRUFBRTtFQUNwQyxJQUFJQSxJQUFJLElBQUksQ0FBQyxFQUFFO0lBQ2IsTUFBTSxJQUFJQyxLQUFLLENBQUMsb0JBQW9CLENBQUM7RUFDdkM7RUFFQSxPQUFPO0lBQ0xELElBQUk7SUFDSkUsS0FBSyxFQUFFQyxLQUFLLENBQUNDLElBQUksQ0FBQztNQUFFQyxNQUFNLEVBQUVMO0lBQUssQ0FBQyxFQUFFLE1BQ2xDRyxLQUFLLENBQUNDLElBQUksQ0FBQztNQUFFQyxNQUFNLEVBQUVMO0lBQUssQ0FBQyxFQUFFLE1BQU1ULFNBQVMsQ0FBQ0csS0FBSyxDQUNwRCxDQUFDO0lBQ0RZLEtBQUssRUFBRSxFQUFFO0lBRVRDLFNBQVMsRUFBRSxTQUFBQSxDQUFVQyxXQUFXLEVBQUVILE1BQU0sRUFBRUksV0FBVyxFQUFFO01BQ3JELElBQ0VELFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQ2xCQSxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUNsQkEsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJUixJQUFJLElBQ3RCUSxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUlSLElBQUksRUFDdEI7UUFDQSxNQUFNLElBQUlDLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQztNQUN4RCxDQUFDLE1BQU0sSUFDSlEsV0FBVyxLQUFLbkIscURBQWUsQ0FBQ29CLFVBQVUsSUFDekNGLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBR0gsTUFBTSxHQUFHLENBQUMsSUFBSUwsSUFBSSxJQUNwQ1MsV0FBVyxLQUFLbkIscURBQWUsQ0FBQ3FCLFFBQVEsSUFDdkNILFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBR0gsTUFBTSxHQUFHLENBQUMsSUFBSUwsSUFBSyxFQUN0QztRQUNBLE9BQU8sS0FBSztNQUNkO01BRUEsSUFBSVMsV0FBVyxLQUFLbkIscURBQWUsQ0FBQ29CLFVBQVUsRUFBRTtRQUM5QyxLQUFLLElBQUlFLENBQUMsR0FBR0osV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFSSxDQUFDLElBQUlKLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBR0gsTUFBTSxHQUFHLENBQUMsRUFBRU8sQ0FBQyxFQUFFLEVBQUU7VUFDbEUsSUFBSSxJQUFJLENBQUNWLEtBQUssQ0FBQ00sV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNJLENBQUMsQ0FBQyxLQUFLckIsU0FBUyxDQUFDRyxLQUFLLEVBQUU7WUFDckQsT0FBTyxLQUFLO1VBQ2Q7UUFDRjtNQUNGLENBQUMsTUFBTSxJQUFJZSxXQUFXLEtBQUtuQixxREFBZSxDQUFDcUIsUUFBUSxFQUFFO1FBQ25ELEtBQUssSUFBSUMsQ0FBQyxHQUFHSixXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUVJLENBQUMsSUFBSUosV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHSCxNQUFNLEdBQUcsQ0FBQyxFQUFFTyxDQUFDLEVBQUUsRUFBRTtVQUNsRSxJQUFJLElBQUksQ0FBQ1YsS0FBSyxDQUFDVSxDQUFDLENBQUMsQ0FBQ0osV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUtqQixTQUFTLENBQUNHLEtBQUssRUFBRTtZQUNyRCxPQUFPLEtBQUs7VUFDZDtRQUNGO01BQ0Y7TUFFQSxJQUFJLENBQUNZLEtBQUssQ0FBQ08sSUFBSSxDQUFDeEIsb0RBQVUsQ0FBQ2dCLE1BQU0sRUFBRUcsV0FBVyxFQUFFQyxXQUFXLENBQUMsQ0FBQztNQUU3RCxJQUFJQSxXQUFXLEtBQUtuQixxREFBZSxDQUFDb0IsVUFBVSxFQUFFO1FBQzlDLEtBQUssSUFBSUUsQ0FBQyxHQUFHSixXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUVJLENBQUMsSUFBSUosV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHSCxNQUFNLEdBQUcsQ0FBQyxFQUFFTyxDQUFDLEVBQUUsRUFBRTtVQUNsRSxJQUFJLENBQUNWLEtBQUssQ0FBQ00sV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNJLENBQUMsQ0FBQyxHQUFHckIsU0FBUyxDQUFDSyxJQUFJO1FBQ2hEO01BQ0YsQ0FBQyxNQUFNLElBQUlhLFdBQVcsS0FBS25CLHFEQUFlLENBQUNxQixRQUFRLEVBQUU7UUFDbkQsS0FBSyxJQUFJQyxDQUFDLEdBQUdKLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRUksQ0FBQyxJQUFJSixXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUdILE1BQU0sR0FBRyxDQUFDLEVBQUVPLENBQUMsRUFBRSxFQUFFO1VBQ2xFLElBQUksQ0FBQ1YsS0FBSyxDQUFDVSxDQUFDLENBQUMsQ0FBQ0osV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdqQixTQUFTLENBQUNLLElBQUk7UUFDaEQ7TUFDRjtNQUVBLE9BQU8sSUFBSTtJQUNiLENBQUM7SUFFRGtCLFFBQVEsRUFBRSxTQUFBQSxDQUFVQyxTQUFTLEVBQUVQLFdBQVcsRUFBRTtNQUMxQyxNQUFNUSxJQUFJLEdBQUcsSUFBSSxDQUFDVixLQUFLLENBQUNTLFNBQVMsQ0FBQztNQUNsQyxJQUFJLENBQUNDLElBQUksRUFBRTtRQUNULE1BQU0sSUFBSWYsS0FBSyxDQUFDLHFCQUFxQixDQUFDO01BQ3hDO01BRUEsSUFBSWUsSUFBSSxDQUFDUCxXQUFXLEtBQUtuQixxREFBZSxDQUFDb0IsVUFBVSxFQUFFO1FBQ25ELEtBQ0UsSUFBSUUsQ0FBQyxHQUFHSSxJQUFJLENBQUNSLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFDM0JJLENBQUMsSUFBSUksSUFBSSxDQUFDUixXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUdRLElBQUksQ0FBQ1gsTUFBTSxHQUFHLENBQUMsRUFDMUNPLENBQUMsRUFBRSxFQUNIO1VBQ0EsSUFBSSxDQUFDVixLQUFLLENBQUNjLElBQUksQ0FBQ1IsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNJLENBQUMsQ0FBQyxHQUFHckIsU0FBUyxDQUFDRyxLQUFLO1FBQ3REO01BQ0YsQ0FBQyxNQUFNLElBQUlzQixJQUFJLENBQUNQLFdBQVcsS0FBS25CLHFEQUFlLENBQUNxQixRQUFRLEVBQUU7UUFDeEQsS0FDRSxJQUFJQyxDQUFDLEdBQUdJLElBQUksQ0FBQ1IsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUMzQkksQ0FBQyxJQUFJSSxJQUFJLENBQUNSLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBR1EsSUFBSSxDQUFDWCxNQUFNLEdBQUcsQ0FBQyxFQUMxQ08sQ0FBQyxFQUFFLEVBQ0g7VUFDQSxJQUFJLENBQUNWLEtBQUssQ0FBQ1UsQ0FBQyxDQUFDLENBQUNJLElBQUksQ0FBQ1IsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdqQixTQUFTLENBQUNHLEtBQUs7UUFDdEQ7TUFDRjtNQUVBLElBQUksQ0FBQyxJQUFJLENBQUNhLFNBQVMsQ0FBQ0MsV0FBVyxFQUFFUSxJQUFJLENBQUNYLE1BQU0sRUFBRVcsSUFBSSxDQUFDUCxXQUFXLENBQUMsRUFBRTtRQUMvRCxJQUFJTyxJQUFJLENBQUNQLFdBQVcsS0FBS25CLHFEQUFlLENBQUNvQixVQUFVLEVBQUU7VUFDbkQsS0FDRSxJQUFJRSxDQUFDLEdBQUdJLElBQUksQ0FBQ1IsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUMzQkksQ0FBQyxJQUFJSSxJQUFJLENBQUNSLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBR1EsSUFBSSxDQUFDWCxNQUFNLEdBQUcsQ0FBQyxFQUMxQ08sQ0FBQyxFQUFFLEVBQ0g7WUFDQSxJQUFJLENBQUNWLEtBQUssQ0FBQ2MsSUFBSSxDQUFDUixXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQ0ksQ0FBQyxDQUFDLEdBQUdyQixTQUFTLENBQUNLLElBQUk7VUFDckQ7UUFDRixDQUFDLE1BQU0sSUFBSW9CLElBQUksQ0FBQ1AsV0FBVyxLQUFLbkIscURBQWUsQ0FBQ3FCLFFBQVEsRUFBRTtVQUN4RCxLQUNFLElBQUlDLENBQUMsR0FBR0ksSUFBSSxDQUFDUixXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQzNCSSxDQUFDLElBQUlJLElBQUksQ0FBQ1IsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHUSxJQUFJLENBQUNYLE1BQU0sR0FBRyxDQUFDLEVBQzFDTyxDQUFDLEVBQUUsRUFDSDtZQUNBLElBQUksQ0FBQ1YsS0FBSyxDQUFDVSxDQUFDLENBQUMsQ0FBQ0ksSUFBSSxDQUFDUixXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR2pCLFNBQVMsQ0FBQ0ssSUFBSTtVQUNyRDtRQUNGO1FBQ0EsT0FBTyxLQUFLO01BQ2Q7TUFFQSxJQUFJLENBQUNVLEtBQUssQ0FBQ1MsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDVCxLQUFLLENBQUNXLEdBQUcsQ0FBQyxDQUFDO01BRXhDLE9BQU8sSUFBSTtJQUNiLENBQUM7SUFFREMsVUFBVSxFQUFFLFNBQUFBLENBQVVILFNBQVMsRUFBRTtNQUMvQixNQUFNQyxJQUFJLEdBQUcsSUFBSSxDQUFDVixLQUFLLENBQUNTLFNBQVMsQ0FBQztNQUNsQyxJQUFJLENBQUNDLElBQUksRUFBRTtRQUNULE1BQU0sSUFBSWYsS0FBSyxDQUFDLHFCQUFxQixDQUFDO01BQ3hDO01BRUEsTUFBTWtCLGNBQWMsR0FDbEJILElBQUksQ0FBQ1AsV0FBVyxLQUFLbkIscURBQWUsQ0FBQ29CLFVBQVUsR0FDM0NwQixxREFBZSxDQUFDcUIsUUFBUSxHQUN4QnJCLHFEQUFlLENBQUNvQixVQUFVO01BRWhDLElBQUlTLGNBQWMsS0FBSzdCLHFEQUFlLENBQUNvQixVQUFVLEVBQUU7UUFDakQsSUFBSU0sSUFBSSxDQUFDUixXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUdRLElBQUksQ0FBQ1gsTUFBTSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUNMLElBQUksRUFBRTtVQUN0RCxPQUFPLEtBQUs7UUFDZDtRQUVBLEtBQ0UsSUFBSVksQ0FBQyxHQUFHSSxJQUFJLENBQUNSLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQy9CSSxDQUFDLElBQUlJLElBQUksQ0FBQ1IsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHUSxJQUFJLENBQUNYLE1BQU0sR0FBRyxDQUFDLEVBQzFDTyxDQUFDLEVBQUUsRUFDSDtVQUNBLElBQUksSUFBSSxDQUFDVixLQUFLLENBQUNjLElBQUksQ0FBQ1IsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNJLENBQUMsQ0FBQyxLQUFLckIsU0FBUyxDQUFDRyxLQUFLLEVBQUU7WUFDMUQsT0FBTyxLQUFLO1VBQ2Q7UUFDRjtNQUNGLENBQUMsTUFBTSxJQUFJeUIsY0FBYyxLQUFLN0IscURBQWUsQ0FBQ3FCLFFBQVEsRUFBRTtRQUN0RCxJQUFJSyxJQUFJLENBQUNSLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBR1EsSUFBSSxDQUFDWCxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQ0wsSUFBSSxFQUFFO1VBQ3RELE9BQU8sS0FBSztRQUNkO1FBRUEsS0FDRSxJQUFJWSxDQUFDLEdBQUdJLElBQUksQ0FBQ1IsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFDL0JJLENBQUMsSUFBSUksSUFBSSxDQUFDUixXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUdRLElBQUksQ0FBQ1gsTUFBTSxHQUFHLENBQUMsRUFDMUNPLENBQUMsRUFBRSxFQUNIO1VBQ0EsSUFBSSxJQUFJLENBQUNWLEtBQUssQ0FBQ1UsQ0FBQyxDQUFDLENBQUNJLElBQUksQ0FBQ1IsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUtqQixTQUFTLENBQUNHLEtBQUssRUFBRTtZQUMxRCxPQUFPLEtBQUs7VUFDZDtRQUNGO01BQ0Y7TUFFQSxJQUFJeUIsY0FBYyxLQUFLN0IscURBQWUsQ0FBQ29CLFVBQVUsRUFBRTtRQUNqRCxLQUNFLElBQUlFLENBQUMsR0FBR0ksSUFBSSxDQUFDUixXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQzNCSSxDQUFDLElBQUlJLElBQUksQ0FBQ1IsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHUSxJQUFJLENBQUNYLE1BQU0sR0FBRyxDQUFDLEVBQzFDTyxDQUFDLEVBQUUsRUFDSDtVQUNBLElBQUksQ0FBQ1YsS0FBSyxDQUFDVSxDQUFDLENBQUMsQ0FBQ0ksSUFBSSxDQUFDUixXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR2pCLFNBQVMsQ0FBQ0csS0FBSztRQUN0RDtRQUNBLEtBQ0UsSUFBSWtCLENBQUMsR0FBR0ksSUFBSSxDQUFDUixXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQzNCSSxDQUFDLElBQUlJLElBQUksQ0FBQ1IsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHUSxJQUFJLENBQUNYLE1BQU0sR0FBRyxDQUFDLEVBQzFDTyxDQUFDLEVBQUUsRUFDSDtVQUNBLElBQUksQ0FBQ1YsS0FBSyxDQUFDYyxJQUFJLENBQUNSLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDSSxDQUFDLENBQUMsR0FBR3JCLFNBQVMsQ0FBQ0ssSUFBSTtRQUNyRDtNQUNGLENBQUMsTUFBTSxJQUFJdUIsY0FBYyxLQUFLN0IscURBQWUsQ0FBQ3FCLFFBQVEsRUFBRTtRQUN0RCxLQUNFLElBQUlDLENBQUMsR0FBR0ksSUFBSSxDQUFDUixXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQzNCSSxDQUFDLElBQUlJLElBQUksQ0FBQ1IsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHUSxJQUFJLENBQUNYLE1BQU0sR0FBRyxDQUFDLEVBQzFDTyxDQUFDLEVBQUUsRUFDSDtVQUNBLElBQUksQ0FBQ1YsS0FBSyxDQUFDYyxJQUFJLENBQUNSLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDSSxDQUFDLENBQUMsR0FBR3JCLFNBQVMsQ0FBQ0csS0FBSztRQUN0RDtRQUNBLEtBQ0UsSUFBSWtCLENBQUMsR0FBR0ksSUFBSSxDQUFDUixXQUFXLENBQUMsQ0FBQyxDQUFDLEVB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LGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7OztBQ05rRDtBQUN0QjtBQUU1QkMsT0FBTyxDQUFDQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7QUFFcEMsTUFBTUMsSUFBSSxHQUFHdEIsUUFBUSxDQUFDdUIsY0FBYyxDQUFDLE1BQU0sQ0FBQztBQUU1Q0QsSUFBSSxDQUFDRSxTQUFTLEdBQUc7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBRUQsTUFBTUMsZUFBZSxHQUFHekIsUUFBUSxDQUFDVCxhQUFhLENBQUMsU0FBUyxDQUFDO0FBQ3pEa0MsZUFBZSxDQUFDQyxNQUFNLENBQUMsR0FBRzdELCtEQUFlLENBQUMsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9pbmRleC5jc3M/NGU0MiIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvcmUvZ2FtZUJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29yZS9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb3JlL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb20vYm9hcmRzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCB7IGNyZWF0ZVNoaXAsIFNoaXBPcmllbnRhdGlvbiB9IGZyb20gXCIuL3NoaXAuanNcIjtcblxuZXhwb3J0IGNvbnN0IENlbGxTdGF0ZSA9IE9iamVjdC5mcmVlemUoe1xuICBFTVBUWTogMCxcbiAgTUlTUzogMSxcbiAgU0hJUDogMixcbiAgSElUOiAzLFxuICBTVU5LOiA0LFxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVHYW1lQm9hcmQoc2l6ZSkge1xuICBpZiAoc2l6ZSA8PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBib2FyZCBzaXplXCIpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzaXplLFxuICAgIGNlbGxzOiBBcnJheS5mcm9tKHsgbGVuZ3RoOiBzaXplIH0sICgpID0+XG4gICAgICBBcnJheS5mcm9tKHsgbGVuZ3RoOiBzaXplIH0sICgpID0+IENlbGxTdGF0ZS5FTVBUWSksXG4gICAgKSxcbiAgICBzaGlwczogW10sXG5cbiAgICBwbGFjZVNoaXA6IGZ1bmN0aW9uIChjb29yZGluYXRlcywgbGVuZ3RoLCBvcmllbnRhdGlvbikge1xuICAgICAgaWYgKFxuICAgICAgICBjb29yZGluYXRlc1swXSA8IDAgfHxcbiAgICAgICAgY29vcmRpbmF0ZXNbMV0gPCAwIHx8XG4gICAgICAgIGNvb3JkaW5hdGVzWzBdID49IHNpemUgfHxcbiAgICAgICAgY29vcmRpbmF0ZXNbMV0gPj0gc2l6ZVxuICAgICAgKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBwbGFjZSBzaGlwIG91dHNpZGUgdGhlIGJvYXJkXCIpO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgKG9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCAmJlxuICAgICAgICAgIGNvb3JkaW5hdGVzWzBdICsgbGVuZ3RoIC0gMSA+PSBzaXplKSB8fFxuICAgICAgICAob3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCAmJlxuICAgICAgICAgIGNvb3JkaW5hdGVzWzFdICsgbGVuZ3RoIC0gMSA+PSBzaXplKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCkge1xuICAgICAgICBmb3IgKGxldCBpID0gY29vcmRpbmF0ZXNbMF07IGkgPD0gY29vcmRpbmF0ZXNbMF0gKyBsZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICBpZiAodGhpcy5jZWxsc1tjb29yZGluYXRlc1sxXV1baV0gIT09IENlbGxTdGF0ZS5FTVBUWSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChvcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSBjb29yZGluYXRlc1sxXTsgaSA8PSBjb29yZGluYXRlc1sxXSArIGxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgIGlmICh0aGlzLmNlbGxzW2ldW2Nvb3JkaW5hdGVzWzBdXSAhPT0gQ2VsbFN0YXRlLkVNUFRZKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2hpcHMucHVzaChjcmVhdGVTaGlwKGxlbmd0aCwgY29vcmRpbmF0ZXMsIG9yaWVudGF0aW9uKSk7XG5cbiAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IGNvb3JkaW5hdGVzWzBdOyBpIDw9IGNvb3JkaW5hdGVzWzBdICsgbGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5jZWxsc1tjb29yZGluYXRlc1sxXV1baV0gPSBDZWxsU3RhdGUuU0hJUDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChvcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSBjb29yZGluYXRlc1sxXTsgaSA8PSBjb29yZGluYXRlc1sxXSArIGxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgIHRoaXMuY2VsbHNbaV1bY29vcmRpbmF0ZXNbMF1dID0gQ2VsbFN0YXRlLlNISVA7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIG1vdmVTaGlwOiBmdW5jdGlvbiAoc2hpcEluZGV4LCBjb29yZGluYXRlcykge1xuICAgICAgY29uc3Qgc2hpcCA9IHRoaXMuc2hpcHNbc2hpcEluZGV4XTtcbiAgICAgIGlmICghc2hpcCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTaGlwIGRvZXMgbm90IGV4aXN0XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwpIHtcbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMF07XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmNlbGxzW3NoaXAuY29vcmRpbmF0ZXNbMV1dW2ldID0gQ2VsbFN0YXRlLkVNUFRZO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1sxXTtcbiAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgaSsrXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuY2VsbHNbaV1bc2hpcC5jb29yZGluYXRlc1swXV0gPSBDZWxsU3RhdGUuRU1QVFk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLnBsYWNlU2hpcChjb29yZGluYXRlcywgc2hpcC5sZW5ndGgsIHNoaXAub3JpZW50YXRpb24pKSB7XG4gICAgICAgIGlmIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCkge1xuICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMF07XG4gICAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMF0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBpKytcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuY2VsbHNbc2hpcC5jb29yZGluYXRlc1sxXV1baV0gPSBDZWxsU3RhdGUuU0hJUDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMKSB7XG4gICAgICAgICAgZm9yIChcbiAgICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1sxXTtcbiAgICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1sxXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGkrK1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5jZWxsc1tpXVtzaGlwLmNvb3JkaW5hdGVzWzBdXSA9IENlbGxTdGF0ZS5TSElQO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2hpcHNbc2hpcEluZGV4XSA9IHRoaXMuc2hpcHMucG9wKCk7XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICByb3RhdGVTaGlwOiBmdW5jdGlvbiAoc2hpcEluZGV4KSB7XG4gICAgICBjb25zdCBzaGlwID0gdGhpcy5zaGlwc1tzaGlwSW5kZXhdO1xuICAgICAgaWYgKCFzaGlwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlNoaXAgZG9lcyBub3QgZXhpc3RcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5ld09yaWVudGF0aW9uID1cbiAgICAgICAgc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUxcbiAgICAgICAgICA/IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTFxuICAgICAgICAgIDogU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUw7XG5cbiAgICAgIGlmIChuZXdPcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwpIHtcbiAgICAgICAgaWYgKHNoaXAuY29vcmRpbmF0ZXNbMF0gKyBzaGlwLmxlbmd0aCAtIDEgPj0gdGhpcy5zaXplKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMF0gKyAxO1xuICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKHRoaXMuY2VsbHNbc2hpcC5jb29yZGluYXRlc1sxXV1baV0gIT09IENlbGxTdGF0ZS5FTVBUWSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChuZXdPcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMKSB7XG4gICAgICAgIGlmIChzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxID49IHRoaXMuc2l6ZSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzFdICsgMTtcbiAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgaSsrXG4gICAgICAgICkge1xuICAgICAgICAgIGlmICh0aGlzLmNlbGxzW2ldW3NoaXAuY29vcmRpbmF0ZXNbMF1dICE9PSBDZWxsU3RhdGUuRU1QVFkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG5ld09yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCkge1xuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1sxXTtcbiAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgaSsrXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuY2VsbHNbaV1bc2hpcC5jb29yZGluYXRlc1swXV0gPSBDZWxsU3RhdGUuRU1QVFk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMF07XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmNlbGxzW3NoaXAuY29vcmRpbmF0ZXNbMV1dW2ldID0gQ2VsbFN0YXRlLlNISVA7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAobmV3T3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1swXTtcbiAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMF0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgaSsrXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuY2VsbHNbc2hpcC5jb29yZGluYXRlc1sxXV1baV0gPSBDZWxsU3RhdGUuRU1QVFk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMV07XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmNlbGxzW2ldW3NoaXAuY29vcmRpbmF0ZXNbMF1dID0gQ2VsbFN0YXRlLlNISVA7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc2hpcC5vcmllbnRhdGlvbiA9IG5ld09yaWVudGF0aW9uO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIGdldFNoaXBJbmRleDogZnVuY3Rpb24gKGNvb3JkaW5hdGVzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2hpcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMuc2hpcHNbaV0ub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMKSB7XG4gICAgICAgICAgZm9yIChcbiAgICAgICAgICAgIGxldCBqID0gdGhpcy5zaGlwc1tpXS5jb29yZGluYXRlc1swXTtcbiAgICAgICAgICAgIGogPD0gdGhpcy5zaGlwc1tpXS5jb29yZGluYXRlc1swXSArIHRoaXMuc2hpcHNbaV0ubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGorK1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBjb29yZGluYXRlc1swXSA9PT0gaiAmJlxuICAgICAgICAgICAgICBjb29yZGluYXRlc1sxXSA9PT0gdGhpcy5zaGlwc1tpXS5jb29yZGluYXRlc1sxXVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNoaXBzW2ldLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwpIHtcbiAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgbGV0IGogPSB0aGlzLnNoaXBzW2ldLmNvb3JkaW5hdGVzWzFdO1xuICAgICAgICAgICAgaiA8PSB0aGlzLnNoaXBzW2ldLmNvb3JkaW5hdGVzWzFdICsgdGhpcy5zaGlwc1tpXS5sZW5ndGggLSAxO1xuICAgICAgICAgICAgaisrXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGNvb3JkaW5hdGVzWzBdID09PSB0aGlzLnNoaXBzW2ldLmNvb3JkaW5hdGVzWzBdICYmXG4gICAgICAgICAgICAgIGNvb3JkaW5hdGVzWzFdID09PSBqXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYE5vIHNoaXAgZm91bmQgYXQgZ2l2ZW4gaW5kZXg6IFske2Nvb3JkaW5hdGVzWzBdfSwgJHtjb29yZGluYXRlc1sxXX1dYCxcbiAgICAgICk7XG4gICAgfSxcblxuICAgIHJlY2VpdmVBdHRhY2s6IGZ1bmN0aW9uIChjb29yZGluYXRlcykge1xuICAgICAgaWYgKFxuICAgICAgICBjb29yZGluYXRlc1swXSA8IDAgfHxcbiAgICAgICAgY29vcmRpbmF0ZXNbMV0gPCAwIHx8XG4gICAgICAgIGNvb3JkaW5hdGVzWzBdID49IHNpemUgfHxcbiAgICAgICAgY29vcmRpbmF0ZXNbMV0gPj0gc2l6ZVxuICAgICAgKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBhdHRhY2sgb3V0c2lkZSB0aGUgYm9hcmRcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5jZWxsc1tjb29yZGluYXRlc1sxXV1bY29vcmRpbmF0ZXNbMF1dICE9PSBDZWxsU3RhdGUuRU1QVFkgJiZcbiAgICAgICAgdGhpcy5jZWxsc1tjb29yZGluYXRlc1sxXV1bY29vcmRpbmF0ZXNbMF1dICE9PSBDZWxsU3RhdGUuU0hJUFxuICAgICAgKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNlbGwgaGFzIGFscmVhZHkgYmVlbiBhdHRhY2tlZFwiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuY2VsbHNbY29vcmRpbmF0ZXNbMV1dW2Nvb3JkaW5hdGVzWzBdXSAhPT0gQ2VsbFN0YXRlLlNISVApIHtcbiAgICAgICAgdGhpcy5jZWxsc1tjb29yZGluYXRlc1sxXV1bY29vcmRpbmF0ZXNbMF1dID0gQ2VsbFN0YXRlLk1JU1M7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgZm9yIChjb25zdCBzaGlwIG9mIHRoaXMuc2hpcHMpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCAmJlxuICAgICAgICAgICAgY29vcmRpbmF0ZXNbMV0gPT09IHNoaXAuY29vcmRpbmF0ZXNbMV0gJiZcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzWzBdID49IHNoaXAuY29vcmRpbmF0ZXNbMF0gJiZcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzWzBdIDw9IHNoaXAuY29vcmRpbmF0ZXNbMF0gKyBzaGlwLmxlbmd0aCAtIDEpIHx8XG4gICAgICAgICAgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCAmJlxuICAgICAgICAgICAgY29vcmRpbmF0ZXNbMF0gPT09IHNoaXAuY29vcmRpbmF0ZXNbMF0gJiZcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzWzFdID49IHNoaXAuY29vcmRpbmF0ZXNbMV0gJiZcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzWzFdIDw9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDEpXG4gICAgICAgICkge1xuICAgICAgICAgIHNoaXAuaGl0KCk7XG5cbiAgICAgICAgICBpZiAoc2hpcC5pc1N1bmsoKSkge1xuICAgICAgICAgICAgaWYgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMKSB7XG4gICAgICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICBpKytcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jZWxsc1tzaGlwLmNvb3JkaW5hdGVzWzFdXVtpXSA9IENlbGxTdGF0ZS5TVU5LO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1sxXTtcbiAgICAgICAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgaSsrXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2VsbHNbaV1bc2hpcC5jb29yZGluYXRlc1swXV0gPSBDZWxsU3RhdGUuU1VOSztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNlbGxzW2Nvb3JkaW5hdGVzWzFdXVtjb29yZGluYXRlc1swXV0gPSBDZWxsU3RhdGUuSElUO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGlzRmxlZXREZXN0cm95ZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGZvciAoY29uc3Qgc2hpcCBvZiB0aGlzLnNoaXBzKSB7XG4gICAgICAgIGlmICghc2hpcC5pc1N1bmsoKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICB9O1xufVxuIiwiaW1wb3J0IHsgY3JlYXRlR2FtZUJvYXJkIH0gZnJvbSBcIi4vZ2FtZUJvYXJkLmpzXCI7XG5cbmV4cG9ydCBjb25zdCBQbGF5ZXJUeXBlID0gT2JqZWN0LmZyZWV6ZSh7XG4gIEhVTUFOOiBcIkhVTUFOXCIsXG4gIENPTVBVVEVSOiBcIkNPTVBVVEVSXCIsXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBsYXllcih0eXBlKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZSxcbiAgICBhY3RpdmU6IGZhbHNlLFxuICAgIGJvYXJkOiBjcmVhdGVHYW1lQm9hcmQoMTApLFxuXG4gICAgYWN0aXZhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLmFjdGl2ZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQbGF5ZXIgaXMgYWxyZWFkeSBhY3RpdmVcIik7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICB9LFxuICAgIGRlYWN0aXZhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghdGhpcy5hY3RpdmUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGxheWVyIGlzIGFscmVhZHkgaW5hY3RpdmVcIik7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgfSxcbiAgfTtcbn1cbiIsImV4cG9ydCBjb25zdCBTaGlwT3JpZW50YXRpb24gPSBPYmplY3QuZnJlZXplKHtcbiAgSE9SSVpPTlRBTDogXCJIT1JJWk9OVEFMXCIsXG4gIFZFUlRJQ0FMOiBcIlZFUlRJQ0FMXCIsXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNoaXAoXG4gIGxlbmd0aCxcbiAgY29vcmRpbmF0ZXMgPSBbdW5kZWZpbmVkLCB1bmRlZmluZWRdLFxuICBvcmllbnRhdGlvbiA9IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMLFxuKSB7XG4gIGlmIChsZW5ndGggPCAxKSByZXR1cm4gdW5kZWZpbmVkO1xuICByZXR1cm4ge1xuICAgIGxlbmd0aCxcbiAgICBjb29yZGluYXRlcyxcbiAgICBvcmllbnRhdGlvbixcbiAgICBoaXRzOiAwLFxuXG4gICAgaGl0OiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpcy5oaXRzIDwgdGhpcy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5oaXRzKys7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGlzU3VuazogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGl0cyA9PT0gdGhpcy5sZW5ndGg7XG4gICAgfSxcbiAgfTtcbn1cbiIsImltcG9ydCB7IENlbGxTdGF0ZSB9IGZyb20gXCIuLi9jb3JlL2dhbWVCb2FyZC5qc1wiO1xuaW1wb3J0IHsgY3JlYXRlUGxheWVyLCBQbGF5ZXJUeXBlIH0gZnJvbSBcIi4uL2NvcmUvcGxheWVyLmpzXCI7XG5pbXBvcnQgeyBTaGlwT3JpZW50YXRpb24gfSBmcm9tIFwiLi4vY29yZS9zaGlwLmpzXCI7XG5cbmNvbnN0IHJlZnJlc2hCb2FyZEV2ZW50ID0gbmV3IEV2ZW50KFwicmVmcmVzaC1ib2FyZFwiKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwR2FtZUJvYXJkcygpIHtcbiAgY29uc3QgcGxheWVyT25lID0gY3JlYXRlUGxheWVyKFBsYXllclR5cGUuSFVNQU4pO1xuICBjb25zdCBwbGF5ZXJUd28gPSBjcmVhdGVQbGF5ZXIoUGxheWVyVHlwZS5DT01QVVRFUik7XG5cbiAgY29uc3Qgc2hpcHMgPSBbNSwgNCwgMywgMywgMl07XG5cbiAgZm9yIChjb25zdCBzaGlwIG9mIHNoaXBzKSB7XG4gICAgbGV0IHBsYWNlZCA9IGZhbHNlO1xuICAgIHdoaWxlICghcGxhY2VkKSB7XG4gICAgICBjb25zdCBvcmllbnRhdGlvbiA9XG4gICAgICAgIE1hdGgucmFuZG9tKCkgPiAwLjVcbiAgICAgICAgICA/IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMXG4gICAgICAgICAgOiBTaGlwT3JpZW50YXRpb24uVkVSVElDQUw7XG5cbiAgICAgIGNvbnN0IHggPSBNYXRoLmZsb29yKFxuICAgICAgICBNYXRoLnJhbmRvbSgpICpcbiAgICAgICAgICAoMTAgLSAob3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMID8gc2hpcCA6IDApKSxcbiAgICAgICk7XG4gICAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihcbiAgICAgICAgTWF0aC5yYW5kb20oKSAqXG4gICAgICAgICAgKDEwIC0gKG9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwgPyBzaGlwIDogMCkpLFxuICAgICAgKTtcblxuICAgICAgcGxhY2VkID0gcGxheWVyT25lLmJvYXJkLnBsYWNlU2hpcChbeCwgeV0sIHNoaXAsIG9yaWVudGF0aW9uKTtcbiAgICB9XG4gIH1cblxuICBmb3IgKGNvbnN0IHNoaXAgb2Ygc2hpcHMpIHtcbiAgICBsZXQgcGxhY2VkID0gZmFsc2U7XG4gICAgd2hpbGUgKCFwbGFjZWQpIHtcbiAgICAgIGNvbnN0IG9yaWVudGF0aW9uID1cbiAgICAgICAgTWF0aC5yYW5kb20oKSA+IDAuNVxuICAgICAgICAgID8gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUxcbiAgICAgICAgICA6IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTDtcblxuICAgICAgY29uc3QgeCA9IE1hdGguZmxvb3IoXG4gICAgICAgIE1hdGgucmFuZG9tKCkgKlxuICAgICAgICAgICgxMCAtIChvcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwgPyBzaGlwIDogMCkpLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKFxuICAgICAgICBNYXRoLnJhbmRvbSgpICpcbiAgICAgICAgICAoMTAgLSAob3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCA/IHNoaXAgOiAwKSksXG4gICAgICApO1xuXG4gICAgICBwbGFjZWQgPSBwbGF5ZXJUd28uYm9hcmQucGxhY2VTaGlwKFt4LCB5XSwgc2hpcCwgb3JpZW50YXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHBsYXllck9uZUJvYXJkQ29tcG9uZW50ID0gZ2VuZXJhdGVCb2FyZChwbGF5ZXJPbmUuYm9hcmQsIHRydWUpO1xuICBwbGF5ZXJPbmVCb2FyZENvbXBvbmVudC5jbGFzc0xpc3QuYWRkKFwicGxheWVyLW9uZVwiLCBcImh1bWFuXCIpO1xuXG4gIHBsYXllck9uZUJvYXJkQ29tcG9uZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJyZWZyZXNoLWJvYXJkXCIsICgpID0+IHtcbiAgICBBcnJheS5mcm9tKHBsYXllck9uZUJvYXJkQ29tcG9uZW50LmNoaWxkcmVuKS5mb3JFYWNoKChyb3csIGkpID0+IHtcbiAgICAgIEFycmF5LmZyb20ocm93LmNoaWxkcmVuKS5mb3JFYWNoKChjZWxsLCBqKSA9PiB7XG4gICAgICAgIGNvbnN0IGlzTW92aW5nID0gY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb3ZpbmdcIik7XG5cbiAgICAgICAgY2VsbC5jbGFzc05hbWUgPSBcImNlbGxcIjtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKGdldENlbGxDbGFzc05hbWUoW2osIGldLCBwbGF5ZXJPbmUuYm9hcmQpKTtcbiAgICAgICAgaWYgKGlzTW92aW5nKSBjZWxsLmNsYXNzTGlzdC5hZGQoXCJtb3ZpbmdcIik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG4gIHBsYXllck9uZUJvYXJkQ29tcG9uZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgXCJjbGlja1wiLFxuICAgICgpID0+IGNsZWFyU2hpcE1vdmVtZW50KHBsYXllck9uZUJvYXJkQ29tcG9uZW50KSxcbiAgICB0cnVlLFxuICApO1xuXG4gIGZ1bmN0aW9uIHNoaXBNb3ZlbWVudEhhbmRsZXIoZXZlbnQpIHtcbiAgICBjb25zdCBtb3ZpbmdTaGlwQ2VsbCA9IHBsYXllck9uZUJvYXJkQ29tcG9uZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW92aW5nXCIpO1xuXG4gICAgaWYgKCFtb3ZpbmdTaGlwQ2VsbCkgcmV0dXJuO1xuXG4gICAgY29uc3QgbW92aW5nU2hpcENvb3JkaW5hdGVzID0gZ2V0Q2VsbEluZGV4KG1vdmluZ1NoaXBDZWxsKTtcbiAgICBjb25zdCBtb3ZpbmdTaGlwSW5kZXggPSBwbGF5ZXJPbmUuYm9hcmQuZ2V0U2hpcEluZGV4KG1vdmluZ1NoaXBDb29yZGluYXRlcyk7XG5cbiAgICB0b2dnbGVTaGlwTW90aW9uKFxuICAgICAgbW92aW5nU2hpcENvb3JkaW5hdGVzLFxuICAgICAgcGxheWVyT25lLmJvYXJkLFxuICAgICAgcGxheWVyT25lQm9hcmRDb21wb25lbnQsXG4gICAgKTtcblxuICAgIGxldCBtb3ZlU3VjY2Vzc2Z1bCA9IGZhbHNlO1xuICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICBjYXNlIFwiQXJyb3dVcFwiOlxuICAgICAgICBpZiAobW92aW5nU2hpcENvb3JkaW5hdGVzWzFdIDw9IDApIGJyZWFrO1xuICAgICAgICBtb3ZlU3VjY2Vzc2Z1bCA9IHBsYXllck9uZS5ib2FyZC5tb3ZlU2hpcChtb3ZpbmdTaGlwSW5kZXgsIFtcbiAgICAgICAgICBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMF0sXG4gICAgICAgICAgbW92aW5nU2hpcENvb3JkaW5hdGVzWzFdIC0gMSxcbiAgICAgICAgXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIkFycm93TGVmdFwiOlxuICAgICAgICBpZiAobW92aW5nU2hpcENvb3JkaW5hdGVzWzBdIDw9IDApIGJyZWFrO1xuICAgICAgICBtb3ZlU3VjY2Vzc2Z1bCA9IHBsYXllck9uZS5ib2FyZC5tb3ZlU2hpcChtb3ZpbmdTaGlwSW5kZXgsIFtcbiAgICAgICAgICBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMF0gLSAxLFxuICAgICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlc1sxXSxcbiAgICAgICAgXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIkFycm93RG93blwiOlxuICAgICAgICBpZiAobW92aW5nU2hpcENvb3JkaW5hdGVzWzFdID49IHBsYXllck9uZS5ib2FyZC5zaXplIC0gMSkgYnJlYWs7XG4gICAgICAgIG1vdmVTdWNjZXNzZnVsID0gcGxheWVyT25lLmJvYXJkLm1vdmVTaGlwKG1vdmluZ1NoaXBJbmRleCwgW1xuICAgICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlc1swXSxcbiAgICAgICAgICBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMV0gKyAxLFxuICAgICAgICBdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiQXJyb3dSaWdodFwiOlxuICAgICAgICBpZiAobW92aW5nU2hpcENvb3JkaW5hdGVzWzBdID49IHBsYXllck9uZS5ib2FyZC5zaXplIC0gMSkgYnJlYWs7XG4gICAgICAgIG1vdmVTdWNjZXNzZnVsID0gcGxheWVyT25lLmJvYXJkLm1vdmVTaGlwKG1vdmluZ1NoaXBJbmRleCwgW1xuICAgICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlc1swXSArIDEsXG4gICAgICAgICAgbW92aW5nU2hpcENvb3JkaW5hdGVzWzFdLFxuICAgICAgICBdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKCFtb3ZlU3VjY2Vzc2Z1bCkge1xuICAgICAgdG9nZ2xlU2hpcE1vdGlvbihcbiAgICAgICAgbW92aW5nU2hpcENvb3JkaW5hdGVzLFxuICAgICAgICBwbGF5ZXJPbmUuYm9hcmQsXG4gICAgICAgIHBsYXllck9uZUJvYXJkQ29tcG9uZW50LFxuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBwbGF5ZXJPbmVCb2FyZENvbXBvbmVudC5kaXNwYXRjaEV2ZW50KHJlZnJlc2hCb2FyZEV2ZW50KTtcblxuICAgIGNvbnN0IG1vdmVkU2hpcCA9IHBsYXllck9uZS5ib2FyZC5zaGlwc1ttb3ZpbmdTaGlwSW5kZXhdO1xuICAgIHRvZ2dsZVNoaXBNb3Rpb24oXG4gICAgICBtb3ZlZFNoaXAuY29vcmRpbmF0ZXMsXG4gICAgICBwbGF5ZXJPbmUuYm9hcmQsXG4gICAgICBwbGF5ZXJPbmVCb2FyZENvbXBvbmVudCxcbiAgICApO1xuICB9XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHNoaXBNb3ZlbWVudEhhbmRsZXIpO1xuXG4gIGNvbnN0IHBsYXllclR3b0JvYXJkQ29tcG9uZW50ID0gZ2VuZXJhdGVCb2FyZChwbGF5ZXJUd28uYm9hcmQsIGZhbHNlKTtcbiAgcGxheWVyVHdvQm9hcmRDb21wb25lbnQuY2xhc3NMaXN0LmFkZChcInBsYXllci10d29cIiwgXCJjb21wdXRlclwiKTtcblxuICBwbGF5ZXJUd29Cb2FyZENvbXBvbmVudC5hZGRFdmVudExpc3RlbmVyKFwicmVmcmVzaC1ib2FyZFwiLCAoKSA9PiB7XG4gICAgQXJyYXkuZnJvbShwbGF5ZXJUd29Cb2FyZENvbXBvbmVudC5jaGlsZHJlbikuZm9yRWFjaCgocm93LCBpKSA9PiB7XG4gICAgICBBcnJheS5mcm9tKHJvdy5jaGlsZHJlbikuZm9yRWFjaCgoY2VsbCwgaikgPT4ge1xuICAgICAgICBjZWxsLmNsYXNzTmFtZSA9IFwiY2VsbFwiO1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoZ2V0Q2VsbENsYXNzTmFtZShbaiwgaV0sIHBsYXllclR3by5ib2FyZCwgdHJ1ZSkpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBbcGxheWVyT25lQm9hcmRDb21wb25lbnQsIHBsYXllclR3b0JvYXJkQ29tcG9uZW50XTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlQm9hcmQoYm9hcmQsIG11dGFibGUpIHtcbiAgY29uc3QgYm9hcmRDb21wb25lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBib2FyZENvbXBvbmVudC5jbGFzc0xpc3QuYWRkKFwiYm9hcmRcIik7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBib2FyZC5jZWxscy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHJvd0NvbXBvbmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcm93Q29tcG9uZW50LmNsYXNzTGlzdC5hZGQoXCJyb3dcIik7XG5cbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGJvYXJkLmNlbGxzW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICBjb25zdCBjZWxsQ29tcG9uZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIGNlbGxDb21wb25lbnQuY2xhc3NMaXN0LmFkZChcImNlbGxcIik7XG4gICAgICBjZWxsQ29tcG9uZW50LmNsYXNzTGlzdC5hZGQoZ2V0Q2VsbENsYXNzTmFtZShbaiwgaV0sIGJvYXJkKSk7XG5cbiAgICAgIGlmICghbXV0YWJsZSkge1xuICAgICAgICBjZWxsQ29tcG9uZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgY2VsbCA9IGJvYXJkLmNlbGxzW2ldW2pdO1xuICAgICAgICAgIGlmIChjZWxsICE9PSBDZWxsU3RhdGUuRU1QVFkgJiYgY2VsbCAhPT0gQ2VsbFN0YXRlLlNISVApIHJldHVybjtcblxuICAgICAgICAgIGJvYXJkLnJlY2VpdmVBdHRhY2soW2osIGldKTtcbiAgICAgICAgICBib2FyZENvbXBvbmVudC5kaXNwYXRjaEV2ZW50KHJlZnJlc2hCb2FyZEV2ZW50KTtcblxuICAgICAgICAgIGlmIChib2FyZC5pc0ZsZWV0RGVzdHJveWVkKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGdhbWVXb25PdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIGdhbWVXb25PdmVybGF5LmNsYXNzTGlzdC5hZGQoXCJnYW1lLXdvbi1vdmVybGF5XCIpO1xuICAgICAgICAgICAgZ2FtZVdvbk92ZXJsYXkudGV4dENvbnRlbnQgPSBcIllPVSBXT04gVEhFIEdBTUUhXCI7XG4gICAgICAgICAgICBib2FyZENvbXBvbmVudC5hcHBlbmRDaGlsZChnYW1lV29uT3ZlcmxheSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKG11dGFibGUpIHtcbiAgICAgICAgY2VsbENvbXBvbmVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgIGlmIChjZWxsQ29tcG9uZW50LmNsYXNzTGlzdC5jb250YWlucyhcInNoaXBcIikpIHtcbiAgICAgICAgICAgIHRvZ2dsZVNoaXBNb3Rpb24oW2osIGldLCBib2FyZCwgYm9hcmRDb21wb25lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNlbGxDb21wb25lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNvbnRleHRtZW51XCIsIChldmVudCkgPT4ge1xuICAgICAgICAgIGlmIChjZWxsQ29tcG9uZW50LmNsYXNzTGlzdC5jb250YWlucyhcInNoaXBcIikpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHNoaXBJbmRleCA9IGJvYXJkLmdldFNoaXBJbmRleChnZXRDZWxsSW5kZXgoY2VsbENvbXBvbmVudCkpO1xuICAgICAgICAgICAgY29uc3Qgc2hpcCA9IGJvYXJkLnNoaXBzW3NoaXBJbmRleF07XG5cbiAgICAgICAgICAgIGlmICghY2VsbENvbXBvbmVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb3ZpbmdcIikpIHtcbiAgICAgICAgICAgICAgdG9nZ2xlU2hpcE1vdGlvbihzaGlwLmNvb3JkaW5hdGVzLCBib2FyZCwgYm9hcmRDb21wb25lbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYm9hcmQucm90YXRlU2hpcChzaGlwSW5kZXgpKSB7XG4gICAgICAgICAgICAgIGNsZWFyU2hpcE1vdmVtZW50KGJvYXJkQ29tcG9uZW50KTtcbiAgICAgICAgICAgICAgdG9nZ2xlU2hpcE1vdGlvbihzaGlwLmNvb3JkaW5hdGVzLCBib2FyZCwgYm9hcmRDb21wb25lbnQpO1xuICAgICAgICAgICAgICBib2FyZENvbXBvbmVudC5kaXNwYXRjaEV2ZW50KHJlZnJlc2hCb2FyZEV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcm93Q29tcG9uZW50LmFwcGVuZENoaWxkKGNlbGxDb21wb25lbnQpO1xuICAgIH1cbiAgICBib2FyZENvbXBvbmVudC5hcHBlbmRDaGlsZChyb3dDb21wb25lbnQpO1xuICB9XG5cbiAgcmV0dXJuIGJvYXJkQ29tcG9uZW50O1xufVxuXG5mdW5jdGlvbiBnZXRDZWxsSW5kZXgoY2VsbCkge1xuICByZXR1cm4gW1xuICAgIEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoY2VsbC5wYXJlbnROb2RlLmNoaWxkcmVuLCBjZWxsKSxcbiAgICBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKFxuICAgICAgY2VsbC5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2hpbGRyZW4sXG4gICAgICBjZWxsLnBhcmVudE5vZGUsXG4gICAgKSxcbiAgXTtcbn1cblxuZnVuY3Rpb24gZ2V0Q2VsbENsYXNzTmFtZShjb29yZGluYXRlcywgYm9hcmQsIHNlY3JldCA9IGZhbHNlKSB7XG4gIGNvbnN0IGNlbGwgPSBib2FyZC5jZWxsc1tjb29yZGluYXRlc1sxXV1bY29vcmRpbmF0ZXNbMF1dO1xuICBzd2l0Y2ggKGNlbGwpIHtcbiAgICBjYXNlIENlbGxTdGF0ZS5FTVBUWTpcbiAgICAgIHJldHVybiBcImVtcHR5XCI7XG4gICAgY2FzZSBDZWxsU3RhdGUuTUlTUzpcbiAgICAgIHJldHVybiBcIm1pc3NcIjtcbiAgICBjYXNlIENlbGxTdGF0ZS5TSElQOlxuICAgICAgcmV0dXJuIHNlY3JldCA/IFwiZW1wdHlcIiA6IFwic2hpcFwiO1xuICAgIGNhc2UgQ2VsbFN0YXRlLkhJVDpcbiAgICAgIHJldHVybiBcImhpdFwiO1xuICAgIGNhc2UgQ2VsbFN0YXRlLlNVTks6XG4gICAgICByZXR1cm4gXCJzdW5rXCI7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2xlYXJTaGlwTW92ZW1lbnQoYm9hcmRDb21wb25lbnQpIHtcbiAgY29uc3QgbW92aW5nQ2VsbHMgPSBib2FyZENvbXBvbmVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1vdmluZ1wiKTtcbiAgaWYgKG1vdmluZ0NlbGxzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gIGZvciAoY29uc3QgY2VsbCBvZiBtb3ZpbmdDZWxscykge1xuICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZShcIm1vdmluZ1wiKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB0b2dnbGVTaGlwTW90aW9uKGNvb3JkaW5hdGVzLCBib2FyZCwgYm9hcmRDb21wb25lbnQpIHtcbiAgY29uc3QgY2VsbCA9IGJvYXJkQ29tcG9uZW50LmNoaWxkcmVuW2Nvb3JkaW5hdGVzWzFdXS5jaGlsZHJlbltjb29yZGluYXRlc1swXV07XG5cbiAgaWYgKCFjZWxsLmNsYXNzTGlzdC5jb250YWlucyhcInNoaXBcIikpIHJldHVybjtcblxuICBjb25zdCBzaGlwSW5kZXggPSBib2FyZC5nZXRTaGlwSW5kZXgoY29vcmRpbmF0ZXMpO1xuICBsZXQgc2hpcCA9IGJvYXJkLnNoaXBzW3NoaXBJbmRleF07XG5cbiAgc3dpdGNoIChzaGlwLm9yaWVudGF0aW9uKSB7XG4gICAgY2FzZSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTDpcbiAgICAgIGZvciAoXG4gICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1swXTtcbiAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICBpKytcbiAgICAgICkge1xuICAgICAgICBib2FyZENvbXBvbmVudC5jaGlsZHJlbltzaGlwLmNvb3JkaW5hdGVzWzFdXS5jaGlsZHJlbltcbiAgICAgICAgICBpXG4gICAgICAgIF0uY2xhc3NMaXN0LnRvZ2dsZShcIm1vdmluZ1wiKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMOlxuICAgICAgZm9yIChcbiAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzFdO1xuICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgIGkrK1xuICAgICAgKSB7XG4gICAgICAgIGJvYXJkQ29tcG9uZW50LmNoaWxkcmVuW2ldLmNoaWxkcmVuW1xuICAgICAgICAgIHNoaXAuY29vcmRpbmF0ZXNbMF1cbiAgICAgICAgXS5jbGFzc0xpc3QudG9nZ2xlKFwibW92aW5nXCIpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IHNldHVwR2FtZUJvYXJkcyB9IGZyb20gXCIuL2RvbS9ib2FyZHMuanNcIjtcbmltcG9ydCBcIi4vc3R5bGVzL2luZGV4LmNzc1wiO1xuXG5jb25zb2xlLmxvZyhcIkdldCBSZWFkeSBmb3IgQmF0dGxlIVwiKTtcblxuY29uc3Qgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKTtcblxucm9vdC5pbm5lckhUTUwgPSBgXG48aGVhZGVyPkJhdHRsZXNoaXA8L2hlYWRlcj5cbjxkaXYgY2xhc3M9XCJib2FyZHNcIj48L2Rpdj5cbjxkaXYgY2xhc3M9XCJjb250cm9sc1wiPlxuICA8ZGl2IGNsYXNzPVwic2hpcHNcIj48L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImdhbWUtY29udHJvbHNcIj5cbiAgICA8YnV0dG9uIGNsYXNzPVwic3RhcnRcIj5TdGFydCBHYW1lPC9idXR0b24+XG4gICAgPGJ1dHRvbiBjbGFzcz1cInJlc2V0XCI+UmVzZXQgR2FtZTwvYnV0dG9uPlxuICAgIDxidXR0b24gY2xhc3M9XCJyYW5kb21pemVcIiBkaXNhYmxlZD5SYW5kb21pemUgRm9ybWF0aW9uPC9idXR0b24+XG4gIDwvZGl2PlxuPC9kaXY+XG5gO1xuXG5jb25zdCBib2FyZHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJvYXJkc1wiKTtcbmJvYXJkc0NvbnRhaW5lci5hcHBlbmQoLi4uc2V0dXBHYW1lQm9hcmRzKCkpO1xuIl0sIm5hbWVzIjpbImNyZWF0ZVNoaXAiLCJTaGlwT3JpZW50YXRpb24iLCJDZWxsU3RhdGUiLCJPYmplY3QiLCJmcmVlemUiLCJFTVBUWSIsIk1JU1MiLCJTSElQIiwiSElUIiwiU1VOSyIsImNyZWF0ZUdhbWVCb2FyZCIsInNpemUiLCJFcnJvciIsImNlbGxzIiwiQXJyYXkiLCJmcm9tIiwibGVuZ3RoIiwic2hpcHMiLCJwbGFjZVNoaXAiLCJjb29yZGluYXRlcyIsIm9yaWVudGF0aW9uIiwiSE9SSVpPTlRBTCIsIlZFUlRJQ0FMIiwiaSIsInB1c2giLCJtb3ZlU2hpcCIsInNoaXBJbmRleCIsInNoaXAiLCJwb3AiLCJyb3RhdGVTaGlwIiwibmV3T3JpZW50YXRpb24iLCJnZXRTaGlwSW5kZXgiLCJqIiwicmVjZWl2ZUF0dGFjayIsImhpdCIsImlzU3VuayIsImlzRmxlZXREZXN0cm95ZWQiLCJQbGF5ZXJUeXBlIiwiSFVNQU4iLCJDT01QVVRFUiIsImNyZWF0ZVBsYXllciIsInR5cGUiLCJhY3RpdmUiLCJib2FyZCIsImFjdGl2YXRlIiwiZGVhY3RpdmF0ZSIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCIsImhpdHMiLCJyZWZyZXNoQm9hcmRFdmVudCIsIkV2ZW50Iiwic2V0dXBHYW1lQm9hcmRzIiwicGxheWVyT25lIiwicGxheWVyVHdvIiwicGxhY2VkIiwiTWF0aCIsInJhbmRvbSIsIngiLCJmbG9vciIsInkiLCJwbGF5ZXJPbmVCb2FyZENvbXBvbmVudCIsImdlbmVyYXRlQm9hcmQiLCJjbGFzc0xpc3QiLCJhZGQiLCJhZGRFdmVudExpc3RlbmVyIiwiY2hpbGRyZW4iLCJmb3JFYWNoIiwicm93IiwiY2VsbCIsImlzTW92aW5nIiwiY29udGFpbnMiLCJjbGFzc05hbWUiLCJnZXRDZWxsQ2xhc3NOYW1lIiwiY2xlYXJTaGlwTW92ZW1lbnQiLCJzaGlwTW92ZW1lbnRIYW5kbGVyIiwiZXZlbnQiLCJtb3ZpbmdTaGlwQ2VsbCIsInF1ZXJ5U2VsZWN0b3IiLCJtb3ZpbmdTaGlwQ29vcmRpbmF0ZXMiLCJnZXRDZWxsSW5kZXgiLCJtb3ZpbmdTaGlwSW5kZXgiLCJ0b2dnbGVTaGlwTW90aW9uIiwibW92ZVN1Y2Nlc3NmdWwiLCJrZXkiLCJkaXNwYXRjaEV2ZW50IiwibW92ZWRTaGlwIiwiZG9jdW1lbnQiLCJwbGF5ZXJUd29Cb2FyZENvbXBvbmVudCIsIm11dGFibGUiLCJib2FyZENvbXBvbmVudCIsImNyZWF0ZUVsZW1lbnQiLCJyb3dDb21wb25lbnQiLCJjZWxsQ29tcG9uZW50IiwiZ2FtZVdvbk92ZXJsYXkiLCJ0ZXh0Q29udGVudCIsImFwcGVuZENoaWxkIiwicHJldmVudERlZmF1bHQiLCJwcm90b3R5cGUiLCJpbmRleE9mIiwiY2FsbCIsInBhcmVudE5vZGUiLCJzZWNyZXQiLCJtb3ZpbmdDZWxscyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJyZW1vdmUiLCJ0b2dnbGUiLCJjb25zb2xlIiwibG9nIiwicm9vdCIsImdldEVsZW1lbnRCeUlkIiwiaW5uZXJIVE1MIiwiYm9hcmRzQ29udGFpbmVyIiwiYXBwZW5kIl0sInNvdXJjZVJvb3QiOiIifQ==