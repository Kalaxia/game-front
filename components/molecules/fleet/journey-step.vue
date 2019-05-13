<template>
    <div class="journey-step" :style="{ borderColor: factionColors['grey'] }">
         <div class="location">
            <template v-if="step.startLocation">
                <planet-image :type="step.startLocation.type" width="32px" height="32px" />
                <h5>{{ step.startLocation.name }}</h5>
            </template>
            <template v-else>
                {{ step.startX }} - {{ step.startY }}
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
                <span>{{ arrivesAt }}</span>
            </footer>
        </div>
        <div class="location">
            <template v-if="step.endLocation">
                <planet-image :type="step.endLocation.type" width="32px" height="32px" />
                <h5>{{ step.endLocation.name }}</h5>
            </template>
            <template v-else>
                {{ step.finalX }} - {{ step.finalY }}
            </template>
        </div>
    </div>
</template>

<script>
import PlanetImage from '~/components/atoms/planet/image';
import OrderPicto from '~/components/atoms/fleet/order-picto';
import { getRemainingTimeString } from '~/lib/time';
import { mapGetters } from 'vuex';

export default {
    name: 'fleet-journey-step',

    props: ['step'],

    data () {
        return {
            timer: null,
            arrivesAt: getRemainingTimeString(this.step.arrivesAt)
        };
    },

    mounted () {
        this.timer = setInterval(() => {
            this.arrivesAt = getRemainingTimeString(this.step.arrivesAt);
        }, 1000);
    },

    destroyed () {
        clearInterval(this.timer);
    },

    components: {
        OrderPicto,
        PlanetImage,
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
