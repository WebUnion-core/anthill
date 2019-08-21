
# TypeScript学习笔记——类 #

## 目录 ##

1. [参考链接](#href1)
2. [一个简单的类](#href2)
3. [继承](#href3)
4. [修饰符](#href4)
    1. [公有修饰符(public)](#href4-1)
    2. [私有修饰符(private)](#href4-2)
    3. [受保护修饰符(protected)](#href4-3)
    4. [只读修饰符(readonly)](#href4-4)
    5. [参数属性](#href4-5)
5. [存取器机制](#href5)
6. [静态属性](#href6)
7. [抽象类](#href7)

## <a name="href1">参考链接</a> ##

- [TypeScript 中文手册——类(class)](https://typescript.bootcss.com/classes.html)

## <a name="href2">一个简单的类</a> ##

TypeScript 中类的写法与 C# 或 Java 等面向对象语言的差不多，一个简单的类示例如下:

```ts
// 类
class Person {
    // 属性
    name: string;

    // 构造函数
    constructor(name: string) {
        this.name = name;
    }

    // 方法
    sayHello(): void {
        console.log(`Hello, ${this.name}! `);
    }
}

// 实例对象
const person = new Person('WJT20');
person.sayHello(); // "Hello, WJT20! "
```

## <a name="href3">继承</a> ##

继承的写法也和其他面向对象语言一样，以下是一个继承实例，我们创建一个 Postman 类继承 Person 类:

```ts
class Person {
    ...
}

class Postman extends Person {
    constructor(name: string) {
        super(name); // 将name传给父类
    }

    // 重写sayHello()方法，但不影响父类
    sayHello(): void {
        console.log(`Hello, I am postman——${this.name}! `);
    }

    sendMail(): void {
        console.log(`${ this.name }: This is your mail`); // this.name来自父类
    }
}

const postman = new Postman('WJT20');
postman.sayHello(); // 调用重写方法
postman.sendMail(); // 调用自身方法
```

> 派生类(子类)包含了一个构造函数，它必须调用`super()`，它会执行基类(父类)的构造函数。 而且，在构造函数里访问 this 的属性之前，我们一定要调用`super()`。这个是 TypeScript 强制执行的一条重要规则。

## <a name="href4">修饰符</a> ##

### <a name="href4-1">公有修饰符(public)</a> ###

默认情况下，类中的所有成员都是使用`public`修饰符，也就是说 Person 类中属性和方法也可以这样写:

```ts
class Person {
    public name: string;

    public constructor(name: string) {
        this.name = name;
    }

    public sayHello(): void {
        console.log(`Hello, ${this.name}! `);
    }
}
```

### <a name="href4-2">私有修饰符(private)</a> ###

使用`private`关键字修饰的成员，只能在该类的内部访问:

```ts
class Person {
    public name: string;
    private info: string = 'none';

    public constructor(name: string, info?: string) {
        this.name = name;
        this.info = info || 'none';
        this.getMyInfo(); // 可调用
    }

    private getMyInfo(): void {
        console.log(`${this.name}'s info => ${this.info}`);
    }
}

const person = new Person('WJT20', 'A programmer. ');
person.getMyInfo(); // 不可调用
console.log(person.name); // 可访问
console.log(person.info); // 不可访问
```

### <a name="href4-3">受保护修饰符(protected)</a> ###

`protected`修饰符的行为与`private`修饰符类似，不同之处在于`protected`修饰的成员可以在子类中访问，而`private`则不能:

```ts
class Person {
    public name: string;
    private privateInfo: string = 'none';
    protected protectedInfo: string = 'none';

    public constructor(name: string, info?: string) {
        this.name = name;
        this.privateInfo = info || 'none';
        this.protectedInfo = info || 'none';
    }
}

class Postman extends Person {
    constructor(name: string, info?: string) {
        super(name, info);
        console.log(this.privateInfo); // 不可访问
        console.log(this.protectedInfo); // 可访问
    }
}

const postman = new Postman('WJT20', 'A postman. ');
```

### <a name="href4-4">只读修饰符(readonly)</a> ###

`readonly`修饰符可以将属性设置为只读类型，只读属性只能在声明或在构造函数内初始化:

```ts
class Person {
    public name: string;
    readonly type: string;

    public constructor(name: string) {
        this.name = name;
        this.type = 'human'; // 赋值成功
    }
}

const person = new Person('WJT20');
person.type = 'alien'; // 赋值失败
```

### <a name="href4-5">参数属性</a> ###

通过给构造函数的参数添加修饰符，可以实现参数属性，仔细观察前面我写的代码，初始化属性我是这样做的:

```ts
class Person {
    private name: string;

    public constructor(name: string) {
        // 根据构造函数传入的参数初始化属性
        this.name = name;
    }
}
```

使用参数属性改造，变成了:

```ts
class Person {
    public constructor(private name: string) {}
}
```

看上去是不是简洁了很多。

## <a name="href5">存取器机制</a> ##

对于`public`修饰的类成员来说，无论是在类的内部还是外部，我们都可以控制这些成员的取值，例如:

```ts
class Person {
    public constructor(public name: string) {}
}

const person = new Person('WJT20');
console.log(person.name); // "WJT20"
person.name = 'WJT21';
console.log(person.name); // "WJT21"
```

某些时候，我们会用`private`修饰原本公有的成员，以保证数据的安全，只提供指定的存取器 api(getter/setter)给外部:

```ts
class Person {
    public constructor(private _name: string) {}

    // getter
    get name(): string {
        return this._name;
    }

    // setter
    // 注意，setter不能指定类型
    set name(name: string) {
        this._name = name;
    }
}

const person = new Person('WJT20');
console.log(person.name); // "WJT20"
person.name = 'WJT21';
console.log(person.name); // "WJT21"
```

## <a name="href6">静态属性</a> ##

类的静态成员，指的是那些存在于类本身上面而不是类的实例上的类成员(前面我们接触到的都是存在于类实例上的)，要定义静态成员，可以使用`static`关键字:

```ts
class Person {
    static type: string = 'human'; // 静态属性type
    public constructor(private _name: string) {}
    ...
}

console.log(Person.type); // "human"
```

## <a name="href7">抽象类</a> ##

> 抽象类做为其它派生类的基类使用。它们一般不会直接被实例化。抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。使用`abstract`关键字可以定义抽象类和在抽象类内部定义抽象方法。

```ts
abstract class Person {
    static type: string = 'human';
    abstract sayHello(): void; // 在派生类中实现，注意静态成员的写法
    constructor(public name: string) {}
}

class Postman extends Person {
    constructor(name: string) {
        super(name);
    }

    sayHello(): void {
        console.log(`Hello, I am ${this.name}`);
    }
}

const person = new Person('WJT20'); // 实例化失败
const postman = new Postman('WJT20'); // 实例化成功
postman.sayHello();
```

---

```
ID         : 136
DATE       : 2019/08/21
AUTHER     : WJT20
TAG        : TypeScript
```
