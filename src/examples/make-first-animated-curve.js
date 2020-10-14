import * as THREE from 'three';
var testPoint,camera, scene, renderer,curveLine, geometry, material, mesh,curve, curveGeometry,curveMaterial, curves = [];

/*
 Нужно где-то хранить инфу о линии, и ее геометрии, которую надо будет обновлять

*/
const MyCurves=[];
class LineGenerator{
    constructor(lineMesh,lineGeometry){
        this.lineMesh = lineMesh;
        this.lineGeometry = lineGeometry;
    }
    update(){

    }
}
// const curve
init();
animate();
/**
    Create the scene, camera, renderer
*/
function init() {
     scene = new THREE.Scene();
     camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
     camera.position.z = 500;
     scene.add(camera);
    //  addCurve();
    createCurve();
     renderer = new THREE.WebGLRenderer();
     renderer.setSize(window.innerWidth, window.innerHeight);
     document.body.appendChild(renderer.domElement);
}


function createCurve(){// надо где-то хранить
    let myCurve = new THREE.CubicBezierCurve3(
    new THREE.Vector3( -10, 0, 0 ),
	new THREE.Vector3( -5, 15, 0 ),
	new THREE.Vector3( 20, 15, 0 ),
	new THREE.Vector3( 10, 0, 0 )
    );
    let points = myCurve.getPoints(50);// берем точки от кривой
    let geometry = new THREE.BufferGeometry().setFromPoints( points );// геометрию надо хранить, чтобы ее переприсваивать кривой
    let material = new THREE.LineBasicMaterial( { color : 0xff0000 } );
    let curveObject = new THREE.Line( geometry, material ); // настоящая линия, ее можно добавить на сцену
    let finalObj =  {
        lineObj:  curveObject,
        linecurve:myCurve//тут кривая которую будем обновлять )
    }
    MyCurves.push(finalObj);
    scene.add(curveObject);
}
/**
    Add the initial bezier curve to the scene
*/
function addCurve() {
     testPoint = 0;
     curve = new THREE.CubicBezierCurve3(
       new THREE.Vector3( testPoint, 0, 0 ),
       new THREE.Vector3( -5, 150, 0 ),
       new THREE.Vector3( 20, 150, 0 ),
       new THREE.Vector3( 10, 0, 0 )
     );
     curveGeometry = new THREE.Geometry();
     curveGeometry.vertices = curve.getPoints( 50 );
     curveMaterial = new THREE.LineBasicMaterial( { color : 0xff0000 } );
     curveLine = new THREE.Line( curveGeometry, curveMaterial );
     scene.add(curveLine);
     
     // EDITED
      curves.push(curveLine); // Add curve to curves array
      curveLine.curve = curve; // Link curve object to this curveLine
}

/**
    On each frame render, remove the old line, create new curve, geometry and add the new line
*/
let t = 0;
function updateCurve() {
    t+=0.5;
    // testPoint +=0.01;
    MyCurves.forEach(({lineObj,linecurve})=>{
        console.log(linecurve);
        linecurve.v0.y += 0.01;
        let points = linecurve.getPoints(50);// берем точки от кривой
         lineObj.geometry = new THREE.BufferGeometry().setFromPoints( points );
        lineObj.geometry.verticesNeedUpdate = true;
    })
    // let curveLine = curves[0];
    // //берем ссылку геометрии изначальной меняем ее значение
    // curveLine.curve.v0.y = 100*Math.sin(testPoint);
    // curveLine.curve.v1.y = -100*Math.cos(testPoint);
    // curveLine.curve.v2.y = 100*Math.sin(testPoint);
    // curveLine.curve.v3.y = -100*Math.cos(testPoint);
    // console.log(curveLine.curve);

    // curveLine.geometry.vertices = curveLine.curve.getPoints( 50 ); //меняем текущую геометрию вершин для объекта линии
    // curveLine.geometry.verticesNeedUpdate = true;// действительно обновляем ее ГОВОРИМ THREE js чтобы он перерисовывал под новую геометрию
      
}

function animate() {
     requestAnimationFrame(animate);
     render();
}

function render() {
     updateCurve();
     renderer.render(scene, camera);
}
