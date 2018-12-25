
# JavaScript高级程序设计实记——数据请求 #

## 目录 ##

1. [JSON](#href1)
    1. [JSON语法](#href1-1)
    2. [解析与序列化](#href1-2)
2. [Ajax](#href2)
    1. [创建XHR对象](#href2-3)
    2. [创建请求](#href2-4)
    3. [发送请求](#href2-5)
    4. [接收响应](#href2-6)
3. [JSONP](#href3)

## <a name="href1">JSON</a> ##

JSON(JavaScript Object Notation，JavaScript 对象表示法)是一种数据格式，而不是一种编程语言，虽然具有相同的语法形式，但 JSON 并不属于 JavaScript，且并不只有 JavaScript 可以使用 JSON。

### <a name="href1-1">JSON语法</a> ###

JSON 语法可以表示以下三种类型的值:

1. 简单值: 简单值指 JavaScript 中的除 undefined 以外的基本数据类型(字符串、数值、布尔值和 null);
2. 对象: JSON 对象是一种复杂数据类型，表示一组无序的键值对集合，值可以是简单值，也可以是复杂数据类型值;
3. 数组: 数组也是一种复杂数据类型，表示一组有序的值的列表，可以用索引号访问元素，数组的值也可以是任意类型——简单值、对象或数组。

一个简单的JSON对象:

```json
{
    "name": "WJT",
    "id": 1
}
```

这个 JSON 对象类似于 JavaScript 中的对象，然而这是两个完全不同的概念，JSON对格式要求更加严格，键必须要用一对双引号包含，单引号也不行。

一个嵌套的 JSON 对象:

```json
{
    "name": "WJT",
    "id": 1,
    "from": {
        "country": "China",
        "school": "HuaLi"
    }
}
```

将数组和对象组合起来，可以形成更为复杂的数据集合:

```json
[
    {
        "name": "WJT",
        "id": "001",
        "from": {
            "country": "China",
            "school": "HuaLi"
        }
    },
    {
        "name": "DD",
        "id": "002",
        "from": {
            "country": "China",
            "school": "HuaLi"
        }
    }
]
```

### <a name="href1-2">解析与序列化</a> ###

JavaScript 提供了一个用于将 JavaScript 对象转换为JSON数据字符串(这个过程称为序列化)的方法: `JSON.stringify(obj, select)`，接收的 obj 参数是要序列化的对象，select 参数(可选)是一个筛选字段数组，执行这个方法时会返回对象中和数组中同名的属性的序列化结果。

将JSON数据字符串转换为 JavaScript 对象有另一个方法: `JSON.parse(JSONStr)`，接收的 JSONStr 参数是格式正确的JSON字符串。

```js
var obj = {
    name: "WJT",
    id: "001"
};

// 控制台输出以外的方式显示对象信息，返回的是"[object xxx]"的形式，无法显示对象内部属性和方法，这时可以将对象序列化为JSON字符串达到目的
alert(obj); // 输出: "[object Object]"

var JSONString1 = JSON.stringify(obj); // 对象转JSON
alert(JSONString1); // 输出: "{"name":"WJT","id":"001"}"

var JSONString2 = JSON.stringify(obj, ["name"]);
alert(JSONString2); // 输出: "{"name":"WJT"}"

var dataObj = JSON.parse(JSONString); // JSON转对象
alert(dataObj); // 输出: "[object Object]"
```

## <a name="href2">Ajax</a> ##

Ajax(Asynchronous JavaScript + XML，异步 JavaScript 和 XML)能够向服务器请求额外的数据而无需跳转页面，能带来更好的用户体验。

Ajax 的技术核心是 XMLHttpRequest 对象(简称 XHR)，XHR 为向服务器发送请求和解析服务器响应带来了流畅的接口，能够以异步方式从服务器取得更多信息，从而实现不必刷新页面
也能取得数据。

### <a name="href2-3">创建XHR对象</a> ###

使用`new XMLHttpRequest()`可以创建一个 XHR 实例对象。

```js
var xhr = new XMLHttpRequest();
```

### <a name="href2-4">创建请求</a> ###

创建一个请求用到了 XHR 实例对象的`open(type, target, ifAsync)`方法，这个方法接受四个参数: type 参数为请求类型，常用的请求类型主要有"POST"和"GET"两种; target 参数是请求发送到的目的地; ifAsync 参数是一个布尔值，表示是否发起异步请求，true 为异步，false 为同步。

```js
xhr.open("POST", "./data.php", true);
```

### <a name="href2-5">发送请求</a> ###

创建了一个请求后，还要将请求发送出去，发送请求用到了 XHR 实例对象的`send(data)`方法，接收的 data 参数是所要发送的数据，如果不发送数据应传入 null 值。

```js
xhr.send();
```

### <a name="href2-6">接收响应</a> ###

Ajax 最大的优点就是可以发起异步请求，当发起异步请求时，可以检测 XHR 实例对象的 readyState 属性来识别请求的活动状态，这个属性返回的值有5种情况:

1. 0: 未初始化，尚未调用`open()`方法;
2. 1: 启动，已经调用`open()`方法，还未调用`send()`方法;
3. 2: 发送，已经调用`send()`方法，但尚未接收到响应;
4. 3: 接收，已经接收到部分响应数据;
5. 4: 完成，已经接收到全部响应数据，而且可以在客户端使用了。

通常情况下，我们只需要对 readyState 返回值为4的情况进行操作，因为这时数据以发送或接收完毕了。

只要 readyState 发生变化就会触发一次 readystatechange 事件，可以利用这个事件来检测每次状态发生变化后 readyState 的值，并做出处理。

XHR 实例对象还有一个 status 属性，返回的是响应结果状态码，常见的状态码有: 404(请求页面出错)、304(从缓存中请求页面)、200(请求成功)等等。

当响应成功后，可以痛过 XHR 实例对象的 responseText 属性接收响应文本内容(现在响应文本媒介更常使用JSON格式数据)。

```js
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
        // 数据处理完成
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            // 状态码在[200,300)之间或状态码为304都表示请求成功
            alert(xhr.responseText);
        } else {
            alert("Error: " + xhr.status);
        }
    }
}
```

当发起 POST 请求时，要在创建请求后发送请求前设置头信息:

```js
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
```

POST 发送的数据作为`xhr.send()`方法的参数传递，数据可以是查询字符串(URL 中"?"号之后的键值对集合，每对键值对用"&&"分隔)，也可以是 XML 或 JSON。

## <a name="href3">JSONP</a> ##

同源策略: 我们无法在自己页面所在域名环境下获取其他域名的请求内容。

```js
// 由于同源策略，我们无法获取其他域名请求获得的内容
var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            alert(xhr.responseText);
        } else {
            alert("Error: " + xhr.status);
        }
    }
}
xhr.open("GET", "https://pos.baidu.com/wh/o.htm", true);
xhr.send(null);
```

JSONP 可以解决同源策略限制跨域请求资源的问题，前提是你请求的那个页面有 JSONP 接口，JSONP 主要用于解决 Ajax 无法跨域请求数据的问题。

JSONP 的原理是借助 script 标签的 src 属性发起一个跨域请求。首先手动创建一个 script 标签，将 JSONP 接口 URL 写入到 src 属性，再在页面中自定义一个接口函数，一般接口函数第一个参数即为请求返回的数据，最后将 script 插入到页面中，发送请求到异域后台后，后台会给接收的接口函数注入数据返回并将该函数在请求页面中自动调用，在自定义的同名接口函数中处理数据，最终完成整个请求过程。

```js
// 自定义同名接口函数
function jsonp_callback_22679(data) {
    var dataStr = JSON.stringify(data, ["data"]);
    var img = document.getElementById("img");
    img.src = JSON.parse(dataStr).data;
}

var script = document.createElement("script");
script.setAttribute("src", "https://ecpm.tanx.com/ex?i=mm_12852562_1778064_13674396&cb=jsonp_callback_22679&r=&cg=f648cb3322725a25e18e93541a57d69d&pvid=a906062708de314ecdb83f5f36adf00d&u=https://www.taobao.com/&psl=1&nk=106,116,97,111,37,53,67,117,57,66,52,70&sk=&refpid=&fp=1.IWarKbUbjxKweymewmGWrclK9NgOOTFHNv2BNybYBZ4bhebhW9k2ZA.UTF-8.hu2lztSK_gBAtByID_hEI0DmqgiayA.Q.zt1c8m"); // 通过src属性发起请求

document.body.appendChild(script); // 请求成功，会在页面上显示图像
```

---

```
ID         : 27
DATE       : 2017/08/29
AUTHER     : WJT20
TAG        : JavaScript
```
