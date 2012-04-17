---
layout: post
title: "html5 动画实例分析: Blob"
category: [web]
tags: [html5, animation, javascript]
---

在 html5 动画的众多"炫"的例子中，[Blob](http://hakim.se/experiments/html5/blob/03/) 是尤为出色的一个，其特色在于对物理的模拟: 液滴的运动、分离、合并都相当逼真。下面将对这个例子进行分析，不仅要找到其中对物理规律的模拟方法，也学习一下 javascript 的技巧。

# html文件

首先查看 html 源文件，并把无关紧要的部分删除，就能找到模拟的关键部分:

    <body data-twttr-rendered="true">
    	<div id="panel">
	     <h2><a href="http://hakim.se/experiments/">Experiments</a> / Blob  / 03</h2>
	     <p><b>Double click</b> on a blob to split it, drag together to merge<br><b>Shake</b> the browser window to make them bounce.<br>Use the keyboard <b><a id="keyboardUp" href="http://hakim.se/experiments/html5/blob/03/#">up</a> / <a id="keyboardDown" href="http://hakim.se/experiments/html5/blob/03/#">down</a></b> arrows to change blob size and<br>the <b><a id="keyboardLeft" href="http://hakim.se/experiments/html5/blob/03/#">left</a> / <a id="keyboardRight" href="http://hakim.se/experiments/html5/blob/03/#">right</a></b> arrows to change between skins.</p>
	</div>		
	<canvas id="world" width="1124" height="693"><p class="noCanvas">You need a <a href="http://www.google.com/chrome">modern browser</a> to view this.</p></canvas>
	<script src="./Blob_files/blob.min.js"></script>
    </body></html>

可见，动画都绘制在 id 为 world 的 canvas 中的，动画则由 blob.min.js 所控制。

# js 文件

blob.min.js 中主要定义了对象 Blob 和 BlobWorld，前者是液滴对象，后者是液滴的控制。

## Blob

先看 Blob:

    function Blob(){
        this.position={x:0,y:0}; // 位置
        this.velocity={x:0,y:0}; // 速度
        this.radius=85;		     // 半径
        this.nodes=[];           // 节点对象数组，节点只记录边界
        this.rotation={current:0,target:0};  // 旋转
        this.dragNodeIndex=-1;     // 拉伸的node序号
        this.lastSplitTime=0;      // 上次分裂时间
        this.quality=16;           // 质量, 其实是节点数量，即周长
        this.dirtyRegion=new Region // 弄脏的区域，指涂抹过的地方，下一个时刻需要刷新
    }

这相当于 Blob 的构造函数。其中关键的量是 nodes，它是边界单元的一维链表。//(注意观察液滴的行为，其周长是不变的，而体积／面积是变化的，这一点不符合物理)

以下是用 prototype 方法定义的成员函数。

生成节点 generateNodes:

	Blob.prototype.generateNodes=function(){
		this.nodes=[];
		var b,e;
		for(b=0;b<this.quality;b++){
			e={normal:{x:0,y:0},normalTarget:{x:0,y:0},position:{x:this.position.x,y:this.position.y},ghost:{x:this.position.x,y:this.position.y},angle:0};
		this.nodes.push(e)
		}
		this.updateJoints();
		this.updateNormals()
	};

可见 nodes 中存放的是一个个对象，对象中有属性:

* normal: 节点的位置坐标
* normalTarget: 节点的目标位置坐标
* position: 位置坐标
* ghost: 上一时刻的位置
* angle: 角度
* joint: 链接，为 Joint 对象

初始化时 joint 不设置，在 updateJoints中设。链接记录前后各3个node，共6个。getArrayIndexByOffset 用于寻找相邻的单元序号，根据序号创建 Joint 对象。Joint 对象的属性有 node，strength 和 strain。

然后用 updateNormals 建立节点的法向。

初始化后的液滴是 完美的圆形。

split: 分裂

分裂时将 nodes 中的前一半放到新建立的 Blob 对象中，本身只剩下一半，半径也各变为一半。并各自给一个水平速度，使其分开。

merge: 合并

合并时将两个液滴的速度取平均，作为合并后的速度(如果两个液滴大小不同，则不符合动量守恒)。半径也是二者直接相加。

## BlobWorld

BlobWorld 也是个对象，其成员变量有: g,t,l,j,q,I,u,v,y,f,K,x,w,C。

* g: 区域尺寸参数
* t: canvas 对象
* l: canvas 的 2d context 对象
* j 用于存放液滴 blob 对象
* q
* I,J: 窗口相对于屏幕的坐标. 当移动窗口时，根据I，J的变化改变速度
* u，v: 速度
* y
* f
* K: 速度参数，其中 y 速度为 1.2, 相当于有一定的重力
* x: 记录2个液滴的序号
* w
* C: 填充颜色、线条颜色等

### 初始化

其入口是 init()。

    this.init=function(){
	if((t=document.getElementById("world"))&&t.getContext){
	    l=t.getContext("2d");
	    document.addEventListener("mousemove",e,false);
	    t.addEventListener("mousedown",i,false);
	    t.addEventListener("dblclick",M,false);
	    document.addEventListener("mouseup",k,false);
	    document.addEventListener("keydown",N,false);
	    t.addEventListener("touchstart",s,false);
	    t.addEventListener("touchmove",z,false);
	    t.addEventListener("touchend",L,false);
	    window.addEventListener("resize",H,false);
	    document.getElementById("keyboardUp").addEventListener("click",O,false);
	    document.getElementById("keyboardDown").addEventListener("click",P,false);
	    document.getElementById("keyboardLeft").addEventListener("click",Q,false);
	    document.getElementById("keyboardRight").addEventListener("click",R,false);
	    b({x:g.width*0.15,y:g.height*Math.random()*0.2},{x:g.width*0.011,y:0});
	    b({x:g.width*0.85,y:g.height*Math.random()*0.2},{x:-g.width*0.011,y:0});
	    H();
	    setInterval(S,1E3/60)
	}
    }
	
t 是 canvas 对象，l 是 2d context。然后把鼠标事件绑定到函数上。	

比如双击鼠标 dbclick，调用 M()，M() 再调用 G()，G()中进行分裂。

init() 中首先调用 b() 生成两个 Blob 对象。初始位置在左、右上角，初始速度相对。

然后调用 H()，设定几何尺寸。

最后设置定时函数 setInterval，每1／60 s执行一次 S()。

### 运动模拟

S() 是模拟液滴运动的核心函数。

不知是作者的习惯，或是有意，经常写一些混乱的代码，如:

	h=0;
	for(n=j.length;h<n;h++){

一般写法:

	n=j.length;
	for(h=0;h<n;h++){

如果有两个液滴，而且距离上次分裂的时间大于 500s 就合并。

模拟运动时，考虑了液滴质心的运动、鼠标拖拽、自身旋转，以及相邻节点的牵引作用。计算这些作用对坐标的影响时，基本都采用了亚松弛的方法，如:

		c.normal.x+=(c.normalTarget.x-c.normal.x)* 0.05;
		c.normal.y+=(c.normalTarget.y-c.normal.y)*0.05;

		c.position.x+=(p.x-c.position.x)*0.1;
		c.position.y+=(p.y-c.position.y)*0.1;
		
### 其他函数

D(f,h): 找出距离点h最近的液滴f中的节点node


# end

通过这个例子，对 javascript 的特点有了点了解。关于 javascript 在面向对象方面的编程，可参考[阮一峰的网络日志](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_encapsulation.html), 其讲解清晰、透彻。

