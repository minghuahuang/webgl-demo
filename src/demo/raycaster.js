/**
 * raycaster 光线投射
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
	const geometry = new THREE.BoxGeometry(1, 1, 1);
	const material = new THREE.MeshBasicMaterial({
		wireframe: true,
	});
	const chooseMaterial = new THREE.MeshBasicMaterial({
		color: "#ff0000",
	});
	let arr = [];
	for (let i = -5; i < 5; i++) {
		for (let j = -5; j < 5; j++) {
			for (let k = -5; k < 5; k++) {
				const cube = new THREE.Mesh(geometry, material);
				cube.position.set(i, j, k);
				scene.add(cube);
				arr.push(cube);
			}
		}
	}

	// 光线投射
	// 创建投射对象
	const raycaster = new THREE.Raycaster();
	// 创建鼠标位置对象
	const mouse = new THREE.Vector2();
	// 监听鼠标位置
	window.addEventListener("click", (event) => {
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y = -(event.clientY / window.innerHeight) * 2 - 1;
		raycaster.setFromCamera(mouse, camera);
		let res = raycaster.intersectObjects(arr);
		if (res.length !== 0) {
			res[0].object.material = chooseMaterial;
		}
	});

	// 渲染器
	const renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	//  开启渲染器阴影贴图
	renderer.shadowMap.enabled = true;
	renderer.physicallyCorrectLights = true;
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
