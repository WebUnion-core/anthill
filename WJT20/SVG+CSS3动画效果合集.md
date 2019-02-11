
# SVG+CSS3动画效果合集 #

## 目录 ##

1. [参考链接](#href1)
2. [信号格动画](#href2)
3. [旋转花瓣动画](#href3)
4. [旋转方块动画](#href4)
5. [Anthill动画](#href5)

## <a name="href1">参考链接</a> ##

- [利用CSS3的animation step属性实现wifi动画](https://juejin.im/post/597694e75188250d4d352cf9)
- [不炫技，SVG+CSS3 旋转动画属性就能实现的梦幻效果](https://juejin.im/post/5a150fc06fb9a0451e3f7042)

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

![image](https://raw.githubusercontent.com/WebUnion-core/anthill/master/WJT20/images/w116.gif)

## <a name="href3">旋转花瓣动画</a> ##

源码:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>SVG旋转花瓣动画效果实现</title>
    <style>
    .svg-container {
        background-color: #212121;
    }
    @keyframes petal2 {
        0% {
            opacity: 0;
            transform: rotate(0deg);
            transform-origin: 280px 280px;
        }
        100% {
            transform: rotate(60deg);
            transform-origin: 280px 280px;
        }
    }
    @keyframes petal3 {
        0% {
            opacity: 0;
            transform: rotate(0deg);
            transform-origin: 280px 280px;
        }
        100% {
            transform: rotate(120deg);
            transform-origin: 280px 280px;
        }
    }
    @keyframes petal4 {
        0% {
            opacity: 0;
            transform: rotate(0deg);
            transform-origin: 280px 280px;
        }
        100% {
            transform: rotate(180deg);
            transform-origin: 280px 280px;
        }
    }
    @keyframes petal5 {
        0% {
            opacity: 0;
            transform: rotate(0deg);
            transform-origin: 280px 280px;
        }
        100% {
            transform: rotate(240deg);
            transform-origin: 280px 280px;
        }
    }
    @keyframes petal6 {
        0% {
            opacity: 0;
            transform: rotate(0deg);
            transform-origin: 280px 280px;
        }
        100% {
            transform: rotate(300deg);
            transform-origin: 280px 280px;
        }
    }
    #petal2 { animation: petal2 ease 1s both; }
    #petal3 { animation: petal3 ease 1.2s both; }
    #petal4 { animation: petal4 ease 1.4s both; }
    #petal5 { animation: petal5 ease 1.6s both; }
    #petal6 { animation: petal6 ease 1.8s both; }
    </style>
</head>
<body>
    <svg class="svg-container" xmlns="http://www.w3.org/2000/svg" version="1.0" width="560" height="560">
        <ellipse id="petal1" cx="370" cy="280" rx="90" ry="20" fill="#00a4e9" opacity="0.75" />
        <use id="petal2" xlink:href="#petal1" x="0" y="0" />
        <use id="petal3" xlink:href="#petal1" x="0" y="0" />
        <use id="petal4" xlink:href="#petal1" x="0" y="0" />
        <use id="petal5" xlink:href="#petal1" x="0" y="0" />
        <use id="petal6" xlink:href="#petal1" x="0" y="0" />
    </svg>
</body>
</html>
```

效果图如下:

![image](https://raw.githubusercontent.com/WebUnion-core/anthill/master/WJT20/images/w117.gif)

## <a name="href4">旋转方块动画</a> ##

源码:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>SVG旋转方块动画效果实现</title>
    <style>
    @keyframes content {
        to { transform: rotateY(360deg); }
    }
    svg {
        position: absolute;
        top: 230px;
        left: 230px;
        width: 100px;
        height: 100px;
    }
    .container {
        background-color: #212121;
        width: 560px;
        height: 560px;
        perspective: 560px;
    }
    .svg-content {
        transform-style: preserve-3d;
        animation: content 2s linear both infinite;
    }
    #cubic-top {
        transform: translateY(-100px) rotateX(90deg);
        transform-origin: bottom center;
    }
    #cubic-right {
        transform: translateX(100px) rotateY(90deg);
        transform-origin: center left;
    }
    #cubic-bottom {
        transform: translateY(100px)  rotateX(-90deg);
        transform-origin:top center;
    }
    #cubic-left {
        transform: translateX(-100px) rotateY(-90deg);
        transform-origin: center right;
    }
    </style>
</head>
<body>
    <main class="container">
        <div class="svg-content">
            <svg id="cubic-front" xmlns="http://www.w3.org/2000/svg" version="1.0">
                <rect width="100" height="100" fill="#3456c1" opacity="0.35" />
            </svg>

            <svg id="cubic-back" xmlns="http://www.w3.org/2000/svg" version="1.0">
                <rect width="100" height="100" fill="#0e9994" opacity="0.35" />
            </svg>

            <svg id="cubic-left" xmlns="http://www.w3.org/2000/svg" version="1.0">
                <rect width="100" height="100" fill="#e11515" opacity="0.35" />
            </svg>

            <svg id="cubic-right" xmlns="http://www.w3.org/2000/svg" version="1.0">
                <rect width="100" height="100" fill="#edb71c" opacity="0.35" />
            </svg>

            <svg id="cubic-top" xmlns="http://www.w3.org/2000/svg" version="1.0">
                <rect width="100" height="100" fill="#3a9834" opacity="0.35" />
            </svg>

            <svg id="cubic-bottom" xmlns="http://www.w3.org/2000/svg" version="1.0">
                <rect width="100" height="100" fill="#d8791c" opacity="0.35" />
            </svg>
        </div>
    </main>
</body>
</html>
```

效果图如下:

![image]()

## <a name="href5">Anthill动画</a> ##

源码:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>SVG Anthill动画效果实现</title>
    <style>
    @keyframes self-rotate {
        0% { transform: rotateX(0deg) rotateZ(0deg); }
        100% { transform: rotateX(250deg) rotateZ(-566deg); }
    }
    .svg-container {
        position: relative;
    }
    .background {
        animation: self-rotate 5s both;
        transform-origin: 280px 280px;
    }
    .text {
        text-anchor: middle;
        font-size: 40px;
        text-shadow: 0px 0px 5px rgba(0,0,0,0.85);
    }
    </style>
</head>
<body>
    <svg class="svg-container" xmlns="http://www.w3.org/2000/svg" version="1.0" width="560" height="560">
        <circle cx="280" cy="280" r="180" stroke="#f55a5a" fill="#ffffff" stroke-width="2"></circle>
        <rect class="background" fill="#f55a5a" width="360" height="360" x="100" y="100" />
        <text class="text" x="280" y="290" fill="#ffffff"> Anthill </text>
    </svg>
</body>
</html>
```

效果图如下:

![image]()

---

```
ID         : 9
DATE       : 2019/01/30
AUTHER     : WJT20
TAG        : Web前端
```
