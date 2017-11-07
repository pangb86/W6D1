Function.prototype.inherits = function(Parent) {
  const Surrogate = function () {};
  Surrogate.prototype = Parent.prototype;
  this.prototype = new Surrogate();
  this.prototype.constructor = this;
};

Function.prototype.inherits = function(Parent) {
  this.prototype = Object.create(Parent.prototype);
  this.prototype.constructor = this;
};
