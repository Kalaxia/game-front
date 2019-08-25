<template>
    <div class="political-overview" :style="{ borderColor: factionColors['grey'] }">
        <header>
            <h3>{{ $t('faction.motions.voting_list') }}</h3>
        </header>
        <section>
            <motion-item v-for="m in motions" :key="m.id" :motion="m" />
        </section>
        <footer>
            <nuxt-link :to="`/faction/${faction.id}/motions`" class="button" :style="{ color: factionColors['white'] }">
                {{ $t('faction.motions.list_link') }}
            </nuxt-link>
            <nuxt-link :to="`/faction/${faction.id}/motions/new`" class="button" :style="{ color: factionColors['main'] }">
                {{ $t('faction.motions.create') }}
            </nuxt-link>
        </footer>
    </div>
</template>

<script>
import MotionItem from '~/components/molecules/faction/motion/item.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'faction-political-overview',

    props: ['faction', 'motions'],

    components: {
        MotionItem
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        })
    }
}
</script>

<style lang="less" scoped>
    @import '~less/atoms/button.less';

    .political-overview {
        padding: 20px;
        border: 1px solid;
        border-radius: 10px;
        display: flex;
        flex-direction: column;

        & > header {
            & > h3 {
                margin-top: 0px;
            }
        }

        & > section {
            flex-grow: 1;
        }

        & > footer {
            margin-top: 20px;
            margin-bottom: 10px;
            align-self: center;
            display: flex;
            align-items: center;

            & > .button {
                margin: 10px;
            }
        }
    }
</style>
