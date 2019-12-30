<template>
    <nuxt-link :class="['menu-item', { active: $route.path == link }]" v-if="link" :to="link">
        <div :style="{ maskImage: `url('/images/picto/${image}')`, backgroundColor: color }"></div>
    </nuxt-link>
    <a v-else class="menu-item" href="#" @click="notImplemented">
        <div :style="{ maskImage: `url('/images/picto/${image}')`, backgroundColor: color }"></div>
    </a>
</template>

<script>
export default {
    name: 'menu-item',

    props: ['link', 'image', 'color'],

    methods: {
        notImplemented() {
            alert(this.$i18n.t('alerts.not_implemented'));
        }
    }
}
</script>

<style lang="less" scoped>
    .menu-item {
        position: relative;
        min-height: 64px;
        flex-grow: 1;
        text-align: center;
        background-image: url('/images/layout/top_menu_horizontal_lower.png');
        background-repeat: no-repeat;
        background-position: bottom;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 5px;
        padding-bottom: 5px;

        &:not(:hover):not(.active) {
            & > div {
                background-color: #EAECEC !important;
            }
        }

        &::before,
        &::after {
            position: absolute;
            flex: 1;
            left: 0px;
            bottom: 1px;
            content: ' ';
            border-bottom: 1.5px solid #EAECEC;
        }

        &::after {
            left: auto;
            right: 0px;
        }

        & > div {
            mask-repeat: no-repeat;
            mask-size: contain;
            mask-position: center;
            transition: background-color 0.2s ease-out;
            width: 30px;
            height: 30px;
        }
    }
</style>
