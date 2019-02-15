
# JavaScript设计模式重啃——享元模式 #

## 目录 ##

1. [介绍](#href1)
2. [例子:模特换装拍照](#href2)
3. [内部状态与外部状态](#href3)

## <a name="href1">介绍</a> ##

享元模式是一种用于性能优化的模式，其核心是运用共享技术来有效支持大量细粒度的对象。如果系统中因为创建了大量类似对象而导致内存占用过高，享元模式就非常有用了。在 JavaScript 中，浏览器特别是移动端的浏览器分配的内存并不算多，如何节省内存就成了一件非常有意义的事情。

## <a name="href2">例子:模特换装拍照</a> ##

先看以下代码:

```js
var Model = function (sex, underwear) {
    this.sex = sex;
    this.underwear = underwear;
};

// 拍照
Model.prototype.takePhoto = function () {
    console.log('sex=' + this.sex + ' underwear=' + this.underwear);
};

// 招募50个男模特来换上衣服拍照
for (var i = 1; i <= 50; i++) {
    var maleModel = new Model('male', 'underwear' + i);
    maleModel.takePhoto();
};

// 招募50个女模特来换上衣服拍照
for (var j = 1; j <= 50; j++) {
    var femaleModel = new Model('female', 'underwear' + i);
    femaleModel.takePhoto();
};
```

这段代码总共创建了100个 Model 实例对象，如果模特数量扩展到1000甚至更大的数值的话，那么这个程序将会因为存在过多的对象而提前崩溃，实际上，我们只需要1个男模特和1个女模特即可，然后分别依次给他们换上不同的衣服拍照就可以达到目的。

改造后的代码如下:

```js
var Model = function (sex) {
    this.sex = sex;
};

Model.prototype.takePhoto = function () {
    console.log('sex=' + this.sex + ' underwear=' + this.underwear);
};

// 分别创建一个男模特和一个女模特
var maleModel = new Model('male');
var femaleModel = new Model('female');

// 给男模特依次穿上所有男装拍照
for (var i = 1; i <= 50; i++) {
    maleModel.underwear = 'underwear' + i;
    maleModel.takePhoto();
};

// 给女模特依次穿上所有女装拍照
for (var i = 1; i <= 50; i++) {
    femaleModel.underwear = 'underwear' + j;
    femaleModel.takePhoto();
};
```

这里构造函数只需要传入 sex 参数，原因是我们只需要区分男女模特。改进后的代码只需要创建2个对象便可实现同样的功能，性能上的损耗却大大降低了。

## <a name="href3">内部状态与外部状态</a> ##

享元模式要求将对象的属性划分为内部状态与外部状态(此处的状态通常指属性)。享元模式的目标是尽量减少共享对象的数量，关于如何划分内部状态和外部状态，有以下几条经验可以借鉴:

1. 内部状态存储于对象内部;
2. 内部状态可以被一些对象共享;
3. 内部状态独立于具体的场景，通常不会改变;
4. 外部状态取决于具体的场景，并根据场景而变化，外部状态不能被共享。

使用享元模式的关键是如何区别内部状态和外部状态，可以被对象共享的属性通常被划分为内部状态，例如模特换装中的模特性别就是内部状态; 外部状态取决于具体的场景，并根据场景而变化，通常不能被一些对象共享，例如模特换装中的每件衣服就是外部状态。

---

```
ID         : 56
DATE       : 2018/01/01
AUTHER     : WJT20
TAG        : JavaScript
```
