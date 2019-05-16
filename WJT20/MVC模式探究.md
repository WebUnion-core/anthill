
# MVC模式探究 #

## 目录 ##

1. [参考链接](#href1)
2. [什么是MVC](#href2)
3. [原理](#href3)
4. [代码演示](#href4)

## <a name="href1">参考链接</a> ##

- [自制前端框架之MVC](http://ewind.us/2017/nano-mvc/)

- [MVC简介](https://www.cnblogs.com/diyunfei/p/6752618.html)

- [前端web开发的MVC模式 - 从一个简单实例讲起](http://blog.csdn.net/guoyankun/article/details/19335065)

## <a name="href2">什么是MVC</a> ##

MVC(全名: Model View Controller)是一种由模型(Model)、视图(View)及控制器(Controller)构成的经典软件设计模式，它用一种数据、业务逻辑和内容显示三者分离的方法组织代码，将众多的业务逻辑聚集到一个部件中，在改造界面及实现交互功能时，不再需要重写业务逻辑，减少了编写代码的时间。

MVC 是 UI 编程领域中非常经典的设计模式，使得开发者能够借助该模式，构建出更易于扩展和维护的应用程序。

## <a name="href3">原理</a> ##

MVC 模式强调模型、视图和控制器三个模块的分离，三个模块各自负责不同的功能，职责分工如下:

1. Model: 负责真正的逻辑处理;

2. Controller: 负责页面节点事件的注册和控制，以及页面加载性能的实现;

3. View: 只管页面的显示和样式展示。

需要注意的是，MVC 仅是一种模式理念，而非具体的规范。因此，根据 MVC 的理念所设计出的框架，在实现和使用上可能存在着较大的区别。

在学习 MVC 等模式前，许多人对业务逻辑的实现是非常简单而直接的，往往是想到什么做什么，页面渲染和数据获取的逻辑代码混淆一块，这样做确实能在寥寥数行之内实现业务需求，但是，久而久之，一大堆的问题就会暴露出来，这些问题通常包括:

1. 处理业务逻辑，以硬编码的形式结合在了一起，一般项目中数据渲染的代码多直接书写在匿名回调函数内，难以抽离复用(尤其是在回调函数内使用了 this 时，更难复用相应的渲染代码);

2. 涉及到字符串拼接操作时，这些代码往往十分难以维护(在 ES6 出现前，这个问题尤为严重)，各种形如`'<div class="' + data.class + '">'`这样引号交错的代码虽然容易符合初学者的直觉写出，但显然难以阅读和维护;

3. 将数据直接映射到页面 DOM 上的操作同样很符合初学者的直觉，但也造成应用数据模型的缺乏。在页面涉及到各种状态切换，且直接操作 DOM 反映这些状态时，就会带来陡增的状态复杂性。

## <a name="href4">代码演示</a> ##

最简单的 MVC 模式用代码来实现可能是这样的:

HTML 部分(视图):

```html
<html>
<head>
    <meta charset="UTF-8" />
    <title>MVC模式演示</title>
</head>
<body>
    <input id="btn" type="button" />

    <!-- 模型 -->
    <script src="./model.js"></script>

    <!-- 控制器 -->
    <script src="./controller.js"></script>
</body>
</html>
```

model.js 代码(模型):

```js
function tipInfo(){
    alert('注册...');
}
```

controller.js 代码(控制器):

```js
var btn1 = document.getElementById('btn');
var UI = {
    register: function(btn, callback){
        btn && btn['on' + even] = callback;
    }
}
UI.register(btn1, tipInfo);
```

---

```
ID         : 48
DATE       : 2017/12/09
AUTHER     : WJT20
TAG        : Web相关
```
