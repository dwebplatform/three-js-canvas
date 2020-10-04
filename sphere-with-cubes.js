import * as THREE from 'three';
import distance  from 'euclidean-distance';

import './css/main.css';
import CircleService, { createSphereArc,lerp } from './util/circle_helpers.js';






const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  30,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector("#app").appendChild(renderer.domElement);


const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

// add sphere
let geometry = new THREE.SphereGeometry(1, 32, 32);
let material = new THREE.MeshNormalMaterial();
let SPHERE_RADIUS = 30;

class MainSphere {
  constructor(geometry, material, radius){
    this.geometry =geometry;
    this.material = material;
    this.radius = radius;
    this.NUMBER_OF_POINTS = 36;
    this.rootElement = new THREE.Group();
  }
  createSphereOnSerfice(){
    for (let i = 0; i < 36; i++) {
      let sphere = new THREE.Mesh(this.geometry, this.material);
      let thetta = Math.PI * Math.random();
      let fi = 2 * Math.PI * Math.random();
      let [x, y, z] = [SPHERE_RADIUS * Math.sin(thetta) * Math.cos(fi), SPHERE_RADIUS * Math.sin(thetta) * Math.sin(fi), SPHERE_RADIUS * Math.cos(thetta)];
      sphere.position.x = x;
      sphere.position.y = y;
      sphere.position.z = z;
      //глобальный массив точек на поверхности
      points.push({x,y,z});
      this.rootElement.add(sphere);
    }
  }
  createCurveLines(){  
  for (let i = 0; i < points.length; i += 2) {
    let start = new THREE.Vector3(points[i].x, points[i].y, points[i].z);
    let end = new THREE.Vector3(points[i + 1].x, points[i + 1].y, points[i + 1].z);

    let line = CircleService.createCurve(createSphereArc(start, end), 0x00FFFF);
    let path = line.geometry.vertices;
    // глобальный массив путей
    linesPaths.push(path);
    // let cube = new THREE.Box 0x00ff11
   
    let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    
    movingCubes.push(cube);
    cube.position.x =0;
    this.rootElement.add(cube);
    this.rootElement.add(line);
}
 
  }
  getRootComponent(){
    return this.rootElement;
  }
}
//Radius r = 100
// x = r sin th cos fi
// y = r sin th sin fi
// z = r cos th
// создаем массив точек 
const points = [];
const linesPaths = [];
const movingCubes = [];
// контейнер для сферы
const sphereGroup = new THREE.Group();

 

 
let mainSphere = new MainSphere(geometry, material,50 );
// создаем  точки на сфере
mainSphere.createSphereOnSerfice();
// соединяем пары линиями
mainSphere.createCurveLines();
// добавляем на сцену корневой элемент
scene.add(mainSphere.getRootComponent());

let curPeriod = 10;
let time = 0;
camera.position.z = 100;
let light = new THREE.PointLight(0xffffff);
light.position.set(10, 0, 25);
scene.add(light);
let first_time = false;
// тут будет происходить анимация

function updateCubesPosition(){
  for(let i=0;i<linesPaths.length;i++){
    const points = linesPaths[i];
    if(curPeriod>points.length){
      curPeriod = 1;
    }
     const pstart = points[curPeriod-1];
     const pend = points[curPeriod];
      if(!pend||!pstart){
        curPeriod =1;
      }
     let maxDistance =pstart.distanceTo(pend);
   
     let [x, y,z] = lerp(pstart, pend, time);
   
     let curDistance = new THREE.Vector3(x,y,z).distanceTo(pend)
       
     if(!first_time){
       first_time = true;
       movingCubes[i].position.set(x,y,z);
      }
      movingCubes[i].position.set(x,y,z);
      time+=0.05;
      if(maxDistance<curDistance || curDistance<= 0.001*maxDistance){
        time = 0;
        curPeriod++;
      }
  }
   
}
let render = function () {
  requestAnimationFrame(render);
   mainSphere.getRootComponent().rotation.x += 0.005; 
  updateCubesPosition();
  
   renderer.render(scene, camera);
};

render();
