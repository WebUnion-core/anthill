
# JavaScript-D系列——BOM #

## 目录 ##

1. [什么是DOM](#href1)
2. [节点属性](#href2)
3. [节点方法](#href3)
4. [节点的种类](#href4)
    1. [元素节点](#href4-1)
    2. [属性节点](#href4-2)
    3. [文本节点](#href4-3)
5. [常见DOM操作](#href5)
    1. [获取/设置节点内容](#href5-1)
    2. [添加样式](#href5-2)

## <a name="href1">什么是DOM</a> ##

DOM(Document Object Model，文档对象模型)描绘了一个层次化的节点树，允许开发人员添加、移除和修改页面的一部分。

DOM 将 HTML 或 XML 文档描绘成一个由多层节点构成的结构，节点分为几种不同的类型，每种类型分别表示文档中不同的信息或标记。

节点有12种类型，常见的节点有三种:

1. 元素节点(Element);
2. 属性节点(Attribute);
3. 文本节点(Text)。

## <a name="href2">节点属性</a> ##

每一个节点都有以下属性:

1. `nodeType`: 表明节点的类型，其值是一个1~12的数值常量，例如，元素节点的 nodeType 属性值为1，属性节点的 nodeType 属性值为2等等;  

2. `nodeName`: 对于不同的节点，nodeName 返回的值可能不同，nodeName 常用于返回一个元素节点的标签名。

3. `nodeValue`: nodeValue 属性返回的是节点的值，同样根据不同的节点返回不同的值，文本节点会返回文本内容。

4. `parentNode`: 返回节点的父节点。

5. `childNodes`: 返回节点的子节点，返回的是一个类数组对象，可以根据索引号访问指定的节点。

6. `firstChild`: 返回第一个子节点，等同于 node.childNodes[0]。

7. `lastChild`: 返回最后一个子节点，等同于 node.childNodes[node.ChildNodes.length - 1]。

## <a name="href3">节点方法</a> ##

1. `node.appendChild(newNode)`: 在节点的子节点集合最后面插入新节点，newNode 节点为插入的新节点;

2. `node.insertBefore(newNode, beforeNode)`: 在节点的子节点集合的指定位置插入新节点，newNode 节点为插入的新节点，新节点会插入到 beforeNode 节点前;

3. `node.replaceChild(newNode, oldNode)`: 将节点的子节点中的 oldNode 节点替换为 newNode 节点;

4. `node.removeChild(removeNode)`: 将节点的子节点中的 removeNode 节点删除;

5. `node.cloneNode(ifAll)`: 复制一个节点，ifAll 参数(布尔值)为是否复制节点的所有子节点，如果为 true 则连同其子节点一起复制，为 false 则只复制节点本身。

## <a name="href4">节点的种类</a> ##

以下只概述常见的几种节点。

### <a name="href4-1">元素节点</a> ###

元素节点的 nodeType 属性值为1，nodeName属性值为元素的标签名，nodeValue属性值为 null。获取元素节点的属性名可以使用 nodeName 属性也可以使用 tagName 属性，两者返回的值相同。

获取元素节点有四种方式:

1. `document.getElementsByTagName(tagName)`: 根据标签名获取元素节点，返回的是一个类数组对象。

2. `document.getElementsByClassName(className)`: 根据 class 获取元素节点，返回的是一个类数组对象。

3. `document.getElementById(id)`: 根据 id 获取单个元素，HTML 页面中一个 id 只能使用一次。

4. `document.getElementsByName(name)`: 根据 name 属性值获取元素节点，返回的是一个类数组对象。

特殊的节点 body可以使用 document.body 属性获取。

### <a name="href4-2">属性节点</a> ###

属性节点的 nodeType 属性值为2，一些常用的属性例如 id、className、title 等可以直接通过元素节点访问。

```js
var a = document.getElementsByTagName("a")[0]; // 获取单个a元素
console.log(a.id, a.className); // id和className可以直接访问
```

对于其他的属性，可以使用`elem.getAttribute(attr)`方法获取指定属性的值，`elem.setAttribute(attr, value)`方法设置指定属性的值。

```js
 // 获取不可直接访问的属性值
console.log(
    a.getAttribute("href"),
    a.getAttribute("name"),
    a.getAttribute("datatype")
);
a.setAttribute("href", "./abc"); // 设置属性值
```

### <a name="href4-3">文本节点</a> ###

文本节点的 nodeType 属性值为3，nodeValue 属性值为文本内容。注意，HTML 页面中标签间的空格或缩进属于文本节点。

创建一个文本节点使用`document.createTextNode(text)`方法。

```js
var textNode2 = document.createTextNode("EEE"); // 创建文本节点
```

## <a name="href5">常见DOM操作</a> ##

### <a name="href5-4">获取/设置节点内容</a> ###

元素节点的 innerHTML 属性可以获取/设置节点内容，设置的内容可以是 HTML 标签。元素节点的 outerHTML 属性获取/设置的是包含调用节点在内的所有内容。元素节点的 innerText 属性可以获取/设置节点内部的所有文本(忽略标签)，设置的内容只能是文本。

```js
var p = document.getElementById("pid");

console.log(p.innerHTML); // 获取节点内部的所有内容
console.log(p.innerText); // 获取节点内部的所有文本

p.innerHTML = ""; // 清空节点内部所有内容
p.outerHTML = "<strong style='background-color:red;'>" + p.outerHTML + "</strong>"; // 将元素节点包裹在一对 <strong> 标签内
```

### <a name="href5-5">添加样式</a> ###

给元素节点添加样式使用的是元素节点的 style 属性，只需要给 style 属性再添加一些样式属性即可，需要注意的是，像 font-size 等用-号连接两个单词的样式属性，应将-号去掉并把第二个单词首字母转为大写。

```js
var textElem = document.getElementById("parah");

textElem.style.color = "green"; // 设置字体颜色
textElem.style.fontSize = "30px"; // 设置字体大小

// 包装一个一次性添加多条样式的函数
function addStyle(elem, obj) {
    for(var key in obj) {
        elem.style[key] = obj[key];
    }
}

addStyle(textElem, {
    fontWeight: "bold",
    border: "5px solid green"
});
```

---

```
ID         : 92
DATE       : 2018/08/06
AUTHER     : WJT20
TAG        : JavaScript
```
