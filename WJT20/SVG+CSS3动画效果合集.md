
# SVG+CSS3动画效果合集 #

## 目录 ##

1. [参考链接](#href1)
2. [信号格动画](#href2)

## <a name="href1">参考链接</a> ##

- [利用CSS3的animation step属性实现wifi动画](https://juejin.im/post/597694e75188250d4d352cf9)

## <a name="href2">信号格动画</a> ##

阅读了[利用CSS3的animation step属性实现wifi动画](https://juejin.im/post/597694e75188250d4d352cf9)一文后，想自己动手实现这一效果，奈何没有 Wifi 的 SVG 图片素材，所以就模仿文章的做法实现一个效果类似的信号格动画。

源码:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>SVG信号动画效果实现</title>
    <style>
    .svg-container {
        background-color: #212121;
    }
    @keyframes first-column {
        0% { opacity: 0; }
        23.3% { opacity: 1; }
        76.6% { opacity: 0; }
    }
    @keyframes second-column {
        0% { opacity: 0; }
        33.3% { opacity: 1; }
        61.6% { opacity: 0; }
    }
    @keyframes third-column {
        0% { opacity: 0; }
        43.3% { opacity: 1; }
        57.6% { opacity: 0; }
    }
    .signal-column:nth-of-type(1) { animation: first-column 2s steps(1) infinite; }
    .signal-column:nth-of-type(2) { animation: second-column 2s steps(1) infinite; }
    .signal-column:nth-of-type(3) { animation: third-column 2s steps(1) infinite; }
    </style>
</head>
<body>
    <svg class="svg-container" xmlns="http://www.w3.org/2000/svg" version="1.0" width="560" height="560">
        <line class="signal-column" x1="186" y1="430" x2="186" y2="330" stroke="#eeeeee" stroke-width="75" />
        <line class="signal-column" x1="279" y1="430" x2="279" y2="230" stroke="#eeeeee" stroke-width="75" />
        <line class="signal-column" x1="372" y1="430" x2="372" y2="130" stroke="#eeeeee" stroke-width="75" />
    </svg>
</body>
</html>
```

效果图如下:

---

```
ID         : 9
DATE       : 2019/01/30
AUTHER     : WJT20
TAG        : Web前端
```
