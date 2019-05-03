<template>
    <div id="fleets-list" :style="{ borderColor: factionColors['grey'] }">
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
        display: flex;
        flex-direction: column;
        border: 2px solid;
        border-radius: 10px;
        padding: 10px 20px;

        & > header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        & > section {
            flex-grow: 1;
            display: flex;
            align-items: flex-start;
            flex-wrap: wrap;
            overflow-y: auto;
        }
    }
</style>
