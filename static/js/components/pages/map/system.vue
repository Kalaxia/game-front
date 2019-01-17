<template>
    <div>
        <PlanetsList :system="system" />
        <PlanetsGraph :system="system" />
    </div>
</template>

<script>
import { getSystem } from '../../../api/map';

import PlanetsList from '../../organisms/map/planets-list';
import PlanetsGraph from '../../organisms/map/planets-graph';

export default {
    name: 'page-system',
    
    data: function() {
        return {
            system: null
        };
    },

    components: {
        PlanetsList,
        PlanetsGraph
    },

    mounted: async function() {
        this.system = await getSystem(this.$route.params.id);
    },

    beforeRouteUpdate: async function(to, from, next) {
        this.system = await getSystem(to.params.id);

        next();
    }
}
</script>

<style lang="less" scoped>
    #planets-list {
        grid-column: ~"2/6";
        grid-row: ~"2/9";
    }

    #planets-graph {
        position: relative;
        grid-column: ~"6/10";
        grid-row: ~"3/9";
    }

    @media (max-width: 1400px) {
        #planets-list {
            grid-column: ~"3/9";
        }

        #planets-graph {
            display: none;
        }
    }
</style>
