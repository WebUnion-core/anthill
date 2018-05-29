
# CSS常用属性笔记 #

## 目录 ##

1. 文本相关
    1. 单行文本超出自动省略
    2. 多行文本超出自动省略
    3. 英文单词拆解换行
2. 表单控件相关
    1. placeholder样式设置
3. 图形相关
    1. 三角图标
    2. 移动端1px线的实现
4. 冷门黑科技
    1. 禁止双击复制

## 文本相关 ##

### 单行文本超出自动省略 ###

自动将超出元素宽度的文本以省略号形式显示:

```css
p {
    width: 100px; /* 限制宽度 */
    text-overflow: ellipsis; /* 超出部分省略号表示 */
    overflow: hidden; /* 超出部分隐藏 */
    white-space: nowrap; /* 规定文本不换行 */
}
```

### 多行文本超出自动省略 ###

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

### 英文单词拆解换行 ###

当英文单词超出所在元素宽度时，将超出部分拆解显示在下一行位置:

```css
p {
    width: 100px; /* 限制宽度 */
    word-break: break-all; /* 超出部分自动换行 */
}
```

## 表单控件相关 ##

### placeholder样式设置 ###

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

## 图形相关 ##

### 三角图标 ###

像一些小型的角标，大可用 CSS 实现，能不用图片就不用图片:  

```css
.icon {
    width: 0;
    height: 0;
    border-bottom: 10px solid red;
    border-left: 10px solid transparent;
}
```

### 移动端1px线的实现 ###

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

## 冷门黑科技 ##

### 禁止双击复制 ###

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

---

```
ARTICLE_ID : 36
POST_DATE : 2017/10/11
AUTHER : WJT20
```
