
# npm实用命令笔记 #

## 目录 ##

1. 参考链接
2. 初始化
3. 安装与卸载
4. 查看信息
5. 升级依赖包
6. 其他

## 参考链接 ##

- [npm常用命令整理](http://blog.csdn.net/u014291497/article/details/75193865)

## 初始化 ##

`npm init [-y|--yes]`: 在当前目录下初始化 package.json 文件，可以使用`-y`或`--yes`参数将所有选项设为默认;

## 安装与卸载 ##

1. `npm install [-g] <package>`: 安装模块，使用`-g`参数则为在全局下安装模块;

2. `npm install --production`: 安装 dependencies，不包括 devDependencies;

3. `npm install [--save] [--save-dev] [--no-save] <package>`: 默认使用`--save`参数，安装完模块后自动保存到 dependencies，使用`--no-save`参数则不会保存到 dependencies，使用`--save-dev`参数则会保存到 devDependencies;

4. `npm uninstall [--save] [--save-dev] [--no-save] <package>`: 卸载模块，参数与[3]相同。

## 查看信息 ##

1. `npm ls [-g] [--depth=0]`: 查看当前目录或全局的依赖包，可指定层级为0;

2. `npm outdated`: 查看当前过期依赖，其中 current 显示当前安装版本，latest 显示依赖包的最新版本，wanted 显示我们可以升级到可以不破坏当前代码的版本;

3. `npm root -g`: 查看全局安装地址;

4. `npm ll|la [--depth=0]`: 查看依赖包信息;

5. `npm list <package>`: 查看依赖包的当前版本;

6. `npm view <package> [field] [--json]`: 列出依赖信息，包括历史版本，可以指定 field 来查看某个具体信息，比如 versions 参数可以查看所有历史版本，version 参数可以查看最新版本，可以添加`-–json`参数输出全部结果;

7. `npm home <package>`: 在浏览器端查看项目(项目主页);

8. `npm repo <package>`: 浏览器端打开项目地址(GitHub);

9. `npm docs <packge>`: 查看项目文档;

10. `npm bugs <packge>`: 查看项目 bug。

## 升级依赖包 ##

`npm update <package>`: 升级依赖包版本;

## 其他 ##

1. `npm prune`: 移除当前不在 package.json 中但是存在 node_modules 中的依赖;

2. `npm link`: 不使用`npm install`而连接某个依赖包，通常用作开发本地依赖包。

---

```
ARTICLE_ID : 70
POST_DATE : 2018/03/21
AUTHER : WJT20
```
