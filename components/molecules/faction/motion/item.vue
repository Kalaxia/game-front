<template>
    <nuxt-link :to="`/faction/${motion.faction.id}/motions/${motion.id}`" class="motion-item" :style="{ color: factionColors['white'], borderColor: factionColors['white'] }">
        <header>
            <h4>{{ $t(`faction.motions.types.${motion.type}.title`) }}</h4>
        </header>
        <section>
            <gauge :levels="gaugeLevels" :background="factionColors['black']" />
            <timer :date="motion.endedAt" />
        </section>
        <footer>
            <nuxt-link class="author" :to="`/player/${motion.author.id}`">
                <player-avatar :player="motion.author" :width="48" :height="48" />
                <span :style="{ color: factionColors['white'] }">{{ motion.author.pseudo }}</span>
            </nuxt-link>
        </footer>
    </nuxt-link>
</template>

<script>
import PlayerAvatar from '~/components/atoms/player/avatar';
import Gauge from '~/components/atoms/gauge';
import Timer from '~/components/atoms/timer';
import { mapGetters } from 'vuex';

export default {
    name: 'motion-item',
    
    props: ['motion'],

    components: {
        Gauge,
        PlayerAvatar,
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
        padding: 10px;
        border: 2px solid;
        border-radius: 10px;
        text-decoration: none;

        & > header {
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

        & > footer {
            & > .author {
                display: flex;
                align-items: center;
                text-decoration: none;

                & > span {
                    padding-left: 5px;
                }
            }
        }
    }
</style>
