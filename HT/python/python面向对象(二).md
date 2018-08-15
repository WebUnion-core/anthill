## 私有private

python中没有private的关键字

如果想使用私有变量 是由双下划线来定义。当我们访问私有变量的话，会报错，如下

```python

class Student():
    def __init__(self, name):
        self.__name = name

s1 = Student('hongtao')
s1.__name
# eror 'Student' object has no attribute '__name'
```

需要注意,如果在外部给双下划线的变量进行赋值操作，竟然不会报错。而且还会赋值成功，如下

```py

class Student():
    def __init__(self, name):
        self.__name = name

s1 = Student('hongtao')
s1.__name = '123123'
print(s1.__name) # 123123
```

这究竟是为什么呢，继续往下看：
```py 

class Student():
    def __init__(self, name):
        self.__name = name
    
    def getName(self):
        print(self.__name)

s1 = Student('hongtao')
s1.__name = '123123'
print(s1.__dict__)
```
打印结果

```py

{'_Student__name': 'hongtao', '__name': '123123'}
```

**dict是什么**

__dict__是用来存储对象属性的一个字典，其键为属性名，值为属性的值。

从打印结果来看，我们在类里面设置的私有变量已经被改名为_Student__name，而我们从外部是不能定义私有变量的。会直接定义成__name。

再看,就算我们再外面改变了变量。但在我们类的内部访问私有变量还是原来的:

```py

class Student():
    def __init__(self, name):
        self.__name = name
    
    def getName(self):
        print(self.__name)

s1 = Student('hongtao')
s1.__name = '123123'
s1.getName() # hongtao
```

> 猜想：如果我再外部也的定义一个_Student__name的属性呢

如下:

```py

class Student():
    def __init__(self, name):
        self.__name = name
    
    def getName(self):
        print(self.__name)

s1 = Student('hongtao')
s1._Student__name = '123123'
s1.getName() # 123123
```

嗯嗯，结果是，我们的私有属性被改变了。

> 所以呢，python 严格来说应该是没有私有属性的。虽然python内部为我们做了一些处理，但是使用起来时候需要注意的。


## 继承性

