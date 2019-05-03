<template>
    <nuxt-link class="fleet-card" :to="`/fleets/${fleet.id}`" :style="{ borderColor: factionColors['grey'], color: factionColors['white'] }">
        <header>
            {{ $t('fleet.title', {fleet: fleet.id}) }}
        </header>
        <section v-if="fleet.journey" class="journey">
            <div class="location">
                <template v-if="fleet.journey.currentStep.startLocation">
                    <planet-image :type="fleet.journey.currentStep.startLocation.type" width="32px" height="32px" />
                    <h5>{{ fleet.journey.currentStep.startLocation.name }}</h5>
                </template>
                <template v-else>

                </template>
            </div>
            <div class="line" :style="{ borderColor: factionColors['grey'] }"></div>
            <div class="picto">
                <colored-picto src="ships/Fleet.svg" :color="factionColors['white']" :width="32" :height="32" />
            </div>
            <div class="line" :style="{ borderColor: factionColors['grey'] }"></div>
            <div class="location">
                <template v-if="fleet.journey.currentStep.endLocation">
                    <planet-image :type="fleet.journey.currentStep.endLocation.type" width="32px" height="32px" />
                    <h5>{{ fleet.journey.currentStep.endLocation.name }}</h5>
                </template>
                <template v-else>

                </template>
            </div>
        </section>
        <section v-else>
            <planet-image :type="fleet.location.type" width="48" height="48" />
            <p>{{ $t('fleet.statuses.idle', { location: fleet.location.name }) }}</p>
        </section>
    </nuxt-link>
</template>

<script>
import ColoredPicto from '~/components/atoms/colored-picto';
import PlanetImage from '~/components/atoms/planet/image';
import { mapGetters } from 'vuex';


export default {
    name: 'fleet-card',

    props: ['fleet'],

    components: {
        ColoredPicto,
        PlanetImage
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
        height: 120px;
        padding: 10px;
        border-radius: 10px;
        border: 1px solid;
        text-decoration: none;
        margin: 5px;
        display: flex;
        flex-direction: column;

        & > header {
            font-size: 1.2em;
            margin: 5px 0px;
        }

        & > section {
            display: flex;
            flex-grow: 1;

            &.journey {
                align-items: center;
                justify-content: space-between;

                & > .line {
                    flex-grow: 1;
                    border-top: 1px dashed;
                    border-bottom: 1px dashed;
                }

                & > .location {
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    & > h5 {
                        margin: 5px 0px;
                    }
                }
            }
        }
    }

    p {
        margin: 0px;
        padding-left: 10px;
    }
</style>
