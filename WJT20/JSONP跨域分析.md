
# JSONP跨域分析 #

## 目录 ##

1. [参考链接](#href1)
2. [同源策略](#href2)
3. [JSONP介绍](#href3)
 [](#href4)   1. 意义
 [](#href5)   2. 原理
4. [体验从淘宝获取数据](#href6)
 [](#href7)   1. 原生JS实现
 [](#href8)   2. jQuery实现
5. [整体实现](#href9)
 [](#href10)   1. 远程跨域服务器接口
 [](#href11)   2. 前台内容

## <a name="href1">参考链接</a> ##

- [jsonp 实现原理及代码解析](https://segmentfault.com/a/1190000008127050)

- [Jsonp及其实现原理](https://segmentfault.com/a/1190000008479489)

- [浅谈JSONP](https://segmentfault.com/a/1190000003746509)

- [JSONP是什么](https://segmentfault.com/a/1190000007935557)

- [jsonp的原理与实现](https://segmentfault.com/a/1190000007665361)

- [jsonp跨域](https://segmentfault.com/a/1190000006146207)

- [JSONP原理及实现跨域方式](https://segmentfault.com/a/1190000002799156)

## <a name="href2">同源策略</a> ##

同源策略是由 Netscape 提出的一个著名的安全策略，同源策略可以有效地解决一些危险行为，限制页面间的通信。

## <a name="href3">JSONP介绍</a> ##

### <a name="href3-1">意义</a> ###

JSONP(JSON with Padding) 的出现主要是为了解决 Ajax 的跨域问题，所谓“跨域”就是当前网页的地址和我们要取的数据地址不在一个域下。

### <a name="href3-2">原理</a> ###

JSONP 利用 script 标签不受同源策略约束的特点，通过把请求写入到 script 标签的 src 中将前端方法作为参数传递到服务器端，然后由服务器注入参数之后再返回，实现服务器端向客户端通信。

## <a name="href4">体验从淘宝获取数据</a> ##

许多大型网站都有使用 JSONP 技术，本章节以使用 JSONP 获取淘宝数据为例。  

打开淘宝网站，等页面完全加载完成后，打开浏览器开发者工具(按键F12)，我们可以查看到淘宝页面的请求列表中有这么一个请求:

![image](https://raw.githubusercontent.com/WebUnion-core/public-cdn/master/wjt20-base/w14.png)

这个请求就用到了 JSONP，我们来分析这个请求 URL: `https://textlink.simba.taobao.com/lk?_ksTS=1494252482350_32&callback=jsonp33&pid=421005_1007&refpid=mm_14507511_3485205_11375261`

URL 中"?"后面跟的是传递参数键值对组合，每个参数项配置用"&"分隔，其中有一个"callback=jsonp33"的参数项，淘宝主页前台发送 GET 请求到后台，后台识别出 callback 键对应的名为 jsonp33 前端函数，接着对该方法进行参数包装并返回，最终 GET 请求接收成功后将会在前端自动调用 jsonp33 函数。分析至此，我们了解了前台一定包装有一个 jsonp33 函数，我们可以在自己创建的页面自定义一个 jsonp33 函数从而获取并显示数据。

### <a name="href4-3">原生JS实现</a> ###

JSONP 有两种比较方便的实现手段: 使用原生 JavaScript 实现和使用 jQuery 实现。使用原生JS的实现方式的关键是 DOM 手动创建 script 标签，将 src 属性设置为请求 URL。

最终创建的页面内容是这样的:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
</head>
<body>
    <p id="data"></p>
    <script src="jquery-1.12.3.min.js"></script>
    <script>
    function jsonp33(data) {
        var json = JSON.stringify(data);
        $('#data').text(json);
    }

    var script = document.createElement('script');

    // 设置动态创建的script标签的src属性为指定URL，相当于发起了一次GET请求
    script.setAttribute('src', 'https://textlink.simba.taobao.com/lk?_ksTS=1494252482350_32&callback=jsonp33&pid=421005_1007&refpid=mm_14507511_3485205_11375261');
    document.body.appendChild(script);
    </script>
</body>
</html>
```

网络畅通的情况下在浏览器中访问这个页面，我们可以看到这么一大串吓人的数据:

![image](https://raw.githubusercontent.com/WebUnion-core/public-cdn/master/wjt20-base/w15.png)

这么多数据看着真难受，我们修改下自定义的 jsonp33 函数，对接收到的数据进行过滤处理，筛选出“商品类别”数据:

```js
function jsonp33(data) {
    var arr = [];
    for (var i = 0, d = data['data']; i < d.length; i++) {
        arr.push(d[i][0]);
    }
    $('#data').text(arr.join('、'));
}
```

最终看到显示出的数据是这样的:

![image](https://raw.githubusercontent.com/WebUnion-core/public-cdn/master/wjt20-base/w16.png)

### <a name="href4-4">jQuery实现</a> ###

jQuery 把 JSONP 包装在 $.ajax() 中，然而它与 Ajax 间并没有直接关系，使用 jQuery 实现 JSONP 也很简单，其实现原理也是一样的。

页面内容如下:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
</head>
<body>
    <p id="data"></p>
    <script src="jquery-1.12.3.min.js"></script>
    <script>
    function jsonp33(data) {
        var arr = [];
        for (var i = 0, d = data['data']; i < d.length; i++) {
            arr.push(d[i][0]);
        }
        $('#data').text(arr.join('、'));
    }

    $.ajax({
        url: 'https://textlink.simba.taobao.com/lk?_ksTS=1494252482350_32&callback=jsonp33&pid=421005_1007&refpid=mm_14507511_3485205_11375261',
        dataType: 'jsonp', // 注意将dataType属性设置为"jsonp"
        jsonp: 'jsonp33' // 传递的前台函数名
    });
    </script>
</body>
</html>
```

## <a name="href5">整体实现</a> ##

体验过使用 JSONP 从淘宝获取数据后，从整体即前后台上实现 JSONP 获取数据并不困难。

### <a name="href5-5">远程跨域服务器接口</a> ###

远程跨域服务器，URL 为`http://169.255.211.233:80/`，后台脚本(index.php)内容为:

```
<?php
    header('Content-Type: application/javascript; charset=UTF-8'); // 定义响应头
    $callback = $_GET['callback']; // 获取前台方法
    $data = '{name: "WJT", id: "0011456789"}';
    echo $callback.'('.$data.')'; // 注入参数并返回
?>
```

### <a name="href5-6">前台内容</a> ###

本地服务器，URL 为`http://localhost:8090/`，前台页面(index.html)内容为:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
</head>
<body>
    <p id="data"></p>
    <script src="jquery-1.12.3.min.js"></script>
    <script>
    function jsonpCallback(data) {
        $('#data').text(JSON.stringify(data));
    }

    $.ajax({
        url: 'http://localhost:8090/data',
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'jsonpCallback'
    });
    </script>
</body>
</html>
```

最终页面返回内容为:

![image](https://raw.githubusercontent.com/WebUnion-core/public-cdn/master/wjt20-base/w17.png)

---

```
ARTICLE_ID : 16
POST_DATE : 2017/08/19
AUTHER : WJT20
```
