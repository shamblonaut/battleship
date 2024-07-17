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
      this.ships.splice(shipIndex, 1);
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
  function shipMovementHandler(event) {
    const movingShipCell = playerOneBoardComponent.querySelector(".moving");
    if (!movingShipCell) return;
    const movingShipCoordinates = [Array.prototype.indexOf.call(movingShipCell.parentNode.children, movingShipCell), Array.prototype.indexOf.call(movingShipCell.parentNode.parentNode.children, movingShipCell.parentNode)];
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
    const movedShip = playerOne.board.ships[playerOne.board.ships.length - 1];
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
        cellComponent.addEventListener("click", () => toggleShipMotion([j, i], board, boardComponent, true));
      }
      rowComponent.appendChild(cellComponent);
    }
    boardComponent.appendChild(rowComponent);
  }
  return boardComponent;
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
function toggleShipMotion(coordinates, board, boardComponent) {
  let shouldClearBoard = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  const cell = boardComponent.children[coordinates[1]].children[coordinates[0]];
  if (!cell.classList.contains("ship")) return;
  const shipIndex = board.getShipIndex(coordinates);
  let ship = board.ships[shipIndex];
  if (shouldClearBoard) {
    const movingCells = boardComponent.querySelectorAll(".moving");
    for (const cell of movingCells) {
      cell.classList.remove("moving");
    }
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFPLENBQUNDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQztBQUVwQyxNQUFNQyxJQUFJLEdBQUdmLFFBQVEsQ0FBQ2dCLGNBQWMsQ0FBQyxNQUFNLENBQUM7QUFFNUNELElBQUksQ0FBQ0UsU0FBUyxHQUFHO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUVELE1BQU1DLGVBQWUsR0FBR2xCLFFBQVEsQ0FBQ1osYUFBYSxDQUFDLFNBQVMsQ0FBQztBQUN6RDhCLGVBQWUsQ0FBQ0MsTUFBTSxDQUFDLEdBQUd4RCwrREFBZSxDQUFDLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvaW5kZXguY3NzPzRlNDIiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb3JlL2dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvcmUvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29yZS9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tL2JvYXJkcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgeyBjcmVhdGVTaGlwLCBTaGlwT3JpZW50YXRpb24gfSBmcm9tIFwiLi9zaGlwLmpzXCI7XG5cbmV4cG9ydCBjb25zdCBDZWxsU3RhdGUgPSBPYmplY3QuZnJlZXplKHtcbiAgRU1QVFk6IDAsXG4gIE1JU1M6IDEsXG4gIFNISVA6IDIsXG4gIEhJVDogMyxcbiAgU1VOSzogNCxcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlR2FtZUJvYXJkKHNpemUpIHtcbiAgaWYgKHNpemUgPD0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgYm9hcmQgc2l6ZVwiKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgc2l6ZSxcbiAgICBjZWxsczogQXJyYXkuZnJvbSh7IGxlbmd0aDogc2l6ZSB9LCAoKSA9PlxuICAgICAgQXJyYXkuZnJvbSh7IGxlbmd0aDogc2l6ZSB9LCAoKSA9PiBDZWxsU3RhdGUuRU1QVFkpLFxuICAgICksXG4gICAgc2hpcHM6IFtdLFxuXG4gICAgcGxhY2VTaGlwOiBmdW5jdGlvbiAoY29vcmRpbmF0ZXMsIGxlbmd0aCwgb3JpZW50YXRpb24pIHtcbiAgICAgIGlmIChcbiAgICAgICAgY29vcmRpbmF0ZXNbMF0gPCAwIHx8XG4gICAgICAgIGNvb3JkaW5hdGVzWzFdIDwgMCB8fFxuICAgICAgICBjb29yZGluYXRlc1swXSA+PSBzaXplIHx8XG4gICAgICAgIGNvb3JkaW5hdGVzWzFdID49IHNpemVcbiAgICAgICkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgcGxhY2Ugc2hpcCBvdXRzaWRlIHRoZSBib2FyZFwiKTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIChvcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwgJiZcbiAgICAgICAgICBjb29yZGluYXRlc1swXSArIGxlbmd0aCAtIDEgPj0gc2l6ZSkgfHxcbiAgICAgICAgKG9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwgJiZcbiAgICAgICAgICBjb29yZGluYXRlc1sxXSArIGxlbmd0aCAtIDEgPj0gc2l6ZSlcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IGNvb3JkaW5hdGVzWzBdOyBpIDw9IGNvb3JkaW5hdGVzWzBdICsgbGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgaWYgKHRoaXMuY2VsbHNbY29vcmRpbmF0ZXNbMV1dW2ldICE9PSBDZWxsU3RhdGUuRU1QVFkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAob3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICBmb3IgKGxldCBpID0gY29vcmRpbmF0ZXNbMV07IGkgPD0gY29vcmRpbmF0ZXNbMV0gKyBsZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICBpZiAodGhpcy5jZWxsc1tpXVtjb29yZGluYXRlc1swXV0gIT09IENlbGxTdGF0ZS5FTVBUWSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLnNoaXBzLnB1c2goY3JlYXRlU2hpcChsZW5ndGgsIGNvb3JkaW5hdGVzLCBvcmllbnRhdGlvbikpO1xuXG4gICAgICBpZiAob3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSBjb29yZGluYXRlc1swXTsgaSA8PSBjb29yZGluYXRlc1swXSArIGxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgIHRoaXMuY2VsbHNbY29vcmRpbmF0ZXNbMV1dW2ldID0gQ2VsbFN0YXRlLlNISVA7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAob3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICBmb3IgKGxldCBpID0gY29vcmRpbmF0ZXNbMV07IGkgPD0gY29vcmRpbmF0ZXNbMV0gKyBsZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICB0aGlzLmNlbGxzW2ldW2Nvb3JkaW5hdGVzWzBdXSA9IENlbGxTdGF0ZS5TSElQO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICBtb3ZlU2hpcDogZnVuY3Rpb24gKHNoaXBJbmRleCwgY29vcmRpbmF0ZXMpIHtcbiAgICAgIGNvbnN0IHNoaXAgPSB0aGlzLnNoaXBzW3NoaXBJbmRleF07XG4gICAgICBpZiAoIXNoaXApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2hpcCBkb2VzIG5vdCBleGlzdFwiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMKSB7XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5jZWxsc1tzaGlwLmNvb3JkaW5hdGVzWzFdXVtpXSA9IENlbGxTdGF0ZS5FTVBUWTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwpIHtcbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMV07XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmNlbGxzW2ldW3NoaXAuY29vcmRpbmF0ZXNbMF1dID0gQ2VsbFN0YXRlLkVNUFRZO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5wbGFjZVNoaXAoY29vcmRpbmF0ZXMsIHNoaXAubGVuZ3RoLCBzaGlwLm9yaWVudGF0aW9uKSkge1xuICAgICAgICBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwpIHtcbiAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgICAgaSsrXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmNlbGxzW3NoaXAuY29vcmRpbmF0ZXNbMV1dW2ldID0gQ2VsbFN0YXRlLlNISVA7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMV07XG4gICAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBpKytcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuY2VsbHNbaV1bc2hpcC5jb29yZGluYXRlc1swXV0gPSBDZWxsU3RhdGUuU0hJUDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNoaXBzLnNwbGljZShzaGlwSW5kZXgsIDEpO1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuXG4gICAgZ2V0U2hpcEluZGV4OiBmdW5jdGlvbiAoY29vcmRpbmF0ZXMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5zaGlwc1tpXS5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwpIHtcbiAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgbGV0IGogPSB0aGlzLnNoaXBzW2ldLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgICAgICAgaiA8PSB0aGlzLnNoaXBzW2ldLmNvb3JkaW5hdGVzWzBdICsgdGhpcy5zaGlwc1tpXS5sZW5ndGggLSAxO1xuICAgICAgICAgICAgaisrXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGNvb3JkaW5hdGVzWzBdID09PSBqICYmXG4gICAgICAgICAgICAgIGNvb3JkaW5hdGVzWzFdID09PSB0aGlzLnNoaXBzW2ldLmNvb3JkaW5hdGVzWzFdXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2hpcHNbaV0ub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICBsZXQgaiA9IHRoaXMuc2hpcHNbaV0uY29vcmRpbmF0ZXNbMV07XG4gICAgICAgICAgICBqIDw9IHRoaXMuc2hpcHNbaV0uY29vcmRpbmF0ZXNbMV0gKyB0aGlzLnNoaXBzW2ldLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBqKytcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgY29vcmRpbmF0ZXNbMF0gPT09IHRoaXMuc2hpcHNbaV0uY29vcmRpbmF0ZXNbMF0gJiZcbiAgICAgICAgICAgICAgY29vcmRpbmF0ZXNbMV0gPT09IGpcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgTm8gc2hpcCBmb3VuZCBhdCBnaXZlbiBpbmRleDogWyR7Y29vcmRpbmF0ZXNbMF19LCAke2Nvb3JkaW5hdGVzWzFdfV1gLFxuICAgICAgKTtcbiAgICB9LFxuXG4gICAgcmVjZWl2ZUF0dGFjazogZnVuY3Rpb24gKGNvb3JkaW5hdGVzKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGNvb3JkaW5hdGVzWzBdIDwgMCB8fFxuICAgICAgICBjb29yZGluYXRlc1sxXSA8IDAgfHxcbiAgICAgICAgY29vcmRpbmF0ZXNbMF0gPj0gc2l6ZSB8fFxuICAgICAgICBjb29yZGluYXRlc1sxXSA+PSBzaXplXG4gICAgICApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGF0dGFjayBvdXRzaWRlIHRoZSBib2FyZFwiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICB0aGlzLmNlbGxzW2Nvb3JkaW5hdGVzWzFdXVtjb29yZGluYXRlc1swXV0gIT09IENlbGxTdGF0ZS5FTVBUWSAmJlxuICAgICAgICB0aGlzLmNlbGxzW2Nvb3JkaW5hdGVzWzFdXVtjb29yZGluYXRlc1swXV0gIT09IENlbGxTdGF0ZS5TSElQXG4gICAgICApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2VsbCBoYXMgYWxyZWFkeSBiZWVuIGF0dGFja2VkXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5jZWxsc1tjb29yZGluYXRlc1sxXV1bY29vcmRpbmF0ZXNbMF1dICE9PSBDZWxsU3RhdGUuU0hJUCkge1xuICAgICAgICB0aGlzLmNlbGxzW2Nvb3JkaW5hdGVzWzFdXVtjb29yZGluYXRlc1swXV0gPSBDZWxsU3RhdGUuTUlTUztcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGNvbnN0IHNoaXAgb2YgdGhpcy5zaGlwcykge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMICYmXG4gICAgICAgICAgICBjb29yZGluYXRlc1sxXSA9PT0gc2hpcC5jb29yZGluYXRlc1sxXSAmJlxuICAgICAgICAgICAgY29vcmRpbmF0ZXNbMF0gPj0gc2hpcC5jb29yZGluYXRlc1swXSAmJlxuICAgICAgICAgICAgY29vcmRpbmF0ZXNbMF0gPD0gc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMSkgfHxcbiAgICAgICAgICAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMICYmXG4gICAgICAgICAgICBjb29yZGluYXRlc1swXSA9PT0gc2hpcC5jb29yZGluYXRlc1swXSAmJlxuICAgICAgICAgICAgY29vcmRpbmF0ZXNbMV0gPj0gc2hpcC5jb29yZGluYXRlc1sxXSAmJlxuICAgICAgICAgICAgY29vcmRpbmF0ZXNbMV0gPD0gc2hpcC5jb29yZGluYXRlc1sxXSArIHNoaXAubGVuZ3RoIC0gMSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgc2hpcC5oaXQoKTtcblxuICAgICAgICAgIGlmIChzaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgICBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwpIHtcbiAgICAgICAgICAgICAgZm9yIChcbiAgICAgICAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMF07XG4gICAgICAgICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgIGkrK1xuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW3NoaXAuY29vcmRpbmF0ZXNbMV1dW2ldID0gQ2VsbFN0YXRlLlNVTks7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMKSB7XG4gICAgICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzFdO1xuICAgICAgICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1sxXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICBpKytcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jZWxsc1tpXVtzaGlwLmNvb3JkaW5hdGVzWzBdXSA9IENlbGxTdGF0ZS5TVU5LO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2VsbHNbY29vcmRpbmF0ZXNbMV1dW2Nvb3JkaW5hdGVzWzBdXSA9IENlbGxTdGF0ZS5ISVQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgaXNGbGVldERlc3Ryb3llZDogZnVuY3Rpb24gKCkge1xuICAgICAgZm9yIChjb25zdCBzaGlwIG9mIHRoaXMuc2hpcHMpIHtcbiAgICAgICAgaWYgKCFzaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gIH07XG59XG4iLCJpbXBvcnQgeyBjcmVhdGVHYW1lQm9hcmQgfSBmcm9tIFwiLi9nYW1lQm9hcmQuanNcIjtcblxuZXhwb3J0IGNvbnN0IFBsYXllclR5cGUgPSBPYmplY3QuZnJlZXplKHtcbiAgSFVNQU46IFwiSFVNQU5cIixcbiAgQ09NUFVURVI6IFwiQ09NUFVURVJcIixcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUGxheWVyKHR5cGUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlLFxuICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgYm9hcmQ6IGNyZWF0ZUdhbWVCb2FyZCgxMCksXG5cbiAgICBhY3RpdmF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRoaXMuYWN0aXZlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBsYXllciBpcyBhbHJlYWR5IGFjdGl2ZVwiKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgIH0sXG4gICAgZGVhY3RpdmF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCF0aGlzLmFjdGl2ZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQbGF5ZXIgaXMgYWxyZWFkeSBpbmFjdGl2ZVwiKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICB9LFxuICB9O1xufVxuIiwiZXhwb3J0IGNvbnN0IFNoaXBPcmllbnRhdGlvbiA9IE9iamVjdC5mcmVlemUoe1xuICBIT1JJWk9OVEFMOiBcIkhPUklaT05UQUxcIixcbiAgVkVSVElDQUw6IFwiVkVSVElDQUxcIixcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2hpcChcbiAgbGVuZ3RoLFxuICBjb29yZGluYXRlcyA9IFt1bmRlZmluZWQsIHVuZGVmaW5lZF0sXG4gIG9yaWVudGF0aW9uID0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwsXG4pIHtcbiAgaWYgKGxlbmd0aCA8IDEpIHJldHVybiB1bmRlZmluZWQ7XG4gIHJldHVybiB7XG4gICAgbGVuZ3RoLFxuICAgIGNvb3JkaW5hdGVzLFxuICAgIG9yaWVudGF0aW9uLFxuICAgIGhpdHM6IDAsXG5cbiAgICBoaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLmhpdHMgPCB0aGlzLmxlbmd0aCkge1xuICAgICAgICB0aGlzLmhpdHMrKztcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgaXNTdW5rOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5oaXRzID09PSB0aGlzLmxlbmd0aDtcbiAgICB9LFxuICB9O1xufVxuIiwiaW1wb3J0IHsgQ2VsbFN0YXRlIH0gZnJvbSBcIi4uL2NvcmUvZ2FtZUJvYXJkLmpzXCI7XG5pbXBvcnQgeyBjcmVhdGVQbGF5ZXIsIFBsYXllclR5cGUgfSBmcm9tIFwiLi4vY29yZS9wbGF5ZXIuanNcIjtcbmltcG9ydCB7IFNoaXBPcmllbnRhdGlvbiB9IGZyb20gXCIuLi9jb3JlL3NoaXAuanNcIjtcblxuY29uc3QgcmVmcmVzaEJvYXJkRXZlbnQgPSBuZXcgRXZlbnQoXCJyZWZyZXNoLWJvYXJkXCIpO1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBHYW1lQm9hcmRzKCkge1xuICBjb25zdCBwbGF5ZXJPbmUgPSBjcmVhdGVQbGF5ZXIoUGxheWVyVHlwZS5IVU1BTik7XG4gIGNvbnN0IHBsYXllclR3byA9IGNyZWF0ZVBsYXllcihQbGF5ZXJUeXBlLkNPTVBVVEVSKTtcblxuICBjb25zdCBzaGlwcyA9IFs1LCA0LCAzLCAzLCAyXTtcblxuICBmb3IgKGNvbnN0IHNoaXAgb2Ygc2hpcHMpIHtcbiAgICBsZXQgcGxhY2VkID0gZmFsc2U7XG4gICAgd2hpbGUgKCFwbGFjZWQpIHtcbiAgICAgIGNvbnN0IG9yaWVudGF0aW9uID1cbiAgICAgICAgTWF0aC5yYW5kb20oKSA+IDAuNVxuICAgICAgICAgID8gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUxcbiAgICAgICAgICA6IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTDtcblxuICAgICAgY29uc3QgeCA9IE1hdGguZmxvb3IoXG4gICAgICAgIE1hdGgucmFuZG9tKCkgKlxuICAgICAgICAgICgxMCAtIChvcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwgPyBzaGlwIDogMCkpLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKFxuICAgICAgICBNYXRoLnJhbmRvbSgpICpcbiAgICAgICAgICAoMTAgLSAob3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCA/IHNoaXAgOiAwKSksXG4gICAgICApO1xuXG4gICAgICBwbGFjZWQgPSBwbGF5ZXJPbmUuYm9hcmQucGxhY2VTaGlwKFt4LCB5XSwgc2hpcCwgb3JpZW50YXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIGZvciAoY29uc3Qgc2hpcCBvZiBzaGlwcykge1xuICAgIGxldCBwbGFjZWQgPSBmYWxzZTtcbiAgICB3aGlsZSAoIXBsYWNlZCkge1xuICAgICAgY29uc3Qgb3JpZW50YXRpb24gPVxuICAgICAgICBNYXRoLnJhbmRvbSgpID4gMC41XG4gICAgICAgICAgPyBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTFxuICAgICAgICAgIDogU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMO1xuXG4gICAgICBjb25zdCB4ID0gTWF0aC5mbG9vcihcbiAgICAgICAgTWF0aC5yYW5kb20oKSAqXG4gICAgICAgICAgKDEwIC0gKG9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCA/IHNoaXAgOiAwKSksXG4gICAgICApO1xuICAgICAgY29uc3QgeSA9IE1hdGguZmxvb3IoXG4gICAgICAgIE1hdGgucmFuZG9tKCkgKlxuICAgICAgICAgICgxMCAtIChvcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMID8gc2hpcCA6IDApKSxcbiAgICAgICk7XG5cbiAgICAgIHBsYWNlZCA9IHBsYXllclR3by5ib2FyZC5wbGFjZVNoaXAoW3gsIHldLCBzaGlwLCBvcmllbnRhdGlvbik7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgcGxheWVyT25lQm9hcmRDb21wb25lbnQgPSBnZW5lcmF0ZUJvYXJkKHBsYXllck9uZS5ib2FyZCwgdHJ1ZSk7XG4gIHBsYXllck9uZUJvYXJkQ29tcG9uZW50LmNsYXNzTGlzdC5hZGQoXCJwbGF5ZXItb25lXCIsIFwiaHVtYW5cIik7XG4gIHBsYXllck9uZUJvYXJkQ29tcG9uZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJyZWZyZXNoLWJvYXJkXCIsICgpID0+IHtcbiAgICBBcnJheS5mcm9tKHBsYXllck9uZUJvYXJkQ29tcG9uZW50LmNoaWxkcmVuKS5mb3JFYWNoKChyb3csIGkpID0+IHtcbiAgICAgIEFycmF5LmZyb20ocm93LmNoaWxkcmVuKS5mb3JFYWNoKChjZWxsLCBqKSA9PiB7XG4gICAgICAgIGNvbnN0IGlzTW92aW5nID0gY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb3ZpbmdcIik7XG5cbiAgICAgICAgY2VsbC5jbGFzc05hbWUgPSBcImNlbGxcIjtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKGdldENlbGxDbGFzc05hbWUoW2osIGldLCBwbGF5ZXJPbmUuYm9hcmQpKTtcbiAgICAgICAgaWYgKGlzTW92aW5nKSBjZWxsLmNsYXNzTGlzdC5hZGQoXCJtb3ZpbmdcIik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gc2hpcE1vdmVtZW50SGFuZGxlcihldmVudCkge1xuICAgIGNvbnN0IG1vdmluZ1NoaXBDZWxsID0gcGxheWVyT25lQm9hcmRDb21wb25lbnQucXVlcnlTZWxlY3RvcihcIi5tb3ZpbmdcIik7XG5cbiAgICBpZiAoIW1vdmluZ1NoaXBDZWxsKSByZXR1cm47XG5cbiAgICBjb25zdCBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXMgPSBbXG4gICAgICBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKFxuICAgICAgICBtb3ZpbmdTaGlwQ2VsbC5wYXJlbnROb2RlLmNoaWxkcmVuLFxuICAgICAgICBtb3ZpbmdTaGlwQ2VsbCxcbiAgICAgICksXG4gICAgICBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKFxuICAgICAgICBtb3ZpbmdTaGlwQ2VsbC5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2hpbGRyZW4sXG4gICAgICAgIG1vdmluZ1NoaXBDZWxsLnBhcmVudE5vZGUsXG4gICAgICApLFxuICAgIF07XG4gICAgY29uc3QgbW92aW5nU2hpcEluZGV4ID0gcGxheWVyT25lLmJvYXJkLmdldFNoaXBJbmRleChtb3ZpbmdTaGlwQ29vcmRpbmF0ZXMpO1xuXG4gICAgdG9nZ2xlU2hpcE1vdGlvbihcbiAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlcyxcbiAgICAgIHBsYXllck9uZS5ib2FyZCxcbiAgICAgIHBsYXllck9uZUJvYXJkQ29tcG9uZW50LFxuICAgICk7XG5cbiAgICBsZXQgbW92ZVN1Y2Nlc3NmdWwgPSBmYWxzZTtcbiAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgY2FzZSBcIkFycm93VXBcIjpcbiAgICAgICAgaWYgKG1vdmluZ1NoaXBDb29yZGluYXRlc1sxXSA8PSAwKSBicmVhaztcbiAgICAgICAgbW92ZVN1Y2Nlc3NmdWwgPSBwbGF5ZXJPbmUuYm9hcmQubW92ZVNoaXAobW92aW5nU2hpcEluZGV4LCBbXG4gICAgICAgICAgbW92aW5nU2hpcENvb3JkaW5hdGVzWzBdLFxuICAgICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlc1sxXSAtIDEsXG4gICAgICAgIF0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJBcnJvd0xlZnRcIjpcbiAgICAgICAgaWYgKG1vdmluZ1NoaXBDb29yZGluYXRlc1swXSA8PSAwKSBicmVhaztcbiAgICAgICAgbW92ZVN1Y2Nlc3NmdWwgPSBwbGF5ZXJPbmUuYm9hcmQubW92ZVNoaXAobW92aW5nU2hpcEluZGV4LCBbXG4gICAgICAgICAgbW92aW5nU2hpcENvb3JkaW5hdGVzWzBdIC0gMSxcbiAgICAgICAgICBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMV0sXG4gICAgICAgIF0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJBcnJvd0Rvd25cIjpcbiAgICAgICAgaWYgKG1vdmluZ1NoaXBDb29yZGluYXRlc1sxXSA+PSBwbGF5ZXJPbmUuYm9hcmQuc2l6ZSAtIDEpIGJyZWFrO1xuICAgICAgICBtb3ZlU3VjY2Vzc2Z1bCA9IHBsYXllck9uZS5ib2FyZC5tb3ZlU2hpcChtb3ZpbmdTaGlwSW5kZXgsIFtcbiAgICAgICAgICBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMF0sXG4gICAgICAgICAgbW92aW5nU2hpcENvb3JkaW5hdGVzWzFdICsgMSxcbiAgICAgICAgXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIkFycm93UmlnaHRcIjpcbiAgICAgICAgaWYgKG1vdmluZ1NoaXBDb29yZGluYXRlc1swXSA+PSBwbGF5ZXJPbmUuYm9hcmQuc2l6ZSAtIDEpIGJyZWFrO1xuICAgICAgICBtb3ZlU3VjY2Vzc2Z1bCA9IHBsYXllck9uZS5ib2FyZC5tb3ZlU2hpcChtb3ZpbmdTaGlwSW5kZXgsIFtcbiAgICAgICAgICBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMF0gKyAxLFxuICAgICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlc1sxXSxcbiAgICAgICAgXSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmICghbW92ZVN1Y2Nlc3NmdWwpIHtcbiAgICAgIHRvZ2dsZVNoaXBNb3Rpb24oXG4gICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlcyxcbiAgICAgICAgcGxheWVyT25lLmJvYXJkLFxuICAgICAgICBwbGF5ZXJPbmVCb2FyZENvbXBvbmVudCxcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcGxheWVyT25lQm9hcmRDb21wb25lbnQuZGlzcGF0Y2hFdmVudChyZWZyZXNoQm9hcmRFdmVudCk7XG5cbiAgICBjb25zdCBtb3ZlZFNoaXAgPSBwbGF5ZXJPbmUuYm9hcmQuc2hpcHNbcGxheWVyT25lLmJvYXJkLnNoaXBzLmxlbmd0aCAtIDFdO1xuICAgIHRvZ2dsZVNoaXBNb3Rpb24oXG4gICAgICBtb3ZlZFNoaXAuY29vcmRpbmF0ZXMsXG4gICAgICBwbGF5ZXJPbmUuYm9hcmQsXG4gICAgICBwbGF5ZXJPbmVCb2FyZENvbXBvbmVudCxcbiAgICApO1xuICB9XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHNoaXBNb3ZlbWVudEhhbmRsZXIpO1xuXG4gIGNvbnN0IHBsYXllclR3b0JvYXJkQ29tcG9uZW50ID0gZ2VuZXJhdGVCb2FyZChwbGF5ZXJUd28uYm9hcmQsIGZhbHNlKTtcbiAgcGxheWVyVHdvQm9hcmRDb21wb25lbnQuY2xhc3NMaXN0LmFkZChcInBsYXllci10d29cIiwgXCJjb21wdXRlclwiKTtcblxuICBwbGF5ZXJUd29Cb2FyZENvbXBvbmVudC5hZGRFdmVudExpc3RlbmVyKFwicmVmcmVzaC1ib2FyZFwiLCAoKSA9PiB7XG4gICAgQXJyYXkuZnJvbShwbGF5ZXJUd29Cb2FyZENvbXBvbmVudC5jaGlsZHJlbikuZm9yRWFjaCgocm93LCBpKSA9PiB7XG4gICAgICBBcnJheS5mcm9tKHJvdy5jaGlsZHJlbikuZm9yRWFjaCgoY2VsbCwgaikgPT4ge1xuICAgICAgICBjZWxsLmNsYXNzTmFtZSA9IFwiY2VsbFwiO1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoZ2V0Q2VsbENsYXNzTmFtZShbaiwgaV0sIHBsYXllclR3by5ib2FyZCkpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBbcGxheWVyT25lQm9hcmRDb21wb25lbnQsIHBsYXllclR3b0JvYXJkQ29tcG9uZW50XTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlQm9hcmQoYm9hcmQsIG11dGFibGUpIHtcbiAgY29uc3QgYm9hcmRDb21wb25lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBib2FyZENvbXBvbmVudC5jbGFzc0xpc3QuYWRkKFwiYm9hcmRcIik7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBib2FyZC5jZWxscy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHJvd0NvbXBvbmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcm93Q29tcG9uZW50LmNsYXNzTGlzdC5hZGQoXCJyb3dcIik7XG5cbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGJvYXJkLmNlbGxzW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICBjb25zdCBjZWxsQ29tcG9uZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIGNlbGxDb21wb25lbnQuY2xhc3NMaXN0LmFkZChcImNlbGxcIik7XG4gICAgICBjZWxsQ29tcG9uZW50LmNsYXNzTGlzdC5hZGQoZ2V0Q2VsbENsYXNzTmFtZShbaiwgaV0sIGJvYXJkKSk7XG5cbiAgICAgIGlmICghbXV0YWJsZSkge1xuICAgICAgICBjZWxsQ29tcG9uZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgY2VsbCA9IGJvYXJkLmNlbGxzW2ldW2pdO1xuICAgICAgICAgIGlmIChjZWxsICE9PSBDZWxsU3RhdGUuRU1QVFkgJiYgY2VsbCAhPT0gQ2VsbFN0YXRlLlNISVApIHJldHVybjtcblxuICAgICAgICAgIGJvYXJkLnJlY2VpdmVBdHRhY2soW2osIGldKTtcbiAgICAgICAgICBib2FyZENvbXBvbmVudC5kaXNwYXRjaEV2ZW50KHJlZnJlc2hCb2FyZEV2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChtdXRhYmxlKSB7XG4gICAgICAgIGNlbGxDb21wb25lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+XG4gICAgICAgICAgdG9nZ2xlU2hpcE1vdGlvbihbaiwgaV0sIGJvYXJkLCBib2FyZENvbXBvbmVudCwgdHJ1ZSksXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByb3dDb21wb25lbnQuYXBwZW5kQ2hpbGQoY2VsbENvbXBvbmVudCk7XG4gICAgfVxuICAgIGJvYXJkQ29tcG9uZW50LmFwcGVuZENoaWxkKHJvd0NvbXBvbmVudCk7XG4gIH1cblxuICByZXR1cm4gYm9hcmRDb21wb25lbnQ7XG59XG5cbmZ1bmN0aW9uIGdldENlbGxDbGFzc05hbWUoY29vcmRpbmF0ZXMsIGJvYXJkKSB7XG4gIGNvbnN0IGNlbGwgPSBib2FyZC5jZWxsc1tjb29yZGluYXRlc1sxXV1bY29vcmRpbmF0ZXNbMF1dO1xuICBzd2l0Y2ggKGNlbGwpIHtcbiAgICBjYXNlIENlbGxTdGF0ZS5FTVBUWTpcbiAgICAgIHJldHVybiBcImVtcHR5XCI7XG4gICAgY2FzZSBDZWxsU3RhdGUuTUlTUzpcbiAgICAgIHJldHVybiBcIm1pc3NcIjtcbiAgICBjYXNlIENlbGxTdGF0ZS5TSElQOlxuICAgICAgcmV0dXJuIFwic2hpcFwiO1xuICAgIGNhc2UgQ2VsbFN0YXRlLkhJVDpcbiAgICAgIHJldHVybiBcImhpdFwiO1xuICAgIGNhc2UgQ2VsbFN0YXRlLlNVTks6XG4gICAgICByZXR1cm4gXCJzdW5rXCI7XG4gIH1cbn1cblxuZnVuY3Rpb24gdG9nZ2xlU2hpcE1vdGlvbihcbiAgY29vcmRpbmF0ZXMsXG4gIGJvYXJkLFxuICBib2FyZENvbXBvbmVudCxcbiAgc2hvdWxkQ2xlYXJCb2FyZCA9IGZhbHNlLFxuKSB7XG4gIGNvbnN0IGNlbGwgPSBib2FyZENvbXBvbmVudC5jaGlsZHJlbltjb29yZGluYXRlc1sxXV0uY2hpbGRyZW5bY29vcmRpbmF0ZXNbMF1dO1xuXG4gIGlmICghY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJzaGlwXCIpKSByZXR1cm47XG5cbiAgY29uc3Qgc2hpcEluZGV4ID0gYm9hcmQuZ2V0U2hpcEluZGV4KGNvb3JkaW5hdGVzKTtcbiAgbGV0IHNoaXAgPSBib2FyZC5zaGlwc1tzaGlwSW5kZXhdO1xuXG4gIGlmIChzaG91bGRDbGVhckJvYXJkKSB7XG4gICAgY29uc3QgbW92aW5nQ2VsbHMgPSBib2FyZENvbXBvbmVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1vdmluZ1wiKTtcbiAgICBmb3IgKGNvbnN0IGNlbGwgb2YgbW92aW5nQ2VsbHMpIHtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZShcIm1vdmluZ1wiKTtcbiAgICB9XG4gIH1cblxuICBzd2l0Y2ggKHNoaXAub3JpZW50YXRpb24pIHtcbiAgICBjYXNlIFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMOlxuICAgICAgZm9yIChcbiAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMF0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgIGkrK1xuICAgICAgKSB7XG4gICAgICAgIGJvYXJkQ29tcG9uZW50LmNoaWxkcmVuW3NoaXAuY29vcmRpbmF0ZXNbMV1dLmNoaWxkcmVuW1xuICAgICAgICAgIGlcbiAgICAgICAgXS5jbGFzc0xpc3QudG9nZ2xlKFwibW92aW5nXCIpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUw6XG4gICAgICBmb3IgKFxuICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMV07XG4gICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1sxXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgaSsrXG4gICAgICApIHtcbiAgICAgICAgYm9hcmRDb21wb25lbnQuY2hpbGRyZW5baV0uY2hpbGRyZW5bXG4gICAgICAgICAgc2hpcC5jb29yZGluYXRlc1swXVxuICAgICAgICBdLmNsYXNzTGlzdC50b2dnbGUoXCJtb3ZpbmdcIik7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgc2V0dXBHYW1lQm9hcmRzIH0gZnJvbSBcIi4vZG9tL2JvYXJkcy5qc1wiO1xuaW1wb3J0IFwiLi9zdHlsZXMvaW5kZXguY3NzXCI7XG5cbmNvbnNvbGUubG9nKFwiR2V0IFJlYWR5IGZvciBCYXR0bGUhXCIpO1xuXG5jb25zdCByb290ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpO1xuXG5yb290LmlubmVySFRNTCA9IGBcbjxoZWFkZXI+QmF0dGxlc2hpcDwvaGVhZGVyPlxuPGRpdiBjbGFzcz1cImJvYXJkc1wiPjwvZGl2PlxuPGRpdiBjbGFzcz1cImNvbnRyb2xzXCI+XG4gIDxkaXYgY2xhc3M9XCJzaGlwc1wiPjwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiZ2FtZS1jb250cm9sc1wiPlxuICAgIDxidXR0b24gY2xhc3M9XCJzdGFydFwiPlN0YXJ0IEdhbWU8L2J1dHRvbj5cbiAgICA8YnV0dG9uIGNsYXNzPVwicmVzZXRcIj5SZXNldCBHYW1lPC9idXR0b24+XG4gICAgPGJ1dHRvbiBjbGFzcz1cInJhbmRvbWl6ZVwiIGRpc2FibGVkPlJhbmRvbWl6ZSBGb3JtYXRpb248L2J1dHRvbj5cbiAgPC9kaXY+XG48L2Rpdj5cbmA7XG5cbmNvbnN0IGJvYXJkc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYm9hcmRzXCIpO1xuYm9hcmRzQ29udGFpbmVyLmFwcGVuZCguLi5zZXR1cEdhbWVCb2FyZHMoKSk7XG4iXSwibmFtZXMiOlsiY3JlYXRlU2hpcCIsIlNoaXBPcmllbnRhdGlvbiIsIkNlbGxTdGF0ZSIsIk9iamVjdCIsImZyZWV6ZSIsIkVNUFRZIiwiTUlTUyIsIlNISVAiLCJISVQiLCJTVU5LIiwiY3JlYXRlR2FtZUJvYXJkIiwic2l6ZSIsIkVycm9yIiwiY2VsbHMiLCJBcnJheSIsImZyb20iLCJsZW5ndGgiLCJzaGlwcyIsInBsYWNlU2hpcCIsImNvb3JkaW5hdGVzIiwib3JpZW50YXRpb24iLCJIT1JJWk9OVEFMIiwiVkVSVElDQUwiLCJpIiwicHVzaCIsIm1vdmVTaGlwIiwic2hpcEluZGV4Iiwic2hpcCIsInNwbGljZSIsImdldFNoaXBJbmRleCIsImoiLCJyZWNlaXZlQXR0YWNrIiwiaGl0IiwiaXNTdW5rIiwiaXNGbGVldERlc3Ryb3llZCIsIlBsYXllclR5cGUiLCJIVU1BTiIsIkNPTVBVVEVSIiwiY3JlYXRlUGxheWVyIiwidHlwZSIsImFjdGl2ZSIsImJvYXJkIiwiYWN0aXZhdGUiLCJkZWFjdGl2YXRlIiwiYXJndW1lbnRzIiwidW5kZWZpbmVkIiwiaGl0cyIsInJlZnJlc2hCb2FyZEV2ZW50IiwiRXZlbnQiLCJzZXR1cEdhbWVCb2FyZHMiLCJwbGF5ZXJPbmUiLCJwbGF5ZXJUd28iLCJwbGFjZWQiLCJNYXRoIiwicmFuZG9tIiwieCIsImZsb29yIiwieSIsInBsYXllck9uZUJvYXJkQ29tcG9uZW50IiwiZ2VuZXJhdGVCb2FyZCIsImNsYXNzTGlzdCIsImFkZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjaGlsZHJlbiIsImZvckVhY2giLCJyb3ciLCJjZWxsIiwiaXNNb3ZpbmciLCJjb250YWlucyIsImNsYXNzTmFtZSIsImdldENlbGxDbGFzc05hbWUiLCJzaGlwTW92ZW1lbnRIYW5kbGVyIiwiZXZlbnQiLCJtb3ZpbmdTaGlwQ2VsbCIsInF1ZXJ5U2VsZWN0b3IiLCJtb3ZpbmdTaGlwQ29vcmRpbmF0ZXMiLCJwcm90b3R5cGUiLCJpbmRleE9mIiwiY2FsbCIsInBhcmVudE5vZGUiLCJtb3ZpbmdTaGlwSW5kZXgiLCJ0b2dnbGVTaGlwTW90aW9uIiwibW92ZVN1Y2Nlc3NmdWwiLCJrZXkiLCJkaXNwYXRjaEV2ZW50IiwibW92ZWRTaGlwIiwiZG9jdW1lbnQiLCJwbGF5ZXJUd29Cb2FyZENvbXBvbmVudCIsIm11dGFibGUiLCJib2FyZENvbXBvbmVudCIsImNyZWF0ZUVsZW1lbnQiLCJyb3dDb21wb25lbnQiLCJjZWxsQ29tcG9uZW50IiwiYXBwZW5kQ2hpbGQiLCJzaG91bGRDbGVhckJvYXJkIiwibW92aW5nQ2VsbHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwicmVtb3ZlIiwidG9nZ2xlIiwiY29uc29sZSIsImxvZyIsInJvb3QiLCJnZXRFbGVtZW50QnlJZCIsImlubmVySFRNTCIsImJvYXJkc0NvbnRhaW5lciIsImFwcGVuZCJdLCJzb3VyY2VSb290IjoiIn0=