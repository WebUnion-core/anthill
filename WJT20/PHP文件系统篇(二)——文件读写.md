
# PHP文件系统篇(二)——文件读写 #

## 目录 ##

1. [参考链接](#href1)
2. [fopen](#href2)
3. [fclose](#href3)
4. [fwrite](#href4)
5. [fflush](#href5)
6. [fgetc](#href6)
7. [fgets](#href7)
8. [fread](#href8)
9. [fstat](#href9)

## <a name="href1">参考链接</a> ##

- [文件系统函数](http://php.net/manual/zh/ref.filesystem.php)

## <a name="href2">fopen</a> ##

功能: 打开文件或者URL。

语法规则:

```
resource fopen(string $filename, string $mode[, boolean $use_include_path = false[, resource $context]])
```

如果 filename 是"scheme://..."的格式，则会被识别为URL，PHP将搜索协议处理器(也被称为封装协议)来处理此模式，如果该协议尚未注册封装协议，PHP将发出一条消息来帮助检查脚本中潜在的问题并将 filename 当成一个普通的文件名继续执行下去。

如果 filename 被识别为一个本地文件，将尝试在该文件上打开一个流。该文件必须是PHP可以访问的，因此需要确认文件访问权限允许该访问。

如果 filename 被识别为一个已注册的协议，而该协议被注册为一个网络URL，PHP将检查并确认`allow_url_open`已被激活，如果关闭了，PHP将发出一个警告，而`fopen`的调用将会失败。

mode 参数指定了文件流的访问类型，可选值列表为:

| 可选值 | 说明 |
| :-: | :- |
| r | 只读方式打开，将文件指针指向文件头 |
| r+ | 读写方式打开，将文件指针指向文件头 |
| w | 写入方式打开，将文件指针指向文件头并将文件大小截为零(如果文件不存在则尝试创建之) |
| w+ | 读写方式打开，将文件指针指向文件头并将文件大小截为零(如果文件不存在则尝试创建之) |
| a | 写入方式打开，将文件指针指向文件末尾(如果文件不存在则尝试创建之) |
| a+ | 读写方式打开，将文件指针指向文件末尾(如果文件不存在则尝试创建之) |
| x | 创建并以写入方式打开，将文件指针指向文件头。如果文件已存在，则 fopen() 调用失败并返回 FALSE，并生成一条 E_WARNING 级别的错误信息。如果文件不存在则尝试创建之。这和给 底层的 open(2) 系统调用指定 O_EXCL/O_CREAT 标记是等价的|
| x+ | 创建并以读写方式打开，其他的行为和"x"一样 |

注意，在操作二进制文件时如果没有指定 "b" 标记，可能会碰到一些奇怪的问题，包括坏掉的图片文件以及关于"\r\n"字符的奇怪问题。

示例代码:

```PHP
$handle = fopen('./bg.jpg', 'w+');
```

## <a name="href3">fclose</a> ##

功能: 关闭一个已打开的文件指针。

语法规则:

```
boolean fclose(resource $handle)
```

示例代码:

```PHP
$handle = fopen('./bg.jpg', 'w+');
fclose($handle);
```

## <a name="href4">fwrite</a> ##

功能: 将内容写入文件。

语法规则:

```
int fwrite(resource $handle, string $content[, int $length])
```

将 content 内容写入到文件指针 handle 处，length 参数则用于限制写入的最大字符数。

示例代码:

```PHP
$handle = fopen('./cache.json', 'w+');
echo fwrite($handle, '{"status":"1"}').PHP_EOL;
fclose($handle);
```

以上代码执行后，内容是写入到缓存中，并不是真正的写入到文件里，如果想要将内容真正写入到文件中，还需要执行`fflush()`方法。

## <a name="href5">fflush</a> ##

功能: 强制将缓冲内容输出到文件。

语法规则:

```
boolean fflush(resource $handle)
```

示例代码:

```PHP
$handle = fopen('./cache.json', 'w+');
echo fwrite($handle, '{"status":"1"}').PHP_EOL;
echo fflush($handle).PHP_EOL;
fclose($handle);
```

现在打开"./cache.json"文件，可以看到文件内容变成了:

![image](https://raw.githubusercontent.com/WebUnion-core/doc-repositort/master/WJT20/images/w113.png)

## <a name="href6">fgetc</a> ##

功能: 从文件指针中读取字符。

语法规则:

```
string fgetc(resource $handle)
```

如果指针指向了文件的末尾，将返回 false，可以利用这个特性来遍历输出文件中的所有字符。

示例代码:

```PHP
$handle = fopen('./cache.json', 'r+');
while ($char = fgetc($handle)) {
    echo $char.PHP_EOL;
}
fclose($handle);
```

输出结果:

![image](https://raw.githubusercontent.com/WebUnion-core/doc-repositort/master/WJT20/images/w114.png)

## <a name="href7">fgets</a> ##

功能: 从文件指针中读取一行。

语法规则:

```
string fgets(resource $handle[, int $length])
```

和`fgetc()`一样，当指针指向文件的末尾时，将会返回 false。

示例代码:

```PHP
$handle = fopen('./cache.json', 'r+');
while ($row = fgets($handle)) {
    echo $row.PHP_EOL;
}
fclose($handle);
```

## <a name="href8">fread</a> ##

功能: 读取整个文件内容。

语法规则:

```
string fread(resource $handle, int length)
```

不同于`fgetc()`和`fgets()`，`fread()`可以一次性读取文件的内容。

示例代码:

```PHP
$file = './cache.json';
$handle = fopen($file, 'r+');
echo fread($handle, filesize($file)).PHP_EOL;
fclose($handle);
```

## <a name="href9">fstat</a> ##

功能: 通过已打开的文件指针取得文件信息。

语法规则:

```
array fstat(resource $handle)
```

示例代码:

```PHP
$file = './cache.json';
$handle = fopen($file, 'r+');
print_r(array_slice(fstat($handle), 13));
fclose($handle);
```

输出结果:

![image](https://raw.githubusercontent.com/WebUnion-core/doc-repositort/master/WJT20/images/w115.png)

---

```
ID         : 121
DATE       : 2019/01/13
AUTHER     : WJT20
TAG        : PHP
```
