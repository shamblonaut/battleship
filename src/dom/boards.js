import { CellState } from "../core/gameBoard.js";
import { PlayerType } from "../core/player.js";
import { ShipOrientation } from "../core/ship.js";

export const gameStartEvent = new Event("game-start");
export const gameOverEvent = new Event("game-over");
export const restartGameEvent = new Event("restart-game");
export const refreshBoardEvent = new Event("refresh-board");
export const randomizeBoardEvent = new Event("randomize-board");
const receiveAttackEvent = new Event("receive-attack");

let isGameStarted = false;
let isGameOver = false;

export function setupGameBoards(playerOne, playerTwo) {
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
  playerOneBoardComponent.addEventListener(
    "click",
    () => clearShipMovement(playerOneBoardComponent),
    true,
  );

  document.addEventListener("receive-attack", () => {
    if (playerTwo.type === PlayerType.COMPUTER) {
      receiveComputerAttack(playerOne.board, playerOneBoardComponent);
    }
  });

  function shipMovementHandler(event) {
    const movingShipCell = playerOneBoardComponent.querySelector(".moving");

    if (!movingShipCell) return;

    const movingShipCoordinates = getCellIndex(movingShipCell);
    const movingShipIndex = playerOne.board.getShipIndex(movingShipCoordinates);

    toggleShipMotion(
      movingShipCoordinates,
      playerOne.board,
      playerOneBoardComponent,
    );

    let moveSuccessful = false;
    switch (event.key) {
      case "ArrowUp":
        if (movingShipCoordinates[1] <= 0) break;
        moveSuccessful = playerOne.board.moveShip(movingShipIndex, [
          movingShipCoordinates[0],
          movingShipCoordinates[1] - 1,
        ]);
        break;
      case "ArrowLeft":
        if (movingShipCoordinates[0] <= 0) break;
        moveSuccessful = playerOne.board.moveShip(movingShipIndex, [
          movingShipCoordinates[0] - 1,
          movingShipCoordinates[1],
        ]);
        break;
      case "ArrowDown":
        if (movingShipCoordinates[1] >= playerOne.board.size - 1) break;
        moveSuccessful = playerOne.board.moveShip(movingShipIndex, [
          movingShipCoordinates[0],
          movingShipCoordinates[1] + 1,
        ]);
        break;
      case "ArrowRight":
        if (movingShipCoordinates[0] >= playerOne.board.size - 1) break;
        moveSuccessful = playerOne.board.moveShip(movingShipIndex, [
          movingShipCoordinates[0] + 1,
          movingShipCoordinates[1],
        ]);
        break;
    }

    if (!moveSuccessful) {
      toggleShipMotion(
        movingShipCoordinates,
        playerOne.board,
        playerOneBoardComponent,
      );
      return;
    }

    playerOneBoardComponent.dispatchEvent(refreshBoardEvent);

    const movedShip = playerOne.board.ships[movingShipIndex];
    toggleShipMotion(
      movedShip.coordinates,
      playerOne.board,
      playerOneBoardComponent,
    );
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

export function generateBoard(board, mutable) {
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
          if (cell !== CellState.EMPTY && cell !== CellState.SHIP) return;

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
        cellComponent.addEventListener("contextmenu", (event) => {
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

export function randomizeShipFormation(board) {
  const ships = [5, 4, 3, 3, 2];

  board.reset();

  for (const ship of ships) {
    let placed = false;
    while (!placed) {
      const orientation =
        Math.random() > 0.5
          ? ShipOrientation.HORIZONTAL
          : ShipOrientation.VERTICAL;

      const x = Math.floor(
        Math.random() *
          (10 - (orientation === ShipOrientation.HORIZONTAL ? ship : 0)),
      );
      const y = Math.floor(
        Math.random() *
          (10 - (orientation === ShipOrientation.VERTICAL ? ship : 0)),
      );

      placed = board.placeShip([x, y], ship, orientation);
    }
  }
}

function getCellIndex(cell) {
  return [
    Array.prototype.indexOf.call(cell.parentNode.children, cell),
    Array.prototype.indexOf.call(
      cell.parentNode.parentNode.children,
      cell.parentNode,
    ),
  ];
}

function getCellClassName(coordinates, board, secret = false) {
  const cell = board.cells[coordinates[1]][coordinates[0]];
  switch (cell) {
    case CellState.EMPTY:
      return "empty";
    case CellState.MISS:
      return "miss";
    case CellState.SHIP:
      return secret ? "empty" : "ship";
    case CellState.HIT:
      return "hit";
    case CellState.SUNK:
      return "sunk";
  }
}

export function clearShipMovement(boardComponent) {
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
    case ShipOrientation.HORIZONTAL:
      for (
        let i = ship.coordinates[0];
        i <= ship.coordinates[0] + ship.length - 1;
        i++
      ) {
        boardComponent.children[ship.coordinates[1]].children[
          i
        ].classList.toggle("moving");
      }
      break;
    case ShipOrientation.VERTICAL:
      for (
        let i = ship.coordinates[1];
        i <= ship.coordinates[1] + ship.length - 1;
        i++
      ) {
        boardComponent.children[i].children[
          ship.coordinates[0]
        ].classList.toggle("moving");
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
