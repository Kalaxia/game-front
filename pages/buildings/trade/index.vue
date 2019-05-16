<template>
    <div id="trade-post">
        <offers-list :selectedOffer="selectedOffer" @selectOffer="selectedOffer = $event" @unselectOffer="selectedOffer = null" />
        <div id="offer-search">
            <h1 :style="{ color: factionColors['main'] }">
                <colored-picto src="B_Merc_64px.png" :width="32" :height="32" color="white" />
                <span>{{ $t('trade.trading_post') }}</span>
            </h1>
        </div>
        <offer-details v-if="selectedOffer" :offer="selectedOffer" :key="selectedOffer.id" @acceptOffer="acceptOffer" @cancelOffer="cancelOffer" />
        <offer-creation v-else-if="!isStorageEmpty" />
    </div>
</template>

<script>
import ColoredPicto from '~/components/atoms/colored-picto';
import OffersList from '~/components/organisms/trade/offers-list';
import OfferDetails from '~/components/organisms/trade/offer-details';
import OfferCreation from '~/components/organisms/trade/offer-creation';
import { OPERATION_SELL } from '~/model/trade/offer';
import { mapGetters } from 'vuex';

export default {
    name: 'page-trade-building',

    components: {
        ColoredPicto,
        OffersList,
        OfferDetails,
        OfferCreation
    },

    data() {
        return {
            selectedOffer: null
        }
    },

    async created() {
        this.$store.commit('trade/offers', await this.$repositories.trade.offer.getAll(OPERATION_SELL));
    },

    destroyed() {
        this.$store.commit('trade/offers', []);
    },

    computed: {
        ...mapGetters({
            isStorageEmpty: 'user/isStorageEmpty',
            factionColors: 'user/factionColors',
            currentPlanet: 'user/currentPlanet'
        })
    },

    methods: {
        async acceptOffer(nbLots) {
            try {
                await this.$repositories.trade.offer.accept(this.selectedOffer, nbLots, this.currentPlanet.id);
            } catch(err) {
                this.$store.dispatch('user/addActionNotification', {
                    isError: true,
                    content: err
                });
                return;
            }
            const quantity = nbLots * this.selectedOffer.lotQuantity;
            // this.$store.commit('trade/decreaseQuantity', {
            //     offer: this.selectedOffer,
            //     quantity,
            // });
            this.$store.commit('user/updateStorageResource', {
                resource: this.selectedOffer.resource,
                quantity: quantity
            });
            this.$store.commit('user/spend', {
                type: 'credits',
                amount: this.selectedOffer.price * quantity
            });
            this.$store.dispatch('user/addActionNotification', {
                isError: false,
                content: `trade.notifications.${this.selectedOffer.operation}_${this.selectedOffer.goodType}_success`
            });

            if (this.selectedOffer.quantity === 0) {
                this.removeOffer(this.selectedOffer);
            }
            this.selectedOffer = null;
        },

        async cancelOffer() {
            try {
                await this.$repositories.trade.offer.cancel(this.selectedOffer);
            } catch(err) {
                this.$store.dispatch('user/addActionNotification', {
                    isError: true,
                    content: err
                });
                return;
            }

            this.removeOffer(this.selectedOffer);

            this.$store.commit('user/updateStorageResource', {
                resource: this.selectedOffer.resource,
                quantity: this.selectedOffer.quantity
            });
            this.$store.dispatch('user/addActionNotification', {
                isError: false,
                content: `trade.notifications.${this.selectedOffer.operation}_offer_cancel`
            });

            this.selectedOffer = null;
        },

        removeOffer(offer) {
            for (const i in this.offers) {
                if (this.offers[i].id === offer.id) {
                    this.offers.splice(i, 1);
                }
            }
        }
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

    #offer-creation,
    #offer-details {
        grid-column: ~"7/10";
        grid-row: ~"3/9";
    }
</style>
