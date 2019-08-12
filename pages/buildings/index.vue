<template>
    <div>
        <buildings-list @select="selectBuilding($event, false)" :selectedBuilding="selectedBuilding" @displayAvailableBuildings="displayAvailableBuildings()" />
        <building-details @build="build" @cancel="cancel" v-if="selectedBuilding" :building="selectedBuilding" />
        <building-construction-list v-if="!showAvailableBuildings" />
        <available-buildings v-else @select="selectBuilding($event, true)" :selectedBuilding="selectedBuilding" />
    </div>
</template>

<script>
import BuildingsList from '~/components/organisms/buildings/list';
import BuildingDetails from '~/components/organisms/buildings/details';
import BuildingConstructionList from '~/components/organisms/buildings/construction-list';
import AvailableBuildings from '~/components/organisms/buildings/available-list';

export default {
    name: 'page-buildings',
    
    data() {
        return {
            selectedBuilding: null,
            showAvailableBuildings: false
        };
    },

    components: {
        AvailableBuildings,
        BuildingDetails,
        BuildingsList,
        BuildingConstructionList
    },

    async asyncData({ app, params }) {
        return {

        };
    },

    methods: {
        async build(building) {
            try {
                for (const price of building.price) {
                    if (price.type !== 'points') {
                        this.$store.commit('user/spend', price);
                    }
                }
                const b = await this.$repositories.building.create(this.$store.state.user.currentPlanet, building);

                this.$store.commit('user/build', b);
                this.selectedBuilding = b;
                this.$store.dispatch('user/addActionNotification', {
                    isError: false,
                    content: 'buildings.launch_success'
                });
            } catch(error) {
                this.$store.dispatch('user/addActionNotification', {
                    isError: true,
                    content: error
                });
            }
        },

        async cancel(building) {
            await this.$repositories.building.cancel(this.$store.state.user.currentPlanet, building);

            this.$store.commit('user/cancelBuilding', {
                id: building.id,
                availableBuilding: Object.assign({}, this.$resources.buildings[building.name], { name: building.name })
            });
            this.selectedBuilding = null;
            this.$store.dispatch('user/addActionNotification', {
                isError: false,
                content: 'buildings.cancel_success'
            });
        },

        selectBuilding(building, showAvailableBuildings) {
            this.selectedBuilding = building;
            this.showAvailableBuildings = showAvailableBuildings;
        },

        displayAvailableBuildings() {
            this.selectedBuilding = null;
            this.showAvailableBuildings = true;
        }
    }
}
</script>

<style lang="less" scoped>
#buildings-list {
    grid-column: ~"2/5";
    grid-row: ~"2/9";
    margin-top: 20px;
}

#building-details {
    grid-column: ~"5/7";
    grid-row: ~"2/9";
    margin-top: 20px;
}

.construction-list,
.available-buildings {
    grid-column: ~"7/10";
    grid-row: ~"2/9";
    margin-top: 20px;
}
</style>
