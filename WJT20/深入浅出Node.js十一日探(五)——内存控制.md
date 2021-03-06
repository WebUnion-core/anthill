
# 深入浅出Node.js十一日探(五)——内存控制 #

## 目录 ##

1. [V8的垃圾回收机制与内存限制](#href1)
    1. [Node.js与V8](#href1-1)
    2. [V8的内存限制](#href1-2)
    3. [V8的对象分配](#href1-3)
    4. [V8的垃圾回收机制](#href1-4)
2. [高效利用内存](#href2)
    1. [作用域](#href2-5)
    2. [闭包](#href2-6)
3. [内存泄漏](#href3)
4. [大内存应用](#href4)

## <a name="href1">V8的垃圾回收机制与内存限制</a> ##

JavaScript 与 Java 一样，都是由垃圾回收机制来进行自动内存管理，这使得开发者不需要再编写代码的过程中时刻关注内存的分配和释放问题，在客户端(浏览器)上很少有因垃圾回收造成的性能问题，但是服务器端就不一样了，对于性能敏感的服务器端程序，内存管理的好坏、垃圾回收状况是否优良，都会对服务构成影响。在 Node.js 中，这一切都与 JavaScript 执行引擎V8息息相关。

### <a name="href1-1">Node.js与V8</a> ###

第三次浏览器大战中，Google 的 Chrome 浏览器以其优异的性能成为焦点，Chrome 的成功离不开其优秀的 JavaScript 引擎V8，V8的出现，改变了人们心中对 JavaScript 性能低下的印象。V8的性能优势使得使用 JavaScript 写高性能后台服务程序成为可能，在这样的契机下，Ryan Dahl 选择了 JavaScript，选择了V8，在事件驱动、非阻塞I/O模型的设计下实现了 Node.js。

### <a name="href1-2">V8的内存限制</a> ###

Node.js 不能使用系统的全部内存(64位系统下约为1.4GB，32位系统下约为0.7GB)，这就导致 Node.js 无法直接操作大内存对象，在单个 Node.js 进程的情况下，计算机的内存无法得到充足的使用。造成这个问题的主要原因在于 Node.js 是基于V8构建的，所以在 Node.js 中使用的 JavaScript 对象基本上都是通过V8自己的方式进行分配和管理的，原本在浏览器上顺心随意的V8内存管理机制，移植到 Node.js 上就显得后劲不足了。

尽管在服务器端操作大内存也不是常见的需求场景，但有了这个限制，总会觉得不自由、不舒服，如果在实际的应用中不小心触碰到这个限制，会造成进程退出。

### <a name="href1-3">V8的对象分配</a> ###

在V8中，所有的 JavaScript 对象都是通过堆来进行分配的，在 Node.js 中查看V8内存使用量可以使用`process.memoryUsage()`方法或 os 模块的`totalmem()`、`freemem()`等方法。

以`process.memoryUsage()`方法为例，其输出信息如图:

![image](https://raw.githubusercontent.com/WebUnion-core/anthill/master/WJT20/images/w134.png)

输出的几个属性代表的含义为:

1. rss: 常驻内存;
2. heapTotal: 已申请的堆内存;
3. heapUsed: 当前使用的堆内存;
4. external: 代表绑定到 JavaScript 的 C++ 对象的内存使用情况。

在代码中声明变量并赋值时，所使用对象的内存就分配在堆中，如果已申请的堆空闲内存不够分配新的对象，将继续申请堆内存，直到堆的大小超过V8的限制为止。

V8之所以要做这样的堆内存限制，是因为对象创建的越多，垃圾回收机制回收占用的时间越长，回收垃圾的时间越长就导致 JavaScript 线程暂停执行的时间越长，最终导致应用的性能和响应能力都会直线下降，这种情况是前端浏览器和后端服务器都不能接受的。

### <a name="href1-4">V8的垃圾回收机制</a> ###

V8的垃圾回收策略主要基于分代式垃圾回收机制，主要将内存分为新生代和老生代两代。新生代中的对象为存活时间较短的对象，老生代中的对象为存活时间较长或常驻内存的对象，所以V8堆的整体大小就是新生代和老生代所用的内存空间总和。V8使用的内存没办法根据使用情况自动扩充，所以内存分配一旦超过极限值，就会引起进程出错。

新生代中的对象主要通过 Scavenge 算法(请自行查阅资料)进行垃圾回收，Scavenge 是典型的牺牲空间换取时间的算法，所以无法大规模地应用到所有的垃圾回收中，但是却非常适合应用于新生代中，原因是新生代中的对象声明周期较短。

老生代中的对象存活时间较长，数目较多，其垃圾回收算法用的是 Mark-Sweep 和 Mark-Compact(请自行查阅资料)相结合的方式。

为了避免出现 JavaScript 应用逻辑与垃圾回收器看到的不一致的情况，垃圾回收的3种基本算法都需要将应用逻辑暂停下来，待执行完垃圾回收后再恢复执行应用逻辑，这种行为被称为"全停顿"。在V8的分代式垃圾回收中，新生代中的垃圾回收造成的全停顿影响不大，而老生代中的垃圾回收就不一样了，全堆垃圾回收的标记、清理、整理等动作造成的停顿是很可怕的。

对于 Node.js 编写的服务器来说，内存限制并不会影响正常场景下的使用，但垃圾回收毕竟是影响性能的因素之一，如果你想要提高服务器的执行效率，那么需要注意让垃圾回收尽量少地进行，尤其是全堆垃圾回收。

## <a name="href2">高效利用内存</a> ##

### <a name="href2-5">作用域</a> ###

首先了解一下 JavaScript 作用域中地内存回收过程是怎么样的。在 JavaScript 中能形成作用域的有函数调用、with 以及全局作用域，以如下代码为例:

```js
function getData() {
    var data = {};
}
```

`getData()`方法在每次调用时会创建对应的作用域，函数执行结束后，该作用域将会销毁。作用域中声明的局部变量分配在该作用域上，随作用域的销毁而销毁，data 对象非常小，将会分配在新生代中，在作用域释放后，局部变量 data 失效，其所引用的对象将会在下次垃圾回收时被释放。

标识符查找与作用域有关，这里的标识符，可理解为变量名。JavaScript 在执行时会去查找该变量定义在哪里，它最先找到的时当前作用域，如果在当前作用域中无法找到该变量的声明，将会向上级的作用域里查找，直到找到为止。

前面介绍了局部变量的释放，那么全局变量的释放又是怎样的呢? 由于全局作用域需要直到进程退出才能释放，此时将导致引用的对象常驻内存(老生代)，如果想要手动销毁常驻内存的对象，可以通过 delete 操作来删除引用关系，或者说将变量重新赋值，让旧的对象脱离引用关系，在接下来的老生代内存清除和整理过程中被回收释放。

### <a name="href2-6">闭包</a> ###

闭包是 JavaScript 的高级特性，利用它可以实现一些非常高级的效果，但它有一个问题，那就是一旦有变量引用这个中间函数，这个中间函数将不会释放，同时也会使原始的作用域不会得到释放，作用域中产生的内存占用也不会得到释放，除非不再有引用，才会逐步释放。

## <a name="href3">内存泄漏</a> ##

Node.js 对内存泄漏十分敏感，一旦线上应用有成千上万的流量，就算是一个字节的内存泄漏也会造成堆积，垃圾回收过程中将会耗费更多时间进行对象扫描，应用响应缓慢，直到进程内存溢出，应用崩溃。

造成内存泄漏的原因通常有以下这几种:

1. 缓存;
2. 队列消费不及时;
3. 作用域未释放。

这里主要讲一下缓存，使用缓存的好处是，缓存的访问效率要比 I/O 的效率高，一旦命中缓存，就可以节省一次 I/O 的时间。但是在 Node.js 中不要试图拿内存当缓存! 缓存的数据量增大，内存的占用也会增大，如果不及时释放，就会发生内存泄漏，后果不堪设想。除了会发生内存泄漏(缓存大小受制)，还有一个问题要考虑，那就是进程之间是无法共享内存的。

目前比较好的处理缓存方案就是采用进程外的缓存，进程自身不存储状态。外部的缓存软件有着良好的缓存过期淘汰策略以及自有的内存管理，不影响 Node.js 进程的性能，正好解决了前面提到的使用内存作缓存所要考虑的两个问题。目前市面上较好的缓存有 Redis 和 Memcached，可以从官网下载及查看使用详情。

## <a name="href4">大内存应用</a> ##

由于V8的内存限制，我们无法通过`fs.readFile()`和`fs.writeFile()`等直接对大文件进行操作，此时应该使用 Node.js 提供的 stream 模块来操作大文件，stream 模块是 Node.js 的原生模块，直接引用即可，它继承自 EventEmitter，具备基本的自定义事件功能，同时抽象出标准的事件和方法，它分为可读和可写两种。读写大文件，使用的是拥有 stream 功能的 fs 方法——`fs.createReadStream()`和`fs.createWriteStream()`，这两个方法分别用于创建文件的可读流和可写流。

实例代码如下:

```js
var fs = require('fs');
var reader = fs.createReadStream('in.txt');
var writer = fs.createWriteStream('out.txt');
reader.pipe(writer);
```

可读流提供了管道方法`pipe()`，封装了 data 事件和写入操作。通过流的方式，上述代码不会受到V8内存限制的影响，有效地提高了程序的健壮性。

---

```
ID         : 131
DATE       : 2019/04/09
AUTHER     : WJT20
TAG        : Node.js
```
