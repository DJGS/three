<template>
    <div id="cube" />
</template>

<script>
import * as THREE from 'three';
window.THREE = THREE;
require('three/examples/js/controls/OrbitControls');

export default {
    methods: {
        init() {
            // 创建场景
            let scene = new THREE.Scene();

            // 创建网络模型
            let geometry = new THREE.BoxGeometry(100, 100, 100);
            let material = new THREE.MeshLambertMaterial({
                color: 0x0000ff,
            });

            //  创建模型
            let mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            // 光源
            let point = new THREE.PointLight(0xffffff);
            point.position.set(400, 200, 300);
            scene.add(point);

            // 环境光
            let ambient = new THREE.AmbientLight(0x444444);
            scene.add(ambient);

            // 相机
            let width = window.innerWidth;
            let height = window.innerHeight;
            let camera = new THREE.OrthographicCamera(
                (-200 * width) / height,
                (200 * width) / height,
                200,
                -200,
                1,
                1000
            );
            camera.position.set(200, 300, 200);
            camera.lookAt(scene.position);

            // 渲染器
            let renderer = new THREE.WebGLRenderer();
            renderer.setSize(width, height);
            renderer.setClearColor(0xb9d3ff, 1);

            document.getElementById('cube').append(renderer.domElement);

            renderer.render(scene, camera);
        },
    },

    mounted() {
        this.init();
    },
};
</script>
