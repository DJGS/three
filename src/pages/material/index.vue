<template>
    <div id="material" />
</template>

<script>
import * as THREE from 'three';
window.THREE = THREE;

export default {
    methods: {
        init() {
            let scene = new THREE.Scene();

            // 点材质
            let geometry = new THREE.SphereGeometry(50, 25, 25);
            let material = new THREE.PointsMaterial({
                color: 0x0000ff,
                size: 3,
            });
            let point1 = new THREE.Points(geometry, material);
            scene.add(point1);

            // 线材质
            let lineGeometry = new THREE.SphereGeometry(50, 25, 25);
            let material1 = new THREE.LineBasicMaterial({
                color: 0x0000ff,
            });
            let line1 = new THREE.Line(lineGeometry, material1);
            scene.add(line1);
            line1.position.set(50, 250, 50);

            // 网格模型
            // 基础网格材质对象MeshBasicMaterial,不受带有方向光源影响，没有棱角感。
            // let material2 = new THREE.MeshBasicMaterial({
            //     color: 0x0000ff,
            // });
            let material2 = new THREE.MeshLambertMaterial({
                color: 0x00ff00,
                // 透明度
                opacity: 0.3,
                transparent: true,
                // side: THREE.DoubleSide,
            });
            // 高光材质
            // let material2 = new THREE.MeshPhongMaterial({
            //     color: 0xff0000,
            //     specular: 0x444444, //高光部分的颜色
            //     shininess: 20, //高光部分的亮度，默认30
            // });
            let geometry2 = new THREE.SphereGeometry(50, 25, 25);
            let box1 = new THREE.Mesh(geometry2, material2);
            scene.add(box1);
            box1.position.set(50, -100, 50);

            // 光源
            let point = new THREE.PointLight(0xffffff);
            point.position.set(400, 200, 300);
            scene.add(point);

            // 三维辅助坐标系
            let axisHelper = new THREE.AxisHelper(250);
            scene.add(axisHelper);

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

            let renderer = new THREE.WebGLRenderer();
            renderer.setSize(width, height);
            renderer.setClearColor(0xb9d3ff, 1);

            document.getElementById('material').append(renderer.domElement);

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