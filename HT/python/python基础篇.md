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

![Alt text](http://www.runoob.com/wp-content/uploads/2013/11/o99aU.png "UML类图")

加号 + 是字符串的连接符， 星号 * 表示复制当前字符串，紧跟的数字为复制的次数。实例如下：

```py
str = 'Runoob'
 
print (str)          # 输出字符串
print (str[0:-1])    # 输出第一个到倒数第二个的所有字符
print (str[0])       # 输出字符串第一个字符
print (str[2:5])     # 输出从第三个开始到第五个的字符
print (str[2:])      # 输出从第三个开始的后的所有字符
print (str * 2)      # 输出字符串两次
print (str + "TEST") # 连接字符串
```

**如果不想让反斜杠“\”发生转义:
```py
print(r'Ru\noob')

# Ru\noob
```
另外，反斜杠(\)可以作为续行符，表示下一行是上一行的延续。也可以使用 """...""" 或者 '''...''' 跨越多行。

```py
word = "123\
asdasdasd"

print(word)

word2 = """asdasdasdas
asdasdas
asdasd
asdasd
asdasd"""

print(word2)
```

> 1、反斜杠可以用来转义，使用r可以让反斜杠不发生转义。<br/>
> 2、字符串可以用+运算符连接在一起，用*运算符重复。<br/>
> 3、Python中的字符串有两种索引方式，从左往右以0开始，从右往左以-1开始。<br/>
> 4、Python中的字符串不能改变。

## List（列表）

类似数组吧

![Alt text](http://www.runoob.com/wp-content/uploads/2013/11/list_slicing1.png "列表")

加号 + 是列表连接运算符，星号 * 是重复操作。如下实例：

```py
list = [ 'abcd', 786 , 2.23, 'runoob', 70.2 ]
tinylist = [123, 'runoob']
 
print (list)            # 输出完整列表 ['abcd', 786, 2.23, 'runoob', 70.2]
print (list[0])         # 输出列表第一个元素 abcd
print (list[1:3])       # 从第二个开始输出到第三个元素 [786, 2.23]
print (list[2:])        # 输出从第三个元素开始的所有元素 [2.23, 'runoob', 70.2]
print (tinylist * 2)    # 输出两次列表 [123, 'runoob', 123, 'runoob']
print (list + tinylist) # 连接列表 ['abcd', 786, 2.23, 'runoob', 70.2, 123, 'runoob']
```

> 1、List写在方括号之间，元素用逗号隔开。<br/>
> 2、和字符串一样，list可以被索引和切片。<br/>
> 3、List可以使用+操作符进行拼接。<br/>
> 4、List中的元素是可以改变的。

# Tuple（元组）

元组（tuple）与列表类似，不同之处在于元组的元素不能修改。元组写在小括号 () 里，元素之间用逗号隔开。

元组中的元素类型也可以不相同：

```py
tuple = ( 'abcd', 786 , 2.23, 'runoob', 70.2  )
tinytuple = (123, 'runoob')
 
print (tuple)             # 输出完整元组
print (tuple[0])          # 输出元组的第一个元素
print (tuple[1:3])        # 输出从第二个元素开始到第三个元素
print (tuple[2:])         # 输出从第三个元素开始的所有元素
print (tinytuple * 2)     # 输出两次元组
print (tuple + tinytuple) # 连接元组
```

元组与字符串类似，可以被索引且下标索引从0开始，-1 为从末尾开始的位置。也可以进行截取（看上面，这里不再赘述）。

其实，可以把字符串看作一种特殊的元组。

虽然元组的元素不可变，但是它可以包含可变的对象：

```py
l1 = [1,2,3,4]

t1 = (1,2,l1)

l1[0] = "123"

print(t1)
```


语法规则：

```py
tup1 = ()    # 空元组
tup2 = (20,) # 一个元素，需要在元素后添加逗号
```

**string、list和tuple都属于sequence（序列）。**

> 1、与字符串一样，元组的元素不能修改。<br/>
> 2、元组也可以被索引和切片，方法一样。<br/>
> 3、注意构造包含0或1个元素的元组的特殊语法规则。<br/>
> 4、元组也可以使用+操作符进行拼接。

## Set（集合）

集合（set）是一个无序不重复元素的序列。

基本功能是进行成员关系测试和删除重复元素。

可以使用大括号 { } 或者 set() 函数创建集合，注意：创建一个空集合必须用 set() 而不是 { }，因为 { } 是用来创建一个空字典。

创建格式：
```py
parame = {value01,value02,...}
或者
set(value)
```

```py
student = {'Tom', 'Jim', 'Mary', 'Tom', 'Jack', 'Rose'}
 
print(student)   # 输出集合，重复的元素被自动去掉
 
# 成员测试
if 'Rose' in student :
    print('Rose 在集合中')
else :
    print('Rose 不在集合中')
 
 
# set可以进行集合运算
a = set('abracadabra')
b = set('alacazam')
 
print(a)
 
print(a - b)     # a和b的差集
 
print(a | b)     # a和b的并集
 
print(a & b)     # a和b的交集
 
print(a ^ b)     # a和b中不同时存在的元素
```

## Dictionary（字典）

类似json

```py
dict = {}
dict['one'] = "1 - 菜鸟教程"
dict[2]     = "2 - 菜鸟工具"
 
tinydict = {'name': 'runoob','code':1, 'site': 'www.runoob.com'}
 
 
print (dict['one'])       # 输出键为 'one' 的值
print (dict[2])           # 输出键为 2 的值
print (tinydict)          # 输出完整的字典
print (tinydict.keys())   # 输出所有键
print (tinydict.values()) # 输出所有值
```

