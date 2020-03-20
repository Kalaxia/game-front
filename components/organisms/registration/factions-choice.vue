<template>
    <div id="factions-choice">
        <div class="list">
            <header>
                <h1 v-html="$t('registration.faction.title')"></h1>
            </header>
            <section>
                <faction-item v-for="faction in factions"
                    :key="faction.id"
                    :faction="faction"
                    :isSelected="selectedFaction == faction"
                    @click.native="selectedFaction = faction"/>
            </section>
            <footer>
                <transition name="next">
                    <button v-if="selectedFaction" :style="{ borderColor: selectedFaction.colors['main'] }" @click="$emit('selectFaction', selectedFaction)">
                        {{ $t('registration.next') }}
                    </button>
                </transition>
            </footer>
        </div>
        <div class="details" v-if="selectedFaction">
            <header>
                <faction-banner :faction="selectedFaction" :width="96" :height="126" />
                <h2>{{ selectedFaction.name }}</h2>
            </header>
            <section v-html="$t(`faction.backgrounds.${selectedFaction.slug}`)"></section>
        </div>
    </div>
</template>

<script>
import FactionBanner from '~/components/atoms/faction/banner';
import FactionItem from '~/components/molecules/registration/faction-item';

export default {
    name: 'factions-choice',

    props: ['factions'],

    data() {
        return {
            selectedFaction: null
        };
    },
    
    components: {
        FactionBanner,
        FactionItem
    },
}
</script>

<style lang="less" scoped>
    #factions-choice {
        display: flex;
        align-items: stretch;

        & > .list {
            margin-right: 20px;
            border-right: 2px solid grey;

            & > header {
                text-align: center;
                border-bottom: 2px solid grey;

                & > h1 {
                    padding: 0px 20px;
                    font-variant: small-caps;
                    font-weight: normal;
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

        & > .details {
            flex-grow: 1;
            
            & > header {
                display: flex;

                & > .faction-banner {
                    margin-right: 40px;
                }
            }

            & > section {
                width: 60%;
                margin: 50px auto;
            }
        }
    }

    @media (max-width: 800px) {
        #factions-choice {
            & > .list {
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
    }
</style>
