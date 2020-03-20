<template>
    <nuxt-link class="planet-coords" v-if="!disableLink" :to="`/map/systems/${planet.system.id}`">
        {{ planetCoords }}
    </nuxt-link>
    <span class="planet-coords" v-else>
        {{ planetCoords }}
    </span>
</template>

<script>
export default {
    name: 'planet-coords',

    props: ['planet', 'disableLink'],

    computed: {
        planetCoords() {
            return `[${this.planet.system.x}.${this.planet.system.y}.${this.planet.id % 100}]`;
        }
    }
}
</script>

<style lang="less" scoped>
    .planet-coords {
        text-decoration: none;
        color: #EFEFEF;
        font-size: 0.9em;
    }
</style>
