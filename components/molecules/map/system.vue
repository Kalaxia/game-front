<template>
    <div :id="`system-${system.id}`"
        :class="['system', {mine: isPlayerSystem, expanded: system.planets}]"
        :style="style"
        @click="selectSystem"
        @contextmenu="selectSystem">
        <section v-if="isExpanded">
            <nuxt-link v-for="(planet, index) in system.planets"
                :key="`system-${system.id}-planet-${planet.id}`"
                :to="`/planet/${planet.id}`"
                class="system-planet"
                :style="{ transform: `rotate(${45 * (index + 1)}deg)`, backgroundColor: planetColor(planet), zIndex: index }"
                @mouseenter.native="setHoveredPlanet(planet)"
                @mouseleave.native="setHoveredPlanet(null)">
            </nuxt-link>
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
        style() {
            return {
                top: (this.system.coord_y * this.$store.state.map.scale) - 10 + 'px',
                left: (this.system.coord_x * this.$store.state.map.scale) - 10 + 'px',
                borderColor: (this.isExpanded) ? 'white' : 'grey'
            };
        },

        isExpanded() {
            return this.system.planets !== null;
        }
    },

    methods: {
        selectSystem() {
            if (this.$store.state.map.fleet === null) {
                return;
            }
            this.$store.commit('map/setSelectedSystemId', this.system.id);
        },

        setHoveredPlanet(planet) {
            if (this.hoveredPlanet !== planet) {
                this.hoveredPlanet = planet;
            }
        },

        planetColor(planet) {
            if (!planet.player) {
                return 'grey';
            }
            return planet.player.faction.colors['main'];
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
