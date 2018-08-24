var obj = {
  a: 1,
  b: 2
}

Object.defineProperty(obj, Symbol.iterator, {
  enumerable: false,
  writable: false,
  configurable: true,
  value: function () {
    var o = this;
    var idx = 0;
    var ks = Object.keys(o);
    return {
      next: function () {
        return {
          value: o[ks[idx++]],
          done: (idx > ks.length)
        }
      }
    }
  }
})

var i = obj[Symbol.iterator]();

console.log(i.next()) // { value: 1, done: false }
console.log(i.next()) // { value: 2, done: false }
console.log(i.next()) // { value: undefined, done: true }

for(let v of obj) {
  console.log(v)
}