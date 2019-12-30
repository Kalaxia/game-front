<template>
    <div>
        <faction-menu :faction="faction" />
        <members :faction="faction" :members="members" />
    </div>
</template>

<script>
import FactionMenu from '~/components/molecules/faction/menu';
import Members from '~/components/molecules/faction/members';

export default {
    name: 'page-faction-members',
    
    async asyncData({ app, params }) {
        const [ faction, members ] = await Promise.all([
            app.$repositories.faction.faction.getFaction(params.id),
            app.$repositories.faction.faction.getFactionMembers({ id: params.id })
        ]);
        return { faction, members };
    },

    components: {
        Members,
        FactionMenu
    }
}
</script>

<style lang="less" scoped>
    .faction-members {
        grid-column: ~"2/10";
        grid-row: ~"3/9";
    }

    .faction-menu {
        grid-row: ~"3/7";
        grid-column: 1;
    }
</style>
