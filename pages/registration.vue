<template>
    <div>
        <factions-choice v-if="step === 1" @selectFaction="selectFaction" :factions="factions" />
        <character-form v-if="step === 2" @createCharacter="createCharacter" />
        <planets-choice v-if="step === 3 && planetChoices.length > 0"
            :planets="planetChoices"
            :map="map"
            :territories="territories"
            @confirmPlanet="confirmPlanet" />
    </div>
</template>

<script>
import CharacterForm from '~/components/organisms/registration/character-form';
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
        };
    },

    async asyncData({ app }) {
        const [ map, territories, factions ] = await Promise.all([
            app.$repositories.map.getMap(),
            app.$repositories.map.getTerritories(),
            app.$repositories.faction.faction.getFactions(),
        ]);
        return { map, territories, factions };
    },

    components: {
        CharacterForm,
        FactionsChoice,
        PlanetsChoice
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
        grid-column: ~"1/11";
        grid-row: ~"1/11";
    }

    .minimap {
        grid-column: ~"2/8";
        grid-row: ~"2∕4";
    }

    #planets-choice {
        grid-column: ~"1/11";
        grid-row: ~"1/11";
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
