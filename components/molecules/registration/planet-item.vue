<template>
    <div :class="['planet-item', { selected: isSelected }]" @click="$emit('selectPlanet', planet)">
        <header>
            <planet-image :type="planet.type" width="64px" height="64px" />
        </header>
        <section>
            <h3 :style="{ color: planetColor }">
                <planet-picto :type="planet.type" :width="32" :height="32" />
                {{ planet.name }}
            </h3>
            <planet-coords :planet="planet" :disableLink="true" />
        </section>
    </div>
</template>

<script>
import PlanetImage from '~/components/atoms/planet/image';
import PlanetPicto from '~/components/atoms/planet/picto';
import PlanetCoords from '~/components/atoms/planet/coords';

export default {
    name: 'planet-item',

    props: ['planet', 'isSelected'],

    components: {
        PlanetImage,
        PlanetPicto,
        PlanetCoords,
    },

    computed: {
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
        display: flex;
        padding: 5px 10px;
        background-color: #242424;
        border-bottom: 2px solid grey;
        background-color: #242424;
        transition: background-color 0.2s;
        cursor: pointer;

        &:hover,
        &.selected {
            background-color: black;
        }

        & > header {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 20px;
        }

        & > section {
            padding: 10px 0px;
            font-size: 1.2em;

            & > h3 {
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0px;

                & > .planet-picto {
                    margin-right: 10px;
                }
            }

            & > .planet-coords {
                padding-left: 42px;
            }
        }

        & > footer {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
        }
    }

    @media (max-width: 800px) {
        .planet-item {
            & > header {
                & > .planet-image {
                    width: 64px !important;
                    height: 64px !important;
                }
            }

            & > footer {
                flex-direction: column;
            }
        }
    }

    @media (max-width: 500px) {
        .planet-item {
            display: flex;
            flex-wrap: wrap;
            padding-top: 0px;
            margin: 5px;

            & > header {
                & > .planet-image {
                    width: 48px !important;
                    height: 48px !important;
                }
            }

            & > section {
                flex-grow: 1;
                justify-content: flex-end;
                font-size: 0.8em;
            }

            & > footer {
                margin-top: 5px;
                flex-grow: 1;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
            }
        }
    }
</style>
