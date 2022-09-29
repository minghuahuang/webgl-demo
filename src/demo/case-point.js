/**
 * point-case 随机顶点
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
	const particlesGeometry = new THREE.BufferGeometry();
	const count = 5000;
	// 设置缓冲区数组
	const vertices = new Float32Array(count * 3);
	// 设置顶点颜色
	const colors = new Float32Array(count * 3);
	// 设置顶点
	for (let i = 0; i < count * 3; i++) {
		vertices[i] = Math.random() * 10 - 5;
		colors[i] = Math.random();
	}
	particlesGeometry.setAttribute(
		"position",
		new THREE.BufferAttribute(vertices, 3)
	);
	particlesGeometry.setAttribute(
		"color",
		new THREE.BufferAttribute(colors, 3)
	);

	// 设置贴图
	const texture = new THREE.TextureLoader().load(
		"./textures/particles/1.png"
	);

	// 点材质
	const material = new THREE.PointsMaterial({
		color: 0xffffff,
		map: texture,
		transparent: true,
		alphaMap: texture,
		depthWrite: false,
		blending: THREE.AdditiveBlending,
	});

	// 设置点的大小
	material.size = 0.1;
	// 设置点的颜色
	material.color.set(0xffff00);
	// 设置点的大小是否因相机深度衰减
	// material.sizeAttenuation = false;
	// 设置启用顶点颜色
	material.vertexColors = true;

	// 点生成
	const sphere = new THREE.Points(particlesGeometry, material);

	scene.add(sphere);

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

	// GUI
	const gui = new dat.GUI();
	// gui.add();

	// 设置时钟
	const clock = new THREE.Clock();

	function render() {
		let time = clock.getElapsedTime();
		controls.update();
		renderer.render(scene, camera);
		requestAnimationFrame(render);
	}

	render();
};
