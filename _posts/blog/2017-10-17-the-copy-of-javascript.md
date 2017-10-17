---
layout: post
title: 深入理解 JavaScript 复制
categories: JavaScript
description: 深复制,浅复制
keywords: JavaScript
date: 2017-10-17
---
之前已经在JavaScript“深浅复制”上踩过很多坑了，没想到这两天在 redux 上把这个坑又踩了一遍。想来或许还有很多人在这部分有很多困惑，所以谨以此记录，共勉。

踩过这些坑之后，我个人以为网络上的“深浅复制”概念给很多人都造成了误导。我们姑且抛弃“深浅复制”的概念，在JavaScript这里，我们只有“复制”一说：

## 忘记深浅复制

> 我们先给复制给一个定义：把一个“对象”的“属性值”给到另一个“对象”的“属性值”上（姑且这么理解）。

从几个例子来看：例1
```javascript
var a = 1;
var b = a;
console.log(a); //1
console.log(b); //1
console.log(a===b); //true
b = 2;
console.log(a); //1
console.log(b); //2
console.log(a===b);//false
```
这个结果，相信所有人都能得出正确结果。分析一下：
* 定义了“对象”a，a 的值等于 1
* 然后将 a 的值赋值给 b，结果 b 的结果也就变成了1,由于 1 === 1 所以 a===b 为true。
* 修改 b 的值为 2，b的值为 2
* 由于 1!=2 所以 a===b 为 false;

再看下一个例子：例2
```javascript
var oa = {name:"aname"};
var ob = {name:"aname"};
console.log(oa===ob);// false
```
尽管表面上看 oa 和 ob 的值是一样的，但是从计算机内存中 oa 和 ob 是不同的，此时的 oa 指向的是内存中的某一个块，可以认为是指针称之为引用值，可能值是 x0122，而 ob 指向的可能是 x0200，
所以判断 oa === ob 其实是判断两个对象的引用值是否相同，显然不同。
a,b 和 oa,ob最大的不同在于前者的属性值为原始数据类型，存储的就是“值”本身，由于“值”与“值”之间相等，所以 a===b ，而 oa,ob为Object对象，存储的为引用值，两个引用值不相等，所以 oa != ob。

通过上面的解释，来看下面一段代码：例3
```javascript
var oa = {name:"aname"};
var ob = oa;
ob.name = "bname";
console.log(ob===oa); //true;
console.log(oa.name); //bname
console.log(ob.name); //bname
```
我们已经知道当变量为对象时，值为引用值而不是值本身，所以通过 ob = oa 方式给 ob 赋值，其实也就是把 oa 的引用值赋值给了 ob，最终的结果就是 oa,ob指向的是同一个内存块，
所以当修改 ob.name 值时，修改了 oa,ob共同指向的对象。所以 oa.name === ob.name === "bname"。  
例4

```javascript 
var oan = {name:"aname"};
var obn = oan;
obn = {name:"bname"};
console.log(oan===obn);//false
console.log(oan.name)//aname
console.log(obn.name)//bname
```
obn != oan ，其实也非常好理解，`obn = {name:""bname"}` 的本质与例1 中的 b = 2 是一样的，即对obn重新赋值，所以这里，obn 就已经和 oan 断开联系了，重新指向了新的引用。
所以从这里也可以知道得知基础数据类型的复制和对象的复制本质并无区别。b的改变是否影响了a，主要看是修改了这个对象本身还是修改了这个对象的部分属性： b = {} 就是修改了b本身，导致b指向发生了改变，而 b.name 修改的就是这个指向的部分属性，并没有修改指向。
由于普通类型 `var a = 1`，没有什么其他属性，所以修改 a = 2，就是等同于修改了a本身。

我们可以用一个例子来验证，普通类型复制和对象复制没有本质差异：例5
```javascript
const a = 'aname';
const oa = {name:"oaname"};
a = 'new_aname';
oa = {name:"new_two_oaname"};
oa.name = 'new_oaname';
```
上述代码第3、5行代码都会报错，因为定义了 a、oa 使用了 const，我们知道 const 定义的为常量，常量是不允许修改的，而 `oa.name = 'new_oaname'` 却能够正确运行，并能够正确修改 oa.name 的值，
由前面所说的可知，const 定义的常量是不能被改动的，所以可以得出结论，`oa.name = 'new_oaname'` 修改的不是 oa 本身。oa 并没有被修改，引用值未发生改变，改变的是引用值指向的对象，
该内存对象的改变，会影响到所有指向他的变量或常量。就出现了 A 修改属性值连锁影响了一大片变量或常量，如例3。

最后来梳理一下以上内容：JavaScript 有7种数据类型，可以分为两类一种为原始数据类型（Boolean,Null,Undefined,Number,String,Symbol）,
和 Object,除了 Object 以外所有类型都是不可改变的（值本身不能改变），称这些类型的值为“原始值”，“原始值”在复制过程中就不会存在“浅复制”这一概念，针对这些类型，我们可以放心的复制和修改。

> 所以在日常开发中，判断修改一个对象是否会造成“脏写入”可以通过“修改的是变量本身，还是修改的变量指向的对象的部分属性”作为依据。


## 干净的复制

而实际开发中，常常出现这样的需求：复制A给B，修改B期望不影响A。
对此有很多解决方案，一般分为针对数组和对象的解决方案：
JavaScript是一门很神奇的语言，有许多坑，有的说是它设计初始没有考虑到，有的人认为就是这样才有意思，区别与其他的语言。在我看来，好的坏的我都接受，
着实是一门神奇的语言，也特别容易产生一些奇技淫巧，下面的解决方案，不少就在此之列。

### 数组
```javascript
var a = [1,2,3];
var b = a;
b.push(4);
console.log(a);//1,2,3,4
```
数组也是一种对象，不属于原始数据类型，所以通过 = 复制也是一种“浅拷贝”，如上代码，修改 b 值会直接 a 也会被修改，因为 a、b指向的是同一内存空间。
为了使得 a,b相互不影响，本质的解决办法即是，让两个变量的引用值不一样。

#### 方法一：slice()
```javascript
var a = [1,2];
var b = a.slice(0);
console.log(a===b);
b.push(3);
console.log(a);//1,2
```
Array.slice() 方法返回的是一个新的数组，这个数组和 a 指向的不是同一个空间，虽然值相同，但并不相等。所以之后两个变量互不影响。

#### 方法二：for
```javascript
var a = [1,2];
var b = [];
a.forEach(function(item) {
  b.push(item);
})
```
循环a的值，push 至 b中。从一开始定义 b = [],就已经注定 a!=b。

#### 方法三：concat
```javascript
var a = [1,2];
var b = a.concat();
console.log(a===b);//false
```
方法有很多，终究一个原理，不能让两个数组指向相同。

### 对象

#### Object.assign()
> 这是ES6提出一个复制方案

```javascript
var a = {name:"a"};
var b = Object.assign({},a);
console.log(a===b)//false
b.name = "b";
console.log(a.name);//a
console.log(b.name);//b
```
从这里也可以得出一个经验，针对Object类型，在修改一个B对象的某个属性时，先判断 A===B 如果为 true，那么AB之间肯定是相互影响的，但反之却不成立，下面Object.assign()会说明。

但需注意的是 Object.assign() 有局限性，它只会深复制一层。
```javascript
var a = {user:{name:"a"}};
var b = Object.assign({},a);
console.log(a===b)//false
b.user.name = "b";
console.log(a.user.name);//b
```
刚开始用 Object.assign() 可能遇到这个问题，会百思不得其解。明明 a!=b，但为何，修改 b.user.name 后 a.user.name也会受影响！这里不得不画图来说明了，画重点！
这里要引入一个『共享结构对象』的概念。
<p style="text-align: center;">
    <img src="/images/posts/share.png" alt="共享结构对象">
    <br/>
    图1 共享结构对象
</p>
由于Object.assign()只会深复制一层，所以最终的变量 b!=a，因为通过 Object.assign，b.user 和 a.user 已经指向了不同的地址，但是由于**只深复制**一层，所以，
a.user 和 b.user 还是指向的同一个内存空间，所以会出现以下情况：
```javascript
console.log(a===b);//false
console.log(a.user===b.user);//true
console.log(a.user.name===b.user.name);//true;
```
这也就解释了『A===B 如果为 true，那么AB之间肯定是相互影响的，但反之却不成立』。
为了解决以上问题，可以修改为：在对于多层级Object对象，在 Object.assign()内再次运算 Object.assign()
```javascript
var a = {user:{name:"a"}};
var b = Object.assign({},a,{
  user:Object.assign({},a.user)
});
console.log(a===b)//false
b.user.name = "b";
console.log(a.user.name);//a
```
但在实际工作中，无法判断到底Object有多少层，所以无法使用Object.assign()来实现多层级的Object的深复制。

关于『共享结构对象』，在代码中可以根据这一特性可以充分节省内存，Redux中就使用了这一[特性](http://huziketang.com/books/react/lesson33)。但使用这一特性需要完全掌握该对象特质，否则很容易在代码中出现难以调试的bug。

#### for 循环
和数组一样，可以将A对象的属性遍历出来，赋值给B以达到B属性值和A一样，但两个对象不相等。但对象里面可能包含对象，所以需要做递归处理，才能将所有的属性遍历出来，
显得似乎有些麻烦：
```javascript
var cloneObj = function(obj){
    var newobj = obj.constructor === Array ? [] : {};
    for(var i in obj){
        newobj[i] = typeof obj[i] === 'object' ? 
        cloneObj(obj[i]) : obj[i]; 
    }
    return newobj;
};
```

#### JSON.parse && JSON.stringify
> 这是一个比较暴力的方法

```javascript
var a = {user:{name:"a"}};
var b = JSON.parse(JSON.stringify(a));
console.log(a==b);//false
console.log(a.user===b.user)//false
```
个人的理解，是将a揉碎了从新构造成一个新的对象，这个结果就像是涅槃重生，表面上和原来一模一样，但已经不是当初那个少年了。当此方法仍然有局限性，
如果a对象存在undefined属性，b结果会没有这个属性：
```javascript
var a = {user:{name:"a",gender:undefined}};
var b = JSON.parse(JSON.stringify(a));
```
结果打印 console.log(b) 是看不到 gender 属性的，这本来也没什么毛病，因为gender本来就是undefined，但是如果强迫症犯了，总是觉得不舒服。
除此之外，如果a 对象存在方法，则是没法被复制的：
```javascript
var a = {user:name,getName:function(){}};
var b = JSON.parse(JSON.stringify(a));
console.log(b.getName)//undefined
```

直到目前，我也没有得到一个比较优雅的对象复制方法，如果你有更好的方法，欢迎您留言。

## 回到一个坑
说完JavaScript复制采坑，简单说下在 react-redux 里的坑：
```javascript
 newCustomField() {
      const DomainTemp = {
        ....
      };
      const newOptions = Object.assign({},this.props.options);
      newOptions.customer.push(DomainTemp);
      this.dispatch(saveSetting(newOptions));
}
```
大致的问题是,用户点击了一个新建内容，要求存储数据，并页面同步渲染画面。结果数据是添加进去了，但是页面就是不自动刷新页面，一直不得解，
把问题怀疑到了reducer是否写的有问题，redux是不是有什么bug等等，最终才发现是因为数据复制的问题：从以上代码得知 newOptions 是从 props.options复制得到，
然后数组push 了一个模板数据，然后交由action保存数据，并由react-redux更新state，重绘页面。我们都知道 react 中的 props 是由参数驱动的，是不允许在组件中被修改。
所以我就笃定`newOptions.customer.push(DomainTemp);`修改的是 newOptions，没有对`this.props.options`改动。但事实是由于 options 是一个多层级对象，
newOptions.customer === this.props.options.customer。结果就是无论怎么修改newOptions，state中的customer 和 props中的customer恒等于，所以不会导致页面重新渲染。

解决办法：
```javascript
 newCustomField() {
      const DomainTemp = {
        ...
      };
      const newOptions = Object.assign({},this.props.options,{
          customer:JSON.parse(JSON.stringify(this.props.options.customer))
      });
      newOptions.customer.push(DomainTemp);
      this.dispatch(saveAutoActionSetting(newOptions));
      window.scrollTo(0,document.body.scrollHeight+100);
    }
```


以上内容仅个人总结,由于水平有限，难免出现诸多错误，仅供参考。
如有概念错误，欢迎<a href="{{site.basePostUrl}}{{ page.path }}" target="_blank">指正修改</a>