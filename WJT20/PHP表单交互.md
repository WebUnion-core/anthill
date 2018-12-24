
# PHP表单交互 #

## 目录 ##

1. [简单的表单实现](#href1)
2. [Ajax表单](#href2)

## <a name="href1">简单的表单实现</a> ##

前端代码如下(文件名为 page.html):

```
<!DOCTYPE html>
<html>
<head>
    <title>Page</title>
    <meta charset="UTF-8" />
</head>
<body>
    <form action="./receive.php" method="POST">
        <input type="text" placeholder="姓名" required />
        <input type="submit" value="确定" />
    </form>
</body>
</html>
```

后端代码如下(文件名为 receive.php):

```
<?php
    echo '<p>Hello, '.$_POST['user_name'].'</p>'
?>
```

步骤:

1. page.html 中输入"WJT20";
2. 点击提交按钮，跳转到 receive.php 页面;
3. 在 receive.php 页面，可以看到"Hello, WJT20"字眼，至此，我们实现了最简单的表单。

解析:

首先，html 页面中有一个表单 form 标签，这就是前后端数据交互的载体，form 标签设置有两个属性: action 和 method，action 属性即为数据发送的目标文件的 url，而 method 则是将数据发送给目标文件的方式，常用的有 get 和 post 两种，关于这两者的区别，这里不多讲，请自行百度。

然后，form 内部有两个表单组件，一个是要求输入姓名的文本框，另一个是提交按钮，传统表单中，提交按钮是必不可少的。后端通过"字段"来识别并处理某个数据，前端必须设置好"字段"这个东西，我们只需要给表单组件加上 name 属性即可，建议使用"\_"作为分隔符的命名方式命名字段。

按下提交按钮后，后端 php 文件开始接收和处理数据了，若是 post 方式发送数据，则使用 $\_POST[KEY] 来接收某个字段数据，KEY 参数为字段名，类型为字符串，若是 get 方式发送数据，则使用 $\_GET[KEY]，参数同 $\_POST。

## <a name="href2">Ajax表单</a> ##

前面介绍的是传统的表单交互，现在用的更多的是 Ajax 表单，前后端以 json 型数据交互。

前端代码如下(文件名为 page.html):

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />

    <!-- 引入jquery，方便使用Ajax -->
    <script src="https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/jquery/jquery-1.10.2.min_65682a2.js"></script>
</head>
<body>
    <div>
        <input id="user-name" type="text" placeholder="姓名" required />
        <input id="comfirm-btn" type="button" value="确定" />
    </div>
    <script>
    $('#comfirm-btn').on('click', function() {
        $.ajax({
            url: './receive.php',
            type: 'POST',
            dataType: 'json', // 数据类型为JSON
            data: { user_name: $('#user-name').val() }, // 要发送的数据
            error: function(err) {
                console.error(err);
            },
            success: function(res) {
                if (res.status === 1 && res.data) {
                    alert('ID: ' + res.data.id + ', USER: ' + res.data.name);
                } else {
                    alert('Error...');
                }
            }
        });
    });
    </script>
</body>
</html>
```

后端代码如下(文件名为 receive.php):

```
<?php
    // 先将数据封装为数组
    $data = array(
        'status' => 1,
        'data' => array(
            'id' => '001',
            'name' => $_POST['user_name'],
        )
    );

    // 再将数组转为JSON
    $data_json = json_encode($data);

    // 最后返回前端
    echo $data_json;
?>
```

---

```
ID         : 59
DATE       : 2018/01/13
AUTHER     : WJT20
TAG        : PHP
```
