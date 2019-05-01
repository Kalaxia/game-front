<template>
    <div>
        <report-details :report="report" />
    </div>
</template>

<script>
import ReportDetails from '~/components/organisms/combat-report/details';

export default {
    name: 'page-combat-report',
    
    async asyncData({ app, params }) {
        return {
            report: app.$repositories.ship.combat.get(params.id)
        };
    },

    components: {
        ReportDetails
    }
}
</script>

<style lang="less">
    #report-details {
        grid-column: ~"2/10";
        grid-row: ~"3/9";
    }
</style>
