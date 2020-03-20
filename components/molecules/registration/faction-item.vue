<template>
    <div :class="['faction-item', { selected: isSelected }]">
        <div class="banner">
            <img :src="`/images/factions/${faction.banner}`" :alt="faction.name"/>
        </div>
        <div class="info">
            <h5>{{ faction.name }}</h5>
            <p>{{ faction.description }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'faction-item',
    
    props: ['faction', 'isSelected'],

    computed: {
        style() {
            return {
                padding: (this.isSelected) ? '5px' : '2px',
                backgroundColor: this.faction.colors['main'],
            };
        }
    }
}
</script>

<style lang="less" scoped>
    .faction-item {
        display: flex;
        padding: 5px 10px;
        border-bottom: 1px solid grey;
        background-color: #242424;
        transition: background-color 0.2s;
        cursor: pointer;

        &:hover,
        &.selected {
            background-color: black;
        }

        & > .banner {
            width: 64px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 20px;

            & > img {
                height: 64px;
            }
        }

        & > .info {
            & > h5 {
                margin: 10px 0px;
                font-style: italic;
                font-variant: small-caps;
                font-size: 1.2em;
            }

            & > p {
                margin-top: 0px;
                font-variant: small-caps;
                font-size: 1.1em;
            }
        }
    }

    @media (max-width: 800px) {
        .faction-item {
            flex-direction: column;

            & > .banner {
                & > img {
                    height: 64px;
                }
            }
           
            & > .info {
                & > p {
                    font-size: 0.9em;
                    margin-top: 10px;
                }

                & > h5 {
                    font-size: 0.9em;
                }
            }
        }
    }
</style>
