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
            // let geometry = new THREE.BoxGeometry(30, 30, 30);
            // let material = new THREE.MeshLambertMaterial({
            //     color: 0x0000ff,
            // });
            // let group = new THREE.Group();
            // let mesh = new THREE.Mesh(geometry, material);
            // let mesh1 = new THREE.Mesh(geometry, material);
            // mesh1.name = '眼睛';
            // mesh1.translateX(40);
            // group.add(mesh, mesh1);
            // scene.add(group);

            // // 移除对象
            // // group.remove(mesh);

            // group.name = '头';

            // group.translateY(100);
            // group.scale.set(2, 2, 2);

            // console.log(group);

            // 球体网格模型创建函数
            function sphereMesh(R, x, y, z) {
                var geometry = new THREE.SphereGeometry(R, 25, 25); //球体几何体
                var material = new THREE.MeshPhongMaterial({
                    color: 0x0000ff,
                }); //材质对象Material
                var mesh = new THREE.Mesh(geometry, material); // 创建网格模型对象
                mesh.position.set(x, y, z);
                return mesh;
            }
            // 圆柱体网格模型创建函数
            function cylinderMesh(R, h, x, y, z) {
                var geometry = new THREE.CylinderGeometry(R, R, h, 25, 25); //球体几何体
                var material = new THREE.MeshPhongMaterial({
                    color: 0x0000ff,
                }); //材质对象Material
                var mesh = new THREE.Mesh(geometry, material); // 创建网格模型对象
                mesh.position.set(x, y, z);
                return mesh;
            }

            // 头部网格模型和组
            var headMesh = sphereMesh(10, 0, 0, 0);
            headMesh.name = '脑壳';
            var leftEyeMesh = sphereMesh(1, 8, 5, 4);
            leftEyeMesh.name = '左眼';
            var rightEyeMesh = sphereMesh(1, 8, 5, -4);
            rightEyeMesh.name = '右眼';
            var headGroup = new THREE.Group();
            headGroup.name = '头部';
            headGroup.add(headMesh, leftEyeMesh, rightEyeMesh);
            // 身体网格模型和组
            var neckMesh = cylinderMesh(3, 10, 0, -15, 0);
            neckMesh.name = '脖子';
            var bodyMesh = cylinderMesh(14, 30, 0, -35, 0);
            bodyMesh.name = '腹部';
            var leftLegMesh = cylinderMesh(4, 60, 0, -80, -7);
            leftLegMesh.name = '左腿';
            var rightLegMesh = cylinderMesh(4, 60, 0, -80, 7);
            rightLegMesh.name = '右腿';
            var legGroup = new THREE.Group();
            legGroup.name = '腿';
            legGroup.add(leftLegMesh, rightLegMesh);
            var bodyGroup = new THREE.Group();
            bodyGroup.name = '身体';
            bodyGroup.add(neckMesh, bodyMesh, legGroup);
            // 人Group
            var personGroup = new THREE.Group();
            personGroup.name = '人';
            personGroup.add(headGroup, bodyGroup);
            personGroup.translateY(50);
            scene.add(personGroup);

            scene.traverse(function (obj) {
                if (obj.type === 'Group') {
                    console.log(obj.name);
                }
                if (obj.type === 'Mesh') {
                    console.log('  ' + obj.name);
                    obj.material.color.set(0xffff00);
                }
                if ((obj.name === '左眼') | (obj.name === '右眼')) {
                    obj.material.color.set(0x000000);
                }
                // 打印id属性
                console.log(obj.id);
                // 打印该对象的父对象
                console.log(obj.parent);
                // 打印该对象的子对象
                console.log(obj.children);
            });

            // 遍历查找scene中复合条件的子对象，并返回id对应的对象
            var idNode = scene.getObjectById(4);
            console.log(idNode);

            // 遍历查找对象的子对象，返回name对应的对象（name是可以重名的，返回第一个）
            var nameNode = scene.getObjectByName('左腿');
            nameNode.material.color.set(0xff0000);

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

            console.log(scene);

            // 创建控制器
            // let controls = new THREE.OrbitControls(camera, renderer.domElement);
            // controls.addEventListener('change', render);
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
