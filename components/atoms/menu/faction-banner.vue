<template>
    <nuxt-link v-if="isLink" class="faction-banner" :to="`/faction/${faction.id}`" :alt="faction.name">
        <img :src="`/images/factions/${faction.banner}`" :alt="faction.name" />
    </nuxt-link>
    <div v-else class="faction-banner">
        <img :src="`/images/factions/${faction.banner}`" :alt="faction.name" />
    </div>
</template>

<script>
export default {
    name: 'faction-banner',

    props: ['faction', 'isLink']
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
