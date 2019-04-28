<template>
    <div id="player-menu" v-if="player">
        <header v-if="player.isActive">
            <colored-picto :src="'G_P_Mon_64px.png'" :color="player.faction.colors['main']" width="48" height="48" />
            <p>{{ player.wallet }}</p>
        </header>
        <section>
            <nuxt-link :to="`/player/${player.id}`" class="profile-link">
                <Avatar :player="player" width="126" height="126" />
            </nuxt-link>
            <div class="player-info">
                <h4>{{ player.pseudo }}</h4>
                <h5>{{ $t('player.titles.governor') }}</h5>
            </div>
        </section>
    </div>
</template>

<script>
import Avatar from '~/components/atoms/player/avatar';
import ColoredPicto from '~/components/atoms/colored-picto';

export default {
    name: 'player-menu',
    
    props: ['player'],

    components: {
        Avatar,
        ColoredPicto
    }
}
</script>

<style lang="less" scoped>
    #player-menu {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        & > header {
            width: 60px;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-left: 20px;
            font-size: 1.2em;
            font-weight: bold;

            & > img {
                width: 32px;
            }
        }

        & > section {
            display: flex;
            align-items: center;
        }
    }

    .profile-link {
        z-index: 2;
    }

    .avatar {
        background-color: #000;
        border-radius: 70px;

        img {
            width: 126px;
            height: 126px;
            border-radius: 70px;
            border: 3px solid #EFEFEF;
        }
    }

    .player-info {
        min-width: 180px;
        margin-left: -20px;
        padding: 5px 30px 5px 10%;
        background-color: #312B29;
        clip-path: polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%);

        & > h4, & > h5 {
            margin: 0px;
            text-align: center;
        }

        & > h4 {
            padding-bottom: 5px;
            border-bottom: 2px solid #EFEFEF;
        }

        & > h5 {
            padding-top: 5px;
        }
    }
</style>
