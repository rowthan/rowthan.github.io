---
layout: page
title: About
description: 
keywords: 
comments: true
menu: 关于
permalink: /about/
---

爱自己，爱生活，爱他人

学习，不断地学习。有时候有一些沮丧，感觉学习前端就像是一个无底洞，需要填补的只是很多很多。
偶尔会有这样的感觉，越是学习心里越是发毛，越没有底。

所以我想，我得记录下些什么，为我自己。因为，唯有流过的汗不会欺骗自己。

## 联系

{% for website in site.data.social %}
* {{ website.sitename }}：[@{{ website.name }}]({{ website.url }})
{% endfor %}

## Skill Keywords

{% for category in site.data.skills %}
### {{ category.name }}
<div class="btn-inline">
{% for keyword in category.keywords %}
<button class="btn btn-outline" type="button">{{ keyword }}</button>
{% endfor %}
</div>
{% endfor %}
