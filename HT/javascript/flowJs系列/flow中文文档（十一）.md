## 工具类型

https://flow.org/en/docs/types/utilities/

## 模块类型

类似于 es6的模块的语法

导入和导出类型

在模块(文件)之间共享类型通常很有用。在Flow中，您可以从一个文件导出类型别名、接口和类，并将它们导入到另一个文件中。

exports.js

```js

// @flow
export default class Foo {};
export type MyObject = { /* ... */ };
export interface MyInterface { /* ... */ };
```

imports.js

```js

// @flow
import type Foo, {MyObject, MyInterface} from './exports';
```

> 不要忘记在文件顶部提示@flow，否则Flow不会报告错误。

### 导入和导出值

Flow还支持导入其他模块使用Typeof导出的值类型

exports.js

```js

// @flow
const myNumber = 42;
export default myNumber;
export class MyClass {
  // ...
}
```

imports.js

```js

// @flow
import typeof myNumber from './exports';
import typeof {MyClass} from './exports';
```

就像其他类型导入一样，此代码将被编译器剥离，并且不会添加对其他模块的依赖关系。


