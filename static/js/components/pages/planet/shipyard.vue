<template>
    <div id="shipyard">
        <ship-models :selectedModel="selectedModel" @selectModel="selectModel" />
        <ship-model-details v-if="selectedModel" :model="selectedModel" />
    </div>
</template>

<script>
import ShipModels from '../../organisms/fleet/ship-models';
import ShipModelDetails from '../../organisms/fleet/ship-model-details';

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
            this.selectedModel = model;
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
