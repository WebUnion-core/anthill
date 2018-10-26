import re

a = "C|C++|Java|Python|Javascript"

r = re.findall('PHP', a)

if len(r) > 0:
    print("字符串中包含PHP")
else:
    print("不包含")


# 提取其中的数字

b = 'd0adsa1das3n45|1aasqq1'
r2 = re.findall('\D', b)
astr = ''

for v in r2:
    astr += v
    
print(astr)

c = 'abc,ssd,afc,qwed,adc,aodfc'

r3 = re.findall('a[^bfd][d][a-f]c', c);

print(r3)

# 概括字符集
d = "asdas9asd9121__dasda  asd asdas "
# \s \w \S \W

r4 = re.findall('\s', d)

print(r4)

# 数量词

e = 'javascript 1python12341 worid ssas'

# 贪婪和非贪婪模式
r5 = re.findall('[a-z]{3,10}', e)
r6 = re.findall('[a-z]{3,10}?', e)

print(r5)
print(r6)


# 边界匹配
qq = "836717428"

r7 = re.findall('^\d{4,8}$', qq)

print(r7)