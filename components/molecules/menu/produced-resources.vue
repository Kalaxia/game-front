<template>
    <div v-if="planet" id="menu-produced-resources">
        <section>
            <div>
                <resource-item :resource="resourceItem" />
                {{ storedQuantity }}
            </div>
            <div>
                <div class="left-arrow" @click="setIndex(index - 1)">
                    <colored-picto src="arrow_right.svg" :color="factionColors['white']" :width="18" :height="18" />
                </div>
                <gauge :levels="storageLevel" :background="factionColors['black']" />
                <div class="right-arrow" @click="setIndex(index + 1)">
                    <colored-picto src="arrow_right.svg" :color="factionColors['white']" :width="18" :height="18" />
                </div>
            </div>
        </section>
        <footer>
            <nuxt-link class="small button" :to="`/planet/${planet.id}/production`" :style="{ color: factionColors['white'] }">
                Production
            </nuxt-link>
        </footer>
    </div>
</template>

<script>
import ColoredPicto from '~/components/atoms/colored-picto';
import ResourceItem from '~/components/atoms/resource/item';
import Gauge from '~/components/atoms/gauge';
import { mapGetters } from 'vuex';

export default {
    name: 'menu-produced-resources',

    props: ['planet'],

    data() {
        return {
            index: 0,
        };
    },

    components: {
        ColoredPicto,
        Gauge,
        ResourceItem
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        }),

        resource() {
            return this.storedResources[this.index];
        },

        resourceItem() {
            return { name: this.resource };
        },

        storedResources() {
            return Object.keys(this.planet.storage.resources);
        },

        storedQuantity() {
            return this.planet.storage.resources[this.resource];
        },

        storageLevel() {
            console.log(this.resource, this.$resources.resources[this.resource]);
            return [{
                color: this.$resources.resources[this.resource].color,
                value: Math.floor(this.storedQuantity / this.planet.storage.capacity * 100)
            }];
        }
    },

    methods: {
        setIndex(index) {
            if (index < 0) {
                this.index = this.storedResources.length - 1;
            } else if (index >= this.storedResources.length) {
                this.index = 0;
            } else {
                this.index = index;
            }
        }
    }
}
</script>

<style lang="less" scoped>
    @import '~less/atoms/button.less';

    #menu-produced-resources {
        min-width: 150px;

        & > section {
            & > div {
                &:first-child {
                    display: flex;
                    justify-content: center;
                    align-items: flex-end;
                    font-size: 0.8em;

                    & > .resource-item {
                        width: 22px;
                        margin-right: 5px;
                    }
                }

                &:last-child {
                    margin-top: 4px;
                    display: flex;
                    justify-content: space-between;

                    & > .left-arrow {
                        transform: rotate(180deg);
                    }

                    & > .gauge {
                        flex-grow: 1;
                        height: 12px;
                        margin: 0px 5px;
                    }
                }
            }
        }

        & > footer {
            display: flex;
            justify-content: center;
            margin-top: 10px;
        }
    }
</style>
