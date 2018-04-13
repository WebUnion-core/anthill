
# JavaScript黑科技 #

## 目录 ##

1. document.implementation
2. document.readyState
3. DOMElement.getBoundingClientRect

---

## document.implementation ##

document.implementation 返回一个和当前文档相关联的 DOMImplementation 接口(对象)，DOMImplementation 可以提供了不依赖于任何 document 的方法。

DOMImplementation 没有继承任何的属性，它包含有四个方法:

1. createDocument(): 创建一个新 Document 对象和指定的根元素；
2. createDocumentType(): 创建空的 DocumentType 节点；
3. createHTMLDocument(): 创建一个 HTML Document 对象；
4. hasFeature(): 检查 DOMImplementation 是否可执行指定的特性和版本，返回一个布尔值。

示例:

```
var imp = document.implementation;
console.log(imp.hasFeature("HTML","1.0")); // 检查这个文件是否有HTML DOM 1.0功能
```

## document.readyState ##

document.readyState 属性描述了文档的加载状态，其返回值为一个表征状态的字符串，取值有以下几种:

1. loading: 文档加载中；
2. interactive: 文档已经完成加载，文档已被解析，但是诸如图像，样式表和框架之类的子资源仍在加载；
3. complete: 文档和所有子资源已完成加载，此状态表示 load 事件即将被触发。

每次状态的切换，便会触发一次 readystatechange 事件。

示例:

```
// 一个简单的文档状态检查的定时器
setInterval(function() {
    console.log(document.readyState);
}, 10);
```

## DOMElement.getBoundingClientRect ##

DOM 节点的 getBoundingClientRect 方法返回一个矩形对象，包含四个属性: left、top、right 和 bottom。分别表示元素相对页面的各项数据。

示例:

```
var divElem = document.getElementById('div');
var coords = divElem.getBoundingClientRect();
console.log(coords);
```

---

```
ARTICLE_ID : 33
POST_DATE : 2017/09/22
AUTHER : WJT20
```
