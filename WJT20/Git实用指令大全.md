
# Git实用指令大全 #

## 目录 ##

1. [参考链接](#href1)
2. [git设置](#href2)
3. [初始化/克隆](#href3)
4. [增加/删除](#href4)
5. [提交](#href5)
6. [远程同步](#href6)
7. [查看信息](#href7)
8. [分支](#href8)
9. [撤销](#href9)
10. [回退](#href10)

## <a name="href1">参考链接</a> ##

- [常用Git命令清单](http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)
- [Git撤销&回滚操作](https://blog.csdn.net/ligang2585116/article/details/71094887)
- [Git教程](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)

## <a name="href2">git设置</a> ##

1. `git config --list`: 显示配置信息;  

2. `git config -e [--global]`: 编辑git配置文件;

3. `git config [--global] FIELD <VALUE>`: 设置字段信息，即`<FIELD>`参数对应的字段设置为`<VALUE>`的值，常见的设置项有 user.name、user.email 等;

## <a name="href3">初始化/克隆</a> ##

1. `git init <NAME>`: 初始化一个git仓库，可选参数`<NAME>`为自定义的仓库名;

2. `git clone <URL>`: 克隆一个远程仓库到本地，`<URL>`参数即为远程仓库的URL;

## <a name="href4">增加/删除</a> ##

1. `git add <FILE1>|<DIR1> [<FILE2>|<DIR2> <FILE3>|<DIR3> ...]`: 添加指定文件/目录到暂存区;

2. `git add .`: 添加当前目录的所有文件到暂存区;

3. `git add -p`: 添加每个变化前，都会要求确认，对于同一个文件的多处变化，可以实现分次提交，如下图:

    ![image](https://raw.githubusercontent.com/WebUnion-core/anthill/master/WJT20/images/w61.png)

4. `git rm <FILE1>|<DIR1> [<FILE2>|<DIR2> <FILE3>|<DIR3> ...]`: 删除工作区文件，并且将这次删除放入暂存区;

5. `git rm --cached <FILE>`: 停止追踪指定文件，但该文件会保留在工作区;

6. `git mv <FILEPATH1> <FILEPATH2>`: 改名文件，并且将这个改名放入暂存区;

## <a name="href5">提交</a> ##

1. `git commit [<FILE1> <FILE2> ...] -m <MESSAGE>`: 提交暂存区到仓库区，提示信息如下图:

    ![image](https://raw.githubusercontent.com/WebUnion-core/anthill/master/WJT20/images/w62.png)

2. `git commit -a`: 提交工作区自上次 commit 之后的变化，直接到仓库区;

3. `git commit -v`: 提交时显示所有diff信息，如下图:

    ![image](https://raw.githubusercontent.com/WebUnion-core/anthill/master/WJT20/images/w63.png)

4. `git commit --amend -m <MESSAGE>`: 使用一次新的 commit，替代上一次提交，如果代码没有任何新变化，则用来改写上一次 commit 的提交信息;

5. `git commit --amend [<FILE1> <FILE2> ...]`: 重做上一次 commit，并包括指定文件的新变化。

## <a name="href6">远程同步</a> ##

1. `git fetch <REMOTE>`: 下载远程仓库的所有变动;

2. `git remote -v`: 显示所有远程仓库，如图:

    ![image](https://raw.githubusercontent.com/WebUnion-core/anthill/master/WJT20/images/w64.png)    

3. `git remote show <REMOTE>`: 显示某个远程仓库的信息，如图:

    ![image](https://raw.githubusercontent.com/WebUnion-core/anthill/master/WJT20/images/w65.png)

4. `git remote add <NAME> <URL>`: 增加一个新的远程仓库，并命名为NAME;

5. `git pull <REMOTE> <BRANCH>`: 更新，取回远程仓库的变化，并与本地分支合并;

6. `git push <REMOTE> <BRANCH>`: 上传本地指定分支到远程仓库;

7. `git push <REMOTE> --force`: 强行推送当前分支到远程仓库，即使有冲突，慎用;

8. `git push <REMOTE> --all`: 推送所有分支到远程仓库。

## <a name="href7">查看信息</a> ##

1. `git status`: 显示有变更的文件;

2. `git log`: 查看当前分支的所有历史纪录;

3. `git log --stat`: 显示 commit 历史，以及每次 commit 发生变更的文件;

4. `git log <VERSION> HEAD --pretty=format:%s`: 显示某个 commit 之后的所有变动，每个 commit 占据一行，`<VERSION>`是 commit 时生成的唯一标识;

5. `git log --follow <FILE>`和`git whatchanged <FILE>`: 显示某个文件的版本历史;

6. `git log -p <FILE>`: 显示指定文件相关的每一次diff;

7. `git log -<NUMBER> --pretty --oneline`: 显示最近`<NUMBER>`次的操作记录;

8. `git shortlog -sn`: 显示所有提交过的用户，按提交次数排序;

9. `git blame <FILE>`: 显示指定文件是什么人在什么时间修改过;

10. `git diff`: 显示暂存区和工作区的差异;

11. `git diff --cached <FILE>`: 显示暂存区和上一个commit的差异;

12. `git diff HEAD`: 显示工作区与当前分支最新commit之间的差异;

13. `git diff --shortstat "@{0 day ago}"`: 显示今天你写了多少行代码;

14. `git show <VERSION>`: 显示某次提交的元数据和内容变化;

15. `git show --name-only <VERSION>`: 显示某次提交发生变化的文件;

16. `git show <VERSION>:<FILE>`: 显示某次提交时，某个文件的内容;

17. `git reflog`: 显示当前分支的最近几次提交;

## <a name="href8">分支</a> ##

1. `git branch`: 列出所有本地分支;

2. `git branch -r`: 列出所有远程分支;

3. `git branch -a`: 列出所有本地分支和远程分支;

4. `git branch <BRANCH>`: 新建一个分支，但依然停留在当前分支;

5. `git checkout -b <BRANCH>`: 新建一个分支，并切换到该分支;

6. `git branch <BRANCH> <VERSION>`: 新建一个分支，指向指定 commit;

7. `git branch --track <BRANCH> <REMOTE_BRANCH>`: 新建一个分支，与指定的远程分支建立追踪关系;

8. `git checkout <BRANCH>`: 切换分支;

9. `git merge <BRANCH>`: 将指定分支与当前分支进行合并;

10. `git branch -d <BRANCH>`: 删除本地分支;

11. `git push origin --delete <BRANCH>`: 删除远程分支;

## <a name="href9">撤销</a> ##

当进行了错误或不恰当的`git add`或`git commit`操作后，可以通过撤销来取消之前的操作:

1. 文件被修改，但未执行`git add`操作，此时可以把版本库的版本替换掉工作区的版本，只要使用`git checkout <FILE>`命令即可;

2. 已经使用`git add`提交了某个文件(文件加入到暂存区)，这时候可以使用`git reset HEAD <FILE>`撤销该文件的提交。

## <a name="href10">回退</a> ##

1. 回退到前n个版本: `git reset --hard HEAD~<N>`;

2. 回退到指定版本: `git reset --hard <VERSION>`，`<VERSION>`可以通过`git reflog`命令查看。

---

```
ID         : 86
DATE       : 2018/07/14
AUTHER     : WJT20
TAG        : Git
```
