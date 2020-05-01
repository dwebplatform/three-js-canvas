const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const  TWEEN = require('@tweenjs/tween.js');

const globalScene ={
    scene:null
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
  renderer.setClearColor("hsl(10, 60%, 70%)", 1);

  // Setup a camera
  const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 500);
  camera.position.set(2, 2, -4);
  camera.lookAt(new THREE.Vector3());

  // Setup mouse orbit controller
  const controls = new THREE.OrbitControls(camera);
  const coords = { x: 0, y: 0 };
  
  // Setup your scene
  const scene = new THREE.Scene();
  globalScene.scene = scene;
  // Create a bunch of 'particles' in a group for the BG
  
  const material =new THREE.MeshBasicMaterial({color: "green"}) ;

    
        
      

  
  const perfectPlace =[{
    x:0,
    y:0,
    z:0,
  },{
    x:0,
    y:10,
    z:0,
  },{
    x:0,
    y:20,
    z:0,
  },{
    x:0,
    y:30,
    z:0,
  },
    {
      x:0,
      y:40,
      z:0,  
    
  },{
    x:0,
    y:50,
    z:0,
  
},{
  x:0,
  y:60,
  z:0,

},{
  x:0,
  y:70,
  z:0,

},
{ x:0,
  y:80,
  z:0,

  
},
{ x:0,
  y:90,
   z:0,

  
}
];  

  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(1,2,2),
    material
    );

    const Boxes = [];
    var group = new THREE.Group();
    for(let i=0;i<30;i++){
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(Math.random()*5,32,32),
        material
        );
        let tetta = Math.PI* Math.random();
        let phy = 2*Math.PI* Math.random();
        let x = 30* Math.sin(tetta)*Math.cos(phy);
        let y = 30* Math.sin(tetta)* Math.sin(phy);
        let z =  30* Math.cos(tetta);
        let randomPosition = [Math.floor(x ),y,Math.floor(z) ];
        mesh.position.set(...randomPosition);
        Boxes.push(mesh);
        group.add(mesh)
        scene.add(group);
      }

    
      

    const particles = [];
    particles.push({
      el: mesh,
      Velosity3d:[10,5,3],

    });

    perfectPlace.forEach((place,i)=>{

    //    const tween = new TWEEN.Tween(Boxes[i].position)
    //   .to(place,1000)
    //  .onUpdate(function() { 
    //       const {_object:object} = this;
    //   const {x,y} = object;
    //   Boxes[i].position.x = x;
    //   Boxes[i].position.y = y;
    
    //         }).start();
      
    });
  //     const mesh = new THREE.Mesh(
    //       new THREE.BoxGeometry(1,1,1),
    //       material);
    //       mesh.name="box-"+i;
    //       mesh.position.set(x*2,y,z*2);
    //       scene.add(mesh);    

    //         allCubes.push({
    //             mesh: mesh,
                 
    //         });
    //         if(initialZ<4){
    //           initialZ++;
    //         }
    //         else{
    //           initialX++;
    //             initialZ=0;
    //         }
        
    // }


  // Add a little mesh to the centre of the screen
 

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

 
      group.rotation.y+=Math.PI/180;
      
  
        //  if( el.position.x>10 || el.position.x<-10){
        //   Velosity3d[0]= -Velosity3d[0];
        // }
        // if(el.position.y>10 || el.position.y<-10){
        //   Velosity3d[1]= -Velosity3d[1];
          
        // }

        // if( el.position.z>10 || el.position.z<-10){
        //   Velosity3d[2]= -Velosity3d[2];
        // }
          // mesh.position.x+= Velosity3d[0]*deltaTime;
           
   
  

      
      // controls.update();
      TWEEN.update();
      renderer.render(scene, camera);
    },
    // Dispose of WebGL context (optional)
    unload() {
        // controls.dispose();
        renderer.dispose();
    }
};

};

 
canvasSketch(sketch, settings);
