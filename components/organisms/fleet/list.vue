<template>
    <div class="fleets-list" :style="{ borderColor: factionColors['grey'] }">
        <header>
            <h3 :style="{ color: factionColors['main'] }">
                <colored-picto src="ships/Fleet.svg" :color="factionColors['main']" :width="28" :height="28" />
                {{ $t(`fleet.${type}_fleets`) }}
            </h3>
            <button v-if="type === 'orbiting'" class="button" @click="createFleet" :style="{ color: factionColors['white'] }">{{ $t('fleet.create', { planet: currentPlanet.name }) }}</button>
        </header>
        <section>
            <fleet-card v-for="fleet in fleets" :fleet="fleet" :key="fleet.id" @click.native="$emit('selectFleet', fleet)" />
        </section>
    </div>
</template>

<script>
import ColoredPicto from '~/components/atoms/colored-picto';
import FleetCard from '~/components/molecules/fleet/card';
import { mapGetters } from 'vuex';

export default {
    name: 'fleets-list',
    
    props: ['fleets', 'type'],

    components: {
        ColoredPicto,
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

            this.$emit('createFleet', fleet);
        }
    }
}
</script>

<style lang="less" scoped>
    @import '~less/atoms/button.less';

    .fleets-list {
        display: flex;
        flex-direction: column;
        border: 2px solid;
        border-radius: 10px;
        padding: 10px 20px;

        & > header {
            display: flex;
            justify-content: space-between;
            align-items: center;

            & > h3 {
                display: flex;
                align-items: center;
                font-variant: small-caps;

                & > .picto {
                    margin-right: 5px;
                }
            }
        }

        & > section {
            flex-grow: 1;
            display: flex;
            align-items: flex-start;
            flex-wrap: wrap;
        }
    }
</style>
