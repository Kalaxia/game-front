<template>
    <a :href="`/views/fleet/fleet.html?id=${fleet.id}`">
        <header>
            {{ fleet.id }}
        </header>
        <section v-if="fleet.journey">

        </section>
        <section v-else>
            <planet-image :type="fleet.location.type" width="48" height="48" />
            <p>{{ $t('fleet.view.all.on_planet', { planet: fleet.location.name }) }}</p>
        </section>
    </a>
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
    a {
        display: block;
        color: #EFEFEF;
        text-decoration: none;
        margin: 5px;
        clip-path: polygon(10% 0%, 90% 0%, 100% 20%, 100% 80%, 90% 100%, 10% 100%, 0% 80%, 0% 20%);
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
