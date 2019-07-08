<template>
    <div class="political-overview" :style="{ borderColor: factionColors['grey'] }">
        <header>
            <h3>Motions en cours</h3>
        </header>
        <section>
            <motion v-for="m in motions" :key="m.id" :motion="m" />
        </section>
        <footer>
            <nuxt-link :to="`/faction/${faction.id}/motions/new`" class="button" :style="{ color: factionColors['main'] }">
                Créer une nouvelle motion
            </nuxt-link>
        </footer>
    </div>
</template>

<script>
import Motion from '~/components/molecules/faction/motion/item.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'faction-political-overview',

    props: ['faction', 'motions'],

    components: {
        Motion
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
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;
            flex-grow: 1;
            
            & > .motion-item {
                margin: 5px 10px;
            }
        }

        & > footer {
            margin-top: 20px;
            margin-bottom: 10px;
            align-self: center;
        }
    }
</style>
