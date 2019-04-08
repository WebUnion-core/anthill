
# Web数据存储知识点总结 #

## 目录 ##

1. [参考链接](#href1)
2. [cookie](#href2)
3. [sessionStorage](#href3)
4. [sessionStorage、localStorage和cookie的异同](#href4)
5. [JSON](#href5)
	1. [取值](#href5-1)
	2. [简单的JSON形式](#href5-2)
	3. [JSON数组](#href5-3)
	4. [JavaScript JSON API](#href5-4)
6. [XML](#href6)
	1. [简单的XML形式](#href6-5)
	2. [XML数组](#href6-6)
7. [XML与JSON的对比](#href7)

## <a name="href1">参考链接</a> ##

- [cookie、sessionStorage、localStorage之间的区别和使用](http://www.cnblogs.com/caiyezi/p/5619506.html)

- [你懂JSON么？](https://segmentfault.com/a/1190000008201431)

- [XML与JSON的对比](http://www.cnblogs.com/yank/p/4028266.html)

## <a name="href2">cookie</a> ##

cookie 指存储在用户本地终端上的数据，安全性较低，通常需要经过加密，典型的应用场景就是判断注册用户是否已经登过该网站。

自封装 cookie api:

```js
// cookie api
var Cookie = {
	// 设置
	setCookie: function(key, value, dayToLive) {
		var exp = new Date();
		exp.setDate(exp.getDate() + dayToLive);
		document.cookie = key + '=' + encodeURIComponent(value) + ((dayToLive === null) ? '' : '; expires=' +exp.toGMTString());
	},

	// 获取
	getCookie: function(key) {
		var arr = decodeURIComponent(document.cookie).split('; ');
		var eachCookie = null;

		for (var i = 0; i < arr.length; i++) {
			eachCookie = arr[i].split('=');
			if (eachCookie[0] === key && eachCookie[1] != '') {
				return eachCookie[1];
			}
		}
	},

	// 删除
	deleteCookie: function(key) {
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		this.setCookie(key, '', exp);
	},

	// 清空
	clearCookie: function() {
		var arr = (decodeURIComponent(document.cookie)).split('; ');
		var eachCookie = '';
		var exp = new Date();

		exp.setTime(exp.getTime() - 1);

		for (var i = 0; i < arr.length; i++) {
			eachCookie = arr[i].split('=');
			this.setCookie(eachCookie[0], '', exp);
		}
	}
};
```

## <a name="href3">localStorage</a> ##

localStorage 是没有时间限制的数据存储方式。实例代码如下:

```js
var dataObj = {
    name: 'WJT20',
    id: 'ob3125cs'
};
localStorage.data = dataObj; // 写
console.log(localStorage.data); // 读
```

## <a name="href4">sessionStorage</a> ##

sessionStorage 针对的是一个 session 数据的存储，当用户关闭浏览器窗口后，数据就会被删除。

```js
var dataObj = {
    name: 'WJT20',
    id: 'ob3125cs'
};
sessionStorage.data = dataObj; // 写
console.log(sessionStorage.data); // 读
```

## <a name="href5">sessionStorage、localStorage和cookie的异同</a> ##

共同点: 都是保存在浏览器端且同源。  

区别: cookie 数据可以在浏览器和服务器之间来回传递，cookie 有 path 的概念，可以限制 cookie 只属于某个路径下，cookie 数据大小限制最大不能超过4k，所以 cookie 只适合保存很小的数据。  

sessionStorage 和 localStorage 不会自动把数据发送给服务器，仅在本地保存，两者可存储的数据量比 cookie 要大得多，可以达到5M或更大。

## <a name="href6">JSON</a> ##

JSON(JavaScript Object Notation) 是一种轻量级的数据交换格式。易于人阅读和编写。同时也易于机器解析和生成。  

## <a name="href7">取值</a> ##

1. 数字(整型或浮点型)
2. 字符串(由双括号包含)
3. 逻辑值(true 或 false)
4. 数组(由方括号包含)
5. 对象(由花括号包含)
6. null

## <a name="href8">简单的JSON形式</a> ##

```json
{
	"userName": "WeiJietao",
	"userId": "0b9145cd"
}
```

## <a name="href9">JSON数组</a> ##

```json
{
	"members": [
		{ "userName": "PersonA", "userId": "4786de01" },
		{ "userName": "PersonB", "userId": "5134cs47" }
	]
}
```

## <a name="href10">JavaScript JSON API</a> ##

将 JavaScript 对象转换为 JSON 字符串使用`JSON.stringify(obj)`方法，obj 参数就是所要操作的对象; 将 JSON 字符串转换为 JavaScript 对象则使用`JSON.parse(json)`方法，json 参数就是所要操作的 JSON 字符串。

```js
var originDataObj = {
	userName: 'WeiJietao',
	userId: '0b9145cd'
};
var json = JSON.stringify(originDataObj);
var obj = JSON.parse(json);
console.log(json, obj);
```

## <a name="href11">XML</a> ##

XML(Extensible Markup Language，扩展标记语言) 可以用来标记数据、定义数据类型，是一种允许用户对自己的标记语言进行定义的源语言。XML 使用 DTD(document type definition) 文档类型定义来组织数据。  

XML 是标准通用标记语言(SGML)的子集，非常适合 Web 传输。XML 提供统一的方法来描述和交换独立于应用程序或供应商的结构化数据。

## <a name="href12">简单的XML形式</a> ##

```xml
<user userName="WeiJietao" userId="0b9145cd"></user>
```

## <a name="href13">XML数组</a> ##

```xml
<usersList>
	<user userName="PersonA" userId="4786de01"></user>
	<user userName="PersonB" userId="5134cs47"></user>
</userList>
```

## <a name="href14">XML与JSON的对比</a> ##

XML:

1. 应用广泛，可扩展性强，被广泛应用各种场合;
2. 读取、解析没有 JSON 快;
3. 可读性强，可描述复杂结构。

JSON:

1. 结构简单，都是键值对;
2. 读取、解析速度快，多语言支持;
3. 传输数据量小，传输速率大大提高;
4. 描述复杂结构能力较弱。

选择原则:

1. 对于复杂的数据结构使用 XML，简单的数据结构可采用 JSON;
2. 在互联网应用数据传输中，更提倡使用 JSON;
3. 针对前后端的差异，可以在服务端使用 XML，在前端使用 JSON，两者之间的转换在服务器端完成，这样可以各取所长。

---

```
ID         : 15
DATE       : 2017/08/19
AUTHER     : WJT20
TAG        : Web前端
```
