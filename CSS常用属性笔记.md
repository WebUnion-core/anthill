
# CSS常用属性笔记 #

## 目录 ##

1. 文本相关
    1. 自动省略
    2. 英文单词拆解换行
2. 表单控件相关

---

## 文本相关 ##

### 自动省略 ###

自动将超出元素宽度的文本以省略号形式显示：

```
p{
    width: 100px; /* 限制宽度 */
    text-overflow: ellipsis; /* 超出部分省略号表示 */
    overflow: hidden; /* 超出部分隐藏 */
    white-space: nowrap; /* 规定文本不换行 */
}
```

### 英文单词拆解换行 ###

当英文单词超出所在元素宽度时，将超出部分拆解显示在下一行位置：

```
p{
    width: 100px; /* 限制宽度 */
    word-break: break-all; /* 超出部分自动换行 */
}
```

---

## 表单控件相关 ##

### placeholder样式设置 ###

将文本框、文本域设置的 placeholder 文本设为浅蓝色：

```
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color: #00a4e9;
}
input:-moz-placeholder, textarea:-moz-placeholder {
    color: #00a4e9;
}
input::-moz-placeholder, textarea::-moz-placeholder {
    color: #00a4e9;
}
input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    color: #00a4e9;
}
```

---

```
ARTICLE_ID : 36
POST_DATE : 2017/10/11
RECENTLY_MODIFY : 2017/10/11
AUTHER : WJT20
```
