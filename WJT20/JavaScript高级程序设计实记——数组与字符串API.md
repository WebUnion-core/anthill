
# JavaScript高级程序设计实记——数组与字符串API #

## 目录 ##

1. [Array API](#href1)
    1. [push](#href1-1)
    2. [pop](#href1-2)
    3. [unshift](#href1-3)
    4. [shift](#href1-4)
    5. [reverse](#href1-5)
    6. [sort](#href1-6)
    7. [concat](#href1-7)
    8. [slice](#href1-8)
    9. [splice](#href1-9)
    10. [join](#href1-10)
2. [String API](#href2)
    1. [charCodeAt](#href2-1)
    2. [indexOf](#href2-2)
    3. [lastIndexOf](#href2-3)
    4. [substr](#href2-4)
    5. [substring](#href2-5)
    6. [toLowerCase](#href2-6)
    7. [toUpperCase](#href2-7)
    8. [match](#href2-8)
    9. [replace](#href2-9)

## <a name="href1">Array API</a> ##

数组操作常用 API 有以下几种:

### <a name="href1-1">push</a> ###

语法: `array.push(elem1, ..)`；  
含义: 从数组尾部加入数组元素，返回加入数组的元素；  
示例:  

```js
var arr = [1, 2, 3];
var new = arr.push(4);
console.log(arr, new); // => [1,2,3,4] 4
```

### <a name="href1-2">pop</a> ###

语法: `array.pop()`；  
含义: 从数组尾部移除一个数组元素，返回取出的元素；  
示例:  

```js
var arr = [1, 2, 3];
var out = arr.pop();
console.log(arr, out1); // => [1,2] 3
```

### <a name="href1-3">unshift</a> ###

语法: `array.unshift(elem1, ..)`；  
含义: 从数组头部加入数组元素，返回加入数组的元素。  
示例:  

```js
var arr = [1, 2, 3];
arr.unshift(0);
console.log(arr); // => [0,1,2,3]
```

### <a name="href1-4">shift</a> ###

语法: `array.shift()`；  
含义: 从数组头部移除一个数组元素，返回取出的元素；  
示例:  

```js
var arr = [1, 2, 3];
var out = arr.shift();
console.log(arr, out2); // => [2,3] 1
```

### <a name="href1-5">reverse</a> ###

语法: `array.reverse()`；  
含义: 将原数组反转并返回；  
示例:  

```js
var arr = [1, 2, 3];
arr.reverse();
console.log(arr); // => [3,2,1]
```

### <a name="href1-6">sort</a> ###

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

### <a name="href1-7">concat</a> ###

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

### <a name="href1-8">slice</a> ###

语法: `array.slice(start, end)`；  
含义: 返回一个数组副本，元素为必需参数 start 开始到可选参数 end(不包括)之间的数组元素，不指定 end 参数时，默认获取之后所有的元素，两个参数都不指定则返回一个原数组的副本；  
示例:  

```js
var arr = [1, 2, 3];
console.log(arr.slice() === arr); // => false
console.log(arr.slice(1, 2)); // => [2]
console.log(arr.slice(1)); // => [2, 3]
```

### <a name="href1-9">splice</a> ###

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

### <a name="href1-10">join</a> ###

语法: `array.join(mark)`；  
含义: 根据分隔符 mark 将数组元素拼接为字符串返回，默认分隔符为","；  
示例:  

```js
var arr = [1, 2, 3, 4];
var str1 = arr.join();
var str2 = arr.join("-");
console.log(str1, str2); // => "1,2,3,4" "1-2-3-4"
```

## <a name="href2">String API</a> ##

字符串操作常用 API 有以下几种:

### <a name="href2-1">charCodeAt</a> ###

语法: `string.charCodeAt(index)`；  
含义: 返回在指定的位置的字符的 Unicode 编码；  
示例:  

```js
console.log('Go to school.'.charCodeAt(1)); // => 111
```

### <a name="href2-2">indexOf</a> ###

语法: `string.indexOf(cldStr)`；  
含义: 获取子字符串在父字符串中第一次出现的位置(索引值)，如果无匹配的位置则返回-1；  
示例:  

```js
console.log('ABC'.indexOf('B')); // => 1
```

### <a name="href2-3">lastIndexOf</a> ###

语法: `string.lastIndexOf(cldStr)`；  
含义: 获取子字符串在父字符串中最后一次出现的位置(索引值)，如果无匹配的位置则返回-1；  
示例:  

```js
console.log('ABCBA'.lastIndexOf('B')); // => 3
```

### <a name="href2-4">substr</a> ###

语法: `string.substr(index, length)`；  
含义: 从起始索引号提取字符串中指定数目的字符；  
示例:  

```js
var oriStr = 'ABCD';
var cldStr = oriStr.substr(1, 2);
console.log(oriStr, cldStr); // => "ABCD" "BC"
```

### <a name="href2-5">substring</a> ###

语法: `string.substring(start, end)`；  
含义: 功能与 substr 一样，都是截取字符串，不同之处在于，substring 会截取两个索引号之间的子串；  
示例:  

```js
var oriStr = 'ABCD';
var cldStr = oriStr.substring(1, 3);
console.log(oriStr, cldStr); // => "ABCD" "BC"
```

### <a name="href2-6">toLowerCase</a> ###

语法: `string.toLowerCase()`；  
含义: 将字符串中的字母转换为小写；  
示例:  

```js
var str = 'ABCDEFG';
console.log(str.toLowerCase()); // => "abcdefg"
```

### <a name="href2-7">toUpperCase</a> ###

语法: `string.toUpperCase()`；  
含义: 将字符串中的字母转换为大写；  
示例:  

```js
var str = 'abcdefg';
console.log(str.toUpperCase()); // => "ABCDEFG"
```

### <a name="href2-8">match</a> ###

语法: `string.match(regexp|cldStr)`；  
含义: 将字符串中匹配正则或指定字符串的子串组装成一个数组，如果没有匹配项则返回 null；  
示例:  

```js
var matchAry = 'AbabccabdaB'.match(/ab/ig);
console.log(matchAry); // => ["Ab","ab","ab","aB"]
```

### <a name="href2-9">replace</a> ###

语法: `string.replace(regexp|cldStr, newStr)`；  
含义: 替换字符串中匹配正则或指定字符串的子串为新字符串；  
示例:  

```js
var oldStr = 'AaaaaB';
var newStr = oldStr.replace(/a/g, '*');
console.log(oldStr, newStr); // => "AaaaaB" "A****B"
```

---

```
ID         : 72
DATE       : 2018/05/03
AUTHER     : WJT20
TAG        : JavaScript
```
