export function createGamePage(game) {
  const gamePage = document.createElement("div");
  gamePage.classList.add("game-page", "page");

  gamePage.innerHTML = `
    <div class="boards"></div>
    <div class="info">
      <div class="board-info hidden">
        <p class="board-one-info"></p>
        <p class="board-two-info"></p>
      </div>
      <div class="game-info">
        <p class="help-info">ⓘ Rearrange the ships to your liking by pressing the edit button, or by refreshing the board</p>
        <p class="attack-info hidden"></p>
      </div>
    </div>
    <div class="controls">
      <button class="start">Start Game</button>
      <button class="reset hidden">Reset Game</button>
    </div>
  `;

  const boardsContainer = gamePage.querySelector(".boards");
  boardsContainer.append(game.boards[0].component, game.boards[1].component);

  const startButton = gamePage.querySelector(".start");
  startButton.addEventListener("click", () => {
    if (gamePage.querySelector(".editing")) {
      alert("Please save your boards before starting the game");
      return;
    }

    game.start();
  });

  const resetButton = gamePage.querySelector(".reset");
  resetButton.addEventListener("click", () => {
    game.reset();
  });

  game.boards[0].render();
  game.boards[1].render();

  return gamePage;
}
