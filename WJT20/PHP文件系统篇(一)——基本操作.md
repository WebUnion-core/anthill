
# PHP文件系统篇(一)——基本操作 #

## 目录 ##

1. [参考链接](#href1)
2. [basename](#href2)
3. [dirname](#href3)
4. [disk_free_space](#href4)
5. [disk_total_space](#href5)
6. [file_exists](#href6)
7. [copy](#href7)
8. [unlink](#href8)
9. [mkdir](#href9)
10. [rmdir](#href10)
11. [rename](#href11)
12. [fileatime](#href12)
13. [filesize](#href13)
14. [filetype](#href14)

## <a name="href1">参考链接</a> ##

- [文件系统函数](http://php.net/manual/zh/ref.filesystem.php)

## <a name="href2">basename</a> ##

功能: 返回路径中的文件名部分。

语法规则:

```
string basename(string $path[, string $suffix])
```

path 参数是一个文件路径字符串，注意，Windows 系统允许使用斜杠反斜杠作为目录分隔符，而其他系统环境只允许使用斜杠，所以为了兼容系统，应避免使用反斜杠; suffix 参数为省略的文件后缀名。

示例代码:

```PHP
echo basename('./src/').PHP_EOL; // "src"
echo basename('./src/index.html').PHP_EOL; // "index.html"
echo basename('./src/index.html', '.html').PHP_EOL; // "index"
```

## <a name="href3">dirname</a> ##

功能: 返回路径中的目录部分。

语法规则:

```
string dirname(string $path)
```

path 为文件路径字符串。

示例代码:

```PHP
echo dirname('./test.json').PHP_EOL; // "."
echo dirname('./src/index.html').PHP_EOL; // "./src"
echo dirname('/data/config.php').PHP_EOL; // "/data"
```

## <a name="href4">disk_free_space</a> ##

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

![image](https://raw.githubusercontent.com/WebUnion-core/anthill/master/WJT20/images/w111.png)

## <a name="href5">disk_total_space</a> ##

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

![image](https://raw.githubusercontent.com/WebUnion-core/anthill/master/WJT20/images/w112.png)

## <a name="href6">file_exists</a> ##

功能: 判断文件或目录是否存在。

语法规则:

```
boolean file_exists(string $filename)
```

示例代码:

```PHP
echo file_exists('./test.json').PHP_EOL;
```

## <a name="href7">copy</a> ##

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

## <a name="href8">unlink</a> ##

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

## <a name="href9">mkdir</a> ##

功能: 创建目录。

语法规则:

```
boolean mkdir(string $pathname[, int $mode=0777[, bool $recursive=false[, resource $context]]])
```

示例代码:

```PHP
mkdir('./test');
```

执行脚本后可发现同级目录下多出了一个名为"test"的目录。

## <a name="href10">rmdir</a> ##

功能: 删除目录。

语法规则:

```
boolean rmdir(string $dirname[, resource $context])
```

示例代码:

```PHP
rmdir('./test');
```

## <a name="href11">rename</a> ##

功能: 重命名一个文件或目录，也可以达到移动文件(目录)的目的。

语法规则:

```
boolean rename(string $oldname, string $newname[, resource $context])
```

示例代码:

```PHP
rename('./cache.json', './data/1.json');
```

## <a name="href12">fileatime</a> ##

功能: 取得文件的上次访问时间。

语法规则:

```
int fileatime(string $filename)
```

示例代码:

```PHP
echo fileatime('./cache.json').PHP_EOL; // 1547384291
```

## <a name="href13">filesize</a> ##

功能: 获取文件的体积。

语法规则:

```
int filesize(string $filename)
```

示例代码:

```PHP
echo filesize('./cache.json').PHP_EOL; // 16
```

## <a name="href14">filetype</a> ##

功能: 获取文件类型。

语法规则:

```
string filetype(string $filename)
```

返回的可能值有 fifo, char, dir, block, link, file 和 unknown。

示例代码:

```PHP
echo filetype('./cache.json').PHP_EOL; // "file"
```

---

```
ID         : 67
DATE       : 2019/01/10
AUTHER     : WJT20
TAG        : PHP
```
