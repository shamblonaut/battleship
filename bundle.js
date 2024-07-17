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
        cell.classList.add(getCellClassName([j, i], playerTwo.board));
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
        });
      }
      if (mutable) {
        cellComponent.addEventListener("click", () => {
          if (cellComponent.classList.contains("ship")) {
            toggleShipMotion([j, i], board, boardComponent);
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
  const cell = board.cells[coordinates[1]][coordinates[0]];
  switch (cell) {
    case _core_gameBoard_js__WEBPACK_IMPORTED_MODULE_0__.CellState.EMPTY:
      return "empty";
    case _core_gameBoard_js__WEBPACK_IMPORTED_MODULE_0__.CellState.MISS:
      return "miss";
    case _core_gameBoard_js__WEBPACK_IMPORTED_MODULE_0__.CellState.SHIP:
      return "ship";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQXdEO0FBRWpELE1BQU1FLFNBQVMsR0FBR0MsTUFBTSxDQUFDQyxNQUFNLENBQUM7RUFDckNDLEtBQUssRUFBRSxDQUFDO0VBQ1JDLElBQUksRUFBRSxDQUFDO0VBQ1BDLElBQUksRUFBRSxDQUFDO0VBQ1BDLEdBQUcsRUFBRSxDQUFDO0VBQ05DLElBQUksRUFBRTtBQUNSLENBQUMsQ0FBQztBQUVLLFNBQVNDLGVBQWVBLENBQUNDLElBQUksRUFBRTtFQUNwQyxJQUFJQSxJQUFJLElBQUksQ0FBQyxFQUFFO0lBQ2IsTUFBTSxJQUFJQyxLQUFLLENBQUMsb0JBQW9CLENBQUM7RUFDdkM7RUFFQSxPQUFPO0lBQ0xELElBQUk7SUFDSkUsS0FBSyxFQUFFQyxLQUFLLENBQUNDLElBQUksQ0FBQztNQUFFQyxNQUFNLEVBQUVMO0lBQUssQ0FBQyxFQUFFLE1BQ2xDRyxLQUFLLENBQUNDLElBQUksQ0FBQztNQUFFQyxNQUFNLEVBQUVMO0lBQUssQ0FBQyxFQUFFLE1BQU1ULFNBQVMsQ0FBQ0csS0FBSyxDQUNwRCxDQUFDO0lBQ0RZLEtBQUssRUFBRSxFQUFFO0lBRVRDLFNBQVMsRUFBRSxTQUFBQSxDQUFVQyxXQUFXLEVBQUVILE1BQU0sRUFBRUksV0FBVyxFQUFFO01BQ3JELElBQ0VELFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQ2xCQSxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUNsQkEsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJUixJQUFJLElBQ3RCUSxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUlSLElBQUksRUFDdEI7UUFDQSxNQUFNLElBQUlDLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQztNQUN4RCxDQUFDLE1BQU0sSUFDSlEsV0FBVyxLQUFLbkIscURBQWUsQ0FBQ29CLFVBQVUsSUFDekNGLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBR0gsTUFBTSxHQUFHLENBQUMsSUFBSUwsSUFBSSxJQUNwQ1MsV0FBVyxLQUFLbkIscURBQWUsQ0FBQ3FCLFFBQVEsSUFDdkNILFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBR0gsTUFBTSxHQUFHLENBQUMsSUFBSUwsSUFBSyxFQUN0QztRQUNBLE9BQU8sS0FBSztNQUNkO01BRUEsSUFBSVMsV0FBVyxLQUFLbkIscURBQWUsQ0FBQ29CLFVBQVUsRUFBRTtRQUM5QyxLQUFLLElBQUlFLENBQUMsR0FBR0osV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFSSxDQUFDLElBQUlKLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBR0gsTUFBTSxHQUFHLENBQUMsRUFBRU8sQ0FBQyxFQUFFLEVBQUU7VUFDbEUsSUFBSSxJQUFJLENBQUNWLEtBQUssQ0FBQ00sV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNJLENBQUMsQ0FBQyxLQUFLckIsU0FBUyxDQUFDRyxLQUFLLEVBQUU7WUFDckQsT0FBTyxLQUFLO1VBQ2Q7UUFDRjtNQUNGLENBQUMsTUFBTSxJQUFJZSxXQUFXLEtBQUtuQixxREFBZSxDQUFDcUIsUUFBUSxFQUFFO1FBQ25ELEtBQUssSUFBSUMsQ0FBQyxHQUFHSixXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUVJLENBQUMsSUFBSUosV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHSCxNQUFNLEdBQUcsQ0FBQyxFQUFFTyxDQUFDLEVBQUUsRUFBRTtVQUNsRSxJQUFJLElBQUksQ0FBQ1YsS0FBSyxDQUFDVSxDQUFDLENBQUMsQ0FBQ0osV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUtqQixTQUFTLENBQUNHLEtBQUssRUFBRTtZQUNyRCxPQUFPLEtBQUs7VUFDZDtRQUNGO01BQ0Y7TUFFQSxJQUFJLENBQUNZLEtBQUssQ0FBQ08sSUFBSSxDQUFDeEIsb0RBQVUsQ0FBQ2dCLE1BQU0sRUFBRUcsV0FBVyxFQUFFQyxXQUFXLENBQUMsQ0FBQztNQUU3RCxJQUFJQSxXQUFXLEtBQUtuQixxREFBZSxDQUFDb0IsVUFBVSxFQUFFO1FBQzlDLEtBQUssSUFBSUUsQ0FBQyxHQUFHSixXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUVJLENBQUMsSUFBSUosV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHSCxNQUFNLEdBQUcsQ0FBQyxFQUFFTyxDQUFDLEVBQUUsRUFBRTtVQUNsRSxJQUFJLENBQUNWLEtBQUssQ0FBQ00sV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNJLENBQUMsQ0FBQyxHQUFHckIsU0FBUyxDQUFDSyxJQUFJO1FBQ2hEO01BQ0YsQ0FBQyxNQUFNLElBQUlhLFdBQVcsS0FBS25CLHFEQUFlLENBQUNxQixRQUFRLEVBQUU7UUFDbkQsS0FBSyxJQUFJQyxDQUFDLEdBQUdKLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRUksQ0FBQyxJQUFJSixXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUdILE1BQU0sR0FBRyxDQUFDLEVBQUVPLENBQUMsRUFBRSxFQUFFO1VBQ2xFLElBQUksQ0FBQ1YsS0FBSyxDQUFDVSxDQUFDLENBQUMsQ0FBQ0osV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdqQixTQUFTLENBQUNLLElBQUk7UUFDaEQ7TUFDRjtNQUVBLE9BQU8sSUFBSTtJQUNiLENBQUM7SUFFRGtCLFFBQVEsRUFBRSxTQUFBQSxDQUFVQyxTQUFTLEVBQUVQLFdBQVcsRUFBRTtNQUMxQyxNQUFNUSxJQUFJLEdBQUcsSUFBSSxDQUFDVixLQUFLLENBQUNTLFNBQVMsQ0FBQztNQUNsQyxJQUFJLENBQUNDLElBQUksRUFBRTtRQUNULE1BQU0sSUFBSWYsS0FBSyxDQUFDLHFCQUFxQixDQUFDO01BQ3hDO01BRUEsSUFBSWUsSUFBSSxDQUFDUCxXQUFXLEtBQUtuQixxREFBZSxDQUFDb0IsVUFBVSxFQUFFO1FBQ25ELEtBQ0UsSUFBSUUsQ0FBQyxHQUFHSSxJQUFJLENBQUNSLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFDM0JJLENBQUMsSUFBSUksSUFBSSxDQUFDUixXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUdRLElBQUksQ0FBQ1gsTUFBTSxHQUFHLENBQUMsRUFDMUNPLENBQUMsRUFBRSxFQUNIO1VBQ0EsSUFBSSxDQUFDVixLQUFLLENBQUNjLElBQUksQ0FBQ1IsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNJLENBQUMsQ0FBQyxHQUFHckIsU0FBUyxDQUFDRyxLQUFLO1FBQ3REO01BQ0YsQ0FBQyxNQUFNLElBQUlzQixJQUFJLENBQUNQLFdBQVcsS0FBS25CLHFEQUFlLENBQUNxQixRQUFRLEVBQUU7UUFDeEQsS0FDRSxJQUFJQyxDQUFDLEdBQUdJLElBQUksQ0FBQ1IsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUMzQkksQ0FBQyxJQUFJSSxJQUFJLENBQUNSLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBR1EsSUFBSSxDQUFDWCxNQUFNLEdBQUcsQ0FBQyxFQUMxQ08sQ0FBQyxFQUFFLEVBQ0g7VUFDQSxJQUFJLENBQUNWLEtBQUssQ0FBQ1UsQ0FBQyxDQUFDLENBQUNJLElBQUksQ0FBQ1IsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdqQixTQUFTLENBQUNHLEtBQUs7UUFDdEQ7TUFDRjtNQUVBLElBQUksQ0FBQyxJQUFJLENBQUNhLFNBQVMsQ0FBQ0MsV0FBVyxFQUFFUSxJQUFJLENBQUNYLE1BQU0sRUFBRVcsSUFBSSxDQUFDUCxXQUFXLENBQUMsRUFBRTtRQUMvRCxJQUFJTyxJQUFJLENBQUNQLFdBQVcsS0FBS25CLHFEQUFlLENBQUNvQixVQUFVLEVBQUU7VUFDbkQsS0FDRSxJQUFJRSxDQUFDLEdBQUdJLElBQUksQ0FBQ1IsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUMzQkksQ0FBQyxJQUFJSSxJQUFJLENBQUNSLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBR1EsSUFBSSxDQUFDWCxNQUFNLEdBQUcsQ0FBQyxFQUMxQ08sQ0FBQyxFQUFFLEVBQ0g7WUFDQSxJQUFJLENBQUNWLEtBQUssQ0FBQ2MsSUFBSSxDQUFDUixXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQ0ksQ0FBQyxDQUFDLEdBQUdyQixTQUFTLENBQUNLLElBQUk7VUFDckQ7UUFDRixDQUFDLE1BQU0sSUFBSW9CLElBQUksQ0FBQ1AsV0FBVyxLQUFLbkIscURBQWUsQ0FBQ3FCLFFBQVEsRUFBRTtVQUN4RCxLQUNFLElBQUlDLENBQUMsR0FBR0ksSUFBSSxDQUFDUixXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQzNCSSxDQUFDLElBQUlJLElBQUksQ0FBQ1IsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHUSxJQUFJLENBQUNYLE1BQU0sR0FBRyxDQUFDLEVBQzFDTyxDQUFDLEVBQUUsRUFDSDtZQUNBLElBQUksQ0FBQ1YsS0FBSyxDQUFDVSxDQUFDLENBQUMsQ0FBQ0ksSUFBSSxDQUFDUixXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR2pCLFNBQVMsQ0FBQ0ssSUFBSTtVQUNyRDtRQUNGO1FBQ0EsT0FBTyxLQUFLO01BQ2Q7TUFFQSxJQUFJLENBQUNVLEtBQUssQ0FBQ1MsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDVCxLQUFLLENBQUNXLEdBQUcsQ0FBQyxDQUFDO01BRXhDLE9BQU8sSUFBSTtJQUNiLENBQUM7SUFFREMsWUFBWSxFQUFFLFNBQUFBLENBQVVWLFdBQVcsRUFBRTtNQUNuQyxLQUFLLElBQUlJLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxJQUFJLENBQUNOLEtBQUssQ0FBQ0QsTUFBTSxFQUFFTyxDQUFDLEVBQUUsRUFBRTtRQUMxQyxJQUFJLElBQUksQ0FBQ04sS0FBSyxDQUFDTSxDQUFDLENBQUMsQ0FBQ0gsV0FBVyxLQUFLbkIscURBQWUsQ0FBQ29CLFVBQVUsRUFBRTtVQUM1RCxLQUNFLElBQUlTLENBQUMsR0FBRyxJQUFJLENBQUNiLEtBQUssQ0FBQ00sQ0FBQyxDQUFDLENBQUNKLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFDcENXLENBQUMsSUFBSSxJQUFJLENBQUNiLEtBQUssQ0FBQ00sQ0FBQyxDQUFDLENBQUNKLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUNGLEtBQUssQ0FBQ00sQ0FBQyxDQUFDLENBQUNQLE1BQU0sR0FBRyxDQUFDLEVBQzVEYyxDQUFDLEVBQUUsRUFDSDtZQUNBLElBQ0VYLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBS1csQ0FBQyxJQUNwQlgsV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQ0YsS0FBSyxDQUFDTSxDQUFDLENBQUMsQ0FBQ0osV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUMvQztjQUNBLE9BQU9JLENBQUM7WUFDVjtVQUNGO1FBQ0YsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDTixLQUFLLENBQUNNLENBQUMsQ0FBQyxDQUFDSCxXQUFXLEtBQUtuQixxREFBZSxDQUFDcUIsUUFBUSxFQUFFO1VBQ2pFLEtBQ0UsSUFBSVEsQ0FBQyxHQUFHLElBQUksQ0FBQ2IsS0FBSyxDQUFDTSxDQUFDLENBQUMsQ0FBQ0osV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUNwQ1csQ0FBQyxJQUFJLElBQUksQ0FBQ2IsS0FBSyxDQUFDTSxDQUFDLENBQUMsQ0FBQ0osV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQ0YsS0FBSyxDQUFDTSxDQUFDLENBQUMsQ0FBQ1AsTUFBTSxHQUFHLENBQUMsRUFDNURjLENBQUMsRUFBRSxFQUNIO1lBQ0EsSUFDRVgsV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQ0YsS0FBSyxDQUFDTSxDQUFDLENBQUMsQ0FBQ0osV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUMvQ0EsV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLVyxDQUFDLEVBQ3BCO2NBQ0EsT0FBT1AsQ0FBQztZQUNWO1VBQ0Y7UUFDRjtNQUNGO01BRUEsTUFBTSxJQUFJWCxLQUFLLENBQ2Isa0NBQWtDTyxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUtBLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FDckUsQ0FBQztJQUNILENBQUM7SUFFRFksYUFBYSxFQUFFLFNBQUFBLENBQVVaLFdBQVcsRUFBRTtNQUNwQyxJQUNFQSxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUNsQkEsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFDbEJBLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSVIsSUFBSSxJQUN0QlEsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJUixJQUFJLEVBQ3RCO1FBQ0EsTUFBTSxJQUFJQyxLQUFLLENBQUMsaUNBQWlDLENBQUM7TUFDcEQ7TUFFQSxJQUNFLElBQUksQ0FBQ0MsS0FBSyxDQUFDTSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQ0EsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUtqQixTQUFTLENBQUNHLEtBQUssSUFDOUQsSUFBSSxDQUFDUSxLQUFLLENBQUNNLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDQSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBS2pCLFNBQVMsQ0FBQ0ssSUFBSSxFQUM3RDtRQUNBLE1BQU0sSUFBSUssS0FBSyxDQUFDLGdDQUFnQyxDQUFDO01BQ25EO01BRUEsSUFBSSxJQUFJLENBQUNDLEtBQUssQ0FBQ00sV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNBLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLakIsU0FBUyxDQUFDSyxJQUFJLEVBQUU7UUFDakUsSUFBSSxDQUFDTSxLQUFLLENBQUNNLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDQSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR2pCLFNBQVMsQ0FBQ0ksSUFBSTtRQUMzRCxPQUFPLEtBQUs7TUFDZDtNQUVBLEtBQUssTUFBTXFCLElBQUksSUFBSSxJQUFJLENBQUNWLEtBQUssRUFBRTtRQUM3QixJQUNHVSxJQUFJLENBQUNQLFdBQVcsS0FBS25CLHFEQUFlLENBQUNvQixVQUFVLElBQzlDRixXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUtRLElBQUksQ0FBQ1IsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUN0Q0EsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJUSxJQUFJLENBQUNSLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFDckNBLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSVEsSUFBSSxDQUFDUixXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUdRLElBQUksQ0FBQ1gsTUFBTSxHQUFHLENBQUMsSUFDeERXLElBQUksQ0FBQ1AsV0FBVyxLQUFLbkIscURBQWUsQ0FBQ3FCLFFBQVEsSUFDNUNILFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBS1EsSUFBSSxDQUFDUixXQUFXLENBQUMsQ0FBQyxDQUFDLElBQ3RDQSxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUlRLElBQUksQ0FBQ1IsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUNyQ0EsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJUSxJQUFJLENBQUNSLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBR1EsSUFBSSxDQUFDWCxNQUFNLEdBQUcsQ0FBRSxFQUMxRDtVQUNBVyxJQUFJLENBQUNLLEdBQUcsQ0FBQyxDQUFDO1VBRVYsSUFBSUwsSUFBSSxDQUFDTSxNQUFNLENBQUMsQ0FBQyxFQUFFO1lBQ2pCLElBQUlOLElBQUksQ0FBQ1AsV0FBVyxLQUFLbkIscURBQWUsQ0FBQ29CLFVBQVUsRUFBRTtjQUNuRCxLQUNFLElBQUlFLENBQUMsR0FBR0ksSUFBSSxDQUFDUixXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQzNCSSxDQUFDLElBQUlJLElBQUksQ0FBQ1IsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHUSxJQUFJLENBQUNYLE1BQU0sR0FBRyxDQUFDLEVBQzFDTyxDQUFDLEVBQUUsRUFDSDtnQkFDQSxJQUFJLENBQUNWLEtBQUssQ0FBQ2MsSUFBSSxDQUFDUixXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQ0ksQ0FBQyxDQUFDLEdBQUdyQixTQUFTLENBQUNPLElBQUk7Y0FDckQ7WUFDRixDQUFDLE1BQU0sSUFBSWtCLElBQUksQ0FBQ1AsV0FBVyxLQUFLbkIscURBQWUsQ0FBQ3FCLFFBQVEsRUFBRTtjQUN4RCxLQUNFLElBQUlDLENBQUMsR0FBR0ksSUFBSSxDQUFDUixXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQzNCSSxDQUFDLElBQUlJLElBQUksQ0FBQ1IsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHUSxJQUFJLENBQUNYLE1BQU0sR0FBRyxDQUFDLEVBQzFDTyxDQUFDLEVBQUUsRUFDSDtnQkFDQSxJQUFJLENBQUNWLEtBQUssQ0FBQ1UsQ0FBQyxDQUFDLENBQUNJLElBQUksQ0FBQ1IsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdqQixTQUFTLENBQUNPLElBQUk7Y0FDckQ7WUFDRjtVQUNGLENBQUMsTUFBTTtZQUNMLElBQUksQ0FBQ0ksS0FBSyxDQUFDTSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQ0EsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdqQixTQUFTLENBQUNNLEdBQUc7VUFDNUQ7VUFFQSxPQUFPLElBQUk7UUFDYjtNQUNGO0lBQ0YsQ0FBQztJQUVEMEIsZ0JBQWdCLEVBQUUsU0FBQUEsQ0FBQSxFQUFZO01BQzVCLEtBQUssTUFBTVAsSUFBSSxJQUFJLElBQUksQ0FBQ1YsS0FBSyxFQUFFO1FBQzdCLElBQUksQ0FBQ1UsSUFBSSxDQUFDTSxNQUFNLENBQUMsQ0FBQyxFQUFFO1VBQ2xCLE9BQU8sS0FBSztRQUNkO01BQ0Y7TUFFQSxPQUFPLElBQUk7SUFDYjtFQUNGLENBQUM7QUFDSDs7Ozs7Ozs7Ozs7Ozs7OztBQ2xPaUQ7QUFFMUMsTUFBTUUsVUFBVSxHQUFHaEMsTUFBTSxDQUFDQyxNQUFNLENBQUM7RUFDdENnQyxLQUFLLEVBQUUsT0FBTztFQUNkQyxRQUFRLEVBQUU7QUFDWixDQUFDLENBQUM7QUFFSyxTQUFTQyxZQUFZQSxDQUFDQyxJQUFJLEVBQUU7RUFDakMsT0FBTztJQUNMQSxJQUFJO0lBQ0pDLE1BQU0sRUFBRSxLQUFLO0lBQ2JDLEtBQUssRUFBRS9CLDhEQUFlLENBQUMsRUFBRSxDQUFDO0lBRTFCZ0MsUUFBUSxFQUFFLFNBQUFBLENBQUEsRUFBWTtNQUNwQixJQUFJLElBQUksQ0FBQ0YsTUFBTSxFQUFFO1FBQ2YsTUFBTSxJQUFJNUIsS0FBSyxDQUFDLDBCQUEwQixDQUFDO01BQzdDO01BRUEsSUFBSSxDQUFDNEIsTUFBTSxHQUFHLElBQUk7SUFDcEIsQ0FBQztJQUNERyxVQUFVLEVBQUUsU0FBQUEsQ0FBQSxFQUFZO01BQ3RCLElBQUksQ0FBQyxJQUFJLENBQUNILE1BQU0sRUFBRTtRQUNoQixNQUFNLElBQUk1QixLQUFLLENBQUMsNEJBQTRCLENBQUM7TUFDL0M7TUFFQSxJQUFJLENBQUM0QixNQUFNLEdBQUcsS0FBSztJQUNyQjtFQUNGLENBQUM7QUFDSDs7Ozs7Ozs7Ozs7Ozs7O0FDNUJPLE1BQU12QyxlQUFlLEdBQUdFLE1BQU0sQ0FBQ0MsTUFBTSxDQUFDO0VBQzNDaUIsVUFBVSxFQUFFLFlBQVk7RUFDeEJDLFFBQVEsRUFBRTtBQUNaLENBQUMsQ0FBQztBQUVLLFNBQVN0QixVQUFVQSxDQUN4QmdCLE1BQU0sRUFHTjtFQUFBLElBRkFHLFdBQVcsR0FBQXlCLFNBQUEsQ0FBQTVCLE1BQUEsUUFBQTRCLFNBQUEsUUFBQUMsU0FBQSxHQUFBRCxTQUFBLE1BQUcsQ0FBQ0MsU0FBUyxFQUFFQSxTQUFTLENBQUM7RUFBQSxJQUNwQ3pCLFdBQVcsR0FBQXdCLFNBQUEsQ0FBQTVCLE1BQUEsUUFBQTRCLFNBQUEsUUFBQUMsU0FBQSxHQUFBRCxTQUFBLE1BQUczQyxlQUFlLENBQUNvQixVQUFVO0VBRXhDLElBQUlMLE1BQU0sR0FBRyxDQUFDLEVBQUUsT0FBTzZCLFNBQVM7RUFDaEMsT0FBTztJQUNMN0IsTUFBTTtJQUNORyxXQUFXO0lBQ1hDLFdBQVc7SUFDWDBCLElBQUksRUFBRSxDQUFDO0lBRVBkLEdBQUcsRUFBRSxTQUFBQSxDQUFBLEVBQVk7TUFDZixJQUFJLElBQUksQ0FBQ2MsSUFBSSxHQUFHLElBQUksQ0FBQzlCLE1BQU0sRUFBRTtRQUMzQixJQUFJLENBQUM4QixJQUFJLEVBQUU7TUFDYjtJQUNGLENBQUM7SUFFRGIsTUFBTSxFQUFFLFNBQUFBLENBQUEsRUFBWTtNQUNsQixPQUFPLElBQUksQ0FBQ2EsSUFBSSxLQUFLLElBQUksQ0FBQzlCLE1BQU07SUFDbEM7RUFDRixDQUFDO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNCaUQ7QUFDWTtBQUNYO0FBRWxELE1BQU0rQixpQkFBaUIsR0FBRyxJQUFJQyxLQUFLLENBQUMsZUFBZSxDQUFDO0FBRTdDLFNBQVNDLGVBQWVBLENBQUEsRUFBRztFQUNoQyxNQUFNQyxTQUFTLEdBQUdaLDZEQUFZLENBQUNILHVEQUFVLENBQUNDLEtBQUssQ0FBQztFQUNoRCxNQUFNZSxTQUFTLEdBQUdiLDZEQUFZLENBQUNILHVEQUFVLENBQUNFLFFBQVEsQ0FBQztFQUVuRCxNQUFNcEIsS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUU3QixLQUFLLE1BQU1VLElBQUksSUFBSVYsS0FBSyxFQUFFO0lBQ3hCLElBQUltQyxNQUFNLEdBQUcsS0FBSztJQUNsQixPQUFPLENBQUNBLE1BQU0sRUFBRTtNQUNkLE1BQU1oQyxXQUFXLEdBQ2ZpQyxJQUFJLENBQUNDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUNmckQsMERBQWUsQ0FBQ29CLFVBQVUsR0FDMUJwQiwwREFBZSxDQUFDcUIsUUFBUTtNQUU5QixNQUFNaUMsQ0FBQyxHQUFHRixJQUFJLENBQUNHLEtBQUssQ0FDbEJILElBQUksQ0FBQ0MsTUFBTSxDQUFDLENBQUMsSUFDVixFQUFFLElBQUlsQyxXQUFXLEtBQUtuQiwwREFBZSxDQUFDb0IsVUFBVSxHQUFHTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQ2pFLENBQUM7TUFDRCxNQUFNOEIsQ0FBQyxHQUFHSixJQUFJLENBQUNHLEtBQUssQ0FDbEJILElBQUksQ0FBQ0MsTUFBTSxDQUFDLENBQUMsSUFDVixFQUFFLElBQUlsQyxXQUFXLEtBQUtuQiwwREFBZSxDQUFDcUIsUUFBUSxHQUFHSyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQy9ELENBQUM7TUFFRHlCLE1BQU0sR0FBR0YsU0FBUyxDQUFDVCxLQUFLLENBQUN2QixTQUFTLENBQUMsQ0FBQ3FDLENBQUMsRUFBRUUsQ0FBQyxDQUFDLEVBQUU5QixJQUFJLEVBQUVQLFdBQVcsQ0FBQztJQUMvRDtFQUNGO0VBRUEsS0FBSyxNQUFNTyxJQUFJLElBQUlWLEtBQUssRUFBRTtJQUN4QixJQUFJbUMsTUFBTSxHQUFHLEtBQUs7SUFDbEIsT0FBTyxDQUFDQSxNQUFNLEVBQUU7TUFDZCxNQUFNaEMsV0FBVyxHQUNmaUMsSUFBSSxDQUFDQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FDZnJELDBEQUFlLENBQUNvQixVQUFVLEdBQzFCcEIsMERBQWUsQ0FBQ3FCLFFBQVE7TUFFOUIsTUFBTWlDLENBQUMsR0FBR0YsSUFBSSxDQUFDRyxLQUFLLENBQ2xCSCxJQUFJLENBQUNDLE1BQU0sQ0FBQyxDQUFDLElBQ1YsRUFBRSxJQUFJbEMsV0FBVyxLQUFLbkIsMERBQWUsQ0FBQ29CLFVBQVUsR0FBR00sSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUNqRSxDQUFDO01BQ0QsTUFBTThCLENBQUMsR0FBR0osSUFBSSxDQUFDRyxLQUFLLENBQ2xCSCxJQUFJLENBQUNDLE1BQU0sQ0FBQyxDQUFDLElBQ1YsRUFBRSxJQUFJbEMsV0FBVyxLQUFLbkIsMERBQWUsQ0FBQ3FCLFFBQVEsR0FBR0ssSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUMvRCxDQUFDO01BRUR5QixNQUFNLEdBQUdELFNBQVMsQ0FBQ1YsS0FBSyxDQUFDdkIsU0FBUyxDQUFDLENBQUNxQyxDQUFDLEVBQUVFLENBQUMsQ0FBQyxFQUFFOUIsSUFBSSxFQUFFUCxXQUFXLENBQUM7SUFDL0Q7RUFDRjtFQUVBLE1BQU1zQyx1QkFBdUIsR0FBR0MsYUFBYSxDQUFDVCxTQUFTLENBQUNULEtBQUssRUFBRSxJQUFJLENBQUM7RUFDcEVpQix1QkFBdUIsQ0FBQ0UsU0FBUyxDQUFDQyxHQUFHLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQztFQUU1REgsdUJBQXVCLENBQUNJLGdCQUFnQixDQUFDLGVBQWUsRUFBRSxNQUFNO0lBQzlEaEQsS0FBSyxDQUFDQyxJQUFJLENBQUMyQyx1QkFBdUIsQ0FBQ0ssUUFBUSxDQUFDLENBQUNDLE9BQU8sQ0FBQyxDQUFDQyxHQUFHLEVBQUUxQyxDQUFDLEtBQUs7TUFDL0RULEtBQUssQ0FBQ0MsSUFBSSxDQUFDa0QsR0FBRyxDQUFDRixRQUFRLENBQUMsQ0FBQ0MsT0FBTyxDQUFDLENBQUNFLElBQUksRUFBRXBDLENBQUMsS0FBSztRQUM1QyxNQUFNcUMsUUFBUSxHQUFHRCxJQUFJLENBQUNOLFNBQVMsQ0FBQ1EsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUVsREYsSUFBSSxDQUFDRyxTQUFTLEdBQUcsTUFBTTtRQUN2QkgsSUFBSSxDQUFDTixTQUFTLENBQUNDLEdBQUcsQ0FBQ1MsZ0JBQWdCLENBQUMsQ0FBQ3hDLENBQUMsRUFBRVAsQ0FBQyxDQUFDLEVBQUUyQixTQUFTLENBQUNULEtBQUssQ0FBQyxDQUFDO1FBQzdELElBQUkwQixRQUFRLEVBQUVELElBQUksQ0FBQ04sU0FBUyxDQUFDQyxHQUFHLENBQUMsUUFBUSxDQUFDO01BQzVDLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQztFQUNKLENBQUMsQ0FBQztFQUNGSCx1QkFBdUIsQ0FBQ0ksZ0JBQWdCLENBQ3RDLE9BQU8sRUFDUCxNQUFNUyxpQkFBaUIsQ0FBQ2IsdUJBQXVCLENBQUMsRUFDaEQsSUFDRixDQUFDO0VBRUQsU0FBU2MsbUJBQW1CQSxDQUFDQyxLQUFLLEVBQUU7SUFDbEMsTUFBTUMsY0FBYyxHQUFHaEIsdUJBQXVCLENBQUNpQixhQUFhLENBQUMsU0FBUyxDQUFDO0lBRXZFLElBQUksQ0FBQ0QsY0FBYyxFQUFFO0lBRXJCLE1BQU1FLHFCQUFxQixHQUFHQyxZQUFZLENBQUNILGNBQWMsQ0FBQztJQUMxRCxNQUFNSSxlQUFlLEdBQUc1QixTQUFTLENBQUNULEtBQUssQ0FBQ1osWUFBWSxDQUFDK0MscUJBQXFCLENBQUM7SUFFM0VHLGdCQUFnQixDQUNkSCxxQkFBcUIsRUFDckIxQixTQUFTLENBQUNULEtBQUssRUFDZmlCLHVCQUNGLENBQUM7SUFFRCxJQUFJc0IsY0FBYyxHQUFHLEtBQUs7SUFDMUIsUUFBUVAsS0FBSyxDQUFDUSxHQUFHO01BQ2YsS0FBSyxTQUFTO1FBQ1osSUFBSUwscUJBQXFCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ25DSSxjQUFjLEdBQUc5QixTQUFTLENBQUNULEtBQUssQ0FBQ2hCLFFBQVEsQ0FBQ3FELGVBQWUsRUFBRSxDQUN6REYscUJBQXFCLENBQUMsQ0FBQyxDQUFDLEVBQ3hCQSxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQzdCLENBQUM7UUFDRjtNQUNGLEtBQUssV0FBVztRQUNkLElBQUlBLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNuQ0ksY0FBYyxHQUFHOUIsU0FBUyxDQUFDVCxLQUFLLENBQUNoQixRQUFRLENBQUNxRCxlQUFlLEVBQUUsQ0FDekRGLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFDNUJBLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUN6QixDQUFDO1FBQ0Y7TUFDRixLQUFLLFdBQVc7UUFDZCxJQUFJQSxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsSUFBSTFCLFNBQVMsQ0FBQ1QsS0FBSyxDQUFDOUIsSUFBSSxHQUFHLENBQUMsRUFBRTtRQUMxRHFFLGNBQWMsR0FBRzlCLFNBQVMsQ0FBQ1QsS0FBSyxDQUFDaEIsUUFBUSxDQUFDcUQsZUFBZSxFQUFFLENBQ3pERixxQkFBcUIsQ0FBQyxDQUFDLENBQUMsRUFDeEJBLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FDN0IsQ0FBQztRQUNGO01BQ0YsS0FBSyxZQUFZO1FBQ2YsSUFBSUEscUJBQXFCLENBQUMsQ0FBQyxDQUFDLElBQUkxQixTQUFTLENBQUNULEtBQUssQ0FBQzlCLElBQUksR0FBRyxDQUFDLEVBQUU7UUFDMURxRSxjQUFjLEdBQUc5QixTQUFTLENBQUNULEtBQUssQ0FBQ2hCLFFBQVEsQ0FBQ3FELGVBQWUsRUFBRSxDQUN6REYscUJBQXFCLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUM1QkEscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQ3pCLENBQUM7UUFDRjtJQUNKO0lBRUEsSUFBSSxDQUFDSSxjQUFjLEVBQUU7TUFDbkJELGdCQUFnQixDQUNkSCxxQkFBcUIsRUFDckIxQixTQUFTLENBQUNULEtBQUssRUFDZmlCLHVCQUNGLENBQUM7TUFDRDtJQUNGO0lBRUFBLHVCQUF1QixDQUFDd0IsYUFBYSxDQUFDbkMsaUJBQWlCLENBQUM7SUFFeEQsTUFBTW9DLFNBQVMsR0FBR2pDLFNBQVMsQ0FBQ1QsS0FBSyxDQUFDeEIsS0FBSyxDQUFDNkQsZUFBZSxDQUFDO0lBQ3hEQyxnQkFBZ0IsQ0FDZEksU0FBUyxDQUFDaEUsV0FBVyxFQUNyQitCLFNBQVMsQ0FBQ1QsS0FBSyxFQUNmaUIsdUJBQ0YsQ0FBQztFQUNIO0VBQ0EwQixRQUFRLENBQUN0QixnQkFBZ0IsQ0FBQyxTQUFTLEVBQUVVLG1CQUFtQixDQUFDO0VBRXpELE1BQU1hLHVCQUF1QixHQUFHMUIsYUFBYSxDQUFDUixTQUFTLENBQUNWLEtBQUssRUFBRSxLQUFLLENBQUM7RUFDckU0Qyx1QkFBdUIsQ0FBQ3pCLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUM7RUFFL0R3Qix1QkFBdUIsQ0FBQ3ZCLGdCQUFnQixDQUFDLGVBQWUsRUFBRSxNQUFNO0lBQzlEaEQsS0FBSyxDQUFDQyxJQUFJLENBQUNzRSx1QkFBdUIsQ0FBQ3RCLFFBQVEsQ0FBQyxDQUFDQyxPQUFPLENBQUMsQ0FBQ0MsR0FBRyxFQUFFMUMsQ0FBQyxLQUFLO01BQy9EVCxLQUFLLENBQUNDLElBQUksQ0FBQ2tELEdBQUcsQ0FBQ0YsUUFBUSxDQUFDLENBQUNDLE9BQU8sQ0FBQyxDQUFDRSxJQUFJLEVBQUVwQyxDQUFDLEtBQUs7UUFDNUNvQyxJQUFJLENBQUNHLFNBQVMsR0FBRyxNQUFNO1FBQ3ZCSCxJQUFJLENBQUNOLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDUyxnQkFBZ0IsQ0FBQyxDQUFDeEMsQ0FBQyxFQUFFUCxDQUFDLENBQUMsRUFBRTRCLFNBQVMsQ0FBQ1YsS0FBSyxDQUFDLENBQUM7TUFDL0QsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDO0VBQ0osQ0FBQyxDQUFDO0VBRUYsT0FBTyxDQUFDaUIsdUJBQXVCLEVBQUUyQix1QkFBdUIsQ0FBQztBQUMzRDtBQUVPLFNBQVMxQixhQUFhQSxDQUFDbEIsS0FBSyxFQUFFNkMsT0FBTyxFQUFFO0VBQzVDLE1BQU1DLGNBQWMsR0FBR0gsUUFBUSxDQUFDSSxhQUFhLENBQUMsS0FBSyxDQUFDO0VBQ3BERCxjQUFjLENBQUMzQixTQUFTLENBQUNDLEdBQUcsQ0FBQyxPQUFPLENBQUM7RUFFckMsS0FBSyxJQUFJdEMsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHa0IsS0FBSyxDQUFDNUIsS0FBSyxDQUFDRyxNQUFNLEVBQUVPLENBQUMsRUFBRSxFQUFFO0lBQzNDLE1BQU1rRSxZQUFZLEdBQUdMLFFBQVEsQ0FBQ0ksYUFBYSxDQUFDLEtBQUssQ0FBQztJQUNsREMsWUFBWSxDQUFDN0IsU0FBUyxDQUFDQyxHQUFHLENBQUMsS0FBSyxDQUFDO0lBRWpDLEtBQUssSUFBSS9CLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR1csS0FBSyxDQUFDNUIsS0FBSyxDQUFDVSxDQUFDLENBQUMsQ0FBQ1AsTUFBTSxFQUFFYyxDQUFDLEVBQUUsRUFBRTtNQUM5QyxNQUFNNEQsYUFBYSxHQUFHTixRQUFRLENBQUNJLGFBQWEsQ0FBQyxRQUFRLENBQUM7TUFDdERFLGFBQWEsQ0FBQzlCLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE1BQU0sQ0FBQztNQUNuQzZCLGFBQWEsQ0FBQzlCLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDUyxnQkFBZ0IsQ0FBQyxDQUFDeEMsQ0FBQyxFQUFFUCxDQUFDLENBQUMsRUFBRWtCLEtBQUssQ0FBQyxDQUFDO01BRTVELElBQUksQ0FBQzZDLE9BQU8sRUFBRTtRQUNaSSxhQUFhLENBQUM1QixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTTtVQUM1QyxNQUFNSSxJQUFJLEdBQUd6QixLQUFLLENBQUM1QixLQUFLLENBQUNVLENBQUMsQ0FBQyxDQUFDTyxDQUFDLENBQUM7VUFDOUIsSUFBSW9DLElBQUksS0FBS2hFLHlEQUFTLENBQUNHLEtBQUssSUFBSTZELElBQUksS0FBS2hFLHlEQUFTLENBQUNLLElBQUksRUFBRTtVQUV6RGtDLEtBQUssQ0FBQ1YsYUFBYSxDQUFDLENBQUNELENBQUMsRUFBRVAsQ0FBQyxDQUFDLENBQUM7VUFDM0JnRSxjQUFjLENBQUNMLGFBQWEsQ0FBQ25DLGlCQUFpQixDQUFDO1FBQ2pELENBQUMsQ0FBQztNQUNKO01BRUEsSUFBSXVDLE9BQU8sRUFBRTtRQUNYSSxhQUFhLENBQUM1QixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTTtVQUM1QyxJQUFJNEIsYUFBYSxDQUFDOUIsU0FBUyxDQUFDUSxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDNUNXLGdCQUFnQixDQUFDLENBQUNqRCxDQUFDLEVBQUVQLENBQUMsQ0FBQyxFQUFFa0IsS0FBSyxFQUFFOEMsY0FBYyxDQUFDO1VBQ2pEO1FBQ0YsQ0FBQyxDQUFDO01BQ0o7TUFDQUUsWUFBWSxDQUFDRSxXQUFXLENBQUNELGFBQWEsQ0FBQztJQUN6QztJQUNBSCxjQUFjLENBQUNJLFdBQVcsQ0FBQ0YsWUFBWSxDQUFDO0VBQzFDO0VBRUEsT0FBT0YsY0FBYztBQUN2QjtBQUVBLFNBQVNWLFlBQVlBLENBQUNYLElBQUksRUFBRTtFQUMxQixPQUFPLENBQ0xwRCxLQUFLLENBQUM4RSxTQUFTLENBQUNDLE9BQU8sQ0FBQ0MsSUFBSSxDQUFDNUIsSUFBSSxDQUFDNkIsVUFBVSxDQUFDaEMsUUFBUSxFQUFFRyxJQUFJLENBQUMsRUFDNURwRCxLQUFLLENBQUM4RSxTQUFTLENBQUNDLE9BQU8sQ0FBQ0MsSUFBSSxDQUMxQjVCLElBQUksQ0FBQzZCLFVBQVUsQ0FBQ0EsVUFBVSxDQUFDaEMsUUFBUSxFQUNuQ0csSUFBSSxDQUFDNkIsVUFDUCxDQUFDLENBQ0Y7QUFDSDtBQUVBLFNBQVN6QixnQkFBZ0JBLENBQUNuRCxXQUFXLEVBQUVzQixLQUFLLEVBQUU7RUFDNUMsTUFBTXlCLElBQUksR0FBR3pCLEtBQUssQ0FBQzVCLEtBQUssQ0FBQ00sV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNBLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN4RCxRQUFRK0MsSUFBSTtJQUNWLEtBQUtoRSx5REFBUyxDQUFDRyxLQUFLO01BQ2xCLE9BQU8sT0FBTztJQUNoQixLQUFLSCx5REFBUyxDQUFDSSxJQUFJO01BQ2pCLE9BQU8sTUFBTTtJQUNmLEtBQUtKLHlEQUFTLENBQUNLLElBQUk7TUFDakIsT0FBTyxNQUFNO0lBQ2YsS0FBS0wseURBQVMsQ0FBQ00sR0FBRztNQUNoQixPQUFPLEtBQUs7SUFDZCxLQUFLTix5REFBUyxDQUFDTyxJQUFJO01BQ2pCLE9BQU8sTUFBTTtFQUNqQjtBQUNGO0FBRUEsU0FBUzhELGlCQUFpQkEsQ0FBQ2dCLGNBQWMsRUFBRTtFQUN6QyxNQUFNUyxXQUFXLEdBQUdULGNBQWMsQ0FBQ1UsZ0JBQWdCLENBQUMsU0FBUyxDQUFDO0VBQzlELElBQUlELFdBQVcsQ0FBQ2hGLE1BQU0sS0FBSyxDQUFDLEVBQUU7RUFFOUIsS0FBSyxNQUFNa0QsSUFBSSxJQUFJOEIsV0FBVyxFQUFFO0lBQzlCOUIsSUFBSSxDQUFDTixTQUFTLENBQUNzQyxNQUFNLENBQUMsUUFBUSxDQUFDO0VBQ2pDO0FBQ0Y7QUFFQSxTQUFTbkIsZ0JBQWdCQSxDQUFDNUQsV0FBVyxFQUFFc0IsS0FBSyxFQUFFOEMsY0FBYyxFQUFFO0VBQzVELE1BQU1yQixJQUFJLEdBQUdxQixjQUFjLENBQUN4QixRQUFRLENBQUM1QyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzRDLFFBQVEsQ0FBQzVDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUU3RSxJQUFJLENBQUMrQyxJQUFJLENBQUNOLFNBQVMsQ0FBQ1EsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO0VBRXRDLE1BQU0xQyxTQUFTLEdBQUdlLEtBQUssQ0FBQ1osWUFBWSxDQUFDVixXQUFXLENBQUM7RUFDakQsSUFBSVEsSUFBSSxHQUFHYyxLQUFLLENBQUN4QixLQUFLLENBQUNTLFNBQVMsQ0FBQztFQUVqQyxRQUFRQyxJQUFJLENBQUNQLFdBQVc7SUFDdEIsS0FBS25CLDBEQUFlLENBQUNvQixVQUFVO01BQzdCLEtBQ0UsSUFBSUUsQ0FBQyxHQUFHSSxJQUFJLENBQUNSLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFDM0JJLENBQUMsSUFBSUksSUFBSSxDQUFDUixXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUdRLElBQUksQ0FBQ1gsTUFBTSxHQUFHLENBQUMsRUFDMUNPLENBQUMsRUFBRSxFQUNIO1FBQ0FnRSxjQUFjLENBQUN4QixRQUFRLENBQUNwQyxJQUFJLENBQUNSLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDNEMsUUFBUSxDQUNuRHhDLENBQUMsQ0FDRixDQUFDcUMsU0FBUyxDQUFDdUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztNQUM5QjtNQUNBO0lBQ0YsS0FBS2xHLDBEQUFlLENBQUNxQixRQUFRO01BQzNCLEtBQ0UsSUFBSUMsQ0FBQyxHQUFHSSxJQUFJLENBQUNSLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFDM0JJLENBQUMsSUFBSUksSUFBSSxDQUFDUixXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUdRLElBQUksQ0FBQ1gsTUFBTSxHQUFHLENBQUMsRUFDMUNPLENBQUMsRUFBRSxFQUNIO1FBQ0FnRSxjQUFjLENBQUN4QixRQUFRLENBQUN4QyxDQUFDLENBQUMsQ0FBQ3dDLFFBQVEsQ0FDakNwQyxJQUFJLENBQUNSLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FDcEIsQ0FBQ3lDLFNBQVMsQ0FBQ3VDLE1BQU0sQ0FBQyxRQUFRLENBQUM7TUFDOUI7TUFDQTtFQUNKO0FBQ0Y7Ozs7OztVQ3BRQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBLDhDQUE4Qzs7Ozs7V0NBOUM7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7OztBQ05rRDtBQUN0QjtBQUU1QkMsT0FBTyxDQUFDQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7QUFFcEMsTUFBTUMsSUFBSSxHQUFHbEIsUUFBUSxDQUFDbUIsY0FBYyxDQUFDLE1BQU0sQ0FBQztBQUU1Q0QsSUFBSSxDQUFDRSxTQUFTLEdBQUc7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBRUQsTUFBTUMsZUFBZSxHQUFHckIsUUFBUSxDQUFDVCxhQUFhLENBQUMsU0FBUyxDQUFDO0FBQ3pEOEIsZUFBZSxDQUFDQyxNQUFNLENBQUMsR0FBR3pELCtEQUFlLENBQUMsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9pbmRleC5jc3M/NGU0MiIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvcmUvZ2FtZUJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29yZS9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb3JlL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb20vYm9hcmRzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCB7IGNyZWF0ZVNoaXAsIFNoaXBPcmllbnRhdGlvbiB9IGZyb20gXCIuL3NoaXAuanNcIjtcblxuZXhwb3J0IGNvbnN0IENlbGxTdGF0ZSA9IE9iamVjdC5mcmVlemUoe1xuICBFTVBUWTogMCxcbiAgTUlTUzogMSxcbiAgU0hJUDogMixcbiAgSElUOiAzLFxuICBTVU5LOiA0LFxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVHYW1lQm9hcmQoc2l6ZSkge1xuICBpZiAoc2l6ZSA8PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBib2FyZCBzaXplXCIpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzaXplLFxuICAgIGNlbGxzOiBBcnJheS5mcm9tKHsgbGVuZ3RoOiBzaXplIH0sICgpID0+XG4gICAgICBBcnJheS5mcm9tKHsgbGVuZ3RoOiBzaXplIH0sICgpID0+IENlbGxTdGF0ZS5FTVBUWSksXG4gICAgKSxcbiAgICBzaGlwczogW10sXG5cbiAgICBwbGFjZVNoaXA6IGZ1bmN0aW9uIChjb29yZGluYXRlcywgbGVuZ3RoLCBvcmllbnRhdGlvbikge1xuICAgICAgaWYgKFxuICAgICAgICBjb29yZGluYXRlc1swXSA8IDAgfHxcbiAgICAgICAgY29vcmRpbmF0ZXNbMV0gPCAwIHx8XG4gICAgICAgIGNvb3JkaW5hdGVzWzBdID49IHNpemUgfHxcbiAgICAgICAgY29vcmRpbmF0ZXNbMV0gPj0gc2l6ZVxuICAgICAgKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBwbGFjZSBzaGlwIG91dHNpZGUgdGhlIGJvYXJkXCIpO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgKG9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCAmJlxuICAgICAgICAgIGNvb3JkaW5hdGVzWzBdICsgbGVuZ3RoIC0gMSA+PSBzaXplKSB8fFxuICAgICAgICAob3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCAmJlxuICAgICAgICAgIGNvb3JkaW5hdGVzWzFdICsgbGVuZ3RoIC0gMSA+PSBzaXplKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCkge1xuICAgICAgICBmb3IgKGxldCBpID0gY29vcmRpbmF0ZXNbMF07IGkgPD0gY29vcmRpbmF0ZXNbMF0gKyBsZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICBpZiAodGhpcy5jZWxsc1tjb29yZGluYXRlc1sxXV1baV0gIT09IENlbGxTdGF0ZS5FTVBUWSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChvcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSBjb29yZGluYXRlc1sxXTsgaSA8PSBjb29yZGluYXRlc1sxXSArIGxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgIGlmICh0aGlzLmNlbGxzW2ldW2Nvb3JkaW5hdGVzWzBdXSAhPT0gQ2VsbFN0YXRlLkVNUFRZKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2hpcHMucHVzaChjcmVhdGVTaGlwKGxlbmd0aCwgY29vcmRpbmF0ZXMsIG9yaWVudGF0aW9uKSk7XG5cbiAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IGNvb3JkaW5hdGVzWzBdOyBpIDw9IGNvb3JkaW5hdGVzWzBdICsgbGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5jZWxsc1tjb29yZGluYXRlc1sxXV1baV0gPSBDZWxsU3RhdGUuU0hJUDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChvcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSBjb29yZGluYXRlc1sxXTsgaSA8PSBjb29yZGluYXRlc1sxXSArIGxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgIHRoaXMuY2VsbHNbaV1bY29vcmRpbmF0ZXNbMF1dID0gQ2VsbFN0YXRlLlNISVA7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIG1vdmVTaGlwOiBmdW5jdGlvbiAoc2hpcEluZGV4LCBjb29yZGluYXRlcykge1xuICAgICAgY29uc3Qgc2hpcCA9IHRoaXMuc2hpcHNbc2hpcEluZGV4XTtcbiAgICAgIGlmICghc2hpcCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTaGlwIGRvZXMgbm90IGV4aXN0XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwpIHtcbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMF07XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmNlbGxzW3NoaXAuY29vcmRpbmF0ZXNbMV1dW2ldID0gQ2VsbFN0YXRlLkVNUFRZO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1sxXTtcbiAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgaSsrXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuY2VsbHNbaV1bc2hpcC5jb29yZGluYXRlc1swXV0gPSBDZWxsU3RhdGUuRU1QVFk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLnBsYWNlU2hpcChjb29yZGluYXRlcywgc2hpcC5sZW5ndGgsIHNoaXAub3JpZW50YXRpb24pKSB7XG4gICAgICAgIGlmIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCkge1xuICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMF07XG4gICAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMF0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBpKytcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuY2VsbHNbc2hpcC5jb29yZGluYXRlc1sxXV1baV0gPSBDZWxsU3RhdGUuU0hJUDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMKSB7XG4gICAgICAgICAgZm9yIChcbiAgICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1sxXTtcbiAgICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1sxXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGkrK1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5jZWxsc1tpXVtzaGlwLmNvb3JkaW5hdGVzWzBdXSA9IENlbGxTdGF0ZS5TSElQO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2hpcHNbc2hpcEluZGV4XSA9IHRoaXMuc2hpcHMucG9wKCk7XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICBnZXRTaGlwSW5kZXg6IGZ1bmN0aW9uIChjb29yZGluYXRlcykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLnNoaXBzW2ldLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCkge1xuICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICBsZXQgaiA9IHRoaXMuc2hpcHNbaV0uY29vcmRpbmF0ZXNbMF07XG4gICAgICAgICAgICBqIDw9IHRoaXMuc2hpcHNbaV0uY29vcmRpbmF0ZXNbMF0gKyB0aGlzLnNoaXBzW2ldLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBqKytcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgY29vcmRpbmF0ZXNbMF0gPT09IGogJiZcbiAgICAgICAgICAgICAgY29vcmRpbmF0ZXNbMV0gPT09IHRoaXMuc2hpcHNbaV0uY29vcmRpbmF0ZXNbMV1cbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zaGlwc1tpXS5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMKSB7XG4gICAgICAgICAgZm9yIChcbiAgICAgICAgICAgIGxldCBqID0gdGhpcy5zaGlwc1tpXS5jb29yZGluYXRlc1sxXTtcbiAgICAgICAgICAgIGogPD0gdGhpcy5zaGlwc1tpXS5jb29yZGluYXRlc1sxXSArIHRoaXMuc2hpcHNbaV0ubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGorK1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBjb29yZGluYXRlc1swXSA9PT0gdGhpcy5zaGlwc1tpXS5jb29yZGluYXRlc1swXSAmJlxuICAgICAgICAgICAgICBjb29yZGluYXRlc1sxXSA9PT0galxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBObyBzaGlwIGZvdW5kIGF0IGdpdmVuIGluZGV4OiBbJHtjb29yZGluYXRlc1swXX0sICR7Y29vcmRpbmF0ZXNbMV19XWAsXG4gICAgICApO1xuICAgIH0sXG5cbiAgICByZWNlaXZlQXR0YWNrOiBmdW5jdGlvbiAoY29vcmRpbmF0ZXMpIHtcbiAgICAgIGlmIChcbiAgICAgICAgY29vcmRpbmF0ZXNbMF0gPCAwIHx8XG4gICAgICAgIGNvb3JkaW5hdGVzWzFdIDwgMCB8fFxuICAgICAgICBjb29yZGluYXRlc1swXSA+PSBzaXplIHx8XG4gICAgICAgIGNvb3JkaW5hdGVzWzFdID49IHNpemVcbiAgICAgICkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgYXR0YWNrIG91dHNpZGUgdGhlIGJvYXJkXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuY2VsbHNbY29vcmRpbmF0ZXNbMV1dW2Nvb3JkaW5hdGVzWzBdXSAhPT0gQ2VsbFN0YXRlLkVNUFRZICYmXG4gICAgICAgIHRoaXMuY2VsbHNbY29vcmRpbmF0ZXNbMV1dW2Nvb3JkaW5hdGVzWzBdXSAhPT0gQ2VsbFN0YXRlLlNISVBcbiAgICAgICkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDZWxsIGhhcyBhbHJlYWR5IGJlZW4gYXR0YWNrZWRcIik7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmNlbGxzW2Nvb3JkaW5hdGVzWzFdXVtjb29yZGluYXRlc1swXV0gIT09IENlbGxTdGF0ZS5TSElQKSB7XG4gICAgICAgIHRoaXMuY2VsbHNbY29vcmRpbmF0ZXNbMV1dW2Nvb3JkaW5hdGVzWzBdXSA9IENlbGxTdGF0ZS5NSVNTO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGZvciAoY29uc3Qgc2hpcCBvZiB0aGlzLnNoaXBzKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwgJiZcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzWzFdID09PSBzaGlwLmNvb3JkaW5hdGVzWzFdICYmXG4gICAgICAgICAgICBjb29yZGluYXRlc1swXSA+PSBzaGlwLmNvb3JkaW5hdGVzWzBdICYmXG4gICAgICAgICAgICBjb29yZGluYXRlc1swXSA8PSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxKSB8fFxuICAgICAgICAgIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwgJiZcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzWzBdID09PSBzaGlwLmNvb3JkaW5hdGVzWzBdICYmXG4gICAgICAgICAgICBjb29yZGluYXRlc1sxXSA+PSBzaGlwLmNvb3JkaW5hdGVzWzFdICYmXG4gICAgICAgICAgICBjb29yZGluYXRlc1sxXSA8PSBzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxKVxuICAgICAgICApIHtcbiAgICAgICAgICBzaGlwLmhpdCgpO1xuXG4gICAgICAgICAgaWYgKHNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgICAgIGlmIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCkge1xuICAgICAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1swXTtcbiAgICAgICAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMF0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgaSsrXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2VsbHNbc2hpcC5jb29yZGluYXRlc1sxXV1baV0gPSBDZWxsU3RhdGUuU1VOSztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwpIHtcbiAgICAgICAgICAgICAgZm9yIChcbiAgICAgICAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMV07XG4gICAgICAgICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgIGkrK1xuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW2ldW3NoaXAuY29vcmRpbmF0ZXNbMF1dID0gQ2VsbFN0YXRlLlNVTks7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jZWxsc1tjb29yZGluYXRlc1sxXV1bY29vcmRpbmF0ZXNbMF1dID0gQ2VsbFN0YXRlLkhJVDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBpc0ZsZWV0RGVzdHJveWVkOiBmdW5jdGlvbiAoKSB7XG4gICAgICBmb3IgKGNvbnN0IHNoaXAgb2YgdGhpcy5zaGlwcykge1xuICAgICAgICBpZiAoIXNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgfTtcbn1cbiIsImltcG9ydCB7IGNyZWF0ZUdhbWVCb2FyZCB9IGZyb20gXCIuL2dhbWVCb2FyZC5qc1wiO1xuXG5leHBvcnQgY29uc3QgUGxheWVyVHlwZSA9IE9iamVjdC5mcmVlemUoe1xuICBIVU1BTjogXCJIVU1BTlwiLFxuICBDT01QVVRFUjogXCJDT01QVVRFUlwiLFxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQbGF5ZXIodHlwZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGUsXG4gICAgYWN0aXZlOiBmYWxzZSxcbiAgICBib2FyZDogY3JlYXRlR2FtZUJvYXJkKDEwKSxcblxuICAgIGFjdGl2YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGxheWVyIGlzIGFscmVhZHkgYWN0aXZlXCIpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgfSxcbiAgICBkZWFjdGl2YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIXRoaXMuYWN0aXZlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBsYXllciBpcyBhbHJlYWR5IGluYWN0aXZlXCIpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH0sXG4gIH07XG59XG4iLCJleHBvcnQgY29uc3QgU2hpcE9yaWVudGF0aW9uID0gT2JqZWN0LmZyZWV6ZSh7XG4gIEhPUklaT05UQUw6IFwiSE9SSVpPTlRBTFwiLFxuICBWRVJUSUNBTDogXCJWRVJUSUNBTFwiLFxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTaGlwKFxuICBsZW5ndGgsXG4gIGNvb3JkaW5hdGVzID0gW3VuZGVmaW5lZCwgdW5kZWZpbmVkXSxcbiAgb3JpZW50YXRpb24gPSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCxcbikge1xuICBpZiAobGVuZ3RoIDwgMSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgcmV0dXJuIHtcbiAgICBsZW5ndGgsXG4gICAgY29vcmRpbmF0ZXMsXG4gICAgb3JpZW50YXRpb24sXG4gICAgaGl0czogMCxcblxuICAgIGhpdDogZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRoaXMuaGl0cyA8IHRoaXMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuaGl0cysrO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBpc1N1bms6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmhpdHMgPT09IHRoaXMubGVuZ3RoO1xuICAgIH0sXG4gIH07XG59XG4iLCJpbXBvcnQgeyBDZWxsU3RhdGUgfSBmcm9tIFwiLi4vY29yZS9nYW1lQm9hcmQuanNcIjtcbmltcG9ydCB7IGNyZWF0ZVBsYXllciwgUGxheWVyVHlwZSB9IGZyb20gXCIuLi9jb3JlL3BsYXllci5qc1wiO1xuaW1wb3J0IHsgU2hpcE9yaWVudGF0aW9uIH0gZnJvbSBcIi4uL2NvcmUvc2hpcC5qc1wiO1xuXG5jb25zdCByZWZyZXNoQm9hcmRFdmVudCA9IG5ldyBFdmVudChcInJlZnJlc2gtYm9hcmRcIik7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cEdhbWVCb2FyZHMoKSB7XG4gIGNvbnN0IHBsYXllck9uZSA9IGNyZWF0ZVBsYXllcihQbGF5ZXJUeXBlLkhVTUFOKTtcbiAgY29uc3QgcGxheWVyVHdvID0gY3JlYXRlUGxheWVyKFBsYXllclR5cGUuQ09NUFVURVIpO1xuXG4gIGNvbnN0IHNoaXBzID0gWzUsIDQsIDMsIDMsIDJdO1xuXG4gIGZvciAoY29uc3Qgc2hpcCBvZiBzaGlwcykge1xuICAgIGxldCBwbGFjZWQgPSBmYWxzZTtcbiAgICB3aGlsZSAoIXBsYWNlZCkge1xuICAgICAgY29uc3Qgb3JpZW50YXRpb24gPVxuICAgICAgICBNYXRoLnJhbmRvbSgpID4gMC41XG4gICAgICAgICAgPyBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTFxuICAgICAgICAgIDogU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMO1xuXG4gICAgICBjb25zdCB4ID0gTWF0aC5mbG9vcihcbiAgICAgICAgTWF0aC5yYW5kb20oKSAqXG4gICAgICAgICAgKDEwIC0gKG9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCA/IHNoaXAgOiAwKSksXG4gICAgICApO1xuICAgICAgY29uc3QgeSA9IE1hdGguZmxvb3IoXG4gICAgICAgIE1hdGgucmFuZG9tKCkgKlxuICAgICAgICAgICgxMCAtIChvcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMID8gc2hpcCA6IDApKSxcbiAgICAgICk7XG5cbiAgICAgIHBsYWNlZCA9IHBsYXllck9uZS5ib2FyZC5wbGFjZVNoaXAoW3gsIHldLCBzaGlwLCBvcmllbnRhdGlvbik7XG4gICAgfVxuICB9XG5cbiAgZm9yIChjb25zdCBzaGlwIG9mIHNoaXBzKSB7XG4gICAgbGV0IHBsYWNlZCA9IGZhbHNlO1xuICAgIHdoaWxlICghcGxhY2VkKSB7XG4gICAgICBjb25zdCBvcmllbnRhdGlvbiA9XG4gICAgICAgIE1hdGgucmFuZG9tKCkgPiAwLjVcbiAgICAgICAgICA/IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMXG4gICAgICAgICAgOiBTaGlwT3JpZW50YXRpb24uVkVSVElDQUw7XG5cbiAgICAgIGNvbnN0IHggPSBNYXRoLmZsb29yKFxuICAgICAgICBNYXRoLnJhbmRvbSgpICpcbiAgICAgICAgICAoMTAgLSAob3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMID8gc2hpcCA6IDApKSxcbiAgICAgICk7XG4gICAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihcbiAgICAgICAgTWF0aC5yYW5kb20oKSAqXG4gICAgICAgICAgKDEwIC0gKG9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwgPyBzaGlwIDogMCkpLFxuICAgICAgKTtcblxuICAgICAgcGxhY2VkID0gcGxheWVyVHdvLmJvYXJkLnBsYWNlU2hpcChbeCwgeV0sIHNoaXAsIG9yaWVudGF0aW9uKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBwbGF5ZXJPbmVCb2FyZENvbXBvbmVudCA9IGdlbmVyYXRlQm9hcmQocGxheWVyT25lLmJvYXJkLCB0cnVlKTtcbiAgcGxheWVyT25lQm9hcmRDb21wb25lbnQuY2xhc3NMaXN0LmFkZChcInBsYXllci1vbmVcIiwgXCJodW1hblwiKTtcblxuICBwbGF5ZXJPbmVCb2FyZENvbXBvbmVudC5hZGRFdmVudExpc3RlbmVyKFwicmVmcmVzaC1ib2FyZFwiLCAoKSA9PiB7XG4gICAgQXJyYXkuZnJvbShwbGF5ZXJPbmVCb2FyZENvbXBvbmVudC5jaGlsZHJlbikuZm9yRWFjaCgocm93LCBpKSA9PiB7XG4gICAgICBBcnJheS5mcm9tKHJvdy5jaGlsZHJlbikuZm9yRWFjaCgoY2VsbCwgaikgPT4ge1xuICAgICAgICBjb25zdCBpc01vdmluZyA9IGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKFwibW92aW5nXCIpO1xuXG4gICAgICAgIGNlbGwuY2xhc3NOYW1lID0gXCJjZWxsXCI7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChnZXRDZWxsQ2xhc3NOYW1lKFtqLCBpXSwgcGxheWVyT25lLmJvYXJkKSk7XG4gICAgICAgIGlmIChpc01vdmluZykgY2VsbC5jbGFzc0xpc3QuYWRkKFwibW92aW5nXCIpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuICBwbGF5ZXJPbmVCb2FyZENvbXBvbmVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgIFwiY2xpY2tcIixcbiAgICAoKSA9PiBjbGVhclNoaXBNb3ZlbWVudChwbGF5ZXJPbmVCb2FyZENvbXBvbmVudCksXG4gICAgdHJ1ZSxcbiAgKTtcblxuICBmdW5jdGlvbiBzaGlwTW92ZW1lbnRIYW5kbGVyKGV2ZW50KSB7XG4gICAgY29uc3QgbW92aW5nU2hpcENlbGwgPSBwbGF5ZXJPbmVCb2FyZENvbXBvbmVudC5xdWVyeVNlbGVjdG9yKFwiLm1vdmluZ1wiKTtcblxuICAgIGlmICghbW92aW5nU2hpcENlbGwpIHJldHVybjtcblxuICAgIGNvbnN0IG1vdmluZ1NoaXBDb29yZGluYXRlcyA9IGdldENlbGxJbmRleChtb3ZpbmdTaGlwQ2VsbCk7XG4gICAgY29uc3QgbW92aW5nU2hpcEluZGV4ID0gcGxheWVyT25lLmJvYXJkLmdldFNoaXBJbmRleChtb3ZpbmdTaGlwQ29vcmRpbmF0ZXMpO1xuXG4gICAgdG9nZ2xlU2hpcE1vdGlvbihcbiAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlcyxcbiAgICAgIHBsYXllck9uZS5ib2FyZCxcbiAgICAgIHBsYXllck9uZUJvYXJkQ29tcG9uZW50LFxuICAgICk7XG5cbiAgICBsZXQgbW92ZVN1Y2Nlc3NmdWwgPSBmYWxzZTtcbiAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgY2FzZSBcIkFycm93VXBcIjpcbiAgICAgICAgaWYgKG1vdmluZ1NoaXBDb29yZGluYXRlc1sxXSA8PSAwKSBicmVhaztcbiAgICAgICAgbW92ZVN1Y2Nlc3NmdWwgPSBwbGF5ZXJPbmUuYm9hcmQubW92ZVNoaXAobW92aW5nU2hpcEluZGV4LCBbXG4gICAgICAgICAgbW92aW5nU2hpcENvb3JkaW5hdGVzWzBdLFxuICAgICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlc1sxXSAtIDEsXG4gICAgICAgIF0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJBcnJvd0xlZnRcIjpcbiAgICAgICAgaWYgKG1vdmluZ1NoaXBDb29yZGluYXRlc1swXSA8PSAwKSBicmVhaztcbiAgICAgICAgbW92ZVN1Y2Nlc3NmdWwgPSBwbGF5ZXJPbmUuYm9hcmQubW92ZVNoaXAobW92aW5nU2hpcEluZGV4LCBbXG4gICAgICAgICAgbW92aW5nU2hpcENvb3JkaW5hdGVzWzBdIC0gMSxcbiAgICAgICAgICBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMV0sXG4gICAgICAgIF0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJBcnJvd0Rvd25cIjpcbiAgICAgICAgaWYgKG1vdmluZ1NoaXBDb29yZGluYXRlc1sxXSA+PSBwbGF5ZXJPbmUuYm9hcmQuc2l6ZSAtIDEpIGJyZWFrO1xuICAgICAgICBtb3ZlU3VjY2Vzc2Z1bCA9IHBsYXllck9uZS5ib2FyZC5tb3ZlU2hpcChtb3ZpbmdTaGlwSW5kZXgsIFtcbiAgICAgICAgICBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMF0sXG4gICAgICAgICAgbW92aW5nU2hpcENvb3JkaW5hdGVzWzFdICsgMSxcbiAgICAgICAgXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIkFycm93UmlnaHRcIjpcbiAgICAgICAgaWYgKG1vdmluZ1NoaXBDb29yZGluYXRlc1swXSA+PSBwbGF5ZXJPbmUuYm9hcmQuc2l6ZSAtIDEpIGJyZWFrO1xuICAgICAgICBtb3ZlU3VjY2Vzc2Z1bCA9IHBsYXllck9uZS5ib2FyZC5tb3ZlU2hpcChtb3ZpbmdTaGlwSW5kZXgsIFtcbiAgICAgICAgICBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMF0gKyAxLFxuICAgICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlc1sxXSxcbiAgICAgICAgXSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmICghbW92ZVN1Y2Nlc3NmdWwpIHtcbiAgICAgIHRvZ2dsZVNoaXBNb3Rpb24oXG4gICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlcyxcbiAgICAgICAgcGxheWVyT25lLmJvYXJkLFxuICAgICAgICBwbGF5ZXJPbmVCb2FyZENvbXBvbmVudCxcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcGxheWVyT25lQm9hcmRDb21wb25lbnQuZGlzcGF0Y2hFdmVudChyZWZyZXNoQm9hcmRFdmVudCk7XG5cbiAgICBjb25zdCBtb3ZlZFNoaXAgPSBwbGF5ZXJPbmUuYm9hcmQuc2hpcHNbbW92aW5nU2hpcEluZGV4XTtcbiAgICB0b2dnbGVTaGlwTW90aW9uKFxuICAgICAgbW92ZWRTaGlwLmNvb3JkaW5hdGVzLFxuICAgICAgcGxheWVyT25lLmJvYXJkLFxuICAgICAgcGxheWVyT25lQm9hcmRDb21wb25lbnQsXG4gICAgKTtcbiAgfVxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBzaGlwTW92ZW1lbnRIYW5kbGVyKTtcblxuICBjb25zdCBwbGF5ZXJUd29Cb2FyZENvbXBvbmVudCA9IGdlbmVyYXRlQm9hcmQocGxheWVyVHdvLmJvYXJkLCBmYWxzZSk7XG4gIHBsYXllclR3b0JvYXJkQ29tcG9uZW50LmNsYXNzTGlzdC5hZGQoXCJwbGF5ZXItdHdvXCIsIFwiY29tcHV0ZXJcIik7XG5cbiAgcGxheWVyVHdvQm9hcmRDb21wb25lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInJlZnJlc2gtYm9hcmRcIiwgKCkgPT4ge1xuICAgIEFycmF5LmZyb20ocGxheWVyVHdvQm9hcmRDb21wb25lbnQuY2hpbGRyZW4pLmZvckVhY2goKHJvdywgaSkgPT4ge1xuICAgICAgQXJyYXkuZnJvbShyb3cuY2hpbGRyZW4pLmZvckVhY2goKGNlbGwsIGopID0+IHtcbiAgICAgICAgY2VsbC5jbGFzc05hbWUgPSBcImNlbGxcIjtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKGdldENlbGxDbGFzc05hbWUoW2osIGldLCBwbGF5ZXJUd28uYm9hcmQpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gW3BsYXllck9uZUJvYXJkQ29tcG9uZW50LCBwbGF5ZXJUd29Cb2FyZENvbXBvbmVudF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUJvYXJkKGJvYXJkLCBtdXRhYmxlKSB7XG4gIGNvbnN0IGJvYXJkQ29tcG9uZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgYm9hcmRDb21wb25lbnQuY2xhc3NMaXN0LmFkZChcImJvYXJkXCIpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmQuY2VsbHMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCByb3dDb21wb25lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHJvd0NvbXBvbmVudC5jbGFzc0xpc3QuYWRkKFwicm93XCIpO1xuXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBib2FyZC5jZWxsc1tpXS5sZW5ndGg7IGorKykge1xuICAgICAgY29uc3QgY2VsbENvbXBvbmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBjZWxsQ29tcG9uZW50LmNsYXNzTGlzdC5hZGQoXCJjZWxsXCIpO1xuICAgICAgY2VsbENvbXBvbmVudC5jbGFzc0xpc3QuYWRkKGdldENlbGxDbGFzc05hbWUoW2osIGldLCBib2FyZCkpO1xuXG4gICAgICBpZiAoIW11dGFibGUpIHtcbiAgICAgICAgY2VsbENvbXBvbmVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNlbGwgPSBib2FyZC5jZWxsc1tpXVtqXTtcbiAgICAgICAgICBpZiAoY2VsbCAhPT0gQ2VsbFN0YXRlLkVNUFRZICYmIGNlbGwgIT09IENlbGxTdGF0ZS5TSElQKSByZXR1cm47XG5cbiAgICAgICAgICBib2FyZC5yZWNlaXZlQXR0YWNrKFtqLCBpXSk7XG4gICAgICAgICAgYm9hcmRDb21wb25lbnQuZGlzcGF0Y2hFdmVudChyZWZyZXNoQm9hcmRFdmVudCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAobXV0YWJsZSkge1xuICAgICAgICBjZWxsQ29tcG9uZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgaWYgKGNlbGxDb21wb25lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hpcFwiKSkge1xuICAgICAgICAgICAgdG9nZ2xlU2hpcE1vdGlvbihbaiwgaV0sIGJvYXJkLCBib2FyZENvbXBvbmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJvd0NvbXBvbmVudC5hcHBlbmRDaGlsZChjZWxsQ29tcG9uZW50KTtcbiAgICB9XG4gICAgYm9hcmRDb21wb25lbnQuYXBwZW5kQ2hpbGQocm93Q29tcG9uZW50KTtcbiAgfVxuXG4gIHJldHVybiBib2FyZENvbXBvbmVudDtcbn1cblxuZnVuY3Rpb24gZ2V0Q2VsbEluZGV4KGNlbGwpIHtcbiAgcmV0dXJuIFtcbiAgICBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGNlbGwucGFyZW50Tm9kZS5jaGlsZHJlbiwgY2VsbCksXG4gICAgQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChcbiAgICAgIGNlbGwucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNoaWxkcmVuLFxuICAgICAgY2VsbC5wYXJlbnROb2RlLFxuICAgICksXG4gIF07XG59XG5cbmZ1bmN0aW9uIGdldENlbGxDbGFzc05hbWUoY29vcmRpbmF0ZXMsIGJvYXJkKSB7XG4gIGNvbnN0IGNlbGwgPSBib2FyZC5jZWxsc1tjb29yZGluYXRlc1sxXV1bY29vcmRpbmF0ZXNbMF1dO1xuICBzd2l0Y2ggKGNlbGwpIHtcbiAgICBjYXNlIENlbGxTdGF0ZS5FTVBUWTpcbiAgICAgIHJldHVybiBcImVtcHR5XCI7XG4gICAgY2FzZSBDZWxsU3RhdGUuTUlTUzpcbiAgICAgIHJldHVybiBcIm1pc3NcIjtcbiAgICBjYXNlIENlbGxTdGF0ZS5TSElQOlxuICAgICAgcmV0dXJuIFwic2hpcFwiO1xuICAgIGNhc2UgQ2VsbFN0YXRlLkhJVDpcbiAgICAgIHJldHVybiBcImhpdFwiO1xuICAgIGNhc2UgQ2VsbFN0YXRlLlNVTks6XG4gICAgICByZXR1cm4gXCJzdW5rXCI7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2xlYXJTaGlwTW92ZW1lbnQoYm9hcmRDb21wb25lbnQpIHtcbiAgY29uc3QgbW92aW5nQ2VsbHMgPSBib2FyZENvbXBvbmVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1vdmluZ1wiKTtcbiAgaWYgKG1vdmluZ0NlbGxzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gIGZvciAoY29uc3QgY2VsbCBvZiBtb3ZpbmdDZWxscykge1xuICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZShcIm1vdmluZ1wiKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB0b2dnbGVTaGlwTW90aW9uKGNvb3JkaW5hdGVzLCBib2FyZCwgYm9hcmRDb21wb25lbnQpIHtcbiAgY29uc3QgY2VsbCA9IGJvYXJkQ29tcG9uZW50LmNoaWxkcmVuW2Nvb3JkaW5hdGVzWzFdXS5jaGlsZHJlbltjb29yZGluYXRlc1swXV07XG5cbiAgaWYgKCFjZWxsLmNsYXNzTGlzdC5jb250YWlucyhcInNoaXBcIikpIHJldHVybjtcblxuICBjb25zdCBzaGlwSW5kZXggPSBib2FyZC5nZXRTaGlwSW5kZXgoY29vcmRpbmF0ZXMpO1xuICBsZXQgc2hpcCA9IGJvYXJkLnNoaXBzW3NoaXBJbmRleF07XG5cbiAgc3dpdGNoIChzaGlwLm9yaWVudGF0aW9uKSB7XG4gICAgY2FzZSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTDpcbiAgICAgIGZvciAoXG4gICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1swXTtcbiAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICBpKytcbiAgICAgICkge1xuICAgICAgICBib2FyZENvbXBvbmVudC5jaGlsZHJlbltzaGlwLmNvb3JkaW5hdGVzWzFdXS5jaGlsZHJlbltcbiAgICAgICAgICBpXG4gICAgICAgIF0uY2xhc3NMaXN0LnRvZ2dsZShcIm1vdmluZ1wiKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMOlxuICAgICAgZm9yIChcbiAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzFdO1xuICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgIGkrK1xuICAgICAgKSB7XG4gICAgICAgIGJvYXJkQ29tcG9uZW50LmNoaWxkcmVuW2ldLmNoaWxkcmVuW1xuICAgICAgICAgIHNoaXAuY29vcmRpbmF0ZXNbMF1cbiAgICAgICAgXS5jbGFzc0xpc3QudG9nZ2xlKFwibW92aW5nXCIpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IHNldHVwR2FtZUJvYXJkcyB9IGZyb20gXCIuL2RvbS9ib2FyZHMuanNcIjtcbmltcG9ydCBcIi4vc3R5bGVzL2luZGV4LmNzc1wiO1xuXG5jb25zb2xlLmxvZyhcIkdldCBSZWFkeSBmb3IgQmF0dGxlIVwiKTtcblxuY29uc3Qgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKTtcblxucm9vdC5pbm5lckhUTUwgPSBgXG48aGVhZGVyPkJhdHRsZXNoaXA8L2hlYWRlcj5cbjxkaXYgY2xhc3M9XCJib2FyZHNcIj48L2Rpdj5cbjxkaXYgY2xhc3M9XCJjb250cm9sc1wiPlxuICA8ZGl2IGNsYXNzPVwic2hpcHNcIj48L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImdhbWUtY29udHJvbHNcIj5cbiAgICA8YnV0dG9uIGNsYXNzPVwic3RhcnRcIj5TdGFydCBHYW1lPC9idXR0b24+XG4gICAgPGJ1dHRvbiBjbGFzcz1cInJlc2V0XCI+UmVzZXQgR2FtZTwvYnV0dG9uPlxuICAgIDxidXR0b24gY2xhc3M9XCJyYW5kb21pemVcIiBkaXNhYmxlZD5SYW5kb21pemUgRm9ybWF0aW9uPC9idXR0b24+XG4gIDwvZGl2PlxuPC9kaXY+XG5gO1xuXG5jb25zdCBib2FyZHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJvYXJkc1wiKTtcbmJvYXJkc0NvbnRhaW5lci5hcHBlbmQoLi4uc2V0dXBHYW1lQm9hcmRzKCkpO1xuIl0sIm5hbWVzIjpbImNyZWF0ZVNoaXAiLCJTaGlwT3JpZW50YXRpb24iLCJDZWxsU3RhdGUiLCJPYmplY3QiLCJmcmVlemUiLCJFTVBUWSIsIk1JU1MiLCJTSElQIiwiSElUIiwiU1VOSyIsImNyZWF0ZUdhbWVCb2FyZCIsInNpemUiLCJFcnJvciIsImNlbGxzIiwiQXJyYXkiLCJmcm9tIiwibGVuZ3RoIiwic2hpcHMiLCJwbGFjZVNoaXAiLCJjb29yZGluYXRlcyIsIm9yaWVudGF0aW9uIiwiSE9SSVpPTlRBTCIsIlZFUlRJQ0FMIiwiaSIsInB1c2giLCJtb3ZlU2hpcCIsInNoaXBJbmRleCIsInNoaXAiLCJwb3AiLCJnZXRTaGlwSW5kZXgiLCJqIiwicmVjZWl2ZUF0dGFjayIsImhpdCIsImlzU3VuayIsImlzRmxlZXREZXN0cm95ZWQiLCJQbGF5ZXJUeXBlIiwiSFVNQU4iLCJDT01QVVRFUiIsImNyZWF0ZVBsYXllciIsInR5cGUiLCJhY3RpdmUiLCJib2FyZCIsImFjdGl2YXRlIiwiZGVhY3RpdmF0ZSIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCIsImhpdHMiLCJyZWZyZXNoQm9hcmRFdmVudCIsIkV2ZW50Iiwic2V0dXBHYW1lQm9hcmRzIiwicGxheWVyT25lIiwicGxheWVyVHdvIiwicGxhY2VkIiwiTWF0aCIsInJhbmRvbSIsIngiLCJmbG9vciIsInkiLCJwbGF5ZXJPbmVCb2FyZENvbXBvbmVudCIsImdlbmVyYXRlQm9hcmQiLCJjbGFzc0xpc3QiLCJhZGQiLCJhZGRFdmVudExpc3RlbmVyIiwiY2hpbGRyZW4iLCJmb3JFYWNoIiwicm93IiwiY2VsbCIsImlzTW92aW5nIiwiY29udGFpbnMiLCJjbGFzc05hbWUiLCJnZXRDZWxsQ2xhc3NOYW1lIiwiY2xlYXJTaGlwTW92ZW1lbnQiLCJzaGlwTW92ZW1lbnRIYW5kbGVyIiwiZXZlbnQiLCJtb3ZpbmdTaGlwQ2VsbCIsInF1ZXJ5U2VsZWN0b3IiLCJtb3ZpbmdTaGlwQ29vcmRpbmF0ZXMiLCJnZXRDZWxsSW5kZXgiLCJtb3ZpbmdTaGlwSW5kZXgiLCJ0b2dnbGVTaGlwTW90aW9uIiwibW92ZVN1Y2Nlc3NmdWwiLCJrZXkiLCJkaXNwYXRjaEV2ZW50IiwibW92ZWRTaGlwIiwiZG9jdW1lbnQiLCJwbGF5ZXJUd29Cb2FyZENvbXBvbmVudCIsIm11dGFibGUiLCJib2FyZENvbXBvbmVudCIsImNyZWF0ZUVsZW1lbnQiLCJyb3dDb21wb25lbnQiLCJjZWxsQ29tcG9uZW50IiwiYXBwZW5kQ2hpbGQiLCJwcm90b3R5cGUiLCJpbmRleE9mIiwiY2FsbCIsInBhcmVudE5vZGUiLCJtb3ZpbmdDZWxscyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJyZW1vdmUiLCJ0b2dnbGUiLCJjb25zb2xlIiwibG9nIiwicm9vdCIsImdldEVsZW1lbnRCeUlkIiwiaW5uZXJIVE1MIiwiYm9hcmRzQ29udGFpbmVyIiwiYXBwZW5kIl0sInNvdXJjZVJvb3QiOiIifQ==