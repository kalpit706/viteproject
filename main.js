import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';



const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );



const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);




//geometry
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial( { color: 0xff0040 } );
const torus = new THREE.Mesh( geometry, material);

scene.add(torus)

//new geomeryt
// const geometry2 = new THREE.TorusKnotGeometry(12, 0, 10, 100)
// const material2 = new THREE.MeshStandardMaterial( { color: 0xff3333, } );
// const torus2 = new THREE.Mesh( geometry, material);

// scene.add(torus2)





// lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(10,10,10)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add (pointLight, ambientLight)


//helper
// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);



//adding stars
function addStars() {
  const geometry = new THREE.SphereGeometry(0.15, 20, 20);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff})
  const star = new THREE.Mesh( geometry, material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100) );

  star.position.set(x,y,z);
  scene.add(star)
}

Array(200).fill().forEach(addStars)


//background
const spaceTexture = new THREE.TextureLoader().load('space3.jpg');
scene.background = spaceTexture;





// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  // moon.rotation.x += 0.05;
  // moon.rotation.y += 0.075;
  // moon.rotation.z += 0.05;

  // jeff.rotation.y += 0.01;
  // jeff.rotation.z += 0.01;

  camera.position.z = t * 0.02;
  camera.position.x = t * 0.04;
  camera.rotation.y = t * 0.0007;
}

document.body.onscroll = moveCamera;
moveCamera();







//new code
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

// const scene = new THREE.Scene();

// const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );

// const controls = new OrbitControls( camera, renderer.domElement );

//controls.update() must be called after any manual changes to the camera's transform
// camera.position.set( 0, 20, 100 );
// controls.update();











// a function for infinite loop 
function animate() {
  requestAnimationFrame( animate);

  torus.rotation.x += 0.02;
  torus.rotation.y += 0.004;
  torus.rotation.z += 0.03;

  controls.update();

  renderer.render( scene, camera);
  
  
}

animate()
