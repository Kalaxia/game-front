<template>
    <div class="top-menu">
        <template v-if="isActive">
            <Item image="B_Merc_64px.png" :color="faction.colors['main']" />
            <Item link="/fleets" image="G_P_Def_64px.png" :color="faction.colors['main']" />
            <Item image="G_P_Science_64px.png" :color="faction.colors['main']" />
        </template>
        <FactionBanner :faction="faction" :isLink="isActive" />
        <template v-if="isActive">
            <Item link="/" image="G_P_Ov_64px.png" :color="faction.colors['main']" />
            <Item link="/map" image="G_P_Map_64px.png" :color="faction.colors['main']" />
            <Item link="/profile" image="G_P_Rank_64px.png" :color="faction.colors['main']" />
        </template>
    </div>
</template>

<script>
import Item from '~/components/atoms/menu/item';
import FactionBanner from '~/components/atoms/menu/faction-banner';

export default {
    name: 'top-menu',

    props: ['faction'],

    components: {
        Item,
        FactionBanner
    },

    computed: {
        isActive() {
            return this.$store.state.user.player.isActive;
        }
    }
}
</script>

<style lang="less" scoped>
    .top-menu {
        grid-column: ~"3/9";
        grid-row: 1;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: 10px;
    }
</style>
