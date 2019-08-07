
# CORS跨域深度解析 #

## 目录 ##

1. 参考链接

## 参考链接 ##

- [CORS跨域原理解析](https://juejin.im/post/5cef28af51882550d41745ea)

## 跨域 ##

在介绍 CORS 之前，我先来讲讲"跨域"，而要理解"跨域"，又要先了解另一个名词——"同源策略"。同源策略是由大名鼎鼎的 Netscape 公司提出的一个著名的网络安全策略，它可以规避一些危险的页面信息安全交互行为，保证用户信息的安全，防止恶意的网站窃取数据。"同源"指的是三个相同:

1. 协议相同;
2. 域名相同;
3. 端口相同。

只要有一个内容不相同，我们就说这两个网站非同源，它们之间的数据交流就会受限，这里举几个例子:

```
当前网站URL: http://www.aaa.com
它与以下网站不同源:

https://www.aaa.com(协议不同)
http://www.aaa.com:8081(端口不同，默认是80端口)
http://www.bbb.com(域名不同)
```

非同源，会带来三种限制:

1. Cookie、LocalStorage、IndexDB 无法读取;
2. DOM 无法获取;
3. Ajax 请求无法正常发送。

## CORS与JSONP的对比 ##

CORS 与 JSONP 都是解决跨域问题的方案，不同的是，JSONP 只能发送 GET 请求，而 CORS 则能发送任何类型的请求，关于 JSONP 原理的详细讲解，可以参考我写的[JSONP跨域分析](https://github.com/WebUnion-core/anthill/blob/master/WJT20/JSONP%E8%B7%A8%E5%9F%9F%E5%88%86%E6%9E%90.md)一文，这里就不赘述了。

接下来讲讲 CORS 的原理。CORS 的整个通信过程都是由浏览器自动进行的，无需用户参与。浏览器一旦发现跨域的 Ajax 请求，就会添加一些特殊的头信息，有时甚至会发送一些额外的请求，但这些内容都是用户感觉不到的，因此，实现 CORS 的关键是服务器，只要服务器实现了 CORS 接口，就可以跨域通信了，这一点又与 JSONP 不同，JSONP 是需要客户端和服务器联手配合的。

## 简单请求 ##

浏览器将 CORS 请求分为两种: 简单请求和非简单请求。满足以下条件的请求就被称为简单请求:

1. 请求方法是 HEAD、GET、POST 三种之一;
2. HTTP 头信息不超过这几种: `Accept`、`Accept-Language`、`Content-Language`、`Last-Event-ID`、`Content-Type`，其中`Content-Type`只能是`application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`三者中的一种。

浏览器直接发送简单请求，不附加其他请求，并在头信息中添加一个`Origin`字段，这个字段用于说明本次请求来自哪个源，服务器根据这个字段决定是否同意这个请求。

如果服务器发现`Origin`指定的源不在合法范围内，那么它会发送一个正常的 HTTP 响应给客户端，只不过响应头上不附带一个名为`Access-Control-Allow-Origin`的重要字段，浏览器发现没有这个字段，就知道请求一定是出错了，遂抛出一个请求错误，一般这个错误都会被 XMLHttpRequest 的 onerror 回调函数捕获。

如果服务器发现`Origin`指定的源在合法范围内，它会在响应头上附加以下几个重要的字段:

1. `Access-Control-Allow-Origin`: 通过跨域的最关键字段，它的值要么是请求时`Origin`字段的值，要么是一个`*`，表示接受任意域名的请求，某些情况下只能设置为具体的域名，后面会详细说明;
2. `Access-Control-Allow-Credentials`: 可选，取值为布尔值，表示是否允许发送 Cookie。CORS 默认不发送 Cookie，即默认不会有这个字段，如果需要发送 Cookie，只要将此字段设为 true 即可;
3. `Access-Control-Expose-Headers`: 可选，CORS 请求允许 XMLHttpRequest 拿到的响应头信息只有`Cache-Control`、`Content-Language`、`Content-Type`、`Expires`、`Last-Modified`和`Pragma`这6个字段，如果想要拿到其他的字段，则需要在`Access-Control-Expose-Headers`中指定。

这里要特别说明 CORS 携带 Cookie 的情况，前面讲到要将`Access-Control-Allow-Credentials`设置为 true，但这样还不够，我们还需要将 XMLHttpRequest 对象的 withCredentials 属性设置为 true:

```js
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
```

## 非简单请求 ##



---

```
ID         : 133
DATE       : 2019/08/06
AUTHER     : WJT20
TAG        : Web相关
```
