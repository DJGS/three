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

            // 圆弧线
            let geomery = new THREE.Geometry();
            let arc = new THREE.ArcCurve(0, 0, 150, 0, 2 * Math.PI);
            let points = arc.getPoints(50); //分段数50，返回51个顶点
            geomery.setFromPoints(points);
            let material = new THREE.LineBasicMaterial({
                color: 0x000000,
            });
            let line = new THREE.Line(geomery, material);
            scene.add(line);

            // 绘制直线
            let geometry1 = new THREE.Geometry();
            let p1 = new THREE.Vector3(50, 0, 0);
            let p2 = new THREE.Vector3(0, 70, 0);
            geometry1.vertices.push(p1, p2);
            let line1 = new THREE.Line(geometry1, material);
            scene.add(line1);

            var geometry2 = new THREE.Geometry(); //声明一个几何体对象Geometry
            // 三维样条曲线  Catmull-Rom算法
            var curve = new THREE.CatmullRomCurve3([
                new THREE.Vector3(-50, 20, 90),
                new THREE.Vector3(-10, 40, 40),
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(60, -60, 0),
                new THREE.Vector3(70, 0, 80),
            ]);
            //getPoints是基类Curve的方法，返回一个vector3对象作为元素组成的数组
            var points2 = curve.getPoints(100); //分段数100，返回101个顶点
            // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
            geometry2.setFromPoints(points2);
            //材质对象
            var material2 = new THREE.LineBasicMaterial({
                color: 0x000000,
            });
            //线条模型对象
            var line2 = new THREE.Line(geometry2, material2);
            scene.add(line2); //线条对象添加到场景中

            // 管道生成
            let path = new THREE.CatmullRomCurve3([
                new THREE.Vector3(-10, -50, -50),
                new THREE.Vector3(10, 0, 0),
                new THREE.Vector3(8, 50, 50),
                new THREE.Vector3(-5, 0, 100),
            ]);
            let geometry3 = new THREE.TubeGeometry(path, 40, 5, 25);
            var line3 = new THREE.Line(geometry3, material2);
            scene.add(line3);

            // 旋转造型
            let points4 = [
                new THREE.Vector2(50, 60),
                new THREE.Vector2(25, 0),
                new THREE.Vector2(50, -60),
            ];
            let geometry4 = new THREE.LatheGeometry(points4, 500);
            let material4 = new THREE.MeshPhongMaterial({
                color: 0x0000ff,
                side: THREE.DoubleSide,
                wireframe: true,
            });
            let mesh4 = new THREE.Mesh(geometry4, material4);
            scene.add(mesh4);

            let shape = new THREE.Shape(); //创建Shape对象
            let points5 = [
                //定位定点
                new THREE.Vector2(100, 110),
                new THREE.Vector2(80, 20),
                new THREE.Vector2(100, -110),
            ];
            shape.splineThru(points5); //顶点带入样条插值计算函数
            let splinePoints = shape.getPoints(20); //插值计算细分数20
            let geometry5 = new THREE.LatheGeometry(splinePoints, 30); //旋转造型
            let mesh5 = new THREE.Mesh(geometry5, material4);
            scene.add(mesh5);

            // 拉伸型网格模型
            /**
             * 创建拉伸网格模型
             */
            let shape1 = new THREE.Shape();
            /**四条直线绘制一个矩形轮廓*/
            shape1.moveTo(0, 0); //起点
            shape1.lineTo(0, 100); //第2点
            shape1.lineTo(100, 100); //第3点
            shape1.lineTo(100, 0); //第4点
            shape1.lineTo(0, 0); //第5点
            var geometry6 = new THREE.ExtrudeGeometry( //拉伸造型
                shape1, //二维轮廓
                //拉伸参数
                {
                    amount: 120, //拉伸长度
                    bevelEnabled: false, //无倒角
                }
            );

            var material6 = new THREE.PointsMaterial({
                color: 0x0000ff,
                size: 5.0, //点对象像素尺寸
            }); //材质对象
            var mesh6 = new THREE.Points(geometry6, material6); //点模型对象
            scene.add(mesh6); //点模型添加到场景中

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
            camera.position.set(0, 0, 100);
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
