from enum import Enum
from enum import IntEnum, unique

# 枚举类型 不能实例化  是单例模式

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

@unique # 装饰器 不允许相同枚举值
class Vip2(IntEnum):
    YELLOW = 1
    YELLOWTWO = 1
