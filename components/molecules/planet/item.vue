<template>
    <div class="planet" :style="{ borderColor: planet.player.faction.colors['main'] }">
        <planet-image :id="planet.id" :type="planet.type" width="96" height="96" @click.native="goToPlanet" />
        <h3>{{ planet.name }}</h3>
        <production-link v-if="isCurrentPlayerPlanet" :planet="planet" />
    </div>
</template>

<script>
import ProductionLink from '~/components/atoms/resource/production-link';
import PlanetImage from '~/components/atoms/planet/image';
import { mapGetters } from 'vuex';

export default {
    name: 'planet-item',

    props: ['planet'],

    components: {
        ProductionLink,
        PlanetImage
    },

    computed: {
        ...mapGetters({
            currentPlayer: 'user/currentPlayer'
        }),

        isCurrentPlayerPlanet() {
            return this.planet.player !== null && this.planet.player.id === this.currentPlayer.id;
        }
    },

    methods: {
        async goToPlanet () {
            if (this.isCurrentPlayerPlanet) {
                await this.$store.dispatch('user/setCurrentPlanet', this.planet);
            }
            this.$router.push(`/planet/${this.planet.id}`);
        }
    }
}
</script>

<style lang="less" scoped>
    .planet {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px 20px;
        border: 1px solid;
        border-radius: 10px;
        margin: 10px;

        & > h3 {
            text-align: center;
        }
    }
</style>
