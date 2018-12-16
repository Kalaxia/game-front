<template>
    <div class="bottom-menu">
        <PlayerMenu :player="player" />
        <div class="current-planet-menu">
            <PlanetMenu v-if="planet" :planet="planet" />
        </div>
    </div>
</template>

<script>
import PlayerMenu from '../../molecules/menu/player';
import PlanetMenu from '../../molecules/menu/planet';

export default {
    name: 'bottom-menu',
    
    props: ['player', 'planet'],

    components: {
        PlayerMenu,
        PlanetMenu
    }
}
</script>

<style lang="less" scoped>
    .bottom-menu {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        grid-column: ~"1/11";
        grid-row: 10;
        padding: 10px;
    }

    .current-planet-menu {
        display: flex;
        justify-content: flex-end;
        align-items: flex-env;
        padding-right: 10px;
        padding-bottom: 10px;
    }
</style>
