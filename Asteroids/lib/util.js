const Util = {
  inherits(Child, Parent) {
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
  }
};

module.exports = Util;
