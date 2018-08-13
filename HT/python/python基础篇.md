> 使用版本 python3

## 基本数据类型

- python中的变量不需要声明.
- 每个变量前面都必须赋值
- 变量赋值以后变量才会被创建

在 Python 中，变量就是变量，它没有类型，我们所说的"类型"是变量所指的内存中对象的类型。

```py
name = "hongtao"
age = 22
addr = "GZ"
```

## 标准数据类型

- Number
- String
- List
- Tuple
- Set
- Dictionary

**不可变数据:Number, String, Tuple**
**可变数据:List, Dictionary, Set**

### Number(数字)

支持:
**int, float, bool, complex(复数)**

**type()函数**查询变量所指的对象类型

```py
a, b, c, d = 20, 5.5, True, 4+3j
print(type(a), type(b), type(c), type(d))
```

**isinstance**也和type()类似，用法不一样

```py
isinstance(a, int)

# true
```

- type()不会认为子类是一种父类类型。
- isinstance()会认为子类是一种父类类型。

### String(字符串)

python中的字符串用单引号'或双引号"括起来，同时使用反斜杠\转义特殊字符