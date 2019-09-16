<template>
    <div ref="notification" class="notification">
        <header>
            <h4>{{ $t(`${notification.content}.title`, data) }}</h4>
            <colored-picto src="close_cross.svg" :color="factionColors['grey']" :width="28" :height="28" @click.native="deleteNotification()" />
        </header>
        <section>
            <p v-html="$t(`${notification.content}.content`, data)"></p>
        </section>
        <footer v-html="$t(`${notification.content}.footer`, data)"></footer>
    </div>
</template>

<script>
import ColoredPicto from '~/components/atoms/colored-picto';
import { formatData } from '~/lib/notifications';
import { mapGetters } from 'vuex';

export default {
    name: 'notification',

    props: ['notification'],

    components: {
        ColoredPicto
    },

    mounted() {
        for (const link of this.$refs.notification.querySelectorAll('.link')) {
            link.onclick = () => { this.$router.push(link.getAttribute('data-link')); };
        }
        for (const element of this.$refs.notification.querySelectorAll('.translate')) {
            element.innerHTML = this.$i18n.t(element.innerText);
        }
    },
    
    computed: {
        ...mapGetters({
            factionColors: 'user/factionColors'
        }),

        data () {
            return formatData(this.notification.data);
        }
    },

    methods: {
        deleteNotification() {
            this.$repositories.player.deleteNotification(this.notification);

            this.$store.commit('user/removeNotification', this.notification);
        }
    }
}
</script>

<style lang="less" scoped>
    .notification {
        margin: 10px 0px;
        padding-bottom: 10px;

        & > header {
            display: flex;
            justify-content: space-between;
            align-items: center;

            & > h4 {
                margin: 0px;
            }

            & > .picto {
                cursor: pointer;
            }
        }

        .link {
            cursor: pointer;
            font-weight: bold;
        }
    }
</style>
