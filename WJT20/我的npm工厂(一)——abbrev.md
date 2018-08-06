
# 我的npm工厂(一)——abbrev #

> node_modules 是一个好东西，里面汇集了无数的 npm 模块，这些 npm 模块是形形色色程序员的智慧结晶，我一直想了解别人写的代码是怎样的，或许仔细分析别人的代码可以进一步提升我等的编程能力，于是乎，我决定去挖掘 node_modules 这片金矿。本文解析的是第一个 npm 模块——abbrev。

## 目录 ##

1. [用法介绍](#href1)
2. [代码解析](#href2)

## <a name="href1">用法介绍</a> ##

abbrev 的官方文档直截了当地把此模块的用法展示了出来:  

```js
var abbrev = require("abbrev");
abbrev("foo", "fool", "folding", "flop");
```

返回结果:  

```js
{
    fl: 'flop',
    flo: 'flop',
    flop: 'flop',
    fol: 'folding',
    fold: 'folding',
    foldi: 'folding',
    foldin: 'folding',
    folding: 'folding',
    foo: 'foo',
    fool: 'fool'
}
```

由此可知，abbrev 是一个根据传入的多个字符串参数返回所有模糊匹配的字符串组合。认真多看几遍这个官方文档后，你清楚这个模块的用处了吗？如果仍不清楚，我告诉你，这个模块的其中一个用途，那就是命令行参数的模糊匹配，举个例子:  

```
npm run dev build

等同于:
npm run dev bu
npm run dev bui
...
```

以上命令中，build 这个参数其实已经够短了，一共5个字符，某些开发者为求高效，觉得5个字符还是太长(呵呵~)，其实某些 linux 命令也有体现"高效"这一点，比如使用"rm"而不是"remove"等等，使用 abbrev 正好能达到我们的目的。

```js
const abbrev = require("abbrev");
console.log(abbrev("build"));
/*
 * 返回结果:
 * {
 *     b: 'build',
 *     bu: 'build',
 *     bui: 'build',
 *     buil: 'build',
 *     build: 'build'
 * }
 */
```

如何处理返回的数据我就不细说了，根据返回的数据，参数"build"一共有5个可用的模糊匹配结果，也就是说至少有5条等效命令。

## <a name="href2">代码解析</a> ##

明白其用途后，再来看看其代码的具体实现，这里只摘取其中部分有价值的代码。

片段1:

```js
// 导出(export)的模块接口
function abbrev(list) {
    // 第一步包装。如果第一个参数不是数组(参数为空时取默认值undefined)，或者不止一个参数时，借Array构造函数的slice方法应用到 arguments上，实际上就是将类数组对象arguments转换为真正意义上的数组
    if (arguments.length !== 1 || !Array.isArray(list)) {
        list = Array.prototype.slice.call(arguments, 0)
    }

    // 第二步包装。构造一个新数组args，接着遍历list，逐个检查数组元素是否为字符串类型，如果是则装入args，否则强制转为字符串类型后再装入args
    for (var i = 0, l = list.length, args = []; i < l; i++) {
        args[i] = typeof list[i] === "string" ? list[i] : String(list[i])
    }

    // 第三步包装。先回顾下sort的用法，没错，根据传入的排序回调函数对所有数组元素进行排序(想想排序回调函数返回负数、零和正数分别表示什么意思?)，lexSort之后再讲解
    args = args.sort(lexSort)

    var abbrevs = {},
        prev = ""
    for (var i = 0, l = args.length; i < l; i++) {
        /*
         * 局部变量说明:
         * current: 当前数组元素
         * next: 下一个数组元素，如果没有下一个数组元素，取默认值——空字符串
         * nextMatches: 检查当前元素与下一元素相同位置的字符是否相等
         * prevMatches: 检查当前元素与上一元素相同位置的字符是否相等
         */
        var current = args[i],
            next = args[i + 1] || "",
            nextMatches = true,
            prevMatches = true;

        // 当前元素与下一元素相同，直接跳过，不进行后续操作
        if (current === next) continue

        // 逐个遍历当前元素的每个字符，注意这里用一个cl变量保存当前元素的字符个数
        for (var j = 0, cl = current.length; j < cl; j++) {
            // 用charAt获取指定位置的字符，之所以用a.charAt(n)而不用a[n]，应该是为了将字符串操作与数组操作明确分开，考虑也很周到
            var curChar = current.charAt(j)
            nextMatches = nextMatches && curChar === next.charAt(j)
            prevMatches = prevMatches && curChar === prev.charAt(j)
            if (!nextMatches && !prevMatches) {
                // 如果与上一个元素和下一个元素校验结果不相等，则j先加一然后跳出循环
                j++
                break
            }
        }

        // 在这里把当前元素(current)赋值给存储上一元素的变量(prev)
        prev = current

        // 到这里知道为什么在上边的循环中校验结果不相等情况下j要加一了吗？原因是"索引+1=真实位置"。如果校验终止的真实位置j恰好是最后一个位置，那么会与字符长度相等(废话说的有点多了~)，此时就可以把current保存到最终返回结果中了
        if (j === cl) {
            abbrevs[current] = current
            continue
        }

        // 如果校验在某一位中断了，就进行以下这个骚循环(这里要仔细分析)，首先用a表示字符串起始位置到中断位置的子串，然后通过循环，逐个取出剩余的字符拼接到a后面，然后把拼接后的字符串保存到最总返回结果中
        for (var a = current.substr(0, j); j <= cl; j++) {
            abbrevs[a] = current
            a += current.charAt(j)
        }
    }

    // 最终返回结果
    return abbrevs
}
```

片段2:  

```js
// 这段代码也很高级，主要功能是把片段1的abbrev方法绑定到Array和Object的原型(prototype)上，这样就可以像调用a.join()等方法一样了
function monkeyPatch() {
    // 用到了Object.defineProperty，用于给对象设置一些具有更具体功能的属性值
    Object.defineProperty(Array.prototype, 'abbrev', {
        value: function () {
            return abbrev(this)
        }, // 设置值
        enumerable: false, // 设置不可枚举
        configurable: true, // 设置可以动态改变
        writable: true // 设置可写
    })

    Object.defineProperty(Object.prototype, 'abbrev', {
        value: function () {
            return abbrev(Object.keys(this)) // Object.keys用于把"对象"的键统统取出包装成一个数组(需要查一下这个方法是否有兼容问题)
        },
        enumerable: false,
        configurable: true,
        writable: true
    })
}
```

片段3:  

```js
// 片段1中的sort排序回调函数，通过连续三目运算符进行字符码的升序排序(应该是升序吧?)
function lexSort(a, b) {
    return a === b ? 0 : a > b ? 1 : -1
}
```

---

```
ARTICLE_ID : 77
POST_DATE : 2018/06/12
AUTHER : WJT20
```
