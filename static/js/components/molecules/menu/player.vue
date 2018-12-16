<template>
    <div class="player-menu" v-if="player">
        <header>
            <img src="/static/images/picto/G_P_Mon_64px.png" />
            <p>{{ player.wallet }}</p>
        </header>
        <section>
            <div class="avatar">
                <img :src="`/static/images/avatars/portrait-mauve.png`" :alt="player.pseudo" />
            </div>
            <div class="player-info">
                <h4>{{ player.pseudo }}</h4>
                <h5>Un grand homme</h5>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'player-menu',
    
    props: ['player']
}
</script>

<style lang="less" scoped>
    .player-menu {
        flex-basis: 30%;

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

    .avatar {
        z-index: 2;
        background-color: #000;
        border-radius: 70px;

        & > img {
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
