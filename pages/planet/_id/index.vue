<template>
    <div>
        <planet-shape v-if="planet" :id="planet.id" :type="planet.type" width="300" height="300" />
        <planet-buildings v-if="isCurrentPlanet" :planet="planet" />
        <planet-relations v-if="planet" :planet="planet" width="300" height="300" />
    </div>
</template>

<script>
import Planet from '~/model/planet';

import PlanetShape from '~/components/atoms/planet/shape';
import PlanetBuildings from '~/components/molecules/planet/buildings';
import PlanetRelations from '~/components/molecules/planet/relations';

export default {
    name: 'page-planet',

    data() {
        return {
            planet: null
        };
    },

    components: {
        PlanetShape,
        PlanetBuildings,
        PlanetRelations
    },

    async mounted() {
        this.planet = await this.$repositories.planet.get(this.$route.params.id);
    },

    computed: {
        isCurrentPlanet() {
            return this.planet !== null && this.planet.id === this.$store.state.user.currentPlanet.id;
        }
    }
}
</script>

<style lang="less" scoped>
    .shape {
        position: absolute !important;
        top: calc(50% - 150px);
        left: calc(50% - 150px);
    }

    .planet-relations {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex-direction: column;
        grid-row: ~"4/8";
        grid-column: ~"8/11";
    }
</style>