
# Node.js常用原生模块系列——process模块 #

## 目录 ##

1. [参考链接](#href1)
2. [介绍](#href2)
3. [进程信息](#href3)
4. [指向标准输出](#href4)
5. [指向标准输入](#href5)
6. [其他方法](#href6)
7. [事件](#href7)
	1. [exit事件](#href7-1)
	2. [uncaughtException事件](#href7-2)

## <a name="href1">参考链接</a> ##

- [Node.js的process模块](http://www.css88.com/archives/4548)

- [Node.js v10.1.0 文档](http://nodejs.cn/api/process.html)

## <a name="href2">介绍</a> ##

process 模块用来与当前进程互动，它提供当前 Node.js 进程的有关信息，以及控制当前 Node.js 进程，process 是一个全局模块，不需要使用 require。

## <a name="href3">进程信息</a> ##

1. `process.pid`: 返回当前进程的进程号;
2. `process.version`: 返回 Node.js 的版本;
3. `process.platform`: 返回当前系统平台，Linux 或 Windows;
4. `process.title`: 获取或设置当前进程在 ps 命令中显示的进程名字;
5. `process.argv`: 返回一个包含了启动 Node.js 进程时的命令行参数的数组;
6. `process.execPath`: 运行当前进程的可执行文件的绝对路径，即`process.argv[0]`;
7. `process.env`: 返回一个包含用户环境信息的对象。

## <a name="href4">指向标准输出</a> ##

process.stdout 用来控制标准流输出，也就是在命令行窗口向用户显示内容。

1. `write`: 向命令行窗口输出信息，效果同`console.log`:  

    ```js
    #!/usr/bin/env node
    process.stdout.write('Output message.'); // 输出 => "Output message."
    ```

## <a name="href5">指向标准输入</a> ##

process.stdin 与 process.stdout 相反，它是用来控制标准流输入的。

1. `setEncoding`: 设置输入流的字符集，一般设成"utf-8":  

    ```js
    #!/usr/bin/env node
    process.stdin.setEncoding('utf-8');
    ```

2. `read`: 读取输入信息，一个完整的将输入流数据读取出来的代码如下:  

    ```js
    #!/usr/bin/env node
    process.stdin.setEncoding('utf8');

    process.stdin.on('readable', () => {
        const chunk = process.stdin.read();
        if (chunk !== null) {
            process.stdout.write(`data: ${chunk}`);
        }
    });
    ```

    更简单的方法是将输入流数据输出到输出流，即输出到终端，代码如下:

    ```js
    #!/usr/bin/env node
    process.stdin.pipe(process.stdout);
    ```

## <a name="href6">其他方法</a> ##

1. `process.exit()`: 退出当前进程;

2. `process.cwd()`: 返回当前工作目录路径。

## <a name="href7">事件</a> ##

### <a name="href7-1">exit事件</a> ###

当退出进程时，exit事件会被触发，可以用 on 方法监听指定的事件，其第一个参数为事件名，第二个参数为事件触发时将执行的回调:

```js
#!/usr/bin/env node
process.on('exit', function () {
    console.log('Exit the process.');
});
```

### <a name="href7-2">uncaughtException事件</a> ###

当进程抛出一个未被捕获的错误时，uncaughtException 事件会被触发:

```js
#!/usr/bin/env node
process.on('uncaughtException', function (err) {
	console.error(err.stack);
});
```

---

```
ARTICLE_ID : 89
POST_DATE : 2018/07/30
AUTHER : WJT20
```
