/**
 * shaderCase 烟雾效果
 */

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

import vertextShader from "../shader/case02/vertex.glsl";
import fragmentShader from "../shader/case02/fragment.glsl";

export const h = () => {
	// 场景
	const scene = new THREE.Scene();

	// 物体
	const planeGeometry = new THREE.PlaneGeometry(1, 1, 2048, 2048);
	const params = {
		uWaveRate: 14,
		uScale: 0.03,
		uXzScale: 1,
		uNoiseRate: 10,
		uNoiseScale: 2.16,
		uLowColor: "#ff0000",
		uHighColor: "#ffff00",
		uXSpeed: 1,
		uZSpeed: 1,
		uNoiseSpeed: 1,
		uOpacity: 1,
	};
	// 着色器材质
	const planeMaterial = new THREE.ShaderMaterial({
		vertexShader: vertextShader,
		fragmentShader: fragmentShader,
		side: THREE.DoubleSide,
		uniforms: {
			uWaveRate: {
				value: params.uWaveRate,
			},
			uScale: {
				value: params.uScale,
			},
			uXzScale: {
				value: params.uXzScale,
			},
			uNoiseRate: {
				value: params.uNoiseRate,
			},
			uNoiseScale: {
				value: params.uNoiseScale,
			},
			uTime: {
				value: params.uTime,
			},
			uLowColor: {
				value: new THREE.Color(params.uLowColor),
			},
			uHighColor: {
				value: new THREE.Color(params.uHighColor),
			},
			uXSpeed: {
				value: params.uXSpeed,
			},
			uZSpeed: {
				value: params.uZSpeed,
			},
			uNoiseSpeed: {
				value: params.uNoiseSpeed,
			},
			uOpacity: {
				value: params.uOpacity,
			},
		},
		transparent: true,
	});
	const plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.rotation.set(-Math.PI / 2, 0, 0);
	scene.add(plane);

	const gui = new dat.GUI();
	gui.add(params, "uWaveRate")
		.min(1)
		.max(100)
		.step(0.1)
		.name("波纹频率")
		.onChange((val) => {
			planeMaterial.uniforms.uWaveRate.value = val;
		});
	gui.add(params, "uScale")
		.min(0)
		.max(1)
		.step(0.01)
		.name("峰值规模")
		.onChange((val) => {
			planeMaterial.uniforms.uScale.value = val;
		});
	gui.add(params, "uXzScale")
		.min(1)
		.max(5)
		.step(0.1)
		.name("XZ规模")
		.onChange((val) => {
			planeMaterial.uniforms.uXzScale.value = val;
		});
	gui.add(params, "uNoiseRate")
		.min(1)
		.max(100)
		.step(1)
		.name("噪声频率")
		.onChange((val) => {
			planeMaterial.uniforms.uNoiseRate.value = val;
		});
	gui.add(params, "uNoiseScale")
		.min(0)
		.max(5)
		.step(0.01)
		.name("噪声规模")
		.onChange((val) => {
			planeMaterial.uniforms.uNoiseScale.value = val;
		});
	gui.add(params, "uXSpeed")
		.min(0)
		.max(5)
		.step(0.01)
		.name("X速度")
		.onChange((val) => {
			planeMaterial.uniforms.uXSpeed.value = val;
		});
	gui.add(params, "uZSpeed")
		.min(0)
		.max(5)
		.step(0.01)
		.name("Z速度")
		.onChange((val) => {
			planeMaterial.uniforms.uZSpeed.value = val;
		});
	gui.add(params, "uNoiseSpeed")
		.min(0)
		.max(5)
		.step(0.01)
		.name("噪声速度")
		.onChange((val) => {
			planeMaterial.uniforms.uNoiseSpeed.value = val;
		});
	gui.add(params, "uOpacity")
		.min(0)
		.max(1)
		.step(0.01)
		.name("透明度")
		.onChange((val) => {
			planeMaterial.uniforms.uOpacity.value = val;
		});
	gui.addColor(params, "uLowColor")
		.name("下位颜色")
		.onFinishChange((val) => {
			planeMaterial.uniforms.uLowColor.value = new THREE.Color(val);
		});
	gui.addColor(params, "uHighColor")
		.name("上位颜色")
		.onFinishChange((val) => {
			planeMaterial.uniforms.uHighColor.value = new THREE.Color(val);
		});

	// 相机
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		300
	);
	camera.position.set(0.7, 1, 1.5);
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

	// 坐标轴
	const axesHelper = new THREE.AxesHelper(5);
	scene.add(axesHelper);

	// 时钟
	const clock = new THREE.Clock();

	const render = () => {
		const elapsedTime = clock.getElapsedTime();
		planeMaterial.uniforms.uTime.value = elapsedTime;
		controls.update();
		renderer.render(scene, camera);
		requestAnimationFrame(render);
	};

	render();
};
