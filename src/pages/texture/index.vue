<template>
    <div id="texture"></div>
</template>

<script>
import * as THREE from 'three';

export default {
    data() {
        return {};
    },
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
                document.getElementById('texture').append(renderer.domElement);
            };

            // 创建物体
            let geometry;
            let cube;
            let initGeometry = () => {
                geometry = new THREE.BoxGeometry(2, 2, 1);

                var loader = new THREE.TextureLoader();
                loader.load(
                    // 资源URL
                    './static/fire.jpg',
                    // onLoad回调
                    function(texture) {
                        // 重复repeat 复制
                        let demo = texture;
                        demo.repeat.x = 4;
                        demo.repeat.y = 4;
                        demo.repeat.wrap = true;
                        demo.wrapS = demo.wrapT = THREE.RepeatWrapping;

                        // 立即使用纹理进行材质创建
                        var material = new THREE.MeshBasicMaterial({ map: demo });
                        cube = new THREE.Mesh(geometry, material);
                        scene.add(cube);

                        animate();
                    }
                );
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
                renderer.render(scene, camera);
            };

            let init = function() {
                initScene();
                initLight();
                initCamera();
                render();
                initGeometry();
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