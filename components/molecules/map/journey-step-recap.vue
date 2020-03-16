<template>
    <div  class="journey-step-recap">
        <header>
            <template v-if="step.endPlace.planet !== null">
                <div class="location">
                    <planet-picto :type="step.endPlace.planet.type" :width="24" :height="24" />
                    <span :style="{ color: planetNameColor }">{{ step.endPlace.planet.name }}</span>
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
            <div>
                <colored-picto src="/map/Chrono.svg" :color="factionColors['white']" :width="24" :height="24" />
                <span>{{ travelTime }}</span>
            </div>
            <div>
                <colored-picto src="/map/HourGlass.svg" :color="factionColors['white']" :width="24" :height="24" />
                <span>{{ restTime }}</span>
            </div>
        </section>
    </div>
</template>

<script>
import ColoredPicto from '~/components/atoms/colored-picto';
import PlanetPicto from '~/components/atoms/planet/picto';
import OrderPicto from '~/components/atoms/fleet/order-picto';
import { mapGetters } from 'vuex';

export default {
    name: 'journey-step-recap',

    props: ['step'],

    components: {
        ColoredPicto,
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
        },

        planetNameColor() {
            return (this.step.endPlace.planet.faction !== null) ? this.step.endPlace.planet.faction.colors['main'] : (this.step.endPlace.planet.player !== null) ? this.step.endPlace.planet.player.faction.colors['main'] : this.factionColors['white'];
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

            & > div {
                display: flex;
                align-items: center;

                & > span {
                    padding-left: 10px;
                }
            }
        }
    }
</style>
