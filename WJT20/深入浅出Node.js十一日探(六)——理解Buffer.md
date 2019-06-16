
# 深入浅出Node.js十一日探(六)——理解Buffer #

## 目录 ##

## Buffer结构 ##

Buffer 是一个像 Array 的对象，但它主要用于操作字节。

### 模块结构 ###

Buffer 是一个典型的 JavaScript 与 C++ 结合的模块，它将性能相关部分用 C++ 实现，将非性能相关部分用 JavaScript 实现。

Node.js 在进程启动时就已经加载完了 Buffer，并将其放到全局对象上，所以在使用 Buffer 时，无需通过`require()`即可直接使用。

### Buffer对象 ###

Buffer 对象由若干个16进制的两位数元素构成(类似数组)，示例代码如下:

```js
var str = 'Hello world';
var buf = new Buffer(str, 'utf-8');
console.log(buf); // => <Buffer 48 65 6c 6c 6f 20 77 6f 72 6c 64>
console.log(buf.length); // => 11
console.log(buf[0]); // => 72
```

不同编码的字符串占用的元素个数各不相同，中文字符在 UTF-8 编码下占用3个元素，字母和半角标点符号占用1个元素。Buffer 和 Array 一样，可以访问 length 属性得到长度，也可以通过下标访问元素，在构造对象时也十分相似。

在用下标访问元素时你会发现得到的是一个0到255的随机值。同样，我们可以通过下标对某个元素进行赋值，给元素赋的值如果小于0，就将该值逐次加256，直到得到一个0到255之间的整数。如果得到的数值大于255，就逐次减256，直到得到0~255区间内的数值; 如果是小数，舍弃小数部分，只保留整数部分。

### Buffer内存分配 ###

Buffer 对象的内存分配不是在V8的堆内存中，而是在 Node.js 的 C++ 层面实现内存的申请的。因为处理大量的字节数据不能采用需要一点内存就向操作系统申请一点内存的方式，这可能造成大量的内存申请的系统调用，对操作系统有一定压力。为此 Node.js 在内存的使用上应用的是在 C++ 层面申请内存、在 JavaScript 中分配内存的策略。

为了高效地使用申请来的内存，Node.js 采用了 slab 分配机制。当我们需要一个 Buffer 对象，可以通过以下方式分配指定大小的 Buffer 对象:

```js
new Buffer(size);
```

Node.js 以8KB为界限来区分 Buffer 是大对象还是小对象:

```js
Buffer.poolSize = 8 * 1024;
```

这个8KB的值也就是每个 slab 的大小值，在 JavaScript 层面，以它作为单元进行内存的分配。

如果指定 Buffer 的大小少于8KB，Node.js 会按照小对象的方式进行分配。Buffer 的分配过程中主要使用一个局部变量 pool 作为中间处理对象，处于分配状态的 slab 单元都指向它。

如果需要超过8KB的 Buffer 对象，将会直接分配一个 SlowBuffer 对象作为 slab 单元，这个 slab 单元将会被这个大 Buffer 对象独占。

简而言之，真正的内存是在 NOde.js 的 C++ 层面提供的，JavaScript 层面只是使用它。当进行小而频繁的 Buffer 操作时，采用 slab 的机制进行预先申请和事后分配，使得 JavaScript 到操作系统之间不必有过多的内存申请方面的系统调用。对于大块的 Buffer 而言，则直接使用 C++ 层面提供的内存，而无需细腻的分配操作。

## Buffer的转换 ##

---

```
ID         : 132
DATE       : 2019/06/09
AUTHER     : WJT20
TAG        : Node.js
```
