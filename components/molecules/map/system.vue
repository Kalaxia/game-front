<template>
    <div :id="`system-${system.id}`"
        :class="['system', { expanded: system.planets }]"
        :style="style">
        <section v-if="isExpanded">
            <div v-for="(planet, index) in system.planets"
                :id="`planet-${planet.id}`"
                :key="`system-${system.id}-planet-${planet.id}`"
                @click="selectPlanet(planet)"
                :class="['system-planet', { selected: isSelectedPlanet(planet), inhabited: planet.population > 0, hasPlayer: planet.player }]"
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
import { mapState, mapGetters } from 'vuex';

export default {
    name: 'map-system',

    props: ['system'],

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
        ...mapState('map', ['scale', 'fleet', 'selectedPlanets']),

        ...mapGetters({
            factionColors: 'user/factionColors',
            previousX: 'map/previousX',
            previousY: 'map/previousY',
            previousPlanet: 'map/previousPlanet',
            range: 'map/range'
        }),

        style() {
            return {
                top: (this.system.coord_y * this.scale) - (this.isExpanded ? 20 : 10 ) + 'px',
                left: (this.system.coord_x * this.scale) - (this.isExpanded ? 20 : 10 ) + 'px',
                borderColor: (this.isExpanded) ? (this.system.faction) ? this.system.faction.colors['main'] : 'white' : 'grey'
            };
        },

        isExpanded() {
            return this.system.planets !== null;
        }
    },

    methods: {
        selectPlanet(planet) {
            if (this.fleet === null) {
                this.$router.push(`/planet/${planet.id}`);
            }
            const distance = Math.sqrt(Math.pow(this.system.x - this.previousX, 2) + Math.pow(this.system.y - this.previousY, 2));
            
            if (distance > this.$store.getters['map/range'](this.system.x, this.system.y, planet.id)) {
                // TODO
                throw 'out of range';
            }
            this.$store.commit('map/addStep', new JourneyStep({
                id: this.fleet.journey.steps.length,
                start_place: {
                    planet: this.previousPlanet,
                    coordinates: {
                        x: this.previousX,
                        y: this.previousY
                    }
                },
                end_place: {
                    planet,
                    coordinates: {
                        x: this.system.coord_x,
                        y: this.system.coord_y
                    }
                },
                order: ORDER_PASS
            }));
        },

        setHoveredPlanet(planet) {
            if (this.hoveredPlanet !== planet) {
                this.hoveredPlanet = planet;
            }
        },

        planetColor(planet) {
            return (!planet.player) ? this.factionColors[(planet.population > 0) ? 'white' : 'grey'] : planet.player.faction.colors['main'];
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
                transition: filter 0.2s ease-out;

                &.padding {
                    width: 16px;
                    height: 12px;
                    background-color: black;
                }

                &.inhabited:not(.hasPlayer) {
                    filter: brightness(50%);
                }

                &.selected {
                    filter: brightness(120%);

                    &.inhabited:not(.hasPlayer) {
                        filter: brightness(80%);
                    }
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
