
# JavaScript设计模式重啃——迭代器模式 #

## 目录 ##

1. [介绍](#href1)
2. [实现一个简单的迭代器](#href2)
3. [内部迭代器和外部迭代器](#href3)
4. [迭代类数组对象](#href4)
5. [其他常用迭代器](#href5)
 [](#href6)   1. 倒序迭代器
 [](#href7)   2. 中止迭代器

## <a name="href1">介绍</a> ##

迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部实现。迭代器模式可以把迭代的过程从业务逻辑中分离出来，在使用迭代器模式之后，即使不关心对象的内部构造，也可以按顺序访问其中的每个元素。

---

## <a name="href2">实现一个简单的迭代器</a> ##

迭代器模式的目的就是实现对聚合对象中的各个元素的循环访问。jQuery 中的 $.each 函数等都是迭代器模式的应用实例。实现一个简单的迭代器并不难，示例代码如下：

```
var each = function(arr, callback) {
    for(var i = 0; i < arr.length; i++) {
        callback.call(arr[i], i, arr[i]);
    }
}

each([1, 2, 3], function(i, e) {
    console.log(i, e);
});
```

---

## <a name="href3">内部迭代器和外部迭代器</a> ##

迭代器可以分为内部迭代器和外部迭代器，划分依据是迭代规则是在内部还是外部定义的。

前面所写的简单的迭代器属于内部迭代器，在内部定义好迭代规则后，外部只需要一次初始调用即可。

内部迭代器的优点是，外部不用关心迭代器内部的实现，跟迭代器的交互也仅是一次初始调用，但这刚好也是内部迭代器的缺点，由于内部迭代器的迭代规则已经被提前规定，就无法实现两个及两个以上的数组迭代。

外部迭代器必须显式地请求迭代下一个元素，它增加了一些调用的复杂性，同时也增强了迭代器的灵活性，我们可以手动控制迭代的过程或者顺序，一个简单的外部迭代器的实现代码如下：

```
var Iterator = function(obj) {
    var current = 0;

    var next = function() {
        current += 1;
    };

    var isDone = function() {
        return current >= obj.length;
    };

    var getCurrItem = function() {
        return obj[current];
    };

    return {
        next: next,
        isDone: isDone,
        getCurrItem: getCurrItem
    }
};
```

---

## <a name="href4">迭代类数组对象</a> ##

迭代器模式除了可以迭代数组，还能迭代字符串、arguments等类数组对象，jQuery 里的 $.each 方法封装的迭代行为如下：

```
$.each = function(obj, callback) {
    var value,
        i = 0,
        length = obj.length;

    if (obj.constructor === Array) {
        for(; i < length; i++) {
            value = callback.call(obj[i], i, obj[i]);

            if (value === false) {
                break;
            }
        }
    } else {
        for(i in obj) {
            value = callback.call(obj[i], i, obj[i]);
            if (value === false) {
                break;
            }
        }
    }

    return obj;
}
```

---

## <a name="href5">其他常用迭代器</a> ##

### <a name="href5-1">倒序迭代器</a> ###

迭代器模式提供了循环访问一个聚合对象中每个元素的方法，但它没有规定我们以顺序、倒序还是中序来循环遍历一个对象，一个简单的倒序迭代器的实现代码如下：

```
var reverseEach = function(ary, callback) {
    for(var l = ary.length - 1; l >= 0; l--) {
        callback(l, ary[l]);
    }
};
```

### <a name="href5-2">中止迭代器</a> ###

所谓中止迭代器，就是封装了一个类似 break 的可以跳出循环的功能，实现代码如下：

```
var each = function(ary, callback) {
    for(var i = 0; i < ary.length; i++) {
        if (callback(i, ary[i]) === false) {
            break;
        }
    }
};
```

---

```
ARTICLE_ID : 39
POST_DATE : 2017/11/6
AUTHER : WJT20
```
