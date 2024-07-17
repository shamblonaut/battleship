import { CellState } from "../core/gameBoard.js";
import { createPlayer, PlayerType } from "../core/player.js";
import { ShipOrientation } from "../core/ship.js";

const refreshBoardEvent = new Event("refresh-board");

export function setupGameBoards() {
  const playerOne = createPlayer(PlayerType.HUMAN);
  const playerTwo = createPlayer(PlayerType.COMPUTER);

  const ships = [5, 4, 3, 3, 2];

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

      placed = playerOne.board.placeShip([x, y], ship, orientation);
    }
  }

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
  playerOneBoardComponent.addEventListener(
    "click",
    () => clearShipMovement(playerOneBoardComponent),
    true,
  );

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
        cell.classList.add(getCellClassName([j, i], playerTwo.board));
      });
    });
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
          const cell = board.cells[i][j];
          if (cell !== CellState.EMPTY && cell !== CellState.SHIP) return;

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
  return [
    Array.prototype.indexOf.call(cell.parentNode.children, cell),
    Array.prototype.indexOf.call(
      cell.parentNode.parentNode.children,
      cell.parentNode,
    ),
  ];
}

function getCellClassName(coordinates, board) {
  const cell = board.cells[coordinates[1]][coordinates[0]];
  switch (cell) {
    case CellState.EMPTY:
      return "empty";
    case CellState.MISS:
      return "miss";
    case CellState.SHIP:
      return "ship";
    case CellState.HIT:
      return "hit";
    case CellState.SUNK:
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
