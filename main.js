import * as THREE from 'three';
import "./style.css";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from "gsap"

const scene = new THREE.Scene();

//Sphere
const geometry = new THREE.SphereGeometry( 3, 64, 64 );
const material = new THREE.MeshStandardMaterial({ 
  color: "#00ff83",
  roughness: 0.6
});
const mesh = new THREE.Mesh( geometry, material );
scene.add(mesh)

//sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

//Light
const light = new THREE.PointLight(0xffffff, 1, 100)
light.position.set(10 ,10, 5)
light.intensity = 1.5
scene.add(light)

//camera
const camera = new THREE.PerspectiveCamera( 45, sizes.width / sizes.height, 0.1, 100 )
camera.position.z = 20
scene.add(camera)

//render
const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setPixelRatio(2)
renderer.setSize( sizes.width , sizes.height )
renderer.render( scene, camera )

//controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom= false
controls.autoRotate = true
controls.autoRotateSpeed = 10
5
//resize
window.addEventListener("resize", () => {
  //update sizes
  sizes.width = window.innerWidth
  sizes.innerHeight = window.innerHeight

  //update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})

//update
const loop = () => {
  renderer.render(scene, camera)
  controls.update();
  window.requestAnimationFrame(loop)
}

loop()

//timeline magic 
const t1 = gsap.timeline( { defaults: { duration: 3} } )
t1.fromTo(mesh.scale, {z:3, x:3, y:3}, {z:1, x:1, y:1})
t1.fromTo('nav', { y:"-100%" }, { y:"0%" })
t1.fromTo('.title', { opacity: 0 }, { opacity: 1 })

//mouse animation color
let mouseDown = false;
let rgb = [];
window.addEventListener('mousedown', () => mouseDown = true)
window.addEventListener('mouseup', () => mouseDown = false)

window.addEventListener('mousemove', (e) => {
  if(mouseDown){
    rgb = [
      Math.round((e.pageX / sizes.width) * 255),
      Math.round((e.pageY / sizes.height) * 255),
      150,
    ]
    // let's animate
    let newColor = new THREE.Color(`rgb( ${rgb.join(",")} )`)
    gsap.to(mesh.material.color, {
      r: newColor.r, 
      g: newColor.g, 
      b:newColor.b
    })
  }
})