/**
 * displacementMap 使用
 */

import * as THREE from "three";
import { BufferAttribute } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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

	// 物体
	const geometry = new THREE.BoxGeometry(1, 1, 1, 200, 200, 200);
	// 纹理
	const texture = new THREE.TextureLoader().load("./textures/door/color.jpg");
	// 环境贴图
	const envTexture = new THREE.TextureLoader().load(
		"./textures/door/ambientOcclusion.jpg"
	);
	// 设置几何体第二组uv
	geometry.setAttribute(
		"uv2",
		new BufferAttribute(geometry.attributes.uv.array, 2)
	);

	// 位移贴图
	const displaceTexture = new THREE.TextureLoader().load(
		"./textures/door/height.jpg"
	);

	const material = new THREE.MeshStandardMaterial({
		color: 0xffff00,
		map: texture,
		aoMap: envTexture,
		aoMapIntensity: 0.7,
		displacementMap: displaceTexture,
    displacementScale: 0.1,
	});
	const cube = new THREE.Mesh(geometry, material);

	// 添加物体和相机进入场景
	scene.add(camera);
	scene.add(cube);

	// 环境光
	const envLight = new THREE.AmbientLight(0xffffff, 0.5);
	scene.add(envLight);

	// 直线光
	const directLight = new THREE.DirectionalLight(0xffffff, 1);
	directLight.position.set(10, 10, 10);
	scene.add(directLight);

	// 渲染器
	const renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	// 轨道控制器
	const controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;

	// 坐标轴
	const axesHelper = new THREE.AxesHelper(5);
	scene.add(axesHelper);

	function render() {
		controls.update();
		renderer.render(scene, camera);
		requestAnimationFrame(render);
	}

	render();
};
