<template>
    <div id="offers-list">
        <header>
            <div>
                <colored-picto src="G_P_Char_BK_64px.png" :width="24" :height="24" color="white" />
            </div>
            <div>
                <colored-picto src="trade/Faction.svg" :width="24" :height="24" color="white" />
            </div>
            <div class="resource">
                <colored-picto src="trade/Lot.svg" :width="24" :height="24" color="white" />
            </div>
            <div class="quantity">
                <colored-picto src="trade/Lots.svg" :width="24" :height="24" color="white" />
                (<colored-picto src="trade/Lot.svg" :width="18" :height="18" color="white" />)
            </div>
            <div class="price">
                <colored-picto src="trade/PricePerUnit.svg" :width="32" :height="24" color="white" />
            </div>
        </header>
        <section>
            <offer-item
                v-for="offer in offers"
                :key="offer.id"
                :offer="offer"
                :class="{ selected: offer === selectedOffer }"
                @click.native="$emit('selectOffer', offer)" />
        </section>
        <footer v-if="selectedOffer">
            <button @click="$emit('unselectOffer')" class="button big" :style="{ color: factionColors['main'] }">
                Créer une offre
            </button>
        </footer>
    </div>
</template>

<script>
import ColoredPicto from '~/components/atoms/colored-picto';
import OfferItem from '~/components/molecules/trade/offer-item';
import { mapGetters } from 'vuex';

export default {
    name: 'offers-list',

    props: ['offers', 'selectedOffer'],

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
    @import '~less/atoms/button.less';

    #offers-list {
        display: flex;
        flex-direction: column;
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
                    display: flex;
                    flex-basis: 20%;
                    flex-grow: 0;

                    & > div:first-child {
                        margin-right: 5px;
                    }
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
            flex-grow: 1;
            overflow-y: auto;
        }

        & > footer {
            display: flex;
            justify-content: center;
        }
    }
</style>
