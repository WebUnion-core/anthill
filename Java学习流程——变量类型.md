
# Java学习流程——变量类型 #

## 目录 ##

1. 参考链接
2. 变量的种类
3. 局部变量
4. 实例变量
5. 类变量(静态变量)
6. 实例代码

## 参考链接 ##

- [Java 变量类型](http://www.runoob.com/java/java-variable-types.html)

## 变量的种类 ##

Java 语言支持的变量类型有:  

1. 类变量: 独立于方法之外的变量，用 static 修饰;  
2. 实例变量: 独立于方法之外的变量，不过没有 static 修饰;  
3. 局部变量: 类的方法中的变量。

## 局部变量 ##

局部变量的特点:  

1. 局部变量声明在方法、构造方法或者语句块中;  
2. 局部变量在方法、构造方法、或者语句块被执行的时候创建，当它们执行完成后，变量将会被销毁;  
3. 访问修饰符不能用于局部变量;  
4. 局部变量只在声明它的方法、构造方法或者语句块中可见;  
5. 局部变量是在栈上分配的;  
6. 局部变量没有默认值，所以局部变量被声明后，必须经过初始化，才可以使用。

## 实例变量 ##

实例变量的特点:

1. 实例变量声明在一个类中，但在方法、构造方法和语句块之外;  
2. 当一个对象被实例化之后，每个实例变量的值就跟着确定;  
3. 实例变量在对象创建的时候创建，在对象被销毁的时候销毁;  
4. 实例变量的值应该至少被一个方法、构造方法或者语句块引用，使得外部能够通过这些方式获取实例变量信息;  
5. 实例变量可以声明在使用前或者使用后;  
6. 访问修饰符可以修饰实例变量;  
7. 实例变量对于类中的方法、构造方法或者语句块是可见的。一般情况下应该把实例变量设为私有。通过使用访问修饰符可以使实例变量对子类可见;  
8. 实例变量具有默认值。数值型变量的默认值是0，布尔型变量的默认值是`false`，引用类型变量的默认值是`null`。变量的值可以在声明时指定，也可以在构造方法中指定;  
9. 实例变量可以直接通过变量名访问。但在静态方法以及其他类中，就应该使用完全限定名：`ObejectReference.VariableName`。

## 类变量(静态变量) ##

静态变量的特点:  

1. 类变量也称为静态变量，在类中以`static`关键字声明，但必须在方法构造方法和语句块之外;  
2. 无论一个类创建了多少个对象，类只拥有类变量的一份拷贝;  
3. 静态变量除了被声明为常量外很少使用。常量是指声明为`public/private`，`final`和`static`类型的变量。常量初始化后不可改变;  
4. 静态变量储存在静态存储区。经常被声明为常量，很少单独使用`static`声明变量;  
5. 静态变量在程序开始时创建，在程序结束时销毁;  
6. 与实例变量具有相似的可见性。但为了对类的使用者可见，大多数静态变量声明为`public`类型;  
7. 默认值和实例变量相似。数值型变量默认值是0，布尔型默认值是`false`，引用类型默认值是`null`。变量的值可以在声明的时候指定，也可以在构造方法中指定。此外，静态变量还可以在静态语句块中初始化;  
8. 静态变量可以通过：`ClassName.VariableName`的方式访问;  
9. 类变量被声明为`public static final`类型时，类变量名称一般建议使用大写字母。如果静态变量不是`public`和`final`类型，其命名方式与实例变量以及局部变量的命名方式一致。  

## 实例代码 ##

```java
public class PersonC {
    int personAge; // 实例变量

    private static String personCountry; // 私有静态变量
    public static final String PERSON_JOB = "JSer"; // 静态常量

    public PersonC(int age) {
        personAge = age;
    }

    public void sayName() {
        String name = "WJT20"; // 局部变量
        System.out.println("My name is: " + name);
    }

    public static void main(String args[]) {
        personCountry = "China";

        PersonC obj1 = new PersonC(23);
        obj1.sayName();
        System.out.println("My age is: " + obj1.personAge);
        System.out.println("My country is: " + personCountry);
        System.out.println("My job is: " + PERSON_JOB);
    }
}
```

---

```
ARTICLE_ID : 75
POST_DATE : 2018/05/29
AUTHER : WJT20
```
