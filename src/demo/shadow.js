/**
 * shadow 阴影
 */

 import * as THREE from 'three'
 import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
 
 export const h = () => {
   // 场景
   const scene = new THREE.Scene()
 
   // 相机
   const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000)
   camera.position.set(0, 0, 10)
   scene.add(camera)
  
   // 物体
   const spheregeometry = new THREE.SphereGeometry(1, 20, 20)
   const planeGeometry = new THREE.PlaneGeometry(10, 10)
   const material = new THREE.MeshStandardMaterial()
   const sphere = new THREE.Mesh(spheregeometry, material)
  //  开启物体投射阴影
  sphere.castShadow = true
   const plane = new THREE.Mesh(planeGeometry, material)
   plane.position.set(0, -1, 0)
   plane.rotation.x = -Math.PI / 2;
  //  开启物体接收阴影
  plane.receiveShadow = true
   scene.add(sphere)
   scene.add(plane)
 
   // 渲染器
   const renderer = new THREE.WebGLRenderer()
   renderer.setSize(window.innerWidth, window.innerHeight)
  //  开启渲染器阴影贴图
  renderer.shadowMap.enabled = true
   document.body.appendChild(renderer.domElement)
 
   // 轨道控制器
   const controls = new OrbitControls(camera, renderer.domElement)
   controls.enableDamping = true
 
   // 坐标
   const axesHelper = new THREE.AxesHelper(5)
   scene.add(axesHelper)
 
   // 环境光
   const envLight = new THREE.AmbientLight(0xffffff, 0.5)
   scene.add(envLight)
 
   // 平行光
   const directLight = new THREE.DirectionalLight(0xffffff, 1)
   directLight.position.set(10, 10, 10)
  //  设置光线投射阴影
  directLight.castShadow = true
   scene.add(directLight)
 
   function render() {
     controls.update()
     renderer.render(scene, camera)
     requestAnimationFrame(render)
   }
 
   render()
 }