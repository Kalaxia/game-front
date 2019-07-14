<template>
    <div>
        <faction-menu v-if="currentPlayer.faction.id == faction.id" :faction="faction" />
        <faction-data :faction="faction" />
        <faction-political-overview v-if="currentPlayer.faction.id == faction.id" :faction="faction" :motions="motions" />
        <faction-relations id="faction-relations" :faction="faction" />
    </div>
</template>

<script>
import FactionMenu from '~/components/molecules/faction/menu';
import Faction from '~/model/faction';
import FactionData from '~/components/organisms/faction/faction';
import FactionRelations from '~/components/molecules/faction/relations';
import FactionPoliticalOverview from '~/components/organisms/faction/political-overview';
import { mapGetters } from 'vuex';

export default {
    name: 'page-faction',

    components: {
        FactionMenu,
        FactionData,
        FactionRelations,
        FactionPoliticalOverview,
    },

    async asyncData({ app, params, store }) {
        const promises = [
            app.$repositories.faction.getFaction(params.id)
        ];
        if (store.state.user.player.faction.id === params.id) {
            promises.push(app.$repositories.faction.getFactionMotions(params.id));
        }
        const [ faction, motions ] = await Promise.all(promises);
        return { faction, motions };
    },

    computed: {
        ...mapGetters({
            currentPlayer: 'user/currentPlayer'
        })
    }
}
</script>

<style lang="less" scoped>
    .faction-menu {
        grid-row: ~"3/7";
        grid-column: 1;
    }

    .faction-data {
        grid-row: ~"3/6";
        grid-column: ~"2/6";
    }

    .political-overview {
        grid-row: ~"3/6";
        grid-column: ~"6/10"
    }

    #faction-members {
        grid-row: ~"3/10";
        grid-column: ~"6/10";
        overflow-y: scroll;
    }

    #faction-relations {
        grid-row: ~"6/10";
        grid-column: ~"2/6";
        display: flex;
    }
</style>