# Web实用代码段集合(一) #

## 目录 ##

---

## 浏览器判断原则 ##

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

---

## 检查手机号码格式 ##

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

---

## 获取当前URL整段查询字符串 ##

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

---

## 获取当前URL查询字符串参数 ##

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

---

```
ARTICLE_ID : 28
POST_DATE : 2017/08/29
RECENTLY_MODIFY : 2017/08/29
TIME_COUNTER : 1
AUTHER : WJT20
```
