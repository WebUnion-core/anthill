
# Vue学习笔记——事件处理 #

## 目录 ##

1. [参考链接](#href1)
2. [监听事件](#href2)
3. [事件修饰符](#href3)
4. [按键修饰符](#href4)

## <a name="href1">参考链接</a> ##

- [事件处理](https://vue.docschina.org/v2/guide/events.html)

## <a name="href2">监听事件</a> ##

监听事件可以使用`v-on`，也可以使用`@`简写形式，事件处理器一般写在 methods 中。

示例代码:

```html
<template>
    <main>
        <button v-on:click="sayHi">Button1</button>
        <button @click="sayBye">Button2</button>
    </main>
</template>
<script>
export default {
    name: 'Text',
    methods: {
        sayHi (e) {
            console.log(`${e.target.innerHTML}: Hi`);
        },
        sayBye (e) {
            console.log(`${e.target.innerHTML}: Bye`);
        }
    }
}
</script>
```

以上代码是直接绑定方法名，除了这种方法，我们还可以在行内 JavaScript 语句中使用 methods 方法，如果要引用 event 对象，可以使用特殊的`$event`变量:

```html
<template>
    <main>
        <button v-on:click="say('WJT20', $event)">Button1</button>
        <button @click="say('WJT21', $event)">Button2</button>
    </main>
</template>
<script>
export default {
    name: 'Text',
    methods: {
        say (name, e) {
            console.log(`${e.target.innerHTML}: ${name}`);
        }
    }
}
</script>
```

## <a name="href3">事件修饰符</a> ##

Vue 为`v-on`提供了以下事件修饰符:

1. `.stop`: 停止事件冒泡;
2. `.prevent`: 阻止事件的默认行为;
3. `.capture`: 采用事件捕获模式;
4. `.self`: 只有在`event.target`是元素自身的时候才触发处理函数;
5. `.once`: 2.14版本新增，事件只会触发一次;
6. `.passive`: 2.30版本新增，对应`addEventListener()`的`passive`选项，`.passive`修饰符对于提高移动设备的性能尤其有用。

示例代码:

```html
<template>
    <main>
        <buttom v-on:click.once="say">Click</button>

        <!-- 滚动事件的默认行为将立即发生，而不是等待onScroll完成才发生 -->
        <div v-on:scroll.passive="scrollHandle">...</div>
    </main>
</template>
<script>
export default {
    name: 'Text',
    methods: {
        say () {
            console.log('Hello.');
        },
        scrollHandle () {
            console.log('Scroll.');
        }
    }
}
</script>
```

注意，`.passive`和`.prevent`不要放在一起使用，因为`.prevent`将被忽略，浏览器将会弹出警告。

## <a name="href4">按键修饰符</a> ##

Vue 给按键事件的`v-on`提供了按键修饰符，用于监听按下某个键时触发的事件，但是需要记住具体的 keyCode 值，这无疑是很麻烦的，所以 Vue 又提供了一些最常用的按键的别名:

1. `.enter`: 回车键;
2. `.tab`: tab 键;
3. `.delete`: del 键;
4. `.esc`: esc 键;
5. `.space`: 空格键;
6. `.up`: 上方向键;
7. `.down`: 下方向键;
8. `.left`: 左方向键;
9. `.right`: 右方向键;

示例代码:

```html
<template>
    <main>
        <input type="text" v-on:keyup.enter="submit" />
        <input type="text" @keyup.space="inputSpace" />
    </main>
</template>
<script>
export default {
    name: 'Text',
    methods: {
        submit () {
            console.log('Submit.');
        },
        inputSpace () {
            console.log('Input Space');
        }
    }
}
</script>
```

关于按键修饰符的内容还有很多，但最常用的应该就是以上这些内容了，如需了解更多，可以自行查阅资料。

---

```
ID         : 29
DATE       : 2019/03/21
AUTHER     : WJT20
TAG        : Vue
```
