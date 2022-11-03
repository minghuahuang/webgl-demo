/**
 * point 着色器材质
 */

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

import vertexShader from "../shader/case04/vertex.glsl";
import fragmentShader from "../shader/case04/fragment.glsl";

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

	const geometry = new THREE.BufferGeometry();
	const positions = new Float32Array([0, 0, 0]);

	geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

	// const material = new THREE.PointsMaterial({
	// 	color: 0xff0000,
	// 	size: 10,
	// 	sizeAttenuation: true
	// })

	// 纹理
	const texture = new THREE.TextureLoader().load("textures/particles/10.png");

	// 点的着色器材质
	const material = new THREE.ShaderMaterial({
		uniforms: {
			uTexture: {
				value: texture,
			},
		},
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
		transparent: true,
	});

	const point = new THREE.Points(geometry, material);

	scene.add(point);

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
