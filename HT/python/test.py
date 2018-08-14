class Student():
    def __init__(self, name):
        self.__name = name
    
    def getName(self):
        print(self.__name)

s1 = Student('hongtao')
s1._Student__name = '123123'
s1.getName() # hongtao