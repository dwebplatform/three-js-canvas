function drawLine(p1,p2){
  line(p1.x,p1.y, p2.x,p2.y);
}

class Point{
  constructor(x,y){
    this.x = x;
    this.y =y;
  }
}
const points = [];
function mousePressed(){
  points.push(new Point(mouseX,mouseY));
  
}
function setup() {
  createCanvas(400, 400);
   let pstart = {x: 250, y: 0};
   let pend = {x: 50, y:60};
 
  line(...[pstart.x, pstart.y],...[pend.x,pend.y]);
   
  // x1, y1, x2,
  //y2
  let x1 = (pstart.x+ pend.x)/2;
  let y1 = (pstart.y+ pend.y)/2;
  let long = dist(pstart.x,pstart.y,x1,y1);
  
  let k = ( pend.y-(  pstart.y))/(pend.x- pstart.x);
  let b =(pend.x*( pstart.y)-pstart.x*( pend.y) )/(pend.x-pstart.x);
  let x = Math.floor(Math.random()*100);
  let y = -1/k * x + b;
  line(x1,-y1 + long,x,-y);
  
}


function draw() {
  // background(220);
  }
