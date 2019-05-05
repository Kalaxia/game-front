<template>
    <div class="planet-list" :style="{ borderColor: factionColors['grey']}">
        <header>
            <h3>{{ $t(`profile.planets.title`) }}</h3>
        </header>
        <section>
            <planet-item v-for="planet in planets" :key="planet.id" :planet="planet" />
        </section>
    </div>
</template>

<script>
import PlanetItem from '~/components/molecules/planet/item';
import { mapGetters } from 'vuex';

export default {
    name: 'planet-list',

    props: ['planets'],

    components: {
        PlanetItem
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        })
    }
}
</script>

<style lang="less" scoped>
    .planet-list {
        display: flex;
        flex-direction: column;
        grid-row: ~"2/9";
        grid-column: ~"2/10";
        border: 2px solid;
        border-radius: 10px;
        padding: 10px 20px;
        margin-top: 20px;

        & > section {
            flex-grow: 1;
            display: flex;
            align-items: flex-start;
            flex-wrap: wrap;
            overflow-y: auto;
        }
    }
</style>
