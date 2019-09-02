### 精度问题
0.298 转化为百分数 `0.298*100+'%''` 结果为 `29.7999%`
调整：
`0.298*1000/10+'%'` 结果为 `29.8%`

### margin
* 边距
```html
<p style="margin:10px;">
    margin下方为10px
</p>
<p style="margin:10px">
    margin上方为10px。 两个元素间距不是20px而是10px
</p>
```

* margin-top 相对参考
```css

```

### url 结尾
API 设计中，为了区分API和静态请求一般API以 `/`结尾，否则可能会导致404错误


### 对象赋值
```javascript
var a = [];
var b = a;
b = {};
a===[] //true;
a !==b //true;
```

### transition 过渡变化
过渡，需要指明前后状态，如 `height:auto` 非明确高度的，无过渡效果。

### for循环中不能使用异步代码 todo
```javascript
for(let a in b){
  
}
```


### 部分浏览器不支持CSS简写
```css
overflow: auto scroll;
// 需调整为
overflow-x: auto;
overflow-y: scroll;
```

### chrome debug断点运行环境与真实环境不一致
```vue
compute:{
    get()=>{
        console.log(this.name)
    }
}
```
由于箭头函数没有绑定this，此处应该为undefined，但是Chrome debug 鼠标移动上去查看值显示正确。


### 父元素写样式给子元素用
例：el-checkbox样式自定义。传入的属性只绑定到一级父元素上，但是希望自定义子元素的样式。
```
seriesArray = [
  { name: '分享量',
    field: 'vv',
    color: '#6EA3FF'},
  { name: '点赞量',
    field: 'click',
    color: '#808CFF'},
  { name: '评论量',
    field: 'vv_click_rate',
    color: '#08d0a3'}
];

<el-checkbox
  v-for="(item,index) in seriesArray"
  :key="index"
  :label="item.field"
  :style="`--tooltip-color: ${item.color};`"
>
  {{ item.name }}
</el-checkbox>

<style>
    .el-checkbox__input.is-checked .el-checkbox__inner{
        background-color: var(--tooltip-color);
        border-color: var(--tooltip-color);
    }
</style>
```

### content-security-policy
这是一个CSP防护。在上线这个功能前，我做了一个浏览器插件用于统计我们网站会请求的所有资源，用于配置白名单。
在开发环境中一切都正常，没有阻断任何资源的加载。当上线后出现了一个问题，视频加载失败。
配置如下：
```
<meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' 'unsafe-eval' *.xxx.com"/> // xxx为代指
```
页面在加载一个视频资源 http://a.xxx.com 时一直报错，意思是不在配置白名单内，拒绝加载。检查再三已添加 `*.xxx.com`。

最终排查原因是：
白名单`*.xxx.com`未指定协议时，默认与当前网页协议。这也就是为什么开发环境没有任何问题，而上线后（https）却拒绝加载。
[content-security-policy](https://content-security-policy.com/) 中没有明确指明未指定协议时默认与页面协议保持一致（但当页面为http协议，而加载内容为https时，通过白名单校验）。

### MutationObserver
监听页面DOM结构是否发生了改变，用于监听页面是否被篡改

### body 不要设置 height：100%
使用element popover 时，弹框位置一直有问题，最终定位到是因为 body 被设置为了 height:100%。
body 被设置为100% 之后，body就不可能有scroll的情况了，因为只有本身的高度大于父容器才会有滚动的情况。也就会导致 scrolltop的值是不正确的，永远为0。在页面展示上也会表现为滚动条会出现在body内部，比较难看。

### 刷新页面时不想页面记住上次滚动位置
```
history.scrollRestoration = 'manual';
```

### 改变hash时也想页面刷新
```
window.location.hash='video';
window.location.reload(true);
```

### 尽量不要用主键自增
```
避免迁库时候主键问题
```

### object-fit
> 一张图片原始尺寸是 100*200 希望其以 100*100的尺寸进行展示，直接设定 height:100,witdh:100是无效的：容器变成了100*100 但是图片并不会发生缩放改变。

```
<img class='fit' />

<style>
  .fit{
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
</style>
```

### 检测浏览器是否安装adblock
> 创建一个疑似广告的HTML元素，DOM ready后检测该元素的可见性
```
<div id="detect" class="ads ad adsbox doubleclick ad-placement advertiser carbon-ads"></div>

<script>
const detect = document.getElementById('detect');
if(!detect || getComputedStyle(detect).display === 'none' || getComputedStyle(detect).height ===0 ){
  console.log('element has been blocked')
}
</script>
```

### 开始一个新需求
仔细过一遍需求，在开发前确定能做与否、解决物料缺失、信息不对齐等问题。避免开发时才发现这个不能做，那个资料缺少。
千万不要相信提需求的人，需求描述尽量以文档为准，避免口头交流生成的需求。


### 不换行符
0xA0

###【DOM很珍贵】 icon 不要占用dom元素：不利于SEO，增加DOM复杂度，语义化差
```css
<span class='add-question-icon'>播放量</span>

<style>
.add-question-cion:after{
  content:'\0a0';
  background-image:url('icon-url')
  display:inline-block;
  width:1em;
  height:1em;
  font-size:14px;
}
</style>
```

### dataset 做class选择器
```
.card-item[data-hilight=yes]{
  color: red;
}
```

### 侵入性一定要小
做过浏览器插件的都知道，一般通过 content_script 方式注入到网页中，但这不是一个好的办法，因为所有网页都会加载这个脚本，一方面可能会影响性能，
一方面用户根本不需要的可是也加载了，是一种资源浪费，通过 background 注入脚本是一个不错的选择，用户主动加载。


### 原生的能支持
```
<progress :value="activity.score" max="5"></progress> 

progress {
  height: 12px;
  border-radius: 6px;
  background-color: #eee;
}

progress::-webkit-progress-bar {
  background-color: #d7d7d7;
  border-radius: 6px;
}

progress::-webkit-progress-value {
  border-radius: 6px;
  background: linear-gradient(90deg, #c4e463, #ff3203);
}
```

### shadow DOM
可以通过此方式自定义自己的DOM组件，特别适用于插件，不影响原生网页的样式，也不被网页的样式影响。
同时可以通过此方式自定义浏览器的原生样式，如
```
progress::-webkit-progress-bar {
  background-color: #d7d7d7;
  border-radius: 6px;
}
```