const GameView = require("./lib/game_view.js");

document.addEventListener("DOMContentLoaded", function() {
  const canvasEl = document.getElementById("game-canvas");
  canvasEl.width = 800;
  canvasEl.height = 600;
  const ctx = canvasEl.getContext("2d");

  const newGame = new GameView(ctx);
  newGame.start();

});
