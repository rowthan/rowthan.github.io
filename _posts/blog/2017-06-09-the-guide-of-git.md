---
layout: post
title: Git 使用小结
categories: 技能总结
description: Git 使用了挺久了，有些地方总结一下
keywords: Git,Git-bash,Git-flow,pipeline
update: 2018/01/29
---

> 记录 Git 日常使用技巧和指令

## git 初始化
### 认证
* 密钥是可以共享的，即多个平台可以使用一份密钥（gitlab、git*）

### 远程连接相关
* 与远程仓库新建立连接  
> git remote add origin xxx

_注：_ 1.本地一个仓库可以和n个远程仓库建立连接，且不限于一个服务器如gitlab\github\coding...
* 修改远程仓库连接  
> git remote set-url origin xxx

_注：_ 修改连接前提是，存在 origin  连接。    
* 查看连接状态  
> git remote -v

_注：_ 如果是通过 `git clone` 下载下来的代码，已经存在默认连接。本地 `git init`则需要手动添加。
### 分支相关
查看本地分支以及远程分支（-a 参数会显示远程分支）
> git branch -a

重命名分支
> git branch -m oldnamebranc newnamebranch 

* 频繁增删分支，可以通过 `-m` 方式实现

从远程分支下拉取到创建新分支,如果本地不存在该分支，则新建分支。不必 checkout -b 创建分支。
> git fetch origin originBranch:newBranch

### 代码提交
* 不想跟踪一些不必要的文件，如 `.idea/` (文件或文件夹)
> .gitignore
> git rm --cached file
重新提交上一次 commit
> git commit --amend

### reset VS revert
* git reset 后是不是很危险，重置了就再也找不回来了？

a commit 节点会删除 文件不会改动，a 节点提交的文件状态 为 unstage
> git reset head^1(a) --mixed(default)

a commit 节点会被删除 文件不会改动，a 节点提交的文件状态为 staged
> git reset head^1(a) --soft

完全恢复到 a 节点上，文件历史记录都会丢失
> git reset head^1(a) --hard

* reset 后并不是不可找回，即使使用了 --hard 方式，也可以找回。

合并多次commit节点
> git rebase -i head~2

然后修改 pick 为 s

> git revert head~2 

* 撤销倒数第二次commit节点修改
reset 和 revert 效果看似相同，但原理不同。reset 是往后走，将head指针向后移动，之后再合并时，这些commit会被还原，
revert是撤销之前的commit 并生成一个新的commit节点，这些commit不会被还原。相当于对之前的commit做了逆操作。
### merge VS rebase
> git pull == git fetch + git merge

和merge不同的是不会新生成一个merge节点，并且会整个各个分支的commit节点到一起
rebase 高级用法
> git rebase -i commintNo  
> git rebase branch

https://ihower.tw/blog/archives/3843
不要rebase一个已经push出去的分支 https://ihower.tw/blog/archives/2622

一次性将所有远程（remote）的代码更新至当前分支
> git pull --all
### 樱桃采摘
> git checkout master  
git cherry-pick 62ecb3 
### 选择性合并
合并 a-b commit 到maser
>  git checkout -bnewbranch b 
>  git rebase --ontomaster a^

### 日志查看
提交历史
http://blog.csdn.net/dwarven/article/details/46550117

> git log --oneline

统计单个作者修改量
> git log --author="rowthan" --pretty=tformat: --numstat | gawk '{ add += $1 ; subs += $2 ; loc += $1 + $2 } END { printf "added lines: %s removed lines : %s total lines: %s\n",add,subs,loc }'
操作历史

> git reflog

可以通过操作历史，查找reset丢失的commit节点
### 代码推送
默认下，不推送 tag
> git push == git push --no-tags

清空远程代码但除删除历史
> git push origin :branch2
### 暂存区
> git stash save "暂存"  
> git stash apply

### git 语句
一次性更新本地所有分支
> git branch | awk 'BEGIN{print "echo ****Update all local branch...@daimon***"}{if($1=="*"){current=substr($0,3)};print a"git checkout "substr($0,3);print "git pull --all";}END{print "git checkout " current}' |sh

### git 快捷键
> git config --global alias.st status

### work tree 整理
work tree 太混乱有没有办法能够梳理干净一点？  http://blog.csdn.net/wh_19910525/article/details/7554489
## gitlab
* 
## github
* 搭建自己的免费网站

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

## 提交规范
good:   
```javascript
change let into const(#457)
this patch:
- changes 'let' into 'canst'
- adds eslint check to prefer const over let
```

