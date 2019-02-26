
# 学习JavaScript数据结构与算法——排序算法篇 #

## 目录 ##

1. [冒泡排序](#href1)
2. [选择排序](#href2)
3. [插入排序](#href3)
4. [归并排序](#href4)
5. [快速排序](#href5)

## <a name="href1">冒泡排序</a> ##

冒泡排序是所有排序算法中性能最差的一种，但也是最常考查、也是最简单的一种排序算法。原理是将数组中元素升序排序(由小到大)，就像气泡从底部升起到顶部一样，冒泡排序因此得名。

代码实现:

```js
function bubbleSort(arr) {
    var length = arr.length;
    for (var i = 0; i < length; i++) {
        for (var j = 0; j < length - i - 1; j++) {
            var aux = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = aux;
        }
    }
}
```

测试用例:

```js
var arr = [5, 4, 3, 2, 1];
console.log(arr); // [5,4,3,2,1]
bubbleSort(arr);
console.log(arr); // [1,2,3,4,5]
```

工作过程:

![image](https://raw.githubusercontent.com/WebUnion-core/anthill/master/WJT20/images/w126.png)

## <a name="href2">选择排序</a> ##

选择排序算法是一种原址比较排序算法，大致的思路是找出数据结构中的最小值并将其放置在第一位，接着找到第二小的值并将其放置在第二位，以此类推。

代码实现:

```js
function selectSort(arr) {
    var length = arr.length;
    var indexMin;
    for (var i = 0; i < length - 1; i++) {
        indexMin = i;
        for (var j = i; j < length; j++) {
            if (arr[indexMin] > arr[j]) {
                indexMin = j;
            }
        }
        if (i !== indexMin) {
            var aux = arr[indexMin];
            arr[indexMin] = arr[i];
            arr[i] = aux;
        }
    }
}
```

测试用例:

```js
var arr = [5, 4, 3, 2, 1];
console.log(arr); // [5,4,3,2,1]
selectSort(arr);
console.log(arr); // [1,2,3,4,5]
```

工作过程:

![image](https://raw.githubusercontent.com/WebUnion-core/anthill/master/WJT20/images/w127.png)

## <a name="href3">插入排序</a> ##

插入排序的原理是将目标数组项与其之前的元素进行比较，找到它应该插入的位置(左小右大)，以此类推。

代码实例:

```js
function insertionSort(arr) {
    var length = arr.length;
    var j;
    var temp;
    for (var i = 1; i < length; i++) {
        j = i;
        temp = arr[i];
        while (j > 0 && arr[j - 1] > temp) {
            arr[j] = arr[j - 1];
            j--;
        }
        arr[j] = temp;
    }
}
```

测试用例:

```js
var arr = [5, 4, 3, 2, 1];
console.log(arr); // [5,4,3,2,1]
insertionSort(arr);
console.log(arr); // [1,2,3,4,5]
```

工作过程:

![image](https://raw.githubusercontent.com/WebUnion-core/anthill/master/WJT20/images/w128.png)

## <a name="href4">归并排序</a> ##

归并排序是第一个可以被实际使用的排序算法，其性能比前面三个排序算法要好得多，其复杂度为`O(nlog^n)`。

归并排序是一种分治算法，其思想是将原始数组切分成较小的数组，直到每个数组只有一个位置，接着将小数组归并成较大的数组，直到最后只有一个排序完毕的大数组。由于是分治法，归并排序也是递归的。

代码实现:

```js
function merge(left, right) {
    var result = [];
    var il = 0;
    var ir = 0;

    while (il < left.length && ir < right.length) {
        if (left[il] < right[ir]) {
            result.push(left[il++]);
        } else {
            result.push(right[ir++]);
        }
    }

    while (il < left.length) {
        result.push(left[il++]);
    }

    while (ir < right.length) {
        result.push(right[ir++]);
    }

    return result;
}

function mergeSortRec(arr) {
    var length = arr.length;

    if (length === 1) {
        return arr;
    }

    var mid = Math.floor(length / 2);
    var left = arr.slice(0, mid);
    var right = arr.slice(mid, length);

    return merge(mergeSortRec(left), mergeSortRec(right));
}
```

测试用例:

```js
var arr = [5, 4, 3, 2, 1];
console.log(arr); // [5,4,3,2,1]
arr = mergeSortRec(arr);
console.log(arr); // [1,2,3,4,5]
```

工作过程:

```
s([5,4,3,2,1])
= m(s([5,4]), s([3,2,1]))
= m(m([5], [4]), m([3], s([2,1])))
= m([4,5], m([3], m([2], [1])))
= m([4,5], m([3], [1,2]))
= m([4,5], [1,2,3])
= [1,2,3,4,5]
```

这个工作流程有些复杂，需要耐心分析理解。

## <a name="href5">快速排序</a> ##

快速排序也许是最常用的排序算法了，复杂度与归并排序一样，都是`O(nlog^n)`，但它的性能却比其他同复杂度的排序算法要好。快速排序也用到分治的方法，它比前面几种排序算法都要复杂得多，主要分为以下几个步骤:

1. 从数组中选择中间的一项作为主元;
2. 创建两个指针，左边一个指向数组第一项，右边一个指向数组最后一项。移动左指针直到找到一个比主元大的元素，接着移动右指针直到找到一个比主元小的元素，然后交换它们，重复这个过程，直到左指针超过右指针。此过程会将比主元大的值都排在主元之前，而比主元大的值都排在主元之后。这一步叫作"划分操作";
3. 对划分后的小数组重复之前的两个步骤，直至数组已完全排序。

代码实现:

```js
function quick(arr, left, right) {
    var index;
    if (arr.length > 1) {
        index = partition(arr, left, right);
        if (left < index - 1) {
            quick(arr, left, index - 1);
        }
        if (index < right) {
            quick(arr, index, right);
        }
    }
}

function partition(arr, left, right) {
    var pivot = arr[Math.floor((left + right) / 2)];
    var i = left;
    var j = right;
    while (i <= j) {
        while (arr[i] < pivot) {
            i++;
        }
        while (arr[j] > pivot) {
            j--;
        }
        if (i <= j) {
            var aux = arr[i];
            arr[i] = arr[j];
            arr[j] = aux;
            i++;
            j--;
        }
    }
    return i;
}
```

测试用例:

```js
var arr = [5, 4, 3, 2, 1];
console.log(arr); // [5,4,3,2,1]
quick(arr, 0, arr.length - 1);
console.log(arr); // [1,2,3,4,5]
```

工作过程:

```
q([5,4,3,2,1], 0, 4)
-> p([5,4,3,2,1], 0, 4)
-> index:3,arr:[1,2,3,4,5]
= q([1,2,3,4,5], 3, 4)
-> p([1,2,3,4,5], 3, 4)
-> index:4,arr:[1,2,3,4,5]
```

```
ID         : 128
DATE       : 2019/02/25
AUTHER     : WJT20
TAG        : 编程知识
```
