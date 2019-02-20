<template>
    <img :src="`/images/picto/planet/${picto}`" :width="width" :height="height" :alt="type" />  
</template>

<script>
export default {
    name: 'planet-picto',

    props: {
        type: String,
        width: Number,
        height: Number,
        reverse: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        picto: function () {
            return ((this.reverse === true) ? {
                arctic: 'P_PL_Ice_Rv_BK_64px.png',
                desert: 'P_PL_Gaz_Rv_BK_64px.png',
                oceanic: 'P_PL_Wate_Rv_BK_64px.png',
                temperate: 'P_PL_Temp_Rv_BK_64px.png',
                tropical: 'P_PL_Trop_Rv_BK_64px.png',
                rocky: 'P_PL_Rock_Rv_BK_64px.png',
                volcanic: 'P_PL_Volc_Rv_BK_64px.png'
            } : {
                arctic: 'P_PL_Ice_64.png',
                desert: 'P_PL_Gaz_64.png',
                oceanic: 'P_PL_Wate_64.png',
                temperate: 'P_PL_Temp_64.png',
                tropical: 'P_PL_Trop_64.png',
                rocky: 'P_PL_Rock_64px.png',
                volcanic: 'P_PL_Volc_64.png'
            })[this.type];
        }
    }
}
</script>

<style lang="less" scoped>

</style>
