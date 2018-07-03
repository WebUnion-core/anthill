
# CSS3动画实践 #

## 目录 ##

1. @keyframes
2. 动画配置属性
3. animation属性
4. transform属性 

---

## @keyframes ##

@keyframes 规则用于创建动画，在它的内部指定一个CSS样式和动画将逐步从目前的样式更改为新的样式。@keyframes 使用 from 表示开始态(等同于0%)、to 表示结束态(等同于100%)、大于0%小于100%的百分数表示某个中间态。

为了 Safari 和 Chrome，通常需要使用 -webkit- 前缀再定义一遍动画规则。

示例代码：
```
@keyframes first-animate{
    from{ background-color: #00a4e9; }
    50%{ background-color: #3456c1; }
    to{ background: #1404a8; }
}
@-webkit-keyframes first-animate{
    from{ background-color: #00a4e9; }
    50%{ background-color: #3456c1; }
    to{ background: #1404a8; }
}
```

以上代码中，"first-animate"是动画的名字，@keyframes 规则内部添加了几个变色规则。

---

## 动画配置属性 ##

动画配置属性主要有以下这些：

1. animation-name：给元素配置的动画名；

2. animation-duration：动画时长(s或ms)；

3. animation-timing-function：动画变化速度函数，可取值：
    1. linear：速度不变；
    2. ease-in：由低速到正常速度；
    3. ease-out：由正常速度到低速；
    4. ease-in-out：低速到正常速度再到低速；
    5. ease：与 ease-in-out 基本相同；
    6. cubic-bezier(x1, y1, x2, y2)：使用三次贝塞尔函数作为速度函数。

4. animation-delay：动画开始前等待的时间(s或ms)；

5. animation-iteration-count：动画的循环次数，可以是具体数值，也可以是"infinite"，表示无限循环播放；

6. animation-direction：动画循环方向：
    1. normal：正向播放；
    2. reverse：反向播放；
    3. alternate：正向和反向交替播放。

7. animation-play-state：有播放(取值 running)和暂停(paused)两种状态；

8. animation-fill-mode：规定元素在动画开始前和完成后的状态：
    1. none：元素在动画前后的状态和动画没有联系；
    2. forwards：动画完成后，元素保持动画最后的状态；
    3. backwards：动画开始前，元素保持动画开始的状态；
    4. both：forwards 和 backwards 的结合。

---

## animation属性 ##

定义好 @keyframes 规则后，还要将动画应用到具体的元素上，可以使用各种动画属性逐个配置到元素上，但是效率很低也很繁琐，使用 animation 属性可以一次性配置这些属性，animation 属性的配置规则为：`animation: name duration timing-function delay iteration-count direction;`，每个部分对应各自的取值。同样的，animation 属性也需要用 -webkit- 前缀再定义一遍。

实例代码：
```
#animate-elem{
    width: 200px;
    height: 200px;
    animation: first-animate 5s linear 1s infinite alternate;/* first-animate是定义好的@keyframes规则名字 */
    -webkit-animation: first-animate 5s linear 1s infinite alternate;
}
```

---

## transform属性 ##

transform 属性用于添加旋转、倾斜、缩放、平移等动画效果到元素上，通过给 transform 属性赋值一个变形函数实现前面讲到的效果。变形函数如下：

1. rotate(angle)：旋转，angle 参数为旋转度数，单位为 deg，旋转方向为顺时针；

2. skew(angle)：倾斜，angle 参数为倾斜度数，单位为 deg，angle 为负数时将向左倾斜，angle 为正数时将向右倾斜；

3. scale(float)：伸缩，float 参数是一个浮点数，如果 float>1，则按比例放大，如果 0<float<1，则按比例缩放，如果 -1<float<0，则按比例缩放并顺时针旋转180度，如果 float<-1，则按比例放大并顺时针旋转180度；

4. translate(x, y)：平移，x和y为相对起点的位置坐标，单位为 px 等。  

如果要设置多个变换同时进行，只需要将变形函数逐个添加到同一个 transform 属性上。

实例代码：
```
@keyframes first-animate{
    from{
        transform: translate(0, 0) scale(1) skew(0deg) rotate(0deg);
    }
    to{
        transform: translate(400px, 0) scale(0.5) skew(-45deg) rotate(135deg);
    }
}
@-webkit-keyframes first-animate{
    from{
        transform: translate(0, 0) scale(1) skew(0deg) rotate(0deg);
    }
    to{
        transform: translate(400px, 0) scale(0.5) skew(-45deg) rotate(135deg);
    }
}
```

---

```
ARTICLE_ID : 11
POST_DATE : 2017/08/14
RECENTLY_MODIFY : 2017/08/31
TIME_COUNTER : 1
AUTHER : WJT20
```
