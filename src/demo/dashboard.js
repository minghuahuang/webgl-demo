/**
 * 3D 官网
 */

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
import gsap from "gsap";

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
	camera.position.set(0, 0, 22);
	scene.add(camera);

	// 物体
	const geometry = new THREE.BoxGeometry(2, 2, 2);
	const material = new THREE.MeshBasicMaterial({
		wireframe: true,
	});
	const chooseMaterial = new THREE.MeshBasicMaterial({
		color: "#ff0000",
	});
	let arr = [];
	let group = new THREE.Group();
	for (let i = 0; i < 5; i++) {
		for (let j = 0; j < 5; j++) {
			for (let k = 0; k < 5; k++) {
				const cube = new THREE.Mesh(geometry, material);
				cube.position.set(i * 2 - 4, j * 2 - 4, k * 2 - 4);
				group.add(cube);
				arr.push(cube);
			}
		}
	}

	scene.add(group);

	let rectangle = null;
	let rectangleGroup = new THREE.Group();
	for (let i = 0; i < 50; i++) {
		// 三角形需要三个顶点，三个顶点需要3个元素确定坐标
		const geometry = new THREE.BufferGeometry();
		const vertices = new Float32Array(9);
		for (let j = 0; j < 9; j++) {
			vertices[j] = Math.random() * 10 - 5;
		}
		geometry.setAttribute(
			"position",
			new THREE.BufferAttribute(vertices, 3)
		);

		let color = new THREE.Color(
			Math.random(),
			Math.random(),
			Math.random()
		);
		const material = new THREE.MeshBasicMaterial({
			color: color,
			transparent: true,
			opacity: 0.3,
			side: THREE.DoubleSide,
		});
		rectangle = new THREE.Mesh(geometry, material);

		rectangleGroup.add(rectangle);
	}

	rectangleGroup.position.set(0, -30, 0);
	scene.add(rectangleGroup);

	let ballGroup = new THREE.Group();
	const spheregeometry = new THREE.SphereGeometry(1, 20, 20);
	const planeGeometry = new THREE.PlaneGeometry(30, 30);
	const ballMaterial = new THREE.MeshStandardMaterial();
	const sphere = new THREE.Mesh(spheregeometry, ballMaterial);
	//  开启物体投射阴影
	sphere.castShadow = true;
	const plane = new THREE.Mesh(planeGeometry, ballMaterial);
	plane.position.set(0, -1, 0);
	plane.rotation.x = -Math.PI / 2;
	//  开启物体接收阴影
	plane.receiveShadow = true;
	ballGroup.add(sphere);
	ballGroup.add(plane);
	ballGroup.position.set(0, -60, 0);

	scene.add(ballGroup);

	let groupArr = [group, rectangleGroup, ballGroup];

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
	const renderer = new THREE.WebGLRenderer({ alpha: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	//  开启渲染器阴影贴图
	renderer.shadowMap.enabled = true;
	renderer.physicallyCorrectLights = true;
	document.body.appendChild(renderer.domElement);

	// 环境光
	const envLight = new THREE.AmbientLight(0xffffff, 0.5);
	ballGroup.add(envLight);

	// 光载体
	const smallball = new THREE.Mesh(
		new THREE.SphereGeometry(0.1, 20, 20),
		new THREE.MeshBasicMaterial({ color: 0xff0000 })
	);
	smallball.position.set(2, 2, 2);

	// 点光源
	const pointLight = new THREE.PointLight(0xff0000, 5);
	pointLight.position.set(5, 5, 5);

	smallball.add(pointLight);
	ballGroup.add(smallball);

	// GUI
	const gui = new dat.GUI();
	// gui.add();

	// 设置时钟
	const clock = new THREE.Clock();

	function render() {
		// let time = clock.getElapsedTime();
		let detalTime = clock.getDelta();
		// group.rotation.x = time * 0.05;
		// group.rotation.y = time * 0.05;

		// rectangleGroup.rotation.x = time * 0.05;
		// rectangleGroup.rotation.y = time * 0.05;

		// smallball.position.x = Math.sin(time) * 3;
		// smallball.position.z = Math.cos(time) * 3;
		// smallball.position.y = 2 + Math.sin(time * 2);

		// 根据滚动页数设置相机位置
		camera.position.y = -(window.scrollY / window.innerHeight) * 30;
		camera.position.x += (mouse.x * 10 - camera.position.x) * detalTime * 5;
		renderer.render(scene, camera);
		requestAnimationFrame(render);
	}

	render();

	let current = 0;
	// 监听滚动事件
	window.addEventListener("scroll", () => {
		const page = Math.round(window.scrollY / window.innerHeight);
		if (page !== current) {
			current = page;
			gsap.to(groupArr[current].rotation, {
				z: "+=" + Math.PI,
				duration: 1,
			});
			gsap.to(`.page${current} h1`, {
				rotate: "+=" + 360,
				duration: 1,
			});
			gsap.fromTo(`.page${current} h3`, { x: -300 }, { x: 0 });
		}
	});

	window.addEventListener("mousemove", (event) => {
		mouse.x = event.clientX / window.innerWidth - 0.5;
		mouse.y = event.clientY / window.innerHeight - 0.5;
	});
};
