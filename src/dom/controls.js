import { createPlayer, PlayerType } from "../core/player.js";

import closeSvg from "../../assets/x.svg";
import editSvg from "../../assets/edit.svg";
import refreshSvg from "../../assets/refresh-ccw.svg";

export function setupControls(game) {
  const startButton = document.querySelector(".start");
  startButton.addEventListener("click", async () => {
    if (document.querySelector(".save-board:not(.hidden)")) {
      alert("Please save your boards before starting the game");
      return;
    }

    await game.start();
  });

  const resetButton = document.querySelector(".controls .reset");
  resetButton.addEventListener("click", () => game.reset());

  const computerOpponentButton = document.querySelector(".opponent-computer");
  const friendOpponentButton = document.querySelector(".opponent-friend");
  // const slider = document.querySelector(".slider");

  computerOpponentButton.addEventListener("click", () => {
    // if (!slider.classList.contains("slider-right")) return;
    if (computerOpponentButton.classList.contains("active-mode")) return;

    // slider.classList.remove("slider-right");
    computerOpponentButton.classList.add("active-mode");
    friendOpponentButton.classList.remove("active-mode");
    game.changeMode(
      createPlayer("Player", PlayerType.HUMAN, 10),
      createPlayer("Computer", PlayerType.COMPUTER, 10),
    );
  });
  friendOpponentButton.addEventListener("click", () => {
    // if (slider.classList.contains("slider-right")) return;
    if (friendOpponentButton.classList.contains("active-mode")) return;

    // slider.classList.add("slider-right");
    friendOpponentButton.classList.add("active-mode");
    computerOpponentButton.classList.remove("active-mode");
    game.changeMode(
      createPlayer("Player 1", PlayerType.HUMAN, 10),
      createPlayer("Player 2", PlayerType.HUMAN, 10),
    );
  });

  const helpLink = document.querySelector(".help");
  helpLink.addEventListener("click", () => {
    const modalOverlay = document.createElement("div");
    modalOverlay.classList.add("modal-overlay");
    modalOverlay.appendChild(createHelpModal());
    document.querySelector("#root").appendChild(modalOverlay);
  });
}

function createHelpModal() {
  const helpModal = document.createElement("div");
  helpModal.classList.add("help-modal");
  helpModal.innerHTML = `
      <h1>How to Play</h1>
      <section>
        <h3>Choose Game Mode</h3>
        <p>
          By default, you'll be playing against the computer.
          If you want to play with a friend, choose the "Friend" option in the opponent section,
          and play by passing around your device.
        </p>
      </section>
      <section>
        <h3>Edit your board(s)</h3>
        <p>
          <ul>
            <li>Click on the edit button (<img class="edit-img" />) to change the names of the players, and move around your ships.</li>
            <li>You can also click the refresh button (<img class="refresh-img" />) to randomize the placement of ships in the board.</li>
          </ul>
        </p>
      </section>
      <section>
        <h3>Start playing!</h3>
        <p>
          Press on "<b>Start Game</b>" to start playing.
          If you are not familiar with <a href="https://en.wikipedia.org/wiki/Battleship_(game)">battleship</a>, here's a quick run-through of the mechanics:
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
        </p>
      </section>
      <h1 class="thanks">Thanks for Playing!</h1>
    `;

  helpModal.querySelector(".edit-img").src = editSvg;
  helpModal.querySelector(".refresh-img").src = refreshSvg;

  const closeButton = document.createElement("button");
  closeButton.classList.add("close-button");
  const closeIcon = new Image();
  closeIcon.src = closeSvg;
  closeButton.appendChild(closeIcon);
  closeButton.addEventListener("click", () => {
    helpModal.remove();
    document.querySelector(".modal-overlay").remove();
  });
  helpModal.appendChild(closeButton);

  return helpModal;
}
