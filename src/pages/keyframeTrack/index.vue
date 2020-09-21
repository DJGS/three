<template>
    <div id="keyframeTrack" />
</template>

<script>
import * as THREE from 'three';
window.THREE = THREE;

export default {
    methods: {
        init() {
            let scene = new THREE.Scene();

            // 球体
            let geometry = new THREE.SphereGeometry(60, 25, 25);
            let material = new THREE.MeshLambertMaterial({
                color: 0x00ff00,
            });
            let mesh1 = new THREE.Mesh(geometry, material);
            mesh1.name = 'Sphere';

            // 长方体
            let geometry1 = new THREE.BoxGeometry(100, 50, 50);
            let material1 = new THREE.MeshLambertMaterial({
                color: 0xff0000,
            });
            let mesh2 = new THREE.Mesh(geometry1, material1);
            mesh2.position.set(200, 0, 0);
            mesh2.name = 'Box';

            let group = new THREE.Group();
            group.add(mesh1, mesh2);
            scene.add(group);

            // 关键帧
            let times = [0, 10];
            // 0时刻对应0，0，0  10时刻对应150，0，0
            let values = [0, 0, 0, 150, 0, 0];
            // 位置关键帧
            let posTrack = new THREE.KeyframeTrack('Box.position', times, values);
            // 颜色关键帧
            let colorKF = new THREE.KeyframeTrack(
                'Box.material.color',
                [10, 20],
                [1, 0, 0, 0, 0, 1]
            );
            // 缩放关键帧
            let scaleKF = new THREE.KeyframeTrack('Sphere.scale', [0, 20], [1, 1, 1, 3, 3, 3]);
            let duration = 20;
            // 多个帧动画作为元素创建一个剪辑clip对象，命名"default"，持续时间20
            let clip = new THREE.AnimationClip('default', duration, [posTrack, colorKF, scaleKF]);

            // 将group作为混合器参数，可以播放group所有字对象的动画
            let mixer = new THREE.AnimationMixer(group);
            // 剪辑clip作为参数，返回操作对象
            let animation = mixer.clipAction(clip);
            // 调节播放速度
            animation.timeScale = 10;
            // 开始播放
            animation.play();

            // 不循环播放
            animation.loop = THREE.LoopOnce;

            setTimeout(() => {
                // animation.paused = true;
            }, 2000);

            let point = new THREE.PointLight(0xffffff);
            point.position.set(400, 200, 300);
            scene.add(point);

            let ambient = new THREE.AmbientLight(0x666666);
            scene.add(ambient);

            let axisHelper = new THREE.AxisHelper(250);
            scene.add(axisHelper);

            let width = window.innerWidth;
            let height = window.innerHeight;
            let s = 200;
            let k = width / height;
            let camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
            camera.position.set(200, 300, 200);
            camera.lookAt(scene.position);

            let renderer = new THREE.WebGLRenderer();
            renderer.setSize(width, height);
            renderer.setClearColor(0xb9d3ff, 1);

            document.getElementById('keyframeTrack').append(renderer.domElement);
            renderer.render(scene, camera);

            // 创建时钟对象
            let clock = new THREE.Clock();
            let render = () => {
                renderer.render(scene, camera);
                requestAnimationFrame(render);

                //clock.getDelta()方法获得两帧的时间间隔
                // 更新混合器相关的时间
                mixer.update(clock.getDelta());
            };

            render();
        },
    },
    mounted() {
        this.init();
    },
};
</script>

<style>
</style>