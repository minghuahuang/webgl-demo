/**
 * cannon 物理引擎
 */

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
import gsap from "gsap";
import * as cannon from "cannon-es";

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
	const spheregeometry = new THREE.SphereGeometry(1, 20, 20);
	const spherematerial = new THREE.MeshStandardMaterial();
	const sphere = new THREE.Mesh(spheregeometry, spherematerial);
	sphere.castShadow = true;
	scene.add(sphere);

	const plane = new THREE.Mesh(
		new THREE.PlaneGeometry(20, 20),
		new THREE.MeshStandardMaterial({
			side: THREE.DoubleSide,
		})
	);
	plane.rotation.x = Math.PI / 2;
	plane.position.y = -5;
	plane.receiveShadow = true;
	scene.add(plane);

	// 创建物理世界
	// const world = new cannon.World({ gravity: 9.8 });
	const world = new cannon.World();
	world.gravity.set(0, -9.8, 0);

	// 创建物理世界物体
	const sphereElasticMaterial = new cannon.Material("sphere");
	const sphereBody = new cannon.Body({
		shape: new cannon.Sphere(1),
		position: new cannon.Vec3(0, 0, 0),
		mass: 1,
		material: sphereElasticMaterial,
	});

	const planeElasticMaterial = new cannon.Material("plane");
	const planeBody = new cannon.Body({
		shape: new cannon.Plane(),
		position: new cannon.Vec3(0, -5, 0),
		mass: 0,
		material: planeElasticMaterial,
	});

	// 旋转地面位置
	planeBody.quaternion.setFromAxisAngle(
		new cannon.Vec3(1, 0, 0),
		-Math.PI / 2
	);
	// planeBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);

	// 设置碰撞物体的材质的弹力系数
	const elastic = new cannon.ContactMaterial(
		sphereElasticMaterial,
		planeElasticMaterial,
		{
			friction: 0.1, // 摩擦系数
			restitution: 0.7, // 弹力系数
		}
	);
	world.addContactMaterial(elastic);

	world.addBody(sphereBody);
	world.addBody(planeBody);

	// 添加音效
	const sound = new Audio("assets/hit.mp3");

	// 监听碰撞事件
	sphereBody.addEventListener("collide", (event) => {
		const impactStrength = event.contact.getImpactVelocityAlongNormal();
		if (impactStrength > 3) {
			// 需要浏览器交互才可以播放（刷新页面后，点击屏幕）
			sound.currentTime = 1;
			sound.play();
		}
	});

	// 渲染器
	const renderer = new THREE.WebGLRenderer({ alpha: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	//  开启渲染器阴影贴图
	renderer.shadowMap.enabled = true;
	renderer.physicallyCorrectLights = true;
	document.body.appendChild(renderer.domElement);

	// 轨道控制器
	const controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;

	// 坐标轴
	const axesHelper = new THREE.AxesHelper(5);
	scene.add(axesHelper);

	// 环境光
	const envLight = new THREE.AmbientLight(0xffffff, 0.5);
	scene.add(envLight);

	// 平行光
	const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
	directionalLight.castShadow = true;
	scene.add(directionalLight);

	// GUI
	const gui = new dat.GUI();
	// gui.add();

	// 设置时钟
	const clock = new THREE.Clock();

	function render() {
		// let time = clock.getElapsedTime();
		let deltaTime = clock.getDelta();

		controls.update();

		world.step(1 / 60, deltaTime);

		sphere.position.copy(sphereBody.position);

		renderer.render(scene, camera);
		requestAnimationFrame(render);
	}

	render();
};
