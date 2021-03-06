---
layout: post
title: Git 使用小结
categories: 技能总结
description: Git 使用了挺久了，有些地方总结一下
keywords: Git,Git-bash,Git-flow,pipeline
update: 2018/01/29
---

> 记录 Git 日常使用技巧和指令

## 基础

### 认证
* 密钥是可以共享的，即多个平台可以使用一份密钥（gitlab、git*）

### 远程连接相关
* 与远程仓库新建立连接  
```text
git remote add origin xxx
```
_注：_ 1.本地一个仓库可以和n个远程仓库建立连接，且不限于一个服务器如gitlab\github\coding

* 修改远程仓库连接  
```text
git remote set-url origin xxx
```
_注：_ 修改连接前提是，存在 origin  连接。   
 
* 查看连接状态  
```text
git remote -v
```
_注：_ 如果是通过 `git clone` 下载下来的代码，已经存在默认连接。本地 `git init`则需要手动添加。

## Branch
### 越少越好
> 发布的代码只有一份，如果不是要达到分发衍生的效果（如Unix操作系统）分支应该尽可能少。用完即删，复用分支。

```text
git branch -m old_branch new_branch
``` 

### 命名清晰
```text
git checkout -b feature/login
```

### 保证分支commit节点干净
> 合并分支时，若未交付本分支代码（指本分支代码没有被合并至其他分支，没有被其他人公共使用），使用rebase更新。

```text
git commit -m '功能1' // a
git commit -m '功能2' // b
git pull origin master --rebase
// 通过rebase操作后，a、b 节点 hash 会发生改变为 a1,b1（故要求a、b没有被其他地方使用到），此操作能保证 a1,b1将位于整个commit树最前沿。
```

### CURD
 
* 查看本地分支以及远程分支（-a 参数会显示远程分支）
```text
git branch -a
```

* 从远程分支下拉取到创建新分支,如果本地不存在该分支，则新建分支。不必 checkout -b 创建分支。
```text
git fetch origin originBranch:newBranch
```

* 一次性更新本地所有分支
```text
git branch | awk 'BEGIN{print "echo ****Update all local branch...@daimon***"}{if($1=="*"){current=substr($0,3)};print a"git checkout "substr($0,3);print "git pull --all";}END{print "git checkout " current}' |sh
``` 

* 批量删除远程已经合并的分支
```text
git branch -r --merged | grep origin | grep -v -e master | sed s/origin\\/// |  xargs -I{} git push origin --delete {}
``` 

## Commit
> 好的 commit 的记录，对项目质量分析、发布日志管理、代码回滚都有很大的帮助。

### 忽略文件跟踪

`.gitignore`
`git rm --cached file`

### 可交付性提交
> 按可交付功能为单位提交。保证reset到任意一个commit节点，系统都能正常工作。

```text
git commit -m '登录框UI初始化' // a
git commit -m '接入登录接口' // b
git commit -m '修改登录按钮样式' //c
```
优化1->
```text
git reset HEAD~3
git commit -m '新增登录功能' //d
```
优化2->
```text
git commit -m '登录框UI初始化' // e
git commit -m --amend '接入登录接口' //f
git commit -m --amend '新增登录功能' //g
```
优化3->
```text
// 合并多次commit节点
git rebase -i head~2 // 然后修改 pick 为 s
```

### 注释可读性
> 三段式注释。GitHub、JIRA 等系统能够通过特定的 commit 内容关联到相关链接。如GitHub：#456 能够自动关闭#456 issue。避免无明显意义的注释，如`bugfix` `修复缺陷`。
 
```text
refactor: change let into const(#457)

this patch:
- changes 'let' into 'canst'
- adds eslint check to prefer const over let
```  
注释的首位标识符，可以根据规范使用，如：refactor、feature、bugfix 等，用于代码发布时读取commit记录，自动生成changelog。

* 适当添加 emoji
```text
git commit -m ':bug:修复变量修饰符：const->let' // emoji支持见下方
```

### 善用stash
> 开发阶段临时切换分支，不想commit 已修改内容，切换分支提示无法切换。与直接commit相比，不会生成commit记录。
stash为栈空间，可以存储多个。

```text
git stash save '暂存' 
```

## Tag
> 相比使用release功能分支做代码更新的机制，Tag能保证唯一性，代码不受被后续合并污染。结合CI能够更好的做到持续部署。

## MR
> 以功能单位进行合并，在gitlab网页操作时，可选squash操作：服务器端的commit压缩操作（类`git rebase -i`）。

## CI/CD
> CI 主要是用于保证尽可能地快速发现错误、防止代码分支发生偏离。
* 快速迭代、尽可能早的将代码合并到主干分支中，避免发生不必要的冲突和偏离。
* 在CI中加入自动化（如自动化测试、代码质量扫描、代码分析等），代码变检测开始，早发现问题早解决。
* 保障代码重构，代码不敢重构是因为缺少足够的自动化测试，当有充分的测试时，重构就会变得极其简单。


* 通过 .gitlab-ci.yml 文件定义CI构建过程。
* Gitlab 本身不提供构建服务，只提供触发机制。能保证代码变，系统变。
* 构建服务需要单独部署，通过与「注册」与Gitlab建立连接关系。构建服务可以被共享。

## workflow


## 操作
### reset VS revert
* git reset 后是不是很危险，重置了就再也找不回来了？
> 否。通过 reflog 可以重新找回。

* a commit 节点会删除 文件不会改动，a 节点提交的文件状态 为 unstage
```text
git reset head^1(a) --mixed(default)
```

* a commit 节点会被删除 文件不会改动，a 节点提交的文件状态为 staged
```text
git reset head^1(a) --soft
```

* 完全恢复到 a 节点上，文件历史记录都会丢失
```text
git reset head^1(a) --hard
```

* 撤销倒数第二次commit节点修改
reset 和 revert 效果看似相同，但原理不同。reset 是往后走，将head指针向后移动，之后再合并时，这些commit会被还原，
revert是撤销之前的commit 并生成一个新的commit节点，这些commit不会被还原。相当于对之前的commit做了逆操作。
```text
git revert head~2 
```

### merge VS rebase
> git pull == git fetch + git merge

和merge不同的是不会新生成一个merge节点，并且会整个各个分支的commit节点到一起
rebase 高级用法
```
git rebase -i commintNo 
git rebase branch
``` 
不要rebase一个已经push出去的分支

一次性将所有远程（remote）的代码更新至当前分支
```text
git pull --all
``` 
### cherry-pick

```text
git checkout master  
git cherry-pick 62ecb3 
```

### 选择性合并
合并 a-b commit 到maser
```text
git checkout -bnewbranch b 
git rebase --ontomaster a^
```

### 日志查看
* 提交历史
http://blog.csdn.net/dwarven/article/details/46550117
```text
git log --oneline
```

* 统计单个作者修改量
```text
git log --author="rowthan" --pretty=tformat: --numstat | gawk '{ add += $1 ; subs += $2 ; loc += $1 + $2 } END { printf "added lines: %s removed lines : %s total lines: %s\n",add,subs,loc }'
操作历史
```

* 可以通过操作历史，查找reset丢失的commit节点
```text
git reflog
```

### 代码推送
* 默认下，不推送 tag
```text
git push == git push --no-tags
```

### 暂存区
```text
git stash save "暂存"  
git stash apply
```


### git 快捷键
```text
git config --global alias.st status
```

### work tree 整理
work tree 太混乱有没有办法能够梳理干净一点？  http://blog.csdn.net/wh_19910525/article/details/7554489

## git hooks
> 支持钩子，如：在pre-commit钩子前对代码格式化检测，如不通过无法commit；commit自动修改commit注释内容，增加标识（如Gerrit系统）

钩子函数配置位于项目相对路径 /.git/hooks

[git hooks](https://www.git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90)



## github
* 搭建自己的免费网站

如用户名为 a,创意一个 a.github.io 的项目，将自动生成一个域名为 a.github.io 的静态服务。

## git emoji

|emoji                                   | emoji 代码                   | commit 说明|
|:--------                               | :--------                    | :--------|
|:art: (调色板)                          | `:art:`                      | 改进代码结构/代码格式|
|:zap: (闪电)<br>:racehorse: (赛马)                            | `:zap:`<br>`:racehorse:`                      | 提升性能|
|:fire: (火焰)                           | `:fire:`                     | 移除代码或文件|
|:bug: (bug)                             | `:bug:`                      | 修复 bug|
|:ambulance: (急救车)                    | `:ambulance:`                | 重要补丁|
|:sparkles: (火花)                       | `:sparkles:`                 | 引入新功能|
|:memo: (备忘录)                         | `:memo:`                     | 撰写文档|
|:rocket: (火箭)                         | `:rocket:`                   | 部署功能|
|:lipstick: (口红)                       | `:lipstick:`                 | 更新 UI 和样式文件|
|:tada: (庆祝)                           | `:tada:`                     | 初次提交|
|:white_check_mark: (白色复选框)         | `:white_check_mark:`         | 增加测试|
|:lock: (锁)                             | `:lock:`                     | 修复安全问题|
|:apple: (苹果)                          | `:apple:`                    | 修复 macOS 下的问题|
|:penguin: (企鹅)                        | `:penguin:`                  | 修复 Linux 下的问题|
|:checkered_flag: (旗帜)                 | `:checked_flag:`             | 修复 Windows 下的问题|
|:bookmark: (书签)                       | `:bookmark:`                 | 发行/版本标签|
|:rotating_light: (警车灯)               | `:rotating_light:`           | 移除 linter 警告|
|:construction: (施工)                   | `:construction:`               | 工作进行中|
|:green_heart: (绿心)                    | `:green_heart:`              | 修复 CI 构建问题|
|:arrow_down: (下降箭头)                 | `:arrow_down:`               | 降级依赖|
|:arrow_up: (上升箭头)                   | `:arrow_up:`                 | 升级依赖|
|:construction_worker: (工人)            | `:construction_worker:`      | 添加 CI 构建系统|
|:chart_with_upwards_trend: (上升趋势图) | `:chart_with_upwards_trend:` | 添加分析或跟踪代码|
|:hammer: (锤子)                         | `:hammer:`                   | 重大重构|
|:heavy_minus_sign: (减号)               | `:heavy_minus_sign:`         | 减少一个依赖|
|:whale: (鲸鱼)                          | `:whale:`                    | Docker 相关工作|
|:heavy_plus_sign: (加号)                | `:heavy_plus_sign:`          | 增加一个依赖|
|:wrench: (扳手)                         | `:wrench:`                   | 修改配置文件|
|:globe_with_meridians: (地球)           | `:globe_with_meridians:`     | 国际化与本地化|
|:pencil2: (铅笔)                        | `:pencil2:`                  | 修复 typo|

