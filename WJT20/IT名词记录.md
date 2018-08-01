
# IT名词记录 #

## 目录 ##

1. [md5](#href1)
2. [Hybrid-App](#href2)
3. [SPA](#href3)

## <a name="href1">md5</a> ##

> 来源: 百度百科

MD5 即 Message-Digest Algorithm 5(信息-摘要算法5)，用于确保信息传输完整一致。是计算机广泛使用的杂凑算法之一(又译摘要算法、哈希算法)，主流编程语言普遍已有 MD5 实现。将数据(如汉字)运算为另一固定长度值，是杂凑算法的基础原理，MD5 的前身有 MD2、MD3 和 MD4。

MD5 算法具有以下特点：

1. 压缩性：任意长度的数据，算出的 MD5 值长度都是固定的。
2. 容易计算：从原数据计算出 MD5 值很容易。
3. 抗修改性：对原数据进行任何改动，哪怕只修改1个字节，所得到的 MD5 值都有很大区别。
4. 强抗碰撞：已知原数据和其 MD5 值，想找到一个具有相同MD5值的数据(即伪造数据)是非常困难的。

MD5 的作用是让大容量信息在用数字签名软件签署私人密钥前被"压缩"成一种保密的格式(就是把一个任意长度的字节串变换成一定长的十六进制数字串)。

## <a name="href2">Hybrid-App</a> ##

> 来源: 百度百科

Hybrid-App(混合模式移动应用)是指介于 Web-App、Native-App 这两者之间的 app，兼具 Native-App 良好用户交互体验的优势和 Web-App 跨平台开发的优势。

Hybrid-App 是指介于 Web-App、Native-App 这两者之间的 app,它虽然看上去是一个 Native-App，但只有一个 UI WebView，里面访问的是一个 Web-App，比如街旁网最开始的应用就是包了个客户端的壳，其实里面是 HTML5 的网页，后来才推出真正的原生应用。再彻底一点的，如掌上百度和淘宝客户端 Android 版，走的也是 Hybrid-App 的路线，不过掌上百度里面封装的不是 WebView，而是自己的浏览内核，所以体验上更像客户端，更高效。

## <a name="href3">SPA</a> ##

> 来源: 百度百科

单页 Web 应用(single page web application，SPA)，就是只有一张 Web 页面的应用。单页应用程序(SPA)是加载单个 HTML 页面并在用户与应用程序交互时动态更新该页面的 Web 应用程序。浏览器一开始会加载必需的 HTML、CSS 和  JavaScript，所有的操作都在这张页面上完成，都由 JavaScript 来控制。因此，对单页应用来说模块化的开发和设计显得相当重要。

---

```
ARTICLE_ID : 44
POST_DATE : 2017/11/15
AUTHER : WJT20
```
