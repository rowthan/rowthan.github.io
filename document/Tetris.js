



function Tetris(){

    //主面板id
    this.mainboxid="main_box"; //进行赋值，以通过javascript脚本来控制html的元素 main_box 指 <div id="main_box"> 在游戏html中是装所有元素的div
    //预告面板
    this.nextboxid="next";//同上
    //下落速度
    this.sped=500;
    //快速下落quick的时候 需要把 this.sped 的值变小 然后凭借quick 来恢复 因为每一步下落 调用的步长都是 this.sped;
    this.quick=500;//初始化为500
    //框架中x单位个数
    this.box_x=11;
    this.box_y=20;
    //累积得分
    this.score=0;
    //连续消除的行数与相应得分
    this.scores=[10,20,40,50];
    //下落控制指针
    this.mytime=null;
    //储存所有被插入的小方块 用来判断是否某一行已经满格 确定是否消去
    this.allbox=[];
    //当前图形的引用
    this.over=false;
    //暂停开始
    this.stops=false;
    this.shapeNow={
        objs:null,       //图形四个div
        rotates:1,    //旋转角度 1-4
        cata:0,        //图形种类
        bgimg:0,       //背景图片背景位置 position
        migrate:[0,0]  //偏移量
    }

    //下一个图形
    this.shapeNext={
        objs:null,       //图形四个div
        rotates:1,    //旋转角度 1-4
        cata:0,        //图形种类
        bgimg:0,       //背景图片 0-3
        migrate:[0,0]  //偏移量
    }
    //cate 0-6 I,L,J,T,O,S,Z
    //rotations  0,1,2,3
    //构造一个新的图形 以及其状态
    this.Tconstructor=function(div4s){
        var ca=["shape_i","shape_l","shape_j","shape_t","shape_o","shape_s","shape_z"];
        var that=this;//that.shape_i.call(that,4);
        return eval("that."+ca[div4s.cata]+"("+div4s.rotates+","+div4s.bgimg+")");
    }

    //创建图形
    this.createShape=function(Ar,bgimg){
        var divAr=[];
        var bgposition="1px "+bgimg*(-28)+"px";//显示背景图片显示 颜色选择 每个图像为28像素
        for(var i=0;i<4;i++){
            var div=document.createElement("DIV");
            div.style.backgroundPosition=bgposition;
            div.style.left=(Ar[i][0]*28)+"px";
            div.style.top=(Ar[i][1]*28)+"px";
            divAr.push(div);
        }
        return divAr;
    }

    //预告显示
    this.showNextShape=function(){
        var objs=this.shapeNext.objs;
        //alert('s');
        var i=0;
        var temp=this.$("next");
        while(temp.lastChild){
            temp.removeChild(temp.lastChild);
        }
        for(;i<objs.length;i++){
            objs[i].style.left=parseInt(objs[i].style.left)+28+"px";
            objs[i].style.top=parseInt(objs[i].style.top)+130+"px";
            this.$("next").appendChild(objs[i]);
        }
        this.showShape();

    }

    //插入到游戏面板中
    this.showShape=function(){
        var divAr=this.shapeNow.objs;
        //保证插入文档的时候最低的一块的下边挨着文档；
        var minTop=Math.max(parseInt(divAr[0].style.top),parseInt(divAr[1].style.top),parseInt(divAr[2].style.top),parseInt(divAr[3].style.top));
       // alert(minTop);
        var s=Math.abs(minTop+28);
        //alert(s);
        this.shapeNow.migrate[0]=84;
        this.shapeNow.migrate[1]=s;
        for(var i=0;i<divAr.length;i++){
            divAr[i].style.left=parseInt(divAr[i].style.left)+84+"px";
            divAr[i].style.top=parseInt(divAr[i].style.top)+s+"px";
            this.$(this.mainboxid).appendChild(divAr[i]);
            //this.allbox.push(divAr[i]);
        }
        this.drop();
    }

    //旋转 
    //关于I  光棍子
    this.shape_i=function(rotations,bgimg){
          //alert(rotations);
        if(rotations==1||rotations==3){ //竖着
            var Ar=[[2,-1],[2,-2],[2,-3],[2,-4]];
        }else if(rotations==2||rotations==4){//横着
            var Ar=[[0,-3],[1,-3],[2,-3],[3,-3],[4,-3]];
        }else{
            alert("光棍形状旋转角度参数有误！"); 
            return false;
        }
        return this.createShape(Ar,bgimg);
    }

    //关于L
    this.shape_l=function(rotations,bgimg){
        var Ar=[];
        switch(rotations){
            case 1:Ar=[[2,-2],[1,-2],[1,-3],[1,-4]];break;
            case 2:Ar=[[1,-2],[1,-3],[2,-3],[3,-3]];break;
            case 3:Ar=[[1,-4],[2,-4],[2,-3],[2,-2]];break;
            case 4:Ar=[[1,-2],[2,-2],[3,-2],[3,-3]];break;
        }
        return this.createShape(Ar,bgimg);
    }
    //关于j
    this.shape_j=function(rotations,bgimg){
        var Ar=[];
        switch(rotations){
            case 1:Ar=[[1,-2],[2,-2],[2,-3],[2,-4]];break;
            case 2:Ar=[[1,-3],[1,-2],[2,-2],[3,-2]];break;
            case 3:Ar=[[1,-2],[1,-3],[1,-4],[2,-4]];break;
            case 4:Ar=[[1,-3],[2,-3],[3,-3],[3,-2]];break;
        }
        return this.createShape(Ar,bgimg);
    }
    //关于t
    this.shape_t=function(rotations,bgimg){
        var Ar=[];
        switch(rotations){
            case 1:Ar=[[1,-3],[2,-3],[3,-3],[2,-4]];break;
            case 2:Ar=[[2,-2],[2,-3],[2,-4],[3,-3]];break;
            case 3:Ar=[[1,-3],[2,-3],[3,-3],[2,-2]];break;
            case 4:Ar=[[2,-2],[2,-3],[2,-4],[1,-3]];break;
        }
        return this.createShape(Ar,bgimg);
    }
    //关于o
    this.shape_o=function(rotations,bgimg){
        return this.createShape([[1,-2],[1,-3],[2,-2],[2,-3]],bgimg)
    }
    //关于s
    this.shape_s=function(rotations,bgimg){
        var Ar=[];
        var temp=(rotations==1||rotations==3)?1:2;
        switch(temp){
            case 1:Ar=[[1,-4],[1,-3],[2,-3],[2,-2]];break;
            case 2:Ar=[[1,-2],[2,-2],[2,-3],[3,-3]];break;
        }
        return this.createShape(Ar,bgimg);
    }
    //关于z
    this.shape_z=function(rotations,bgimg){
        var Ar=[];
        var temp=(rotations==1||rotations==3)?1:2;
        switch(temp){
            case 1:Ar=[[1,-2],[1,-3],[2,-3],[2,-4]];break;
            case 2:Ar=[[1,-3],[2,-3],[2,-2],[3,-2]];break;
        }
        return this.createShape(Ar,bgimg);
    }

    //byId 简称
    this.$=function(ids){
        return document.getElementById(ids); //取得html中的id?---------------------------------------------------------------------
    }

   //遍历
    this.clone=function(myObj){
      var myNewObj = {
        objs:[],       //图形四个div
        rotates:1,    //旋转角度 1-4
        cata:0,        //图形种类
        bgimg:0,       //背景图片背景位置 position
        migrate:[0,0]  //偏移量
      }

          myNewObj.rotates=myObj.rotates;
          myNewObj.cata=myObj.cata;
          myNewObj.bgimg=myObj.bgimg;
          var tempdivs=myObj.objs;
         for(var i=0;i<4;i++){
             myNewObj.objs.push(tempdivs[i].cloneNode(true));
         }
        return myNewObj;
    }
    //下落
    this.drop=function(){
        //是否继续下落
        if(this.stopMove()){
            clearTimeout(this.mytime);
            this.nextStart();
        }
       var temp=this.shapeNow.objs;
        var i=0;
        for(;i<4;i++){
            temp[i].style.top=parseInt(temp[i].style.top)+28+"px";
        }
        this.shapeNow.migrate[1]+=28;

        //是否游戏结束
        if(this.over){
           clearTimeout(this.mytime);
            tempobj=null;
            return;
        }

         tempobj=this;
         clearTimeout(this.mytime);
         this.mytime=setTimeout("tempobj.drop()",this.sped);

    }
    //下一个图形开始下落
    this.nextStart=function(){
        this.sped=this.quick;
        var divAr=this.shapeNow.objs;
        for(var j=0;j<4;j++){
           //alert(parseInt(divAr[j].style.top))
            if(parseInt(divAr[j].style.top)<0){
                //clearTimeout(this.mytime);
                this.over=true;
                this.gameOver();
                return false;
            }
            //在图形引用消失之前把它逐个推入到大数组中
           this.allbox.push(divAr[j]);
        }
        //大数组完成之后立即检验是否可以消行
        this.clearLine();

        this.shapeNow=null;
       // var temp1=this.shapeNext.objs;
        this.shapeNow=this.clone(this.shapeNext);
        var temp=this.shapeNow.objs;
         for(var i=0;i<4;i++){
            temp[i].style.left=parseInt(temp[i].style.left)-28+"px";
            temp[i].style.top=parseInt(temp[i].style.top)-130+"px";
         }
        this.start();
    }
    //开始
    this.start=function(){
          if(!this.shapeNow.objs){//预告面板中木有东西 开始时候两个面板均为空
             this.shapeNow.rotates=parseInt(4*Math.random()+1);
             this.shapeNow.cata=parseInt(7*Math.random());
             this.shapeNow.bgimg=parseInt(4*Math.random());
             this.shapeNow.objs=this.Tconstructor(this.shapeNow);
             //shapeNow对象必须一开始就要有东西
             this.shapeNext.rotates=parseInt(4*Math.random()+1);
             this.shapeNext.cata=parseInt(7*Math.random());
             this.shapeNext.bgimg=parseInt(4*Math.random());
             this.shapeNext.objs=this.Tconstructor(this.shapeNext);
             this.showNextShape();

        }else{
             this.shapeNext.rotates=parseInt(4*Math.random()+1);
             this.shapeNext.cata=parseInt(7*Math.random());
             this.shapeNext.bgimg=parseInt(4*Math.random());
             this.shapeNext.objs=this.Tconstructor(this.shapeNext);
             this.showNextShape();
        }
    }
    //判断下移动边界
    this.stopMove=function(){
         //先判断下落边界
        var all=this.allbox;
        var now4=this.shapeNow.objs;
        for(var i=0;i<4;i++){
            if(parseInt(now4[i].style.top)>=532){
               return true;
            }
            for(var j=0;j<all.length;j++){
                if((parseInt(now4[i].style.top)==parseInt(all[j].style.top)-28)&&(parseInt(now4[i].style.left)==parseInt(all[j].style.left))){
                    //alert(parseInt(now4[i].style.top));
                    return true;
                }
            }
        }

        return false;
    }
    //左移动
    this.moveLeft=function(){
        //是否可以向左一步
        var all=this.allbox;
        var divAr=this.shapeNow.objs;
        for(var i=0;i<4;i++){
            if(parseInt(divAr[i].style.left)==0){
               return true;
            }

            for(var j=0;j<all.length;j++){
               if((parseInt(divAr[i].style.left)-28==parseInt(all[j].style.left))&&(parseInt(divAr[i].style.top)==parseInt(all[j].style.top))){
                   return true;
               }
            }

        }
        //没有退出则可以移动
        this.shapeNow.migrate[0]=this.shapeNow.migrate[0]-28;
        i=0;
        //tempobj=this;
        clearTimeout(this.mytime);
        for(;i<4;i++){
           divAr[i].style.left=parseInt(divAr[i].style.left)-28+"px";
        }
        this.mytime=setTimeout("tempobj.drop()",this.sped);
    }

    //右移动
    this.moveRight=function(){
        //是否可以向右一步
        var all=this.allbox;
        var divAr=this.shapeNow.objs;
        for(var i=0;i<4;i++){
            if(parseInt(divAr[i].style.left)==280){
               return true;
            }
            for(var j=0;j<all.length;j++){
               if((parseInt(divAr[i].style.left)+28==parseInt(all[j].style.left))&&(parseInt(divAr[i].style.top)==parseInt(all[j].style.top))){
                   return true;
               }
            }

        }
        //没有退出则可以移动
        this.shapeNow.migrate[0]=this.shapeNow.migrate[0]+28;
        i=0;
        //tempobj=this;
        clearTimeout(this.mytime);
        for(;i<4;i++){
           divAr[i].style.left=parseInt(divAr[i].style.left)+28+"px";
        }
        this.mytime=setTimeout("tempobj.drop()",this.sped);
    }
    //加速下落
    this.quickDown=function(){
        clearTimeout(this.mytime);
        this.mytime=setTimeout("tempobj.drop()",40);
        this.sped=40;
    }

    //上键变形
    this.rotateThisShape=function(){
       clearTimeout(this.mytime);
        //重新构造一个图形
        var tempObj=this.clone(this.shapeNow);
        tempObj.rotates=(this.shapeNow.rotates+1)>4?1:this.shapeNow.rotates+1;
        tempObj.migrate[0]=this.shapeNow.migrate[0];
        tempObj.migrate[1]=this.shapeNow.migrate[1];
        tempObj.objs=null;
        tempObj.objs=this.Tconstructor(tempObj);
        //alert(tempObj.objs[1].style.top+"<<<<"+tempObj.objs[1].style.left+"<<<<<"+tempObj.migrate+"<<<<"+tempObj.cata);
        //位置一致   形状不同
        for(var i=0;i<4;i++){
            tempObj.objs[i].style.top=parseInt(tempObj.objs[i].style.top)+tempObj.migrate[1]+"px";
            tempObj.objs[i].style.left=parseInt(tempObj.objs[i].style.left)+tempObj.migrate[0]+"px";
        }
        i=0;
        var all=this.allbox;
        var divAr=tempObj.objs;
        var change=true;
        x:for(var i=0;i<4;i++){
            for(var j=0;j<all.length;j++){
                //判断变形后的右边界
                if(parseInt(divAr[i].style.left)>280){
                   change=false;
                   break x;
                }
               if((parseInt(divAr[i].style.left)+28==parseInt(all[j].style.left))&&(parseInt(divAr[i].style.top)==parseInt(all[j].style.top))){
                   change=false;
                   break x;
               }
               //判断变形后的左边界
                if(parseInt(divAr[i].style.left)<0){
                   change=false;
                   break x;
                }
               if((parseInt(divAr[i].style.left)-28==parseInt(all[j].style.left))&&(parseInt(divAr[i].style.top)==parseInt(all[j].style.top))){
                   change=false;
                   break x;
               }
               //判断变形后的下边界
                if((parseInt(divAr[i].style.top)==parseInt(all[j].style.top)-28)&&(parseInt(divAr[i].style.left)==parseInt(all[j].style.left))){
                    change=false;
                    break x;
                }
            }
        }

        //如果此时变形是合法的 变形

        if(change){
            i=0;
            for(;i<4;i++){
                this.$(this.mainboxid).replaceChild(divAr[i],this.shapeNow.objs[i]);
            }
            //完成替换
           this.shapeNow=tempObj;
            tempObj=null;
        }
       this.mytime=setTimeout("tempobj.drop()",this.sped);

    }

    //核心代码之 消行
    this.clearLine=function(){
        clearTimeout(this.mytime);
        var y=this.box_y;
        var x=this.box_x;
        var all=this.allbox;
        //var clineX=[];
        var father=this.$(this.mainboxid);
        //接下来用一个矩阵把方块分类装起来
        //这里是一个失误啊 本来 this.allbox 应该就是这个矩阵才对  节省很多内存了
        //该数组以每一个方块的 top/28 [就是0-19]之间的数作为下标 每一个元素是一个数组 数组长度为x的时候 就是横向的所有都有方块 就是消行的时候
        var corpsArr=new Array(y);
        for(var m=0;m<y;m++){
            corpsArr[m]=[];
        }
        //填充这个矩阵
        for(var j=0;j<all.length;j++){
             //alert(parseInt(all[j].style.top)/28);
             if(all[j].style.display=="none"){
              //all.splice(j,1);
                 continue;
             }
             corpsArr[parseInt(all[j].style.top)/28].push(all[j]);
        }
        //检验这个矩阵
        j=0;
        var lines=-1;
        for(;j<y;j++){
            if(corpsArr[j].length==11){
                //说明有一个行是满的
                 clearOneLine(j);
                 lines+=1;
            }
        }
        //alert(corpsArr[19].length);
        if(lines>=0&&lines<=3){
            this.score+=this.scores[lines];
            this.$("cod").value=this.score;
            if(this.sped>150){
                this.sped-=8;
                this.quick=this.sped;
            }

        }



       
        function clearOneLine(items){
            for(var i=0;i<x;i++){
                //删除这一行
                corpsArr[items][i].style.display="none";
                corpsArr[items][i].style.top="10000px";
                father.removeChild(corpsArr[items][i]);
            }
            //把这一行以上的所有div向下移动一格
            for(var j=items-1;j>=0;j--){
                  for(var k=0;k<corpsArr[j].length;k++){
                       corpsArr[j][k].style.top=parseInt(corpsArr[j][k].style.top)+28+"px";
                  }
            }
        }

    }
    //游戏结束了；
    this.gameOver=function(){
		 audio = document.createElement("audio");
              audio.src = "music/Rain - La Song (2.1).mp3";
			  audio.play();
        alert("童鞋！你挂了，本次游戏你获得了"+this.score+"分");
        window.location=window.location;
        var mianbox=this.$(this.mainboxid);
        while(mianbox.lastChild){
           mianbox.removeChild(mianbox.lastChild);
        }

        return false;
    }

    this.testStop=function(){
        var obj=this.$("stopid");//html 中的stopid div 在javascript中使用obj来调用 
        var that=this;
        obj.onclick=function(){//点击暂停后发生的事件
			  audio = document.createElement("audio");
              audio.src = "music/点击.wav";
			  audio.play();
            clearInterval(that.mytime);
        }
    }

    this.goOn=function(){
         clearTimeout(this.mytime);
         this.mytime=setTimeout("tempobj.drop()",this.sped);
    }

}


var tempobj;
var  tetris=new Tetris();

    var starts=function(){

			  audio = document.createElement("audio");
              audio.src = "music/背景.wav";
			  audio.play();
			  audio.loop=true;

        document.onkeydown=function(e){
          // alert(e.keyCode);
          // return; //测试输入值

			  audio = document.createElement("audio");
              audio.src = "music/按键音.wav";
			  audio.play();



            if(e.keyCode==13&&!tetris.stops){
              tetris.start();
              tetris.stops=true;
			
              return;
            }
            if(e.keyCode==37&&tetris.stops){//左
               tetris.moveLeft();
			  
                return;
            }
            if(e.keyCode==39&&tetris.stops){//右
                tetris.moveRight();
			
                return;
            }
            if(e.keyCode==40&&tetris.stops){//下
                tetris.quickDown();
			  audio = document.createElement("audio");
              audio.src = "music/下落.wav";
			  audio.play();

                return;
            }
            if(e.keyCode==38&&tetris.stops){//上
				
                tetris.rotateThisShape();
            }
        }

    }

starts();
window.onload=function(){
  tetris.testStop();
  var kaishi=document.getElementById("begin");//getelementbyid 通过此语句与html中的元素建立联系
  kaishi.onclick=function(){
	          audio = document.createElement("audio");
              audio.src = "music/点击.wav";
			  audio.play();
             if(!tetris.stops){
                tetris.start();
                tetris.stops=true;
                return;
             }else{
                 tetris.goOn();
             }

        }
}

 /* function log(str){
    var obj=document.getElementById("log");
    obj.innerHTML=str;

} */