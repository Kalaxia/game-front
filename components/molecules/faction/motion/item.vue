<template>
    <nuxt-link :to="`/faction/${motion.faction.id}/motions/${motion.id}`" class="motion-item" :style="{ color: factionColors['white'], borderColor: factionColors['grey'] }">
        <header>
            <player-link :player="motion.author" :width="48" />
            <h4>{{ $t(`faction.motions.types.${motion.type}.title`) }}</h4>
        </header>
        <section v-if="!motion.isProcessed">
            <gauge :levels="gaugeLevels" :background="factionColors['black']" />
            <timer :date="motion.endedAt" />
        </section>
        <section v-else>
            <div>
                <span>{{ $t(`faction.motions.${(motion.isApproved) ? 'approved' : 'rejected'}`, { date: motion.endedAt.toLocaleDateString('fr-FR', { minute: 'numeric', hour: 'numeric' }) }) }}</span>
            </div>
        </section>
    </nuxt-link>
</template>

<script>
import PlayerLink from '~/components/atoms/player/link';
import Gauge from '~/components/atoms/gauge';
import Timer from '~/components/atoms/timer';
import { mapGetters } from 'vuex';

export default {
    name: 'motion-item',
    
    props: ['motion'],

    components: {
        Gauge,
        PlayerLink,
        Timer
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        }),

        gaugeLevels () {
            const createdAt = this.motion.createdAt.getTime();

            return [
                {
                    value: (((new Date()).getTime() - createdAt) / (this.motion.endedAt.getTime() - createdAt)) * 100,
                    color: this.factionColors['mainLight']
                }
            ];
        }
    }
}
</script>

<style lang="less" scoped>
    .motion-item {
        display: block;
        padding: 10px;
        border-top: 1px solid;
        text-decoration: none;

        & > header {
            display: flex;
            justify-content: space-between;
            & > h4 {
                margin: 0px;
            }
        }

        & > section {
            padding: 10px 0px;

            & > .gauge {
                height: 15px;
            }
            
            & > .timer {
                text-align: center;
            }
        }
    }
</style>
