<template>
    <div class="war-declaration-motion-form">
        <header>
            <div v-html="$t('faction.motions.types.war_declaration.description', { faction__name: (target) ? target.name : null })"></div>
        </header>
        <section>
            <select v-model="target" @change="$emit('input', { faction: target })">
                <option v-for="f in validFactions" :key="f.id" :value="f">
                    {{ f.name }}
                </option>
            </select>
        </section>
    </div>
</template>

<script>
import ColoredPicto from '~/components/atoms/colored-picto';
import { mapGetters } from 'vuex';

export default {
    name: 'war-declaration-motion-form',

    props: ['faction'],

    data() {
        return {
            target: null
        };
    },

    components: {
        ColoredPicto
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        }),

        validFactions() {
            return this.faction.relations.filter(r => r.state !== 'hostile').map(r => r.faction);
        }
    },
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
