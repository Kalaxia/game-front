<template>
    <div id="offers-list">
        <header>
            <div>
                <colored-picto src="G_P_Char_BK_64px.png" :width="24" :height="24" color="white" />
            </div>
            <div>
                F
            </div>
            <div class="resource">
                <colored-picto src="G_P_Lot_64px.png" :width="24" :height="24" color="white" />
            </div>
            <div class="quantity">
                <colored-picto src="G_P_Lot_64px.png" :width="24" :height="24" color="white" />
            </div>
            <div class="price">
                <colored-picto src="G_P_Mon_64px.png" :width="24" :height="24" color="white" />
                /u
            </div>
        </header>
        <section>
            <offer-item v-for="offer in offers" :key="offer.id" :offer="offer" />
        </section>
    </div>
</template>

<script>
import ColoredPicto from '~/components/atoms/colored-picto';
import OfferItem from '~/components/molecules/trade/offer-item';
import { mapGetters } from 'vuex';

export default {
    name: 'offers-list',

    props: ['offers'],

    components: {
        ColoredPicto,
        OfferItem
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
        padding: 0px 20px;

        & > header {
            display: flex;
            align-items: center;
            justify-content: space-around;
            text-align: center;
            border: 2px solid white;
            border-radius: 20px;
            padding: 10px 20px;

            & > div {
                display: flex;
                justify-content: center;
                align-items: flex-end;
                flex-grow: 1;
                border-left: 1px solid white;
                border-right: 1px solid white;

                &:first-child {
                    border-left: none;
                    flex-basis: 15%;
                }

                &.faction {
                    flex-basis: 15%;
                    flex-grow: 0;
                }

                &.resource {
                    flex-basis: 15%;
                    flex-grow: 0;
                }

                &.quantity {
                    flex-basis: 20%;
                    flex-grow: 0;
                }

                &.price {
                    flex-basis: 15%;
                    flex-grow: 0;
                }

                &:last-child {
                    border-right: none;
                }
            }
        }

        & > section {
            overflow-y: auto;

            & > .offer:nth-child(even) {
                background-color: #242424;
            }
        }
    }
</style>
