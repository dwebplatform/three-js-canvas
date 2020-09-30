import * as THREE from "three";
import './styles.css'


function greatCircleFunction(P, Q)
{
	var angle = P.angleTo(Q);
	return function(t)
	{
	    var X = new THREE.Vector3().addVectors(
			P.clone().multiplyScalar(Math.sin( (1 - t) * angle )), 
			Q.clone().multiplyScalar(Math.sin(      t  * angle )))
			.divideScalar( Math.sin(angle) );
	    return X;
	};
}

function createSphereArc(P,Q)
{
	var sphereArc = new THREE.Curve();
    sphereArc.getPoint = greatCircleFunction(P,Q);
    // console.log(sphereArc.getPoint);
	return sphereArc;
}

function drawCurve(curve, color,sphereArcs=[])
{
	var lineGeometry = new THREE.Geometry();
	lineGeometry.vertices = curve.getPoints(100);
    // lineGeometry.computeLineDistances();
    sphereArcs.push(lineGeometry.vertices);
 	var lineMaterial = new THREE.LineBasicMaterial();
	lineMaterial.color = (typeof(color) === "undefined") ? new THREE.Color(0xFF0000) : new THREE.Color(color);
    var line = new THREE.Line( lineGeometry, lineMaterial );
     // sphereGroup.add(line);
	 return line;
}


let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
  30,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector("#app").appendChild(renderer.domElement);
var group = new THREE.Group();

 

// add cube
let geometry = new THREE.SphereGeometry( 1, 32, 32 );
let material = new THREE.MeshNormalMaterial();
 // scene.add(cube);
let SPHERE_RADIUS = 30;
//Radius r = 100
// x = r sin th cos fi
// y = r sin th sin fi
// z = r cos th
const points = [];
const sphereGroup = new THREE.Group();
// for(let i = 0; i <100;i++){
//     let sphere = new THREE.Mesh(geometry, material);
//     let thetta = Math.PI* Math.random();
//     let fi = 2* Math.PI*Math.random();
//     let [x,y,z] = [SPHERE_RADIUS* Math.sin(thetta)* Math.cos(fi),SPHERE_RADIUS* Math.sin(thetta)* Math.sin(fi),SPHERE_RADIUS* Math.cos(thetta)];

//     sphere.position.x = x;
//     sphere.position.y = y;
//     sphere.position.z = z;

//     points.push({
//         x,
//         y,
//         z
//     });
//     sphereGroup.add(sphere);
    
// }
let line_material = new THREE.LineBasicMaterial({
	color: 0x0000ff
});
for(let i=0;i <points.length;i+=2){
    let start = new THREE.Vector3(points[i].x,points[i].y, points[i].z);
    let end   = new THREE.Vector3(points[i+1].x,points[i+1].y, points[i+1].z)
    // let line_geom = new THREE.BufferGeometry().setFromPoints([start,end]);
    // let line = new THREE.Line(line_geom,line_material)
    // scene.add(line);
    let MysphereArc =  createSphereArc(start,end)
    let line =  drawCurve(MysphereArc, 0x00FFFF);
    
     
}
scene.add(sphereGroup);

 
camera.position.z = 100;

let light = new THREE.PointLight(0xffffff);
light.position.set(10, 0, 25);
scene.add(light);


class MyContainer {
    sphereGroup = new THREE.Group();
    geometry = new THREE.SphereGeometry(1,32,32);
    material = new THREE.MeshNormalMaterial();
    sphereArcs =[];
    update(){
        this.sphereGroup.rotation.x+=Math.PI/360;
        this.sphereGroup.rotation.y+=Math.PI/360;
        
    }
    createSphere(){
        for(let i = 0; i <100;i++){
            let sphere = new THREE.Mesh(this.geometry, this.material);
            let thetta = Math.PI* Math.random();
            let fi = 2* Math.PI*Math.random();
            let [x,y,z] = [SPHERE_RADIUS* Math.sin(thetta)* Math.cos(fi),SPHERE_RADIUS* Math.sin(thetta)* Math.sin(fi),SPHERE_RADIUS* Math.cos(thetta)];
        
            sphere.position.x = x;
            sphere.position.y = y;
            sphere.position.z = z;
            points.push({
                x,
                y,
                z
            });
            this.sphereGroup.add(sphere);
            
        }
        
        this.createCurves();
        scene.add(this.sphereGroup);

    }
    createCurves(){
let line_material = new THREE.LineBasicMaterial({
	color: 0x0000ff
});
for(let i=0;i <points.length;i+=2){
    let start = new THREE.Vector3(points[i].x,points[i].y, points[i].z);
    let end   = new THREE.Vector3(points[i+1].x,points[i+1].y, points[i+1].z) 
    let MysphereArc =  createSphereArc(start,end);
    this.sphereArcs.push(MysphereArc);
    let line =  drawCurve(MysphereArc, 0x00FFFF,this.sphereArcs);
    this.sphereGroup.add(line)
}
console.log(this.sphereArcs[0].getPoint(100))
}
}
let newContainer = new MyContainer();
newContainer.createSphere();
let render = function() {
  requestAnimationFrame(render);
   newContainer.update();
  renderer.render(scene, camera);
};

render();
