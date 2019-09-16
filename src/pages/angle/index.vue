<template>
    <div id="angle"></div>
</template>

<script>
import * as THREE from 'three';

export default {
    methods: {
        initAngle: () => {
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

            // 渲染场景
            let renderer;
            let render = () => {
                renderer = new THREE.WebGLRenderer();
                renderer.setSize(window.innerWidth, window.innerHeight);
                document.getElementById('angle').append(renderer.domElement);
            };

            let cube;
            let initObject = () => {
                let geometry = new THREE.PlaneGeometry(3, 3, 2, 2);
                let material = new THREE.MeshBasicMaterial({
                    vertexColors: THREE.VertexColors,
                    // color: 0xff0000,
                    // wireframe: true,
                });

                let color1 = new THREE.Color(0x00900f);
                let color2 = new THREE.Color(0x0000f0);
                let color3 = new THREE.Color(0x20f0ff);

                for (let i = 0; i < geometry.faces.length; i++) {
                    let f = geometry.faces[i];
                    f.vertexColors[0] = color1;
                    f.vertexColors[1] = color2;
                    f.vertexColors[2] = color3;
                }

                let cube = new THREE.Mesh(geometry, material);
                scene.add(cube);
            };

            // 运动
            let animate = () => {
                requestAnimationFrame(animate);

                renderer.render(scene, camera);
            };

            let init = () => {
                initScene();
                initCamera();
                render();
                initObject();

                animate();
            };

            init();
        },
    },
    mounted() {
        this.initAngle();
    },
};
</script>

<style lang='scss'>
</style>