
# 初识RequireJS #

## 目录 ##

1. 介绍
2. 基本API
3. 加载文件

## 介绍 ##

RequireJS 是一个非常小巧的 JavaScript 模块载入框架，是 AMD 规范最好的实现者之一。RequireJS 非常轻量，可以和其他的框架协同工作，使用 RequireJS 可以使前端代码质量得以提升。jQuery 就是使用 RequireJS 实现模块化的，有兴趣可以去研究一下。

RequireJS 使用示例:

```
<!DOCTYPE html>
<html>
<head>
    <!-- 需要事先引入require.js这个文件 -->
    <script type="text/javascript" src="require.js"></script>
    <script type="text/javascript">
        require(["a"]);
    </script>
</head>
<body>
    <h1>Hello, world</h1>
</body>
</html>
```

以上代码在引入 require.js 后，使用 require 语法引入了 a.js 这个文件，这个文件的内容大致是这样的:

```
// define是做什么的？以后我会详细讲解这个，现在暂时跳过
define(function(){
    function fun1(){
        alert("it works");
    }

    fun1();
})
```

使用 RequireJS 的最大的好处有以下两点:

1. 防止js加载阻塞页面渲染；
2. 使用程序调用的方式加载 js，再也不用书写大量的 script 标签来引入 js 文件了。

## 基本API ##

RequireJS 主要有两个 API:

1. define: 这个api是用来定义一个模块；
2. require: 加载依赖模块，并执行加载完后的回调函数。

define api 实例:

```
define(function() {
    alert('loading');
})
```

require api 实例:

```
require(['js/a'], function(){
    alert('load finished');
})
```

require 第一个参数是一个数组，每个数组元素对应 script 标签的 src 属性值，即引入的 js 模块路径，第二个参数是一个可选函数，表示模块加载完成后执行的程序。

## 加载文件 ##

require api 引入的模块来自本地，如果我们需要引入远程资源，则需要使用另一种方式来引入文件，以使用 CDN 引入百度 jQuery 文件为例:

```
require.config({
    paths : {
        "jquery" : ['http://libs.baidu.com/jquery/2.0.3/jquery', 'js/jquery']   
    }
})
require(['jquery', 'js/a'], function($) {
    $(function() {
        alert('load finished');  
    })
})
```

require.config 用于配置模块的加载位置，这里给引入的百度 jQuery 文件取了一个"jquery"别名，接着，在 require api 中，第一个参数中先加入"jquery"，映射的就是 CDN 引入的 jQuery 文件。

在 require.config 中，我们看到 paths 配置中的 jquery 键对应的值是一个数组，第一个参数是 CDN 资源路径，那么第二个参数又是什么呢？第二个参数是本地的 jquery 资源文件，它是一个备用资源，如果百度的 jQuery 加载失败，则会加载本地的 jQuery 文件。

在第二个参数中，可以将模块的输出变量导入到函数内部，例如，jquery 加载完成后可以在第二个函数参数中使用`$`这个输出变量，如果有多个模块产生多个不同输出变量，则只需将其依次作为参数传入函数即可。

---

```
ARTICLE_ID : 68
POST_DATE : 2018/02/16
AUTHER : WJT20
```
