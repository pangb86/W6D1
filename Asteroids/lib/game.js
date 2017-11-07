const MovingObject = require("./moving_object.js");
const Util = require("./util.js");
const Asteroid = require("./asteroid.js");

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
