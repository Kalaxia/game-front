<template>
    <div>
        <fleets-list :fleets="fleets" type="all" @selectFleet="selectedFleet = $event" />
        <combat-reports v-if="!selectedFleet" :reports="reports" />
        <template v-else>
            <div v-if="selectedFleet.journey" id="fleet-journey-details">
                <fleet-journey-step :step="selectedFleet.journey.currentStep" />
            </div>
            <div v-else-if="selectedFleet.place.planet" id="fleet-location">
                <h4>{{ $t('fleet.statuses.idle', { location: selectedFleet.place.planet.name }) }}</h4>
                <planet-image :type="selectedFleet.place.planet.type" :width="64" :height="64" @click.native="goToPlanet(selectedFleet.place.planet)" />
            </div>
            <fleet-composition :fleet="selectedFleet" />
            <fleet-details
                :fleets="fleets"
                :fleet="selectedFleet"
                @selectFleet="selectedFleet = $event"
                @unselect="selectedFleet = null" />
        </template>
    </div>
</template>

<script>
import PlanetImage from '~/components/atoms/planet/image';
import Fleet from '~/model/fleet/fleet';
import FleetsList from '~/components/organisms/fleet/list';
import CombatReports from '~/components/organisms/combat-report/list';
import FleetComposition from '~/components/organisms/fleet/composition';
import FleetDetails from '~/components/organisms/fleet/details';
import FleetJourneyStep from '~/components/molecules/fleet/journey-step';

export default {
    name: 'page-fleets',

    data() {
        return {
            selectedFleet: null,
        };
    },

    async asyncData({ app }) {
        const [ fleets, reports ] = await Promise.all([
            app.$repositories.fleet.getFleets(),
            app.$repositories.ship.combat.getAll(),
        ])
        return { fleets, reports };
    },

    components: {
        FleetDetails,
        FleetComposition,
        FleetJourneyStep,
        FleetsList,
        PlanetImage,
        CombatReports
    },

    methods: {
        async goToPlanet (planet) {
            await this.$store.dispatch('user/setCurrentPlanet', planet);
            
            this.$router.push(`/planet/${planet.id}`);
        },
    }
};
</script>

<style lang="less" scoped>
    .fleets-list {
        grid-row: ~"2/9";
        grid-column: ~"2/4";
    }

    #fleet-journey-details,
    #fleet-location {
        grid-column: ~"4/7";
        grid-row: ~"2/5";
        margin: auto;
    }

    #fleet-location {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #fleet-composition {
        grid-column: ~"4/7";
        grid-row: ~"5/9";
    }

    #fleet-details {
        grid-column: ~"7/10";
        grid-row: ~"2/9";
    }

    #combat-reports {
        grid-row: ~"3/8";
        grid-column: ~"7/10";
        margin-left: 40px;
    }
</style>