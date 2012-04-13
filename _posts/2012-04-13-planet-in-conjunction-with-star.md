---
layout: post
title: "行星与恒星的合周期"
categories: [astronomy]
tags: [planet, astronomy, conjunction, Python]
---

行星与恒星相合是指从地球看过去，行星与该恒星在同一个方位，比如金星与昴星团相合。当然相合的条件首先是恒星位于太阳系行星运行的轨道平面上。那么某行星与某恒星相合的周期是多少呢? 

假设行星的轨道都为圆，且与地球轨道在同一平面上. 行星与恒星相合的条件见下图(O为太阳，E是地球，M是行星，以火星为例，S是恒星的方向):

![行星与恒星相合的条件](/images/planet_star_conjunction.png)

假设在 t=0 时相合，经过 t 的时间再次相合，则 e->v 必须达到与 t＝0 相同的方向，即E和M的y坐标相同，且E在M的左侧. 因此得到相合的条件:

![相合方程](/images/latex/eq_7378894517581845269_2.png)
且
![相合条件](/images/latex/eq_2329005520818939421_2.png)

如果是地球内侧的行星，如金星，则后面的不等式要反号。

该方程不好求解，因此把这两个等式和不等式的两项差值随时间的变化画出来(用 google 搜索直接可以画出曲线)。

如以[金星][1]为例，a=0.72, 共转周期为0.62年。

![金星与恒星的会合](/images/venus_conjunction.png)

当蓝色曲线经过x轴，且红色曲线在x轴上面时发生一次相合。因此平均每年内发生1次相合。但也可能某年内相合2次，接下来的1年内没有。

比如对火星(a=1.52, 共转周期1.88年)，平均每年1次会合。

![火星与恒星的会合](/images/mars_conjunction.png)								 									
木星会合周期就更长了，基本上在木星的共转一周中，只有两次机会与其他恒星相合。

![木星与恒星的会合](/images/jupiter_conjunction.png)								 									
更外层行星与恒星的会合规律与木星相同，都是在共转一周中发生两次。

以上的曲线也可以用 google search graph 的功能直接画出:

* [金星][1]
* [火星][2]
* [木星][3]
* [土星][4]
* [天王星][5]
* [海王星][6]

  [1]: https://www.google.com.hk/search?sourceid=chrome&ie=UTF-8&q=sin(2pi*x)-0.72*sin(2pi*x%2F0.62)%2C+cos(2pi*x)-0.72*cos(2pi*x%2F0.62)
  [2]: http://www.google.com/search?sourceid=chrome&ie=UTF-8&q=sin(2*pi*x)-1.52*sin(2*pi*x%2F1.88)
  [3]: http://www.google.com/search?sourceid=chrome&ie=UTF-8&q=sin(2*pi*x)-5.20*sin(2*pi*x%2F11.87)
  [4]: http://www.google.com/search?sourceid=chrome&ie=UTF-8&q=sin(2*pi*x)-9.55*sin(2*pi*x%2F29.53)
  [5]: http://www.google.com/search?sourceid=chrome&ie=UTF-8&q=sin(2*pi*x)-19.26*sin(2*pi*x%2F84.55)
  [6]: http://www.google.com/search?sourceid=chrome&ie=UTF-8&q=sin(2*pi*x)-30.23*sin(2*pi*x%2F166.24)

比如海王星的曲线在 google 中显示为:
![海王星与恒星的会合，by google](/images/neptune_conjunction_google.png)