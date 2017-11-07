/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const GameView = __webpack_require__(3);

document.addEventListener("DOMContentLoaded", function() {
  const canvasEl = document.getElementById("game-canvas");
  canvasEl.width = 800;
  canvasEl.height = 600;
  const ctx = canvasEl.getContext("2d");

  const newGame = new GameView(ctx);
  newGame.start();

});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

const MovingObject = function (opts){
  this.position = opts.position;
  this.velocity = opts.velocity;
  this.radius = opts.radius;
  this.color = opts.color;
  this.game = opts.game;
};

MovingObject.prototype.draw = function draw(ctx) {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(
   this.position[0],
   this.position[1],
   this.radius,
   0,
   2 * Math.PI,
   false
 );

 ctx.fill();
 // ctx.beginPath();
 // ctx.rect(20,20,150,100);
 ctx.stroke();
};

MovingObject.prototype.move = function move(){
  this.position[0] += this.velocity[0];
  this.position[1] += this.velocity[1];
  this.position = this.game.wrap(this.position);
};

MovingObject.prototype.isCollidedWith = function(otherObject){
  let dist = Math.sqrt(Math.pow((this.position[0] - otherObject.position[0]), 2) + Math.pow((this.position[1] - otherObject.position[1]), 2));
  if (dist <= (this.radius * 2)) {
    return true;
  } else {
    return false;
  }
};

module.exports = MovingObject;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

const Util = {
  inherits(Child, Parent) {
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
  }
};

module.exports = Util;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(4);

const GameView = function(ctx) {
  this.game = new Game(ctx);
  this.drawing = ctx;
};

GameView.prototype.start = function() {
  setInterval(this.game.draw.bind(this.game), 20);
  setInterval(this.game.step.bind(this.game), 20);
};

module.exports = GameView;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(1);
const Util = __webpack_require__(2);
const Asteroid = __webpack_require__(5);

const Game = function(ctx){

  this.DIM_X = 800;
  this.DIM_Y = 600;
  this.NUM_ASTEROIDS = 7000;
  this.asteroids = this.addAsteroids();
  this.drawing = ctx;
};

Game.prototype.addAsteroids = function(){
  const asteroidArr = [];

  for (var i = 0; i < this.NUM_ASTEROIDS; i++) {
    const asteroid = new Asteroid(this.randomPosition(), this);

    asteroidArr.push(asteroid);
  }
  return asteroidArr;
};

Game.prototype.randomPosition = function(){
  return [Math.floor(Math.random()*this.DIM_X), Math.floor(Math.random()*this.DIM_Y)];
};

Game.prototype.draw = function () {
  this.drawing.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  this.asteroids.forEach((el) => {
    el.draw(this.drawing);
  });
};

Game.prototype.moveObjects = function(){
  this.asteroids.forEach(function(el){
    el.move();
  });
};

Game.prototype.wrap = function(pos){
  if (pos[0] <= 0 || pos[0] >= this.DIM_X) {
    pos[0] <= 0 ? pos[0] = this.DIM_X : pos[0] = 0;
  }
  if (pos[1] <= 0 || pos[1] >= this.DIM_Y) {
    pos[1] <= 0 ? pos[1] = this.DIM_Y : pos[1] = 0;
  }
  return pos;
};

Game.prototype.checkCollisions = function(){
  for (var i = 0; i < this.asteroids.length; i++) {
   for (var j = i + 1; j < this.asteroids.length; j++) {
      if (this.asteroids[i].isCollidedWith(this.asteroids[j])) {
        this.remove(this.asteroids[j])
        this.remove(this.asteroids[i])
      }
   }
  }
};

Game.prototype.remove = function(asteroid) {
  const removalIdx = this.asteroids.indexOf(asteroid);
  this.asteroid = this.asteroids.splice(removalIdx, 1);
};

Game.prototype.step = function(){
  this.moveObjects();
  this.checkCollisions();
};

module.exports = Game;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(1);
const Util = __webpack_require__(2);

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


/***/ })
/******/ ]);