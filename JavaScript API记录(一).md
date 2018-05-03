
# JavaScript API记录(一) #

## 目录 ##

1. Array API
    1. push
    2. pop
    3. unshift
    4. shift
    5. reverse
    6. sort
    7. concat
    8. slice
    9. splice
    10. join

---

## Array API ##

数组操作常用 API 有以下几种:

### push ###

语法: `array.push(elem1, ..)`；
含义: 从数组尾部加入数组元素，返回加入数组的元素；
示例:

```js
var arr = [1, 2, 3];
var new = arr.push(4);
console.log(arr, new); // => [1,2,3,4] 4
```

### pop ###

语法: `array.pop()`；
含义: 从数组尾部移除一个数组元素，返回取出的元素；
示例:

```js
var arr = [1, 2, 3];
var out = arr.pop();
console.log(arr, out1); // => [1,2] 3
```

### unshift ###

语法: `array.unshift(elem1, ..)`；
含义: 从数组头部加入数组元素，返回加入数组的元素。
示例:

```js
var arr = [1, 2, 3];
arr.unshift(0);
console.log(arr); // => [0,1,2,3]
```

### shift ###

语法: `array.shift()`；
含义: 从数组头部移除一个数组元素，返回取出的元素；
示例:

```js
var arr = [1, 2, 3];
var out = arr.shift();
console.log(arr, out2);//输出：[2,3] 1
```

### reverse ###

语法: `array.reverse()`；
含义: 将原数组反转并返回；
示例:

```js
var arr = [1, 2, 3];
arr.reverse();
console.log(arr);//输出：[3,2,1]
```

### sort ###

语法: `array.sort(compareFunc)`；
含义: 默认以字符编码对数组元素进行排序，可选参数 compareFunc 为一个用于比较的回调函数，具有两个参数，不调换位置应返回负数，调换位置应返回正数；
示例:

```js
var arr = [1, 2, 10, 15, 3];
function descSort(a, b) {
    if (a > b) {
        return -1;
    } else {
        return 1;
    }
}
function asceSort(a, b) {
    if (a < b) {
        return -1;
    } else {
        return 1;
    }
}

// 根据字符编码排序
arr.sort();
console.log(arr); // => [1,10,15,2,3]

// 降序排序
arr.sort(descSort);
console.log(arr); // => [15,10,3,2,1]

// 升序排序
arr.sort(asceSort);
console.log(arr); // => [1,2,3,10,15]
```

### concat ###

语法: `array.concat(elem1, ..)`；
含义: 在调用数组对象后逐个插入参数(可以是数组)，最终返回新的拼接结果数组；
示例:

```js
var arr1 = [1, 2],
    arr2 = [3, 4],
    arr3;
arr3 = arr1.concat(arr2); // 将arr2的元素拼接在arr1后面，将拼接结果数组返回
console.log(arr3); // => [1,2,3,4]
```

### slice ###

语法: `array.slice(start, end)`；
含义: 返回一个数组副本，元素为必需参数 start 开始到可选参数 end(不包括)之间的数组元素，不指定 end 参数时，默认获取之后所有的元素，两个参数都不指定则返回一个原数组的副本；
示例:

```js
var arr = [1, 2, 3];
console.log(arr.slice() === arr);//输出：false
console.log(arr.slice(1, 2));//输出：[2]
console.log(arr.slice(1));//输出：[2, 3]
```

### splice ###

语法: `array.splice(start, length, elem1, ..)`；
含义: 从原数组中 start 位置开始移除 length 个数组元素，并插入多个数组元素，如果只提供两个参数则只是移除指定元素，最终将取出的元素返回。使用 splice() 可以实现删除、插入、删除并插入数组元素等操作；
示例:

```js
var arr1 = [1, 2, 3, 4];
var arr2 = arr1.splice(2, 2, 5, 6); // 删除并插入操作

console.log(arr1, arr2); // => [1,2,5,6] [3,4]
arr1.splice(2, 0, 3, 4); // 插入操作
console.log(arr1); // => [1,2,3,4,5,6]
arr1.splice(4, 2); // 删除操作
console.log(arr1); // => [1,2,3,4]
```

### join ###

语法: `array.join(mark)`；
含义: 根据分隔符 mark 将数组元素拼接为字符串返回，默认分隔符为","；
示例:

```js
var arr = [1, 2, 3, 4];
var str1 = arr.join(),
str2 = arr.join("-");
console.log(str1, str2); // => "1,2,3,4" "1-2-3-4"
```

---

```
ARTICLE_ID : 72
POST_DATE : 2018/05/03
AUTHER : WJT20
```
