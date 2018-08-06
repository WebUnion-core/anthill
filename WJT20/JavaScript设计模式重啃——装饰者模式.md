
# JavaScript设计模式重啃——装饰者模式 #

## 目录 ##

1. [继承与装饰者模式](#href1)
2. [简单的装饰者模式实例](#href2)
3. [AOP装饰函数](#href3)
4. [AOP实例](#href4)
 [](#href5)   1. 数据统计上报
 [](#href6)   2. 动态改变函数的参数
 [](#href7)   3. 插件式的表单验证

## <a name="href1">继承与装饰者模式</a> ##

在传统的面向对象语言中，给对象添加功能常常使用继承的方式，但是，继承的方式并不灵活，还会带来很多问题: 一方面会导致超类和子类之间存在强耦合性，当超类改变时，子类也会随之改变; 另一方面，继承这种功能复用方式通常被称为"白盒复用"，"白盒"是相对可见性而言的，在继承方式中，超类的内部细节是对子类可见的，继承常常被认为破坏了封装性。

使用继承还会带来一个问题: 在完成一些功能复用的同时，有可能创建出大量的子类，使子类的数量呈爆炸性增长。

装饰者模式能够在不改变对象自身的基础上，在程序运行期间给对象动态地添加职责，跟继承相比，装饰者是一种更加灵活的做法。

## <a name="href2">简单的装饰者模式实例</a> ##

直接上代码:

```
var plane = {
    fire: function() {
        console.log('发射普通子弹');
    }
};

var missileDecorator = function() {
    console.log('发射导弹');
};

var atomDecorator = function() {
    console.log('发射原子弹');
};

var fire1 = plane.fire;

plane.fire = function() {
    fire1();
    missileDecorator();
};

var fire2 = plane.fire;

plane.fire = function() {
    fire2();
    atomDecorator();
};

plane.fire(); // 输出: "发射普通子弹" "发射导弹" "发射原子弹"
```

## <a name="href3">AOP装饰函数</a> ##

首先编写两个方法，分别为 Function.prototype.before 和 Function.prototype.after，内容如下:

```
Function.prototype.before = function(beforeFn) {
    var _self = this; // 保存原函数的引用
    return function() { // 返回包含了原函数和新函数的"代理"函数
        beforeFn.apply(this, arguments); // 执行新函数，且保证this不被劫持，新函数接收的参数也会被原封不动地传入原函数，新函数在原函数之前执行
        return _self.apply(this, arguments); // 执行原函数并返回原函数的执行结果，并且保证this不被劫持
    }
};

Function.prototype.after = function(afterFn) {
    var _self = this;
    return function() {
        var ret = _self.apply(this, arguments);
        afterFn.apply(this, arguments);
        return ret;
    }
};
```

Function.prototype.before 接收一个函数作为参数，这个函数即为新添加的函数，它装载了新添加的功能代码，返回的是一个"代理"函数(只是结构上像代理)，它的工作是把请求分别转发给新添加的函数和原函数，且负责保证它们的执行顺序，让新添加的函数在原函数之前执行(这称为"前置装饰")，这样就实现了动态装饰的效果。Function.prototype.after 与 Function.prototype.before 原理相同，只不过是新函数与原函数的执行顺序相反而已。

使用实例(window.onload实例)：

```
window.onload = function() {
    alert(1);
};

window.onload = (window.onload || function() {}).after(function() {
    alert(2);
}).after(function() {
    alert(3);
}).after(function() {
    aalert(4);
});
```

## <a name="href4">AOP实例</a> ##

### <a name="href4-1">数据统计上报</a> ###

在项目开发的结尾阶段难免要加上很多统计数据的代码，这些过程可能让我们被迫改动早已封装好的函数，使用 AOP，可以避免这种情况，直接上代码:

```
...
// 业务逻辑
var showLogin = function() {
    console.log('打开登录浮层');
};

// 数据上报部分逻辑
var log = function() {
    console.log('上报标签为: ' + this.getAttribute('tag'));
};

showLogin = showLogin.after('log');

document.getElementById('button').onclick = showLogin;
```

### <a name="href4-2">动态改变函数的参数</a> ###

假如我们有一套旧的 ajax 异步请求机制，原本运行正常，然而有一天，我们的页面遭受了 CSRF 攻击，解决 CSRF 攻击最简单的方法是: 在 Http 请求中加入一个 token 参数，如果冒然将这个机制加入到原有的 ajax 请求代码内部，将会导致这块代码可复用性降低。使用 AOP 可以解决这个问题，直接上代码：

```
...
var ajax = function(type, url, param) {
    ...
    // 省略发起ajax请求的过程
    console.log(param);
};

var getToken = function() {
    return 'Token';
};

// 在ajax请求发起前加入一个token参数
ajax = ajax.before(function(type, url, param) {
    param.token = getToken();
});

ajax('get', 'http://www.xxx.com/api', { name: 'WJT20' });
```

### <a name="href4-3">插件式的表单验证</a> ###

表单验证是将表单数据提交服务器前的必需操作，常用的表单验证主要有是否为空判断、填写格式是否合法和填写信息字长等等。表单验证和将填写数据发送服务器是两部分逻辑，很多人经常将两者混写到一块，这样就会导致代码十分臃肿，职责也很混乱。使用 AOP 则可以将这两块逻辑代码分离开来，各司其职，至少代码看起来比之前要更优雅一些。

实例代码:

```
// 这里对Function.prototype.before方法做了一些改造
Function.prototype.before = function(beforeFn) {
    var _self = this;
    return function() {
        if (beforeFn.apply(this, arguments) === false) {
            return; // beforeFn返回false的情况直接return，不再执行后面的原函数
        }
        return _self.apply(this, arguments);
    };
}

var username = document.getElementById('username'),
    password = document.getElementById('paddword'),
    submitBtn = document.getElementById('submitBtn');

// 表单验证部分逻辑代码
var validata = function() {
    if (username.value === '') {
        alert('用户名不能为空');
        return false;
    }
    if (password.value === '') {
        alert('密码不能为空');
        return false;
    }
};

// 提交信息部分逻辑代码
var formSubmit = function() {
    var param = {
        username: username.value,
        password: password.value
    };
    ajax('http://www.xxx.com/api', param);
};

// 提交信息之前校验信息
formSubmit = formSubmit.before(validata);

submitBtn.onclick = function() {
    formSubmit();
}
```

---

```
ARTICLE_ID : 62
POST_DATE : 2018/01/21
AUTHER : WJT20
```
