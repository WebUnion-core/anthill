## 打包的页面html里面要引入文件 cordova.js

## 极光推送插件

文档地址: https://github.com/jpush/jpush-phonegap-plugin/blob/master/doc/Common_detail_api.md#event---jpushopennotification

插件名 : jpush-phonegap-plugin

```js
/*
    点击通知栏消息打开页面
    */
function onOpenNotification(event) {
  try {
    var alertContent = event.alert;
    console.log("推送消息标题：" + event.title);
    console.log("推送消息内容：" + alertContent);
    router.push({
      path: "/seting/aboutMe"
    });

  } catch (exception) {
    console.log("点击了推送消息操作失败：" + exception);
  }
}
//注册极光推送点击通知事件
document.addEventListener("jpush.openNotification", onOpenNotification, false);
```

## 点击两次推出app

```html

<script src="cordova.js"></script>
<script type="text/javascript" charset="utf-8">
    // Wait for device API libraries to load    //
    function onLoad() {
        document.addEventListener("deviceready", onDeviceReady, false);
    }
    document.addEventListener("deviceready", onDeviceReady, false);
 
    function onDeviceReady() {
        //navigator.splashscreen.hide();
        document.addEventListener("backbutton", onBackKeyDown, false);
    }
    function onBackKeyDown() {
        window.plugins.toast.showLongCenter('再按一次退出', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)})
        document.removeEventListener("backbutton", onBackKeyDown, false); // 注销返回键
        document.addEventListener("backbutton", exitApp, false);//绑定退出事件
        // 3秒后重新注册
        var intervalID = window.setInterval(function() {
            window.clearInterval(intervalID);
            document.removeEventListener("backbutton", exitApp, false); // 注销返回键
            document.addEventListener("backbutton", onBackKeyDown, false); // 返回键
        }, 3000);
    }
    function exitApp(){
        navigator.app.exitApp();
    }

```

需要安装TOAST插件
cordova plugin add cordova-plugin-x-toast

## 关于微信插件 

需要用2.0.0版本，否则打包不成功