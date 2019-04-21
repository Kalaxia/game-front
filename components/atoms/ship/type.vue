<template>
    <colored-picto :src="`ships/${picto}`" :color="color" :width="size" :height="size" />
</template>

<script>
import ColoredPicto from '~/components/atoms/colored-picto';

export default {
    name: 'ship-type',
    
    props: ['type', 'color', 'size'],

    components: {
        ColoredPicto
    },

    computed: {
        picto () {
            return {
                fighter: 'S_Pc_Ch_BK_64px.png'
            }[this.type];
        }
    }
}
</script>

<style lang="less" scoped>

</style>

