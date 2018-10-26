from enum import Enum
from enum import IntEnum, unique
from functools import reduce

# 枚举类型 不能实例化  是单例模式
print("=========枚举=========")
# 枚举
class Vip(Enum):
    YELLOW = 1
    YELLOWTWO = 1

# print(Vip.YELLOW.value) # 枚举值
# print(Vip.YELLOW.name) # 枚举名字
# print(Vip.YELLOW) # 枚举类型

# for v in Vip:
#     print(v)

a = 1

print(Vip(a))

# @unique # 装饰器 不允许相同枚举值
class Vip2(IntEnum):
    YELLOW = 1
    YELLOWTWO = 1

print("=========global=========")
# global 关键字

origin = 0

def go(step):
    global origin
    new_pos = origin + step
    return new_pos

print("=========nonlocal=========")
# nonlocal 关键之

def factory(pos):
    def go(step):
        nonlocal pos
        new_pos = pos + step
        pos = new_pos
        return new_pos
    return go

fn1 = factory(origin)
print(fn1(2))
print(fn1(3))
print(fn1(4))

print("=========lambda=========")
# 匿名函数 lambda
# 只能是表达式

f = lambda x,y: x*y

print(f(5,2))

f2 = lambda x,y: 5
# 不能含有运算等
# f2 = lambda x,y: origin = 1

print(f2(1,2))

# 三元表达式

x = 1
y = 2

r = x if x > y else y

print(r)

print("=========map=========")
# map
list_x = [1,2,3,4,5,6,7]
list_y = [1,2,3,4,5,6,6,7,8,9,10]

def square(x):
    return x * x

# r = map(square, list_x)
# r = map(lambda x: x * x, list_x)
## 长度是最下长度↓↓↓↓
r = map(lambda x,y: x * x + y, list_x, list_y)

print(list(r))
print("=========reduce=========")
# 没有y 取列表中的两个，然后和第三个第四个第五个计算
# 连续计算，连续调用lambda
# 用上一次的结果和y计算
r = reduce(lambda x,y:x+y, list_x)

print(r)

# 初始值， 10 + 1 11 + 2 13 +3
r = reduce(lambda x,y:x+y, list_x, 10)

print(r)
print("=========filter=========")
print("根据返回值判断")
list_x = [0,1,4,0,5,6,7]
print(list_x,"\n返回后")
r = filter(lambda x:x,list_x)
print(list(r))

# 装饰器
# 对修改是封闭的 读拓展是开放的
print("=========装饰器=========")

import time

# *args 任意参数
def decorator(fun):
    def wraaper(*args):
        print("decorator",time.time())
        fun(*args)
    return wraaper

## 带参数

@decorator
def f1(name):
    print("this is a funtion "+name)

f1("asdasd")

print("=========**kw=========")
# *args 任意参数
def decorator2(fun):
    def wraaper(*args,**kw):
        print("decorator",time.time())
        fun(*args,**kw)
    return wraaper

## 带参数

@decorator2
def f2(name,**kw):
    print("this is a funtion "+name)
    print(kw)

f2("asdasd",c = 'C',d = '12121212')
