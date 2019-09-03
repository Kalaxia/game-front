<template>
    <svg class="map-territories" :style="style">
        <map-territory v-for="t in territories" :key="t.id" :territory="t" />
    </svg>
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
</style>