const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const  TWEEN = require('@tweenjs/tween.js');
 

 
 

 
const globalScene ={
    scene:null,
    cubes:null,
    breadCrumps: {}
}
let dissapear = false;
// Import ThreeJS and assign it to global scope
// This way examples/ folder can use it too
global.THREE = require("three");

// Import any examples/ from ThreeJS
require("three/examples/js/controls/OrbitControls");

const settings = {
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: "webgl",
  // Turn on MSAA
  attributes: { antialias: true }
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    context
  });

  // WebGL background color
  renderer.setClearColor("tomato", 1);

  // Setup a camera
  const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 500);
  camera.position.set(2, 2, -10);
  camera.lookAt(new THREE.Vector3());

  // Setup mouse orbit controller
  const controls = new THREE.OrbitControls(camera);
  
  // Setup your scene
  const scene = new THREE.Scene();
  globalScene.scene = scene;
  // Create a bunch of 'particles' in a group for the BG
  class User {
    constructor(x,y,z){
      this.x = x;
      this.y = y;
      this.z = z;
      let randomVx = Math.random()*10;
      let randomVy = Math.random()*10;
      let randomVz = Math.random()*10;

      this.Velosity = new THREE.Vector3(randomVx*0.01,randomVy*0.01,randomVz*0.01);
      this.init();
      
    }
    getCurrentPoint(){
      return {
        x: this.x+this.Velosity.x/2,
        y: this.y+this.Velosity.y/2,
        z: this.z+this.Velosity.z/2,
        
        
      }
    }
    update(){
      // .applyAxisAngle( axis, angle )
      if(this.x>5||this.x<-5){
        this.Velosity.x = -this.Velosity.x;
      }
      if(this.z>5||this.z<-5){
        this.Velosity.z = -this.Velosity.z;
      }
      if(this.y>5||this.y<-5){
        this.Velosity.y = -this.Velosity.y;
      }
      
      this.x  += this.Velosity.x;
      this.y  += this.Velosity.y;
      this.z  += this.Velosity.z;
      this.object.position.set(this.x, this.y, this.z);
  }
    init(){
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),
        new THREE.MeshBasicMaterial({color:"yellow"})
      );
      mesh.position.set(this.x, this.y, this.z);
      this.object = mesh;
      scene.add(mesh);
    }
  }
  class Point {
    constructor(x,y,z, Radius){
      this.x = x;
      this.y = y;
      this.z = z;
      this.R = Radius;
      this.init();
      this.Velosity = new THREE.Vector3(0.01,0.01,0.01);
    }
    update(preyObj=null){
      // .applyAxisAngle( axis, angle )
      //this.Velosity.applyAxisAngle( new THREE.Vector3(0,1,1).normalize(), Math.PI/180 );
      if(preyObj){
        let { x, y, z } = preyObj.getCurrentPoint();
        // this.Velosity.applyAxisAngle( new THREE.Vector3(x,y,z).normalize(), Math.PI/180 );

        let newVec = new THREE.Vector3(x-this.x,y -this.y, z- this.z).normalize();
          
          this.Velosity = newVec.multiplyScalar(0.015);
      }
        this.x  += this.Velosity.x;
        this.y  += this.Velosity.y;
        this.z  += this.Velosity.z;
        this.object.position.set(this.x, this.y, this.z);
        
  
}
    init(){
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(this.R,32,32),
        new THREE.MeshBasicMaterial({color:"red"})
      );
      mesh.position.set(this.x, this.y, this.z);
      this.object = mesh;
      scene.add(mesh);
    }
  }
  const material =new THREE.MeshBasicMaterial({color: "green"}) ;
  const activeMaterial = new THREE.MeshBasicMaterial({color: "green"}) ;
  const NotActiveMaterial = new THREE.MeshBasicMaterial({color: "red"}) ;
  let point = new Point(1,0,-10,0.2);
  let user = new User(1,0,-5);
  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();
   
  
  const cubes =[];
  const breadCrumps ={};
  const cubeTest= new THREE.Mesh(new THREE.BoxGeometry(1,1,1),activeMaterial);

  scene.add(cubeTest);
  const picks =[];
  const groupPicks = new THREE.Group();
  // console.log(cubeTest.geometry.vertices);
  for(let i=0;i<cubeTest.geometry.vertices.length;i++){
    let pick = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),
    material
    );
    let {x,y,z} = cubeTest.geometry.vertices[i];
    pick.position.set(x,y,z);
    pick.scale.multiplyScalar(0.2);
    picks.push(pick);
    groupPicks.add(pick);
    // scene.add(pick);
  }
  groupPicks.add(cubeTest);
  scene.add(groupPicks);
  globalScene.breadCrumps = breadCrumps;
  let initialX=0,initialZ = 0;
  for(let i=0;i<10;i++){
      if(initialZ<5)
      {
        initialZ++;
      }
      else {
        initialX++;
        initialZ=1;
      }
      const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        NotActiveMaterial
      );
      cubes.push({
          cube:cube,
          isActive: false
      });
    cube.position.set(initialX*2,0, initialZ*2);
    scene.add(cube);
    }
    globalScene.cubes = cubes;
  
  
function onMouseMove(e){
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);

  let intersects = raycaster.intersectObjects( scene.children );
    // controls.update();
    for ( var i = 0; i < 1; i++ ) {
      if( intersects[i]){
        breadCrumps[intersects[i].object.id] = true;

        // intersects[i].isActive = true;
        // intersects[i].object.material.color.set("red");
      }
    
    }
  }
  // Add a little mesh to the centre of the screen

  window.addEventListener( 'mousemove', onMouseMove, false);

  // draw each frame
    return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(viewportWidth, viewportHeight);
    camera.aspect = viewportWidth / viewportHeight;
    camera.updateProjectionMatrix();
    },
    // And render events here
    render({ time, deltaTime }) {
      let matrix = new THREE.Matrix4();
  // matrix.makeRotationY(Math.PI/180);
  // matrix.makeRotationZ(Math.PI/60);    
  

  // cubeTest.rotateOnAxis(new THREE.Vector3(1,1,1).normalize(),Math.PI/180);


      
  // cubeTest.applyMatrix(matrix);
  // cubeTest.rotateX +=0.01;
    picks.forEach(item=>{

        let {x,y, z} = item.position;
        item.rotateOnAxis(new THREE.Vector3(x,y,z).normalize(), 
        Math.PI/180);
        
    });
    user.update();
    point.update(user);
   
  cubes.forEach((item)=>{
    
      if(breadCrumps[item.cube.id]){
        item.cube.material =activeMaterial;
      }
      else{
        item.cube.material = NotActiveMaterial;

      }
     });
    renderer.render(scene, camera);
    },
    // Dispose of WebGL context (optional)
        unload() {
        // controls.dispose();
        renderer.dispose();
    }
};

};
 
setInterval(()=>{
  for (var prop in globalScene.breadCrumps) { if (globalScene.breadCrumps.hasOwnProperty(prop)) { delete globalScene.breadCrumps[prop]; } }

 },5000);
canvasSketch(sketch, settings);
