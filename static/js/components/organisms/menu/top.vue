<template>
    <div class="top-menu">
        <Item image="G_P_Mon_64px.png" :color="faction.color" />
        <Item link="/fleets" image="G_P_Def_64px.png" :color="faction.color" />
        <Item image="G_P_Science_64px.png" :color="faction.color" />

        <FactionBanner :faction="faction" />

        <Item link="/" image="G_P_Ov_64px.png" :color="faction.color" />
        <Item link="/map" image="G_P_Map_64px.png" :color="faction.color" />
        <Item link="/profile" image="G_P_Rank_64px.png" :color="faction.color" />
    </div>
</template>

<script>
import Item from '../../atoms/menu/item';
import FactionBanner from '../../atoms/menu/faction-banner';

export default {
    name: 'top-menu',

    props: ['faction'],

    components: {
        Item,
        FactionBanner
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
