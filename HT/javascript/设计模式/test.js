function Original (){
  this.a = '我是原始的'
}

var obj1 = new Original()

function Evolution (){
  this.a = '我是进化的'
}

Evolution.prototype = obj1;

var obj2 = new Evolution();

console.log(obj2.__proto__ === Evolution.prototype) // true

