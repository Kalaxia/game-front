<template>
    <div id="planet-menu">
        <div class="modules">
            <population-points :planet="planet" class="module" />
            <constructing-building class="module" :building="constructingBuilding" />
            <constructing-ships v-if="constructingShips" class="module" :constructingShips="constructingShips" />
        </div>
        <div class="column">
            <planet-picto class="planet-picto" :type="planet.type" :width="36" :height="36" />
            <h5 :class="planet.type" >{{ planet.name }}</h5>
            <planet-coords :planet="planet" />
            <nuxt-link :to="`/planet/${planet.id}`">
                <planet-image class="planet-image" :type="planet.type" width="96" height="96" />
            </nuxt-link>
        </div>
    </div>
</template>

<script>
import PlanetPicto from '~/components/atoms/planet/picto';
import PlanetImage from '~/components/atoms/planet/image';
import PlanetCoords from '~/components/atoms/planet/coords';
import ConstructingBuilding from '~/components/molecules/menu/constructing-building';
import ConstructingShips from '~/components/molecules/menu/constructing-ships';
import PopulationPoints from '~/components/molecules/menu/population-points';

export default {
    name: 'planet-menu',

    props: ['planet'],

    data() {
        return {
            constructingShips: null
        };
    },

    components: {
        PlanetPicto,
        PlanetImage,
        PlanetCoords,
        ConstructingBuilding,
        ConstructingShips,
        PopulationPoints
    },

    async mounted() {
        this.constructingShips = await this.$repositories.ship.ship.getCurrentlyConstructingShips(this.planet.id);
    },

    computed: {
        constructingBuilding() {
            const buildings = this.$store.getters['user/currentPlanet'].buildings;

            for (const b of buildings) {
                if (b.status === 'constructing') {
                    return b;
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>
    #planet-menu {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        padding-right: 10px;
        padding-bottom: 20px;

        & > .column {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-decoration: none;

            & > h5 {
                margin: 0px;
                font-size: 1.1em;

                &.arctic {
                    color: #B0B0FF;
                }
                &.desert {
                    color: #f5cc4d;
                }
                &.oceanic {
                    color: #0077be;
                }
                &.temperate {
                    color: #00b300;
                }
                &.tropical {
                    color: #008000;
                }
                &.rocky {
                    color: #AA9a9a;
                }
                &.volcanic {
                    color: #C60000;
                }
            }
        }

        .planet-picto {
            margin-bottom: 5px;
        }

        & > a > .planet-image {
            margin-top: 15px;
        }

        & > .modules {
            display: flex;
            align-items: stretch;

            & > .module {
                text-decoration: none;
                background-color: #2D2D2D;
                border-radius: 5px;
                padding: 5px 10px;
            }
        }
    }
</style>
