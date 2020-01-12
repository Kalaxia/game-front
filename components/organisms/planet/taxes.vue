<template>
    <div class="planet-taxes" :style="{ borderColor: factionColors['grey'] }">
        <header>
            <h3>{{ $t('planet.tax_rate.title') }}</h3>
        </header>
        <section>
            {{ $t(`planet.tax_rate.levels.${level}`) }}
        </section>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
    name: 'planet-taxes',

    computed: {
        ...mapState('user', ['currentPlanet']),

        ...mapGetters({
            factionColors: 'user/factionColors'
        }),

        level() {
            return ['very_low', 'low', 'normal', 'high', 'very_high'][this.currentPlanet.taxRate + 1];
        }
    }
}
</script>

<style lang="less" scoped>
.planet-taxes {
    padding: 10px 20px;
    border: 2px solid;
    border-radius: 10px;
    
    & > header {
        & > h3 {
            margin: 0px;
        }
    }

    & > section {
        margin-top: 10px;
    }
}
</style>