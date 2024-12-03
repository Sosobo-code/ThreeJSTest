import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
   canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(20);

renderer.render(scene, camera);

/* Materials */
const earthtexture = new THREE.TextureLoader().load('../earth.jpg');

/* Create Geometry */

const geometry = new THREE.SphereGeometry(10, 24, 24);
const material = new THREE.MeshStandardMaterial({ map: earthtexture});
const earth = new THREE.Mesh(geometry, material);

scene.add(earth);

const pointLight = new THREE.PointLight(0xffffff, 600);
pointLight.position.set(20, 20, 20);

/* const ambientLight = new THREE.AmbientLight(0xffffff, 1); */

/* const lightHelper = new THREE.PointLightHelper(pointLight); */
/* const gridHelper = new THREE.GridHelper(200, 50); */

scene.add(pointLight);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
   const geometry = new THREE.SphereGeometry(0.02, 6, 6);
   const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
   const star = new THREE.Mesh(geometry, material);

   const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

   star.position.set(x, y, z);
   scene.add(star);
}

Array(1000).fill().forEach(addStar);

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
       map: new THREE.TextureLoader().load('../moon.jpg',),
    })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

/* const spaceTexture = new THREE.TextureLoader().load('../space.png');
scene.background = spaceTexture; */

function moveCamera() {
   const t = document.body.getBoundingClientRect().top;


   camera.position.z = t * -0.01;
   camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;

}

document.body.onscroll = moveCamera;

function animate() {
   requestAnimationFrame(animate);

   earth.rotation.y += 0.001;
   moon.rotation.y += 0.005;


   controls.update();
   renderer.render(scene, camera);
}

animate();


