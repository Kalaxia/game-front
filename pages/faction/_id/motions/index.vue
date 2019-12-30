<template>
    <div>
        <current-motions :motions="currentMotions" />
        <previous-motions :motions="previousMotions" />
    </div>
</template>

<script>
import CurrentMotions from '~/components/organisms/faction/current-motions';
import PreviousMotions from '~/components/organisms/faction/previous-motions';

export default {
    name: 'page-faction-motions',
    
    async asyncData({ app, params }) {
        const [ currentMotions, previousMotions ] = await Promise.all([
            app.$repositories.faction.faction.getFactionMotions(params.id),
            app.$repositories.faction.faction.getPreviousMotions(params.id)
        ]);
        return { currentMotions, previousMotions };
    },

    components: {
        CurrentMotions,
        PreviousMotions
    }
}
</script>

<style lang="less" scoped>
    .current-motions {
        grid-row: ~"2/9";
        grid-column: ~"2/6";
        margin-top: 40px;
        margin-right: 20px;
    }
    .previous-motions {
        grid-row: ~"2/9";
        grid-column: ~"6/10";
        margin-top: 40px;
    }
</style>