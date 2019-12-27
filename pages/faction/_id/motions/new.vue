<template>
    <div>
        <div id="motion-form">
            <header>
                <h1>{{ $t('faction.motions.create') }}</h1>
                <p>{{ $t('faction.motions.creation_wording') }}</p>
            </header>
            <section>
                <form @submit.prevent="createMotion">
                    <div>
                        <label>
                            <strong>{{ $t('faction.motions.type') }}</strong>
                        </label>
                        <div>
                            <select v-model="type">
                                <option v-for="t in motionTypes" :key="t" :value="t">
                                    {{ $t(`faction.motions.types.${t}.title`) }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <component v-if="type !== null" :is="motionForm" v-model="extraData" :faction="faction" />
                    </div>
                    <button type="submit" class="button" :style="{ color: factionColors['main'] }">
                        {{ $t('faction.motions.send') }}
                    </button>
                </form>
            </section>
        </div>
    </div>
</template>

<script>
import RegimeForm from '~/components/molecules/faction/motion/form/regime';
import PlanetTaxesForm from '~/components/molecules/faction/motion/form/planet_taxes';
import WarDeclarationForm from '~/components/molecules/faction/motion/form/war_declaration';
import { mapState, mapGetters } from 'vuex';

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

    beforeMount() {
        if (this.player.faction.id !== this.faction.id) {
            this.$router.push(`/faction/${this.player.faction.id}/motions/new`);
        }
    },

    computed: {
        ...mapState('user', ['player']),

        ...mapGetters({
            factionColors: 'user/factionColors',
        }),

        motionTypes() {
            return this.$resources.faction_motion_types;
        },

        motionForm() {
            return {
                regime: RegimeForm,
                planet_taxes: PlanetTaxesForm,
                war_declaration: WarDeclarationForm
            }[this.type];
        }
    },

    methods: {
        async createMotion() {
            try {
                const motion = await this.$repositories.faction.createMotion(this.faction, this.type, this.extraData);

                this.$store.dispatch('user/addActionNotification', {
                    isError: false,
                    content: 'factions.motions.success',
                });

                this.$router.push(`/faction/${this.faction.id}/motions/${motion.id}`);
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
    @import '~less/atoms/button.less';

    #motion-form {
        grid-column: ~"2/6";
        grid-row: ~"3/9";

        & > section {
            & > form {
                & > button {
                    margin-top: 20px;
                }
            }
        }
    }
</style>
