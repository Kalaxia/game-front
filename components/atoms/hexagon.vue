<template>
    <div class="hexagon" :style="{ borderColor }">
        <div class="top" :style="{
                borderTopWidth: `${verticalBorderWidth}px`,
                borderBottomWidth: `${verticalBorderWidth}px`,
                borderRightWidth: `${horizontalBorderWidth + borderSize}px`
            }">
            <div class="content" :style="{
                top: `-${verticalBorderWidth - borderSize}px`,
                right: `-${horizontalBorderWidth + borderSize}px`,
                borderTopWidth: `${verticalBorderWidth - borderSize}px`,
                borderBottomWidth: `${verticalBorderWidth - borderSize}px`,
                borderRightWidth: `${horizontalBorderWidth}px`,
                borderRightColor: backgroundColor
                }"></div>
        </div>

        <div class="middle" :style="{
            backgroundColor: borderColor,
            width: `${width}px`,
            height: `${height}px`
            }">
            <div class="content" :style="{
                backgroundColor,
                top: `${borderSize}px`,
                height: `${height - borderSize * 2}px`
                }">
                <slot />
            </div>
        </div>

        <div class="footer" :style="{
                borderTopWidth: `${verticalBorderWidth}px`,
                borderBottomWidth: `${verticalBorderWidth}px`,
                borderLeftWidth: `${horizontalBorderWidth + borderSize}px`
            }">
            <div class="content" :style="{
                top: `-${verticalBorderWidth - borderSize}px`,
                left: `-${horizontalBorderWidth + borderSize}px`,
                borderTopWidth: `${verticalBorderWidth - borderSize}px`,
                borderBottomWidth: `${verticalBorderWidth - borderSize}px`,
                borderLeftWidth: `${horizontalBorderWidth}px`,
                borderLeftColor: backgroundColor
                }"></div>
        </div>
        <!-- <div class="container" :style="{ backgroundColor, borderColor: backgroundColor, width: `${size}px`, height: `${size/2}px` }">
            <div class="content">
                <slot />
            </div>
        </div> -->
    </div>
</template>

<script>
export default {
    name: 'hexagon',

    props: ['backgroundColor', 'borderColor', 'size', 'borderSize'],

    computed: {
        verticalBorderWidth() {
            return Math.ceil(this.height / 2);
        },

        horizontalBorderWidth() {
            return Math.ceil(this.width / 2);
        },

        height() {
            return this.size;
        },

        width() {
            return Math.ceil(this.size * 0.60);
        }
    }
}
</script>

<style lang="less" scoped>
    .hexagon {
        & > .top {
            position: relative;
            float: left;
            border-right-style: solid;
            border-right-color: inherit;
            border-top: solid transparent;
            border-bottom: solid transparent;

            & > .content {
                position: absolute;
                border-right-style: solid;
                border-top: solid transparent;
                border-bottom: solid transparent;
            }
        }

        & > .middle {
            position: relative;
            float: left;

            & > .content {
                width: 100%;
                position: absolute;
                left: 0px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                z-index: 1;
            }
        }

        & > .footer {
            position: relative;
            float: left;
            border-left-style: solid;
            border-left-color: inherit;
            border-top: solid transparent;
            border-bottom: solid transparent;

            & > .content {
                position: absolute;
                border-left-style: solid;
                border-top: solid transparent;
                border-bottom: solid transparent;
            }
        }

    }

    // .hexagon {
    //     float: left;
    //     position: relative;
    //     padding: 1px;
    //     margin-top: -5px;
    //     margin-left: -5px;
    //     transform: rotate(90deg);
    //     transition: border-color 0.1s ease-out, background-color 0.1s ease-out;

    //     &::before {
    //         content: " ";
    //         width: 0;
    //         height: 0;
    //         border-bottom: 12px solid;
    //         border-bottom-color: inherit;
    //         border-left: 20px solid transparent;
    //         border-right: 20px solid transparent;
    //         position: absolute;
    //         top: -12px;
    //         transition: inherit;
    //     }

    //     &::after {
    //         content: "";
    //         width: 0;
    //         position: absolute;
    //         bottom: -12px;
    //         border-top: 12px solid;
    //         border-top-color: inherit;
    //         border-left: 20px solid transparent;
    //         border-right: 20px solid transparent;
    //         transition: inherit;
    //     }

    //     & > .container {
    //         position: relative;
    //         background-color: black;
    //         // width: 24px;
    //         // height: 24px;

    //         margin-top: 0px;
    //         width: 40px;
    //         height: 24px;

    //         &::before {
    //             content: " ";
    //             width: 0;
    //             height: 0;
    //             border-bottom: 12px solid black;
    //             border-left: 20px solid transparent;
    //             border-right: 20px solid transparent;
    //             position: absolute;
    //             top: -12px;
    //             z-index: 1;
    //         }

    //         &::after {
    //             content: "";
    //             width: 0;
    //             position: absolute;
    //             bottom: -12px;
    //             border-top: 12px solid black;
    //             border-left: 20px solid transparent;
    //             border-right: 20px solid transparent;
    //             z-index: 1;
    //         }

    //         & > .content {
    //             display: flex;
    //             flex-direction: column;
    //             align-items: center;
    //             justify-content: space-between;
    //             transform: rotate(-90deg);
    //         }
    //     }
    // }
</style>