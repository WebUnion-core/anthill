fo = open("./className/showname.py", "w")

print("文件名: ", fo.name)
print("是否已关闭 : ", fo.closed)
print("访问模式 : ", fo.mode)
print("末尾是否强制加空格 : ", fo.softspace)