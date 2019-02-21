<template>
    <div>
        <factions-choice v-if="step === 1" @selectFaction="selectFaction" />
        <template v-if="step === 2 && planetChoices.length > 0">
            <starmap :map="map" :playerPlanets="planetChoices" />
            <planets-choice :planets="planetChoices" @confirmPlanet="confirmPlanet" />
        </template>
    </div>
</template>

<script>
import Starmap from '~/components/organisms/map/starmap';
import FactionsChoice from '~/components/organisms/registration/factions-choice';
import PlanetsChoice from '~/components/organisms/registration/planets-choice';

export default {
    name: 'registration',

    data() {
        return {
            step: 1,
            faction: null,
            planet: null,
            planetChoices: [],
            data: null
        };
    },

    components: {
        FactionsChoice,
        PlanetsChoice,
        Starmap
    },

    async mounted() {
        this.map = await this.$repositories.map.getMap();
    },

    computed: {
        selectedSystem() {
            return (this.planet !== null) ? this.planet.system : null;
        }
    },

    methods: {
        async selectFaction(faction) {
            this.faction = faction;
            this.step = 2;
            this.$store.commit('user/setFaction', faction);
            this.planetChoices = await this.$repositories.faction.getFactionPlanetChoices(faction);
        },

        async confirmPlanet(planet) {
            this.$store.commit('user/addPlanet', planet);
            await this.$repositories.player.createPlayer();
            this.$router.push('/map');
        }
    }
}
</script>

<style lang="less" scoped>
    #factions-choice {
        grid-column: ~"3/9";
        grid-row: ~"3/9";
    }

    #starmap {
        grid-column: ~"1/11";
        grid-row: ~"1∕11";
    }

    #planets-choice {
        grid-column: ~"3/9";
        grid-row: ~"6/10";
    }
</style>
