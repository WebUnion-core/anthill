
# JavaScript-D系列——事件 #

## 目录 ##

1. [事件冒泡](#href1)
2. [事件捕获](#href2)
3. [事件处理程序(事件句柄)](#href3)
    1. [HTML事件处理程序](#href3-1)
    2. [DOM0级事件处理程序](#href3-2)
    3. [DOM2级事件处理程序](#href3-3)
4. [事件对象](#href4)
5. [事件类型](#href5)
    1. [UI事件](#href5-4)
    2. [鼠标事件](#href5-5)
    3. [键盘事件](#href5-6)

## <a name="href1">事件冒泡</a> ##

事件冒泡即事件开始时由最具体的元素(最"近"的节点)接收，然后逐级向上传播到较为不具体的节点(文档)。

```html
<!DOCTYPE html>
<html>
<head>
    <title>Click</title>
</head>
<body>
    <div id="myDiv">Click Me</div>
</body>
</html>
```

以上 HTML 页面中，当点击<div>元素时，click 事件的传递顺序是这样的: div节点 -> body节点 -> html节点 -> document节点。所有现代浏览器都支持事件冒泡，但具体实现上有差异。

## <a name="href2">事件捕获</a> ##

事件捕获的思想是事件开始时由最不具体的元素(最"远"的节点)接收，最具体的元素最后接收到事件。
以之前的 HTML 代码为例，click 事件的传递顺序是这样的: document -> html -> body -> div。老版本的浏览器不支持事件捕获，所以不推荐使用事件捕获。

## <a name="href3">事件处理程序(事件句柄)</a> ##

事件的名字包括 click、load 和 mouseover 等，而响应某个事件的函数叫做事件处理程序(或事件侦听器、事件句柄)，事件处理程序的名字以"on"开头，为事件指定处理程序的方式有多种。

### <a name="href3-1">HTML事件处理程序</a> ###

给 HTML 元素添加与事件处理程序同名的 HTML 属性可以指定元素事件。

HTML 代码:

```html
<input type="button" value="click" onclick="clickhandle()" />
```

JavaScript 代码:

```js
function clickHandle() {
    alert("Hello");
}
```

以上代码在点击按钮时会弹出一个弹窗。

### <a name="href3-2">DOM0级事件处理程序</a> ###

DOM0 级事件处理程序是给元素节点的事件处理程序属性赋一个函数。所有现代浏览器都支持 DOM0 级事件处理程序。

HTML 代码:

```html
<input id="btn" type="button" value="click" />
```

JavaScript 代码:

```js
var btn = document.getElementById("btn");
btn.onclick = function() {
    alert(this.value);
}
```

事件处理程序函数中，this 对象引用的是绑定事件处理程序的元素节点，所以以上代码中，当点击按钮时将弹出按钮的 value 属性值。

删除事件处理程序的方法:

```js
btn.onclick = null;
```

### <a name="href3-3">DOM2级事件处理程序</a> ###

DOM2 级事件给元素节点定义了`addEventListener()`和`removeEventListener()`方法分别用于绑定事件处理程序和删除事件处理程序。这两个方法都接收3个参数: 要处理的事件名、作为事件处理程序的绑定函数和一个可选布尔值(默认为 false，通常不需要手动设置)，第三个布尔值为 true 表示在捕获阶段调用事件处理程序，为 false 表示冒泡阶段调用事件处理程序。

IE9 以上及其他流行的浏览器都支持 DOM2 级事件处理程序。

HTML 代码:

```html
<input id="btn" type="button" value="click" />
```

JavaScript 代码:

```js
var btn = document.getElementById("btn");
function clickHandle() {
    alert(this.value);
}

btn.addEventListener("click", clickHandle);

// 5秒后点击按钮将不会有任何反应
setTimeout(function() {
    console.log("Stop");
    btn.removeEventListener("click", clickHandle);
}, 5000);
```

注意，`removeEventListener()`第二个参数为具体的事件处理程序函数名，如果需要删除指定事件处理程序，则应先将该事件处理程序定义为普通函数而不是直接使用匿名函数。

## <a name="href4">事件对象</a> ##

触发一个事件时，会产生一个事件对象，这个事件对象中包含所有与事件有关的信息。

在事件处理程序中可以访问这个事件对象。

```js
var btn = document.getElementById("btn");
btn.onclick = function(event) {
    alert(event.type); // 输出事件类型: "click"
}
```

事件对象常用的属性及方法:

1. `e.target`: 只读，返回事件的目标(直接触发的元素节点)。
2. `e.type`: 只读，返回事件类型。
3. `e.preventDefault()`: 取消事件的默认行为，常用场景有取消提交按钮的点击提交行为及阻止链接点击跳转等，等同于`return false`。
4.` e.stopPropagation()`: 取消事件进一步捕获或冒泡。

## <a name="href5">事件类型</a> ##

### <a name="href5-4">UI事件</a> ###

UI 事件指那些不一定与用户操作有关的事件。

常用的 UI 事件有:

1. load: 页面、图像、脚本等资源完全加载后触发的事件，应用场景: 图片加载完全前加入载入一个预备显示图片;
2. select: 用户选择文本框(<input>或<textarea>)中的字符时触发，触发元素上有两个属性 selectionStart 和 selectionEnd 分别返回的是起始位置索引号(包括)和结束位置索引号(不包括)，使用这两个属性可以读取选择的文本内容;
3. scroll: 滚动带滚动条的元素时触发，应用场景: 返回顶部按钮。

### <a name="href5-5">鼠标事件</a> ###

鼠标事件是最常用的一类事件。

常用的鼠标事件:

1. click: 单击鼠标左键或按回车键触发;  
2. dblclick: 双击鼠标触发;  
3. mousedown: 用户按下任意鼠标键时触发;  
4. mouseenter: 鼠标移入元素触发;  
5. mouseleave: 鼠标移出元素触发;  
6. mousemove: 鼠标在元素上移动时触发。

鼠标事件触发元素的事件对象上设置有两个表示客户区(页面显示的区域)坐标的属性: clientX 属性(相对左上角点的水平坐标)和 clientY 属性(相对左上角点的竖直坐标)。

### <a name="href5-6">键盘事件</a> ###

用户使用键盘时会触发键盘事件。

常用的键盘事件:

1. keydown: 按下任意键时触发，按住不放会重复触发;  
2. keypress: 按下字符键时触发，按住不放会重复触发;  
3. keyup: 释放按键时触发。

键盘事件触发元素的事件对象上设置有 keyCode 属性，用于返回按下的键对应的键码。对于 keypress 事件，触发元素事件对象上的 charCode 属性可以返回按下的字符键对应的 ASCII 码。

---

```
ID         : 93
DATE       : 2018/08/07
AUTHER     : WJT20
TAG        : JavaScript
```
