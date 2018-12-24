
# JavaScript-D系列——BOM #

## 目录 ##

1. [window对象](#href1)
    1. [window.open](#href1-1)
    2. [延时器与定时器](#href1-2)
    3. [弹窗](#href1-3)
2. [location对象](#href2)
    1. [URL解析](#href2-1)
    2. [页面跳转](#href2-2)
3. [navigator对象](#href3)
4. [history对象](#href4)

BOM(Browser Object Model，浏览器对象模型)提供了很多对象用于访问浏览器的功能，这些功能与任何网页内容无关。

## <a name="href1">window对象</a> ##

BOM 的核心对象是 window，它代表浏览器的一个实例，window 对象有两个身份:

1. 浏览器窗口的接口对象;

2. 浏览器环境下的全局对象。

JS脚本文件中，全局作用域下声明的变量、函数等都是 window 对象的属性和方法，只是通常情况下可以将 window 对象隐藏。

```js
var num1 = 123;

console.log(num1, window.num1, num1 === window.num1); // 输出: 123 123 true

function fn1() {
    console.log("Hahaha...");
}

fn1();
window.fn1(); // 同上
```

### <a name="href1-1">window.open</a> ###

`window.open(url, name, setString)`: 创建一个命名窗口或设置一个已存在名窗口，url 参数为加载的页面，name 参数为窗口名，setString 参数为设置窗口属性的字符串。常用的设置窗口属性有:

- height 和 width: 高度和宽度，都不能小于100px;

- top 和 left: 距离顶部和左边的距离，不能是负数;

- location: 是否显示地址栏，取值 yes 或 no(默认);

- menubar: 是否显示菜单栏，取值 yes 或 no(默认);

- status: 是否显示状态栏，取值 yes 或 no(默认);

- toolbar: 是否显示工具栏，取值 yes 或 no(默认);

- scrollbars: 是否允许滚动，取值 yes 或 no(默认);

- resizable: 是否可以手动调整窗口大小，取值 yes 或 no(默认)。

```js
// 打开一个高500px，宽500px，坐标(100,100)，不能手动调整大小的新窗口
// 如果存在名为topFrame的窗口或框架就加载到里面，否则创建的窗口或框架命名为"topFrame"
window.open("http://www.baidu.com", "topFrame", "height=500,width=500,top=100,left=100,resizable=no");
```

### <a name="href1-2">延时器与定时器</a> ###

window 对象的 `setTimeout(callback, time)` 可以延时 time 参数指定的时间长度(毫秒)再执行接收的 callback 回调函数。

```js
// 5秒后执行回调函数
setTimeout(function() {
    console.log("5 seconds");
}, 5000);
```

window 对象的 `setInterval(callback, time)` 可以每隔 time 参数指定的时间长度(毫秒)再执行接收的 callback 回调函数。

```js
// 每隔1秒执行回调函数
setInterval(function() {
    console.log("1 second");
}, 1000);
```

一般将 `setTimeout()` 和 `setInterval()` 的返回结果(称为计时器)保存在一个变量中，然后可以使用 `clearTimeout(timer)` 和 `clearInterval(timer)` 清除设置的计时器。

```js
// 5秒后执行回调函数
var timer1 = setTimeout(function() {
    console.log("5 seconds");
    clearInterval(timer2); // 5秒后清除timer2
}, 5000);

// 每隔1秒执行回调函数
var timer2 = setInterval(function() {
    console.log("1 second");
}, 1000);
```

### <a name="href1-3">弹窗</a> ###

1. `alert(text)`: 接受一个字符串参数并弹出一个弹窗显示参数内容;

2. `confirm(text)`: 接受一个字符串参数并弹出一个确认弹窗显示参数内容，当点击确认时返回 true 否则返回 false;

3. `prompt(text, defaultText)`: 弹出一个输入文本框弹窗，接受的 text 参数为显示在弹窗上的提示信息，defaultText 参数为显示在文本框内的默认信息，当点击确定时返回文本框内容，如果文本框内容为空则返回空字符串。

```js
var result1 = prompt("输入你的名字", "小明");
var result2;

// 如果文本框内容非空
if (result1 !== null) {
    result2 = confirm("你的名字是: " + result1 + "吗？");

    // 如果点击确认
    if (result2) {
        alert("欢迎加入我们！" + result1);
    }
}
```

## <a name="href2">location对象</a> ##

location 是最有用的 BOM 对象之一，它提供了当前窗口中加载的文档有关的信息，还提供一些导航内容，location 对象是一个特殊的对象，它既是 window 对象的属性，又是 document 对象的属性。

```js
console.log(
    location === window.location,
    location === document.location,
    window.location === document.location
); // 输出: true true true
```

### <a name="href2-1">URL解析</a> ###

URL(Uniform Resource Locator，统一资源定位符)由协议、主机名(域名或IP地址)、端口(可以隐藏)、目录及文件名、哈希(hash，由#加任意值，不跳转页面)、查询字符串(由?加键值对组合，每个键值对用&分隔)等构成，是互联网上标准资源的地址。

location 对象具有一些可访问的与 URL 有关的属性:

1. hash: 返回 URL 中的 hash(#号后的内容) 部分，可读可写;

2. host: 返回服务器名称和端口号，可读可写;

3. hostname: 返回服务器名(不带端口)，可读可写;

4. href: 返回完整的 URL，输出 location 对象默认返回的就是这个值，可读可写;

5. pathname: 返回 URL 中的目录、文件名等信息，可读可写;

6. port: 返回 URL 中指定的端口号，可读可写;

7. protocol: 返回页面使用的属性，可读可写;

8. search: 返回查询字符串(?号后的内容，参数对之间用&号分隔)，可读可写。

```js
/**
 * 假如当前页面的URL为: http://localhost:8090/test/index.html?name=WJT&id=001#home
 */
console.log(location.href); // 输出: "http://localhost:8090/test/index.html?name=WJT&id=001"

console.log(location.protocol); // 输出: "http:"

console.log(location.host); // 输出: "localhost:8090"

console.log(location.hostname); // 输出: "localhost"

console.log(location.port); // 输出: "8090"

console.log(location.pathname); // 输出: "/test/index.html"

console.log(location.hash); // 输出: "home"

console.log(location.search); // 输出: "?name=WJT&id=001"
```

查询字符串参数整合为对象:

```js
function parseQueryString() {
    var str = location.search.slice(1),
        arr = str.split("&"),
        obj = {};

    for(var i = 0; i < arr.length; i++) {
        var item = arr[i].split("=");
        var key = decodeURIComponent(item[0]);
        var value = decodeURIComponent(item[1]); // 一般参数字符串都经过编码，使用decodeURIComponent()方法将键和值转为原始值

        obj[key] = value;
    }

    return obj;
}
console.log(parseQueryString());
```

### <a name="href2-2">页面跳转</a> ###

使用 location 对象的 `assign(url)` 的方法、`replace(url)` 方法和设置 location 属性(除了 hash，常用的是修改 href 属性)都可以实现页面跳转。

```js
location.href = "http://localhost:8090/test/index.html"; // 会在历史纪录中生成记录
location.assign("http://localhost:8090/test/index.html"); // 会在历史纪录中生成记录
location.replace("http://localhost:8090/test/index.html"); // 不会在历史纪录中生成记录(无法使用前进/返回按钮访问)
```

除此之外，可以使用`location.reload(ifGetFromServer)`对当前页面进行刷新加载，ifGetFromServer 参数是一个可选参数(布尔值)，默认为 false，设为 true 将从服务器上加载页面。

## <a name="href3">navigator对象</a> ##

navigator 对象常用于识别客户端浏览器类型，navigator 对象的 useAgent 属性返回浏览器的用户代理字符串，不同内核的浏览器返回的内容可能不同。

```js
// 摘取的UA判断规则
var sUserAgent = navigator.userAgent.toLowerCase();
var browser = {
    bIsIOS: !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    bIsUc: sUserAgent.match(/ucweb/i) == "ucweb",
    bIsAndroid: sUserAgent.match(/android/i) == "android",
    bIsAndroidVersion: Number(sUserAgent.substr(sUserAgent.indexOf('android') + 8, 3)),
    bIsQQ: sUserAgent.match(/qq/i) == "qq",
    bIsWechat: sUserAgent.match(/micromessenger/i) == "micromessenger",
    bIsWeibo: sUserAgent.match(/weibo/i) == "weibo",
    bIsHuawei: sUserAgent.match(/huawei/i) == "huawei"
};
```

## <a name="href4">history对象</a> ##

history 对象保存着用户上网的历史纪录，常用的有三个方法:

1. history.go(positionNum): 加载指定位置的页面，positionNum 参数表示相对当前页面历史纪录位置的页面数值，负数表示后退第几个页面，正数表示前进第几个页面;

2. history.back(): 后退;

3. history.forward(): 前进。

```js
history.go(1); // 跳转历史纪录指定页面
history.back(); // 后退
history.forward(); // 前进
```

---

```
ID         : 91
DATE       : 2018/08/06
AUTHER     : WJT20
TAG        : 
```
