<template>
    <router-link :to="`/profile/${member.id}`" :alt="member.pseudo">
        <img src="/images/avatars/Hombre_v3t.png" />
        <div>
            <p>{{ member.pseudo }}</p>
            <em>{{ $t('player.titles.governor') }}</em>
        </div>
    </router-link>
</template>

<script>
export default {
    name: 'faction-member',

    props: ['member']
}
</script>

<style lang="less" scoped>
    a {
        display: flex;
        align-items: center;
        padding: 5px 15px;
        border-radius: 5px;
        text-align: center;
        text-decoration: none;
        color: #EFEFEF;
    }

    img {
        width: 64px;
        height: 64px;
        border-radius: 35px;
        border: 1px solid #A0A0A0;
    }

    p {
        margin: 5px 0px;
        padding-bottom: 5px;
        border-bottom: 2px dotted #EFEFEF;
    }

    p, em {
        text-align: center;
    }
</style>
