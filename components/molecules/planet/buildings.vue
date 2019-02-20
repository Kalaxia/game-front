<template>
    <div v-if="planet">
        <building-item v-for="building in planet.buildings" :building="building" :key="building.id" />
        <building-item v-if="canConstruct" />
    </div>
</template>

<script>
import BuildingItem from '~/components/atoms/planet/building-item';

export default {
    name: 'planet-buildings',

    props: ['planet'],

    components: {
        BuildingItem
    },

    computed: {
        canConstruct: function() {
            return this.planet.nb_buildings > this.planet.buildings.length;
        }
    }
}
</script>

<style lang="less" scoped>
    div {
        grid-column: ~"3/9";
        grid-row: ~"8/10";
        display:flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        padding: 5px 10px;
    }
</style>
