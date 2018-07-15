
# Git实用命令记录(一) #

> 红色标记的命令为最常用的。可以利用 github 等使用 git 传输代码的网站练习 git 命令。

## 目录 ##

1. [参考链接](#href1)
2. [git设置](#href2)
3. [初始化/克隆](#href3)
4. [增加/删除](#href4)
5. [提交](#href5)
6. [远程同步](#href6)

## <a name="href1">参考链接</a> ##

- [常用 Git 命令清单](http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)

## <a name="href2">git设置</a> ##

1. `git config --list`: 显示配置信息;  

2. `git config -e [--global]`: 编辑Git配置文件;

3. `git config [--global] FIELD "VALUE"`: 设置字段信息，即 FIELD 参数对应的字段设置为 VALUE 的值，常见的设置项有 user.name 和 user.email;  

## <a name="href3">初始化/克隆</a> ##

1. <span style="color:red">`git init [NAME]`</span>: 初始化一个 git 仓库，可选参数 NAME 为自定义的仓库名;

2. <span style="color:red">`git clone URL`</span>: 克隆一个远程仓库到本地，URL 参数即为远程仓库的 URL。


## <a name="href4">增加/删除</a> ##

1. <span style="color:red">`git add FILE1|DIR1 [FILE2|DIR2 FILE3|DIR3 ...]`</span>: 添加指定文件/目录到暂存区;

2. <span style="color:red">`git add .`</span>: 添加当前目录的所有文件到暂存区;

3. `git add -p`: 添加每个变化前，都会要求确认，对于同一个文件的多处变化，可以实现分次提交，如下图:

    ![image](https://raw.githubusercontent.com/WebUnion-core/public-cdn/master/wjt20-base/w61.png)

4. `git rm FILE1|DIR1 [FILE2|DIR2 FILE3|DIR3 ...]`: 删除工作区文件，并且将这次删除放入暂存区;

5. `git rm --cached [file]`: 停止追踪指定文件，但该文件会保留在工作区;

6. `git mv [FILEPATH1] [FILEPATH2]`: 改名文件，并且将这个改名放入暂存区。

## <a name="href5">提交</a> ##

1. <span style="color:red">`git commit [FILE1 FILE2 ...] -m [MESSAGE]`</span>: 提交暂存区到仓库区，提示信息如下图:

    ![image](https://raw.githubusercontent.com/WebUnion-core/public-cdn/master/wjt20-base/w62.png)

2. `git commit -a`: 提交工作区自上次 commit 之后的变化，直接到仓库区;

3. `git commit -v`: 提交时显示所有 diff 信息，如下图:

    ![image](https://raw.githubusercontent.com/WebUnion-core/public-cdn/master/wjt20-base/w63.png)

4. <span style="color:red">`git commit --amend -m [MESSAGE]`</span>: 使用一次新的 commit，替代上一次提交，如果代码没有任何新变化，则用来改写上一次 commit 的提交信息

5. `git commit --amend [FILE1 FILE2 ...]`: 重做上一次 commit，并包括指定文件的新变化。

## <a name="href6">远程同步</a> ##

1. `git fetch [REMOTE]`: 下载远程仓库的所有变动;

2. `git remote -v`: 显示所有远程仓库，如图:

    ![image](https://raw.githubusercontent.com/WebUnion-core/public-cdn/master/wjt20-base/w64.png)    

3. `git remote show [REMOTE]`: 显示某个远程仓库的信息，如图:

    ![image](https://raw.githubusercontent.com/WebUnion-core/public-cdn/master/wjt20-base/w65.png)

4. <span style="color:red">`git remote add [NAME] [URL]`</span>: 增加一个新的远程仓库，并命名为 NAME;

5. <span style="color:red">`git pull [REMOTE] [BRANCH]`</span>: 更新，取回远程仓库的变化，并与本地分支合并;

6. <span style="color:red">`git push [REMOTE] [BRANCH]`</span>: 上传本地指定分支到远程仓库;

7. `git push [REMOTE] --force`: 强行推送当前分支到远程仓库，即使有冲突，慎用;

8. `git push [REMOTE] --all`: 推送所有分支到远程仓库。

---

```
ARTICLE_ID : 86
POST_DATE : 2018/07/14
AUTHER : WJT20
```
