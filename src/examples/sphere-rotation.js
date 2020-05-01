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
    camera.position.set(2, 2, -70);
    camera.lookAt(new THREE.Vector3());

  // Setup mouse orbit controller
const controls = new THREE.OrbitControls(camera);
 
  // Setup your scene
const scene = new THREE.Scene();
globalScene.scene = scene;
  // Create a bunch of 'particles' in a group for the BG
const material =new THREE.MeshBasicMaterial({color: "green"}) ;

    
        



const perfectPlace =[];  

  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(1,2,2),
    material
    );

    const Boxes = [];
    var group = new THREE.Group();
    for(let i=0;i<30;i++){
        const mesh2 = new THREE.Mesh(
        new THREE.SphereGeometry(Math.random()*1,32,32),
        new THREE.MeshBasicMaterial({color: "green"})
        );
        
        let tetta = Math.PI* random.gaussian();
        let phy   = 2*Math.PI* random.gaussian();
        let x     = 30* Math.sin(tetta)*Math.cos(phy);
        let y     = 30* Math.sin(tetta)* Math.sin(phy);
        let z     = 30* Math.cos(tetta);
            perfectPlace.push({
            x,
            y,
            z
        });
        mesh2.position.set(0,0,0);
        mesh2.material.color.setRGB(Math.random(),Math.random(),Math.random());
        Boxes.push(mesh2);
        group.add(mesh2);
        scene.add(group);
}

    
    


    perfectPlace.forEach((place,i)=>{

        const tween = new TWEEN.Tween(Boxes[i].position)
            .to(place,1500)
            .easing(TWEEN.Easing.Bounce.Out)
            .onUpdate(function() { 
        const {_object:object} = this;
        const {x,y} = object;
        Boxes[i].position.x = x;
        Boxes[i].position.y = y;

        }).start();  
    });



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
        group.rotation.y+=Math.PI/90;
    
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
