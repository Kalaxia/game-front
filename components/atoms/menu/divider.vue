<template>
    <div class="menu-divider">
        <div class="upper" :style="{ backgroundColor: color }"></div>
    </div>
</template>

<script>
export default {
    name: 'menu-divider',

    props: ['color']
}
</script>

<style lang="less">
.menu-divider {
    position: relative;
    width: 10px;
    height: 72px;
    margin-top: 5px;
    margin-bottom: -5px;

    & > .upper {
        width: 10px;
        height: 72px;
        mask-repeat: no-repeat;
        mask-position: center bottom;
        mask-image: url('/images/layout/top_menu_vertical_upper_empty.png');
    }

    &::before {
        position: absolute;
        width: 10px;
        height: 72px;
        background-image: url('/images/layout/top_menu_vertical_lower.png');
        background-repeat: no-repeat;
        background-position: center bottom;
        content: ' ';
    }
}
</style>