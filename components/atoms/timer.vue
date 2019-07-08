<template>
    <div class="timer">
        {{ remainingTime }}
    </div>
</template>

<script>
import { getRemainingTimeString } from '~/lib/time';

export default {
    name: 'timer',

    props: ['date'],

    data () {
        return {
            timer: null,
            remainingTime: getRemainingTimeString(this.date)
        };
    },

    mounted () {
        this.timer = setInterval(() => {
            this.remainingTime = getRemainingTimeString(this.date);
        }, 1000);
    },

    destroyed () {
        clearInterval(this.timer);
    },
}
</script>
