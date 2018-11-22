
# npm源码解读系列——aproda #

## 目录 ##

1. [用法介绍](#href1)
2. [代码解析](#href2)
    1. [片段1](#href2-1)
    2. [片段2](#href2-2)
    3. [片段3](#href2-3)

## <a name="href1">用法介绍</a> ##

aproda 是一个函数参数数据类型检查器，众所周知，JavaScript 是一门弱类型编程语言，定义变量的时候无需实现规定其数据类型，只有当变量被赋值的时候，变量的数据类型才会确定下来，并且，一个变量可以赋不同类型的值，这个特性可以说是弱类型编程语言的优点，也可以说是其弱点。

函数的形参是一种特殊的变量，因为没有约束其的数据类型，所以在函数内部往往不知道传入的参数是什么数据类型，如果接收到错误的数据类型，可能导致后续执行的程序中断，aproda 这个模块就是为了应对这种情况而设计，简单来说，这是一个形参数据类型检查器，如果传入的数据类型不正确就及时抛出错误，将风险最小化。

官方的示例代码如下:

```js
var validate = require("aproba")

function myfunc(a, b, c) {
  // `a` must be a string, `b` a number, `c` a function
  validate('SNF', arguments) // [a,b,c] is also valid
}

myfunc('test', 23, function () {}) // ok
myfunc(123, 23, function () {}) // type error
myfunc('test', 23) // missing arg error
myfunc('test', 23, function () {}, true) // too many args error
```

用法并不复杂，需要注意的一个地方是 validate 的第一个参数，这个参数就是约束形参数据类型的关键，每个字符代表某种数据类型，从而约束具体位置的形参必须是什么数据类型，可以使用的字符及各自所代表的含义如下:

| 种类 | 描述
| :--: | :----------
| *    | 任意类型，即不限制
| A    | 类数组对象和数组(Array)
| S    | 字符串
| N    | 数值
| F    | 函数
| O    | 对象(不包括 Array 和 Error)
| B    | 布尔值
| E    | Error 或 null
| Z    | null

## <a name="href2">代码解析</a> ##

aproba 的代码逻辑相较之前讲解的 abbrev 模块要复杂的多，在下解析这些代码也花费了不少时间，望各位耐心去看。

### <a name="href2-1">片段1</a> ###

```js
function isArguments (thingy) {
    return thingy != null && typeof thingy === 'object' && thingy.hasOwnProperty('callee');
}
```

解析:

- 根据函数名确定这个函数用于判断数据是否为 arguments。

- 判断分为三步，首先 thingy 不能是 null，然后 thingy 要是对象，最后用 hasOwnProperty 方法判断 thingy 是否具有 callee 属性。

- 如果没有第一步判断，那么 null 这个值最终会走到第三步判断导致会报错，原因是第二步`typeof null === 'object'`返回的是 true，null 还有 hasOwnProperty 这个方法，最终导致报错。

- arguments 是一个特殊的对象，其主要用途是保存函数参数，这个对象有一个独特的名为 callee 的属性，该属性是一个指针，指向拥有这个 arguments 对象的函数，第三步的判断依据就是是否具有 callee 这个属性。

### <a name="href2-2">片段2</a> ###

```js
var types = {
    '*': {label: 'any', check: function () { return true }},
    A: {label: 'array', check: function (thingy) { return Array.isArray(thingy) || isArguments(thingy) }},
    S: {label: 'string', check: function (thingy) { return typeof thingy === 'string' }},
    N: {label: 'number', check: function (thingy) { return typeof thingy === 'number' }},
    F: {label: 'function', check: function (thingy) { return typeof thingy === 'function' }},
    O: {label: 'object', check: function (thingy) { return typeof thingy === 'object' && thingy != null && !types.A.check(thingy) && !types.E.check(thingy) }},
    B: {label: 'boolean', check: function (thingy) { return typeof thingy === 'boolean' }},
    E: {label: 'error', check: function (thingy) { return thingy instanceof Error }},
    Z: {label: 'null', check: function (thingy) { return thingy == null }}
}
```

解析:

- 可以看出，这是一个存放所有检验类型的数据体，这个数据体怎么使用我们还不得而知，label 字段可以理解为每个字符所代表的数据类型的全称，check 这个字段应该就是一个检查器，返回的都是布尔值。

- "A"类型的 check，检查的数据类型是数组和类数组对象 arguments，用 Array.isArray 方法判断是否为数组，用片段1的 isArguments 函数判断是否为 arguments。

- "O"类型的 check 是所有类型的 check 中最复杂的，首先用 typeof 判断是否为"object"，但是这样还远远不够，JavaScript 中所有的变量都属于对象，null、类数组对象还有 Error 实例也属于对象，是要剔除的目标，所以后面的几步判断就是要剔除这些“杂质”。

- "E"类型的 check 也是与众不同的，Error 实例对象是由 Error 构造函数产生的(由 new 关键字生成)，要用 instance 来判断。

### <a name="href2-3">片段3</a> ###

```js
function addSchema (schema, arity) {
    var group = arity[schema.length] = arity[schema.length] || []
    if (group.indexOf(schema) === -1) group.push(schema)
}

var validate = module.exports = function (rawSchemas, args) {
    if (arguments.length !== 2) throw wrongNumberOfArgs(['SA'], arguments.length)
    if (!rawSchemas) throw missingRequiredArg(0, 'rawSchemas')
    if (!args) throw missingRequiredArg(1, 'args')
    if (!types.S.check(rawSchemas)) throw invalidType(0, ['string'], rawSchemas)
    if (!types.A.check(args)) throw invalidType(1, ['array'], args)

    var schemas = rawSchemas.split('|')
    var arity = {}

    schemas.forEach(function (schema) {
        for (var ii = 0; ii < schema.length; ++ii) {
            var type = schema[ii]
            if (!types[type]) throw unknownType(ii, type)
        }

        if (/E.*E/.test(schema)) throw moreThanOneError(schema)

        addSchema(schema, arity)

        if (/E/.test(schema)) {
            addSchema(schema.replace(/E.*$/, 'E'), arity)
            addSchema(schema.replace(/E/, 'Z'), arity)
            if (schema.length === 1) addSchema('', arity)
        }
    });

    var matching = arity[args.length]
    if (!matching) {
        throw wrongNumberOfArgs(Object.keys(arity), args.length)
    }

    for (var ii = 0; ii < args.length; ++ii) {
        var newMatching = matching.filter(function (schema) {
            var type = schema[ii]
            var typeCheck = types[type].check
            return typeCheck(args[ii])
        })

        if (!newMatching.length) {
            var labels = matching.map(function (schema) {
                return types[schema[ii]].label
            }).filter(function (schema) {
                return schema != null
            })
            throw invalidType(ii, labels, args[ii])
        }

        matching = newMatching
    }
}
```

解析:

- 看到`module.exports`就知道 validate 这个函数就是模块导出的接口，rawSchemas 参数是由代表不同数据类型的字符组合而成的字符串，args 参数是最外层传入的形参(检测目标)。

- 函数内部一开始就用了5个连续的 if 语句:
    1. 第一个 if，判断 validate 的参数是不是两个，如果不是，则抛出一个错误，这个错误对象由 wrongNumberOfArgs 返回;
    2. 第二个和第三个 if，分别判断是否有传入 rawSchemas 和 args 参数，如果没有，则抛出由 missingRequiredArg 返回的错误信息(传入的参数不同);
    4. 第四个和第五个 if，分别用 types.S.check 和 types.A.check 判断传入的 rawSchemas 是否为字符串和传入的 args 参数是否为数组或类数组对象，如果检查不通过，则抛出由 invalidType 返回的错误信息(传入的参数不同)。

- 如果 rawSchemas 参数是一个用"|"分隔的包含多个检测字符子串的字符串，那么用`split`拆分为数组，保存到 schemas 变量中，接着遍历 schemas，进行下一步检测。首先检测每个检测子串中的字符，如果检测到有 types 中不存在的类型代表字符，则抛出由 unknownType 返回的错误信息；用`/E.*E/`正则匹配检测子串中是否包含两个以上的"E"，如果有，抛出由 moreThanOneError 返回的错误信息。

- addSchema 是一个填充 arity 对象的函数，以检测子串的长度为键，每个键的值是一个数组，由每个长度相同的检测子串组成，函数内部，用`indexOf`判断作为参数的检测子串是否已经存在于对应位置的数组中，`indexOf`这个方法不仅可以用于字符串，还可以用于数组(之前一直以为只能用于字符串...)。

- 调用了一次 addSchema 之后，用`/E/`正则匹配检测子串中是否含有"E"，如果有，将"E"之后的字符全部去掉(不影响原串)然后用 addSchema 装填；接着将检测子串中的"E"替换为"Z"(也是不影响原串)，然后再进行一次 addSchema 装填；如果检测子串只有一个字符且为"E"，则传一个空字符串给 addSchema 装填。

- 下一步检测目标形参的个数与检测子串的位数是否有匹配的，如果没有，说明传入的检测目标形参个数不正确，抛出由 wrongNumberOfArgs 返回的错误信息，其中，传给 wrongNumberOfArgs 的第一个参数使用了`Object.key`方法，此方法的作用是将作为参数的对象的所有可枚举的键都提取出来组成数组返回。

- 接下来就是将所有检测子串(matching)对应的检测方法(check)应用到相应位置的检测目标形参上，所以又要构建一个循环，在循环中首先用到了一个不太常用的数组方法——`filter`，这个方法会创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。

- 如果检测方法试了没有通过的(对应`!newMatching.length`)，那么就检查 types 里面对应的类型代表字符的 label 是否为 null，接着抛出由 invalidType 返回的错误信息。这个步骤中用了另一个少见的数组方法——`map`，这个方法的作用是先遍历调用的数组，然后将回调参数中返回的值组合成一个新数组返回。

- 每次检测完毕都会把 newMatching 赋给 matching，目的应该是将检测不通过的子串去掉。

---

```
ARTICLE_ID : 80
POST_DATE : 2018/06/16
AUTHER : WJT20
```
