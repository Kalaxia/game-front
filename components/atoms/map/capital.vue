<template>
    <colored-picto class="map-capital" src="map/capital.svg" :color="territory.planet.player.faction.colors['main']" :style="style" :width="36" :height="36" />
</template>

<script>
import ColoredPicto from '~/components/atoms/colored-picto';

export default {
    name: 'map-capital',

    props: ['territory'],

    components: {
        ColoredPicto
    },

    computed: {
        style() {
            return {
                top: `${this.territory.planet.system.coord_y * this.$store.state.map.scale - 50}px`,
                left: `${this.territory.planet.system.coord_x * this.$store.state.map.scale - 14}px`
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .map-capital {
        position: absolute;
    }
</style>