---
layout: post
title: 纯文本的高亮关键字问题
class: post
categories: coding
description: 搜索高亮关键字常用方法都多多少少有bug，遇到的问题也许可以在这里解决
keywords: 高亮 关键字 js 正则 Text节点 原生
---

之前处理过一个高亮关键词的问题：[高亮关键词](https://logike.cn/coding/difficulty-of-highlight-keyword.html)

半年后在工作中又遇到了同样的问题，这次不同在于：
* 前者是通过插件的方法来高亮处理，直接操作DOM元素，可以借助文本节点，而本次需要在Vue组件中使用，输入值为 `纯字符串`。
* 本次是需要一次性高亮多关键词，所以需要避免关键词高亮相互影响。
```vue
<p ref="item_text" v-html="highlightKeywords(item.title)"></p>
```

尝试过很多种方法的高亮替换，最终都以失败告终，得到的结论是：原始输入 a,第n次高亮之后得到结果b,
若n+1次高亮基于b，而非原始值a，则存在高亮错误或者不准确的情况。若想要准确的高亮，必须保证第n次高亮不会影响到第n+1次高亮。

为了保证以上效果，整个高亮过程必须保证高亮顺序，如字符串`abcdefg`,关键词为`a`、`b`，如果先高亮`a`得到`<b>a</b>bcdefg`结果，由于引入了`<b>`,对于后续高亮b则会存在干扰。
所以我们首先需要经过一段计算，标记每一个关键词在字符串中的位置，得到一个完整的图谱之后，按照倒序的顺从后到前进行高亮（从后到前是为了保证因为高亮填入新的字符导致index发生偏移）。

### 算法实现

代码如下：
```javascript
highlightKeywords (title='abcdefghijk',keywords='b h'){
      const keywords = this.keywords.split(/\s+/)
      let keywordMap = {}
      keywords.forEach((keyword) => {
        if (!keyword) return
        keywordMap = findIndexs(title, keyword, keywordMap)
      })
      // 按照index 降序处理避免新加入内容影响index值
      const indexs = Object.keys(keywordMap).sort((val1, val2) => val2 - val1)
      let preIndex = null
      indexs.forEach((indexKey) => {
        const index = +indexKey // 转换为int
        const keyword = keywordMap[indexKey]
        if (preIndex !== null) {
          // 避免本次高亮影响之前已经高亮的内容
          if (index + keyword.length > preIndex) {
            return
          }
        }
        const pre = title.slice(0, index)
        const highlight = '<span class="highlight-keyword">' + keyword + '</span>'
        const after = title.slice(index + keyword.length, title.length)
        title = pre + highlight + after
        preIndex = index
      })
      return title

      //计算关键词图谱 如 {1:'b'}
      function findIndexs (string = '', keyword, keyMap = {}, offset = 0) {
        if (!keyword) {
          return keyMap
        }
        const index = string.indexOf(keyword)
        if (index !== -1) {
          keyMap[index + offset] = keyword
          offset = offset + keyword.length
          return findIndexs(string.replace(keyword, ''), keyword, keyMap, offset)
        } else {
          return keyMap
        }
      }
    }
```

### 正则实现
```
var string = '1321'
var keyword = '1 2'
// 正则关键词替换
keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') 
var n= keyword.split(" ").join("|")
var r=new RegExp("(".concat(n,")"),"g");

string.replace(r,'<span class='highlight'>$1</span>')
```

以上两种方式都没有bug（目前没发现），其中的优劣点是：
* 算法实现代码冗杂，比较繁琐，正则简单
* 算法实现可以控制多关键词高亮顺序逻辑，例如：
```
inputString = '高亮关键词'
keywords = '关键 关键词'
```
正则最终的效果是高亮`关键`，而算法实现可以自由控制这种关键词最大化范围高亮或最小化范围高亮。


