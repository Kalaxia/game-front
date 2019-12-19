<template>
    <div class="compartment-details" :style="{ borderColor: factionColors['white'] }">
        <header>
            <h3>{{ $t(`compartments.${compartment.name}.title`) }}</h3>
            <p>{{ $t(`compartments.${compartment.name}.description`) }}</p>
        </header>
        <section>
            <div class="effects">
                <header>
                    <h4>{{ $t('planet.buildings.effects') }}</h4>
                </header>
                <section>
                    <div class="modifiers">
                        <modifier v-for="(m, i) in plan.modifiers" :key="`modifier-${i}`" :modifier="b" />
                    </div>
                </section>
            </div>

            <div class="price-container" v-if="!compartment.id">
                <header>
                    <h4>{{ $t('planet.buildings.price') }}</h4>
                </header>
                <section>
                    <template v-for="(price, index) in compartment.price">
                        <div :key="`compartment-price-${index}`" v-if="price.type !== 'resource'" class="price">
                            <span>{{ price.amount }}</span>
                            <colored-picto :src="(price.type === 'credits') ? 'G_P_Mon_64px.png' : 'Pc_GenieCivil.png'" color="white" :width="32" :height="32"/>
                        </div>
                    </template>
                </section>
            </div>
        </section>
        <footer>
            <button v-if="!compartment.id" @click="$emit('buildCompartment')">
                {{ $t('buildings.build') }}
            </button>
        </footer>
    </div>
</template>

<script>
import ColoredPicto from '~/components/atoms/colored-picto';
import Modifier from '~/components/atoms/modifier';
import { mapGetters } from 'vuex';

export default {
    name: 'compartment-details',

    props: ['compartment'],

    components: {
        ColoredPicto,
        Modifier
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        }),

        plan() {
            return this.$resources.buildings[this.compartment.building.name].compartments.filter(c => c.name === this.compartment.name).shift();
        }
    }
}
</script>

<style lang="less" scoped>
.compartment-details {
    border-top: 2px solid;
    margin-top: 10px;

    & > section {
        & > .effects {
            & > section {
                display: flex;
                justify-content: space-between;
            }
        }

        & > .price-container {

            & > section {
                display: flex;
                align-items: center;

                & > .price {
                    display: flex;
                    align-items: center;
                    margin: 10px 20px;

                    & > span {
                        margin-right: 5px;
                    }
                }
            }
        }
    }
}
</style>