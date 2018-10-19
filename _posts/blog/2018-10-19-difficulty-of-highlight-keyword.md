---
layout: post
title: 高亮关键字真麻烦
class: post
categories: coding
description: 搜索高亮关键字常用方法都多多少少有bug，遇到的问题也许可以在这里解决
keywords: 高亮 关键字 js 正则 Text节点 原生
---

有这么一个功能：在网页中高亮关键字。

本以为一个 innerHTML replace 就能实现的简单操作，却遇到了许多的问题。本文就记录这些问题和最终的完美解决办法，
希望能对有同样遭遇的小伙伴有所帮助。只对结果感兴趣的，忽略过程，直接跳过看结果吧~


### 常用做法：正则替换

> 思路：要想高亮元素，那么需要将关键字提取出来用标签包裹，然后对标签进行样式调整。使用 innerHTML，或 outHTML, 而不能使用 innerText,outText。

```
const regex = new RegExp(keyword,"g")
element.innerHTML = element.innerHTML.replace(regex,"<b class="a">"+keyword+"</b>")
element.classList.add("highlight")
```
这样做存在的隐患有如下：
* keyword 如果是 `()\` 等正则对象的关键字将会构建正则对象失败。（可以通过转义解决）
* keyword 如果是一些 HTML 标签如 `div` 将会对 innerHTML 进行错误的替换
* keyword 如果和一些DOM属性名、值相同，也会导致异常替换。如下当 keyword 为 test 时，会将 class 名也错误的替换掉：
```
  <div id="parent">
    <div class="test">test</div>
  </div>
```
* 关键字父节点 element 通过 class 来进行背景染色处理，对原始DOM有一定程度污染，可能对 element 再次定位造成影响。（作为插件希望尽可能少改变原始DOM）

#### 正则优化一：仅处理位于标签内的元素
```
var formatKeyword = text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') // 转义处理keyword包含的特殊字符，如 /.
var finder = new RegExp(">.*?"++".*?<") // 提取位于标签内的文本，避免误操作 class、id 等

element.innerHTML = element.innerHTML.replace(finder,function(matched){
        return matched.replace(text,"<br>"+text+</br>)
})// 对提取的标签内文本进行关键字替换
```
以能解决大多数问题，但依旧存在的问题是,只要标签属性存在类似 < 符号，将会打破匹配规则导致正则提取内容错误, HTML5 dataset 可以自定义任意内容，故这些特殊字符是无法避免的。

```
  <div dataset="p>d">替换</div>
```

#### 正则优化二：清除可能影响的标签
```
  <div id="keyword">keyword</div>
  =》将闭合标签用变量替换
  [replaced1]keyword[replaced2]//闭合标签内 id="keyword" 不会被处理
  =》
  [replaced1]<b>keyword</b>[replaced2]
  =》将暂存变量 replaced 替换为原先标签
  <div id="keyword"><b>keyword</b></div>
```
这种思路及源码从[这里](https://www.cnblogs.com/Leo_wl/p/3509764.html)来，
但存在问题是：
* 如果 [replaced1] 包含 keyword, 那么替换时将发生异常
* 最重要的，当标签值中包含 <> 符号时，此方法也不能正确的提取标签


> 总之在经过了N多尝试之后，通过正则都没能有效的处理各种情况。然后换了个思路，不通过字符串的方式，通过节点处理。element.childNodes 可以最有效的清理标签内的干扰信息。

### [完美解决方案]通过 DOM 节点处理
```
 <div id="parent">
    keyword 1
  <span id="child">
    keyword 2
  </span>
 </div>
```
通过 parent.childNodes 得到所有子节点。child 节点可以通过 innerText.replce(keyword,result) 的方式替换得到想要的高亮效果,如下：
`<span id="child"><b>keyword</b> 2</span>`
（递归处理：当child节点不含子节点时进行replace操作）。

但是 keyword 1 是属于文本节点，只能修改文本内容，无法增加 HTML，更无法单独控制其样式。而文本节点也不能转换为普通节点，这也是最苦恼的事情。


最后~，本文的重点来了，因为这个功能，让我第一次认真接触到了文本节点这个东西。从[这里](http://www.runoob.com/dom/dom-text.html)发现了Text，使用切割文本节点并替换的方式实现高亮。

[源码以及还原高亮见源码](https://github.com/rowthan/easyshare/blob/master/src/document.js#L20)
```
const reg = new RegExp(keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'))
highlight = function (node,reg){
    if (node.nodeType == 3) {  //只处理文本节点
        const match = node.data.match(new RegExp(reg));
        if (match) {
          const highlightEl = document.createElement("b");
          highlightEl.dataset.highlight="y"
          const wordNode = node.splitText(match.index)
          wordNode.splitText(match[0].length); // 切割成前 关键词 后三个Text 节点
          const wordNew = document.createTextNode(wordNode.data);
          highlightEl.appendChild(wordNew);//highlight 节点构建成功
          wordNode.parentNode.replaceChild(highlightEl, wordNode);// 替换该文本节点
        }
    } else if (node.nodeType == 1 && node.dataset.highlight!="y"
    ) {
        for (var i = 0; i < node.childNodes.length; i++) {
            highlight(node.childNodes[i], reg);
            i++
        }
    }  
}
```
最后，留个彩蛋，以上方法也是存在一个小 bug 的，有兴趣可以去发现一下。
