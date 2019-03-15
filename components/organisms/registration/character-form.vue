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
        <section class="pseudo" v-if="selectedAvatar">
            <h2>Entrez votre pseudo</h2>
            <input v-model="pseudo" type="text" :style="{ borderColor: factionColor }" />
        </section>
        <footer v-if="pseudo.length > 3">
            <button 
                :style="{ borderColor: factionColor }"
                @click="$emit('createCharacter', { avatar: selectedAvatar, gender, pseudo })">
                    Confirmer
            </button>
        </footer>
    </div>
</template>

<script>
import { shadeColor } from '~/lib/colors';
import { shuffle } from '~/lib/array';

export default {
    name: 'character-form',

    data() {
        return {
            pseudo: '',
            selectedAvatar: null,
            gender: null
        };
    },

    computed: {
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

        factionColor() {
            return this.$store.state.user.player.faction.color;
        }
    },

    methods: {
        avatarBorderColor(gender) {
            return (gender === 'male') ? this.factionColor : shadeColor(this.factionColor, 0.4);
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
</style>
