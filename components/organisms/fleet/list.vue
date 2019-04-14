<template>
    <div id="fleets-list">
        <header>
            <h3>{{ $t('fleet.own_fleets') }}</h3>
            <button class="button big" @click="createFleet" :style="{ color: factionColors['main'] }">{{ $t('fleet.create', { planet: currentPlanet.name }) }}</button>
        </header>
        <section>
            <fleet-card v-for="fleet in fleets" :fleet="fleet" :key="fleet.id" />
        </section>
    </div>
</template>

<script>
import FleetCard from '~/components/molecules/fleet/card';
import { mapGetters } from 'vuex';

export default {
    name: 'fleets-list',
    
    props: ['fleets'],

    components: {
        FleetCard
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors',
            currentPlanet: 'user/currentPlanet'
        })
    },

    methods: {
        async createFleet() {
            const fleet = await this.$repositories.fleet.createFleet(this.currentPlanet.id);

            this.$router.push(`/fleets/${fleet.id}`);
        }
    }
}
</script>

<style lang="less" scoped>
    @import '~less/atoms/button.less';

    #fleets-list {
        & > header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        & > section {
            display: flex;
            flex-wrap: wrap;
        }
    }
</style>
