<template>
    <div id="buildings">
        <buildings-list @select="selectedBuilding = $event" />
        <building-details v-if="selectedBuilding" :building="selectedBuilding" />
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
