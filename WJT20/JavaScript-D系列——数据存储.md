
# JavaScript-D系列——数据存储 #

## 目录 ##

1. [Cookie](#href1)
    1. [添加](#href1-1)
    2. [获取](#href1-2)
    3. [删除](#href1-3)
    4. [清除](#href1-4)
2. [Web Storage](#href2)
    1. [sessionStorage](#href2-5)
    2. [localStorage](#href2-6)

## <a name="href1">Cookie</a> ##

Cookie 指存储在用户本地终端上的数据，绑定在特定的域名下，不能获取不同域上的 cookie 数据，不同浏览器对 cookie 数量和大小的限制不同，为了最佳的浏览器兼容性，cookie 数量尽量不要大于20个，每个 cookie 大小应不超过 4095B。

一个 cookie 应包括以下内容:

1. 键: cookie 的名称，存储时一般要经过 URL 编码(使用`encodeURI()`方法);
2. 值: cookie 的取值，同样必须经过 URL 编码;
3. 域(domain): 指明 cookie 对于哪个域是有效的;
4. 路径(path): 指明域中哪个路径才可以使用这个 cookie;
5. 失效时间(expires): 表示 cookie 何时应该被删除，默认情况下，浏览器会话结束后就将所有 cookie 删除; 不过也可以自己设置删除时间，如果设置的过期时间是过去的日期，则 cookie 会立即删除。

cookie 没有一套完整的操作 API，所以只能根据仅有的 document.cookie 属性来自己定义一些功能函数，cookie 的基本操作应包括添加、查询、删除某个 cookie，此外，还可以根据这些基本操作实现一个清除所有 cookie 的功能。

包装一个添加 cookie 操作对象 CookieUtil，其结构如下:

```js
var CookieUtil = {
    set: ..., // 添加
    get: ..., // 获取
    unset: ..., // 删除
    clear: ... // 清空
}
```

### <a name="href1-1">添加</a> ###

```js
var CookieUtil = {
    set: function(key, val, day, domain, path) {
        var exp = new Date();
        exp.setDate(exp.getDate() + day);
        document.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(val)
        + ";expires=" + exp.toGMTString()
        + ";domain=" + (domain ? domain : location.hostname)
        + ";path=" + (path ? path : location.pathname);
    }
}
CookieUtil.set("名字", "某某某", 10); // 10天后删除
```

参数说明:

key 参数为键名; val 参数为值; day 参数表示几天后删除 cookie; domain 参数(可选)指定域名，默认为当前页面的域名(不含端口); path 参数(可选)指定当前域的路径，默认为当前页面的目录及文件名部分。

这里需要注意两点:

1. 调用方法时自动创建一个时间对象，通过`getDate()`获取当前日期然后加上 day 参数，最后通过时间对象的`setDate()`设置过期日期，cookie 过期时间必须是 GMT 格式，只要引用时间对象的`toGMTString()`方法即可将日期对象转为 GMT 格式时间;

2. 键值通常需要经过转码，转码使用的是`encodeURIComponent(str)`全局方法。

### <a name="href1-2">获取</a> ###

```js
var CookieUtil = {
    set: ...,

    get: function(key) {
        var name = encodeURIComponent(key) + "=",
            start = document.cookie.indexOf(name);
        if (start > -1) {
            var end = document.cookie.indexOf(";", start);
            if (end === -1) {
                end = document.cookie.length;
            }
            return decodeURIComponent(document.cookie.substring(start + name.length, end));
        } else {
            return null;
        }
    }
}
CookieUtil.set("名字", "某某某", 10); // 10天后删除
console.log(CookieUtil.get("名字")); // 输出: "某某某"
```

### <a name="href1-3">删除</a> ###

没有什么直接的方法可以删除一个 cookie，唯一的做法就是将要删除的 cookie 的过期时间设为过去日期，从而达到删除一个 cookie 的目的。

```js
var CookieUtil = {
    set: ...,

    get: ...,

    unset: function(key, domain, path) {
        this.set(key, "", -1, domain, path);
    }
}
CookieUtil.set("名字", "某某某", 10); // 10天后删除
CookieUtil.unset("名字");
```

### <a name="href1-4">清除</a> ###

```js
var CookieUtil = {
    set: ...,

    get: ...,

    unset: ...,

    clear: function(domain, path) {
        var pattern = /;{0,1}[\w,\%]+\=/g;
        var arr = document.cookie.match(pattern); // 获取所有键名(带等于号)
        for(var i = 0; i < arr.length; i++) {
            this.unset(decodeURIComponent(arr[i].slice(0, arr[i].length - 1)), domain, path);
        }
    }
}
CookieUtil.set("a_name", "AAA", 10);
CookieUtil.set("b_name", "BBB", 10);
CookieUtil.set("c_name", "CCC", 10);
CookieUtil.clear();
```

由此，所有 cookie 操作就包装好了。

## <a name="href2">Web Storage</a> ##

Web Storage 提供一种在 cookie 之外存储会话数据的途径，提供了一种存储大量可以跨会话存在的数据的机制。也就是说，相比 Cookie，Web Storage 可以存储更多的数据。最常用的 Web Storage 有两种: sessionStorage 和 localStorage。

### <a name="href2-5">sessionStorage</a> ###

sessionStorage 对象存储特定于某个会话的数据，该数据只保持到浏览器关闭，存储在 sessionStorage 中的数据只能由最初给对象存储数据的页面访问。

sessionStorage 包装了一套较完整的 API，我们可以直接使用这些 API 进行添加、获取、删除、清除等操作。

1. 添加数据:

    添加数据有两种方式: `setItem(key, value)`方法和使用属性添加。

    ```js
    sessionStorage.setItem("a_name", "AAA"); // 方法存储
    sessionStorage["b_name"] = "BBB"; // 属性存储
    ```

2. 获取数据:

    获取数据同样有两种方式: `getItem(key)`方法和访问属性获取。

    ```js
    var aName = sessionStorage.getItem("a_name"), // 方法获取
        bName = sessionStorage["b_name"]; // 属性获取
    console.log(aName, bName);
    ```

3. 删除数据:

    删除数据也有两种方式: `removeItem(key)`方法和使用 delete 关键字删除。

    ```js
    sessionStorage.removeItem("a_name"); // 方法删除
    delete sessionStorage["b_name"]; // 属性获取
    ```

4. 清空所有数据:

    清空所有数据使用`clear()`方法:

    ```js
    sessionStorage.clear();
    ```

### <a name="href2-6">localStorage</a> ###

localStorage 可以持久保存客户端的数据，这些数据会保留到通过 JavaScript 删除或是用户清除浏览器缓存。localStorage 的操作 API 和 sessionStorage 的完全相同，这里不再多说。

---

```
ID         : 94
DATE       : 2018/08/07
AUTHER     : WJT20
TAG        : JavaScript
```
