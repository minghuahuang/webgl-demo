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
	const planeGeometry = new THREE.PlaneGeometry(10, 10);
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

	// 平行光
	const directLight = new THREE.DirectionalLight(0xffffff, 0.5);
	directLight.position.set(5, 5, 5);
	//  设置光线投射阴影
	directLight.castShadow = true;
	// 设置阴影的模糊度
	directLight.shadow.radius = 20;
	// 设置阴影的分辨率
	directLight.shadow.mapSize.set(4096, 4096);
	// 设置阴影投射相机属性
	directLight.shadow.camera.near = 0.5;
	directLight.shadow.camera.far = 500;
	directLight.shadow.camera.top = 5;
	directLight.shadow.camera.right = 5;
	directLight.shadow.camera.bottom = -5;
	directLight.shadow.camera.left = -5;
	scene.add(directLight);
	// GUI
	const gui = new dat.GUI();
	gui.add(directLight.shadow.camera, "near")
		.min(0)
		.max(10)
		.step(0.1)
		.onChange(() => {
			directLight.shadow.camera.updateProjectionMatrix();
		});

	function render() {
		controls.update();
		renderer.render(scene, camera);
		requestAnimationFrame(render);
	}

	render();
};
