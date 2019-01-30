
# 必须掌握的SQL技能 #

## 目录 ##

## 库操作 ##

1. 建库

    建库使用的是`CREATE DATABASE`语句，语法规则为:

    ```
    CREATE DATABASE <DATABASE_NAME>;
    ```

    `<DATABASE_NAME>`为要创建的数据库名。

    示例:

    ```SQL
    -- 创建test库
    CREATE DATABASE `test`
    ```

2. 删库

    删库使用的是`DROP DATABASE`语句，语法规则为:

    ```
    DROP DATABASE <DATABASE_NAME>
    ```

    示例:

    ```SQL
    -- 删除test库
    DROP DATABASE `test`
    ```

    正所谓"删库有风险，操作需谨慎"，在进行这步操作之前还需三思。

## 表操作 ##

1. 建表

    建表使用的是`CREATE TABLE`语句，语法规则为:

    ```
    CREATE TABLE <TABLE_NAME> (...<FIELDS>)
    ```

    `<TABLE_NAME>`为创建的表名，`<FIELDS>`为附加的字段声明。

    示例:

    ```SQL
    -- 在wjt20库下创建一个user表，并附加具体字段
    CREATE TABLE wjt20.user (
        id INT(5) NOT NULL, -- int类型，长度5，非空的id字段
        name VARCHAR(10) NULL, -- varchar类型，长度10，可为空的name字段
        age INT(255) NULL DEFAULT 0 -- int类型，长度255，可为空，默认取值0的age字段
    );
    ```

2. 删表

    删表使用的是`DROP TABLE`语句，语法规则为:

    ```
    DROP TABLE <TABLE_NAME>
    ```

    示例:

    ```SQL
    -- 删除wjt20库下的user表
    DROP TABLE wjt20.user
    ```

## 增删改查 ##

### 增加记录 ###

增加记录使用的是`INSERT`语句，语法规则为:

```
INSERT INTO <TABLE_NAME> [(...<KEYS>)] VALUES(...<VALUES>)
```

`<KEYS>`为字段名集合(可选)，`<VALUES>`为插入的记录值。

示例:

```SQL
--
INSERT INTO user (id, name, age) VALUES(1, "小明", 15);
```

批量增加记录:

示例:

```SQL
insert into persons (id_p, lastname , firstName, city )
values
(200,'haha' , 'deng' , 'shenzhen'),
(201,'haha2' , 'deng' , 'GD'),
(202,'haha3' , 'deng' , 'Beijing');
```

### 查询记录 ###

示例:

```SQL
SELECT * FROM user; /* 查找所有记录 */

SELECT name FROM user WHERE id=1; /* 查找单条记录的一个字段 */

SELECT name AS user_name from user WHERE id=1; /* 给查询的字段取个别名 */
```

查询记录可以说是最常用的 MySQL 语句了，以上第一句代码用处是查询 user 表中的所有记录，第二句代码用处是查询 user 表中id为1的那条记录的 name 字段，最后一句代码的作用则是给查询到的 name 字段取个别名 user_name。

### 修改记录 ###

示例:

```SQL
UPDATE user
	SET id=2,name="小红",age=25
	WHERE id=1
```

修改记录用到了 update 语句，以上语句首先用 where 锁定修改的目标为id为1的记录，如果不使用 where，那么这条修改语句针对的就是所有记录，这一点需要特别注意，修改的表为 user，修改内容用到了set语句，这里我们将小明的id改为2，并将他变性为25岁的美女小红。

### 删除记录 ###

示例:

```SQL
DELETE FROM user WHERE id=1
```

删除记录使用的是 delete 语句，以上代码删除了 user 表中id为1的记录。

---

```
ID         : 40
DATE       : 2017/11/6
AUTHER     : WJT20
TAG        : 数据库
```
