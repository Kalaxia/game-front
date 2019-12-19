<template>
    <div :style="{ top: `${top}px`, left: `${left}px`}">
        <div class="north"></div>
        <div class="south"></div>
        <div class="east"></div>
        <div class="west"></div>
    </div>
</template>

<script>
export default {
    name: 'map-fleet-location',

    props: ['fleet', 'scale'],

    data() {
        return {
            width: 30
        };
    },

    computed: {
        top() {
            return (this.fleet.place !== null)
            ? (this.fleet.location.system.coord_y * this.scale + OFFSET_SIZE_TARGET)
            : (this.fleet.map_pos_y * this.scale - this.width / 2);
        },

        left() {
            return (this.fleet.location !== null)
                ? (this.fleet.location.system.coord_x * this.scale + OFFSET_SIZE_TARGET)
                : (this.fleet.map_pos_x * this.scale - this.width / 2) ;
        }
    }
}
</script>

<style lang="less" scoped>

</style>
