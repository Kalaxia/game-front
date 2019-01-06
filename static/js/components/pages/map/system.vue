<template>
    
</template>

<script>
import { getSystem } from '../../../api/map';

export default {
    name: 'page-system',
    
    data: function() {
        return {
            system: null
        };
    },

    mounted: async function() {
        this.system = await getSystem(this.$route.params.id);
    }
}
</script>

<style lang="less" scoped>

</style>
