/**
 * 材质和纹理
 */

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const h = () => {
	// 创建场景
	const scene = new THREE.Scene();

	// 创建相机
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	// 设置相机位置
	camera.position.set(0, 0, 20);

	// 添加物体
	const geometry = new THREE.BoxGeometry(1, 1, 1); // 几何体
	// 生成纹理对象
	const texture = new THREE.TextureLoader().load("./textures/door/color.jpg");
	// 16 * 16
	// const texture = new THREE.TextureLoader().load('./textures/minecraft.png')
	// 设置纹理缩放滤镜(minecraft)
	// texture.minFilter = THREE.NearestFilter
	// texture.magFilter = THREE.NearestFilter
	// texture.minFilter = THREE.LinearFilter
	// texture.magFilter = THREE.LinearFilter
	console.log(texture);
	// 设置纹理偏移(door)
	// texture.offset.x = 0.5
	// texture.offset.y = 0.4
	// texture.offset.set(0.5, 0.4)
	// 设置旋转中心点(door)
	// texture.center.set(0.5, 0.5)
	// 设置纹理旋转(door)
	// texture.rotation = Math.PI / 4
	// 设置纹理重复数(door)
	// texture.repeat.set(3, 3)
	// 设置纹理重复方式(door)
	// texture.wrapS = THREE.RepeatWrapping // x
	// texture.wrapT = THREE.RepeatWrapping // y
	// 设置透明纹理贴图
	const alphaTexture = new THREE.TextureLoader().load(
		"./textures/door/alpha.jpg"
	);
  // 设置环境纹理贴图
  const envTexture = new THREE.TextureLoader().load('./textures/door/ambientOcclusion.jpg')
  // 材质
	const material = new THREE.MeshBasicMaterial({
		color: 0xffff00,
		map: texture,
		alphaMap: alphaTexture,
		transparent: true,
    aoMap: envTexture,
    aoMapIntensity: 0.5
    // opacity: 0.5,
    // side: THREE.DoubleSide

	}); 
  material.side = THREE.DoubleSide

	const cube = new THREE.Mesh(geometry, material); // 生成物体
  // cube增加uv，设置环境贴图
  geometry.setAttribute('uv2', new THREE.BufferAttribute(geometry.attributes.uv.array, 2))

  // 添加平面
  const planegeometry = new THREE.PlaneGeometry(1, 1)
  const plane = new THREE.Mesh(
    planegeometry,
    material
  )
  // 设置aoMap，环境遮挡贴图需要设置第二组uv，自带一组uv
  planegeometry.setAttribute('uv2', new THREE.BufferAttribute(planegeometry.attributes.uv.array, 2))
  plane.position.set(3, 0, 0)
  scene.add(plane)

	// 相机和物体添加至场景中
	scene.add(camera);
	scene.add(cube);

	// 初始化渲染器
	const renderer = new THREE.WebGLRenderer();
	// 设置渲染尺寸大小
	renderer.setSize(window.innerWidth, window.innerHeight);
	// 挂载canvas
	document.body.appendChild(renderer.domElement);

	// 轨道控制器
	const constrols = new OrbitControls(camera, renderer.domElement);
	constrols.enableDamping = true;

	// 坐标轴
	const axisHelper = new THREE.AxesHelper(5);
	scene.add(axisHelper);

	// 关联场景和相机，渲染
	function render() {
		constrols.update();
		renderer.render(scene, camera);
		requestAnimationFrame(render); // 渲染优化
	}

	render();
};
