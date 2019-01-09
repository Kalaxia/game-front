<template>
    <router-link :to="`/fleets/${fleet.id}`">
        <header>
            {{ $t('fleet.title', {fleet: fleet.id}) }}
        </header>
        <section v-if="fleet.journey">

        </section>
        <section v-else>
            <planet-image :type="fleet.location.type" width="48" height="48" />
            <p>{{ $t('fleet.statuses.idle', { location: fleet.location.name }) }}</p>
        </section>
    </router-link>
</template>

<script>
import PlanetImage from '../../atoms/planet/image';

export default {
    name: 'fleet-card',

    props: ['fleet'],

    components: {
        PlanetImage
    }
}
</script>

<style lang="less" scoped>
    @import '../../../../less/atoms/box.less';

    a {
        display: block;
        color: #EFEFEF;
        text-decoration: none;
        margin: 5px;
        clip-path: @smallBoxClipPath;
        padding: 10px 20px;
        background-color: rgba(0,0,0,0.8);
    }

    header {
        font-size: 1.2em;
        margin: 5px 0px;
    }

    section {
        display: flex;
    }

    p {
        margin: 0px;
        padding-left: 10px;
    }
</style>
