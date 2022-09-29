/**
 * point-case 星璇特效
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

	const params = {
		count: 10000,
		size: 0.1,
		radius: 5,
		branch: 15,
		scale: 0.3,
		color: "#ff6030",
		endColor: "#1b3984",
	};

	let geometry = null;
	let material = null;
	let points = null;
	const texture = new THREE.TextureLoader().load(
		"./textures/particles/1.png"
	);
	const startColor = new THREE.Color(params.color);
	const endColor = new THREE.Color(params.endColor);
	const generateGalaxy = () => {
		// 生成顶点
		geometry = new THREE.BufferGeometry();
		// 随机生成顶点数组
		const vertices = new Float32Array(params.count * 3);
		// 设置顶点颜色
		const colors = new Float32Array(params.count * 3);

		for (let i = 0; i < params.count; i++) {
			// 分支角度
			const branchAngle =
				(i % params.branch) * ((2 * Math.PI) / params.branch);

			// 当前点距离圆心的距离
			const distance =
				Math.random() * params.radius * Math.pow(Math.random(), 3);

			const current = i * 3;

			const randomX =
				(Math.pow(Math.random() * 2 - 1, 3) *
					(params.radius - distance)) /
				5;
			const randomY =
				(Math.pow(Math.random() * 2 - 1, 3) *
					(params.radius - distance)) /
				5;
			const randomZ =
				(Math.pow(Math.random() * 2 - 1, 3) *
					(params.radius - distance)) /
				5;
			// const randomX = (Math.pow(Math.random() * 2 - 1, 3) * distance) / 5;
			// const randomY = (Math.pow(Math.random() * 2 - 1, 3) * distance) / 5;
			// const randomZ = (Math.pow(Math.random() * 2 - 1, 3) * distance) / 5;

			vertices[current] =
				Math.cos(branchAngle + distance * params.scale) * distance +
				randomX;
			vertices[current + 1] = 0 + randomY;
			vertices[current + 2] =
				Math.sin(branchAngle + distance * params.scale) * distance +
				randomZ;

			// 混合颜色形成渐变
			const mixinsColor = startColor.clone();
			mixinsColor.lerp(endColor, distance / params.radius);

			colors[current] = mixinsColor.r;
			colors[current + 1] = mixinsColor.g;
			colors[current + 2] = mixinsColor.b;
		}

		geometry.setAttribute(
			"position",
			new THREE.BufferAttribute(vertices, 3)
		);
		geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

		// 设置材质
		material = new THREE.PointsMaterial({
			// color: new THREE.Color(params.color),
			size: params.size,
			sizeAttenuation: true,
			depthWrite: false,
			blending: THREE.AdditiveBlending,
			map: texture,
			alphaMap: texture,
			transparent: true,
			vertexColors: true,
		});

		points = new THREE.Points(geometry, material);
		scene.add(points);
	};

	generateGalaxy();

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
	// const axesHelper = new THREE.AxesHelper(5);
	// scene.add(axesHelper);

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
