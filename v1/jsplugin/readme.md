## 为什么要做插件
* 做插件无非就是造轮子，满足代码的可复用性。节省代码量。个人有很多效果想做出来并且希望以后也可以复用，所以决定将这些东西总结起来。再有一个，很多项目是基于jquery的，在使用插件的时候就必须跟着使用jquery，这让人很不爽，很多时候使用jquery也就使用了$()选择方法，而已，所以个人对jquery其实使用并不多，项目中所有插件基本都是独立可运行的不依赖于任何第三方。

```
var api = {
	//插件参数设定
	config: function (opts) {
		if(!opts) return options;
		for(var key in opts) {
			options[key] = opts[key];
		}
		return this;
	},
	//插件监听
	listen: function listen(elem) {
		if (typeof elem === 'string') {
			var elems = document.querySelectorAll(elem),
				i = elems.length;
				while (i--) {
					listen(elems[i]);
				}
				return
		}
		//插件功能函数可以写在这
		return this;
	}
}
//将API赋值给插件名字
this.pluginName = api;
```
使用
```
pluginName.config({key: 'para'}).listen('#demo');
//因为config和listen已经返回this，所有可以这样调用：
pluginName.listen('#demo').config({key: 'para'});
//还可以这样调用：
pluginName.config({key: 'para'})
		  .listen('#demo');
```

[插件编写](http://pigkiller.iteye.com/blog/2225561)
