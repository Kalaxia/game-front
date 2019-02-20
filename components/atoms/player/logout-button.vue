<template>
    <img src="/images/picto/G_P_Logout_64px.png" @click="logout()" alt="logout" />
</template>

<script>
export default {
    name: 'logout-button',

    methods: {
        logout: function() {
            this.$store.commit('api/logout');
        }
    }
}
</script>

<style lang="less" scoped>
    img {
        width: 32px;
        height: 32px;
        cursor: pointer;
    }
</style>
