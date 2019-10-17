<template>
    <div class="planet" :style="{ borderColor: planet.player.faction.colors['main'] }">
        <planet-image :id="planet.id" :type="planet.type" width="96" height="96" @click.native="goToPlanet" />
        <h3>{{ planet.name }}</h3>
        <div v-if="isCurrentPlayerPlanet" class="button" @click="goToPlanetFleets()" :style="{ color: factionColors['main'] }">
            Flottes
        </div>
    </div>
</template>

<script>
import PlanetImage from '~/components/atoms/planet/image';
import { mapGetters } from 'vuex';

export default {
    name: 'planet-item',

    props: ['planet'],

    components: {
        PlanetImage
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors',
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
        },

        async goToPlanetFleets() {
            await this.$store.dispatch('user/setCurrentPlanet', this.planet);

            this.$router.push(`/planet/${this.planet.id}/fleets`);
        }
    }
}
</script>

<style lang="less" scoped>
    @import '~less/atoms/button.less';

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
