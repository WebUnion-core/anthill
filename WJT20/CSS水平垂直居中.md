
# CSS水平垂直居中 #

## 目录 ##

1. [参考链接](#href1)
2. [文本居中](#href2)
    1. [水平居中](#href2-1)
    2. [垂直居中](#href2-2)
3. [块元素居中](#href3)
    1. [margin:auto水平居中](#href3-3)
    2. [margin+position居中法](#href3-4)
    3. [transform居中法](#href3-5)
4. [其他居中方法](#href4)
    1. [flexbox](#href4-6)
    2. [表格布局法](#href4-7)
    3. [vertical-align居中用法](#href4-8)

## <a name="href1">参考链接</a> ##

- [CSS水平垂直居中总结](https://segmentfault.com/a/1190000007765664)

- [CSS vertical-align属性的用法](http://blog.sina.com.cn/s/blog_51048da701018490.html)

## <a name="href2">文本居中</a> ##

### <a name="href2-1">水平居中</a> ###

使文本相对父元素水平居中使用语句：`text-align: center;`。

### <a name="href2-2">垂直居中</a> ###

使单行文本垂直居中，需要将父元素的 height 属性值和 line-height 值设为相同的固定值，使用语句：

```css
.container {
    height: 50px;
    line-height: 50px;
}
```

注意，这种方法在移动设备上可能无法实现居中效果，原因不明。

## <a name="href3">块元素居中</a> ##

### <a name="href3-3">margin:auto水平居中</a> ###

将元素的 width 值设置为固定值，然后将该元素的左右 margin 值设置为 auto，即可将元素设置为相对父元素水平居中。

```css
.container {
    display: block;
    width: 500px;
    height: 500px;
    margin: 0 auto;
}
```

### <a name="href3-4">margin+position居中法</a> ###

这种方法针对的是宽高能够确定的元素，有两种实现方案。

1. 先将元素设置为绝对定位，然后将 margin 值设为 auto，并将 top、left、bottom 和 right 都设为0即可。

    ```css
    .container {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;

        width: 30%;
        height: 30%;
        margin: auto;
    }
    ```

2. 将元素设为绝对定位后，将 top 和 left 都设置为 50%，然后将 margin-top 设为高度的一半的负值，margin-left 设为宽度的一半的负值:

    ```css
    .container {
        position: absolute;
        top: 50%;
        left: 50%;

        width: 500px;
        height: 500px;
        margin-top: -250px;
        margin-left: -250px;
    }
    ```

### <a name="href3-5">transform居中法</a> ###

设置 transform 属性也可以实现水平垂直居中，但低版本浏览器(IE8及IE8-等)不兼容。使用 transform 法同样不需要确定宽高。

```css
.container {
    width: 30%;
    height: 30%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

## <a name="href4">其他居中方法</a> ##

### <a name="href4-6">flexbox</a> ###

使用 flexbox 弹性盒布局可以非常容易地实现元素水平垂直居中。这种方法不需要确定目标元素的宽高，但是至少要确定父元素的高度。

```css
.flex-container {
    /* 块级元素的宽度会自适应，可以不用手动设置 */
    width: 500px;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.flex-item {
    width: 30%;
    height: 30%;
}
```

### <a name="href4-7">表格布局法</a> ###

将父元素设置为表格布局，然后将父元素设置为表格单元布局，同样可以实现元素水平垂直居中。但是这种方式需要确定父元素的宽高，并将目标元素的左右 margin 设为 auto。

```css
.table-body {
    /* 宽高都需要确定 */
    width: 1000px;
    height: 1000px;

    display: table-cell;
    vertical-align: middle;
}

.table-item {
    width: 30%;
    height: 30%;
    margin: 0 auto;
}
```

### <a name="href4-8">vertical-align居中用法</a> ###

vertical-align 属性用于设置非块元素的垂直对齐方式，对于块元素，可以手动设置 display 属性为 table-cell，然后添加`vertical-align: middle`来实现垂直居中:

```CSS
.block-container {
    width: 500px;
    height: 200px;
    display: table-cell;
    vertical-align: middle;

    /* 以下两句为兼容IE的样式，设置font-size为(200*0.873)175px以撑开元素 */
    *display: block;
    *font-size: 175px;
}
```

使用 vertical-align 实现居中的一种常见应用场景是让容器元素内部的图片和文字在竖直方向上居中:

```CSS
/* 图片和文字同时设置display和vertical-align */
.container .img {
    display: inline-block;
    vertical-align: middle;
    width: 100px;
    height: 100px;
}

.container .text {
    display: inline-block;
    vertical-align: middle;    
}
```

---

```
ARTICLE_ID : 10
POST_DATE : 2017/08/14
AUTHER : WJT20
```
