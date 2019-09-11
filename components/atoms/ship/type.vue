<template>
    <colored-picto :src="`ships/types/${type}.svg`" :color="color" :width="size" :height="size" />
</template>

<script>
import ColoredPicto from '~/components/atoms/colored-picto';

export default {
    name: 'ship-type',
    
    props: ['type', 'color', 'size'],

    components: {
        ColoredPicto
    }
}
</script>

<style lang="less" scoped>

</style>

