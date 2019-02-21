<template>
    <router-link class="faction-banner" :to="`/faction`" :alt="faction.name">
        <img :src="`/images/factions/${faction.banner}`" :alt="faction.name" />
    </router-link>
</template>

<script>
export default {
    name: 'faction-banner',

    props: ['faction']
}
</script>

<style lang="less" scoped>
    .faction-banner {
        & > img {
            width: 84px;
            height: 84px;
        }
    }
</style>
