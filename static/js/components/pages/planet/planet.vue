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
import Planet from '../../../model/planet';

import PlanetData from '../../molecules/planet/data';
import PlanetShape from '../../atoms/planet/shape';
import PlanetBuildings from '../../molecules/planet/buildings';
import PlanetRelations from '../../molecules/planet/relations';
import PlanetResources from '../../molecules/planet/resources';

export default {
    name: 'page-planet',

    data: function() {
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
        const response = await fetch(`/api/planets/${this.$route.params.id}`, {
            method: 'GET',
            headers: this.$store.state.api.headers
        });
        const payload = { response, data: {}};
        await this.$store.dispatch('api/responseMiddleware', payload);

        this.planet = new Planet(payload.data);
    }
}
</script>

<style lang="less" scoped>
    @import '../../../../less/main.less';

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