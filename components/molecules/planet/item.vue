<template>
    <div class="planet">
        <planet-shape :id="planet.id" :type="planet.type" width="200" height="200" @click.native="goToPlanet" />
        <h3>{{ planet.name }}</h3>
        <production-link :planet="planet" />
    </div>
</template>

<script>
import ProductionLink from '~/components/atoms/resource/production-link';
import PlanetShape from '~/components/atoms/planet/shape';

export default {
    name: 'planet-item',

    props: ['planet'],

    components: {
        ProductionLink,
        PlanetShape
    },

    methods: {
        async goToPlanet () {
            await this.$store.dispatch('user/setCurrentPlanet', this.planet);

            this.$router.push(`/planet/${this.planet.id}`);
        }
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
