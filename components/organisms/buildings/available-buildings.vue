<template>
    <div class="available-buildings" :style="{ borderColor: factionColors['black'] }">
        <header>
            <h3 :style="{ color: factionColors['main'] }">
                <colored-picto src="G_P_B_64px.png" :width="36" :height="36" :color="factionColors['main']" />
                {{ $t('planet.available_buildings') }}
            </h3>
        </header>
        <section>
            <building-item
                @click.native="$emit('select', building)"
                v-for="(building, i) in availableBuildings"
                :building="building"
                :key="`available-building-${i}`"
                :isSelected="selectedBuilding === building" />
        </section>
    </div>
</template>

<script>
import BuildingItem from '~/components/molecules/building/item';
import ColoredPicto from '~/components/atoms/colored-picto';
import { mapGetters } from 'vuex';

export default {
    name: 'available-buildings',

    props: ['selectedBuilding'],

    components: {
        BuildingItem,
        ColoredPicto
    },

    computed: {
        ...mapGetters({
            currentPlanet: 'user/currentPlanet',
            factionColors: 'user/factionColors'
        }),

        availableBuildings() {
            return this.currentPlanet.availableBuildings;
        }
    }
}
</script>

<style lang="less" scoped>
.available-buildings {
    padding: 20px;
    border: 2px solid;
    border-radius: 10px;

    & > header {
        & > h3 {
            display: flex;
            align-items: center;
            margin: 0px;

            & > .picto {
                margin-right: 10px;
            }
        }
    }

    & > section {
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;

        & > .building-item {
            margin: 10px;
        }
    }
}
</style>