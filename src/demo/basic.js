// 最基本的threejs程序
/**
 * 最基本的three.js程序
 * 必要元素：场景、相机、物体、渲染器
 */

import * as THREE from 'three'

// 渲染函数
export const h = () => {
  // 创建场景
  const scene = new THREE.Scene()

  // 创建相机
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
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
  // 挂载渲染器canvas
  document.body.appendChild(renderer.domElement)

  // 关联场景和相机，渲染
  renderer.render(scene, camera)
}
