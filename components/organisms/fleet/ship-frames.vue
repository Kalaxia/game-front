<template>
    <div id="ship-frames">
        <header>    
            <h2>{{ $t('ships.frame') }}</h2>
        </header>
        <section>
            <div class="frame-card" v-for="frame in frames" :key="frame.slug" @click="$emit('selectFrame', frame)">
                <header>
                    <h4>{{ $t(`ships.frames.${frame.slug}`) }}</h4>
                </header>
                <section>
                    <img :src="`/images/shipyard/frame/${frame.picto}`" />
                    <div class="prices">
                        <div v-for="price in frame.price" :key="`${frame.slug}-price-${price.type}`">
                            <span>{{ price.amount }}</span>
                            <colored-picto :src="(price.type === 'credits') ? 'G_P_Mon_64px.png' : 'Pc_GenieMilitaire.png'" color="white" :width="18" :height="18"/>
                        </div>
                    </div>
                </section>
            </div>
        </section>
    </div>
</template>

<script>
import ColoredPicto from '~/components/atoms/colored-picto';

export default {
    name: 'ship-frames',

    props: ['frames'],

    components: {
        ColoredPicto
    }
}
</script>


<style lang="less" scoped>
    #ship-frames {
        border-radius: 10px;
        border: 2px solid #242424;
        padding: 10px 20px;

        & > section {
            display: flex;
            align-items: center;

            & > .frame-card {
                margin: 0px 10px;
                padding: 10px;
                border: 2px solid grey;
                border-radius: 10px;
                cursor: pointer;
                transition: border-color 0.2s ease-out;

                & > header {
                    & > h4 {
                        margin: 0px;
                        font-size: 1.1em;
                        padding-bottom: 5px;
                    }
                }

                & > section {
                    display: flex;

                    & > img {
                        width: 64px;
                    }

                    & > .prices {
                        & > div {
                            display: flex;
                            justify-content: space-between;
                            margin: 5px 0px;

                            & > span {
                                width: 50px;
                                text-align: right;
                                padding-right: 5px;
                            }
                        }
                    }
                }

                &:hover {
                    border-color: white;
                }
            }
        }
    }
</style>
