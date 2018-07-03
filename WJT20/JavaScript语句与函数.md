
# JavaScript语句与函数 #

## 目录 ##

1. 语句
    1. if-else语句
    2. do-while语句
    3. while语句
    4. for语句
    5. break和continue
    6. switch语句
2. 函数

---

## 语句 ##

### if-else语句 ###

```
if (10 > 5) {
    console.log(10);
} else {
    console.log(5);
}
```

### do-while语句 ###

do-while 循环体内的代码至少会被执行一次。

```
var i = 10;
do {
    i++;
} while (i < 5)
console.log(i);//输出：11
```

### while语句 ###

```
var i = 0;
while(i < 10){
  i++;
}
console.log(i);//输出：10
```

while 常用于逐个取出数组元素：

```
var arr = [1, "2", true];
console.log(arr);//取出前
while(arr.length > 0) {
    console.log(arr.shift());//shift()方法会把数组第一个元素取出
}
console.log(arr);//取出后
```

### for语句 ###

for 与 while 功能相似。

```
for(var i = 0; i < 10; i++) {
  //操作
}
console.log(i);//输出：10
```

for常用于遍历数组元素：

```
var arr = [1, 2, 3];
for(var i = 0; i < arr.length; i++) {
  console.log(arr[i]);//通过索引号访问数组元素
}
```

### break和continue ###

功能同其他编程语言。

### switch语句 ###

```
var n = 7;
switch(n) {
    case 1: console.log("星期一"); break;
    case 2: console.log("星期二"); break;
    case 3: console.log("星期三"); break;
    case 4: console.log("星期四"); break;
    case 5: console.log("星期五"); break;
    case 6: console.log("星期六"); break;
    default: console.log("星期天");
}
```

switch 括号里面的值和 case 值相等的话就执行 case 后的代码，否则进行下一次比较直到 defalut 为止。case 后跟的值可以是表达式。

```
var a2 = 4;
switch(true) {
    case a2 < 5: console.log("小于5"); break;
    case a2 < 10: console.log("小于10"); break;
    default: console.log("其他");
}
```

---

## 函数 ##

JavaScript 定义函数使用的是 function 关键字，后跟一组参数以及函数体。

```
function add(a, b, c) {
    console.log(a + b + c);
}
```

可以通过 return 关键字在函数体中返回值，return 后的内容不会被浏览器识别和执行。

函数内存在一个 arguments 类数组对象用于包含函数调用时传入的参数，arguments.length 可以获取传入参数的个数，arguments[number] 可以访问指定索引号的参数。

JavaScript 对函数具体传入的参数个数没有限制，形参和实参个数不一定相等。

```
function add(a, b) {
    console.log(a === arguments[0]);//返回true
    console.log(arguments.length);
}
add(1, 2, 3);//可以传入更多参数
```

---

```
ARTICLE_ID : 22
POST_DATE : 2017/08/24
RECENTLY_MODIFY : 2017/08/24
TIME_COUNTER : 1
AUTHER : WJT20
```
