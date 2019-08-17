<template>
    <div class="construction-list" :style="{ borderColor: factionColors['black'] }">

    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'building-construction-list',

    props: ['constructions'],

    computed: {
        ...mapGetters({
            currentPlanet: 'user/currentPlanet',
            factionColors: 'user/factionColors',
        })
    }
}
</script>

<style lang="less" scoped>
    .construction-list {
        border: 2px solid;
        border: 10px;
        padding: 10px;

    }
</style>
