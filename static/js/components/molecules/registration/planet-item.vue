<template>
    <div class="planet-item" :style="style" @click="$emit('selectPlanet', planet)">
        <header>
            <planet-image :type="planet.type" width="96px" height="96px" />
            <planet-picto :type="planet.type" :width="32" :height="32" />
        </header>
        <section>
            <h3 :style="{ color: planetColor }">{{ planet.name }}</h3>
            <planet-coords :planet="planet" />
        </section>
        <footer>
            <planet-relations :planet="planet" width="100px" height="100px" />
            <resources-density-graph :id="planet.id" :resources="planet.resources" :size="100" />
        </footer>
    </div>
</template>

<script>
import PlanetImage from '../../atoms/planet/image';
import PlanetPicto from '../../atoms/planet/picto';
import PlanetCoords from '../../atoms/planet/coords';
import PlanetRelations from '../planet/relations';
import ResourcesDensityGraph from '../resource/density-graph';

export default {
    name: 'planet-item',

    props: ['planet', 'isSelected'],

    components: {
        PlanetImage,
        PlanetPicto,
        PlanetCoords,
        PlanetRelations,
        ResourcesDensityGraph
    },

    computed: {
        style() {
            return {
                borderWidth: (this.isSelected) ? '5px' : '2px',
                borderColor: this.planetColor,
            };
        },

        planetColor() {
            return {
                arctic: '#35C3DE',
                desert: '#9A69A9',
                oceanic: '#0061A6',
                temperate: '#48B663',
                tropical: '#74A74C',
                rocky: '#F2956E',
                volcanic: '#AF242E'
            }[this.planet.type];
        }
    }
}
</script>

<style lang="less" scoped>
    .planet-item {
        border-style: solid;
        border-radius: 10px;
        padding: 10px 20px;
        transition: border-width 0.2s ease-out;
        background-color: #242424;

        & > header {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        & > section {
            text-align: center;
            padding: 10px 0px;
            font-size: 1.2em;

            & > h3 {
                margin: 0px;
            }
        }

        & > footer {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
        }
    }
</style>
