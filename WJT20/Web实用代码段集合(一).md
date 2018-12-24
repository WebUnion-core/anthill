
# Web实用代码段集合(一) #

## 目录 ##

1. [浏览器判断原则](#href1)
2. [检查手机号码格式](#href2)
3. [获取当前URL整段查询字符串](#href3)
4. [获取当前URL查询字符串参数](#href4)
5. [禁止输入文本框缓存输入内容](#href5)
6. [CRT日期转换](#href6)
7. [时间戳转为数值形式](#href7)
8. [文本框placeholder属性设置](#href8)
9. [npm登录及发布包](#href9)
10. [切换npm镜像](#href10)
11. [弹窗自适应居中](#href11)
12. [table布局](#href12)

## <a name="href1">浏览器判断原则</a> ##

代码：

```
var sUserAgent = navigator.userAgent.toLowerCase();
var browser = {
    bIsIOS: !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    bIsUc: sUserAgent.match(/ucweb/i) == "ucweb",
    bIsAndroid: sUserAgent.match(/android/i) == "android",
    bIsAndroidVersion: Number(sUserAgent.substr(sUserAgent.indexOf('android') + 8, 3)),
    bIsQQ: sUserAgent.match(/qq/i) == "qq",
    bIsWechat: sUserAgent.match(/micromessenger/i) == "micromessenger",
    bIsWeibo: sUserAgent.match(/weibo/i) == "weibo",
    bIsHuawei: sUserAgent.match(/huawei/i) == "huawei"
};
```

## <a name="href2">检查手机号码格式</a> ##

代码：

```
function checkPhoneFormat(phone) {
    var pattern = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
    if (pattern.test(phone)) {
        return true;
    } else {
        return false;
    }
};
```

## <a name="href3">获取当前URL整段查询字符串</a> ##

代码：

```
function GetRequest() {
    var url = location.search;
    var theRequest = new Object();

    if (url.indexOf("?") != -1) {
        var str = url.substr(1);//获取url中"?"符后的字串
        return str.replace(/amp;/g, "&"); 
    } else {
        return str;
    }
}
```

## <a name="href4">获取当前URL查询字符串参数</a> ##

代码：

```
function parseQueryString() {
    var str = location.search.slice(1),
        arr = str.split("&"),
        obj = {};

    for(var i = 0; i < arr.length; i++) {
        var item = arr[i].split("="),
            key = decodeURIComponent(item[0]),
            value = decodeURIComponent(item[1]);//一般参数字符串都经过编码，使用decodeURIComponent()方法将键和值转为原始值
        obj[key] = value;
    }

    return obj;
}
```

## <a name="href5">禁止输入文本框缓存输入内容</a> ##

代码：

```
<form autocomplete="off">
    <input type="text" />
</form>

<input type="text" autocomplete="off" />
```

解析：

将 form 元素的 autocomplete 设为off可以禁止其中的所有表单控件缓存输入内容，将单个表单控件的 autocomplete 设为 off 则只禁止单个表单控件的内容缓存。

## <a name="href6">CRT日期转换</a> ##

```
function translateCRT(CRTDate) {
    var time = CRTDate.replace(new RegExp(" CST","gm"),""),
        now = new Date(time),
        year = now.getFullYear(),
        month = now.getMonth() + 1,
        date = now.getDate(),
        hh = now.getHours(),
        mm = now.getMinutes();

    return {
        dataObj: now,
        year: year,
        month: month,
        date: date,
        hour: hh,
        minute: mm
    }
}
```

## <a name="href7">时间戳转为数值形式</a> ##

代码：

```
//yyyy-MM-dd hh:mm:ss形式转为毫秒值
let getTimeLenBySimpleFormat = function(format) {
    let ymd = format.substr(0, 10).split("-"),
        date = new Date();

    date.setFullYear(parseInt(ymd[0]));
    date.setMonth(parseInt(ymd[1]) - 1);
    date.setDate(parseInt(ymd[2]));

    if (format.length > 10) {
        let hms = format.substr(11).split(":");
        date.setHours(parseInt(hms[0]));
        date.setMinutes(parseInt(hms[1]));
        date.setSeconds(parseInt(hms[2]));            
    }
    return +date;
}
```

## <a name="href8">文本框placeholder属性设置</a> ##

代码：

```
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
  color: #a1a1a1;
}
input:-moz-placeholder, textarea:-moz-placeholder {
  color: #a1a1a1;
}
input::-moz-placeholder, textarea::-moz-placeholder {
  color: #a1a1a1;
}
input:-ms-input-placeholder, textarea:-ms-input-placeholder {
  color: #a1a1a1;
}
```

## <a name="href9">使用touchstart代替移动端click事件</a> ##

代码：

```
document.getElementById("dialog_bg").addEventListener("touchstart", function () {
    // TODO
});
```

解析：

在移动端，touchstart 比 click 要灵敏得多。

## <a name="href10">npm登录及发布包</a> ##

1. npm登录及发布：

```
npm login
npm publish
```

2. cnpm登录及发布：

```
npm login --registry http://registry.npmjs.org
npm publish --registry http://registry.npmjs.org
```

## <a name="href11">切换npm镜像</a> ##

```
nrm ls
nrm add npm-company http://xmiles.xicp.net:4873/
nrm use
```

## <a name="href12">弹窗自适应居中</a> ##

```
.dialog{
    width: 80%;
    position: fixed;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    border-radius: 0.1rem 0.1rem;
    background-color: #ffffff;
    z-index: 200;
}
```

## <a name="href13">table布局</a> ##

```
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
TAG        : 
```
