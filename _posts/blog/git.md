 查看本地分支以及远程分支（-a 参数会显示远程分支）
> git branch -a

重命名分支
> git branch -m oldnamebranc newnamebranch 

从远程分支下拉取到创建新分支,如果本地不存在该分支，则新建分支
> git fetch origin originBranch:newBranch

一次性将所有远程（remote）的代码更新至当前分支
> git pull --all

一次性更新本地所有分支
> git branch | awk 'BEGIN{print "echo ****Update all local branch...@daimon***"}{if($1=="*"){current=substr($0,3)};print a"git checkout "substr($0,3);print "git pull --all";}END{print "git checkout " current}' |sh

合并代码
> git rebase

和merge不同的是不会新生成一个merge节点，并且会整个各个分支的commit节点到一起

清空远程代码但除删除历史
> git push origin :branch2

