<template>
    <div>
        <faction-data :faction="faction" />
        <faction-political-overview :faction="faction" :motions="motions" />
        <faction-relations id="faction-relations" :faction="faction" />
    </div>
</template>

<script>
import Faction from '~/model/faction';
import FactionData from '~/components/organisms/faction/faction';
import FactionRelations from '~/components/molecules/faction/relations';
import FactionPoliticalOverview from '~/components/organisms/faction/political-overview';

export default {
    name: 'page-faction',

    components: {
        FactionData,
        FactionRelations,
        FactionPoliticalOverview,
    },

    async asyncData({ app, params }) {
        const [ faction, motions ] = await Promise.all([
            app.$repositories.faction.getFaction(params.id),
            app.$repositories.faction.getFactionMotions(params.id)
        ])
        return { faction, motions };
    },
}
</script>

<style lang="less" scoped>
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