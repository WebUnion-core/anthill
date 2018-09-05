## $router 传值

```js
this.$router.push({
  name: "forward-art",
  params: { id: 1 }
});
```

这里要使用name 使用path 进行跳转是不能拿到params的，路由里写配置的时候将name写上去

```js
{
  path: '/forward-art',
  name: 'forward-art',
  component: () =>
    import('@/components/forward/art')
},
```