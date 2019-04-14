<template>
    <div>
        <minimap :map="map" />
        <starmap :map="map" :playerPlanets="playerPlanets" />
        <journey-planer v-if="journey" />
    </div>
</template>

<script>
import Starmap from '~/components/organisms/map/starmap';
import Minimap from '~/components/molecules/map/minimap';
import JourneyPlaner from '~/components/molecules/fleet/journey-planer';
import JourneyStep from '~/components/molecules/fleet/journey-step';
import JourneyRange from '~/components/molecules/fleet/journey-range';

import Journey from '~/model/fleet/journey';

export default {
    name: 'page-map',

    data() {
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

    async mounted() {
        this.map = await this.$repositories.map.getMap();

        this.$store.commit('map/setSize', this.map.size);

        if (this.currentPlanet !== null) {
            this.$store.commit('map/setTargetedSystemId', this.currentPlanet.system.id);
        }
        if (this.$route.query.id) {
            const fleet = await this.$repositories.fleet.getFleet(this.$route.query.id);
            fleet.range = await this.$repositories.fleet.getFleetRange(fleet);
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
            await this.$repositories.fleet.getFleetRange(fleet);
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