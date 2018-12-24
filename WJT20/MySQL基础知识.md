
# MySQL基础知识 #

## 目录 ##

1. [表操作](#href1)
 [](#href2)   1. 建表
2. [增删改查](#href3)
 [](#href4)   1. 增加记录
 [](#href5)   2. 查询记录
 [](#href6)   3. 修改记录
 [](#href7)   4. 删除记录

## <a name="href1">表操作</a> ##

### <a name="href1-1">建表</a> ###

示例：

```
CREATE TABLE wjt_base.user (
    id INT(5) NOT NULL,
    name VARCHAR(10) NULL,
    age INT(255) NULL DEFAULT 0
);
```

建表使用的是`CREATE TABLE`语句，`wjt_base.user`表示在 wjt_base 数据库下创建 user 表，其后的"()"中的内容就是数据表的配置，我们定义了一个长度5的int类型非空字段——id，一个长度为10的 varchar 类型可为空字段——name和一个长度为255的int类型可为空且默认值为0的字段——age。

---

## <a name="href2">增删改查</a> ##

### <a name="href2-2">增加记录</a> ###

示例：

```
INSERT INTO user VALUES(1, "小明", 15);
```

增加记录主要用到了 insert 语句，以上语句表示，在 user 表中插入一条记录，记录内容为：id为1，name为“小明”，年龄为15。

### <a name="href2-3">查询记录</a> ###

示例：

```
SELECT * FROM user; /* 查找所有记录 */

SELECT name FROM user WHERE id=1; /* 查找单条记录的一个字段 */

SELECT name AS user_name from user WHERE id=1; /* 给查询的字段取个别名 */
```

查询记录可以说是最常用的 MySQL 语句了，以上第一句代码用处是查询 user 表中的所有记录，第二句代码用处是查询 user 表中id为1的那条记录的 name 字段，最后一句代码的作用则是给查询到的 name 字段取个别名 user_name。

### <a name="href2-4">修改记录</a> ###

示例：

```
UPDATE user
	SET id=2,name="小红",age=25
	WHERE id=1
```

修改记录用到了 update 语句，以上语句首先用 where 锁定修改的目标为id为1的记录，如果不使用 where，那么这条修改语句针对的就是所有记录，这一点需要特别注意，修改的表为 user，修改内容用到了set语句，这里我们将小明的id改为2，并将他变性为25岁的美女小红。

### <a name="href2-5">删除记录</a> ###

示例：

```
DELETE FROM user WHERE id=1
```

删除记录使用的是 delete 语句，以上代码删除了 user 表中id为1的记录。

---

```
ID         : 40
DATE       : 2017/11/6
AUTHER     : WJT20
TAG        : 
```
