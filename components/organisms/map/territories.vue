<template>
    <div class="map-territories">
        <svg class="map-territories" :style="style">
            <map-territory v-for="t in territories" :key="t.id" :territory="t" />
        </svg>
        <template v-if="!isProd">
            <div class="map-territories-coordinates" v-for="t in territories" :key="`${t.id}-coords`">
                <div class="t-coordinates" v-for="(c, i) in t.coordinates" :key="`${t.id}-coords-${i}`" :style="coordinateStyle(t, c)">
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import MapTerritory from '~/components/molecules/map/territory';

export default {
    name: 'map-territories',

    props: ['territories'],

    components: {
        MapTerritory
    },

    computed: {
        style() {
            return {
                width: `${this.$store.state.map.size * this.$store.state.map.scale}px`,
                height: `${this.$store.state.map.size * this.$store.state.map.scale}px`
            };
        },

        isProd() {
            return this.$env.mode === 'prod';
        }
    },

    methods: {
        coordinateStyle(t, c) {
            return {
                backgroundColor: t.planet.player.faction.colors['main'],
                left: `${c.x * this.$store.state.map.scale - 5}px`,
                top: `${c.y * this.$store.state.map.scale - 5}px`
            };
        }
    }
}
</script>

<style lang="less" scoped>
    .map-territories {
        position: absolute;
        top: 0px;
        left: 0px;
    }

    .t-coordinates {
        position: absolute;
        z-index: 100;
        width: 10px;
        height: 10px;
        border: 1px solid white;
        border-radius: 50%;
    }
</style>