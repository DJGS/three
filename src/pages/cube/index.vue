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
                // opacity: 0.7,
                // transparent: true,
                // 将几何图形渲染为线框。 默认值为false
                // wireframe: true,
            });

            //  创建模型
            let mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            // 球型模型
            let geometry1 = new THREE.SphereGeometry(60, 40, 40);
            let mesh1 = new THREE.Mesh(geometry1, material);
            scene.add(mesh1);
            mesh1.position.set(120, 0, 0);

            // 点光源 需要设置位置
            let point = new THREE.PointLight(0xffffff);
            point.position.set(400, 200, 300);
            scene.add(point);

            // 三维辅助坐标系
            let axisHelper = new THREE.AxisHelper(250);
            scene.add(axisHelper);

            // 环境光 不需要设置光源位置
            let ambient = new THREE.AmbientLight(0x666666);
            scene.add(ambient);

            // 平行光 postion 和target确定方向
            let directionLight = new THREE.DirectionalLight(0xffffff, 1);
            directionLight.position.set(80, 100, 50);
            directionLight.target = mesh;
            // scene.add(directionLight);

            // 聚光光源
            var spotLight = new THREE.SpotLight(0xffffff);
            // 设置聚光光源位置
            spotLight.position.set(200, 200, 200);
            // 聚光灯光源指向网格模型mesh2
            spotLight.target = mesh1;
            // 设置聚光光源发散角度
            spotLight.angle = Math.PI / 6;
            // scene.add(spotLight); //光对象添加到scene场景中

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

            let render = () => {
                renderer.render(scene, camera);
                // mesh.rotateY(0.01);
                // requestAnimationFrame(render);
            };

            render();

            // 创建控制器
            let controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.addEventListener('change', render);
            // 缩放：滚动—鼠标中键
            // 旋转：拖动—鼠标左键
            // 平移：拖动—鼠标右键
        },
    },

    mounted() {
        this.init();
    },
};
</script>
