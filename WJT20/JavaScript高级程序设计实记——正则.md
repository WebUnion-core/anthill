
# JavaScript高级程序设计实记——正则 #

## 目录 ##

1. [字符](#href1)
2. [RegExp类型](#href2)

## <a name="href1">字符</a> ##

1. 元字符  

    ![image](https://raw.githubusercontent.com/WebUnion-core/anthill/master/WJT20/images/w7.png)

2. 反义字符  

    ![image](https://raw.githubusercontent.com/WebUnion-core/anthill/master/WJT20/images/w8.png)

3. 转义字符  

    ![image](https://raw.githubusercontent.com/WebUnion-core/anthill/master/WJT20/images/w9.png)

4. 重复匹配  

    ![image](https://raw.githubusercontent.com/WebUnion-core/anthill/master/WJT20/images/w10.png)

5. 分组/捕获  

    ![image](https://raw.githubusercontent.com/WebUnion-core/anthill/master/WJT20/images/w11.png)

6. 贪婪与惰性  

    ![image](https://raw.githubusercontent.com/WebUnion-core/anthill/master/WJT20/images/w12.png)

7. 修饰符  

    ![image](https://raw.githubusercontent.com/WebUnion-core/anthill/master/WJT20/images/w13.png)

## <a name="href2">RegExp</a> ##

定义正则表达式有两种方式:

1. 字面量形式: `var pattern = /.\w/gi;`;
2. RegExp 构造函数形式: `var pattern = new RegExp('.\\w', 'gi');`。

正则对象(使用 RegExp 构造函数创建)方法有:

1. pattern.test(string): 对传入的 string 字符串进行模式匹配，返回一个布尔值，表示字符串是否匹配该正则。
2. pattern.exec(string): 返回一个匹配项数组。

字符串对象的`match()`、`search()`、`split()`及`replace()`等方法也与正则表达式相关。

## <a name="href3">常用正则表达式</a> ##

1. 检验`YYYY-MM-DD HH-mm`格式的时间戳:

```js
var regExp = /^\d{4}-\d{1,2}-\d{1,2}\s\d{2}:\d{2}$/;
console.log(regExp.test('2018-04-23 23:00')); // 输出: true
```

2. 检查 HTML 标签和匹配`#id`形式的字符串:

```js
var regExp = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
console.log(regExp.exec('<h1></h1>')); // 输出: ["<h1></h1>", "<h1></h1>", undefined]
console.log(regExp.exec('#head')); // 输出: ["#head", undefined, "head"]
```

3. 匹配最外层 HTML 标签名:

```js
var regExp = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
console.log(regExp.exec('<h1><span></span></h1>')[1]); // 输出: "h1"
```

4. 匹配校验手机号:

```js
var regExp = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
console.log(regExp.test('13415156317')); // 输出: true
```

5. 匹配电子邮箱:

```js
var regExp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
console.log(regExp.test('13415156317@163.com')); // 输出: true
```

---

```
ID         : 17
DATE       : 2017/08/19
AUTHER     : WJT20
TAG        : JavaScript
```
