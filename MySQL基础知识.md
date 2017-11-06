
# MySQL基础知识 #

## 目录 ##

1. 表操作
    1. 建表

---

## 表操作 ##

### 建表 ###

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

```
ARTICLE_ID : 40
POST_DATE : 2017/11/6
AUTHER : WJT20
```
