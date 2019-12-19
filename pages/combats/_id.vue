<template>
    <div>
        <report-details v-if="report" />
        <combat-map v-if="report" />
    </div>
</template>

<script>
import ReportDetails from '~/components/organisms/combat-report/details';
import CombatMap from '~/components/organisms/combat-report/map';
import { mapGetters } from 'vuex';

export default {
    name: 'page-combat-report',
    
    async asyncData({ app, params }) {
        const combat = await app.$repositories.ship.combat.get(params.id);
        combat.rounds = await Promise.all(combat.rounds.map(r => app.$repositories.ship.combat.getRound(combat.id, r.id)));
        return { combat };
    },

    async mounted() {
        await this.$store.dispatch('combat/initCombat', this.combat);
    },

    components: {
        CombatMap,
        ReportDetails
    },

    computed: {
        ...mapGetters({
            report: 'combat/currentCombat'
        })
    }
}
</script>

<style lang="less">
    #report-details {
        grid-column: ~"2/5";
        grid-row: ~"2/9";
    }

    #combat-map {
        margin-left: 20px;
        grid-column: ~"5/10";
        grid-row: ~"2/9";
    }
</style>
