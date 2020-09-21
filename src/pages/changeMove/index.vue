<template>
    <div id="changeMove" />
</template>

<script>
import * as THREE from 'three';
window.THREE = THREE;

export default {
    methods: {
        init() {
            let scene = new THREE.Scene();

            let geometry = new THREE.BoxGeometry(50, 50, 50);
            let box1 = new THREE.BoxGeometry(100, 5, 100);
            let box2 = new THREE.BoxGeometry(5, 200, 5);

            geometry.morphTargets[0] = { name: 'target1', vertices: box1.vertices };
            geometry.morphTargets[1] = { name: 'target2', vertices: box2.vertices };

            let material = new THREE.MeshLambertMaterial({
                morphTargets: true,
                color: 0x0000ff,
            });

            let mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            mesh.morphTargetInfluences[0] = 0.5;
            mesh.morphTargetInfluences[1] = 1;

            let track1 = new THREE.KeyframeTrack(
                '.morphTargetInfluences[0]',
                [0, 10, 20],
                [0, 1, 0]
            );
            let track2 = new THREE.KeyframeTrack(
                '.morphTargetInfluences[1]',
                [20, 30, 40],
                [0, 1, 0]
            );
            let clip = new THREE.AnimationClip('default', 40, [track1, track2]);

            let mixer = new THREE.AnimationMixer(mesh);
            let animation = mixer.clipAction(clip);
            animation.timeScale = 5;
            animation.play();

            // 光源
            let light = new THREE.PointLight(0xffffff);
            light.position.set(400, 200, 300);
            scene.add(light);

            // 环境光
            let ambient = new THREE.AmbientLight(0x666666);
            scene.add(ambient);

            // 相机
            let width = window.innerWidth;
            let height = window.innerHeight;
            let s = 200;
            let k = width / height;
            let camera = new THREE.OrthographicCamera(-s * k, s * k, -s, s, 1, 1000);
            camera.position.set(200, 300, 200);
            camera.lookAt(scene.position);

            let renderer = new THREE.WebGLRenderer();
            document.getElementById('changeMove').append(renderer.domElement);
            renderer.setSize(width, height);
            renderer.setClearColor(0x9bd3ff, 1);

            let clock = new THREE.Clock();
            let render = () => {
                renderer.render(scene, camera);
                requestAnimationFrame(render);

                mixer.update(clock.getDelta());
            };

            console.log(geometry);
            console.log(geometry.toJSON());
            console.log(scene.toJSON());

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