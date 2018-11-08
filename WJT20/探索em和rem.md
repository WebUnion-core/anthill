
# 探索em和rem #

## 目录 ##

1. [参考链接](#href1)
2. [介绍](#href2)
3. [em](#href3)
4. [rem](#href4)

## <a name="href1">参考链接</a> ##

- [移动web适配利器-rem](http://www.alloyteam.com/2016/03/mobile-web-adaptation-tool-rem/)

- [别再被各种单位迷惑: px/em/rem](https://segmentfault.com/a/1190000004190019)

## <a name="href2">介绍</a> ##

em和rem都是web响应式适配中常用的单位，目前大部分主流的浏览器都支持。两者总是一并提起，接下来就讲下两者的区别。

rem和em的共同之处就是首先都需要事先给网页的某个元素来设置字体px值，然后根据该元素的字体大小转换为rem或em为单位的属性值，两者的不同之处在于所设置的目标元素不同，rem设置的是页面的根元素的字体大小，而em设置的是父元素的字体大小。我们不能评判两者孰优孰劣，应该使用rem还是em，应由具体情况作出选择。

## <a name="href3">em</a> ##

之前说过，em会继承父元素的字体大小，任意浏览器的默认字体大小都是16px，所以任何未经调整的浏览器中都符合: `1em=16px`，通常为了简化px和em间的换算，会将body标签的字体大小设为62.5%，即:

```css
body{
    font-size: 62.5%;
}
```

这样设置的好处是在px换算为em时只要将px值除以10即可，简单讲就是换算规则变成了: `1em=10px`。

使用em最需要注意的地方就是在确定某个元素的em值前，都要先明确其父元素及这个元素本身的字体大小，当然，如果没设置过父元素的字体大小的话，字体大小会从页面根元素传递过来，这时候就和同屏幕宽度下使用rem的效果差不多了。举个例子:

DOM结构:

```html
<div class="div1">
    <div class="div2"></div>
</div>
```

样式1:

```css
body{
    font-size: 62.5%;
    padding: 1em;
}
.div1{
    width: 20em;
    height: 20em;
    background-color: #41c134;
}
.div2{
    width: 10em;
    height: 10em;
    background-color: #00a4e9;
}
```

效果1:

![image](https://raw.githubusercontent.com/WebUnion-core/doc-repositort/master/WJT20/images/w44.png)

这是没有设置父元素div1的字体大小的显示情况，font-size 的值从body标签继承而来，这时，div1的宽高值就是`20em = 20 * 10px = 200px`，div1继承的 font-size 再继承给div2，此时div2的宽高值就是`10em = 10 * 10px = 100px`。

样式2:

```css
body{
    font-size: 62.5%;
    padding: 1rem;
}
.div1{
    width: 20em;
    height: 20em;
    background-color: #41c134;
    font-size: 18px;
}
.div2{
    width: 10em;
    height: 10em;
    background-color: #00a4e9;
}
```

效果2:

![image](https://raw.githubusercontent.com/WebUnion-core/doc-repositort/master/WJT20/images/w45.png)

将div1的 font-size 设为18px，此时，div1自身的宽高变为`20em = 20 * 18px = 360px`，div2继承了div1的 font-size，其宽高变为`10em = 10 * 18px = 180px`。

通常，em布局会和媒体查询结合在一起，通过调整不同屏幕宽度下父元素的 font-size 大小达到元素宽高等值自适应。

## <a name="href4">rem</a> ##

前面说过，和em不同，rem只需要设定根元素的 font-size 值就可以达到自适应的效果。使用rem不会出现em一样的问题(rem只看根元素，不看父元素)。

1rem代表多大的px值一般由项目UI出的设计稿尺寸和前端选择的预览屏尺寸决定，例如，我们拿到的设计稿宽度为1080px，默认字体大小为48px，然后我们的预览屏幕宽是360px，可以算出预览屏字体大小应为`360 / (1080 / 48)px = 16px`，所以为了方便换算，我们要达到360px屏幕下1rem等于16px，同常手机屏幕宽度最大值在500px左右，所以为了适应所有移动端手机，我们把上限定为`2 * 360px = 720px`，所以字体大小峰值为`720 / (360 / 16)px = 32px`，知道这些数据后，我们可以开始编写rem适配脚本了。

最终适配脚本如下:

```js
(function(doc, win) {
    var docEl = doc.documentElement, // 根元素
        resizeEvt = 'onorientationchange' in window ? 'onorientationchange' : 'resize', // 兼容屏幕变化事件
        recalc = function() {
            var clientWidth = docEl.clientWidth > win.innerWidth ? win.innerWidth : docEl.clientWidth; // 处理一些移动设备中获取到怪异设备宽度的情况

            if(clientWidth >= 720) { // 大于峰值规定一致的字体大小
                docEl.style.fontSize = '32px';
            } else {
                docEl.style.fontSize = clientWidth * 32 / 720 + 'px'; // 等比例缩放
            }
        };

    //事件绑定
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window)
```

植入这段脚本后，我们还在HTML页面中加上之前测试em同样的DOM结构:

```html
<div class="div1">
    <div class="div2"></div>
</div>
```

然后，样式是这样的:

```css
.div1{
    width: 2rem;
    height: 2rem;
    background-color: #41c134;
}
.div2{
    width: 1rem;
    height: 1rem;
    background-color: #00a4e9;
}
```

最后，我们到不同设备上查看效果，360px屏幕宽度下的效果如下:

![image](https://raw.githubusercontent.com/WebUnion-core/doc-repositort/master/WJT20/images/w46.png)

720px屏幕下的效果如下:

![image](https://raw.githubusercontent.com/WebUnion-core/doc-repositort/master/WJT20/images/w47.png)

```
ARTICLE_ID : 32
POST_DATE : 2017/09/17
AUTHER : WJT20
```
