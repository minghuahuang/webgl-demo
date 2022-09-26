/**
 * cubeTextLoader使用
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

  // cube纹理加载器
  const envMap = new THREE.CubeTextureLoader().setPath('textures/environmentMaps/1/').load([
    'px.jpg',
    'nx.jpg',
    'py.jpg',
    'ny.jpg',
    'pz.jpg',
    'nz.jpg',
  ])
  scene.background = envMap
  scene.environment = envMap // 等效于设置 material envMap

  // 物体
  const geometry = new THREE.SphereGeometry(1, 20, 20)

  const material = new THREE.MeshStandardMaterial({
    metalness: 0.7,
    roughness: 0.1,
    // envMap: envMap, 
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