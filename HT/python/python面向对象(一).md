## 创建类

```py
class ClassName:
   '类的帮助信息'   #类文档字符串
   class_suite  #类体
```

首先我们先来看一下下面的代码：

```py
class MyInfo():
    name = '洪涛'
    age = 22

    def print_info():
        print('name:' + name)
        print('age:' + str(age))

MyInfo = Student()
MyInfo.print_info()
```

执行以上代码，程序出现了报错

```py
TypeError: print_file() takes 0 positional arguments but 1 was given
```
意思我们的 print_info 不需要传入任何参数，但是我们传入了一个参数，可是我们定义的方法里并没有传入参数，这是为什么呢，往下看

## self

**类的方法与普通的函数只有一个特别的区别——它们必须有一个额外的第一个参数名称, 按照惯例它的名称是 self。如果你想用this也行，不过python建议使用self**

> self 代表类的实例，self 在定义类的方法时是必须有的，虽然在调用时不必传入相应的参数。

> 注意，访问属性的时候也要带上self， 如self.name

```py
class MyInfo():
    name = '洪涛'
    age = 22

    def print_info(self):
        print('name:' + self.name)
        print('age:' + self.str(age))

MyInfo = Student()
MyInfo.print_info()
```

## 构造函数

```py
class MyInfo():
    name = ''
    age = 0

    def __init__(self, name, age):
        # 构造函数
        self.name = name
        self.age = age
```

## 类变量

对象外部访问对象内部的值

```py
class MyInfo():
    total = 0

MyInfo.total # 0

```

## 类方法

**classmethod**

```py
class MyInfo():
    total = 0

    @classmethod
    def add(thisClass):
        thisClass.total +=1

MyInfo.add()
MyInfo.total # 1
    
```

## 静态方法

可以访问到类变量，但是访问不到实例变量

相当于一个普通函数

**staticmethod**

```py
class MyInfo():
    @staticmethod
    def add(x, y):
        return x + y

sum = MyInfo.add(1,2)
print(sum) # 3
```