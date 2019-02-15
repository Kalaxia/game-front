<template>
    <div class="planet">
        <planet-shape v-bind:id="planet.id" v-bind:type="planet.type" width="200" height="200" />
        <h3>{{ planet.name }}</h3>
        <production-link :planet="planet" />
    </div>
</template>

<script>
import ProductionLink from 'components/atoms/resource/production-link';
import PlanetShape from 'components/atoms/planet/shape';

export default {
    name: 'planet-item',

    props: ['planet'],

    components: {
        ProductionLink,
        PlanetShape
    }
}
</script>

<style lang="less" scoped>
    .planet {
        & > h3 {
            text-align: center;
        }
    }
</style>
