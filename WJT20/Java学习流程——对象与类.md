
# Java学习流程——对象与类 #

## 目录 ##

1. [参考链接](#href1)
2. [对象和类的概念](#href2)
3. [实例代码](#href3)
4. [构造方法](#href4)
5. [对象的创建](#href5)
6. [访问实例变量](#href6)
7. [调用实例方法](#href7)

## <a name="href1">参考链接</a> ##

- [Java 对象和类](http://www.runoob.com/java/java-object-classes.html)

## <a name="href2">对象和类的概念</a> ##

对象是类的一个实例，有状态和行为，对象的状态就是属性，行为通过方法体现。

类是一个模板，它描述一类对象的行为和状态，一个类可以包括以下类型变量:  
1. 局部变量: 在方法、构造方法或者语句块中定义的变量被称为局部变量。变量声明和初始化都是在方法中，方法结束后，变量就会自动销毁;  
2. 成员变量: 成员变量是定义在类中，方法体之外的变量。这种变量在创建对象的时候实例化。成员变量可以被类中方法、构造方法和特定类的语句块访问;  
3. 类变量: 类变量也声明在类中，方法体之外，但必须声明为static类型。

## <a name="href3">实例代码</a> ##

PersonA.java 文件:  

```java
public class PersonA {
    int personAge;
    String personCountry;

    public PersonA (String name, String country) {
        personCountry = country;
        System.out.println("My name is: " + name);
    }

    public void setAge (int age) {
        personAge = age;
    }

    public int getAge () {
        return personAge;
    }
}
```

PersonB.java 文件:  

```java
import java.io.*;

public class PersonB {
    public static void main (String args[]) {
        PersonA obj1 = new PersonA("WJT20", "China");
        obj1.setAge(23);
        System.out.println("My age is: " + obj1.getAge());
        System.out.println("My country is: " + obj1.personCountry);
    }
}
```

以上代码分别将两个类写在两个包内，在 PersonB 的包内，使用`import java.io.*;`语句将当前目录下的所有包引入，然后使用如下命令编译两个文件，最后运行 PersonB 类:  

```sh
javac -encoding UTF-8 personA.java
javac -encoding UTF-8 PersonB.java
java PersonB
```

可以看到如下结果:  

```
My name is: WJT20
My age is: 23
My country is: China
```

## <a name="href4">构造方法</a> ##

每个类都有构造方法(可以有多个)，构造方法的名字必须与类名一致，如果没有显式地定义一个构造方法，Java 编译器会为这个类提供一个默认的构造方法，以上代码中，PersonA 类内部有一个自定义的构造方法，名亦为 PersonA，其接收两个参数，其中一个 String 类型参数 name 接收后直接输出，当创建 PersonA 对象的时候，此构造方法便被立即执行。

## <a name="href5">对象的创建</a> ##

```java
PersonA obj1 = new PersonA("WJT20", "China");
```

## <a name="href6">访问实例变量</a> ##

```java
System.out.println("My country is: " + obj1.personCountry);
```

## <a name="href7">调用实例方法</a> ##

```java
obj1.setAge(23);
System.out.println("My age is: " + obj1.getAge());
```

---

```
ARTICLE_ID : 74
POST_DATE : 2018/05/29
AUTHER : WJT20
```
