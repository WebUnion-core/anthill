
# JavaScript设计模式重啃——发布-订阅模式(观察者模式) #

## 目录 ##

1. 介绍
2. 实例——DOM addEventListener
3. 通用实现
4. 全局发布-订阅对象

---

## 介绍 ##

发布-订阅模式又叫做观察者模式，它定义对象间的一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。

发布-订阅模式可以应用于异步编程，作为一种替代传递回调函数的方案。在异步编程中使用发布-订阅模式，我们只要订阅感兴趣的事件发生点而无需过多关注对象在异步运行期间的内部状态。

另外，发布-订阅模式可以取代对象之间硬编码的通知机制，一个对象不用再显式地调用另一个对象的某个接口。发布-订阅模式让两个对象松耦合地联系在一起。当有新的订阅者出现时，发布者的代码不需要任何修改；同样，发布者需要改变时，也不会影响到之前的订阅者，只要之前约定的事件名没有变化，就可以自由地改变它们。

---

## 实例——DOM addEventListener ##

DOM事件的 addEventListener 方法用于绑定事件函数，这个方法就是一个典型的使用发布-订阅模式的实例。分析以下代码：

```
//增加订阅者
document.body.addEventListener('click', function() {
    console.log('Click 1');
}, false);
document.body.addEventListener('click', function() {
    console.log('Click 2');
}, false);

document.body.click();//模拟点击，模拟发布效果
```

以上代码中，我们给body元素绑定了两个 click 事件处理程序，相当于添加了两个订阅者。

---

## 通用实现 ##

代码如下：

```
var event = {
    clientList: [],

    //监听
    listen: function(key, fn) {
        if (!this.clientList[key]) {
            this.clientList[key] = [];
        }
        this.clientList[key].push(fn);//订阅信息存储缓存栈
    },

    //发布
    trigger: function() {
        var key = Array.prototype.shift.call(arguments),
            fns = this.clientList[key];

        //如果没有绑定信息
        if (!fns || fns.length === 0) {
            return false;
        }

        for(var i = 0, fn; i < fns.length; i++) {
            fn.apply(this, arguments);//发布消息时带上参数
        }
    },

    //取消发布
    remove: function(key, fn) {
        var fns = this.clientList[key];

        //如果是没被订阅过的消息，则直接返回
        if (!fns) {
            return false;
        }

        if (!fn) {
            //如果没有传入具体回调函数，表示需要取消key对应消息的所有订阅
            fns && (fns.length = 0);
        } else {
            //反向遍历订阅的回调函数列表
            for(var l = fns.length - 1; l >= 0; l--) {
                var _fn = fns[l];
                if (_fn === fn) {
                    fns.splice(1, 1);//删除订阅者的回调函数
                }
            }
        }
    }
};

//给所有的对象都动态安装发布-订阅功能
var installEvent = function(obj) {
    for(var i in event) {
        obj[i] = event[i];
    }
}
```

包装完这个对象后，我们用售楼的例子演示一下：

```
var salesOffices = {};
installEvent(salesOffices);

//A订阅信息
salesOffies.listen('squareMeter88', fn1 = function(price) {
    console.log('价格=' + price);
});

//B订阅信息
salesOffies.listen('squareMeter100', fn2 = function(price) {
    console.log('价格=' + price);
});

salesOffies.remove('squareMeter88', fn1);//取消A的订阅
salesOffies.trigger('squareMeter100', 3000000);//发布B订阅的消息，输出: 3000000
```

---

## 全局发布-订阅对象 ##

在程序中，发布-订阅模式可以用一个全局的 Event 对象来实现，订阅者不需要了解消息来自哪个发布者，发布者也不知道消息会推送给哪些订阅者，Event 作为一个类似"中介者"的角色，把订阅者和发布者联系起来，实现代码如下：

```
var Event = (function() {
    var clientList = {},
        listen,
        trigger,
        remove;

    listen = function(key, fn) {
        if (!clientList[key]) {
            clientList[key] = [];
        }
        clientList[key].push(fn);
    };

    trigger = function() {
        var key = Array.prototype.shift.call(arguments),
            fns = clientList[key];
        if (!fns || fns.length === 0) {
            return false;
        }
        for(var i = 0; i < fns.length; i++) {
            fn.apply(this, arguments);
        }
    };

    remove = function(key, fn) {
        var fns = clientList[key];
        if (!fns) {
            return false;
        }
        if (!fn) {
            fns && (fns.length = 0);
        } else {
            for(var l = fns.length - 1; l >= 0; l--) {
                var _fn = fns[l];
                if (_fn === fn) {
                    fns.splice(l, 1);
                }
            }
        }
    };

    return {
        listen: listen,
        trigger: trigger,
        remove: remove
    }
})();

//开始订阅
Event.listen('squareMeter88', function(price) {
    console.log('价格=' + price);
});

Event.trigger('squareMeter88', 2000000);//发布消息
```

以上代码基于一个全局的 Event 对象，我们利用它可以在两个封装良好的模块中进行通信，这两个模块可以完全不知道对方的存在。

---

```
ARTICLE_ID : 43
POST_DATE : 2017/11/14
AUTHER : WJT20
```
