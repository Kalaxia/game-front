<template>
    <div  class="journey-step-recap">
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
        })
    }
}
</script>

<style scoped lang="less">
    .journey-step-recap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px;
        border-top: 1px solid grey;

        & > .order {
            cursor: pointer;
            border: 1px solid;
            border-radius: 50%;
        }
    }
</style>
