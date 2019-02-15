
# 必须掌握的SQL技能 #

## 目录 ##

1. [库操作](#href1)
    1. [建库](#href1-1)
    2. [删库](#href1-2)
2. [表操作](#href2)
    1. [建表](#href2-3)
    2. [删表](#href2-4)
    3. [清空表中数据](#href2-5)
3. [增删改查](#href3)
    1. [增加记录](#href3-6)
    2. [查询记录](#href3-7)
    3. [修改记录](#href3-8)
    4. [删除记录](#href3-9)
4. [表结构操作](#href4)
    1. [添加字段](#href4-10)
    2. [修改字段](#href4-11)
    3. [删除字段](#href4-12)
    4. [其他](#href4-13)

## <a name="href1">库操作</a> ##

### <a name="href1-1">建库</a> ###

建库使用的是`CREATE DATABASE`语句，语法规则为:

```
CREATE DATABASE <DATABASE_NAME>;
```

`<DATABASE_NAME>`为要创建的数据库名。

示例:

```SQL
-- 创建test库
CREATE DATABASE test
```

### <a name="href1-2">删库</a> ###

删库使用的是`DROP DATABASE`语句，语法规则为:

```
DROP DATABASE <DATABASE_NAME>
```

示例:

```SQL
-- 删除test库
DROP DATABASE test
```

正所谓"删库有风险，操作需谨慎"，在进行这步操作之前还需三思。

## <a name="href2">表操作</a> ##

### <a name="href2-3">建表</a> ###

建表使用的是`CREATE TABLE`语句，语法规则为:

```
CREATE TABLE <TABLE_NAME> (...<FIELDS>)
```

`<TABLE_NAME>`为创建的表名; `<FIELDS>`为附加的字段声明。

示例:

```SQL
-- 在wjt20库下创建一个user表，并附加具体字段，默认数据库引擎是InnoDB
CREATE TABLE wjt20.user(
    -- int类型，长度10，非空，自增，注释为"主键id"，名为"id"的字段
    id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键id',

    -- varchar类型，长度10，字符集类型为"utf8mb4_unicode_ci"，默认值为NULL，名为"name"的字段
    name VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,

    -- int类型，长度3，无符号，非空，默认值为0，名为"age"的字段
    age INT(3) UNSIGNED NOT NULL DEFAULT '0',

    -- 主键为"id"
    PRIMARY KEY(id)
) ENGINE = InnoDB;
```

### <a name="href2-4">删表</a> ###

删表使用的是`DROP TABLE`语句，语法规则为:

```
DROP TABLE <TABLE_NAME>
```

示例:

```SQL
-- 删除wjt20库下的user表
DROP TABLE wjt20.user
```

### <a name="href2-5">清空表中数据</a> ###

清空表中的数据使用的是`TRUNCATE`语句，语法规则为:

```
TRUNCATE <TABLE_NAME>
```

示例:

```SQL
TRUNCATE wjt20.user
```

## <a name="href3">增删改查</a> ##

### <a name="href3-6">增加记录</a> ###

增加记录使用的是`INSERT INTO`语句，语法规则为:

```
INSERT INTO <TABLE_NAME> [(...<FIELDS>)] VALUES(...<VALUES>)
```

`<FIELDS>`为字段名集合(可选); `<VALUES>`为插入的记录值。

增加单条记录的示例:

```SQL
INSERT INTO wjt20.user(id, name, age)
VALUES(1, "小明", 15)
```

批量增加记录的示例:

```SQL
INSERT INTO wjt20.user(id, name, age)
VALUES(1, "小智", 10),(2, "小刚", 10),(3, "小霞", 10)
```

### <a name="href3-7">查询记录</a> ###

查询记录使用的是`SELECT FROM`语句，语法规则为:

```
SELECT <FIELDS> [AS <NEW_FIELDS>] FROM <TABLE_NAME> [WHERE ...]
```

`<FIELDS>`是查询的字段名(也可以用`*`获取所有字段)，多个字段名用","连接; `<NEW_FIELDS>`是新起的字段名(可选);

示例:

```SQL
SELECT * FROM wjt20.user -- 查找所有记录
SELECT name FROM wjt20.user WHERE id=1 -- 查找单条记录的一个字段

-- 给查询的字段取个别名
SELECT name AS
    user_name
FROM
    wjt20.user
WHERE
    id = 1
```

### <a name="href3-8">修改记录</a> ###

修改记录使用的是`UPDATE SET`语句，语法规则为:

```
UPDATE <TABLE_NAME> SET <KEY_VALUE_PAIR> [WHERE ...]
```

`<KEY_VALUE_PAIR>`是键值对。

示例:

```SQL
UPDATE
    wjt20.user
SET
    name = "小红",
    age = 100
WHERE
    id = 1
```

### <a name="href3-9">删除记录</a> ###

删除记录使用的是`DELETE`语句，语法规则为:

```
DELETE FORM <TABLE_NAME> [WHERE ...]
```

示例:

```SQL
-- 删除id为1的记录
DELETE FROM wjt20.user WHERE id=1
```

## <a name="href4">表结构操作</a> ##

### <a name="href4-10">添加字段</a> ###

在表中添加字段，使用的是`ALTER ADD`，语法规则为:

```
ALTER TABLE <TABLE_NAME> ADD <FIELD> ...<FIELD> [AFTER <FIELD>];
```

如果不加`AFTER`，默认会把新增的字段添加到表结构的尾部。

示例:

```SQL
-- 在user表尾部添加一个group_id字段
ALTER TABLE wjt20.user ADD group_id INT(10) NOT NULL;
```

### <a name="href4-11">修改字段</a> ###

修改表中某个字段的结构，使用的是`ALTER CHANGE`语句，语法规则为:

```
ALTER TABLE <TABLE_NAME> CHANGE <FIELD> ...<FIELD>
```

示例:

```SQL
-- user表的name字段长度由10扩展到15
ALTER TABLE wjt20.user
CHANGE name
name VARCHAR(15)
```

### <a name="href4-12">删除字段</a> ###

删除表中某个字段，使用的是`ALTER DROP`语句，语法规则为:

```
ALTER TABLE <TABLE_NAME> DROP <FIELD>
```

示例:

```SQL
-- 删除user表中的name字段
ALTER TABLE wjt20.user DROP name
```

### <a name="href4-13">其他</a> ###

`ALTER ADD`可以进行以下操作:

1. 修改主键索引，示例:

    ```SQL
    -- 将主键改为name字段
    ALTER TABLE wjt20.user ADD PRIMARY KEY(name)
    ```

2. 添加唯一索引，示例:

    ```SQL
    -- 给name字段添加唯一索引
    ALTER TABLE wjt20.user ADD UNIQUE(name)
    ```

3. 添加普通索引，示例:

    ```SQL
    -- 给name字段添加普通索引
    ALTER TABLE wjt20.user ADD INDEX(name)
    ```

---

```
ID         : 40
DATE       : 2017/11/6
AUTHER     : WJT20
TAG        : 数据库
```
