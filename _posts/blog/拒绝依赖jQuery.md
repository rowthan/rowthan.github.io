---
layout: post
title: template page
categories: JS
description: 拒绝使用jQuery
keywords: JavaScript, 原生JavaScript
---

> 自己个人的实际情况是，使用 jQuery 仅仅用到了很少它提供的方法，多数情况下，它只是我作为选择器的一个工具，除了 $() 函数用的比较多外，数一数也没有什么其他的了。
既然如此，何苦要使用它呢，原生的 JavaScript 已经完全够用了。

## 选择器

## 监听函数
```javascript
> $(window).scroll(function(){});
```
==>>
```javascript
window.onscroll = function (e) {}
```


## 方法

### 获取浏览器滚动偏移量
```javascript
 $(document).scrollTop();
```
==>>
```javascript
window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
```

* [兼容性写法](http://www.jb51.net/article/43230.htm)


## 了解jQuery
jQuery 源码确实写的漂亮，如果能够充分利用它，着实能减轻不少工作量，如果有兴趣，可以阅读分析下 [jQuery 源码](http://www.cnblogs.com/coco1s/p/5261646.html)。