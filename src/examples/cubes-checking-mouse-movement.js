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
    scene = new THREE.Scene();
    globalScene.scene = scene;
  // Create a bunch of 'particles' in a group for the BG

    const material =new THREE.MeshBasicMaterial({color: "green"}) ;
    const activeMaterial = new THREE.MeshBasicMaterial({color: "green"}) ;
    const NotActiveMaterial = new THREE.MeshBasicMaterial({color: "red"}) ;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const cubes =[];
    const breadCrumps ={};
    globalScene.breadCrumps = breadCrumps;
    let initialX=0,initialZ = 0;
    for(let i=0;i<10;i++){
        if(initialZ<5){
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
//Определяем движение мыши по экрану
function onMouseMove(e){
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObjects( scene.children );
    // controls.update();
    for ( var i = 0; i < intersects.length; i++ ) {
        if( intersects[i]){
        breadCrumps[intersects[i].object.id] = true;

        // intersects[i].isActive = true;
        // intersects[i].object.material.color.set("red");
}
    
    }
}

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
    // Очищаем поля активных кубиков
    for (var prop in globalScene.breadCrumps) { if (globalScene.breadCrumps.hasOwnProperty(prop)) { delete globalScene.breadCrumps[prop]; } }

    },5000);
canvasSketch(sketch, settings);
