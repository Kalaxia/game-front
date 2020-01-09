<template>
    <div class="squadron-cursor">
        <hexagon :borderColor="factionColors['main']" :backgroundColor="factionColors['main']" :size="64" :borderSize="2">
            <ship-type :type="hangarGroup.type" :color="factionColors['black']" :size="36" />
        </hexagon>
        <gauge-selector
            :color="factionColors['main']"
            :min="0"
            :max="maxQuantity"
            :initialValue="squadron.quantity"
            @change="$emit('assignShips', $event)"
            @stop="$emit('validateQuantity', $event)" />
        <hexagon :borderColor="factionColors['main']" :backgroundColor="factionColors['black']" :size="64" :borderSize="2">
            <ship-type :type="squadron.shipModel.type" :color="factionColors['main']" :size="36" />
        </hexagon>
    </div>
</template>

<script>
import Hexagon from '~/components/atoms/hexagon';
import GaugeSelector from '~/components/atoms/gauge-selector';
import ShipType from '~/components/atoms/ship/type';
import { maxQuantity } from '~/model/ship/group';
import { mapGetters } from 'vuex';

export default {
    name: 'squadron-cursor',

    props: ['squadron', 'hangarGroup'],

    components: {
        Hexagon,
        GaugeSelector,
        ShipType
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        }),

        maxQuantity() {
            const availableQuantity = this.squadron.quantity + this.hangarGroup.quantity;

            return (maxQuantity < availableQuantity) ? maxQuantity : availableQuantity;
        }
    }
}
</script>

<style lang="less" scoped>
    .squadron-cursor {
        display: flex;
        align-self: stretch;
        justify-content: space-between;
        margin: 10px 40px;

        & > .gauge-selector {
            flex-grow: 1;
            margin: 0px 20px;
        }
    }
</style>