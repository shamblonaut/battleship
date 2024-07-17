export function setupControls(game) {
  const startButton = document.querySelector(".start");
  startButton.addEventListener("click", async () => {
    await game.start();
  });

  const randomizeButton = document.querySelector(".randomize");
  randomizeButton.addEventListener("click", () =>
    game.boards[0].randomizeFormation(),
  );
}
