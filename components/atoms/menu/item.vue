<template>
    <router-link v-if="link" :to="link">
        <img :src="`/images/picto/${image}`" />
    </router-link>
    <a v-else href="#" @click="notImplemented">
        <img :src="`/images/picto/${image}`" />
    </a>
</template>

<script>
export default {
    name: 'menu-item',

    props: ['link', 'image', 'color'],

    methods: {
        notImplemented: function() {
            alert(this.$i18n.t('alerts.not_implemented'));
        }
    }
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
