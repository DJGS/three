<template>
    <div id="cube" />
</template>

<script>
import * as THREE from 'three';
window.THREE = THREE;
require('three/examples/js/controls/OrbitControls');
import header from '@images/default-avator.jpg';
import demo from '@images/demo.mp4';

export default {
    methods: {
        init() {
            // 视频纹理
            let video = document.createElement('video');
            video.src = demo; // 设置视频地址
            video.autoplay = 'autoplay'; //要设置播放
            // video对象作为VideoTexture参数创建纹理对象
            let texture1 = new THREE.VideoTexture(video);

            // 创建场景
            let scene = new THREE.Scene();

            // 点光源 需要设置位置
            let point = new THREE.PointLight(0xffffff);
            point.position.set(400, 200, 300);
            scene.add(point);

            // 环境光 不需要设置光源位置
            let ambient = new THREE.AmbientLight(0x666666);
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
            camera.position.set(10, 200, 200);
            camera.lookAt(scene.position);

            // 渲染器
            let renderer = new THREE.WebGLRenderer();
            renderer.setSize(width, height);
            renderer.setClearColor(0xb9d3ff, 1);

            document.getElementById('cube').append(renderer.domElement);

            // 贴图加载器
            let geometry = new THREE.PlaneGeometry(204, 102, 2, 2);
            let geometry1 = new THREE.BoxGeometry(100, 100, 100);
            let geometry2 = new THREE.SphereGeometry(60, 25, 25);
            let textureLoader = new THREE.TextureLoader();
            textureLoader.load(header, function (texture) {
                let material = new THREE.MeshLambertMaterial({
                    map: texture,
                });
                let material1 = new THREE.MeshPhongMaterial({
                    color: 0xffff3f,
                });
                let material2 = new THREE.MeshLambertMaterial({
                    map: texture1,
                });

                // 纹理矩阵 重复
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(4, 2);

                // 偏移
                // texture.offset = new THREE.Vector2(0.5, 0.5);

                // 旋转
                texture.rotation = Math.PI / 4;
                // 设置纹理的旋转中心，默认(0,0)
                texture.center.set(0.5, 0.5);

                // let geometry = new THREE.PlaneGeometry(204, 102, 4, 4); //矩形平面
                // let geometry = new THREE.SphereGeometry(60, 25, 25); //球体
                // let geometry = new THREE.CylinderGeometry(60, 60, 25,25); //圆柱

                // 设置材质数组
                let materialArr = [material1, material1, material1, material1, material, material1];
                let materialArr1 = [material, material1];

                geometry.faces[4].materialIndex = 1;
                geometry.faces[5].materialIndex = 1;

                let mesh = new THREE.Mesh(geometry, materialArr1);
                // let mesh = new THREE.Mesh(geometry, material);
                let mesh1 = new THREE.Mesh(geometry1, materialArr);
                let mesh2 = new THREE.Mesh(geometry2, material);
                let mesh3 = new THREE.Mesh(geometry1, material2);

                scene.add(mesh);
                scene.add(mesh1);
                scene.add(mesh2);
                scene.add(mesh3);
                mesh1.position.set(200, 0, 0);
                mesh2.position.set(-200, 0, 0);
                mesh3.position.set(0, 160, 0);

                let render = () => {
                    renderer.render(scene, camera);
                    // mesh.rotateY(0.01);
                    texture.offset.x -= 0.06;
                    requestAnimationFrame(render);
                };

                render();
            });

            // render();

            // 创建控制器
            // let controls = new THREE.OrbitControls(camera, renderer.domElement);
            // controls.addEventListener('change', render);
        },
    },

    mounted() {
        this.init();
    },
};
</script>
