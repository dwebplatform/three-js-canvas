
const cubes = [];
var scene = new THREE.Scene();
scene.background = new THREE.Color( "green");
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );




 
let AudioCtx ;
 
 
const d = new Uint8Array(16);
window.onclick = function(){
    if(AudioCtx) return ;
    AudioCtx = new AudioContext();
    analyser = AudioCtx.createAnalyser();
    analyser.fftSize = 64;
    navigator.mediaDevices.getUserMedia({ audio: true }).then(s => {
        AudioCtx.createMediaStreamSource(s).connect(analyser);
    
    animateSound();
    });
    
}

function animateSound() {
setTimeout(animateSound, 1000/60);
analyser.getByteFrequencyData(d);
const data = Array.from(d);
    if(cubes.length){
        
        for(let i=0;i<cubes.length;i++){
            if( Math.random()<0.15)
    {  cubes[i].position.y=  Math.floor( (data[i]/255)*8) ;
            cubes[i].rotation.y +=(2*Math.PI/255)*data[i]*8;
            console.log(data[i]);
        cubes[i].material.color.setRGB( Math.sin(data[i]/255* Math.PI*2),Math.cos(data[i]/255* Math.PI*2),0);
    }
        }
    }

}



var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color:Math.random()*0xFFFFFF
} );
 

 
let initialX = 0;
let initialZ = 0;
const group = new THREE.Group();
for(let i=0;i<16;i++){
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        new THREE.MeshBasicMaterial( { color:"rgb(255,0,0)"
        } )
    );
    if(initialZ<5){
        initialZ++;
    }
    else {
        initialX++;
        initialZ =1;
    }
    mesh.position.set(i, 0,0);
 
    cubes.push(mesh);
    group.add(mesh);
    scene.add(group);

}

group.rotation.y = Math.PI/2;
camera.position.x = 15;
camera.position.z = 10;

 camera.lookAt(new THREE.Vector3());

var animate = function () {
	requestAnimationFrame( animate );
 


	renderer.render(scene, camera);
};

animate();