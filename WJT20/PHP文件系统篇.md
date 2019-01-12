
# PHP文件系统篇 #

## 目录 ##

## 参考链接 ##

- [文件系统函数](http://php.net/manual/zh/ref.filesystem.php)

## 查询类API ##

### basename ###

功能: 返回路径中的文件名部分。

语法规则:

```
string basename(string $path [, string $suffix ])
```

path 参数是一个文件路径字符串，注意，Windows 系统允许使用斜杠反斜杠作为目录分隔符，而其他系统环境只允许使用斜杠，所以为了兼容系统，应避免使用反斜杠; suffix 参数为省略的文件后缀名。

示例代码:

```PHP
echo basename('./src/').PHP_EOL;
echo basename('./src/index.html').PHP_EOL;
echo basename('./src/index.html', '.html').PHP_EOL;
```

输出结果:

![image]()

### dirname ###

功能: 返回路径中的目录部分。

语法规则:

```
string dirname(string $path)
```

path 为文件路径字符串。

示例代码:

```PHP
echo dirname('./test.json').PHP_EOL;
echo dirname('./src/index.html').PHP_EOL;
echo dirname('/data/config.php').PHP_EOL;
```

输出结果:

![image]()

### disk_free_space ###

功能: 返回目录中可用的空间大小(字节数)。

语法规则:

```
float disk_free_space(string $directory)
```

directory 为所要查询的目录字符串。

示例代码:

```PHP
echo 'D盘可用空间(字节数): '.disk_free_space('D:/').PHP_EOL;
echo 'C盘可用空间(字节数): '.disk_free_space('C:/').PHP_EOL;
```

输出结果:

![image]()

### disk_total_space ###

功能: 返回目录的磁盘总大小。

语法规则:

```
float disk_total_space(string $directory)
```

示例代码:

```PHP
echo 'D盘磁盘总大小(字节数): '.disk_total_space('D:/').PHP_EOL;
echo 'C盘磁盘总大小(字节数): '.disk_total_space('C:/').PHP_EOL;
```

输出结果:

![image]()

## 修改信息类API ##



## 操作类API ##

### copy ###

功能: 文件复制，并返回操作结果。

语法规则:

```
bool copy($file1, $file2)
```

将 file1 文件拷贝并命名为 file2，注意，如果 file2 已经存在，操作将会覆盖原有文件。

示例代码:

```PHP
$file = 'test.json';
$newFile = 'test.json.bak';
copy($file, $newFile);
```

执行脚本后可以发现同级目录下多出了一个"test.json.bak"文件。

### unlink ###

功能: 删除文件，并返回操作结果。

语法规则:

```
boolean unlink(string $file[, resource $context])
```

file 为要删除的文件，context 是上下文。

示例代码:

```PHP
unlink('test.json.bak');
```

执行脚本后可发现同级目录下的"test.json.bak"文件被删除了。


---

```
ID         : 67
DATE       : 2019/01/10
AUTHER     : WJT20
TAG        : PHP
```
