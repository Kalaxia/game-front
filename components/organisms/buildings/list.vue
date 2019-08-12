<template>
    <div id="buildings-list">
        <header>
            <h3 :style="{ color: factionColors['main'] }">
                <colored-picto src="G_P_B_64px.png" :width="36" :height="36" :color="factionColors['main']" />
                {{ $t('buildings.title', { planet: currentPlanet.name }) }}
            </h3>
        </header>
        <section>
            <building-item
                @click.native="$emit('select', building)"
                v-for="building in buildings"
                :building="building"
                :key="`building-${building.id}`"
                :isSelected="selectedBuilding === building" />
                
            <div v-for="i in nbAvailableBuildings" :key="i" class="building-area" :style="{ borderColor: factionColors['grey'] }" @click="$emit('displayAvailableBuildings')">
                <div :style="{ backgroundColor: factionColors['grey'] }"></div>
            </div>
        </section>
    </div>
</template>

<script>
import ColoredPicto from '~/components/atoms/colored-picto';
import BuildingItem from '~/components/molecules/building/item';
import { mapGetters } from 'vuex';

export default {
    name: 'buildings-list',

    props: ['selectedBuilding'],

    components: {
        ColoredPicto,
        BuildingItem
    },

    computed: {
        currentPlanet() {
            return this.$store.state.user.currentPlanet;
        },

        buildings() {
            return this.currentPlanet.buildings;
        },

        availableBuildings() {
            return this.currentPlanet.availableBuildings;
        },

        nbAvailableBuildings() {
            return this.currentPlanet.nbBuildings - this.buildings.length;
        },

        ...mapGetters({
            factionColors: 'user/factionColors'
        })
    }
}
</script>

<style lang="less" scoped>
    #buildings-list {
        margin-right: 20px;
        padding: 0px 20px;
        border: 1px solid #2D2D2D;
        border-radius: 10px;
        overflow-y: scroll;

        & > header {
            & > h3 {
                display: flex;
                align-items: center;

                & > .picto {
                    margin-right: 10px;
                }
            }
        }

        & > section {
            display: flex;
            flex-wrap: wrap;

            & > .building-item {
                margin: 10px;
            }

            & > .building-area {
                margin: 10px;
                display: flex;
                justify-content: center;
                align-items: center;
                border: 2px solid;
                border-radius: 10px;
                padding: 10px;

                & > div {
                    width: 56px;
                    height: 56px;
                    mask-image: url('/images/buildings/area.png');
                    mask-repeat: no-repeat;
                    mask-size: cover;
                }
            }
        }
    }
</style>
