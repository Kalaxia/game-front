<template>
    <div class="building-header">
        <div class="compartments" v-if="building.id && building.status == 'operational'">
            <div v-for="c in building.compartments"
                class="compartment"
                :key="`built-${c.id}`"
                :style="{ borderColor: factionColors[(c === compartment) ? 'main' : 'white'] }"
                @click="$emit('selectCompartment', c)">
                <div :style="`mask-image: url('/images/buildings/${compartmentPicture(c)}'); background-color: ${factionColors['white']}`"></div>
            </div>
            <div class="available"
                v-for="i in nbAvailableCompartments"
                :key="`available-${i}`"
                :style="{ borderColor: factionColors['white'] }"
                @click="$emit('showAvailableCompartments')">
                <div :style="{ backgroundColor: factionColors['grey'] }"></div>
            </div>
            <div class="remaining" v-for="i in nbRemainingCompartments" :key="`remaining-${i}`" :style="{ borderColor: factionColors['grey'] }"></div>
            <building-image :building="building" width="126px" :color="factionColors['white']" />
        </div>
        <div class="preview" v-else>
            <building-image :building="building" width="126px" :color="factionColors['white']" />
        </div>
    </div>
</template>

<script>
import BuildingImage from '~/components/atoms/building/image';
import { mapGetters } from 'vuex';

export default {
    name: 'building-header',

    props: ['building', 'plan', 'compartment'],

    components: {
        BuildingImage
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        }),

        nbAvailableCompartments() {
            return this.plan.nb_compartments - this.building.compartments.length;
        },

        nbRemainingCompartments() {
            return 4 - this.nbAvailableCompartments - this.building.compartments.length;
        }
    },

    methods: {
        compartmentPicture(compartment) {
            return this.plan.compartments.filter(c => c.name === compartment.name).shift().picture;
        }
    }
}
</script>

<style lang="less" scoped>
.building-header {
    width: 100%;

    & > .preview {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    & > .compartments {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 150px;

        & > div:not(.building-image) {
            width: 48px;
            height: 48px;
            margin: 10px;
            border: 2px solid;
            border-radius: 5px;

            &.available {
                border: 2px dashed;
                display: flex;
                justify-content: center;
                align-items: center;

                & > div {
                    width: 80%;
                    height: 80%;
                    mask-image: url('/images/buildings/area.png');
                    mask-size: cover;
                }
            }

            &.compartment {
                display: flex;
                justify-content: center;
                align-items: center;
                
                & > div {
                    width: 80%;
                    height: 80%;
                    mask-size: cover;
                }
            }
        }

        & > .building-image {
            order: 3;
        }

        & > div:nth-child(3) {
            order: 4;
        }

        & > div:nth-child(4) {
            order: 5;
        }
    }
}
</style>