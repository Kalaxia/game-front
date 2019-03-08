<template>
    <div id="buildings">
        <buildings-list @select="selectedBuilding = $event" />
        <building-details @build="build" @cancel="cancel" v-if="selectedBuilding" :building="selectedBuilding" />
    </div>
</template>

<script>
import BuildingsList from '~/components/organisms/buildings/list';
import BuildingDetails from '~/components/organisms/buildings/details';

export default {
    name: 'page-buildings',
    
    data() {
        return {
            selectedBuilding: null
        };
    },

    components: {
        BuildingDetails,
        BuildingsList
    },

    methods: {
        async build(building) {
            const b = await this.$repositories.building.create(this.$store.state.user.currentPlanet, building);

            this.$store.commit('user/build', b);
            this.selectedBuilding = b;
        },

        async cancel(building) {
            await this.$repositories.building.cancel(this.$store.state.user.currentPlanet, building);

            this.$store.commit('user/cancelBuilding', {
                id: building.id,
                availableBuilding: Object.assign({}, this.$resources.buildings[building.name], { name: building.name })
            });
            this.selectedBuilding = building;
        }
    }
}
</script>

<style lang="less" scoped>
    #buildings {
        grid-column: ~"2/10";
        grid-row: ~"3/10";
        display: flex;
    }
</style>
