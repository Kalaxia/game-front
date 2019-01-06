<template>
    <div :style="{ width: `${diameter}px`, height: `${diameter}px`, top: `${top}px`, left: `${left}px`, borderWidth: `${borderWidth}px` }">

    </div>
</template>

<script>
export default {
    name: 'map-range-circle',

    props: ['x', 'y', 'range', 'scale'],

    data: function() {
        return {
            borderWidth: 6
        };
    },

    computed: {
        diameter: function() {
            return this.range.planet_to_planet * this.scale * 2;
        },

        top: function() {
            return (this.y * this.scale) - (this.diameter / 2) - (this.borderWidth / 2);
        },

        left: function() {
            return (this.x * this.scale) - (this.diameter / 2) - (this.borderWidth / 2);
        }
    }
}
</script>

<style lang="less" scoped>

</style>
