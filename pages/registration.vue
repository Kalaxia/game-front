<template>
    <div>
        <factions-choice v-if="step === 1" @selectFaction="selectFaction" />
        <character-form v-if="step === 2" @createCharacter="createCharacter" />
        <template v-if="step === 3 && planetChoices.length > 0">
            <starmap v-if="screen.width >= 800" :map="map" :playerPlanets="planetChoices" />
            <planets-choice :planets="planetChoices" @confirmPlanet="confirmPlanet" />
        </template>
    </div>
</template>

<script>
import CharacterForm from '~/components/organisms/registration/character-form';
import Starmap from '~/components/organisms/map/starmap';
import FactionsChoice from '~/components/organisms/registration/factions-choice';
import PlanetsChoice from '~/components/organisms/registration/planets-choice';
import { mapState } from 'vuex';

export default {
    name: 'registration',

    data() {
        return {
            step: 1,
            faction: null,
            planet: null,
            planetChoices: [],
            data: null,
            map: null
        };
    },

    components: {
        CharacterForm,
        FactionsChoice,
        PlanetsChoice,
        Starmap
    },

    async mounted() {
        if (this.screen.width >= 800) {
            this.map = await this.$repositories.map.getMap();
        }
    },

    computed: {
        ...mapState('user', ['screen']),

        selectedSystem() {
            return (this.planet !== null) ? this.planet.system : null;
        }
    },

    methods: {
        async selectFaction(faction) {
            this.faction = faction;
            this.step = 2;
            this.$store.commit('user/setFaction', faction);
            this.planetChoices = await this.$repositories.planet.getFactionPlanetChoices(faction);
        },

        createCharacter(data) {
            this.step = 3;

            this.$store.commit('user/setGender', data.gender);
            this.$store.commit('user/setAvatar', data.avatar);
            this.$store.commit('user/setPseudo', data.pseudo);
        },

        async confirmPlanet(planet) {
            await this.$repositories.player.createPlayer(
                this.$store.state.user.player,
                planet.id
            );
            this.$store.commit('user/setCurrentPlayer', await this.$repositories.player.getCurrentPlayer());
            this.$store.commit('user/addPlanet', await this.$repositories.planet.get(planet.id))
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

    #character-form {
        grid-column: ~"3/9";
        grid-row: ~"3/9";
    }

    @media (max-width: 800px) {
        #factions-choice {
            grid-column: ~"2/10";
            grid-row: ~"1/10";
        }

        #character-form {
            grid-column: ~"2/10";
            grid-row: ~"2/10";
        }

        #starmap {
            display: none;
        }

        #planets-choice {
            grid-column: ~"2/10";
            grid-row: ~"2/10";
        }
    }
</style>
