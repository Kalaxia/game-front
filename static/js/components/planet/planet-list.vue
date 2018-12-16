<template>
    <div class="planet-list">
        <header>
            <h3>{{ $t(`profile.planets.title`) }}</h3>
        </header>
        <section>
            <planet v-for="planet in planets" :key="planet.id" v-bind:planet="planet" />
        </section>
    </div>
</template>

<script>
import Planet from './planet';

export default {
    name: 'planet-list',

    props: ['planets'],

    components: {
        Planet
    }
}
</script>

<style lang="less" scoped>
    .planet-list {
        & > section {
            display: flex;
        }
    }
</style>
