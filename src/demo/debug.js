/**
 * gui 使用
 */

 import * as THREE from 'three'
 import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
 import * as dat from 'dat.gui'
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
  controls.enableDamping = true

  // 添加坐标轴
  const axesHelper = new THREE.AxesHelper( 5 )
  scene.add(axesHelper)

  // 使用gui调试3d应用
  const gui = new dat.GUI()
  // 配置数值属性
  gui.add(cube.position, 'x').min(0).max(10).step(0.1).name('translateX').onChange(val => {
    console.log(val)
  }).onFinishChange(val => {
    console.log('debounce',val)
  })
  // 配置颜色属性
  const params = {
    color: '#ffff00',
    translate: () => {
      console.log(11)
      gsap.to(cube.position, { x: 5, duration: 2, yoyo: true, repeat: -1 })
    }
  }
  gui.addColor(params, 'color').onChange(val => {
    cube.material.color.set(val)
  })
  // 配置触发事件
  gui.add(params, 'translate').name('运动')
  // 多个item配置收起展开
  const folder = gui.addFolder('属性')
  // 配置是否使用线架构
  folder.add(cube.material, 'wireframe')
  // 配置显隐属性
  folder.add(cube, 'visible').name('visible')

  // 关联场景和相机，渲染
  function render() {
    controls.update()
    renderer.render(scene, camera)
    requestAnimationFrame(render) // 渲染优化
  }

  render()
 }
 
 