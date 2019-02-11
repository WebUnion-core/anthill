
# Node.js对MySQL增删改查实践 #

## 目录 ##

1. [参考链接](#href1)
2. [环境配置](#href2)
3. [连接数据库和关闭数据库连接](#href3)
4. [增——增加记录](#href4)
5. [删——删除记录](#href5)
6. [改——修改记录](#href6)
7. [查——查询记录](#href7)

## <a name="href1">参考链接</a> ##

- [Nodejs mysql的增、删、改、查操作](https://www.cnblogs.com/dengcw/p/5600035.html)

## <a name="href2">环境配置</a> ##

首先在本地配置 MySQL 环境，本人已事先用 XAMPP 在本地搭建好了LAMP环境，在 phpMyAdmin 客户端创建一个名为test的数据库，并创建一个名为 person 的表，表结构为:

| 字段名 | 含义     | 类型        | 备注               |
| :----: | :-----: | :---------: | :---------------: |
| id     | 唯一标识 | INT        | 主键、唯一、自动增加 |
| name   | 名称    | VARCHAR(32) | --                 |
| age    | 年龄    | INT         | 默认值0            |
| job    | 职业    | VARCHAR(32) | --                 |

在本地配置完 Node.js 环境的情况下，在本地项目中使用`npm i -D mysql`安装 mysql 模块，至此环境配置结束。

mysql 模块的[官方文档](https://github.com/mysqljs/mysql/)描述得比较详细，接下来就按照官方文档的介绍来演示数据库操作。

## <a name="href3">连接数据库和关闭数据库连接</a> ##

连接数据库之前，要用`mysql.createConnection(OPTION)`创建数据库连接，OPTION 参数用于传入数据库连接所需的配置参数(主机、端口、账号、密码和操作数据库名等)。

用例主程序文件为 index.js，连接数据库的代码如下:

```js
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'test'
});

connection.connect(function(err) {
    if (err) {
        throw new Error(err);
    }
    console.log('Connect successfully! ');
});
```

根目录下打开终端，输入`node ./index.js`，输出如下内容表示数据库连接成功:

![image](https://raw.githubusercontent.com/WebUnion-core/anthill/master/WJT20/images/w108.png)

关闭数据库连接的操作，用到的是`connection.end()`，在其他操作执行完毕后直接调用即可。

## <a name="href4">增——增加记录</a> ##

`connection.query(SQL, CALLBACK)`方法用于执行SQL语句，其接受两个参数:

1. SQL: 要执行的SQL语句，为 String 类型；
2. CALLBACK: 查询完成时执行的回调，注入三个参数 error、results 和 fields。

增加记录的代码如下:

```js
...
connection.query(
    'INSERT INTO person(name,age,job) VALUES ("WJT20",24,"programmer")',
    function(error, result, fields) {
        if (error) {
            throw new Error(error);
        }
        console.log('Insert successfully! ');
    }
);
```

重新执行脚本，可以看到"Insert successfully! "的信息，查看数据库，可以看到这条记录已经成功添加到数据库中了:

![image](https://raw.githubusercontent.com/WebUnion-core/anthill/master/WJT20/images/w109.png)

## <a name="href5">删——删除记录</a> ##

删除记录的代码如下:

```js
...
connection.query(
    'DELETE FROM person WHERE id=1',
    function(error, result, fields) {
        if (error) {
            throw new Error(error);
        }
        console.log('Delete successfully! ');
    }
);
```

执行完脚本，可以看到 person 表中id为1的记录已经被删除了。

## <a name="href6">改——修改记录</a> ##

修改记录的代码如下:

```js
...
connection.query(
    'UPDATE person SET name="Tom" WHERE id=5',
    function(error, result, fields) {
        if (error) {
            throw new Error(error);
        }
        console.log('Update successfully! ');
    }
);
```

执行完脚本，可以看到 person 表中id为5的记录的name值变为了"Tom"。

## <a name="href7">查——查询记录</a> ##

查询记录的代码如下:

```js
...
connection.query(
    'Select * from person where id=5',
    function(error, result, fields) {
        if (error) {
            throw new Error(error);
        }
        console.log(result);
    }
);
```

返回的数据存放在 result 中，可以看到 result 是一个数组:

![image](https://raw.githubusercontent.com/WebUnion-core/anthill/master/WJT20/images/w110.png)

---

```
ID         : 123
DATE       : 2017/12/13
AUTHER     : WJT20
TAG        : Node.js
```
