<template>
    <div v-if="combat">
        <report-details :report="combat" />
        <combat-recap v-if="!isCombatDisplayed" :report="combat" @showCombat="showCombat = true" />
        <combat-map v-else @showRecap="showCombat = false" :report="combat" />
    </div>
</template>

<script>
import ReportDetails from '~/components/organisms/combat-report/details';
import CombatMap from '~/components/organisms/combat-report/map';
import CombatRecap from '~/components/organisms/combat-report/recap';
import { mapGetters } from 'vuex';

export default {
    name: 'page-combat-report',
    
    async asyncData({ app, params }) {
        const combat = await app.$repositories.ship.combat.get(params.id);
        combat.rounds = await Promise.all(combat.rounds.map(r => app.$repositories.ship.combat.getRound(combat.id, r.id)));
        return { combat };
    },

    data() {
        return {
            showCombat: false
        };
    },

    async mounted() {
        if (this.isCombatDisplayed) {
            await this.$store.dispatch('combat/initCombat', this.combat);
        }
    },

    components: {
        CombatMap,
        CombatRecap,
        ReportDetails
    },

    computed: {
        ...mapGetters({
            report: 'combat/currentCombat'
        }),

        isCombatDisplayed() {
            return this.combat.endAt === null || this.showCombat === true;
        }
    }
}
</script>

<style lang="less">
    #report-details {
        grid-column: ~"2/5";
        grid-row: ~"2/9";
    }

    #combat-map, .combat-recap {
        margin-left: 20px;
        grid-column: ~"5/10";
        grid-row: ~"2/9";
    }
</style>
