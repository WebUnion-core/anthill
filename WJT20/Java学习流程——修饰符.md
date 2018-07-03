
# Java学习流程——修饰符 #

## 目录 ##

1. 参考链接
2. 修饰符的类型
3. 访问控制修饰符
    1. 私有访问修饰符
    2. 公有访问修饰符
    3. 受保护访问修饰符
4. 非访问修饰符
    1. static修饰符
    2. final修饰符
    3. abstract修饰符

## 参考链接 ##

- [Java 修饰符](http://www.runoob.com/java/java-modifier-types.html)
- [Java protected 关键字详解](http://www.runoob.com/w3cnote/java-protected-keyword-detailed-explanation.html)

## 修饰符的类型 ##

修饰符用来定义类、方法或者变量，通常放在语句的最前端。Java 修饰符主要分为两类:

1. 访问修饰符;
2. 非访问修饰符;

## 访问控制修饰符 ##

Java 中可以使用访问控制修饰符来保护对类、变量、方法和构造函数的访问。Java 支持以下几种不同的访问权限:

1. private: 在同一类内可见。使用对象: 变量、方法(注意，不能修饰类);
2. public: 对所有类可见。使用对象: 类、接口、变量、方法;
3. protected: 对同一包内的类和所有子类可见。使用对象: 变量、方法(注意，不能修饰类)。

### 私有访问修饰符 ###

私有访问修饰符是最严格的访问级别，所以被声明为`private`的方法、变量和构造方法只能被所属类访问，并且类和接口不能声明为`private`。声明为私有访问类型的变量只能通过类中公共的 getter 方法被外部类访问。`private`访问修饰符的使用主要用来隐藏类的实现细节和保护类的数据。

示例代码:  

```Java
public class Modifier {
    private String name = "WJT20";

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public static void main(String[] args) {
        Modifier modifier = new Modifier();
        modifier.name = "WJT22";
        System.out.println(modifier.name);

        modifier.setName("WJT21");
        System.out.println(modifier.getName());
    }
}
```

以上代码用`private`修饰符定义了一个 name 变量(这里也可以把`private`直接省略)，这个变量只能通过实例对象访问。main 方法中，首先创建了实例对象 modifier，然后用两种不同的方式设置和读取它的值:

1. 直接使用`.`访问到 modifier 的值，然后进行修改和读取;
2. 在 Modifier 类内部提供了两个用`public`修饰的方法 getName 和 setName，分别用于获取和修改 name 变量的值，这种方式为其他类访问 Modifier 类的私有变量提供了便利。

### 公有访问修饰符 ###

`public`不能修饰变量(不会报错，但是毫无意义)，被声明为`public`的类、方法、构造方法和接口能够被任何其他类访问。如果几个相互访问的`public`类分布在不同的包中，则需要导入相应`public`类所在的包。由于类的继承性，类所有的公有方法和变量都能被其子类继承。

示例代码:  

```Java
public class Modifier {
    String name = "WJT20";

    public String getName() {
        return this.name;
    }

    public static void main(String[] args) {
        Modifier modifier = new Modifier();
        System.out.println(modifier.getName());
    }
}
```

以上例子中，name 变量是一个私有变量，外部不能直接访问，在 Modifier 类中用`public`给修饰符定义了一个 getName 方法，用于对外导出 name 变量。

### 受保护访问修饰符 ###

`protected`是最难理解的一种 Java 类成员访问权限修饰词，作为一个 Java 小白，我也很难说得清其作用，所以有说。`protected`访问修饰符不能修饰类和接口，方法和成员变量能够声明为`protected`，但是接口的成员变量和成员方法不能声明为`protected`。`protected`修饰符可能用于父类和子类继承的情景比较多，子类能访问`protected`修饰符声明的方法和变量，这样就能保护不相关的类使用这些方法和变量。

被`protected`修饰的成员对于本包和其子类可见，这一句话要好好理解。等学到"包"的内容时再补全这一小节内容。

## 非访问修饰符 ##

非访问修饰符是为了实现一些其他的功能，非访问修饰符主要有以下几种:  

1. static: 用来修饰类方法和类变量;  
2. final: 用来修饰类、方法和变量，`final`修饰的类不能够被继承，修饰的方法不能被继承类重新定义，修饰的变量为常量，是不可修改的;  
3. abstract: 用来创建抽象类和抽象方法;  
4. synchronized 和 volatile: 主要用于线程的编程，下文暂不讲解这两个。

### static修饰符 ###

`static`用于构建静态方法和静态变量，这两者的特点如下:  

- 静态变量: 独立于对象，无论一个类实例化多少对象，它的静态变量只有一份拷贝。静态变量也被称为类变量。局部变量不能被声明为`static`变量。
- 静态方法: 独立于对象。静态方法不能使用类的非静态变量。静态方法从参数列表得到数据，然后计算这些数据。

示例代码:  

```Java
public class Modifier {
    // 【静态变量】
    private static int counter = 0;

    // 【静态方法】add方法加上static修饰符后，不能再操作没有用static修饰的counter变量
    public static void add() {
        counter += 1;
    }

    public static void main(String[] args) {
        Modifier modifier = new Modifier();
        modifier.add();
        System.out.println(modifier.counter);
    }
}
```

### final修饰符 ###

`final`变量能被显式地初始化并且只能初始化一次。被声明为`final`的对象的引用不能指向不同的对象。但是`final`对象里的数据可以被改变。也就是说`final`对象的引用不能改变，但是里面的值可以改变。`final`修饰符通常和`static`修饰符一起使用来创建类常量。

类中的`final`方法可以被子类继承，但是不能被子类修改。声明`final`方法的主要目的是防止该方法的内容被修改。

```Java
public class Modifier {
    private static final double PI = 3.14;

    public static void main(String[] args) {
        System.out.println(2 * PI);
    }
}
```

### abstract修饰符 ###

`abstract`用于修饰类和方法，也是一个比较难用的修饰符，抽象类和抽象方法的特点如下:  

- 抽象类: 抽象类不能用来实例化对象，声明抽象类的唯一目的是为了将来对该类进行扩充。一个类不能同时被`abstract`和`final`修饰。如果一个类包含抽象方法，那么该类一定要声明为抽象类，否则将出现编译错误。抽象类可以包含抽象方法和非抽象方法。

- 抽象方法: 抽象方法是一种没有任何实现的方法，该方法的的具体实现由子类提供。抽象方法不能被声明成`final`和`static`。任何继承抽象类的子类必须实现父类的所有抽象方法，除非该子类也是抽象类。如果一个类包含若干个抽象方法，那么该类必须声明为抽象类。抽象类可以不包含抽象方法，抽象方法的声明以分号结尾。

```Java
// 被继承的抽象类
abstract class BaseModifier {
    // 预设一个抽象方法
    abstract void say();
}

public class Modifier extends BaseModifier {
    // 实现抽象方法
    void say() {
        System.out.println("WJT20");
    }

    public static void main(String[] args) {
        Modifier modifier = new Modifier();
        modifier.say();
    }
}
```

---

```
ARTICLE_ID : 76
POST_DATE : 2018/06/05
AUTHER : WJT20
```
