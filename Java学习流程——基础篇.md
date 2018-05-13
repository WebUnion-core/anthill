
# Java学习流程——基础篇 #

## 目录 ##

1. 参考链接
2. 基本概念
3. 注意事项
4. 编译与运行
    1. 编译
    2. 执行
5. 基本数据类型
    1. 内置数据类型
    2. 引用类型
6. 常量定义

## 参考链接 ##

- [Java基础语法](http://www.runoob.com/java/java-basic-syntax.html)

- [Java基本数据类型](http://www.runoob.com/java/java-basic-datatypes.html?s_q_s_h_a_r_e_1MTAwNTc2MzYxNTI2MjAzNTQzNDMyNDMzMjY5JjFsNmZXNQ==)

## 基本概念 ##

- 对象: 对象是类的一个实例，有状态和行为。例如，一个人可以看做是一个对象，其状态有身高、体重、肤色、性别等等，其行为有说话、走路、睡觉、吃饭等等;  

- 类: 类是一个模板，它描述一类对象的行为和状态。例如，根据人的肤色和体态特征不同，可以分为黄、白、黑三个类的人种;  

- 方法: 方法即行为，一个类可以有很多方法。逻辑运算、数据修改以及所有动作都是在方法中完成的;  

- 实例变量: 每个对象都有独特的实例变量，对象状态由这些实例变量的值决定。  

## 注意事项 ##

- 大小写敏感: Java 是大小写敏感的，只要两个名词中有一个字母大小写形式不同，便是两个完全不同的名词;  

- 类型: 类名首字母要大写;  

- 方法名: 所有的方法名都应该使用驼峰命名法;  

- 源文件名: 源文件(以`.java`为后缀)名必须与类名相同;  

- 主方法名: 所有的 Java 程序由`public static void main(String args[])`方法开始执行;  

- 标识符: 所有标识符都应该以字母、美元符号(\$)或者下划线(\_)开始，关键字不能作为标识符。

## 编译与运行 ##

### 编译 ###

```sh
javac [-encoding UTF-8] Example.java
```

如果代码中含有中文等特殊字符，应加上`[-encoding UTF-8]`参数。

### 执行 ###

```sh
java Example
```

## 基本数据类型 ##

变量就是申请内存来存储值。也就是说，当创建变量的时候，需要在内存中申请空间。内存管理系统根据变量的类型为变量分配存储空间，分配的空间只能用来存储该类型数据。因此，通过定义不同类型的变量，可以在内存中储存整数、小数或者字符。

Java 有两大数据类型: 内置数据类型和引用数据类型。

### 内置数据类型 ###

基本数据类型有八种: 六种数字类型(四个整数型，两个浮点型)，一种字符类型，还有一种布尔类型。

1. byte  

    8位、有符号、以二进制补码表示的整数。主要用于大型数组中节省空间，主要替代整数，因为 byte 变量占用的空间只有 int 类型的四分之一。  

2. short  

    16位、有符号、以二进制补码表示的整数。和 byte 一样都可以节省空间，一个 short 变量是 int 型变量所占空间的二分之一。  

3. int  

    32位、有符号、以二进制补码表示的整数。是最常用的整数数据类型。  

4. long  

    64位、有符号、以二进制补码表示的整数。主要用于需要比较大整数的系统上。  

5. float  

    32位、单精度、符合 IEEE 754 标准的浮点数。不能用于表示精确的值。  

6. double  

    64位、双精度、符合 IEEE 754 标准的浮点数。和 float 一样不能表示精确的值。  

7. boolean  

    表示一位的信息，只有两个取值: true 和 false。  

8. char  

    单一的16位 Unicode 字符。可以储存任何字符。  

实例代码(ValType.java):

```java
public class ValType {
    public static void main (String args[]) {
        // int类型
        int iv1 = 1000,
            iv2 = -1000;
        System.out.println("Int Value 1: " + iv1);
        System.out.println("Int Value 2: " + iv2);
        System.out.println("Int Min Value: " + Integer.MIN_VALUE);
        System.out.println("Int Max Value: " + Integer.MAX_VALUE);

        // float类型
        float fv1 = 0.01f,
            fv2 = -0.01f;
        System.out.println("Float Value 1: " + fv1);
        System.out.println("Float Value 2: " + fv2);
        System.out.println("Float Min Value: " + Float.MIN_VALUE);
        System.out.println("Float Max Value: " + Float.MAX_VALUE);

        // double类型
        double dv1 = 0.000001,
            dv2 = -0.000001;
        System.out.println("Double Value 1: " + dv1);
        System.out.println("Double Value 2: " + dv2);
        System.out.println("Double Min Value: " + Double.MIN_VALUE);
        System.out.println("Double Max Value: " + Double.MAX_VALUE);

        // boolean类型
        boolean bv1 = true,
            bv2 = false;
        System.out.println("Boolean Value 1: " + bv1);
        System.out.println("Boolean Value 2: " + bv2);

        // char类型，必须用单引号扩起
        char cv1 = 'A',
            cv2 = 'B';
        System.out.println("Char Value 1: " + cv1);
        System.out.println("Char Value 2: " + cv2);
        System.out.println("Char Min Value: " + (int)Character.MIN_VALUE); // 强制类型转换
        System.out.println("Char Max Value: " + (int)Character.MAX_VALUE);
    }
}
```

### 引用类型 ###

引用类型指向一个对象，指向对象的变量是引用变量，这些变量在声明时被指定为一个特定的类型，引用类型包括: 对象、数组等，默认值为`null`，一个引用变量可以用来引用任何与之兼容的类型。  

## 常量定义 ##

定义常量使用`finial`关键字，一旦声明常量，之后将不能修改其值，常量名通常用大写字母表示，例如:

```
finial double PI = 3.1415927;
```

---

```
ARTICLE_ID : 73
POST_DATE : 2018/05/13
AUTHER : WJT20
```
