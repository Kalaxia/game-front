<template>
    <a :href="`/views/${link}`">
        <img :src="`/static/images/picto/${image}`" />
    </a>
</template>

<script>
export default {
    name: 'menu-item',

    props: ['link', 'image', 'color', 'implemented']
}
</script>

<style lang="less" scoped>
    a {
        &:hover, &.active {
            box-shadow: 0px 25px 10px rgba(255, 255, 255, 0.6);
        }
    }

    img {
        height: 36px;
    }
</style>
