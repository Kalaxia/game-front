<template>
    <div>
        <building-image :building="building" width="56px" />
        {{ $t('buildings')[building.name] }}
    </div>
</template>

<script>
import BuildingImage from '~/components/atoms/buildings/image';

export default {
    name: 'building-item',
    
    props: ['building', 'isConstructed'],

    components: {
        BuildingImage
    },
}
</script>

<style lang="less" scoped>

</style>
