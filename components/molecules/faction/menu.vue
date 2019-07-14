<template>
    <div class="faction-menu">
        <nuxt-link :to="`/faction/${faction.id}/finances`" :style="{ borderColor: factionColors['white'] }">
            <colored-picto src="B_Merc_64px.png" :width="32" :height="32" :color="factionColors['white']" />
        </nuxt-link>
    </div>
</template>

<script>
import ColoredPicto from '~/components/atoms/colored-picto';
import { mapGetters } from 'vuex';

export default {
    name: 'faction-menu',
    
    props: ['faction'],

    components: {
        ColoredPicto
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        })
    }
}
</script>

<style lang="less" scoped>
    .faction-menu {
        display: flex;
        flex-direction: column;
        align-items: center;

        & > a {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10px;
            border: 2px solid;
            border-radius: 50%;
        }
    }
</style>
