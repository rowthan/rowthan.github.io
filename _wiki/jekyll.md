---
layout: wiki
title: jekyll
categories: [wiki, jekyll]
description: jekyll 语法
keywords: jekyll 变量
---

## 全局变量

|变量	|描述|
|:---|:---|
|site	 |通过 _config.xml 来设置整个站点的信息和全局配置。
|page	 |设置页面信息和自定义的变量。
|content |	展示文章或者页面的内容。
|paginator|	当配置文件中设置了 paginator 的时候，这里可以读取分页的信息。

## 站点变量

|变量	|描述|  
|:---|:---|  
|site.time	|当你运行jekyll时候的时间。|
|site.pages	|当前的页面列表。|
|site.posts	|倒序列出所有的文章。|
|site.related_posts	|相关的文章。默认配置下最多 10 篇相关文章。|
|site.categories.CATEGORY	|某一个分类的文章列表。|
|site.tags.TAG	|某一个标签的文章列表。|
|site.[CONFIGURATION_DATA]	|配置文件中的信息|

## 页面变量

|变量	|描述|
|:---|:---|
|page.content	|页面渲染出来的内容。|
|page.title	|页面标题。|
|page.excerpt	|文章摘要。|
|page.url	|页面链接地址。|
|page.date	|页面或者文章的时间。|
|page.id	|页面或者文章的唯一标识。|
|page.categories	|页面或者文章的分类。|
|page.tags	|页面或者文章的标签。|
|page.path	|页面的路径。|
|page.CUSTOM	|页面的自定义内容。|

## 分页变量

|变量	|描述|
|:---|:---|
|paginator.per_page	|每个分页的文章数量|
|paginator.posts	|分页里的文章对象|
|paginator.total_posts	|文章的总数|
|paginator.total_pages	|分页的页数|
|paginator.page	|当前第几页|
|paginator.previous_page	|前一页的页码|
|paginator.previous_page_path	|前一页的地址|
|paginator.next_page	|下一页的页码|
|paginator.next_page_path	|下一页的地址|
