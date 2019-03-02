<template>
    <div id="shipyard">
        <ship-models :selectedModel="selectedModel" @selectModel="selectModel" ref="list" />
        <ship-model-details v-if="selectedModel" :model="selectedModel" @build="build()" />
    </div>
</template>

<script>
import ShipModels from '~/components/organisms/fleet/ship-models';
import ShipModelDetails from '~/components/organisms/fleet/ship-model-details';

export default {
    name: 'page-shipyard',

    data() {
        return {
            selectedModel: null,
        };
    },
    
    components: {
        ShipModels,
        ShipModelDetails
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
    #ship-model-details {
        grid-column: ~"5/9";
        grid-row: ~"3/9";
    }

    #ship-models {
        grid-column: ~"2/5";
        grid-row: ~"3/9";
    }
</style>
