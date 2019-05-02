
# Promise剖析 #

## 目录 ##

1. [参考链接](#href1)
2. [介绍](#href2)
3. [使用](#href3)
    1. [一个模拟数据表查询实例](#href3-1)
    2. [Promise.all](#href3-2)
    3. [Promise.race](#href3-3)

## <a name="href1">参考链接</a> ##

- [面试精选之Promise](https://juejin.im/post/5b31a4b7f265da595725f322)

- [Promise原理讲解 && 实现一个Promise对象 (遵循Promise/A+规范)](https://juejin.im/post/5aa7868b6fb9a028dd4de672)

## <a name="href2">介绍</a> ##

Promise 是一种 JavaScript 异步编程方案，是目前最流行的异步编程方案之一，这几种异步编程方案是:

1. 回调函数;
2. 事件监听;
3. 发布/订阅模式;
4. Promise。

在异步编程中，最令人头疼的莫过于"回调地狱"，Promise 就是为了避免异步编程的过程中出现"回调地狱"，"回调地狱"的缺陷主要有以下这些:

1. 代码逻辑与书写顺序不一致，不利于阅读(其实阅读方面只是习惯问题)与维护;
2. 一旦异步操作的顺序发生改变，就需要大规模的重构;
3. 回调函数基本都是匿名的，不利于追踪 Bug;
4. 会造成 IoC 控制反转。

如果你想自己实现一个 Promise，可以参考这篇文章: [Promise原理讲解 && 实现一个Promise对象 (遵循Promise/A+规范)](https://juejin.im/post/5aa7868b6fb9a028dd4de672)。

## <a name="href3">使用</a> ##

Promise 是一个构造函数，使用 new 关键字创建了一个 promise 对象，这个构造函数接收一个函数参数，此函数有两个形参: resolve 和 reject，resolve 用于传输执行结果给下一步异步操作，而 reject 则用于拦截错误。

promise 包含三种状态:

1. pending: 初始状态;
2. fulfilled: 异步执行成功的状态;
3. rejected: 异步执行失败的状态。

promise 包含以下对象方法:

1. `then(onFulfilled, onRejected)`: 注册`resolve()`的回调函数，onFulfilled 和 onRejected 分别用于接收 promise 成功和失败的值;
2. `catch(onRejected)`: 在链式写法中用于捕获错误，相当于`promise.then(null, onRrejected)`。

使用链式写法需要注意，每个`.then()`节点中的回调都必须返回一个新的 promise 对象。

### <a name="href3-1">一个模拟数据表查询实例</a> ###

了解了 Promise 的基本用法后，接下来我将实现一个使用 Node.js 文件系统的模拟数据表查询实例。

首先，目录结构如下:

```
| -- index.js
| -- job.json
| -- user.json
```

job.json 是一个工作类型数据文件，内容为:

```json
[
    "程序员",
    "教师",
    "警察"
]
```

user.json 是一个用户数据文件，内容为:

```json
[
    {
        "id": 1,
        "name": "WJT20",
        "jobid": 2
    },
    {
        "id": 2,
        "name": "WJT21",
        "jobid": 1
    }
]
```

index.js 即脚本内容，通过`node index.js`的形式运行，我们的目的是先读 user.json 文件获取用户列表数据，再读 job.json 文件获取工作类型数据，接着根据用户数据携带的 jobid 获取对应的工作，最终打印出结果，最终脚本内容如下:

```js
const fs = require('fs');
const path = require('path');

// 读取用户表
function queryUserTable(resolve, reject) {
    fs.readFile(
        path.resolve(__dirname, './user.json'),
        'utf-8',
        function (err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(res));
            }
        }
    );
}

// 匹配工作表
function queryJobTable(userData) {
    return function(resolve, reject) {
        fs.readFile(
            path.resolve(__dirname, './job.json'),
            'utf-8',
            function (err, res) {
                if (err) {
                    reject(err);
                } else {
                    let msg = '';
                    const jobData = JSON.parse(res);
                    userData.forEach(function (item, index) {
                        msg += '\n' + item.name + ': ' + jobData[item.jobid]
                    });
                    resolve(msg.substr(1));
                }
            }
        );
    }
}

new Promise(queryUserTable)
    .then(function (userData) {
        return new Promise(queryJobTable(userData));
    })
    .then(function (msg) {
        console.log(msg);
    })
    .catch(function (err) {
        console.error('ERROR!', err);
    });
```

### <a name="href3-2">Promise.all</a> ###

其实以上代码还称不上"完美"，在`queryJobTable()`函数的异步操作中，糅合了处理查询数据的功能，根据单一职责原则，这部分代码应该提取出来，命名为`handleData()`，这个时候可以发现`queryUserTable()`和`queryJobTable()`就成了两个并行的操作，而且这两个函数除了操作的文件不同，其他的代码都是一样的，所以又可以抽象成一个公共的读文件函数。

说到并行，就不得不提 Promise 的`all()`静态方法，这个方法接收一个 promise 对象数组，只有在所有 promise 对象 resolve 时才会调用，专门用来处理多个并行操作。

改造后的代码如下:

```js
const fs = require('fs');
const path = require('path');

// 读表函数
function query(target) {
    return new Promise(function (resolve, reject) {
        fs.readFile(
            path.resolve(__dirname, './' + target + '.json'),
            'utf-8',
            function (err, res) {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(res));
                }
            }
        );
    });
}

// 处理函数
function handleData(userData, jobData) {
    let msg = '';
    userData.forEach(function (item, index) {
        msg += '\n' + item.name + ': ' + jobData[item.jobid]
    });
    console.log(msg);
}

Promise
    .all([
        query('user'),
        query('job')
    ])
    .then(function (data) {
        handleData.apply(null, data);
    })
    .catch(function (err) {
        console.error('ERROR!', err);
    });
```

可以明显看到，我们删减了大量的重复代码，整个脚本更加轻量化。这里主要有一个需要注意的地方，那就是`all()`方法之后的`then()`节点接收的数据 data 是一个顺序与 promise 对象数组顺序一致的执行结果数组，我这里用了`apply()`技巧，保留结果的顺序传递给`handleData()`函数。

### <a name="href3-3">Promise.race</a> ###

Promise 的`race()`方法接收一个 promise 对象数组，表示只要数组中的一个 promise 对象进入 fulfilled 或 rejected 状态，就会执行后面的操作。

例如我们想比较 user.json 和 job.json 两个文件的读取速度，可以这样做:

```js
const fs = require('fs');
const path = require('path');

// 读表函数
function query(target) {
    return new Promise(function (resolve, reject) {
        fs.readFile(
            path.resolve(__dirname, './' + target + '.json'),
            'utf-8',
            function (err, res) {
                if (err) {
                    reject(err);
                } else {
                    resolve(target + '.json: ' + (new Date()).toUTCString());
                }
            }
        );
    });
}

Promise
    .race([
        query('user'),
        query('job')
    ])
    .then(function (info) {
        console.log(info);
    })
    .catch(function (err) {
        console.error('ERROR!', err);
    });
```

至此，Promise 的使用方法就全部讲解完了。Promise 一直是前端面试的一个考点，这是因为 Promise 涉及到的编程知识很多，为了加强对 Promise 的理解，接下来我将带领你们手动实现一个 Promise。

---

```
ID         : 109
DATE       : 2019/04/27
AUTHER     : WJT20
TAG        : ES6
```
