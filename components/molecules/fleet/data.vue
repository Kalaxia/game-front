<template>
    <div v-if="fleet.journey">
        
    </div>
    <div v-else-if="fleet.place && fleet.place.planet">
        <planet-image :type="fleet.place.planet.type" width="86" height="86" />
        <span>{{ $t('fleet.statuses.idle', { location: fleet.place.planet.name }) }}</span>
    </div>
</template>

<script>
import PlanetImage from '~/components/atoms/planet/image';

export default {
    name: 'fleet-data',
    
    props: ['fleet'],

    components: {
        PlanetImage
    }
}
</script>

<style lang="less" scoped>
    div {
        display: flex;
        align-items: center;
    }

    span {
        padding-left: 20px;
    }
</style>
