<template>
    <div class="planet-taxes-motion-form">
        <input type="number" min="" max="" :value="taxes" v-on:input="updateTaxes($event.target.value)" />
    </div>
</template>

<script>
export default {
    name: 'planet-taxes-motion-form',

    props: ['faction'],

    data () {
        return {
            taxes: this.faction.settings['planet_taxes'].value
        };
    },

    methods: {
        updateTaxes(taxes) {
            this.taxes = taxes;

            this.$emit('input', { taxes });
        }
    }
}
</script>

<style lang="less" scoped>

</style>
