import p5 from 'p5';
import distance  from 'euclidean-distance';


function lerp(a,b,t){
    // return v0*(1-t)+v1*t;
    return [
        a[0]*(1-t) + b[0]*t,
        a[1]*(1-t) + b[1]*t    
    ]
}
 
const x =Array.from(Array(1000).keys()).map(el=>el*45);
const points = x.map(i=>[i,15*Math.sin(i)]);

let sketch = function(p) {
  let time = 0;
  let curPeriod = 1;
  p.setup = function() {
    p.createCanvas(window.innerWidth, window.innerHeight);
  };
  function checkOnLast(){
    if(points.length-1 <curPeriod ){
        curPeriod = 1;
    }
  }
  p.draw = function() {
    p.background(0);
    p.fill(255);
    // curPeriod
    checkOnLast();
    const pstart = points[curPeriod-1];
    const pend = points[curPeriod];
  
    let [x,y] = lerp(pstart,pend, time);
    let maxDistance = distance(pstart,pend);
    let curDistance = distance([x,y], pend);

    if(curDistance<= 0.001*maxDistance || curDistance>maxDistance ){
        time = 0;
        curPeriod++;
      } else {  
         p.circle(x,y+100, 15);
         time+=0.05;
    }
   
    
  };
};
let myp5 = new p5(sketch);


 
