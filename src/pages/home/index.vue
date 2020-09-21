<template>
    <div class="home">
        <div class="demo-item">
            <router-link to="/cube"> 正方体 </router-link>
        </div>
        <div class="demo-item">
            <router-link to="/vertex"> 顶点 </router-link>
        </div>
        <div class="demo-item">
            <router-link to="/material"> 材质 </router-link>
        </div>
        <div class="demo-item">
            <router-link to="/group"> 层级结构 </router-link>
        </div>
        <div class="demo-item">
            <router-link to="/curve"> 弧线 </router-link>
        </div>
        <div class="demo-item">
            <router-link to="/texture"> 贴图 </router-link>
        </div>
        <div class="demo-item">
            <router-link to="/keyframeTrack"> 关键帧 </router-link>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.home {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;

    .demo-item {
        flex: 0 0 auto;
        width: 100px;
        height: 50px;
        margin: 10px;
        text-align: center;
        line-height: 50px;
        border: 1px solid #ccc;
        border-radius: 10px;
    }
}
</style>
