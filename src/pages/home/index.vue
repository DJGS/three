<template>
    <div class="home">
        <div class="demo-item">
            <router-link to="/cube">
                正方体
            </router-link>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.home {
    width: 100%;
    height: 100%;

    .demo-item {
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