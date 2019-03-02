<template>
    <div id="ship-models">
        <section>
            <ship-model v-for="model in models"
                :key="model.id"
                :model="model"
                @click.native="$emit('selectModel', model)"
                :isSelected="isSelected(model)"/>
        </section>
        <footer>
            <div v-if="hasCurrentPlayerData" class="button" :style="{ color: factionColor }">
                <span class="big">créer</span>
                un modèle de vaisseau
            </div>
        </footer>
    </div>
</template>

<script>
import ShipModel from '~/components/molecules/fleet/ship-model';
import framesData from '~/resources/ship_frames';

export default {
    name: 'ship-models',

    props: ['selectedModel'],

    components: {
        ShipModel
    },
    
    data() {
        return {
            models: new Array()
        };
    },

    async mounted() {
        this.models = await this.$repositories.ship.model.getPlayerModels();

        if (this.currentPlanet !== null) {
            this.processMaxAvailable();
        }
    },

    computed: {
        hasCurrentPlayerData() {
            return this.$store.state.user.player !== null;
        },

        factionColor() {
            return this.$store.state.user.player.faction.color;
        },

        currentPlanet() {
            return this.$store.state.user.currentPlanet;
        }
    },

    watch: {
        currentPlanet(planet) {
            this.processMaxAvailable();
        },
    },

    methods: {
        isSelected(model) {
            return (this.selectedModel !== null) ? model.id === this.selectedModel.id : false;
        },

        processMaxAvailable() {
            for (const model of this.models) {
                model.maxAvailable = this.getMaxAvailable(model);
            }
        },

        getMaxAvailable(model) {
            let max = 50;
            for (const price of model.price) {
                let nbShips;
                switch (price.type) {
                    case 'resource':
                        nbShips = Math.floor(this.$store.getters['user/getStoredResource'](price.resource) / price.amount);
                        break;
                    case 'credits':
                        nbShips = Math.floor(this.$store.state.user.player.wallet / price.amount);
                        break;
                }
                if (nbShips < max) {
                    max = nbShips;
                }
            }
            return max;
        }
    }
}
</script>

<style lang="less" scoped>
    @import '~less/atoms/box.less';
    @import '~less/atoms/button.less';

    #ship-models {
        border: 2px solid grey;
        border-radius: 10px;
        padding: 10px 20px 5px 20px;

        display: flex;
        flex-direction: column;

        & > section {
            border: 2px solid white;
            border-radius: 10px;
            padding: 10px;

            display: flex;
            flex-grow: 1;
            justify-content: flex-start;
            align-items: flex-start;
            align-content: flex-start;
            flex-wrap: wrap;
            background-color: black;
            overflow-y: scroll;
        }

        & > footer {
            display: flex;
            justify-content: center;
            padding-top: 10px;
        }
    }
</style>
