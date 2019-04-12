<template>
    <div class="offer">
        <div>
            {{ offer.location.player.pseudo }}
        </div>
        <div class="faction">
            <img :src="`/images/factions/${offer.location.player.faction.banner}`" :alt="offer.location.player.faction.name"/>
        </div>
        <div v-if="offer.goodType === 'resources'" class="resource">
            <resource-item :resource="{ name: offer.resource }" width="32px" height="32px" />
        </div>
        <div class="quantity">
            {{ offer.quantity }}
            ({{ offer.quantity / offer.lotQuantity }})
        </div>
        <div class="price">
            {{ offer.price }}
        </div>
    </div>
</template>

<script>
import ResourceItem from '~/components/atoms/resource/item';
import FactionBanner from '~/components/atoms/faction/banner';

export default {
    name: 'offer-item',
    
    props: ['offer'],

    components: {
        FactionBanner,
        ResourceItem
    }
}
</script>

<style lang="less" scoped>
    .offer {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 5px 10px;
        border-radius: 20px;
        text-align: center;

        & > div {
            display: flex;
            justify-content: center;
            align-items: flex-end;
            flex-grow: 1;
            border-left: 1px solid black;
            border-right: 1px solid black;

            &:first-child {
                flex-basis: 15%;
                border-left: none;
            }

            &.faction {
                flex-basis: 15%;
                flex-grow: 0;

                & > img {
                    width: 32px;
                    height: 32px;
                }
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
</style>
