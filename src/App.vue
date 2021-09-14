<script>
import { mapActions, mapGetters, mapState } from 'vuex'

import Header from "./components/Header.vue";
import Scoreboard from "./components/Scoreboard.vue";
import GameView from './views/GameView.vue';
export default {
    components: { Header, Scoreboard, GameView },
    setup() {
        console.log(this);
    },
    mounted() {
        console.log(this);
    },
    methods: {
        ...mapActions([
            'start'
        ]),
    },
    computed: {
        ...mapGetters(["score", "time"]),
        ...mapState(["started"])
    }
}
</script>

<template>
    <Header>
        <div v-show="started">Найдено пар: {{ score }}</div>
        <div class="header-spacer"></div>
        <button @click="start" class="header-btn">{{started?time:'Старт'}}</button>
        <div class="header-spacer"></div>
    </Header>
    <main>
        <GameView></GameView>
    </main>
</template>

<style>
body {
    margin: 0;
}
main {
    padding: 1rem;
}
* {
    font-family: monospace;
}
</style>