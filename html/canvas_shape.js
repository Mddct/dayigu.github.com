var PI = Math.PI;
var TWO_PI = 2*Math.PI;
var HALF_PI = Math.PI*0.5;

function clear(g, width, height){
    g.clearRect(0,0,width,height);			
}

function line(g, x1, y1, x2, y2){
    g.beginPath();
    g.moveTo(x1,y1);
    g.lineTo(x2,y2);
    g.closePath();
    g.stroke();
}

function ray(g, x1, y1, x2, y2, l) {
    var theta;
    theta = Math.atan2(y2-y1,x2-x1);
    g.beginPath();
    g.moveTo(x1,y1);
    g.lineTo(x1+l*Math.cos(theta),y1+l*Math.sin(theta));
    g.closePath();
    g.stroke();
}

function fillStrokeCircle(g, x,y,radius){
    if(radius<=0)
	radius = 0;
    g.beginPath();					
    g.arc(x, y, radius, 0, TWO_PI, true);
    g.closePath();
    g.fill();	
    g.stroke();
}

function fillCircle(g, x, y, radius){
    if(radius<=0)
	radius = 0;
    g.beginPath();					
    g.arc(x, y, radius, 0, TWO_PI, true);
    g.closePath();				
    g.fill();				
}

function strokeCircle(g, x, y, radius){
    if(radius<=0)
	radius = 0;
    g.beginPath();					
    g.arc(x,y, radius, 0, TWO_PI, true);
    g.closePath();
    g.stroke();							
}

function dist(g, ax, ay, bx, by) {
    var dx = bx - ax;
    dy = by - ay;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}		
