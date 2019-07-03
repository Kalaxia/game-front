<template>
    <div class="faction-data">
        <faction-banner :faction="faction" width="80" height="130"/>
        <div class="info">
            <h1 :style="{ color: faction.colors['main'] }">{{ faction.name }}</h1>
            <h3>{{ $t(`faction.regimes.${factionRegime}`) }}</h3>
        </div>
    </div>
</template>

<script>
import FactionBanner from '~/components/atoms/faction/banner';

export default {
    name: 'faction-data',

    props: ['faction'],

    components: {
        FactionBanner
    },

    computed: {
        factionRegime() {
            return this.faction.settings.regime.value;
        }
    }
}
</script>

<style lang="less" scoped>
    .faction-data {
        display: flex;

        & > .info {
            padding-left: 20px;

            & > h1 {
                margin: 0px;
            }
        }
    }
</style>
