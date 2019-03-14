<template>
    <div>
        <population-points v-if="planet" />
    </div>
</template>

<script>
import PopulationPoints from '~/components/organisms/planet/population-points';

export default {
    name: 'page-planet-population',

    components: {
        PopulationPoints
    },

    computed: {
        planet() {
            return this.$store.state.user.currentPlanet;
        }
    }
};
</script>

<style lang="less" scoped>
    #population-points {
        grid-column: ~"2/6";
        grid-row: ~"3/9";
    }
</style>
