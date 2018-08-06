## 什么是flow

Flow是javascript代码的静态类型接触的一个工具。它可以使你的代码更有效率、更可控、更大规模的开发。

Flow通过静态类型检查到吗是否存在类型错误，比如:

```js
// @flow
function square(n:unmber): number {
    return n * n;
}

square("2")// Error!
```
