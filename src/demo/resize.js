/**
 * 自适应窗口大小
 */

 import * as THREE from 'three'
 import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
 import gsap from 'gsap'
 
 export const h = () => {
  // 创建场景
  const scene = new THREE.Scene()

  // 创建相机
  const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 20, 100)
  // 设置相机位置
  camera.position.set(50, 0, 0)

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
  // 设置控制器阻尼(增加惯性元素)
  controls.enableDamping = true

  // 创建坐标轴
  const axesHelper = new THREE.AxesHelper( 5 )
  scene.add(axesHelper)

  // 设置动画
  const animation = gsap.to(cube.position, {y: 5, duration: 5, repeat: -1, yoyo: true, delay: 2})
  gsap.to(cube.rotation, {z: 2 * Math.PI, duration: 5, ease: "power2.out", onComplete: () => {
    console.log('animation ok')
  }})

  window.addEventListener('click', () => {
    console.log(animation.isActive())
    if(animation.isActive()) {
      // 暂停动画
      animation.pause() 
    } else {
      // 恢复动画
      animation.resume()
    }
  })

  // 关联场景和相机，渲染
  function render() {
    controls.update()
    renderer.render(scene, camera)
    requestAnimationFrame(render) // 渲染优化
  }

  render()

  // 自适应设置
  window.addEventListener('resize', () => {
    // 更新相机
    camera.aspect = window.innerWidth / window.innerHeight
    // 更新相机的投影矩阵
    camera.updateProjectionMatrix()
    // 更新渲染器
    renderer.setSize(window.innerWidth, window.innerHeight)
    // 更新渲染器像素比
    renderer.setPixelRatio(window.devicePixelRatio)
  })

  // 全屏和退出全屏
  window.addEventListener('dblclick', () => {
    if(document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      renderer.domElement.requestFullscreen();
    } 
  })
 }
 
 