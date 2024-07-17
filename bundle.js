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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SUFBSSxDQUFDUixXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQzNCSSxDQUFDLElBQUlJLElBQUksQ0FBQ1IsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHUSxJQUFJLENBQUNYLE1BQU0sR0FBRyxDQUFDLEVBQzFDTyxDQUFDLEVBQUUsRUFDSDtVQUNBLElBQUksQ0FBQ1YsS0FBSyxDQUFDVSxDQUFDLENBQUMsQ0FBQ0ksSUFBSSxDQUFDUixXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR2pCLFNBQVMsQ0FBQ0csS0FBSztRQUN0RDtRQUNBLEtBQ0UsSUFBSWtCLENBQUMsR0FBR0ksSUFBSSxDQUFDUixXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQzNCSSxDQUFDLElBQUlJLElBQUksQ0FBQ1IsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHUSxJQUFJLENBQUNYLE1BQU0sR0FBRyxDQUFDLEVBQzFDTyxDQUFDLEVBQUUsRUFDSDtVQUNBLElBQUksQ0FBQ1YsS0FBSyxDQUFDYyxJQUFJLENBQUNSLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDSSxDQUFDLENBQUMsR0FBR3JCLFNBQVMsQ0FBQ0ssSUFBSTtRQUNyRDtNQUNGLENBQUMsTUFBTSxJQUFJdUIsY0FBYyxLQUFLN0IscURBQWUsQ0FBQ3FCLFFBQVEsRUFBRTtRQUN0RCxLQUNFLElBQUlDLENBQUMsR0FBR0ksSUFBSSxDQUFDUixXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQzNCSSxDQUFDLElBQUlJLElBQUksQ0FBQ1IsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHUSxJQUFJLENBQUNYLE1BQU0sR0FBRyxDQUFDLEVBQzFDTyxDQUFDLEVBQUUsRUFDSDtVQUNBLElBQUksQ0FBQ1YsS0FBSyxDQUFDYyxJQUFJLENBQUNSLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDSSxDQUFDLENBQUMsR0FBR3JCLFNBQVMsQ0FBQ0csS0FBSztRQUN0RDtRQUNBLEtBQ0UsSUFBSWtCLENBQUMsR0FBR0ksSUFBSSxDQUFDUixXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQzNCSSxDQUFDLElBQUlJLElBQUksQ0FBQ1IsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHUSxJQUFJLENBQUNYLE1BQU0sR0FBRyxDQUFDLEVBQzFDTyxDQUFDLEVBQUUsRUFDSDtVQUNBLElBQUksQ0FBQ1YsS0FBSyxDQUFDVSxDQUFDLENBQUMsQ0FBQ0ksSUFBSSxDQUFDUixXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR2pCLFNBQVMsQ0FBQ0ssSUFBSTtRQUNyRDtNQUNGO01BRUFvQixJQUFJLENBQUNQLFdBQVcsR0FBR1UsY0FBYztNQUNqQyxPQUFPLElBQUk7SUFDYixDQUFDO0lBRURDLFlBQVksRUFBRSxTQUFBQSxDQUFVWixXQUFXLEVBQUU7TUFDbkMsS0FBSyxJQUFJSSxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUcsSUFBSSxDQUFDTixLQUFLLENBQUNELE1BQU0sRUFBRU8sQ0FBQyxFQUFFLEVBQUU7UUFDMUMsSUFBSSxJQUFJLENBQUNOLEtBQUssQ0FBQ00sQ0FBQyxDQUFDLENBQUNILFdBQVcsS0FBS25CLHFEQUFlLENBQUNvQixVQUFVLEVBQUU7VUFDNUQsS0FDRSxJQUFJVyxDQUFDLEdBQUcsSUFBSSxDQUFDZixLQUFLLENBQUNNLENBQUMsQ0FBQyxDQUFDSixXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQ3BDYSxDQUFDLElBQUksSUFBSSxDQUFDZixLQUFLLENBQUNNLENBQUMsQ0FBQyxDQUFDSixXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDRixLQUFLLENBQUNNLENBQUMsQ0FBQyxDQUFDUCxNQUFNLEdBQUcsQ0FBQyxFQUM1RGdCLENBQUMsRUFBRSxFQUNIO1lBQ0EsSUFDRWIsV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLYSxDQUFDLElBQ3BCYixXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDRixLQUFLLENBQUNNLENBQUMsQ0FBQyxDQUFDSixXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQy9DO2NBQ0EsT0FBT0ksQ0FBQztZQUNWO1VBQ0Y7UUFDRixDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUNOLEtBQUssQ0FBQ00sQ0FBQyxDQUFDLENBQUNILFdBQVcsS0FBS25CLHFEQUFlLENBQUNxQixRQUFRLEVBQUU7VUFDakUsS0FDRSxJQUFJVSxDQUFDLEdBQUcsSUFBSSxDQUFDZixLQUFLLENBQUNNLENBQUMsQ0FBQyxDQUFDSixXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQ3BDYSxDQUFDLElBQUksSUFBSSxDQUFDZixLQUFLLENBQUNNLENBQUMsQ0FBQyxDQUFDSixXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDRixLQUFLLENBQUNNLENBQUMsQ0FBQyxDQUFDUCxNQUFNLEdBQUcsQ0FBQyxFQUM1RGdCLENBQUMsRUFBRSxFQUNIO1lBQ0EsSUFDRWIsV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQ0YsS0FBSyxDQUFDTSxDQUFDLENBQUMsQ0FBQ0osV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUMvQ0EsV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLYSxDQUFDLEVBQ3BCO2NBQ0EsT0FBT1QsQ0FBQztZQUNWO1VBQ0Y7UUFDRjtNQUNGO01BRUEsTUFBTSxJQUFJWCxLQUFLLENBQ2Isa0NBQWtDTyxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUtBLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FDckUsQ0FBQztJQUNILENBQUM7SUFFRGMsYUFBYSxFQUFFLFNBQUFBLENBQVVkLFdBQVcsRUFBRTtNQUNwQyxJQUNFQSxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUNsQkEsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFDbEJBLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSVIsSUFBSSxJQUN0QlEsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJUixJQUFJLEVBQ3RCO1FBQ0EsTUFBTSxJQUFJQyxLQUFLLENBQUMsaUNBQWlDLENBQUM7TUFDcEQ7TUFFQSxJQUNFLElBQUksQ0FBQ0MsS0FBSyxDQUFDTSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQ0EsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUtqQixTQUFTLENBQUNHLEtBQUssSUFDOUQsSUFBSSxDQUFDUSxLQUFLLENBQUNNLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDQSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBS2pCLFNBQVMsQ0FBQ0ssSUFBSSxFQUM3RDtRQUNBLE1BQU0sSUFBSUssS0FBSyxDQUFDLGdDQUFnQyxDQUFDO01BQ25EO01BRUEsSUFBSSxJQUFJLENBQUNDLEtBQUssQ0FBQ00sV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNBLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLakIsU0FBUyxDQUFDSyxJQUFJLEVBQUU7UUFDakUsSUFBSSxDQUFDTSxLQUFLLENBQUNNLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDQSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR2pCLFNBQVMsQ0FBQ0ksSUFBSTtRQUMzRCxPQUFPLEtBQUs7TUFDZDtNQUVBLEtBQUssTUFBTXFCLElBQUksSUFBSSxJQUFJLENBQUNWLEtBQUssRUFBRTtRQUM3QixJQUNHVSxJQUFJLENBQUNQLFdBQVcsS0FBS25CLHFEQUFlLENBQUNvQixVQUFVLElBQzlDRixXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUtRLElBQUksQ0FBQ1IsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUN0Q0EsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJUSxJQUFJLENBQUNSLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFDckNBLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSVEsSUFBSSxDQUFDUixXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUdRLElBQUksQ0FBQ1gsTUFBTSxHQUFHLENBQUMsSUFDeERXLElBQUksQ0FBQ1AsV0FBVyxLQUFLbkIscURBQWUsQ0FBQ3FCLFFBQVEsSUFDNUNILFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBS1EsSUFBSSxDQUFDUixXQUFXLENBQUMsQ0FBQyxDQUFDLElBQ3RDQSxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUlRLElBQUksQ0FBQ1IsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUNyQ0EsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJUSxJQUFJLENBQUNSLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBR1EsSUFBSSxDQUFDWCxNQUFNLEdBQUcsQ0FBRSxFQUMxRDtVQUNBVyxJQUFJLENBQUNPLEdBQUcsQ0FBQyxDQUFDO1VBRVYsSUFBSVAsSUFBSSxDQUFDUSxNQUFNLENBQUMsQ0FBQyxFQUFFO1lBQ2pCLElBQUlSLElBQUksQ0FBQ1AsV0FBVyxLQUFLbkIscURBQWUsQ0FBQ29CLFVBQVUsRUFBRTtjQUNuRCxLQUNFLElBQUlFLENBQUMsR0FBR0ksSUFBSSxDQUFDUixXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQzNCSSxDQUFDLElBQUlJLElBQUksQ0FBQ1IsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHUSxJQUFJLENBQUNYLE1BQU0sR0FBRyxDQUFDLEVBQzFDTyxDQUFDLEVBQUUsRUFDSDtnQkFDQSxJQUFJLENBQUNWLEtBQUssQ0FBQ2MsSUFBSSxDQUFDUixXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQ0ksQ0FBQyxDQUFDLEdBQUdyQixTQUFTLENBQUNPLElBQUk7Y0FDckQ7WUFDRixDQUFDLE1BQU0sSUFBSWtCLElBQUksQ0FBQ1AsV0FBVyxLQUFLbkIscURBQWUsQ0FBQ3FCLFFBQVEsRUFBRTtjQUN4RCxLQUNFLElBQUlDLENBQUMsR0FBR0ksSUFBSSxDQUFDUixXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQzNCSSxDQUFDLElBQUlJLElBQUksQ0FBQ1IsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHUSxJQUFJLENBQUNYLE1BQU0sR0FBRyxDQUFDLEVBQzFDTyxDQUFDLEVBQUUsRUFDSDtnQkFDQSxJQUFJLENBQUNWLEtBQUssQ0FBQ1UsQ0FBQyxDQUFDLENBQUNJLElBQUksQ0FBQ1IsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdqQixTQUFTLENBQUNPLElBQUk7Y0FDckQ7WUFDRjtVQUNGLENBQUMsTUFBTTtZQUNMLElBQUksQ0FBQ0ksS0FBSyxDQUFDTSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQ0EsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdqQixTQUFTLENBQUNNLEdBQUc7VUFDNUQ7VUFFQSxPQUFPLElBQUk7UUFDYjtNQUNGO0lBQ0YsQ0FBQztJQUVENEIsZ0JBQWdCLEVBQUUsU0FBQUEsQ0FBQSxFQUFZO01BQzVCLEtBQUssTUFBTVQsSUFBSSxJQUFJLElBQUksQ0FBQ1YsS0FBSyxFQUFFO1FBQzdCLElBQUksQ0FBQ1UsSUFBSSxDQUFDUSxNQUFNLENBQUMsQ0FBQyxFQUFFO1VBQ2xCLE9BQU8sS0FBSztRQUNkO01BQ0Y7TUFFQSxPQUFPLElBQUk7SUFDYjtFQUNGLENBQUM7QUFDSDs7Ozs7Ozs7Ozs7Ozs7OztBQy9TaUQ7QUFFMUMsTUFBTUUsVUFBVSxHQUFHbEMsTUFBTSxDQUFDQyxNQUFNLENBQUM7RUFDdENrQyxLQUFLLEVBQUUsT0FBTztFQUNkQyxRQUFRLEVBQUU7QUFDWixDQUFDLENBQUM7QUFFSyxTQUFTQyxZQUFZQSxDQUFDQyxJQUFJLEVBQUU7RUFDakMsT0FBTztJQUNMQSxJQUFJO0lBQ0pDLE1BQU0sRUFBRSxLQUFLO0lBQ2JDLEtBQUssRUFBRWpDLDhEQUFlLENBQUMsRUFBRSxDQUFDO0lBRTFCa0MsUUFBUSxFQUFFLFNBQUFBLENBQUEsRUFBWTtNQUNwQixJQUFJLElBQUksQ0FBQ0YsTUFBTSxFQUFFO1FBQ2YsTUFBTSxJQUFJOUIsS0FBSyxDQUFDLDBCQUEwQixDQUFDO01BQzdDO01BRUEsSUFBSSxDQUFDOEIsTUFBTSxHQUFHLElBQUk7SUFDcEIsQ0FBQztJQUNERyxVQUFVLEVBQUUsU0FBQUEsQ0FBQSxFQUFZO01BQ3RCLElBQUksQ0FBQyxJQUFJLENBQUNILE1BQU0sRUFBRTtRQUNoQixNQUFNLElBQUk5QixLQUFLLENBQUMsNEJBQTRCLENBQUM7TUFDL0M7TUFFQSxJQUFJLENBQUM4QixNQUFNLEdBQUcsS0FBSztJQUNyQjtFQUNGLENBQUM7QUFDSDs7Ozs7Ozs7Ozs7Ozs7O0FDNUJPLE1BQU16QyxlQUFlLEdBQUdFLE1BQU0sQ0FBQ0MsTUFBTSxDQUFDO0VBQzNDaUIsVUFBVSxFQUFFLFlBQVk7RUFDeEJDLFFBQVEsRUFBRTtBQUNaLENBQUMsQ0FBQztBQUVLLFNBQVN0QixVQUFVQSxDQUN4QmdCLE1BQU0sRUFHTjtFQUFBLElBRkFHLFdBQVcsR0FBQTJCLFNBQUEsQ0FBQTlCLE1BQUEsUUFBQThCLFNBQUEsUUFBQUMsU0FBQSxHQUFBRCxTQUFBLE1BQUcsQ0FBQ0MsU0FBUyxFQUFFQSxTQUFTLENBQUM7RUFBQSxJQUNwQzNCLFdBQVcsR0FBQTBCLFNBQUEsQ0FBQTlCLE1BQUEsUUFBQThCLFNBQUEsUUFBQUMsU0FBQSxHQUFBRCxTQUFBLE1BQUc3QyxlQUFlLENBQUNvQixVQUFVO0VBRXhDLElBQUlMLE1BQU0sR0FBRyxDQUFDLEVBQUUsT0FBTytCLFNBQVM7RUFDaEMsT0FBTztJQUNML0IsTUFBTTtJQUNORyxXQUFXO0lBQ1hDLFdBQVc7SUFDWDRCLElBQUksRUFBRSxDQUFDO0lBRVBkLEdBQUcsRUFBRSxTQUFBQSxDQUFBLEVBQVk7TUFDZixJQUFJLElBQUksQ0FBQ2MsSUFBSSxHQUFHLElBQUksQ0FBQ2hDLE1BQU0sRUFBRTtRQUMzQixJQUFJLENBQUNnQyxJQUFJLEVBQUU7TUFDYjtJQUNGLENBQUM7SUFFRGIsTUFBTSxFQUFFLFNBQUFBLENBQUEsRUFBWTtNQUNsQixPQUFPLElBQUksQ0FBQ2EsSUFBSSxLQUFLLElBQUksQ0FBQ2hDLE1BQU07SUFDbEM7RUFDRixDQUFDO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNCaUQ7QUFDWTtBQUNYO0FBRWxELE1BQU1pQyxpQkFBaUIsR0FBRyxJQUFJQyxLQUFLLENBQUMsZUFBZSxDQUFDO0FBRTdDLFNBQVNDLGVBQWVBLENBQUEsRUFBRztFQUNoQyxNQUFNQyxTQUFTLEdBQUdaLDZEQUFZLENBQUNILHVEQUFVLENBQUNDLEtBQUssQ0FBQztFQUNoRCxNQUFNZSxTQUFTLEdBQUdiLDZEQUFZLENBQUNILHVEQUFVLENBQUNFLFFBQVEsQ0FBQztFQUVuRCxNQUFNdEIsS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUU3QixLQUFLLE1BQU1VLElBQUksSUFBSVYsS0FBSyxFQUFFO0lBQ3hCLElBQUlxQyxNQUFNLEdBQUcsS0FBSztJQUNsQixPQUFPLENBQUNBLE1BQU0sRUFBRTtNQUNkLE1BQU1sQyxXQUFXLEdBQ2ZtQyxJQUFJLENBQUNDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUNmdkQsMERBQWUsQ0FBQ29CLFVBQVUsR0FDMUJwQiwwREFBZSxDQUFDcUIsUUFBUTtNQUU5QixNQUFNbUMsQ0FBQyxHQUFHRixJQUFJLENBQUNHLEtBQUssQ0FDbEJILElBQUksQ0FBQ0MsTUFBTSxDQUFDLENBQUMsSUFDVixFQUFFLElBQUlwQyxXQUFXLEtBQUtuQiwwREFBZSxDQUFDb0IsVUFBVSxHQUFHTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQ2pFLENBQUM7TUFDRCxNQUFNZ0MsQ0FBQyxHQUFHSixJQUFJLENBQUNHLEtBQUssQ0FDbEJILElBQUksQ0FBQ0MsTUFBTSxDQUFDLENBQUMsSUFDVixFQUFFLElBQUlwQyxXQUFXLEtBQUtuQiwwREFBZSxDQUFDcUIsUUFBUSxHQUFHSyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQy9ELENBQUM7TUFFRDJCLE1BQU0sR0FBR0YsU0FBUyxDQUFDVCxLQUFLLENBQUN6QixTQUFTLENBQUMsQ0FBQ3VDLENBQUMsRUFBRUUsQ0FBQyxDQUFDLEVBQUVoQyxJQUFJLEVBQUVQLFdBQVcsQ0FBQztJQUMvRDtFQUNGO0VBRUEsS0FBSyxNQUFNTyxJQUFJLElBQUlWLEtBQUssRUFBRTtJQUN4QixJQUFJcUMsTUFBTSxHQUFHLEtBQUs7SUFDbEIsT0FBTyxDQUFDQSxNQUFNLEVBQUU7TUFDZCxNQUFNbEMsV0FBVyxHQUNmbUMsSUFBSSxDQUFDQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FDZnZELDBEQUFlLENBQUNvQixVQUFVLEdBQzFCcEIsMERBQWUsQ0FBQ3FCLFFBQVE7TUFFOUIsTUFBTW1DLENBQUMsR0FBR0YsSUFBSSxDQUFDRyxLQUFLLENBQ2xCSCxJQUFJLENBQUNDLE1BQU0sQ0FBQyxDQUFDLElBQ1YsRUFBRSxJQUFJcEMsV0FBVyxLQUFLbkIsMERBQWUsQ0FBQ29CLFVBQVUsR0FBR00sSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUNqRSxDQUFDO01BQ0QsTUFBTWdDLENBQUMsR0FBR0osSUFBSSxDQUFDRyxLQUFLLENBQ2xCSCxJQUFJLENBQUNDLE1BQU0sQ0FBQyxDQUFDLElBQ1YsRUFBRSxJQUFJcEMsV0FBVyxLQUFLbkIsMERBQWUsQ0FBQ3FCLFFBQVEsR0FBR0ssSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUMvRCxDQUFDO01BRUQyQixNQUFNLEdBQUdELFNBQVMsQ0FBQ1YsS0FBSyxDQUFDekIsU0FBUyxDQUFDLENBQUN1QyxDQUFDLEVBQUVFLENBQUMsQ0FBQyxFQUFFaEMsSUFBSSxFQUFFUCxXQUFXLENBQUM7SUFDL0Q7RUFDRjtFQUVBLE1BQU13Qyx1QkFBdUIsR0FBR0MsYUFBYSxDQUFDVCxTQUFTLENBQUNULEtBQUssRUFBRSxJQUFJLENBQUM7RUFDcEVpQix1QkFBdUIsQ0FBQ0UsU0FBUyxDQUFDQyxHQUFHLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQztFQUU1REgsdUJBQXVCLENBQUNJLGdCQUFnQixDQUFDLGVBQWUsRUFBRSxNQUFNO0lBQzlEbEQsS0FBSyxDQUFDQyxJQUFJLENBQUM2Qyx1QkFBdUIsQ0FBQ0ssUUFBUSxDQUFDLENBQUNDLE9BQU8sQ0FBQyxDQUFDQyxHQUFHLEVBQUU1QyxDQUFDLEtBQUs7TUFDL0RULEtBQUssQ0FBQ0MsSUFBSSxDQUFDb0QsR0FBRyxDQUFDRixRQUFRLENBQUMsQ0FBQ0MsT0FBTyxDQUFDLENBQUNFLElBQUksRUFBRXBDLENBQUMsS0FBSztRQUM1QyxNQUFNcUMsUUFBUSxHQUFHRCxJQUFJLENBQUNOLFNBQVMsQ0FBQ1EsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUVsREYsSUFBSSxDQUFDRyxTQUFTLEdBQUcsTUFBTTtRQUN2QkgsSUFBSSxDQUFDTixTQUFTLENBQUNDLEdBQUcsQ0FBQ1MsZ0JBQWdCLENBQUMsQ0FBQ3hDLENBQUMsRUFBRVQsQ0FBQyxDQUFDLEVBQUU2QixTQUFTLENBQUNULEtBQUssQ0FBQyxDQUFDO1FBQzdELElBQUkwQixRQUFRLEVBQUVELElBQUksQ0FBQ04sU0FBUyxDQUFDQyxHQUFHLENBQUMsUUFBUSxDQUFDO01BQzVDLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQztFQUNKLENBQUMsQ0FBQztFQUNGSCx1QkFBdUIsQ0FBQ0ksZ0JBQWdCLENBQ3RDLE9BQU8sRUFDUCxNQUFNUyxpQkFBaUIsQ0FBQ2IsdUJBQXVCLENBQUMsRUFDaEQsSUFDRixDQUFDO0VBRUQsU0FBU2MsbUJBQW1CQSxDQUFDQyxLQUFLLEVBQUU7SUFDbEMsTUFBTUMsY0FBYyxHQUFHaEIsdUJBQXVCLENBQUNpQixhQUFhLENBQUMsU0FBUyxDQUFDO0lBRXZFLElBQUksQ0FBQ0QsY0FBYyxFQUFFO0lBRXJCLE1BQU1FLHFCQUFxQixHQUFHQyxZQUFZLENBQUNILGNBQWMsQ0FBQztJQUMxRCxNQUFNSSxlQUFlLEdBQUc1QixTQUFTLENBQUNULEtBQUssQ0FBQ1osWUFBWSxDQUFDK0MscUJBQXFCLENBQUM7SUFFM0VHLGdCQUFnQixDQUNkSCxxQkFBcUIsRUFDckIxQixTQUFTLENBQUNULEtBQUssRUFDZmlCLHVCQUNGLENBQUM7SUFFRCxJQUFJc0IsY0FBYyxHQUFHLEtBQUs7SUFDMUIsUUFBUVAsS0FBSyxDQUFDUSxHQUFHO01BQ2YsS0FBSyxTQUFTO1FBQ1osSUFBSUwscUJBQXFCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ25DSSxjQUFjLEdBQUc5QixTQUFTLENBQUNULEtBQUssQ0FBQ2xCLFFBQVEsQ0FBQ3VELGVBQWUsRUFBRSxDQUN6REYscUJBQXFCLENBQUMsQ0FBQyxDQUFDLEVBQ3hCQSxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQzdCLENBQUM7UUFDRjtNQUNGLEtBQUssV0FBVztRQUNkLElBQUlBLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNuQ0ksY0FBYyxHQUFHOUIsU0FBUyxDQUFDVCxLQUFLLENBQUNsQixRQUFRLENBQUN1RCxlQUFlLEVBQUUsQ0FDekRGLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFDNUJBLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUN6QixDQUFDO1FBQ0Y7TUFDRixLQUFLLFdBQVc7UUFDZCxJQUFJQSxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsSUFBSTFCLFNBQVMsQ0FBQ1QsS0FBSyxDQUFDaEMsSUFBSSxHQUFHLENBQUMsRUFBRTtRQUMxRHVFLGNBQWMsR0FBRzlCLFNBQVMsQ0FBQ1QsS0FBSyxDQUFDbEIsUUFBUSxDQUFDdUQsZUFBZSxFQUFFLENBQ3pERixxQkFBcUIsQ0FBQyxDQUFDLENBQUMsRUFDeEJBLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FDN0IsQ0FBQztRQUNGO01BQ0YsS0FBSyxZQUFZO1FBQ2YsSUFBSUEscUJBQXFCLENBQUMsQ0FBQyxDQUFDLElBQUkxQixTQUFTLENBQUNULEtBQUssQ0FBQ2hDLElBQUksR0FBRyxDQUFDLEVBQUU7UUFDMUR1RSxjQUFjLEdBQUc5QixTQUFTLENBQUNULEtBQUssQ0FBQ2xCLFFBQVEsQ0FBQ3VELGVBQWUsRUFBRSxDQUN6REYscUJBQXFCLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUM1QkEscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQ3pCLENBQUM7UUFDRjtJQUNKO0lBRUEsSUFBSSxDQUFDSSxjQUFjLEVBQUU7TUFDbkJELGdCQUFnQixDQUNkSCxxQkFBcUIsRUFDckIxQixTQUFTLENBQUNULEtBQUssRUFDZmlCLHVCQUNGLENBQUM7TUFDRDtJQUNGO0lBRUFBLHVCQUF1QixDQUFDd0IsYUFBYSxDQUFDbkMsaUJBQWlCLENBQUM7SUFFeEQsTUFBTW9DLFNBQVMsR0FBR2pDLFNBQVMsQ0FBQ1QsS0FBSyxDQUFDMUIsS0FBSyxDQUFDK0QsZUFBZSxDQUFDO0lBQ3hEQyxnQkFBZ0IsQ0FDZEksU0FBUyxDQUFDbEUsV0FBVyxFQUNyQmlDLFNBQVMsQ0FBQ1QsS0FBSyxFQUNmaUIsdUJBQ0YsQ0FBQztFQUNIO0VBQ0EwQixRQUFRLENBQUN0QixnQkFBZ0IsQ0FBQyxTQUFTLEVBQUVVLG1CQUFtQixDQUFDO0VBRXpELE1BQU1hLHVCQUF1QixHQUFHMUIsYUFBYSxDQUFDUixTQUFTLENBQUNWLEtBQUssRUFBRSxLQUFLLENBQUM7RUFDckU0Qyx1QkFBdUIsQ0FBQ3pCLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUM7RUFFL0R3Qix1QkFBdUIsQ0FBQ3ZCLGdCQUFnQixDQUFDLGVBQWUsRUFBRSxNQUFNO0lBQzlEbEQsS0FBSyxDQUFDQyxJQUFJLENBQUN3RSx1QkFBdUIsQ0FBQ3RCLFFBQVEsQ0FBQyxDQUFDQyxPQUFPLENBQUMsQ0FBQ0MsR0FBRyxFQUFFNUMsQ0FBQyxLQUFLO01BQy9EVCxLQUFLLENBQUNDLElBQUksQ0FBQ29ELEdBQUcsQ0FBQ0YsUUFBUSxDQUFDLENBQUNDLE9BQU8sQ0FBQyxDQUFDRSxJQUFJLEVBQUVwQyxDQUFDLEtBQUs7UUFDNUNvQyxJQUFJLENBQUNHLFNBQVMsR0FBRyxNQUFNO1FBQ3ZCSCxJQUFJLENBQUNOLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDUyxnQkFBZ0IsQ0FBQyxDQUFDeEMsQ0FBQyxFQUFFVCxDQUFDLENBQUMsRUFBRThCLFNBQVMsQ0FBQ1YsS0FBSyxDQUFDLENBQUM7TUFDL0QsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDO0VBQ0osQ0FBQyxDQUFDO0VBRUYsT0FBTyxDQUFDaUIsdUJBQXVCLEVBQUUyQix1QkFBdUIsQ0FBQztBQUMzRDtBQUVPLFNBQVMxQixhQUFhQSxDQUFDbEIsS0FBSyxFQUFFNkMsT0FBTyxFQUFFO0VBQzVDLE1BQU1DLGNBQWMsR0FBR0gsUUFBUSxDQUFDSSxhQUFhLENBQUMsS0FBSyxDQUFDO0VBQ3BERCxjQUFjLENBQUMzQixTQUFTLENBQUNDLEdBQUcsQ0FBQyxPQUFPLENBQUM7RUFFckMsS0FBSyxJQUFJeEMsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHb0IsS0FBSyxDQUFDOUIsS0FBSyxDQUFDRyxNQUFNLEVBQUVPLENBQUMsRUFBRSxFQUFFO0lBQzNDLE1BQU1vRSxZQUFZLEdBQUdMLFFBQVEsQ0FBQ0ksYUFBYSxDQUFDLEtBQUssQ0FBQztJQUNsREMsWUFBWSxDQUFDN0IsU0FBUyxDQUFDQyxHQUFHLENBQUMsS0FBSyxDQUFDO0lBRWpDLEtBQUssSUFBSS9CLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR1csS0FBSyxDQUFDOUIsS0FBSyxDQUFDVSxDQUFDLENBQUMsQ0FBQ1AsTUFBTSxFQUFFZ0IsQ0FBQyxFQUFFLEVBQUU7TUFDOUMsTUFBTTRELGFBQWEsR0FBR04sUUFBUSxDQUFDSSxhQUFhLENBQUMsUUFBUSxDQUFDO01BQ3RERSxhQUFhLENBQUM5QixTQUFTLENBQUNDLEdBQUcsQ0FBQyxNQUFNLENBQUM7TUFDbkM2QixhQUFhLENBQUM5QixTQUFTLENBQUNDLEdBQUcsQ0FBQ1MsZ0JBQWdCLENBQUMsQ0FBQ3hDLENBQUMsRUFBRVQsQ0FBQyxDQUFDLEVBQUVvQixLQUFLLENBQUMsQ0FBQztNQUU1RCxJQUFJLENBQUM2QyxPQUFPLEVBQUU7UUFDWkksYUFBYSxDQUFDNUIsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE1BQU07VUFDNUMsTUFBTUksSUFBSSxHQUFHekIsS0FBSyxDQUFDOUIsS0FBSyxDQUFDVSxDQUFDLENBQUMsQ0FBQ1MsQ0FBQyxDQUFDO1VBQzlCLElBQUlvQyxJQUFJLEtBQUtsRSx5REFBUyxDQUFDRyxLQUFLLElBQUkrRCxJQUFJLEtBQUtsRSx5REFBUyxDQUFDSyxJQUFJLEVBQUU7VUFFekRvQyxLQUFLLENBQUNWLGFBQWEsQ0FBQyxDQUFDRCxDQUFDLEVBQUVULENBQUMsQ0FBQyxDQUFDO1VBQzNCa0UsY0FBYyxDQUFDTCxhQUFhLENBQUNuQyxpQkFBaUIsQ0FBQztRQUNqRCxDQUFDLENBQUM7TUFDSjtNQUVBLElBQUl1QyxPQUFPLEVBQUU7UUFDWEksYUFBYSxDQUFDNUIsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE1BQU07VUFDNUMsSUFBSTRCLGFBQWEsQ0FBQzlCLFNBQVMsQ0FBQ1EsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzVDVyxnQkFBZ0IsQ0FBQyxDQUFDakQsQ0FBQyxFQUFFVCxDQUFDLENBQUMsRUFBRW9CLEtBQUssRUFBRThDLGNBQWMsQ0FBQztVQUNqRDtRQUNGLENBQUMsQ0FBQztRQUNGRyxhQUFhLENBQUM1QixnQkFBZ0IsQ0FBQyxhQUFhLEVBQUdXLEtBQUssSUFBSztVQUN2RCxJQUFJaUIsYUFBYSxDQUFDOUIsU0FBUyxDQUFDUSxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDNUNLLEtBQUssQ0FBQ2tCLGNBQWMsQ0FBQyxDQUFDO1lBRXRCLE1BQU1uRSxTQUFTLEdBQUdpQixLQUFLLENBQUNaLFlBQVksQ0FBQ2dELFlBQVksQ0FBQ2EsYUFBYSxDQUFDLENBQUM7WUFDakUsTUFBTWpFLElBQUksR0FBR2dCLEtBQUssQ0FBQzFCLEtBQUssQ0FBQ1MsU0FBUyxDQUFDO1lBRW5DLElBQUksQ0FBQ2tFLGFBQWEsQ0FBQzlCLFNBQVMsQ0FBQ1EsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2NBQy9DVyxnQkFBZ0IsQ0FBQ3RELElBQUksQ0FBQ1IsV0FBVyxFQUFFd0IsS0FBSyxFQUFFOEMsY0FBYyxDQUFDO1lBQzNEO1lBRUEsSUFBSTlDLEtBQUssQ0FBQ2QsVUFBVSxDQUFDSCxTQUFTLENBQUMsRUFBRTtjQUMvQitDLGlCQUFpQixDQUFDZ0IsY0FBYyxDQUFDO2NBQ2pDUixnQkFBZ0IsQ0FBQ3RELElBQUksQ0FBQ1IsV0FBVyxFQUFFd0IsS0FBSyxFQUFFOEMsY0FBYyxDQUFDO2NBQ3pEQSxjQUFjLENBQUNMLGFBQWEsQ0FBQ25DLGlCQUFpQixDQUFDO1lBQ2pEO1VBQ0Y7UUFDRixDQUFDLENBQUM7TUFDSjtNQUNBMEMsWUFBWSxDQUFDRyxXQUFXLENBQUNGLGFBQWEsQ0FBQztJQUN6QztJQUNBSCxjQUFjLENBQUNLLFdBQVcsQ0FBQ0gsWUFBWSxDQUFDO0VBQzFDO0VBRUEsT0FBT0YsY0FBYztBQUN2QjtBQUVBLFNBQVNWLFlBQVlBLENBQUNYLElBQUksRUFBRTtFQUMxQixPQUFPLENBQ0x0RCxLQUFLLENBQUNpRixTQUFTLENBQUNDLE9BQU8sQ0FBQ0MsSUFBSSxDQUFDN0IsSUFBSSxDQUFDOEIsVUFBVSxDQUFDakMsUUFBUSxFQUFFRyxJQUFJLENBQUMsRUFDNUR0RCxLQUFLLENBQUNpRixTQUFTLENBQUNDLE9BQU8sQ0FBQ0MsSUFBSSxDQUMxQjdCLElBQUksQ0FBQzhCLFVBQVUsQ0FBQ0EsVUFBVSxDQUFDakMsUUFBUSxFQUNuQ0csSUFBSSxDQUFDOEIsVUFDUCxDQUFDLENBQ0Y7QUFDSDtBQUVBLFNBQVMxQixnQkFBZ0JBLENBQUNyRCxXQUFXLEVBQUV3QixLQUFLLEVBQUU7RUFDNUMsTUFBTXlCLElBQUksR0FBR3pCLEtBQUssQ0FBQzlCLEtBQUssQ0FBQ00sV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNBLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN4RCxRQUFRaUQsSUFBSTtJQUNWLEtBQUtsRSx5REFBUyxDQUFDRyxLQUFLO01BQ2xCLE9BQU8sT0FBTztJQUNoQixLQUFLSCx5REFBUyxDQUFDSSxJQUFJO01BQ2pCLE9BQU8sTUFBTTtJQUNmLEtBQUtKLHlEQUFTLENBQUNLLElBQUk7TUFDakIsT0FBTyxNQUFNO0lBQ2YsS0FBS0wseURBQVMsQ0FBQ00sR0FBRztNQUNoQixPQUFPLEtBQUs7SUFDZCxLQUFLTix5REFBUyxDQUFDTyxJQUFJO01BQ2pCLE9BQU8sTUFBTTtFQUNqQjtBQUNGO0FBRUEsU0FBU2dFLGlCQUFpQkEsQ0FBQ2dCLGNBQWMsRUFBRTtFQUN6QyxNQUFNVSxXQUFXLEdBQUdWLGNBQWMsQ0FBQ1csZ0JBQWdCLENBQUMsU0FBUyxDQUFDO0VBQzlELElBQUlELFdBQVcsQ0FBQ25GLE1BQU0sS0FBSyxDQUFDLEVBQUU7RUFFOUIsS0FBSyxNQUFNb0QsSUFBSSxJQUFJK0IsV0FBVyxFQUFFO0lBQzlCL0IsSUFBSSxDQUFDTixTQUFTLENBQUN1QyxNQUFNLENBQUMsUUFBUSxDQUFDO0VBQ2pDO0FBQ0Y7QUFFQSxTQUFTcEIsZ0JBQWdCQSxDQUFDOUQsV0FBVyxFQUFFd0IsS0FBSyxFQUFFOEMsY0FBYyxFQUFFO0VBQzVELE1BQU1yQixJQUFJLEdBQUdxQixjQUFjLENBQUN4QixRQUFRLENBQUM5QyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzhDLFFBQVEsQ0FBQzlDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUU3RSxJQUFJLENBQUNpRCxJQUFJLENBQUNOLFNBQVMsQ0FBQ1EsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO0VBRXRDLE1BQU01QyxTQUFTLEdBQUdpQixLQUFLLENBQUNaLFlBQVksQ0FBQ1osV0FBVyxDQUFDO0VBQ2pELElBQUlRLElBQUksR0FBR2dCLEtBQUssQ0FBQzFCLEtBQUssQ0FBQ1MsU0FBUyxDQUFDO0VBRWpDLFFBQVFDLElBQUksQ0FBQ1AsV0FBVztJQUN0QixLQUFLbkIsMERBQWUsQ0FBQ29CLFVBQVU7TUFDN0IsS0FDRSxJQUFJRSxDQUFDLEdBQUdJLElBQUksQ0FBQ1IsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUMzQkksQ0FBQyxJQUFJSSxJQUFJLENBQUNSLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBR1EsSUFBSSxDQUFDWCxNQUFNLEdBQUcsQ0FBQyxFQUMxQ08sQ0FBQyxFQUFFLEVBQ0g7UUFDQWtFLGNBQWMsQ0FBQ3hCLFFBQVEsQ0FBQ3RDLElBQUksQ0FBQ1IsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM4QyxRQUFRLENBQ25EMUMsQ0FBQyxDQUNGLENBQUN1QyxTQUFTLENBQUN3QyxNQUFNLENBQUMsUUFBUSxDQUFDO01BQzlCO01BQ0E7SUFDRixLQUFLckcsMERBQWUsQ0FBQ3FCLFFBQVE7TUFDM0IsS0FDRSxJQUFJQyxDQUFDLEdBQUdJLElBQUksQ0FBQ1IsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUMzQkksQ0FBQyxJQUFJSSxJQUFJLENBQUNSLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBR1EsSUFBSSxDQUFDWCxNQUFNLEdBQUcsQ0FBQyxFQUMxQ08sQ0FBQyxFQUFFLEVBQ0g7UUFDQWtFLGNBQWMsQ0FBQ3hCLFFBQVEsQ0FBQzFDLENBQUMsQ0FBQyxDQUFDMEMsUUFBUSxDQUNqQ3RDLElBQUksQ0FBQ1IsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUNwQixDQUFDMkMsU0FBUyxDQUFDd0MsTUFBTSxDQUFDLFFBQVEsQ0FBQztNQUM5QjtNQUNBO0VBQ0o7QUFDRjs7Ozs7O1VDdFJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEEsOENBQThDOzs7OztXQ0E5QztXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7O0FDTmtEO0FBQ3RCO0FBRTVCQyxPQUFPLENBQUNDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQztBQUVwQyxNQUFNQyxJQUFJLEdBQUduQixRQUFRLENBQUNvQixjQUFjLENBQUMsTUFBTSxDQUFDO0FBRTVDRCxJQUFJLENBQUNFLFNBQVMsR0FBRztBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFFRCxNQUFNQyxlQUFlLEdBQUd0QixRQUFRLENBQUNULGFBQWEsQ0FBQyxTQUFTLENBQUM7QUFDekQrQixlQUFlLENBQUNDLE1BQU0sQ0FBQyxHQUFHMUQsK0RBQWUsQ0FBQyxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL2luZGV4LmNzcz80ZTQyIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29yZS9nYW1lQm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb3JlL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvcmUvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbS9ib2FyZHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IHsgY3JlYXRlU2hpcCwgU2hpcE9yaWVudGF0aW9uIH0gZnJvbSBcIi4vc2hpcC5qc1wiO1xuXG5leHBvcnQgY29uc3QgQ2VsbFN0YXRlID0gT2JqZWN0LmZyZWV6ZSh7XG4gIEVNUFRZOiAwLFxuICBNSVNTOiAxLFxuICBTSElQOiAyLFxuICBISVQ6IDMsXG4gIFNVTks6IDQsXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUdhbWVCb2FyZChzaXplKSB7XG4gIGlmIChzaXplIDw9IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGJvYXJkIHNpemVcIik7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHNpemUsXG4gICAgY2VsbHM6IEFycmF5LmZyb20oeyBsZW5ndGg6IHNpemUgfSwgKCkgPT5cbiAgICAgIEFycmF5LmZyb20oeyBsZW5ndGg6IHNpemUgfSwgKCkgPT4gQ2VsbFN0YXRlLkVNUFRZKSxcbiAgICApLFxuICAgIHNoaXBzOiBbXSxcblxuICAgIHBsYWNlU2hpcDogZnVuY3Rpb24gKGNvb3JkaW5hdGVzLCBsZW5ndGgsIG9yaWVudGF0aW9uKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGNvb3JkaW5hdGVzWzBdIDwgMCB8fFxuICAgICAgICBjb29yZGluYXRlc1sxXSA8IDAgfHxcbiAgICAgICAgY29vcmRpbmF0ZXNbMF0gPj0gc2l6ZSB8fFxuICAgICAgICBjb29yZGluYXRlc1sxXSA+PSBzaXplXG4gICAgICApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IHBsYWNlIHNoaXAgb3V0c2lkZSB0aGUgYm9hcmRcIik7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAob3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMICYmXG4gICAgICAgICAgY29vcmRpbmF0ZXNbMF0gKyBsZW5ndGggLSAxID49IHNpemUpIHx8XG4gICAgICAgIChvcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMICYmXG4gICAgICAgICAgY29vcmRpbmF0ZXNbMV0gKyBsZW5ndGggLSAxID49IHNpemUpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAob3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSBjb29yZGluYXRlc1swXTsgaSA8PSBjb29yZGluYXRlc1swXSArIGxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgIGlmICh0aGlzLmNlbGxzW2Nvb3JkaW5hdGVzWzFdXVtpXSAhPT0gQ2VsbFN0YXRlLkVNUFRZKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKG9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IGNvb3JkaW5hdGVzWzFdOyBpIDw9IGNvb3JkaW5hdGVzWzFdICsgbGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgaWYgKHRoaXMuY2VsbHNbaV1bY29vcmRpbmF0ZXNbMF1dICE9PSBDZWxsU3RhdGUuRU1QVFkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5zaGlwcy5wdXNoKGNyZWF0ZVNoaXAobGVuZ3RoLCBjb29yZGluYXRlcywgb3JpZW50YXRpb24pKTtcblxuICAgICAgaWYgKG9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCkge1xuICAgICAgICBmb3IgKGxldCBpID0gY29vcmRpbmF0ZXNbMF07IGkgPD0gY29vcmRpbmF0ZXNbMF0gKyBsZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICB0aGlzLmNlbGxzW2Nvb3JkaW5hdGVzWzFdXVtpXSA9IENlbGxTdGF0ZS5TSElQO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKG9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IGNvb3JkaW5hdGVzWzFdOyBpIDw9IGNvb3JkaW5hdGVzWzFdICsgbGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5jZWxsc1tpXVtjb29yZGluYXRlc1swXV0gPSBDZWxsU3RhdGUuU0hJUDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuXG4gICAgbW92ZVNoaXA6IGZ1bmN0aW9uIChzaGlwSW5kZXgsIGNvb3JkaW5hdGVzKSB7XG4gICAgICBjb25zdCBzaGlwID0gdGhpcy5zaGlwc1tzaGlwSW5kZXhdO1xuICAgICAgaWYgKCFzaGlwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlNoaXAgZG9lcyBub3QgZXhpc3RcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCkge1xuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1swXTtcbiAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMF0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgaSsrXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuY2VsbHNbc2hpcC5jb29yZGluYXRlc1sxXV1baV0gPSBDZWxsU3RhdGUuRU1QVFk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMKSB7XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzFdO1xuICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1sxXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5jZWxsc1tpXVtzaGlwLmNvb3JkaW5hdGVzWzBdXSA9IENlbGxTdGF0ZS5FTVBUWTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMucGxhY2VTaGlwKGNvb3JkaW5hdGVzLCBzaGlwLmxlbmd0aCwgc2hpcC5vcmllbnRhdGlvbikpIHtcbiAgICAgICAgaWYgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMKSB7XG4gICAgICAgICAgZm9yIChcbiAgICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1swXTtcbiAgICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGkrK1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5jZWxsc1tzaGlwLmNvb3JkaW5hdGVzWzFdXVtpXSA9IENlbGxTdGF0ZS5TSElQO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwpIHtcbiAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzFdO1xuICAgICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgICAgaSsrXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmNlbGxzW2ldW3NoaXAuY29vcmRpbmF0ZXNbMF1dID0gQ2VsbFN0YXRlLlNISVA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zaGlwc1tzaGlwSW5kZXhdID0gdGhpcy5zaGlwcy5wb3AoKTtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIHJvdGF0ZVNoaXA6IGZ1bmN0aW9uIChzaGlwSW5kZXgpIHtcbiAgICAgIGNvbnN0IHNoaXAgPSB0aGlzLnNoaXBzW3NoaXBJbmRleF07XG4gICAgICBpZiAoIXNoaXApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2hpcCBkb2VzIG5vdCBleGlzdFwiKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbmV3T3JpZW50YXRpb24gPVxuICAgICAgICBzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTFxuICAgICAgICAgID8gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMXG4gICAgICAgICAgOiBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTDtcblxuICAgICAgaWYgKG5ld09yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCkge1xuICAgICAgICBpZiAoc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMSA+PSB0aGlzLnNpemUpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1swXSArIDE7XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICBpZiAodGhpcy5jZWxsc1tzaGlwLmNvb3JkaW5hdGVzWzFdXVtpXSAhPT0gQ2VsbFN0YXRlLkVNUFRZKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKG5ld09yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwpIHtcbiAgICAgICAgaWYgKHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDEgPj0gdGhpcy5zaXplKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyAxO1xuICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1sxXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKHRoaXMuY2VsbHNbaV1bc2hpcC5jb29yZGluYXRlc1swXV0gIT09IENlbGxTdGF0ZS5FTVBUWSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobmV3T3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMKSB7XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzFdO1xuICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1sxXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5jZWxsc1tpXVtzaGlwLmNvb3JkaW5hdGVzWzBdXSA9IENlbGxTdGF0ZS5FTVBUWTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1swXTtcbiAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMF0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgaSsrXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuY2VsbHNbc2hpcC5jb29yZGluYXRlc1sxXV1baV0gPSBDZWxsU3RhdGUuU0hJUDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChuZXdPcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMKSB7XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5jZWxsc1tzaGlwLmNvb3JkaW5hdGVzWzFdXVtpXSA9IENlbGxTdGF0ZS5FTVBUWTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1sxXTtcbiAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgaSsrXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuY2VsbHNbaV1bc2hpcC5jb29yZGluYXRlc1swXV0gPSBDZWxsU3RhdGUuU0hJUDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzaGlwLm9yaWVudGF0aW9uID0gbmV3T3JpZW50YXRpb247XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuXG4gICAgZ2V0U2hpcEluZGV4OiBmdW5jdGlvbiAoY29vcmRpbmF0ZXMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5zaGlwc1tpXS5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwpIHtcbiAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgbGV0IGogPSB0aGlzLnNoaXBzW2ldLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgICAgICAgaiA8PSB0aGlzLnNoaXBzW2ldLmNvb3JkaW5hdGVzWzBdICsgdGhpcy5zaGlwc1tpXS5sZW5ndGggLSAxO1xuICAgICAgICAgICAgaisrXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGNvb3JkaW5hdGVzWzBdID09PSBqICYmXG4gICAgICAgICAgICAgIGNvb3JkaW5hdGVzWzFdID09PSB0aGlzLnNoaXBzW2ldLmNvb3JkaW5hdGVzWzFdXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2hpcHNbaV0ub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICBsZXQgaiA9IHRoaXMuc2hpcHNbaV0uY29vcmRpbmF0ZXNbMV07XG4gICAgICAgICAgICBqIDw9IHRoaXMuc2hpcHNbaV0uY29vcmRpbmF0ZXNbMV0gKyB0aGlzLnNoaXBzW2ldLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBqKytcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgY29vcmRpbmF0ZXNbMF0gPT09IHRoaXMuc2hpcHNbaV0uY29vcmRpbmF0ZXNbMF0gJiZcbiAgICAgICAgICAgICAgY29vcmRpbmF0ZXNbMV0gPT09IGpcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgTm8gc2hpcCBmb3VuZCBhdCBnaXZlbiBpbmRleDogWyR7Y29vcmRpbmF0ZXNbMF19LCAke2Nvb3JkaW5hdGVzWzFdfV1gLFxuICAgICAgKTtcbiAgICB9LFxuXG4gICAgcmVjZWl2ZUF0dGFjazogZnVuY3Rpb24gKGNvb3JkaW5hdGVzKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGNvb3JkaW5hdGVzWzBdIDwgMCB8fFxuICAgICAgICBjb29yZGluYXRlc1sxXSA8IDAgfHxcbiAgICAgICAgY29vcmRpbmF0ZXNbMF0gPj0gc2l6ZSB8fFxuICAgICAgICBjb29yZGluYXRlc1sxXSA+PSBzaXplXG4gICAgICApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGF0dGFjayBvdXRzaWRlIHRoZSBib2FyZFwiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICB0aGlzLmNlbGxzW2Nvb3JkaW5hdGVzWzFdXVtjb29yZGluYXRlc1swXV0gIT09IENlbGxTdGF0ZS5FTVBUWSAmJlxuICAgICAgICB0aGlzLmNlbGxzW2Nvb3JkaW5hdGVzWzFdXVtjb29yZGluYXRlc1swXV0gIT09IENlbGxTdGF0ZS5TSElQXG4gICAgICApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2VsbCBoYXMgYWxyZWFkeSBiZWVuIGF0dGFja2VkXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5jZWxsc1tjb29yZGluYXRlc1sxXV1bY29vcmRpbmF0ZXNbMF1dICE9PSBDZWxsU3RhdGUuU0hJUCkge1xuICAgICAgICB0aGlzLmNlbGxzW2Nvb3JkaW5hdGVzWzFdXVtjb29yZGluYXRlc1swXV0gPSBDZWxsU3RhdGUuTUlTUztcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGNvbnN0IHNoaXAgb2YgdGhpcy5zaGlwcykge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMICYmXG4gICAgICAgICAgICBjb29yZGluYXRlc1sxXSA9PT0gc2hpcC5jb29yZGluYXRlc1sxXSAmJlxuICAgICAgICAgICAgY29vcmRpbmF0ZXNbMF0gPj0gc2hpcC5jb29yZGluYXRlc1swXSAmJlxuICAgICAgICAgICAgY29vcmRpbmF0ZXNbMF0gPD0gc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMSkgfHxcbiAgICAgICAgICAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMICYmXG4gICAgICAgICAgICBjb29yZGluYXRlc1swXSA9PT0gc2hpcC5jb29yZGluYXRlc1swXSAmJlxuICAgICAgICAgICAgY29vcmRpbmF0ZXNbMV0gPj0gc2hpcC5jb29yZGluYXRlc1sxXSAmJlxuICAgICAgICAgICAgY29vcmRpbmF0ZXNbMV0gPD0gc2hpcC5jb29yZGluYXRlc1sxXSArIHNoaXAubGVuZ3RoIC0gMSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgc2hpcC5oaXQoKTtcblxuICAgICAgICAgIGlmIChzaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgICBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwpIHtcbiAgICAgICAgICAgICAgZm9yIChcbiAgICAgICAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMF07XG4gICAgICAgICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgIGkrK1xuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW3NoaXAuY29vcmRpbmF0ZXNbMV1dW2ldID0gQ2VsbFN0YXRlLlNVTks7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMKSB7XG4gICAgICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzFdO1xuICAgICAgICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1sxXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICBpKytcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jZWxsc1tpXVtzaGlwLmNvb3JkaW5hdGVzWzBdXSA9IENlbGxTdGF0ZS5TVU5LO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2VsbHNbY29vcmRpbmF0ZXNbMV1dW2Nvb3JkaW5hdGVzWzBdXSA9IENlbGxTdGF0ZS5ISVQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgaXNGbGVldERlc3Ryb3llZDogZnVuY3Rpb24gKCkge1xuICAgICAgZm9yIChjb25zdCBzaGlwIG9mIHRoaXMuc2hpcHMpIHtcbiAgICAgICAgaWYgKCFzaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gIH07XG59XG4iLCJpbXBvcnQgeyBjcmVhdGVHYW1lQm9hcmQgfSBmcm9tIFwiLi9nYW1lQm9hcmQuanNcIjtcblxuZXhwb3J0IGNvbnN0IFBsYXllclR5cGUgPSBPYmplY3QuZnJlZXplKHtcbiAgSFVNQU46IFwiSFVNQU5cIixcbiAgQ09NUFVURVI6IFwiQ09NUFVURVJcIixcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUGxheWVyKHR5cGUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlLFxuICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgYm9hcmQ6IGNyZWF0ZUdhbWVCb2FyZCgxMCksXG5cbiAgICBhY3RpdmF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRoaXMuYWN0aXZlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBsYXllciBpcyBhbHJlYWR5IGFjdGl2ZVwiKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgIH0sXG4gICAgZGVhY3RpdmF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCF0aGlzLmFjdGl2ZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQbGF5ZXIgaXMgYWxyZWFkeSBpbmFjdGl2ZVwiKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICB9LFxuICB9O1xufVxuIiwiZXhwb3J0IGNvbnN0IFNoaXBPcmllbnRhdGlvbiA9IE9iamVjdC5mcmVlemUoe1xuICBIT1JJWk9OVEFMOiBcIkhPUklaT05UQUxcIixcbiAgVkVSVElDQUw6IFwiVkVSVElDQUxcIixcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2hpcChcbiAgbGVuZ3RoLFxuICBjb29yZGluYXRlcyA9IFt1bmRlZmluZWQsIHVuZGVmaW5lZF0sXG4gIG9yaWVudGF0aW9uID0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwsXG4pIHtcbiAgaWYgKGxlbmd0aCA8IDEpIHJldHVybiB1bmRlZmluZWQ7XG4gIHJldHVybiB7XG4gICAgbGVuZ3RoLFxuICAgIGNvb3JkaW5hdGVzLFxuICAgIG9yaWVudGF0aW9uLFxuICAgIGhpdHM6IDAsXG5cbiAgICBoaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLmhpdHMgPCB0aGlzLmxlbmd0aCkge1xuICAgICAgICB0aGlzLmhpdHMrKztcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgaXNTdW5rOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5oaXRzID09PSB0aGlzLmxlbmd0aDtcbiAgICB9LFxuICB9O1xufVxuIiwiaW1wb3J0IHsgQ2VsbFN0YXRlIH0gZnJvbSBcIi4uL2NvcmUvZ2FtZUJvYXJkLmpzXCI7XG5pbXBvcnQgeyBjcmVhdGVQbGF5ZXIsIFBsYXllclR5cGUgfSBmcm9tIFwiLi4vY29yZS9wbGF5ZXIuanNcIjtcbmltcG9ydCB7IFNoaXBPcmllbnRhdGlvbiB9IGZyb20gXCIuLi9jb3JlL3NoaXAuanNcIjtcblxuY29uc3QgcmVmcmVzaEJvYXJkRXZlbnQgPSBuZXcgRXZlbnQoXCJyZWZyZXNoLWJvYXJkXCIpO1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBHYW1lQm9hcmRzKCkge1xuICBjb25zdCBwbGF5ZXJPbmUgPSBjcmVhdGVQbGF5ZXIoUGxheWVyVHlwZS5IVU1BTik7XG4gIGNvbnN0IHBsYXllclR3byA9IGNyZWF0ZVBsYXllcihQbGF5ZXJUeXBlLkNPTVBVVEVSKTtcblxuICBjb25zdCBzaGlwcyA9IFs1LCA0LCAzLCAzLCAyXTtcblxuICBmb3IgKGNvbnN0IHNoaXAgb2Ygc2hpcHMpIHtcbiAgICBsZXQgcGxhY2VkID0gZmFsc2U7XG4gICAgd2hpbGUgKCFwbGFjZWQpIHtcbiAgICAgIGNvbnN0IG9yaWVudGF0aW9uID1cbiAgICAgICAgTWF0aC5yYW5kb20oKSA+IDAuNVxuICAgICAgICAgID8gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUxcbiAgICAgICAgICA6IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTDtcblxuICAgICAgY29uc3QgeCA9IE1hdGguZmxvb3IoXG4gICAgICAgIE1hdGgucmFuZG9tKCkgKlxuICAgICAgICAgICgxMCAtIChvcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwgPyBzaGlwIDogMCkpLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKFxuICAgICAgICBNYXRoLnJhbmRvbSgpICpcbiAgICAgICAgICAoMTAgLSAob3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCA/IHNoaXAgOiAwKSksXG4gICAgICApO1xuXG4gICAgICBwbGFjZWQgPSBwbGF5ZXJPbmUuYm9hcmQucGxhY2VTaGlwKFt4LCB5XSwgc2hpcCwgb3JpZW50YXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIGZvciAoY29uc3Qgc2hpcCBvZiBzaGlwcykge1xuICAgIGxldCBwbGFjZWQgPSBmYWxzZTtcbiAgICB3aGlsZSAoIXBsYWNlZCkge1xuICAgICAgY29uc3Qgb3JpZW50YXRpb24gPVxuICAgICAgICBNYXRoLnJhbmRvbSgpID4gMC41XG4gICAgICAgICAgPyBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTFxuICAgICAgICAgIDogU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMO1xuXG4gICAgICBjb25zdCB4ID0gTWF0aC5mbG9vcihcbiAgICAgICAgTWF0aC5yYW5kb20oKSAqXG4gICAgICAgICAgKDEwIC0gKG9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCA/IHNoaXAgOiAwKSksXG4gICAgICApO1xuICAgICAgY29uc3QgeSA9IE1hdGguZmxvb3IoXG4gICAgICAgIE1hdGgucmFuZG9tKCkgKlxuICAgICAgICAgICgxMCAtIChvcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMID8gc2hpcCA6IDApKSxcbiAgICAgICk7XG5cbiAgICAgIHBsYWNlZCA9IHBsYXllclR3by5ib2FyZC5wbGFjZVNoaXAoW3gsIHldLCBzaGlwLCBvcmllbnRhdGlvbik7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgcGxheWVyT25lQm9hcmRDb21wb25lbnQgPSBnZW5lcmF0ZUJvYXJkKHBsYXllck9uZS5ib2FyZCwgdHJ1ZSk7XG4gIHBsYXllck9uZUJvYXJkQ29tcG9uZW50LmNsYXNzTGlzdC5hZGQoXCJwbGF5ZXItb25lXCIsIFwiaHVtYW5cIik7XG5cbiAgcGxheWVyT25lQm9hcmRDb21wb25lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInJlZnJlc2gtYm9hcmRcIiwgKCkgPT4ge1xuICAgIEFycmF5LmZyb20ocGxheWVyT25lQm9hcmRDb21wb25lbnQuY2hpbGRyZW4pLmZvckVhY2goKHJvdywgaSkgPT4ge1xuICAgICAgQXJyYXkuZnJvbShyb3cuY2hpbGRyZW4pLmZvckVhY2goKGNlbGwsIGopID0+IHtcbiAgICAgICAgY29uc3QgaXNNb3ZpbmcgPSBjZWxsLmNsYXNzTGlzdC5jb250YWlucyhcIm1vdmluZ1wiKTtcblxuICAgICAgICBjZWxsLmNsYXNzTmFtZSA9IFwiY2VsbFwiO1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoZ2V0Q2VsbENsYXNzTmFtZShbaiwgaV0sIHBsYXllck9uZS5ib2FyZCkpO1xuICAgICAgICBpZiAoaXNNb3ZpbmcpIGNlbGwuY2xhc3NMaXN0LmFkZChcIm1vdmluZ1wiKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbiAgcGxheWVyT25lQm9hcmRDb21wb25lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICBcImNsaWNrXCIsXG4gICAgKCkgPT4gY2xlYXJTaGlwTW92ZW1lbnQocGxheWVyT25lQm9hcmRDb21wb25lbnQpLFxuICAgIHRydWUsXG4gICk7XG5cbiAgZnVuY3Rpb24gc2hpcE1vdmVtZW50SGFuZGxlcihldmVudCkge1xuICAgIGNvbnN0IG1vdmluZ1NoaXBDZWxsID0gcGxheWVyT25lQm9hcmRDb21wb25lbnQucXVlcnlTZWxlY3RvcihcIi5tb3ZpbmdcIik7XG5cbiAgICBpZiAoIW1vdmluZ1NoaXBDZWxsKSByZXR1cm47XG5cbiAgICBjb25zdCBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXMgPSBnZXRDZWxsSW5kZXgobW92aW5nU2hpcENlbGwpO1xuICAgIGNvbnN0IG1vdmluZ1NoaXBJbmRleCA9IHBsYXllck9uZS5ib2FyZC5nZXRTaGlwSW5kZXgobW92aW5nU2hpcENvb3JkaW5hdGVzKTtcblxuICAgIHRvZ2dsZVNoaXBNb3Rpb24oXG4gICAgICBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXMsXG4gICAgICBwbGF5ZXJPbmUuYm9hcmQsXG4gICAgICBwbGF5ZXJPbmVCb2FyZENvbXBvbmVudCxcbiAgICApO1xuXG4gICAgbGV0IG1vdmVTdWNjZXNzZnVsID0gZmFsc2U7XG4gICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgIGNhc2UgXCJBcnJvd1VwXCI6XG4gICAgICAgIGlmIChtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMV0gPD0gMCkgYnJlYWs7XG4gICAgICAgIG1vdmVTdWNjZXNzZnVsID0gcGxheWVyT25lLmJvYXJkLm1vdmVTaGlwKG1vdmluZ1NoaXBJbmRleCwgW1xuICAgICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlc1swXSxcbiAgICAgICAgICBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMV0gLSAxLFxuICAgICAgICBdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiQXJyb3dMZWZ0XCI6XG4gICAgICAgIGlmIChtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMF0gPD0gMCkgYnJlYWs7XG4gICAgICAgIG1vdmVTdWNjZXNzZnVsID0gcGxheWVyT25lLmJvYXJkLm1vdmVTaGlwKG1vdmluZ1NoaXBJbmRleCwgW1xuICAgICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlc1swXSAtIDEsXG4gICAgICAgICAgbW92aW5nU2hpcENvb3JkaW5hdGVzWzFdLFxuICAgICAgICBdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiQXJyb3dEb3duXCI6XG4gICAgICAgIGlmIChtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMV0gPj0gcGxheWVyT25lLmJvYXJkLnNpemUgLSAxKSBicmVhaztcbiAgICAgICAgbW92ZVN1Y2Nlc3NmdWwgPSBwbGF5ZXJPbmUuYm9hcmQubW92ZVNoaXAobW92aW5nU2hpcEluZGV4LCBbXG4gICAgICAgICAgbW92aW5nU2hpcENvb3JkaW5hdGVzWzBdLFxuICAgICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlc1sxXSArIDEsXG4gICAgICAgIF0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJBcnJvd1JpZ2h0XCI6XG4gICAgICAgIGlmIChtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMF0gPj0gcGxheWVyT25lLmJvYXJkLnNpemUgLSAxKSBicmVhaztcbiAgICAgICAgbW92ZVN1Y2Nlc3NmdWwgPSBwbGF5ZXJPbmUuYm9hcmQubW92ZVNoaXAobW92aW5nU2hpcEluZGV4LCBbXG4gICAgICAgICAgbW92aW5nU2hpcENvb3JkaW5hdGVzWzBdICsgMSxcbiAgICAgICAgICBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMV0sXG4gICAgICAgIF0pO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoIW1vdmVTdWNjZXNzZnVsKSB7XG4gICAgICB0b2dnbGVTaGlwTW90aW9uKFxuICAgICAgICBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXMsXG4gICAgICAgIHBsYXllck9uZS5ib2FyZCxcbiAgICAgICAgcGxheWVyT25lQm9hcmRDb21wb25lbnQsXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHBsYXllck9uZUJvYXJkQ29tcG9uZW50LmRpc3BhdGNoRXZlbnQocmVmcmVzaEJvYXJkRXZlbnQpO1xuXG4gICAgY29uc3QgbW92ZWRTaGlwID0gcGxheWVyT25lLmJvYXJkLnNoaXBzW21vdmluZ1NoaXBJbmRleF07XG4gICAgdG9nZ2xlU2hpcE1vdGlvbihcbiAgICAgIG1vdmVkU2hpcC5jb29yZGluYXRlcyxcbiAgICAgIHBsYXllck9uZS5ib2FyZCxcbiAgICAgIHBsYXllck9uZUJvYXJkQ29tcG9uZW50LFxuICAgICk7XG4gIH1cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgc2hpcE1vdmVtZW50SGFuZGxlcik7XG5cbiAgY29uc3QgcGxheWVyVHdvQm9hcmRDb21wb25lbnQgPSBnZW5lcmF0ZUJvYXJkKHBsYXllclR3by5ib2FyZCwgZmFsc2UpO1xuICBwbGF5ZXJUd29Cb2FyZENvbXBvbmVudC5jbGFzc0xpc3QuYWRkKFwicGxheWVyLXR3b1wiLCBcImNvbXB1dGVyXCIpO1xuXG4gIHBsYXllclR3b0JvYXJkQ29tcG9uZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJyZWZyZXNoLWJvYXJkXCIsICgpID0+IHtcbiAgICBBcnJheS5mcm9tKHBsYXllclR3b0JvYXJkQ29tcG9uZW50LmNoaWxkcmVuKS5mb3JFYWNoKChyb3csIGkpID0+IHtcbiAgICAgIEFycmF5LmZyb20ocm93LmNoaWxkcmVuKS5mb3JFYWNoKChjZWxsLCBqKSA9PiB7XG4gICAgICAgIGNlbGwuY2xhc3NOYW1lID0gXCJjZWxsXCI7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChnZXRDZWxsQ2xhc3NOYW1lKFtqLCBpXSwgcGxheWVyVHdvLmJvYXJkKSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIFtwbGF5ZXJPbmVCb2FyZENvbXBvbmVudCwgcGxheWVyVHdvQm9hcmRDb21wb25lbnRdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVCb2FyZChib2FyZCwgbXV0YWJsZSkge1xuICBjb25zdCBib2FyZENvbXBvbmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGJvYXJkQ29tcG9uZW50LmNsYXNzTGlzdC5hZGQoXCJib2FyZFwiKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGJvYXJkLmNlbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qgcm93Q29tcG9uZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICByb3dDb21wb25lbnQuY2xhc3NMaXN0LmFkZChcInJvd1wiKTtcblxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgYm9hcmQuY2VsbHNbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgIGNvbnN0IGNlbGxDb21wb25lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgY2VsbENvbXBvbmVudC5jbGFzc0xpc3QuYWRkKFwiY2VsbFwiKTtcbiAgICAgIGNlbGxDb21wb25lbnQuY2xhc3NMaXN0LmFkZChnZXRDZWxsQ2xhc3NOYW1lKFtqLCBpXSwgYm9hcmQpKTtcblxuICAgICAgaWYgKCFtdXRhYmxlKSB7XG4gICAgICAgIGNlbGxDb21wb25lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICBjb25zdCBjZWxsID0gYm9hcmQuY2VsbHNbaV1bal07XG4gICAgICAgICAgaWYgKGNlbGwgIT09IENlbGxTdGF0ZS5FTVBUWSAmJiBjZWxsICE9PSBDZWxsU3RhdGUuU0hJUCkgcmV0dXJuO1xuXG4gICAgICAgICAgYm9hcmQucmVjZWl2ZUF0dGFjayhbaiwgaV0pO1xuICAgICAgICAgIGJvYXJkQ29tcG9uZW50LmRpc3BhdGNoRXZlbnQocmVmcmVzaEJvYXJkRXZlbnQpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKG11dGFibGUpIHtcbiAgICAgICAgY2VsbENvbXBvbmVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgIGlmIChjZWxsQ29tcG9uZW50LmNsYXNzTGlzdC5jb250YWlucyhcInNoaXBcIikpIHtcbiAgICAgICAgICAgIHRvZ2dsZVNoaXBNb3Rpb24oW2osIGldLCBib2FyZCwgYm9hcmRDb21wb25lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNlbGxDb21wb25lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNvbnRleHRtZW51XCIsIChldmVudCkgPT4ge1xuICAgICAgICAgIGlmIChjZWxsQ29tcG9uZW50LmNsYXNzTGlzdC5jb250YWlucyhcInNoaXBcIikpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHNoaXBJbmRleCA9IGJvYXJkLmdldFNoaXBJbmRleChnZXRDZWxsSW5kZXgoY2VsbENvbXBvbmVudCkpO1xuICAgICAgICAgICAgY29uc3Qgc2hpcCA9IGJvYXJkLnNoaXBzW3NoaXBJbmRleF07XG5cbiAgICAgICAgICAgIGlmICghY2VsbENvbXBvbmVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb3ZpbmdcIikpIHtcbiAgICAgICAgICAgICAgdG9nZ2xlU2hpcE1vdGlvbihzaGlwLmNvb3JkaW5hdGVzLCBib2FyZCwgYm9hcmRDb21wb25lbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYm9hcmQucm90YXRlU2hpcChzaGlwSW5kZXgpKSB7XG4gICAgICAgICAgICAgIGNsZWFyU2hpcE1vdmVtZW50KGJvYXJkQ29tcG9uZW50KTtcbiAgICAgICAgICAgICAgdG9nZ2xlU2hpcE1vdGlvbihzaGlwLmNvb3JkaW5hdGVzLCBib2FyZCwgYm9hcmRDb21wb25lbnQpO1xuICAgICAgICAgICAgICBib2FyZENvbXBvbmVudC5kaXNwYXRjaEV2ZW50KHJlZnJlc2hCb2FyZEV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcm93Q29tcG9uZW50LmFwcGVuZENoaWxkKGNlbGxDb21wb25lbnQpO1xuICAgIH1cbiAgICBib2FyZENvbXBvbmVudC5hcHBlbmRDaGlsZChyb3dDb21wb25lbnQpO1xuICB9XG5cbiAgcmV0dXJuIGJvYXJkQ29tcG9uZW50O1xufVxuXG5mdW5jdGlvbiBnZXRDZWxsSW5kZXgoY2VsbCkge1xuICByZXR1cm4gW1xuICAgIEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoY2VsbC5wYXJlbnROb2RlLmNoaWxkcmVuLCBjZWxsKSxcbiAgICBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKFxuICAgICAgY2VsbC5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2hpbGRyZW4sXG4gICAgICBjZWxsLnBhcmVudE5vZGUsXG4gICAgKSxcbiAgXTtcbn1cblxuZnVuY3Rpb24gZ2V0Q2VsbENsYXNzTmFtZShjb29yZGluYXRlcywgYm9hcmQpIHtcbiAgY29uc3QgY2VsbCA9IGJvYXJkLmNlbGxzW2Nvb3JkaW5hdGVzWzFdXVtjb29yZGluYXRlc1swXV07XG4gIHN3aXRjaCAoY2VsbCkge1xuICAgIGNhc2UgQ2VsbFN0YXRlLkVNUFRZOlxuICAgICAgcmV0dXJuIFwiZW1wdHlcIjtcbiAgICBjYXNlIENlbGxTdGF0ZS5NSVNTOlxuICAgICAgcmV0dXJuIFwibWlzc1wiO1xuICAgIGNhc2UgQ2VsbFN0YXRlLlNISVA6XG4gICAgICByZXR1cm4gXCJzaGlwXCI7XG4gICAgY2FzZSBDZWxsU3RhdGUuSElUOlxuICAgICAgcmV0dXJuIFwiaGl0XCI7XG4gICAgY2FzZSBDZWxsU3RhdGUuU1VOSzpcbiAgICAgIHJldHVybiBcInN1bmtcIjtcbiAgfVxufVxuXG5mdW5jdGlvbiBjbGVhclNoaXBNb3ZlbWVudChib2FyZENvbXBvbmVudCkge1xuICBjb25zdCBtb3ZpbmdDZWxscyA9IGJvYXJkQ29tcG9uZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubW92aW5nXCIpO1xuICBpZiAobW92aW5nQ2VsbHMubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgZm9yIChjb25zdCBjZWxsIG9mIG1vdmluZ0NlbGxzKSB7XG4gICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKFwibW92aW5nXCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZVNoaXBNb3Rpb24oY29vcmRpbmF0ZXMsIGJvYXJkLCBib2FyZENvbXBvbmVudCkge1xuICBjb25zdCBjZWxsID0gYm9hcmRDb21wb25lbnQuY2hpbGRyZW5bY29vcmRpbmF0ZXNbMV1dLmNoaWxkcmVuW2Nvb3JkaW5hdGVzWzBdXTtcblxuICBpZiAoIWNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hpcFwiKSkgcmV0dXJuO1xuXG4gIGNvbnN0IHNoaXBJbmRleCA9IGJvYXJkLmdldFNoaXBJbmRleChjb29yZGluYXRlcyk7XG4gIGxldCBzaGlwID0gYm9hcmQuc2hpcHNbc2hpcEluZGV4XTtcblxuICBzd2l0Y2ggKHNoaXAub3JpZW50YXRpb24pIHtcbiAgICBjYXNlIFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMOlxuICAgICAgZm9yIChcbiAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMF0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgIGkrK1xuICAgICAgKSB7XG4gICAgICAgIGJvYXJkQ29tcG9uZW50LmNoaWxkcmVuW3NoaXAuY29vcmRpbmF0ZXNbMV1dLmNoaWxkcmVuW1xuICAgICAgICAgIGlcbiAgICAgICAgXS5jbGFzc0xpc3QudG9nZ2xlKFwibW92aW5nXCIpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUw6XG4gICAgICBmb3IgKFxuICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMV07XG4gICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1sxXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgaSsrXG4gICAgICApIHtcbiAgICAgICAgYm9hcmRDb21wb25lbnQuY2hpbGRyZW5baV0uY2hpbGRyZW5bXG4gICAgICAgICAgc2hpcC5jb29yZGluYXRlc1swXVxuICAgICAgICBdLmNsYXNzTGlzdC50b2dnbGUoXCJtb3ZpbmdcIik7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgc2V0dXBHYW1lQm9hcmRzIH0gZnJvbSBcIi4vZG9tL2JvYXJkcy5qc1wiO1xuaW1wb3J0IFwiLi9zdHlsZXMvaW5kZXguY3NzXCI7XG5cbmNvbnNvbGUubG9nKFwiR2V0IFJlYWR5IGZvciBCYXR0bGUhXCIpO1xuXG5jb25zdCByb290ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpO1xuXG5yb290LmlubmVySFRNTCA9IGBcbjxoZWFkZXI+QmF0dGxlc2hpcDwvaGVhZGVyPlxuPGRpdiBjbGFzcz1cImJvYXJkc1wiPjwvZGl2PlxuPGRpdiBjbGFzcz1cImNvbnRyb2xzXCI+XG4gIDxkaXYgY2xhc3M9XCJzaGlwc1wiPjwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiZ2FtZS1jb250cm9sc1wiPlxuICAgIDxidXR0b24gY2xhc3M9XCJzdGFydFwiPlN0YXJ0IEdhbWU8L2J1dHRvbj5cbiAgICA8YnV0dG9uIGNsYXNzPVwicmVzZXRcIj5SZXNldCBHYW1lPC9idXR0b24+XG4gICAgPGJ1dHRvbiBjbGFzcz1cInJhbmRvbWl6ZVwiIGRpc2FibGVkPlJhbmRvbWl6ZSBGb3JtYXRpb248L2J1dHRvbj5cbiAgPC9kaXY+XG48L2Rpdj5cbmA7XG5cbmNvbnN0IGJvYXJkc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYm9hcmRzXCIpO1xuYm9hcmRzQ29udGFpbmVyLmFwcGVuZCguLi5zZXR1cEdhbWVCb2FyZHMoKSk7XG4iXSwibmFtZXMiOlsiY3JlYXRlU2hpcCIsIlNoaXBPcmllbnRhdGlvbiIsIkNlbGxTdGF0ZSIsIk9iamVjdCIsImZyZWV6ZSIsIkVNUFRZIiwiTUlTUyIsIlNISVAiLCJISVQiLCJTVU5LIiwiY3JlYXRlR2FtZUJvYXJkIiwic2l6ZSIsIkVycm9yIiwiY2VsbHMiLCJBcnJheSIsImZyb20iLCJsZW5ndGgiLCJzaGlwcyIsInBsYWNlU2hpcCIsImNvb3JkaW5hdGVzIiwib3JpZW50YXRpb24iLCJIT1JJWk9OVEFMIiwiVkVSVElDQUwiLCJpIiwicHVzaCIsIm1vdmVTaGlwIiwic2hpcEluZGV4Iiwic2hpcCIsInBvcCIsInJvdGF0ZVNoaXAiLCJuZXdPcmllbnRhdGlvbiIsImdldFNoaXBJbmRleCIsImoiLCJyZWNlaXZlQXR0YWNrIiwiaGl0IiwiaXNTdW5rIiwiaXNGbGVldERlc3Ryb3llZCIsIlBsYXllclR5cGUiLCJIVU1BTiIsIkNPTVBVVEVSIiwiY3JlYXRlUGxheWVyIiwidHlwZSIsImFjdGl2ZSIsImJvYXJkIiwiYWN0aXZhdGUiLCJkZWFjdGl2YXRlIiwiYXJndW1lbnRzIiwidW5kZWZpbmVkIiwiaGl0cyIsInJlZnJlc2hCb2FyZEV2ZW50IiwiRXZlbnQiLCJzZXR1cEdhbWVCb2FyZHMiLCJwbGF5ZXJPbmUiLCJwbGF5ZXJUd28iLCJwbGFjZWQiLCJNYXRoIiwicmFuZG9tIiwieCIsImZsb29yIiwieSIsInBsYXllck9uZUJvYXJkQ29tcG9uZW50IiwiZ2VuZXJhdGVCb2FyZCIsImNsYXNzTGlzdCIsImFkZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjaGlsZHJlbiIsImZvckVhY2giLCJyb3ciLCJjZWxsIiwiaXNNb3ZpbmciLCJjb250YWlucyIsImNsYXNzTmFtZSIsImdldENlbGxDbGFzc05hbWUiLCJjbGVhclNoaXBNb3ZlbWVudCIsInNoaXBNb3ZlbWVudEhhbmRsZXIiLCJldmVudCIsIm1vdmluZ1NoaXBDZWxsIiwicXVlcnlTZWxlY3RvciIsIm1vdmluZ1NoaXBDb29yZGluYXRlcyIsImdldENlbGxJbmRleCIsIm1vdmluZ1NoaXBJbmRleCIsInRvZ2dsZVNoaXBNb3Rpb24iLCJtb3ZlU3VjY2Vzc2Z1bCIsImtleSIsImRpc3BhdGNoRXZlbnQiLCJtb3ZlZFNoaXAiLCJkb2N1bWVudCIsInBsYXllclR3b0JvYXJkQ29tcG9uZW50IiwibXV0YWJsZSIsImJvYXJkQ29tcG9uZW50IiwiY3JlYXRlRWxlbWVudCIsInJvd0NvbXBvbmVudCIsImNlbGxDb21wb25lbnQiLCJwcmV2ZW50RGVmYXVsdCIsImFwcGVuZENoaWxkIiwicHJvdG90eXBlIiwiaW5kZXhPZiIsImNhbGwiLCJwYXJlbnROb2RlIiwibW92aW5nQ2VsbHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwicmVtb3ZlIiwidG9nZ2xlIiwiY29uc29sZSIsImxvZyIsInJvb3QiLCJnZXRFbGVtZW50QnlJZCIsImlubmVySFRNTCIsImJvYXJkc0NvbnRhaW5lciIsImFwcGVuZCJdLCJzb3VyY2VSb290IjoiIn0=