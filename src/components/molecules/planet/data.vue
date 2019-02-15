<template>
    <div v-if="planet">
        <h3>{{ planet.name }}</h3>
        <planet-coords :planet="planet" />
        <player-link :player="planet.player" />
    </div>
</template>

<script>
import PlayerLink from 'components/atoms/player/link';
import PlanetCoords from 'components/atoms/planet/coords';

export default {
    name: 'planet-data',

    props: ['planet'],

    components: {
        PlanetCoords,
        PlayerLink
    }
}
</script>

<style lang="less" scoped>
    div {
        grid-column: ~"1/3";
        grid-row: ~"1/3";
        padding: 20px;
    }

    h3 {
        margin: 10px 0px;
    }

    a {
        display: block;
        font-size: 1.1em;
        text-decoration: none;
        padding: 5px 0px;
    }
</style>
