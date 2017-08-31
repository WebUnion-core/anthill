
# HTML5知识点总结 #

## 目录 ##

1. 参考链接
2. 介绍
3. 文档类型声明
4. 新增语义标签
5. 淘汰旧标签
6. 新增表单标签
    1. datalist
    2. keygen
    3. output
7. 新增Input类型
8. 多媒体标签
    1. 音频
    2. 视频
9. canvas和svg
10. 拖拽事件

---

## 参考链接 ##

- [HTML5 学习开发指南](https://segmentfault.com/a/1190000006181971)

- [HTML5 教程|菜鸟教程](https://m.runoob.com/html/html5-intro.html)

---

## 介绍 ##

HTML5 发布于2014年10月29号，包含了许多 HTML4.x 没有的新特性。目前，大多数主流浏览器已经兼容所有的 HTML5 新特性，几乎所有移动端浏览器都兼容这些新特性。

---

## 文档类型声明 ##

HTML5 通过在 HTML 代码第一行使用 \<!DOCTYPE html\> 声明，告诉浏览器所要解析的 HTML 文档的文档类型，从而规范浏览器的解析行为。这种声明方式比之前的文档类型声明方式要简洁灵活的多。

---

## 新增语义标签 ##

HTML5 新增了一些语义标签，可以使我们创建更友好的页面结构，便于搜索引擎抓取。

1. article：定义页面独立的内容区域；
2. aside：定义页面的侧边栏内容；
3. bdi：允许设置一段文本，使其脱离其父元素的文本方向设置；
4. command：定义命令按钮，比如单选按钮、复选框或按钮；
5. details：用于描述文档或文档某个部分的细节；
6. dialog：定义对话框，比如提示框；
7. summary：标签包含 details 标签的标题；
8. figure：规定独立的流内容(图像、图表、照片、代码等等)；
9. figcaption：定义 figure 元素的标题；
10. footer：定义 section 或 document 的页脚；
11. header：定义了文档的头部区域；
12. mark：定义带有记号的文本；
13. meter：定义度量衡。仅用于已知最大和最小值的度量；
14. nav：定义导航链接的部分；
15. progress：定义任何类型的任务的进度；
16. ruby：定义 ruby 注释(中文注音或字符)；
17. rt：定义字符(中文注音或字符)的解释或发音；
18. rp：在 ruby 注释中使用，定义不支持 ruby 元素的浏览器所显示的内容；
19. section：定义文档中的节(section、区段)；
20. time：定义日期或时间；
21. wbr：规定在文本中的何处适合添加换行符。

---

## 淘汰旧标签 ##

以下的 HTML4.x 标签在 HTML5 中已经被删除：

1. acronym；
2. applet；
3. basefont；
4. big；
5. center；
6. dir；
7. font；
8. frame；
9. frameset；
10. noframes；
11. strike。 

---

## 新增表单标签 ##

HTML5 新增的表单标签主要有三种：datalist、keygen 和 output，并非所有浏览器都支持这些新标签，但这不影响这些标签的使用。

## datalist ##

datalist 标签规定输入域的选项列表，其内部包含一个或多个 option 标签项，通常使用 input 元素的列表属性与 datalist 元素绑定。

```
...
<input list="countries">
<datalist id="countries">
    <option value="China" />
    <option value="Ameria" />
    <option value="Franch" />
</datalist>
...
```

## keygen ##

keygen 标签规定用于表单的密钥对生成器字段。当提交表单时，会生成两个键，一个是私钥，一个公钥，私钥(private key)存储于客户端，公钥(public key)则被发送到服务器。公钥可用于之后验证用户的客户端证书(client certificate)。

```
...
<form action="xxx.php" method="post">
用户名: <input type="text" name="usr_name">
加密: <keygen name="security">
<input type="submit">
</form>
...
```

## output ##

output 标签用于不同类型的输出，比如计算或脚本输出。

```
<form oninput="x.value=parseInt(a.value)+parseInt(b.value)">0
<input type="range" id="a" value="50">100 +
<input type="number" id="b" value="50">=
<output name="x" for="a b"></output>
</form>
```

---

## 新增Input类型 ##

HTML5 拥有多个新的表单输入类型。这些新特性提供了更好的输入控制和验证。并非所有主流浏览器都支持这些新类型，但即使不被支持，却仍可显示为常规的文本域，所以这些新类型可以放心使用。

新的输入类型有：

1. color：选取颜色；
2. date：选择日期；
3. datetime：选择日期(UTC时间)；
4. datetime-local：选择日期(无时区)；
5. email：应该包含 email 地址的输入框；
6. month：选择月份；
7. number：应该包含数值的输入框，可以使用 min 和 max 属性限定数值范围；
8. range：应该包含一定范围内数值，显示为滑动条；
9. search：用于搜索域；
10. tel：应该包含电话号码的输入框；
11. time：选择时间；
12. url：应该包含 URL 的输入框；
13. week：选择周和年。

表单字段限定属性：

1. disabled：规定输入字段是禁用的；
2. max：规定允许的最大值；
3. maxlength：规定输入字段的最大字符长度；
4. min：规定允许的最小值；
5. pattern：规定用于验证输入字段的模式；
6. readonly：规定输入字段的值无法修改；
7. required：规定输入字段的值是必需的；
8. size：规定输入字段中的可见字符数；
9. step：规定输入字段的的合法数字间隔；
10. value：规定输入字段的默认值。

---

## 多媒体标签 ##

## 音频 ##

HTML5 新增的 audio 标签允许在页面中插入音频，并且可以使用 JavaScript 操纵插入的音频。简单的实例：

```
...
<audio controls>
    <source src="xxx.mp3" type="audio/mpeg">
    <source src="xxx.ogg" type="audio">
    您的浏览器不支持audio标签
</audio>
...
```

audio 标签支持 mp3、wav 和 ogg 三种音频格式，其中几乎所有浏览器都支持 mp3 格式。

## 视频 ##

除了音频，HTML5 还新增了另一种多媒体标签——video，video 标签允许在页面中插入视频，它同样可以使用 JavaScript 来操纵。简单的实例：

```
...
<video controls>
    <source src="xxx.mp4" type="video/mp4">
    <source src="xxx.ogg" type="video/ogg">
    您的浏览器不支持video标签
</video>
...
```

---

## canvas和svg ##

HTML5 新增的`<canvas>`和`<svg>`标签允许在页面中绘制复杂的图形。

关于 canvas 和 svg 的详细讲解，可以参考文章：[SVG和Canvas](https://github.com/WeiJietao/LogBase/blob/master/SVG%E5%92%8CCanvas.md)

---

## 拖拽事件 ##

HTML5 将拖拽标准化，任何元素都可以拖拽。

关于拖拽的详细讲解，可以参考文章：[关于拖放事件的笔记](https://github.com/WeiJietao/LogBase/blob/master/%E5%85%B3%E4%BA%8E%E6%8B%96%E6%94%BE%E4%BA%8B%E4%BB%B6%E7%9A%84%E7%AC%94%E8%AE%B0.md)

---

## 地理定位 ##

HTML5 Geolocation API 用于获得用户的地理位置。这个新特性可能侵犯用户的隐私，除非用户同意，否则用户位置信息是不可用的。

关于地理定位的详细讲解，可以参考文章：[关于地理位置定位的笔记](https://github.com/WeiJietao/LogBase/blob/master/%E5%85%B3%E4%BA%8E%E5%9C%B0%E7%90%86%E5%AE%9A%E4%BD%8D%E7%9A%84%E7%AC%94%E8%AE%B0.md)

---

```
ARTICLE_ID : 5 
POST_DATE : 2017/08/13
RECENTLY_MODIFY : 2017/08/31
TIME_COUNTER : 1
AUTHER : WJT20
```
