<template>
    <a class="faction-banner" href="/views/faction" :alt="faction.name">
        <img :src="`/static/images/factions/${faction.banner}`" :alt="faction.name" />
    </a>
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
