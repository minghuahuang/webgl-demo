/**
 * shadow-attr 阴影的属性
 */

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

export const h = () => {
	// 场景
	const scene = new THREE.Scene();

	// 相机
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.01,
		1000
	);
	camera.position.set(0, 0, 10);
	scene.add(camera);

	// 物体
	const spheregeometry = new THREE.SphereGeometry(1, 20, 20);
	const planeGeometry = new THREE.PlaneGeometry(100, 100);
	const material = new THREE.MeshStandardMaterial();
	const sphere = new THREE.Mesh(spheregeometry, material);
	//  开启物体投射阴影
	sphere.castShadow = true;
	const plane = new THREE.Mesh(planeGeometry, material);
	plane.position.set(0, -1, 0);
	plane.rotation.x = -Math.PI / 2;
	//  开启物体接收阴影
	plane.receiveShadow = true;
	scene.add(sphere);
	scene.add(plane);

	// 渲染器
	const renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	//  开启渲染器阴影贴图
	renderer.shadowMap.enabled = true;
	document.body.appendChild(renderer.domElement);

	// 轨道控制器
	const controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;

	// 坐标
	const axesHelper = new THREE.AxesHelper(5);
	scene.add(axesHelper);

	// 环境光
	const envLight = new THREE.AmbientLight(0xffffff, 0.5);
	scene.add(envLight);

	// 光载体
	const smallball = new THREE.Mesh(
		new THREE.SphereGeometry(0.1, 20, 20),
		new THREE.MeshBasicMaterial({ color: 0xff0000 })
	);
	smallball.position.set(2, 2, 2);

	// 点光源
	const pointLight = new THREE.PointLight(0xffffff, 0.5);
	pointLight.position.set(5, 5, 5);

	smallball.add(pointLight);
	scene.add(smallball);

	//  设置光线投射阴影
	pointLight.castShadow = true;
	// 设置阴影的模糊度
	pointLight.shadow.radius = 20;
	// 设置阴影的分辨率
	pointLight.shadow.mapSize.set(4096, 4096);
	// 设置点光源距离
	pointLight.distance = 0;
	// 设置点光源光照距离衰减
	pointLight.decay = 0;

	// GUI
	const gui = new dat.GUI();
	// 监测点光源效果
	gui.add(sphere.position, "x").min(-5).max(5).step(0.1);
	// 监测点光源距离影响
	gui.add(pointLight, "distance").min(0).max(20).step(0.1);
	// 监测点光源光照距离衰减效果
	gui.add(pointLight, "decay").min(0).max(5).step(0.01);

	// 设置时钟
	const clock = new THREE.Clock();

	function render() {
		let time = clock.getElapsedTime();
		smallball.position.x = Math.sin(time) * 3;
		smallball.position.z = Math.cos(time) * 3;
		smallball.position.y = 2 + Math.sin(time * 2);
		controls.update();
		renderer.render(scene, camera);
		requestAnimationFrame(render);
	}

	render();
};
