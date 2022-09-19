/**
 * BoxGeometry->BufferGeometry
 */

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const h = () => {
	// 创建场景
	const scene = new THREE.Scene();

	// 创建相机
	const camera = new THREE.PerspectiveCamera(
		40,
		window.innerWidth / window.innerHeight,
		20,
		100
	);
	// 设置相机位置
	camera.position.set(50, 0, 0);

	// 添加物体
	//const geometry = new THREE.BoxGeometry(1, 1, 1); // 几何体
	const geometry = new THREE.BufferGeometry();
	const vertices = new Float32Array([
		-1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0,
		1.0, 1.0, -1.0, -1.0, 1.0,
	]);
	geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
	const material = new THREE.MeshBasicMaterial({ color: 0xffff00 }); // 材质
	const cube = new THREE.Mesh(geometry, material); // 生成物体

	// 相机和物体添加至场景中
	scene.add(camera);
	scene.add(cube);

	// 初始化渲染器
	const renderer = new THREE.WebGLRenderer();
	// 设置渲染尺寸大小
	renderer.setSize(window.innerWidth, window.innerHeight);
	// 挂载canvas
	document.body.appendChild(renderer.domElement);

	// 创建轨道控制器
	const controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;

	// 添加坐标轴
	const axesHelper = new THREE.AxesHelper(5);
	scene.add(axesHelper);

	// 立体缓冲几何体 boxGeometry
	console.log("cube", cube);
	console.log("geometry", geometry);

	// 关联场景和相机，渲染
	function render() {
		controls.update();
		renderer.render(scene, camera);
		requestAnimationFrame(render); // 渲染优化
	}

	render();
};
