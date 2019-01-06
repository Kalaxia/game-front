<template>
    <div id="planet-resources">
        <production-link :planet="planet" />
        <resource-item v-for="resource in planet.resources" :resource="resource" :key="resource.name" />
    </div>
</template>

<script>
import ProductionLink from '../../atoms/resource/production-link';
import ResourceItem from '../../atoms/resource/item';

export default {
    name: 'planet-resources',

    props: ['planet'],

    components: {
        ProductionLink,
        ResourceItem
    }
}
</script>

<style lang="less" scoped>

</style>
