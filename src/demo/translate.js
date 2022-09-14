/**
 * 使用坐标辅助器
 * 鼠标移动可以看到红、绿、蓝三轴
 */

 import * as THREE from 'three'
 import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
 
 export const h = () => {
  // 创建场景
  const scene = new THREE.Scene()

  // 创建相机
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
  // 设置相机位置
  camera.position.set(0, 0, 10)

  // 添加物体
  const geometry = new THREE.BoxGeometry(1, 1, 1) // 几何体
  const material = new THREE.MeshBasicMaterial( {color: 0xffff00} ) // 材质
  const cube = new THREE.Mesh( geometry, material ) // 生成物体

  // 相机和物体添加至场景中
  scene.add(camera)
  scene.add(cube)

  // 初始化渲染器
  const renderer = new THREE.WebGLRenderer()
  // 设置渲染尺寸大小
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 挂载canvas
  document.body.appendChild(renderer.domElement)

  // 创建轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement)

  // 坐标轴辅助器
  const axesHelper = new THREE.AxesHelper( 5 )
  scene.add(axesHelper)

  // 移动物体位置
  // 方式一
  // cube.position.set(3, 0, 0)
  // 方式二
  // cube.position.x = 3

  // 关联场景和相机，渲染
  function render() {
    // 动态修改位置
    cube.position.x += 0.01
    if(cube.position.x > 5) {
      cube.position.x = 0
    }
    renderer.render(scene, camera)
    requestAnimationFrame(render) // 渲染优化
  }

  render()
 }
 
 