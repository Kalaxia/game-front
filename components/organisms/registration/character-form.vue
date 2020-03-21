<template>
    <div id="character-form">
        <header>
            <h1>Créez votre personnage</h1>
        </header>
        <section class="avatars">
            <div v-for="(data, index) in avatars" :key="`avatar-${index}`"
                :class="['avatar', { selected: data.avatar === selectedAvatar && data.gender === gender }]"
                :style="{ borderColor: avatarBorderColor(data.gender) }" 
                @click="selectAvatar(data)">
                    <img :src="`/images/avatars/${data.gender}/${data.avatar}.png`" :alt="`${data.avatar}`" />
            </div>
        </section>
        <section class="class" v-if="selectedAvatar">
            <header>
                <h2>Choisir une classe</h2>
                <p></p>
            </header>
            <section>
                <div v-for="(picto, c) in classesData" :key="c" :style="{ color: factionColors['main'] }" @click="selectedClass = c" :class="{ selected: selectedClass === c }">
                    <colored-picto :src="picto" :color="factionColors['white']" :width="48" :height="48" />
                    <span>{{ $t(`player.classes.${c}`) }}</span>
                </div>
            </section>
        </section>
        <section class="pseudo" v-if="selectedClass">
            <h2>Entrez votre pseudo</h2>
            <input v-model="pseudo" type="text" :style="{ borderColor: factionColors['main'] }" />
        </section>
        <footer v-if="pseudo.length > 3">
            <button 
                :style="{ borderColor: factionColors['main'] }"
                @click="$emit('createCharacter', { avatar: selectedAvatar, class: selectedClass, gender, pseudo })">
                    Confirmer
            </button>
        </footer>
    </div>
</template>

<script>
import ColoredPicto from '~/components/atoms/colored-picto';
import { shadeColor } from '~/lib/colors';
import { shuffle } from '~/lib/array';
import { mapGetters } from 'vuex';

export default {
    name: 'character-form',

    data() {
        return {
            pseudo: '',
            selectedClass: null,
            selectedAvatar: null,
            gender: null
        };
    },

    components: {
        ColoredPicto,
    },

    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        }),

        classesData() {
            return {
                strategist: 'Victory.svg',
                industrialist: 'Pc_Services.png',
                politician: 'G_P_Ov_64px.png',
                trader: 'B_Merc_64px.png'
            };
        },

        avatars() {
            const avatars = [];

            for (const avatar of this.$resources.avatars.male) {
                avatars.push({ gender: 'male', avatar });
            }

            for (const avatar of this.$resources.avatars.female) {
                avatars.push({ gender: 'female', avatar });
            }

            return shuffle(avatars);
        },

    },

    methods: {
        avatarBorderColor(gender) {
            const factionColors = this.$store.getters['user/factionColors'];

            return (gender === 'male') ? factionColors['main'] : shadeColor(factionColors['main'], 0.4);
        },

        selectAvatar(data) {
            this.gender = data.gender;
            this.selectedAvatar = data.avatar;
        }
    }
}
</script>

<style lang="less" scoped>
    #character-form {
        & > header {
            text-align: center;
            color: white;
        }
        
        & > .avatars {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            padding-top: 20px;

            & > .avatar {
                border-radius: 50%;
                border: 4px solid white;
                margin: 10px;
                overflow: hidden;
                transition: border-width 0.2s ease-out;
                cursor: pointer;

                & > img {
                    width: 126px;
                    height: 126px;

                    transition: width 0.2s ease-out, height 0.2s ease-out;
                }

                &.selected {
                    border-width:8px;

                    & > img {
                        width: 118px;
                        height: 118px;
                    }
                }
            }
        }

        .class {
            width: 60%;
            margin: auto;

            & > header {
                & > h2 {
                    text-align: center;
                }
            }

            & > section {
                display: flex;
                justify-content: space-between;
                margin-top: 50px;

                & > div {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    transition: color 0.2s;
                    cursor: pointer;

                    &:not(.selected):not(:hover) {
                        color: white !important;
                    }

                    & > span {
                        padding-top: 10px;
                        font-variant: small-caps;
                    }
                }
            }
        }

        & > .pseudo {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 20px;

            & > input {
                background-color: black;
                border: none;
                border-bottom: 2px solid;
                font-size: 1.4em;
                font-variant: small-caps;
                color: white;
            }
        }

        & > footer {
            display: flex;
            justify-content: center;
            padding-top: 40px;

            & > button {
                display: flex;
                justify-content: center;
                align-items: center;
                padding-bottom: 5px;
                width: 200px;
                height: 50px;
                font-size: 1.5em;
                font-variant: small-caps;
                border: 2px solid;
                border-radius: 25px;
                background-color: black;
                color: white;
                cursor: pointer;
            }
        }
    }

    @media (max-width: 800px) {
        #character-form {
            overflow-y: auto;

            & > header {
                & > h1 {
                    margin-top: 30px;
                    font-size: 1.1em;
                    margin-bottom: 0px;
                }
            }

            & > .avatars {
                padding-top: 10px;

                & > .avatar {
                    & > img {
                        width: 64px;
                        height: 64px;
                    }

                    &.selected {
                        border-width: 6px;

                        & > img {
                            width: 62px;
                            height: 62px;
                        }
                    }
                }
            }

            & > .pseudo {
                padding-top: 10px;

                & > h2 {
                    font-size: 1.1em;
                    margin: 0px;
                }
            }
        }
    }
</style>
