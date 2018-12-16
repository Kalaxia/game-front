<template>
    <div class="planet">
        <planet-shape v-bind:id="planet.id" v-bind:type="planet.type" />
        <h3>{{ planet.name }}</h3>
        <a href="/views/base/production.html" class="resource-button">{{ $t('planet.production') }}</a>
    </div>
</template>

<script>
import PlanetShape from '../atoms/planet/shape';

export default {
    name: 'planet',

    props: ['planet'],

    components: {
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
