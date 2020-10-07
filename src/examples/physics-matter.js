// Benedikt Groß
// Example is based on examples from: http://brm.io/matter-js/, https://github.com/shiffman/p5-matter

// 0, 1 -> -1,1  y = kx+b  2*Math.random()-1 1 = 21+-1; -1 = 0+b b = -1;  (1--1)
var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;

var engine;
 var boxA;
var boxB;
var ground;
const boxes = [];
class Box {
  constructor(x,y, w,h, force){
      this.body = Bodies.rectangle(x,y, w,h);
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      World.add(engine.world, this.body);
      this.randomForce();
    }
   randomForce(){
    const {body} = this;
    Matter.Body.applyForce( body, 
    {
      x: body.position.x, 
      y: body.position.y},
    {
      x:  0.003*(2*Math.random()-1),
      y: -0.026 });
   }
   
   show(){
      fill(255);
       this.drawVertices(this.body.vertices);
   }
   drawVertices(vertices){
       beginShape();
          for (var i = 0; i < vertices.length; i++) {
          vertex(vertices[i].x, vertices[i].y);
          }
      endShape(CLOSE);
   }
}


var box1;
function setup() {
  createCanvas(800, 600);

  // create an engine
  engine = Engine.create();
  box1 = new Box(200, 200, 80, 80);
   // create two boxes and a ground
  boxA = Bodies.rectangle(200, 200, 80, 80);
  // boxB = Bodies.rectangle(270, 50, 160, 80);
  // ground = Bodies.rectangle(400, 500, 810, 10, {
  //   isStatic: true, angle: Math.PI /4
  // });

  // add all of the bodies to the world
  // World.add(engine.world, [boxA, boxB, ground]);

  // run the engine
  Engine.run(engine);
}

function mousePressed(){
    boxes.push(new Box(mouseX, mouseY, 20,20));
    
    /*
    Body.applyForce( ball, 
      {x: ball.position.x, 
       y: ball.position.y},
       {x: 0.05, y: 0}); */
   }
function draw() {
   background(0);
   for(let i =0;i< boxes.length;i++){
     boxes[i].show();
   }
   // console.log(box1);
   fill(255);
  //  drawVertices(boxA.vertices);
  // drawVertices(boxB.vertices);
  
  //  drawVertices(ground.vertices);
}


function drawVertices(vertices) {
  beginShape();
  for (var i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape(CLOSE);
}
