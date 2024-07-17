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
    reset: function () {
      this.cells = Array.from({
        length: size
      }, () => Array.from({
        length: size
      }, () => CellState.EMPTY));
      this.ships = [];
    },
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
/* harmony export */   restartGameEvent: function() { return /* binding */ restartGameEvent; },
/* harmony export */   setupGameBoards: function() { return /* binding */ setupGameBoards; }
/* harmony export */ });
/* harmony import */ var _core_gameBoard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/gameBoard.js */ "./src/core/gameBoard.js");
/* harmony import */ var _core_player_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/player.js */ "./src/core/player.js");
/* harmony import */ var _core_ship_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/ship.js */ "./src/core/ship.js");



const gameStartEvent = new Event("game-start");
const gameOverEvent = new Event("game-over");
const restartGameEvent = new Event("restart-game");
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
  playerTwoBoardComponent.addEventListener("randomize-board", () => {
    randomizeShipFormation(playerTwo.board);
    playerTwoBoardComponent.dispatchEvent(refreshBoardEvent);
  });
  document.addEventListener("game-start", () => {
    isGameStarted = true;
    clearShipMovement(playerOneBoardComponent);
  });
  document.addEventListener("restart-game", () => {
    const gameOverOverlay = document.querySelector(".game-over-overlay");
    if (gameOverOverlay) gameOverOverlay.remove();
    isGameOver = false;
    isGameStarted = false;
    playerOneBoardComponent.dispatchEvent(randomizeBoardEvent);
    playerTwoBoardComponent.dispatchEvent(randomizeBoardEvent);
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
            gameWonOverlay.innerHTML = `
              <p>YOU WON THE GAME!</p>
              <button class="restart">Play Again</button>
            `;
            console.log(board);
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
  board.reset();
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
    gameLostOverlay.innerHTML = `
      <p>YOU LOST THE GAME!</p>
      <button class="restart">Play Again</button>
    `;
    boardComponent.appendChild(gameLostOverlay);
    document.dispatchEvent(gameOverEvent);
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
    if (restartButton) {
      restartButton.addEventListener("click", () => {
        document.dispatchEvent(_boards_js__WEBPACK_IMPORTED_MODULE_0__.restartGameEvent);
        const startButton = document.querySelector(".start");
        startButton.classList.remove("hidden");
        const randomizeButton = document.querySelector(".randomize");
        randomizeButton.classList.remove("hidden");
      });
    }
  });
  const startButton = document.querySelector(".start");
  startButton.addEventListener("click", () => {
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
  </div>
`;
const playerOne = (0,_core_player_js__WEBPACK_IMPORTED_MODULE_0__.createPlayer)(_core_player_js__WEBPACK_IMPORTED_MODULE_0__.PlayerType.HUMAN);
const playerTwo = (0,_core_player_js__WEBPACK_IMPORTED_MODULE_0__.createPlayer)(_core_player_js__WEBPACK_IMPORTED_MODULE_0__.PlayerType.COMPUTER);
const boardsContainer = document.querySelector(".boards");
boardsContainer.append(...(0,_dom_boards_js__WEBPACK_IMPORTED_MODULE_1__.setupGameBoards)(playerOne, playerTwo));
(0,_dom_controls_js__WEBPACK_IMPORTED_MODULE_2__.setupControls)();

// const end = document.querySelector(".end");
// end.addEventListener("click", () => {
//   const gameWonOverlay = document.createElement("div");
//   gameWonOverlay.classList.add("game-over-overlay");
//   gameWonOverlay.innerHTML = `
//               <p>YOU WON THE GAME!</p>
//               <button class="restart">Play Again</button>
//             `;
//   document.querySelector(".player-one").appendChild(gameWonOverlay);
//   document.dispatchEvent(gameOverEvent);
// });
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEEsOENBQThDOzs7OztXQ0E5QztXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNONEQ7QUFDSztBQUNmO0FBRXRCO0FBRTVCOEMsT0FBTyxDQUFDQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7QUFFcEMsTUFBTW1CLElBQUksR0FBRzNDLFFBQVEsQ0FBQ2dELGNBQWMsQ0FBQyxNQUFNLENBQUM7QUFFNUNMLElBQUksQ0FBQ3JCLFNBQVMsR0FBRztBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBRUQsTUFBTXhDLFNBQVMsR0FBR25CLDZEQUFZLENBQUNILHVEQUFVLENBQUNDLEtBQUssQ0FBQztBQUNoRCxNQUFNc0IsU0FBUyxHQUFHcEIsNkRBQVksQ0FBQ0gsdURBQVUsQ0FBQ0UsUUFBUSxDQUFDO0FBRW5ELE1BQU11RixlQUFlLEdBQUdqRCxRQUFRLENBQUNLLGFBQWEsQ0FBQyxTQUFTLENBQUM7QUFDekQ0QyxlQUFlLENBQUNDLE1BQU0sQ0FBQyxHQUFHckUsK0RBQWUsQ0FBQ0MsU0FBUyxFQUFFQyxTQUFTLENBQUMsQ0FBQztBQUVoRTJELCtEQUFhLENBQUMsQ0FBQzs7QUFFZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE0iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9pbmRleC5jc3M/NGU0MiIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvcmUvZ2FtZUJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29yZS9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb3JlL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb20vYm9hcmRzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tL2NvbnRyb2xzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCB7IGNyZWF0ZVNoaXAsIFNoaXBPcmllbnRhdGlvbiB9IGZyb20gXCIuL3NoaXAuanNcIjtcblxuZXhwb3J0IGNvbnN0IENlbGxTdGF0ZSA9IE9iamVjdC5mcmVlemUoe1xuICBFTVBUWTogMCxcbiAgTUlTUzogMSxcbiAgU0hJUDogMixcbiAgSElUOiAzLFxuICBTVU5LOiA0LFxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVHYW1lQm9hcmQoc2l6ZSkge1xuICBpZiAoc2l6ZSA8PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBib2FyZCBzaXplXCIpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzaXplLFxuICAgIGNlbGxzOiBBcnJheS5mcm9tKHsgbGVuZ3RoOiBzaXplIH0sICgpID0+XG4gICAgICBBcnJheS5mcm9tKHsgbGVuZ3RoOiBzaXplIH0sICgpID0+IENlbGxTdGF0ZS5FTVBUWSksXG4gICAgKSxcbiAgICBzaGlwczogW10sXG5cbiAgICByZXNldDogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5jZWxscyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IHNpemUgfSwgKCkgPT5cbiAgICAgICAgQXJyYXkuZnJvbSh7IGxlbmd0aDogc2l6ZSB9LCAoKSA9PiBDZWxsU3RhdGUuRU1QVFkpLFxuICAgICAgKTtcbiAgICAgIHRoaXMuc2hpcHMgPSBbXTtcbiAgICB9LFxuXG4gICAgcGxhY2VTaGlwOiBmdW5jdGlvbiAoY29vcmRpbmF0ZXMsIGxlbmd0aCwgb3JpZW50YXRpb24pIHtcbiAgICAgIGlmIChcbiAgICAgICAgY29vcmRpbmF0ZXNbMF0gPCAwIHx8XG4gICAgICAgIGNvb3JkaW5hdGVzWzFdIDwgMCB8fFxuICAgICAgICBjb29yZGluYXRlc1swXSA+PSBzaXplIHx8XG4gICAgICAgIGNvb3JkaW5hdGVzWzFdID49IHNpemVcbiAgICAgICkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgcGxhY2Ugc2hpcCBvdXRzaWRlIHRoZSBib2FyZFwiKTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIChvcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwgJiZcbiAgICAgICAgICBjb29yZGluYXRlc1swXSArIGxlbmd0aCAtIDEgPj0gc2l6ZSkgfHxcbiAgICAgICAgKG9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwgJiZcbiAgICAgICAgICBjb29yZGluYXRlc1sxXSArIGxlbmd0aCAtIDEgPj0gc2l6ZSlcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IGNvb3JkaW5hdGVzWzBdOyBpIDw9IGNvb3JkaW5hdGVzWzBdICsgbGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgaWYgKHRoaXMuY2VsbHNbY29vcmRpbmF0ZXNbMV1dW2ldICE9PSBDZWxsU3RhdGUuRU1QVFkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAob3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICBmb3IgKGxldCBpID0gY29vcmRpbmF0ZXNbMV07IGkgPD0gY29vcmRpbmF0ZXNbMV0gKyBsZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICBpZiAodGhpcy5jZWxsc1tpXVtjb29yZGluYXRlc1swXV0gIT09IENlbGxTdGF0ZS5FTVBUWSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLnNoaXBzLnB1c2goY3JlYXRlU2hpcChsZW5ndGgsIGNvb3JkaW5hdGVzLCBvcmllbnRhdGlvbikpO1xuXG4gICAgICBpZiAob3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSBjb29yZGluYXRlc1swXTsgaSA8PSBjb29yZGluYXRlc1swXSArIGxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgIHRoaXMuY2VsbHNbY29vcmRpbmF0ZXNbMV1dW2ldID0gQ2VsbFN0YXRlLlNISVA7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAob3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICBmb3IgKGxldCBpID0gY29vcmRpbmF0ZXNbMV07IGkgPD0gY29vcmRpbmF0ZXNbMV0gKyBsZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICB0aGlzLmNlbGxzW2ldW2Nvb3JkaW5hdGVzWzBdXSA9IENlbGxTdGF0ZS5TSElQO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICBtb3ZlU2hpcDogZnVuY3Rpb24gKHNoaXBJbmRleCwgY29vcmRpbmF0ZXMpIHtcbiAgICAgIGNvbnN0IHNoaXAgPSB0aGlzLnNoaXBzW3NoaXBJbmRleF07XG4gICAgICBpZiAoIXNoaXApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2hpcCBkb2VzIG5vdCBleGlzdFwiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMKSB7XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5jZWxsc1tzaGlwLmNvb3JkaW5hdGVzWzFdXVtpXSA9IENlbGxTdGF0ZS5FTVBUWTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwpIHtcbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMV07XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmNlbGxzW2ldW3NoaXAuY29vcmRpbmF0ZXNbMF1dID0gQ2VsbFN0YXRlLkVNUFRZO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5wbGFjZVNoaXAoY29vcmRpbmF0ZXMsIHNoaXAubGVuZ3RoLCBzaGlwLm9yaWVudGF0aW9uKSkge1xuICAgICAgICBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwpIHtcbiAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgICAgaSsrXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmNlbGxzW3NoaXAuY29vcmRpbmF0ZXNbMV1dW2ldID0gQ2VsbFN0YXRlLlNISVA7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMV07XG4gICAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBpKytcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuY2VsbHNbaV1bc2hpcC5jb29yZGluYXRlc1swXV0gPSBDZWxsU3RhdGUuU0hJUDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNoaXBzW3NoaXBJbmRleF0gPSB0aGlzLnNoaXBzLnBvcCgpO1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuXG4gICAgcm90YXRlU2hpcDogZnVuY3Rpb24gKHNoaXBJbmRleCkge1xuICAgICAgY29uc3Qgc2hpcCA9IHRoaXMuc2hpcHNbc2hpcEluZGV4XTtcbiAgICAgIGlmICghc2hpcCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTaGlwIGRvZXMgbm90IGV4aXN0XCIpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBuZXdPcmllbnRhdGlvbiA9XG4gICAgICAgIHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMXG4gICAgICAgICAgPyBTaGlwT3JpZW50YXRpb24uVkVSVElDQUxcbiAgICAgICAgICA6IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMO1xuXG4gICAgICBpZiAobmV3T3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMKSB7XG4gICAgICAgIGlmIChzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxID49IHRoaXMuc2l6ZSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgMTtcbiAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMF0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgaSsrXG4gICAgICAgICkge1xuICAgICAgICAgIGlmICh0aGlzLmNlbGxzW3NoaXAuY29vcmRpbmF0ZXNbMV1dW2ldICE9PSBDZWxsU3RhdGUuRU1QVFkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAobmV3T3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICBpZiAoc2hpcC5jb29yZGluYXRlc1sxXSArIHNoaXAubGVuZ3RoIC0gMSA+PSB0aGlzLnNpemUpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1sxXSArIDE7XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICBpZiAodGhpcy5jZWxsc1tpXVtzaGlwLmNvb3JkaW5hdGVzWzBdXSAhPT0gQ2VsbFN0YXRlLkVNUFRZKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChuZXdPcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwpIHtcbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMV07XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmNlbGxzW2ldW3NoaXAuY29vcmRpbmF0ZXNbMF1dID0gQ2VsbFN0YXRlLkVNUFRZO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5jZWxsc1tzaGlwLmNvb3JkaW5hdGVzWzFdXVtpXSA9IENlbGxTdGF0ZS5TSElQO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKG5ld09yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwpIHtcbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMF07XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmNlbGxzW3NoaXAuY29vcmRpbmF0ZXNbMV1dW2ldID0gQ2VsbFN0YXRlLkVNUFRZO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzFdO1xuICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1sxXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5jZWxsc1tpXVtzaGlwLmNvb3JkaW5hdGVzWzBdXSA9IENlbGxTdGF0ZS5TSElQO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHNoaXAub3JpZW50YXRpb24gPSBuZXdPcmllbnRhdGlvbjtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICBnZXRTaGlwSW5kZXg6IGZ1bmN0aW9uIChjb29yZGluYXRlcykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLnNoaXBzW2ldLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCkge1xuICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICBsZXQgaiA9IHRoaXMuc2hpcHNbaV0uY29vcmRpbmF0ZXNbMF07XG4gICAgICAgICAgICBqIDw9IHRoaXMuc2hpcHNbaV0uY29vcmRpbmF0ZXNbMF0gKyB0aGlzLnNoaXBzW2ldLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBqKytcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgY29vcmRpbmF0ZXNbMF0gPT09IGogJiZcbiAgICAgICAgICAgICAgY29vcmRpbmF0ZXNbMV0gPT09IHRoaXMuc2hpcHNbaV0uY29vcmRpbmF0ZXNbMV1cbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zaGlwc1tpXS5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMKSB7XG4gICAgICAgICAgZm9yIChcbiAgICAgICAgICAgIGxldCBqID0gdGhpcy5zaGlwc1tpXS5jb29yZGluYXRlc1sxXTtcbiAgICAgICAgICAgIGogPD0gdGhpcy5zaGlwc1tpXS5jb29yZGluYXRlc1sxXSArIHRoaXMuc2hpcHNbaV0ubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGorK1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBjb29yZGluYXRlc1swXSA9PT0gdGhpcy5zaGlwc1tpXS5jb29yZGluYXRlc1swXSAmJlxuICAgICAgICAgICAgICBjb29yZGluYXRlc1sxXSA9PT0galxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBObyBzaGlwIGZvdW5kIGF0IGdpdmVuIGluZGV4OiBbJHtjb29yZGluYXRlc1swXX0sICR7Y29vcmRpbmF0ZXNbMV19XWAsXG4gICAgICApO1xuICAgIH0sXG5cbiAgICByZWNlaXZlQXR0YWNrOiBmdW5jdGlvbiAoY29vcmRpbmF0ZXMpIHtcbiAgICAgIGlmIChcbiAgICAgICAgY29vcmRpbmF0ZXNbMF0gPCAwIHx8XG4gICAgICAgIGNvb3JkaW5hdGVzWzFdIDwgMCB8fFxuICAgICAgICBjb29yZGluYXRlc1swXSA+PSBzaXplIHx8XG4gICAgICAgIGNvb3JkaW5hdGVzWzFdID49IHNpemVcbiAgICAgICkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgYXR0YWNrIG91dHNpZGUgdGhlIGJvYXJkXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuY2VsbHNbY29vcmRpbmF0ZXNbMV1dW2Nvb3JkaW5hdGVzWzBdXSAhPT0gQ2VsbFN0YXRlLkVNUFRZICYmXG4gICAgICAgIHRoaXMuY2VsbHNbY29vcmRpbmF0ZXNbMV1dW2Nvb3JkaW5hdGVzWzBdXSAhPT0gQ2VsbFN0YXRlLlNISVBcbiAgICAgICkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDZWxsIGhhcyBhbHJlYWR5IGJlZW4gYXR0YWNrZWRcIik7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmNlbGxzW2Nvb3JkaW5hdGVzWzFdXVtjb29yZGluYXRlc1swXV0gIT09IENlbGxTdGF0ZS5TSElQKSB7XG4gICAgICAgIHRoaXMuY2VsbHNbY29vcmRpbmF0ZXNbMV1dW2Nvb3JkaW5hdGVzWzBdXSA9IENlbGxTdGF0ZS5NSVNTO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGZvciAoY29uc3Qgc2hpcCBvZiB0aGlzLnNoaXBzKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwgJiZcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzWzFdID09PSBzaGlwLmNvb3JkaW5hdGVzWzFdICYmXG4gICAgICAgICAgICBjb29yZGluYXRlc1swXSA+PSBzaGlwLmNvb3JkaW5hdGVzWzBdICYmXG4gICAgICAgICAgICBjb29yZGluYXRlc1swXSA8PSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxKSB8fFxuICAgICAgICAgIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwgJiZcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzWzBdID09PSBzaGlwLmNvb3JkaW5hdGVzWzBdICYmXG4gICAgICAgICAgICBjb29yZGluYXRlc1sxXSA+PSBzaGlwLmNvb3JkaW5hdGVzWzFdICYmXG4gICAgICAgICAgICBjb29yZGluYXRlc1sxXSA8PSBzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxKVxuICAgICAgICApIHtcbiAgICAgICAgICBzaGlwLmhpdCgpO1xuXG4gICAgICAgICAgaWYgKHNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgICAgIGlmIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCkge1xuICAgICAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1swXTtcbiAgICAgICAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMF0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgaSsrXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2VsbHNbc2hpcC5jb29yZGluYXRlc1sxXV1baV0gPSBDZWxsU3RhdGUuU1VOSztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwpIHtcbiAgICAgICAgICAgICAgZm9yIChcbiAgICAgICAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMV07XG4gICAgICAgICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgIGkrK1xuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW2ldW3NoaXAuY29vcmRpbmF0ZXNbMF1dID0gQ2VsbFN0YXRlLlNVTks7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jZWxsc1tjb29yZGluYXRlc1sxXV1bY29vcmRpbmF0ZXNbMF1dID0gQ2VsbFN0YXRlLkhJVDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBpc0ZsZWV0RGVzdHJveWVkOiBmdW5jdGlvbiAoKSB7XG4gICAgICBmb3IgKGNvbnN0IHNoaXAgb2YgdGhpcy5zaGlwcykge1xuICAgICAgICBpZiAoIXNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgfTtcbn1cbiIsImltcG9ydCB7IGNyZWF0ZUdhbWVCb2FyZCB9IGZyb20gXCIuL2dhbWVCb2FyZC5qc1wiO1xuXG5leHBvcnQgY29uc3QgUGxheWVyVHlwZSA9IE9iamVjdC5mcmVlemUoe1xuICBIVU1BTjogXCJIVU1BTlwiLFxuICBDT01QVVRFUjogXCJDT01QVVRFUlwiLFxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQbGF5ZXIodHlwZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGUsXG4gICAgYWN0aXZlOiBmYWxzZSxcbiAgICBib2FyZDogY3JlYXRlR2FtZUJvYXJkKDEwKSxcblxuICAgIGFjdGl2YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGxheWVyIGlzIGFscmVhZHkgYWN0aXZlXCIpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgfSxcbiAgICBkZWFjdGl2YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIXRoaXMuYWN0aXZlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBsYXllciBpcyBhbHJlYWR5IGluYWN0aXZlXCIpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH0sXG4gIH07XG59XG4iLCJleHBvcnQgY29uc3QgU2hpcE9yaWVudGF0aW9uID0gT2JqZWN0LmZyZWV6ZSh7XG4gIEhPUklaT05UQUw6IFwiSE9SSVpPTlRBTFwiLFxuICBWRVJUSUNBTDogXCJWRVJUSUNBTFwiLFxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTaGlwKFxuICBsZW5ndGgsXG4gIGNvb3JkaW5hdGVzID0gW3VuZGVmaW5lZCwgdW5kZWZpbmVkXSxcbiAgb3JpZW50YXRpb24gPSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCxcbikge1xuICBpZiAobGVuZ3RoIDwgMSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgcmV0dXJuIHtcbiAgICBsZW5ndGgsXG4gICAgY29vcmRpbmF0ZXMsXG4gICAgb3JpZW50YXRpb24sXG4gICAgaGl0czogMCxcblxuICAgIGhpdDogZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRoaXMuaGl0cyA8IHRoaXMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuaGl0cysrO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBpc1N1bms6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmhpdHMgPT09IHRoaXMubGVuZ3RoO1xuICAgIH0sXG4gIH07XG59XG4iLCJpbXBvcnQgeyBDZWxsU3RhdGUgfSBmcm9tIFwiLi4vY29yZS9nYW1lQm9hcmQuanNcIjtcbmltcG9ydCB7IFBsYXllclR5cGUgfSBmcm9tIFwiLi4vY29yZS9wbGF5ZXIuanNcIjtcbmltcG9ydCB7IFNoaXBPcmllbnRhdGlvbiB9IGZyb20gXCIuLi9jb3JlL3NoaXAuanNcIjtcblxuZXhwb3J0IGNvbnN0IGdhbWVTdGFydEV2ZW50ID0gbmV3IEV2ZW50KFwiZ2FtZS1zdGFydFwiKTtcbmV4cG9ydCBjb25zdCBnYW1lT3ZlckV2ZW50ID0gbmV3IEV2ZW50KFwiZ2FtZS1vdmVyXCIpO1xuZXhwb3J0IGNvbnN0IHJlc3RhcnRHYW1lRXZlbnQgPSBuZXcgRXZlbnQoXCJyZXN0YXJ0LWdhbWVcIik7XG5leHBvcnQgY29uc3QgcmVmcmVzaEJvYXJkRXZlbnQgPSBuZXcgRXZlbnQoXCJyZWZyZXNoLWJvYXJkXCIpO1xuZXhwb3J0IGNvbnN0IHJhbmRvbWl6ZUJvYXJkRXZlbnQgPSBuZXcgRXZlbnQoXCJyYW5kb21pemUtYm9hcmRcIik7XG5jb25zdCByZWNlaXZlQXR0YWNrRXZlbnQgPSBuZXcgRXZlbnQoXCJyZWNlaXZlLWF0dGFja1wiKTtcblxubGV0IGlzR2FtZVN0YXJ0ZWQgPSBmYWxzZTtcbmxldCBpc0dhbWVPdmVyID0gZmFsc2U7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cEdhbWVCb2FyZHMocGxheWVyT25lLCBwbGF5ZXJUd28pIHtcbiAgcmFuZG9taXplU2hpcEZvcm1hdGlvbihwbGF5ZXJPbmUuYm9hcmQpO1xuICByYW5kb21pemVTaGlwRm9ybWF0aW9uKHBsYXllclR3by5ib2FyZCk7XG5cbiAgY29uc3QgcGxheWVyT25lQm9hcmRDb21wb25lbnQgPSBnZW5lcmF0ZUJvYXJkKHBsYXllck9uZS5ib2FyZCwgdHJ1ZSk7XG4gIHBsYXllck9uZUJvYXJkQ29tcG9uZW50LmNsYXNzTGlzdC5hZGQoXCJwbGF5ZXItb25lXCIsIFwiaHVtYW5cIik7XG5cbiAgcGxheWVyT25lQm9hcmRDb21wb25lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInJlZnJlc2gtYm9hcmRcIiwgKCkgPT4ge1xuICAgIEFycmF5LmZyb20ocGxheWVyT25lQm9hcmRDb21wb25lbnQuY2hpbGRyZW4pLmZvckVhY2goKHJvdywgaSkgPT4ge1xuICAgICAgQXJyYXkuZnJvbShyb3cuY2hpbGRyZW4pLmZvckVhY2goKGNlbGwsIGopID0+IHtcbiAgICAgICAgY29uc3QgaXNNb3ZpbmcgPSBjZWxsLmNsYXNzTGlzdC5jb250YWlucyhcIm1vdmluZ1wiKTtcblxuICAgICAgICBjZWxsLmNsYXNzTmFtZSA9IFwiY2VsbFwiO1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoZ2V0Q2VsbENsYXNzTmFtZShbaiwgaV0sIHBsYXllck9uZS5ib2FyZCkpO1xuICAgICAgICBpZiAoaXNNb3ZpbmcpIGNlbGwuY2xhc3NMaXN0LmFkZChcIm1vdmluZ1wiKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbiAgcGxheWVyT25lQm9hcmRDb21wb25lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInJhbmRvbWl6ZS1ib2FyZFwiLCAoKSA9PiB7XG4gICAgY2xlYXJTaGlwTW92ZW1lbnQocGxheWVyT25lQm9hcmRDb21wb25lbnQpO1xuICAgIHJhbmRvbWl6ZVNoaXBGb3JtYXRpb24ocGxheWVyT25lLmJvYXJkKTtcbiAgICBwbGF5ZXJPbmVCb2FyZENvbXBvbmVudC5kaXNwYXRjaEV2ZW50KHJlZnJlc2hCb2FyZEV2ZW50KTtcbiAgfSk7XG4gIHBsYXllck9uZUJvYXJkQ29tcG9uZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgXCJjbGlja1wiLFxuICAgICgpID0+IGNsZWFyU2hpcE1vdmVtZW50KHBsYXllck9uZUJvYXJkQ29tcG9uZW50KSxcbiAgICB0cnVlLFxuICApO1xuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJyZWNlaXZlLWF0dGFja1wiLCAoKSA9PiB7XG4gICAgaWYgKHBsYXllclR3by50eXBlID09PSBQbGF5ZXJUeXBlLkNPTVBVVEVSKSB7XG4gICAgICByZWNlaXZlQ29tcHV0ZXJBdHRhY2socGxheWVyT25lLmJvYXJkLCBwbGF5ZXJPbmVCb2FyZENvbXBvbmVudCk7XG4gICAgfVxuICB9KTtcblxuICBmdW5jdGlvbiBzaGlwTW92ZW1lbnRIYW5kbGVyKGV2ZW50KSB7XG4gICAgY29uc3QgbW92aW5nU2hpcENlbGwgPSBwbGF5ZXJPbmVCb2FyZENvbXBvbmVudC5xdWVyeVNlbGVjdG9yKFwiLm1vdmluZ1wiKTtcblxuICAgIGlmICghbW92aW5nU2hpcENlbGwpIHJldHVybjtcblxuICAgIGNvbnN0IG1vdmluZ1NoaXBDb29yZGluYXRlcyA9IGdldENlbGxJbmRleChtb3ZpbmdTaGlwQ2VsbCk7XG4gICAgY29uc3QgbW92aW5nU2hpcEluZGV4ID0gcGxheWVyT25lLmJvYXJkLmdldFNoaXBJbmRleChtb3ZpbmdTaGlwQ29vcmRpbmF0ZXMpO1xuXG4gICAgdG9nZ2xlU2hpcE1vdGlvbihcbiAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlcyxcbiAgICAgIHBsYXllck9uZS5ib2FyZCxcbiAgICAgIHBsYXllck9uZUJvYXJkQ29tcG9uZW50LFxuICAgICk7XG5cbiAgICBsZXQgbW92ZVN1Y2Nlc3NmdWwgPSBmYWxzZTtcbiAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgY2FzZSBcIkFycm93VXBcIjpcbiAgICAgICAgaWYgKG1vdmluZ1NoaXBDb29yZGluYXRlc1sxXSA8PSAwKSBicmVhaztcbiAgICAgICAgbW92ZVN1Y2Nlc3NmdWwgPSBwbGF5ZXJPbmUuYm9hcmQubW92ZVNoaXAobW92aW5nU2hpcEluZGV4LCBbXG4gICAgICAgICAgbW92aW5nU2hpcENvb3JkaW5hdGVzWzBdLFxuICAgICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlc1sxXSAtIDEsXG4gICAgICAgIF0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJBcnJvd0xlZnRcIjpcbiAgICAgICAgaWYgKG1vdmluZ1NoaXBDb29yZGluYXRlc1swXSA8PSAwKSBicmVhaztcbiAgICAgICAgbW92ZVN1Y2Nlc3NmdWwgPSBwbGF5ZXJPbmUuYm9hcmQubW92ZVNoaXAobW92aW5nU2hpcEluZGV4LCBbXG4gICAgICAgICAgbW92aW5nU2hpcENvb3JkaW5hdGVzWzBdIC0gMSxcbiAgICAgICAgICBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMV0sXG4gICAgICAgIF0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJBcnJvd0Rvd25cIjpcbiAgICAgICAgaWYgKG1vdmluZ1NoaXBDb29yZGluYXRlc1sxXSA+PSBwbGF5ZXJPbmUuYm9hcmQuc2l6ZSAtIDEpIGJyZWFrO1xuICAgICAgICBtb3ZlU3VjY2Vzc2Z1bCA9IHBsYXllck9uZS5ib2FyZC5tb3ZlU2hpcChtb3ZpbmdTaGlwSW5kZXgsIFtcbiAgICAgICAgICBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMF0sXG4gICAgICAgICAgbW92aW5nU2hpcENvb3JkaW5hdGVzWzFdICsgMSxcbiAgICAgICAgXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIkFycm93UmlnaHRcIjpcbiAgICAgICAgaWYgKG1vdmluZ1NoaXBDb29yZGluYXRlc1swXSA+PSBwbGF5ZXJPbmUuYm9hcmQuc2l6ZSAtIDEpIGJyZWFrO1xuICAgICAgICBtb3ZlU3VjY2Vzc2Z1bCA9IHBsYXllck9uZS5ib2FyZC5tb3ZlU2hpcChtb3ZpbmdTaGlwSW5kZXgsIFtcbiAgICAgICAgICBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMF0gKyAxLFxuICAgICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlc1sxXSxcbiAgICAgICAgXSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmICghbW92ZVN1Y2Nlc3NmdWwpIHtcbiAgICAgIHRvZ2dsZVNoaXBNb3Rpb24oXG4gICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlcyxcbiAgICAgICAgcGxheWVyT25lLmJvYXJkLFxuICAgICAgICBwbGF5ZXJPbmVCb2FyZENvbXBvbmVudCxcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcGxheWVyT25lQm9hcmRDb21wb25lbnQuZGlzcGF0Y2hFdmVudChyZWZyZXNoQm9hcmRFdmVudCk7XG5cbiAgICBjb25zdCBtb3ZlZFNoaXAgPSBwbGF5ZXJPbmUuYm9hcmQuc2hpcHNbbW92aW5nU2hpcEluZGV4XTtcbiAgICB0b2dnbGVTaGlwTW90aW9uKFxuICAgICAgbW92ZWRTaGlwLmNvb3JkaW5hdGVzLFxuICAgICAgcGxheWVyT25lLmJvYXJkLFxuICAgICAgcGxheWVyT25lQm9hcmRDb21wb25lbnQsXG4gICAgKTtcbiAgfVxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBzaGlwTW92ZW1lbnRIYW5kbGVyKTtcblxuICBjb25zdCBwbGF5ZXJUd29Cb2FyZENvbXBvbmVudCA9IGdlbmVyYXRlQm9hcmQocGxheWVyVHdvLmJvYXJkLCBmYWxzZSk7XG4gIHBsYXllclR3b0JvYXJkQ29tcG9uZW50LmNsYXNzTGlzdC5hZGQoXCJwbGF5ZXItdHdvXCIsIFwiY29tcHV0ZXJcIik7XG5cbiAgcGxheWVyVHdvQm9hcmRDb21wb25lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInJlZnJlc2gtYm9hcmRcIiwgKCkgPT4ge1xuICAgIEFycmF5LmZyb20ocGxheWVyVHdvQm9hcmRDb21wb25lbnQuY2hpbGRyZW4pLmZvckVhY2goKHJvdywgaSkgPT4ge1xuICAgICAgQXJyYXkuZnJvbShyb3cuY2hpbGRyZW4pLmZvckVhY2goKGNlbGwsIGopID0+IHtcbiAgICAgICAgY2VsbC5jbGFzc05hbWUgPSBcImNlbGxcIjtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKGdldENlbGxDbGFzc05hbWUoW2osIGldLCBwbGF5ZXJUd28uYm9hcmQsIHRydWUpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbiAgcGxheWVyVHdvQm9hcmRDb21wb25lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInJhbmRvbWl6ZS1ib2FyZFwiLCAoKSA9PiB7XG4gICAgcmFuZG9taXplU2hpcEZvcm1hdGlvbihwbGF5ZXJUd28uYm9hcmQpO1xuICAgIHBsYXllclR3b0JvYXJkQ29tcG9uZW50LmRpc3BhdGNoRXZlbnQocmVmcmVzaEJvYXJkRXZlbnQpO1xuICB9KTtcblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZ2FtZS1zdGFydFwiLCAoKSA9PiB7XG4gICAgaXNHYW1lU3RhcnRlZCA9IHRydWU7XG4gICAgY2xlYXJTaGlwTW92ZW1lbnQocGxheWVyT25lQm9hcmRDb21wb25lbnQpO1xuICB9KTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInJlc3RhcnQtZ2FtZVwiLCAoKSA9PiB7XG4gICAgY29uc3QgZ2FtZU92ZXJPdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lLW92ZXItb3ZlcmxheVwiKTtcbiAgICBpZiAoZ2FtZU92ZXJPdmVybGF5KSBnYW1lT3Zlck92ZXJsYXkucmVtb3ZlKCk7XG5cbiAgICBpc0dhbWVPdmVyID0gZmFsc2U7XG4gICAgaXNHYW1lU3RhcnRlZCA9IGZhbHNlO1xuXG4gICAgcGxheWVyT25lQm9hcmRDb21wb25lbnQuZGlzcGF0Y2hFdmVudChyYW5kb21pemVCb2FyZEV2ZW50KTtcbiAgICBwbGF5ZXJUd29Cb2FyZENvbXBvbmVudC5kaXNwYXRjaEV2ZW50KHJhbmRvbWl6ZUJvYXJkRXZlbnQpO1xuICB9KTtcblxuICByZXR1cm4gW3BsYXllck9uZUJvYXJkQ29tcG9uZW50LCBwbGF5ZXJUd29Cb2FyZENvbXBvbmVudF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUJvYXJkKGJvYXJkLCBtdXRhYmxlKSB7XG4gIGNvbnN0IGJvYXJkQ29tcG9uZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgYm9hcmRDb21wb25lbnQuY2xhc3NMaXN0LmFkZChcImJvYXJkXCIpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmQuY2VsbHMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCByb3dDb21wb25lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHJvd0NvbXBvbmVudC5jbGFzc0xpc3QuYWRkKFwicm93XCIpO1xuXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBib2FyZC5jZWxsc1tpXS5sZW5ndGg7IGorKykge1xuICAgICAgY29uc3QgY2VsbENvbXBvbmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBjZWxsQ29tcG9uZW50LmNsYXNzTGlzdC5hZGQoXCJjZWxsXCIpO1xuICAgICAgY2VsbENvbXBvbmVudC5jbGFzc0xpc3QuYWRkKGdldENlbGxDbGFzc05hbWUoW2osIGldLCBib2FyZCkpO1xuXG4gICAgICBpZiAoIW11dGFibGUpIHtcbiAgICAgICAgY2VsbENvbXBvbmVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgIGlmICghaXNHYW1lU3RhcnRlZCB8fCBpc0dhbWVPdmVyKSByZXR1cm47XG5cbiAgICAgICAgICBjb25zdCBjZWxsID0gYm9hcmQuY2VsbHNbaV1bal07XG4gICAgICAgICAgaWYgKGNlbGwgIT09IENlbGxTdGF0ZS5FTVBUWSAmJiBjZWxsICE9PSBDZWxsU3RhdGUuU0hJUCkgcmV0dXJuO1xuXG4gICAgICAgICAgYm9hcmQucmVjZWl2ZUF0dGFjayhbaiwgaV0pO1xuICAgICAgICAgIGJvYXJkQ29tcG9uZW50LmRpc3BhdGNoRXZlbnQocmVmcmVzaEJvYXJkRXZlbnQpO1xuXG4gICAgICAgICAgaWYgKGJvYXJkLmlzRmxlZXREZXN0cm95ZWQoKSkge1xuICAgICAgICAgICAgY29uc3QgZ2FtZVdvbk92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgZ2FtZVdvbk92ZXJsYXkuY2xhc3NMaXN0LmFkZChcImdhbWUtb3Zlci1vdmVybGF5XCIpO1xuICAgICAgICAgICAgZ2FtZVdvbk92ZXJsYXkuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgICA8cD5ZT1UgV09OIFRIRSBHQU1FITwvcD5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInJlc3RhcnRcIj5QbGF5IEFnYWluPC9idXR0b24+XG4gICAgICAgICAgICBgO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYm9hcmQpO1xuICAgICAgICAgICAgYm9hcmRDb21wb25lbnQuYXBwZW5kQ2hpbGQoZ2FtZVdvbk92ZXJsYXkpO1xuXG4gICAgICAgICAgICBpc0dhbWVPdmVyID0gdHJ1ZTtcbiAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZ2FtZU92ZXJFdmVudCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChyZWNlaXZlQXR0YWNrRXZlbnQpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKG11dGFibGUpIHtcbiAgICAgICAgY2VsbENvbXBvbmVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgIGlmIChjZWxsQ29tcG9uZW50LmNsYXNzTGlzdC5jb250YWlucyhcInNoaXBcIikgJiYgIWlzR2FtZVN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIHRvZ2dsZVNoaXBNb3Rpb24oW2osIGldLCBib2FyZCwgYm9hcmRDb21wb25lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNlbGxDb21wb25lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNvbnRleHRtZW51XCIsIChldmVudCkgPT4ge1xuICAgICAgICAgIGlmIChjZWxsQ29tcG9uZW50LmNsYXNzTGlzdC5jb250YWlucyhcInNoaXBcIikgJiYgIWlzR2FtZVN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHNoaXBJbmRleCA9IGJvYXJkLmdldFNoaXBJbmRleChnZXRDZWxsSW5kZXgoY2VsbENvbXBvbmVudCkpO1xuICAgICAgICAgICAgY29uc3Qgc2hpcCA9IGJvYXJkLnNoaXBzW3NoaXBJbmRleF07XG5cbiAgICAgICAgICAgIGlmICghY2VsbENvbXBvbmVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb3ZpbmdcIikpIHtcbiAgICAgICAgICAgICAgdG9nZ2xlU2hpcE1vdGlvbihzaGlwLmNvb3JkaW5hdGVzLCBib2FyZCwgYm9hcmRDb21wb25lbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYm9hcmQucm90YXRlU2hpcChzaGlwSW5kZXgpKSB7XG4gICAgICAgICAgICAgIGNsZWFyU2hpcE1vdmVtZW50KGJvYXJkQ29tcG9uZW50KTtcbiAgICAgICAgICAgICAgdG9nZ2xlU2hpcE1vdGlvbihzaGlwLmNvb3JkaW5hdGVzLCBib2FyZCwgYm9hcmRDb21wb25lbnQpO1xuICAgICAgICAgICAgICBib2FyZENvbXBvbmVudC5kaXNwYXRjaEV2ZW50KHJlZnJlc2hCb2FyZEV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcm93Q29tcG9uZW50LmFwcGVuZENoaWxkKGNlbGxDb21wb25lbnQpO1xuICAgIH1cbiAgICBib2FyZENvbXBvbmVudC5hcHBlbmRDaGlsZChyb3dDb21wb25lbnQpO1xuICB9XG5cbiAgcmV0dXJuIGJvYXJkQ29tcG9uZW50O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9taXplU2hpcEZvcm1hdGlvbihib2FyZCkge1xuICBjb25zdCBzaGlwcyA9IFs1LCA0LCAzLCAzLCAyXTtcblxuICBib2FyZC5yZXNldCgpO1xuXG4gIGZvciAoY29uc3Qgc2hpcCBvZiBzaGlwcykge1xuICAgIGxldCBwbGFjZWQgPSBmYWxzZTtcbiAgICB3aGlsZSAoIXBsYWNlZCkge1xuICAgICAgY29uc3Qgb3JpZW50YXRpb24gPVxuICAgICAgICBNYXRoLnJhbmRvbSgpID4gMC41XG4gICAgICAgICAgPyBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTFxuICAgICAgICAgIDogU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMO1xuXG4gICAgICBjb25zdCB4ID0gTWF0aC5mbG9vcihcbiAgICAgICAgTWF0aC5yYW5kb20oKSAqXG4gICAgICAgICAgKDEwIC0gKG9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCA/IHNoaXAgOiAwKSksXG4gICAgICApO1xuICAgICAgY29uc3QgeSA9IE1hdGguZmxvb3IoXG4gICAgICAgIE1hdGgucmFuZG9tKCkgKlxuICAgICAgICAgICgxMCAtIChvcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMID8gc2hpcCA6IDApKSxcbiAgICAgICk7XG5cbiAgICAgIHBsYWNlZCA9IGJvYXJkLnBsYWNlU2hpcChbeCwgeV0sIHNoaXAsIG9yaWVudGF0aW9uKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0Q2VsbEluZGV4KGNlbGwpIHtcbiAgcmV0dXJuIFtcbiAgICBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGNlbGwucGFyZW50Tm9kZS5jaGlsZHJlbiwgY2VsbCksXG4gICAgQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChcbiAgICAgIGNlbGwucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNoaWxkcmVuLFxuICAgICAgY2VsbC5wYXJlbnROb2RlLFxuICAgICksXG4gIF07XG59XG5cbmZ1bmN0aW9uIGdldENlbGxDbGFzc05hbWUoY29vcmRpbmF0ZXMsIGJvYXJkLCBzZWNyZXQgPSBmYWxzZSkge1xuICBjb25zdCBjZWxsID0gYm9hcmQuY2VsbHNbY29vcmRpbmF0ZXNbMV1dW2Nvb3JkaW5hdGVzWzBdXTtcbiAgc3dpdGNoIChjZWxsKSB7XG4gICAgY2FzZSBDZWxsU3RhdGUuRU1QVFk6XG4gICAgICByZXR1cm4gXCJlbXB0eVwiO1xuICAgIGNhc2UgQ2VsbFN0YXRlLk1JU1M6XG4gICAgICByZXR1cm4gXCJtaXNzXCI7XG4gICAgY2FzZSBDZWxsU3RhdGUuU0hJUDpcbiAgICAgIHJldHVybiBzZWNyZXQgPyBcImVtcHR5XCIgOiBcInNoaXBcIjtcbiAgICBjYXNlIENlbGxTdGF0ZS5ISVQ6XG4gICAgICByZXR1cm4gXCJoaXRcIjtcbiAgICBjYXNlIENlbGxTdGF0ZS5TVU5LOlxuICAgICAgcmV0dXJuIFwic3Vua1wiO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhclNoaXBNb3ZlbWVudChib2FyZENvbXBvbmVudCkge1xuICBjb25zdCBtb3ZpbmdDZWxscyA9IGJvYXJkQ29tcG9uZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubW92aW5nXCIpO1xuICBpZiAobW92aW5nQ2VsbHMubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgZm9yIChjb25zdCBjZWxsIG9mIG1vdmluZ0NlbGxzKSB7XG4gICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKFwibW92aW5nXCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZVNoaXBNb3Rpb24oY29vcmRpbmF0ZXMsIGJvYXJkLCBib2FyZENvbXBvbmVudCkge1xuICBjb25zdCBjZWxsID0gYm9hcmRDb21wb25lbnQuY2hpbGRyZW5bY29vcmRpbmF0ZXNbMV1dLmNoaWxkcmVuW2Nvb3JkaW5hdGVzWzBdXTtcblxuICBpZiAoIWNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hpcFwiKSkgcmV0dXJuO1xuXG4gIGNvbnN0IHNoaXBJbmRleCA9IGJvYXJkLmdldFNoaXBJbmRleChjb29yZGluYXRlcyk7XG4gIGxldCBzaGlwID0gYm9hcmQuc2hpcHNbc2hpcEluZGV4XTtcblxuICBzd2l0Y2ggKHNoaXAub3JpZW50YXRpb24pIHtcbiAgICBjYXNlIFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMOlxuICAgICAgZm9yIChcbiAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMF0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgIGkrK1xuICAgICAgKSB7XG4gICAgICAgIGJvYXJkQ29tcG9uZW50LmNoaWxkcmVuW3NoaXAuY29vcmRpbmF0ZXNbMV1dLmNoaWxkcmVuW1xuICAgICAgICAgIGlcbiAgICAgICAgXS5jbGFzc0xpc3QudG9nZ2xlKFwibW92aW5nXCIpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUw6XG4gICAgICBmb3IgKFxuICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMV07XG4gICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1sxXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgaSsrXG4gICAgICApIHtcbiAgICAgICAgYm9hcmRDb21wb25lbnQuY2hpbGRyZW5baV0uY2hpbGRyZW5bXG4gICAgICAgICAgc2hpcC5jb29yZGluYXRlc1swXVxuICAgICAgICBdLmNsYXNzTGlzdC50b2dnbGUoXCJtb3ZpbmdcIik7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgfVxufVxuXG5mdW5jdGlvbiByZWNlaXZlQ29tcHV0ZXJBdHRhY2soYm9hcmQsIGJvYXJkQ29tcG9uZW50KSB7XG4gIGxldCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYm9hcmQuc2l6ZSk7XG4gIGxldCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYm9hcmQuc2l6ZSk7XG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICBjb25zdCBjZWxsID0gYm9hcmRDb21wb25lbnQuY2hpbGRyZW5beV0uY2hpbGRyZW5beF07XG5cbiAgICBpZiAoIWNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZW1wdHlcIikgJiYgIWNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hpcFwiKSkge1xuICAgICAgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGJvYXJkLnNpemUpO1xuICAgICAgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGJvYXJkLnNpemUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBib2FyZC5yZWNlaXZlQXR0YWNrKFt4LCB5XSk7XG4gIGJvYXJkQ29tcG9uZW50LmRpc3BhdGNoRXZlbnQocmVmcmVzaEJvYXJkRXZlbnQpO1xuXG4gIGlmIChib2FyZC5pc0ZsZWV0RGVzdHJveWVkKCkpIHtcbiAgICBjb25zdCBnYW1lTG9zdE92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGdhbWVMb3N0T3ZlcmxheS5jbGFzc0xpc3QuYWRkKFwiZ2FtZS1vdmVyLW92ZXJsYXlcIik7XG5cbiAgICBnYW1lTG9zdE92ZXJsYXkuaW5uZXJIVE1MID0gYFxuICAgICAgPHA+WU9VIExPU1QgVEhFIEdBTUUhPC9wPlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cInJlc3RhcnRcIj5QbGF5IEFnYWluPC9idXR0b24+XG4gICAgYDtcbiAgICBib2FyZENvbXBvbmVudC5hcHBlbmRDaGlsZChnYW1lTG9zdE92ZXJsYXkpO1xuXG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChnYW1lT3ZlckV2ZW50KTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgZ2FtZVN0YXJ0RXZlbnQsXG4gIHJhbmRvbWl6ZUJvYXJkRXZlbnQsXG4gIHJlc3RhcnRHYW1lRXZlbnQsXG59IGZyb20gXCIuL2JvYXJkcy5qc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBDb250cm9scygpIHtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImdhbWUtc3RhcnRcIiwgKCkgPT4ge1xuICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jvb3RcIik7XG4gICAgcm9vdC5jbGFzc0xpc3QuYWRkKFwiZ2FtZS1zdGFydGVkXCIpO1xuXG4gICAgY29uc3Qgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0YXJ0XCIpO1xuICAgIHN0YXJ0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG5cbiAgICBjb25zdCByYW5kb21pemVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJhbmRvbWl6ZVwiKTtcbiAgICByYW5kb21pemVCdXR0b24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgfSk7XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImdhbWUtb3ZlclwiLCAoKSA9PiB7XG4gICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcm9vdFwiKTtcbiAgICByb290LmNsYXNzTGlzdC5yZW1vdmUoXCJnYW1lLXN0YXJ0ZWRcIik7XG5cbiAgICBjb25zdCByZXN0YXJ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXN0YXJ0XCIpO1xuICAgIGlmIChyZXN0YXJ0QnV0dG9uKSB7XG4gICAgICByZXN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQocmVzdGFydEdhbWVFdmVudCk7XG5cbiAgICAgICAgY29uc3Qgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0YXJ0XCIpO1xuICAgICAgICBzdGFydEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuXG4gICAgICAgIGNvbnN0IHJhbmRvbWl6ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmFuZG9taXplXCIpO1xuICAgICAgICByYW5kb21pemVCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3Qgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0YXJ0XCIpO1xuICBzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZ2FtZVN0YXJ0RXZlbnQpO1xuICB9KTtcblxuICBjb25zdCByYW5kb21pemVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJhbmRvbWl6ZVwiKTtcbiAgcmFuZG9taXplQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgY29uc3QgcGxheWVyT25lQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJvYXJkLnBsYXllci1vbmVcIik7XG4gICAgcGxheWVyT25lQm9hcmQuZGlzcGF0Y2hFdmVudChyYW5kb21pemVCb2FyZEV2ZW50KTtcbiAgfSk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBjcmVhdGVQbGF5ZXIsIFBsYXllclR5cGUgfSBmcm9tIFwiLi9jb3JlL3BsYXllci5qc1wiO1xuaW1wb3J0IHsgZ2FtZU92ZXJFdmVudCwgc2V0dXBHYW1lQm9hcmRzIH0gZnJvbSBcIi4vZG9tL2JvYXJkcy5qc1wiO1xuaW1wb3J0IHsgc2V0dXBDb250cm9scyB9IGZyb20gXCIuL2RvbS9jb250cm9scy5qc1wiO1xuXG5pbXBvcnQgXCIuL3N0eWxlcy9pbmRleC5jc3NcIjtcblxuY29uc29sZS5sb2coXCJHZXQgUmVhZHkgZm9yIEJhdHRsZSFcIik7XG5cbmNvbnN0IHJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIik7XG5cbnJvb3QuaW5uZXJIVE1MID0gYFxuICA8aGVhZGVyPkJhdHRsZXNoaXA8L2hlYWRlcj5cbiAgPGRpdiBjbGFzcz1cImJvYXJkc1wiPjwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiY29udHJvbHNcIj5cbiAgICA8YnV0dG9uIGNsYXNzPVwic3RhcnRcIj5TdGFydCBHYW1lPC9idXR0b24+XG4gICAgPGJ1dHRvbiBjbGFzcz1cInJhbmRvbWl6ZVwiPlJhbmRvbWl6ZSBGb3JtYXRpb248L2J1dHRvbj5cbiAgPC9kaXY+XG5gO1xuXG5jb25zdCBwbGF5ZXJPbmUgPSBjcmVhdGVQbGF5ZXIoUGxheWVyVHlwZS5IVU1BTik7XG5jb25zdCBwbGF5ZXJUd28gPSBjcmVhdGVQbGF5ZXIoUGxheWVyVHlwZS5DT01QVVRFUik7XG5cbmNvbnN0IGJvYXJkc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYm9hcmRzXCIpO1xuYm9hcmRzQ29udGFpbmVyLmFwcGVuZCguLi5zZXR1cEdhbWVCb2FyZHMocGxheWVyT25lLCBwbGF5ZXJUd28pKTtcblxuc2V0dXBDb250cm9scygpO1xuXG4vLyBjb25zdCBlbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmVuZFwiKTtcbi8vIGVuZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuLy8gICBjb25zdCBnYW1lV29uT3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4vLyAgIGdhbWVXb25PdmVybGF5LmNsYXNzTGlzdC5hZGQoXCJnYW1lLW92ZXItb3ZlcmxheVwiKTtcbi8vICAgZ2FtZVdvbk92ZXJsYXkuaW5uZXJIVE1MID0gYFxuLy8gICAgICAgICAgICAgICA8cD5ZT1UgV09OIFRIRSBHQU1FITwvcD5cbi8vICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInJlc3RhcnRcIj5QbGF5IEFnYWluPC9idXR0b24+XG4vLyAgICAgICAgICAgICBgO1xuLy8gICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1vbmVcIikuYXBwZW5kQ2hpbGQoZ2FtZVdvbk92ZXJsYXkpO1xuLy8gICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGdhbWVPdmVyRXZlbnQpO1xuLy8gfSk7XG4iXSwibmFtZXMiOlsiY3JlYXRlU2hpcCIsIlNoaXBPcmllbnRhdGlvbiIsIkNlbGxTdGF0ZSIsIk9iamVjdCIsImZyZWV6ZSIsIkVNUFRZIiwiTUlTUyIsIlNISVAiLCJISVQiLCJTVU5LIiwiY3JlYXRlR2FtZUJvYXJkIiwic2l6ZSIsIkVycm9yIiwiY2VsbHMiLCJBcnJheSIsImZyb20iLCJsZW5ndGgiLCJzaGlwcyIsInJlc2V0IiwicGxhY2VTaGlwIiwiY29vcmRpbmF0ZXMiLCJvcmllbnRhdGlvbiIsIkhPUklaT05UQUwiLCJWRVJUSUNBTCIsImkiLCJwdXNoIiwibW92ZVNoaXAiLCJzaGlwSW5kZXgiLCJzaGlwIiwicG9wIiwicm90YXRlU2hpcCIsIm5ld09yaWVudGF0aW9uIiwiZ2V0U2hpcEluZGV4IiwiaiIsInJlY2VpdmVBdHRhY2siLCJoaXQiLCJpc1N1bmsiLCJpc0ZsZWV0RGVzdHJveWVkIiwiUGxheWVyVHlwZSIsIkhVTUFOIiwiQ09NUFVURVIiLCJjcmVhdGVQbGF5ZXIiLCJ0eXBlIiwiYWN0aXZlIiwiYm9hcmQiLCJhY3RpdmF0ZSIsImRlYWN0aXZhdGUiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJoaXRzIiwiZ2FtZVN0YXJ0RXZlbnQiLCJFdmVudCIsImdhbWVPdmVyRXZlbnQiLCJyZXN0YXJ0R2FtZUV2ZW50IiwicmVmcmVzaEJvYXJkRXZlbnQiLCJyYW5kb21pemVCb2FyZEV2ZW50IiwicmVjZWl2ZUF0dGFja0V2ZW50IiwiaXNHYW1lU3RhcnRlZCIsImlzR2FtZU92ZXIiLCJzZXR1cEdhbWVCb2FyZHMiLCJwbGF5ZXJPbmUiLCJwbGF5ZXJUd28iLCJyYW5kb21pemVTaGlwRm9ybWF0aW9uIiwicGxheWVyT25lQm9hcmRDb21wb25lbnQiLCJnZW5lcmF0ZUJvYXJkIiwiY2xhc3NMaXN0IiwiYWRkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNoaWxkcmVuIiwiZm9yRWFjaCIsInJvdyIsImNlbGwiLCJpc01vdmluZyIsImNvbnRhaW5zIiwiY2xhc3NOYW1lIiwiZ2V0Q2VsbENsYXNzTmFtZSIsImNsZWFyU2hpcE1vdmVtZW50IiwiZGlzcGF0Y2hFdmVudCIsImRvY3VtZW50IiwicmVjZWl2ZUNvbXB1dGVyQXR0YWNrIiwic2hpcE1vdmVtZW50SGFuZGxlciIsImV2ZW50IiwibW92aW5nU2hpcENlbGwiLCJxdWVyeVNlbGVjdG9yIiwibW92aW5nU2hpcENvb3JkaW5hdGVzIiwiZ2V0Q2VsbEluZGV4IiwibW92aW5nU2hpcEluZGV4IiwidG9nZ2xlU2hpcE1vdGlvbiIsIm1vdmVTdWNjZXNzZnVsIiwia2V5IiwibW92ZWRTaGlwIiwicGxheWVyVHdvQm9hcmRDb21wb25lbnQiLCJnYW1lT3Zlck92ZXJsYXkiLCJyZW1vdmUiLCJtdXRhYmxlIiwiYm9hcmRDb21wb25lbnQiLCJjcmVhdGVFbGVtZW50Iiwicm93Q29tcG9uZW50IiwiY2VsbENvbXBvbmVudCIsImdhbWVXb25PdmVybGF5IiwiaW5uZXJIVE1MIiwiY29uc29sZSIsImxvZyIsImFwcGVuZENoaWxkIiwicHJldmVudERlZmF1bHQiLCJwbGFjZWQiLCJNYXRoIiwicmFuZG9tIiwieCIsImZsb29yIiwieSIsInByb3RvdHlwZSIsImluZGV4T2YiLCJjYWxsIiwicGFyZW50Tm9kZSIsInNlY3JldCIsIm1vdmluZ0NlbGxzIiwicXVlcnlTZWxlY3RvckFsbCIsInRvZ2dsZSIsImdhbWVMb3N0T3ZlcmxheSIsInNldHVwQ29udHJvbHMiLCJyb290Iiwic3RhcnRCdXR0b24iLCJyYW5kb21pemVCdXR0b24iLCJyZXN0YXJ0QnV0dG9uIiwicGxheWVyT25lQm9hcmQiLCJnZXRFbGVtZW50QnlJZCIsImJvYXJkc0NvbnRhaW5lciIsImFwcGVuZCJdLCJzb3VyY2VSb290IjoiIn0=