<template>
    <div>
        <div class="back-button">
            <nuxt-link :to="`/faction/${motion.faction.id}/motions`" :style="{ color: factionColors['white'] }">
                {{ $t('faction.motions.list_link') }}
            </nuxt-link>
        </div>
        <div class="motion-details" :style="{ borderColor: factionColors['grey'] }">
            <header>
                <h1>{{ $t(`faction.motions.types.${motion.type}.title`) }}</h1>
                <player-link :player="motion.author" :width="56" />
            </header>
            <section class="description" v-html="$t(`faction.motions.types.${motion.type}.description`, motion.data)"></section>
            <section>
                <template v-if="!motion.isProcessed">
                    <div class="remaining-time">
                        <gauge :levels="remainingTimeLevels" :background="factionColors['black']" />
                        <timer :date="motion.endedAt" />
                    </div>
                    <div class="vote">
                        <template v-if="!vote">
                            <h3>Votez</h3>

                            <div class="vote-button">
                                <button @click="sendVote(1)">Oui</button>
                                <button @click="sendVote(2)">Non</button>
                                <button @click="sendVote(3)">Ne se prononce pas</button>
                            </div>
                        </template>
                        <template v-else>
                            <h3>Vous avez voté !</h3>
                        </template>
                    </div>
                </template>
                <template v-else>
                    <div class="approval">
                        <template v-if="motion.isApproved">
                            <h4>
                                Motion approuvée !
                            </h4>
                        </template>
                        <template v-else>
                            <h4>
                                Motion rejetée
                            </h4>
                        </template>
                    </div>
                    <div class="results">
                        <gauge :levels="resultLevels" :background="factionColors['black']" />
                        <div class="details">
                            <ul>
                                <li>Oui : {{ votes[1] }} <em>({{ votes[1] / nbVotes * 100}}%)</em></li>
                                <li>Non : {{ votes[2] }} <em>({{ votes[2] / nbVotes * 100}}%)</em></li>
                                <li>Ne se prononce pas : {{ votes[3] }} <em>({{ votes[3] / nbVotes * 100}}%)</em></li>
                            </ul>
                        </div>
                    </div>
                </template>
            </section>
        </div>
    </div>
</template>

<script>
import Gauge from '~/components/atoms/gauge';
import Timer from '~/components/atoms/timer';
import PlayerLink from '~/components/atoms/player/link';
import { mapGetters } from 'vuex';

export default {
    name: 'motion-details',

    async asyncData({ app, params, store }) {
        const motion = await app.$repositories.faction.getMotion(params.id, params.motion_id);
        let vote, votes;

        if (!motion.isProcessed) {
            try {
                vote = await app.$repositories.faction.getVote(params.id, params.motion_id);
            } catch(err) {
                vote = null;
            }
            votes = [];
        } else {
            vote = null;
            votes = await app.$repositories.faction.getVotes(params.id, params.motion_id);
        }
        return { motion, vote, votes };
    },

    components: {
        Gauge,
        Timer,
        PlayerLink
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        }),

        remainingTimeLevels() {
            const createdAt = this.motion.createdAt.getTime();

            return [
                {
                    value: (((new Date()).getTime() - createdAt) / (this.motion.endedAt.getTime() - createdAt)) * 100,
                    color: this.factionColors['mainLight']
                }
            ];
        },

        nbVotes() {
            return Object.values(this.votes).reduce((acc, v) => acc + v);
        },

        resultLevels() {
            return [
                {
                    value: this.votes[1] / this.nbVotes * 100,
                    color: this.factionColors['mainLight']
                },
                {
                    value: this.votes[2] / this.nbVotes * 100,
                    color: this.factionColors['dark'],
                },
                {
                    value: this.votes[3] / this.nbVotes * 100,
                    color: this.factionColors['grey']
                }
            ];
        }
    },

    methods: {
        async sendVote(option) {
            this.vote = await this.$repositories.faction.vote(this.motion.faction.id, this.motion.id, option);
        }
    }
}
</script>

<style lang="less" scoped>
    .back-button {
        grid-row: 2;
        grid-column: ~"2/10";

        & > a {
            font-size: 1.2em;
            text-decoration: none;
        }
    }

    .motion-details {
        grid-row: ~"3/9";
        grid-column: ~"2/10";
        border: 2px solid;
        border-radius: 10px;
        padding: 10px 20px;

        & > header {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        & > section {
            & > .remaining-time {
                & > .gauge {
                    height: 20px;
                }
            }

            & > .results {
                & > .gauge {
                    height: 25px;
                }
            }
        }
    }
</style>
