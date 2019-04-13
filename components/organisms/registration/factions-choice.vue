<template>
    <div id="factions-choice">
        <header>
            <h1 v-html="$t('registration.faction.title')"></h1>
        </header>
        <section v-if="factions">
            <faction-item v-for="faction in factions"
                :key="faction.id"
                :faction="faction"
                :selectedFaction="selectedFaction"
                @select-faction="selectedFaction = $event"/>
        </section>
        <footer>
            <transition name="next">
                <button v-if="isFactionSelected" :style="{ borderColor: selectedFaction.colors['main'] }" @click="$emit('selectFaction', selectedFaction)">
                    {{ $t('registration.next') }}
                </button>
            </transition>
        </footer>
    </div>
</template>

<script>
import FactionItem from '~/components/molecules/registration/faction-item';

export default {
    name: 'factions-choice',

    data() {
        return {
            selectedFaction: null,
            factions: new Array()
        };
    },
    
    components: {
        FactionItem
    },

    async mounted() {
        this.factions = await this.$repositories.faction.getFactions();
    },

    computed: {
        isFactionSelected() {
            return this.selectedFaction !== null;
        }
    },

    methods: {
        onFactionSelection(faction) {
            this.selectedFaction = faction;
        }
    }
}
</script>

<style lang="less" scoped>
    #factions-choice {
        & > header {
            text-align: center;

            & > h1 {
                margin-bottom: 50px;
                font-variant: small-caps;
                font-weight: normal;
            }
        }

        & > section {
            display: flex;
            align-items: stretch;
            justify-content: space-between;

            & > .faction-container {
                flex-basis: 30%;
            }
        }

        & > footer {
            display: flex;
            justify-content: center;
            padding-top: 40px;

            & > button {
                display: flex;
                justify-content: center;
                align-items: center;
                padding-bottom: 5px;
                width: 200px;
                height: 50px;
                font-size: 1.5em;
                font-variant: small-caps;
                border: 2px solid;
                border-radius: 25px;
                background-color: black;
                color: white;
                cursor: pointer;
            }

            .next-enter-active, .next-leave-active {
                transition: opacity .5s;
            }
            .next-enter, .next-leave-to {
                opacity: 0;
            }
        }
    }

    @media (max-width: 800px) {
        #factions-choice {
            & > header {
                & > h1 {
                    font-size: 1.2em;
                    margin-bottom: 20px;
                }
            }

            & > footer {
                padding-top: 20px;

                & > button {
                    width: 150px;
                    height: 30px;
                    font-size: 1.1em;
                }
            }
        }
    }
</style>
