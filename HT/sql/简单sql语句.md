## SELECT 语句

SELECT 语句用于从表中选取数据。

```sql
SELECT 列名称 FROM 表名称

SELECT * FROM 表名称

SELECT LastName,FirstName FROM Persons
```

## SELECT DISTINCT 语句

返回不重复的值

```sql
SELECT DISTINCT 列名称 FROM 表名称
```

## WHERE 子句

```sql
SELECT 列名称 FROM 表名称 WHERE 列 运算符 值
```

| 操作符  | 描述         |
| ------- | ------------ |
| =       | 等于         |
| <>      | 不等于       |
| >       | 大于         |
| <       | 小于         |
| >=      | 大于等于     |
| <=      | 小于等于     |
| BETWEEN | 在某个范围内 |
| LIKE    | 搜索某种模式 |

```sql
SELECT * FROM Persons WHERE City='Beijing'
```

### BETWEEN 操作符

操作符 BETWEEN ... AND 会选取介于两个值之间的数据范围。这些值可以是数值、文本或者日期。

```sql
select * from country where region between 'Caribbean' and 'Middle East';
```

### LIKE 操作符

- 'A_Z': 所有以 'A' 起头，另一个任何值的字原，且以 'Z' 为结尾的字串。 'ABZ' 和 'A2Z' 都符合这一个模式，而 'AKKZ' 并不符合 (因为在 A 和 Z 之间有两个字原，而不是一个字原)。
- 'ABC%': 所有以 'ABC' 起头的字串。举例来说，'ABCD' 和 'ABCABC' 都符合这个套式。
- '%XYZ': 所有以 'XYZ' 结尾的字串。举例来说，'WXYZ' 和 'ZZXYZ' 都符合这个套式。
- '%AN%': 所有含有 'AN' 这个套式的字串。举例来说， 'LOS ANGELES' 和 'SAN FRANCISCO' 都符合这个套式。

```sql
SELECT "栏位名"
FROM "表格名"
WHERE "栏位名" LIKE {套式};
```

## AND & OR 运算符

AND 和 OR 可在 WHERE 子语句中把两个或多个条件结合起来。

```sql
SELECT * FROM Persons WHERE FirstName='Thomas' AND LastName='Carter'
```

## ORDER BY 子句

升序排序
如需降序 DESC

```sql
SELECT Company, OrderNumber FROM Orders ORDER BY Company
```

## INSERT INTO 语句

INSERT INTO 语句用于向表格中插入新的行

```sql
INSERT INTO 表名称 VALUES (值1, 值2,....)

INSERT INTO table_name (列1, 列2,...) VALUES (值1, 值2,....)
```

## UPDATE 语句

Update 语句用于修改表中的数据。

```sql
UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值

UPDATE Person SET Address = 'Zhongshan 23', City = 'Nanjing'
WHERE LastName = 'Wilson'

```

## DELETE 语句

DELETE 语句用于删除表中的行。

```sql
DELETE FROM 表名称 WHERE 列名称 = 值
```

删除所有行

```sql
DELETE FROM table_name

# 或者

DELETE * FROM table_name
```
