
# 深入浅出Node.js十一日探(四) #

## 目录 ##

1. [函数式编程](#href1)
2. [异步编程的优势与难点](#href2)
    1. [优势](#href2-1)
    2. [难点](#href2-2)
3. [异步编程解决方案](#href3)

## <a name="href1">函数式编程</a> ##

关于函数式编程，可以阅读这两篇文章:

- 函数式编程之探索记录(一): [https://github.com/WebUnion-core/anthill/blob/master/WJT20/%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BC%96%E7%A8%8B%E4%B9%8B%E6%8E%A2%E7%B4%A2%E8%AE%B0%E5%BD%95(%E4%B8%80).md](https://github.com/WebUnion-core/anthill/blob/master/WJT20/%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BC%96%E7%A8%8B%E4%B9%8B%E6%8E%A2%E7%B4%A2%E8%AE%B0%E5%BD%95(%E4%B8%80).md)

- 函数式编程之探索记录(二): [https://github.com/WebUnion-core/anthill/blob/master/WJT20/%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BC%96%E7%A8%8B%E4%B9%8B%E6%8E%A2%E7%B4%A2%E8%AE%B0%E5%BD%95(%E4%BA%8C).md](https://github.com/WebUnion-core/anthill/blob/master/WJT20/%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BC%96%E7%A8%8B%E4%B9%8B%E6%8E%A2%E7%B4%A2%E8%AE%B0%E5%BD%95(%E4%BA%8C).md)

## <a name="href2">异步编程的优势与难点</a> ##

### <a name="href2-1">优势</a> ###

Node.js 基于事件驱动的非阻塞 I/O 模型可以使 CPU 与 I/O 并不相互依赖等待，让资源得到更好的利用。对于网络应用来说，并行带来的想象空间更大，延展而来的是分布式和云。并行使得各个单点之间能够更有效地组织起来，这也是 Node.js 在云计算厂商中广受青睐的原因。

Node.js 事件循环模型的缺点在于 JavaScript 线程无法承担过多的细节性任务，如果承担过多，则会影响到任务的调度，最终 JavaScript 线程忙个不停，而 I/O 线程池里的各个 I/O 线程没有活干，结局就是整体效率的降低。

由于事件循环模型需要应对海量请求，海量请求同时作用在单线程上，就要防止任何一个计算耗费过多的 CPU 时间片，至于是计算密集型，还是 I/O 密集型，只要计算不影响异步 I/O 的调度，那就不构成问题。

### <a name="href2-2">难点</a> ###

异步编程的难点主要有以下几点:

难点1: 异常处理。一般处理异常是用到`try...catch...`语句块进行异常捕获，但是这对于异步编程而言并不一定适用，上一篇提到异步 I/O 的实现主要包括两个阶段: 提交请求和处理结果。这两个阶段中间有事件循环的调度，两者彼此不关联。异步方法则通常在第一个阶段提交请求后立即返回，因为异常并不一定发生在这个阶段。意思就是说当`try..catch...`捕获到异常时，并不会改变异常的异步代码的执行方向。

例如:

```js
try {
    fs.readFile(__dirname + '/test.txt', 'utf8', function (err, data) {
        if (err) {
            console.error(err);
        } else {
            console.log('success: ', data);
        }
    });
} catch (err) {
    // 捕捉到异常了，但是不会阻挡异常异步代码的执行
    console.error(err);
}
```

所以，在自行编写异步方法的时候要遵循以下原则:

1. 必须执行调用者传入的回调;
2. 正确传递回异常供调用者判断。

示例代码如下:

```js
var asyncGetFileData = function (callback) {
    fs.readFile(__dirname + '/test.txt', 'utf8', function (err, data) {
        // 第一个参数为异常信息，传递给调用者判断
        if (err) {
            callback(err);
        } else {
            callback(null, data);
        }
    });
}
```

难点2: 函数嵌套过深。Node.js 中异步调用的场景比比皆是，异步调用一多，就可能出现异步多级依赖的问题，它有个更直白的名字——回调地狱，但是解决方法还是有的，后文将会介绍处理回调函数多层嵌套的方法。

难点3: 阻塞代码。JavaScript 没有`sleep()`这样的线程沉睡功能，能用于延时操作的只有`setTimeout()`和`setInterval()`这两个函数，但是这两个函数并不能阻塞后续代码的持续执行。

难点4: 多线程编程。对于服务器来说，如果服务器是多核 CPU，单个 Node 进程实际上是没有充分利用多核 CPU 的。但是随着现今业务的复杂化，对于多核 CPU 利用的要求也越来越高，为了满足这个需求，Node.js 引入了 child_process API，我们将在以后介绍如何使用这套 API。

难点5: 异步转同步。Node.js 提供了绝大部分的异步 API，同步 API 则只是少量，这就可能出现某些同步需求没有同步 API 可使用的窘境。

## <a name="href3">异步编程解决方案</a> ##

目前异步编程的主要解决方案有以下3种:

1. 事件发布/订阅模式: 设计模式中的一种，广泛用于异步编程的模式，可以参考我写的这篇文章以详细了解: (JavaScript设计模式重啃——发布-订阅模式(观察者模式): [https://github.com/WebUnion-core/anthill/blob/master/WJT20/JavaScript%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%E9%87%8D%E5%95%83%E2%80%94%E2%80%94%E5%8F%91%E5%B8%83-%E8%AE%A2%E9%98%85%E6%A8%A1%E5%BC%8F(%E8%A7%82%E5%AF%9F%E8%80%85%E6%A8%A1%E5%BC%8F).md](https://github.com/WebUnion-core/anthill/blob/master/WJT20/JavaScript%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%E9%87%8D%E5%95%83%E2%80%94%E2%80%94%E5%8F%91%E5%B8%83-%E8%AE%A2%E9%98%85%E6%A8%A1%E5%BC%8F(%E8%A7%82%E5%AF%9F%E8%80%85%E6%A8%A1%E5%BC%8F).md));
2. Promise/Deferred 模式;
3. 流程控制库。

---

```
ID         : 130
DATE       : 2019/04/08
AUTHER     : WJT20
TAG        : Node.js
```
