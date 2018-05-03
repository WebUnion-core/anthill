
# JavaScript黑科技 #

## 目录 ##

1. document.implementation
2. document.readyState
3. DOMElement.getBoundingClientRect
4. Object.defineProperty

---

## document.implementation ##

document.implementation 返回一个和当前文档相关联的 DOMImplementation 接口(对象)，DOMImplementation 可以提供了不依赖于任何 document 的方法。

DOMImplementation 没有继承任何的属性，它包含有四个方法:

1. createDocument(): 创建一个新 Document 对象和指定的根元素；
2. createDocumentType(): 创建空的 DocumentType 节点；
3. createHTMLDocument(): 创建一个 HTML Document 对象；
4. hasFeature(): 检查 DOMImplementation 是否可执行指定的特性和版本，返回一个布尔值。

示例:

```js
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

```js
// 一个简单的文档状态检查的定时器
setInterval(function() {
    console.log(document.readyState);
}, 10);
```

## DOMElement.getBoundingClientRect ##

DOM 节点的 getBoundingClientRect 方法返回一个矩形对象，包含四个属性: left、top、right 和 bottom。分别表示元素相对页面的各项数据。

示例:

```js
var divElem = document.getElementById('div');
var coords = divElem.getBoundingClientRect();
console.log(coords);
```

## Object.defineProperty ##

针对属性，我们可以给这个属性设置一些特性，比如是否只读不可以写；是否可以被`for..in`或`Object.keys()`遍历。给对象的属性添加特性描述，目前提供两种形式：数据描述和存取器描述。

语法:

```js
Object.defineProperty(obj, prop, descriptor)
```

参数说明:
1. obj: 必需，目标对象；
2. prop: 必需，需定义或修改的属性的名字；
3. descriptor: 必需，目标属性所拥有的特性。

### 数据描述 ###

1. value: Any 类型，修改属性对应的值，示例如下：

    ```js
    var data = { age: 10 };
    Object.defineProperty(data, 'age', {
        value: 100,
    });
    console.log(data.age); // => 100
    ```

2. writable: Boolean 类型，修改属性的可写性，示例如下：

    ```js
    var data = { age: 10 };
    Object.defineProperty(data, 'age', {
        writable: false,
    });
    data.age = 100;
    console.log(data.age); // => 10
    ```

3. enumerable: Boolean 类型，修改属性的可枚举性，示例如下：

    ```js
    var data = { age: 10, name: 'WJT20' };
    Object.defineProperty(data, 'age', {
        enumerable: false,
    });
    for (let key in data) {
        console.log(data[key]);
    }
    // => "WJT20"
    ```

4. configurable: Boolean 类型，决定属性的前三项配置是否可以重新配置或被 delete 删除，示例如下：

    ```js
    var data = { age: 10 };
    Object.defineProperty(data, 'age', {
        configurable: false,
    });
    delete data.age;
    console.log(data.age); // => 10
    ```

### 存取器描述 ###

1. getter: 获得属性值的方法，获取属性值的时候触发 get 属性定义的方法，返回的值作为属性的新值，示例如下：

    ```js
    var data = { age: 10 };
    Object.defineProperty(data, 'age', {
        get: function () {
            return 100;
        },
    });
    console.log(data.age); // => 100
    ```

2. setter: 设置属性值的方法，设置属性值的时候触发 set 属性定义的方法，示例如下：

    ```js
    var data = { age: 10 };
    Object.defineProperty(data, 'age', {
        set: function (value) {
            data = value;
        },
    });
    data.age = 100;
    console.log(data); // => 100
    ```

注意：当使用了 getter 或 setter 方法，不允许使用 writable 和 value 这两个属性。

---

```
ARTICLE_ID : 33
POST_DATE : 2017/09/22
AUTHER : WJT20
```
