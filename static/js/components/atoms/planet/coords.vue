<template>
    <router-link :to="`/map/systems/${system.id}`">
        {{ planetCoords }}
    </router-link>
</template>

<script>
export default {
    name: 'planet-coords',

    props: ['system', 'planet'],

    computed: {
        planetCoords: function() {
            return `[${this.system.x}.${this.system.y}.${this.planet.id % 100}]`;
        }
    }
}
</script>

<style lang="less" scoped>
    a {
        text-decoration: none;
        color: #EFEFEF;
        font-size: 0.9em;
    }
</style>
