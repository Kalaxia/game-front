<template>
    <div id="ship-models">
        <section>
            <ship-model v-for="model in models" :key="model.id" :model="model" @click.native="$emit('selectModel', model)" :isSelected="isSelected(model)"/>
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
        const models = await this.$repositories.ship.model.getPlayerModels();

        for (const key in models) {
            models[key] = Object.assign({}, framesData[models[key].frame], models[key]);
        }

        this.models = models;
    },

    computed: {
        hasCurrentPlayerData() {
            return this.$store.state.user.player !== null;
        },

        factionColor() {
            return this.$store.state.user.player.faction.color;
        },
    },

    methods: {
        isSelected(model) {
            return (this.selectedModel !== null) ? model.id === this.selectedModel.id : false;
        },
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

        & >  section {
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
        }

        & > footer {
            display: flex;
            justify-content: center;
            padding-top: 10px;
        }
    }
</style>
