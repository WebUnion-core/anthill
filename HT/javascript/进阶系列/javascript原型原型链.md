## Prototype

JavaScript 中的对象有一个特殊的 [[Prototype]] 内置属性.

对于默认的 [[Get]] 操作来说，如果无法在对象本身找到需要的属性，就会继续访问对象的 [[Prototype]] 链

```js
var anotherObject = {
  a: 2
};
// 创建一个关联到 anotherObject 的对象
var myObject = Object.create(anotherObject);
myObject.a; // 2
```

 Object.create(..) : 创建一个对象并把这个对象的 [[Prototype]] 关联到指定的对象

 myObject中没有a属性，并且 [[Prototype]] 链不为空的话，就会继续查找下去。否则会直接返回undefined

 使用 for..in 遍历对象时原理和查找 [[Prototype]] 链类似，任何可以通过原型链访问到的属性都会被枚举

 ```js
 var anotherObject = {
  a: 2
};
// 创建一个关联到 anotherObject 的对象
var myObject = Object.create(anotherObject);
for (var k in myObject) {
  console.log("found: " + k);
}
// found: a
console.log(("a" in myObject)); // true
 ```

当你通过各种语法进行属性查找时都会查找 [[Prototype]] 链，直到找到属性或者查找完整条原型链。

Object.keys(..) 和 hasOwnProperty(..)  不会查找原型链

查看下面代码

```js
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
```

可以了解到一个关系

![alt](https://coding.net/u/hong_tao/p/my_study/git/raw/master/HT/imgs/yuanxingtu.png)

那么 Original 的 prototype 又是什么呢

我们在浏览器中打印一下就知道了.

![](https://upload-images.jianshu.io/upload_images/8812203-52abdbce8083727f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

打印结果显示 Original.prototype 是一个对象所以,但是这个对象的constructor又是function Original,

