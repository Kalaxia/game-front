<template>
    <div class="previous-motions" :style="{ borderColor: factionColors['grey'] }">
        <header>
            <h3 :style="{ color: factionColors['main'] }">{{ $t('faction.motions.voted_list') }}</h3>
        </header>
        <section :style="{ borderColor: factionColors['grey'] }">
            <motion-item v-for="m in motions" :key="m.id" :motion="m" />
        </section>
    </div>
</template>

<script>
import MotionItem from '~/components/molecules/faction/motion/item';
import { mapGetters } from 'vuex';

export default {
    name: 'previous-motions',
    
    props: ['motions'],

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
    .previous-motions {
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
            border-bottom: 1px solid;
        }
    }
</style>