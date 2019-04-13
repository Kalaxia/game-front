<template>
    <div id="planets-choice">
        <header>
            <h1 v-html="$t('registration.planet.title')"></h1>
        </header>
        <section>
            <planet-item v-for="planet in planets"
                :key="planet.id"
                :planet="planet"
                :isSelected="selectedPlanet === planet"
                @selectPlanet="selectPlanet"/>
        </section>
        <footer>
            <transition name="next">
                <button v-if="isPlanetSelected" class="big button" :style="{ borderColor: factionColors['main'], color: factionColors['main'] }" @click="$emit('confirmPlanet', selectedPlanet)">
                    <span>{{ $t('registration.start') }}</span>
                </button>
            </transition>
        </footer>
    </div>
</template>

<script>
import PlanetItem from '~/components/molecules/registration/planet-item';
import { mapGetters } from 'vuex';

export default {
    name: 'planets-choice',

    props: ['planets'],

    data() {
        return {
            selectedPlanet: null,
        };
    },
    
    components: {
        PlanetItem
    },

    computed: {
        isPlanetSelected() {
            return this.selectedPlanet !== null;
        },

        ...mapGetters({
            factionColors: 'user/factionColors'
        })
    },

    methods: {
        selectPlanet(planet) {
            this.selectedPlanet = planet;
            this.$store.commit('map/setTargetedSystemId', planet.system.id);
        }
    }
}
</script>

<style lang="less" scoped>
    @import '~less/atoms/box.less';
    @import '~less/atoms/button.less';

    #planets-choice {
        overflow-y: auto;
        z-index: 100;

        & > header {
            text-align: center;
            margin-bottom: 0px;

            & > h1 {
                font-variant: small-caps;
                font-weight: normal;
            }
        }

        & > section {
            display: flex;
            align-items: stretch;
            justify-content: space-around;
        }

        & > footer {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 20px;

            .next-enter-active, .next-leave-active {
                transition: opacity .5s;
            }
            .next-enter, .next-leave-to {
                opacity: 0;
            }
        }
    }
</style>
