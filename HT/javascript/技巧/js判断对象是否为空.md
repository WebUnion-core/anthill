## 1.将json对象转化为json字符串，再判断该字符串是否为"{}"

```js
JSON.stringify({}) == '{}' // true
```

## 2.for in 循环判断

```js
for (let key in {}) {
    return false;
}
return true;
```

## 3.Object.getOwnPropertyNames()方法

该方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。

```js
Object.getOwnPropertyNames({}).length == 0
```

## 4.Object.keys()

Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致 。

```js
Object.keys({}).length == 0
```