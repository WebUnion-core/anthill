
# 深入浅出Node.js十一日探(六)——理解Buffer #

## 目录 ##

1. [Buffer结构](#href1)
    1. [模块结构](#href1-1)
    2. [Buffer对象](#href1-2)
    3. [Buffer内存分配](#href1-3)
2. [Buffer的转换](#href2)
    1. [字符串转Buffer](#href2-4)
    2. [Buffer转字符串](#href2-5)
3. [Buffer的拼接](#href3)
    1. [setEncoding()与string_deceder()](#href3-6)
    2. [正确拼接Buffer](#href3-7)
4. [Buffer与性能](#href4)
    1. [字符串抓换](#href4-8)
    2. [文件读取](#href4-9)

## <a name="href1">Buffer结构</a> ##

Buffer 是一个像 Array 的对象，但它主要用于操作字节。

### <a name="href1-1">模块结构</a> ###

Buffer 是一个典型的 JavaScript 与 C++ 结合的模块，它将性能相关部分用 C++ 实现，将非性能相关部分用 JavaScript 实现。

Node.js 在进程启动时就已经加载完了 Buffer，并将其放到全局对象上，所以在使用 Buffer 时，无需通过`require()`即可直接使用。

### <a name="href1-2">Buffer对象</a> ###

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

### <a name="href1-3">Buffer内存分配</a> ###

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

简而言之，真正的内存是在 Node.js 的 C++ 层面提供的，JavaScript 层面只是使用它。当进行小而频繁的 Buffer 操作时，采用 slab 的机制进行预先申请和事后分配，使得 JavaScript 到操作系统之间不必有过多的内存申请方面的系统调用。对于大块的 Buffer 而言，则直接使用 C++ 层面提供的内存，而无需细腻的分配操作。

## <a name="href2">Buffer的转换</a> ##

Buffer 对象支持与以下字符串编码类型的相互转换:

1. ASCII;
2. UTF-8;
3. UTF-16LE/UCS-2;
4. Base64;
5. Binary;
6. Hex。

可以使用`Buffer.isEncoding(encoding)`来查看 Buffer 对象是否支持某种编码类型。如果想要转换为更多编码类型的字符串，可以借助 iconv+iconv-lite 等模块。

### <a name="href2-4">字符串转Buffer</a> ###

利用 Buffer 构造函数可以实现将字符串转换为 Buffer 对象，其语法规则如下:

```js
new Buffer(str[, encoding])
```

encoding 参数默认取值为 UTF-8，即默认按 UTF-8 编码进行转码和存储。

一个 Buffer 对象可以存储不同编码类型的字符串转码的值，调用`write()`方法可以实现该目的，其语法规则如下:

```js
buf.write(str[, offset, length, encoding])
```

这从侧面说明，Buffer 对象中可以写入多种编码转换后的内容。此外还需要注意一点，由于每种编码所用的字节长度不同，所以将 Buffer 反转为字符串时需要谨慎处理。

### <a name="href2-5">Buffer转字符串</a> ###

Buffer 对象自带的`toString()`方法可以将 Buffer 对象转换为字符串，其语法规则如下:

```js
buf.toString([encoding, start, end])
```

encoding 参数用于控制转换的字符串类型，而 start 和 end 参数则用于控制转换位置，如果 Buffer 对象由多种编码写入，那么就需要在局部指定不同的编码，此时就要用上这两个参数了。

## <a name="href3">Buffer的拼接</a> ##

初学者容易将 Buffer 理解为字符串，Buffer 的拼接也使用和字符串一样的方式处理，但一旦输入流中有宽字节编码时，就会出现乱码的问题，以以下代码为例:

```js
const fs = require('fs');
const rs = fs.createReadStream('test.md', { highWaterMark: 11 }); // 将文件可读流的每次读写的Buffer长度限制为11，更突出问题
let data = '';
rs.on('data', function (chunk) {
    data += chunk; // 用字符串拼接的方式拼接Buffer
});
rs.on('end', function () {
    console.log(data);
});
```

以上代码用于读取并输出`test.md`文件的内容，如果文件中的内容是纯英文，那么这种拼接方式没有任何问题，但是如果文件中出现了宽字节的中文字符，那么那些字符就会转换为乱码字符。

在以上代码中，`data += chunk`一句相当于`data = data.toString() + chunk.toString()`，`buf.toString()`方法默认以 UTF-8 为编码，中文字符在 UTF-8 下占3个字节，宽字节的中文字符在读取的时候被截成两段(甚至更多段)，这个时候解析就会出错，导致显示出来的中文变成乱码，这就是乱码出现的原因。

### <a name="href3-6">setEncoding()与string_deceder()</a> ###

可读流有一个设置编码的方法`setEncoding()`，它的作用是让 data 事件中传递的不再是一个 Buffer 对象，而是编码后的字符串，这样就很方便了，我们不必进行麻烦的 Buffer 乱码处理，直接对 data 事件返回的数据进行拼接操作即可:

```js
const rs = fs.createReadStream('test.md', { highWaterMark: 11 });
rs.setEncoding('utf8');
...
```

`setEncoding()`是怎么做到的呢？事实上，在调用`setEncoding()`时，可读流对象在内部设置了一个 decoder 对象，每次 data 事件都通过该 decoder 对象进行 Buffer 到字符串的解码，然后传递给调用者。

decoder 对象来自于 string_deceder 模块 StringDecoder 的实例对象，它解决了宽字节字符串被截断问题，宽字节字符在 UTF-8 编码下以3个字节的方式存储，所以转码过程会分为两次进行，第一次将字符的前两个字节保留在 StringDecoder 实例内部，转码第三个字节，第二次则将该字符的前两个字节与后续的字符字节组合在一起，再用3的整数倍字节进行转码。

但是 string_deceder 也并非万能，它目前只能处理 UTF-8、Base64 和 UCS-2/UTF-16LE 这三种编码。

### <a name="href3-7">正确拼接Buffer</a> ###

正确拼接 Buffer 的原理是用一个数组存储接收到的所有 Buffer 片段并记录下所有片段的总长度，然后调用`Buffer.concat()`方法生成一个合并的 Buffer 对象，`Buffer.concat()`方法封装了从小 Buffer 对象向大 Buffer 对象的复制过程:

```js
Buffer.concat = function(list, length) {
    if (!Array.isArray(list)) {
        throw new Error('Usage: Buffer.concat(list, [length])');
    }

    if (list.length === 0) {
        return new Buffer(0);
    } else if (list.length === 1) {
        return list[0];
    }

    if (typeof length !== 'number') {
        length = 0;
        for (var i = 0; i < list.length; i++) {
            var buf = list[i];
            length += buf.length;
        }
    }

    var buffer = new Buffer(length);
    var pos = 0;
    for (var i = 0; i < list.length; i++) {
        var buf = list[i];
        buf.copy(buffer, pos);
        pos += buf.length;
    }

    return buffer;
};
```

## <a name="href4">Buffer与性能</a> ##

Buffer 在文件I/O和网络I/O中运用广泛，尤其在网络传输中，任何数据都需要转换为 Buffer，以进行二进制数据传输。

### <a name="href4-8">字符串抓换</a> ###

在 Web 应用中，字符串转换成 Buffer 时时刻刻都在发生，提高字符串到 Buffer 的转换效率，可以很大程度上提高网络吞吐率。以下是一个直接传输字符串和传输 Buffer 对象的比较:

```js
var http = require('http');
var str = '';

// 字符串长度可以更长，对比效果更明显
for (var i = 0; i < 10000; i++) {
    str += '0';
}

// str = new Buffer(str);

http.createServer(function (req, res) {
    res.writeHead(200);
    res.end(str);
}).listen(8011);
```

先后注释和取消注释`str = new Buffer(str)`一句，可以发现性能提高了近一倍。

> 通过预先转换静态内容为 Buffer 对象，可以有效地减少 CPU 的重复使用，节省服务器资源。在 Node.js 构建的 Web 应用中，可以选择将页面中的动态内容和静态内容分离，静态内容部分可以通过预先转换为 Buffer 的方式，使性能得到提升。由于文件本身是二进制数据，所以在不需要改变内容的场景下，尽管只读取 Buffer，然后直接传输，不做额外的转换，避免损耗。

### <a name="href4-9">文件读取</a> ###

`fs.createReadStream(path, opts)`可以传入一些配置参数 opts，示例代码如下:

```js
{
    flags: 'r',
    encoding: null,
    fd: null,
    mode: 0666,
    highWaterMark: 64 * 1024,
    start: 90,
    end: 99
}
```

> `fs.createReadStream()`的工作方式是在内存中准备一段 Buffer，然后在`fs.read()`读取时逐步从磁盘中将字节复制到 Buffer 中，完成一次读取时，则从这个 Buffer 中通过`slice()`方法取出部分数据作为一个小 Buffer 对象，再通过 data 事件传递给调用方。如果 Buffer 用完，则重新分配一个，如果还有剩余，则继续使用。

highWaterMark 表示每次读取的长度，如果读取到文件末尾或者文件本身体积小于 highWaterMark，那么预先指定的 Buffer 对象必定会有剩余(好在剩余的内存可以分配给下次读取使用)。

highWaterMark 的大小对性能有两个影响点:

1. highWaterMark 设置对 Buffer 内存的分配和使用有一定影响;
2. highWaterMark 设置过小可能导致系统调用次数过多。

由于`fs.createReadStream()`内部采用`fs.read()`实现，将会引起对磁盘的系统调用，对于大文件而言，highWaterMark 的大小决定会触发系统调用和 data 事件的次数。读取同一个大文件的情况下，highWaterMark 越大，读取速度越快。

---

```
ID         : 132
DATE       : 2019/06/09
AUTHER     : WJT20
TAG        : Node.js
```
