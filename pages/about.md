---
layout: page
title: About
description: 
keywords: 
comments: true
menu: 关于
permalink: /about/
---

为什么要写博客？除了可以给别人看，给别人来带一些启发，更重要的是写给自己看。
总以为自己掌握了，或许只是只知其一、零散的知识点，如果能够别人也懂，那说明自己才是真正的掌握了。
通过写技术博客，能够让自己对这部分的只是有一个系统的认识，是一次重新的梳理，在这个过程中，
往往能够获得更多的感受或意外发现“居然还有这种解法”，“我之前认识的也不完全对”，对此我真有体会。

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
