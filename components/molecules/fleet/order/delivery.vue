<template>
    <div class="delivery-order">
        <header>
            <h4>Ressources à livrer</h4>
        </header>
        <section class="cargo">
            <div v-for="(q, r) in fleet.cargo" :key="r" @click="selectResource(r)">
                <resource-item :resource="{ name: r }" />
                <span>{{ q }}</span>
            </div>
        </section>
        <section class="transfer" v-if="selectedResource">
            <input class="input"
                v-model="quantity"
                type="number"
                min="0"
                :max="fleet.cargo[selectedResource]"
                :style="{ borderColor: resourceColor, color: resourceColor }"
                @change="checkQuantity()" />
                <button class="button" @click="load()" :style="{ color: factionColors['white'] }">Valider</button>
        </section>
        <section class="delivery">
            <div v-for="(r) in resources" :key="r.resource">
                <resource-item :resource="{ name: r.resource }" />
                <span>{{ r.quantity }}</span>
            </div>
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
    name: 'fleet-delivery-order',

    props: ['step'],

    data() {
        return {
            selectedResource: null,
            quantity: 0,
            resources: (typeof this.step.data !== 'undefined' && typeof this.step.data.resources !== 'undefined') ? this.step.data.resources : []
        };
    },

    components: {
        ResourceItem
    },

    computed: {
        ...mapState('map', ['fleet']),

        ...mapGetters({
            factionColors: 'user/factionColors'
        }),

        resourceColor() {
            return this.$resources.resources[this.selectedResource].color;
        }
    },

    methods: {
        selectResource(r) {
            this.selectedResource = r;
            
            const index = this.resources.findIndex(r => r.resource == this.selectedResource);
            this.quantity = (index > -1) ? this.resources[index].quantity : 0;
        },

        checkQuantity() {
            if (this.quantity > this.fleet.cargo[this.selectedResource]) {
                this.quantity = this.fleet.cargo[this.selectedResource];
            }
        },

        load() {
            this.checkQuantity();

            const index = this.resources.findIndex(r => r.resource == this.selectedResource);
            if (index > -1) {
                this.$store.commit('map/updateStepDataResource', {
                    step: this.step,
                    index,
                    quantity: this.quantity
                })
            } else {
                this.resources.push({ resource: this.selectedResource, quantity: parseInt(this.quantity) });
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