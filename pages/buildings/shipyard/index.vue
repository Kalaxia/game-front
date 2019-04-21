<template>
    <div id="shipyard" v-if="constructingShips">
        <ship-models :selectedModel="selectedModel" @selectModel="selectModel" ref="list" />
        <ship-model-details v-if="selectedModel" :model="selectedModel" @build="build()" />
        <constructing-ships v-if="!selectedModel" :constructingShips="constructingShips" />
    </div>
</template>

<script>
import ConstructingShips from '~/components/organisms/fleet/constructing-ships';
import ShipModels from '~/components/organisms/fleet/ship-models';
import ShipModelDetails from '~/components/organisms/fleet/ship-model-details';

export default {
    name: 'page-shipyard',

    data() {
        return {
            selectedModel: null,
        };
    },

    async asyncData ({ app, store }) {
        return {
            constructingShips: await app.$repositories.ship.ship.getConstructingShips(store.getters['user/currentPlanet'].id)
        }
    },
    
    components: {
        ShipModels,
        ShipModelDetails,
        ConstructingShips
    },

    methods: {
        selectModel(model) {
            if (model.maxAvailable === 0) {
                return;
            }
            this.selectedModel = model;
        },

        build() {
            this.$refs.list.processMaxAvailable();

            if (this.selectedModel.maxAvailable === 0) {
                this.selectedModel = null;
            }
        }
    }
}
</script>

<style lang="less" scoped>
    #ship-model-details,
    #constructing-ships {
        grid-column: ~"6/10";
        grid-row: ~"2/9";
        margin-top: 20px;
    }

    #ship-models {
        grid-column: ~"2/6";
        grid-row: ~"2/9";
        margin-top: 20px;
    }
</style>
