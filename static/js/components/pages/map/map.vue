<template>
    <div>
        <minimap :map="map" />
        <starmap :map="map" />
        <journey-planer v-if="journey" />
    </div>
</template>

<script>
import Starmap from '../../organisms/map/starmap';
import Minimap from '../../molecules/map/minimap';
import JourneyPlaner from '../../molecules/fleet/journey-planer';
import JourneyStep from '../../molecules/fleet/journey-step';
import JourneyRange from '../../molecules/fleet/journey-range';

import Journey from '../../../model/fleet/journey';

import { getMap } from '../../../api/map';
import { getFleet, getFleetRange } from '../../../api/fleet';

export default {
    name: 'page-map',

    data: function() {
        return {
            map: null,
        };
    },

    components: {
        Starmap,
        Minimap,
        JourneyPlaner,
        JourneyStep,
        JourneyRange
    },

    mounted: async function() {
        this.map = await getMap();

        this.$store.commit('map/setSize', this.map.size);

        if (this.$route.query.id) {
            this.$store.state.map.fleet = await getFleet(this.$route.query.id);
            await getFleetRange(this.$store.state.map.fleet);
            this.$store.state.map.fleet.journey = new Journey({
                id: null,
                created_at: Date.now(),
                ended_at: Date.now()
            });
        }
    },

    beforeRouteUpdate: async function(to, from, next) {
        if (to.query.id) {
            this.$store.state.map.fleet = await getFleet(to.query.id);
            await getFleetRange(this.$store.state.map.fleet);
            this.$store.state.map.fleet.journey = new Journey({
                id: null,
                created_at: Date.now(),
                ended_at: Date.now()
            });
        } else {
            this.$store.state.map.fleet = null;
        }
        next();
    },

    beforeRouteLeave: async function(to, from, next) {
        this.$store.state.map.fleet = null;
        
        next();
    },

    computed: {
        journey: function() {
            if (this.$store.state.map.fleet === null) {
                return null;
            }
            return this.$store.state.map.fleet.journey;
        }
    }
}
</script>

<style lang="less">
    body {
        overflow: hidden;
    }

    #wrapper {
        -webkit-user-select: none;
        user-select: none;
    }
</style>

<style lang="less" scoped>
    #minimap {
        grid-column: ~"1/3";
        grid-row: ~"1/3";
    }

    #starmap {
        grid-column: ~"1/11";
        grid-row: ~"1∕11";
    }

    #journey-planer {
        grid-column: 1;
        grid-row: 1;
        z-index: 3;
        .unselectable
    }

    .top-menu {
        z-index: 3;
        .unselectable
    }

    .bottom-menu {
        z-index: 3;
        .unselectable
    }

    .unselectable {
        -webkit-user-select: none;
        user-select: none;
    }
</style>