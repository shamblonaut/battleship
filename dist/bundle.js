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
  document.addEventListener("receive-attack", async () => {
    if (playerTwo.type === _core_player_js__WEBPACK_IMPORTED_MODULE_1__.PlayerType.COMPUTER) {
      await receiveComputerAttack(playerOne.board, playerOneBoardComponent);
      document.querySelector(".board-one-info").textContent = "";
      document.querySelector(".board-two-info").textContent = "Your Turn";
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
  document.querySelector(".board-two-info").textContent = "Your Turn";
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
          document.querySelector(".board-one-info").textContent = "Computer is thinking...";
          document.querySelector(".board-two-info").textContent = "";
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
async function receiveComputerAttack(board, boardComponent) {
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
  await new Promise(r => setTimeout(r, 1000));
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
    const controlsSection = document.querySelector(".controls");
    controlsSection.classList.add("hidden");
    const infoSection = document.querySelector(".info");
    infoSection.classList.remove("hidden");
  });
  document.addEventListener("game-over", () => {
    const root = document.querySelector("#root");
    root.classList.remove("game-started");
    const restartButton = document.querySelector(".restart");
    if (restartButton) {
      restartButton.addEventListener("click", () => {
        document.dispatchEvent(_boards_js__WEBPACK_IMPORTED_MODULE_0__.restartGameEvent);
        const controlsSection = document.querySelector(".controls");
        controlsSection.classList.remove("hidden");
        const infoSection = document.querySelector(".info");
        infoSection.classList.add("hidden");
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
    <button class="randomize">Randomize Formation</button>
    <button class="start">Start Game</button>
  </div>
  <div class="info hidden">
    <p class="board-one-info"></p>
    <p class="board-two-info"></p>
  </div>
`;
const playerOne = (0,_core_player_js__WEBPACK_IMPORTED_MODULE_0__.createPlayer)(_core_player_js__WEBPACK_IMPORTED_MODULE_0__.PlayerType.HUMAN);
const playerTwo = (0,_core_player_js__WEBPACK_IMPORTED_MODULE_0__.createPlayer)(_core_player_js__WEBPACK_IMPORTED_MODULE_0__.PlayerType.COMPUTER);
const boardsContainer = document.querySelector(".boards");
boardsContainer.append(...(0,_dom_boards_js__WEBPACK_IMPORTED_MODULE_1__.setupGameBoards)(playerOne, playerTwo));
(0,_dom_controls_js__WEBPACK_IMPORTED_MODULE_2__.setupControls)();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q3pEcUQsZUFBZSxDQUFDQyxNQUFNLENBQUMsR0FBRzNFLCtEQUFlLENBQUNDLFNBQVMsRUFBRUMsU0FBUyxDQUFDLENBQUM7QUFFaEUrRCwrREFBYSxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL2luZGV4LmNzcz80ZTQyIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29yZS9nYW1lQm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb3JlL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvcmUvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbS9ib2FyZHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb20vY29udHJvbHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IHsgY3JlYXRlU2hpcCwgU2hpcE9yaWVudGF0aW9uIH0gZnJvbSBcIi4vc2hpcC5qc1wiO1xuXG5leHBvcnQgY29uc3QgQ2VsbFN0YXRlID0gT2JqZWN0LmZyZWV6ZSh7XG4gIEVNUFRZOiAwLFxuICBNSVNTOiAxLFxuICBTSElQOiAyLFxuICBISVQ6IDMsXG4gIFNVTks6IDQsXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUdhbWVCb2FyZChzaXplKSB7XG4gIGlmIChzaXplIDw9IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGJvYXJkIHNpemVcIik7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHNpemUsXG4gICAgY2VsbHM6IEFycmF5LmZyb20oeyBsZW5ndGg6IHNpemUgfSwgKCkgPT5cbiAgICAgIEFycmF5LmZyb20oeyBsZW5ndGg6IHNpemUgfSwgKCkgPT4gQ2VsbFN0YXRlLkVNUFRZKSxcbiAgICApLFxuICAgIHNoaXBzOiBbXSxcblxuICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmNlbGxzID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogc2l6ZSB9LCAoKSA9PlxuICAgICAgICBBcnJheS5mcm9tKHsgbGVuZ3RoOiBzaXplIH0sICgpID0+IENlbGxTdGF0ZS5FTVBUWSksXG4gICAgICApO1xuICAgICAgdGhpcy5zaGlwcyA9IFtdO1xuICAgIH0sXG5cbiAgICBwbGFjZVNoaXA6IGZ1bmN0aW9uIChjb29yZGluYXRlcywgbGVuZ3RoLCBvcmllbnRhdGlvbikge1xuICAgICAgaWYgKFxuICAgICAgICBjb29yZGluYXRlc1swXSA8IDAgfHxcbiAgICAgICAgY29vcmRpbmF0ZXNbMV0gPCAwIHx8XG4gICAgICAgIGNvb3JkaW5hdGVzWzBdID49IHNpemUgfHxcbiAgICAgICAgY29vcmRpbmF0ZXNbMV0gPj0gc2l6ZVxuICAgICAgKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBwbGFjZSBzaGlwIG91dHNpZGUgdGhlIGJvYXJkXCIpO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgKG9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCAmJlxuICAgICAgICAgIGNvb3JkaW5hdGVzWzBdICsgbGVuZ3RoIC0gMSA+PSBzaXplKSB8fFxuICAgICAgICAob3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCAmJlxuICAgICAgICAgIGNvb3JkaW5hdGVzWzFdICsgbGVuZ3RoIC0gMSA+PSBzaXplKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCkge1xuICAgICAgICBmb3IgKGxldCBpID0gY29vcmRpbmF0ZXNbMF07IGkgPD0gY29vcmRpbmF0ZXNbMF0gKyBsZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICBpZiAodGhpcy5jZWxsc1tjb29yZGluYXRlc1sxXV1baV0gIT09IENlbGxTdGF0ZS5FTVBUWSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChvcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSBjb29yZGluYXRlc1sxXTsgaSA8PSBjb29yZGluYXRlc1sxXSArIGxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgIGlmICh0aGlzLmNlbGxzW2ldW2Nvb3JkaW5hdGVzWzBdXSAhPT0gQ2VsbFN0YXRlLkVNUFRZKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2hpcHMucHVzaChjcmVhdGVTaGlwKGxlbmd0aCwgY29vcmRpbmF0ZXMsIG9yaWVudGF0aW9uKSk7XG5cbiAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IGNvb3JkaW5hdGVzWzBdOyBpIDw9IGNvb3JkaW5hdGVzWzBdICsgbGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5jZWxsc1tjb29yZGluYXRlc1sxXV1baV0gPSBDZWxsU3RhdGUuU0hJUDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChvcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSBjb29yZGluYXRlc1sxXTsgaSA8PSBjb29yZGluYXRlc1sxXSArIGxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgIHRoaXMuY2VsbHNbaV1bY29vcmRpbmF0ZXNbMF1dID0gQ2VsbFN0YXRlLlNISVA7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIG1vdmVTaGlwOiBmdW5jdGlvbiAoc2hpcEluZGV4LCBjb29yZGluYXRlcykge1xuICAgICAgY29uc3Qgc2hpcCA9IHRoaXMuc2hpcHNbc2hpcEluZGV4XTtcbiAgICAgIGlmICghc2hpcCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTaGlwIGRvZXMgbm90IGV4aXN0XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwpIHtcbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMF07XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmNlbGxzW3NoaXAuY29vcmRpbmF0ZXNbMV1dW2ldID0gQ2VsbFN0YXRlLkVNUFRZO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1sxXTtcbiAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgaSsrXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuY2VsbHNbaV1bc2hpcC5jb29yZGluYXRlc1swXV0gPSBDZWxsU3RhdGUuRU1QVFk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLnBsYWNlU2hpcChjb29yZGluYXRlcywgc2hpcC5sZW5ndGgsIHNoaXAub3JpZW50YXRpb24pKSB7XG4gICAgICAgIGlmIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCkge1xuICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMF07XG4gICAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMF0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBpKytcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuY2VsbHNbc2hpcC5jb29yZGluYXRlc1sxXV1baV0gPSBDZWxsU3RhdGUuU0hJUDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMKSB7XG4gICAgICAgICAgZm9yIChcbiAgICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1sxXTtcbiAgICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1sxXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGkrK1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5jZWxsc1tpXVtzaGlwLmNvb3JkaW5hdGVzWzBdXSA9IENlbGxTdGF0ZS5TSElQO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2hpcHNbc2hpcEluZGV4XSA9IHRoaXMuc2hpcHMucG9wKCk7XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICByb3RhdGVTaGlwOiBmdW5jdGlvbiAoc2hpcEluZGV4KSB7XG4gICAgICBjb25zdCBzaGlwID0gdGhpcy5zaGlwc1tzaGlwSW5kZXhdO1xuICAgICAgaWYgKCFzaGlwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlNoaXAgZG9lcyBub3QgZXhpc3RcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5ld09yaWVudGF0aW9uID1cbiAgICAgICAgc2hpcC5vcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUxcbiAgICAgICAgICA/IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTFxuICAgICAgICAgIDogU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUw7XG5cbiAgICAgIGlmIChuZXdPcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwpIHtcbiAgICAgICAgaWYgKHNoaXAuY29vcmRpbmF0ZXNbMF0gKyBzaGlwLmxlbmd0aCAtIDEgPj0gdGhpcy5zaXplKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMF0gKyAxO1xuICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKHRoaXMuY2VsbHNbc2hpcC5jb29yZGluYXRlc1sxXV1baV0gIT09IENlbGxTdGF0ZS5FTVBUWSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChuZXdPcmllbnRhdGlvbiA9PT0gU2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMKSB7XG4gICAgICAgIGlmIChzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxID49IHRoaXMuc2l6ZSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzFdICsgMTtcbiAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgaSsrXG4gICAgICAgICkge1xuICAgICAgICAgIGlmICh0aGlzLmNlbGxzW2ldW3NoaXAuY29vcmRpbmF0ZXNbMF1dICE9PSBDZWxsU3RhdGUuRU1QVFkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG5ld09yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCkge1xuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1sxXTtcbiAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgaSsrXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuY2VsbHNbaV1bc2hpcC5jb29yZGluYXRlc1swXV0gPSBDZWxsU3RhdGUuRU1QVFk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMF07XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzBdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmNlbGxzW3NoaXAuY29vcmRpbmF0ZXNbMV1dW2ldID0gQ2VsbFN0YXRlLlNISVA7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAobmV3T3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1swXTtcbiAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMF0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgaSsrXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuY2VsbHNbc2hpcC5jb29yZGluYXRlc1sxXV1baV0gPSBDZWxsU3RhdGUuRU1QVFk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMV07XG4gICAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmNlbGxzW2ldW3NoaXAuY29vcmRpbmF0ZXNbMF1dID0gQ2VsbFN0YXRlLlNISVA7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc2hpcC5vcmllbnRhdGlvbiA9IG5ld09yaWVudGF0aW9uO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIGdldFNoaXBJbmRleDogZnVuY3Rpb24gKGNvb3JkaW5hdGVzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2hpcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMuc2hpcHNbaV0ub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMKSB7XG4gICAgICAgICAgZm9yIChcbiAgICAgICAgICAgIGxldCBqID0gdGhpcy5zaGlwc1tpXS5jb29yZGluYXRlc1swXTtcbiAgICAgICAgICAgIGogPD0gdGhpcy5zaGlwc1tpXS5jb29yZGluYXRlc1swXSArIHRoaXMuc2hpcHNbaV0ubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGorK1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBjb29yZGluYXRlc1swXSA9PT0gaiAmJlxuICAgICAgICAgICAgICBjb29yZGluYXRlc1sxXSA9PT0gdGhpcy5zaGlwc1tpXS5jb29yZGluYXRlc1sxXVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNoaXBzW2ldLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwpIHtcbiAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgbGV0IGogPSB0aGlzLnNoaXBzW2ldLmNvb3JkaW5hdGVzWzFdO1xuICAgICAgICAgICAgaiA8PSB0aGlzLnNoaXBzW2ldLmNvb3JkaW5hdGVzWzFdICsgdGhpcy5zaGlwc1tpXS5sZW5ndGggLSAxO1xuICAgICAgICAgICAgaisrXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGNvb3JkaW5hdGVzWzBdID09PSB0aGlzLnNoaXBzW2ldLmNvb3JkaW5hdGVzWzBdICYmXG4gICAgICAgICAgICAgIGNvb3JkaW5hdGVzWzFdID09PSBqXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYE5vIHNoaXAgZm91bmQgYXQgZ2l2ZW4gaW5kZXg6IFske2Nvb3JkaW5hdGVzWzBdfSwgJHtjb29yZGluYXRlc1sxXX1dYCxcbiAgICAgICk7XG4gICAgfSxcblxuICAgIHJlY2VpdmVBdHRhY2s6IGZ1bmN0aW9uIChjb29yZGluYXRlcykge1xuICAgICAgaWYgKFxuICAgICAgICBjb29yZGluYXRlc1swXSA8IDAgfHxcbiAgICAgICAgY29vcmRpbmF0ZXNbMV0gPCAwIHx8XG4gICAgICAgIGNvb3JkaW5hdGVzWzBdID49IHNpemUgfHxcbiAgICAgICAgY29vcmRpbmF0ZXNbMV0gPj0gc2l6ZVxuICAgICAgKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBhdHRhY2sgb3V0c2lkZSB0aGUgYm9hcmRcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5jZWxsc1tjb29yZGluYXRlc1sxXV1bY29vcmRpbmF0ZXNbMF1dICE9PSBDZWxsU3RhdGUuRU1QVFkgJiZcbiAgICAgICAgdGhpcy5jZWxsc1tjb29yZGluYXRlc1sxXV1bY29vcmRpbmF0ZXNbMF1dICE9PSBDZWxsU3RhdGUuU0hJUFxuICAgICAgKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNlbGwgaGFzIGFscmVhZHkgYmVlbiBhdHRhY2tlZFwiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuY2VsbHNbY29vcmRpbmF0ZXNbMV1dW2Nvb3JkaW5hdGVzWzBdXSAhPT0gQ2VsbFN0YXRlLlNISVApIHtcbiAgICAgICAgdGhpcy5jZWxsc1tjb29yZGluYXRlc1sxXV1bY29vcmRpbmF0ZXNbMF1dID0gQ2VsbFN0YXRlLk1JU1M7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgZm9yIChjb25zdCBzaGlwIG9mIHRoaXMuc2hpcHMpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIChzaGlwLm9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCAmJlxuICAgICAgICAgICAgY29vcmRpbmF0ZXNbMV0gPT09IHNoaXAuY29vcmRpbmF0ZXNbMV0gJiZcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzWzBdID49IHNoaXAuY29vcmRpbmF0ZXNbMF0gJiZcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzWzBdIDw9IHNoaXAuY29vcmRpbmF0ZXNbMF0gKyBzaGlwLmxlbmd0aCAtIDEpIHx8XG4gICAgICAgICAgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCAmJlxuICAgICAgICAgICAgY29vcmRpbmF0ZXNbMF0gPT09IHNoaXAuY29vcmRpbmF0ZXNbMF0gJiZcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzWzFdID49IHNoaXAuY29vcmRpbmF0ZXNbMV0gJiZcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzWzFdIDw9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDEpXG4gICAgICAgICkge1xuICAgICAgICAgIHNoaXAuaGl0KCk7XG5cbiAgICAgICAgICBpZiAoc2hpcC5pc1N1bmsoKSkge1xuICAgICAgICAgICAgaWYgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMKSB7XG4gICAgICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICAgICAgbGV0IGkgPSBzaGlwLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgICAgICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICBpKytcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jZWxsc1tzaGlwLmNvb3JkaW5hdGVzWzFdXVtpXSA9IENlbGxTdGF0ZS5TVU5LO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNoaXAub3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1sxXTtcbiAgICAgICAgICAgICAgICBpIDw9IHNoaXAuY29vcmRpbmF0ZXNbMV0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgaSsrXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2VsbHNbaV1bc2hpcC5jb29yZGluYXRlc1swXV0gPSBDZWxsU3RhdGUuU1VOSztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNlbGxzW2Nvb3JkaW5hdGVzWzFdXVtjb29yZGluYXRlc1swXV0gPSBDZWxsU3RhdGUuSElUO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGlzRmxlZXREZXN0cm95ZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGZvciAoY29uc3Qgc2hpcCBvZiB0aGlzLnNoaXBzKSB7XG4gICAgICAgIGlmICghc2hpcC5pc1N1bmsoKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICB9O1xufVxuIiwiaW1wb3J0IHsgY3JlYXRlR2FtZUJvYXJkIH0gZnJvbSBcIi4vZ2FtZUJvYXJkLmpzXCI7XG5cbmV4cG9ydCBjb25zdCBQbGF5ZXJUeXBlID0gT2JqZWN0LmZyZWV6ZSh7XG4gIEhVTUFOOiBcIkhVTUFOXCIsXG4gIENPTVBVVEVSOiBcIkNPTVBVVEVSXCIsXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBsYXllcih0eXBlKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZSxcbiAgICBhY3RpdmU6IGZhbHNlLFxuICAgIGJvYXJkOiBjcmVhdGVHYW1lQm9hcmQoMTApLFxuXG4gICAgYWN0aXZhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLmFjdGl2ZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQbGF5ZXIgaXMgYWxyZWFkeSBhY3RpdmVcIik7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICB9LFxuICAgIGRlYWN0aXZhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghdGhpcy5hY3RpdmUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGxheWVyIGlzIGFscmVhZHkgaW5hY3RpdmVcIik7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgfSxcbiAgfTtcbn1cbiIsImV4cG9ydCBjb25zdCBTaGlwT3JpZW50YXRpb24gPSBPYmplY3QuZnJlZXplKHtcbiAgSE9SSVpPTlRBTDogXCJIT1JJWk9OVEFMXCIsXG4gIFZFUlRJQ0FMOiBcIlZFUlRJQ0FMXCIsXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNoaXAoXG4gIGxlbmd0aCxcbiAgY29vcmRpbmF0ZXMgPSBbdW5kZWZpbmVkLCB1bmRlZmluZWRdLFxuICBvcmllbnRhdGlvbiA9IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMLFxuKSB7XG4gIGlmIChsZW5ndGggPCAxKSByZXR1cm4gdW5kZWZpbmVkO1xuICByZXR1cm4ge1xuICAgIGxlbmd0aCxcbiAgICBjb29yZGluYXRlcyxcbiAgICBvcmllbnRhdGlvbixcbiAgICBoaXRzOiAwLFxuXG4gICAgaGl0OiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpcy5oaXRzIDwgdGhpcy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5oaXRzKys7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGlzU3VuazogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGl0cyA9PT0gdGhpcy5sZW5ndGg7XG4gICAgfSxcbiAgfTtcbn1cbiIsImltcG9ydCB7IENlbGxTdGF0ZSB9IGZyb20gXCIuLi9jb3JlL2dhbWVCb2FyZC5qc1wiO1xuaW1wb3J0IHsgUGxheWVyVHlwZSB9IGZyb20gXCIuLi9jb3JlL3BsYXllci5qc1wiO1xuaW1wb3J0IHsgU2hpcE9yaWVudGF0aW9uIH0gZnJvbSBcIi4uL2NvcmUvc2hpcC5qc1wiO1xuXG5leHBvcnQgY29uc3QgZ2FtZVN0YXJ0RXZlbnQgPSBuZXcgRXZlbnQoXCJnYW1lLXN0YXJ0XCIpO1xuZXhwb3J0IGNvbnN0IGdhbWVPdmVyRXZlbnQgPSBuZXcgRXZlbnQoXCJnYW1lLW92ZXJcIik7XG5leHBvcnQgY29uc3QgcmVzdGFydEdhbWVFdmVudCA9IG5ldyBFdmVudChcInJlc3RhcnQtZ2FtZVwiKTtcbmV4cG9ydCBjb25zdCByZWZyZXNoQm9hcmRFdmVudCA9IG5ldyBFdmVudChcInJlZnJlc2gtYm9hcmRcIik7XG5leHBvcnQgY29uc3QgcmFuZG9taXplQm9hcmRFdmVudCA9IG5ldyBFdmVudChcInJhbmRvbWl6ZS1ib2FyZFwiKTtcbmNvbnN0IHJlY2VpdmVBdHRhY2tFdmVudCA9IG5ldyBFdmVudChcInJlY2VpdmUtYXR0YWNrXCIpO1xuXG5sZXQgaXNHYW1lU3RhcnRlZCA9IGZhbHNlO1xubGV0IGlzR2FtZU92ZXIgPSBmYWxzZTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwR2FtZUJvYXJkcyhwbGF5ZXJPbmUsIHBsYXllclR3bykge1xuICByYW5kb21pemVTaGlwRm9ybWF0aW9uKHBsYXllck9uZS5ib2FyZCk7XG4gIHJhbmRvbWl6ZVNoaXBGb3JtYXRpb24ocGxheWVyVHdvLmJvYXJkKTtcblxuICBjb25zdCBwbGF5ZXJPbmVCb2FyZENvbXBvbmVudCA9IGdlbmVyYXRlQm9hcmQocGxheWVyT25lLmJvYXJkLCB0cnVlKTtcbiAgcGxheWVyT25lQm9hcmRDb21wb25lbnQuY2xhc3NMaXN0LmFkZChcInBsYXllci1vbmVcIiwgXCJodW1hblwiKTtcblxuICBwbGF5ZXJPbmVCb2FyZENvbXBvbmVudC5hZGRFdmVudExpc3RlbmVyKFwicmVmcmVzaC1ib2FyZFwiLCAoKSA9PiB7XG4gICAgQXJyYXkuZnJvbShwbGF5ZXJPbmVCb2FyZENvbXBvbmVudC5jaGlsZHJlbikuZm9yRWFjaCgocm93LCBpKSA9PiB7XG4gICAgICBBcnJheS5mcm9tKHJvdy5jaGlsZHJlbikuZm9yRWFjaCgoY2VsbCwgaikgPT4ge1xuICAgICAgICBjb25zdCBpc01vdmluZyA9IGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKFwibW92aW5nXCIpO1xuXG4gICAgICAgIGNlbGwuY2xhc3NOYW1lID0gXCJjZWxsXCI7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChnZXRDZWxsQ2xhc3NOYW1lKFtqLCBpXSwgcGxheWVyT25lLmJvYXJkKSk7XG4gICAgICAgIGlmIChpc01vdmluZykgY2VsbC5jbGFzc0xpc3QuYWRkKFwibW92aW5nXCIpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuICBwbGF5ZXJPbmVCb2FyZENvbXBvbmVudC5hZGRFdmVudExpc3RlbmVyKFwicmFuZG9taXplLWJvYXJkXCIsICgpID0+IHtcbiAgICBjbGVhclNoaXBNb3ZlbWVudChwbGF5ZXJPbmVCb2FyZENvbXBvbmVudCk7XG4gICAgcmFuZG9taXplU2hpcEZvcm1hdGlvbihwbGF5ZXJPbmUuYm9hcmQpO1xuICAgIHBsYXllck9uZUJvYXJkQ29tcG9uZW50LmRpc3BhdGNoRXZlbnQocmVmcmVzaEJvYXJkRXZlbnQpO1xuICB9KTtcbiAgcGxheWVyT25lQm9hcmRDb21wb25lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICBcImNsaWNrXCIsXG4gICAgKCkgPT4gY2xlYXJTaGlwTW92ZW1lbnQocGxheWVyT25lQm9hcmRDb21wb25lbnQpLFxuICAgIHRydWUsXG4gICk7XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInJlY2VpdmUtYXR0YWNrXCIsIGFzeW5jICgpID0+IHtcbiAgICBpZiAocGxheWVyVHdvLnR5cGUgPT09IFBsYXllclR5cGUuQ09NUFVURVIpIHtcbiAgICAgIGF3YWl0IHJlY2VpdmVDb21wdXRlckF0dGFjayhwbGF5ZXJPbmUuYm9hcmQsIHBsYXllck9uZUJvYXJkQ29tcG9uZW50KTtcblxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ib2FyZC1vbmUtaW5mb1wiKS50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJvYXJkLXR3by1pbmZvXCIpLnRleHRDb250ZW50ID0gXCJZb3VyIFR1cm5cIjtcbiAgICB9XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHNoaXBNb3ZlbWVudEhhbmRsZXIoZXZlbnQpIHtcbiAgICBjb25zdCBtb3ZpbmdTaGlwQ2VsbCA9IHBsYXllck9uZUJvYXJkQ29tcG9uZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW92aW5nXCIpO1xuXG4gICAgaWYgKCFtb3ZpbmdTaGlwQ2VsbCkgcmV0dXJuO1xuXG4gICAgY29uc3QgbW92aW5nU2hpcENvb3JkaW5hdGVzID0gZ2V0Q2VsbEluZGV4KG1vdmluZ1NoaXBDZWxsKTtcbiAgICBjb25zdCBtb3ZpbmdTaGlwSW5kZXggPSBwbGF5ZXJPbmUuYm9hcmQuZ2V0U2hpcEluZGV4KG1vdmluZ1NoaXBDb29yZGluYXRlcyk7XG5cbiAgICB0b2dnbGVTaGlwTW90aW9uKFxuICAgICAgbW92aW5nU2hpcENvb3JkaW5hdGVzLFxuICAgICAgcGxheWVyT25lLmJvYXJkLFxuICAgICAgcGxheWVyT25lQm9hcmRDb21wb25lbnQsXG4gICAgKTtcblxuICAgIGxldCBtb3ZlU3VjY2Vzc2Z1bCA9IGZhbHNlO1xuICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICBjYXNlIFwiQXJyb3dVcFwiOlxuICAgICAgICBpZiAobW92aW5nU2hpcENvb3JkaW5hdGVzWzFdIDw9IDApIGJyZWFrO1xuICAgICAgICBtb3ZlU3VjY2Vzc2Z1bCA9IHBsYXllck9uZS5ib2FyZC5tb3ZlU2hpcChtb3ZpbmdTaGlwSW5kZXgsIFtcbiAgICAgICAgICBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMF0sXG4gICAgICAgICAgbW92aW5nU2hpcENvb3JkaW5hdGVzWzFdIC0gMSxcbiAgICAgICAgXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIkFycm93TGVmdFwiOlxuICAgICAgICBpZiAobW92aW5nU2hpcENvb3JkaW5hdGVzWzBdIDw9IDApIGJyZWFrO1xuICAgICAgICBtb3ZlU3VjY2Vzc2Z1bCA9IHBsYXllck9uZS5ib2FyZC5tb3ZlU2hpcChtb3ZpbmdTaGlwSW5kZXgsIFtcbiAgICAgICAgICBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMF0gLSAxLFxuICAgICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlc1sxXSxcbiAgICAgICAgXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIkFycm93RG93blwiOlxuICAgICAgICBpZiAobW92aW5nU2hpcENvb3JkaW5hdGVzWzFdID49IHBsYXllck9uZS5ib2FyZC5zaXplIC0gMSkgYnJlYWs7XG4gICAgICAgIG1vdmVTdWNjZXNzZnVsID0gcGxheWVyT25lLmJvYXJkLm1vdmVTaGlwKG1vdmluZ1NoaXBJbmRleCwgW1xuICAgICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlc1swXSxcbiAgICAgICAgICBtb3ZpbmdTaGlwQ29vcmRpbmF0ZXNbMV0gKyAxLFxuICAgICAgICBdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiQXJyb3dSaWdodFwiOlxuICAgICAgICBpZiAobW92aW5nU2hpcENvb3JkaW5hdGVzWzBdID49IHBsYXllck9uZS5ib2FyZC5zaXplIC0gMSkgYnJlYWs7XG4gICAgICAgIG1vdmVTdWNjZXNzZnVsID0gcGxheWVyT25lLmJvYXJkLm1vdmVTaGlwKG1vdmluZ1NoaXBJbmRleCwgW1xuICAgICAgICAgIG1vdmluZ1NoaXBDb29yZGluYXRlc1swXSArIDEsXG4gICAgICAgICAgbW92aW5nU2hpcENvb3JkaW5hdGVzWzFdLFxuICAgICAgICBdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKCFtb3ZlU3VjY2Vzc2Z1bCkge1xuICAgICAgdG9nZ2xlU2hpcE1vdGlvbihcbiAgICAgICAgbW92aW5nU2hpcENvb3JkaW5hdGVzLFxuICAgICAgICBwbGF5ZXJPbmUuYm9hcmQsXG4gICAgICAgIHBsYXllck9uZUJvYXJkQ29tcG9uZW50LFxuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBwbGF5ZXJPbmVCb2FyZENvbXBvbmVudC5kaXNwYXRjaEV2ZW50KHJlZnJlc2hCb2FyZEV2ZW50KTtcblxuICAgIGNvbnN0IG1vdmVkU2hpcCA9IHBsYXllck9uZS5ib2FyZC5zaGlwc1ttb3ZpbmdTaGlwSW5kZXhdO1xuICAgIHRvZ2dsZVNoaXBNb3Rpb24oXG4gICAgICBtb3ZlZFNoaXAuY29vcmRpbmF0ZXMsXG4gICAgICBwbGF5ZXJPbmUuYm9hcmQsXG4gICAgICBwbGF5ZXJPbmVCb2FyZENvbXBvbmVudCxcbiAgICApO1xuICB9XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHNoaXBNb3ZlbWVudEhhbmRsZXIpO1xuXG4gIGNvbnN0IHBsYXllclR3b0JvYXJkQ29tcG9uZW50ID0gZ2VuZXJhdGVCb2FyZChwbGF5ZXJUd28uYm9hcmQsIGZhbHNlKTtcbiAgcGxheWVyVHdvQm9hcmRDb21wb25lbnQuY2xhc3NMaXN0LmFkZChcInBsYXllci10d29cIiwgXCJjb21wdXRlclwiKTtcblxuICBwbGF5ZXJUd29Cb2FyZENvbXBvbmVudC5hZGRFdmVudExpc3RlbmVyKFwicmVmcmVzaC1ib2FyZFwiLCAoKSA9PiB7XG4gICAgQXJyYXkuZnJvbShwbGF5ZXJUd29Cb2FyZENvbXBvbmVudC5jaGlsZHJlbikuZm9yRWFjaCgocm93LCBpKSA9PiB7XG4gICAgICBBcnJheS5mcm9tKHJvdy5jaGlsZHJlbikuZm9yRWFjaCgoY2VsbCwgaikgPT4ge1xuICAgICAgICBjZWxsLmNsYXNzTmFtZSA9IFwiY2VsbFwiO1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoZ2V0Q2VsbENsYXNzTmFtZShbaiwgaV0sIHBsYXllclR3by5ib2FyZCwgdHJ1ZSkpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuICBwbGF5ZXJUd29Cb2FyZENvbXBvbmVudC5hZGRFdmVudExpc3RlbmVyKFwicmFuZG9taXplLWJvYXJkXCIsICgpID0+IHtcbiAgICByYW5kb21pemVTaGlwRm9ybWF0aW9uKHBsYXllclR3by5ib2FyZCk7XG4gICAgcGxheWVyVHdvQm9hcmRDb21wb25lbnQuZGlzcGF0Y2hFdmVudChyZWZyZXNoQm9hcmRFdmVudCk7XG4gIH0pO1xuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJnYW1lLXN0YXJ0XCIsICgpID0+IHtcbiAgICBpc0dhbWVTdGFydGVkID0gdHJ1ZTtcbiAgICBjbGVhclNoaXBNb3ZlbWVudChwbGF5ZXJPbmVCb2FyZENvbXBvbmVudCk7XG4gIH0pO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwicmVzdGFydC1nYW1lXCIsICgpID0+IHtcbiAgICBjb25zdCBnYW1lT3Zlck92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWUtb3Zlci1vdmVybGF5XCIpO1xuICAgIGlmIChnYW1lT3Zlck92ZXJsYXkpIGdhbWVPdmVyT3ZlcmxheS5yZW1vdmUoKTtcblxuICAgIGlzR2FtZU92ZXIgPSBmYWxzZTtcbiAgICBpc0dhbWVTdGFydGVkID0gZmFsc2U7XG5cbiAgICBwbGF5ZXJPbmVCb2FyZENvbXBvbmVudC5kaXNwYXRjaEV2ZW50KHJhbmRvbWl6ZUJvYXJkRXZlbnQpO1xuICAgIHBsYXllclR3b0JvYXJkQ29tcG9uZW50LmRpc3BhdGNoRXZlbnQocmFuZG9taXplQm9hcmRFdmVudCk7XG4gIH0pO1xuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYm9hcmQtdHdvLWluZm9cIikudGV4dENvbnRlbnQgPSBcIllvdXIgVHVyblwiO1xuXG4gIHJldHVybiBbcGxheWVyT25lQm9hcmRDb21wb25lbnQsIHBsYXllclR3b0JvYXJkQ29tcG9uZW50XTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlQm9hcmQoYm9hcmQsIG11dGFibGUpIHtcbiAgY29uc3QgYm9hcmRDb21wb25lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBib2FyZENvbXBvbmVudC5jbGFzc0xpc3QuYWRkKFwiYm9hcmRcIik7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBib2FyZC5jZWxscy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHJvd0NvbXBvbmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcm93Q29tcG9uZW50LmNsYXNzTGlzdC5hZGQoXCJyb3dcIik7XG5cbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGJvYXJkLmNlbGxzW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICBjb25zdCBjZWxsQ29tcG9uZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIGNlbGxDb21wb25lbnQuY2xhc3NMaXN0LmFkZChcImNlbGxcIik7XG4gICAgICBjZWxsQ29tcG9uZW50LmNsYXNzTGlzdC5hZGQoZ2V0Q2VsbENsYXNzTmFtZShbaiwgaV0sIGJvYXJkKSk7XG5cbiAgICAgIGlmICghbXV0YWJsZSkge1xuICAgICAgICBjZWxsQ29tcG9uZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgaWYgKCFpc0dhbWVTdGFydGVkIHx8IGlzR2FtZU92ZXIpIHJldHVybjtcblxuICAgICAgICAgIGNvbnN0IGNlbGwgPSBib2FyZC5jZWxsc1tpXVtqXTtcbiAgICAgICAgICBpZiAoY2VsbCAhPT0gQ2VsbFN0YXRlLkVNUFRZICYmIGNlbGwgIT09IENlbGxTdGF0ZS5TSElQKSByZXR1cm47XG5cbiAgICAgICAgICBib2FyZC5yZWNlaXZlQXR0YWNrKFtqLCBpXSk7XG4gICAgICAgICAgYm9hcmRDb21wb25lbnQuZGlzcGF0Y2hFdmVudChyZWZyZXNoQm9hcmRFdmVudCk7XG5cbiAgICAgICAgICBpZiAoYm9hcmQuaXNGbGVldERlc3Ryb3llZCgpKSB7XG4gICAgICAgICAgICBjb25zdCBnYW1lV29uT3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBnYW1lV29uT3ZlcmxheS5jbGFzc0xpc3QuYWRkKFwiZ2FtZS1vdmVyLW92ZXJsYXlcIik7XG4gICAgICAgICAgICBnYW1lV29uT3ZlcmxheS5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICAgIDxwPllPVSBXT04gVEhFIEdBTUUhPC9wPlxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicmVzdGFydFwiPlBsYXkgQWdhaW48L2J1dHRvbj5cbiAgICAgICAgICAgIGA7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhib2FyZCk7XG4gICAgICAgICAgICBib2FyZENvbXBvbmVudC5hcHBlbmRDaGlsZChnYW1lV29uT3ZlcmxheSk7XG5cbiAgICAgICAgICAgIGlzR2FtZU92ZXIgPSB0cnVlO1xuICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChnYW1lT3ZlckV2ZW50KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJvYXJkLW9uZS1pbmZvXCIpLnRleHRDb250ZW50ID1cbiAgICAgICAgICAgIFwiQ29tcHV0ZXIgaXMgdGhpbmtpbmcuLi5cIjtcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJvYXJkLXR3by1pbmZvXCIpLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KHJlY2VpdmVBdHRhY2tFdmVudCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAobXV0YWJsZSkge1xuICAgICAgICBjZWxsQ29tcG9uZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgaWYgKGNlbGxDb21wb25lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hpcFwiKSAmJiAhaXNHYW1lU3RhcnRlZCkge1xuICAgICAgICAgICAgdG9nZ2xlU2hpcE1vdGlvbihbaiwgaV0sIGJvYXJkLCBib2FyZENvbXBvbmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY2VsbENvbXBvbmVudC5hZGRFdmVudExpc3RlbmVyKFwiY29udGV4dG1lbnVcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgaWYgKGNlbGxDb21wb25lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hpcFwiKSAmJiAhaXNHYW1lU3RhcnRlZCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgY29uc3Qgc2hpcEluZGV4ID0gYm9hcmQuZ2V0U2hpcEluZGV4KGdldENlbGxJbmRleChjZWxsQ29tcG9uZW50KSk7XG4gICAgICAgICAgICBjb25zdCBzaGlwID0gYm9hcmQuc2hpcHNbc2hpcEluZGV4XTtcblxuICAgICAgICAgICAgaWYgKCFjZWxsQ29tcG9uZW50LmNsYXNzTGlzdC5jb250YWlucyhcIm1vdmluZ1wiKSkge1xuICAgICAgICAgICAgICB0b2dnbGVTaGlwTW90aW9uKHNoaXAuY29vcmRpbmF0ZXMsIGJvYXJkLCBib2FyZENvbXBvbmVudCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChib2FyZC5yb3RhdGVTaGlwKHNoaXBJbmRleCkpIHtcbiAgICAgICAgICAgICAgY2xlYXJTaGlwTW92ZW1lbnQoYm9hcmRDb21wb25lbnQpO1xuICAgICAgICAgICAgICB0b2dnbGVTaGlwTW90aW9uKHNoaXAuY29vcmRpbmF0ZXMsIGJvYXJkLCBib2FyZENvbXBvbmVudCk7XG4gICAgICAgICAgICAgIGJvYXJkQ29tcG9uZW50LmRpc3BhdGNoRXZlbnQocmVmcmVzaEJvYXJkRXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByb3dDb21wb25lbnQuYXBwZW5kQ2hpbGQoY2VsbENvbXBvbmVudCk7XG4gICAgfVxuICAgIGJvYXJkQ29tcG9uZW50LmFwcGVuZENoaWxkKHJvd0NvbXBvbmVudCk7XG4gIH1cblxuICByZXR1cm4gYm9hcmRDb21wb25lbnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByYW5kb21pemVTaGlwRm9ybWF0aW9uKGJvYXJkKSB7XG4gIGNvbnN0IHNoaXBzID0gWzUsIDQsIDMsIDMsIDJdO1xuXG4gIGJvYXJkLnJlc2V0KCk7XG5cbiAgZm9yIChjb25zdCBzaGlwIG9mIHNoaXBzKSB7XG4gICAgbGV0IHBsYWNlZCA9IGZhbHNlO1xuICAgIHdoaWxlICghcGxhY2VkKSB7XG4gICAgICBjb25zdCBvcmllbnRhdGlvbiA9XG4gICAgICAgIE1hdGgucmFuZG9tKCkgPiAwLjVcbiAgICAgICAgICA/IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMXG4gICAgICAgICAgOiBTaGlwT3JpZW50YXRpb24uVkVSVElDQUw7XG5cbiAgICAgIGNvbnN0IHggPSBNYXRoLmZsb29yKFxuICAgICAgICBNYXRoLnJhbmRvbSgpICpcbiAgICAgICAgICAoMTAgLSAob3JpZW50YXRpb24gPT09IFNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMID8gc2hpcCA6IDApKSxcbiAgICAgICk7XG4gICAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihcbiAgICAgICAgTWF0aC5yYW5kb20oKSAqXG4gICAgICAgICAgKDEwIC0gKG9yaWVudGF0aW9uID09PSBTaGlwT3JpZW50YXRpb24uVkVSVElDQUwgPyBzaGlwIDogMCkpLFxuICAgICAgKTtcblxuICAgICAgcGxhY2VkID0gYm9hcmQucGxhY2VTaGlwKFt4LCB5XSwgc2hpcCwgb3JpZW50YXRpb24pO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRDZWxsSW5kZXgoY2VsbCkge1xuICByZXR1cm4gW1xuICAgIEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoY2VsbC5wYXJlbnROb2RlLmNoaWxkcmVuLCBjZWxsKSxcbiAgICBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKFxuICAgICAgY2VsbC5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2hpbGRyZW4sXG4gICAgICBjZWxsLnBhcmVudE5vZGUsXG4gICAgKSxcbiAgXTtcbn1cblxuZnVuY3Rpb24gZ2V0Q2VsbENsYXNzTmFtZShjb29yZGluYXRlcywgYm9hcmQsIHNlY3JldCA9IGZhbHNlKSB7XG4gIGNvbnN0IGNlbGwgPSBib2FyZC5jZWxsc1tjb29yZGluYXRlc1sxXV1bY29vcmRpbmF0ZXNbMF1dO1xuICBzd2l0Y2ggKGNlbGwpIHtcbiAgICBjYXNlIENlbGxTdGF0ZS5FTVBUWTpcbiAgICAgIHJldHVybiBcImVtcHR5XCI7XG4gICAgY2FzZSBDZWxsU3RhdGUuTUlTUzpcbiAgICAgIHJldHVybiBcIm1pc3NcIjtcbiAgICBjYXNlIENlbGxTdGF0ZS5TSElQOlxuICAgICAgcmV0dXJuIHNlY3JldCA/IFwiZW1wdHlcIiA6IFwic2hpcFwiO1xuICAgIGNhc2UgQ2VsbFN0YXRlLkhJVDpcbiAgICAgIHJldHVybiBcImhpdFwiO1xuICAgIGNhc2UgQ2VsbFN0YXRlLlNVTks6XG4gICAgICByZXR1cm4gXCJzdW5rXCI7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyU2hpcE1vdmVtZW50KGJvYXJkQ29tcG9uZW50KSB7XG4gIGNvbnN0IG1vdmluZ0NlbGxzID0gYm9hcmRDb21wb25lbnQucXVlcnlTZWxlY3RvckFsbChcIi5tb3ZpbmdcIik7XG4gIGlmIChtb3ZpbmdDZWxscy5sZW5ndGggPT09IDApIHJldHVybjtcblxuICBmb3IgKGNvbnN0IGNlbGwgb2YgbW92aW5nQ2VsbHMpIHtcbiAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoXCJtb3ZpbmdcIik7XG4gIH1cbn1cblxuZnVuY3Rpb24gdG9nZ2xlU2hpcE1vdGlvbihjb29yZGluYXRlcywgYm9hcmQsIGJvYXJkQ29tcG9uZW50KSB7XG4gIGNvbnN0IGNlbGwgPSBib2FyZENvbXBvbmVudC5jaGlsZHJlbltjb29yZGluYXRlc1sxXV0uY2hpbGRyZW5bY29vcmRpbmF0ZXNbMF1dO1xuXG4gIGlmICghY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJzaGlwXCIpKSByZXR1cm47XG5cbiAgY29uc3Qgc2hpcEluZGV4ID0gYm9hcmQuZ2V0U2hpcEluZGV4KGNvb3JkaW5hdGVzKTtcbiAgbGV0IHNoaXAgPSBib2FyZC5zaGlwc1tzaGlwSW5kZXhdO1xuXG4gIHN3aXRjaCAoc2hpcC5vcmllbnRhdGlvbikge1xuICAgIGNhc2UgU2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUw6XG4gICAgICBmb3IgKFxuICAgICAgICBsZXQgaSA9IHNoaXAuY29vcmRpbmF0ZXNbMF07XG4gICAgICAgIGkgPD0gc2hpcC5jb29yZGluYXRlc1swXSArIHNoaXAubGVuZ3RoIC0gMTtcbiAgICAgICAgaSsrXG4gICAgICApIHtcbiAgICAgICAgYm9hcmRDb21wb25lbnQuY2hpbGRyZW5bc2hpcC5jb29yZGluYXRlc1sxXV0uY2hpbGRyZW5bXG4gICAgICAgICAgaVxuICAgICAgICBdLmNsYXNzTGlzdC50b2dnbGUoXCJtb3ZpbmdcIik7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlIFNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTDpcbiAgICAgIGZvciAoXG4gICAgICAgIGxldCBpID0gc2hpcC5jb29yZGluYXRlc1sxXTtcbiAgICAgICAgaSA8PSBzaGlwLmNvb3JkaW5hdGVzWzFdICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICBpKytcbiAgICAgICkge1xuICAgICAgICBib2FyZENvbXBvbmVudC5jaGlsZHJlbltpXS5jaGlsZHJlbltcbiAgICAgICAgICBzaGlwLmNvb3JkaW5hdGVzWzBdXG4gICAgICAgIF0uY2xhc3NMaXN0LnRvZ2dsZShcIm1vdmluZ1wiKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlY2VpdmVDb21wdXRlckF0dGFjayhib2FyZCwgYm9hcmRDb21wb25lbnQpIHtcbiAgbGV0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBib2FyZC5zaXplKTtcbiAgbGV0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBib2FyZC5zaXplKTtcblxuICB3aGlsZSAodHJ1ZSkge1xuICAgIGNvbnN0IGNlbGwgPSBib2FyZENvbXBvbmVudC5jaGlsZHJlblt5XS5jaGlsZHJlblt4XTtcblxuICAgIGlmICghY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJlbXB0eVwiKSAmJiAhY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJzaGlwXCIpKSB7XG4gICAgICB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYm9hcmQuc2l6ZSk7XG4gICAgICB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYm9hcmQuc2l6ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGF3YWl0IG5ldyBQcm9taXNlKChyKSA9PiBzZXRUaW1lb3V0KHIsIDEwMDApKTtcblxuICBib2FyZC5yZWNlaXZlQXR0YWNrKFt4LCB5XSk7XG4gIGJvYXJkQ29tcG9uZW50LmRpc3BhdGNoRXZlbnQocmVmcmVzaEJvYXJkRXZlbnQpO1xuXG4gIGlmIChib2FyZC5pc0ZsZWV0RGVzdHJveWVkKCkpIHtcbiAgICBjb25zdCBnYW1lTG9zdE92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGdhbWVMb3N0T3ZlcmxheS5jbGFzc0xpc3QuYWRkKFwiZ2FtZS1vdmVyLW92ZXJsYXlcIik7XG5cbiAgICBnYW1lTG9zdE92ZXJsYXkuaW5uZXJIVE1MID0gYFxuICAgICAgPHA+WU9VIExPU1QgVEhFIEdBTUUhPC9wPlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cInJlc3RhcnRcIj5QbGF5IEFnYWluPC9idXR0b24+XG4gICAgYDtcbiAgICBib2FyZENvbXBvbmVudC5hcHBlbmRDaGlsZChnYW1lTG9zdE92ZXJsYXkpO1xuXG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChnYW1lT3ZlckV2ZW50KTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgZ2FtZVN0YXJ0RXZlbnQsXG4gIHJhbmRvbWl6ZUJvYXJkRXZlbnQsXG4gIHJlc3RhcnRHYW1lRXZlbnQsXG59IGZyb20gXCIuL2JvYXJkcy5qc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBDb250cm9scygpIHtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImdhbWUtc3RhcnRcIiwgKCkgPT4ge1xuICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jvb3RcIik7XG4gICAgcm9vdC5jbGFzc0xpc3QuYWRkKFwiZ2FtZS1zdGFydGVkXCIpO1xuXG4gICAgY29uc3QgY29udHJvbHNTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250cm9sc1wiKTtcbiAgICBjb250cm9sc1NlY3Rpb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcblxuICAgIGNvbnN0IGluZm9TZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmZvXCIpO1xuICAgIGluZm9TZWN0aW9uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gIH0pO1xuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJnYW1lLW92ZXJcIiwgKCkgPT4ge1xuICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jvb3RcIik7XG4gICAgcm9vdC5jbGFzc0xpc3QucmVtb3ZlKFwiZ2FtZS1zdGFydGVkXCIpO1xuXG4gICAgY29uc3QgcmVzdGFydEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzdGFydFwiKTtcbiAgICBpZiAocmVzdGFydEJ1dHRvbikge1xuICAgICAgcmVzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KHJlc3RhcnRHYW1lRXZlbnQpO1xuXG4gICAgICAgIGNvbnN0IGNvbnRyb2xzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udHJvbHNcIik7XG4gICAgICAgIGNvbnRyb2xzU2VjdGlvbi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuXG4gICAgICAgIGNvbnN0IGluZm9TZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmZvXCIpO1xuICAgICAgICBpbmZvU2VjdGlvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcblxuICBjb25zdCBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RhcnRcIik7XG4gIHN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChnYW1lU3RhcnRFdmVudCk7XG4gIH0pO1xuXG4gIGNvbnN0IHJhbmRvbWl6ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmFuZG9taXplXCIpO1xuICByYW5kb21pemVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBjb25zdCBwbGF5ZXJPbmVCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYm9hcmQucGxheWVyLW9uZVwiKTtcbiAgICBwbGF5ZXJPbmVCb2FyZC5kaXNwYXRjaEV2ZW50KHJhbmRvbWl6ZUJvYXJkRXZlbnQpO1xuICB9KTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGNyZWF0ZVBsYXllciwgUGxheWVyVHlwZSB9IGZyb20gXCIuL2NvcmUvcGxheWVyLmpzXCI7XG5pbXBvcnQgeyBnYW1lT3ZlckV2ZW50LCBzZXR1cEdhbWVCb2FyZHMgfSBmcm9tIFwiLi9kb20vYm9hcmRzLmpzXCI7XG5pbXBvcnQgeyBzZXR1cENvbnRyb2xzIH0gZnJvbSBcIi4vZG9tL2NvbnRyb2xzLmpzXCI7XG5cbmltcG9ydCBcIi4vc3R5bGVzL2luZGV4LmNzc1wiO1xuXG5jb25zb2xlLmxvZyhcIkdldCBSZWFkeSBmb3IgQmF0dGxlIVwiKTtcblxuY29uc3Qgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKTtcblxucm9vdC5pbm5lckhUTUwgPSBgXG4gIDxoZWFkZXI+QmF0dGxlc2hpcDwvaGVhZGVyPlxuICA8ZGl2IGNsYXNzPVwiYm9hcmRzXCI+PC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJjb250cm9sc1wiPlxuICAgIDxidXR0b24gY2xhc3M9XCJyYW5kb21pemVcIj5SYW5kb21pemUgRm9ybWF0aW9uPC9idXR0b24+XG4gICAgPGJ1dHRvbiBjbGFzcz1cInN0YXJ0XCI+U3RhcnQgR2FtZTwvYnV0dG9uPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImluZm8gaGlkZGVuXCI+XG4gICAgPHAgY2xhc3M9XCJib2FyZC1vbmUtaW5mb1wiPjwvcD5cbiAgICA8cCBjbGFzcz1cImJvYXJkLXR3by1pbmZvXCI+PC9wPlxuICA8L2Rpdj5cbmA7XG5cbmNvbnN0IHBsYXllck9uZSA9IGNyZWF0ZVBsYXllcihQbGF5ZXJUeXBlLkhVTUFOKTtcbmNvbnN0IHBsYXllclR3byA9IGNyZWF0ZVBsYXllcihQbGF5ZXJUeXBlLkNPTVBVVEVSKTtcblxuY29uc3QgYm9hcmRzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ib2FyZHNcIik7XG5ib2FyZHNDb250YWluZXIuYXBwZW5kKC4uLnNldHVwR2FtZUJvYXJkcyhwbGF5ZXJPbmUsIHBsYXllclR3bykpO1xuXG5zZXR1cENvbnRyb2xzKCk7XG4iXSwibmFtZXMiOlsiY3JlYXRlU2hpcCIsIlNoaXBPcmllbnRhdGlvbiIsIkNlbGxTdGF0ZSIsIk9iamVjdCIsImZyZWV6ZSIsIkVNUFRZIiwiTUlTUyIsIlNISVAiLCJISVQiLCJTVU5LIiwiY3JlYXRlR2FtZUJvYXJkIiwic2l6ZSIsIkVycm9yIiwiY2VsbHMiLCJBcnJheSIsImZyb20iLCJsZW5ndGgiLCJzaGlwcyIsInJlc2V0IiwicGxhY2VTaGlwIiwiY29vcmRpbmF0ZXMiLCJvcmllbnRhdGlvbiIsIkhPUklaT05UQUwiLCJWRVJUSUNBTCIsImkiLCJwdXNoIiwibW92ZVNoaXAiLCJzaGlwSW5kZXgiLCJzaGlwIiwicG9wIiwicm90YXRlU2hpcCIsIm5ld09yaWVudGF0aW9uIiwiZ2V0U2hpcEluZGV4IiwiaiIsInJlY2VpdmVBdHRhY2siLCJoaXQiLCJpc1N1bmsiLCJpc0ZsZWV0RGVzdHJveWVkIiwiUGxheWVyVHlwZSIsIkhVTUFOIiwiQ09NUFVURVIiLCJjcmVhdGVQbGF5ZXIiLCJ0eXBlIiwiYWN0aXZlIiwiYm9hcmQiLCJhY3RpdmF0ZSIsImRlYWN0aXZhdGUiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJoaXRzIiwiZ2FtZVN0YXJ0RXZlbnQiLCJFdmVudCIsImdhbWVPdmVyRXZlbnQiLCJyZXN0YXJ0R2FtZUV2ZW50IiwicmVmcmVzaEJvYXJkRXZlbnQiLCJyYW5kb21pemVCb2FyZEV2ZW50IiwicmVjZWl2ZUF0dGFja0V2ZW50IiwiaXNHYW1lU3RhcnRlZCIsImlzR2FtZU92ZXIiLCJzZXR1cEdhbWVCb2FyZHMiLCJwbGF5ZXJPbmUiLCJwbGF5ZXJUd28iLCJyYW5kb21pemVTaGlwRm9ybWF0aW9uIiwicGxheWVyT25lQm9hcmRDb21wb25lbnQiLCJnZW5lcmF0ZUJvYXJkIiwiY2xhc3NMaXN0IiwiYWRkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNoaWxkcmVuIiwiZm9yRWFjaCIsInJvdyIsImNlbGwiLCJpc01vdmluZyIsImNvbnRhaW5zIiwiY2xhc3NOYW1lIiwiZ2V0Q2VsbENsYXNzTmFtZSIsImNsZWFyU2hpcE1vdmVtZW50IiwiZGlzcGF0Y2hFdmVudCIsImRvY3VtZW50IiwicmVjZWl2ZUNvbXB1dGVyQXR0YWNrIiwicXVlcnlTZWxlY3RvciIsInRleHRDb250ZW50Iiwic2hpcE1vdmVtZW50SGFuZGxlciIsImV2ZW50IiwibW92aW5nU2hpcENlbGwiLCJtb3ZpbmdTaGlwQ29vcmRpbmF0ZXMiLCJnZXRDZWxsSW5kZXgiLCJtb3ZpbmdTaGlwSW5kZXgiLCJ0b2dnbGVTaGlwTW90aW9uIiwibW92ZVN1Y2Nlc3NmdWwiLCJrZXkiLCJtb3ZlZFNoaXAiLCJwbGF5ZXJUd29Cb2FyZENvbXBvbmVudCIsImdhbWVPdmVyT3ZlcmxheSIsInJlbW92ZSIsIm11dGFibGUiLCJib2FyZENvbXBvbmVudCIsImNyZWF0ZUVsZW1lbnQiLCJyb3dDb21wb25lbnQiLCJjZWxsQ29tcG9uZW50IiwiZ2FtZVdvbk92ZXJsYXkiLCJpbm5lckhUTUwiLCJjb25zb2xlIiwibG9nIiwiYXBwZW5kQ2hpbGQiLCJwcmV2ZW50RGVmYXVsdCIsInBsYWNlZCIsIk1hdGgiLCJyYW5kb20iLCJ4IiwiZmxvb3IiLCJ5IiwicHJvdG90eXBlIiwiaW5kZXhPZiIsImNhbGwiLCJwYXJlbnROb2RlIiwic2VjcmV0IiwibW92aW5nQ2VsbHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwidG9nZ2xlIiwiUHJvbWlzZSIsInIiLCJzZXRUaW1lb3V0IiwiZ2FtZUxvc3RPdmVybGF5Iiwic2V0dXBDb250cm9scyIsInJvb3QiLCJjb250cm9sc1NlY3Rpb24iLCJpbmZvU2VjdGlvbiIsInJlc3RhcnRCdXR0b24iLCJzdGFydEJ1dHRvbiIsInJhbmRvbWl6ZUJ1dHRvbiIsInBsYXllck9uZUJvYXJkIiwiZ2V0RWxlbWVudEJ5SWQiLCJib2FyZHNDb250YWluZXIiLCJhcHBlbmQiXSwic291cmNlUm9vdCI6IiJ9