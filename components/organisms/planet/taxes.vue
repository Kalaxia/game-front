<template>
    <div class="planet-taxes" :style="{ borderColor: factionColors['grey'] }">
        <header>
            <h3>{{ $t('planet.tax_rate.title') }}</h3>
        </header>
        <section>
            <p>{{ $t('planet.tax_rate.level') }}</p>
            <select v-model="taxRate" @change="updateTaxRate()">
                <option v-for="l in levels" :key="l" :value="l">
                    {{ $t(`planet.tax_rate.levels.${l}`) }}
                </option>
            </select>
        </section>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
    name: 'planet-taxes',

    data() {
        return {
            taxRate: ''
        };
    },

    beforeMount() {
        this.taxRate = this.level;
    },

    computed: {
        ...mapState('user', ['currentPlanet']),

        ...mapGetters({
            factionColors: 'user/factionColors'
        }),

        level() {
            return this.levels[this.currentPlanet.taxRate - 1];
        },

        levels() {
            return ['very_low', 'low', 'normal', 'high', 'very_high'];
        }
    },

    methods: {
        async updateTaxRate() {
            const rate = this.levels.indexOf(this.taxRate);
            if (rate === -1) {
                return;
            }
            try {
                this.$store.commit('user/updateTaxRate', rate + 1);
                await this.$repositories.planet.updateTaxRate(this.currentPlanet);
                this.$store.dispatch('user/addActionNotification', {
                    isError: false,
                    content: `planet.tax_rate.update_success`
                });
            } catch(err) {
                this.$store.dispatch('user/addActionNotification', {
                    isError: true,
                    content: err
                });
            }
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