<template>
    <div :id="`system-${system.id}`"
        :class="['system', {mine: isPlayerSystem, expanded: system.planets}]"
        :style="style">
        <section v-if="isExpanded">
            <div v-for="(planet, index) in system.planets"
                :id="`planet-${planet.id}`"
                :key="`system-${system.id}-planet-${planet.id}`"
                @click="selectPlanet(planet)"
                class="system-planet"
                :style="{ transform: `rotate(${45 * (index + 1)}deg)`, backgroundColor: planetColor(planet), zIndex: index }"
                @mouseenter="setHoveredPlanet(planet)"
                @mouseleave="setHoveredPlanet(null)">
            </div>
            <div v-if="system.planets.length < 8"
                class="system-planet padding"
                :style="{ transform: `rotate(${45 * (system.planets.length + 1)}deg)`, zIndex: 10 }">
            </div>
        </section>
        <template v-if="hoveredPlanet">
            <div class="planet-data">
                <planet-picto :type="hoveredPlanet.type" :width="24" :height="24" />
                <span>{{ hoveredPlanet.name }}</span>
            </div>
            <div class="player-data" v-if="hoveredPlanet.player">
                <player-avatar :player="hoveredPlanet.player" :width="32" :height="32" :disableBorder="true" />
                <span>{{ hoveredPlanet.player.pseudo }}</span>
            </div>
        </template>
    </div>
</template>

<script>
import PlanetPicto from '~/components/atoms/planet/picto';
import PlayerAvatar from '~/components/atoms/player/avatar';
import JourneyStep, { ORDER_PASS } from '~/model/fleet/journeyStep';
import { shadeColor } from '~/lib/colors';
import { mapGetters } from 'vuex';

export default {
    name: 'map-system',

    props: ['system', 'isPlayerSystem'],

    data() {
        return {
            hoveredPlanet: null
        };
    },

    components: {
        PlayerAvatar,
        PlanetPicto,
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors',
            selectedPlanets: 'map/selectedPlanets'
        }),

        style() {
            return {
                top: (this.system.coord_y * this.$store.state.map.scale) - (this.isExpanded ? 20 : 10 ) + 'px',
                left: (this.system.coord_x * this.$store.state.map.scale) - (this.isExpanded ? 20 : 10 ) + 'px',
                borderColor: (this.isExpanded) ? (this.system.faction) ? this.system.faction.colors['main'] : 'white' : 'grey'
            };
        },

        isExpanded() {
            return this.system.planets !== null;
        }
    },

    methods: {
        selectPlanet(planet) {
            if (this.$store.state.map.fleet === null) {
                this.$router.push(`/planet/${planet.id}`);
            }
            const previousX = this.$store.getters['map/previousX'];
            const previousY = this.$store.getters['map/previousY'];
            const distance = Math.sqrt(Math.pow(this.system.x - previousX, 2) + Math.pow(this.system.y - previousY, 2));
            
            if (distance > this.$store.getters['map/range'](this.system.x, this.system.y, planet.id)) {
                // TODO
                throw 'out of range';
            }
            this.$store.commit('map/addStep', new JourneyStep({
                id: this.$store.state.map.fleet.journey.steps.length,
                map_pos_x_start: previousX,
                map_pos_y_start: previousY,
                planet_start: this.$store.getters['map/previousPlanet'],
                map_pos_x_final: this.system.coord_x,
                map_pos_y_final: this.system.coord_y,
                planet_final: planet,
                order: ORDER_PASS
            }));
        },

        setHoveredPlanet(planet) {
            if (this.hoveredPlanet !== planet) {
                this.hoveredPlanet = planet;
            }
        },

        planetColor(planet) {
            return shadeColor((!planet.player) ? this.factionColors['grey'] : planet.player.faction.colors['main'], (this.isSelectedPlanet(planet)) ? 0.2 : 0);
        },

        isSelectedPlanet(planet) {
            return this.selectedPlanets.indexOf(planet.id) >= 0;
        }
    }
}
</script>

<style lang="less" scoped>
    .system {
        position: absolute;
        width: 20px;
        height: 20px;
        box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        border: 1px solid #FFF;
        background-color: #EFEFEF;

        &.mine {
            background-color: red;
        }

        &.expanded {
            width: 40px;
            height: 40px;
            background-color: black;
            border: 3px solid;
            box-shadow: none;
        }

        & > section {
            position: absolute;
            width: 100%;
            height: 100%;
            clip-path: circle(18px);

            & > .system-planet {
                display: block;
                position: absolute;
                bottom: 20px;
                right: 20px;
                width: 15px;
                height: 20px;
                border: 2px solid black;
                transform-origin: bottom right;
                clip-path: polygon(50% 0%, 100% 100%, 0% 100%);

                &.padding {
                    width: 16px;
                    height: 12px;
                    background-color: black;
                }
            }
        }

        & > .planet-data {
            position: absolute;
            top: -40px;
            left: -40px;
            display: flex;
            align-items: center;

            & > span {
                margin-left: 5px;
            }
        }

        & > .player-data {
            position: absolute;
            top: 50px;
            left: -40px;
            display: flex;
            align-items: center;
            z-index: 0;

            & > span {
                margin-left: 5px;
            }
        }
    }
</style>
