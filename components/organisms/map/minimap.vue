<template>
    <div class="minimap">
        <section :style="style" @click="$emit('moveTo', { x: $event.layerX / scale, y: $event.layerY / scale })">
            <div class="window" v-if="posX && posY" :style="windowStyle" @click.prevent.stop></div>
            <div class="system" v-for="s in map.systems" :key="`system-${s.id}`" :style="systemStyle(s)"></div>
            <svg>
                <svg v-for="t in territories" :key="t.id">
                    <circle class="system-territory"
                        v-for="st in t.systems"
                        :key="`territory-${t.id}-system-${st.system.id}`"
                        :cx="(st.system.coord_x * scale) + padding"
                        :cy="(st.system.coord_y * scale) + padding"
                        :r="st.radius * scale"
                        :style="{ fill: t.planet.player.faction.colors['mainLight'] }" />
                </svg>
            </svg>
        </section>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
    name: 'minimap',

    props: ['map', 'territories', 'scale', 'playerPlanets', 'selectedPlanet', 'posX', 'posY'],

    computed: {
        ...mapState('user', ['screen']),

        ...mapGetters({
            factionColors: 'user/factionColors'
        }),

        padding() {
            return 5;
        },

        dimensions() {
            return {
                width: `${(this.map.size * this.scale) + (this.padding * 2)}px`,
                height: `${(this.map.size * this.scale) + (this.padding * 2)}px`,
            }
        },

        style() {
            return {
                ...this.dimensions,
                borderColor: this.factionColors['white'],
                backgroundColor: this.factionColors['black']
            };
        },

        windowStyle() {
            const width = this.screen.width / (this.$store.state.map.scale / this.scale);
            const height = this.screen.height / (this.$store.state.map.scale / this.scale);
            return {
                top: `${(this.posY * this.scale) - height / 2}px`,
                left: `${(this.posX * this.scale) - width / 2}px`,
                width: `${width}px`,
                height: `${height}px`,
                borderColor: this.factionColors['main'],
            };
        }
    },

    methods: {
        systemStyle(s) {
            const size = this.scale * ((this.playerPlanets.map(p => p.system.id).indexOf(s.id) > -1) ? 4 : 1);
            return {
                top: `${((s.coord_y - size / 2) * this.scale) + this.padding}px`,
                left: `${((s.coord_x - size / 2) * this.scale) + this.padding}px`,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: (this.selectedPlanet !== null && this.selectedPlanet.system.id == s.id) ? this.factionColors['main'] : (s.faction) ? s.faction.colors['main'] : '#EFEFEF',
                boxShadow: (this.selectedPlanet !== null && this.selectedPlanet.system.id == s.id) ? `0px 0px ${this.scale * 5}px ${this.factionColors['main']}`: null,
            }
        }
    }
}
</script>

<style lang="less">
.minimap {
    margin: 10px;
    & > section {
        position: relative;
        border-radius: 10px;
        border: 1px solid;
        overflow: hidden;

        & > .system {
            position: absolute;
            border-radius: 50%;
            transition: box-shadow 0.2s, background-color 0.2s;
        }

        & > svg {
            width: 100%;
            height: 100%;
            z-index: -1;

            & > svg {
                & > .system-territory {
                    fill-opacity: 0.6;
                }
            }
        }

        & > .window {
            position: absolute;
            border: 1px solid;
            border-radius: 5px;
        }
    }
}
</style>
