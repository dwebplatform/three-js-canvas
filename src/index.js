const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");

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
  const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 100);
  camera.position.set(2, 2, -4);
  camera.lookAt(new THREE.Vector3());

  // Setup mouse orbit controller
  const controls = new THREE.OrbitControls(camera);

  // Setup your scene
  const scene = new THREE.Scene();
  globalScene.scene = scene;
  // Create a bunch of 'particles' in a group for the BG
  let allCubes = [];
  const material =new THREE.MeshBasicMaterial({color: "green"}) ;

    let initialX = 0;
    let initialY = 0;
    let initialZ= 0;
    for(let i=0;i<30;i++){
        
        
        let x = initialX;
        let y = initialY;
        let z = initialZ;
        
            
            allCubes.push({
                
                position:[x*2,y*2,z]
            });
            if(initialX<4){
                    initialX++;
            }
            else{
                initialY++;
                initialX=0;
            }
        
    }


  // Add a little mesh to the centre of the screen
allCubes.forEach(({position},index)=>{
    const [x,y,z] = position;
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        material);
        mesh.name="box-"+index;
        mesh.position.set(x,y,z);
        scene.add(mesh);
});

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
      // Rotate background subtly

        


        if(dissapear){
            allCubes.splice(1,1);
        
            let randomElem = Math.floor( Math.random()*scene.children.length);

                scene.remove(scene.children[randomElem]);
            // scene.children.length = scene.children.length -1;

        dissapear = false;
    }

    

        
    // controls.update();
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

    dissapear = true;
},1000);
canvasSketch(sketch, settings);
