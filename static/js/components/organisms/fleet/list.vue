<template>
    <div id="fleets-list">
        <header>
            <h3>{{ $t('fleet.view.all.title') }}</h3>
        </header>
        <section>
            <fleet-card v-for="fleet in fleets" :fleet="fleet" :key="fleet.id" />
        </section>
    </div>
</template>

<script>
import FleetCard from '../../molecules/fleet/card';

export default {
    name: 'fleets-list',
    
    props: ['fleets'],

    components: {
        FleetCard
    }
}
</script>

<style lang="less" scoped>
    section {
        display: flex;
        flex-wrap: wrap;
    }
</style>
