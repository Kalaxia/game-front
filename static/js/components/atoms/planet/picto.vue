<template>
    <img :src="`/static/images/picto/${picto}`" :width="width" :height="height" :alt="type" />  
</template>

<script>
export default {
    name: 'planet-picto',

    props: ['type', 'width', 'height'],

    computed: {
        picto: function () {
            return {
                arctic: 'P_PL_Ice_64.png',
                desert: 'P_PL_Gaz_64.png',
                oceanic: 'P_PL_Wate_64.png',
                temperate: 'P_PL_Temp_64.png',
                tropical: 'P_PL_Trop_64.png',
                rocky: 'P_PL_Rock_64.png',
                volcanic: 'P_PL_Volc_64.png'
            }[this.type];
        }
    }
}
</script>

<style lang="less" scoped>

</style>
