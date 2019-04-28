<template>
    <nuxt-link :to="`/planet/${planet.id}/production`" class="button" :style="{ color: factionColors['main'] }">
        <span>{{ $t('planet.production') }}</span>
    </nuxt-link>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'resource-production-link',

    props: ['planet'],

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        })
    }
}
</script>

<style lang="less" scoped>
    @import '~less/atoms/button.less';
</style>
