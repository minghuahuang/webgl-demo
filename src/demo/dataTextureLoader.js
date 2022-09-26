/**
 * dataTexureLoader 使用
 * RGBELoader 为 dataTexureLoader 的子类
 */

 import * as THREE from 'three'
 import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
 import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
 
 export const h = () => {
   // 场景
   const scene = new THREE.Scene()

  //  加载HDR环境图
  const regbLoader = new RGBELoader().loadAsync('textures/hdr/002.hdr').then(
    texture => {
      texture.mapping = THREE.EquirectangularReflectionMapping
      scene.background = texture
      scene.environment = texture
    }
  )
 
   // 相机
   const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000)
   camera.position.set(0, 0, 10)
   scene.add(camera)
  
   // 物体
   const geometry = new THREE.SphereGeometry(1, 20, 20)
 
   const material = new THREE.MeshStandardMaterial({
     metalness: 0.7,
     roughness: 0.1,
   })
   const cube = new THREE.Mesh(geometry, material)
   scene.add(cube)
 
   // 渲染器
   const renderer = new THREE.WebGLRenderer()
   renderer.setSize(window.innerWidth, window.innerHeight)
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
   scene.add(directLight)
 
   function render() {
     controls.update()
     renderer.render(scene, camera)
     requestAnimationFrame(render)
   }
 
   render()
 }