
# 我的npm工厂(三)——cookie #

## 目录 ##

1. [用法介绍](#href1)
2. [代码解析](#href2)
    1. [片段1](#href2-1)
    2. [片段2](#href2-2)

## <a name="href1">用法介绍</a> ##

cookie 模块用于编写 cookie 字符串，在客户端，设置 cookie 主要通过`document.cookie`这一套 api; 在服务端，主要通过设置`Set-Cookie`头来操作 cookie。无论设置 cookie 的方式如何，最终都是以一串字符串作为媒介，本次讲解的 cookie 模块通过识别传入的配置来转义为字符串，示例代码如下(服务端):

```js
const http = require('http');
const cookie = require('cookie');

// 服务器配置
function onRequest(req, res) {
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.setHeader('Set-Cookie', cookie.serialize('from', 'wjt20', {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7 // 保质期一周
    }));
    res.end('<h1 style="color:red">Hello, world! </h1>');
}

http.createServer(onRequest)
    .listen(2015, function() {
        console.log('Server start: http://127.0.0.1:2015');
    });
```

## <a name="href2">代码解析</a> ##

### <a name="href2-1">片段1</a> ###

```js
var decode = decodeURIComponent;
var encode = encodeURIComponent;
var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

function serialize(name, val, options) {
    var opt = options || {};
    var enc = opt.encode || encode;

    if (typeof enc !== 'function') {
        throw new TypeError('option encode is invalid');
    }

    if (!fieldContentRegExp.test(name)) {
        throw new TypeError('argument name is invalid');
    }

    var value = enc(val);

    if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError('argument val is invalid');
    }

    var str = name + '=' + value;

    if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge))
            throw new Error('maxAge should be a Number');
        str += '; Max-Age=' + Math.floor(maxAge);
    }

    if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
            throw new TypeError('option domain is invalid');
        }

        str += '; Domain=' + opt.domain;
    }

    if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
            throw new TypeError('option path is invalid');
        }

        str += '; Path=' + opt.path;
    }

    if (opt.expires) {
        if (typeof opt.expires.toUTCString !== 'function') {
            throw new TypeError('option expires is invalid');
        }

        str += '; Expires=' + opt.expires.toUTCString();
    }

    if (opt.httpOnly) {
        str += '; HttpOnly';
    }

    if (opt.secure) {
        str += '; Secure';
    }

    if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === 'string'
            ? opt.sameSite.toLowerCase()
            : opt.sameSite;

        switch (sameSite) {
            case true:
                str += '; SameSite=Strict';
                break;
            case 'lax':
                str += '; SameSite=Lax';
                break;
            case 'strict':
                str += '; SameSite=Strict';
                break;
            default:
                throw new TypeError('option sameSite is invalid');
        }
    }

    return str;
}
```

解析:

- serialize 函数接收 cookie 的配置参数，最后返回一串包含配置信息的字符串。opt 变量为配置对象，enc 变量为编码方式，默认为 encodeURIComponent，fieldContentRegExp 常量是一个用于检测 cookie 键的正则表达式;

- 首先进行三重检验，只要检验不通过，就抛出 TypeError 错误信息:

    1. 编码方式是否为 Function 类型;
    2. cookie 键名是否有效;
    3. cookie 键值是否有效。

- 接下来是设置传入的额外配置项(第三个参数)。第一个要配置的是 cookie 的 maxAge 属性，假如不传入 maxAge 属性，则默认值为 undefined，此时`null != undefined`返回的是 false，这一点需要特别注意，如果有传入 maxAge 属性，则通过`var maxAge = opt.maxAge - 0;`进行隐性类型转换，如果传入的 maxAge 是非法数值(即 NaN)，则抛出错误，否则就将 maxAge 的配置拼接到返回字符串上;

- domain, path, httpOnly 和 secure 这几个属性的检验比较简单，传入的 expires 属性必须是日期对象，最终拼接到返回字符串上的是 toUTCString 方法返回的值，格式类似`Thu, 19 Jul 2018 09:29:53 GMT`。更多可配的 cookie 属性内容，可阅: [cookie的属性](https://blog.csdn.net/helloliuhai/article/details/18351439)。

### <a name="href2-2">片段2</a> ###

```js
var pairSplitRegExp = /; */;

function parse(str, options) {
    if (typeof str !== 'string') {
        throw new TypeError('argument str must be a string');
    }

    var obj = {};
    var opt = options || {}; // 配置参数
    var pairs = str.split(pairSplitRegExp); // 切割的键值对数组
    var dec = opt.decode || decode; // 解码方式

    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        var eq_idx = pair.indexOf('=');

        // 如果切割的键值对字符串中不含"="
        if (eq_idx < 0) {
            continue;
        }

        var key = pair.substr(0, eq_idx).trim()
        var val = pair.substr(++eq_idx, pair.length).trim();

        if ('"' == val[0]) {
            val = val.slice(1, -1);
        }

        if (undefined == obj[key]) {
            obj[key] = tryDecode(val, dec);
        }
    }

    return obj;
}

function tryDecode(str, decode) {
    try {
        return decode(str);
    } catch (e) {
        return str;
    }
}
```

解析:

- parse 函数和 serialize 函数功能相反，它用于将一串 cookie 字符串拆解为包含各配置属性的对象。pairs 变量为以"; "作为分割符切割而成的键值对数组，如果数组中某个元素不包含"="，则跳过后续操作;

- 接着遍历整个键值对数组，每个键值对以"="为分割符切割字符串，前后子串分别表示键和值，分别用变量 key 和 val 保存，这里用 trim 方法(返回已移除前导空格、尾随空格和行终止符的原始字符串)对切割结果进行处理。

- obj 中的配置项只设置一次(原值为 undefined 时才设置，之后的同名属性不会处理)，tryDecode 是一个解码监控函数，如果解码过程出错，则返回原串。

---

```
ARTICLE_ID : 88
POST_DATE : 2018/07/19
AUTHER : WJT20
```
