<template>
    <router-link :to="`/planet/${planet.id}/production`">{{ $t('planet.production') }}</router-link>
</template>

<script>
export default {
    name: 'resource-production-link',

    props: ['planet']
}
</script>

<style lang="less" scoped>
    a {
        width: 200px;
        display: block;
        text-decoration: none;
        text-align: center;
        border-radius: 1000px;
        border: 5px solid #EFEFEF;
        color: #EFEFEF;
        font-variant: small-caps;
        font-family: Electrolize, sans-serif;

        &:hover {
            background-color: #EFEFEF;
            color: #090A0A;
        }
    }
</style>
