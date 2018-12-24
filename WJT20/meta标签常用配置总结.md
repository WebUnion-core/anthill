
# meta标签常用配置总结 #

## 目录 ##

1. [SEO相关](#href1)
2. [移动设备](#href2)
3. [网页相关](#href3)

## <a name="href1">SEO相关</a> ##

1. 页面关键词：`<meta name="keywords" content="words" />`

    words 为一个或多个关键词组合(以","分隔)。

2. 页面描述：`<meta name="description" content="description" />`

    description 为描述内容。

3. 搜索引擎索引方式：`<meta name="robots" content="type" />`

    type 是一组使用","分隔的值，通常有以下几种取值：
    1. all：文件将被检索，且页面上的链接可以被查询；
    2. none：文件将不被检索，且页面上的链接不可以被查询；
    3. index：文件将被检索；
    4. follow：页面上的链接可以被查询；
    5. noindex：文件将不被检索；
    6. nofollow：页面上的链接不可以被查询。

4. 页面重定向和刷新：`<meta http-equiv="refresh" content="seconds;url=toPage" />`

    seconds 是一个数字，代表时间(秒)，表示多少秒后刷新页面，toPage(可选) 是重定位的页面URL。这个功能不要滥用。


5. 页面作者：`<meta name="author" content="authorName" />`

    authorName 为页面的作者名字。

---

## <a name="href2">移动设备</a> ##

1. viewport：`<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" />`

content 的各参数含义：
    1. width：宽度(取值为数值/device-width)，默认宽度为980px；
    2. height：高度(取值为数值/device-height)；
    3. initial-scale：初始的缩放比例(取值大于0小于10的数值)；
    4. minimum-scale：允许用户缩放到的最小比例；
    5. maximum-scale：允许用户缩放到的最大比例；
    6. user-sccalable：用户是否可以手动缩放(取值为no或yes)。

2. WebApp 全屏模式(伪装app，离线应用)：`<meta name="apple-mobile-web-app-capable" content="yes" />`

3. 状态栏设置(需要实现开启WebApp全屏模式)：`<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />`

content 取值可以是 default、black 或 black-translucent。

4. 设置添加到主屏后的标题：`<meta name="apple-mobile-web-app-title" content="title" />`

title 为设置的标题名。

5. 忽略数字自动识别为电话号码和忽略自动识别邮箱：`<meta name="format-detection" content="telephone=no,email=no" />`

6. 移动端全屏：`<meta name="full-screen" content="yes" />`

---

## <a name="href3">网页相关</a> ##

1. 声明编码：`<meta charset="UTF-8" />`

2. 优先使用IE最新版本和 Chrome：`<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />`

3. 浏览器内核控制：`<meta name="renderer" content="type" />`

    国内浏览器很多都是双内核(webkit 和 Trident)，极速模式使用 webkit 内核，而兼容模式使用IE内核。

    type 取值为 webkit、ie-comp 和 ie-stand 等。

4. 禁止浏览器从本地计算机的缓存中访问页面内容，设置后访问者无法脱机浏览：`<meta http-equiv="Pragma" content="no-cache" />`

---

```
ID         : 6
DATE       : 2017/08/13
AUTHER     : WJT20
TAG        : 
```
