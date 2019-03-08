<template>
    <div id="building-details">
        <header>
            <building-image :building="building" width="76px" />

            {{ $t('buildings')[building.name] }}
        </header>
        <section>
            <template v-for="(price, index) in building.price">
                <div :key="`building-price-${index}`" v-if="price.type !== 'resource'">
                    <div>
                        <div>{{ price.amount }} <colored-picto :src="(price.type === 'credits') ? 'G_P_Mon_64px.png' : 'Pc_GenieMilitaire.png'" color="white" :width="32" :height="32"/></div>
                    </div>
                </div>
            </template>
        </section>
        <footer>
            <button class="big button" :style="{ color: factionColor }" @click="$emit('build', building)">
                Construire
            </button>
        </footer>
    </div>
</template>

<script>
import BuildingImage from '~/components/atoms/buildings/image';
import ColoredPicto from '~/components/atoms/colored-picto';

export default {
    name: 'building-details',

    props: ['building'],

    components: {
        BuildingImage,
        ColoredPicto
    },

    computed: {
        factionColor() {
            return this.$store.state.user.player.faction.color;
        }
    },
}
</script>

<style lang="less">
    @import '~less/atoms/button.less';
</style>


<style lang="less" scoped>
    #building-details {
        grid-column: ~"4/10";
        grid-row: ~"3/10";
    }
</style>
