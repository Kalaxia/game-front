<template>
    <div class="available-compartments" :style="{ borderColor: factionColors['black'] }">
        <header>
            <h3>{{ $t('planet.buildings.available_compartments') }}</h3>
        </header>
        <section :style="{ borderColor: factionColors['grey'] }">
            <div v-for="c in compartments" :key="c.name" @click="$emit('selectCompartment', c)" :style="{ borderColor: factionColors['grey'] }">
                {{ $t(`compartments.${c.name}.title`) }}
            </div>
        </section>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'available-compartments',

    props: ['building'],

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        }),

        plan() {
            return this.$resources.buildings[this.building.name];
        },

        compartments() {
            const names = this.building.compartments.map(c => c.name);

            return this.plan.compartments.filter(c => names.indexOf(c) < 0).map(c => {
                c.building = this.building;
                return c;
            });
        }
    }
}
</script>

<style lang="less" scoped>
.available-compartments {
    padding: 20px;
    border: 2px solid;
    border-radius: 10px;

    & > header {
        & > h3 {
            margin: 0px;
        }
    }

    & > section {
        margin-top: 20px;
        border-top: 1px solid;

        & > div {
            border-bottom: 1px solid;
            font-size: 1.1em;
            font-variant: small-caps;
            padding: 10px;
        }
    }
}
</style>