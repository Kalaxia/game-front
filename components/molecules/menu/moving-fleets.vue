<template>
    <nuxt-link id="menu-moving-fleets" :to="`/planet/${currentPlanet.id}/fleets`" class="module">
        <header>
            <div :class="{ alert: (coming.length > 0) }">
                <colored-picto src="Combat.svg" :color="factionColors[(coming.length > 0) ? 'black' : 'white']" :width="18" :height="18" />
            </div>
        </header>
        <section>
            <div>
                {{ leaving.length }}
            </div>
            <div>
                {{ coming.length }}
            </div>
        </section>
    </nuxt-link>
</template>

<script>
import ColoredPicto from '~/components/atoms/colored-picto';
import { mapGetters } from 'vuex';

export default {
    name: 'menu-moving-fleets',

    props: ['coming', 'leaving'],

    components: {
        ColoredPicto
    },

    computed: {
        ...mapGetters({
            currentPlanet: 'user/currentPlanet',
            factionColors: 'user/factionColors'
        })
    }
}
</script>

<style lang="less" scoped>
    @import '~less/variables.less';

    #menu-moving-fleets {
        display: flex;
        flex-direction: column;
        width: 120px;

        & > header {
            & > div.alert {
                background-color: @checkRed;
            }
        }

        & > section {
            flex-grow: 1;
            margin-top: 5px;
            display: flex;
            justify-content: space-between;

            & > div {
                font-size: 1.2em;
                font-weight: bold;

                &:first-child {
                    color: @checkGreen;
                }

                &:last-child {
                    color: @checkRed;
                }
            }
        }
    }
</style>

