<template>
    <div class="minimap">
        <section :style="style">
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
import { mapGetters } from 'vuex';

export default {
    name: 'minimap',

    props: ['map', 'territories', 'scale'],

    computed: {
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
        }
    },

    methods: {
        systemStyle(s) {
            return {
                top: `${((s.coord_y - this.scale / 2) * this.scale) + this.padding}px`,
                left: `${((s.coord_x - this.scale / 2) * this.scale) + this.padding}px`,
                width: `${this.scale}px`,
                height: `${this.scale}px`,
                backgroundColor: (s.faction) ? s.faction.colors['main'] : '#EFEFEF'
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

        & > .system {
            position: absolute;
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
    }
}
</style>
