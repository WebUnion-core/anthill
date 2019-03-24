
# Vue学习笔记——组件篇 #

## 目录 ##

1. [参考链接](#href1)
2. [基本用法](#href2)
3. [使用props](#href3)
4. [遍历渲染组件](#href4)
5. [使用events](#href5)

## <a name="href1">参考链接</a> ##

- [组件基础](https://vue.docschina.org/v2/guide/components.html)

## <a name="href2">基本用法</a> ##

每个 Vue 实例可以作为组件给其他的实例使用，在编写完组件后，只要在父实例的 components 属性中注册要使用的组件即可。

例如编写一个 picture-box 组件(PictureBox.vue):

```html
<template>
    <figure>
        <img :src="img" />
        <p>{{ text }}</p>
    </figure>
</template>
<script>
export default {
    name: 'PictureBox',
    data () {
        return {
            img: 'https://raw.githubusercontent.com/WebUnion-core/dragonfly/master/asset/head.jpg',
            text: 'Dragonfly'
        };
    }
};
</script>
```

之后在父实例中使用这个组件:

```html
<template>
    <main>
        <picture-box />
        <picture-box />
    </main>
</template>
<script>
import PictureBox from './PictureBox.vue';
export default {
    name: 'Text',
    components: {
        'picture-box': PictureBox
    }
}
</script>
```

注意，组件的 data 选项必须是一个函数，而不能是对象，这是为了使每个实例都可以维护彼此独立的数据副本，以上代码并不能体现出这个问题，还需自己去探究。

## <a name="href3">使用props</a> ##

父组件与子组件间的数据交流主要借助 props。prop 是指注册在组件选项上的自定义属性，一个组件可以有很多个 prop，默认情况下，任何类型的值都可以传递给 prop。现在试着将之前的代码中的 text 和 img 两个数据改为 prop，代码如下:

子组件:

```html
<template>
    <figure>
        <img :src="img" />
        <p>{{ text }}</p>
    </figure>
</template>
<script>
export default {
    name: 'PictureBox',
    props: {
        'img',
        'text'
    }
};
</script>
```

父组件:

```html
<template>
    <main>
        <picture-box
            img="https://raw.githubusercontent.com/WebUnion-core/dragonfly/master/asset/head.jpg"
            text="Dragonfly" />
        <picture-box
            img="https://raw.githubusercontent.com/WebUnion-core/moths/master/asset/intro/moths-head.jpg"
            text="Moths" />
    </main>
</template>
<script>
import PictureBox from './PictureBox.vue';
export default {
    name: 'Text',
    components: {
        'picture-box': PictureBox
    }
}
</script>
```

## <a name="href4">遍历渲染组件</a> ##

如果要大量使用某个组件，像之前那样一个一个去设置 props 无疑是很麻烦的，我们通常会将所有的 props 用一个元素为对象的数组管理起来，保存到父组件的 data 中，并使用`v-for`语法去遍历渲染这些组件。

父组件:

```html
<template>
    <main>
        <picture-box
            v-for="(item, index) in pictureBoxList"
            :key="index"
            :img="item.img"
            :text="item.text" />
    </main>
</template>
<script>
import PictureBox from './PictureBox.vue';
export default {
    name: 'Text',
    components: {
        'picture-box': PictureBox
    },
    data () {
        return {
            pictureBoxList: [
                { img: 'https://raw.githubusercontent.com/WebUnion-core/dragonfly/master/asset/head.jpg', text: 'Dragonfly' },
                { img: 'https://raw.githubusercontent.com/WebUnion-core/moths/master/asset/intro/moths-head.jpg', text: 'Moths' }
            ]
        }
    }
}
</script>
```

如果 picture-box 组件的 props 越来越多，而大部分的 props 都来自父组件的 pictureBoxList 数据，这个时候可以将这些 props 整合成一个对象传入。

父组件:

```html
<template>
    <main>
        <picture-box
            v-for="(item, index) in pictureBoxList"
            :key="index"
            :data="item" />
    </main>
</template>
<script>
...
</script>
```

子组件:

```html
<template>
    <figure>
        <img :src="data.img" />
        <p>{{ data.text }}</p>
    </figure>
</template>
<script>
export default {
    name: 'PictureBox',
    props: {
        'data'
    }
};
</script>
```

## <a name="href5">使用events</a> ##

props 是父组件给子组件发送数据的媒介，如果要将子组件的数据发送给父组件，则要借助 events。

父组件:

```html
<template>
    <main>
        <!-- 传给子组件一个名为select-content的event -->
        <picture-box
            v-for="(item, index) in pictureBoxList"
            :key="index"
            :img="item.img"
            :text="item.text"
            @select-content="selectContent" />
        <p>{{ selectedContent }}</p>
    </main>
</template>
<script>
import PictureBox from './PictureBox.vue';
export default {
    name: 'Text',
    components: {
        'picture-box': PictureBox
    },
    data () {
        return {
            selectedContent: '',
            pictureBoxList: ...
        }
    },
    methods: {
        selectContent (selectedContent) {
            this.selectedContent = selectedContent;
        }
    }
}
</script>
```

子组件:

```html
<template>
    <!-- 当点击组件容器时触发select-content event，并传递具体参数 -->
    <figure :click="$emit('select-content', data.text)">
        <img :src="data.img" />
        <p>{{ data.text }}</p>
    </figure>
</template>
<script>
export default {
    name: 'PictureBox',
    props: {
        'data'
    }
};
</script>
```

---

```
ID         : 50
DATE       : 2019/03/22
AUTHER     : WJT20
TAG        : Vue
```
