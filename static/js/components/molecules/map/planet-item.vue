<template>
    <div class="planet-item-container" :style="{backgroundColor: borderColor }">
        <div class="planet-item">
            <PlanetImage :type="planet.type" width="72" height="72" />
            <div class="planet-data">
                <PlanetPicto :type="planet.type" width="24" height="24" />
                <router-link :to="`/planet/${planet.id}`">{{ planet.name }}</router-link>
                <PlanetCoords :planet="planet" :system="system" />
            </div>

            <div v-if="planet.player" class="player-data">

                <div></div>
                <div>
                    <header><Avatar :player="planet.player" width="48" height="48" /></header>
                    <section>{{ $t('general.player') }}</section>
                    <footer>{{ planet.player.pseudo }}</footer>
                </div>
                <div>
                    <header>
                        <img :src="`/static/images/factions/${planet.player.faction.banner}`" :alt="planet.player.faction.banner" width="48"/>
                    </header>
                    <section>{{ $t('general.faction') }}</section>
                    <footer>{{ planet.player.faction.name }}</footer>
                </div>

            </div>

            <div></div>
        </div>
    </div>
</template>

<script>
import Avatar from '../../atoms/player/avatar';
import PlanetCoords from '../../atoms/planet/coords';
import PlanetImage from '../../atoms/planet/image';
import PlanetPicto from '../../atoms/planet/picto';

export default {
    name: 'map-planet-item',

    props: ['planet', 'system'],

    components: {
        Avatar,
        PlanetCoords,
        PlanetImage,
        PlanetPicto
    },

    computed: {
        borderColor: function() {
            if (this.planet.player !== null) {
                return this.planet.player.faction.color;
            }
            return null;
        }
    }
}
</script>

<style lang="less" scoped>
    .planet-item-container {
        background-color: #242424;
        margin: 10px 0px;
        padding: 3px;
        clip-path: polygon(5% 0%, 95% 0%, 100% 25%, 100% 75%, 95% 100%, 5% 100%, 0% 75%, 0% 25%);
    }

    .planet-item {
        display: flex;
        align-items: center;
        padding: 10px 20px;
        background-color: black;
        clip-path: polygon(5% 0%, 95% 0%, 100% 25%, 100% 75%, 95% 100%, 5% 100%, 0% 75%, 0% 25%);
    }

    .planet-data {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0px 20px;

        & > a {
            color: #A0A0A0;
            text-decoration: none;

            &:nth-child(2) {
                margin-top: 5px;
            }
            
            &:last-child {
                font-size: 0.7em;
            }
        }
    }

    .player-data {
        display: flex;
        align-items: center;

        & > div {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 0px 5px;
            font-size: 0.8em;

            & > footer {
                font-weight: bold;
            }
        }
    }
</style>
