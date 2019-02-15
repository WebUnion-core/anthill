## Prototype

任意一个函数（包括构造函数）都有一个prototype属性，指向该函数的原型对象，同样任意一个构造函数实例化的对象，都有一个__proto__属性（__proto__并非标准属性，ECMA-262第5版将该属性或指针称为[[Prototype]]，可通过Object.getPrototypeOf()标准方法访问该属性）

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


```js
var o1 = new Obj1();

function Obj2(){
    this.b = 414;
}

Obj2.prototype = o1;

var o2 = new Obj2();

function Obj3(){
    this.c = 241;
}

Obj3.prototype = o2;

var o3 = new Obj3();

console.log(o3.a)// 123
console.log(o3.b)// 414
console.log(o3.c)// 241
```

观察上述代码。我们在o3对象中，访问了a,b,c三个属性，但是o3只存在c属性，当a和b在当前对象中没有找到，就会顺着[[prototype]]关联的对象上去寻找。所以[[Prototype]] 机制就是存在于对象中的一个内部链接，它会引用其他对象。这个链接的作用是：如果在对象上没有找到需要的属性或者方法引用，引擎就会继续在 [[Prototype]] 关联的对象上进行查找。同理，如果在后者中也没有找到需要的引用就会继续查找它的 [[Prototype]] ，以此类推。这一系列对象的链接被称为“原型链”。

## 关联关系是备用

看起来对象之间的关联关系是处理“缺失”属性或者方法时的一种备用选项。

```js
var anotherObject = {
    cool: function () {
        console.log("cool!");
    }
};
var myObject = Object.create(anotherObject);
myObject.cool(); // "cool!"
```

由于存在 [[Prototype]] 机制,myObject 在无法处理属性或者方法时可以使用备用的 anotherObject,但是这会使你的程序变得很难以理解和维护。

我们可以通过内部委托，来让代码变得更加清晰。

```js
var anotherObject = {
    cool: function () {
        console.log("cool!");
    }
};
var myObject = Object.create(anotherObject);
myObject.doCool = function () {
    this.cool(); // 内部委托！
};
myObject.doCool(); // "cool!"
```

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

```js
obj1.constructor === Original.prototype.constructor // ture
```
上面的代码看起来很让我费解。

我想往上寻找 Original.prototype 然后在去寻找 Original.prototype.constructor.prototype 发现掉进了一个死循环中了。于是我寻找了Original.prototype的 [[prototype]]

```js
Original.prototype.__proto__
```

然后我发现Original.prototype的[[prototype]] 是一个对象 该对象的 constructor 属性指向 Object构造函数。

![](https://upload-images.jianshu.io/upload_images/8812203-a5e6dac477994d13.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

于是继续寻找function Object(){} 的 prototype。结果发现沿着原型链寻找上去，最终会寻找到null

接着刚才的图

![](https://upload-images.jianshu.io/upload_images/8812203-a14501db7f937777.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

