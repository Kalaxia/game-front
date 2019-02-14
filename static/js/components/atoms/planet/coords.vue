<template>
    <router-link :to="`/map/systems/${planet.system.id}`">
        {{ planetCoords }}
    </router-link>
</template>

<script>
export default {
    name: 'planet-coords',

    props: ['planet'],

    computed: {
        planetCoords: function() {
            return `[${this.planet.system.x}.${this.planet.system.y}.${this.planet.id % 100}]`;
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
