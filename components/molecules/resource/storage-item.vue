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
            <div v-if="density > 0" class="hourly-production">
                +{{ hourlyProduction() }}/h
            </div>
        </div>
    </div>
</template>

<script>
import ResourceItem from '~/components/atoms/resource/item';

export default {
    name: 'resource-storage-item',

    props: ['density', 'resource', 'capacity', 'quantity'],

    components: {
        ResourceItem
    },

    methods: {
        hourlyProduction() {
            return this.density * 10;
        }
    },

    computed: {
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
