<template>
    <div class="colonize-order">
        <header>
            <h4>Colons à escorter</h4>
        </header>
        <section class="transfer">
            <input class="input"
                v-model="quantity"
                type="number"
                min="0"
                :max="fleet.cargo['passengers']"
                :style="{ borderColor: factionColors['white'], color: factionColors['white'] }"
                @change="checkQuantity()" />
                <button class="button" @click="load()" :style="{ color: factionColors['white'] }">Valider</button>
        </section>
        <section class="recap">
            {{ currentQuantity }}
        </section>
        <footer>
            <button class="button" @click="$emit('unselectStep')" :style="{ color: factionColors['white'] }">
                {{ $t('journey.planer.cancel_order') }}
            </button>
            <button class="button" @click="$emit('selectOrder', { resources })" :style="{ color: factionColors['main'] }">
                {{ $t('journey.planer.confirm_order') }}
            </button>
        </footer>
    </div>
</template>

<script>
import ResourceItem from '~/components/atoms/resource/item'
import { mapState, mapGetters } from 'vuex';

export default {
    name: 'fleet-colonize-order',

    props: ['step'],

    data() {
        return {
            quantity: 0,
            resources: (typeof this.step.data !== 'undefined' && typeof this.step.data.resources !== 'undefined') ? this.step.data.resources : []
        };
    },

    beforeMount() {
        this.quantity = this.currentQuantity;
    },

    components: {
        ResourceItem
    },

    computed: {
        ...mapState('map', ['fleet']),

        ...mapGetters({
            factionColors: 'user/factionColors'
        }),

        currentQuantity() {
            const index = this.resources.findIndex(r => r.resource === 'passengers');

            return (index > 0) ? this.resources[index].quantity : 0;
        }
    },

    methods: {
        checkQuantity() {
            if (this.quantity > this.fleet.cargo['passengers']) {
                this.quantity = this.fleet.cargo['passengers'];
            }
        },

        load() {
            this.checkQuantity();

            const index = this.resources.findIndex(r => r.resource === 'passengers');
            if (index > -1) {
                this.$store.commit('map/updateStepDataResource', {
                    step: this.step,
                    index,
                    quantity: this.quantity
                })
            } else {
                this.resources.push({ resource: 'passengers', quantity: parseInt(this.quantity) });
            }
        }
    }
}
</script>

<style lang="less">
@import '~less/atoms/input.less';

.delivery-order {
    & > section {
        display: flex;
        flex-wrap: wrap;

        & > div {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 10px;

            & > .resource-item {
                width: 36px;
                height: 36px;
            }
        }
    }
}
</style>