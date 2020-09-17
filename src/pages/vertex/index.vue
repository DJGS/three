<template>
    <div id="vertex" />
</template>

<script>
import * as THREE from 'three';
window.THREE = THREE;

export default {
    methods: {
        init() {
            let scene = new THREE.Scene();

            let germetry = new THREE.BufferGeometry();
            let vertices = new Float32Array([
                0,
                0,
                0,
                50,
                0,
                0,
                0,
                100,
                0,
                0,
                0,
                10,
                0,
                0,
                100,
                50,
                0,
                10,
            ]);
            let attribue = new THREE.BufferAttribute(vertices, 3);

            germetry.attributes.position = attribue;

            let material = new THREE.MeshBasicMaterial({
                color: 0x0000ff,
                side: THREE.DoubleSide,
            });

            let mesh = new THREE.Mesh(germetry, material);
            scene.add(mesh);

            // 光源
            let point = new THREE.PointLight(0xffffff);
            point.position.set(400, 200, 300);
            scene.add(point);

            // 三维辅助坐标系
            let axisHelper = new THREE.AxisHelper(250);
            scene.add(axisHelper);

            // 环境光
            let ambient = new THREE.AmbientLight(0x888888);
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

            let renderer = new THREE.WebGLRenderer();
            renderer.setSize(width, height);
            renderer.setClearColor(0xb9d3ff, 1);

            document.getElementById('vertex').append(renderer.domElement);

            renderer.render(scene, camera);
        },
    },
    mounted() {
        this.init();
    },
};
</script>

<style>
</style>