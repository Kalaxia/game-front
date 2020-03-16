<template>
    <div>
        <minimap :map="map"
            :posX="posX"
            :posY="posY"
            :territories="territories"
            :scale="minimapScale"
            @moveTo="updatePosition($event)" />
        
        <starmap ref="starmap"
            :map="map"
            :posX="posX"
            :posY="posY"
            :territories="territories"
            :playerPlanets="planets"
            :fleets="fleets"
            @updatePosition="updatePosition($event)"
            @selectTerritory="selectedTerritory = $event" />

        <journey-planer v-if="journey"
            @sendFleet="onFleetDeparture()" />

        <territory-panel v-if="selectedTerritory"
            :territory="selectedTerritory"
            @close="selectedTerritory = null" />
    </div>
</template>

<script>
import Starmap from '~/components/organisms/map/starmap';
import Minimap from '~/components/organisms/map/minimap';
import JourneyPlaner from '~/components/molecules/map/journey-planer';
import JourneyStep from '~/components/molecules/map/journey-step';
import JourneyRange from '~/components/molecules/map/journey-range';
import TerritoryPanel from '~/components/organisms/map/territory-panel';

import Journey from '~/model/fleet/journey';

import { mapState } from 'vuex';

export default {
    name: 'page-map',

    async asyncData ({ app, params }) {
        const [ map, territories, fleets ] = await Promise.all([
            app.$repositories.map.getMap(),
            app.$repositories.map.getTerritories(),
            app.$repositories.fleet.getTravellingFleets()
        ]);
        return { map, territories, fleets };
    },

    data() {
        return {
            minimapScale: 2,
            selectedTerritory: null,
            posX: 0,
            posY: 0
        };
    },

    components: {
        Starmap,
        Minimap,
        JourneyPlaner,
        JourneyStep,
        JourneyRange,
        TerritoryPanel
    },

    async mounted() {
        this.$store.commit('map/setSize', this.map.size);

        if (this.currentPlanet !== null) {
            this.$store.commit('map/setTargetedSystemId', this.currentPlanet.system.id);
        }
        if (this.$route.query.id) {
            const fleet = await this.$repositories.fleet.getFleet(this.$route.query.id);
            if (fleet.journey === null) {
                fleet.range = this.$resources.journey_range;
                fleet.journey = new Journey({
                    id: null,
                    created_at: Date.now(),
                    ended_at: Date.now(),
                    current_step: null,
                });
            }
            this.$store.commit('map/setFleet', fleet);
        }
    },

    async beforeRouteUpdate(to, from, next) {
        if (to.query.id) {
            const fleet = await this.$repositories.fleet.getFleet(to.query.id);
            
            if (fleet.journey === null) {
                fleet.range = this.$resources.journey_range;
                fleet.journey = new Journey({
                    id: null,
                    created_at: Date.now(),
                    ended_at: Date.now(),
                    current_step: null,
                });
            }
            this.$store.commit('map/setFleet', fleet)
        } else {
            this.$store.commit('map/setFleet', null);
        }
        next();
    },

    async beforeRouteLeave(to, from, next) {
        this.$store.commit('map/setFleet', null);
        
        next();
    },

    computed: {
        ...mapState('user', ['planets', 'currentPlanet']),
        ...mapState('map', ['fleet', 'scale']),

        journey() {
            return (this.fleet !== null) ? this.fleet.journey : null;
        },
    },

    watch: {
        currentPlanet(planet) {
            this.$store.commit('map/setTargetedSystemId', planet.system.id);
        }
    },

    methods: {
        onFleetDeparture(fleet) {
            this.fleets.push(this.fleet);

            this.$store.commit('map/setFleet', null);
        },

        updatePosition(coords) {
            this.posX = coords.x;
            this.posY = coords.y;
        }
    }
}
</script>

<style lang="less">
    body {
        overflow: hidden;
    }

    #wrapper {
        .unselectable
    }

    .minimap {
        grid-column: ~"1/3";
        grid-row: ~"1/3";
        z-index: 3;
    }

    #starmap {
        grid-column: ~"1/11";
        grid-row: ~"1∕11";
    }

    #journey-planer {
        grid-column: ~"9/11";
        grid-row: ~"2/8";
        z-index: 3;
        .unselectable
    }

    .territory-panel {
        grid-column: ~"8/11";
        grid-row: ~"3/7";
        z-index: 3;
    }

    .top-menu {
        z-index: 3;
        .unselectable
    }

    #planet-menu,
    #player-menu {
        z-index: 3;
        .unselectable
    }

    .unselectable {
        -webkit-user-select: none;
        user-select: none;
    }
</style>