const MovingObject = require("./moving_object.js");
const Util = require("./util.js");

const Asteroid = function(position, game) {
  const COLOR = randomColor();
  const RADIUS = 10;
  MovingObject.call(this, {position: position, velocity: randomVec(.5), color: COLOR, radius: RADIUS, game: game});
};

Util.inherits(Asteroid, MovingObject);

const HEX_DIGITS = "0123456789ABCDEF";

const randomColor = function () {
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += HEX_DIGITS[Math.floor((Math.random() * 16))];
  }

  return color;
};

function randomVec (length) {
  const deg = 2 * Math.PI * Math.random();
  return scale([Math.sin(deg), Math.cos(deg)], length);
}
// Scale the length of a vector by the given amount.
function scale (vec, m) {
  return [vec[0] * m, vec[1] * m];
}

module.exports = Asteroid;
