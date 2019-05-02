<template>
    <div id="combat-reports" :style="{ borderColor: factionColors['grey'] }">
        <header>
            <h3>Rapports de combats</h3>
        </header>
        <section>
            <report-item v-for="report in reports" :key="report.id" :report="report" />
        </section>
    </div>
</template>

<script>
import ReportItem from '~/components/molecules/combat-report/item';
import { mapGetters } from 'vuex';

export default {
    name: 'combat-reports',

    props: ['reports'],

    components: {
        ReportItem
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        })
    }
}
</script>

<style lang="less" scoped>
    #combat-reports {
        display: flex;
        flex-direction: column;
        border: 1px solid;
        border-radius: 10px;
        padding: 10px 20px;

        & > section {
            flex-grow: 1;
            overflow-x: hidden;
            overflow-y: auto;
        }
    }
</style>
