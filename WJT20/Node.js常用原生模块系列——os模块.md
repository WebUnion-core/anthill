
# Node.js常用原生模块系列——os模块 #

## 目录 ##

1. [参考链接](#href1)
2. [介绍](#href2)
3. [os.constants](#href3)
4. [系统参数相关](#href4)
5. [环境相关](#href5)
6. [其他](#href6)

## <a name="href1">参考链接</a> ##

- [Node.js v10.8.0 文档](http://nodejs.cn/api/os.html)

## <a name="href2">介绍</a> ##

os 模块提供了一些操作系统相关的实用方法，通过`const os = require('os')`引入模块。

## <a name="href3">os.constants</a> ##

`os.constants`属性会返回一个包含错误码(errno)、处理信号(signals)等通用的操作系统特定常量的对象。

不同操作系统返回的错误码也不同:

1. POSIX 错误常量:  [http://nodejs.cn/api/os.html#os_posix_error_constants](http://nodejs.cn/api/os.html#os_posix_error_constants);
2. Windows 系统特有的错误常量: [http://nodejs.cn/api/os.html#os_windows_specific_error_constants](http://nodejs.cn/api/os.html#os_windows_specific_error_constants)。

信号常量的描述: [http://nodejs.cn/api/os.html#os_signal_constants](http://nodejs.cn/api/os.html#os_signal_constants)。

## <a name="href4">系统参数相关</a> ##

1. `os.release()`: 返回操作系统的发行版本号;

2. `os.type()`: 返回操作系统的名字，返回值有: "Linux"代表 Linux 系统、"Darwin"代表 macOS 系统、"Windows_NT"代表 Windows 系统;

3. `os.uptime()`: 返回操作系统的上线时间，Windows平台上返回的秒值包含分数，需要进行舍入;

4. `os.hostname()`: 返回操作系统的主机名;

5. `os.arch()`: 返回 Node.js 二进制编译所用的操作系统 CPU 架构，等同于`process.arch`，返回值有: arm、 arm64、ia32、mips、mipsel、ppc、ppc64、s390、s390x、 x32 和 x64;

6. `os.cpus()`: 返回一个包含每个逻辑 CPU 内核的信息的对象数组;

7. `os.totalmem()`: 所有系统内存的字节数。

## <a name="href5">环境相关</a> ##

1. `os.freemem()`: 空闲系统内存的字节数;

2. `os.networkInterfaces()`: 返回一个包含只有被赋予网络地址的网络接口的对象;

3. `os.platform()`: 获取指定 Node.js 编译时的操作系统平台。返回值有: aix、darwin、freebsd、linux、openbsd、sunos、win32。

## <a name="href6">其他</a> ##

1. `os.loadavg()`: 返回包含1, 5, 15分钟平均负载的数组。平均负载是系统活动的测量，由操作系统计算得出，表达为一个分数。一般来说，平均负载应该理想地比系统的逻辑 CPU 的数目要少。平均负载是 UNIX 相关的概念，在 Windows 平台上没有;

2. `os.endianness()`: 返回 Node.js 二进制编译环境的字节顺序，返回值有: "BE"代表大端模式，"LE"代表小端模式;

3. `os.homedir()`: 返回当前用户的 home 目录;

4. `os.tmpdir()`: 获取操作系统的默认临时文件目录;

5. `os.userInfo()`: 获取当前有效用户的信息。其接收一个可选的对象参数，其中包含 encoding 选项，用于解释结果字符串的字符编码，可选值: "buffer"或"utf8"(默认)。在 POSIX 平台上, 这通常是 password 文件的子集。返回的对象包括 username、uid、gid、shell, 和 homedir。在 Windows 系统上, uid 和 gid 域是-1，and shell 是 null。

6. `os.EOL`: 定义操作系统相关的行末标志常量，Windows 系统上为`\r\n`，POSIX 系统上为`\n`。

---

```
ARTICLE_ID : 105
POST_DATE : 2018/09/12
AUTHER : WJT20
```
