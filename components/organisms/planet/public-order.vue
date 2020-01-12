<template>
    <div class="public-order" :style="{ borderColor: factionColors['grey'] }">
        <header>
            <h3>{{ $t('planet.public_order.title') }}</h3>
        </header>
        <section>
            {{ $t(`planet.public_order.levels.${level}`) }}
        </section>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
    name: 'planet-public-order',
    
    computed: {
        ...mapState('user', ['currentPlanet']),

        ...mapGetters({
            factionColors: 'user/factionColors'
        }),

        level() {
            const po = this.currentPlanet.publicOrder;
            switch(true) {
                case po <= 20: return 'rebellious';
                case po <= 40: return 'unrest';
                case po <= 60: return 'stable';
                case po <= 80: return 'good';
                default: return 'perfect';
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .public-order {
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