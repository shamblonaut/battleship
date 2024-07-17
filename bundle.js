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
/* harmony export */   clearShipMovement: function() { return /* binding */ clearShipMovement; },
/* harmony export */   gameOverEvent: function() { return /* binding */ gameOverEvent; },
/* harmony export */   gameStartEvent: function() { return /* binding */ gameStartEvent; },
/* harmony export */   generateBoard: function() { return /* binding */ generateBoard; },
/* harmony export */   randomizeBoardEvent: function() { return /* binding */ randomizeBoardEvent; },
/* harmony export */   randomizeShipFormation: function() { return /* binding */ randomizeShipFormation; },
/* harmony export */   refreshBoardEvent: function() { return /* binding */ refreshBoardEvent; },
/* harmony export */   setupGameBoards: function() { return /* binding */ setupGameBoards; }
/* harmony export */ });
/* harmony import */ var _core_gameBoard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/gameBoard.js */ "./src/core/gameBoard.js");
/* harmony import */ var _core_player_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/player.js */ "./src/core/player.js");
/* harmony import */ var _core_ship_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/ship.js */ "./src/core/ship.js");



const gameStartEvent = new Event("game-start");
const gameOverEvent = new Event("game-over");
const refreshBoardEvent = new Event("refresh-board");
const randomizeBoardEvent = new Event("randomize-board");
const receiveAttackEvent = new Event("receive-attack");
let isGameStarted = false;
let isGameOver = false;
function setupGameBoards(playerOne, playerTwo) {
  randomizeShipFormation(playerOne.board);
  randomizeShipFormation(playerTwo.board);
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
  playerOneBoardComponent.addEventListener("randomize-board", () => {
    clearShipMovement(playerOneBoardComponent);
    randomizeShipFormation(playerOne.board);
    playerOneBoardComponent.dispatchEvent(refreshBoardEvent);
  });
  playerOneBoardComponent.addEventListener("click", () => clearShipMovement(playerOneBoardComponent), true);
  document.addEventListener("receive-attack", () => {
    if (playerTwo.type === _core_player_js__WEBPACK_IMPORTED_MODULE_1__.PlayerType.COMPUTER) {
      receiveComputerAttack(playerOne.board, playerOneBoardComponent);
    }
  });
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
  document.addEventListener("game-start", () => {
    isGameStarted = true;
    clearShipMovement(playerOneBoardComponent);
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
          if (!isGameStarted || isGameOver) return;
          const cell = board.cells[i][j];
          if (cell !== _core_gameBoard_js__WEBPACK_IMPORTED_MODULE_0__.CellState.EMPTY && cell !== _core_gameBoard_js__WEBPACK_IMPORTED_MODULE_0__.CellState.SHIP) return;
          board.receiveAttack([j, i]);
          boardComponent.dispatchEvent(refreshBoardEvent);
          if (board.isFleetDestroyed()) {
            const gameWonOverlay = document.createElement("div");
            gameWonOverlay.classList.add("game-over-overlay");
            gameWonOverlay.textContent = "YOU WON THE GAME!";
            boardComponent.appendChild(gameWonOverlay);
            isGameOver = true;
            document.dispatchEvent(gameOverEvent);
            return;
          }
          document.dispatchEvent(receiveAttackEvent);
        });
      }
      if (mutable) {
        cellComponent.addEventListener("click", () => {
          if (cellComponent.classList.contains("ship") && !isGameStarted) {
            toggleShipMotion([j, i], board, boardComponent);
          }
        });
        cellComponent.addEventListener("contextmenu", event => {
          if (cellComponent.classList.contains("ship") && !isGameStarted) {
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
function randomizeShipFormation(board) {
  const ships = [5, 4, 3, 3, 2];
  board.ships = [];
  board.cells.forEach(row => {
    row.fill(_core_gameBoard_js__WEBPACK_IMPORTED_MODULE_0__.CellState.EMPTY);
  });
  for (const ship of ships) {
    let placed = false;
    while (!placed) {
      const orientation = Math.random() > 0.5 ? _core_ship_js__WEBPACK_IMPORTED_MODULE_2__.ShipOrientation.HORIZONTAL : _core_ship_js__WEBPACK_IMPORTED_MODULE_2__.ShipOrientation.VERTICAL;
      const x = Math.floor(Math.random() * (10 - (orientation === _core_ship_js__WEBPACK_IMPORTED_MODULE_2__.ShipOrientation.HORIZONTAL ? ship : 0)));
      const y = Math.floor(Math.random() * (10 - (orientation === _core_ship_js__WEBPACK_IMPORTED_MODULE_2__.ShipOrientation.VERTICAL ? ship : 0)));
      placed = board.placeShip([x, y], ship, orientation);
    }
  }
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
function receiveComputerAttack(board, boardComponent) {
  let x = Math.floor(Math.random() * board.size);
  let y = Math.floor(Math.random() * board.size);
  while (true) {
    const cell = boardComponent.children[y].children[x];
    if (!cell.classList.contains("empty") && !cell.classList.contains("ship")) {
      x = Math.floor(Math.random() * board.size);
      y = Math.floor(Math.random() * board.size);
    } else {
      break;
    }
  }
  board.receiveAttack([x, y]);
  boardComponent.dispatchEvent(refreshBoardEvent);
  if (board.isFleetDestroyed()) {
    const gameLostOverlay = document.createElement("div");
    gameLostOverlay.classList.add("game-over-overlay");
    gameLostOverlay.textContent = "YOU LOST THE GAME!";
    boardComponent.appendChild(gameLostOverlay);
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
/* harmony import */ var _boards_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./boards.js */ "./src/dom/boards.js");

function setupControls() {
  document.addEventListener("game-start", () => {
    const root = document.querySelector("#root");
    root.classList.add("game-started");
    const startButton = document.querySelector(".start");
    startButton.classList.add("hidden");
    const randomizeButton = document.querySelector(".randomize");
    randomizeButton.classList.add("hidden");
  });
  document.addEventListener("game-over", () => {
    const root = document.querySelector("#root");
    root.classList.remove("game-started");
    const restartButton = document.querySelector(".restart");
    restartButton.classList.remove("hidden");
  });
  const startButton = document.querySelector(".start");
  startButton.addEventListener("click", () => {
    startButton.disabled = true;
    document.dispatchEvent(_boards_js__WEBPACK_IMPORTED_MODULE_0__.gameStartEvent);
  });
  const randomizeButton = document.querySelector(".randomize");
  randomizeButton.addEventListener("click", () => {
    const playerOneBoard = document.querySelector(".board.player-one");
    playerOneBoard.dispatchEvent(_boards_js__WEBPACK_IMPORTED_MODULE_0__.randomizeBoardEvent);
  });
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
/* harmony import */ var _core_player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/player.js */ "./src/core/player.js");
/* harmony import */ var _dom_boards_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom/boards.js */ "./src/dom/boards.js");
/* harmony import */ var _dom_controls_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom/controls.js */ "./src/dom/controls.js");
/* harmony import */ var _styles_index_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles/index.css */ "./src/styles/index.css");




console.log("Get Ready for Battle!");
const root = document.getElementById("root");
root.innerHTML = `
  <header>Battleship</header>
  <div class="boards"></div>
  <div class="controls">
    <button class="start">Start Game</button>
    <button class="randomize">Randomize Formation</button>
    <button class="restart hidden">Play Again</button>
  </div>
`;
const playerOne = (0,_core_player_js__WEBPACK_IMPORTED_MODULE_0__.createPlayer)(_core_player_js__WEBPACK_IMPORTED_MODULE_0__.PlayerType.HUMAN);
const playerTwo = (0,_core_player_js__WEBPACK_IMPORTED_MODULE_0__.createPlayer)(_core_player_js__WEBPACK_IMPORTED_MODULE_0__.PlayerType.COMPUTER);
const boardsContainer = document.querySelector(".boards");
boardsContainer.append(...(0,_dom_boards_js__WEBPACK_IMPORTED_MODULE_1__.setupGameBoards)(playerOne, playerTwo));
(0,_dom_controls_js__WEBPACK_IMPORTED_MODULE_2__.setupControls)();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SUFBSSxDQUFDUixXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQzNCSSxDQUFDLElBQUlJLElBQUksQ0FBQ1IsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHUSxJQUFJLENBQUNYLE1BQU0sR0FBRyxDQUFDLEVBQzFDTyxDQUFDLEVBQUUsRUFDSDtVQUNBLElBQUksQ0FBQ1YsS0FBSyxDQUFDVSxDQUFDLENBQUMsQ0FBQ0ksSUFBSSxDQUFDUixXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR2pCLFNBQVMsQ0FBQ0csS0FBSztRQUN0RDtRQUNBLEtBQ0UsSUFBSWtCLENBQUMsR0FBR0ksSUFBSSxDQUFDUixXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQzNCSSxDQUFDLElBQUlJLElBQUksQ0FBQ1IsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHUSxJQUFJLENBQUNYLE1BQU0sR0FBRyxDQUFDLEVBQzFDTyxDQUFDLEVBQUUsRUFDSDtVQUNBLElBQUksQ0FBQ1YsS0FBSyxDQUFDYyxJQUFJLENBQUNSLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDSSxDQUFDLENBQUMsR0FBR3JCLFNBQVMsQ0FBQ0ssSUFBSTtRQUNyRDtNQUNGLENBQUMsTUFBTSxJQUFJdUIsY0FBYyxLQUFLN0IscURBQWUsQ0FBQ3FCLFFBQVEsRUFBRTtRQUN0RCxLQUNFLElBQUlDLENBQUMsR0FBR0ksSUFBSSxDQUFDUixXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQzNCSSxDQUFDLElBQUlJLElBQUksQ0FBQ1IsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHUSxJQUFJLENBQUNYLE1BQU0sR0FBRyxDQUFDLEVBQzFDTyxDQUFDLEVBQUUsRUFDSDtVQUNBLElBQUksQ0FBQ1YsS0FBSyxDQUFDYyxJQUFJLENBQUNSLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDSSxDQUFDLENBQUMsR0FBR3JCLFNBQVMsQ0FBQ0csS0FBSztRQUN0RDtRQUNBLEtBQ0UsSUFBSWtCLENBQUMsR0FBR0ksSUFBSSxDQUFDUixXQUFXLENBQUMsQ0FBQyxDQUFDLEVB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Q040RDtBQUNWO0FBQ0E7QUFFdEI7QUFFNUJzRSxPQUFPLENBQUNDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQztBQUVwQyxNQUFNUCxJQUFJLEdBQUd6QyxRQUFRLENBQUNpRCxjQUFjLENBQUMsTUFBTSxDQUFDO0FBRTVDUixJQUFJLENBQUNTLFNBQVMsR0FBRztBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFFRCxNQUFNcEUsU0FBUyxHQUFHbEIsNkRBQVksQ0FBQ0gsdURBQVUsQ0FBQ0MsS0FBSyxDQUFDO0FBQ2hELE1BQU1xQixTQUFTLEdBQUduQiw2REFBWSxDQUFDSCx1REFBVSxDQUFDRSxRQUFRLENBQUM7QUFFbkQsTUFBTXdGLGVBQWUsR0FBR25ELFFBQVEsQ0FBQ0ssYUFBYSxDQUFDLFNBQVMsQ0FBQztBQUN6RDhDLGVBQWUsQ0FBQ0MsTUFBTSxDQUFDLEdBQUd2RSwrREFBZSxDQUFDQyxTQUFTLEVBQUVDLFNBQVMsQ0FBQyxDQUFDO0FBRWhFeUQsK0RBQWEsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9pbmRleC5jc3M/NGU0MiIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvcmUvZ2FtZUJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29yZS9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb3JlL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb20vYm9hcmRzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tL2NvbnRyb2xzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCB7IGNyZWF0ZVNoaXAsIFNoaXBPcmllbnRhdGlvbiB9IGZyb20gXCIuL3NoaXAuanNcIjtcblxuZXhwb3J0IGNvbnN0IENlbGxTdGF0ZSA9IE9iamVjdC5mcmVlemUoe1xuICBFTVBUWTogMCxcbiAgTUlTUzogMSxcbiAgU0hJUDogMixcbiAgSElUOiAzLFxuICBTVU5LOiA0LFxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVHYW1lQm9hcmQoc2l6ZSkge1xuICBpZiAoc2l6ZSA8PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBib2FyZCBzaXplXCIpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzaXplLFxuICAgIGNlbGxzOiBBcnJheS5mcm9tKHsgbGVuZ3RoOiBzaXplIH0sICgpID0+XG4gICAgICBBcnJheS5mcm9tKHsgbGVuZ3RoOiBzaXplIH0sICgpID0+IENlbGxTdGF0ZS5FTVBUWSksXG4gICAgKSxcbiAgICBzaGlwczogW10sXG5cbiAgICBwbGFjZVNoaXA6IGZ1bmN0aW9uIChjb29yZGluYXRlcywgbGVuZ3RoLCBvcmllbnRhdGlvbikge1xuICAgICAgaWYgKFxuICAgICAgICBjb29yZGluYXRlc1swXSA8IDAgfHxcbiAgICAgICAgY29vcmRpbmF0ZXNbMV0gPCAwIHx8XG4gICAgICAgIGNvb3JkaW5hdGVzWzBdID49IHNpemUgfHxcbiAgICAgICAgY29vcmRpbmF0ZXNbMV0gPj0gc2l6ZVxuICAgICAgKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBwbGFjZSBzaGlwIG91dHNpZGUgdGhlIGJvYXJkXCIpO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgKG9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCAmJlxuICAgICAgICAgIGNvb3JkaW5hdGVzWzBdICsgbGVuZ3RoIC0gMSA+PSBzaXplKSB8fFxuICAgICAgICAob3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCAmJlxuICAgICAgICAgIGNvb3JkaW5hdGVzWzFdICsgbGVuZ3RoIC0gMSA+PSBzaXplKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCkge1xuICAgICAgICBmb3IgKGxldCBpID0gY29vcmRpbmF0ZXNbMF07IGkgPD0gY29vcmRpbmF0ZXNbMF0gKyBsZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICBpZiAodGhpcy5jZWxsc1tjb29yZGluYXRlc1sxXV1baV0gIT09IENlbGxTdGF0ZS5FTVBUWSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChvcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSBjb29yZGluYXRlc1sxXTsgaSA8PSBjb29yZGluYXRlc1sxXSArIGxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgIGlmICh0aGlzLmNlbGxzW2ldW2Nvb3JkaW5hdGVzWzBdXSAhPT0gQ2VsbFN0YXRlLkVNUFRZKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2hpcHMucHVzaChjcmVhdGVTaGlwKGxlbmd0aCwgY29vcmRpbmF0ZXMsIG9yaWVudGF0aW9uKSk7XG5cbiAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IGNvb3JkaW5hdGVzWzBdOyBpIDw9IGNvb3JkaW5hdGVzWzBdICsgbGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5jZWxsc1tjb29yZGluYXRlc1sxXV1baV0gPSBDZWxsU3RhdGUuU0hJUDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChvcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSBjb29yZGluYXRlc1sxXTsgaSA8PSBjb29yZGluYXRlc1sxXSArIGxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgIHRoaXMuY2VsbHNbaV1bY29vcmRpbmF0ZXNbMF1dID0gQ2VsbFN0YXRlLlNISVA7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIG1vdmVTaGlwOiBmdW5jdGlvbiAoc2hpcEluZGV4LCBjb29yZGluYXRlcykge1xuICAgICAgY29uc3Qgc2hpcCA9IHRoaXMuc2hpcHNbc2hpcEluZGV4XTtcbiAgICAgIGlmICghc2hpcCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTaGlwIGRvZXMgbm90IGV4aXN0XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwpIHtcbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMF07XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmNlbGxzW3NoaXAuY29vcmRpbmF0ZXNbMV1dW2ldID0gQ2VsbFN0YXRlLkVNUFRZO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1sxXTtcbiAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgaSsrXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuY2VsbHNbaV1bc2hpcC5jb29yZGluYXRlc1swXV0gPSBDZWxsU3RhdGUuRU1QVFk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLnBsYWNlU2hpcChjb29yZGluYXRlcywgc2hpcC5sZW5ndGgsIHNoaXAub3JpZW50YXRpb24pKSB7XG4gICAgICAgIGlmIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCkge1xuICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMF07XG4gICAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMF0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBpKytcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuY2VsbHNbc2hpcC5jb29yZGluYXRlc1sxXV1baV0gPSBDZWxsU3RhdGUuU0hJUDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMKSB7XG4gICAgICAgICAgZm9yIChcbiAgICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1sxXTtcbiAgICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1sxXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGkrK1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5jZWxsc1tpXVtzaGlwLmNvb3JkaW5hdGVzWzBdXSA9IENlbGxTdGF0ZS5TSElQO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2hpcHNbc2hpcEluZGV4XSA9IHRoaXMuc2hpcHMucG9wKCk7XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICByb3RhdGVTaGlwOiBmdW5jdGlvbiAoc2hpcEluZGV4KSB7XG4gICAgICBjb25zdCBzaGlwID0gdGhpcy5zaGlwc1tzaGlwSW5kZXhdO1xuICAgICAgaWYgKCFzaGlwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlNoaXAgZG9lcyBub3QgZXhpc3RcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5ld09yaWVudGF0aW9uID1cbiAgICAgICAgc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUxcbiAgICAgICAgICA/IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTFxuICAgICAgICAgIDogU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUw7XG5cbiAgICAgIGlmIChuZXdPcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwpIHtcbiAgICAgICAgaWYgKHNoaXAuY29vcmRpbmF0ZXNbMF0gKyBzaGlwLmxlbmd0aCAtIDEgPj0gdGhpcy5zaXplKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMF0gKyAxO1xuICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKHRoaXMuY2VsbHNbc2hpcC5jb29yZGluYXRlc1sxXV1baV0gIT09IENlbGxTdGF0ZS5FTVBUWSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChuZXdPcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMKSB7XG4gICAgICAgIGlmIChzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxID49IHRoaXMuc2l6ZSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzFdICsgMTtcbiAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgaSsrXG4gICAgICAgICkge1xuICAgICAgICAgIGlmICh0aGlzLmNlbGxzW2ldW3NoaXAuY29vcmRpbmF0ZXNbMF1dICE9PSBDZWxsU3RhdGUuRU1QVFkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG5ld09yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCkge1xuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1sxXTtcbiAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgaSsrXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuY2VsbHNbaV1bc2hpcC5jb29yZGluYXRlc1swXV0gPSBDZWxsU3RhdGUuRU1QVFk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMF07XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmNlbGxzW3NoaXAuY29vcmRpbmF0ZXNbMV1dW2ldID0gQ2VsbFN0YXRlLlNISVA7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAobmV3T3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1swXTtcbiAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMF0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgaSsrXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuY2VsbHNbc2hpcC5jb29yZGluYXRlc1sxXV1baV0gPSBDZWxsU3RhdGUuRU1QVFk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMV07XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmNlbGxzW2ldW3NoaXAuY29vcmRpbmF0ZXNbMF1dID0gQ2VsbFN0YXRlLlNISVA7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc2hpcC5vcmllbnRhdGlvbiA9IG5ld09yaWVudGF0aW9uO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIGdldFNoaXBJbmRleDogZnVuY3Rpb24gKGNvb3JkaW5hdGVzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2hpcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMuc2hpcHNbaV0ub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMKSB7XG4gICAgICAgICAgZm9yIChcbiAgICAgICAgICAgIGxldCBqID0gdGhpcy5zaGlwc1tpXS5jb29yZGluYXRlc1swXTtcbiAgICAgICAgICAgIGogPD0gdGhpcy5zaGlwc1tpXS5jb29yZGluYXRlc1swXSArIHRoaXMuc2hpcHNbaV0ubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGorK1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBjb29yZGluYXRlc1swXSA9PT0gaiAmJlxuICAgICAgICAgICAgICBjb29yZGluYXRlc1sxXSA9PT0gdGhpcy5zaGlwc1tpXS5jb29yZGluYXRlc1sxXVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNoaXBzW2ldLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwpIHtcbiAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgbGV0IGogPSB0aGlzLnNoaXBzW2ldLmNvb3JkaW5hdGVzWzFdO1xuICAgICAgICAgICAgaiA8PSB0aGlzLnNoaXBzW2ldLmNvb3JkaW5hdGVzWzFdICsgdGhpcy5zaGlwc1tpXS5sZW5ndGggLSAxO1xuICAgICAgICAgICAgaisrXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGNvb3JkaW5hdGVzWzBdID09PSB0aGlzLnNoaXBzW2ldLmNvb3JkaW5hdGVzWzBdICYmXG4gICAgICAgICAgICAgIGNvb3JkaW5hdGVzWzFdID09PSBqXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYE5vIHNoaXAgZm91bmQgYXQgZ2l2ZW4gaW5kZXg6IFske2Nvb3JkaW5hdGVzWzBdfSwgJHtjb29yZGluYXRlc1sxXX1dYCxcbiAgICAgICk7XG4gICAgfSxcblxuICAgIHJlY2VpdmVBdHRhY2s6IGZ1bmN0aW9uIChjb29yZGluYXRlcykge1xuICAgICAgaWYgKFxuICAgICAgICBjb29yZGluYXRlc1swXSA8IDAgfHxcbiAgICAgICAgY29vcmRpbmF0ZXNbMV0gPCAwIHx8XG4gICAgICAgIGNvb3JkaW5hdGVzWzBdID49IHNpemUgfHxcbiAgICAgICAgY29vcmRpbmF0ZXNbMV0gPj0gc2l6ZVxuICAgICAgKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBhdHRhY2sgb3V0c2lkZSB0aGUgYm9hcmRcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5jZWxsc1tjb29yZGluYXRlc1sxXV1bY29vcmRpbmF0ZXNbMF1dICE9PSBDZWxsU3RhdGUuRU1QVFkgJiZcbiAgICAgICAgdGhpcy5jZWxsc1tjb29yZGluYXRlc1sxXV1bY29vcmRpbmF0ZXNbMF1dICE9PSBDZWxsU3RhdGUuU0hJUFxuICAgICAgKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNlbGwgaGFzIGFscmVhZHkgYmVlbiBhdHRhY2tlZFwiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuY2VsbHNbY29vcmRpbmF0ZXNbMV1dW2Nvb3JkaW5hdGVzWzBdXSAhPT0gQ2VsbFN0YXRlLlNISVApIHtcbiAgICAgICAgdGhpcy5jZWxsc1tjb29yZGluYXRlc1sxXV1bY29vcmRpbmF0ZXNbMF1dID0gQ2VsbFN0YXRlLk1JU1M7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgZm9yIChjb25zdCBzaGlwIG9mIHRoaXMuc2hpcHMpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCAmJlxuICAgICAgICAgICAgY29vcmRpbmF0ZXNbMV0gPT09IHNoaXAuY29vcmRpbmF0ZXNbMV0gJiZcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzWzBdID49IHNoaXAuY29vcmRpbmF0ZXNbMF0gJiZcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzWzBdIDw9IHNoaXAuY29vcmRpbmF0ZXNbMF0gKyBzaGlwLmxlbmd0aCAtIDEpIHx8XG4gICAgICAgICAgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCAmJlxuICAgICAgICAgICAgY29vcmRpbmF0ZXNbMF0gPT09IHNoaXAuY29vcmRpbmF0ZXNbMF0gJiZcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzWzFdID49IHNoaXAuY29vcmRpbmF0ZXNbMV0gJiZcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzWzFdIDw9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDEpXG4gICAgICAgICkge1xuICAgICAgICAgIHNoaXAuaGl0KCk7XG5cbiAgICAgICAgICBpZiAoc2hpcC5pc1N1bmsoKSkge1xuICAgICAgICAgICAgaWYgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMKSB7XG4gICAgICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICBpKytcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jZWxsc1tzaGlwLmNvb3JkaW5hdGVzWzFdXVtpXSA9IENlbGxTdGF0ZS5TVU5LO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1sxXTtcbiAgICAgICAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgaSsrXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2VsbHNbaV1bc2hpcC5jb29yZGluYXRlc1swXV0gPSBDZWxsU3RhdGUuU1VOSztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNlbGxzW2Nvb3JkaW5hdGVzWzFdXVtjb29yZGluYXRlc1swXV0gPSBDZWxsU3RhdGUuSElUO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGlzRmxlZXREZXN0cm95ZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGZvciAoY29uc3Qgc2hpcCBvZiB0aGlzLnNoaXBzKSB7XG4gICAgICAgIGlmICghc2hpcC5pc1N1bmsoKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICB9O1xufVxuIiwiaW1wb3J0IHsgY3JlYXRlR2FtZUJvYXJkIH0gZnJvbSBcIi4vZ2FtZUJvYXJkLmpzXCI7XG5cbmV4cG9ydCBjb25zdCBQbGF5ZXJUeXBlID0gT2JqZWN0LmZyZWV6ZSh7XG4gIEhVTUFOOiBcIkhVTUFOXCIsXG4gIENPTVBVVEVSOiBcIkNPTVBVVEVSXCIsXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBsYXllcih0eXBlKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZSxcbiAgICBhY3RpdmU6IGZhbHNlLFxuICAgIGJvYXJkOiBjcmVhdGVHYW1lQm9hcmQoMTApLFxuXG4gICAgYWN0aXZhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLmFjdGl2ZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQbGF5ZXIgaXMgYWxyZWFkeSBhY3RpdmVcIik7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICB9LFxuICAgIGRlYWN0aXZhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghdGhpcy5hY3RpdmUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGxheWVyIGlzIGFscmVhZHkgaW5hY3RpdmVcIik7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgfSxcbiAgfTtcbn1cbiIsImV4cG9ydCBjb25zdCBTaGlwT3JpZW50YXRpb24gPSBPYmplY3QuZnJlZXplKHtcbiAgSE9SSVpPTlRBTDogXCJIT1JJWk9OVEFMXCIsXG4gIFZFUlRJQ0FMOiBcIlZFUlRJQ0FMXCIsXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNoaXAoXG4gIGxlbmd0aCxcbiAgY29vcmRpbmF0ZXMgPSBbdW5kZWZpbmVkLCB1bmRlZmluZWRdLFxuICBvcmllbnRhdGlvbiA9IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMLFxuKSB7XG4gIGlmIChsZW5ndGggPCAxKSByZXR1cm4gdW5kZWZpbmVkO1xuICByZXR1cm4ge1xuICAgIGxlbmd0aCxcbiAgICBjb29yZGluYXRlcyxcbiAgICBvcmllbnRhdGlvbixcbiAgICBoaXRzOiAwLFxuXG4gICAgaGl0OiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpcy5oaXRzIDwgdGhpcy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5oaXRzKys7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGlzU3VuazogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGl0cyA9PT0gdGhpcy5sZW5ndGg7XG4gICAgfSxcbiAgfTtcbn1cbiIsImltcG9ydCB7IENlbGxTdGF0ZSB9IGZyb20gXCIuLi9jb3JlL2dhbWVCb2FyZC5qc1wiO1xuaW1wb3J0IHsgUGxheWVyVHlwZSB9IGZyb20gXCIuLi9jb3JlL3BsYXllci5qc1wiO1xuaW1wb3J0IHsgU2hpcE9yaWVudGF0aW9uIH0gZnJvbSBcIi4uL2NvcmUvc2hpcC5qc1wiO1xuXG5leHBvcnQgY29uc3QgZ2FtZVN0YXJ0RXZlbnQgPSBuZXcgRXZlbnQoXCJnYW1lLXN0YXJ0XCIpO1xuZXhwb3J0IGNvbnN0IGdhbWVPdmVyRXZlbnQgPSBuZXcgRXZlbnQoXCJnYW1lLW92ZXJcIik7XG5leHBvcnQgY29uc3QgcmVmcmVzaEJvYXJkRXZlbnQgPSBuZXcgRXZlbnQoXCJyZWZyZXNoLWJvYXJkXCIpO1xuZXhwb3J0IGNvbnN0IHJhbmRvbWl6ZUJvYXJkRXZlbnQgPSBuZXcgRXZlbnQoXCJyYW5kb21pemUtYm9hcmRcIik7XG5jb25zdCByZWNlaXZlQXR0YWNrRXZlbnQgPSBuZXcgRXZlbnQoXCJyZWNlaXZlLWF0dGFja1wiKTtcblxubGV0IGlzR2FtZVN0YXJ0ZWQgPSBmYWxzZTtcbmxldCBpc0dhbWVPdmVyID0gZmFsc2U7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cEdhbWVCb2FyZHMocGxheWVyT25lLCBwbGF5ZXJUd28pIHtcbiAgcmFuZG9taXplU2hpcEZvcm1hdGlvbihwbGF5ZXJPbmUuYm9hcmQpO1xuICByYW5kb21pemVTaGlwRm9ybWF0aW9uKHBsYXllclR3by5ib2FyZCk7XG5cbiAgY29uc3QgcGxheWVyT25lQm9hcmRDb21wb25lbnQgPSBnZW5lcmF0ZUJvYXJkKHBsYXllck9uZS5ib2FyZCwgdHJ1ZSk7XG4gIHBsYXllck9uZUJvYXJkQ29tcG9uZW50LmNsYXNzTGlzdC5hZGQoXCJwbGF5ZXItb25lXCIsIFwiaHVtYW5cIik7XG5cbiAgcGxheWVyT25lQm9hcmRDb21wb25lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInJlZnJlc2gtYm9hcmRcIiwgKCkgPT4ge1xuICAgIEFycmF5LmZyb20ocGxheWVyT25lQm9hcmRDb21wb25lbnQuY2hpbGRyZW4pLmZvckVhY2goKHJvdywgaSkgPT4ge1xuICAgICAgQXJyYXkuZnJvbShyb3cuY2hpbGRyZW4pLmZvckVhY2goKGNlbGwsIGopID0+IHtcbiAgICAgICAgY29uc3QgaXNNb3ZpbmcgPSBjZWxsLmNsYXNzTGlzdC5jb250YWlucyhcIm1vdmluZ1wiKTtcblxuICAgICAgICBjZWxsLmNsYXNzTmFtZSA9IFwiY2VsbFwiO1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoZ2V0Q2VsbENsYXNzTmFtZShbaiwgaV0sIHBsYXllck9uZS5ib2FyZCkpO1xuICAgICAgICBpZiAoaXNNb3ZpbmcpIGNlbGwuY2xhc3NMaXN0LmFkZChcIm1vdmluZ1wiKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbiAgcGxheWVyT25lQm9hcmRDb21wb25lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInJhbmRvbWl6ZS1ib2FyZFwiLCAoKSA9PiB7XG4gICAgY2xlYXJTaGlwTW92ZW1lbnQocGxheWVyT25lQm9hcmRDb21wb25lbnQpO1xuICAgIHJhbmRvbWl6ZVNoaXBGb3JtYXRpb24ocGxheWVyT25lLmJvYXJkKTtcbiAgICBwbGF5ZXJPbmVCb2FyZENvbXBvbmVudC5kaXNwYXRjaEV2ZW50KHJlZnJlc2hCb2FyZEV2ZW50KTtcbiAgfSk7XG4gIHBsYXllck9uZUJvYXJkQ29tcG9uZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgXCJjbGlja1wiLFxuICAgICgpID0+IGNsZWFyU2hpcE1vdmVtZW50KHBsYXllck9uZUJvYXJkQ29tcG9uZW50KSxcbiAgICB0cnVlLFxuICApO1xuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJyZWNlaXZlLWF0dGFja1wiLCAoKSA9PiB7XG4gICAgaWYgKHBsYXllclR3by50eXBlID09PSBQbGF5ZXJUeXBlLkNPTVBVVEVSKSB7XG4gICAgICByZWNlaXZlQ29tcHV0ZXJBdHRhY2socGxheWVyT25lLmJvYXJkLCBwbGF5ZXJPbmVCb2FyZENvbXBvbmVudCk7XG4gICAgfVxuICB9KTtcblxuICBmdW5jdGlvbiBzaGlwTW92ZW1lbnRIYW5kbGVyKGV2ZW50KSB7XG4gICAgY29uc3QgbW92aW5nU2hpcENlbGwgPSBwbGF5ZXJPbmVCb2FyZENvbXBvbmVudC5xdWVyeVNlbGVjdG9yKFwiLm1vdmluZ1wiKTtcblxuICAgIGlmICghbW92aW5nU2hpcENlbGwpIHJldHVybjtcblxuICAgIGNvbnN0IG1vdmluZ1NoaXBDb29yZGluYXRlcyA9IGdldENlbGxJbmRleChtb3ZpbmdTaGlwQ2VsbCk7XG4gICAgY29uc3QgbW92aW5nU2hpcEluZGV4ID0gcGxheWVyT25lLmJvYXJkLmdldFNoaXBJbmRleChtb3ZpbmdTaGlwQ29vcmRpbmF0ZXMpO1xuXG4gICAgdG9nZ2xlU2hpcE1vdGlvbihcbiAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlcyxcbiAgICAgIHBsYXllck9uZS5ib2FyZCxcbiAgICAgIHBsYXllck9uZUJvYXJkQ29tcG9uZW50LFxuICAgICk7XG5cbiAgICBsZXQgbW92ZVN1Y2Nlc3NmdWwgPSBmYWxzZTtcbiAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgY2FzZSBcIkFycm93VXBcIjpcbiAgICAgICAgaWYgKG1vdmluZ1NoaXBDb29yZGluYXRlc1sxXSA8PSAwKSBicmVhaztcbiAgICAgICAgbW92ZVN1Y2Nlc3NmdWwgPSBwbGF5ZXJPbmUuYm9hcmQubW92ZVNoaXAobW92aW5nU2hpcEluZGV4LCBbXG4gICAgICAgICAgbW92aW5nU2hpcENvb3JkaW5hdGVzWzBdLFxuICAgICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlc1sxXSAtIDEsXG4gICAgICAgIF0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJBcnJvd0xlZnRcIjpcbiAgICAgICAgaWYgKG1vdmluZ1NoaXBDb29yZGluYXRlc1swXSA8PSAwKSBicmVhaztcbiAgICAgICAgbW92ZVN1Y2Nlc3NmdWwgPSBwbGF5ZXJPbmUuYm9hcmQubW92ZVNoaXAobW92aW5nU2hpcEluZGV4LCBbXG4gICAgICAgICAgbW92aW5nU2hpcENvb3JkaW5hdGVzWzBdIC0gMSxcbiAgICAgICAgICBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMV0sXG4gICAgICAgIF0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJBcnJvd0Rvd25cIjpcbiAgICAgICAgaWYgKG1vdmluZ1NoaXBDb29yZGluYXRlc1sxXSA+PSBwbGF5ZXJPbmUuYm9hcmQuc2l6ZSAtIDEpIGJyZWFrO1xuICAgICAgICBtb3ZlU3VjY2Vzc2Z1bCA9IHBsYXllck9uZS5ib2FyZC5tb3ZlU2hpcChtb3ZpbmdTaGlwSW5kZXgsIFtcbiAgICAgICAgICBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMF0sXG4gICAgICAgICAgbW92aW5nU2hpcENvb3JkaW5hdGVzWzFdICsgMSxcbiAgICAgICAgXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIkFycm93UmlnaHRcIjpcbiAgICAgICAgaWYgKG1vdmluZ1NoaXBDb29yZGluYXRlc1swXSA+PSBwbGF5ZXJPbmUuYm9hcmQuc2l6ZSAtIDEpIGJyZWFrO1xuICAgICAgICBtb3ZlU3VjY2Vzc2Z1bCA9IHBsYXllck9uZS5ib2FyZC5tb3ZlU2hpcChtb3ZpbmdTaGlwSW5kZXgsIFtcbiAgICAgICAgICBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMF0gKyAxLFxuICAgICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlc1sxXSxcbiAgICAgICAgXSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmICghbW92ZVN1Y2Nlc3NmdWwpIHtcbiAgICAgIHRvZ2dsZVNoaXBNb3Rpb24oXG4gICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlcyxcbiAgICAgICAgcGxheWVyT25lLmJvYXJkLFxuICAgICAgICBwbGF5ZXJPbmVCb2FyZENvbXBvbmVudCxcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcGxheWVyT25lQm9hcmRDb21wb25lbnQuZGlzcGF0Y2hFdmVudChyZWZyZXNoQm9hcmRFdmVudCk7XG5cbiAgICBjb25zdCBtb3ZlZFNoaXAgPSBwbGF5ZXJPbmUuYm9hcmQuc2hpcHNbbW92aW5nU2hpcEluZGV4XTtcbiAgICB0b2dnbGVTaGlwTW90aW9uKFxuICAgICAgbW92ZWRTaGlwLmNvb3JkaW5hdGVzLFxuICAgICAgcGxheWVyT25lLmJvYXJkLFxuICAgICAgcGxheWVyT25lQm9hcmRDb21wb25lbnQsXG4gICAgKTtcbiAgfVxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBzaGlwTW92ZW1lbnRIYW5kbGVyKTtcblxuICBjb25zdCBwbGF5ZXJUd29Cb2FyZENvbXBvbmVudCA9IGdlbmVyYXRlQm9hcmQocGxheWVyVHdvLmJvYXJkLCBmYWxzZSk7XG4gIHBsYXllclR3b0JvYXJkQ29tcG9uZW50LmNsYXNzTGlzdC5hZGQoXCJwbGF5ZXItdHdvXCIsIFwiY29tcHV0ZXJcIik7XG5cbiAgcGxheWVyVHdvQm9hcmRDb21wb25lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInJlZnJlc2gtYm9hcmRcIiwgKCkgPT4ge1xuICAgIEFycmF5LmZyb20ocGxheWVyVHdvQm9hcmRDb21wb25lbnQuY2hpbGRyZW4pLmZvckVhY2goKHJvdywgaSkgPT4ge1xuICAgICAgQXJyYXkuZnJvbShyb3cuY2hpbGRyZW4pLmZvckVhY2goKGNlbGwsIGopID0+IHtcbiAgICAgICAgY2VsbC5jbGFzc05hbWUgPSBcImNlbGxcIjtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKGdldENlbGxDbGFzc05hbWUoW2osIGldLCBwbGF5ZXJUd28uYm9hcmQsIHRydWUpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZ2FtZS1zdGFydFwiLCAoKSA9PiB7XG4gICAgaXNHYW1lU3RhcnRlZCA9IHRydWU7XG4gICAgY2xlYXJTaGlwTW92ZW1lbnQocGxheWVyT25lQm9hcmRDb21wb25lbnQpO1xuICB9KTtcblxuICByZXR1cm4gW3BsYXllck9uZUJvYXJkQ29tcG9uZW50LCBwbGF5ZXJUd29Cb2FyZENvbXBvbmVudF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUJvYXJkKGJvYXJkLCBtdXRhYmxlKSB7XG4gIGNvbnN0IGJvYXJkQ29tcG9uZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgYm9hcmRDb21wb25lbnQuY2xhc3NMaXN0LmFkZChcImJvYXJkXCIpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmQuY2VsbHMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCByb3dDb21wb25lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHJvd0NvbXBvbmVudC5jbGFzc0xpc3QuYWRkKFwicm93XCIpO1xuXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBib2FyZC5jZWxsc1tpXS5sZW5ndGg7IGorKykge1xuICAgICAgY29uc3QgY2VsbENvbXBvbmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBjZWxsQ29tcG9uZW50LmNsYXNzTGlzdC5hZGQoXCJjZWxsXCIpO1xuICAgICAgY2VsbENvbXBvbmVudC5jbGFzc0xpc3QuYWRkKGdldENlbGxDbGFzc05hbWUoW2osIGldLCBib2FyZCkpO1xuXG4gICAgICBpZiAoIW11dGFibGUpIHtcbiAgICAgICAgY2VsbENvbXBvbmVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgIGlmICghaXNHYW1lU3RhcnRlZCB8fCBpc0dhbWVPdmVyKSByZXR1cm47XG5cbiAgICAgICAgICBjb25zdCBjZWxsID0gYm9hcmQuY2VsbHNbaV1bal07XG4gICAgICAgICAgaWYgKGNlbGwgIT09IENlbGxTdGF0ZS5FTVBUWSAmJiBjZWxsICE9PSBDZWxsU3RhdGUuU0hJUCkgcmV0dXJuO1xuXG4gICAgICAgICAgYm9hcmQucmVjZWl2ZUF0dGFjayhbaiwgaV0pO1xuICAgICAgICAgIGJvYXJkQ29tcG9uZW50LmRpc3BhdGNoRXZlbnQocmVmcmVzaEJvYXJkRXZlbnQpO1xuXG4gICAgICAgICAgaWYgKGJvYXJkLmlzRmxlZXREZXN0cm95ZWQoKSkge1xuICAgICAgICAgICAgY29uc3QgZ2FtZVdvbk92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgZ2FtZVdvbk92ZXJsYXkuY2xhc3NMaXN0LmFkZChcImdhbWUtb3Zlci1vdmVybGF5XCIpO1xuICAgICAgICAgICAgZ2FtZVdvbk92ZXJsYXkudGV4dENvbnRlbnQgPSBcIllPVSBXT04gVEhFIEdBTUUhXCI7XG4gICAgICAgICAgICBib2FyZENvbXBvbmVudC5hcHBlbmRDaGlsZChnYW1lV29uT3ZlcmxheSk7XG5cbiAgICAgICAgICAgIGlzR2FtZU92ZXIgPSB0cnVlO1xuICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChnYW1lT3ZlckV2ZW50KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KHJlY2VpdmVBdHRhY2tFdmVudCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAobXV0YWJsZSkge1xuICAgICAgICBjZWxsQ29tcG9uZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgaWYgKGNlbGxDb21wb25lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hpcFwiKSAmJiAhaXNHYW1lU3RhcnRlZCkge1xuICAgICAgICAgICAgdG9nZ2xlU2hpcE1vdGlvbihbaiwgaV0sIGJvYXJkLCBib2FyZENvbXBvbmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY2VsbENvbXBvbmVudC5hZGRFdmVudExpc3RlbmVyKFwiY29udGV4dG1lbnVcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgaWYgKGNlbGxDb21wb25lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hpcFwiKSAmJiAhaXNHYW1lU3RhcnRlZCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgY29uc3Qgc2hpcEluZGV4ID0gYm9hcmQuZ2V0U2hpcEluZGV4KGdldENlbGxJbmRleChjZWxsQ29tcG9uZW50KSk7XG4gICAgICAgICAgICBjb25zdCBzaGlwID0gYm9hcmQuc2hpcHNbc2hpcEluZGV4XTtcblxuICAgICAgICAgICAgaWYgKCFjZWxsQ29tcG9uZW50LmNsYXNzTGlzdC5jb250YWlucyhcIm1vdmluZ1wiKSkge1xuICAgICAgICAgICAgICB0b2dnbGVTaGlwTW90aW9uKHNoaXAuY29vcmRpbmF0ZXMsIGJvYXJkLCBib2FyZENvbXBvbmVudCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChib2FyZC5yb3RhdGVTaGlwKHNoaXBJbmRleCkpIHtcbiAgICAgICAgICAgICAgY2xlYXJTaGlwTW92ZW1lbnQoYm9hcmRDb21wb25lbnQpO1xuICAgICAgICAgICAgICB0b2dnbGVTaGlwTW90aW9uKHNoaXAuY29vcmRpbmF0ZXMsIGJvYXJkLCBib2FyZENvbXBvbmVudCk7XG4gICAgICAgICAgICAgIGJvYXJkQ29tcG9uZW50LmRpc3BhdGNoRXZlbnQocmVmcmVzaEJvYXJkRXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByb3dDb21wb25lbnQuYXBwZW5kQ2hpbGQoY2VsbENvbXBvbmVudCk7XG4gICAgfVxuICAgIGJvYXJkQ29tcG9uZW50LmFwcGVuZENoaWxkKHJvd0NvbXBvbmVudCk7XG4gIH1cblxuICByZXR1cm4gYm9hcmRDb21wb25lbnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByYW5kb21pemVTaGlwRm9ybWF0aW9uKGJvYXJkKSB7XG4gIGNvbnN0IHNoaXBzID0gWzUsIDQsIDMsIDMsIDJdO1xuXG4gIGJvYXJkLnNoaXBzID0gW107XG4gIGJvYXJkLmNlbGxzLmZvckVhY2goKHJvdykgPT4ge1xuICAgIHJvdy5maWxsKENlbGxTdGF0ZS5FTVBUWSk7XG4gIH0pO1xuXG4gIGZvciAoY29uc3Qgc2hpcCBvZiBzaGlwcykge1xuICAgIGxldCBwbGFjZWQgPSBmYWxzZTtcbiAgICB3aGlsZSAoIXBsYWNlZCkge1xuICAgICAgY29uc3Qgb3JpZW50YXRpb24gPVxuICAgICAgICBNYXRoLnJhbmRvbSgpID4gMC41XG4gICAgICAgICAgPyBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTFxuICAgICAgICAgIDogU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMO1xuXG4gICAgICBjb25zdCB4ID0gTWF0aC5mbG9vcihcbiAgICAgICAgTWF0aC5yYW5kb20oKSAqXG4gICAgICAgICAgKDEwIC0gKG9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCA/IHNoaXAgOiAwKSksXG4gICAgICApO1xuICAgICAgY29uc3QgeSA9IE1hdGguZmxvb3IoXG4gICAgICAgIE1hdGgucmFuZG9tKCkgKlxuICAgICAgICAgICgxMCAtIChvcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMID8gc2hpcCA6IDApKSxcbiAgICAgICk7XG5cbiAgICAgIHBsYWNlZCA9IGJvYXJkLnBsYWNlU2hpcChbeCwgeV0sIHNoaXAsIG9yaWVudGF0aW9uKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0Q2VsbEluZGV4KGNlbGwpIHtcbiAgcmV0dXJuIFtcbiAgICBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGNlbGwucGFyZW50Tm9kZS5jaGlsZHJlbiwgY2VsbCksXG4gICAgQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChcbiAgICAgIGNlbGwucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNoaWxkcmVuLFxuICAgICAgY2VsbC5wYXJlbnROb2RlLFxuICAgICksXG4gIF07XG59XG5cbmZ1bmN0aW9uIGdldENlbGxDbGFzc05hbWUoY29vcmRpbmF0ZXMsIGJvYXJkLCBzZWNyZXQgPSBmYWxzZSkge1xuICBjb25zdCBjZWxsID0gYm9hcmQuY2VsbHNbY29vcmRpbmF0ZXNbMV1dW2Nvb3JkaW5hdGVzWzBdXTtcbiAgc3dpdGNoIChjZWxsKSB7XG4gICAgY2FzZSBDZWxsU3RhdGUuRU1QVFk6XG4gICAgICByZXR1cm4gXCJlbXB0eVwiO1xuICAgIGNhc2UgQ2VsbFN0YXRlLk1JU1M6XG4gICAgICByZXR1cm4gXCJtaXNzXCI7XG4gICAgY2FzZSBDZWxsU3RhdGUuU0hJUDpcbiAgICAgIHJldHVybiBzZWNyZXQgPyBcImVtcHR5XCIgOiBcInNoaXBcIjtcbiAgICBjYXNlIENlbGxTdGF0ZS5ISVQ6XG4gICAgICByZXR1cm4gXCJoaXRcIjtcbiAgICBjYXNlIENlbGxTdGF0ZS5TVU5LOlxuICAgICAgcmV0dXJuIFwic3Vua1wiO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhclNoaXBNb3ZlbWVudChib2FyZENvbXBvbmVudCkge1xuICBjb25zdCBtb3ZpbmdDZWxscyA9IGJvYXJkQ29tcG9uZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubW92aW5nXCIpO1xuICBpZiAobW92aW5nQ2VsbHMubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgZm9yIChjb25zdCBjZWxsIG9mIG1vdmluZ0NlbGxzKSB7XG4gICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKFwibW92aW5nXCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZVNoaXBNb3Rpb24oY29vcmRpbmF0ZXMsIGJvYXJkLCBib2FyZENvbXBvbmVudCkge1xuICBjb25zdCBjZWxsID0gYm9hcmRDb21wb25lbnQuY2hpbGRyZW5bY29vcmRpbmF0ZXNbMV1dLmNoaWxkcmVuW2Nvb3JkaW5hdGVzWzBdXTtcblxuICBpZiAoIWNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hpcFwiKSkgcmV0dXJuO1xuXG4gIGNvbnN0IHNoaXBJbmRleCA9IGJvYXJkLmdldFNoaXBJbmRleChjb29yZGluYXRlcyk7XG4gIGxldCBzaGlwID0gYm9hcmQuc2hpcHNbc2hpcEluZGV4XTtcblxuICBzd2l0Y2ggKHNoaXAub3JpZW50YXRpb24pIHtcbiAgICBjYXNlIFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMOlxuICAgICAgZm9yIChcbiAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMF0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgIGkrK1xuICAgICAgKSB7XG4gICAgICAgIGJvYXJkQ29tcG9uZW50LmNoaWxkcmVuW3NoaXAuY29vcmRpbmF0ZXNbMV1dLmNoaWxkcmVuW1xuICAgICAgICAgIGlcbiAgICAgICAgXS5jbGFzc0xpc3QudG9nZ2xlKFwibW92aW5nXCIpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUw6XG4gICAgICBmb3IgKFxuICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMV07XG4gICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1sxXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgaSsrXG4gICAgICApIHtcbiAgICAgICAgYm9hcmRDb21wb25lbnQuY2hpbGRyZW5baV0uY2hpbGRyZW5bXG4gICAgICAgICAgc2hpcC5jb29yZGluYXRlc1swXVxuICAgICAgICBdLmNsYXNzTGlzdC50b2dnbGUoXCJtb3ZpbmdcIik7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgfVxufVxuXG5mdW5jdGlvbiByZWNlaXZlQ29tcHV0ZXJBdHRhY2soYm9hcmQsIGJvYXJkQ29tcG9uZW50KSB7XG4gIGxldCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYm9hcmQuc2l6ZSk7XG4gIGxldCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYm9hcmQuc2l6ZSk7XG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICBjb25zdCBjZWxsID0gYm9hcmRDb21wb25lbnQuY2hpbGRyZW5beV0uY2hpbGRyZW5beF07XG5cbiAgICBpZiAoIWNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZW1wdHlcIikgJiYgIWNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hpcFwiKSkge1xuICAgICAgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGJvYXJkLnNpemUpO1xuICAgICAgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGJvYXJkLnNpemUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBib2FyZC5yZWNlaXZlQXR0YWNrKFt4LCB5XSk7XG4gIGJvYXJkQ29tcG9uZW50LmRpc3BhdGNoRXZlbnQocmVmcmVzaEJvYXJkRXZlbnQpO1xuXG4gIGlmIChib2FyZC5pc0ZsZWV0RGVzdHJveWVkKCkpIHtcbiAgICBjb25zdCBnYW1lTG9zdE92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGdhbWVMb3N0T3ZlcmxheS5jbGFzc0xpc3QuYWRkKFwiZ2FtZS1vdmVyLW92ZXJsYXlcIik7XG4gICAgZ2FtZUxvc3RPdmVybGF5LnRleHRDb250ZW50ID0gXCJZT1UgTE9TVCBUSEUgR0FNRSFcIjtcbiAgICBib2FyZENvbXBvbmVudC5hcHBlbmRDaGlsZChnYW1lTG9zdE92ZXJsYXkpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBnYW1lU3RhcnRFdmVudCwgcmFuZG9taXplQm9hcmRFdmVudCB9IGZyb20gXCIuL2JvYXJkcy5qc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBDb250cm9scygpIHtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImdhbWUtc3RhcnRcIiwgKCkgPT4ge1xuICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jvb3RcIik7XG4gICAgcm9vdC5jbGFzc0xpc3QuYWRkKFwiZ2FtZS1zdGFydGVkXCIpO1xuXG4gICAgY29uc3Qgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0YXJ0XCIpO1xuICAgIHN0YXJ0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG5cbiAgICBjb25zdCByYW5kb21pemVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJhbmRvbWl6ZVwiKTtcbiAgICByYW5kb21pemVCdXR0b24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgfSk7XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImdhbWUtb3ZlclwiLCAoKSA9PiB7XG4gICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcm9vdFwiKTtcbiAgICByb290LmNsYXNzTGlzdC5yZW1vdmUoXCJnYW1lLXN0YXJ0ZWRcIik7XG5cbiAgICBjb25zdCByZXN0YXJ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXN0YXJ0XCIpO1xuICAgIHJlc3RhcnRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgfSk7XG5cbiAgY29uc3Qgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0YXJ0XCIpO1xuICBzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHN0YXJ0QnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGdhbWVTdGFydEV2ZW50KTtcbiAgfSk7XG5cbiAgY29uc3QgcmFuZG9taXplQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yYW5kb21pemVcIik7XG4gIHJhbmRvbWl6ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGNvbnN0IHBsYXllck9uZUJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ib2FyZC5wbGF5ZXItb25lXCIpO1xuICAgIHBsYXllck9uZUJvYXJkLmRpc3BhdGNoRXZlbnQocmFuZG9taXplQm9hcmRFdmVudCk7XG4gIH0pO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgY3JlYXRlUGxheWVyLCBQbGF5ZXJUeXBlIH0gZnJvbSBcIi4vY29yZS9wbGF5ZXIuanNcIjtcbmltcG9ydCB7IHNldHVwR2FtZUJvYXJkcyB9IGZyb20gXCIuL2RvbS9ib2FyZHMuanNcIjtcbmltcG9ydCB7IHNldHVwQ29udHJvbHMgfSBmcm9tIFwiLi9kb20vY29udHJvbHMuanNcIjtcblxuaW1wb3J0IFwiLi9zdHlsZXMvaW5kZXguY3NzXCI7XG5cbmNvbnNvbGUubG9nKFwiR2V0IFJlYWR5IGZvciBCYXR0bGUhXCIpO1xuXG5jb25zdCByb290ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpO1xuXG5yb290LmlubmVySFRNTCA9IGBcbiAgPGhlYWRlcj5CYXR0bGVzaGlwPC9oZWFkZXI+XG4gIDxkaXYgY2xhc3M9XCJib2FyZHNcIj48L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImNvbnRyb2xzXCI+XG4gICAgPGJ1dHRvbiBjbGFzcz1cInN0YXJ0XCI+U3RhcnQgR2FtZTwvYnV0dG9uPlxuICAgIDxidXR0b24gY2xhc3M9XCJyYW5kb21pemVcIj5SYW5kb21pemUgRm9ybWF0aW9uPC9idXR0b24+XG4gICAgPGJ1dHRvbiBjbGFzcz1cInJlc3RhcnQgaGlkZGVuXCI+UGxheSBBZ2FpbjwvYnV0dG9uPlxuICA8L2Rpdj5cbmA7XG5cbmNvbnN0IHBsYXllck9uZSA9IGNyZWF0ZVBsYXllcihQbGF5ZXJUeXBlLkhVTUFOKTtcbmNvbnN0IHBsYXllclR3byA9IGNyZWF0ZVBsYXllcihQbGF5ZXJUeXBlLkNPTVBVVEVSKTtcblxuY29uc3QgYm9hcmRzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ib2FyZHNcIik7XG5ib2FyZHNDb250YWluZXIuYXBwZW5kKC4uLnNldHVwR2FtZUJvYXJkcyhwbGF5ZXJPbmUsIHBsYXllclR3bykpO1xuXG5zZXR1cENvbnRyb2xzKCk7XG4iXSwibmFtZXMiOlsiY3JlYXRlU2hpcCIsIlNoaXBPcmllbnRhdGlvbiIsIkNlbGxTdGF0ZSIsIk9iamVjdCIsImZyZWV6ZSIsIkVNUFRZIiwiTUlTUyIsIlNISVAiLCJISVQiLCJTVU5LIiwiY3JlYXRlR2FtZUJvYXJkIiwic2l6ZSIsIkVycm9yIiwiY2VsbHMiLCJBcnJheSIsImZyb20iLCJsZW5ndGgiLCJzaGlwcyIsInBsYWNlU2hpcCIsImNvb3JkaW5hdGVzIiwib3JpZW50YXRpb24iLCJIT1JJWk9OVEFMIiwiVkVSVElDQUwiLCJpIiwicHVzaCIsIm1vdmVTaGlwIiwic2hpcEluZGV4Iiwic2hpcCIsInBvcCIsInJvdGF0ZVNoaXAiLCJuZXdPcmllbnRhdGlvbiIsImdldFNoaXBJbmRleCIsImoiLCJyZWNlaXZlQXR0YWNrIiwiaGl0IiwiaXNTdW5rIiwiaXNGbGVldERlc3Ryb3llZCIsIlBsYXllclR5cGUiLCJIVU1BTiIsIkNPTVBVVEVSIiwiY3JlYXRlUGxheWVyIiwidHlwZSIsImFjdGl2ZSIsImJvYXJkIiwiYWN0aXZhdGUiLCJkZWFjdGl2YXRlIiwiYXJndW1lbnRzIiwidW5kZWZpbmVkIiwiaGl0cyIsImdhbWVTdGFydEV2ZW50IiwiRXZlbnQiLCJnYW1lT3ZlckV2ZW50IiwicmVmcmVzaEJvYXJkRXZlbnQiLCJyYW5kb21pemVCb2FyZEV2ZW50IiwicmVjZWl2ZUF0dGFja0V2ZW50IiwiaXNHYW1lU3RhcnRlZCIsImlzR2FtZU92ZXIiLCJzZXR1cEdhbWVCb2FyZHMiLCJwbGF5ZXJPbmUiLCJwbGF5ZXJUd28iLCJyYW5kb21pemVTaGlwRm9ybWF0aW9uIiwicGxheWVyT25lQm9hcmRDb21wb25lbnQiLCJnZW5lcmF0ZUJvYXJkIiwiY2xhc3NMaXN0IiwiYWRkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNoaWxkcmVuIiwiZm9yRWFjaCIsInJvdyIsImNlbGwiLCJpc01vdmluZyIsImNvbnRhaW5zIiwiY2xhc3NOYW1lIiwiZ2V0Q2VsbENsYXNzTmFtZSIsImNsZWFyU2hpcE1vdmVtZW50IiwiZGlzcGF0Y2hFdmVudCIsImRvY3VtZW50IiwicmVjZWl2ZUNvbXB1dGVyQXR0YWNrIiwic2hpcE1vdmVtZW50SGFuZGxlciIsImV2ZW50IiwibW92aW5nU2hpcENlbGwiLCJxdWVyeVNlbGVjdG9yIiwibW92aW5nU2hpcENvb3JkaW5hdGVzIiwiZ2V0Q2VsbEluZGV4IiwibW92aW5nU2hpcEluZGV4IiwidG9nZ2xlU2hpcE1vdGlvbiIsIm1vdmVTdWNjZXNzZnVsIiwia2V5IiwibW92ZWRTaGlwIiwicGxheWVyVHdvQm9hcmRDb21wb25lbnQiLCJtdXRhYmxlIiwiYm9hcmRDb21wb25lbnQiLCJjcmVhdGVFbGVtZW50Iiwicm93Q29tcG9uZW50IiwiY2VsbENvbXBvbmVudCIsImdhbWVXb25PdmVybGF5IiwidGV4dENvbnRlbnQiLCJhcHBlbmRDaGlsZCIsInByZXZlbnREZWZhdWx0IiwiZmlsbCIsInBsYWNlZCIsIk1hdGgiLCJyYW5kb20iLCJ4IiwiZmxvb3IiLCJ5IiwicHJvdG90eXBlIiwiaW5kZXhPZiIsImNhbGwiLCJwYXJlbnROb2RlIiwic2VjcmV0IiwibW92aW5nQ2VsbHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwicmVtb3ZlIiwidG9nZ2xlIiwiZ2FtZUxvc3RPdmVybGF5Iiwic2V0dXBDb250cm9scyIsInJvb3QiLCJzdGFydEJ1dHRvbiIsInJhbmRvbWl6ZUJ1dHRvbiIsInJlc3RhcnRCdXR0b24iLCJkaXNhYmxlZCIsInBsYXllck9uZUJvYXJkIiwiY29uc29sZSIsImxvZyIsImdldEVsZW1lbnRCeUlkIiwiaW5uZXJIVE1MIiwiYm9hcmRzQ29udGFpbmVyIiwiYXBwZW5kIl0sInNvdXJjZVJvb3QiOiIifQ==