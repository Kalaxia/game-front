<template>
    <div id="resource-storage" :style="{ borderColor: factionColors['grey'] }">
        <header>
            <h3>{{ $t('planet.storage.name') }}</h3>
        </header>
        <section>
            <storage-item v-for="(quantity, resource) in storage.resources"
                :density="density(resource)"
                :resource="resource"
                :capacity="storage.capacity"
                :quantity="quantity"
                :key="resource" />
        </section>
    </div>
</template>

<script>
import StorageItem from '~/components/molecules/resource/storage-item';
import { mapGetters } from 'vuex';

export default {
    name: 'resource-storage',

    props: ['storage', 'resources'],

    components: {
        StorageItem
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        })
    },

    methods: {
        density(resource) {
            for (const r of this.resources) {
                if (r.name === resource) {
                    return r.density;
                }
            }
            return 0;
        }
    }
}
</script>

<style lang="less" scoped>
    #resource-storage {
        display: flex;
        flex-direction: column;
        padding: 10px 20px;
        border: 2px solid;
        border-radius: 10px;

        & > header {
            & > h3 {
                margin-top: 0;
            }
        }
        & > section {
            flex-grow: 1;
            overflow-x: hidden;
            overflow-y: auto;

            & > div {
                margin: 5px 0px;
            }
        }
    }
</style>
