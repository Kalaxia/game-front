<template>
    <div id="planet-menu">
        <div>
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

export default {
    name: 'planet-menu',

    props: ['planet'],

    components: {
        PlanetPicto,
        PlanetImage,
        PlanetCoords
    },
}
</script>

<style lang="less" scoped>
    #planet-menu {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        padding-right: 10px;
        padding-bottom: 20px;

        & > div {
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
    }
</style>
