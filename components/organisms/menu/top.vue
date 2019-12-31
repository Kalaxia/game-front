<template>
    <div class="top-menu">
        <template v-if="isActive">
            <div class="delimiter" :style="{ backgroundColor: faction.colors['main'] }"></div>
            <Item link="/buildings/trade" image="B_Merc_64px.png" :color="faction.colors['main']" />
            <divider :color="faction.colors['main']" />
            <Item link="/fleets" image="G_P_Def_64px.png" :color="faction.colors['main']" />
            <divider :color="faction.colors['main']" />
            <Item image="G_P_Science_64px.png" :color="faction.colors['main']" />
            <divider :color="faction.colors['main']" />
        </template>
        <div class="banner">
            <div class="banner-holder" :style="{ backgroundColor: faction.colors['main'] }"></div>
            <FactionBanner :faction="faction" :isLink="isActive" />
            <div class="banner-holder" :style="{ backgroundColor: faction.colors['main'] }"></div>
        </div>
        <template v-if="isActive">
            <divider :color="faction.colors['main']" />
            <Item link="/" image="G_P_Ov_64px.png" :color="faction.colors['main']" />
            <divider :color="faction.colors['main']" />
            <Item link="/map" image="G_P_Map_64px.png" :color="faction.colors['main']" />
            <divider :color="faction.colors['main']" />
            <Item link="/rankings" image="G_P_Rank_64px.png" :color="faction.colors['main']" />
            <div class="delimiter" :style="{ backgroundColor: faction.colors['main'] }"></div>
        </template>
    </div>
</template>

<script>
import Divider from '~/components/atoms/menu/divider';
import Item from '~/components/atoms/menu/item';
import FactionBanner from '~/components/atoms/menu/faction-banner';

export default {
    name: 'top-menu',

    props: ['faction'],

    components: {
        Divider,
        Item,
        FactionBanner
    },

    computed: {
        isActive() {
            return this.$store.state.user.player.isActive;
        }
    }
}
</script>

<style lang="less">
    .top-menu {
        position: relative;
        grid-column: ~"3/9";
        grid-row: 1;
        display: flex;
        justify-content: space-around;
        align-items: flex-start;
        padding: 0px 64px;

        & > .banner {
            position: relative;
            padding: 0px 64px;

            & > .banner-holder {
                position: absolute;
                bottom: 15px;
                left: 0px;
                width: 64px;
                height: 48px;
                mask-image: url('/images/layout/top_menu_banner-holder_upper.png');
                mask-position: left bottom;
                mask-size: contain;
                mask-repeat: no-repeat;

                &:last-child {
                    left: auto;
                    right: 0px;
                    transform: scale(-1, 1);
                }
            }

            & > .faction-banner {
                display: flex;
                margin-top: 10px;
            }

            &::before,
            &::after {
                position: absolute;
                bottom: 15px;
                left: 0px;
                width: 48px;
                height: 48px;
                background-image: url('/images/layout/top_menu_banner-holder_lower.png');
                background-position: bottom;
                background-size: contain;
                background-repeat: no-repeat;
                content: ' ';
            }

            &::after {
                left: auto;
                right: 0px;
                transform: scale(-1, 1);
            }
        }

        & > .delimiter {
            position: absolute;
            top: 15px;
            left: 0px;
            width: 64px;
            height: 64px;
            mask-image: url('/images/layout/top_menu_diagonal_upper.png');

            &:last-child {
                left: auto;
                right: 0px;
                transform: scale(-1, 1);
            }
        }

        &::before,
        &::after {
            position: absolute;
            top: 15px;
            left: 0px;
            width: 64px;
            height: 64px;
            background-image: url('/images/layout/top_menu_diagonal_lower.png');
            content: ' ';
        }

        &::after {
            left: auto;
            right: 0px;
            transform: scale(-1, 1);
        }

        & > .menu-item:hover + .menu-divider > .upper
        & > .menu-item:hover ~ .menu-divider > .upper {
            mask-image: url('/images/layout/top_menu_vertical_upper_full.png');
        }
    }
</style>
