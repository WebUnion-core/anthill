
# JavaScript设计模式重啃——代理模式 #

## 目录 ##

1. [介绍](#href1)
2. [送花实例](#href2)
3. [保护代理和虚拟代理](#href3)
4. [虚拟代理的应用](#href4)
    1. [图片预加载](#href4-1)
    2. [合并HTTP请求](#href4-2)
5. [缓存代理的应用](#href5)

## <a name="href1">介绍</a> ##

代理模式是一种非常有意义的设计模式，它的关键是当客户不方便直接访问一个对象或者不满足需要的时候，提供一个替身对象来控制对这个对象的访问，客户实际上访问的是替身对象，替身对象对请求作出一些处理之后，再把请求转交给本体对象。

## <a name="href2">送花实例</a> ##

送花是一个使用代理模式的例子，假如A要送花给C，但是A不知道什么时候送花给C比较合适，如果送花的时机不合适，送的花可能会直接被丢掉，这时可以委托C的好友B在合适的时候送花给C，实现的代码如下:

```js
// 传输数据体
var Flower = function() {};

// 具有发送接口
var A = {
    sendFlower: function(target) {
        // 要求接收者具备'接收'接口
        var flower = new Flower();
        target.receiveFlower(flower);
    }
};

// 具有'接收'接口
var B = {
    receiveFlower: function(flower) {
        // '接收'接口内具有转发逻辑，要求接收转发者具备'状态监听'和'接收'接口
        C.listenGoodMood(function() {
            C.receiveFlower(flower);
        });
    }
};

// 具有'状态监听'和'接收'接口
var C = {
    listenGoodMood: function(callback) {
        setTimeout(function() {
            callback();
        }, 60000);
    },
    receiveFlower: function(flower) {
        console.log('成功收到花了！');
    }
}

A.sendFlower(B); // B就是一个代理对象
```

## <a name="href3">保护代理和虚拟代理</a> ##

用前面送花的例子来说明下保护代理和虚拟代理，所谓保护代理就是由B过滤掉一些指向C的请求，即由B控制对C的访问。虚拟代理则是代理模式的另一种形式，它会把一些开销很大的对象延迟到真正需要它的时候才去创建，例如 Flower 实例对象(创建一个实例对象是一个代价昂贵的操作)。

虚拟代理的实现并不难，只要将之前的创建 Flower 实例操作移动到B的内部:

```js
var B = {
    receiveFlower: function() {
        C.listenGoodMood(function(flower) {
            var flower = new Flower();
            C.receiveFlower();
        });
    }
}
```

## <a name="href4">虚拟代理的应用</a> ##

虚拟代理的应用很多，以下是一些常见的虚拟代理的应用示例。

### <a name="href4-1">图片预加载</a> ###

图片预加载是一种在 Web 开发中常用的技术，如果直接给某个 img 标签节点设置 src 属性，那么当图片过大或者网络不佳时，图片的加载往往有一段空白期，常见的做法是用一个 loading 图片占位，然后用异步的方式加载图片，等图片加载好了后再把它填充到 img 节点里，这种情景就很适合使用虚拟代理来实现。

示例代码:

```js
// 执行对象。创建DOM节点(通过闭包实现持久化)，并提供设置src的接口
var myImage = (function() {
    var imgNode = document.createElement('img');
    document.body.append(imgNode);

    return {
        setSrc: function(src) {
            imgNode.src = src;
        }
    }
})();

// 代理对象。负责预加载图片，待加载完成通知执行对象更新src
var proxyImage = (function() {
    // Image对象会立即创建并持久化，这里只能实现单个图片的预加载
    var img = new Image();
    img.onload = function() {
        myImage.setSrc(this.src);
    };

    return {
        setSrc: function(src) {
            myImage.setSrc('/images/loading.gif'); // loading图片占位
            img.src = src; // 设置了src属性后，load事件处理程序会被触发
        }
    }
})();

proxyImage.setSrc('/images/test.jpg');
```

### <a name="href4-2">合并HTTP请求</a> ###

在 Web 开发中，最大的开销可能就是网络请求了，短时间内发起过多的网络请求会对服务器造成很大的负担，对于对实时性要求不是非常高的系统来说，可以设置一小段时间后将期间发起的请求在代理函数内整合再一次性发起，极短暂的时间间隙并不会带来太大的副作用，却能大大减轻服务器的压力。

以点击 checkbox 上传指定ID文件为例:

```js
// 模拟同步文件的操作
function synchronousFile(id) {
    console.log('开始同步文件，id: ' + id);
}

var proxySynchronousFile = (function() {
    var cache = []; // 保存一段时间内需要同步的ID
    var timer; // 定时器

    return function(id) {
        cache.push(id);

        // 保证不会覆盖已经启动的定时器
        if (timer) {
            return;
        }

        timer = setTimeout(function() {
            // 2s后向本体发送需要同步的ID集合
            synchronousFile(cache.join(','));

            // 清除定时器
            clearTimeout(timer);
            timer = null;

            // 清空ID集合
            cache.length = 0;
        }, 2000);
    };
})();

var checkboxes = document.getElementsByClassName('checkbox');
for(var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].onclick = function() {
        if (this.checked === true) {
            proxySynchronousFile(this.id);
        }
    }
}
```

---

## <a name="href5">缓存代理的应用</a> ##

缓存代理可以为一些开销大的运算结果提供短暂的存储，在下次运算时，如果传递过来的参数跟之前一致，则可以直接返回前面存储的运算结果。基本的逻辑代码如下:

```js
var calculate = function() {
    // 复杂的计算，过程省略
}

// 缓存代理函数
var proxyCalculate = (function() {
    var cache = {};

    return function() {
        var args = Array.prototype.join.call(arguments, ',');

        if (args in cache) {
            return cache[args];
        }

        return cache[args] = mult.apply(this, arguments);
    }
})();
```

通过高阶函数这种更加灵活的方式，可以为各种计算方法创建缓存代理，这些计算方法将被当作参数传入一个专门用于创建缓存代理的工厂中，从而实现缓存代理，代码如下:

```js
var calculate1 = function() {
    // 复杂的计算1，过程省略
}

var calculate2 = function() {
    // 复杂的计算2，过程省略
}

// 创建缓存代理的工厂
var createProxyFactory = function(callback) {
    var cache = {};

    return function() {
        var args = Array.prototype.join.call(arguments, ',');
        if (args in cache) {
            return cache[args];
        }
        return cache[args] = callback.apply(this, arguments);
    };
};

var proxyCalculate1 = createProxyFactory(calculate1);
var proxyCalculate2 = createProxyFactory(calculate2);

proxyCalculate1();
proxyCalculate2();
```

---

```
ARTICLE_ID : 38
POST_DATE : 2017/10/22
AUTHER : WJT20
```
