<template>
    <div id="star" />
</template>

<script>
import * as THREE from 'three';
window.THREE = THREE;

export default {
    methods: {
        init() {
            let stars = [];
            let colors = ['#0952BD', '#A5BFF0', '#118CD6', '#1AAEE8', '#ffffff'];

            let scene = (scene = new THREE.Scene());
            scene.fog = new THREE.Fog(0x000000, 0.015, 72);

            let camera = new THREE.PerspectiveCamera(
                75,
                window.innerWidth / window.innerHeight,
                0.1,
                1000
            );
            camera.position.z = 55;

            let renderer = new THREE.WebGLRenderer({
                preserveDrawingBuffer: true,
                alpha: true,
            });

            renderer.sortObjects = false;
            renderer.autoClearColor = false;
            renderer.setClearColor('#000', 1);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);

            document.getElementById('star').append(renderer.domElement);

            for (let i = 0; i < 500; i++) {
                let geometry = new THREE.SphereBufferGeometry(0.12 * Math.random(), 10, 10);
                let material = new THREE.MeshBasicMaterial({
                    color: colors[Math.floor(Math.random() * colors.length)],
                    shading: THREE.FlatShading,
                });

                let star = new THREE.Mesh(geometry, material);

                star.position.x = Math.random() * 100 - 50;
                star.position.y = Math.random() * 100 - 50;
                star.position.z = Math.random() * 50 - 25;

                scene.add(star);
                stars.push(star);
            }

            //  遮罩层
            let planeGeometry = new THREE.PlaneGeometry(1000, 500, 1, 1);
            let planeMaterial = new THREE.MeshBasicMaterial({
                color: 0x000000,
                transparent: true,
                opacity: 1,
            });

            let planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

            scene.add(planeMesh);

            function render() {
                requestAnimationFrame(render);
                renderer.render(scene, camera);

                for (var i = 0; i < stars.length; i++) {
                    stars[i].position.z += 0.09;

                    if (stars[i].position.z >= 60) {
                        stars[i].position.x = Math.random() * 100 - 50;
                        stars[i].position.y = Math.random() * 100 - 50;
                        stars[i].position.z = 5;
                    }
                }

                if (activated == true) {
                    planeMesh.material.opacity = 0.01;
                } else {
                    if (planeMesh.material.opacity < 1) {
                        planeMesh.material.opacity += 0.01;
                    }
                }
            }

            render();

            var activated = false;

            window.addEventListener('mousedown', () => {
                activated = true;
            });

            window.addEventListener('mouseup', () => {
                activated = false;
            });

            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });

            window.addEventListener('touchstart', () => {
                activated = true;
            });

            window.addEventListener('touchend', () => {
                activated = false;
            });
        },
    },

    mounted() {
        this.init();
    },
};
</script>

<style lang="scss">
</style>