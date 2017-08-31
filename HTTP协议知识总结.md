
# HTTP协议知识总结 #

## 目录 ##

1. 参考链接
2. HTTP概述
3. URL
4. 请求报文(请求消息)
5. 响应报文(响应信息)
6. 请求方法
7. 状态码

---

## 参考链接 ##

- [HTTP协议详解（真的很经典）](http://www.cnblogs.com/li0803/archive/2008/11/03/1324746.html)
- [HTTP 协议入门](http://www.ruanyifeng.com/blog/2016/08/http.html)
- [HTTP 最强资料大全](http://www.tuicool.com/articles/yam2A3m)

---

## HTTP概述 ##

HTTP(Hyper Text Transfer Protocol，超文本传输协议) 是基于 TCP/IP 协议的应用层协议，主要规定了客户端和服务器之间的通信格式，默认使用80端口。HTTP 协议在1990年首次提出，HTTP 有多个版本：1991年发布的 HTTP/0.9、1996年发布的 HTTP/1.0、1997年发布的 HTTP/1.1 及2015年发布的 HTTP/2。

HTTP 协议工作于客户端-服务端架构上，浏览器作为 HTTP 客户端通过 URL 向 HTTP 服务器发送所有请求，Web 服务器根据接收到的请求向客户发送响应信息。

HTTP 协议的主要特点有：

1. 简单快速：客户向服务器请求服务时，只需传送请求方法和路径。请求方法常用的有GET、HEAD、POST。每种方法规定了客户与服务器联系的类型不同。由于HTTP协议简单，使得HTTP服务器的程序规模小，因而通信速度很快；

2. 灵活：HTTP允许传输任意类型的数据对象。正在传输的类型由Content-Type加以标记；

3. 无连接：无连接的含义是限制每次连接只处理一个请求。服务器处理完客户的请求，并收到客户的应答后，即断开连接。采用这种方式可以节省传输时间；

4. 无状态：HTTP协议是无状态协议。无状态是指协议对于事务处理没有记忆能力。缺少状态意味着如果后续处理需要前面的信息，则它必须重传，这样可能导致每次连接传送的数据量增大。另一方面，在服务器不需要先前信息时它的应答就较快。

---

## URL ##

HTTP 使用 URI(Uniform Resource Identifiers, 统一资源标识符) 来传输数据和建立连接。URL(Uniform Resource Locator，统一资源定位符) 是一种特殊类型的 URI，包含了用于查找某个资源的足够信息。

一个完整的 URL 包含以下几个部分：

1. 协议：例如"http"、"https"等；

2. 域名：例如"www.xxx.com"；

3. 端口：端口跟在域名之后，使用":"和域名分隔，端口并非必需；

4. 目录：域名之后第一个"/"开始到最后一个"/"为止都是目录部分，目录可以是虚拟的目录结构，也可以是真实的目录结构，目录并非必需；

5. 文件名：最后一个"/"到"?"(如果有的话)之间的部分成为文件名，文件名并非必需；

6. 锚："#"后的部分称为锚，锚并非必需；

7. 查询字符串："?"到"#"(如果有的话)之间的部分称为查询字符串，它是一对对的键值对组合，每对查询字符串间用"&"分隔，查询字符串并非必需。

---

## 请求报文(请求消息) ##

HTTP 请求报文由请求行、请求头和请求体组成。

请求行由请求方法、URL 和 HTTP 协议版本组成，它们之间用空格分开。

请求头是多个键值对的集合，每行一对，键和值用":"分隔。请求头中常用键值代表的意思：

1. Host：请求的主机名；
2. User-Agent：用户代理信息；
3. Accept：客户端可识别的内容类型列表；
4. Accept-Language：客户端可接受的自然语言；
5. Accept-Encoding：客户端可接受的编码压缩格式；
6. Referer：记录来源页面；
7. Cookie：存储的 cookie 数据；
8. connection：连接方式；
9. Content-Type：请求资源类型(MIME)；
10. Content-Length：请求资源大小。

请求体在 POST 请求中使用，而不在 GET 请求中使用，通常与之相关的请求头是 Content-Type 和 Content-Length。

一个 GET 请求的请求报文实例：

```
GET /img/trace_2014.gif?r=0.42717885028720104&d=e.firefoxchina.cn HTTP/1.1
Host: e.firefoxchina.cn
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64; rv:54.0) Gecko/20100101 Firefox/54.0
Accept: */*
Accept-Language: zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3
Accept-Encoding: gzip, deflate
Referer: http://e.firefoxchina.cn/?cachebust=20160321
Cookie: Hm_lvt_dd4738b5fb302cb062ef19107df5d2e4=1499693701,1499693843,1499694831,1499694996; uid=38oGFVcjUHIQ4Vl1BKSZAg==; Hm_lpvt_dd4738b5fb302cb062ef19107df5d2e4=1499707465
Connection: keep-alive
```

一个 POST 请求的请求报文实例：

```
POST /_/csp-reports HTTP/1.1
Host: e.firefoxchina.cn
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64; rv:54.0) Gecko/20100101 Firefox/54.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3
Accept-Encoding: gzip, deflate
Content-Length: 1249
Content-Type: application/csp-report
Connection: keep-alive

{"csp-report":{"blocked-uri":"http://alimama.alicdn.com","document-uri":"http://e.firefoxchina.cn/?cachebust=20160321"}}
```

---

## 响应报文(响应信息) ##

HTTP 响应报文由状态行、响应头和响应体组成。

状态行由 HTTP 版本、状态码和状态码描述组成，它们之间用空格分隔。

响应头是多个键值对的集合，每行一对，键和值用":"分隔。响应头中常用键值代表的意思：

1. Server：包含处理请求的原始服务器的软件信息；
2. Date：服务器日期；
3. Content-Type：请求资源类型(MIME)；
4. Content-Length：请求资源大小；
5. Connection：连接方式；
6. Etag：用于标识资源状态的字码；
7. Last-Modified：请求资源最后修改时间；
8. Expires：过期时间；
9. Age：请求资源从产生到现在经过多长时间；
10. Cache-Control：缓存机制；
11. Set-Cookie：设置 Cookie 信息。

响应体即服务器返回给浏览器的响应信息。

一个 GET 请求的响应报文实例：

```
HTTP/1.1 200 OK
Expires: Tue, 06 Jul 2027 08:56:31 GMT
Date: Sat, 08 Jul 2017 08:56:31 GMT
Server: nginx
Content-Type: image/gif
Last-Modified: Wed, 05 Jul 2017 02:51:59 GMT
Transfer-Encoding: chunked
Cache-Control: max-age=315360000
Content-Encoding: gzip
Age: 1
X-Via: 1.1 huzhou84:10 (Cdn Cache Server V2.0), 1.1 PSgdzjdx3ca253:0 (Cdn Cache Server V2.0)
Connection: keep-alive

响应内容为一张图片
```

一个 POST 请求的响应报文实例：

```
HTTP/1.1 200 OK
Date: Mon, 10 Jul 2017 17:48:13 GMT
Server: nginx
Content-Type: application/json
Content-Length: 16
Set-Cookie: uid=38oGHFljvd2SWi5Gv8gDAg==; expires=Thu, 31-Dec-37 23:55:55 GMT; domain=e.firefoxchina.cn; path=/
X-Via: 1.1 PSgdzjdx3ca253:3 (Cdn Cache Server V2.0)
Connection: keep-alive

{"result":"ok"}
```

---

## 请求方法 ##

HTTP 常用的请求方法有：

1. GET：请求指定的页面信息，并返回实体主体；

2. POST：向指定资源提交数据进行处理请求(例如提交表单或上传文件)；

3. PUT：从客户端向服务器传送的数据取代指定的文档的内容；

4. DELETE：请求服务器删除指定页面；

5. HEAD：类似于 GET，只不过返回的响应中没有具体的内容，只是用于获取报头；

---

## 状态码 ##

状态码由三位数字组成，第一个数字定义响应的类别，且有五种可能取值：

1. 1xx：指示信息，表示请求已接收，继续处理；

2. 2xx：成功，表示请求已被成功接收；

3. 3xx：重定向，要完成请求必须进行更进一步操作；

4. 4xx：客户端错误，请求有语法错误或请求无法实现；

5. 5xx：服务器错误，服务器未能实现合法请求；

其中更为常见的状态码有以下这些：

1. 200 OK：客户端请求成功；

2. 204 No Content：没有新文档，浏览器应该继续显示原来的文档；

3. 206 Partial Content：客户发送了一个带有 Range 头的 GET 请求，服务器完成了它；

4. 301 Moved Permanently：所请求的页面已经转移到新的 URL；

5. 302 Found：所请求的页面已经临时转移到新的 URL；

6. 304 Not Modified：客户端有缓冲的文档并发出了一个条件性的请求，服务器告诉客户，原来缓冲的文档还可以继续使用；

7. 400 Bad Request：客户端请求有语法错误，不能被服务器所理解；

8. 401 Unauthorized：请求未经授权，这个状态码必须和 WWW-Authenticate 报头域一起使用；

9. 403 Forbidden：对被请求页面的访问被禁止；

10. 404 Not Found：请求资源不存在；

11. 500 Internal Server Error：服务器发生不可预期的错误；

12. 503 Server Unavailable：请求未完成，服务器临时过载或当机，一段时间后可能恢复正常。

---

```
ARTICLE_ID : 18
POST_DATE : 2017/08/19
RECENTLY_MODIFY : 2017/08/31
TIME_COUNTER : 1
AUTHER : WJT20
```
