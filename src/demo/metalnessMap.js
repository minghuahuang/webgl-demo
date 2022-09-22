/**
 * metalnessMap 使用
 */

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export const h = () => {
  // 场景
  const scene = new THREE.Scene()

  // 相机
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0, 0, 10)

  scene.add(camera)

  // 物体
  const geometry = new THREE.BoxGeometry(1, 1, 1, 100, 100, 100)
  // 环境贴图配置第二组uv
  geometry.setAttribute('uv2', new THREE.BufferAttribute(geometry.attributes.uv.array, 2))

  // 基础贴图
  const texture = new THREE.TextureLoader().load('./textures/door/color.jpg')
  // 环境贴图
  const envTexture = new THREE.TextureLoader().load('./texture/door/ambientOcclusion.jpg')
  // 位移贴图
	const displaceTexture = new THREE.TextureLoader().load("./textures/door/height.jpg")
  // 粗糙度贴图
  const roughTexture = new THREE.TextureLoader().load('./textures/door/roughness.jpg')
  // 金属度贴图
  const metalTexture = new THREE.TextureLoader().load('./textures/door/metalness.jpg')
  
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    aoMap: envTexture,
    aoMapIntensity: 0.5,
    displacementMap: displaceTexture,
    displacementScale: 0.1,
    roughnessMap: roughTexture,
    roughness: 1,  // 0-镜面反射，1-漫反射
    metalnessMap: metalTexture,
    metalness: 1
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

  // 坐标轴
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