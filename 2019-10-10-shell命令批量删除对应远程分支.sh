#!/bin/sh

# 如果没有权限需要重新创建权限执行： chmod 755 ./deleteBranch.sh 
# 放到项目根目录下
# 在对应的git终端下执行 如：
# ./delete.sh 1 100   ---------1指的是issue#1分支 到 issue#100分支
# 输入 y
# 即可删除以issue#1-100的分支

red="\033[31m"  # 红色
green="\033[32m"  # 绿色
reset="\033[0m"  # 重置设置

number1=$1
number2=$2

read -p "Are you sure to delete issue# from $1 to $2 branch ?[y/n]" input

if [ $input != "y" ];then
  exit 0
fi

printf "\n$green start to delete ... $reset\n"

git checkout master # 先切到master分支

int=$1
while(( $int <= $2 ))
do
    echo $int
    git push origin --delete issue#$int
    printf "\n$green issue#$int 远程分支已删除 $reset\n"
    let "int++"
done

if [ "$?" = 0 ]; then
  printf "\n$green 所有指定issue# $1 - $2 分支删除成功 $reset\n"
else
  printf "\n$red 删除失败，请手动删除 $reset\n"
fi
