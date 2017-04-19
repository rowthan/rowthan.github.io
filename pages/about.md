---
layout: page
title: About
description: 
keywords: 
comments: true
menu: 关于
permalink: /about/
---

我是 百无一用书生

遇见问题，解决问题

爱自己，爱生活，爱他人

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
