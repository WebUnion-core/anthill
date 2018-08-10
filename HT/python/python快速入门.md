**本文主要记录本人学习python不理解的东西，并没有一一将python的数据结构等都给做笔记。**

## python 函数

python和其他编程语言的语法有很大的不同，所以我疑惑它是如何定义函数的。

定义一个函数需要注意的地方

- 以 def 关键字开头
- 函数内容以冒号起始，并且缩进
- 函数的第一行语句可以选择性地使用文档字符串—用于存放函数说明
- return [表达式] 结束函数，选择性地返回一个值给调用方。不带表达式的return相当于返回 None

```py
def showName( name ):
    "打印名字"
    print(name)
    return
```

## python 模块

大多数学习前端的小伙伴都接触过模块化编程，一个.js文件就是一个模块，再python中，一个.py的文件也是一个模块。

showname.py:

```py
def showName( name ):
    print(name)
    return
```

### **引入模块**

引入模块使用的是 improt 关键字

```py
import module

module.showName( "洪涛" )

# module.py
def showName( name ):
    print( name )
    return
```

> 但是我遇到了一个问题，同目录下 我们直接import就可以引入，但是要引入其他目录中的module呢.

在javascript中引入其他目录中的module通常是:
```js
import module from './modules/module.js'
```

但是在python中是这样的:
```py
from modules.module import showName

showName("洪涛")
```

## Python 日期和时间

天真的以为可以这么写
```py
import time

ticks = time.localtime(time.time())
date = ticks.tm_year+"年"+ticks.tm_mon+"月"+ticks.tm_mday+"号"
print("当前时间",date)
```
很显然以上的代码是错误的,在javascript中字符串和数字是可以相加连接的，但是在python中不行,需要将数字转化成string 类型
```py
date = str(ticks.tm_year)+"年"+str(ticks.tm_mon)+"月"+str(ticks.tm_mday)+"号"
```
当然它有内置的格式化的方法
```py
# 格式化成2016-03-20 11:45:39形式
print time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()) 
```

## Python 文件I/O

#### 读取键盘输入

**raw_input函数**
raw_input([prompt]) 函数从标准输入读取一个行，并返回一个字符串（去掉结尾的换行符）：
```py
str = raw_input("请输入：")
print "你输入的内容是: ", str
```

#### input函数

input 可以接收一个Python表达式作为输入，并将运算结果返回。

```py
str = input("请输入：")
print "你输入的内容是: ", str
```

> 请输入：[x*5 for x in range(2,10,2)] <br/>
> 你输入的内容是:  [10, 20, 30, 40]

## 打开和关闭文件

直接上例子，想了解详情直接搜索api

```py
# 打开一个文件
fo = open("./className/showname.py", "w")
print("文件名: ", fo.name)
print("是否已关闭 : ", fo.closed)
print("访问模式 : ", fo.mode)
print("末尾是否强制加空格 : ", fo.softspace)
```
> 本人运行的时候最后一行报错了 AttributeError: '_io.TextIOWrapper' object has no attribute 'softspace' <br/>
> 不知道是什么原因啊，还没找出原因，如果有读者找到请回复本公众号，或者联系本人qq：836717428