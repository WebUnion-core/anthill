
# 实用的HTML片段 #

## 目录 ##

1. [禁止输入文本框缓存输入内容](#href1)
2. [table布局](#href2)

## <a name="href1">禁止输入文本框缓存输入内容</a> ##

代码:

```html
<form autocomplete="off">
    <input type="text" />
</form>

<input type="text" autocomplete="off" />
```

解析:

将 form 元素的 autocomplete 设为 off 可以禁止其中的所有表单控件缓存输入内容，将单个表单控件的 autocomplete 设为 off 则只禁止单个表单控件的内容缓存。

## <a name="href2">table布局</a> ##

代码:

```html
<table>
    <thead>
        <tr>
            <th>星期天</th>
            <th>星期一</th>
            <th>星期二</th>
            <th>星期三</th>
            <th>星期四</th>
            <th>星期五</th>
            <th>星期六</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>0</td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
        </tr>
    </tbody>
</table>
```

---

```
ID         : 28
DATE       : 2017/08/29
AUTHER     : WJT20
TAG        : HTML
```
