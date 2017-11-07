
Function.prototype.myBind = function (ctx, ...bindArgs) {
  return (...callArgs) => {
    return this.apply(ctx, bindArgs.concat(callArgs));
  };
};


function curriedSum(numArgs) {
   const numbers = [];

   function _curriedSum(num) {
     numbers.push(num);
     if (numbers.length === numArgs) {
       return numbers.reduce((a, b) => a + b);
     } else {
       return _curriedSum;
     }
   }

   return _curriedSum;
 }

Function.prototype.curry = function curry(numArgs) {
  const args = [];

  const _curry = (num) => {
    args.push(num);

    if (args.length === numArgs) {
      return this(...args);
    } else {
      return _curry;
    }
  };

  return _curry;
};

Function.prototype.curry = function curry(numArgs) {
  const args = [];

  function _curry() {
    args.push(arguments[0]);

    if (args.length === numArgs) {
      return this.apply(this, args);
    } else {
      return _curry.bind(this);
    }
  }

  return _curry.bind(this);
};

const sum = function(...nums) {
  const total = nums.reduce((a, b) => a + b );
  return total;
};
