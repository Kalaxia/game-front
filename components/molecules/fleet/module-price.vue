<template>
    <div class="module-price">
        <div v-for="(price, index) in module.price" :key="index">
            <resource-item v-if="price.resource" :resource="{ name: price.resource }" width="22px" />
        </div>
    </div>
</template>

<script>
import ColoredPicto from '~/components/atoms/colored-picto';
import ResourceItem from '~/components/atoms/resource/item';

export default {
    name: 'module-price',

    props: ['module'],

    components: {
        ColoredPicto,
        ResourceItem
    }
}
</script>

<style lang="less" scoped>

</style>
