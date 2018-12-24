
# Java学习流程——继承 #

## 目录 ##

1. [参考链接](#href1)
2. [介绍](#href2)
3. [涉及的关键字](#href3)
    1. [extends](#href3-1)
    2. [implements](#href3-2)
    3. [super与this](#href3-3)
4. [构造器](#href4)

## <a name="href1">参考链接</a> ##

- [Java 继承](http://www.runoob.com/java/java-inheritance.html)

## <a name="href2">介绍</a> ##

继承就是子类继承父类的特征和行为，使得子类对象（实例）具有父类的实例域和方法，或子类从父类继承方法，使得子类具有父类相同的行为。

继承的目的是将重复的代码提取到父类，子类保留各自独有的代码，从而使代码更简洁、易维护、复用性更高。

继承的特性如下:

1. 子类拥有父类非private的属性，方法;
2. 子类可以拥有自己的属性和方法，即子类可以对父类进行扩展;
3. 子类可以用自己的方式实现父类的方法;
4. Java 的继承是单继承，但是可以多重继承，单继承就是一个子类只能继承一个父类，多重继承就是，例如 A 类继承 B 类，B 类继承 C 类，所以按照关系就是 C 类是 B 类的父类，B 类是 A 类的父类，这是 java 继承区别于 C++ 继承的一个特性;
5. 提高了类之间的耦合性（继承的缺点，耦合度高就会造成代码之间的联系）。

## <a name="href3">涉及的关键字</a> ##

继承可以使用`extends`和`implements`这两个关键字来实现继承，而且所有的类都是继承于 java.lang.Object，当一个类没有继承的两个关键字，则默认继承 object(这个类在 java.lang 包中，所以不需要`import`)祖先类。

### <a name="href3-1">extends</a> ###

`extends`是常用的实现继承的关键字。使用`extends`实现继承的示例代码如下:

```Java
class People {
    public void eat() {
        System.out.println("Eating.");
    }
}

// Chinese类继承People类，speakChinese是Chinese独有的方法，eat则是从父类继承的
public class Chinese extends People {
    public void speakChinese() {
        System.out.println("Speaking Chinese.");
    }

    public static void main(String[] args) {
        Chinese cp = new Chinese();
        cp.eat();
        cp.speakChinese();
    }
}
```

### <a name="href3-2">implements</a> ###

使用`implements`关键字可以变相的使 java 具有多继承的特性，使用范围为类继承接口的情况，可以同时继承多个接口(接口跟接口之间采用逗号分隔)。

本人还未接触到接口的内容，更多内容等后续补充。

### <a name="href3-3">super与this</a> ###

`super`关键字用于子类对父类的访问，`this`则用于自身的引用。

示例代码:

```Java
class People {
    public void speak() {
        System.out.println("Speaking.");
    }
}

public class Chinese extends People {
    public void speakChinese() {
        System.out.println("Speaking Chinese.");
    }

    public void speakAll() {
        super.speak(); // 调用父类的speak
        this.speakChinese(); // 调用自身的speakChinese
    }

    public static void main(String[] args) {
        Chinese cp = new Chinese();
        cp.speakAll();
    }
}
```

## <a name="href4">构造器</a> ##

子类不能继承父类的构造器（构造方法或者构造函数），如果父类的构造器带有参数，则必须在子类的构造器中显式地通过`super`关键字调用父类的构造器并配以适当的参数列表。

如果父类构造器没有参数，则在子类的构造器中不需要使用`super`关键字调用父类构造器，系统会自动调用父类的无参构造器。

分析以下代码:

```Java
class SuperClass {
    private int n;

    SuperClass() {
        System.out.println("SuperClass()");
    }

    SuperClass(int n) {
        System.out.println("SuperClass(int n)");
        this.n = n;
    }
}

class SubClass extends SuperClass{
    private int n;

    SubClass() {
        super(300);
        System.out.println("SubClass");
    }  

    public SubClass(int n) {
        // super(); 有一句"隐形"的父类调用语句
        System.out.println("SubClass(int n):"+n);
        this.n = n;
    }
}

public class TestSuperSub {
    public static void main (String args[]) {
        SubClass sc = new SubClass();
        SubClass sc2 = new SubClass(200);
    }
}
```

输出结果为:

```
SuperClass(int n)
SubClass
SuperClass()
SubClass(int n):200
```

解析:

- 首先，创建 sc 实例对象时，没有传递参数，进入 SubClass 类的无参构造器，此构造器内用`super(300)`语句将参数300传给父类，SuperClass 类的有参构造器先输出`SuperClass(int n)`，接着 SubClass 类的无参构造器输出`SubClass`;

- 然后，创建 sc2 实例对象时，传入参数200，进入 SubClass 类的有参构造器，此构造器内先执行默认的`super()`语句船只给父类，SuperClass 类的无参构造器先输出`SuperClass()`，接着 SubClass 类的有参构造器输出`SubClass(int n):200`。

---

```
ID         : 83
DATE       : 2018/06/18
AUTHER     : WJT20
TAG        : 
```
