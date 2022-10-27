/**
 * shaderCase 水
 */

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

import { Water } from "three/examples/jsm/objects/Water2";

import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const h = () => {
	// 场景
	const scene = new THREE.Scene();

	// 相机
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		300
	);
	camera.position.set(5, 5, 5);
	scene.add(camera);

	// 加载场景背景
	new RGBELoader().loadAsync("./assets/water.hdr").then((texture) => {
		texture.mapping = THREE.EquirectangularReflectionMapping;
		scene.background = texture;
		scene.environment = texture;
	});

	// 加载模型
	const gltfloader = new GLTFLoader().load(
		"./assets/model/yugang.glb",
		(gltf) => {
			const obj = gltf.scene.children[0];
			obj.material.side = THREE.DoubleSide;

			const waterGeometry = gltf.scene.children[1].geometry;

			const water = new Water(waterGeometry, {
				color: "#ffffff",
				scale: 1,
				flowDirection: new THREE.Vector2(1, 1), // 水纹方向
				textureHeight: 1024,
				textureWidth: 1024,
			});
			scene.add(water);
			scene.add(gltf.scene);
		}
	);

	// 平行光
	const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
	scene.add(directionalLight);

	// 渲染器
	const renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	// 渲染器输入编码设置
	// renderer.outputEncoding = THREE.sRGBEncoding;
	// 色调映射
	// renderer.toneMapping = THREE.ACESFilmicToneMapping;
	// 设置曝光程度
	// renderer.toneMappingExposure = 0.1;

	document.body.appendChild(renderer.domElement);

	// 轨道控制器
	const controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;

	// 坐标轴
	const axesHelper = new THREE.AxesHelper(5);
	scene.add(axesHelper);

	// 时钟
	const clock = new THREE.Clock();

	// dat.gui
	const gui = new dat.GUI();

	const render = () => {
		const elapsedTime = clock.getElapsedTime();
		controls.update();
		renderer.render(scene, camera);
		requestAnimationFrame(render);
	};

	render();
};
