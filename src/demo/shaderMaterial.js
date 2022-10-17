/**
 * shaderMaterial 使用
 */

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const h = () => {
	// 场景
	const scene = new THREE.Scene();

	// 物体
	const planeGeometry = new THREE.PlaneGeometry(8, 8);
	// 着色器材质
	const planeMaterial = new THREE.ShaderMaterial({
		vertexShader: `
      void main() {
        gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0);
      }
    `,
		fragmentShader: `
      void main() {
        gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
      }
    `,
	});
	const plane = new THREE.Mesh(planeGeometry, planeMaterial);
	scene.add(plane);

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
	document.body.appendChild(renderer.domElement);

	// 轨道控制器
	const controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;

	// 坐标轴
	const axesHelper = new THREE.AxesHelper(10);
	scene.add(axesHelper);

	const render = () => {
		controls.update();
		renderer.render(scene, camera);
		requestAnimationFrame(render);
	};

	render();
};
