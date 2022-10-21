/**
 * shaderCase 孔明灯
 */

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import gsap from "gsap";

import vertextShader from "../shader/case/vertex.glsl";
import fragmentShader from "../shader/case/fragment.glsl";

export const h = () => {
	// 场景
	const scene = new THREE.Scene();

	// 纹理贴图
	const envTexture = new RGBELoader()
		.loadAsync("./assets/night.hdr")
		.then((texture) => {
			texture.mapping = THREE.EquirectangularReflectionMapping;
			scene.background = texture;
			scene.environment = texture;
		});

	// 着色器材质
	const shaderMaterial = new THREE.RawShaderMaterial({
		vertexShader: vertextShader,
		fragmentShader: fragmentShader,
		uniforms: {},
		side: THREE.DoubleSide,
	});

	// 加载物体
	let lanternBody = null;
	const lantern = new GLTFLoader().load(
		"./assets/model/flyLight.glb",
		(gltf) => {
			console.log(gltf);
			lanternBody = gltf.scene.children[1];
			lanternBody.material = shaderMaterial;

			for (let i = 0; i < 150; i++) {
				let newLantern = gltf.scene.clone(true);
				let x = (Math.random() - 0.5) * 300;
				let z = (Math.random() - 0.5) * 300;
				let y = Math.random() * 60 + 25;
				newLantern.position.set(x, y, z);
				gsap.to(newLantern.rotation, {
					y: 2 * Math.PI,
					duration: 10 + Math.random() * 30,
					yoyo: true,
					repeat: -1,
				});
				gsap.to(newLantern.position, {
					x: "+=" + Math.random(),
					y: "+=" + Math.random() * 20,
					duration: 5 + Math.random() * 10,
					yoyo: true,
					repeat: -1,
				});
				scene.add(newLantern);
			}
		}
	);

	// 相机
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		300
	);
	camera.position.set(0, 0, 20);
	scene.add(camera);

	// 渲染器
	const renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	// 渲染器输入编码设置
	renderer.outputEncoding = THREE.sRGBEncoding;
	// 色调映射
	renderer.toneMapping = THREE.ACESFilmicToneMapping;
	// 设置曝光程度
	renderer.toneMappingExposure = 0.1;

	document.body.appendChild(renderer.domElement);

	// 轨道控制器
	const controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	// 设置自动旋转
	controls.autoRotate = true;
	// 设置旋转速度
	controls.autoRotateSpeed = 0.1;
	// 设置旋转角度
	controls.maxPolarAngle = (Math.PI / 4) * 3;
	controls.minPolarAngle = (Math.PI / 4) * 3;

	const render = () => {
		controls.update();
		renderer.render(scene, camera);
		requestAnimationFrame(render);
	};

	render();
};
