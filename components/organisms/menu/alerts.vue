<template>
    <div class="alerts-list" :style="{ display: alerts.length > 0 ? 'flex' : 'none' }">
        <alert v-for="(a, i) in alerts" :key="`alert-${i}`" :alert="a" />
    </div>
</template>

<script>
import Alert from '~/components/molecules/menu/alert';
import { mapState } from 'vuex';

export default {
    name: 'user-alerts-list',

    components: {
        Alert
    },

    computed: {
        ...mapState('user', ['alerts'])
    }
}
</script>

<style lang="less" scoped>
.alerts-list {
    display: flex;
    align-items: stretch;
    flex-direction: column;
}
</style>