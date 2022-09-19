/**
 * 案例-随机生成多个三角形
 */

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const h = () => {
	// 场景
	const scene = new THREE.Scene();

	// 物体
  for(let i = 0; i < 50; i++){
    // 三角形需要三个顶点，三个顶点需要3个元素确定坐标
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array(9);
    for(let j = 0; j < 9; j++){
      vertices[j] = Math.random() * 10 -5
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

    let color = new THREE.Color(Math.random(), Math.random(), Math.random())
    const material = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.3 });
    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);
    console.log(cube)
  }
	// 相机
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		1,
		1000
	);
	camera.position.set(0, 0, 10);

	// 添加
	scene.add(camera);

	// 渲染器
	const renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	// 挂载
	document.body.appendChild(renderer.domElement);

	// 轨道控制器
	const constrols = new OrbitControls(camera, renderer.domElement);
	constrols.enableDamping = true;

	// 坐标轴
	const axisHelper = new THREE.AxesHelper(5);
	scene.add(axisHelper);

	function render() {
		constrols.update();
		renderer.render(scene, camera);
		requestAnimationFrame(render);
	}

	render();
};
