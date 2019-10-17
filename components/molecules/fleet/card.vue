<template>
    <div class="fleet-card" :style="{ borderColor: factionColors['grey'], color: factionColors['white'] }">
        <header>
            <h5>
                <colored-picto src="ships/Fleet.svg" :color="factionColors['white']" :width="28" :height="28" />
                {{ $t('fleet.title', {fleet: fleet.id}) }}
            </h5>
        </header>
        <section class="ship-summary" v-if="fleet.shipSummary">
            <div v-for="ss in fleet.shipSummary" :key="ss.type">
                <ship-type :type="ss.type" :color="factionColors['white']" :size="24" />
                <span>{{ ss.nb_ships }}</span>
            </div>
        </section>
    </div>
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
            
            & > h5 {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin: 0px;
                font-weight: normal;
                font-variant: small-caps;
            }
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
