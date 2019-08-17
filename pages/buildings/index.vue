<template>
    <div>
        <buildings-list
            :selectedBuilding="selectedBuilding"
            @select="selectBuilding($event, false)"
            @displayAvailableBuildings="displayAvailableBuildings" />
        <building-details
            v-if="selectedBuilding"
            :building="selectedBuilding"
            :selectedCompartment="selectedCompartment"
            @build="build"
            @buildCompartment="buildCompartment"
            @cancel="cancel"
            @showAvailableCompartments="displayAvailableCompartments"
            @selectCompartment="selectedCompartment = $event" />
        <building-construction-list v-if="!showAvailableBuildings && !showAvailableCompartments" />
        <available-buildings v-if="showAvailableBuildings" @select="selectBuilding($event, true)" :selectedBuilding="selectedBuilding" />
        <available-compartments v-if="showAvailableCompartments" :building="selectedBuilding" @selectCompartment="selectedCompartment = $event" />
    </div>
</template>

<script>
import BuildingsList from '~/components/organisms/buildings/list';
import BuildingDetails from '~/components/organisms/buildings/details';
import BuildingConstructionList from '~/components/organisms/buildings/construction-list';
import AvailableBuildings from '~/components/organisms/buildings/available-buildings';
import AvailableCompartments from '~/components/organisms/buildings/available-compartments';

export default {
    name: 'page-buildings',
    
    data() {
        return {
            selectedBuilding: null,
            selectedCompartment: null,
            showAvailableBuildings: false,
            showAvailableCompartments: false,
        };
    },

    components: {
        AvailableBuildings,
        AvailableCompartments,
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

        async buildCompartment() {
            try {
                for (const price of this.selectedCompartment.price) {
                    if (price.type !== 'points') {
                        this.$store.commit('user/spend', price);
                    }
                }
                const c = await this.$repositories.building.createCompartment(this.$store.state.user.currentPlanet, this.selectedBuilding, this.selectedCompartment);

                this.$store.commit('user/buildCompartment', c);
                this.selectedCompartment = c;
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
            this.selectedCompartment = null;
            this.showAvailableCompartments = false;
            this.showAvailableBuildings = showAvailableBuildings;
        },

        displayAvailableBuildings() {
            this.selectedBuilding = null;
            this.showAvailableCompartments = false;
            this.showAvailableBuildings = true;
        },

        displayAvailableCompartments() {
            this.selectedCompartment = null;
            this.showAvailableCompartments = true;
            this.showAvailableBuildings = false;
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
.available-buildings,
.available-compartments {
    grid-column: ~"7/10";
    grid-row: ~"2/9";
    margin-top: 20px;
    margin-left: 20px;
}
</style>
