<template>
    <div class="combat-recap" :style="{ borderColor: factionColors['grey'] }">
        <header>
            <h3>{{ $t('combat.report') }}</h3>
            <button class="button" @click="$emit('showCombat')" :style="{ color: factionColors['main'] }">{{ $t('combat.visualize') }}</button>
        </header>
        <section>
            <combat-report-party :party="report.attacker" :ships="report.attackerShips" :losses="report.attackerLosses" />
            <combat-report-party :party="report.defender" :ships="report.defenderShips" :losses="report.defenderLosses" />
        </section>
    </div>
</template>

<script>
import CombatReportParty from '~/components/molecules/combat-report/party';
import { mapGetters } from 'vuex';

export default {
    name: 'combat-recap',
    
    props: ['report'],

    components: {
        CombatReportParty
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors',
        })
    }
}
</script>

<style lang="less" scoped>
@import '~less/variables.less';
@import '~less/atoms/button.less';

.combat-recap {
    padding: 10px 20px;
    border: 2px solid;
    border-radius: 10px;

    & > header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    & > section {
        display: flex;
        justify-content: space-between;

        & > .combat-report-party {
            flex-basis: 40%;
        }
    }
}
</style>