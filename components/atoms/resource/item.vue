<template>
    <img class="resource-item" :src="resourcePicto" :alt="resourceName" />
</template>

<script>
export default {
    name: 'resource-item',

    props: ['resource'],
    
    computed: {
        resourcePicto() {
            return `/images/resources/${this.$resources.resources[this.resource.name].picto}`;
        },

        resourceName() {
            return this.$i18n.t('planet.resources')[this.resource.name];
        }
    }
}
</script>

<style lang="less" scoped>

</style>
