
# CSS常用属性笔记 #

## 目录 ##

1. [文本相关](#href1)
    1. [单行文本超出自动省略](#href1-1)
    2. [多行文本超出自动省略](#href1-2)
    3. [英文单词拆解换行](#href1-3)
    4. [禁止双击复制](#href1-4)
2. [表单控件相关](#href2)
    1. [placeholder样式设置](#href2-5)
3. [图形相关](#href3)
    1. [三角图标](#href3-6)
    2. [移动端1px线的实现](#href3-7)
    3. [开启硬件加速使动画流畅](#href3-8)
    4. [画弧](#href3-10)
4. [其他](#href4)
    1. [使元素失去点击和触摸等事件](#href4-9)

## <a name="href1">文本相关</a> ##

### <a name="href1-1">单行文本超出自动省略</a> ###

自动将超出元素宽度的文本以省略号形式显示:

```css
p {
    width: 100px; /* 限制宽度 */
    text-overflow: ellipsis; /* 超出部分省略号表示 */
    overflow: hidden; /* 超出部分隐藏 */
    white-space: nowrap; /* 规定文本不换行 */
}
```

### <a name="href1-2">多行文本超出自动省略</a> ###

以下这段代码，兼容性并不好，如果 webpack 配置了 postcss-loader，postcss-loader甚至会自动将其移除:

```css
p {
    height: 50px; /* 必须限制高度 */
    overflow: hidden; /* 超出部分隐藏 */
    text-overflow: ellipsis; /* 超出部分省略号表示 */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
```

### <a name="href1-3">英文单词拆解换行</a> ###

当英文单词超出所在元素宽度时，将超出部分拆解显示在下一行位置:

```css
p {
    width: 100px; /* 限制宽度 */
    word-break: break-all; /* 超出部分自动换行 */
}
```

### <a name="href1-4">禁止双击复制</a> ###

移动端一般都要禁用复制操作，否则惨不忍睹，不过一般视情况而定:  

```css
body {
    /* 禁止双击复制 */
    -moz-user-select: none;
    /* 火狐 */
    -webkit-user-select: none;
    /* webkit浏览器 */
    -ms-user-select: none;
    /* IE10 */
    -khtml-user-select: none;
    /* 早期浏览器 */
    user-select: none;
}
```

## <a name="href2">表单控件相关</a> ##

### <a name="href2-5">placeholder样式设置</a> ###

将文本框、文本域设置的 placeholder 文本设为浅蓝色，老实说，默认的 placeholder 样式还是能接受的，但是，UI就是要改！改！改！

```css
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color: #00a4e9;
}
input:-moz-placeholder, textarea:-moz-placeholder {
    color: #00a4e9;
}
input::-moz-placeholder, textarea::-moz-placeholder {
    color: #00a4e9;
}
input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    color: #00a4e9;
}
```

## <a name="href3">图形相关</a> ##

### <a name="href3-6">三角图标</a> ###

像一些小型的角标，大可用 CSS 实现，能不用图片就不用图片:  

```css
.icon {
    width: 0;
    height: 0;
    border-bottom: 10px solid red;
    border-left: 10px solid transparent;
}
```

### <a name="href3-7">移动端1px线的实现</a> ###

每次调UI，UI小姐姐都会说：“这个线太粗啦，啦啦啦。。。”，为了应付她们，这个很重要:  

HTML 部分:  

```html
<div class="container">
    <hr class="line" />
</div>
```

CSS 部分:  

```css
.container {
    transform: perspective(500);
}
.container .line {
    width: 100%;
    height: 1px;
    background-color: #dcdcdc;
    transform: scaleY(0.3);
}
```

### <a name="href3-8">开启硬件加速使动画流畅</a> ###

不管最终目的是不是要实现3D动画，只要使用 translate3d 就能使网页开启硬件加速，从而使动画流畅:  

```css
.animate {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
}
```

### <a name="href3-10">画弧</a> ###

注意 height 和 border 的宽度比例为`8:1`，代码如下:

```css
.circular {
    width: 100px;
    height: 80px;
    display: inline-block;
    box-sizing: border-box;
    border-top: solid 10px #f56151;
    border-right: solid 10px transparent;
    border-bottom: solid 10px transparent;
    border-left: solid 10px transparent;
    border-radius: 50%;
}
```

## <a name="href4">其他</a> ##

### <a name="href4-9">使元素失去点击和触摸等事件</a> ###

```css
p {
    pointer-events: none;
}
```

---

```
ARTICLE_ID : 36
POST_DATE : 2017/10/11
AUTHER : WJT20
```
