
# MVVM模式探究 #

## 目录 ##

1. [参考链接](#href1)
2. [什么是MVVM](#href2)
3. [原理](#href3)
4. [单向绑定与双向绑定](#href4)
5. [同步DOM结构](#href5)

## <a name="href1">参考链接</a> ##

- [MVVM](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001475449022563a6591e6373324d1abd93e0e3fa04397f000)

## <a name="href2">什么是MVVM</a> ##

我们都知道，前端开发混合了 HTML、CSS 和 JavaScript，随着页面增多，代码的组织和维护难度越来越复杂，这时候就要使用 MVVM 来组织代码(当然，你也可以选择其他的方式来组织代码)。

MVVM 最早由微软提出，它借鉴了桌面应用程序的 MVC 思想。在前端页面中，把 Model 用纯 JavaScript 对象表示， View 负责显示，两者做到最大程度的分离，而把 Model 和 View 联系起来的就是 ViewModel，它负责把 Model 的数据同步到 View 显示出来，还负责把 View 的修改同步回 Model。

MVVM 的框架有很多，常用的有 Vue、Angular、Backbone.js、Ember 等，其中最易用、最推荐的就是 Vue。

## <a name="href3">原理</a> ##

使用 MVVM，首先不必关心 DOM 结构，而是关心数据是如何存储的，最简单的数据存储方式是 JavaScript 对象。

```js
var user = {
    name: 'WJT20',
    id: 1
};
```

将 user 看作 Model，HTML 中的相关 DOM 节点看作 View，接下来就该编写 ViewModel 了，ViewModel 的工作是只修改 JavaScript 对象的内容而不操作 DOM，即:

```js
user.name = 'WJT21';
user.id = 2;
```

这就是 MVVM 的设计思想: 关注 Model 的变化，让 MVVM 框架去自动更新 DOM 的状态。

## <a name="href4">单向绑定与双向绑定</a> ##

MVVM 框架会自动监听 Model 的任何变化，在 Model 数据变化时，更新 View 的显示，这种 Model 到 View 的绑定就叫作"单向绑定"。

有单向绑定就有双向绑定，如果用户更新了 View，Model 的数据也自动被更新，这种情况就是"双向绑定"。

填写表单就是一个用户更新 View 的最直接的例子，当用户填写表单时，View 的状态就更新了，现在用 Vue 写一个使用双向绑定的表单实例:

```html
<template>
    <form>
        <input type="text" placeholder="请填写你的姓名" v-model="name" />
    </form>
</template>
<script>
export default {
    name: 'Form',
    data () {
        return {
            name: ''
        }
    }
}
</script>
```

Vue 中，使用`v-model`指令即可把 input 表单组件与 Model 的 name 属性作双向数据绑定，当我们改变输入框的输入内容时，Model 里面的 name 数据就会跟着变化，就是这么简单。

## <a name="href5">同步DOM结构</a> ##

MVVM 的另一个重要用途就是让 Model 和 DOM 的结构保持同步。使用 MVVM 时，当我们更新 Model 时，DOM 结构会随着 Model 的变化而自动更新，接下来我们再写一个 Vue 示例来证明这一点:

```html
<template>
    <ul>
        <li v-for="(item, index) in list"
            :key="index">{{ item.name }}</li>
    </ul>
</template>
<script>
export default {
    name: 'List',
    data () {
        return {
            list: [
                { name: 'WJT20' },
                { name: 'WJT21' },
                { name: 'WJT22' },
                { name: 'WJT23' },
                { name: 'WJT24' }
            ]
        }
    },
    mounted () {
        setTimeout(() => {
            this.list[0].name = 'WJT25';
        }, 5000);
    }
}
</script>
```

首先，我们用`v-for`指令将 model 中的 list 数据渲染成 DOM 结构，然后在 mounted 钩子中设置一个定时器，在 Vue 实例挂载后5秒，把 list 中的第一条数据的 name 属性替换为"WJT25"，这是可以看到浏览器中列表第一条数据显示的内容也跟着改变了。

这里还要注意一点，Vue 之所以能够监听 Model 状态的变化，是因为 JavaScript 语言本身提供了 Proxy 或者`Object.observe()`机制来监听对象状态的变化，但是，对于数组元素的赋值，却没有办法直接监听，也就是说，以下操作是不能更新 View 的:

```js
...
setTimeout(() => {
    this.list[0] = {
        name: 'WJT25'
    };
}, 5000);
...
```

---

```
ID         : 68
DATE       : 2019/04/02
AUTHER     : WJT20
TAG        : Web相关
```
