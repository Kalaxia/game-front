<template>
    <div>
        <div id="motion-form">
            <header>
                Créer une motion
            </header>
            <section>
                <form @submit.prevent="createMotion">
                    <select v-model="type">
                        <option v-for="t in motionTypes" :key="t" :value="t">
                            {{ t }}
                        </option>
                    </select>
                    <component v-if="type !== null" :is="motionForm" v-model="extraData" :faction="faction" />
                    <button type="submit">Lancer la motion</button>
                </form>
            </section>
        </div>
    </div>
</template>

<script>
import RegimeForm from '~/components/molecules/faction/motion/form/regime';
import PlanetTaxesForm from '~/components/molecules/faction/motion/form/planet_taxes';

export default {
    name: 'new-faction-motion',

    data() {
        return {
            type: null,
            extraData: {}
        };
    },

    async asyncData({ app, params }) {
        return {
            faction: await app.$repositories.faction.getFaction(params.id)
        };
    },

    computed: {
        motionTypes() {
            return this.$resources.faction_motion_types;
        },

        motionForm() {
            return {
                regime: RegimeForm,
                planet_taxes: PlanetTaxesForm
            }[this.type];
        }
    },

    methods: {
        createMotion() {
            try {
                const motion = this.$repositories.faction.createMotion(this.faction, this.type, this.extraData);

                this.$store.commit('notifications/add', {
                    type: 'success',
                    message: 'factions.motions.success',
                });

                this.router.push(`/faction/${this.faction.id}/motions/${motion.id}`);
            } catch(err) {
                this.$store.commit('notifications/add', {
                    type: 'error',
                    message: err.message
                });
            }
        }
    }
}
</script>

<style lang="less" scoped>
    #motion-form {
        grid-column: ~"2/6";
        grid-row: ~"3/9";
    }
</style>
