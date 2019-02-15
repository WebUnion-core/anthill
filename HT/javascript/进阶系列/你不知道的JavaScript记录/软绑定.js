if (!Function.prototype.softBind) {
    Function.prototype.softBind = function (obj) {
        var fn = this;
        var curried = [].slice.call(arguments, 1);
        var bound = function () {
            fn.apply(
                (!this || (this === (window || global))) ? obj : this,
                curried.concat.call(curried, arguments)
            )
        }
        bound.prototype = Object.create(Function.prototype);
        return bound;
    }
}

var o = {
    a: 'a'
}

var a = 'window'

function geta() {
    console.log(this.a)
}

var getasoft = geta.softBind(a)

getasoft();