<template>
    <div>
        <minimap :map="map" />
        <starmap :map="map" :playerPlanets="playerPlanets" :fleets="fleets" />
        <journey-planer v-if="journey" />
    </div>
</template>

<script>
import Starmap from '~/components/organisms/map/starmap';
import Minimap from '~/components/molecules/map/minimap';
import JourneyPlaner from '~/components/molecules/map/journey-planer';
import JourneyStep from '~/components/molecules/map/journey-step';
import JourneyRange from '~/components/molecules/map/journey-range';

import Journey from '~/model/fleet/journey';

export default {
    name: 'page-map',

    async asyncData ({ app, params }) {
        const [ map, fleets ] = await Promise.all([
            app.$repositories.map.getMap(),
            app.$repositories.fleet.getTravellingFleets()
        ]);
        return { map, fleets };
    },

    components: {
        Starmap,
        Minimap,
        JourneyPlaner,
        JourneyStep,
        JourneyRange
    },

    beforeMount() {
        this.$store.commit('user/screenDimensions', {
            width: window.innerWidth,
            height: window.innerHeight
        });
    },

    async mounted() {
        this.$store.commit('map/setSize', this.map.size);

        if (this.currentPlanet !== null) {
            this.$store.commit('map/setTargetedSystemId', this.currentPlanet.system.id);
        }
        if (this.$route.query.id) {
            const fleet = await this.$repositories.fleet.getFleet(this.$route.query.id);
            // fleet.range = await this.$repositories.fleet.getFleetRange(fleet);
            fleet.range = this.$resources.journey_range;
            fleet.journey = new Journey({
                id: null,
                created_at: Date.now(),
                ended_at: Date.now()
            });
            this.$store.commit('map/setFleet', fleet);
        }
    },

    async beforeRouteUpdate(to, from, next) {
        if (to.query.id) {
            const fleet = await this.$repositories.fleet.getFleet(to.query.id);
            // fleet.range = await this.$repositories.fleet.getFleetRange(fleet);
            fleet.range = this.$resources.journey_range;
            fleet.journey = new Journey({
                id: null,
                created_at: Date.now(),
                ended_at: Date.now()
            });
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
        journey() {
            return (this.$store.state.map.fleet !== null) ? this.$store.state.map.fleet.journey : null;
        },

        playerPlanets() {
            return this.$store.state.user.planets;
        },

        currentPlanet() {
            return this.$store.state.user.currentPlanet;
        }
    },

    watch: {
        currentPlanet(planet) {
            this.$store.commit('map/setTargetedSystemId', planet.system.id);
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

    #minimap {
        grid-column: ~"1/3";
        grid-row: ~"1/3";
    }

    #starmap {
        grid-column: ~"1/11";
        grid-row: ~"1∕11";
    }

    #journey-planer {
        grid-column: ~"1/3";
        grid-row: ~"1/7";
        z-index: 3;
        .unselectable
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