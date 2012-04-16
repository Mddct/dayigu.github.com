---
layout: post
title: "HTML5 动画"
category: [web]
tags: [html5, animation]
---

十几年前刚接触网络的时候，网页还非常的简单、朴素，让网页"花哨"一点的方法就是加上点动画。当时加动画的方法主要是两种: java applet 和 gif 图片。慢慢地，java applet 退出去了，现在多数浏览器默认都不载入了。这期间出现了 flash，但主要用作放广告和播放视频，而且也快要退出了。还出现过 vml，但需要另外安装浏览器插件，没有流行起来。以至于 gif 仍然简陋，却依然坚守。不过，这种状况已经在改变了。HTML5 和 svg 的日益流行和被主流浏览器的支持， 让在网页上加动画更加方便了。

目前，最新的主流浏览器都已默认支持 html5 和 svg的主要特性，包括动画。svg 的也能够做出很炫的动画效果，[这儿][1]有丰富的例子。svg 的优点是其矢量性，不仅能用于网络，也能作为独立的图片。但相比起来，html5的动画则更加简单和直接，下面将给出一个简单的例子。
  [1]: http://srufaculty.sru.edu/david.dailey/svg/

html5 绘制的图形都是放在 html element `<canvas></canvas>` 中的。canvas 就相当于一块画布，是页面上的一块方形区域，所有的图形、动画都在这块画布上展现。因此首选要在 html 文件的body中加入 canvas，指定其 id，还可以指定大小。

      <canvas id="canvas" width="800" height="600"></canvas>

画图和动画的工作就交给 javascript 了。在 javascript 中，首先要根据 html 中的 canvas 的id创建 canvas 对象，再得到绘图的 上下文(context)对象。

      canvas = document.getElementById('canvas');
      g = canvas.getContext("2d");

其中 g 就是绘制二维图形的上下文对象，可想而知还应该有 3d 对象，不过目前还未得到广泛的支持。2d 对象在大多数最新的浏览器中都得到支持了。g 就类似于传统桌面程序中的图形对象指针。g 提供了基本的形状的绘制方法，如绘一个圆:

    g.beginPath();					
    g.arc(x,y, radius, 0, TWO_PI, true);
    g.closePath();
    g.stroke();							

动画就是让这些图形按照时间间隔重绘，先用 clearRect 把所有区域清空，再画一次。按照一定的时间间隔调用绘图函数，要用到 setInterval 方法:

      setInterval(draw_scene, 40);

即每隔 40ms调用一次 draw_scene 方法。

下面给出简单的例子，就是 [行星与恒星的合周期][2] 中的行星运动的例子，[演示][3]。

  [2]: http://dayigu.github.com/2012/04/planet-in-conjunction-with-star/
  [3]: http://dayigu.github.com/html/planet_star_conjunction.html

主要的绘图函数放在了一个独立的 js 文件中了，简单的封装了一下。

## 参考资料:

* [Canvas教程](https://developer.mozilla.org/cn/Canvas_tutorial)
* [一个JS动画框架](http://www.funnyhao.com/a-js-animation-framework-based-on-html5-canvas/) 