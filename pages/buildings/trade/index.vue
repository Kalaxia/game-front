<template>
    <div id="trade-post">
        <offers-list :offers="offers" />
        <div id="offer-search">
            <h1 :style="{ color: factionColors['main'] }">
                <colored-picto src="B_Merc_64px.png" :width="32" :height="32" color="white" />
                <span>Comptoir commercial</span>
            </h1>
        </div>
        <offer-creation />
    </div>
</template>

<script>
import ColoredPicto from '~/components/atoms/colored-picto';
import OffersList from '~/components/organisms/trade/offers-list';
import OfferCreation from '~/components/organisms/trade/offer-creation';
import { OPERATION_SELL } from '~/model/trade/offer';
import { mapGetters } from 'vuex';

export default {
    name: 'page-trade-building',

    components: {
        ColoredPicto,
        OffersList,
        OfferCreation
    },

    async asyncData({ app }) {
        return {
            offers: await app.$repositories.trade.offer.getAll(OPERATION_SELL)
        };
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        })
    }
}
</script>


<style lang="less" scoped>
    #offers-list {
        grid-column: ~"2/5";
        grid-row: ~"3/9";
    }

    #offer-search {
        grid-column: ~"5/7";
        grid-row: ~"3/9";

        & > h1 {
            display: flex;
            justify-content: center;
            align-items: flex-end;
            margin: 0px;

            font-size: 1.0em;
            font-variant: small-caps;

            & > span {
                margin-left: 10px;
            }
        }
    }

    #offer-creation {
        grid-column: ~"7/10";
        grid-row: ~"3/9";
    }
</style>
