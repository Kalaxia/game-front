<template>
    <div id="buildings-list">
        <section>
            <h3 :style="{ color: factionColor }">{{ $t('buildings.title', { planet: currentPlanet.name }) }}</h3>
            <building-item
                @click.native="$emit('select', building)"
                v-for="building in buildings"
                :building="building"
                :key="`building-${building.id}`"
                :isSelected="selectedBuilding === building" />
        </section>
        <section>
            <h3 :style="{ color: factionColor }">{{ $t('buildings.available_buildings') }}</h3>
            <building-item
                @click.native="$emit('select', building)"
                v-for="building in availableBuildings"
                :building="building"
                :key="`available-building-${building.name}`"
                :isSelected="selectedBuilding === building" />
        </section>
    </div>
</template>

<script>
import BuildingItem from '~/components/molecules/building/item';

export default {
    name: 'buildings-list',

    props: ['selectedBuilding'],

    components: {
        BuildingItem
    },

    data() {
        return {
            buildings: this.$store.state.user.currentPlanet.buildings,
            availableBuildings: this.$store.state.user.currentPlanet.available_buildings
        };
    },

    computed: {
        currentPlanet() {
            return this.$store.state.user.currentPlanet;
        },

        factionColor() {
            return this.$store.state.user.player.faction.color;
        }
    }
}
</script>

<style lang="less" scoped>
    #buildings-list {
        grid-column: ~"2/4";
        grid-row: ~"3/9";
        margin-right: 20px;
        padding: 0px 20px;
        border: 1px solid #2D2D2D;
        border-radius: 10px;
        overflow-y: scroll;
    }
</style>
