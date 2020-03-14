<template>
    <div  class="journey-step-recap">
        <header>
            <template v-if="step.endPlace.planet !== null">
                <div class="location">
                    <planet-picto :type="step.endPlace.planet.type" :width="24" :height="24" />
                    <span>{{ step.endPlace.planet.name }}</span>
                </div>
                <div class="order" @click="$emit('selectStepOrder')" :style="{ borderColor: factionColors['white'] }">
                    <order-picto :order="step.order" :color="factionColors['main']" :size="32" />
                </div>
            </template>
            <template v-else>
                <div class="location">
                    <span>{{ step.endPlace.coordinates.x }} - {{ step.endPlace.coordinates.y }}</span>
                </div>
                <order-picto order="pass" :color="factionColors['white']" :size="32" />
            </template>
        </header>
        <section>
            <div>{{ restTime }}</div>
            <div>{{ travelTime }}</div>
        </section>
    </div>
</template>

<script>
import PlanetPicto from '~/components/atoms/planet/picto';
import OrderPicto from '~/components/atoms/fleet/order-picto';
import { mapGetters } from 'vuex';

export default {
    name: 'journey-step-recap',

    props: ['step'],

    components: {
        PlanetPicto,
        OrderPicto
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        }),

        travelTime() {
            return (this.step.travelTime / 60).toFixed(2).replace('.', ':');
        },

        restTime() {
            return (this.step.restTime / 60).toFixed(2).replace('.', ':');
        }
    }
}
</script>

<style scoped lang="less">
    .journey-step-recap {
        & > header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 5px;
            border-top: 1px solid grey;

            & > .location {
                display: flex;
                align-items: center;

                & > .planet-picto {
                    margin-right: 10px;
                }
            }

            & > .order {
                cursor: pointer;
                border: 1px solid;
                border-radius: 50%;
            }
        }

        & > section {
            display: flex;
            justify-content: space-around;
            padding: 5px 0px;
            border-top: 2px grey dashed;
        }
    }
</style>
