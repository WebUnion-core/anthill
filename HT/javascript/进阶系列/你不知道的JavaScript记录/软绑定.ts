if (!Function.prototype.softBind) {
  Function.prototype.softBind = function (obj) {
    var fn = this;
    var curried = [].slice.call(arguments, 1);
    var bound = function () {
      return fn.apply(
        (!this || this === (window || global)) ?
          obj : this,
        curried.concat.apply(curried, arguments)
      )
    }
    bound.prototype = Object.create(fn.prototype);
    return bound;
  }
}