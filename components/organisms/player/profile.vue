<template>
    <div id="player-profile">
        <div class="data">

        </div>
        <planet-list :planets="planets" />
    </div>
</template>

<script>
import PlanetList from '~/components/organisms/planet/list';

export default {
    name: 'player-profile',
    
    props: ['player', 'planets'],

    components: {
        PlanetList
    }
}
</script>

<style lang="less" scoped>

</style>
