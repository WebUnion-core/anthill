
# CSS水平垂直居中 #

## 目录 ##

1. [参考链接](#href1)
2. [文本居中](#href2)
 [](#href3)   1. 水平居中
 [](#href4)   2. 垂直居中
3. [元素居中](#href5)
 [](#href6)   1. 水平居中
 [](#href7)   2. 垂直居中
 [](#href8)   3. 联合设置目标元素及父元素实现居中

## <a name="href1">参考链接</a> ##

- [CSS水平垂直居中总结](https://segmentfault.com/a/1190000007765664)

---

## <a name="href2">文本居中</a> ##

## <a name="href3">水平居中</a> ##

使文本相对父标签水平居中使用语句：`text-align:center;`。

## <a name="href4">垂直居中</a> ##

使单行文本垂直居中，需要将父标签的 height 属性值和 line-height 值设为相同的固定值，使用语句：

```
div{
    height: 50px;
    line-height: 50px;
}
```

---

## <a name="href5">元素居中</a> ##

由于内联元素的宽度会自行覆盖父标签的宽度大小，所以无法控制内联元素居中，所以讨论的是块级元素的居中情况。

## <a name="href6">水平居中</a> ##

将元素的 width 值设置为固定值，然后将该元素的左右 margin 值设置为 auto，即可将元素设置为相对父元素水平居中。

```
div{
    width: 500px;
    height: 500px;
    margin: 0 auto;
}
```

## <a name="href7">垂直居中</a> ##

要将元素设置为垂直居中，首先要将元素设置为绝对定位并将 top 和 bottom 都设为0，并将该元素的上下 margin 值设置为 auto 即可。

```
div{
    width: 500px;
    height: 500px;
    margin: auto 0;
    position: absolute;
    top: 0;
    bottom: 0;
}
```

## <a name="href8">垂直水平居中</a> ##

1. 宽高不确定居中法

    如果元素的宽高未知或会自动变化，先将元素设置为绝对定位，然后将 margin 值设为 auto，并将 top、left、bottom 和 right 都设为0即可。

    ```
    div{
        width: 30%;
        height: 30%;
        margin: auto;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
    ```

2. 宽高确定居中法

    如果元素的宽高固定，将元素设为绝对定位后，将 top 和 left 都设置为 50%，然后将 margin-top 设为高度的一半的负值，将 margin-left 设为宽度的一半的负值。

    ```
    div{
        width: 500px;
        height: 500px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -250px;
        margin-left: -250px;
    }
    ```

3. transform 居中法

    设置 transform 属性也可以实现水平垂直居中，但低版本浏览器(主要 IE8 及 IE8-)不兼容。使用 transform 法同样不需要确定宽高。

    ```
    div{
        width: 30%;
        height: 30%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    ```

## <a name="href9">联合设置目标元素及父元素实现居中</a> ##

1. flexbox 法

    使用 flexbox 弹性盒布局可以非常容易地实现元素水平垂直居中。这种方法不需要确定目标元素的宽高，但是至少要确定父元素的高度。

    ```
    #parent{
        width: 500px;/* 块级元素的宽度会自适应，可以不用手动设置 */
        height: 500px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    #child{
        width: 30%;
        height: 30%;
    }
    ```

2. 表格布局法

    将父元素设置为表格布局，然后将父元素设置为表格单元布局，同样可以实现元素水平垂直居中。但是这种方式需要确定父元素的宽高，并将目标元素的左右 margin 设为 auto。

    ```
    #parent{
        /* 宽高都需要确定 */
        width: 1000px;
        height: 1000px;

        display: table-cell;
        vertical-align: middle;
    }
    #child{
        width: 30%;
        height: 30%;
        margin: 0 auto;
    }
    ```

---

```
ARTICLE_ID : 10
POST_DATE : 2017/08/14
RECENTLY_MODIFY : 2017/08/31
TIME_COUNTER : 1
AUTHER : WJT20
```