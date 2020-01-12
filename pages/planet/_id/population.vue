<template>
    <div v-if="currentPlanet">
        <population-points />
        <public-order />
        <planet-taxes />
    </div>
</template>

<script>
import PopulationPoints from '~/components/organisms/planet/population-points';
import PublicOrder from '~/components/organisms/planet/public-order';
import PlanetTaxes from '~/components/organisms/planet/taxes';
import { mapState } from 'vuex';

export default {
    name: 'page-planet-population',

    components: {
        PopulationPoints,
        PublicOrder,
        PlanetTaxes
    },

    computed: {
        ...mapState('user', ['currentPlanet'])
    }
};
</script>

<style lang="less" scoped>
    #population-points {
        grid-column: ~"2/6";
        grid-row: ~"3/9";
    }

    .public-order {
        grid-column: ~"7/10";
        grid-row: ~"3/5";
    }

    .planet-taxes {
        grid-column: ~"7/10";
        grid-row: ~"6/9";
    }
</style>
