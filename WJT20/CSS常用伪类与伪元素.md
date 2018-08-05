
# CSS常用伪类与伪元素 #

## 目录 ##

1. 参考链接
2. 伪类与伪元素的区分
3. 伪类
    1. 链接状态
    2. 首尾定位
    3. 索引定位
    4. 表单控件
        1. checked
        2. disabled和enabled
        3. focus
4. 伪元素
    1. 首行和首字符
    2. 前后添加内容

## 参考链接 ##

- [CSS 伪类 - w3school](http://www.w3school.com.cn/css/css_pseudo_classes.asp)

- [CSS 伪类 - runoob](http://www.runoob.com/css/css-pseudo-classes.html)

- [CSS3伪类和伪元素的特性和区别](http://www.cnblogs.com/ihardcoder/p/5294927.html)

## 伪类与伪元素的区分 ##

伪类用于向某些选择器添加特殊的效果，伪元素则是用于将特殊的效果添加到某些选择器。

伪类与伪元素的概念很难区分，关于两者的概念详解，可以查看这篇引用文章: [CSS3伪类和伪元素的特性和区别](http://www.cnblogs.com/ihardcoder/p/5294927.html)

## 伪类 ##

伪类的作用有以下两点:

1. 获取不存在于DOM树中的信息;
2. 获取不能被常规CSS选择器获取的信息。

### 链接状态 ###

伪类中最常用的情景之一就是用于设置链接标签的状态样式了，涉及的伪类主要有以下四个:

1. `:link`: 未访问的链接状态;
2. `:visited`: 已访问的链接状态;
3. `:hover`: 鼠标移动到链接上的状态;
4. `:active`: 链接被点击的状态。

如果要同时给这四个状态添加样式，那么你需要注意以下两点:

1. hover 状态的样式必须在添加完 link 和 visited 的状态样式后才会生效；
2. active 状态的样式必须在添加完 hover 状态的样式后才会生效。

综上所述，如果要同时设置这四个状态的样式，添加顺序就只有两种情况：

1. link -> visited -> hover -> active；
2. visited -> link -> hover -> active。

这四个链接伪类的样式添加顺序是诸多面试题常考的内容之一，其实你只要记住 hover 和 active 的位置是固定的，link 和 visited 两者可以互调位置。以下是示例代码:

DOM结构:

```html
...
<a class="link-text" href="#">text</a>
...
```

CSS样式：

```css
.link-text:link{ color: #acacac; }
.link-text:visited { color: #41c134; }
.link-text:hover { color: #00a4e9; }
.link-text:active { color: #e43660; }
```

效果截图:

![image](https://raw.githubusercontent.com/WebUnion-core/public-cdn/master/wjt20-base/w48.png)

这里还要补充一点，如果a标签的 href 属性值为空或者为"#"的话，link 和 visited 两者会冲突，其中一个状态样式就会失效。

### 首尾定位 ###

首尾定位伪类也是很常用的伪类，使用的是`:first-child`和`:last-child`这两个伪类，`:first-child`匹配的是其前面编写的选择器所匹配到的元素集合中的第一个子元素，而`:last-child`则是其中的最后一个子元素。

这里我举一个常见的应用首尾定位伪类的实例：给一个还有多个条目的列表项实现每个条目间用边框实线分隔的效果。注意，不是每个条目下边或上边添加一条边框实线那么简单哦，而是每个条目“之间”用边框实线分隔。明白其中的意思后，你会发现要实现这样的效果其实也不难，我们可以使用以下代码来实现:

DOM结构:

```html
...
<ul class="list">
    <li class="item">RED</li>
    <li class="item">GREEN</li>
    <li class="item">BLUE</li>
</ul>
...
```

CSS样式:

```css
.list{
    width: 100px;
    list-style: none;
    margin: 0;
    padding: 0;
}
.list .item{
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #acacac;
}
.list .item:last-child{
    /* 如果设置的是上边框实线，则用:first-child伪类匹配 */
    border-bottom: 0px;
}
```

效果截图：

![image](https://raw.githubusercontent.com/WebUnion-core/public-cdn/master/wjt20-base/w49.png)

### 索引定位 ###

前面讲过首尾定位伪类可以给集合的第一个和最后一个子元素添加样式，然而有些时候我们要添加的样式并不是作用于首尾，而是其中某个位置的元素，这时，我们可以使用索引定位伪类`:nth-child(n)`，这个伪类可以接收一个表征元素索引的参数(由1记起)。以下是给一个无序列表的第二个列表条目添加绿色字体颜色的示例代码：

DOM结构:

```html
...
<ul class="list">
    <li class="item">RED</li>
    <li class="item">GREEN</li>
    <li class="item">BLUE</li>
</ul>
...
```

CSS样式:

```css
.list{
    width: 100px;
    list-style: none;
    margin: 0;
    padding: 0;
}
.list .item{
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #acacac;
}
.list .item:last-child{
    border-bottom: 0px;
}
.list .item:nth-child(2){
    color: #41c134;
}
```

效果截图:

![image](https://raw.githubusercontent.com/WebUnion-core/public-cdn/master/wjt20-base/w55.png)

索引定位伪类还有一个特殊的用法，那就是使用的参数可以是算术表达式，例如，`::nth-child(2n+1)`会给所有奇数索引位置的元素添加样式，而`::nth-child(2n)`则会给所有偶数索引位置的元素添加样式，这是一个非常强大的功能，我们可以利用这个功能替换掉一些原本要由 JavaScript 才能实现的效果，这样可以大大提升页面性能。

### 表单控件 ###

CSS中有不少伪类是与表单控件(诸如文本框、文本域、单选按钮、复选按钮等等)有关的，在设计表单控件的时候，这些伪类还是挺有用的。这里我只列举一些常用的表单控件伪类，想了解更多表单控件伪类请自行查阅资料，常用的主要有以下这些:

1. `:checked`: 选择所有选中的表单元素；
2. `:disabled`: 选择所有禁用的表单元素；
3. `:enabled`: 选择所有启用的表单元素；
4. `:focus`: 选择元素输入后具有焦点。

#### checked ####

`:checked`伪类常用于单选按钮和复选按钮，利用这个伪类，我们可以给选中的选项添加一些独特样式，从而与未选中的选项区分开来。以下是给选中的复选按钮选项对应的备注文本添加颜色区分的示例代码：

DOM结构:

```html
...
<form>
    <input name="color" type="checkbox" value="red"/><label>红色</label><br/>
    <input name="color" type="checkbox" value="green"/><label>绿色</label><br/>
    <input name="color" type="checkbox" value="blue"/><label>蓝色</label><br/>
</form>
...
```

CSS样式:

```css
input[name="color"]:checked + label{
    color: #e43660;
}
```

效果截图:

![image](https://raw.githubusercontent.com/WebUnion-core/public-cdn/master/wjt20-base/w50.png)

#### disabled和enabled ####

`:disabled`和`:enabled`伪类分别用于给禁用和启用的表单控件添加不同的样式。以下是给启用状态文本框添加蓝色实线边框、给禁用状态文本框添加红色实线边框并设置黑底白字效果的示例代码:

DOM结构:

```html
...
<form>
    <input type="text" value="Disabled input text" disabled/><br/>
    <input type="text" placeholder="Enabled input text"/><br/>
</form>
...
```

CSS样式:

```css
input[type="text"]:enabled{
    margin-bottom: 10px;
    padding: 5px;
    border: 2px solid #3456c1;
}
input[type="text"]:disabled{
    margin-bottom: 10px;
    padding: 5px;
    border: 2px solid #e43660;
    background-color: #000000;
    color: #ffffff;
}
```

效果截图:  

![image](https://raw.githubusercontent.com/WebUnion-core/public-cdn/master/wjt20-base/w51.png)

#### focus ####

`:focus`伪类用于给获取到焦点的指定表单控件添加样式，以下是给一个文本框获得焦点时添加绿色实线边框的示例代码：

DOM结构:  

```html
...
<form>
    <input type="text" placeholder="Enabled input text"/><br/>
</form>
...
```

CSS样式:  

```css
input[type="text"]{
    border: 2px solid #ececec;
}
input[type="text"]:focus{
    border: 2px solid #41c134;
}
```

效果截图:  

![image](https://raw.githubusercontent.com/WebUnion-core/public-cdn/master/wjt20-base/w52.png)

## 伪元素 ##

伪元素在DOM树中创建了一些抽象元素，这些抽象元素是不存在于文档语言里的(可以理解为html源码)。比如：documen接口不提供访问元素内容的第一个字或者第一行的机制，而伪元素可以使开发者可以提取到这些信息。一个选择器只能使用一个伪元素，并且伪元素必须处于选择器语句的最后。

为了与伪类区分，我们通常在伪元素前加两个冒号“::”。

常用的伪元素有四个:  

1. `::first-letter`: 向文本首字符添加特殊样式；
2. `::first-line`: 向文本首行添加特殊样式；
3. `::before`: 在元素之前添加内容；
4. `::after`: 在元素之后添加内容。

### 首行和首字符 ###

使用`::first-letter`可以给指定元素的文本首字符添加样式，报纸上那种第一个字符设置大字号的效果就可以用这个伪元素实现；`::first-line`则是给指定元素的首行文本添加样式。以下是实现首字符字号加大并设为红色、首行加粗的示例代码：

DOM结构:  

```html
...
<p>你好，我是WJT20。<br/>很高兴见到你！</p>
...
```

CSS样式:  

```css
p::first-letter{
    font-size: 25px;
    color: #e43660;
}
p::first-line{
    font-weight: bold;
}
```

效果截图:  

![image](https://raw.githubusercontent.com/WebUnion-core/public-cdn/master/wjt20-base/w53.png)

### 前后添加内容 ###

前后添加内容是伪元素的主要用途之一，分别用到了`::before`和`::after`两个伪元素，以下是我们自定义一种字体颜色为红色的、文本前后被"——"包围的标题示例代码：

DOM结构:  

```html
...
<my-title>Hello, world!</my-title>
...
```

CSS样式:  

```css
my-title{
    font-size: 30px;
    font-weight: bold;
    color: #e43660;
}
my-title::before,my-title::after{
    content: " —— ";
}
```

效果截图:  

![image](https://raw.githubusercontent.com/WebUnion-core/public-cdn/master/wjt20-base/w54.png)

在这两个伪类中，通过修改 content 属性值，可以在前后添加多种不同内容，这些内容可以是图片、音频、文本等等。

---

```
ARTICLE_ID : 34
POST_DATE : 2017/09/23
AUTHER : WJT20
```
