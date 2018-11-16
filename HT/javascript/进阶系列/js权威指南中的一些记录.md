# 标签语句

```js
let aa = 0;

aLoop: for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
        if (i < 2) {
            continue aLoop;
        }
        aa++
    }
}

console.log(aa)
```

最终打印出来的值是 0 aa+=并没有被执行到;

## with 语句

```js
var a = {
    name:'as',
    age: 22
}
let age = 123123123;
with(a){
    console.log(age) // 22
    name = 'hongtoa';
    age = 18;
}
```