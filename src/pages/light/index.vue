<template>
    <div id="light"></div>
</template>

<script>
import * as THREE from 'three';

export default {
    methods: {
        initLight() {
            // 初始化场景
            let scene;
            let initScene = () => {
                scene = new THREE.Scene();
            };

            // 初始化相机
            let camera;
            let initCamera = () => {
                camera = new THREE.PerspectiveCamera(
                    75,
                    window.innerWidth / window.innerHeight,
                    0.1,
                    1000
                );

                camera.position.z = 5;
            };

            // 渲染函数
            let renderer;
            let render = () => {
                renderer = new THREE.WebGLRenderer();
                renderer.setSize(window.innerWidth, window.innerHeight);
                document.getElementById('light').append(renderer.domElement);
            };

            // 创建物体
            let geometry;
            let cube;
            let initGeometry = () => {
                geometry = new THREE.BoxGeometry(1, 1, 1);
                var material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
                cube = new THREE.Mesh(geometry, material);
                scene.add(cube);
            };

            // 初始化光源
            let light;
            let initLight = () => {
                light = new THREE.AmbientLight(0xffffff); // soft white light
                light.position.set(0, 0, 5);
                scene.add(light);
            };

            // 运动
            let animate = () => {
                requestAnimationFrame(animate);
                cube.rotation.x += 0.01;
                cube.rotation.y += 0.01;
                renderer.render(scene, camera);
            };

            let init = function() {
                initScene();
                initLight();
                initCamera();
                render();
                initGeometry();

                animate();
            };

            init();
        },
    },
    mounted() {
        this.initLight();
    },
};
</script>

<style lang='scss'>
#light {
    width: 100%;
    height: 100%;
}
</style>