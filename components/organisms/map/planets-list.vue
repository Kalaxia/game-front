<template>
    <div id="planets-list">
        <header>
            <h3>
                <img src="/images/picto/Pc_SS_GR_64px.png" />
                {{ $t('system.title') }}
            </h3>
        </header>
        <section v-if="system">
            <PlanetItem v-for="planet in system.planets" :key="planet.id" :planet="planet" :system="system" />
        </section>
    </div>
</template>

<script>
import PlanetItem from '~/components/molecules/map/planet-item';

export default {
    name: 'map-planets-list',
    
    props: ['system'],

    components: {
        PlanetItem
    }
};
</script>

<style lang="less" scoped>
    #planets-list > header > h3 {
        display: flex;
        align-items: center;

        & > img {
            width: 48px;
            height: 48px;
            margin-right: 20px;
        }
    }
</style>
