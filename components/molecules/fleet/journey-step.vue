<template>
    <div class="journey-step" :style="{ borderColor: factionColors['grey'] }">
         <div class="location">
            <template v-if="step.startPlace.planet">
                <planet-image :type="step.startPlace.planet.type" width="32px" height="32px" />
                <h5>{{ step.startPlace.planet.name }}</h5>
            </template>
            <template v-else>
                {{ step.startPlace.coordinates.x }} - {{ step.startPlace.coordinates.y }}
            </template>
        </div>
        <div class="trip">
            <section>
                <div class="line" :style="{ borderColor: factionColors['grey'] }"></div>
                <div class="picto">
                    <order-picto :order="step.order" :color="factionColors['white']" :size="32" />
                </div>
                <div class="line" :style="{ borderColor: factionColors['grey'] }"></div>
            </section>
            <footer>
                <timer :date="step.arrivesAt" />
            </footer>
        </div>
        <div class="location">
            <template v-if="step.endPlace.planet">
                <planet-image :type="step.endPlace.planet.type" width="32px" height="32px" />
                <h5>{{ step.endPlace.planet.name }}</h5>
            </template>
            <template v-else>
                {{ step.endPlace.coordinates.x }} - {{ step.endPlace.coordinates.y }}
            </template>
        </div>
    </div>
</template>

<script>
import PlanetImage from '~/components/atoms/planet/image';
import OrderPicto from '~/components/atoms/fleet/order-picto';
import Timer from '~/components/atoms/timer';
import { mapGetters } from 'vuex';

export default {
    name: 'fleet-journey-step',

    props: ['step'],

    components: {
        OrderPicto,
        PlanetImage,
        Timer
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        })
    }
}
</script>

<style lang="less" scoped>
    .journey-step {
        width: 250px;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        & > .trip {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            align-items: stretch;

            & > section {
                display: flex;
                align-items: center;
                justify-content: space-between;

                & > .line {
                    flex-grow: 1;
                    border-top: 1px dashed;
                    border-bottom: 1px dashed;
                }
            }

            & > footer {
                text-align: center;
            }
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
</style>
