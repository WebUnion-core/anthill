
# JavaScript BOM与DOM #

## 目录 ##

1. [BOM](#href1)
 [](#href2)   1. window对象
 [](#href3)   2. location对象
 [](#href4)   3. navigator对象
 [](#href5)   4. history对象
2. [DOM](#href6)
 [](#href7)   1. 节点属性
 [](#href8)   2. 节点方法
 [](#href9)   3. 元素节点
 [](#href10)   4. 获取元素节点
 [](#href11)   5. 属性节点
 [](#href12)   6. 文本节点
 [](#href13)   7. 获取内容
 [](#href14)   8. 添加样式

## <a name="href1">BOM</a> ##

BOM(Browser Object Model，浏览器对象模型)提供了很多对象用于访问浏览器的功能，这些功能与任何网页内容无关。

### <a name="href1-1">window对象</a> ###

BOM 的核心对象是 window，它代表浏览器的一个实例，window 对象有两个身份：

1. 浏览器窗口的接口对象；
2. 浏览器环境下的全局对象。

JS 脚本文件中，全局作用域下声明的变量、函数等都是 window 对象的属性和方法，只是通常情况下可以将 window 对象隐藏。

```
var num = 123;
console.log(num, window.num, num === window.num);//输出："123 123 true"
function fn() {
    console.log("Hahaha...");
}
fn();
window.fn();//同上
```

window 对象常用功能：

1. window.open(url, name, setString)

    创建一个命名窗口或设置一个已存在名窗口，url 参数为加载的页面，name 参数为窗口名，setString 参数为设置窗口属性的字符串。常用的设置窗口属性有：

    - height 和 width：高度和宽度，都不能小于100px；
    - top 和 left：距离顶部和左边的距离，不能是负数；
    - location：是否显示地址栏，取值 yes 或 no(默认)；
    - menubar：是否显示菜单栏，取值 yes 或 no(默认)；
    - status：是否显示状态栏，取值 yes 或 no(默认)；
    - toolbar：是否显示工具栏，取值 yes 或 no(默认)；
    - scrollbars：是否允许滚动，取值 yes 或 no(默认)；
    - resizable：是否可以手动调整窗口大小，取值 yes 或 no(默认)。

    ```
    //打开一个高500px，宽500px，坐标(100,100)，不能手动调整大小的新窗口
    //如果存在名为topFrame的窗口或框架就加载到里面，否则创建的窗口或框架命名为"topFrame"
    window.open("http://www.baidu.com", "topFrame", "height=500,width=500,top=100,left=100,resizable=no");
    ```

2. setTimeout() 和 setInterval()

    window 对象的 setTimeout(callback, time) 可以延时 time 参数指定的时间长度(毫秒)再执行接收的 callback 回调函数。

    ```
    setTimeout(function() {
        console.log("5 seconds");
    }, 5000);//5秒后执行回调函数
    ```

    window 对象的 setInterval(callback, time) 可以每隔 time 参数指定的时间长度(毫秒)再执行接收的 callback 回调函数。

    ```
    setInterval(function() {
        console.log("1 second");
    }, 1000);//每隔1秒执行回调函数
    ```

3. clearTimeout() 和 clearInterval()：

    一般将 setTimeout() 和 setInterval() 的返回结果(称为计时器)保存在一个变量中，然后可以使用 clearTimeout(timer) 和 clearInterval(timer) 清除设置的计时器。

    ```
    var timer1 = setTimeout(function() {
        console.log("5 seconds");
        clearInterval(timer2);//5秒后清除timer2
    }, 5000);//5秒后执行回调函数
    var timer2 = setInterval(function() {
        console.log("1 second");
    }, 1000);//每隔1秒执行回调函数
    ```

4. alert()、confirm() 和 prompt()

    - alert(text)：接受一个字符串参数并弹出一个弹窗显示参数内容；

    - confirm(text)：接受一个字符串参数并弹出一个确认弹窗显示参数内容，当点击确认时返回 true 否则返回 false；

    - prompt(text, defaultText)：弹出一个输入文本框弹窗，接受的 text 参数为显示在弹窗上的提示信息，defaultText 参数为显示在文本框内的默认信息，当点击确定时返回文本框内容，如果文本框内容为空则返回空字符串。

    ```
    var result1 = prompt("输入你的名字", "小明"),
        result2;
    if (result1 !== null) {//如果文本框内容非空
        result2 = confirm("你的名字是：" + result1 + "吗？");
        if (result2) {//如果点击确认
            alert("欢迎加入我们！" + result1);
        }
    }
    ```

### <a name="href1-2">location对象</a> ###

location 是最有用的 BOM 对象之一，它提供了当前窗口中加载的文档有关的信息，还提供一些导航内容，location 对象是一个特殊的对象，它既是 window 对象的属性，又是 document 对象的属性。

```
console.log(location === window.location, location === document.location, window.location === document.location);//输出：true true true
```

location 对象具有一些可访问属性：

- hash：返回 URL 中的 hash(#号后的内容) 部分，可读可写；
- host：返回服务器名称和端口号，可读可写；
- hostname：返回服务器名(不带端口)，可读可写；
- href：返回完整的 URL，输出 location 对象默认返回的就是这个值，可读可写；
- pathname：返回 URL 中的目录、文件名等信息，可读可写；
- port：返回 URL 中指定的端口号，可读可写；
- protocol：返回页面使用的属性，可读可写；
- search：返回查询字符串(?号后的内容，参数对之间用&号分隔)，可读可写。

查询字符串参数整合为对象：

```
function parseQueryString() {
    var str = location.search.slice(1),
        arr = str.split("&"),
        obj = {};

    for(var i = 0; i < arr.length; i++) {
        var item = arr[i].split("="),
            key = decodeURIComponent(item[0]),
            value = decodeURIComponent(item[1]);//一般参数字符串都经过编码，使用decodeURIComponent()方法将键和值转为原始值
        obj[key] = value;
    }

    return obj;
}
console.log(parseQueryString());
```

页面跳转：使用 location 对象的assign(url) 的方法、replace(url) 方法和设置 location 属性(除了 hash，常用的是修改 href 属性)都可以实现页面跳转。

```
location.href = "http://localhost:8090/test/index.html";//会在历史纪录中生成记录
location.assign("http://localhost:8090/test/index.html");//会在历史纪录中生成记录
location.replace("http://localhost:8090/test/index.html");//不会在历史纪录中生成记录(无法使用前进/返回按钮访问)
```

location.reload(ifGetFromServer) 可以对当前页面进行刷新加载，ifGetFromServer 参数是一个可选参数(布尔值)，默认为 false，设为 true 将从服务器上加载页面。

### <a name="href1-3">navigator对象</a> ###

navigator 对象常用于识别客户端浏览器类型，navigator 对象的 useAgent 属性返回浏览器的用户代理字符串，不同内核的浏览器返回的内容可能不同。

### <a name="href1-4">history对象</a> ###

history 对象保存着用户上网的历史纪录，常用的有三个方法：

1. history.go(positionNum)：加载指定位置的页面，positionNum 参数表示相对当前页面历史纪录位置的页面数值，负数表示后退第几个页面，正数表示前进第几个页面；

2. history.back()：后退；

3. history.forward()：前进。

---

## <a name="href2">DOM</a> ##

DOM(Document Object Model，文档对象模型)描绘了一个层次化的节点树，允许开发人员添加、移除和修改页面的一部分。

DOM 将 HTML 或XML文档描绘成一个由多层节点构成的结构，节点分为几种不同的类型，每种类型分别表示文档中不同的信息或标记。

节点有12种类型，常见的节点有三种：

1. 元素节点(Element)；
2. 属性节点(Attribute);
3. 文本节点(Text)。

### <a name="href2-5">节点属性</a> ###

每一个节点都有以下属性：

1. nodeType 属性：表明节点的类型，其值是一个1~12的数值常量，例如，元素节点的 nodeType 属性值为1，属性节点的 nodeType 属性值为2等；

2. nodeName 属性：对于不同的节点，nodeName 返回的值可能不同，nodeName 常用于返回一个元素节点的标签名；

3. nodeValue 属性：nodeValue 属性返回的是节点的值，同样根据不同的节点返回不同的值，文本节点会返回文本内容；

4. parentNode 属性：返回节点的父节点；

5. childNodes 属性：返回节点的子节点，返回的是一个类数组对象，可以根据索引号访问指定的节点；

6. firstChild 属性：返回第一个子节点，等同于 node.childNodes[0]；

7. lastChild 属性：返回最后一个子节点，等同于 node.childNodes[node.ChildNodes.length - 1]。

### <a name="href2-6">节点方法</a> ###

1. node.appendChild(newNode)：在节点的子节点集合最后面插入新节点，newNode 节点为插入的新节点；

2. node.insertBefore(newNode, beforeNode)：在节点的子节点集合的指定位置插入新节点，newNode 节点为插入的新节点，新节点会插入到 beforeNode 节点前；

3. node.replaceChild(newNode, oldNode)：将节点的子节点中的 oldNode 节点替换为 newNode 节点；

4. node.removeChild(removeNode)：将节点的子节点中的 removeNode 节点删除；

5. node.cloneNode(ifAll)：复制一个节点，ifAll 参数(布尔值)为是否复制节点的所有子节点，如果为 true 则连同其子节点一起复制，为 false 则只复制节点本身。

### <a name="href2-7">元素节点</a> ###

元素节点的 nodeType 属性值为1，nodeName属性值为元素的标签名，nodeValue属性值为 null。获取元素节点的属性名可以使用 nodeName 属性也可以使用 tagName 属性，两者返回的值相同。

创建一个元素节点使用 document 对象的 createElement(tagName) 方法，接收的 tagName 参数为元素的标签名。

### <a name="href2-8">获取元素节点</a> ###

获取元素节点有四种方式：

1. document.getElementsByTagName(tagName)：根据标签名获取元素节点，返回的是一个类数组对象；

2. document.getElementsByClassName(className)：根据 class 获取元素节点，返回的是一个类数组对象；

3. document.getElementById(id)：根据 id 获取单个元素，HTML 页面中一个 id 只能使用一次；

4. document.getElementsByName(name)：根据 name 属性值获取元素节点，返回的是一个类数组对象。

特殊的节点 body 可以使用 document.body 属性获取。

### <a name="href2-9">属性节点</a> ###

属性节点的 nodeType 属性值为2，一些常用的属性例如 id、className、title 等可以直接通过元素节点访问。

```
var a = document.getElementsByTagName("a")[0];//获取单个a元素
console.log(a.id, a.className);//id和className可以直接访问
```

对于其他的属性，可以使用 elem.getAttribute(attr) 方法获取指定属性的值，elem.setAttribute(attr, value) 方法设置指定属性的值。

```
console.log(a.getAttribute("href"), a.getAttribute("name"), a.getAttribute("datatype"));//获取不可直接访问的属性值
a.setAttribute("href", "./abc");//设置属性值
```

### <a name="href2-10">文本节点</a> ###

文本节点的 nodeType 属性值为3，nodeValue 属性值为文本内容。注意，HTML 页面中标签间的空格或缩进属于文本节点。

创建一个文本节点使用 document.createTextNode(text) 方法。

```
var textNode2 = document.createTextNode("EEE");//创建文本节点
```

### <a name="href2-11">获取内容</a> ###

元素节点的 innerHTML 属性可以获取/设置节点内部的内容，设置的内容可以是 HTML 标签。元素节点的 outerHTML 属性获取/设置的是包含调用节点在内的所有内容。元素节点的 innerText 属性可以获取/设置节点内部的所有文本(忽略标签)，设置的内容只能是文本。

```
var p = document.getElementById("pid");
console.log(p.innerHTML);//获取节点内部的所有内容
console.log(p.innerText);//获取节点内部的所有文本
p.innerHTML = "";//清空节点内部所有内容
p.outerHTML = "<strong style='background-color:red;'>" + p.outerHTML + "</strong>";//将元素节点包裹在一对 <strong> 标签内
```

### <a name="href2-12">添加样式</a> ###

给元素节点添加样式使用的是元素节点的 style 属性，只需要给 style 属性再添加一些样式属性即可，需要注意的是，像 font-size 等用\-号连接两个单词的样式属性，应将\-号去掉并把第二个单词首字母转为大写。

```
p.style.color = "green";//设置字体颜色
p.style.fontSize = "30px";//设置字体大小
function addStyle(elem, obj) {//包装一个一次性添加多条样式的函数
    for(var key in obj) {
        elem.style[key] = obj[key];
    }
}
addStyle(p, {
    fontWeight: "bold",
    border: "5px solid green"
});
```

---

```
ARTICLE_ID : 23
POST_DATE : 2017/08/25
RECENTLY_MODIFY : 2017/08/25
TIME_COUNTER : 1
AUTHER : WJT20
```
