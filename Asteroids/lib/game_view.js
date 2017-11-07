const Game = require("./game.js");

const GameView = function(ctx) {
  this.game = new Game(ctx);
  this.drawing = ctx;
};

GameView.prototype.start = function() {
  setInterval(this.game.draw.bind(this.game), 20);
  setInterval(this.game.step.bind(this.game), 20);
};

module.exports = GameView;
