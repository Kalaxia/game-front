<template>
    <div class="full-storage-display">
        <resource-item :resource="{ name: resource }" />
        <div class="storage">
            <div class="status">
                <span :class="{full: isFull}">{{ quantity }}</span> / {{ capacity }}
            </div>
            <div class="storage-line">
                <div :class="['storage-display', resource]">
                    <div class="storage-full" :style="{ width: `${ filledCapacity }%`, backgroundColor: color }"></div>
                    <div class="storage-empty"></div>
                </div>
                <div v-if="density > 0" :class="{full: isFull}">
                    {{ fullCapacityAt }}
                </div>
            </div>
            <div v-if="density > 0 && hourlyProduction > 0" class="hourly-production">
                +{{ hourlyProduction }}/h
            </div>
        </div>
    </div>
</template>

<script>
import ResourceItem from '~/components/atoms/resource/item';
import { mapGetters } from 'vuex';

export default {
    name: 'resource-storage-item',

    props: ['density', 'resource', 'capacity', 'quantity'],

    components: {
        ResourceItem
    },

    computed: {
        ...mapGetters({
            currentPlanet: 'user/currentPlanet'
        }),

        hourlyProduction() {
            return this.currentPlanet.buildings
                .filter(b => b.type === 'resource' && this.$resources.buildings[b.name].resources.indexOf(this.resource) > -1)
                .reduce((acc, b) => {
                    const baseQuantity = this.density * 10;
                    
                    return acc + b.compartments.reduce((acc, c) => {
                        const plan = this.$resources.buildings[b.name].compartments.filter(c =>[c.name]).shift();
                        const modifierFilter = m => m.type === 'resource' && m.resource === this.resource
                        const bonus = plan.bonuses.filter(modifierFilter);
                        const malus = plan.maluses.filter(modifierFilter);
                        const percent = (bonus.length > 0 ? bonus.shift().percent : 0) - (malus.length > 0 ? malus.shift().percent : 0);
                        const compartmentQuantity = Math.floor(baseQuantity * Math.abs(percent) / 100);

                        return acc + ((percent > 0) ? compartmentQuantity : -compartmentQuantity); 
                    }, baseQuantity);
                }, 0);
        },

        isFull() {
            return this.quantity > 0 && this.quantity === this.capacity;
        },

        color() {
            return this.$resources.resources[this.resource].color;
        },

        filledCapacity() {
            return (this.quantity > 0) ? (this.quantity / this.capacity) * 100 : 0;
        },

        fullCapacityAt() {
            return (this.capacity !== this.quantity)
                ? "-" + Math.floor((this.capacity - this.quantity) / this.hourlyProduction()) +
                  "h" + (60 - (new Date()).getMinutes()) + "min"
                : this.$i18n.t('planet.storage.full')
            ;
        }
    }
}
</script>

<style lang="less" scoped>
    .storage {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        text-align: center;
        margin-left: 10px;
        margin-right: 10px;

        & > .storage-line {
            flex-grow: 1;
        }
    }

    .storage-display {
        flex-grow: 1;
        border: 5px solid #EFEFEF;
        border-radius: 25px;
        height:25px;
        width :100%;
    }

    .storage-full {
        border-radius: 25px;
        background-color: grey;
        height : 100%;
    }

    .status {
        & > span {
            font-size: 1.7em;
        }
    }

    .full {
        color: rgb(255, 0, 102);
    }

    .full-storage-display {
        display: flex;
        align-items: center;
    }

    .full-storage-display > h5 {
        margin :0;
    }

    .info {
        justify-content: center;
    }

    .hourly-production {
        justify-content: flex-end;
    }
</style>
