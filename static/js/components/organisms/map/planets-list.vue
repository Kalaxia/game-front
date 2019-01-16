<template>
    <div id="planets-list">
        <header>
            <h3>{{ $t('system.title') }}</h3>
        </header>
        <section v-if="system">
            <PlanetItem v-for="planet in system.planets" :key="planet.id" :planet="planet" :system="system" />
        </section>
    </div>
</template>

<script>
import PlanetItem from '../../molecules/map/planet-item';

export default {
    name: 'map-planets-list',
    
    props: ['system'],

    components: {
        PlanetItem
    }
};
</script>

<style lang="less" scoped>

</style>
