---
layout: post
title: CSS3那些事
class: post
categories: CSS3
description: CSS3那些事
keywords: CSS3, HTML5
---

> flex 用法简介，原文地址[阮一峰]

## flex
* 任何一个容器都可以指定为flex布局
```css
.box{
display: flex;
}
```

* Webkit内核的浏览器，必须加上-webkit前缀
```css
.box{
display: -webkit-flex; /* Safari */
display: flex;
}
```

* 设为Flex布局以后，子元素的float、clear和vertical-align属性将失效。

* 采用Flex布局的元素，称为Flex容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为Flex项目（flex item），简称"项目"。

### flex-direction
> flex-direction属性决定主轴的方向（即项目的排列方向）
```css
.box {
  flex-direction: row | row-reverse | column | column-reverse;
}
```
* row（默认值）：主轴为水平方向，起点在左端。
* row-reverse：主轴为水平方向，起点在右端。
* column：主轴为垂直方向，起点在上沿。
* column-reverse：主轴为垂直方向，起点在下沿。

### flex-wrap
> 默认情况下，项目都排在一条线（又称"轴线"）上。flex-wrap属性定义，如果一条轴线排不下，如何换行。

```css
.box{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```
* nowrap（默认）：不换行。
* wrap：换行，第一行在上方。
* wrap-reverse：换行，第一行在下方。

### flex-flow
> flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。

```css
.box {
  flex-flow: <flex-direction> || <flex-wrap>;
}
```

### justify-content
> 它可能取5个值，具体对齐方式与轴的方向有关。下面假设主轴为从左到右。

```css
.box {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

* flex-start（默认值）：左对齐
* flex-end：右对齐
* center： 居中
* space-between：两端对齐，项目之间的间隔都相等。
* space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

### align-items
> align-items属性定义项目在交叉轴上如何对齐。

```css
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```
具体的对齐方式与交叉轴的方向有关，下面假设交叉轴从上到下
* flex-start：交叉轴的起点对齐。
* flex-end：交叉轴的终点对齐。
* center：交叉轴的中点对齐。
* baseline: 项目的第一行文字的基线对齐。
* stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

## 项目的属性

### order
> 项目排列顺序，数值越小排列越靠前
```css
.item {
  order: <integer>;
}
```

###  flex-grow
> 项目放大属性，默认为0
```css
.item {
  flex-grow: <number>; /* default 0 */
}
```

###  flex-shrink
> 项目缩小属性
```css
.item {
  flex-shrink: <number>; /* default 1 */
}
```

### flex-basis
> flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。

```css
.item {
  flex-basis: <length> | auto; /* default auto */
}
```

### flex
```css
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

### align-self
> align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。

```css
.item {
   align-self: auto | flex-start | flex-end | center | baseline | stretch;
 }
```


### css变量
```css
    --google-blue-600: rgb(26, 115, 232);
    --google-blue-700: rgb(25, 103, 210);
    --google-gray-50: rgb(248, 249, 250);
    --google-gray-300: rgb(218, 220, 224);
    --google-gray-500: rgb(154, 160, 166);
    --google-gray-600: rgb(128, 134, 139);
    --google-gray-700: rgb(95, 99, 104);
    background-color: #fff;
    color: var(--google-gray-700);
    word-wrap: break-word;
```

### 动态css
使用 atr()

## CSS 黑魔法
counter(li)
http://www.jb51.net/css/434280.html

[阮一峰]:http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool
