<template>
    <div id="shipyard" v-if="constructingShips">
        <ship-models :selectedModel="selectedModel" @selectModel="selectModel($event)" ref="list" />
        <ship-model-details v-if="selectedModel" :model="selectedModel" @build="build" />
        <constructing-ships v-if="!selectedModel && constructingShips.length > 0" :constructingShips="constructingShips" />
    </div>
</template>

<script>
import ConstructingShips from '~/components/organisms/fleet/constructing-ships';
import ShipModels from '~/components/organisms/fleet/ship-models';
import ShipModelDetails from '~/components/organisms/fleet/ship-model-details';
import { mapGetters } from 'vuex';

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

    computed: {
        ...mapGetters({
            currentPlanet: 'user/currentPlanet'
        })
    },

    methods: {
        selectModel(model) {
            if (model.maxAvailable === 0) {
                return;
            }
            this.selectedModel = model;
        },

        build(constructionGroup) {
            this.$refs.list.processMaxAvailable();

            this.constructingShips.push(constructionGroup);
            if (this.currentPlanet.constructingShips === null) {
                this.$store.commit('user/addConstructingShips', constructionGroup);
            }
            this.selectedModel = null;
            this.$store.dispatch('user/addActionNotification', {
                isError: false,
                content: `ships.launch_success`
            });
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
