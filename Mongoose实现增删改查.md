
## Mongoose实现增删改查 ##

### 目录 ###

1. 参考链接
2. Mongoose概述
3. 连接MongoDB
4. Schema及Model
5. 增——增加记录
6. 删——删除记录
7. 改——修改记录
8. 查——查询记录

---

### 参考链接 ###

- [mongodb操作之mongoose(一)](https://segmentfault.com/a/1190000005711812)

- [Mongoose增删查改](https://segmentfault.com/a/1190000009173871)

---

### Mongoose概述 ###

Mongoose 是一种利用 Node.js 模块对 MondoDB 数据库进行操作的工具包，它有着结构化、操作性强、可重复的优点，更重要的是它将 MongoDB 返回的 JSON 字符串包装成了 JSON 对象，这在操作时要比直接使用字符串方便得多。

关于 MongoDB 的安装和使用，可以参考文章：...

---

### 连接MongoDB ###

首先在项目中使用 npm(cnpm 更佳)安装 mongoose：`npm install --save-dev mongoose`，连接 Mongoose 需要先开启 MongoDB服务，接着在服务端脚本(index.js)中写入代码：

```
var mongoose = require('mongoose');//引入mongoose模块
var db = mongoose.connect('mongodb://localhost/test');//连接本地数据库

db.connection.on('error', function(error) {
    console.log('Connect fail\n' + error);
});//连接失败处理
db.connection.on('open', function() {
    console.log('Connect success');
});//连接成功处理
```

在项目根目录下，执行命令`node index.js`启动项目。

---

### Schema及Model ###

Schema 指数据库集合的模型骨架，或者是数据属性模型传统意义的表结构。

Model 是由 Schema 构造而成，除了具有 Schema 定义的数据库骨架以外，还可以具体的操作数据库。

Entity 是由 Model 创建的实体，它也可以操作数据库，但 Model 比 Entity 更具操作性。

创建 Schema 及 Model 的方法：

```
var TestSchema = new mongoose.Schema({
    name: { type: String },
    id: { type: Number },
    time: { type: Date, default: Date.now }
});//创建Schema
var TestModel = db.model('test', TestSchema);//将Schema转换为Model，test集合使用Schema结构，若不存在test集合，则自动创建
```

---

### 增——增加记录 ###

增加记录有两种方法，分别是使用 Model 的 create() 方法和使用 Entity 的 save() 方法。

1. 使用 Model 的 create(data, callback) 方法，参数 data(对象) 为要插入的数据，参数 callback(函数) 为执行成功后执行的函数，其包含两个参数：error 错误信息和 doc 返回的数据。

    ```
    var data = {
        name: 'WJT20',
        id: 1
    }//实验记录数据
    TestModel.create(data, function(error, doc) {
        if (error) {
            console.log(error);
        } else {
            console.log(doc);
        }
    });//插入一条记录
    ```

    使用 MondoDB 可视化工具 Robomongo 可以看到以下结果：

    ![image](./images/w36.png)

2. 使用 Entity 的 save(callback) 方法，参数 callback 与 Model.create() 的 callback 参数形式相同。

    ```
    var TestEntity = new TestModel({
        name: 'WJT20',
        id: 1
    });//使用TestModel新建一个数据
    TestEntity.save(function(error, doc) {
        if (error) {
            console.log(error);
        } else {
            console.log(doc);
        }
    });//插入一条记录
    ```

    效果：

    ![image](./images/w37.png)

---

### 删——删除记录 ###

删除记录使用的是 Model 的 remove(condition, callback) 方法，参数 condition(对象) 为所要删除记录的检索条件，参数 callback(函数) 只有一个参数 error 错误信息。

```
TestModel.remove({ name: 'WJT20' }, function(error) {
    if (error) {
        console.log(error);
    } else {
        console.log('Delete success');
    }
});//删除"name"为"WJT20"的所有记录
```

效果：

![image](./images/w38.png)

---

### 改——修改记录 ###

修改记录使用的是 Model 的 update(condition, data, callback) 方法，参数 condition 与 Model.remove() 的 condition 参数形式相同；参数 data(对象) 为修改新内容，注意，data 的值会完全覆盖原来的所有字段的值，如果只想修改一个字段值，应使用 $set 操作符；参数 callback 与 Model.remove() 的 callback 形式相同。

```
TestModel.update({ name: 'WJT20' }, { $set: { name: 'Didy' } }, function(error) {
    if (error) {
        console.log(error);
    } else {
        console.log('Update success');
    }
});
```

效果：

![image](./images/w39.png)

---

### 查——查询记录 ###

查询记录使用的是 Model 的 find(condition, callback) 方法，参数 condition 同样是记录检索条件，参数 callback 同样有两个参数 error 错误信息和返回的记录。注意，查询返回的是一个记录数组。

```
TestModel.find({ name: 'WJT20' }, function(error, doc) {
    if (error) {
        console.log(error);
    } else {
        console.log(doc);
    }
});
```

效果：

![image](./images/w40.png)

---

```
ARTICLE_ID      : 13
POST_DATE       : 2017/08/14
RECENTLY_MODIFY : 2017/08/14
TIME_COUNTER    : 0D
AUTHER          : WJT20
```