<template>
    <div>
        <fleets-list :fleets="fleets" />
        <combat-reports :reports="reports" />
    </div>
</template>

<script>
import Fleet from '~/model/fleet/fleet';
import FleetsList from '~/components/organisms/fleet/list';
import CombatReports from '~/components/organisms/combat-report/list';

export default {
    name: 'page-fleets',

    async asyncData({ app }) {
        const [ fleets, reports ] = await Promise.all([
            app.$repositories.fleet.getFleets(),
            app.$repositories.ship.combat.getAll()
        ])
        return { fleets, reports };
    },

    components: {
        FleetsList,
        CombatReports
    }
};
</script>

<style lang="less" scoped>
    #fleets-list {
        grid-row: ~"3/8";
        grid-column: ~"2/7";
    }

    #combat-reports {
        grid-row: ~"3/8";
        grid-column: ~"7/10";
        margin-left: 40px;
    }
</style>