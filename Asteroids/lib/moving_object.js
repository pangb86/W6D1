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
