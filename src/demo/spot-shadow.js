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
	// 设置物理上正确光照模式
	renderer.physicallyCorrectLights = true;
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

	// 聚光灯
	const spotLight = new THREE.SpotLight(0xffffff, 1);
	spotLight.position.set(5, 5, 5);
	scene.add(spotLight);

	//  设置光线投射阴影
	spotLight.castShadow = true;
	// 设置阴影的模糊度
	spotLight.shadow.radius = 20;
	// 设置阴影的分辨率
	spotLight.shadow.mapSize.set(4096, 4096);
	// 设置投射阴影目标
	spotLight.target = sphere;
	// 设置聚光灯角度
	spotLight.angle = Math.PI / 6;
	// 设置聚光灯距离
	spotLight.distance = 0;
	// 设置聚光灯半影衰减
	spotLight.penumbra = 0;
	// 设置聚光灯光照距离衰减
	spotLight.decay = 0;

	// GUI
	const gui = new dat.GUI();
	// 监测聚光灯效果
	gui.add(sphere.position, "x").min(-5).max(5).step(0.1);
	// 监测聚光灯角度影响
	gui.add(spotLight, "angle")
		.min(0)
		.max(Math.PI / 2)
		.step(0.01);
	// 监测聚光灯距离影响
	gui.add(spotLight, "distance").min(0).max(20).step(0.1);
	// 监测聚光灯半影衰减效果
	gui.add(spotLight, "penumbra").min(0).max(1).step(0.01);
	// 监测聚光灯光照距离衰减效果
	gui.add(spotLight, "decay").min(0).max(5).step(0.01);

	function render() {
		controls.update();
		renderer.render(scene, camera);
		requestAnimationFrame(render);
	}

	render();
};
