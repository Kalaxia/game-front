<template>
    <div :class="['hangar-group', { selected: isSelected }]" :style="{ backgroundColor: factionColors['main'], borderColor: factionColors['main'] }">
        <header>
            <h5>
                {{ group.name }}
            </h5>
        </header>
        <section>
            <div class="ship-type">
                <ship-type :type="group.type" :color="factionColors[isSelected ? 'main' : 'white']" :size="32" />
            </div>
        </section>
        <footer>
            <strong>x{{ group.quantity }}</strong>
        </footer>
    </div>
</template>

<script>
import ShipType from '~/components/atoms/ship/type';
import { mapGetters } from 'vuex';

export default {
    name: 'planet-hangar-group',

    props: ['group', 'isSelected'],

    components: {
        ShipType
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        })
    }
}
</script>

<style lang="less" scoped>
    .hangar-group {
        border: 1px solid;
        border-radius: 5px;
        padding: 5px 10px;
        margin: 5px;
        cursor: pointer;

        & > header {
            & > h5 {
                color: black;
                margin: 5px 0px;
            }
        }

        & > section {
            display: flex;
            justify-content: center;

            & > .ship-type {
                padding: 10px;
                border-radius: 50%;
                background-color: black;
                border: 1px solid black;
            }
        }

        & > footer {
            margin-top: 10px;
            text-align: center;
            font-size: 0.9em;
            color: black;
        }

        &:not(.selected) {
            border-color: white !important;
            background-color: black !important;

            & > header {
                & > h5 {
                    color: white;
                }
            }

            & > section {
                & > .ship-type {
                    border-color: white;
                }
            }

            & > footer {
                color: white;
            }
        }
    }
</style>