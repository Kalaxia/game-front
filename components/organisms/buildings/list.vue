<template>
    <div id="buildings-list">
        <header>

        </header>
        <section>
            <building-item @click.native="$emit('select', building)" v-for="building in buildings" :building="building" :key="`building-${building.id}`" :isConstructed="true" />
        </section>
        <section>
            <building-item @click.native="$emit('select', building)" v-for="building in availableBuildings" :building="building" :key="`available-building-${building.name}`" :isConstructed="false" />
        </section>
    </div>
</template>

<script>
import BuildingItem from '~/components/molecules/building/item';

export default {
    name: 'buildings-list',

    components: {
        BuildingItem
    },

    data() {
        return {
            buildings: this.$store.state.user.currentPlanet.buildings,
            availableBuildings: this.$store.state.user.currentPlanet.available_buildings
        };
    }
}
</script>

<style lang="less" scoped>
    #buildings-list {
        grid-column: ~"1/4";
        grid-row: ~"3/9";
    }
</style>
