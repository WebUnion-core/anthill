
# 学习JavaScript数据结构与算法——算法篇(一).md #

## 目录 ##

1. 冒泡排序

## 冒泡排序 ##

冒泡排序是所有排序算法中性能最差的一种，但也是最常考查、也是最简单的一种排序算法。原理是将数组中元素升序排序(由小到大)，就像气泡从底部升起到顶部一样，冒泡排序因此得名。

示例代码如下:

```js
function bubbleSort(arr) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr.length - i - 1; j++) {
            var aux = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = aux;
        }
    }
}
```

使用以下代码做测试:

```js
var arr = [5, 4, 3, 2, 1];
console.log(arr); // [5,4,3,2,1]
bubbleSort(arr);
console.log(arr); // [1,2,3,4,5]
```

冒泡排序的工作过程图为:

![image](https://raw.githubusercontent.com/WebUnion-core/anthill/master/WJT20/images/w126.png)

```
ID         : 128
DATE       : 2019/02/25
AUTHER     : WJT20
TAG        : Web前端
```

3     2    1     4     5
