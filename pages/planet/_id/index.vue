<template>
    <div>
        <planet-data :planet="planet" />
        <planet-resources v-if="planet" :planet="planet" />
        <planet-shape v-if="planet" :id="planet.id" :type="planet.type" width="300" height="300" />
        <planet-buildings :planet="planet" />
        <planet-relations v-if="planet" :planet="planet" width="300" height="300" />
    </div>
</template>

<script>
import Planet from '~/model/planet';

import PlanetData from '~/components/molecules/planet/data';
import PlanetShape from '~/components/atoms/planet/shape';
import PlanetBuildings from '~/components/molecules/planet/buildings';
import PlanetRelations from '~/components/molecules/planet/relations';
import PlanetResources from '~/components/molecules/planet/resources';

export default {
    name: 'page-planet',

    data() {
        return {
            planet: null
        };
    },

    components: {
        PlanetData,
        PlanetShape,
        PlanetBuildings,
        PlanetRelations,
        PlanetResources
    },

    async mounted() {
        this.planet = await this.$repositories.planet.get(this.$route.params.id);
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

    #planet-resources {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        grid-row: ~"4/8";
        grid-column: ~"1/4";
        padding-left: 20px;

        & a {
            margin-bottom: 10px;
        }

        & img {
            width: 48px;
            margin: 5px 0px;
        }
    }
</style>