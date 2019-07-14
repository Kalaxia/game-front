<template>
    <div class="planet-taxes-motion-form">
        <header>
            <div v-html="$t('faction.motions.types.planet_taxes.description', { taxes })"></div>
        </header>
        <section>
            <input type="number" min="0" :value="taxes" v-on:input="updateTaxes($event.target.value)" />
            <colored-picto src="G_P_Mon_64px.png" :width="24" :height="24" :color="factionColors['main']" />
        </section>
    </div>
</template>

<script>
import ColoredPicto from '~/components/atoms/colored-picto';
import { mapGetters } from 'vuex';

export default {
    name: 'planet-taxes-motion-form',

    props: ['faction'],

    components: {
        ColoredPicto
    },

    data () {
        return {
            taxes: this.faction.settings['planet_taxes'].value
        };
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        })
    },

    beforeMount() {
        this.$emit('input', { taxes: this.taxes });
    },

    methods: {
        updateTaxes(taxes) {
            this.taxes = parseInt(taxes);

            this.$emit('input', { taxes: this.taxes });
        }
    }
}
</script>

<style lang="less">
    .planet-taxes-motion-form {
        & > section {
            display: flex;
            align-items: center;

            & > div {
                margin-left: 10px;
            }
        }
    }
</style>
