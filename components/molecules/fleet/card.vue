<template>
    <nuxt-link class="fleet-card" :to="`/fleets/${fleet.id}`" :style="{ borderColor: factionColors['grey'], color: factionColors['white'] }">
        <header>
            {{ $t('fleet.title', {fleet: fleet.id}) }}
        </header>
        <section class="ship-summary" v-if="fleet.shipSummary">
            <div v-for="ss in fleet.shipSummary" :key="ss.type">
                <ship-type :type="ss.type" :color="factionColors['white']" :size="24" />
                <span>{{ ss.nb_ships }}</span>
            </div>
        </section>
        <section v-if="fleet.journey" class="journey">
            <journey-step :step="fleet.journey.currentStep" />
        </section>
        <section v-else-if="fleet.location">
            <planet-image :type="fleet.location.type" width="48" height="48" />
            <p>{{ $t('fleet.statuses.idle', { location: fleet.location.name }) }}</p>
        </section>
    </nuxt-link>
</template>

<script>
import ColoredPicto from '~/components/atoms/colored-picto';
import ShipType from '~/components/atoms/ship/type';
import PlanetImage from '~/components/atoms/planet/image';
import JourneyStep from '~/components/molecules/fleet/journey-step';
import { mapGetters } from 'vuex';

export default {
    name: 'fleet-card',

    props: ['fleet'],

    components: {
        ColoredPicto,
        PlanetImage,
        JourneyStep,
        ShipType,
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        })
    }
}
</script>

<style lang="less" scoped>
    @import '~less/atoms/box.less';

    .fleet-card {
        width: 250px;
        height: 150px;
        padding: 10px;
        border-radius: 10px;
        border: 1px solid;
        text-decoration: none;
        margin: 5px;
        display: flex;
        flex-direction: column;
        overflow-y: auto;

        & > header {
            font-size: 1.2em;
            margin: 5px 0px;
        }

        & > .ship-summary {
            margin: 5px 0px;
            display: flex;
            flex-wrap: wrap;

            & > div {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin: 5px;
            }
        }

        & > section {
            display: flex;
            flex-grow: 1;
        }
    }

    p {
        margin: 0px;
        padding-left: 10px;
    }
</style>
