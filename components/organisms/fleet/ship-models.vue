<template>
    <div id="ship-models">
        <div>
            <section>
                <div class="ship-models-container">
                    <ship-model v-for="model in models" :key="model.id" :model="model" @click.native="$emit('selectModel', model)" :isSelected="isSelected(model)"/>
                </div>
            </section>
            <footer>
                <div v-if="hasCurrentPlayerData" class="button" :style="{ color: factionColor }">
                    <span class="big">créer</span>
                    un modèle de vaisseau
                </div>
            </footer>
        </div>
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
        background-color: grey;
        padding: 2px;
        clip-path: @smallRectClipPath;

        & > div {
            background-color: black;
            clip-path: @smallRectClipPath;
            padding: 10px 20px 5px 20px;
            height: calc(100% - 15px);

            & >  section {
                background-color: white;
                padding: 2px;
                clip-path: @smallRectClipPath;
                height: 80%;

                & > .ship-models-container {
                    padding: 10px;
                    height: calc(100% - 10px);
                    display: flex;
                    justify-content: flex-start;
                    align-items: flex-start;
                    align-content: flex-start;
                    flex-wrap: wrap;
                    background-color: black;
                    clip-path: @smallRectClipPath;
                    overflow: hidden;
                }
            }

            & > footer {
                display: flex;
                justify-content: center;
                padding-top: 10px;
            }
        }
    }
</style>
