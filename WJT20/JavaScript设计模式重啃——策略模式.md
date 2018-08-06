
# JavaScript设计模式重啃——策略模式 #

## 目录 ##

1. [介绍](#href1)
2. [JavaScript策略模式实现](#href2)
3. [策略模式的应用——表单校验](#href3)

## <a name="href1">介绍</a> ##

策略模式的定义是：定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。将不变的部分和变化的部分隔开是每个设计模式的主题，策略模式也不例外，策略模式的目的就是将算法的使用与算法的实现分离开来。

一个基于策略模式的程序至少由两部分构成，第一个部分是一组策略类，包含了具体的算法实现；第二个部分是环境类，它可以接收客户的请求，随后把请求委托给指定的策略类，所以，环境类中一定要维持对策略类的引用。

---

## <a name="href2">JavaScript策略模式实现</a> ##

JavaScript 中策略类可以用一个包裹各种算法实现的对象来实现，环境类则用函数来实现，代码如下：

```
//策略对象(类)
var strategies = {
    "S": function(salary) {
        return salary * 4;
    },
    "A": function(salary) {
        return salary * 3;
    },
    "B": function(salary) {
        return salary * 2;
    }
};

//环境函数(类)
var calculateBonus = function(level, salary) {
    return strategies[level](salary);
}

console.log(calculateBonus("S", 20000));//输出：80000
console.log(calculateBonus("A", 10000));//输出：30000
```

---

## <a name="href3">策略模式的应用——表单校验</a> ##

在实际开发中，我们通常会把算法的含义扩散开来，使策略模式也可以用来封装一系列的“业务规则”，只要这些业务规则指向的目标一致，并且可以被替换，我们就可以用策略模式来封装它们。

一个广泛使用策略模式的场景就是表单校验，通常有以下几条校验规则：

1. 输入内容不能为空；
2. 输入字符个数不能少于指定个数；
3. 诸如手机号等的格式校验。

最终实现代码如下：

DOM结构：

```
...
<form action="/" method="POST">
    <input id="phoneEl" name="phone" type="text" placeholder="默认内容" />
    <input id="submitBtn" type="submit" value="提交" />
</form>
...
```

JavaScript 代码：

```
//策略对象(类)
var strategies = {
    ifNonEmpty: function(value) {
        return value != "";
    },
    ifComplete: function(value, length) {
        return value.length == length;
    },
    ifMobile: function(value) {
        return /(^1[3|5|8][0-9]{9}$)/.test(value);
    }
};

//环境函数(类)
var bindStrategy = function(el, paramString) {
    var paramArray = paramString.split(":"),
        rule = paramArray[0],
        params = paramArray.slice(1);

    params.unshift(el.value);
    return strategies[rule].apply(this, params);
}

var submitBtn = document.getElementById("submitBtn");
var phoneField = document.getElementById("phoneEl");
submitBtn.onclick = function() {
    //绑定
    var ifNonEmpty = bindStrategy(phoneField, "ifNonEmpty"),
        ifComplete = bindStrategy(phoneField, "ifComplete:11"),
        ifMobile = bindStrategy(phoneField, "ifMobile");

    console.log("ifNonEmpty: " + ifNonEmpty, " ifComplete: " + ifComplete, " ifMobile: " + ifMobile);
}
```

---

```
ARTICLE_ID : 37
POST_DATE : 2017/10/15
AUTHER : WJT20
```
